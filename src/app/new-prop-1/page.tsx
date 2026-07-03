import type { Metadata } from "next";
import { LANDING_URLS } from "@/components/landing/constants";

export const metadata: Metadata = {
  title: "Superhands — Design reviews for every product change",
  description:
    "Design reviews for every product change, without blocking releases. For AI-powered teams that ship faster and stay aligned with their design system.",
};

// Subtle top-to-bottom light gradient used on headings (matches the Paper design).
const gradientText: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(in oklab 180deg, oklab(100% 0 0) 0%, oklab(88.5% 0 0) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  // Tight line-height + background-clip:text clips descenders on the last line;
  // a small bottom pad extends the paint box so glyphs like "g"/"p" aren't cut.
  paddingBottom: "0.12em",
};

// Fluid type scale — smoothly interpolates between a mobile min and the desktop
// max from the design, so nothing snaps or overflows at smaller breakpoints.
const fluid = {
  hero: "clamp(34px, 18px + 4.2vw, 70px)", // design 70px
  section: "clamp(28px, 16px + 2.6vw, 48px)", // design 48px
  subhead: "clamp(18px, 14px + 0.9vw, 24px)", // design 24px medium
  cardTitle: "clamp(20px, 15px + 1vw, 24px)", // design 24px medium
  body: "clamp(16px, 13px + 0.7vw, 20px)", // design 20px
  cardBody: "clamp(14px, 12px + 0.4vw, 16px)", // design 16px
  button: "clamp(18px, 15px + 0.6vw, 22px)", // design 22px
  wordmark: "clamp(18px, 15px + 0.6vw, 22px)", // design 22px
} as const;

function LogoMark() {
  return (
    <svg
      viewBox="21.092 21.088 36.158 36.169"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    >
      <path
        d="M34.967 21.136C36.679 21.136 38.184 21.475 39.474 22.149 40.766 22.791 41.782 23.726 42.533 24.957 43.251 26.191 43.611 27.636 43.611 29.305 43.611 30.977 43.287 32.352 42.643 33.436 41.998 34.489 41.112 35.353 39.998 36.028 38.878 36.671 37.611 37.212 36.197 37.65L34.111 38.274C32.921 38.626 31.875 39.02 30.98 39.46 30.114 39.901 29.427 40.487 28.932 41.218 28.46 41.946 28.224 42.931 28.224 44.162 28.224 46.005 28.809 47.413 29.974 48.378 30.663 48.952 31.452 49.359 32.35 49.604 32.398 50.548 32.575 51.424 32.882 52.221 31.812 52.074 30.846 51.774 29.974 51.319 28.681 50.676 27.666 49.739 26.921 48.511 26.199 47.281 25.842 45.829 25.842 44.162 25.842 42.493 26.161 41.113 26.808 40.03 27.452 38.978 28.334 38.116 29.45 37.442 30.575 36.794 31.839 36.255 33.255 35.816L35.341 35.194 35.778 35.058C36.79 34.737 37.686 34.386 38.47 34.005 39.337 33.57 40.021 32.98 40.519 32.25 40.987 31.517 41.226 30.534 41.226 29.305 41.226 27.462 40.641 26.058 39.474 25.089 38.282 24.097 36.778 23.597 34.967 23.597 34.627 23.597 34.294 23.613 33.97 23.649 33.885 22.78 33.689 21.981 33.386 21.242 33.895 21.172 34.418 21.136 34.967 21.136Z"
        fill="#FFFFFF"
      />
      <path
        d="M29.382 26.041C29.686 26.774 29.88 27.577 29.97 28.443 29.09 28.538 28.28 28.754 27.535 29.094 26.518 29.562 25.706 30.295 25.114 31.29 24.515 32.286 24.221 33.589 24.221 35.2V37.264H21.836V35.2C21.836 33.15 22.245 31.451 23.066 30.102 23.862 28.729 24.95 27.688 26.343 26.988 27.274 26.509 28.29 26.194 29.382 26.041Z"
        fill="#FFFFFF"
      />
      <path
        d="M45.468 26.126C46.53 26.274 47.493 26.574 48.359 27.026 49.657 27.671 50.667 28.607 51.419 29.834 52.137 31.065 52.497 32.512 52.497 34.182 52.497 35.852 52.173 37.228 51.533 38.313 50.883 39.369 49.999 40.231 48.882 40.902 47.762 41.546 46.498 42.087 45.085 42.529L42.997 43.154C41.807 43.504 40.761 43.897 39.869 44.339 38.994 44.778 38.313 45.362 37.819 46.098 37.343 46.828 37.11 47.806 37.11 49.035 37.11 50.885 37.694 52.288 38.859 53.253 40.056 54.25 41.559 54.748 43.368 54.748 43.461 54.748 43.548 54.744 43.645 54.743 43.71 55.622 43.891 56.434 44.179 57.174 43.91 57.196 43.645 57.205 43.368 57.205 41.654 57.205 40.157 56.872 38.859 56.197 37.568 55.552 36.549 54.615 35.806 53.385 35.086 52.154 34.726 50.707 34.726 49.035 34.726 47.37 35.048 45.991 35.693 44.913 36.339 43.852 37.222 42.987 38.337 42.318 39.456 41.674 40.722 41.133 42.142 40.693L44.226 40.07 44.667 39.933C45.674 39.619 46.573 39.266 47.357 38.883 48.224 38.442 48.906 37.859 49.406 37.129 49.877 36.394 50.109 35.416 50.109 34.182 50.109 32.341 49.529 30.933 48.359 29.97 47.666 29.393 46.874 28.983 45.972 28.741 45.929 27.791 45.758 26.92 45.468 26.126Z"
        fill="#FFFFFF"
      />
      <path
        d="M56.501 43.141C56.501 45.193 56.09 46.893 55.271 48.236 54.478 49.614 53.379 50.651 51.993 51.357 50.847 51.944 49.574 52.288 48.181 52.381 47.895 51.637 47.717 50.826 47.647 49.945 48.802 49.914 49.855 49.681 50.798 49.249 51.821 48.779 52.622 48.047 53.223 47.05 53.817 46.06 54.114 44.754 54.114 43.141V41.077H56.501V43.141Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function Wordmark() {
  return (
    <div className="flex items-center gap-2">
      <LogoMark />
      <span
        className="font-medium leading-[28px] text-white"
        style={{ fontFamily: "var(--font-roobert-mono)", fontSize: fluid.wordmark }}
      >
        Superhands
      </span>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M6.25 7.5L13.75 15L6.25 22.5M12.25 7.5L19.75 15L12.25 22.5"
        fill="none"
        stroke="#444444"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CtaButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex h-[59px] shrink-0 items-center justify-center gap-2 rounded-[6px] bg-white px-[18px] pb-4 pt-[14px] outline outline-1 outline-[#8A8A8A] transition-opacity hover:opacity-90"
    >
      <span
        className="whitespace-nowrap font-medium leading-[120%] text-[#0D0D0D]"
        style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.button }}
      >
        {label}
      </span>
      <ChevronIcon />
    </a>
  );
}

