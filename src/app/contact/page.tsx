"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Email copy component with hover interaction
function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const email = "hello@superhands.ai";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`relative inline-flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm border rounded-xl transition-all cursor-pointer ${
        copied ? 'border-green-500/50' : 'border-border hover:border-primary/50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={copyToClipboard}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          copyToClipboard();
        }
      }}
      aria-label="Click to copy email address"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5 text-green-500" />
          <span className="text-lg text-green-500 font-medium">
            Copied to clipboard!
          </span>
        </>
      ) : (
        <>
          <span className="text-lg text-foreground font-medium">
            {email}
          </span>
          <div
            className={`inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-secondary text-secondary-foreground transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm">Copy</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-svh w-full bg-dot-pattern bg-background">
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-24 sm:px-6 lg:px-8">
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

        {/* Contact Content */}
        <div className="max-w-2xl mx-auto text-center mt-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground animate-fade-in-up">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up animation-delay-100">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="flex justify-center animate-fade-in-up animation-delay-200">
            <EmailCopy />
          </div>
        </div>

        {/* Logo Showcase */}
        <div className="mt-32 animate-fade-in-up animation-delay-300">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 opacity-60">
              {/* Vercel */}
              <div className="flex items-center gap-2 text-foreground">
                <svg className="w-5 h-5" viewBox="0 0 76 65" fill="currentColor">
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
                <span className="text-xl font-semibold">Vercel</span>
              </div>

              {/* Cursor */}
              <div className="flex items-center gap-2 text-foreground">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                  <path d="M13 13l6 6" />
                </svg>
                <span className="text-xl font-semibold">CURSOR</span>
              </div>

              {/* Oscar */}
              <div className="text-foreground">
                <span className="text-xl font-semibold tracking-tight">Oscar</span>
              </div>

              {/* OpenAI */}
              <div className="text-foreground">
                <span className="text-xl font-semibold">OpenAI</span>
              </div>

              {/* Coinbase */}
              <div className="text-foreground">
                <span className="text-xl font-semibold">coinbase</span>
              </div>

              {/* Cash App */}
              <div className="flex items-center gap-2 text-foreground">
                <div className="w-6 h-6 bg-foreground rounded-md flex items-center justify-center">
                  <span className="text-background text-xs font-bold">$</span>
                </div>
                <span className="text-xl font-semibold">Cash App</span>
              </div>

              {/* BOOM */}
              <div className="flex items-center gap-2 text-foreground">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
                <span className="text-xl font-semibold">BOOM</span>
              </div>

              {/* ramp */}
              <div className="flex items-center gap-1 text-foreground">
                <span className="text-xl font-semibold">ramp</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 17l9.2-9.2M17 17V7H7" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
