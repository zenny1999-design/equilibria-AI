"use client";

import * as React from "react";

export type MoodOption = {
  key: string;
  emoji: string;
  label: string;
};

export function MoodEmoji(props: {
  option: MoodOption;
  selected?: boolean;
  onSelect?: (key: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => props.onSelect?.(props.option.key)}
      className={[
        "flex w-full flex-col items-center gap-2 rounded-2xl px-2 py-3 transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eq-primary/40",
        props.selected ? "bg-eq-primary/15" : "bg-eq-card hover:bg-eq-card/80",
      ].join(" ")}
      aria-pressed={props.selected}
    >
      <span className={["grid size-12 place-items-center rounded-full text-2xl", props.selected ? "bg-eq-primary text-white" : "bg-white"].join(" ")}>
        {props.option.emoji}
      </span>
      <span className="text-[11px] text-eq-text">{props.option.label}</span>
    </button>
  );
}

