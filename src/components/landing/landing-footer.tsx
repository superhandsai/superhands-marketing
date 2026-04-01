export function LandingFooter() {
  return (
    <footer className="group/footer px-6 md:px-10 pb-10 pt-0 max-w-[960px] mx-auto relative overflow-visible">
      <div
        className="group-has-[a:hover]/footer:animate-[dot-march_0.7s_linear_infinite]"
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
          <a href="https://www.linkedin.com/company/superhandsai/" target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium font-body text-[var(--landing-fg)] opacity-80 transition-opacity hover:opacity-60">
            LinkedIn
          </a>
          <a href="https://app.superhands.ai/privacy" target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium font-body text-[var(--landing-fg)] opacity-80 transition-opacity hover:opacity-60">
            Privacy Policy
          </a>
          <a href="https://app.superhands.ai/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium font-body text-[var(--landing-fg)] opacity-80 transition-opacity hover:opacity-60">
            Terms of Service
          </a>
        </div>

        <div className="flex items-center gap-2 text-[14px] font-medium font-body text-[var(--landing-fg-secondary)]">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-[10px]">|</span>
          <span>Shipped with Superhands</span>
        </div>
      </div>
    </footer>
  );
}
