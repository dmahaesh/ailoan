"use client";

import { use, useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { ApplyShell, StickyAction } from "@/components/apply/ApplyShell";
import { Select } from "@/components/apply/Field";
import { getLoanProduct, formatINR, formatINRCompact, formatRateRange } from "@/lib/loanProducts";
import { useApply } from "@/lib/applyStore";

const TENURES = [12, 24, 36, 48, 60, 84, 120, 180, 240];

export default function LoanStep({
  params,
}: {
  params: Promise<{ loanType: string }>;
}) {
  const { loanType } = use(params);
  const product = getLoanProduct(loanType);
  if (!product) return notFound();

  const router = useRouter();
  const [apply, update] = useApply();

  const [amount, setAmount] = useState<number>(
    Math.round((product.min + product.max) / 2)
  );
  const [tenure, setTenure] = useState<number>(product.defaultTenure);
  const [purpose, setPurpose] = useState<string>("");

  // Hydrate from saved data (only if same loan type, else reset)
  useEffect(() => {
    if (apply.loanType === loanType) {
      if (apply.amount) setAmount(apply.amount);
      if (apply.tenure) setTenure(apply.tenure);
      if (apply.purpose) setPurpose(apply.purpose);
    }
  }, [apply, loanType]);

  // EMI uses the best (minimum) rate — final rate depends on credit profile
  const monthlyRate = product.rateMin / 100 / 12;
  const emi =
    monthlyRate > 0
      ? Math.round(
          (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1)
        )
      : Math.round(amount / tenure);

  function onContinue() {
    if (!purpose) {
      alert("Please select a loan purpose");
      return;
    }
    update({ loanType, amount, tenure, purpose });
    router.push(`/apply/${loanType}/personal`);
  }

  return (
    <ApplyShell step={0} title="Loan Details" subtitle={product.title} backHref="/home">
      {/* Big amount display */}
      <div className="rounded-2xl bg-brand-soft p-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
          You want to borrow
        </p>
        <p className="mt-1 text-3xl font-extrabold tracking-tight text-neutral-900">
          {formatINR(amount)}
        </p>

        <input
          type="range"
          min={product.min}
          max={product.max}
          step={Math.max(1000, Math.round((product.max - product.min) / 100))}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-4 w-full accent-brand"
        />
        <div className="mt-1 flex justify-between text-[10px] font-semibold text-neutral-500">
          <span>{formatINRCompact(product.min)}</span>
          <span>{formatINRCompact(product.max)}</span>
        </div>
      </div>

      {/* Tenure picker */}
      <div className="mt-6">
        <label className="mb-2 block text-xs font-semibold text-neutral-600">
          Tenure (months) <span className="text-brand">*</span>
        </label>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {TENURES.filter((t) => t <= Math.max(...TENURES, product.defaultTenure * 2)).map(
            (t) => {
              const isActive = t === tenure;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenure(t)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    isActive
                      ? "border-brand bg-brand text-white"
                      : "border-neutral-300 bg-white text-neutral-700"
                  }`}
                >
                  {t} mo
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Purpose */}
      <div className="mt-5">
        <Select
          label="Loan Purpose"
          required
          options={product.purposes}
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
      </div>

      {/* EMI summary */}
      <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-neutral-100">
        <p className="text-xs font-semibold text-neutral-500">
          Estimated EMI <span className="text-neutral-400">(at lowest rate)</span>
        </p>
        <div className="mt-1 flex items-end justify-between">
          <p className="text-2xl font-extrabold text-neutral-900">
            {formatINR(emi)}
            <span className="text-xs font-semibold text-neutral-500"> / month</span>
          </p>
          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">
            {formatRateRange(product)}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-neutral-100 pt-3 text-center">
          <div>
            <p className="text-[10px] text-neutral-500">Loan</p>
            <p className="text-xs font-bold text-neutral-900">{formatINRCompact(amount)}</p>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500">Tenure</p>
            <p className="text-xs font-bold text-neutral-900">{tenure} mo</p>
          </div>
          <div>
            <p className="text-[10px] text-neutral-500">Total Payable</p>
            <p className="text-xs font-bold text-neutral-900">
              {formatINRCompact(emi * tenure)}
            </p>
          </div>
        </div>
      </div>

      <StickyAction>
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-full bg-brand py-3.5 text-sm font-bold text-white shadow-[0_6px_14px_-4px_rgba(46,204,113,0.5)] active:bg-brand-dark"
        >
          Continue
        </button>
      </StickyAction>
    </ApplyShell>
  );
}
