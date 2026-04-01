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
      const sectionCenter = rect.top + rect.height / 2;
      const start = vh;
      const end = 0;
      const scrollP = Math.min(1, Math.max(0, (start - sectionCenter) / (start - end)));

      // Also check if user is near the bottom of the page (mobile fallback)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const bottomP = maxScroll > 0 ? scrollY / maxScroll : 0;
      const bottomBoost = bottomP > 0.9 ? (bottomP - 0.9) / 0.1 : 0;

      const p = Math.min(1, Math.max(scrollP, bottomBoost));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return progress;
}

const SH_LOGO_MARK_D = "M49.6144 15.1622C51.1204 15.3739 52.4932 15.8016 53.7306 16.4483C55.4572 17.3116 56.841 18.5435 57.8829 20.1426L58.087 20.4668L58.088 20.4678C59.1162 22.2273 59.628 24.2989 59.628 26.6778C59.628 29.0542 59.1692 31.0224 58.2452 32.5762C57.3239 34.0836 56.0651 35.3196 54.4727 36.2813L54.4708 36.2823C52.884 37.1989 51.087 37.9688 49.0802 38.5928L46.131 39.4776C44.4497 39.9742 42.9798 40.533 41.7218 41.1524L41.7208 41.1514C40.5055 41.7671 39.5534 42.5873 38.8614 43.6094C38.2085 44.6257 37.8781 45.9947 37.878 47.7247C37.878 50.1548 38.5959 52.0314 40.0235 53.3663L40.3185 53.626C41.9837 55.0197 44.0855 55.7188 46.63 55.7188C46.7591 55.7188 46.8877 55.7164 47.0157 55.7129L47.1065 55.711L47.1134 55.8018C47.21 57.0386 47.4618 58.1793 47.8653 59.2256L47.9122 59.3467L47.7823 59.3555C47.4048 59.3812 47.0207 59.3965 46.63 59.3965C44.1951 59.3965 42.0554 58.9163 40.214 57.9542C38.3723 57.0333 36.9192 55.6935 35.8565 53.9356L35.8556 53.9346C34.8274 52.1751 34.3155 50.1035 34.3155 47.7247C34.3156 45.3482 34.7743 43.3801 35.6983 41.8262C36.6197 40.3189 37.8784 39.0828 39.4708 38.1211L39.4718 38.1202C41.0587 37.2035 42.8564 36.4337 44.8634 35.8096L47.8116 34.9249L48.4337 34.7354L48.9601 34.5655C50.171 34.1633 51.2578 33.7251 52.2208 33.251C53.4359 32.6357 54.3881 31.8165 55.0802 30.795C55.7339 29.7785 56.0655 28.4089 56.0655 26.6778C56.0655 24.0857 55.2486 22.1233 53.6251 20.7764C52.66 19.9687 51.5479 19.3949 50.2901 19.0547L50.2227 19.0372L50.2198 18.9668C50.1556 17.6342 49.9189 16.409 49.5108 15.2901L49.4561 15.1397L49.6144 15.1622ZM65.2875 36.3516V39.3721C65.2875 42.2878 64.7035 44.7117 63.5345 46.6387L63.5365 46.6397C62.4037 48.6051 60.8442 50.0895 58.8614 51.0938L58.8624 51.0948C57.2284 51.9373 55.4204 52.4237 53.4405 52.5586L53.3702 52.5635L53.3448 52.4971C52.9341 51.4319 52.679 50.273 52.5811 49.0196L52.5733 48.919L52.6739 48.9161C54.2986 48.8715 55.7716 48.5449 57.0929 47.9356C58.5139 47.2802 59.6407 46.2567 60.4737 44.8624C61.3047 43.4713 61.7247 41.643 61.7247 39.3721V36.3516H65.2875ZM34.753 8.09583C37.1876 8.09583 39.3268 8.57533 41.1681 9.53723L41.5089 9.71493C43.0781 10.5665 44.3498 11.7389 45.3224 13.2315L45.5265 13.5557V13.5577C46.5546 15.3172 47.0675 17.3878 47.0675 19.7667C47.0675 22.1433 46.6088 24.1121 45.6847 25.6661L45.6837 25.667C44.7624 27.1742 43.5044 28.4086 41.9122 29.3702L41.9103 29.3711C40.3235 30.2877 38.5264 31.0576 36.5196 31.6817L36.5186 31.6827L33.5704 32.5665C31.8892 33.0631 30.4183 33.6219 29.1603 34.2413L29.1593 34.2403C27.9443 34.8558 26.9928 35.6765 26.3009 36.6983C25.6478 37.7147 25.3165 39.0842 25.3165 40.8145C25.3166 43.4065 26.1344 45.368 27.7579 46.7149L28.1251 47.0059C28.8735 47.5659 29.7035 47.9951 30.6153 48.294L31.0772 48.4327L31.1446 48.4502L31.1476 48.5196C31.2206 49.856 31.4711 51.0831 31.8927 52.2032L31.9493 52.3545L31.7892 52.3321C30.2751 52.1215 28.8963 51.6924 27.6534 51.043C25.8117 50.1222 24.3586 48.7823 23.296 47.0245L23.295 47.0235C22.2669 45.264 21.754 43.1933 21.754 40.8145C21.754 38.4379 22.2127 36.469 23.1368 34.9151L23.1378 34.9141L23.3145 34.6348C24.2177 33.2538 25.4166 32.1125 26.9093 31.211L26.9112 31.21C28.4981 30.2933 30.2958 29.5226 32.3028 28.8985L35.252 28.0137L35.8731 27.8243C37.2975 27.3763 38.5598 26.8816 39.6603 26.3399L40.1036 26.0997C41.11 25.5163 41.9149 24.7765 42.5206 23.8819C43.1735 22.8655 43.505 21.4968 43.505 19.7667C43.505 17.1748 42.6878 15.2132 41.0645 13.8663L41.0636 13.8653C39.3984 12.4718 37.2972 11.7726 34.753 11.7725C34.2742 11.7725 33.8078 11.797 33.3546 11.8448L33.2589 11.8545L33.2491 11.7588C33.1289 10.5369 32.8557 9.41052 32.4288 8.37902L32.381 8.26472L32.504 8.24713C33.229 8.14593 33.9789 8.09583 34.753 8.09583ZM26.9474 15.1006C27.3822 16.151 27.6603 17.2957 27.7823 18.5342L27.7921 18.629L27.6974 18.6387C26.4676 18.7683 25.3318 19.0735 24.2901 19.5538C22.8691 20.2091 21.7423 21.2328 20.9093 22.627C20.0783 24.018 19.6583 25.8464 19.6583 28.1172V31.1377H16.0958V28.1172C16.0958 25.2009 16.6778 22.7759 17.8477 20.8487C18.9802 18.8841 20.5383 17.3986 22.5206 16.3946L23.0235 16.1495C24.21 15.6019 25.4843 15.2332 26.8458 15.043L26.919 15.0323L26.9474 15.1006Z";

