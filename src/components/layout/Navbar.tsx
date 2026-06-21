"use client";

import Link from "next/link";
import { useState } from "react";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link
      aria-label="Royal Arabian home"
      className={`inline-flex flex-col leading-none ${light ? "text-white" : "text-ra-navy"}`}
      href="/"
    >
      <span className="text-[1.05rem] font-bold tracking-[0.16em]">ROYAL ARABIAN</span>
      <span className={`mt-1 text-[0.56rem] tracking-[0.24em] ${light ? "text-white/70" : "text-ra-orange"}`}>
        YOUR FELLOW TRAVELLER
      </span>
    </Link>
  );
}

const navItems = [
  { href: "/cn#overview", label: "Overview" },
  { href: "/cn#highlights", label: "Highlights" },
  { href: "/cn#packages", label: "Packages" },
  { href: "/cn#good-to-know", label: "Travel guide" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="container-ra flex h-20 items-center justify-between gap-8">
        <BrandMark />

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              className="text-sm font-medium text-ra-ink transition-colors hover:text-ra-orange"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="rounded px-5 py-3 text-sm font-semibold text-white transition-colors bg-ra-orange hover:bg-[#A9562D]"
            href="/cn#packages"
          >
            Plan your trip
          </Link>
        </nav>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="grid size-11 place-items-center rounded border border-slate-300 text-ra-navy lg:hidden"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          {open ? (
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          ) : (
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col">
            {navItems.map((item) => (
              <Link
                className="border-b border-slate-100 py-3.5 font-medium text-ra-navy"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="mt-5 rounded bg-ra-orange px-5 py-3.5 text-center font-semibold text-white"
              href="/cn#packages"
              onClick={() => setOpen(false)}
            >
              Plan your trip
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
