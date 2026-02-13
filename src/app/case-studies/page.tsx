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
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <div className="flex items-center">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground">
              Superhands
            </h1>
          </div>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Login
          </a>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </Link>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Case Studies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl">
            See how teams across industries are using Superhands to accelerate product development and empower everyone to contribute.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="group relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1"
            >
              {/* Logo */}
              <div className="text-5xl mb-4">{study.logo}</div>

              {/* Company & Tagline */}
              <h3 className="text-xl font-bold text-foreground mb-2">
                {study.company}
              </h3>
              <p className="text-primary font-medium mb-3">
                {study.tagline}
              </p>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {study.description}
              </p>

              {/* Industry Tag */}
              <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-foreground mb-4">
                {study.industry}
              </div>

              {/* Metrics */}
              <div className="space-y-2 pt-4 border-t border-border">
                {study.metrics.map((metric, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Read More Link */}
              <div className="mt-4 pt-4 border-t border-border">
                <button className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Read full story</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to write your success story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of teams who are shipping faster and empowering their entire team to contribute.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 text-base bg-primary text-white font-medium rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(238,96,1,0.5)] hover:scale-105 active:scale-95"
          >
            Get started with Superhands
          </Link>
        </div>
      </div>
    </div>
  );
}
