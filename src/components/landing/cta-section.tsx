"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/logo-mark";
import { LANDING_URLS } from "./constants";
import { cn } from "@/lib/utils";

export function CtaSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35, rootMargin: "0px 0px -5% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-6 md:px-10 pt-0 pb-[120px] md:pb-[258px] max-w-[960px] mx-auto">
      <div
        ref={ctaRef}
        className="group/cta relative rounded-[32px] px-5 py-5 sm:px-10 sm:py-10 md:py-12"
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <rect
            className={cn(
              "md:group-has-[a:hover]/cta:animate-[border-march_0.7s_linear_infinite]",
              inView && "max-md:animate-[border-march_0.7s_linear_infinite]",
            )}
            x="0.75"
            y="0.75"
            rx={32}
            ry={32}
            fill="none"
            stroke="var(--landing-divider)"
            strokeWidth={2}
            strokeDasharray="0.25 2.75"
            strokeLinecap="round"
            opacity={0.5}
            pathLength={699}
            style={{ width: "calc(100% - 1.5px)", height: "calc(100% - 1.5px)" }}
          />
        </svg>
        <div className="relative flex items-stretch justify-between">
          <h2 className="flex flex-col text-[22px] sm:text-[28px] md:text-[22px] lg:text-[28px] leading-[1.1] font-heading">
            <span className="font-semibold text-[var(--landing-fg)]/50">
              Give your team
            </span>
            <span className="font-semibold font-heading-mono tracking-[-0.64px] text-[var(--landing-fg)]">
              Superhands
            </span>
          </h2>

          <div className="flex items-center justify-center w-[60px] sm:w-[125px]">
            <LogoMark
              className={cn(
                "w-[41px] h-[43px] opacity-50 transition-opacity duration-700 ease-in-out md:group-has-[a:hover]/cta:animate-[logo-pulse_2s_ease-in-out_infinite]",
                inView && "max-md:animate-[logo-pulse_2s_ease-in-out_infinite]",
              )}
              decorative
            />
          </div>
        </div>

        <div className="relative flex items-end justify-between mt-1.5 gap-2">
          <div className="flex-1 mb-[24px] flex">
            <div className="w-[40px] sm:w-[81px] shrink-0" />
            <div className="flex-1 h-[80px] sm:h-[120px] border-l-2 border-b-2 border-[rgba(41,41,43,0.10)] rounded-bl-[24px]" />
          </div>

          <a
            href={LANDING_URLS.viewDemo}
            className="shrink-0 inline-flex items-center justify-center rounded-[14px] border border-[rgba(82,82,84,0.05)] bg-gradient-to-t from-[#03161c] to-[#05242e] px-4 py-3 text-base font-semibold leading-[1.44] text-[#fcfcfc] font-body transition-all hover:opacity-90 hover:shadow-[0_4px_12px_rgba(3,22,28,0.04)]"
          >
            View Demo
          </a>
        </div>
      </div>
    </section>
  );
}
