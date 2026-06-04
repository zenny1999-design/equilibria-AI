"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

function LogoMark(props: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" className={props.className ?? "size-28"}>
      <defs>
        <linearGradient id="eq-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5C7A5C" stopOpacity="0.95" />
          <stop offset="1" stopColor="#3D5A3D" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <path
        d="M25 104c18-10 33-9 45 0 11 8 22 8 33 0 12-9 27-10 45 0"
        fill="none"
        stroke="url(#eq-g)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M52 88c-8-10-11-22-8-35 8-33 48-33 56 0 3 13 0 25-8 35"
        fill="none"
        stroke="url(#eq-g)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="80" cy="56" r="10" fill="url(#eq-g)" />
      <path d="M24 98c18 0 30-10 36-24" fill="none" stroke="#5C7A5C" strokeWidth="6" strokeLinecap="round" />
      <path d="M136 98c-18 0-30-10-36-24" fill="none" stroke="#5C7A5C" strokeWidth="6" strokeLinecap="round" />
      <path d="M44 74c-8-10-13-13-20-14 2 12 7 19 20 14Z" fill="#5C7A5C" opacity="0.9" />
      <path d="M116 74c8-10 13-13 20-14-2 12-7 19-20 14Z" fill="#5C7A5C" opacity="0.9" />
    </svg>
  );
}

export default function IntroPage() {
  const router = useRouter();

  React.useEffect(() => {
    const t = window.setTimeout(() => router.replace("/onboarding"), 3000);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <main className="grid min-h-[calc(100dvh-0px)] place-items-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <LogoMark className="size-28" />
          <div className="absolute inset-0 rounded-full bg-white" style={{ animation: "eq-intro-reveal 500ms ease-out both" }} />
        </div>

        <div className="text-center">
          <p
            className="text-2xl font-semibold tracking-[0.26em] text-eq-text"
            style={{ opacity: 0, animation: "eq-intro-fade 500ms ease-out 1s both" }}
          >
            EQUILIBRIA
          </p>
          <p
            className="mt-2 text-sm font-medium text-eq-text-muted"
            style={{ opacity: 0, animation: "eq-intro-fade 500ms ease-out 1.5s both" }}
          >
            Mind · Body · Balance
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes eq-intro-reveal {
          from {
            transform: scaleX(1);
            opacity: 1;
          }
          to {
            transform: scaleX(0);
            opacity: 0;
          }
        }
        @keyframes eq-intro-fade {
          from {
            transform: translateY(6px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}

