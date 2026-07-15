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

/** Raster mark: white #fff on #000; path `/images/superhands-tile-mark.png`. */
const SUPERHANDS_TILE_MARK_SRC = "/images/superhands-tile-mark.png";

/** Tileable fractal noise (SVG), very subtle grain on the tile background. */
const SUPERHANDS_TILE_NOISE_TILE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export const SuperhandsTile = forwardRef<
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
    /**
     * When true, peek only tracks the pointer (not focus). While highlight is user-suppressed,
     * this avoids focus-from-click immediately re-lighting the tile; hover preview still works after pointer leave + enter.
     */
    peekRequiresPointer?: boolean;
    ariaLabel?: string;
  }
>(function SuperhandsTile(
  { pressed, visualHighlight, size, onToggleHighlight, onPeekHighlightChange, peekRequiresPointer, ariaLabel },
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
    const wantPeek = peekRequiresPointer
      ? pointerInsideRef.current
      : pointerInsideRef.current || focusInsideRef.current;
    onPeekHighlightChange(wantPeek);
  }, [onPeekHighlightChange, peekRequiresPointer, pressed]);

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

  /** Imperative squash — avoids CSS animation being cancelled by Tailwind motion-reduce / React paint. */
  const faceInnerRef = useRef<HTMLDivElement>(null);

  const playSquash = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = faceInnerRef.current;
    if (!el) return;
    el.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.9)", offset: 0.45 },
        { transform: "scale(1)" },
      ],
      { duration: 380, easing: "ease-out", fill: "none" },
    );
  }, []);

  const scheduleSquashAfterCommit = useCallback(() => {
    setTimeout(() => playSquash(), 0);
  }, [playSquash]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!onToggleHighlight) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggleHighlight();
      scheduleSquashAfterCommit();
    }
  };

  const onTileClick = () => {
    if (!onToggleHighlight) return;
    onToggleHighlight();
    scheduleSquashAfterCommit();
  };

  return (
    <div
      ref={tileRef}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? ariaLabel ?? "Toggle highlight on tile and keywords"
          : undefined
      }
      aria-pressed={interactive ? pressed : undefined}
      onClick={interactive ? onTileClick : undefined}
      onKeyDown={interactive ? onKeyDown : undefined}
      {...peekHandlers}
      className={`shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#51CAEB]/50 focus-visible:ring-offset-2 ${sm ? "size-20" : "size-[124px]"} ${interactive ? "cursor-pointer" : ""}`}
    >
      <div
        className="relative flex size-full overflow-hidden transition-[box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{
          isolation: "isolate",
          borderRadius: sm ? 20 : 32,
          border: "1px solid rgba(82, 82, 84, 0.8)",
          backgroundColor: "#000000",
          boxShadow: visualHighlight
            ? "0 0 52px rgba(81, 202, 235, 0.5), 0 0 104px rgba(81, 202, 235, 0.3), 0 0 160px rgba(81, 202, 235, 0.17)"
            : sm
              ? "0 3px 8px rgba(0, 0, 0, 0.12)"
              : "0 5px 12px rgba(0, 0, 0, 0.12)",
          animation: visualHighlight ? "tileBoxGlowPulse 6s ease-in-out infinite" : "none",
        }}
      >
        <div
          ref={faceInnerRef}
          className="relative flex size-full origin-center items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 45%, #000000 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
            style={{
              backgroundImage: `url("${SUPERHANDS_TILE_NOISE_TILE}")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
              /* No mix-blend — avoids grain compositing with the backdrop and reading into the cyan glow. */
              opacity: 0.07,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- small fixed asset; avoids layout shift from Image fill */}
          <img
            src={SUPERHANDS_TILE_MARK_SRC}
            alt=""
            width={512}
            height={512}
            decoding="async"
            draggable={false}
            className="pointer-events-none relative z-10 h-full w-full select-none object-contain p-[26%]"
            style={{
              opacity: visualHighlight ? 1 : 0.5,
              animation: visualHighlight ? "logo-pulse 2s ease-in-out infinite" : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
});

SuperhandsTile.displayName = "SuperhandsTile";

/** Self-contained glowing tile for use outside the setup-flow diagram (e.g. homepage hero). */
export function HeroSuperhandsTile({ size = "lg" }: { size?: "sm" | "lg" }) {
  const [pressed, setPressed] = useState(true);
  const [peekHighlight, setPeekHighlight] = useState(false);
  const peekBlockedUntilLeaveRef = useRef(false);

  const onToggleHighlight = useCallback(() => {
    setPressed((on) => {
      const next = !on;
      if (!next) {
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
    <SuperhandsTile
      pressed={pressed}
      visualHighlight={pressed || peekHighlight}
      size={size}
      onToggleHighlight={onToggleHighlight}
      onPeekHighlightChange={onPeekHighlightChange}
      peekRequiresPointer={!pressed}
    />
  );
}

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
  const narrow = w < 400;
  const padPl = narrow ? Math.min(q(80), 24) : q(80);
  const padPrTl = narrow ? Math.min(q(39), 12) : q(39);
  const tlColFigma = q(359);
  const tlColForConnect = padPl + padPrTl + connectSuperhandsMinContentPx(headlinePx);
  const tlColPx = Math.min(Math.round(w * 0.65), Math.max(tlColFigma, tlColForConnect));
  const brIdealLeft = q(372);
  /** Nudge BR left only if needed so the block stays wide enough; never left of TL column. */
  const brLeftPx = Math.max(tlColPx, Math.min(brIdealLeft, w - FLOW_BR_MIN_WIDTH_PX));
  const brWidthPx = Math.max(0, w - brLeftPx);
  return {
    rowMinH: q(286),
    padY: narrow ? Math.min(q(80), 32) : q(80),
    padPl,
    padPlBr: narrow ? Math.min(q(80), 16) : q(80),
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
  highlightSuppressed,
  tileSize,
  headlinePx,
  showTile = true,
}: {
  dims: WideFlowDims;
  contentInlineW: number;
  pressed: boolean;
  visualHighlight: boolean;
  tileRef: React.RefObject<HTMLDivElement | null>;
  onToggleHighlight: () => void;
  onPeekHighlightChange: (active: boolean) => void;
  highlightSuppressed: boolean;
  tileSize: "sm" | "lg";
  headlinePx: 20 | 24 | 28;
  showTile?: boolean;
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

        {showTile ? (
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="pointer-events-auto">
              <SuperhandsTile
                ref={tileRef}
                pressed={pressed}
                visualHighlight={visualHighlight}
                size={tileSize}
                onToggleHighlight={onToggleHighlight}
                onPeekHighlightChange={onPeekHighlightChange}
                peekRequiresPointer={highlightSuppressed}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function SetupFlowSection({ showTile = true }: { showTile?: boolean }) {
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
  const [highlightEngaged, setHighlightEngaged] = useState(!showTile);

  useLayoutEffect(() => {
    if (viewportLit) setHighlightEngaged(true);
  }, [viewportLit]);

  const pressed = (viewportLit || highlightEngaged) && !highlightSuppressed;
  const [peekHighlight, setPeekHighlight] = useState(false);
  /** After turning off while pointer/focus stays on the tile, ignore peek until leave (otherwise emitPeek immediately re-lights). */
  const peekBlockedUntilLeaveRef = useRef(false);

  /** Hover/focus on tile previews full highlight when not logically "on" (accent words + glow). */
  const visualHighlight = !showTile || pressed || peekHighlight;

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
        highlightSuppressed={highlightSuppressed}
        tileSize={tileSize}
        headlinePx={headlinePx}
        showTile={showTile}
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
