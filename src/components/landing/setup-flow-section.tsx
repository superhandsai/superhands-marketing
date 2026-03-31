"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

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
      const end = vh * 0.6;
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

const SUPERWHITE_DATA_URI = "data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAvG1kYXQAAAAfTgEFGkdWStxcTEM/lO/FETzRQ6gD7gAA7gIAA3EYgAAAAEgoAa8iNjAkszOL+e58c//cEe//0TT//scp1n/381P/RWP/zOW4QtxorfVogeh8nQDbQAAAAwAQMCcWUTAAAAMAAAMAAAMA84AAAAAVAgHQAyu+KT35E7gAADFgAAADABLQAAAAEgIB4AiS76MTkNbgAAF3AAAPSAAAABICAeAEn8+hBOTXYAADUgAAHRAAAAPibW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAKcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAw10cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAKcAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAACnAAAAAAABAAAAAAKFbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABdwAAAD6BVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAixtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAHsc3RibAAAARxzdHNkAAAAAAAAAAEAAAEMaHZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAHVodmNDAQIgAAAAsAAAAAAAPPAA/P36+gAACwOgAAEAGEABDAH//wIgAAADALAAAAMAAAMAPBXAkKEAAQAmQgEBAiAAAAMAsAAAAwAAAwA8oBQgQcCTDLYgV7kWVYC1CRAJAICiAAEACUQBwChkuNBTJAAAAApmaWVsAQAAAAATY29scm5jbHgACQAQAAkAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAALPwAACz8AAAAKHN0dHMAAAAAAAAAAwAAAAIAAAPoAAAAAQAAAAEAAAABAAAD6AAAABRzdHNzAAAAAAAAAAEAAAABAAAAEHNkdHAAAAAAIBAQGAAAAChjdHRzAAAAAAAAAAMAAAABAAAAAAAAAAEAAAfQAAAAAgAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAABvAAAAGQAAABYAAAAWAAAAFHN0Y28AAAAAAAAAAQAAACwAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjYwLjMuMTAw";

