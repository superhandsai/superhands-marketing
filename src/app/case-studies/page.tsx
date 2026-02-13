"use client";

import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

// Placeholder case study data
const caseStudies = [
  {
    id: 1,
    company: "TechFlow Inc",
    logo: "🚀",
    tagline: "Accelerated feature development by 3x",
    description: "TechFlow used Superhands to empower their product team to ship features faster without bottlenecking engineering resources.",
    industry: "SaaS",
    metrics: [
      { label: "Development Speed", value: "3x faster" },
      { label: "Team Satisfaction", value: "95%" },
      { label: "Features Shipped", value: "+40/month" },
    ],
  },
  {
    id: 2,
    company: "DesignHub",
    logo: "🎨",
    tagline: "Reduced bug fixing time by 60%",
    description: "DesignHub's product managers can now fix UI bugs and make updates directly in the browser, significantly reducing turnaround time.",
    industry: "Design Tools",
    metrics: [
      { label: "Bug Fix Time", value: "60% faster" },
      { label: "Customer Satisfaction", value: "92%" },
      { label: "Engineering Time Saved", value: "20hrs/week" },
    ],
  },
  {
    id: 3,
    company: "DataViz Pro",
    logo: "📊",
    tagline: "Enabled non-technical team to contribute",
    description: "DataViz Pro empowered their marketing and sales teams to make product updates and experiment with new features without engineering support.",
    industry: "Analytics",
    metrics: [
      { label: "Team Contributors", value: "+12 people" },
      { label: "Experiments Run", value: "50/month" },
      { label: "Engineering Bottleneck", value: "Eliminated" },
    ],
  },
  {
    id: 4,
    company: "CloudScale",
    logo: "☁️",
    tagline: "Shipped MVP in 2 weeks instead of 2 months",
    description: "CloudScale used Superhands to rapidly prototype and iterate on their new product line, dramatically reducing time to market.",
    industry: "Cloud Infrastructure",
    metrics: [
      { label: "Time to Market", value: "75% faster" },
      { label: "Cost Savings", value: "$50K" },
      { label: "Iterations", value: "20+ cycles" },
    ],
  },
  {
    id: 5,
    company: "FinTech Solutions",
    logo: "💰",
    tagline: "Improved customer feedback loop by 10x",
    description: "FinTech Solutions can now test customer requests in real-time and deploy changes within hours instead of weeks.",
    industry: "Financial Services",
    metrics: [
      { label: "Feedback Response", value: "10x faster" },
      { label: "Customer Retention", value: "+15%" },
      { label: "Feature Adoption", value: "88%" },
    ],
  },
  {
    id: 6,
    company: "EduTech Platform",
    logo: "📚",
    tagline: "Scaled product team without hiring",
    description: "EduTech Platform unlocked their entire team's potential by making everyone a contributor, scaling output without increasing headcount.",
    industry: "Education",
    metrics: [
      { label: "Team Productivity", value: "+200%" },
      { label: "Hiring Saved", value: "5 engineers" },
      { label: "Monthly Updates", value: "100+" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-6 pb-20 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-16 animate-fade-in-up">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground tracking-tight">
              Superhands
            </h1>
          </Link>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-10 px-6 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all shadow-sm"
          >
            Login
          </a>
        </div>

        {/* Page Header */}
        <div className="mb-16 animate-fade-in-up">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to home</span>
          </Link>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Success Stories</span>
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Case Studies
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              See how teams across industries are using Superhands to accelerate product development and empower everyone to contribute.
            </p>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="group relative bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/40 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Logo with background */}
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-4xl bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {study.logo}
              </div>

              {/* Industry Tag */}
              <div className="inline-block px-3 py-1 bg-secondary/50 border border-border rounded-full text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                {study.industry}
              </div>

              {/* Company & Tagline */}
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {study.company}
              </h3>
              <p className="text-primary font-semibold mb-4 text-lg leading-snug">
                {study.tagline}
              </p>

              {/* Description */}
              <p className="text-muted-foreground text-base mb-6 leading-relaxed line-clamp-3">
                {study.description}
              </p>

              {/* Metrics */}
              <div className="space-y-3 pt-6 border-t-2 border-border/50">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4">
                    <span className="text-sm text-muted-foreground font-medium">
                      {metric.label}
                    </span>
                    <span className="text-base font-bold text-foreground bg-secondary/30 px-3 py-1 rounded-lg">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Read More Link */}
              <div className="mt-6 pt-6 border-t-2 border-border/50">
                <button className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all uppercase tracking-wide">
                  <span>Read full story</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative text-center bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border-2 border-primary/30 rounded-3xl p-12 sm:p-16 overflow-hidden animate-fade-in-up">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Ready to write your success story?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of teams who are shipping faster and empowering their entire team to contribute.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-14 px-10 text-base bg-primary text-white font-semibold rounded-xl transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(238,96,1,0.4)] hover:scale-105 active:scale-95 shadow-lg"
            >
              Get started with Superhands
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
