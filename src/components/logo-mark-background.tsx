import { LOGO_MARK_PATH_D, LOGO_MARK_VIEWBOX } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

/**
 * Home-only backdrop: solid page fill at z-0, watermark at z-1, both `fixed` inside the page
 * `isolate` root so they sit *below* content (`relative z-10`) but *above* nothing else — the
 * watermark stays visible through transparent sections (hero). Do not portal to `body` with
 * `main z-1` or the opaque page background hides the mark everywhere except the footer.
 */
export function LogoMarkPageBackground({ className }: { className?: string }) {
  return (
    <>
      <div
        className="logo-page-bg fixed inset-0 z-0 bg-background transition-colors duration-500 ease-out motion-reduce:transition-none"
        aria-hidden
      />
      <div
        className={cn(
          "logo-page-watermark pointer-events-none fixed inset-0 z-[1] flex items-start justify-end overflow-hidden pt-0 pr-0 transition-[filter,opacity] duration-500 ease-out motion-reduce:transition-none",
          className
        )}
        aria-hidden
      >
        <div className="translate-x-[min(5vw,2.5rem)] -translate-y-[min(16vmin,8rem)]">
          <svg
            viewBox={LOGO_MARK_VIEWBOX}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[min(288vmin,176rem)] w-auto max-w-[min(95vw,208rem)] shrink-0 animate-logo-watermark-drift motion-reduce:animate-none"
          >
            <defs>
              <linearGradient
                id="logo-watermark-gradient"
                x1="0"
                y1="0"
                x2="39"
                y2="41"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.08} />
                <stop offset="42%" stopColor="var(--foreground)" stopOpacity={0.02} />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0.07} />
              </linearGradient>
            </defs>
            <path d={LOGO_MARK_PATH_D} fill="url(#logo-watermark-gradient)" />
          </svg>
        </div>
      </div>
    </>
  );
}
