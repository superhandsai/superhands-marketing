import type { ReactNode } from "react";

function DottedDivider() {
  return (
    <div
      className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 lg:left-16 lg:right-16"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
        backgroundSize: "8px 3px",
        backgroundRepeat: "repeat-x",
        height: "3px",
        opacity: 0.25,
      }}
    />
  );
}

function FeatureLayout({
  heading,
  subtext,
  mockup,
  reversed,
}: {
  heading: string;
  subtext: string;
  mockup: ReactNode;
  reversed?: boolean;
}) {
  return (
    <section className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 max-w-[960px] mx-auto">
      <div
        className={`flex flex-col items-center gap-10 md:gap-16 lg:gap-24 md:items-start ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="order-2 md:order-none flex-1 shrink-0">
          <h2 className="text-[28px] font-semibold leading-[1.1] font-heading text-[var(--landing-fg)] max-w-[313px]">
            {heading}
          </h2>
          <p className="mt-4 text-base font-medium leading-[1.44] font-body text-[var(--landing-fg-secondary)] max-w-[313px]">
            {subtext}
          </p>
        </div>
        <div className="order-1 md:order-none shrink-0">{mockup}</div>
      </div>
      <DottedDivider />
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * SeeSection – PR list mockup
 * -------------------------------------------------------------------------*/

function SeeMockup() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/See.png"
      srcSet="/images/See.png 410w, /images/See@2x.png 820w"
      sizes="410px"
      alt="Superhands PR list showing open design changes"
      width={410}
      height={410}
      className="w-[410px] h-[410px]"
      loading="lazy"
      decoding="async"
    />
  );
}

export function SeeSection() {
  return (
    <FeatureLayout
      heading="See every change before it ships"
      subtext="See what's changing without touching GitHub."
      mockup={<SeeMockup />}
    />
  );
}

/* ---------------------------------------------------------------------------
 * ReviewSection – Browser inspect mockup
 * -------------------------------------------------------------------------*/

function ReviewMockup() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/Review.png"
      srcSet="/images/Review.png 410w, /images/Review@2x.png 820w"
      sizes="410px"
      alt="Superhands browser inspection interface reviewing a live UI"
      width={410}
      height={410}
      className="w-[410px] h-[410px]"
      loading="lazy"
      decoding="async"
    />
  );
}

export function ReviewSection() {
  return (
    <FeatureLayout
      heading="Review the UI, right in the browser"
      subtext="Compare against the live product. No engineer needed."
      mockup={<ReviewMockup />}
      reversed
    />
  );
}

/* ---------------------------------------------------------------------------
 * FixSection – Style editor mockup
 * -------------------------------------------------------------------------*/

function FixMockup() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/Fix.png"
      srcSet="/images/Fix.png 410w, /images/Fix@2x.png 820w"
      sizes="410px"
      alt="Superhands style editor panel for refining UI without code"
      width={410}
      height={410}
      className="w-[410px] h-[410px]"
      loading="lazy"
      decoding="async"
    />
  );
}

export function FixSection() {
  return (
    <FeatureLayout
      heading="Fix the UI without touching the code"
      subtext="Refine in Superhands. No back-and-forth with engineers."
      mockup={<FixMockup />}
    />
  );
}
