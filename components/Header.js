"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-sky-deep text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span aria-hidden="true" className="inline-block h-4 w-4 rounded-full bg-sun" />
          SkyNow
        </Link>

        <button
          type="button"
          className="rounded border border-white/30 px-3 py-1 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="main-nav"
          className={`${open ? "block" : "hidden"} absolute left-0 right-0 top-[60px] z-10 bg-sky-deep px-4 pb-4 md:static md:block md:bg-transparent md:p-0`}
        >
          <ul className="flex flex-col gap-1 md:flex-row md:gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded px-3 py-2 text-sm font-medium transition-colors ${
                      active
                        ? "bg-sun text-sky-deep"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
