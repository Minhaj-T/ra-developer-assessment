import type { Destination, PackageSummary } from "@/types";

import PackageCard from "./PackageCard";

export default function PackageGrid({
  destination,
  packages,
}: {
  destination: Destination;
  packages: PackageSummary[];
}) {

  return (
    <section className="section-ra content-auto bg-ra-mist" id="packages">
      <div className="container-ra">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-ra-orange">{destination.name} packages</p>
            <h2 className="text-balance mt-3 text-3xl font-semibold tracking-[-0.025em] text-ra-navy sm:text-4xl lg:text-5xl">
              {destination.tagline}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {packages.map((travelPackage) => (
            <PackageCard key={travelPackage._id} travelPackage={travelPackage} />
          ))}
        </div>
      </div>
    </section>
  );
}
