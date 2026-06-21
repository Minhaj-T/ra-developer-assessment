import Image from "next/image";

import { urlFor } from "@/lib/sanity/client";
import type { Destination } from "@/types";

export default function CTABanner({ destination }: { destination: Destination }) {
  const imageUrl = urlFor(destination.heroImage).width(1800).height(760).quality(82).url();

  return (
    <section className="relative min-h-[440px] overflow-hidden">
      <Image alt={`Plan a journey through ${destination.name}`} className="object-cover" fill sizes="100vw" src={imageUrl} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,36,64,0.9),rgba(16,36,64,0.62),rgba(16,36,64,0.2))]" />
      <div className="container-ra relative flex min-h-[440px] items-center py-16 text-white">
        <div className="max-w-2xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl">
            Design your {destination.name} journey with Royal Arabian
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Tell us the dates, group size, and travel style. Our destination team will help shape the right itinerary.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="rounded bg-ra-orange px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#A9562D]" href="mailto:sales@royalarabian.com?subject=China%20travel%20enquiry">
              Email our travel team
            </a>
            <a className="rounded bg-white px-6 py-3.5 text-sm font-semibold text-ra-navy hover:bg-slate-100" href="tel:+97142999339">
              Book a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
