"use client";

import { useEffect, useState } from "react";

export type Customer = {
  name: string;
  phone: string;
  email: string;
  createdAt: string;
};

const KEY = "ailancers-loan:customer";

export function loadCustomer(): Customer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Customer) : null;
  } catch {
    return null;
  }
}

export function saveCustomer(c: Omit<Customer, "createdAt">) {
  if (typeof window === "undefined") return;
  const next: Customer = { ...c, createdAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearCustomer() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function useCustomer(): {
  customer: Customer | null;
  ready: boolean;
  refresh: () => void;
} {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCustomer(loadCustomer());
    setReady(true);
  }, []);

  return {
    customer,
    ready,
    refresh: () => setCustomer(loadCustomer()),
  };
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
