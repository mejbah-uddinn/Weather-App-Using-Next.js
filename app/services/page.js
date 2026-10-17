export const metadata = { title: "Services – SkyNow" };

const services = [
  { icon: "🌡️", title: "Current temperature", text: "See how warm or cold it is in your city right now." },
  { icon: "🕒", title: "Local time & update interval", text: "Check the city's local time and how often the data refreshes." },
  { icon: "💧", title: "Humidity", text: "Know how much moisture is in the air." },
  { icon: "💨", title: "Wind speed", text: "Find out how strong the wind is at 10 m height." },
  { icon: "⏱️", title: "12-hour outlook", text: "Plan ahead with hourly temperatures for the next 12 hours." },
  { icon: "🔎", title: "Search any city", text: "Look up any city worldwide, or tap a quick-pick city." },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">Services</h1>
      <p className="mt-3 max-w-2xl text-sky-deep/80">
        What you can do with SkyNow.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.title} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-sky-mist">
            <span className="text-3xl" aria-hidden="true">{s.icon}</span>
            <h2 className="mt-3 text-lg font-semibold">{s.title}</h2>
            <p className="mt-1 text-sky-deep/75">{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
