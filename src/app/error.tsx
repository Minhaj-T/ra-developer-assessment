"use client";

import Link from "next/link";
import { useEffect } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="grid min-h-[68vh] place-items-center bg-white px-5 py-20">
        <div className="w-full max-w-2xl text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-ra-orange/10 text-ra-orange" aria-hidden="true">
            <svg className="size-7" fill="none" viewBox="0 0 24 24">
              <path d="M12 8v5M12 16.5v.01" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </div>
          <p className="mt-7 text-sm font-semibold text-ra-orange">Something went wrong</p>
          <h1 className="text-balance mt-3 text-3xl font-semibold tracking-[-0.025em] text-ra-navy sm:text-4xl">
            We could not complete this journey
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-pretty leading-7 text-slate-600">
            Please try loading the page again. If the problem continues, return to the destination page.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded bg-ra-orange px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#A9562D]" onClick={reset} type="button">
              Try again
            </button>
            <Link className="rounded border border-ra-navy/25 px-6 py-3.5 text-sm font-semibold text-ra-navy hover:bg-ra-mist" href="/cn">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
