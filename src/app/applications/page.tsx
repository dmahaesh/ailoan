"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { StatusBar } from "@/components/StatusBar";
import {
  GraduationIcon,
  CarIcon,
  HouseIcon,
  BriefcaseIcon,
  SparkleIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { formatINR } from "@/lib/loanProducts";
import {
  ApplicationStatus,
  STATUS_META,
  formatDate,
  useApplications,
} from "@/lib/applications";
import type { LoanProductId } from "@/lib/loanProducts";

const ICONS = {
  student: GraduationIcon,
  car: CarIcon,
  house: HouseIcon,
  business: BriefcaseIcon,
  custom: SparkleIcon,
} as const;

const FILTERS: { key: "all" | ApplicationStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "under_review", label: "Review" },
  { key: "approved", label: "Approved" },
  { key: "disbursed", label: "Disbursed" },
  { key: "rejected", label: "Rejected" },
];

export default function ApplicationsPage() {
  const all = useApplications();
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: all.length };
    all.forEach((a) => (c[a.status] = (c[a.status] ?? 0) + 1));
    return c;
  }, [all]);

  const items = useMemo(
    () => (filter === "all" ? all : all.filter((a) => a.status === filter)),
    [all, filter]
  );

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-neutral-50 pb-6">
      {/* Header */}
      <header className="rounded-b-[32px] bg-brand px-5 pb-7 pt-3 text-white">
        <StatusBar tone="light" />
        <div className="mt-5">
          <h1 className="text-2xl font-extrabold">My Applications</h1>
          <p className="mt-1 text-xs text-white/85">
            Track status of all your loan requests
          </p>
        </div>

        {/* Summary tiles */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Tile label="Total" value={counts.all ?? 0} />
          <Tile label="Approved" value={(counts.approved ?? 0) + (counts.disbursed ?? 0)} />
          <Tile label="In Review" value={(counts.pending ?? 0) + (counts.under_review ?? 0)} />
        </div>
      </header>

      {/* Filter chips */}
      <div className="sticky top-0 z-10 bg-neutral-50/90 backdrop-blur">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3">
          {FILTERS.map((f) => {
            const count = counts[f.key] ?? 0;
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "border-brand bg-brand text-white"
                    : "border-neutral-200 bg-white text-neutral-600"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 py-px text-[10px] ${
                    isActive ? "bg-white/25" : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <section className="px-5 pt-1">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            {items.map((app) => {
              const Icon = ICONS[app.loanType as LoanProductId] ?? SparkleIcon;
              const meta = STATUS_META[app.status];
              return (
                <li key={app.id}>
                  <Link
                    href="#"
                    className="block rounded-2xl bg-white p-4 shadow-[0_4px_18px_rgba(16,24,40,0.05)] ring-1 ring-neutral-100 active:scale-[0.99]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-neutral-900">
                              {app.title}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                              #{app.applicationNo}
                            </p>
                          </div>
                          <span
                            className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${meta.bg} ${meta.color} ${meta.ring}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                            {meta.label}
                          </span>
                        </div>

                        <div className="mt-2 flex items-end justify-between">
                          <div>
                            <p className="text-base font-extrabold text-neutral-900">
                              {formatINR(app.amount)}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                              {app.tenure} months tenure
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-neutral-400">Applied</p>
                            <p className="text-[11px] font-semibold text-neutral-700">
                              {formatDate(app.appliedOn)}
                            </p>
                          </div>
                        </div>

                        {app.status === "rejected" && app.rejectionReason && (
                          <p className="mt-2.5 rounded-lg bg-red-50 px-3 py-1.5 text-[11px] text-red-700">
                            {app.rejectionReason}
                          </p>
                        )}

                        {app.statusUpdatedOn && app.status !== "rejected" && (
                          <div className="mt-2.5 flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-1.5">
                            <span className="text-[10px] text-neutral-500">
                              Updated {formatDate(app.statusUpdatedOn)}
                            </span>
                            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-brand">
                              View details
                              <ChevronRightIcon className="h-3 w-3" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <BottomNav active="loans" />
    </div>
  );
}

function Tile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/15 px-3 py-2.5 backdrop-blur">
      <p className="text-[10px] text-white/80">{label}</p>
      <p className="text-xl font-extrabold leading-tight">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-12 flex flex-col items-center text-center">
      <div className="grid h-20 w-20 place-items-center rounded-full bg-brand-soft text-brand">
        <SparkleIcon className="h-8 w-8" />
      </div>
      <p className="mt-4 text-base font-bold text-neutral-900">No applications yet</p>
      <p className="mt-1 max-w-[260px] text-xs text-neutral-500">
        Apply for your first loan from the Home screen and track its status here.
      </p>
      <Link
        href="/home"
        className="mt-5 rounded-full bg-brand px-6 py-2.5 text-xs font-semibold text-white active:bg-brand-dark"
      >
        Browse Loans
      </Link>
    </div>
  );
}
