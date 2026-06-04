"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useEquilibriaStore } from "@/lib/store";
import Image from "next/image";

type Step = 1 | 2 | 3 | 4 | 5;

const q2 = {
  question: "How often do you feel overwhelmed by your responsibilities?",
  options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
};

const q3 = {
  question: "How would you rate your current stress level?",
  options: ["Very low", "Low", "Moderate", "High", "Very high"],
};

const q4 = {
  question: "What are the main sources of your stress? (Select all that apply)",
  options: ["Work or school", "Family", "Finances", "Health", "Relationships", "Others"],
};

function Progress(props: { step: Step }) {
  return (
    <div className="space-y-6 mt-6 px-3">
      <div className="flex items-center justify-between gap-2">
        {([1, 2, 3, 4, 5] as const).map((n) => {
          const active = n <= props.step;
          return (
            <div key={n} className="flex flex-1 items-center gap-2">
              <div
                className={[
                  "grid size-8 place-items-center rounded-full text-xs font-semibold",
                  active ? "bg-eq-primary text-white" : "bg-white text-eq-text-muted ring-1 ring-black/10",
                ].join(" ")}
              >
                {n}
              </div>
              {n < 5 ? <div className="h-0.5 flex-1 rounded-full bg-black/10" aria-hidden="true" /> : null}
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-eq-text-muted">Step {props.step} of 5</p>
    </div>
  );
}

function OptionButton(props: { selected?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={[
        "flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-sm font-medium shadow-sm ring-1 ring-black/5 transition-colors",
        props.selected ? "bg-eq-primary text-white" : "bg-eq-card text-eq-text hover:bg-eq-card/80",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        <span
          className={[
            "grid size-5 place-items-center rounded-full border",
            props.selected ? "border-white bg-white/15" : "border-black/20 bg-white/60",
          ].join(" ")}
          aria-hidden="true"
        />
        {props.children}
      </span>
      <ChevronRight className={["size-4 opacity-70", props.selected ? "text-white" : "text-eq-text-muted"].join(" ")} />
    </button>
  );
}

function Illustration() {
  return (
  <div className="rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
    <Image src="/stress-checker.png" alt="stress checker" width={300} height={200} className="w-full object-contain" />
  </div>
  );
}

function calcLevel(step2: string, step3: string, sourcesCount: number) {
  const map2: Record<string, number> = { Never: 10, Rarely: 25, Sometimes: 45, Often: 70, Always: 90 };
  const map3: Record<string, number> = { "Very low": 10, Low: 30, Moderate: 55, High: 75, "Very high": 90 };
  const base = Math.round((map2[step2] + map3[step3]) / 2);
  const extra = Math.min(15, sourcesCount * 3);
  return Math.max(0, Math.min(100, base + extra));
}

export default function StressPage() {
  const router = useRouter();
  const setStress = useEquilibriaStore((s) => s.setStress);
  const [step, setStep] = React.useState<Step>(1);

  const [a2, setA2] = React.useState<string | null>(null);
  const [a3, setA3] = React.useState<string | null>(null);
  const [a4, setA4] = React.useState<string[]>([]);

  const next = () => setStep((s) => (s < 5 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const finish = () => {
    if (!a2 || !a3) return;
    const level = calcLevel(a2, a3, a4.length);
    setStress([{ step2: a2 }, { step3: a3 }, { sources: a4 }], level);
    router.push("/stress/result");
  };

  return (
    <main className="flex flex-col min-h-[844px] bg-eq-bg px-5 py-6 sm:px-5">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => (step === 1 ? router.back() : back())}
          className="inline-flex size-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 hover:bg-white/90"
          aria-label="Back"
        >
          <ArrowLeft className="size-5 text-eq-text" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold text-eq-text">Stress Checker</h1>
        <span className="size-10" aria-hidden="true" />
      </header>

      <Progress step={step} />

      {step === 1 ? (
        <section className="flex flex-col flex-1 space-y-4 mt-4">
          <div className="rounded-[16px] bg-eq-card p-4 shadow-sm ring-1 ring-black/5">
            <Image src="/stress-checker.png" alt="stress illustration" width={300} height={200} className="w-full object-contain" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-semibold text-eq-text">Let's check in with you</h2>
            <p className="text-sm leading-6 text-eq-text-muted">
              This quick check will help you understand how you&apos;re feeling and what might help.
            </p>
          </div>
          <div className="space-y-3 mt-0">
            <button
              type="button"
              onClick={next}
              className="w-full rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90"
            >
              Next
            </button>
            <Link href="/home" className="block text-center text-xs font-medium text-eq-text-muted hover:underline">
              Back
            </Link>
          </div>
        </section>
      ) : null}

      {step === 2 ? (
        <section className="flex flex-col flex-1 space-y-4 mt-4">
          <h2 className="text-sm font-semibold text-eq-text">{q2.question}</h2>
          <div className="space-y-3">
            {q2.options.map((o) => (
              <OptionButton
                key={o}
                selected={a2 === o}
                onClick={() => { setA2(o); next(); }}
              >
                {o}
              </OptionButton>
            ))}
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section className="flex flex-col flex-1 space-y-4 mt-4">
          <h2 className="text-sm font-semibold text-eq-text">{q3.question}</h2>
          <div className="space-y-3">
            {q3.options.map((o) => (
              <OptionButton
                key={o}
                selected={a3 === o}
                onClick={() => { setA3(o); next(); }}
              >
                {o}
              </OptionButton>
            ))}
          </div>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="flex flex-col flex-1 space-y-4 mt-4">
          <h2 className="text-sm font-semibold text-eq-text">{q4.question}</h2>
          <div className="space-y-3">
            {q4.options.map((o) => {
              const selected = a4.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => setA4((prev) => (selected ? prev.filter((x) => x !== o) : [...prev, o]))}
                  className={[
                    "flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-sm font-medium shadow-sm ring-1 ring-black/5 transition-colors",
                    selected ? "bg-eq-primary text-white" : "bg-eq-card text-eq-text hover:bg-eq-card/80",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={[
                        "grid size-5 place-items-center rounded border",
                        selected ? "border-white bg-white/15" : "border-black/20 bg-white/60",
                      ].join(" ")}
                      aria-hidden="true"
                    />
                    {o}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-full rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90"
          >
            Next
          </button>
        </section>
      ) : null}

      {step === 5 ? (
        <section className="flex flex-col flex-1 items-center justify-center space-y-4 text-center">
          <span className="text-5xl">{a3 && ["High", "Very high"].includes(a3) ? "😟" : "😊"}</span>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-eq-text">
              {a3 && ["High", "Very high"].includes(a3) ? "You need some rest" : "You're doing okay"}
            </h2>
            <p className="text-sm leading-6 text-eq-text-muted">
              {a3 && ["High", "Very high"].includes(a3)
                ? "Take a moment to slow down. A small break can help you feel more grounded."
                : "Keep going. Small steps and self-care can make a big difference."}
            </p>
          </div>
          <button
            type="button"
            onClick={finish}
            className="w-full rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90"
            disabled={!a2 || !a3}
          >
            Finish
          </button>
        </section>
      ) : null}
    </main>
  );
}