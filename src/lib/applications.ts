"use client";

import { useEffect, useState } from "react";
import { LoanProductId } from "./loanProducts";

export type ApplicationStatus =
  | "approved"
  | "pending"
  | "under_review"
  | "rejected"
  | "disbursed";

export type Application = {
  id: string;
  loanType: LoanProductId;
  title: string;
  amount: number;
  tenure: number;
  appliedOn: string; // ISO date
  status: ApplicationStatus;
  statusUpdatedOn?: string;
  applicationNo: string;
  rejectionReason?: string;
};

const KEY = "ailancers-loan:applications";

// Mock seed data so the screen looks real on first visit
const SEED: Application[] = [
  {
    id: "app_001",
    loanType: "house",
    title: "Home Loan",
    amount: 35_00_000,
    tenure: 240,
    appliedOn: "2026-05-12",
    status: "disbursed",
    statusUpdatedOn: "2026-05-22",
    applicationNo: "CC2605120118",
  },
  {
    id: "app_002",
    loanType: "car",
    title: "Car Loan",
    amount: 6_50_000,
    tenure: 60,
    appliedOn: "2026-06-01",
    status: "approved",
    statusUpdatedOn: "2026-06-04",
    applicationNo: "CC2606010244",
  },
  {
    id: "app_003",
    loanType: "custom",
    title: "Personal Loan",
    amount: 1_50_000,
    tenure: 24,
    appliedOn: "2026-06-05",
    status: "under_review",
    statusUpdatedOn: "2026-06-06",
    applicationNo: "CC2606050377",
  },
  {
    id: "app_004",
    loanType: "business",
    title: "Business Loan",
    amount: 12_00_000,
    tenure: 36,
    appliedOn: "2026-06-07",
    status: "pending",
    applicationNo: "CC2606070421",
  },
  {
    id: "app_005",
    loanType: "student",
    title: "Student Loan",
    amount: 4_00_000,
    tenure: 60,
    appliedOn: "2026-04-18",
    status: "rejected",
    statusUpdatedOn: "2026-04-25",
    applicationNo: "CC2604180089",
    rejectionReason: "Insufficient income proof",
  },
];

export function loadApplications(): Application[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw);
  } catch {
    return SEED;
  }
}

export function addApplication(app: Omit<Application, "id" | "applicationNo" | "appliedOn" | "status">) {
  if (typeof window === "undefined") return;
  const list = loadApplications();
  const today = new Date();
  const seq = String(list.length + 1).padStart(4, "0");
  const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "");
  const newApp: Application = {
    ...app,
    id: `app_${Date.now()}`,
    applicationNo: `CC${dateStr}${seq}`,
    appliedOn: today.toISOString().slice(0, 10),
    status: "pending",
  };
  localStorage.setItem(KEY, JSON.stringify([newApp, ...list]));
  return newApp;
}

export function useApplications() {
  const [items, setItems] = useState<Application[]>([]);
  useEffect(() => {
    setItems(loadApplications());
  }, []);
  return items;
}

export const STATUS_META: Record<ApplicationStatus, { label: string; color: string; bg: string; ring: string; dot: string }> = {
  approved: {
    label: "Approved",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
    dot: "bg-emerald-500",
  },
  disbursed: {
    label: "Disbursed",
    color: "text-brand",
    bg: "bg-brand-soft",
    ring: "ring-brand/30",
    dot: "bg-brand",
  },
  pending: {
    label: "Pending",
    color: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
    dot: "bg-amber-500",
  },
  under_review: {
    label: "Under Review",
    color: "text-blue-700",
    bg: "bg-blue-50",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-700",
    bg: "bg-red-50",
    ring: "ring-red-200",
    dot: "bg-red-500",
  },
};

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
