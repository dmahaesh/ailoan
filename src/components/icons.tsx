import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function BellIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M18 16v-5a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
      <path d="M10 21a2 2 0 004 0" />
    </svg>
  );
}

export function HomeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}

export function ListIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </svg>
  );
}

export function UserIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0116 0" />
    </svg>
  );
}

export function GraduationIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  );
}

export function CarIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 13l2-6h14l2 6" />
      <path d="M3 13v5h3v-2h12v2h3v-5H3z" />
      <circle cx="7" cy="16" r="1.2" />
      <circle cx="17" cy="16" r="1.2" />
    </svg>
  );
}

export function WalletIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 7h16a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
      <path d="M3 7V6a2 2 0 012-2h11" />
      <circle cx="17" cy="13" r="1" />
    </svg>
  );
}

export function CardIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

export function ArrowLeftIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function CameraIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 8h3l2-3h6l2 3h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function HouseIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </svg>
  );
}

export function BriefcaseIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

export function SparkleIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8L12 3z" />
      <path d="M19 16l.7 1.8L21.5 18.5l-1.8.7L19 21l-.7-1.8L16.5 18.5l1.8-.7L19 16z" />
    </svg>
  );
}
