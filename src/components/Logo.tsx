export function Logo({ size = 56 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 60 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Speedometer arc — green */}
        <path
          d="M8 38 A22 22 0 0 1 52 38"
          stroke="#2ECC71"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Orange/red dash */}
        <path
          d="M8 38 A22 22 0 0 1 14 22"
          stroke="#F26B5E"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Needle */}
        <line
          x1="30"
          y1="38"
          x2="20"
          y2="24"
          stroke="#111827"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="30" cy="38" r="2.5" fill="#111827" />
      </svg>
      <div className="leading-none">
        <div className="text-[10px] font-bold tracking-[0.25em] text-brand lowercase">
          ailancers
        </div>
        <div className="text-3xl font-black text-neutral-900 -mt-0.5">Loan</div>
      </div>
    </div>
  );
}
