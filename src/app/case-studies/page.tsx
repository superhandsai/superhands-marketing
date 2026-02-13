"use client";

import { ArrowLeft, ExternalLink, TrendingUp, Users, Zap } from "lucide-react";
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
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    metrics: [
      { label: "Development Speed", value: "3x faster", icon: Zap },
      { label: "Team Satisfaction", value: "95%", icon: Users },
      { label: "Features Shipped", value: "+40/month", icon: TrendingUp },
    ],
  },
  {
    id: 2,
    company: "DesignHub",
    logo: "🎨",
    tagline: "Reduced bug fixing time by 60%",
    description: "DesignHub's product managers can now fix UI bugs and make updates directly in the browser, significantly reducing turnaround time.",
    industry: "Design Tools",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    metrics: [
      { label: "Bug Fix Time", value: "60% faster", icon: Zap },
      { label: "Customer Satisfaction", value: "92%", icon: Users },
      { label: "Engineering Time Saved", value: "20hrs/week", icon: TrendingUp },
    ],
  },
  {
    id: 3,
    company: "DataViz Pro",
    logo: "📊",
    tagline: "Enabled non-technical team to contribute",
    description: "DataViz Pro empowered their marketing and sales teams to make product updates and experiment with new features without engineering support.",
    industry: "Analytics",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    metrics: [
      { label: "Team Contributors", value: "+12 people", icon: Users },
      { label: "Experiments Run", value: "50/month", icon: TrendingUp },
      { label: "Engineering Bottleneck", value: "Eliminated", icon: Zap },
    ],
  },
  {
    id: 4,
    company: "CloudScale",
    logo: "☁️",
    tagline: "Shipped MVP in 2 weeks instead of 2 months",
    description: "CloudScale used Superhands to rapidly prototype and iterate on their new product line, dramatically reducing time to market.",
    industry: "Cloud Infrastructure",
    color: "from-sky-500/20 to-blue-500/20",
    borderColor: "border-sky-500/30",
    metrics: [
      { label: "Time to Market", value: "75% faster", icon: Zap },
      { label: "Cost Savings", value: "$50K", icon: TrendingUp },
      { label: "Iterations", value: "20+ cycles", icon: TrendingUp },
    ],
  },
  {
    id: 5,
    company: "FinTech Solutions",
    logo: "💰",
    tagline: "Improved customer feedback loop by 10x",
    description: "FinTech Solutions can now test customer requests in real-time and deploy changes within hours instead of weeks.",
    industry: "Financial Services",
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-500/30",
    metrics: [
      { label: "Feedback Response", value: "10x faster", icon: Zap },
      { label: "Customer Retention", value: "+15%", icon: Users },
      { label: "Feature Adoption", value: "88%", icon: TrendingUp },
    ],
  },
  {
    id: 6,
    company: "EduTech Platform",
    logo: "📚",
    tagline: "Scaled product team without hiring",
    description: "EduTech Platform unlocked their entire team's potential by making everyone a contributor, scaling output without increasing headcount.",
    industry: "Education",
    color: "from-indigo-500/20 to-purple-500/20",
    borderColor: "border-indigo-500/30",
    metrics: [
      { label: "Team Productivity", value: "+200%", icon: TrendingUp },
      { label: "Hiring Saved", value: "5 engineers", icon: Users },
      { label: "Monthly Updates", value: "100+", icon: Zap },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-20 sm:px-6 lg:px-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-20 animate-fade-in-up backdrop-blur-sm bg-background/30 rounded-2xl p-4 border border-border/50 shadow-lg">
          <Link href="/" className="flex items-center hover:opacity-80 transition-all hover:scale-105">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md" />
              <img
                src="/icon.png"
                alt="Superhands"
                className="w-12 h-12 mr-3 relative z-10"
              />
            </div>
            <h1 className="text-2xl font-bold uppercase text-foreground tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Superhands
            </h1>
          </Link>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-11 px-7 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:shadow-lg hover:shadow-secondary/50 hover:scale-105 transition-all duration-300 shadow-md"
          >
            Login
          </a>
        </div>

        {/* Page Header */}
        <div className="mb-20 animate-fade-in-up text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all mb-10 group backdrop-blur-sm bg-background/50 px-4 py-2 rounded-full border border-border/50 hover:border-primary/30 hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
            <span className="text-sm font-semibold">Back to home</span>
          </Link>

          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Success Stories</span>
            </div>
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-foreground leading-tight bg-gradient-to-br from-foreground via-foreground to-primary/70 bg-clip-text text-transparent">
              Case Studies
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              See how teams across industries are using Superhands to <span className="text-primary font-semibold">accelerate product development</span> and empower everyone to contribute.
            </p>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-24">
          {caseStudies.map((study, index) => {
            return (
              <div
                key={study.id}
                className={`group relative bg-gradient-to-br ${study.color} backdrop-blur-xl border-2 ${study.borderColor} rounded-3xl p-10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3 hover:scale-[1.02] animate-fade-in-up overflow-hidden`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                {/* Logo with enhanced background */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative flex items-center justify-center w-20 h-20 text-5xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    {study.logo}
                  </div>
                </div>

                {/* Industry Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-background/50 backdrop-blur-sm border border-border rounded-full text-xs font-bold text-foreground uppercase tracking-widest mb-5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                  {study.industry}
                </div>

                {/* Company & Tagline */}
                <h3 className="text-3xl font-extrabold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                  {study.company}
                </h3>
                <p className="text-primary font-bold mb-5 text-xl leading-snug">
                  {study.tagline}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-base mb-8 leading-relaxed line-clamp-3">
                  {study.description}
                </p>

                {/* Metrics with icons */}
                <div className="space-y-4 pt-7 border-t-2 border-border/30">
                  {study.metrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <div key={idx} className="flex justify-between items-center gap-4 group/metric">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-primary group-hover/metric:scale-110 transition-transform" />
                          <span className="text-sm text-muted-foreground font-semibold">
                            {metric.label}
                          </span>
                        </div>
                        <span className="text-base font-extrabold text-foreground bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-1.5 rounded-xl shadow-sm border border-primary/20 group-hover/metric:scale-105 transition-transform">
                          {metric.value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Read More Link */}
                <div className="mt-8 pt-7 border-t-2 border-border/30">
                  <button className="inline-flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-4 transition-all uppercase tracking-widest group-hover:text-primary/80">
                    <span>Read full story</span>
                    <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>

                {/* Enhanced Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="relative text-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-2 border-primary/40 rounded-[2rem] p-16 sm:p-20 overflow-hidden animate-fade-in-up shadow-2xl backdrop-blur-sm">
          {/* Animated background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/20 backdrop-blur-sm border border-primary/40 rounded-full mb-8 shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-75" />
              <div className="w-2 h-2 bg-primary rounded-full animate-ping delay-150" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground mb-8 leading-tight">
              Ready to write your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                success story?
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Join hundreds of teams who are <span className="text-primary font-semibold">shipping faster</span> and empowering their entire team to contribute.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center h-16 px-12 text-lg bg-gradient-to-r from-primary to-primary/90 text-white font-bold rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(238,96,1,0.5)] hover:scale-110 active:scale-95 shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative">Get started with Superhands</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 h-16 px-10 text-lg border-2 border-border hover:border-primary/50 bg-background/50 backdrop-blur-sm text-foreground font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span>View all features</span>
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">500+ teams</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">10,000+ features shipped</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold">3x faster development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
