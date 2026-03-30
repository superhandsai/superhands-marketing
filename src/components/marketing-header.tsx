"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD_PX = 8;

type MarketingHeaderProps = {
  /** e.g. “For Designers” link — rendered before auth actions */
  trailingNav?: ReactNode;
};

export function MarketingHeader({ trailingNav }: MarketingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter] duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" decorative />
            <span className="text-lg font-medium tracking-tight">Superhands</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {trailingNav}
          <a
            href="https://app.superhands.ai/login"
            className="inline-flex items-center h-9 px-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Log in
          </a>
          <a
            href="https://app.superhands.ai/signup"
            className="group inline-flex items-center gap-1 h-9 px-2 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            Request Access
            <ArrowRight
              className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </header>
  );
}
