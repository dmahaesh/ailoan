"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { StatusBar } from "@/components/StatusBar";
import { getLoanProduct } from "@/lib/loanProducts";
import { useApplications } from "@/lib/applications";

export default function SuccessPage({
  params,
}: {
  params: Promise<{ loanType: string }>;
}) {
  const { loanType } = use(params);
  const product = getLoanProduct(loanType);
  if (!product) return notFound();

  const apps = useApplications();
  const latest = apps[0];

  return (
    <div className="flex min-h-dvh flex-col bg-white px-5 pt-3">
      <StatusBar />

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative grid h-28 w-28 place-items-center rounded-full bg-brand-soft">
          <div className="absolute inset-2 rounded-full bg-brand-soft animate-ping opacity-60" />
          <svg width="56" height="56" viewBox="0 0 24 24" className="relative">
            <circle cx="12" cy="12" r="10" fill="#2ECC71" />
            <path
              d="M7 12.5l3.5 3.5L17 9"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-neutral-900">
          Application Submitted!
        </h1>
        <p className="mt-2 max-w-[300px] text-sm text-neutral-500">
          Your {product.title.toLowerCase()} application is being reviewed. We&apos;ll
          notify you within 24 hours.
        </p>

        {latest && (
          <div className="mt-6 w-full rounded-2xl bg-neutral-50 p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Application No.</span>
              <span className="text-xs font-bold text-neutral-900">
                #{latest.applicationNo}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">Status</span>
              <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Pending
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2 pb-6">
        <Link
          href="/applications"
          className="block w-full rounded-full bg-brand py-3.5 text-center text-sm font-bold text-white shadow-[0_6px_14px_-4px_rgba(46,204,113,0.5)] active:bg-brand-dark"
        >
          Track My Application
        </Link>
        <Link
          href="/home"
          className="block w-full rounded-full bg-white py-3.5 text-center text-sm font-bold text-neutral-700 ring-1 ring-neutral-200 active:bg-neutral-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
