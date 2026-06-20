export default function HighlightsGrid({
  destinationName,
  highlights,
}: {
  destinationName: string;
  highlights: string[];
}) {
  const uniqueHighlights = Array.from(new Set(highlights));

  return (
    <section className="bg-ra-deep py-14 text-white sm:py-16" id="highlights">
      <div className="container-ra">
        <div className="mb-9">
          <h2 className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            {destinationName} highlights
          </h2>
          <span className="mt-3 block h-1 w-12 rounded-full bg-ra-orange" aria-hidden="true" />
        </div>
        <ul className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
          {uniqueHighlights.map((highlight, index) => (
            <li
              className="grid grid-cols-[2.5rem_1fr] items-start gap-4 border-t border-white/15 py-5 sm:py-6"
              key={highlight}
            >
              <span className="pt-0.5 text-sm font-medium tabular-nums text-ra-gold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-medium leading-7 text-white/90 sm:text-lg">
                {highlight}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
