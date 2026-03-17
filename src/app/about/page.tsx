import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Superhands",
  description:
    "Learn about the team and mission behind Superhands — empowering product teams to prototype, test, and validate ideas without waiting for engineering.",
};

export default function AboutPage() {
  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-3xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Superhands"
              className="w-10 h-10 mr-3 logo-invert"
            />
            <span className="text-xl font-semibold text-foreground tracking-tight">
              Superhands
            </span>
          </Link>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Login
          </a>
        </div>

        {/* Hero */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/60 mb-4 font-medium">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-6 leading-[1.1]">
            Giving every team member superpowers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Superhands exists to close the gap between having an idea and knowing
            whether it works. We believe the fastest product teams aren&apos;t
            the ones that plan more&nbsp;&mdash; they&apos;re the ones that learn
            faster.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Product managers, designers, and founders shouldn&apos;t have to
              wait weeks for engineering to test a hypothesis. With Superhands,
              anyone on the team can build functional prototypes directly on
              their production codebase&nbsp;&mdash; no local dev environment, no
              coding required.
            </p>
            <p>
              We&apos;re building the fastest path from &ldquo;what if&rdquo; to
              &ldquo;here&apos;s the data.&rdquo; Describe what you want, share
              it with real users, and decide with confidence&nbsp;&mdash; all
              before writing a single engineering ticket.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            What We Believe
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Speed over perfection",
                description:
                  "A rough prototype tested today beats a polished spec reviewed next quarter. Learning compounds.",
              },
              {
                title: "Everyone can build",
                description:
                  "The best ideas come from people closest to the problem. We remove the technical barrier so those ideas get tested.",
              },
              {
                title: "Real code, real feedback",
                description:
                  "Mockups lie. Prototypes on your actual codebase tell you what users will really experience.",
              },
              {
                title: "Kill bad bets early",
                description:
                  "The most valuable thing a team can learn is what not to build. We make that lesson cheap.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="border border-border rounded-xl p-6 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center border border-border rounded-xl p-10 bg-card/50 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to move faster?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join the teams already using Superhands to shorten the loop between
            idea and insight.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-8 text-sm font-medium rounded-md bg-primary text-primary-foreground transition-all hover:bg-primary/90"
          >
            Get Started
          </Link>
        </section>
      </div>
    </div>
  );
}
