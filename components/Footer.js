import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sky-deep text-white/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SkyNow. Weather data by Open-Meteo.</p>
        <ul className="flex gap-4">
          <li><Link href="/" className="hover:text-white">Home</Link></li>
          <li><Link href="/about" className="hover:text-white">About</Link></li>
          <li><Link href="/services" className="hover:text-white">Services</Link></li>
          <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
        </ul>
      </div>
    </footer>
  );
}
