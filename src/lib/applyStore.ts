"use client";

import { useEffect, useState } from "react";

export type ApplyData = {
  loanType?: string;
  amount?: number;
  tenure?: number;
  purpose?: string;

  // Personal
  fullName?: string;
  dob?: string;
  gender?: string;
  email?: string;
  phone?: string;
  idNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  aadhaarLast4?: string;

  // Employment
  employmentStatus?: string;
  employer?: string;
  designation?: string;
  workEmail?: string;
  yearsEmployed?: string;
  workAddress?: string;

  // Financial
  monthlyIncome?: string;
  otherIncome?: string;
  existingEmi?: string;
  monthlyExpenses?: string;

  // Banking
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  salaryAccount?: boolean;

  // References
  ref1Name?: string;
  ref1Phone?: string;
  ref2Name?: string;
  ref2Phone?: string;

  // Documents (just file names for the mock)
  docId?: string;
  docAddress?: string;
  docIncome?: string;
  docBank?: string;
  photo?: string;

  // Consents
  consentBureau?: boolean;
  consentTerms?: boolean;
};

const KEY = "ailancers-loan:apply";

export function loadApply(): ApplyData {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveApply(patch: Partial<ApplyData>) {
  if (typeof window === "undefined") return;
  const next = { ...loadApply(), ...patch };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearApply() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function useApply(): [ApplyData, (patch: Partial<ApplyData>) => void] {
  const [data, setData] = useState<ApplyData>({});
  useEffect(() => {
    setData(loadApply());
  }, []);
  const update = (patch: Partial<ApplyData>) => {
    saveApply(patch);
    setData((d) => ({ ...d, ...patch }));
  };
  return [data, update];
}
