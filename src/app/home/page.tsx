import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { StatusBar } from "@/components/StatusBar";
import { HomeGate, CustomerGreeting } from "@/components/HomeGate";
import {
  BellIcon,
  GraduationIcon,
  CarIcon,
  HouseIcon,
  BriefcaseIcon,
  SparkleIcon,
  WalletIcon,
  ListIcon,
  ChevronRightIcon,
} from "@/components/icons";
import { LOAN_PRODUCTS, formatINRCompact, formatRateRange } from "@/lib/loanProducts";

const ICONS = {
  student: GraduationIcon,
  car: CarIcon,
  house: HouseIcon,
  business: BriefcaseIcon,
  custom: SparkleIcon,
};

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-neutral-50 pb-6">
      <HomeGate />
      {/* Green header with shimmer sweep */}
      <section
        className="shimmer relative overflow-hidden rounded-b-[32px] bg-brand px-5 pb-7 pt-3 text-white animate-slide-down"
      >
        <StatusBar tone="light" />

        <div className="mt-4 flex items-center justify-between">
          <CustomerGreeting fallback={{ name: "Welcome", initials: "AL" }} />
          <button
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition active:bg-white/25 active:scale-95"
          >
            <BellIcon className="h-5 w-5" />
          </button>
        </div>

        <h2 className="mt-6 text-2xl font-extrabold leading-tight">
          Find your perfect loan, fast.
        </h2>
        <p className="mt-1 text-xs text-white/85">
          15 lenders · &lt;2 min apply process
        </p>
      </section>

      {/* Stats strip */}
      <section
        className="-mt-5 px-5 animate-rise-in"
        style={{ animationDelay: "120ms" }}
      >
        <div className="grid grid-cols-3 divide-x divide-neutral-200 rounded-2xl bg-white py-3 shadow-[0_6px_20px_rgba(16,24,40,0.08)] border-2 border-neutral-200">
          <Stat value="15" label="Lenders" />
          <Stat value="<2 min" label="Apply" />
          <Stat value="₹25 K – ₹2.5 Cr" label="Loan range" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            href="/kyc"
            className="tap-card flex items-center gap-3 rounded-xl bg-white p-3 border-2 border-neutral-200 active:bg-neutral-50 animate-rise-in"
            style={{ animationDelay: "220ms" }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft">
              <WalletIcon className="h-4 w-4 text-brand" />
            </div>
            <span className="text-sm font-medium text-neutral-800">My Profile</span>
          </Link>
          <Link
            href="/applications"
            className="tap-card flex items-center gap-3 rounded-xl bg-white p-3 border-2 border-neutral-200 active:bg-neutral-50 animate-rise-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-soft">
              <ListIcon className="h-4 w-4 text-brand" />
            </div>
            <span className="text-sm font-medium text-neutral-800">My Applications</span>
          </Link>
        </div>
      </section>

      {/* Loan Applications */}
      <section className="mt-7 px-5">
        <div
          className="flex items-end justify-between animate-rise-in"
          style={{ animationDelay: "360ms" }}
        >
          <div>
            <h2 className="text-xl font-extrabold text-neutral-900">
              Apply for a Loan
            </h2>
            <p className="mt-0.5 text-xs text-neutral-500">
              Choose a product · Instant approval
            </p>
          </div>
          <Link href="#" className="text-xs font-semibold text-brand">
            View more
          </Link>
        </div>

        <ul className="mt-4 space-y-3.5">
          {Object.values(LOAN_PRODUCTS).map((l, i) => {
            const Icon = ICONS[l.id];
            return (
              <li key={l.id}>
                <Link
                  href={`/apply/${l.id}`}
                  className="tap-card group block rounded-2xl bg-white p-4 shadow-[0_6px_20px_rgba(16,24,40,0.08)] border-2 border-neutral-200 hover:border-brand/40 active:shadow-md animate-rise-in"
                  style={{ animationDelay: `${420 + i * 90}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-base font-bold text-neutral-900">
                          {l.title}
                        </p>
                        <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand ring-1 ring-brand/20">
                          {formatRateRange(l)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-neutral-500">
                        {l.tagline}
                      </p>
                      <p className="mt-1.5 text-sm font-extrabold text-brand">
                        {formatINRCompact(l.min)} – {formatINRCompact(l.max)}
                      </p>
                    </div>
                  </div>

                  {/* Apply CTA with subtle pulse */}
                  <div className="relative mt-3.5 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand py-3 text-sm font-bold text-white animate-apply-pulse group-active:bg-brand-dark group-active:scale-[0.98] transition-transform">
                    Apply Now
                    <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <BottomNav active="home" />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-1 text-center">
      <p className="text-sm font-extrabold text-neutral-900 leading-tight">{value}</p>
      <p className="mt-0.5 text-[10px] text-neutral-500">{label}</p>
    </div>
  );
}
