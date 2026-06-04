"use client";
import * as React from "react";

export function PhoneFrame(props: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-screen bg-eq-bg/40 sm:bg-eq-bg/25 flex items-center justify-center sm:py-6 sm:px-4 overflow-hidden">
      <div className="w-full sm:max-w-[390px] h-full sm:h-auto flex items-center justify-center">
        <div
          className="bg-white overflow-hidden shadow-none sm:shadow-[0_28px_90px_rgba(0,0,0,0.15)] sm:ring-1 sm:ring-black/5 w-full h-full sm:h-[844px] sm:max-h-[calc(100vh-48px)] sm:rounded-[40px] flex flex-col"
        >
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}