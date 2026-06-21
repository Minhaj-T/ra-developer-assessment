import type { Destination } from "@/types";

export default function GoodToKnow({ destination }: { destination: Destination }) {

  return (
    <section className="section-ra content-auto bg-ra-mist" id="good-to-know">
      <div className="container-ra">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-ra-orange">{destination.name} travel guide</p>
            <h2 className="text-balance mt-3 text-3xl font-semibold tracking-[-0.025em] text-ra-navy sm:text-4xl">
              {destination.tagline}
            </h2>
          </div>
          <div className="divide-y divide-ra-navy/15 border-y border-ra-navy/15">
            {destination.goodToKnow.map((item, index) => (
              <article className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr]" key={item._key}>
                <span className="text-sm font-semibold text-ra-orange">0{index + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold text-ra-navy">{item.title}</h3>
                  <p className="mt-2 max-w-2xl leading-7 text-slate-600">{item.content}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
