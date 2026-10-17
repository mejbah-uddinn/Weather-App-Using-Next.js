export default function AboutSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-2xl font-bold md:text-3xl">About SkyNow</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-sky-deep/80">
        SkyNow is a simple weather app built with Next.js and Tailwind CSS. Search
        for any city and see its current temperature, humidity, wind speed and
        local time. All data comes from the free Open-Meteo API, so no API key
        is needed.
      </p>
    </section>
  );
}
