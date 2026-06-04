"use client";

import * as React from "react";
import { MiniPlayer } from "@/components/MiniPlayer";
import { usePathname, useRouter } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomNav } from "@/components/BottomNav";
import { useEquilibriaStore } from "@/lib/store";

const HIDE_NAV_ON = new Set([
  "/intro",
  "/onboarding",
  "/auth",
]);

const FULL_BLEED_ON = new Set([
  "/intro",
  "/onboarding",
]);

export function AppShell(props: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const userName = useEquilibriaStore(
    (s) => s.userName
  );

  const currentTrack = useEquilibriaStore(
    (s) => s.currentTrack
  );

  const showNav = !HIDE_NAV_ON.has(pathname);
  const fullBleed = FULL_BLEED_ON.has(pathname);

  React.useEffect(() => {
    const isPublicPage =
      HIDE_NAV_ON.has(pathname);

    if (!userName && !isPublicPage) {
      router.replace("/auth");
    } else if (
      userName &&
      pathname === "/auth"
    ) {
      router.replace("/home");
    }
  }, [userName, pathname, router]);

  return (
    <PhoneFrame>
      <div
        className={`flex h-full max-h-full flex-col ${
          fullBleed
            ? "bg-transparent"
            : "bg-eq-bg"
        }`}
      >
        <div
          className={[
            "eq-page flex-1 min-h-0",

            fullBleed
              ? "flex flex-col overflow-hidden px-0 pt-0"
              : "flex flex-col overflow-y-auto px-5 pt-6",

            showNav
              ? "pb-24"
              : fullBleed
              ? "pb-0"
              : "pb-10",
          ].join(" ")}
        >
          {props.children}
        </div>

        {showNav && (
          <div className="sticky bottom-0 z-10">
            {currentTrack && <MiniPlayer />}

            <BottomNav />
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}