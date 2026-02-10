'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
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
    <footer className="w-full border-t border-border bg-background mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="Superhands" className="w-6 h-6" />
            <span className="text-sm text-muted-foreground">
              © {currentYear} Superhands. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a
              href="https://app.superhands.ai/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://app.superhands.ai/terms-and-conditions"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <div
              className="relative inline-flex items-center gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {email}
              </span>
              <button
                onClick={copyToClipboard}
                className={`inline-flex items-center justify-center h-6 w-6 rounded-md bg-secondary text-secondary-foreground transition-all hover:bg-secondary/80 cursor-pointer ${
                  isHovered || copied ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Copy email"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
            <a
              href="https://www.linkedin.com/company/superhandsai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
