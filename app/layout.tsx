import "./globals.css";
import type { Metadata } from "next";
import { AppShell } from "./shell";

export const metadata: Metadata = {
  title: "Equilibria (Eq.ai)",
  description: "Mobile-first mental health companion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

