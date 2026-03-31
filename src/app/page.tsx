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
import { LandingFooter } from "@/components/landing/landing-footer";

export default function HomePage() {
  return (
    <LandingShell>
      <section className="px-6 pt-8 pb-10 md:px-10 md:pt-10 md:pb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Header.png"
          srcSet="/images/Header.png 1524w, /images/Header@2x.png 3048w"
          sizes="(min-width: 768px) calc(100vw - var(--sidebar-w) - 80px), calc(100vw - 48px)"
          alt="Superhands product interface showing design review workflow"
          width={1524}
          height={978}
          className="w-full h-auto"
          fetchPriority="high"
          decoding="async"
        />
      </section>
      <ProblemSection />
      <SetupFlowSection />
      <SeeSection />
      <ReviewSection />
      <FixSection />
      <GitHubSection />
      <LandingFooter />
    </LandingShell>
  );
}
