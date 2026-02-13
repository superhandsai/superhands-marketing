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
      </div>
    </div>
  );
}
