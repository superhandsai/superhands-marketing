"use client";

import { ArrowLeft, ExternalLink, TrendingUp, Users, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Placeholder case study data - restructured for editorial layout
const caseStudies = [
  {
    id: 1,
    company: "TechFlow Inc",
    logo: "🚀",
    tagline: "Accelerated feature development by 3x",
    description: "TechFlow used Superhands to empower their product team to ship features faster without bottlenecking engineering resources.",
    industry: "SaaS",
    featured: true,
    quote: "We went from shipping 10 features a month to 40. Game changer.",
    author: "Sarah Chen, VP Product",
    metrics: [
      { label: "Development Speed", value: "3x", unit: "faster" },
      { label: "Team Satisfaction", value: "95", unit: "%" },
      { label: "Features Shipped", value: "+40", unit: "/month" },
    ],
  },
  {
    id: 2,
    company: "DesignHub",
    logo: "🎨",
    tagline: "Reduced bug fixing time by 60%",
    description: "DesignHub's product managers can now fix UI bugs and make updates directly in the browser, significantly reducing turnaround time.",
    industry: "Design Tools",
    quote: "Our designers became contributors overnight.",
    author: "Marcus Lee, Co-founder",
    metrics: [
      { label: "Bug Fix Time", value: "60", unit: "% faster" },
      { label: "Customer Satisfaction", value: "92", unit: "%" },
      { label: "Engineering Time Saved", value: "20", unit: "hrs/wk" },
    ],
  },
  {
    id: 3,
    company: "DataViz Pro",
    logo: "📊",
    tagline: "Enabled non-technical team to contribute",
    description: "DataViz Pro empowered their marketing and sales teams to make product updates and experiment with new features without engineering support.",
    industry: "Analytics",
    quote: "Everyone on our team is now a builder.",
    author: "Priya Patel, CEO",
    metrics: [
      { label: "Team Contributors", value: "+12", unit: "people" },
      { label: "Experiments Run", value: "50", unit: "/month" },
      { label: "Engineering Bottleneck", value: "0", unit: "%" },
    ],
  },
  {
    id: 4,
    company: "CloudScale",
    logo: "☁️",
    tagline: "Shipped MVP in 2 weeks instead of 2 months",
    description: "CloudScale used Superhands to rapidly prototype and iterate on their new product line, dramatically reducing time to market.",
    industry: "Cloud Infrastructure",
    quote: "Speed to market became our competitive advantage.",
    author: "Alex Rivera, CTO",
    metrics: [
      { label: "Time to Market", value: "75", unit: "% faster" },
      { label: "Cost Savings", value: "$50", unit: "K" },
      { label: "Iterations", value: "20", unit: "+ cycles" },
    ],
  },
  {
    id: 5,
    company: "FinTech Solutions",
    logo: "💰",
    tagline: "Improved customer feedback loop by 10x",
    description: "FinTech Solutions can now test customer requests in real-time and deploy changes within hours instead of weeks.",
    industry: "Financial Services",
    quote: "We listen to customers in real-time now.",
    author: "Jamie Foster, Head of Product",
    metrics: [
      { label: "Feedback Response", value: "10x", unit: "faster" },
      { label: "Customer Retention", value: "+15", unit: "%" },
      { label: "Feature Adoption", value: "88", unit: "%" },
    ],
  },
  {
    id: 6,
    company: "EduTech Platform",
    logo: "📚",
    tagline: "Scaled product team without hiring",
    description: "EduTech Platform unlocked their entire team's potential by making everyone a contributor, scaling output without increasing headcount.",
    industry: "Education",
    quote: "We 10x'd our output without hiring anyone.",
    author: "Dr. Kim Nguyen, Founder",
    metrics: [
      { label: "Team Productivity", value: "+200", unit: "%" },
      { label: "Hiring Saved", value: "5", unit: "engineers" },
      { label: "Monthly Updates", value: "100", unit: "+" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');

        .font-display {
          font-family: 'Archivo Black', sans-serif;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }

        .font-body {
          font-family: 'DM Sans', sans-serif;
        }

        /* Grain texture overlay */
        .grain::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          mix-blend-mode: overlay;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        ::-webkit-scrollbar-thumb {
          background: #ee6001;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ff8232;
        }

        /* Stagger animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }

        /* Diagonal lines decoration */
        .diagonal-lines {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(238, 96, 1, 0.03) 2px,
            rgba(238, 96, 1, 0.03) 4px
          );
        }
      `}</style>

      <div className="grain" />

      {/* Navigation Header - Minimalist */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 transition-transform group-hover:scale-110"
            />
            <span className="font-display text-lg tracking-wider group-hover:text-[#ee6001] transition-colors">
              Superhands
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <a
              href="https://app.superhands.ai/login"
              className="px-6 py-2.5 bg-white text-black text-sm font-body font-semibold hover:bg-[#ee6001] hover:text-white transition-all duration-300 uppercase tracking-wide"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Brutalist Editorial */}
      <section className="pt-40 pb-20 px-6 sm:px-12 max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          {/* Left column - Massive title */}
          <div className="lg:col-span-7 animate-slide-up">
            <div className="mb-8">
              <span className="inline-block px-4 py-1 bg-[#ee6001] text-black text-xs font-body font-bold tracking-widest uppercase mb-6">
                Success Stories
              </span>
            </div>
            <h1 className="font-display text-[clamp(3rem,12vw,11rem)] leading-[0.85] mb-8">
              CASE
              <br />
              STU
              <br />
              DIES
            </h1>
            <div className="h-1 w-32 bg-[#ee6001] mb-8" />
          </div>

          {/* Right column - Description */}
          <div className="lg:col-span-5 animate-slide-up delay-200">
            <p className="font-body text-xl sm:text-2xl text-white/70 leading-relaxed mb-8">
              Real teams. Real results. See how companies are <span className="text-[#ee6001] font-semibold">shipping 3x faster</span> and empowering everyone to build.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50 font-body">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ee6001] animate-pulse" />
                <span>6 Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ee6001]" />
                <span>Multiple Industries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study - Full Width Hero */}
      <section className="px-6 sm:px-12 mb-32 max-w-[1800px] mx-auto animate-slide-up delay-300">
        <div className="relative bg-gradient-to-br from-[#ee6001] to-[#ff8232] p-12 sm:p-20 diagonal-lines overflow-hidden">
          {/* Large number decoration */}
          <div className="absolute top-8 right-8 font-display text-[20rem] text-black/5 leading-none pointer-events-none">
            01
          </div>

          <div className="relative z-10 max-w-5xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-8xl">{caseStudies[0].logo}</span>
              <div>
                <div className="inline-block px-3 py-1 bg-black/10 text-black text-xs font-body font-bold tracking-widest uppercase mb-2">
                  {caseStudies[0].industry}
                </div>
                <h2 className="font-display text-5xl sm:text-7xl text-black">
                  {caseStudies[0].company}
                </h2>
              </div>
            </div>

            <p className="font-body text-3xl sm:text-5xl text-black/90 font-bold mb-8 leading-tight">
              {caseStudies[0].tagline}
            </p>

            <blockquote className="border-l-4 border-black pl-8 mb-12">
              <p className="font-body text-2xl sm:text-3xl text-black/80 italic mb-4 leading-relaxed">
                "{caseStudies[0].quote}"
              </p>
              <cite className="font-body text-lg text-black/60 not-italic">
                — {caseStudies[0].author}
              </cite>
            </blockquote>

            <div className="grid grid-cols-3 gap-8">
              {caseStudies[0].metrics.map((metric, idx) => (
                <div key={idx} className="border-t-2 border-black/20 pt-4">
                  <div className="font-display text-5xl sm:text-6xl text-black mb-2">
                    {metric.value}
                    <span className="text-2xl">{metric.unit}</span>
                  </div>
                  <div className="font-body text-sm text-black/60 uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-body font-semibold hover:bg-black/80 transition-all group">
              <span>Read full story</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies Grid - Asymmetric Layout */}
      <section className="px-6 sm:px-12 mb-32 max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {caseStudies.slice(1).map((study, index) => (
            <article
              key={study.id}
              className={`group relative bg-white/5 border border-white/10 p-10 hover:bg-white/10 hover:border-[#ee6001]/50 transition-all duration-500 animate-slide-up ${
                index === 0 ? 'delay-400' : index === 1 ? 'delay-500' : index === 2 ? 'delay-600' : index === 3 ? 'delay-700' : 'delay-800'
              }`}
            >
              {/* Case number */}
              <div className="absolute top-6 right-6 font-display text-6xl text-white/5 group-hover:text-[#ee6001]/10 transition-colors">
                0{study.id}
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{study.logo}</span>
                    <div>
                      <span className="inline-block px-2 py-0.5 bg-[#ee6001]/20 text-[#ee6001] text-[10px] font-body font-bold tracking-widest uppercase mb-2">
                        {study.industry}
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl">
                        {study.company}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="mb-6">
                  <p className="font-body text-xl text-white/90 italic mb-3">
                    "{study.quote}"
                  </p>
                  <cite className="font-body text-sm text-white/50 not-italic">
                    — {study.author}
                  </cite>
                </blockquote>

                {/* Tagline */}
                <p className="font-body text-lg text-[#ee6001] font-semibold mb-8">
                  {study.tagline}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/10">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx}>
                      <div className="font-display text-3xl mb-1">
                        {metric.value}
                        <span className="text-sm text-white/50">{metric.unit}</span>
                      </div>
                      <div className="font-body text-[10px] text-white/40 uppercase tracking-wider leading-tight">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[#ee6001] transition-colors group/link font-body font-medium uppercase tracking-wider">
                  <span>Read more</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Hover decoration */}
              <div className="absolute inset-0 border-l-4 border-[#ee6001] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section - Bold Statement */}
      <section className="px-6 sm:px-12 pb-32 max-w-[1800px] mx-auto">
        <div className="relative bg-white text-black p-12 sm:p-24 overflow-hidden diagonal-lines">
          {/* Large text decoration */}
          <div className="absolute -bottom-10 -right-10 font-display text-[25rem] text-black/3 leading-none pointer-events-none whitespace-nowrap">
            NOW
          </div>

          <div className="relative z-10 max-w-4xl">
            <div className="h-1 w-24 bg-[#ee6001] mb-12" />

            <h2 className="font-display text-6xl sm:text-8xl lg:text-9xl mb-12 leading-[0.9]">
              YOUR
              <br />
              STORY
              <br />
              <span className="text-[#ee6001]">NEXT?</span>
            </h2>

            <p className="font-body text-2xl sm:text-3xl text-black/70 mb-16 max-w-2xl leading-relaxed">
              Join 500+ teams shipping 3x faster. Make everyone on your team a builder.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-[#ee6001] text-white font-body font-bold text-lg hover:bg-black transition-all duration-300 group"
              >
                <span>Get started now</span>
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 px-12 py-5 border-2 border-black text-black font-body font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300"
              >
                View all features
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 pt-12 border-t-2 border-black/10">
              <div>
                <div className="font-display text-4xl text-[#ee6001] mb-2">500+</div>
                <div className="font-body text-sm text-black/60 uppercase tracking-wider">Teams</div>
              </div>
              <div>
                <div className="font-display text-4xl text-[#ee6001] mb-2">10K+</div>
                <div className="font-body text-sm text-black/60 uppercase tracking-wider">Features Shipped</div>
              </div>
              <div>
                <div className="font-display text-4xl text-[#ee6001] mb-2">3X</div>
                <div className="font-body text-sm text-black/60 uppercase tracking-wider">Faster</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-12 py-12 border-t border-white/5 max-w-[1800px] mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/icon.png" alt="Superhands" className="w-8 h-8" />
            <span className="font-display text-sm tracking-wider">Superhands</span>
          </div>
          <div className="font-body text-sm text-white/40">
            © 2024 Superhands. Empowering teams to build faster.
          </div>
        </div>
      </footer>
    </div>
  );
}
