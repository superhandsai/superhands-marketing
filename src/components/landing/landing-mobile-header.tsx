import { LogoMark } from "@/components/logo-mark";
import { LANDING_URLS } from "./constants";

export function LandingMobileHeader() {
  return (
    <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-5 py-3 bg-[var(--landing-bg)]/95 backdrop-blur-sm border-b border-[var(--landing-divider)]/10">
      <div className="flex items-center gap-2">
        <LogoMark
          className="h-7 w-[27px] shrink-0"
          decorative
        />
        <span
          className="text-base font-medium tracking-[-0.36px] text-[var(--landing-fg)] font-heading"
        >
          Superhands
        </span>
      </div>
      <a
        href={LANDING_URLS.waitlist}
        className="inline-flex items-center justify-center rounded-[14px] border border-[var(--landing-cta-border)] bg-gradient-to-b from-[var(--landing-cta-from)] to-[var(--landing-cta-to)] px-4 py-2 text-sm font-semibold leading-[1.44] text-[var(--landing-cta-text)] font-body transition-opacity hover:opacity-90"
      >
        Join the Waitlist
      </a>
    </header>
  );
}
