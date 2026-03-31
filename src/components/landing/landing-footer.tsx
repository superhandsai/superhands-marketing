import { LOGO_MARK_PATH_D, LOGO_MARK_VIEWBOX } from "@/components/logo-mark";

export function LandingFooter() {
  return (
    <footer className="px-6 md:px-10 lg:px-16 pb-10 pt-0 max-w-[960px] mx-auto relative overflow-visible">
      <div className="relative flex items-center justify-center h-[236px] pointer-events-none select-none" aria-hidden>
        <svg
          viewBox={LOGO_MARK_VIEWBOX}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
          style={{ opacity: 0.05 }}
        >
          <path
            d={LOGO_MARK_PATH_D}
            fill="var(--landing-fg, #03161c)"
          />
        </svg>
      </div>

      <div
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.25,
        }}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6">
        <div className="flex items-center gap-6">
          <a href="#" className="text-[14px] font-medium font-body text-[var(--landing-fg)] transition-opacity hover:opacity-70">
            LinkedIn
          </a>
          <a href="#" className="text-[14px] font-medium font-body text-[var(--landing-fg)] transition-opacity hover:opacity-70">
            Privacy Policy
          </a>
          <a href="#" className="text-[14px] font-medium font-body text-[var(--landing-fg)] transition-opacity hover:opacity-70">
            Terms of Service
          </a>
        </div>

        <p className="text-[14px] font-medium font-body text-[var(--landing-fg-secondary)]">
          &copy; 2026&ensp;|&ensp;Shipped with Superhands
        </p>
      </div>
    </footer>
  );
}
