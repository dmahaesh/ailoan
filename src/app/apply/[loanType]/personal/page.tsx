"use client";

import { use, useEffect, useState } from "react";
import { useRouter, notFound } from "next/navigation";
import { ApplyShell, StickyAction } from "@/components/apply/ApplyShell";
import { Field, Select, Textarea } from "@/components/apply/Field";
import { DemoFillButton } from "@/components/apply/DemoFillButton";
import { getLoanProduct, INDIAN_STATES } from "@/lib/loanProducts";
import { useApply, ApplyData } from "@/lib/applyStore";
import { loadCustomer } from "@/lib/customer";

export default function PersonalStep({
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
    const customer = loadCustomer();
    setForm({
      // Pre-fill from welcome modal, but never overwrite existing apply data
      fullName: apply.fullName ?? customer?.name,
      email: apply.email ?? customer?.email,
      phone: apply.phone ?? customer?.phone,
      ...apply,
    });
  }, [apply]);

  function set<K extends keyof ApplyData>(key: K, value: ApplyData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    update(form);
    router.push(`/apply/${loanType}/financial`);
  }

  return (
    <ApplyShell
      step={1}
      title="Personal & Identity"
      subtitle={product.title}
      backHref={`/apply/${loanType}/loan`}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <DemoFillButton onFill={(d) => setForm((f) => ({ ...f, ...d }))} />
        <Field
          label="Full Name (as per PAN)"
          required
          placeholder="Aarav Sharma"
          value={form.fullName ?? ""}
          onChange={(e) => set("fullName", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Date of Birth"
            type="date"
            required
            value={form.dob ?? ""}
            onChange={(e) => set("dob", e.target.value)}
          />
          <Select
            label="Gender"
            required
            options={["Male", "Female", "Other"]}
            value={form.gender ?? ""}
            onChange={(e) => set("gender", e.target.value)}
          />
        </div>

        <Field
          label="PAN Number"
          required
          maxLength={10}
          placeholder="ABCDE1234F"
          style={{ textTransform: "uppercase" }}
          value={form.idNumber ?? ""}
          onChange={(e) => set("idNumber", e.target.value.toUpperCase())}
        />

        <Field
          label="Email Address"
          type="email"
          required
          placeholder="aarav@example.com"
          value={form.email ?? ""}
          onChange={(e) => set("email", e.target.value)}
        />

        <Field
          label="Mobile Number"
          type="tel"
          required
          maxLength={10}
          placeholder="98765 43210"
          value={form.phone ?? ""}
          onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
        />

        <Textarea
          label="Current Address"
          required
          rows={2}
          placeholder="Flat, Building, Street"
          value={form.address ?? ""}
          onChange={(e) => set("address", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="City"
            required
            placeholder="Mumbai"
            value={form.city ?? ""}
            onChange={(e) => set("city", e.target.value)}
          />
          <Field
            label="PIN Code"
            required
            maxLength={6}
            placeholder="400001"
            value={form.postalCode ?? ""}
            onChange={(e) => set("postalCode", e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <Select
          label="State"
          required
          options={INDIAN_STATES}
          value={form.state ?? ""}
          onChange={(e) => set("state", e.target.value)}
        />

        <Field
          label="Aadhaar (last 4 digits)"
          maxLength={4}
          required
          placeholder="1234"
          value={form.aadhaarLast4 ?? ""}
          onChange={(e) => set("aadhaarLast4", e.target.value.replace(/\D/g, ""))}
        />

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
