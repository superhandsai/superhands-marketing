import { LogoMark } from "@/components/logo-mark";
import { LANDING_URLS } from "./constants";

export function LandingSidebar() {
  return (
    <aside
      className="hidden md:flex fixed top-0 left-0 h-screen flex-col justify-between z-40"
      style={{ width: `var(--sidebar-w)` }}
    >
      <div className="flex flex-col gap-0 px-10 pt-10">
        {/* Logo + wordmark */}
        <div className="flex items-center gap-2.5">
          <LogoMark
            className="h-8 w-[31px] shrink-0"
            decorative
          />
          <span
            className="text-lg font-medium tracking-[-0.36px] text-[var(--landing-fg)] font-heading"
          >
            Superhands
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mt-4 text-[40px] font-semibold leading-[1.1] text-[var(--landing-fg)] font-heading"
        >
          Pull requests
          <br />
          for designers
        </h1>

        {/* Subline */}
        <p
          className="mt-2.5 text-base leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[266px]"
        >
          Review and refine product changes before they ship.
        </p>

        {/* CTA */}
        <a
          href={LANDING_URLS.waitlist}
          className="mt-5 inline-flex items-center justify-center self-start rounded-[14px] border border-[var(--landing-cta-border)] bg-gradient-to-b from-[var(--landing-cta-from)] to-[var(--landing-cta-to)] px-4 py-3 text-base font-semibold leading-[1.44] text-[var(--landing-cta-text)] font-body transition-opacity hover:opacity-90"
        >
          Join the Waitlist
        </a>
      </div>

      {/* Footer links */}
      <div className="px-10 pb-10">
        <div
          className="mb-5 w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
            backgroundSize: "8px 3px",
            backgroundRepeat: "repeat-x",
            height: "3px",
            opacity: 0.25,
          }}
        />
        <div className="flex items-center gap-6 text-base font-medium leading-[1.44] text-[var(--landing-fg)] font-body">
          <a
            href={LANDING_URLS.bookDemo}
            className="transition-opacity hover:opacity-70"
          >
            Book a Demo
          </a>
          <a
            href={LANDING_URLS.login}
            className="transition-opacity hover:opacity-70"
          >
            Log in
          </a>
        </div>
      </div>
    </aside>
  );
}