const SH_CLIP_PATH = "M86.9229 51.4163C88.4289 51.628 89.8017 52.0557 91.0391 52.7024H91.0381C92.7647 53.5657 94.1495 54.7976 95.1914 56.3967L95.3955 56.7209L95.3965 56.7219C96.4247 58.4814 96.9365 60.553 96.9365 62.9319C96.9365 65.3083 96.4777 67.2765 95.5537 68.8303V68.8313C94.6324 70.3387 93.3736 71.5737 91.7812 72.5354L91.7793 72.5364C90.1925 73.453 88.3955 74.2229 86.3887 74.8469H86.3877L83.4395 75.7317C81.7582 76.2283 80.2883 76.7871 79.0303 77.4065L79.0293 77.4055C77.814 78.0212 76.8619 78.8414 76.1699 79.8635C75.517 80.8798 75.1866 82.2488 75.1865 83.9788C75.1865 86.4089 75.9044 88.2855 77.332 89.6204L77.627 89.8801C79.2922 91.2738 81.394 91.9729 83.9385 91.9729C84.0676 91.9729 84.1962 91.9705 84.3242 91.967L84.415 91.9651L84.4219 92.0559C84.5185 93.2927 84.7703 94.4334 85.1738 95.4797L85.2207 95.6008L85.0908 95.6096C84.7133 95.6353 84.3292 95.6506 83.9385 95.6506C81.5036 95.6506 79.3639 95.1704 77.5225 94.2083C75.6808 93.2874 74.2277 91.9476 73.165 90.1897L73.1641 90.1887C72.1359 88.4292 71.624 86.3576 71.624 83.9788C71.6241 81.6023 72.0828 79.6342 73.0068 78.0803V78.0793C73.9282 76.572 75.1869 75.3369 76.7793 74.3752L76.7803 74.3743C78.3672 73.4576 80.1649 72.6878 82.1719 72.0637H82.1729L85.1201 71.179L85.7422 70.9895L86.2686 70.8196C87.4795 70.4174 88.5663 69.9792 89.5293 69.5051C90.7444 68.8898 91.6966 68.0706 92.3887 67.0491C93.0424 66.0326 93.374 64.663 93.374 62.9319C93.374 60.3398 92.5571 58.3774 90.9336 57.0305H90.9326C89.9675 56.2228 88.8564 55.649 87.5986 55.3088L87.5312 55.2913L87.5283 55.2209C87.4641 53.8883 87.2274 52.6631 86.8193 51.5442L86.7646 51.3938L86.9229 51.4163ZM102.596 72.6057V75.6262C102.596 78.5419 102.012 80.9658 100.843 82.8928L100.845 82.8938C99.7122 84.8592 98.1527 86.3436 96.1699 87.3479L96.1709 87.3489C94.5369 88.1914 92.7289 88.6778 90.749 88.8127L90.6787 88.8176L90.6533 88.7512C90.2426 87.686 89.9875 86.5271 89.8896 85.2737L89.8818 85.1731L89.9824 85.1702C91.6071 85.1256 93.0801 84.799 94.4014 84.1897C95.8224 83.5343 96.9492 82.5108 97.7822 81.1165C98.6132 79.7254 99.0332 77.8971 99.0332 75.6262V72.6057H102.596ZM72.0615 44.3499C74.4961 44.3499 76.6353 44.8294 78.4766 45.7913L78.8174 45.969C80.3866 46.8206 81.6583 47.993 82.6309 49.4856L82.835 49.8098V49.8118C83.8631 51.5713 84.376 53.6419 84.376 56.0208C84.376 58.3974 83.9173 60.3662 82.9932 61.9202L82.9922 61.9211C82.0709 63.4283 80.8129 64.6627 79.2207 65.6243L79.2188 65.6252C77.632 66.5418 75.8349 67.3117 73.8281 67.9358L73.8271 67.9368L70.8789 68.8206H70.8779C69.1967 69.3172 67.7268 69.876 66.4688 70.4954L66.4678 70.4944C65.2528 71.1099 64.3013 71.9306 63.6094 72.9524C62.9563 73.9688 62.625 75.3383 62.625 77.0686C62.6251 79.6606 63.4429 81.6221 65.0664 82.969L65.4336 83.26C66.182 83.82 67.012 84.2492 67.9238 84.5481L68.3857 84.6868L68.4531 84.7043L68.4561 84.7737C68.5291 86.1101 68.7796 87.3372 69.2012 88.4573L69.2578 88.6086L69.0977 88.5862C67.5836 88.3756 66.2048 87.9465 64.9619 87.2971C63.1202 86.3763 61.6671 85.0364 60.6045 83.2786L60.6035 83.2776C59.5754 81.5181 59.0625 79.4474 59.0625 77.0686C59.0625 74.692 59.5212 72.7231 60.4453 71.1692L60.4463 71.1682L60.623 70.8889C61.5262 69.5079 62.7251 68.3666 64.2178 67.4651L64.2197 67.4641C65.8066 66.5474 67.6043 65.7767 69.6113 65.1526H69.6123L72.5605 64.2678L73.1816 64.0784C74.606 63.6304 75.8683 63.1357 76.9688 62.594L77.4121 62.3538C78.4185 61.7704 79.2234 61.0306 79.8291 60.136C80.482 59.1196 80.8135 57.7509 80.8135 56.0208C80.8135 53.4289 79.9963 51.4673 78.373 50.1204L78.3721 50.1194C76.7069 48.7259 74.6057 48.0267 72.0615 48.0266C71.5827 48.0266 71.1163 48.0511 70.6631 48.0989L70.5674 48.1086L70.5576 48.0129C70.4374 46.791 70.1642 45.6646 69.7373 44.6331L69.6895 44.5188L69.8125 44.5012C70.5375 44.4 71.2874 44.3499 72.0615 44.3499ZM64.2559 51.3547C64.6907 52.4051 64.9688 53.5498 65.0908 54.7883L65.1006 54.8831L65.0059 54.8928C63.7761 55.0224 62.6403 55.3276 61.5986 55.8079C60.1776 56.4632 59.0508 57.4869 58.2178 58.8811C57.3868 60.2721 56.9668 62.1005 56.9668 64.3713V67.3918H53.4043V64.3713C53.4043 61.455 53.9863 59.03 55.1562 57.1028C56.2887 55.1382 57.8468 53.6527 59.8291 52.6487L60.332 52.4036C61.5185 51.856 62.7928 51.4873 64.1543 51.2971L64.2275 51.2864L64.2559 51.3547Z";

// Stable video element that never re-renders (Safari HDR)
const SafariHDRVideo = memo(function SafariHDRVideo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const video = ref.current.querySelector("video");
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);
  return (
    <div
      ref={ref}
      className="absolute inset-0"
      dangerouslySetInnerHTML={{
        __html: `<video muted autoplay loop playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none" src="${SUPERWHITE_DATA_URI}" oncanplaythrough="this.currentTime=0"></video>`,
      }}
    />
  );
});

