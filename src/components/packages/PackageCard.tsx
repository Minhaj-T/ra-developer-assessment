import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/client";
import type { PackageSummary } from "@/types";

import EnquireModal from "./EnquireModal";

const priceFormatter = new Intl.NumberFormat("en-AE", {
  currency: "AED",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function PackageCard({ travelPackage }: { travelPackage: PackageSummary }) {
  const imageUrl = urlFor(travelPackage.heroImage).width(900).height(650).quality(82).url();
  const inclusions = Array.from(new Set(travelPackage.included));

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-transform duration-300 hover:-translate-y-1">
      <Link className="relative block aspect-[4/3] overflow-hidden" href={`/cn/packages/${travelPackage.slug.current}`}>
        <Image
          alt={`${travelPackage.name} travel package`}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
          src={imageUrl}
        />
        {travelPackage.featured ? (
          <span className="absolute left-4 top-4 rounded bg-ra-navy px-3 py-1.5 text-xs font-semibold text-white">
            Featured journey
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-ra-orange">
          <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8v4l2.5 1.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          </svg>
          {travelPackage.duration}
        </div>
        <h3 className="text-balance mt-3 text-2xl font-semibold tracking-[-0.02em] text-ra-navy">
          <Link className="hover:text-ra-orange" href={`/cn/packages/${travelPackage.slug.current}`}>
            {travelPackage.name}
          </Link>
        </h3>
        <p className="text-pretty mt-3 line-clamp-3 leading-7 text-slate-600">{travelPackage.shortDescription}</p>

        <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-600">
          {inclusions.slice(0, 3).map((item) => (
            <li className="flex items-start gap-2" key={item}>
              <svg aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ra-orange" fill="none" viewBox="0 0 24 24">
                <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-5 pt-7">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-ra-navy">{priceFormatter.format(travelPackage.price)}</span>
              {travelPackage.originalPrice ? (
                <span className="text-sm text-slate-400 line-through">{priceFormatter.format(travelPackage.originalPrice)}</span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <Link className="text-sm font-semibold text-ra-navy underline decoration-ra-orange decoration-2 underline-offset-4 hover:text-ra-orange" href={`/cn/packages/${travelPackage.slug.current}`}>
              View itinerary
            </Link>
            <EnquireModal packageName={travelPackage.name} />
          </div>
        </div>
      </div>
    </article>
  );
}
