"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";
import { saveCustomer } from "@/lib/customer";
import { generateDemoData } from "@/lib/demoData";

export function WelcomeModal({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const phoneValid = /^[6-9]\d{9}$/.test(phone);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const nameValid = name.trim().length >= 2;
  const valid = phoneValid && emailValid && nameValid;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    saveCustomer({ name: name.trim(), phone, email: email.trim() });
    setTimeout(onDone, 250);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center animate-fade-in"
      style={{ background: "rgba(15, 23, 42, 0.55)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="w-full max-w-[430px] rounded-t-3xl bg-white px-5 pb-6 pt-7 shadow-2xl sm:rounded-3xl animate-rise-in">
        <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-neutral-200 sm:hidden" />

        <div className="flex justify-center">
          <Logo size={56} />
        </div>

        <h2
          id="welcome-title"
          className="mt-4 text-center text-xl font-extrabold text-neutral-900"
        >
          Welcome to ailancers Loan
        </h2>
        <p className="mt-1 text-center text-xs text-neutral-500">
          Tell us a bit about yourself to get started.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-3">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-base">
              🧪
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-amber-900">Just testing?</p>
              <p className="text-[10px] text-amber-700">Auto-fill the form</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const d = generateDemoData();
              setName(d.fullName ?? "");
              setPhone(d.phone ?? "");
              setEmail(d.email ?? "");
            }}
            className="shrink-0 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-md transition active:scale-95 active:bg-amber-600"
          >
            Auto-fill
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-3 space-y-3.5">
          <FormField
            label="Full Name"
            placeholder="Aarav Sharma"
            value={name}
            onChange={setName}
            autoComplete="name"
            autoFocus
            valid={name.length === 0 || nameValid}
            hint={name.length > 0 && !nameValid ? "Please enter your name" : undefined}
          />

          <FormField
            label="Mobile Number"
            placeholder="98765 43210"
            value={phone}
            onChange={(v) => setPhone(v.replace(/\D/g, "").slice(0, 10))}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            prefix="+91"
            valid={phone.length === 0 || phoneValid}
            hint={
              phone.length > 0 && !phoneValid
                ? "Enter a valid 10-digit Indian mobile"
                : undefined
            }
          />

          <FormField
            label="Email Address"
            placeholder="aarav@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            autoComplete="email"
            valid={email.length === 0 || emailValid}
            hint={email.length > 0 && !emailValid ? "Enter a valid email" : undefined}
          />

          <p className="text-[10px] text-neutral-400">
            By continuing, you agree to receive loan updates from ailancers Loan on
            this number and email.
          </p>

          <button
            type="submit"
            disabled={!valid || submitting}
            className="w-full rounded-full bg-brand py-3.5 text-sm font-bold text-white shadow-[0_6px_14px_-4px_rgba(46,204,113,0.5)] transition active:bg-brand-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {submitting ? "Setting up..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  prefix,
  valid = true,
  hint,
  onChange,
  ...rest
}: {
  label: string;
  prefix?: string;
  valid?: boolean;
  hint?: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-semibold text-neutral-600">
        {label}
      </label>
      <div
        className={`flex items-center overflow-hidden rounded-xl border-2 bg-white transition ${
          valid
            ? "border-neutral-200 focus-within:border-brand"
            : "border-red-300 focus-within:border-red-500"
        }`}
      >
        {prefix && (
          <span className="pl-3 text-sm font-semibold text-neutral-500">
            {prefix}
          </span>
        )}
        <input
          {...rest}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent px-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
      {hint && <p className="mt-1 text-[10px] text-red-600">{hint}</p>}
    </div>
  );
}
