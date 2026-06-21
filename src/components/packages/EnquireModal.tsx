"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";

import { supabase } from "@/lib/supabase/client";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "phone";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function inputClassName(hasError: boolean) {
  return `mt-2 w-full rounded border px-3.5 py-3 text-base outline-none transition-colors ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-300 focus:border-ra-orange focus:ring-2 focus:ring-ra-orange/15"
  }`;
}

export default function EnquireModal({ packageName }: { packageName: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formId = useId();
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function openDialog() {
    setSubmissionStatus("idle");
    setFieldErrors({});
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });

    if (submissionStatus === "error") setSubmissionStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const errors: FieldErrors = {};

    if (name.length < 2) errors.name = "Enter at least 2 characters for your name.";
    if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      errors.phone = "Enter a valid phone number with 7 to 15 digits.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmissionStatus("idle");
      const firstInvalidField = Object.keys(errors)[0] as FieldName;
      (form.elements.namedItem(firstInvalidField) as HTMLInputElement | null)?.focus();
      return;
    }

    setFieldErrors({});
    setSubmissionStatus("submitting");

    try {
      const { error } = await supabase.from("enquiries").insert({
        email,
        name,
        package: packageName,
        phone,
      });

      if (error) throw error;

      form.reset();
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Failed to submit enquiry", error);
      setSubmissionStatus("error");
    }
  }

  return (
    <>
      <button
        className="rounded bg-ra-orange px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#A9562D]"
        onClick={openDialog}
        type="button"
      >
        Book now
      </button>

      <dialog
        aria-labelledby={`${formId}-title`}
        className="m-auto w-[calc(100%_-_2rem)] max-w-xl rounded-xl p-0 text-ra-ink shadow-2xl backdrop:bg-ra-deep/75"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        ref={dialogRef}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold text-ra-orange">Package enquiry</p>
            <h2 className="mt-1 text-2xl font-semibold text-ra-navy" id={`${formId}-title`}>
              {packageName}
            </h2>
          </div>
          <button aria-label="Close enquiry form" className="grid size-10 place-items-center rounded text-slate-500 hover:bg-slate-100" onClick={closeDialog} type="button">
            <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <form
          aria-busy={submissionStatus === "submitting"}
          className="space-y-5 px-6 py-6 sm:px-8"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="space-y-5" disabled={submissionStatus === "submitting" || submissionStatus === "success"}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium text-ra-navy">
                Name
                <input
                  aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
                  aria-invalid={Boolean(fieldErrors.name)}
                  autoComplete="name"
                  className={inputClassName(Boolean(fieldErrors.name))}
                  maxLength={100}
                  name="name"
                  onChange={() => clearFieldError("name")}
                  required
                  type="text"
                />
                {fieldErrors.name ? (
                  <span className="mt-1.5 block text-xs font-medium text-red-600" id={`${formId}-name-error`}>
                    {fieldErrors.name}
                  </span>
                ) : null}
              </label>
              <label className="text-sm font-medium text-ra-navy">
                Email
                <input
                  aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
                  aria-invalid={Boolean(fieldErrors.email)}
                  autoComplete="email"
                  className={inputClassName(Boolean(fieldErrors.email))}
                  maxLength={254}
                  name="email"
                  onChange={() => clearFieldError("email")}
                  required
                  type="email"
                />
                {fieldErrors.email ? (
                  <span className="mt-1.5 block text-xs font-medium text-red-600" id={`${formId}-email-error`}>
                    {fieldErrors.email}
                  </span>
                ) : null}
              </label>
            </div>
            <label className="block text-sm font-medium text-ra-navy">
              Phone
              <input
                aria-describedby={fieldErrors.phone ? `${formId}-phone-error` : undefined}
                aria-invalid={Boolean(fieldErrors.phone)}
                autoComplete="tel"
                className={inputClassName(Boolean(fieldErrors.phone))}
                maxLength={30}
                name="phone"
                onChange={() => clearFieldError("phone")}
                required
                type="tel"
              />
              {fieldErrors.phone ? (
                <span className="mt-1.5 block text-xs font-medium text-red-600" id={`${formId}-phone-error`}>
                  {fieldErrors.phone}
                </span>
              ) : null}
            </label>
          </fieldset>

          {submissionStatus === "success" ? (
            <p className="rounded bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800" role="status">
              Your enquiry has been submitted. Our travel team will contact you shortly.
            </p>
          ) : null}
          {submissionStatus === "error" ? (
            <p className="rounded bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
              We could not submit your enquiry. Please check your details and try again.
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button className="rounded border border-slate-300 px-5 py-3 text-sm font-semibold text-ra-navy hover:bg-slate-50" onClick={closeDialog} type="button">
              {submissionStatus === "success" ? "Close" : "Cancel"}
            </button>
            {submissionStatus === "success" ? null : (
              <button
                className="rounded bg-ra-orange px-5 py-3 text-sm font-semibold text-white hover:bg-[#A9562D] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={submissionStatus === "submitting"}
                type="submit"
              >
                {submissionStatus === "submitting" ? "Submitting..." : "Submit enquiry"}
              </button>
            )}
          </div>
        </form>
      </dialog>
    </>
  );
}
