"use client";

import { ApplyData } from "@/lib/applyStore";
import { generateDemoData } from "@/lib/demoData";

export function DemoFillButton({
  onFill,
}: {
  onFill: (data: Partial<ApplyData>) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onFill(generateDemoData())}
      className="mb-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-800 transition active:bg-amber-100 active:scale-[0.99]"
    >
      <span>🧪</span>
      <span>Fill with demo data (for testing)</span>
    </button>
  );
}
