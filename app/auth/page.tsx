"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useEquilibriaStore } from "@/lib/store";
import Image from "next/image";

function Logo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image src="/logo.png" alt="Equilibria Logo" width={150} height={150} />
      <p className="text-sm font-semibold tracking-[0.28em] text-eq-text">EQUILIBRIA</p>
    </div>
  );
}

function TabButton(props: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={[
        "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition-colors",
        props.active ? "bg-eq-primary text-white" : "bg-eq-card text-eq-text hover:bg-eq-card/80",
      ].join(" ")}
    >
      {props.children}
    </button>
  );
}

function Field(props: {
  label: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  right?: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-medium text-eq-text">{props.label}</span>
      <div className="flex items-center gap-2 rounded-2xl bg-eq-card px-3 py-3 ring-1 ring-black/5 focus-within:ring-eq-primary/30">
        <span className="text-eq-text-muted">{props.icon}</span>
        <input
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          type={props.type ?? "text"}
          className="w-full bg-transparent text-sm text-eq-text outline-none placeholder:text-eq-text-muted"
          placeholder={props.placeholder}
        />
        {props.right}
      </div>
    </label>
  );
}

function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        "w-full rounded-[12px] bg-eq-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-eq-primary/90",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eq-primary/40 disabled:opacity-60",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={[
        "w-full rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-eq-text shadow-sm ring-1 ring-black/10 transition-colors hover:bg-white/90",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eq-primary/40 disabled:opacity-60",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

type Mode = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const setUserName = useEquilibriaStore((s) => s.setUserName);
  const [mode, setMode] = React.useState<Mode>("login");
  const [showPw, setShowPw] = React.useState(false);
  const [userName, setLocalUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(userName || "Luthfi");
    router.push("/home");
  };

  return (
    <main className="min-h-[calc(100dvh-0px)] bg-eq-bg">
      <div className="mx-auto flex max-w-[360px] flex-col gap-6 pb-10 pt-8">
        <Logo />

        <div className="flex gap-2">
          <TabButton active={mode === "login"} onClick={() => setMode("login")}>
            Login
          </TabButton>
          <TabButton active={mode === "register"} onClick={() => setMode("register")}>
            Register
          </TabButton>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <Field
            label="Username"
            icon={<User className="size-5" />}
            value={userName}
            onChange={setLocalUserName}
            placeholder="Enter your username"
          />

          {mode === "register" ? (
            <Field
              label="Email"
              icon={<Mail className="size-5" />}
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              type="email"
            />
          ) : null}

          <Field
            label="Password"
            icon={<Lock className="size-5" />}
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            type={showPw ? "text" : "password"}
            right={
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="rounded-md p-1 text-eq-text-muted hover:text-eq-text"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            }
          />

          {mode === "login" ? (
            <div className="text-right">
              <button type="button" className="text-xs font-medium text-eq-text-muted underline-offset-4 hover:underline">
                Forgot password?
              </button>
            </div>
          ) : null}

          <PrimaryButton type="submit">{mode === "login" ? "Login" : "Register"}</PrimaryButton>

          <div className="relative py-2 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="h-px w-full bg-black/10" />
            </div>
            <span className="relative bg-eq-bg px-3 text-xs text-eq-text-muted">or continue with</span>
          </div>

          <SecondaryButton type="button">
            <span className="inline-flex items-center justify-center gap-2">
              <span className="grid size-5 place-items-center rounded-full bg-[#EA4335] text-[10px] font-bold text-white">G</span>
              Continue with Google
            </span>
          </SecondaryButton>
        </form>
      </div>
    </main>
  );
}

