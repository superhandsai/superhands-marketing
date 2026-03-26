"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type FeatureCardOldNewContent = {
  title: string;
  /** Optional supporting line below the title (not a bullet list). */
  subtitle?: string;
  items: string[];
};

type FeatureCardOldNewProps = {
  oldWay: FeatureCardOldNewContent;
  newWay: FeatureCardOldNewContent;
  /** Optional small label above the toggle and body copy. */
  eyebrow?: string;
  /** Deprecated: no longer used after stacked-card redesign. */
  phaseDurationMs?: number;
  className?: string;
  image?: React.ReactNode;
  imageClassName?: string;
  textOrderClassName?: string;
};

export function FeatureCardOldNew({
  oldWay,
  newWay,
  eyebrow,
  className,
  imageClassName,
  textOrderClassName,
}: FeatureCardOldNewProps) {
  const cycleDurationMs = 5000;
  const [autoPhase, setAutoPhase] = useState<"old" | "new">("old");
  const [hoveredChoice, setHoveredChoice] = useState<"old" | "new" | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = window.setInterval(() => {
        setAutoPhase((prev) => (prev === "old" ? "new" : "old"));
      }, cycleDurationMs);
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, cycleDurationMs]);

  const previewState = hoveredChoice ?? autoPhase;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredChoice(null);
      }}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm",
        className
      )}
    >
      <div className="px-8 py-8 md:px-10 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 lg:gap-16 items-stretch text-left">
          <div className={cn("grid grid-rows-2 gap-6 md:gap-7 auto-rows-fr", textOrderClassName)}>
            {eyebrow ? (
              <p className="m-0 text-base leading-relaxed text-muted-foreground">
                {eyebrow}
              </p>
            ) : null}
            <div
              onMouseEnter={() => setHoveredChoice("old")}
              onMouseLeave={() => setHoveredChoice(null)}
              onFocus={() => setHoveredChoice("old")}
              onBlur={() => setHoveredChoice(null)}
              className={cn(
                "relative h-full rounded-2xl bg-primary/5 p-5 transition-[opacity,box-shadow] duration-200 hover:shadow-[0_16px_40px_-12px_hsl(var(--foreground)/0.35)]",
                previewState === "new"
                  ? "opacity-45"
                  : "opacity-100 shadow-[0_16px_40px_-12px_hsl(var(--foreground)/0.35)]"
              )}
            >
              <p className="mb-3 inline-flex w-fit rounded-full border border-border/70 bg-muted/60 px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                Old way
              </p>
              <h4 className="font-space-grotesk text-xl sm:text-2xl font-bold tracking-tight">
                {oldWay.title}
              </h4>
              {oldWay.subtitle ? (
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{oldWay.subtitle}</p>
              ) : null}
              {oldWay.items.length > 0 ? (
                <ul className="mt-4 space-y-3.5 text-muted-foreground">
                  {oldWay.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div
              onMouseEnter={() => setHoveredChoice("new")}
              onMouseLeave={() => setHoveredChoice(null)}
              onFocus={() => setHoveredChoice("new")}
              onBlur={() => setHoveredChoice(null)}
              className={cn(
                "relative h-full rounded-2xl bg-background/60 p-5 transition-[opacity,box-shadow] duration-200 hover:shadow-[0_16px_40px_-12px_hsl(var(--foreground)/0.35)]",
                previewState === "old"
                  ? "opacity-45"
                  : "opacity-100 shadow-[0_16px_40px_-12px_hsl(var(--foreground)/0.35)]"
              )}
            >
              <p className="mb-3 inline-flex w-fit rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium tracking-wide text-muted-foreground">
                Superhands
              </p>
              <h4 className="font-space-grotesk text-xl sm:text-2xl font-bold tracking-tight">
                {newWay.title}
              </h4>
              {newWay.subtitle ? (
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{newWay.subtitle}</p>
              ) : null}
              {newWay.items.length > 0 ? (
                <ul className="mt-4 space-y-3.5 text-muted-foreground">
                  {newWay.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              "flex min-h-0 flex-col -my-8 -mr-8 md:-my-10 md:-mr-10",
              imageClassName
            )}
          >
            <div
              className={cn(
                "relative h-full min-h-[320px] w-full transition-colors duration-200",
                previewState === "old"
                  ? "bg-primary/5"
                  : "bg-background/60"
              )}
              role="img"
              aria-label={previewState === "old" ? "Old way preview placeholder" : "Superhands preview placeholder"}
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