function SuperhandsTile({ progress, isSafari, onGlow, onToggle }: { progress: number; isSafari: boolean; onGlow?: (opacity: number) => void; onToggle?: (off: boolean) => void }) {
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const settled = useRef(false);
  const idleInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [pressed, setPressed] = useState(false);
  const manualOff = useRef(false);

  useEffect(() => {
    if (manualOff.current) return;

    if (isSafari) {
      setFlickerOpacity(progress >= 0.95 ? 1 : 0);
      return;
    }

    if (progress < 0.95) {
      if (settled.current) {
        settled.current = false;
        setFlickerOpacity(0);
        if (idleInterval.current) {
          clearInterval(idleInterval.current);
          idleInterval.current = null;
        }
      }
      return;
    }
    if (settled.current) return;
    // Start gentle pulse
    settled.current = true;
    let tick = 0;
    idleInterval.current = setInterval(() => {
      tick++;
      const v = 0.39 + Math.sin(tick * 0.3) * 0.02;
      setFlickerOpacity(v);
    }, 100);
  }, [progress, isSafari]);

  // Easter egg: click to toggle lights
  const handleClick = useCallback(() => {
    if (!manualOff.current) {
      manualOff.current = true;
      onToggle?.(true);
      if (idleInterval.current) {
        clearInterval(idleInterval.current);
        idleInterval.current = null;
      }
      settled.current = false;
      setFlickerOpacity(0);
    } else {
      manualOff.current = false;
      onToggle?.(false);
      if (isSafari) {
        setFlickerOpacity(1);
      } else {
        settled.current = true;
        let tick = 0;
        idleInterval.current = setInterval(() => {
          tick++;
          const v = 0.39 + Math.sin(tick * 0.3) * 0.02;
          setFlickerOpacity(v);
        }, 100);
      }
    }
  }, [isSafari, onToggle]);

  // Notify parent of opacity changes
  useEffect(() => {
    onGlow?.(flickerOpacity);
  }, [flickerOpacity, onGlow]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (idleInterval.current) clearInterval(idleInterval.current);
    };
  }, []);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{
        aspectRatio: "1 / 1",
        transform: pressed ? "scale(0.94)" : "scale(1)",
        transition: "transform 0.12s cubic-bezier(0.2, 0, 0.2, 1)",
      }}
      onClick={handleClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/sh-tile.svg"
        alt=""
        width={156}
        height={156}
        className="w-full h-auto"
      />
      {/* Safari: clip-path + superwhite video */}
      {isSafari && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            clipPath: "url(#sh-logo-clip)",
            opacity: flickerOpacity,
          }}
        >
          <svg className="absolute" width="0" height="0">
            <defs>
              <clipPath id="sh-logo-clip" clipPathUnits="objectBoundingBox" transform="scale(0.00641026, 0.00641026)">
                <path d={SH_CLIP_PATH} />
              </clipPath>
            </defs>
          </svg>
          <SafariHDRVideo />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#51caeb", mixBlendMode: "multiply" }}
          />
        </div>
      )}
      {/* Non-Safari: mask-image + AVIF */}
      {!isSafari && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
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
      )}
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
        <radialGradient id={`${id}-dot`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(4)">
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
        <circle cx="0" cy="0" r="4" fill={`url(#${id}-dot)`} />
      </g>
    </svg>
  );
}

const CL_PATH = "M12 13V104C12 121.673 26.327 136 44 136H266";

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
      {glow > 0 && (
        <path
          d={CL_PATH}
          stroke="#51caeb"
          strokeOpacity={glow}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#cl-glow)"
        />
      )}
      <g filter="url(#cl-glow)" transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="4" fill="url(#cl-dot)" />
      </g>
    </svg>
  );
}

const CR_PATH = "M255 124V33C255 15.327 240.673 1 223 1H1";

function ConnectorRight({ className, progress, glow = 0 }: { className?: string; progress: number; glow?: number }) {
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
      {glow > 0 && (
        <path
          d={CR_PATH}
          stroke="#51caeb"
          strokeOpacity={glow}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#cr-glow)"
        />
      )}
      <g filter="url(#cr-glow)" transform={`translate(${pos.x}, ${pos.y})`} opacity={progress > 0.9 ? Math.max(0, (1 - progress) / 0.1) : 1}>
        <circle cx="0" cy="0" r="4" fill="url(#cr-dot)" />
      </g>
    </svg>
  );
}

// HDR-glowing text (Chrome only, skipped on Safari)
function HDRText({ children, isSafari, opacity }: { children: React.ReactNode; isSafari: boolean; opacity: number }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-[1]" style={{ color: "#51caeb" }}>{children}</span>
      {opacity > 0 && !isSafari && (
        <span
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: "linear-gradient(to right, #51caeb, #51caeb), url(/images/hdr_pixel.avif)",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mixBlendMode: "lighten",
            opacity: opacity,
          }}
        >
          {children}
        </span>
      )}
    </span>
  );
}