type Feature = {
  title: React.ReactNode;
  body: string;
  variant: "dark" | "bright";
};

const FEATURES: Feature[] = [
  {
    title: "Review every product change automatically",
    body: "Superhands reviews product changes against your design system as your team ships more.",
    variant: "dark",
  },
  {
    title: (
      <>
        Open code changes in <br />
        visual previews
      </>
    ),
    body: "See each code change as a live product preview, without pulling branches or running local dev.",
    variant: "bright",
  },
  {
    title: (
      <>
        Agents flag <br />
        issues and suggest fixes
      </>
    ),
    body: "Catch spacing, layout, state, and accessibility issues with suggested fixes before they ship.",
    variant: "bright",
  },
  {
    title: (
      <>
        Specify changes directly in <br />
        the browser
      </>
    ),
    body: "Specify fixes, inspect elements, and make UI changes quickly without leaving the browser.",
    variant: "dark",
  },
  {
    title: (
      <>
        Keep feedback <br />
        in the same PR workflow
      </>
    ),
    body: "Send clear design feedback to engineers or agents as prompts, or integrated fixes.",
    variant: "dark",
  },
  {
    title: "Improve your design system over time",
    body: "Turn review feedback into better docs, rules, and agent instructions.",
    variant: "bright",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const src =
    feature.variant === "dark"
      ? "/images/new-prop-1/dither-dark.png"
      : "/images/new-prop-1/dither-bright.png";

  return (
    <div className="flex w-full max-w-[500px] flex-col gap-6 rounded-[25px] bg-[#0D0D0D] p-6 outline outline-1 outline-white/15">
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="h-[320px] w-full rounded-[8px] object-cover"
      />
      <div className="flex items-center gap-4">
        <h3
          className="min-w-0 flex-1 font-medium leading-[130%]"
          style={{
            ...gradientText,
            fontFamily: "var(--font-roobert)",
            fontSize: fluid.cardTitle,
          }}
        >
          {feature.title}
        </h3>
        <p
          className="min-w-0 flex-1 font-normal leading-[140%] text-[#D9D9D9]"
          style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.cardBody }}
        >
          {feature.body}
        </p>
      </div>
    </div>
  );
}

