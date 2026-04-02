import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function FeatureLayout({
  heading,
  subtext,
  mockup,
  reversed,
  className,
}: {
  heading: string;
  subtext: string;
  mockup: ReactNode;
  reversed?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("relative px-6 md:px-10 pt-20 pb-20 max-w-[960px] mx-auto", className)}>
      <div
        className={`flex flex-col items-center gap-8 md:gap-16 lg:gap-[60px] md:items-start ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="order-2 md:order-none flex-1 shrink-0 w-full max-w-[410px]">
          <h2 className="text-[28px] md:text-[22px] lg:text-[28px] font-semibold leading-[1.1] font-heading text-[var(--landing-fg)] max-w-[313px] md:-mt-1">
            {heading}
          </h2>
          <p className="mt-2 text-base font-medium leading-[1.44] font-body text-[var(--landing-fg-secondary)] max-w-[313px]">
            {subtext}
          </p>
        </div>
        <div className="order-1 md:order-none shrink-0 overflow-hidden lg:w-[50%] lg:shrink 2xl:flex-1 2xl:basis-0">{mockup}</div>
      </div>
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
      sizes="(min-width: 1024px) 410px, (min-width: 768px) 200px, 410px"
      alt="Superhands PR list showing open design changes"
      width={410}
      height={410}
      className="w-full max-w-[410px] aspect-square md:w-[200px] md:h-[200px] md:max-w-none lg:w-full lg:h-auto lg:max-w-none 2xl:w-full 2xl:h-auto transition-transform duration-300 ease-out hover:scale-[1.01]"
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
      sizes="(min-width: 1024px) 410px, (min-width: 768px) 200px, 410px"
      alt="Superhands browser inspection interface reviewing a live UI"
      width={410}
      height={410}
      className="w-full max-w-[410px] aspect-square md:w-[200px] md:h-[200px] md:max-w-none lg:w-full lg:h-auto lg:max-w-none 2xl:w-full 2xl:h-auto transition-transform duration-300 ease-out hover:scale-[1.01]"
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
      className="pt-0 lg:pt-20 pb-20"
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
      sizes="(min-width: 1024px) 410px, (min-width: 768px) 200px, 410px"
      alt="Superhands style editor panel for refining UI without code"
      width={410}
      height={410}
      className="w-full max-w-[410px] aspect-square md:w-[200px] md:h-[200px] md:max-w-none lg:w-full lg:h-auto lg:max-w-none 2xl:w-full 2xl:h-auto transition-transform duration-300 ease-out hover:scale-[1.01]"
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
      className="pt-0 lg:pt-20"
    />
  );
}
