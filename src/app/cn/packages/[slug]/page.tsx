import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import EnquireModal from "@/components/packages/EnquireModal";
import { fetchSanity, urlFor } from "@/lib/sanity/client";
import { packageBySlugQuery } from "@/lib/sanity/queries";
import type { PackageWithDestination } from "@/types";

export const revalidate = 300;

const priceFormatter = new Intl.NumberFormat("en-AE", {
  currency: "AED",
  maximumFractionDigits: 0,
  style: "currency",
});

const getPackage = cache((slug: string) =>
  fetchSanity<PackageWithDestination | null>(packageBySlugQuery, { slug }),
);

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const travelPackage = await getPackage(params.slug);
  if (!travelPackage) return { title: "Package not found | Royal Arabian" };
  return {
    title: `${travelPackage.name} | Royal Arabian`,
    description: travelPackage.shortDescription,
  };
}

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
  const travelPackage = await getPackage(params.slug);
  if (!travelPackage) notFound();

  const imageUrl = urlFor(travelPackage.heroImage).width(1800).height(1050).quality(86).url();
  const inclusions = Array.from(new Set(travelPackage.included));

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-white px-3 py-3 sm:px-5 sm:py-5">
          <div className="relative mx-auto min-h-[520px] max-w-[1400px] overflow-hidden rounded-xl">
            <Image alt={`${travelPackage.name} in ${travelPackage.destination.name}`} className="object-cover" fill priority sizes="100vw" src={imageUrl} />
            <div className="absolute inset-0 bg-gradient-to-r from-ra-deep/90 via-ra-deep/55 to-transparent" />
            <div className="container-ra relative flex min-h-[520px] items-end py-14 text-white sm:items-center">
              <div className="max-w-2xl">
                <Link
                  className="text-sm font-semibold text-white/75 hover:text-white"
                  href={`/${travelPackage.destination.slug.current}#packages`}
                >
                  ← Back to {travelPackage.destination.name} packages
                </Link>
                <p className="mt-8 text-sm font-semibold tracking-[0.12em] text-white/75 uppercase">{travelPackage.duration}</p>
                <h1 className="text-balance mt-3 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                  {travelPackage.name}
                </h1>
                <p className="text-pretty mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                  {travelPackage.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-ra bg-white">
          <div className="container-ra grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
            <div>
              <p className="text-sm font-semibold text-ra-orange">Day by day</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-ra-navy sm:text-4xl">
                Your itinerary
              </h2>
              <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
                {travelPackage.itinerary.map((day) => (
                  <article className="grid gap-4 py-7 sm:grid-cols-[5rem_1fr]" key={day._key}>
                    <span className="text-sm font-semibold text-ra-orange">Day {day.day}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-ra-navy">{day.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{day.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-xl bg-ra-mist p-6 sm:p-8 lg:sticky lg:top-28">
              <p className="text-sm text-slate-500">Starting from</p>
              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-bold text-ra-navy">{priceFormatter.format(travelPackage.price)}</span>
                {travelPackage.originalPrice ? <span className="text-sm text-slate-400 line-through">{priceFormatter.format(travelPackage.originalPrice)}</span> : null}
              </div>
              <p className="mt-8 text-sm font-semibold text-ra-navy">What&apos;s included</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {inclusions.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span aria-hidden="true" className="text-ra-orange">✓</span>{item}
                  </li>
                ))}
              </ul>
              <div className="mt-8"><EnquireModal packageName={travelPackage.name} /></div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
