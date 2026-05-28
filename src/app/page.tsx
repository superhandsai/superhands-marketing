import "./landing.css";
import { LandingShell } from "@/components/landing/landing-shell";
import { ProblemSection } from "@/components/landing/problem-section";
import { SetupFlowSection } from "@/components/landing/setup-flow-section";
import {
  SeeSection,
  ReviewSection,
  FixSection,
} from "@/components/landing/feature-sections";
import { GitHubSection } from "@/components/landing/github-section";
import { CtaSection } from "@/components/landing/cta-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { MobileHeaderSentinel } from "@/components/landing/landing-mobile-header";
import { MobileHeroImage } from "@/components/landing/mobile-hero-image";
import { LANDING_URLS } from "@/components/landing/constants";
import { LogoMark } from "@/components/logo-mark";

export default function HomePage() {
  return (
    <LandingShell>
      {/* Mobile hero — visible below md breakpoint */}
      <section className="md:hidden px-6 pt-6 pb-20">
        <div className="flex items-center gap-2.5 mb-4">
          <LogoMark
            className="h-8 w-[31px] shrink-0"
            decorative
          />
          <span className="text-lg font-medium tracking-[-0.7px] text-[var(--landing-fg)] font-heading-mono">
            Superhands
          </span>
        </div>
        <h1 className="text-[32px] font-semibold leading-[1.1] text-[var(--landing-fg)] font-heading">
          Pull requests for designers
        </h1>
        <p className="mt-2 text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[320px]">
          Review and refine product changes before they ship.
        </p>
        <div className="mt-5 flex items-center gap-5">
          <a
            href={LANDING_URLS.waitlist}
            className="inline-flex items-center justify-center rounded-[14px] border border-[var(--landing-cta-border)] bg-gradient-to-b from-[var(--landing-cta-from)] to-[var(--landing-cta-to)] px-4 py-3 text-base font-semibold leading-[1.44] text-[var(--landing-cta-text)] font-body transition-all hover:opacity-90 hover:shadow-[0_4px_12px_rgba(3,22,28,0.04)]"
          >
            Join Waitlist
          </a>
          <a
            href={LANDING_URLS.viewDemo}
            className="text-sm font-medium text-[var(--landing-fg)] font-body transition-opacity hover:opacity-70"
          >
            View Demo
          </a>
        </div>
        <MobileHeaderSentinel />
        <div className="mt-6">
          <MobileHeroImage />
        </div>
      </section>

      {/* Desktop header image — hidden below md */}
      <section className="hidden md:block px-6 pt-8 pb-8 md:px-10 md:pt-10 md:pb-10 max-w-[960px] mx-auto">
        <MobileHeroImage />
      </section>
      {/* Mobile divider between hero and problem section */}
      <div
        className="md:hidden mx-6"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.5,
        }}
      />
      <ProblemSection />
      <SetupFlowSection />
      <SeeSection />
      <ReviewSection />
      <FixSection />
      <GitHubSection />
      <CtaSection />
      <LandingFooter />
    </LandingShell>
  );
}
