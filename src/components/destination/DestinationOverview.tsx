import type { Destination } from "@/types";

export default function DestinationOverview({ destination }: { destination: Destination }) {
  const paragraphs = destination.description.split(/\n\s*\n/).filter(Boolean);

  return (
    <section className="section-ra bg-white" id="overview">
      <div className="container-ra grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div>
          <p className="text-base font-semibold text-ra-orange">Destination overview</p>
          <h2 className="text-balance mt-3 text-3xl font-semibold tracking-[-0.025em] text-ra-navy sm:text-4xl lg:text-5xl">
            {destination.name}, beyond the landmarks
          </h2>
        </div>
        <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
          {paragraphs.map((paragraph) => <p className="text-pretty" key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
