"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MarketingHeader } from "@/components/marketing-header";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center animate-fade-in-up">
      <p className="text-sm font-medium text-muted-foreground mb-6">For engineering teams</p>
      <h1 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-bold leading-[110%] tracking-tight mb-6">
        Design review inside the PR.{" "}
        <br className="hidden sm:block" />
        Not scattered across Slack and Figma.
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
        Connect your repo once. After that, designers can see every UI change and refine it
        themselves in the Superhands editor — no change to how you work.
      </p>
      <div className="flex flex-col items-center gap-3">
        <a href="https://app.superhands.ai/signup">
          <Button size="lg" className="group rounded-md px-8 text-base h-12">
            Request Access
            <ArrowRight
              className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </a>
        <p className="text-xs text-muted-foreground">
          Takes about 5 minutes · No changes to your codebase
        </p>
      </div>
    </section>
  );
}

function TwoColumnSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 animate-fade-in-up animation-delay-200">
      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">
        You connect it. Designers take it from there.
      </h2>
      <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Give your designers full visibility to what&apos;s shipping and the tools to refine it
        before it goes live so you avoid feedback when it&apos;s too late.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* What we need */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold mb-5">What Superhands needs from you</h3>
          <ul className="space-y-4">
            {[
              "Read access to pull requests",
              "Write access to PR comments",
              "Environment variables to run live previews",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* What designers get */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h3 className="text-lg font-semibold mb-5">What your design team gets</h3>
          <ul className="space-y-4">
            {[
              "Every design change, visible and reviewable",
              "Before and after comparisons in the browser",
              "The Superhands editor — they refine the design themselves, no tickets back to you",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 animate-fade-in-up animation-delay-300">
      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-center mb-4">
        Catch it before it ships
      </h2>
      <p className="text-lg text-muted-foreground text-center mb-12">
        Move design review upstream — where fixing things is still free.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
        {/* Before */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Before: guessing
          </p>
          <div className="space-y-3">
            {["PR merged", "Designer sees it in production", "Slack message", "Rework"].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-[10px] text-muted-foreground font-medium shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              )
            )}
          </div>
        </div>
        {/* After */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
            After: no surprises
          </p>
          <div className="space-y-3">
            {[
              "PR opened",
              "Reviewed in Superhands",
              "Refines if needed",
              "Ships right",
            ].map((step, i) => (
              <div key={step} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-medium shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center">
        <a href="https://app.superhands.ai/signup">
          <Button size="lg" className="group rounded-md px-8 text-base h-12">
            Request Access
            <ArrowRight
              className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Button>
        </a>
      </div>
    </section>
  );
}

function ThreeStepsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 animate-fade-in-up animation-delay-400">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-4">How it works</p>
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Three steps. Then design review is built into every PR.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
        {[
          {
            step: "1",
            title: "Connect your GitHub",
            description: "Link your repository once. Superhands takes it from there.",
          },
          {
            step: "2",
            title: "Add environment variables",
            description:
              "Paste your .env so Superhands can run live previews of each branch in the cloud.",
          },
          {
            step: "3",
            title: "Invite your design team",
            description:
              "Share an invite link. They can start reviewing and refining immediately.",
          },
        ].map((item) => (
          <div key={item.step} className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-5">
              {item.step}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Designers and engineers.{" "}
        <br className="hidden sm:block" />
        Finally on the same cadence.
      </h2>
      <p className="text-muted-foreground mb-8">
        Set up once. Your designers handle the rest. Your PRs move faster.
      </p>
      <a href="https://app.superhands.ai/signup">
        <Button size="lg" className="rounded-md px-8 text-base h-12">
          Let&apos;s go
        </Button>
      </a>
    </section>
  );
}

export default function EngineerSetupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingHeader
        trailingNav={
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex"
          >
            For Designers
          </Link>
        }
      />
      <HeroSection />
      <TwoColumnSection />
      <WorkflowSection />
      <ThreeStepsSection />
      <BottomCTA />
    </div>
  );
}
