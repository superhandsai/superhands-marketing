import "./landing.css";
import { LandingShell } from "@/components/landing/landing-shell";
import { HeroMockup } from "@/components/landing/hero-mockup";
import { ProblemSection } from "@/components/landing/problem-section";
import { SetupFlowSection } from "@/components/landing/setup-flow-section";

export default function HomePage() {
  return (
    <LandingShell>
      <section className="px-6 pt-8 pb-12 md:px-10 md:pt-10 md:pb-16">
        <HeroMockup />
      </section>
      <ProblemSection />
      <SetupFlowSection />
    </LandingShell>
  );
}
