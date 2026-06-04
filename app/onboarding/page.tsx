"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image"; 

const slides = [
  { title: "Welcome to Equilibria", body: "Your mental health companion to help you understand your mind, reduce stress, and find balance in your daily life.", img: "/1.png", cta: "Next" },
  { title: "Track. Reflect. Improve.", body: "Track your mood, write in your journal, and check your progress to build better habits and a healthier you.", img: "/2.png", cta: "Next" },
  { title: "You Matter", body: "Small steps every day bring big changes. We're here to support you every step of the way.", img: "/3.png", cta: "Get Started" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [idx, setIdx] = React.useState(0);
  const startX = React.useRef<number | null>(null);
  const slide = slides[idx];

  const next = () => {
    if (idx < slides.length - 1) setIdx((v) => v + 1);
    else router.push("/auth");
  };

  return (
    <div className="flex flex-col bg-[#3D5A3D] text-white h-full w-full">
      <div className="flex shrink-0 items-center justify-end px-5 pt-7">
        {idx < 2 ? (
          <Link href="/auth" className="text-sm font-medium text-white/90">Skip</Link>
        ) : <span className="h-5 w-12" />}
      </div>

      <div
        className="flex flex-col flex-1 justify-between px-6 pb-6 pt-4"
        style={{ minHeight: 0 }}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) < 42) return;
          if (dx < 0) next();
          else setIdx((v) => Math.max(0, v - 1));
        }}
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="mx-auto grid w-full max-w-[260px] place-items-center rounded-[24px] bg-white/10 p-4">
            <Image src={slide.img} alt={slide.title} width={150} height={150} className="object-contain" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-semibold tracking-tight">{slide.title}</h1>
            <p className="mx-auto max-w-[34ch] text-xs leading-5 text-white/85">{slide.body}</p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <span key={i} className={`size-2 rounded-full border ${i === idx ? 'bg-[#5C7A5C] border-[#5C7A5C]' : 'bg-transparent border-white/40'}`} />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-[#2C2C2C]"
          >
            {slide.cta} <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}