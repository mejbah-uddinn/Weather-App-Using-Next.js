import WeatherDisplay from "@/components/WeatherDisplay";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <WeatherDisplay />
      <div className="border-t border-sky-mist bg-white">
        <AboutSection />
      </div>
    </>
  );
}
