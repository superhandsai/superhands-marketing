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
import { LANDING_URLS } from "@/components/landing/constants";

export default function HomePage() {
  return (
    <LandingShell>
      {/* Mobile hero — visible below md breakpoint */}
      <section className="md:hidden px-6 pt-6 pb-20">
        <h1 className="text-[32px] font-semibold leading-[1.1] text-[var(--landing-fg)] font-heading">
          Pull requests for designers
        </h1>
        <p className="mt-2 text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[320px]">
          Review and refine product changes before they ship.
        </p>
        <a
          href={LANDING_URLS.waitlist}
          className="mt-5 hidden items-center justify-center rounded-[14px] border border-[var(--landing-cta-border)] bg-gradient-to-b from-[var(--landing-cta-from)] to-[var(--landing-cta-to)] px-4 py-3 text-base font-semibold leading-[1.44] text-[var(--landing-cta-text)] font-body transition-all hover:opacity-90 hover:shadow-[0_4px_12px_rgba(3,22,28,0.04)]"
        >
          Join Waitlist
        </a>
        <div className="mt-6 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Header.png"
            srcSet="/images/Header.png 1524w, /images/Header@2x.png 3048w"
            sizes="calc(100vw - 48px)"
            alt="Superhands product interface showing design review workflow"
            width={1524}
            height={978}
            className="w-full h-auto"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      {/* Desktop header image — hidden below md */}
      <section className="hidden md:block px-6 pt-8 pb-8 md:px-10 md:pt-10 md:pb-10 max-w-[960px] mx-auto">
        <div className="overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Header.png"
            srcSet="/images/Header.png 1524w, /images/Header@2x.png 3048w"
            sizes="calc(100vw - var(--sidebar-w) - 80px)"
            alt="Superhands product interface showing design review workflow"
            width={1524}
            height={978}
            className="w-full h-auto transition-transform duration-300 ease-out hover:scale-[1.04]"
            fetchPriority="high"
            decoding="async"
          />
        </div>
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
