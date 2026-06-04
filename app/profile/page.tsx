"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Settings, User } from "lucide-react";
import { useEquilibriaStore } from "@/lib/store";

const MENU_ITEMS = [
  "Personal Information",
  "Mood Statistics",
  "Reminders",
  "Settings",
  "Help & Support",
] as const;

function MenuRow(props: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="flex w-full items-center justify-between rounded-[16px] bg-eq-card px-4 py-4 text-sm font-semibold text-eq-text shadow-sm ring-1 ring-black/5 transition-colors hover:bg-eq-card/80"
    >
      <span>{props.label}</span>
      <ChevronRight className="size-5 text-eq-text-muted" />
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const userName = useEquilibriaStore((s) => s.userName);
  const clear = useEquilibriaStore((s) => s.clear);

  return (
    <main className="flex min-h-full flex-1 flex-col">
      <header className="flex shrink-0 items-start justify-end">
  <Link
    href="/settings"
    className="inline-flex size-10 items-center justify-center rounded-2xl bg-eq-card shadow-sm ring-1 ring-black/5 transition-colors hover:bg-eq-card/80"
    aria-label="Settings"
  >
    <Settings className="size-5 text-eq-text" />
  </Link>
</header>

      <section className="mt-2 flex shrink-0 flex-col items-center gap-3 text-center">
        <div
          className="grid size-20 place-items-center rounded-full bg-[#C4C4C4] shadow-sm ring-1 ring-black/5"
          aria-hidden="true"
        >
          <User className="size-10 text-white/90" strokeWidth={1.5} />
        </div>
        <h1 className="text-lg font-semibold tracking-tight text-eq-text">{userName}</h1>
      </section>

      <section className="mt-5 shrink-0 rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
        <h2 className="text-sm font-semibold text-eq-text">Your Progress</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-[12px] bg-white/80 p-2.5 text-center ring-1 ring-black/5">
            <p className="text-sm font-semibold text-eq-text">19</p>
            <p className="mt-1 text-[9px] leading-tight text-eq-text-muted">Mood Entries This Week</p>
          </div>
          <div className="rounded-[12px] bg-white/80 p-2.5 text-center ring-1 ring-black/5">
            <p className="text-sm font-semibold text-eq-text">22</p>
            <p className="mt-1 text-[9px] leading-tight text-eq-text-muted">Day Streak 🔥</p>
          </div>
          <div className="rounded-[12px] bg-white/80 p-2.5 text-center ring-1 ring-black/5">
            <p className="text-sm font-semibold text-eq-text">86%</p>
            <p className="mt-1 text-[9px] leading-tight text-eq-text-muted">Average Mood 😊</p>
          </div>
        </div>
      </section>

      <section className="mt-5 flex flex-1 flex-col gap-3">
        {MENU_ITEMS.map((label) => (
          <MenuRow key={label} label={label} />
        ))}
      </section>

      <button
        type="button"
        onClick={() => {
          clear();
          router.push("/auth");
        }}
        className="mt-5 w-full shrink-0 rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90"
      >
        Logout
      </button>
    </main>
  );
}
