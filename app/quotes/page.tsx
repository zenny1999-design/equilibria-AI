"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Share2 } from "lucide-react";

const quotes = [
  "Breathe in calm, breathe out tension.",
  "Small steps every day bring big changes.",
  "You are allowed to pause and take care of yourself.",
  "Balance is built one mindful moment at a time.",
];

export default function QuotesPage() {
  const router = useRouter();
  const [idx, setIdx] = React.useState(0);

  const q = quotes[idx % quotes.length];

  return (
    <main className="space-y-5">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:bg-white/90"
          aria-label="Back"
        >
          <ArrowLeft className="size-5 text-eq-text" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold text-eq-text">Quotes</h1>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:bg-white/90"
          aria-label="Favorite"
        >
          <Heart className="size-5 text-eq-text" />
        </button>
      </header>

      <section className="grid place-items-center py-10">
        <div className="w-full rounded-[16px] bg-eq-card p-6 text-center shadow-sm ring-1 ring-black/5">
          <p className="text-lg font-semibold leading-7 text-eq-text">“{q}”</p>
          <p className="mt-3 text-xs text-eq-text-muted">— Equilibria</p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIdx((v) => v + 1)}
          className="rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-eq-primary/90"
        >
          Save
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-eq-text shadow-sm ring-1 ring-black/10 hover:bg-white/90"
        >
          <Share2 className="size-4" />
          Share
        </button>
      </div>
    </main>
  );
}