function SuperhandsTile({ progress, onGlow }: { progress: number; onGlow?: (opacity: number) => void }) {
  const [pressed, setPressed] = useState(false);
  const [clickOverride, setClickOverride] = useState<boolean | null>(null);
  const prevScrollActive = useRef(false);
  const scrollActive = progress >= 0.95;

  // When scroll state changes, clear the click override
  useEffect(() => {
    if (scrollActive !== prevScrollActive.current) {
      prevScrollActive.current = scrollActive;
      setClickOverride(null);
    }
  }, [scrollActive]);

  const glowActive = clickOverride !== null ? clickOverride : scrollActive;
  const [isHDR, setIsHDR] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(dynamic-range: high)");
    setIsHDR(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsHDR(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Notify parent when glow state changes
  useEffect(() => {
    onGlow?.(glowActive ? 0.45 : 0);
  }, [glowActive, onGlow]);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{
        aspectRatio: "1 / 1",
        transform: pressed ? "scale(0.94)" : "scale(1)",
        transition: "transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)",
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={() => setClickOverride(prev => prev !== null ? !prev : !scrollActive)}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          borderRadius: "20.5%",
          outline: "1px solid rgba(82, 82, 84, 0.05)",
          outlineOffset: "-0.5px",
          background: "linear-gradient(to top, #E4E4E4, #FCFCFC)",
          boxShadow: glowActive
            ? "0 0 30px rgba(81, 202, 235, 0.4), 0 0 60px rgba(81, 202, 235, 0.2)"
            : "0 8px 16px rgba(0, 0, 0, 0.08)",
          animation: glowActive ? "tileBoxGlowPulse 4s ease-in-out infinite" : "none",
        }}
      >
        <svg
          viewBox="14 6 53 55"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[44%] h-auto"
          style={{
            opacity: glowActive ? 1 : 0.5,
            animation: glowActive ? "logo-pulse 2s ease-in-out infinite" : "none",
          }}
        >
          <path
            d={SH_LOGO_MARK_D}
            fill="#3F3E41"
            stroke="#323234"
            strokeWidth="0.191658"
          />
        </svg>
      </div>
      
    </div>
  );
}

// Vertical connector for mobile: straight line down
const CV_PATH = "M12 0V120";