export default function NewProp1Page() {
  return (
    <div
      className="flex min-h-screen w-full flex-col gap-[100px] bg-black md:gap-[156px]"
      style={{ fontFamily: "var(--font-roobert)" }}
    >
      {/* Header / hero — full-bleed background */}
      <header
        className="w-full"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, oklab(100% 0 0 / 8%) 0%, oklab(0% 0 0) 100%)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[60px] px-6 pt-[60px] md:px-[60px]">
          <Wordmark />
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center lg:gap-20">
            <h1
              className="w-full max-w-[793px] font-medium leading-[110%]"
              style={{
                ...gradientText,
                fontFamily: "var(--font-roobert)",
                fontSize: fluid.hero,
              }}
            >
              Design reviews for every product change, without blocking
              releases.
            </h1>
            <div className="flex w-full max-w-[257px] flex-col items-start justify-center gap-[26px]">
              <p
                className="font-medium leading-[130%] text-[#D9D9D9]"
                style={{ fontSize: fluid.subhead }}
              >
                For AI-powered teams that ship faster and stay aligned with
                their design system.
              </p>
              <CtaButton label="Connect your repo" href={LANDING_URLS.waitlist} />
            </div>
          </div>
        </div>
      </header>

      {/* Intro statement */}
      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 px-6">
          <h2
            className="max-w-[574px] text-center font-medium leading-[110%]"
            style={{
              ...gradientText,
              fontFamily: "var(--font-roobert)",
              fontSize: fluid.section,
            }}
          >
            Code output 10x&rsquo;d. <br />
            Design hasn&rsquo;t caught up.
          </h2>
          <div className="flex flex-col items-center gap-6">
            <p
              className="max-w-[337px] text-center font-normal leading-[140%] text-[#D9D9D9]"
              style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.body }}
            >
              At scale, human reviewers alone can&rsquo;t keep design quality
              consistent.
            </p>
            <p
              className="max-w-[401px] text-center font-normal leading-[140%] text-[#D9D9D9]"
              style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.body }}
            >
              Superhands flags design issues and suggests fixes before they
              ship.
            </p>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-20 px-6">
          <div className="grid w-full max-w-[1080px] grid-cols-1 justify-items-center gap-20 md:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </div>
        </section>

        {/* Security */}
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 px-6">
          <img
            src="/images/new-prop-1/dither-oval.png"
            alt=""
            aria-hidden="true"
            className="h-[234px] w-[401px] max-w-full rounded-full object-cover"
          />
          <div className="flex flex-col items-center gap-6">
            <h2
              className="max-w-[574px] text-center font-medium leading-[110%]"
              style={{
                ...gradientText,
                fontFamily: "var(--font-roobert)",
                fontSize: fluid.section,
              }}
            >
              Architected for security.
            </h2>
            <p
              className="max-w-[401px] text-center font-normal leading-[140%] text-[#D9D9D9]"
              style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.body }}
            >
              Superhands works without requiring access to your secrets or
              environment variables.
            </p>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 md:px-[120px]">
          <h2
            className="w-full max-w-[664px] font-medium leading-[110%]"
            style={{
              ...gradientText,
              fontFamily: "var(--font-roobert)",
              fontSize: fluid.section,
            }}
          >
            Shipping fast doesn&rsquo;t mean design has to get sloppy.
          </h2>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-[201px]">
            <p
              className="w-full max-w-[574px] font-medium leading-[130%] text-[#D9D9D9]"
              style={{ fontSize: fluid.subhead }}
            >
              With Superhands, design feedback on product changes takes minutes,
              not days.
            </p>
            <CtaButton label="Get started" href={LANDING_URLS.waitlist} />
          </div>
        </section>

        {/* Footer — full-bleed background */}
        <footer
          className="w-full"
          style={{
            backgroundImage:
              "linear-gradient(in oklab 180deg, oklab(0% 0 0) 0%, oklab(100% 0 0 / 8%) 100%)",
          }}
        >
          <div className="mx-auto flex w-full max-w-[1280px] items-center justify-center gap-2 px-[60px] pb-[60px]">
            <Wordmark />
          </div>
        </footer>
    </div>
  );
}
