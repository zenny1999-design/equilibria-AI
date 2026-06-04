"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  KeyRound,
  Languages,
  Info,
} from "lucide-react";

function SettingCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
  className="flex w-full items-center gap-4 rounded-[20px] bg-eq-card px-5 py-4 shadow-sm ring-1 ring-black/5"
>
      <div className="flex size-14 items-center justify-center rounded-[16px] bg-white/60">
        {icon}
      </div>

      <div className="flex-1 text-left">
        <p className="text-base font-semibold text-eq-text">
          {title}
        </p>

        <p className="text-sm text-eq-text-muted">
          {description}
        </p>
      </div>

      <ChevronRight className="size-6 text-eq-text-muted" />
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-eq-bg px-6 py-6">
      {/* Header */}
      <header className="mb-8 flex items-center">
        <button
          onClick={() => router.back()}
          className="inline-flex size-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
        >
          <ArrowLeft className="size-6 text-eq-text" />
        </button>

        <h1 className="flex-1 text-center text-2xl font-semibold text-eq-text">
          Settings
        </h1>

        <div className="size-12" />
      </header>

      {/* Menu */}
      <div className="space-y-6">
        <SettingCard
  icon={<KeyRound className="size-8 text-eq-primary" />}
  title="Change Password"
  description="Update your password"
/>

        <SettingCard
  icon={<KeyRound className="size-8 text-eq-primary" />}
  title="Change Password"
  description="Update your password"
/>

        <SettingCard
  icon={<KeyRound className="size-8 text-eq-primary" />}
  title="Change Password"
  description="Update your password"
/>
      </div>
    </main>
  );
}