function ConnectorVertical({ className, progress, id, glow = 0 }: { className?: string; progress: number; id: string; glow?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 12, y: 0 });

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
      viewBox="-8 -8 40 136"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="bg" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a" />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="a" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.749 0 0 0 0 0.933 0 0 0 0 0.988 0 0 0 1 0" />
          <feBlend mode="normal" in2="bg" result="shadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape" />
        </filter>
        <radialGradient id={`${id}-dot`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(6)">
          <stop stopColor="#7AD7F0" />
          <stop offset="1" stopColor="#31C1E8" />
        </radialGradient>
      </defs>
      <path
        ref={pathRef}
        d={CV_PATH}
        stroke="var(--landing-divider, #29292B)"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {glow > 0 && (
        <path
          d={CV_PATH}
          stroke="#51caeb"
          strokeOpacity={glow}
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      <g filter={`url(#${id}-glow)`} transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="6" fill={`url(#${id}-dot)`} />
      </g>
    </svg>
  );
}

const CL_PATH = "M12 13V104C12 121.673 26.327 136 44 136H420";

function ConnectorLeft({ className, progress, glow = 0 }: { className?: string; progress: number; glow?: number }) {
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
      viewBox="-8 -8 437 153"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cl-dot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(6)">
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
      <g transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="6" fill="url(#cl-dot)" />
      </g>
    </svg>
  );
}

const CR_PATH = "M410 124V33C410 15.327 395.673 1 378 1H1";

function ConnectorRight({ className, progress, glow = 0 }: { className?: string; progress: number; glow?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 410, y: 125 });

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
      viewBox="-8 -8 437 154"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cr-dot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(6)">
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
      <g transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="6" fill="url(#cr-dot)" />
      </g>
    </svg>
  );
}

export function SetupFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);

  const dotProgress = Math.min(1, Math.max(0, (progress - 0.15)) / 0.45);
  const tileProgress = dotProgress >= 0.95 ? 1 : 0;
  const [glowOpacity, setGlowOpacity] = useState(0);
  const handleGlow = useCallback((opacity: number) => setGlowOpacity(opacity), []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-10 pt-20 pb-20 md:pt-20 md:pb-20 max-w-[960px] mx-auto">
      {/* Mobile: stacked layout with vertical connectors */}
      <div className="flex flex-col items-center md:hidden">
        <div className="self-start">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 w-[220px] text-[24px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <span className="text-[#51caeb]">GitHub</span>
          </h2>
        </div>

        {/* Top vertical connector: dot travels down toward tile */}
        <ConnectorVertical className="w-6 h-20" progress={dotProgress} id="cv-top" glow={glowOpacity} />

        <div className="relative z-10 w-[110px]">
          <SuperhandsTile progress={tileProgress} onGlow={handleGlow} />
        </div>

        {/* Bottom vertical connector: dot travels up toward tile */}
        <div className="rotate-180">
          <ConnectorVertical className="w-6 h-20" progress={dotProgress} id="cv-bottom" glow={glowOpacity} />
        </div>

        <div className="self-end text-right w-[220px]">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and bring
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.1] font-heading">
            <span className="text-[#51caeb]">designers</span>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Desktop: positioned illustration */}
      <div
        className="relative hidden md:block w-full aspect-[816/430] md:aspect-[816/500] lg:aspect-[816/430] 2xl:aspect-[816/390]"
      >
        {/* Top-left text */}
        <div className="absolute left-0 top-0 w-[300px] md:w-[220px] lg:w-[300px]">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[28px] md:text-[22px] lg:text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <span className="text-[#51caeb]">GitHub</span>
          </h2>
        </div>

        {/* Left connector */}
        <div
          className="absolute"
          style={{ left: "10%", top: "30%", width: "44%", height: "27.2%" }}
        >
          <ConnectorLeft className="size-full" progress={dotProgress} glow={glowOpacity} />
        </div>

        {/* Center tile */}
        <div
          className="absolute z-10 flex items-center justify-center w-[124px] h-[124px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
          style={{ left: "50%", top: "56%", transform: "translate(-50%, -50%)" }}
        >
          <SuperhandsTile progress={tileProgress} onGlow={handleGlow} />
        </div>

        {/* Right connector */}
        <div
          className="absolute"
          style={{ left: "46%", top: "54%", width: "44%", height: "27.3%" }}
        >
          <ConnectorRight className="size-full" progress={dotProgress} glow={glowOpacity} />
        </div>

        {/* Bottom-right text */}
        <div className="absolute right-0 text-right md:w-[240px] lg:w-[320px]" style={{ top: "78%" }}>
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and&nbsp;&nbsp;bring
          </p>
          <h2 className="mt-2 text-[28px] md:text-[22px] lg:text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[#51caeb]">designers</span>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Dotted divider */}
      <div
        className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.5,
        }}
      />
    </section>
  );
}
