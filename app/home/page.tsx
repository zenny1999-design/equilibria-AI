"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, BookOpen, Home, Menu, Music, Smile, Sparkles, User, X } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEquilibriaStore } from "@/lib/store";

function Card(props: { title?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
      {props.title ? (
        <header className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-eq-text">{props.title}</h2>
          {props.right}
        </header>
      ) : null}
      {props.children}
    </section>
  );
}

function PrimaryLink(props: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={props.href}
      className={[
        "inline-flex items-center justify-center rounded-[12px] bg-eq-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90",
        props.className ?? "",
      ].join(" ")}
    >
      {props.children}
    </Link>
  );
}

export default function HomePage() {
  const router = useRouter();
  const userName = useEquilibriaStore((s) => s.userName);
  const todayMood = useEquilibriaStore((s) => s.todayMood);
  const moodIntensity = useEquilibriaStore((s) => s.moodIntensity);
  const weeklyMoodData = useEquilibriaStore((s) => s.weeklyMoodData);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const quickIconColor = "#5C7A5C";
  const quick = [
    { label: "Mood Tracker", href: "/mood", Icon: Smile },
    { label: "Journal", href: "/journal", Icon: BookOpen },
    { label: "Relax Music", href: "/music", Icon: Music },
    { label: "Stress Checker", href: "/stress", Icon: Activity },
  ] as const;

  const menuItems = [
    { label: "Home", href: "/home", Icon: Home },
    { label: "Mood", href: "/mood", Icon: Smile },
    { label: "Journal", href: "/journal", Icon: BookOpen },
    { label: "Music", href: "/music", Icon: Music },
    { label: "Profile", href: "/profile", Icon: User },
  ] as const;

  return (
    <main className="relative min-h-[844px] bg-eq-bg px-5 py-6 space-y-5">

      {/* Side Menu Drawer */}
      {menuOpen && (
        <div className="absolute inset-0 z-50 flex">
          <div className="w-[75%] bg-white rounded-r-[24px] shadow-xl p-6 flex flex-col gap-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-eq-card">
                  <User className="size-6 text-eq-text-muted" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-eq-text">{userName}</p>
                  <p className="text-xs text-eq-text-muted">View profile</p>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X className="size-5 text-eq-text-muted" />
              </button>
            </div>
            <div className="h-px bg-black/10" />
            <nav className="flex flex-col gap-4">
              {menuItems.map(({ label, href, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 rounded-[12px] px-3 py-2 text-sm font-medium text-eq-text hover:bg-eq-card"
                >
                  <Icon className="size-5 text-eq-primary" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMenuOpen(false)} />
        </div>
      )}

      <header className="flex items-center">
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:bg-white/90"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="size-5 text-eq-text" />
        </button>
      </header>

      <section className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight text-eq-text">Good Morning, {userName}!</h1>
          <p className="text-sm text-eq-text-muted">How are you feeling today?</p>
        </div>
        <button
          type="button"
          className="grid size-14 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5"
          aria-label="Open profile"
          onClick={() => router.push("/profile")}
        >
          <User className="size-7 text-eq-text-muted" />
        </button>
      </section>

      <Card title="Today's Mood">
        {todayMood ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-eq-text">{todayMood}</p>
              <span className="text-xs text-eq-text-muted">{moodIntensity}/100</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/70">
              <div className="h-2 rounded-full bg-eq-primary" style={{ width: `${Math.max(0, Math.min(100, moodIntensity))}%` }} />
            </div>
            <PrimaryLink href="/mood" className="w-full py-3 text-sm">
              Update Mood
            </PrimaryLink>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-white/70 text-eq-text">
              <Smile className="size-9" />
            </div>
            <p className="text-xs text-eq-text-muted">You haven't logged your mood today</p>
            <PrimaryLink href="/mood" className="w-full py-3 text-sm">
              Track Your Mood
            </PrimaryLink>
          </div>
        )}
      </Card>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">Quick Access</h2>
        <ul className="grid grid-cols-4 gap-3">
          {quick.map(({ label, href, Icon }) => (
            <li key={href} className="min-w-0">
              <Link
                href={href}
                className="flex h-[88px] w-full flex-col items-center justify-center gap-2 rounded-[16px] bg-eq-card px-2 py-3 text-center shadow-sm ring-1 ring-black/5 transition-colors hover:bg-eq-card/80"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/75">
                  <Icon size={28} color={quickIconColor} strokeWidth={2} aria-hidden />
                </span>
                <span className="text-[11px] leading-tight text-eq-text">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Card
        title="AI Recommendation"
        right={
          <PrimaryLink href="/quotes" className="px-3 py-1.5 text-[11px]">
            View More
          </PrimaryLink>
        }
      >
        <div className="flex items-start gap-4">
          <div className="grid size-16 place-items-center rounded-[16px] bg-white/80 ring-1 ring-black/5" aria-hidden="true">
            <Sparkles className="size-7 text-eq-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-eq-text">Based on your mood, we recommend…</p>
            <p className="text-xs leading-5 text-eq-text-muted">
              Take 3 minutes to breathe slowly. A small reset can help you regain clarity and balance for the rest of your day.
            </p>
          </div>
        </div>
      </Card>

      <Card title="Your Mood This Week">
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyMoodData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fill: "#2C2C2C", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[1, 7]} ticks={[1, 2, 3, 4, 5, 6, 7]} tick={{ fill: "#2C2C2C", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(0,0,0,0.08)" }} labelStyle={{ color: "#2C2C2C" }} />
              <Line type="monotone" dataKey="value" stroke="#E11D91" strokeWidth={3} dot={{ r: 4, fill: "#E11D91" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </main>
  );
}