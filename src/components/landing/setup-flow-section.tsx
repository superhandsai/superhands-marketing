"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section center enters viewport bottom
      // 1 when section center reaches 60% from top (completes quickly)
      const sectionCenter = rect.top + rect.height / 2;
      const start = vh;       // center at viewport bottom
      const end = vh * 0.6;   // center at 60% from top
      const p = Math.min(1, Math.max(0, (start - sectionCenter) / (start - end)));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
}

function SuperhandsTile({ progress }: { progress: number }) {
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const flickering = useRef(false);
  const settled = useRef(false);

  useEffect(() => {
    if (progress < 0.95) {
      if (settled.current) {
        settled.current = false;
        flickering.current = false;
        setFlickerOpacity(0);
      }
      return;
    }
    if (flickering.current || settled.current) return;
    // progress passed threshold
    flickering.current = true;

    const seq = [0.45, 0.38, 0.4];
    const timing = [0, 300, 500];
    timing.forEach((ms, i) => {
      setTimeout(() => {
        setFlickerOpacity(seq[i]);
        if (i === seq.length - 1) {
          flickering.current = false;
          settled.current = true;
        }
      }, ms);
    });
  }, [progress]);

  return (
    <div className="relative w-full" style={{ aspectRatio: "1 / 1" }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/sh-tile.svg"
        alt=""
        width={156}
        height={156}
        className="w-full h-auto"
      />
      {/* HDR glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: "#51caeb",
          backgroundImage: "url(/images/hdr_pixel.avif)",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          mixBlendMode: "lighten",
          maskImage: "url(/images/sh-logo-mask.svg)",
          WebkitMaskImage: "url(/images/sh-logo-mask.svg)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          opacity: flickerOpacity,
        }}
      />
    </div>
  );
}

const CL_PATH = "M12 13V104C12 121.673 26.327 136 44 136H266";

function ConnectorLeft({ className, progress }: { className?: string; progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 12, y: 12 });

  const updatePos = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    setPos({ x: pt.x, y: pt.y });
  }, [progress]);

  useEffect(() => {
    updatePos();
  }, [updatePos]);

  return (
    <svg
      className={className}
      viewBox="-8 -8 283 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cl-glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.749 0 0 0 0 0.933 0 0 0 0 0.988 0 0 0 1 0" />
          <feBlend mode="normal" in2="bg" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
        <radialGradient id="cl-dot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(4)">
          <stop stopColor="#7AD7F0" />
          <stop offset="1" stopColor="#31C1E8" />
        </radialGradient>
      </defs>
      <path
        ref={pathRef}
        d={CL_PATH}
        stroke="var(--landing-divider, #29292B)"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g filter="url(#cl-glow)" transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="4" fill="url(#cl-dot)" />
      </g>
    </svg>
  );
}

const CR_PATH = "M255 124V33C255 15.327 240.673 1 223 1H1";

function ConnectorRight({ className, progress }: { className?: string; progress: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 255, y: 125 });

  const updatePos = useCallback(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(progress * len);
    setPos({ x: pt.x, y: pt.y });
  }, [progress]);

  useEffect(() => {
    updatePos();
  }, [updatePos]);

  return (
    <svg
      className={className}
      viewBox="-8 -8 283 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cr-glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.749 0 0 0 0 0.933 0 0 0 0 0.988 0 0 0 1 0" />
          <feBlend mode="normal" in2="bg" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
        <radialGradient id="cr-dot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(4)">
          <stop stopColor="#7AD7F0" />
          <stop offset="1" stopColor="#31C1E8" />
        </radialGradient>
      </defs>
      <path
        ref={pathRef}
        d={CR_PATH}
        stroke="var(--landing-divider, #29292B)"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g filter="url(#cr-glow)" transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="4" fill="url(#cr-dot)" />
      </g>
    </svg>
  );
}

export function SetupFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  // Both dots travel toward center
  const dotProgress = Math.min(1, progress / 0.75);
  // HDR lights up when dots arrive
  const tileProgress = dotProgress >= 0.95 ? 1 : 0;

  return (
    <section ref={sectionRef} className="relative px-6 md:px-10 lg:px-16 py-16 md:py-24 max-w-[960px] mx-auto">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col items-center gap-8 md:hidden">
        <div className="self-start">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <span className="text-[#51caeb]">GitHub</span>
          </h2>
        </div>

        <SuperhandsTile progress={tileProgress} />

        <div className="self-end text-right">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and bring
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[#51caeb]">designers</span>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Desktop: positioned illustration */}
      <div
        className="relative hidden md:block w-full"
        style={{ aspectRatio: "816 / 470" }}
      >
        {/* Top-left text */}
        <div className="absolute left-0 top-0 w-[34.3%]">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <span className="text-[#51caeb]">GitHub</span>
          </h2>
        </div>

        {/* Left connector: dot near top-left text, curves down-right toward tile */}
        <div
          className="absolute"
          style={{ left: "10.8%", top: "22.1%", width: "39.2%", height: "27.2%" }}
        >
          <ConnectorLeft className="size-full" progress={dotProgress} />
        </div>

        {/* Center tile */}
        <div
          className="absolute z-10 flex items-center justify-center"
          style={{ left: "42.4%", right: `${100 - 57.6}%`, top: "50%", transform: "translateY(-50%)" }}
        >
          <SuperhandsTile progress={tileProgress} />
        </div>

        {/* Right connector: from tile area, curves down-right to dot near bottom-right text */}
        <div
          className="absolute"
          style={{ left: "50%", top: "49.4%", width: "39.7%", height: "27.3%" }}
        >
          <ConnectorRight className="size-full" progress={dotProgress} />
        </div>

        {/* Bottom-right text */}
        <div className="absolute right-0 text-right" style={{ top: "73%", width: "34.8%" }}>
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and&nbsp;&nbsp;bring
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[#51caeb]">designers</span>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Dotted divider */}
      <div
        className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.25,
        }}
      />
    </section>
  );
}
