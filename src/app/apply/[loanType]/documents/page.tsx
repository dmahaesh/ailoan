"use client";

import { use, useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { ApplyShell, StickyAction } from "@/components/apply/ApplyShell";
import { Field } from "@/components/apply/Field";
import { CameraIcon } from "@/components/icons";
import { getLoanProduct } from "@/lib/loanProducts";
import { useApply, ApplyData, loadApply, clearApply } from "@/lib/applyStore";
import { addApplication } from "@/lib/applications";
import type { LoanProductId } from "@/lib/loanProducts";

const DOCS = [
  { key: "docId", label: "PAN Card", hint: "Clear photo, all 4 corners visible" },
  { key: "docAddress", label: "Aadhaar / Address Proof", hint: "Front + back" },
  { key: "docIncome", label: "Income Proof", hint: "Last 3 salary slips or ITR" },
  { key: "docBank", label: "Bank Statement", hint: "Last 6 months, PDF" },
] as const;

export default function DocumentsStep({
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
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm(apply);
  }, [apply]);

  function set<K extends keyof ApplyData>(key: K, value: ApplyData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function pickDoc(key: keyof ApplyData) {
    // For the mock: just stamp a filename
    const stamp = new Date().toISOString().slice(0, 10);
    set(key, `${key}_${stamp}.pdf` as ApplyData[typeof key]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consentBureau || !form.consentTerms) {
      alert("Please accept the consents to proceed");
      return;
    }
    setSubmitting(true);

    // Persist final patch
    update(form);

    // Build the application record from the full apply data
    const data = { ...loadApply(), ...form };
    addApplication({
      loanType: loanType as LoanProductId,
      title: product!.title,
      amount: data.amount ?? 0,
      tenure: data.tenure ?? product!.defaultTenure,
    });

    // Clear the draft and navigate to success
    setTimeout(() => {
      clearApply();
      router.push(`/apply/${loanType}/success`);
    }, 600);
  }

  return (
    <ApplyShell
      step={3}
      title="Documents & References"
      subtitle={product.title}
      backHref={`/apply/${loanType}/financial`}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <Section title="Documents" />

        {DOCS.map((d) => {
          const filename = form[d.key as keyof ApplyData] as string | undefined;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => pickDoc(d.key as keyof ApplyData)}
              className={`flex w-full items-center justify-between rounded-xl border-2 border-dashed p-4 text-left transition ${
                filename
                  ? "border-brand bg-brand-soft"
                  : "border-neutral-200 bg-neutral-50 active:bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full ${
                    filename ? "bg-brand text-white" : "bg-white text-neutral-400"
                  }`}
                >
                  {filename ? "✓" : <CameraIcon className="h-4 w-4" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">{d.label}</p>
                  <p className="text-[11px] text-neutral-500">
                    {filename ? "Uploaded · tap to re-upload" : d.hint}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                  filename ? "bg-brand text-white" : "bg-brand-soft text-brand"
                }`}
              >
                {filename ? "Done" : "Upload"}
              </span>
            </button>
          );
        })}

        <Section title="References" />
        <p className="-mt-2 text-[11px] text-neutral-500">
          Two people we can contact about your application.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Reference 1 Name"
            required
            placeholder="Riya Mehta"
            value={form.ref1Name ?? ""}
            onChange={(e) => set("ref1Name", e.target.value)}
          />
          <Field
            label="Phone"
            type="tel"
            required
            maxLength={10}
            placeholder="98765 43210"
            value={form.ref1Phone ?? ""}
            onChange={(e) => set("ref1Phone", e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Reference 2 Name"
            required
            placeholder="Vikram Singh"
            value={form.ref2Name ?? ""}
            onChange={(e) => set("ref2Name", e.target.value)}
          />
          <Field
            label="Phone"
            type="tel"
            required
            maxLength={10}
            placeholder="98765 43210"
            value={form.ref2Phone ?? ""}
            onChange={(e) => set("ref2Phone", e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <Section title="Consents" />

        <label className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3">
          <input
            type="checkbox"
            checked={!!form.consentBureau}
            onChange={(e) => set("consentBureau", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
          />
          <span className="text-[11px] leading-relaxed text-neutral-700">
            I authorize ailancers Loan to fetch my <strong>CIBIL credit report</strong> and
            share information with partner lenders for loan processing.
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl bg-neutral-50 p-3">
          <input
            type="checkbox"
            checked={!!form.consentTerms}
            onChange={(e) => set("consentTerms", e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
          />
          <span className="text-[11px] leading-relaxed text-neutral-700">
            I confirm the details are correct and accept the{" "}
            <span className="font-semibold text-brand">Terms of Service</span> and{" "}
            <span className="font-semibold text-brand">Privacy Policy</span>.
          </span>
        </label>

        <StickyAction>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-brand py-3.5 text-sm font-bold text-white shadow-[0_6px_14px_-4px_rgba(46,204,113,0.5)] active:bg-brand-dark disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Application"}
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
