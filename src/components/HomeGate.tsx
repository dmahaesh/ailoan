"use client";

import { useCustomer, getInitials } from "@/lib/customer";
import { WelcomeModal } from "@/components/WelcomeModal";

export function HomeGate() {
  const { customer, ready, refresh } = useCustomer();

  // Don't flash the modal before we've read localStorage
  if (!ready) return null;
  if (customer) return null;

  return <WelcomeModal onDone={refresh} />;
}

export function CustomerGreeting({ fallback }: { fallback: { name: string; initials: string } }) {
  const { customer, ready } = useCustomer();
  const name = ready && customer ? customer.name : fallback.name;
  const initials = ready && customer ? getInitials(customer.name) : fallback.initials;
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 overflow-hidden rounded-full bg-white/20 ring-2 ring-white/40">
        <div className="flex h-full w-full items-center justify-center text-lg font-bold">
          {initials}
        </div>
      </div>
      <div className="leading-tight">
        <p className="text-xs text-white/85">Welcome Back</p>
        <p className="text-base font-semibold">{name}</p>
      </div>
    </div>
  );
}
