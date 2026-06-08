import Link from "next/link";
import { HomeIcon, ListIcon, UserIcon } from "@/components/icons";

type Tab = "home" | "loans" | "profile";

const tabs: { key: Tab; label: string; href: string; Icon: typeof HomeIcon }[] = [
  { key: "home", label: "Home", href: "/home", Icon: HomeIcon },
  { key: "loans", label: "My Loan", href: "/applications", Icon: ListIcon },
  { key: "profile", label: "Profile", href: "/kyc", Icon: UserIcon },
];

export function BottomNav({ active }: { active: Tab }) {
  return (
    <nav
      className="sticky bottom-0 z-40 mt-auto border-t-2 border-neutral-200 bg-white px-2 pt-2"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)" }}
    >
      <ul className="flex items-center justify-around">
        {tabs.map(({ key, label, href, Icon }) => {
          const isActive = key === active;
          return (
            <li key={key}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 px-4 py-1 transition ${
                  isActive ? "text-brand" : "text-neutral-700"
                } active:scale-95`}
              >
                <Icon className="h-5 w-5" strokeWidth={2.4} />
                <span className="text-[10px] font-semibold">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
