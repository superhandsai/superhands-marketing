"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/case-studies-data";
import { CaseStudyCard } from "@/components/case-study-card";

export default function CaseStudiesPage() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img
              src="/icon.png"
              alt="Superhands"
              className="w-10 h-10 mr-3"
            />
            <h1 className="text-xl font-bold uppercase text-foreground">
              Superhands
            </h1>
          </a>
          <a
            href="https://app.superhands.ai/login"
            className="login-btn inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground transition-all"
          >
            Login
          </a>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up animation-delay-100">
            Customer Success Stories
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            See how teams across industries are using Superhands to ship features, fix bugs, and update their products—without the engineering bottleneck.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={index}
              isExpanded={expandedCards.has(caseStudy.id)}
              onToggle={() => toggleCard(caseStudy.id)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center py-16 px-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl animate-fade-in-up animation-delay-500">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to ship faster?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join the teams who are building, fixing, and updating their products without waiting for engineering bandwidth.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 text-base font-medium rounded-lg bg-primary text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(238,96,1,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Get early access
          </a>
        </div>
      </div>
    </div>
  );
}
