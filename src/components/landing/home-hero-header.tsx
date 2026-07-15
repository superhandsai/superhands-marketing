import { LogoMark } from "@/components/logo-mark";
import { LANDING_URLS } from "@/components/landing/constants";

export function HomeHeroHeader() {
  return (
    <header className="flex w-full flex-col items-center text-center">
      <div className="group/cta relative w-fit max-w-[560px] rounded-[32px] px-12 py-10">
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <rect
            className="group-has-[a:hover]/cta:animate-[border-march_0.7s_linear_infinite]"
            x="0.75"
            y="0.75"
            rx={32}
            ry={32}
            fill="none"
            stroke="var(--landing-divider)"
            strokeWidth={2}
            strokeDasharray="0.25 2.75"
            strokeLinecap="round"
            opacity={0.5}
            pathLength={699}
            style={{ width: "calc(100% - 1.5px)", height: "calc(100% - 1.5px)" }}
          />
        </svg>

        <div className="relative flex flex-col items-center gap-6">
          <div className="flex items-center gap-2.5 group-has-[a:hover]/cta:animate-[logo-pulse-subtle_2s_ease-in-out_infinite]">
            <LogoMark className="h-8 w-[31px] shrink-0" decorative />
            <span className="text-lg font-medium tracking-[-0.7px] text-[var(--landing-fg)] font-heading-mono">
              Superhands
            </span>
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <h1 className="max-w-[400px] text-[32px] lg:text-[40px] font-semibold leading-[1.1] text-[var(--landing-fg)] font-heading">
              Design can&rsquo;t keep pace with AI-speed shipping.
            </h1>

            <p className="text-base font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[420px]">
              Superhands directs design at build time, catches issues early and feeds decisions back into future work so quality can scale.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-base font-semibold leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[420px]">
              Want to learn more?
            </p>

            <a
              href={LANDING_URLS.bookDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center self-center rounded-[14px] border border-[var(--landing-cta-border)] bg-gradient-to-b from-[var(--landing-cta-from)] to-[var(--landing-cta-to)] px-4 py-3 text-base font-semibold leading-[1.44] text-[var(--landing-cta-text)] font-body tracking-[0.01em] [word-spacing:0.08em] transition-all hover:opacity-90 hover:shadow-[0_4px_12px_rgba(3,22,28,0.04)]"
            >
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
