"use client";

import { Pause, Play, X } from "lucide-react";
import { useEquilibriaStore } from "@/lib/store";

export function MiniPlayer() {
  const currentTrack = useEquilibriaStore(
    (s) => s.currentTrack
  );

  const audio = useEquilibriaStore(
    (s) => s.audio
  );

  const isPlaying = useEquilibriaStore(
    (s) => s.isPlaying
  );

  const setIsPlaying = useEquilibriaStore(
    (s) => s.setIsPlaying
  );

  const clearCurrentTrack = useEquilibriaStore(
    (s) => s.clearCurrentTrack
  );

  if (!currentTrack) return null;

  return (
    <div className="relative z-50 px-5 pb-2">
      <div className="mx-auto flex w-full items-center gap-3 rounded-3xl bg-eq-card px-4 py-3 shadow-lg ring-1 ring-black/5">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/10 text-2xl">
          {currentTrack.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {currentTrack.title}
          </p>

          <p className="truncate text-xs text-eq-text-muted">
            {currentTrack.artist}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!audio) return;

            if (isPlaying) {
              audio.pause();
              setIsPlaying(false);
            } else {
              audio.play();
              setIsPlaying(true);
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-eq-primary text-white"
        >
          {isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} />
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            audio?.pause();
            clearCurrentTrack();
          }}
          className="flex h-8 w-8 items-center justify-center"
        >
          <X size={18} />
        </button>

      </div>
    </div>
  );
}