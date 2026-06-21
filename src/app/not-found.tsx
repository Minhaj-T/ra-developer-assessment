import Link from "next/link";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="grid min-h-[68vh] place-items-center bg-ra-mist px-5 py-20">
        <div className="w-full max-w-3xl text-center">
          <div className="mx-auto flex items-center justify-center gap-3" aria-hidden="true">
            <span className="text-7xl font-semibold tracking-[-0.05em] text-ra-navy sm:text-8xl">4</span>
            <span className="size-12 rotate-12 bg-ra-orange sm:size-16" />
            <span className="text-7xl font-semibold tracking-[-0.05em] text-ra-navy sm:text-8xl">4</span>
          </div>
          <h1 className="text-balance mt-8 text-3xl font-semibold tracking-[-0.025em] text-ra-navy sm:text-4xl">
            This journey does not exist
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-7 text-slate-600">
            The page may have moved, or the address may be incorrect. Return to and continue exploring available journeys.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="rounded bg-ra-orange px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#A9562D]" href="/cn">
              Explore Destination
            </Link>
            <Link className="rounded border border-ra-navy/25 px-6 py-3.5 text-sm font-semibold text-ra-navy hover:bg-white" href="/">
              Return home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
