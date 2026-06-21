import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/client";
import type { Destination } from "@/types";

export default function HeroBanner({ destination }: { destination: Destination }) {
  const heroUrl = urlFor(destination.heroImage).width(1800).height(980).quality(86).url();

  return (
    <section className="bg-white px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5">
      <div className="relative mx-auto min-h-[560px] max-w-[1400px] overflow-hidden rounded-xl sm:min-h-[620px]">
        <Image
          alt={`${destination.name} landscape and cultural landmarks`}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={heroUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,23,38,0.86)_0%,rgba(9,23,38,0.62)_46%,rgba(9,23,38,0.16)_100%)]" />
        <div className="container-ra relative flex min-h-[560px] items-center py-16 sm:min-h-[620px]">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-sm font-semibold tracking-[0.14em] text-white/80 uppercase">
              {destination.tagline}
            </p>
            <h1 className="text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Discover {destination.name} with a trusted travel partner
            </h1>
            <p className="text-pretty mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Curated journeys, dependable local expertise, and thoughtfully planned packages for every way you travel.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="rounded bg-ra-orange px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#A9562D]" href="#packages">
                Explore packages
              </Link>
              <Link className="rounded bg-white px-6 py-3.5 text-center text-sm font-semibold text-ra-navy transition-colors hover:bg-slate-100" href="#overview">
                Discover {destination.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
