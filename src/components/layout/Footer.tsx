import Link from "next/link";

import { BrandMark } from "./Navbar";

const offices = [
  {
    name: "Dubai Head Office",
    lines: ["Royal Arabian Destination Management DMCC", "Jumeirah Lake Towers, Dubai, UAE"],
  },
  {
    name: "Abu Dhabi Office",
    lines: ["Royal Arabian Tours LLC", "Musaffah M39, Abu Dhabi, UAE"],
  },
  {
    name: "Shanghai Office",
    lines: ["Room 7025, Zhongyi Building", "West Nanjing Road, Shanghai, China"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ra-navy text-white">
      <div className="container-ra py-14 sm:py-16">
        <div className="grid gap-12 border-b border-white/20 pb-12 lg:grid-cols-[1.1fr_2fr_0.8fr]">
          <div>
            <BrandMark light />
            <p className="mt-6 max-w-xs text-sm leading-6 text-white/70">
              Destination management for leisure groups, corporate travel, and global B2B partners.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {offices.map((office) => (
              <address className="not-italic" key={office.name}>
                <h3 className="text-sm font-semibold">{office.name}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {office.lines.map((line) => (
                    <span className="block" key={line}>{line}</span>
                  ))}
                </p>
              </address>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold">Start a conversation</h3>
            <a className="mt-3 block text-sm text-white/70 hover:text-white" href="mailto:info@royalarabian.com">
              info@royalarabian.com
            </a>
            <a className="mt-2 block text-sm text-white/70 hover:text-white" href="tel:+97142999339">
              +971 4 2999 339
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Royal Arabian Destination Management DMCC.</p>
          <div className="flex gap-5">
            <Link href="https://www.royalarabian.com/privacy-policy">Privacy policy</Link>
            <Link href="https://www.royalarabian.com/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
