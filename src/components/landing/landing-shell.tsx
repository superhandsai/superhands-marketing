import { type ReactNode } from "react";
import { LandingSidebar } from "./landing-sidebar";
import { LandingMobileHeader } from "./landing-mobile-header";

interface LandingShellProps {
  children: ReactNode;
}

export function LandingShell({ children }: LandingShellProps) {
  return (
    <div
      data-landing
      className="relative min-h-screen font-body"
    >
      <LandingMobileHeader />
      <LandingSidebar />

      <main
        className="min-h-screen md:ml-[var(--sidebar-w)]"
      >
        {children}
      </main>
    </div>
  );
}
