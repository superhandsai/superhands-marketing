"use client";

import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { LogoMarkPageBackground } from "@/components/logo-mark-background";
import { FooterContent } from "@/components/footer";
import { MarketingHeader } from "@/components/marketing-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 text-center animate-fade-in-up">
      <h1 className="font-space-grotesk text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[110%] tracking-tight mb-6">
        Design review that ships
        <br />
        with the code
      </h1>
      <p className="max-w-2xl mx-auto text-[22px] leading-[140%] text-muted-foreground mb-10">
        See what&apos;s changing in each pull request and make final design edits before merge.
      </p>
      <div className="flex flex-col items-center gap-3">
        <Button
          asChild
          size="lg"
          className="w-[240px] rounded-[14px] px-20 has-[>svg]:px-20 text-base h-12 hover:scale-[0.98]"
        >
          <a href="https://app.superhands.ai/signup" data-hero-cta>
            Request Access
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </a>
        </Button>
      </div>
    </section>
  );
}

function ProductDemoMockup() {
  return (
    <section className="mx-auto max-w-6xl px-6 animate-fade-in-up animation-delay-200">
      <div
        className="w-full rounded-2xl border border-border bg-muted/50 p-2 shadow-xl"
        role="img"
        aria-label="Product demo placeholder"
      >
        <div className="aspect-[16/10] w-full rounded-xl bg-zinc-100 dark:bg-zinc-950/80" />
      </div>
    </section>
  );
}

