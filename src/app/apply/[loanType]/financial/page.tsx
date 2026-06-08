"use client";

import { use, useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { ApplyShell, StickyAction } from "@/components/apply/ApplyShell";
import { Field, Select } from "@/components/apply/Field";
import { DemoFillButton } from "@/components/apply/DemoFillButton";
import { getLoanProduct, INDIAN_BANKS } from "@/lib/loanProducts";
import { useApply, ApplyData } from "@/lib/applyStore";

const EMPLOYMENT = ["Salaried", "Self-Employed", "Business Owner", "Student", "Retired"];
const YEARS = ["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];

export default function FinancialStep({
  params,
}: {
  params: Promise<{ loanType: string }>;
}) {
  const { loanType } = use(params);
  const product = getLoanProduct(loanType);
  if (!product) return notFound();

  const router = useRouter();
  const [apply, update] = useApply();
  const [form, setForm] = useState<Partial<ApplyData>>({});

  useEffect(() => {
    setForm(apply);
  }, [apply]);

  function set<K extends keyof ApplyData>(key: K, value: ApplyData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const isSalaried = form.employmentStatus === "Salaried";

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    update(form);
    router.push(`/apply/${loanType}/documents`);
  }

  return (
    <ApplyShell
      step={2}
      title="Employment & Finance"
      subtitle={product.title}
      backHref={`/apply/${loanType}/personal`}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <DemoFillButton onFill={(d) => setForm((f) => ({ ...f, ...d }))} />
        <Section title="Employment" />

        <Select
          label="Employment Status"
          required
          options={EMPLOYMENT}
          value={form.employmentStatus ?? ""}
          onChange={(e) => set("employmentStatus", e.target.value)}
        />

        {form.employmentStatus && form.employmentStatus !== "Student" && form.employmentStatus !== "Retired" && (
          <>
            <Field
              label={isSalaried ? "Employer Name" : "Business / Company Name"}
              required
              placeholder={isSalaried ? "Infosys Ltd." : "Sharma Traders"}
              value={form.employer ?? ""}
              onChange={(e) => set("employer", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Designation"
                placeholder={isSalaried ? "Software Engineer" : "Owner"}
                value={form.designation ?? ""}
                onChange={(e) => set("designation", e.target.value)}
              />
              <Select
                label="Years Employed"
                required
                options={YEARS}
                value={form.yearsEmployed ?? ""}
                onChange={(e) => set("yearsEmployed", e.target.value)}
              />
            </div>

            {isSalaried && (
              <Field
                label="Work Email (optional)"
                type="email"
                placeholder="aarav@infosys.com"
                value={form.workEmail ?? ""}
                onChange={(e) => set("workEmail", e.target.value)}
              />
            )}
          </>
        )}

        <Section title="Income & Obligations" />

        <Field
          label="Monthly Income (₹)"
          type="number"
          required
          placeholder="75,000"
          value={form.monthlyIncome ?? ""}
          onChange={(e) => set("monthlyIncome", e.target.value)}
        />
        <Field
          label="Other Income (₹, optional)"
          type="number"
          placeholder="0"
          value={form.otherIncome ?? ""}
          onChange={(e) => set("otherIncome", e.target.value)}
        />
        <Field
          label="Existing EMI Obligations (₹)"
          type="number"
          required
          placeholder="0"
          value={form.existingEmi ?? ""}
          onChange={(e) => set("existingEmi", e.target.value)}
        />
        <Field
          label="Monthly Expenses (₹)"
          type="number"
          required
          placeholder="25,000"
          value={form.monthlyExpenses ?? ""}
          onChange={(e) => set("monthlyExpenses", e.target.value)}
        />

        <Section title="Bank Account (for disbursement)" />

        <Select
          label="Bank Name"
          required
          options={INDIAN_BANKS}
          value={form.bankName ?? ""}
          onChange={(e) => set("bankName", e.target.value)}
        />
        <Field
          label="Account Number"
          required
          placeholder="123456789012"
          value={form.accountNumber ?? ""}
          onChange={(e) => set("accountNumber", e.target.value.replace(/\D/g, ""))}
        />
        <Field
          label="IFSC Code"
          required
          maxLength={11}
          placeholder="HDFC0001234"
          style={{ textTransform: "uppercase" }}
          value={form.routingNumber ?? ""}
          onChange={(e) => set("routingNumber", e.target.value.toUpperCase())}
        />

        <label className="flex items-center gap-2 rounded-xl bg-brand-soft p-3">
          <input
            type="checkbox"
            checked={!!form.salaryAccount}
            onChange={(e) => set("salaryAccount", e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
          <span className="text-xs font-medium text-neutral-800">
            My salary is credited to this account
          </span>
        </label>

        <StickyAction>
          <button
            type="submit"
            className="w-full rounded-full bg-brand py-3.5 text-sm font-bold text-white shadow-[0_6px_14px_-4px_rgba(46,204,113,0.5)] active:bg-brand-dark"
          >
            Continue
          </button>
        </StickyAction>
      </form>
    </ApplyShell>
  );
}

function Section({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="h-px flex-1 bg-neutral-100" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
        {title}
      </span>
      <span className="h-px flex-1 bg-neutral-100" />
    </div>
  );
}
