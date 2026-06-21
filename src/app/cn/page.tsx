import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";

import CTABanner from "@/components/destination/CTABanner";
import DestinationOverview from "@/components/destination/DestinationOverview";
import GoodToKnow from "@/components/destination/GoodToKnow";
import HeroBanner from "@/components/destination/HeroBanner";
import HighlightsGrid from "@/components/destination/HighlightsGrid";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PackageGrid from "@/components/packages/PackageGrid";
import { fetchSanity } from "@/lib/sanity/client";
import { destinationBySlugQuery, packagesByDestinationQuery } from "@/lib/sanity/queries";
import type { Destination, PackageSummary } from "@/types";

export const revalidate = 300;

const getDestination = cache(() =>
  fetchSanity<Destination | null>(destinationBySlugQuery, { slug: "cn" }),
);

const getPackages = cache(() =>
  fetchSanity<PackageSummary[]>(packagesByDestinationQuery, { slug: "cn" }),
);

export async function generateMetadata(): Promise<Metadata> {
  try {
    const destination = await getDestination();
    return {
      title: destination?.metaTitle || " Travel Packages | Royal Arabian",
      description:
        destination?.metaDescription ||
        "Explore curated travel packages and destination highlights with Royal Arabian.",
    };
  } catch {
    return {
      title: " Travel Packages | Royal Arabian",
      description: "Explore curated  travel packages with Royal Arabian.",
    };
  }
}

export default async function DestinationPage() {
  let destination: Destination | null = null;
  let packages: PackageSummary[] = [];
  let unavailable = false;

  try {
    [destination, packages] = await Promise.all([getDestination(), getPackages()]);
  } catch (error) {
    console.error("Unable to load destination content", error);
    unavailable = true;
  }

  if (!destination) {
    return (
      <>
        <Navbar />
        <main className="grid min-h-[70vh] place-items-center bg-ra-mist px-5 py-20">
          <div className="max-w-xl text-center">
            <p className="text-sm font-semibold text-ra-orange">destination</p>
            <h1 className="text-balance mt-3 text-4xl font-semibold text-ra-navy">
              {unavailable ? "Content is temporarily unavailable" : "Publish the destination to begin"}
            </h1>
            <p className="mt-5 leading-7 text-slate-600">
              {unavailable
                ? "We could not reach the content service. Please try again in a moment."
                : "Create a destination with the slug cn in Sanity Studio, then publish it to populate this page."}
            </p>
            <Link className="mt-8 inline-flex rounded bg-ra-orange px-6 py-3.5 font-semibold text-white" href="/studio">
              Open Sanity Studio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroBanner destination={destination} />
        <DestinationOverview destination={destination} />
        <HighlightsGrid destinationName={destination.name} highlights={destination.highlights} />
        {packages.length ? (
          <PackageGrid destination={destination} packages={packages} />
        ) : (
          <section className="section-ra bg-ra-mist" id="packages">
            <div className="container-ra text-center">
              <h2 className="text-3xl font-semibold text-ra-navy">Packages are being prepared</h2>
              <p className="mt-4 text-slate-600">Publish packages linked to destination to show them here.</p>
            </div>
          </section>
        )}
        <GoodToKnow destination={destination} />
        <CTABanner destination={destination} />
      </main>
      <Footer />
    </>
  );
}
