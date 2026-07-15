import type { Metadata } from "next";
import { LANDING_URLS } from "@/components/landing/constants";

export const metadata: Metadata = {
  title: "Superhands — The feedback loop your design system was missing",
  description:
    "Superhands helps fast-moving teams keep quality high by turning design review into a system that learns with every build.",
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
// max, so nothing snaps or overflows at smaller breakpoints.
const fluid = {
  hero: "clamp(34px, 18px + 4.2vw, 70px)",
  section: "clamp(28px, 16px + 2.6vw, 48px)",
  subhead: "clamp(18px, 14px + 0.9vw, 24px)",
  cardTitle: "clamp(20px, 15px + 1vw, 24px)",
  body: "clamp(16px, 13px + 0.7vw, 20px)",
  cardBody: "clamp(15px, 13px + 0.4vw, 17px)",
  button: "clamp(18px, 15px + 0.6vw, 22px)",
  wordmark: "clamp(18px, 15px + 0.6vw, 22px)",
  eyebrow: "clamp(12px, 11px + 0.2vw, 14px)",
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

function ChevronIcon({ stroke = "#444444" }: { stroke?: string }) {
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
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PrimaryButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex h-[59px] shrink-0 items-center justify-center gap-2 rounded-[6px] border border-[#8A8A8A] bg-white px-[18px] pb-4 pt-[14px] transition-opacity hover:opacity-90"
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

function SecondaryButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex h-[59px] shrink-0 items-center justify-center gap-2 rounded-[6px] border border-white/20 bg-transparent px-[18px] pb-4 pt-[14px] transition-colors hover:bg-white/5"
    >
      <span
        className="whitespace-nowrap font-medium leading-[120%] text-white"
        style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.button }}
      >
        {label}
      </span>
      <ChevronIcon stroke="#9A9A9A" />
    </a>
  );
}

function CtaPair() {
  // Both buttons take the width of the widest one (align-stretch on an
  // inline-flex column), so the primary CTA matches the secondary.
  return (
    <div className="inline-flex flex-col items-stretch gap-3">
      <PrimaryButton label="Get a demo" href={LANDING_URLS.waitlist} />
      <SecondaryButton label="See how it works" href={LANDING_URLS.viewDemo} />
    </div>
  );
}

type Feature = {
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    title: "Review during every build",
    body: "Catch quality, consistency, accessibility and pattern issues early, so teams ship faster without product drift.",
  },
  {
    title: "Route human judgement",
    body: "Flag subjective decisions in the PR flow, so designers focus their judgement where it actually changes the outcome.",
  },
  {
    title: "Make the system learn",
    body: "Turn repeated review comments into reusable guidance, so every build makes the design system smarter.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="uppercase text-[#8A8A8A]"
      style={{
        fontFamily: "var(--font-roobert-mono)",
        fontSize: fluid.eyebrow,
        letterSpacing: "0.14em",
      }}
    >
      {children}
    </span>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-[25px] bg-[#0D0D0D] p-8 outline outline-1 outline-white/15">
      <Eyebrow>{`0${index + 1}`}</Eyebrow>
      <h3
        className="font-medium leading-[130%]"
        style={{
          ...gradientText,
          fontFamily: "var(--font-roobert)",
          fontSize: fluid.cardTitle,
        }}
      >
        {feature.title}
      </h3>
      <p
        className="font-normal leading-[150%] text-[#D9D9D9]"
        style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.cardBody }}
      >
        {feature.body}
      </p>
    </div>
  );
}

export default function NewProp3Page() {
  return (
    <div
      className="flex min-h-screen w-full flex-col gap-[100px] bg-black pb-[100px] md:gap-[40px] md:pb-[156px]"
      style={{ fontFamily: "var(--font-roobert)" }}
    >
      {/* Header / hero — full-bleed background */}
      <header
        className="flex w-full flex-1 flex-col"
        style={{
          backgroundImage:
            "linear-gradient(in oklab 180deg, oklab(100% 0 0 / 8%) 0%, oklab(0% 0 0) 100%)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-[60px] px-6 pb-0 pt-[60px] md:px-[60px]">
          <Wordmark />
          <div className="flex h-fit flex-col items-start justify-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
            <h1
              className="w-full max-w-[720px] font-medium leading-[110%]"
              style={{
                ...gradientText,
                fontFamily: "var(--font-roobert)",
                fontSize: fluid.hero,
              }}
            >
              The feedback loop your design system was missing
            </h1>
            <div className="flex w-full max-w-[400px] flex-col items-start justify-center gap-4">
              <p
                className="w-full font-medium leading-[135%] text-[#D9D9D9]"
                style={{ fontSize: fluid.subhead }}
              >
                Superhands helps fast-moving teams keep quality high by turning
                design review into a system that learns with every build.
              </p>
              <CtaPair />
            </div>
          </div>
        </div>
      </header>

      {/* Problem statement */}
      <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10 px-6 py-[60px]">
        <h2
          className="max-w-[760px] text-center font-medium leading-[115%]"
          style={{
            ...gradientText,
            fontFamily: "var(--font-roobert)",
            fontSize: fluid.section,
          }}
        >
          Code output 10x&rsquo;d. <br />
          Design systems didn&rsquo;t.
        </h2>
        <div className="flex max-w-[640px] flex-col items-center gap-6">
          <p
            className="text-center font-normal leading-[150%] text-[#D9D9D9]"
            style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.body }}
          >
            Most design systems document components, tokens, and rules. They
            don&rsquo;t capture the real judgement calls that happen when teams
            ship product.
          </p>
          <p
            className="text-center font-normal leading-[150%] text-[#D9D9D9]"
            style={{ fontFamily: "var(--font-roobert)", fontSize: fluid.body }}
          >
            So review happens late. Designers become bottlenecks. Engineers and
            agents repeat the same mistakes. And the design system never gets
            smarter.
          </p>
        </div>
      </section>

      {/* Features / benefits */}
      <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-6 md:px-[60px]">
        <h2
          className="max-w-[900px] font-medium leading-[120%]"
          style={{
            ...gradientText,
            fontFamily: "var(--font-roobert)",
            fontSize: fluid.section,
          }}
        >
          Superhands reviews work, routes judgement, and makes your design
          system smarter every time you ship.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
