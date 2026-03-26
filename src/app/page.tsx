"use client";

import { ArrowRight } from "lucide-react";
import { FeatureCardOldNew } from "@/components/feature-card-old-new";
import { FooterContent } from "@/components/footer";
import { LogoMarkPageBackground } from "@/components/logo-mark-background";
import { MarketingHeader } from "@/components/marketing-header";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 pb-20 text-center animate-fade-in-up">
      <h1 className="font-space-grotesk text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[110%] tracking-tight mb-6">
        Pull requests for
        <br />
        designers
      </h1>
      <p className="max-w-2xl mx-auto text-[22px] leading-[140%] text-muted-foreground mb-10">
        With Superhands, designers can track, review and refine product changes before they ship.
      </p>
      <div className="flex flex-col items-center gap-3">
        <a href="https://app.superhands.ai/signup">
          <Button
            size="lg"
            className="w-[200px] rounded-[14px] px-20 has-[>svg]:px-20 text-base h-12 hover:scale-[0.98]"
          >
            Request Access
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Button>
        </a>
      </div>
    </section>
  );
}

function ProductDemoMockup() {
  return (
    <section className="mx-auto w-full max-w-6xl px-[24px] animate-fade-in-up animation-delay-200">
      <div
        className="mx-auto w-full aspect-[16/9] border-y border-border bg-muted/50 shadow-xl sm:rounded-2xl sm:border sm:p-2"
        role="img"
        aria-label="Product demo placeholder"
      >
        <div className="h-full w-full sm:rounded-xl bg-zinc-100 dark:bg-zinc-950/80" />
      </div>
    </section>
  );
}

function PullRequestFlowSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-28 md:pt-32 pb-24 animate-fade-in-up animation-delay-250">
      <h3 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto text-balance text-center">
        The old way doesn&apos;t cut it anymore
      </h3>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6 mb-20 md:mb-24 text-center text-balance">
        Connect Superhands to your GitHub then bring designers into the same pull request
        workflow.
      </p>
      <div className="space-y-24 md:space-y-28">
        <FeatureCardOldNew
          eyebrow="Track upcoming changes"
          oldWay={{
            title: "Chasing changes when they're already in front of users",
            subtitle: "Slack becomes your source of truth, and finding the real changes takes too long.",
            items: [],
          }}
          newWay={{
            title: "Track all product changes in one place before they go live",
            subtitle:
              "Get full visibility of pull requests without the complexity of GitHub.",
            items: [],
          }}
        />
        <FeatureCardOldNew
          eyebrow="Review product changes"
          oldWay={{
            title: "You can't run the code or test the UI designs",
            subtitle:
              "You have a bunch of staging links and instructions but lack context.",
            items: [],
          }}
          newWay={{
            title: "Instantly demo and inspect the UI in your browser",
            subtitle:
              "Get full context and compare against the live product, without needing an engineer's help.",
            items: [],
          }}
        />
        <FeatureCardOldNew
          eyebrow="Fix and refine"
          oldWay={{
            title: "Amends and fixes pile up. Product quality is dropping.",
            subtitle: "You're having to manage more tickets and conversations, it's tiresome.",
            items: [],
          }}
          newWay={{
            title: "Don't just flag it, fix it",
            subtitle:
              "Fix and refine the product in Superhands without having to write any code or get engineering time.",
            items: [],
          }}
        />
      </div>
    </section>
  );
}

function ForEngineersInlineSection() {
  return (
    <section className="w-full bg-muted py-32 animate-fade-in-up animation-delay-275">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div
          className="mx-auto mb-4 h-20 w-20 rounded-full bg-background/70"
          role="img"
          aria-label="For engineers workflow placeholder"
        />
        <p className="mx-auto inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold tracking-wide text-primary/90">
          For engineers
        </p>
        <h2 className="mt-6 font-space-grotesk text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
          Integrates with your current
          <br />
          GitHub workflow
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Keep your existing pull request process. Superhands adds design approval in the same
          flow, so engineers can see what has been approved before merging.
        </p>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-32 pb-28 text-center">
      <h2 className="font-space-grotesk text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[110%] tracking-tight mb-4">
        Give your team Superhands
      </h2>
      <p className="max-w-2xl mx-auto text-[22px] leading-[140%] text-muted-foreground mb-8">
        See what&apos;s shipping, start fixing all those broken windows today
      </p>
      <a href="https://app.superhands.ai/signup">
        <Button
          size="lg"
          className="w-[200px] rounded-[14px] px-4 has-[>svg]:px-3 text-base h-12 hover:scale-[0.98] justify-center"
        >
          Get Superhands
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Button>
      </a>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative isolate text-foreground">
      <LogoMarkPageBackground />
      <div className="relative z-10 flex flex-col">
        <MarketingHeader />
        <HeroSection />
        <ProductDemoMockup />
        <PullRequestFlowSection />
        <ForEngineersInlineSection />
        <BottomCTA />
        <div
          className="relative z-20 h-36 w-full bg-gradient-to-t from-background via-background/70 to-transparent"
          aria-hidden="true"
        />
        <footer className="relative z-20 w-full border-t border-border bg-background">
          <FooterContent className="py-6 sm:py-8" />
        </footer>
      </div>
    </div>
  );
}
