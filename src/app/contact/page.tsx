"use client";

import { useState } from "react";
import { Mail, Linkedin, Copy, Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

function EmailCopy() {
  const [copied, setCopied] = useState(false);
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
    <button
      onClick={copyToClipboard}
      className={`inline-flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm border rounded-xl transition-all cursor-pointer ${
        copied
          ? "border-green-500/50"
          : "border-border hover:border-primary/50"
      }`}
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
          <Mail className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg text-foreground font-medium">{email}</span>
          <Copy className="w-4 h-4 text-muted-foreground" />
        </>
      )}
    </button>
  );
}

export default function ContactPage() {
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

        {/* Page content */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-in-up animation-delay-100">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in-up animation-delay-200">
            Have a question, want a demo, or just want to say hi? We&apos;d love
            to hear from you.
          </p>

          <div className="space-y-8 animate-fade-in-up animation-delay-300">
            {/* Email */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/60 font-medium">
                Email us
              </p>
              <EmailCopy />
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/60 font-medium">
                Follow us
              </p>
              <a
                href="https://www.linkedin.com/company/superhandsai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:border-primary/50 transition-all"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground" />
                <span className="text-lg text-foreground font-medium">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
