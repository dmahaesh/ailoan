"use client";

import Link from "next/link";
import { useState } from "react";
import { StatusBar } from "@/components/StatusBar";
import { ArrowLeftIcon, CameraIcon, ChevronDownIcon } from "@/components/icons";

export default function KycPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-dvh flex-col bg-white px-5 pt-3">
        <StatusBar />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-brand-soft">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#2ECC71" />
              <path
                d="M7 12.5l3.5 3.5L17 9"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-extrabold text-neutral-900">
            Information saved
          </h2>
          <p className="mt-2 max-w-xs text-sm text-neutral-500">
            Your KYC details have been submitted. You can now request a loan.
          </p>
          <Link
            href="/home"
            className="mt-8 w-full rounded-full bg-brand py-3.5 text-center text-sm font-semibold text-white active:bg-brand-dark"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="px-5 pt-3">
        <StatusBar />
        <div className="mt-4 flex items-center gap-3">
          <Link
            href="/home"
            aria-label="Back"
            className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 active:bg-neutral-100"
          >
            <ArrowLeftIcon className="h-4 w-4 text-neutral-700" />
          </Link>
          <h1 className="text-lg font-bold text-neutral-900">Additional Information</h1>
        </div>
        <p className="mt-1 ml-12 text-xs text-neutral-500">
          Please fill in your details to complete KYC.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="flex-1 px-5 pb-32 pt-6"
      >
        {/* Avatar uploader */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            className="relative grid h-24 w-24 place-items-center rounded-full bg-neutral-100"
          >
            <CameraIcon className="h-7 w-7 text-neutral-400" />
            <span className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
              +
            </span>
          </button>
          <span className="text-xs text-neutral-500">Upload profile photo</span>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Full Name" placeholder="Dustin Kozey" />
          <Field label="Date of Birth" placeholder="DD / MM / YYYY" type="date" />

          <Select label="Gender" options={["Male", "Female", "Other"]} />

          <Field label="Email Address" placeholder="dustin@example.com" type="email" />
          <Field label="Phone Number" placeholder="+1 555 0142" type="tel" />

          <Field label="Address" placeholder="123 Main Street" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="City" placeholder="New York" />
            <Field label="Postal Code" placeholder="10001" />
          </div>

          <Select
            label="Employment Status"
            options={["Employed", "Self-Employed", "Student", "Unemployed"]}
          />

          <Field label="Monthly Income" placeholder="$ 5,000" type="number" />
          <Field label="ID / Passport Number" placeholder="AB1234567" />

          {/* Document upload tile */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
              ID Document
            </label>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-4 text-left active:bg-neutral-100"
            >
              <div>
                <p className="text-sm font-medium text-neutral-800">Upload ID document</p>
                <p className="text-[11px] text-neutral-500">PNG, JPG or PDF up to 5MB</p>
              </div>
              <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                Choose
              </span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="fixed bottom-6 left-1/2 z-30 w-[calc(100%-2.5rem)] max-w-[390px] -translate-x-1/2 rounded-full bg-brand py-3.5 text-sm font-semibold text-white shadow-lg active:bg-brand-dark sm:bottom-10"
        >
          Save Information
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
        {label}
      </label>
      <input
        {...rest}
        className="w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-neutral-600">
        {label}
      </label>
      <div className="relative">
        <select
          defaultValue=""
          className="w-full appearance-none rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 pr-10 text-sm text-neutral-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          <option value="" disabled>
            Select...
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </div>
    </div>
  );
}