export function SetupFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsSafari(/Safari/.test(ua) && !/Chrome/.test(ua));
  }, []);

  // Easter egg toggle
  const [lightsOff, setLightsOff] = useState(false);
  const handleToggle = useCallback((off: boolean) => setLightsOff(off), []);

  // Both dots travel toward center
  const dotProgress = Math.min(1, progress / 0.75);
  const scrollActive = dotProgress >= 0.95;

  // Reset manual override when user scrolls away and back
  const wasActive = useRef(false);
  useEffect(() => {
    if (!scrollActive) {
      wasActive.current = false;
    } else if (!wasActive.current) {
      wasActive.current = true;
      if (lightsOff) setLightsOff(false);
    }
  }, [scrollActive, lightsOff]);

  const tileProgress = lightsOff ? 0 : (scrollActive ? 1 : 0);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const handleGlow = useCallback((opacity: number) => setGlowOpacity(opacity), []);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-10 pt-10 pb-8 md:pt-20 md:pb-20 max-w-[960px] mx-auto">
      {/* Mobile: stacked layout with vertical connectors */}
      <div className="flex flex-col items-center md:hidden">
        <div className="self-start">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <HDRText isSafari={isSafari} opacity={glowOpacity}>GitHub</HDRText>
          </h2>
        </div>

        {/* Top vertical connector: dot travels down toward tile */}
        <ConnectorVertical className="w-6 h-20" progress={dotProgress} id="cv-top" glow={glowOpacity} />

        <div className="relative z-10 w-[130px]">
          <SuperhandsTile progress={tileProgress} isSafari={isSafari} onGlow={handleGlow} onToggle={handleToggle} />
        </div>

        {/* Bottom vertical connector: dot travels up toward tile */}
        <div className="rotate-180">
          <ConnectorVertical className="w-6 h-20" progress={dotProgress} id="cv-bottom" glow={glowOpacity} />
        </div>

        <div className="self-end text-right">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and bring
          </p>
          <h2 className="mt-2 text-[24px] font-semibold leading-[1.1] font-heading">
            <HDRText isSafari={isSafari} opacity={glowOpacity}>designers</HDRText>
            <span className="text-[var(--landing-fg)]"> into the pull request flow.</span>
          </h2>
        </div>
      </div>

      {/* Desktop: positioned illustration */}
      <div
        className="relative hidden md:block w-full"
        style={{ aspectRatio: "816 / 430" }}
      >
        {/* Top-left text */}
        <div className="absolute left-0 top-0 w-[34.3%]">
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            To set up
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <span className="text-[var(--landing-fg)]">Connect Superhands to </span>
            <HDRText isSafari={isSafari} opacity={glowOpacity}>GitHub</HDRText>
          </h2>
        </div>

        {/* Left connector */}
        <div
          className="absolute"
          style={{ left: "10.8%", top: "22.1%", width: "39.2%", height: "27.2%" }}
        >
          <ConnectorLeft className="size-full" progress={dotProgress} glow={glowOpacity} />
          {/* HDR line overlay (Chrome only) */}
          {glowOpacity > 0 && !isSafari && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url(/images/hdr_pixel.avif)",
                backgroundSize: "cover",
                backgroundColor: "#51caeb",
                backgroundBlendMode: "multiply",
                mixBlendMode: "lighten",
                maskImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='-8 -8 283 153'><path d='${CL_PATH}' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/></svg>`)}")`,
                WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='-8 -8 283 153'><path d='${CL_PATH}' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/></svg>`)}")`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                opacity: glowOpacity,
              }}
            />
          )}
        </div>

        {/* Center tile */}
        <div
          className="absolute z-10 flex items-center justify-center"
          style={{ left: "39.7%", right: `${100 - 60.3}%`, top: "50%", transform: "translateY(-50%)" }}
        >
          <SuperhandsTile progress={tileProgress} isSafari={isSafari} onGlow={handleGlow} onToggle={handleToggle} />
        </div>

        {/* Right connector */}
        <div
          className="absolute"
          style={{ left: "50%", top: "49.4%", width: "39.7%", height: "27.3%" }}
        >
          <ConnectorRight className="size-full" progress={dotProgress} glow={glowOpacity} />
          {/* HDR line overlay (Chrome only) */}
          {glowOpacity > 0 && !isSafari && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "url(/images/hdr_pixel.avif)",
                backgroundSize: "cover",
                backgroundColor: "#51caeb",
                backgroundBlendMode: "multiply",
                mixBlendMode: "lighten",
                maskImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='-8 -8 283 154'><path d='${CR_PATH}' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/></svg>`)}")`,
                WebkitMaskImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='-8 -8 283 154'><path d='${CR_PATH}' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/></svg>`)}")`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                opacity: glowOpacity,
              }}
            />
          )}
        </div>

        {/* Bottom-right text */}
        <div className="absolute right-0 text-right" style={{ top: "73%", width: "34.8%" }}>
          <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            and&nbsp;&nbsp;bring
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading">
            <HDRText isSafari={isSafari} opacity={glowOpacity}>designers</HDRText>
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
