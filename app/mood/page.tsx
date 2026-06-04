"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MoodEmoji, type MoodOption } from "@/components/MoodEmoji";
import { useEquilibriaStore } from "@/lib/store";

const options: MoodOption[] = [
  { key: "very-good", emoji: "😁", label: "Very Good" },
  { key: "good", emoji: "😊", label: "Good" },
  { key: "okay", emoji: "😐", label: "Okay" },
  { key: "bad", emoji: "😟", label: "Bad" },
  { key: "very-bad", emoji: "😡", label: "Very Bad" },
];

function moodLabel(key: string) {
  const found = options.find((o) => o.key === key);
  return found ? `${found.emoji} ${found.label}` : key;
}

export default function MoodPage() {
  const router = useRouter();
  const setMood = useEquilibriaStore((s) => s.setMood);
  const todayMood = useEquilibriaStore((s) => s.todayMood);
  const moodIntensity = useEquilibriaStore((s) => s.moodIntensity);
  const moodNote = useEquilibriaStore((s) => s.moodNote);

  const [selected, setSelected] = React.useState<string>(todayMood ? todayMood.toLowerCase().replace(/\s+/g, "-") : "okay");
  const [intensity, setIntensity] = React.useState<number>(moodIntensity);
  const [note, setNote] = React.useState<string>(moodNote);

  const save = () => {
    setMood(moodLabel(selected), intensity, note);
    router.push("/home");
  };

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
        <h1 className="flex-1 text-center text-sm font-semibold text-eq-text">Mood Tracker</h1>
        <span className="size-10" aria-hidden="true" />
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">How are you feeling right now?</h2>
        <div className="grid grid-cols-5 gap-2">
          {options.map((o) => (
            <MoodEmoji key={o.key} option={o} selected={selected === o.key} onSelect={setSelected} />
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-eq-text">How Intense Is Your Mood?</h2>
          <span className="text-xs text-eq-text-muted">{intensity}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-eq-text-muted">
          <span>Low</span>
          <span>High</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full accent-eq-primary"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">What’s On Your Mind?</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={6}
          placeholder="Write a quick note…"
          className="w-full resize-none rounded-[16px] bg-eq-card p-4 text-sm text-eq-text shadow-sm ring-1 ring-black/5 outline-none placeholder:text-eq-text-muted focus:ring-2 focus:ring-eq-primary/30"
        />
      </section>

      <div className="pt-2">
        <button
          type="button"
          onClick={save}
          className="w-full rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eq-primary/40"
        >
          Save Mood
        </button>
      </div>
    </main>
  );
}

