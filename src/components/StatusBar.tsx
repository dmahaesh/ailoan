export function StatusBar({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-white" : "text-neutral-900";
  return (
    <div className={`flex items-center justify-between text-xs font-semibold ${color}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden>
          <rect x="1" y="6" width="2.5" height="3" rx="0.5" fill="currentColor" />
          <rect x="5" y="4" width="2.5" height="5" rx="0.5" fill="currentColor" />
          <rect x="9" y="2" width="2.5" height="7" rx="0.5" fill="currentColor" />
          <rect x="13" y="0" width="2.5" height="9" rx="0.5" fill="currentColor" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path
            d="M7 8.5a1 1 0 110-2 1 1 0 010 2zM3.5 5.5C4.5 4.6 5.7 4 7 4s2.5.6 3.5 1.5l-1 1A3.5 3.5 0 007 5.5c-.9 0-1.8.4-2.5 1l-1-1zM1 3C2.6 1.5 4.7.5 7 .5s4.4 1 6 2.5l-1 1A6 6 0 007 2C5.1 2 3.4 2.7 2 4L1 3z"
            fill="currentColor"
          />
        </svg>
        <div className="ml-1 flex h-2.5 w-5 items-center rounded-[3px] border border-current px-[1px]">
          <div className="h-1.5 w-full rounded-[1px] bg-current" />
        </div>
      </div>
    </div>
  );
}
