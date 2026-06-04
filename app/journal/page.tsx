"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEquilibriaStore } from "@/lib/store";

type Analysis = { sentiment: "Positive" | "Neutral" | "Negative"; emotion: string; insight: string };

function sentimentBadge(sentiment: Analysis["sentiment"]) {
  if (sentiment === "Positive") return { label: "Positive 😊", className: "bg-eq-primary/15 text-eq-primary" };
  if (sentiment === "Negative") return { label: "Negative 😟", className: "bg-rose-500/15 text-rose-700" };
  return { label: "Neutral 😐", className: "bg-zinc-500/15 text-zinc-700" };
}

export default function JournalPage() {
  const router = useRouter();
  const userName = useEquilibriaStore((s) => s.userName);
  const journalEntries = useEquilibriaStore((s) => s.journalEntries);
  const addJournalEntry = useEquilibriaStore((s) => s.addJournalEntry);

  const [text, setText] = React.useState("");
  const [analysis, setAnalysis] = React.useState<Analysis | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const analyze = async () => {
    setError(null);
    setLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch("/api/journal/analyze", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const msg = await res.json().catch(() => null);
        throw new Error(msg?.error || "Request failed");
      }

      const parsed = (await res.json()) as Analysis;
      setAnalysis(parsed);

      addJournalEntry({
        date: new Date().toISOString(),
        text,
        sentiment: parsed.sentiment,
        emotion: parsed.emotion,
        insight: parsed.insight,
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to analyze entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="space-y-5">
      <header className="flex items-center justify-center">
  <h1 className="text-sm font-semibold text-eq-text">
    Journal
  </h1>
</header>

      <section className="space-y-1">
        <p className="text-sm font-semibold text-eq-text">Hi, {userName}</p>
        <p className="text-sm text-eq-text-muted">How are you feeling today?</p>
      </section>

      <section className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="write your thoughts here.."
          className="w-full resize-none rounded-[16px] bg-eq-card p-4 text-sm text-eq-text shadow-sm ring-1 ring-black/5 outline-none placeholder:text-eq-text-muted focus:ring-2 focus:ring-eq-primary/30"
        />

        <button
          type="button"
          onClick={analyze}
          disabled={!text.trim() || loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90 disabled:opacity-60"
        >
          {loading ? <Loader2 className="size-5 animate-spin" /> : null}
          Analyze with AI
        </button>

        {error ? <p className="text-xs text-rose-700">{error}</p> : null}
        <p className="text-xs text-eq-text-muted">
          Note: Set your API key in <code className="rounded bg-white/70 px-1 py-0.5">OPENROUTER_API_KEY</code>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">AI Insight</h2>
        {analysis ? (
          <div className="rounded-[16px] bg-white p-4 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center justify-between gap-3">
              <span
                className={[
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  sentimentBadge(analysis.sentiment).className,
                ].join(" ")}
              >
                {sentimentBadge(analysis.sentiment).label}
              </span>
              <span className="text-xs text-eq-text-muted">{analysis.emotion}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-eq-text">{analysis.insight}</p>
          </div>
        ) : (
          <div className="rounded-[16px] bg-eq-card p-4 text-sm text-eq-text-muted shadow-sm ring-1 ring-black/5">
            Analyze an entry to see insight here.
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-eq-text">Today’s Journal</h2>
        {journalEntries.length ? (
          <ul className="space-y-3">
            {journalEntries.map((e) => (
              <li key={e.date} className="rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
                <p className="text-xs text-eq-text-muted">{new Date(e.date).toLocaleString()}</p>
                <p className="mt-2 line-clamp-2 text-sm text-eq-text">{e.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-[16px] bg-eq-card p-4 text-sm text-eq-text-muted shadow-sm ring-1 ring-black/5">
            No entries yet.
          </div>
        )}
      </section>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="w-full rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-eq-text shadow-sm ring-1 ring-black/10 transition-colors hover:bg-white/90"
        >
          Back to Home
        </button>
      </div>
    </main>
  );
}

