"use client";

/**
 * Setup flow matches Figma 278:2202: bordered TL/TR/BL/BR quadrants (no SVG frame), 690px layout baseline.
 * SuperhandsTile is centered over the row seam; a short bar bridges TL bottom ↔ BR top between column offsets.
 */
import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from "react";

const FLOW_MIN_SCALE_WIDTH_PX = 280;

function readContentInlineSize(entry: ResizeObserverEntry): number {
  if (entry.contentBoxSize?.length) {
    return entry.contentBoxSize[0]!.inlineSize;
  }
  return entry.contentRect.width;
}

function sectionContentInlineSize(el: HTMLElement): number {
  const style = getComputedStyle(el);
  const pl = parseFloat(style.paddingLeft) || 0;
  const pr = parseFloat(style.paddingRight) || 0;
  return el.clientWidth - pl - pr;
}

function useSectionContentInlineSize(containerRef: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const apply = () => setWidth(sectionContentInlineSize(el));

    apply();

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(readContentInlineSize(entry));
    });
    ro.observe(el, { box: "content-box" });
    return () => ro.disconnect();
  }, [containerRef]);

  return Math.max(FLOW_MIN_SCALE_WIDTH_PX, width);
}

function useTileViewportCenterLit(tileRef: React.RefObject<HTMLElement | null>) {
  const [lit, setLit] = useState(false);

  useLayoutEffect(() => {
    const update = () => {
      const el = tileRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cy = r.top + r.height / 2;
      const mid = window.innerHeight / 2;
      const threshold = Math.max(56, window.innerHeight * 0.12);
      setLit(Math.abs(cy - mid) < threshold);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [tileRef]);

  return lit;
}

const SH_LOGO_MARK_D =
  "M49.6144 15.1622C51.1204 15.3739 52.4932 15.8016 53.7306 16.4483C55.4572 17.3116 56.841 18.5435 57.8829 20.1426L58.087 20.4668L58.088 20.4678C59.1162 22.2273 59.628 24.2989 59.628 26.6778C59.628 29.0542 59.1692 31.0224 58.2452 32.5762C57.3239 34.0836 56.0651 35.3196 54.4727 36.2813L54.4708 36.2823C52.884 37.1989 51.087 37.9688 49.0802 38.5928L46.131 39.4776C44.4497 39.9742 42.9798 40.533 41.7218 41.1524L41.7208 41.1514C40.5055 41.7671 39.5534 42.5873 38.8614 43.6094C38.2085 44.6257 37.8781 45.9947 37.878 47.7247C37.878 50.1548 38.5959 52.0314 40.0235 53.3663L40.3185 53.626C41.9837 55.0197 44.0855 55.7188 46.63 55.7188C46.7591 55.7188 46.8877 55.7164 47.0157 55.7129L47.1065 55.711L47.1134 55.8018C47.21 57.0386 47.4618 58.1793 47.8653 59.2256L47.9122 59.3467L47.7823 59.3555C47.4048 59.3812 47.0207 59.3965 46.63 59.3965C44.1951 59.3965 42.0554 58.9163 40.214 57.9542C38.3723 57.0333 36.9192 55.6935 35.8565 53.9356L35.8556 53.9346C34.8274 52.1751 34.3155 50.1035 34.3155 47.7247C34.3156 45.3482 34.7743 43.3801 35.6983 41.8262C36.6197 40.3189 37.8784 39.0828 39.4708 38.1211L39.4718 38.1202C41.0587 37.2035 42.8564 36.4337 44.8634 35.8096L47.8116 34.9249L48.4337 34.7354L48.9601 34.5655C50.171 34.1633 51.2578 33.7251 52.2208 33.251C53.4359 32.6357 54.3881 31.8165 55.0802 30.795C55.7339 29.7785 56.0655 28.4089 56.0655 26.6778C56.0655 24.0857 55.2486 22.1233 53.6251 20.7764C52.66 19.9687 51.5479 19.3949 50.2901 19.0547L50.2227 19.0372L50.2198 18.9668C50.1556 17.6342 49.9189 16.409 49.5108 15.2901L49.4561 15.1397L49.6144 15.1622ZM65.2875 36.3516V39.3721C65.2875 42.2878 64.7035 44.7117 63.5345 46.6387L63.5365 46.6397C62.4037 48.6051 60.8442 50.0895 58.8614 51.0938L58.8624 51.0948C57.2284 51.9373 55.4204 52.4237 53.4405 52.5586L53.3702 52.5635L53.3448 52.4971C52.9341 51.4319 52.679 50.273 52.5811 49.0196L52.5733 48.919L52.6739 48.9161C54.2986 48.8715 55.7716 48.5449 57.0929 47.9356C58.5139 47.2802 59.6407 46.2567 60.4737 44.8624C61.3047 43.4713 61.7247 41.643 61.7247 39.3721V36.3516H65.2875ZM34.753 8.09583C37.1876 8.09583 39.3268 8.57533 41.1681 9.53723L41.5089 9.71493C43.0781 10.5665 44.3498 11.7389 45.3224 13.2315L45.5265 13.5557V13.5577C46.5546 15.3172 47.0675 17.3878 47.0675 19.7667C47.0675 22.1433 46.6088 24.1121 45.6847 25.6661L45.6837 25.667C44.7624 27.1742 43.5044 28.4086 41.9122 29.3702L41.9103 29.3711C40.3235 30.2877 38.5264 31.0576 36.5196 31.6817L36.5186 31.6827L33.5704 32.5665C31.8892 33.0631 30.4183 33.6219 29.1603 34.2413L29.1593 34.2403C27.9443 34.8558 26.9928 35.6765 26.3009 36.6983C25.6478 37.7147 25.3165 39.0842 25.3165 40.8145C25.3166 43.4065 26.1344 45.368 27.7579 46.7149L28.1251 47.0059C28.8735 47.5659 29.7035 47.9951 30.6153 48.294L31.0772 48.4327L31.1446 48.4502L31.1476 48.5196C31.2206 49.856 31.4711 51.0831 31.8927 52.2032L31.9493 52.3545L31.7892 52.3321C30.2751 52.1215 28.8963 51.6924 27.6534 51.043C25.8117 50.1222 24.3586 48.7823 23.296 47.0245L23.295 47.0235C22.2669 45.264 21.754 43.1933 21.754 40.8145C21.754 38.4379 22.2127 36.469 23.1368 34.9151L23.1378 34.9141L23.3145 34.6348C24.2177 33.2538 25.4166 32.1125 26.9093 31.211L26.9112 31.21C28.4981 30.2933 30.2958 29.5226 32.3028 28.8985L35.252 28.0137L35.8731 27.8243C37.2975 27.3763 38.5598 26.8816 39.6603 26.3399L40.1036 26.0997C41.11 25.5163 41.9149 24.7765 42.5206 23.8819C43.1735 22.8655 43.505 21.4968 43.505 19.7667C43.505 17.1748 42.6878 15.2132 41.0645 13.8663L41.0636 13.8653C39.3984 12.4718 37.2972 11.7726 34.753 11.7725C34.2742 11.7725 33.8078 11.797 33.3546 11.8448L33.2589 11.8545L33.2491 11.7588C33.1289 10.5369 32.8557 9.41052 32.4288 8.37902L32.381 8.26472L32.504 8.24713C33.229 8.14593 33.9789 8.09583 34.753 8.09583ZM26.9474 15.1006C27.3822 16.151 27.6603 17.2957 27.7823 18.5342L27.7921 18.629L27.6974 18.6387C26.4676 18.7683 25.3318 19.0735 24.2901 19.5538C22.8691 20.2091 21.7423 21.2328 20.9093 22.627C20.0783 24.018 19.6583 25.8464 19.6583 28.1172V31.1377H16.0958V28.1172C16.0958 25.2009 16.6778 22.7759 17.8477 20.8487C18.9802 18.8841 20.5383 17.3986 22.5206 16.3946L23.0235 16.1495C24.21 15.6019 25.4843 15.2332 26.8458 15.043L26.919 15.0323L26.9474 15.1006Z";

const SuperhandsTile = forwardRef<
  HTMLDivElement,
  {
    /** Logical toggle state (accessibility). */
    pressed: boolean;
    /** Glow, logo pulse, and linked accent styling. */
    visualHighlight: boolean;
    size: "sm" | "lg";
    onToggleHighlight?: () => void;
    /** When suppressed, parent uses this to mirror active visuals on hover/focus. */
    onPeekHighlightChange?: (active: boolean) => void;
  }
>(function SuperhandsTile(
  { pressed, visualHighlight, size, onToggleHighlight, onPeekHighlightChange },
  tileRef,
) {
  const sm = size === "sm";
  const interactive = Boolean(onToggleHighlight);
  const pointerInsideRef = useRef(false);
  const focusInsideRef = useRef(false);

  const emitPeek = useCallback(() => {
    if (!onPeekHighlightChange) return;
    if (pressed) {
      onPeekHighlightChange(false);
      return;
    }
    onPeekHighlightChange(pointerInsideRef.current || focusInsideRef.current);
  }, [onPeekHighlightChange, pressed]);

  useLayoutEffect(() => {
    emitPeek();
  }, [emitPeek]);

  const peekHandlers =
    interactive && onPeekHighlightChange
      ? {
          onMouseEnter: () => {
            pointerInsideRef.current = true;
            emitPeek();
          },
          onMouseLeave: () => {
            pointerInsideRef.current = false;
            emitPeek();
          },
          onFocus: () => {
            focusInsideRef.current = true;
            emitPeek();
          },
          onBlur: () => {
            focusInsideRef.current = false;
            emitPeek();
          },
        }
      : {};

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!onToggleHighlight) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggleHighlight();
    }
  };

  return (
    <div
      ref={tileRef}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? "Toggle highlight on tile and keywords" : undefined}
      aria-pressed={interactive ? pressed : undefined}
      onClick={interactive ? onToggleHighlight : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      {...peekHandlers}
      className={`shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#51CAEB]/50 focus-visible:ring-offset-2 ${sm ? "size-20" : "size-[124px]"} ${interactive ? "group cursor-pointer" : ""}`}
    >
      <div
        className={`flex size-full items-center justify-center transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          interactive
            ? "group-hover:-translate-y-0.5 group-hover:scale-[1.005] group-hover:brightness-[1.04] motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100 group-focus-visible:-translate-y-0.5 group-focus-visible:scale-[1.005] group-focus-visible:brightness-[1.04] motion-reduce:group-focus-visible:translate-y-0 motion-reduce:group-focus-visible:scale-100"
            : ""
        }`}
        style={{
          borderRadius: sm ? 20 : 32,
          outline: "1px solid rgba(82, 82, 84, 0.05)",
          outlineOffset: "-0.5px",
          background: "linear-gradient(to top, #E4E4E4, #FCFCFC)",
          boxShadow: visualHighlight
            ? "0 0 30px rgba(81, 202, 235, 0.4), 0 0 60px rgba(81, 202, 235, 0.2)"
            : sm
              ? "0 5.161px 10.323px rgba(0, 0, 0, 0.08)"
              : "0 8px 16px rgba(0, 0, 0, 0.08)",
          animation: visualHighlight ? "tileBoxGlowPulse 4s ease-in-out infinite" : "none",
        }}
      >
        <svg
          viewBox="14 6 53 55"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-[44%]"
          style={{
            opacity: visualHighlight ? 1 : 0.5,
            animation: visualHighlight ? "logo-pulse 2s ease-in-out infinite" : "none",
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
});

SuperhandsTile.displayName = "SuperhandsTile";

function AccentWord({ lit, children }: { lit: boolean; children: React.ReactNode }) {
  return (
    <span
      className="transition-colors duration-300 ease-out"
      style={{ color: lit ? "#51CAEB" : "rgba(3, 22, 28, 0.5)" }}
    >
      {children}
    </span>
  );
}

const FLOW_LINE = "#DDDDDD";
const FLOW_LINE_TRANSPARENT = "rgba(221, 221, 221, 0)";

/** Fade both ends of horizontal strokes (used for mid-gap bridge). */
const FLOW_STROKE_FADE_PCT = 14;

function flowStrokeGradHorizontal(): string {
  const p = FLOW_STROKE_FADE_PCT;
  return `linear-gradient(to right, ${FLOW_LINE_TRANSPARENT} 0%, ${FLOW_LINE} ${p}%, ${FLOW_LINE} ${100 - p}%, ${FLOW_LINE_TRANSPARENT} 100%)`;
}

/** TL left edge: 0% opacity at top → 100% at bottom (single ramp, then solid to seam). */
function flowStrokeGradTlLeftVertical(): string {
  return `linear-gradient(to bottom, ${FLOW_LINE_TRANSPARENT} 0%, ${FLOW_LINE} 100%)`;
}

/** BR right edge: 100% at top → 0% at bottom (opposite of TL left); top bar stays solid separately. */
function flowStrokeGradBrRightVertical(): string {
  return `linear-gradient(to bottom, ${FLOW_LINE} 0%, ${FLOW_LINE_TRANSPARENT} 100%)`;
}

/** Figma Superhands-landing 278:2202 content column width (px). */
const FLOW_LAYOUT_BASE = 690;

/** Extra padding toward the row seam + row height bump so the center tile clears copy on small viewports. */
const NARROW_FLOW_BREAKPOINT_PX = 500;
const NARROW_FLOW_SEAM_BOOST_PX = 44;
/** Below this content width, use smaller headline size (Connect Superhands still stays one line). */
const FLOW_TIGHT_WRAP_BREAKPOINT_PX = 400;
/** Keep BR column at least this wide so padding + text don’t crush copy (mobile). */
const FLOW_BR_MIN_WIDTH_PX = 200;
/** Below this content width, BR is right-anchored and uses most of the row for copy. */
const FLOW_BR_ANCHOR_WIDE_BREAKPOINT_PX = 520;
const FLOW_BR_WIDE_MIN_FRAC = 0.9;

type WideFlowDims = {
  rowMinH: number;
  padY: number;
  padPl: number;
  padPlBr: number;
  padPrTl: number;
  spacerGap: number;
  cornerMain: number;
  elbowR: number;
  /** TL column width (359 @ 690). */
  tlColPx: number;
  /** BR block `left` (372 @ 690). */
  brLeftPx: number;
  /** BR block width (318 @ 690). */
  brWidthPx: number;
  border: number;
};

/** Min content width for “Connect Superhands” at each heading size (font-heading semibold, ~0.58em avg char). */
function connectSuperhandsMinContentPx(headlinePx: 20 | 24 | 28): number {
  switch (headlinePx) {
    case 20:
      return 228;
    case 24:
      return 274;
    case 28:
      return 320;
  }
}

/** Scale setup-flow layout from Figma 278:2202 (690px frame); stroke stays 2px. */
function wideFlowDims(contentInlinePx: number, headlinePx: 20 | 24 | 28): WideFlowDims {
  const w = Math.max(FLOW_MIN_SCALE_WIDTH_PX, Math.floor(contentInlinePx));
  const q = (n: number) => Math.round((n * w) / FLOW_LAYOUT_BASE);
  const padPl = q(80);
  const padPrTl = q(39);
  const tlColFigma = q(359);
  const tlColForConnect = padPl + padPrTl + connectSuperhandsMinContentPx(headlinePx);
  const tlColPx = Math.min(w, Math.max(tlColFigma, tlColForConnect));
  const brIdealLeft = q(372);
  /** Nudge BR left only if needed so the block stays wide enough; never left of TL column. */
  const brLeftPx = Math.max(tlColPx, Math.min(brIdealLeft, w - FLOW_BR_MIN_WIDTH_PX));
  const brWidthPx = Math.max(0, w - brLeftPx);
  return {
    rowMinH: q(286),
    padY: q(80),
    padPl,
    padPlBr: q(80),
    padPrTl,
    spacerGap: q(62),
    cornerMain: q(32),
    elbowR: q(20),
    tlColPx,
    brLeftPx,
    brWidthPx,
    border: 2,
  };
}

function LayoutWideBorderGrid({
  dims: d,
  contentInlineW,
  pressed,
  visualHighlight,
  tileRef,
  onToggleHighlight,
  onPeekHighlightChange,
  tileSize,
  headlinePx,
}: {
  dims: WideFlowDims;
  contentInlineW: number;
  pressed: boolean;
  visualHighlight: boolean;
  tileRef: React.RefObject<HTMLDivElement | null>;
  onToggleHighlight: () => void;
  onPeekHighlightChange: (active: boolean) => void;
  tileSize: "sm" | "lg";
  headlinePx: 20 | 24 | 28;
}) {
  const hx =
    headlinePx === 20 ? "text-[20px]" : headlinePx === 24 ? "text-[24px]" : "text-[28px]";
  const bw = d.border;
  const c = d.cornerMain;
  const layoutW = Math.max(FLOW_MIN_SCALE_WIDTH_PX, Math.floor(contentInlineW));
  const seamBoost = contentInlineW < NARROW_FLOW_BREAKPOINT_PX ? NARROW_FLOW_SEAM_BOOST_PX : 0;
  const brWideRow = layoutW < FLOW_BR_ANCHOR_WIDE_BREAKPOINT_PX;
  const brW = brWideRow
    ? Math.min(layoutW, Math.max(d.brWidthPx, Math.round(layoutW * FLOW_BR_WIDE_MIN_FRAC)))
    : d.brWidthPx;
  const brL = brWideRow ? Math.max(0, layoutW - brW) : d.brLeftPx;
  /** Match TL left padding so both text blocks are equally inset from the outer border. */
  const brPadR = d.padPl;
  /** Cap BR inner-left (seam-side) padding from actual box width. */
  const brPadMax = Math.max(12, Math.floor(brW * 0.18));
  const brPadL = Math.min(d.padPlBr, brPadMax);
  const rowH = d.rowMinH + seamBoost;
  const gridMinH = rowH * 2;
  const midGapPx = Math.max(0, brL - d.tlColPx);
  /** Align with TL bottom bar; rowH−bw/2 straddled the seam and stacked on BR’s top stroke. */
  const seamTopPx = rowH - bw;
  return (
    <div className="w-full min-w-0 overflow-x-visible overflow-y-visible">
      <div className="relative w-full min-w-0 shrink-0" style={{ minHeight: gridMinH }}>
        <div
          className="relative z-0 grid w-full min-w-0"
          style={{
            gridTemplateRows: `${rowH}px ${rowH}px`,
            gridTemplateColumns: "100%",
          }}
        >
          {/* Row 1 — Figma 278:2204 */}
          <div className="relative flex min-h-0 min-w-0 overflow-visible">
            <div
              className="relative flex shrink-0 flex-col items-start justify-center gap-2 overflow-visible"
              style={{
                width: d.tlColPx,
                minWidth: 0,
                padding: `${d.padY}px ${d.padPrTl}px ${d.padY + seamBoost}px ${d.padPl}px`,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-0"
                style={{
                  bottom: c,
                  width: bw,
                  backgroundImage: flowStrokeGradTlLeftVertical(),
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-0 z-0"
                style={{
                  width: c,
                  height: c,
                  borderBottomLeftRadius: c,
                  borderLeft: `${bw}px solid ${FLOW_LINE}`,
                  borderBottom: `${bw}px solid ${FLOW_LINE}`,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 z-0"
                style={{
                  left: c,
                  height: bw,
                  right: 0,
                  backgroundColor: FLOW_LINE,
                }}
              />
              <div className="relative z-[1] flex flex-col items-start gap-1 text-left">
                <p className="m-0 font-body text-base font-medium leading-none text-[var(--landing-fg-secondary)]">
                  To set up
                </p>
                <p className={`m-0 w-max whitespace-nowrap font-heading font-semibold leading-[1.1] text-[#03161c] ${hx}`}>
                  Connect Superhands
                </p>
                <div className={`flex w-max items-baseline gap-[0.25em] whitespace-nowrap font-heading font-semibold leading-[1.1] text-[#03161c] ${hx}`}>
                  <span>to</span>
                  <AccentWord lit={visualHighlight}>GitHub</AccentWord>
                </div>
              </div>
            </div>
            <div
              className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
              style={{ paddingBottom: d.spacerGap + seamBoost }}
            >
              <div
                className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden"
                style={{ borderBottomLeftRadius: d.elbowR }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 z-0"
                  style={{
                    width: bw,
                    backgroundImage: flowStrokeGradTlLeftVertical(),
                  }}
                />
              </div>
            </div>
          </div>

          {/* Row 2 — Figma 278:2210 */}
          <div className="relative flex min-h-0 min-w-0 overflow-visible">
            <div
              className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
              style={{ paddingTop: d.spacerGap + seamBoost }}
            >
              <div className="relative min-h-0 min-w-0 w-full flex-1 overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-0"
                  style={{
                    width: bw,
                    backgroundImage: flowStrokeGradBrRightVertical(),
                  }}
                />
              </div>
            </div>
            <div
              className="absolute top-0 right-0 z-[1] flex min-w-0 max-w-full flex-col justify-center gap-2 overflow-visible text-right"
              style={{
                width: brW,
                height: rowH,
                boxSizing: "border-box",
                padding: `${d.padY + seamBoost}px ${brPadR}px ${d.padY}px ${brPadL}px`,
              }}
            >
              {/* Shift up by bw so top stroke shares TL/mid band [T−bw, T]; avoids two stacked 2px bands at the row seam. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 overflow-visible"
                style={{ transform: `translateY(-${bw}px)` }}
              >
                <div
                  className="pointer-events-none absolute right-0 top-0"
                  style={{
                    width: c,
                    height: c,
                    borderTopRightRadius: c,
                    borderTop: `${bw}px solid ${FLOW_LINE}`,
                    borderRight: `${bw}px solid ${FLOW_LINE}`,
                  }}
                />
                <div
                  className="pointer-events-none absolute left-0 top-0"
                  style={{
                    height: bw,
                    right: c,
                    backgroundColor: FLOW_LINE,
                  }}
                />
                <div
                  className="pointer-events-none absolute right-0 bottom-0"
                  style={{
                    top: c,
                    width: bw,
                    backgroundImage: flowStrokeGradBrRightVertical(),
                  }}
                />
              </div>
              <div className="relative z-[1] flex flex-col items-end gap-1 text-right">
                <p className="m-0 font-body text-base font-medium leading-none text-[var(--landing-fg-secondary)]">
                  and bring
                </p>
                <div className={`flex w-max items-baseline gap-[0.25em] whitespace-nowrap font-heading font-semibold leading-[1.1] text-[#03161c] ${hx}`}>
                  <AccentWord lit={visualHighlight}>designers</AccentWord>
                  <span>into the</span>
                </div>
                <p className={`m-0 w-max whitespace-nowrap font-heading font-semibold leading-[1.1] text-[#03161c] ${hx}`}>
                  pull request flow
                </p>
              </div>
            </div>
          </div>
        </div>

        {midGapPx > 0 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute z-[3]"
            style={{
              top: seamTopPx,
              left: d.tlColPx,
              width: midGapPx,
              height: bw,
              ...(midGapPx < 28
                ? { backgroundColor: FLOW_LINE }
                : { backgroundImage: flowStrokeGradHorizontal() }),
            }}
          />
        ) : null}

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="pointer-events-auto">
            <SuperhandsTile
              ref={tileRef}
              pressed={pressed}
              visualHighlight={visualHighlight}
              size={tileSize}
              onToggleHighlight={onToggleHighlight}
              onPeekHighlightChange={onPeekHighlightChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SetupFlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const contentInlineW = useSectionContentInlineSize(sectionRef);
  const headlinePx: 20 | 24 | 28 =
    contentInlineW >= 768 ? 28 : contentInlineW < FLOW_TIGHT_WRAP_BREAKPOINT_PX ? 20 : 24;
  const dims = wideFlowDims(contentInlineW, headlinePx);
  const tileSize = contentInlineW < 768 ? "sm" : "lg";
  const viewportLit = useTileViewportCenterLit(tileRef);
  const [highlightSuppressed, setHighlightSuppressed] = useState(false);
  /** After the tile hits the viewport center once, stay highlighted for the rest of the visit unless toggled off. */
  const [highlightEngaged, setHighlightEngaged] = useState(false);

  useLayoutEffect(() => {
    if (viewportLit) setHighlightEngaged(true);
  }, [viewportLit]);

  const pressed = (viewportLit || highlightEngaged) && !highlightSuppressed;
  const [peekHighlight, setPeekHighlight] = useState(false);
  /** After turning off while pointer/focus stays on the tile, ignore peek until leave (otherwise emitPeek immediately re-lights). */
  const peekBlockedUntilLeaveRef = useRef(false);

  const visualHighlight = pressed || (highlightSuppressed && peekHighlight);

  const onToggleHighlight = useCallback(() => {
    setHighlightSuppressed((s) => {
      const next = !s;
      if (next) {
        peekBlockedUntilLeaveRef.current = true;
        setPeekHighlight(false);
      } else {
        peekBlockedUntilLeaveRef.current = false;
      }
      return next;
    });
  }, []);

  const onPeekHighlightChange = useCallback((active: boolean) => {
    if (active && peekBlockedUntilLeaveRef.current) return;
    setPeekHighlight(active);
    if (!active) peekBlockedUntilLeaveRef.current = false;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[960px] px-6 py-[calc(5rem-10px)] md:px-10"
    >
      <LayoutWideBorderGrid
        dims={dims}
        contentInlineW={contentInlineW}
        pressed={pressed}
        visualHighlight={visualHighlight}
        tileRef={tileRef}
        onToggleHighlight={onToggleHighlight}
        onPeekHighlightChange={onPeekHighlightChange}
        tileSize={tileSize}
        headlinePx={headlinePx}
      />

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
