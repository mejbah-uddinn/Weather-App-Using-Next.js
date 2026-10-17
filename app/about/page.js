export const metadata = { title: "About – SkyNow" };

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">About SkyNow</h1>
      <p className="mt-4 leading-relaxed text-sky-deep/80">
        SkyNow is a small weather app made as a Next.js assignment. It shows the
        current weather for any city in the world, using live data from the free
        Open-Meteo API.
      </p>
      <p className="mt-4 leading-relaxed text-sky-deep/80">
        For each city you can see the temperature, local time, how often the data
        updates, humidity and wind speed. The layout adapts to phones, tablets and
        desktops using Tailwind CSS.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Built with</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sky-deep/80">
        <li>Next.js (App Router)</li>
        <li>Tailwind CSS</li>
        <li>Open-Meteo Forecast and Geocoding APIs</li>
      </ul>
    </section>
  );
}
