"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="w-full border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Superhands" className="w-8 h-8 logo-invert" />
            <span className="text-lg font-semibold tracking-tight">Superhands</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/engineer-setup"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex"
          >
            For Engineers
          </Link>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Log in
          </a>
          <a href="https://app.superhands.ai/signup">
            <Button size="sm" className="rounded-md">
              Get started
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-16 text-center animate-fade-in-up">
      <p className="text-sm font-medium text-muted-foreground mb-6">
        Design review for the AI era
      </p>
      <h1 className="font-space-grotesk text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
        Design review that lives{" "}
        <br className="hidden sm:block" />
        where the code does
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
        GitHub shows engineers what code changed. Superhands shows designers what it looks like,
        how it feels — and lets them refine it before it goes live.
      </p>
      <div className="flex flex-col items-center gap-3">
        <a href="https://app.superhands.ai/signup">
          <Button size="lg" className="rounded-md px-8 text-base h-12">
            Get started
          </Button>
        </a>
        <p className="text-xs text-muted-foreground">
          No credit card required · Connect your repo in minutes
        </p>
      </div>
    </section>
  );
}

function PRTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${className ?? "bg-secondary text-secondary-foreground"}`}
    >
      {children}
    </span>
  );
}

function ProductDemoMockup() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 animate-fade-in-up animation-delay-200">
      <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
        {/* Top: two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
          {/* Left panel — PR list */}
          <div className="border-b lg:border-b-0 lg:border-r border-border bg-card">
            {/* Sidebar header */}
            <div className="px-4 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2 mb-3">
                <img src="/logo.svg" alt="" className="w-5 h-5 logo-invert" />
                <span className="text-sm font-semibold">Superhands</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span>acme/web-app</span>
                <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-[10px] font-semibold">
                  JS
                </span>
              </div>
            </div>
            {/* PR list header */}
            <div className="px-4 pt-4 pb-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold">Pull Requests</h3>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">acme/web-app</span>
                <button className="text-[11px] font-medium text-primary flex items-center gap-1">
                  <span>+</span>Start a change
                </button>
              </div>
              <div className="flex gap-1 mb-3">
                {["All", "Needs Review", "Reviewed"].map((tab, i) => (
                  <span
                    key={tab}
                    className={`text-[11px] px-2.5 py-1 rounded-md font-medium ${i === 0 ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>
            {/* PR items */}
            <div className="divide-y divide-border">
              {[
                {
                  title: "Redesign checkout flow for mobile",
                  tags: ["User flow & journey", "Interactive elements"],
                  author: "MC",
                  time: "4d",
                  files: 12,
                  active: true,
                },
                {
                  title: "Fix mobile nav menu overlap",
                  tags: ["Layout & spacing", "Visual style"],
                  author: "SP",
                  time: "2d",
                  files: 4,
                },
                {
                  title: "Update onboarding welcome copy",
                  tags: ["Copy & content"],
                  author: "JL",
                  time: "1d",
                  files: 2,
                },
                {
                  title: "Add profile settings page",
                  tags: ["Component changes"],
                  author: "NP",
                  time: "3d",
                  files: 9,
                  isNew: true,
                },
              ].map((pr) => (
                <div
                  key={pr.title}
                  className={`px-4 py-3 cursor-default ${pr.active ? "bg-secondary/60" : "hover:bg-secondary/30"}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className="text-sm font-medium leading-snug">{pr.title}</p>
                    {pr.isNew && (
                      <span className="shrink-0 text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-500/15 px-1.5 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {pr.tags.map((tag) => (
                      <PRTag key={tag}>{tag}</PRTag>
                    ))}
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {pr.author} · {pr.time} · {pr.files} files
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel — PR detail */}
          <div className="bg-card">
            {/* Preview bar */}
            <div className="px-5 pt-4 pb-3 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex rounded-md overflow-hidden border border-border text-[11px] font-medium">
                  <span className="px-3 py-1 bg-secondary text-foreground">Before</span>
                  <span className="px-3 py-1 bg-primary text-primary-foreground">New</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">feat/checkout-redesign</span>
              </div>
              {/* Mock browser preview */}
              <div className="rounded-lg border border-border bg-background overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 border-b border-border">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono ml-2">preview.superhands.dev</span>
                </div>
                <div className="p-6 flex flex-col items-center gap-3">
                  <div className="w-full max-w-[200px] h-8 rounded-md border border-border bg-secondary/30 flex items-center px-3">
                    <span className="text-[11px] text-muted-foreground">autocomplete</span>
                  </div>
                  <div className="px-6 py-2 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                    Complete order
                  </div>
                </div>
              </div>
            </div>

            {/* PR detail content */}
            <div className="px-5 py-4">
              <h3 className="text-base font-semibold mb-1">Redesign checkout flow</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  feat/checkout-redesign
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-semibold">
                  MC
                </div>
                <div>
                  <p className="text-sm font-medium">Marcus Chen</p>
                  <p className="text-[11px] text-muted-foreground">4 days ago</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  What changed
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Checkout restructured to single page. Address autocomplete added. Fields stacked on mobile.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                <PRTag>User flow &amp; journey</PRTag>
                <PRTag>Interactive elements</PRTag>
                <PRTag>Layout &amp; spacing</PRTag>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                <button className="text-xs font-medium px-3 py-1.5 rounded-md border border-border hover:bg-secondary transition-colors">
                  ✏ Edit in Superhands
                </button>
                <button className="text-xs font-medium px-3 py-1.5 rounded-md bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20">
                  ✓ Looks good
                </button>
                <button className="text-xs font-medium px-3 py-1.5 rounded-md bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  ⚑ Flag changes
                </button>
              </div>
              {/* File list */}
              <div>
                <p className="text-xs font-semibold mb-2">Files</p>
                <div className="text-[12px] font-mono text-muted-foreground space-y-0.5">
                  <p className="font-medium text-foreground">src/components/</p>
                  <p className="pl-4">CheckoutForm.tsx</p>
                  <p className="pl-4">AddressInput.tsx</p>
                  <p className="pl-4">OrderSummary.tsx</p>
                  <p className="font-medium text-foreground mt-1.5">src/styles/</p>
                  <p className="pl-4">checkout.module.css</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom editor bar */}
        <div className="border-t border-border bg-card">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">
            {/* Left: mini preview */}
            <div className="border-b lg:border-b-0 lg:border-r border-border p-4">
              <span className="text-[11px] font-mono text-muted-foreground mb-2 block">feat/checkout-redesign</span>
              <div className="rounded-lg border border-border bg-background p-4 flex justify-center">
                <div className="px-5 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium">
                  Complete order
                </div>
              </div>
            </div>
            {/* Right: editor */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <img src="/logo.svg" alt="" className="w-4 h-4 logo-invert" />
                <span className="text-xs font-semibold">Superhands</span>
              </div>
              <p className="text-sm font-medium mb-2">Describe what you want to change</p>
              <div className="rounded-lg border border-border bg-secondary/30 px-4 py-3 mb-3">
                <p className="text-sm text-muted-foreground">Describe a change...</p>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Raise PR — you&apos;re done here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 animate-fade-in-up animation-delay-300">
      <div className="text-center mb-16">
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Design reviews shouldn&apos;t be a retrospective
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Great design teams shouldn&apos;t find out what shipped by opening the product. But for
          most teams, that&apos;s exactly what happens.
        </p>
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

function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 animate-fade-in-up animation-delay-400">
      <div className="text-center mb-16">
        <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Design reviews for every product update before it&apos;s live
        </h2>
        <p className="text-lg text-muted-foreground">
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
            <h3 className="text-2xl font-semibold mb-3">Review and refine</h3>
            <p className="text-muted-foreground mb-5">
              Don&apos;t just flag it — fix it. The Superhands editor is like Lovable for
              design review — describe what you want to change and watch it happen, right in
              the browser.
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
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Designers and engineers.{" "}
        <br className="hidden sm:block" />
        Finally on the same cadence.
      </h2>
      <p className="text-muted-foreground mb-8">Start seeing what&apos;s shipping.</p>
      <a href="https://app.superhands.ai/signup">
        <Button size="lg" className="rounded-md px-8 text-base h-12">
          Get started
        </Button>
      </a>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <ProductDemoMockup />
      <ProblemSection />
      <FeaturesSection />
      <ForEngineersSection />
      <BottomCTA />
    </div>
  );
}
