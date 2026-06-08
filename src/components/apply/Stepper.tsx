const STEPS = ["Loan", "Profile", "Finance", "Docs"];

export function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const isDone = i < current;
        const isActive = i === current;
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition ${
                isDone
                  ? "bg-brand text-white"
                  : isActive
                  ? "bg-brand text-white ring-4 ring-brand/20"
                  : "bg-neutral-200 text-neutral-500"
              }`}
            >
              {isDone ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold ${
                isActive ? "text-brand" : "text-neutral-500"
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
