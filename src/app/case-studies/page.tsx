import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies - Superhands",
  description: "See how product teams use Superhands to move faster, validate smarter, and ship with confidence.",
};

const caseStudies = [
  {
    company: "Fintech Startup",
    industry: "Financial Services",
    title: "Validated a new onboarding flow in 3 days instead of 3 sprints",
    challenge:
      "The product team needed to test a simplified onboarding experience but engineering was booked for the next two quarters.",
    result:
      "Built and shared a working prototype with 50 beta users in under a week. User completion rates jumped 40%, giving the team the data they needed to prioritize the feature.",
    metric: "40%",
    metricLabel: "Increase in onboarding completion",
  },
  {
    company: "E-Commerce Platform",
    industry: "Retail",
    title: "Killed a $200K feature before writing a single line of production code",
    challenge:
      "Leadership was pushing for a complex product comparison tool. The PM suspected users wouldn't use it but had no way to prove it.",
    result:
      "Prototyped the feature on their live product in two days. User testing revealed that only 3% of visitors engaged with it. The team redirected budget to higher-impact work.",
    metric: "$200K",
    metricLabel: "Saved in engineering costs",
  },
  {
    company: "SaaS Company",
    industry: "B2B Software",
    title: "Shipped a pricing page redesign with 25% more conversions",
    challenge:
      "The growth team had five different pricing page concepts but no way to quickly test which one resonated with customers.",
    result:
      "Built all five variations as functional prototypes and ran A/B tests with real traffic. The winning design drove a 25% lift in plan upgrades.",
    metric: "25%",
    metricLabel: "Lift in conversions",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background relative">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Superhands"
              className="w-10 h-10 mr-3 logo-invert"
            />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Superhands
            </h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Case Studies
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <a
              href="https://app.superhands.ai/login"
              className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
            >
              Login
            </a>
          </nav>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Page heading */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 mb-4 font-medium animate-fade-in-up animation-delay-100">
            Case Studies
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6 animate-fade-in-up animation-delay-200">
            Real Teams, Real Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            See how product teams use Superhands to move faster, validate
            smarter, and ship with confidence.
          </p>
        </div>

        {/* Case studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.company}
              className="border border-border rounded-xl bg-card/50 backdrop-blur-sm p-8 sm:p-10 animate-fade-in-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Metric */}
                <div className="lg:w-48 flex-shrink-0 flex flex-col items-center lg:items-start justify-center">
                  <span className="text-5xl sm:text-6xl font-black text-foreground leading-none">
                    {study.metric}
                  </span>
                  <span className="text-sm text-muted-foreground mt-2 text-center lg:text-left">
                    {study.metricLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
                      {study.industry}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 font-medium">
                      {study.company}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-tight">
                    {study.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <span className="font-medium text-foreground/80">
                      Challenge:
                    </span>{" "}
                    {study.challenge}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground/80">
                      Result:
                    </span>{" "}
                    {study.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-600">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to move faster?
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 h-12 px-8 text-base bg-primary text-primary-foreground font-medium rounded-[8px] transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Get started
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
