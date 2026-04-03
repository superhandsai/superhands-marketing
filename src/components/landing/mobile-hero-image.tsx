"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FocusArea {
  scale: number;
  fx: number;
  fy: number;
  label: string;
}

const FOCUS_AREAS: FocusArea[] = [
  { scale: 1.0, fx: 0.50, fy: 0.50, label: "Product overview" },
  { scale: 3.0, fx: 0.19, fy: 0.22, label: "Review toolbar" },
  { scale: 2.1, fx: 0.51, fy: 0.40, label: "Style inspector" },
  { scale: 1.9, fx: 0.29, fy: 0.69, label: "Search interaction" },
];

function getTransform({ scale, fx, fy }: FocusArea) {
  const tx = (0.5 - fx) * scale * 100;
  const ty = (0.5 - fy) * scale * 100;
  return `translate(${tx}%, ${ty}%) scale(${scale})`;
}

const CYCLE_MS = 3800;
const INITIAL_DELAY_MS = 1500;

export function MobileHeroImage() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout | typeof setInterval> | null>(null);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (prefersReducedMotion()) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % FOCUS_AREAS.length);
    }, CYCLE_MS);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i);
      startTimer();
    },
    [startTimer],
  );

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % FOCUS_AREAS.length);
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % FOCUS_AREAS.length);
      startTimer();
    }, INITIAL_DELAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  return (
    <div>
      <div
        className="relative overflow-hidden aspect-[1524/978] cursor-pointer"
        onClick={advance}
      >
        {FOCUS_AREAS.map((area, i) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={area.label}
            src="/images/Header.png"
            srcSet="/images/Header.png 1524w, /images/Header@2x.png 3048w"
            sizes="(min-width: 768px) 880px, calc(100vw - 48px)"
            alt={i === 0 ? "Superhands product interface showing design review workflow" : ""}
            width={1524}
            height={978}
            className="absolute -inset-px w-[calc(100%+2px)] h-[calc(100%+2px)] object-cover transition-opacity duration-[2000ms] ease-in-out motion-reduce:transition-none"
            style={{
              transform: getTransform(area),
              opacity: i === index ? 1 : 0,
            }}
            fetchPriority={i === 0 ? "high" : "low"}
            decoding="async"
            draggable={false}
            aria-hidden={i !== 0}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 md:gap-3 pt-4">
        {FOCUS_AREAS.map((a, i) => (
          <button
            key={i}
            type="button"
            onTouchStart={() => {}}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-300 active:scale-200 ${
              i === index
                ? "bg-[var(--landing-fg)]"
                : "bg-[var(--landing-fg)]/30"
            }`}
            aria-label={`View ${a.label}`}
          />
        ))}
      </div>
    </div>
  );
}
