"use client";

import { useEffect, useState } from "react";
import {
  describeCode,
  formatHour,
  formatInterval,
  formatLocalTime,
} from "./weather";

const QUICK_CITIES = ["Dhaka", "Chattogram", "Sylhet", "London", "New York"];

async function fetchWeather(city) {
  // 1) City name -> coordinates
  const geoRes = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  if (!geoRes.ok) throw new Error("Could not look up that city.");
  const geo = await geoRes.json();
  if (!geo.results || geo.results.length === 0) {
    throw new Error(`No city found for "${city}". Check the spelling and try again.`);
  }
  const place = geo.results[0];

  // 2) Coordinates -> weather
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day",
    hourly: "temperature_2m,weather_code",
    forecast_days: "2",
    timezone: "auto",
  });
  const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!wRes.ok) throw new Error("Weather service is not responding. Try again soon.");
  const data = await wRes.json();

  return { place, data };
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-sky-mist">
      <dt className="text-sm text-sky-mid">{label}</dt>
      <dd className="mt-1 text-xl font-semibold">{value}</dd>
    </div>
  );
}

export default function WeatherDisplay() {
  const [query, setQuery] = useState("Dhaka");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(city) {
    setLoading(true);
    setError("");
    try {
      setResult(await fetchWeather(city));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load("Dhaka");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) load(query.trim());
  }

  const current = result?.data.current;
  const units = result?.data.current_units;
  const condition = current ? describeCode(current.weather_code, current.is_day) : null;

  // Next 12 hours from the current time
  let hours = [];
  if (result) {
    const h = result.data.hourly;
    const start = h.time.findIndex((t) => t >= current.time);
    const from = start === -1 ? 0 : start;
    hours = h.time.slice(from, from + 12).map((t, i) => ({
      time: t,
      temp: h.temperature_2m[from + i],
      code: h.weather_code[from + i],
    }));
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold md:text-5xl">Weather, right now.</h1>
      <p className="mt-2 text-sky-deep/70">Search a city to see live conditions.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="city" className="sr-only">City name</label>
        <input
          id="city"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a city, e.g. Dhaka"
          className="w-full flex-1 rounded-lg border border-sky-mist bg-white px-4 py-3"
        />
        <button
          type="submit"
          className="rounded-lg bg-sky-deep px-6 py-3 font-medium text-white hover:bg-sky-mid"
        >
          Search
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {QUICK_CITIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setQuery(c);
              load(c);
            }}
            className="rounded-full border border-sky-mist bg-white px-3 py-1 text-sm hover:border-sky-mid"
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p className="mt-8 text-sky-mid" role="status">Loading weather…</p>}

      {error && !loading && (
        <p className="mt-8 rounded-lg bg-red-50 p-4 text-red-800" role="alert">{error}</p>
      )}

      {result && !loading && !error && (
        <div className="mt-8">
          <div className="rounded-2xl bg-sky-deep p-6 text-white md:p-8">
            <p className="text-lg text-white/80">
              {result.place.name}
              {result.place.admin1 ? `, ${result.place.admin1}` : ""}
              {result.place.country ? `, ${result.place.country}` : ""}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-6xl md:text-7xl" aria-hidden="true">{condition.icon}</span>
              <div>
                <p className="text-5xl font-bold md:text-6xl">
                  {Math.round(current.temperature_2m)}
                  {units.temperature_2m}
                </p>
                <p className="text-white/80">{condition.label}</p>
              </div>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Local time" value={formatLocalTime(current.time)} />
            <Stat label="Update interval" value={`Every ${formatInterval(current.interval)}`} />
            <Stat label="Humidity" value={`${current.relative_humidity_2m}${units.relative_humidity_2m}`} />
            <Stat label="Wind speed" value={`${current.wind_speed_10m} ${units.wind_speed_10m}`} />
          </dl>

          <h2 className="mt-8 text-xl font-semibold">Next 12 hours</h2>
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {hours.map((h) => (
              <li
                key={h.time}
                className="min-w-[84px] rounded-lg bg-white p-3 text-center shadow-sm ring-1 ring-sky-mist"
              >
                <p className="text-sm text-sky-mid">{formatHour(h.time)}</p>
                <p className="my-1 text-2xl" aria-hidden="true">{describeCode(h.code, 1).icon}</p>
                <p className="font-semibold">{Math.round(h.temp)}°</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
