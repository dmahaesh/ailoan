"use client";

import { useState } from "react";
import { ApplyData } from "@/lib/applyStore";
import { generateDemoData } from "@/lib/demoData";

export function DemoFillButton({
  onFill,
}: {
  onFill: (data: Partial<ApplyData>) => void;
}) {
  const [filled, setFilled] = useState(false);

  function handleClick() {
    onFill(generateDemoData());
    setFilled(true);
    setTimeout(() => setFilled(false), 1400);
  }

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-3">
      <div className="flex items-center gap-2.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-base">
          🧪
        </div>
        <div className="leading-tight">
          <p className="text-xs font-bold text-amber-900">Testing the flow?</p>
          <p className="text-[10px] text-amber-700">Auto-fill all fields below</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold text-white shadow-md transition active:scale-95 ${
          filled
            ? "bg-emerald-500"
            : "bg-amber-500 active:bg-amber-600"
        }`}
      >
        {filled ? "✓ Filled" : "Auto-fill"}
      </button>
    </div>
  );
}
