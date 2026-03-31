export function LandingFooter() {
  return (
    <footer className="px-6 md:px-10 pb-10 pt-0 max-w-[960px] mx-auto relative overflow-visible">
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.5,
        }}
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/Footer.png"
        srcSet="/images/Footer.png 1x, /images/Footer@2x.png 2x"
        alt=""
        role="presentation"
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none"
        loading="lazy"
        decoding="async"
      />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6">
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
