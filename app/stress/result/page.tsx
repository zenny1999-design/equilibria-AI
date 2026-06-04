"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { useEquilibriaStore } from "@/lib/store";

function levelLabel(score: number) {
  if (score < 30) return { label: "Low", emoji: "😊", desc: "You’re feeling relatively calm. Keep taking small breaks to stay balanced." };
  if (score < 60) return { label: "Moderate", emoji: "😐", desc: "You are experiencing moderate stress. Take some time and take care of yourself." };
  if (score < 80) return { label: "High", emoji: "😟", desc: "Your stress feels high. Try to slow down and prioritize rest and support." };
  return { label: "Very High", emoji: "😣", desc: "You may be overwhelmed. Consider reaching out to someone you trust and take a calming break." };
}

export default function StressResultPage() {
  const router = useRouter();
  const stressLevel = useEquilibriaStore((s) => s.stressLevel);
  const score = typeof stressLevel === "number" ? stressLevel : 60;
  const meta = levelLabel(score);

  return (
    <main className="min-h-[844px] bg-eq-bg px-5 py-6 space-y-5">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:bg-white/90"
          aria-label="Back"
        >
          <ArrowLeft className="size-5 text-eq-text" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold text-eq-text">Stress Result</h1>
        <span className="size-10" aria-hidden="true" />
      </header>

      <section className="rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
        <p className="text-xs font-medium text-eq-text-muted">Your stress level</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-eq-text">{meta.label}</p>
            <p className="text-sm text-eq-text-muted">
              {score}/100 {meta.emoji}
            </p>
          </div>
          <span className="text-4xl">{meta.emoji}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-eq-text-muted">{meta.desc}</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">AI Recommendation</h2>
        <div className="rounded-[16px] bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="flex items-start gap-4">
            <div className="grid size-16 place-items-center rounded-[16px] bg-eq-card ring-1 ring-black/5" aria-hidden="true">
              <Sparkles className="size-7 text-eq-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-eq-text">Take deep Breath</p>
              <p className="text-xs leading-5 text-eq-text-muted">Try deep breathing exercises to calm your mood</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90"
          >
            Start Now <Play className="size-4" />
          </button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">Other Suggestions</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/music"
            className="rounded-[16px] bg-eq-card px-3 py-4 text-center text-xs font-semibold text-eq-text shadow-sm ring-1 ring-black/5 hover:bg-eq-card/80"
          >
            Relax music
          </Link>
          <Link
            href="/music"
            className="rounded-[16px] bg-eq-card px-3 py-4 text-center text-xs font-semibold text-eq-text shadow-sm ring-1 ring-black/5 hover:bg-eq-card/80"
          >
            Nature sounds
          </Link>
          <Link
            href="/journal"
            className="rounded-[16px] bg-eq-card px-3 py-4 text-center text-xs font-semibold text-eq-text shadow-sm ring-1 ring-black/5 hover:bg-eq-card/80"
          >
            Write Journal
          </Link>
        </div>
      </section>
    </main>
  );
}

