'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function FooterContent({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8', className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">
            © {currentYear} Superhands. All rights reserved.
          </span>
        </div>

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
  );
}

export function Footer() {
  const pathname = usePathname();

  if (pathname === '/loading-animations' || pathname === '/') {
    return null;
  }

  return (
    <footer
      className="w-full border-t border-border bg-background mt-auto"
      style={{ display: 'block' }}
    >
      <FooterContent />
    </footer>
  );
}
