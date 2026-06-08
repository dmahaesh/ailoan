"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/home"), 1800);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-4 animate-[fadeIn_600ms_ease-out]">
        <Logo size={84} />
        <p className="text-sm font-medium text-neutral-500 tracking-wide">
          Quick · Secure · Easy Access
        </p>
      </div>

      <div className="absolute bottom-12 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse [animation-delay:240ms]" />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
