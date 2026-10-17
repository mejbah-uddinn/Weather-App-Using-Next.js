// Helpers for Open-Meteo: weather codes and time formatting.

const CODES = {
  0: ["Clear sky", "☀️", "🌙"],
  1: ["Mainly clear", "🌤️", "🌙"],
  2: ["Partly cloudy", "⛅", "☁️"],
  3: ["Overcast", "☁️", "☁️"],
  45: ["Fog", "🌫️", "🌫️"],
  48: ["Rime fog", "🌫️", "🌫️"],
  51: ["Light drizzle", "🌦️", "🌧️"],
  53: ["Drizzle", "🌦️", "🌧️"],
  55: ["Heavy drizzle", "🌧️", "🌧️"],
  61: ["Light rain", "🌦️", "🌧️"],
  63: ["Rain", "🌧️", "🌧️"],
  65: ["Heavy rain", "🌧️", "🌧️"],
  71: ["Light snow", "🌨️", "🌨️"],
  73: ["Snow", "❄️", "❄️"],
  75: ["Heavy snow", "❄️", "❄️"],
  80: ["Rain showers", "🌦️", "🌧️"],
  81: ["Rain showers", "🌧️", "🌧️"],
  82: ["Violent showers", "⛈️", "⛈️"],
  95: ["Thunderstorm", "⛈️", "⛈️"],
  96: ["Thunderstorm, hail", "⛈️", "⛈️"],
  99: ["Thunderstorm, hail", "⛈️", "⛈️"],
};

export function describeCode(code, isDay = 1) {
  const entry = CODES[code] || ["Unknown", "🌡️", "🌡️"];
  return { label: entry[0], icon: isDay ? entry[1] : entry[2] };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-10-17T14:30" -> "17 Oct 2026, 14:30" (already in the city's local time)
export function formatLocalTime(iso) {
  const [date, time] = iso.split("T");
  const [y, m, d] = date.split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}, ${time}`;
}

export function formatHour(iso) {
  return iso.split("T")[1];
}

export function formatInterval(seconds) {
  return seconds % 60 === 0 ? `${seconds / 60} min` : `${seconds} sec`;
}
