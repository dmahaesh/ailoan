"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import { StatusBar } from "@/components/StatusBar";
import { Stepper } from "./Stepper";

export function ApplyShell({
  step,
  title,
  subtitle,
  backHref,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  backHref?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="px-5 pt-3">
        <StatusBar />
        <div className="mt-4 flex items-center gap-3">
          <button
            aria-label="Back"
            onClick={() => (backHref ? router.push(backHref) : router.back())}
            className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 active:bg-neutral-100"
          >
            <ArrowLeftIcon className="h-4 w-4 text-neutral-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-neutral-900">{title}</h1>
            {subtitle && <p className="text-[11px] text-neutral-500">{subtitle}</p>}
          </div>
          <Link href="/home" className="text-[11px] font-semibold text-neutral-400">
            Cancel
          </Link>
        </div>
        <div className="mt-5">
          <Stepper current={step} />
        </div>
      </header>

      <main className="flex-1 px-5 pb-32 pt-6">{children}</main>
    </div>
  );
}

export function StickyAction({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 border-t border-neutral-100 bg-white px-5 py-4 sm:bottom-0">
      {children}
    </div>
  );
}
