"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookText, House, Music, Smile, User } from "lucide-react";

const tabs = [
  { href: "/home", label: "Home", Icon: House },
  { href: "/mood", label: "Mood", Icon: Smile },
  { href: "/journal", label: "Journal", Icon: BookText },
  { href: "/music", label: "Music", Icon: Music },
  { href: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Bottom navigation" className="border-t border-black/5 bg-white px-5 pb-6 pt-2">
      <ul className="grid grid-cols-5 gap-2">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex justify-center">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex w-full flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] transition-colors",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eq-primary/40",
                  active ? "text-eq-primary" : "text-eq-text-muted hover:text-eq-text",
                ].join(" ")}
              >
                <Icon className="size-6" strokeWidth={active ? 2.2 : 2} />
                <span className="leading-none">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