function PullRequestFlowSection() {
  const flowArrow = (
    <span
      className="text-muted-foreground/60 select-none shrink-0 text-lg md:text-xl leading-none -translate-y-1"
      aria-hidden
    >
      →
    </span>
  );

  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 animate-fade-in-up animation-delay-250">
      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-center mb-12 max-w-3xl mx-auto text-balance">
        Move the design review, upstream, where fixing things is still free.
      </h2>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="rounded-2xl border border-border bg-card px-8 md:px-10 py-12 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-8 text-center">
            Old way
          </p>
          <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-4 text-base md:text-lg font-medium text-center tracking-tight">
            <span>Open</span>
            {flowArrow}
            <span>Merge</span>
            {flowArrow}
            <span>Live</span>
            {flowArrow}
            <span className="inline-flex flex-col items-center gap-1">
              <span
                className="inline-flex items-center justify-center rounded-full bg-muted size-5 md:size-6 shrink-0 text-foreground shadow-sm"
                aria-hidden
              >
                <X className="size-[55%] stroke-[3]" strokeWidth={3} aria-hidden />
              </span>
              <span>Feedback</span>
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-primary/30 bg-primary/5 px-8 md:px-10 py-12 md:py-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-8 text-center">
            New way
          </p>
          <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-4 text-base md:text-lg font-medium text-center tracking-tight">
            <span>Open</span>
            {flowArrow}
            <span className="inline-flex flex-col items-center gap-1">
              <LogoMark
                className="h-5 w-5 md:h-6 md:w-6 shrink-0 logo-invert"
                decorative
              />
              <span>Feedback</span>
            </span>
            {flowArrow}
            <span>Merge</span>
            {flowArrow}
            <span className="inline-flex flex-col items-center gap-1">
              <span
                className="inline-flex items-center justify-center rounded-full bg-primary size-5 md:size-6 shrink-0 text-primary-foreground shadow-sm"
                aria-hidden
              >
                <Check className="size-[55%] stroke-[2.75]" strokeWidth={2.75} aria-hidden />
              </span>
              <span>Live</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <h3 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto text-balance text-center">
          Give your designers
          <br />
          Superhands
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6 text-center text-balance">
          Set up your repo once. Then designers can review every UI change in the PR, refine it in
          Superhands, and approve before merge.
        </p>
        <div className="mt-16 md:mt-20 space-y-20 md:space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center text-left rounded-2xl border border-border bg-card p-6 md:p-8">
            <div
              className="aspect-[4/3] w-full rounded-2xl border border-border bg-muted/40"
              role="img"
              aria-label="Demo placeholder"
            />
            <div>
              <h4 className="font-space-grotesk text-2xl sm:text-3xl font-bold tracking-tight mb-5">
                Demo what&apos;s changing
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                {["Preview changes", "Compare with live"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-base">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center text-left rounded-2xl border border-border bg-card p-6 md:p-8">
            <div
              className="aspect-[4/3] w-full rounded-2xl border border-border bg-muted/40 md:order-2"
              role="img"
              aria-label="Demo placeholder"
            />
            <div className="md:order-1">
              <h4 className="font-space-grotesk text-2xl sm:text-3xl font-bold tracking-tight mb-5">
                Don&apos;t just flag it, fix it
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                {["Inspect UI details", "Edit yourself"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-base">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center text-left rounded-2xl border border-border bg-card p-6 md:p-8">
            <div
              className="aspect-[4/3] w-full rounded-2xl border border-border bg-muted/40"
              role="img"
              aria-label="Demo placeholder"
            />
            <div>
              <h4 className="font-space-grotesk text-2xl sm:text-3xl font-bold tracking-tight mb-5">
                Approve, ship right first time
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                {["Track all updates", "Raise product quality"].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-base">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 border-t border-border animate-fade-in-up animation-delay-300">
      <div className="text-center mb-16">
        <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold tracking-tight max-w-4xl mx-auto text-balance leading-snug mb-6">
          You&apos;re out of the loop. Updates are being shipped. You open the product to find more
          broken windows. More messages and more tickets.
        </h2>
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight">
          Design reviews shouldn&apos;t be a retrospective
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Shipping without you",
            description:
              "Code changes go live every day without a designer seeing them. Not out of carelessness — just because design review was never built into the flow.",
          },
          {
            title: "Too late to fix",
            description:
              "By the time you spot it, it's already in front of your users. Going back means more tickets, conversations, and sprint planning.",
          },
          {
            title: "The bar is rising",
            description:
              "Every time something ships without a design eye on it, quality can drop. The teams that stay ahead are the ones where design stays in the loop.",
          },
        ].map((card) => (
          <div key={card.title} className="flex flex-col">
            <div className="rounded-xl bg-secondary/50 border border-border h-40 mb-5" />
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CatchBeforeShipsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 animate-fade-in-up animation-delay-350">
      <div className="text-center">
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Catch it before it ships
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Move the design review, upstream, where fixing things is still free.
        </p>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 animate-fade-in-up animation-delay-400">
      <div className="text-center mb-16">
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Design-approved, every time
        </h2>
        <p className="text-lg text-muted-foreground">
          Not a builder. Not a Figma plugin. The review layer your design team has always been missing.
        </p>
        <p className="text-lg text-muted-foreground mt-2">
          Your engineer connects the repo once. Then you get:
        </p>
      </div>
      <div className="space-y-20">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl bg-secondary/50 border border-border h-64" />
          <div>
            <h3 className="text-2xl font-semibold mb-3">See what&apos;s changing</h3>
            <p className="text-muted-foreground mb-5">
              Every pull request that touches your UI becomes visible — before it ships.
            </p>
            <ul className="space-y-3">
              {[
                "Tagged by change type so you can prioritise what to review",
                "Plain-language summaries of what changed and where",
                "Live before-and-after previews in the browser",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-3">Don&apos;t just flag it – fix it</h3>
            <p className="text-muted-foreground mb-5">
              Review and refine it yourself before it goes live. The Superhands editor is like
              Lovable for design review — describe what you want to change and watch it happen,
              right in the browser.
            </p>
            <ul className="space-y-3">
              {[
                "Describe changes in plain language — AI turns them into code",
                "See your refinements update in a live preview instantly",
                "Changes go straight into the pull request as a commit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-secondary/50 border border-border h-64 order-1 md:order-2" />
        </div>
      </div>
    </section>
  );
}

function WorkflowComparison() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {/* Before */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Before
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
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
            {["PR merged", "Designer sees it in production", "Slack message", "Rework"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-1">
                  {step}
                  {i < arr.length - 1 && <span className="text-muted-foreground/40">→</span>}
                </span>
              )
            )}
          </div>
        </div>
      </div>
      {/* After */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
          With Superhands
        </p>
        <div className="space-y-3">
          {[
            "PR opened",
            "Designer reviews inside it",
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
          <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
            {[
              "PR opened",
              "Designer reviews inside it",
              "Refines if needed",
              "Ships right",
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-1">
                {step}
                {i < arr.length - 1 && <span className="text-muted-foreground/40">→</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ForEngineersSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 animate-fade-in-up animation-delay-500">
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-4">For engineering teams</p>
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Design review inside the PR.{" "}
          <br className="hidden sm:block" />
          Not scattered across Slack and Figma.
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Connect your repo once. After that, designers have everything they need to review and
          refine UI changes inside the PR — no chasing them on Slack, no feedback arriving after
          things have shipped.
        </p>
      </div>
      <WorkflowComparison />
      <div className="text-center mt-10">
        <Link
          href="/engineer-setup"
          className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
        >
          Learn more
        </Link>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Designers and engineers.{" "}
          <br className="hidden sm:block" />
          Finally on the same cadence.
        </h2>
        <p className="text-muted-foreground mb-8">
          See what&apos;s shipping, start fixing all those broken windows today
        </p>
        <Button
          asChild
          size="lg"
          className="w-[200px] rounded-[14px] px-4 has-[>svg]:px-3 text-base h-12 hover:scale-[0.98] justify-center"
        >
          <a href="https://app.superhands.ai/signup" data-hero-cta>
            Let&apos;s go
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </a>
        </Button>
      </section>
      <div className="w-full border-t border-border bg-background mt-16">
        <FooterContent className="py-6 sm:py-8" />
        <div className="border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 sm:pb-16 text-center">
            <h2 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-bold leading-[110%] tracking-tight mb-6">
              Design review inside the PR. Not scattered across Slack and Figma.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect your repo once. After that, designers can see every UI change and refine it
              themselves in the Superhands editor — no change to how you work.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <div
      className={cn(
        "relative isolate min-h-screen text-foreground",
        "has-[a[data-hero-cta]:hover]:[&_.logo-page-bg]:bg-muted/40",
        "dark:has-[a[data-hero-cta]:hover]:[&_.logo-page-bg]:bg-muted/20",
        "has-[a[data-hero-cta]:hover]:[&_.logo-page-watermark]:brightness-110",
        "dark:has-[a[data-hero-cta]:hover]:[&_.logo-page-watermark]:brightness-125"
      )}
    >
      <LogoMarkPageBackground />
      <div className="relative z-10">
        <MarketingHeader />
        <HeroSection />
        <ProductDemoMockup />
        <PullRequestFlowSection />
        <BottomCTA />
        <ProblemSection />
        <CatchBeforeShipsSection />
        <FeaturesSection />
        <ForEngineersSection />
      </div>
    </div>
  );
}
