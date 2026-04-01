function GitHubMockup() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/GitHub.png"
      srcSet="/images/GitHub.png 820w, /images/GitHub@2x.png 1640w"
      sizes="(min-width: 768px) min(840px, calc(100vw - var(--sidebar-w) - 80px)), calc(100vw - 48px)"
      alt="GitHub PR review showing Superhands bot approval with design changes"
      width={820}
      height={410}
      className="w-full h-auto transition-transform duration-300 ease-out hover:scale-[1.005]"
      loading="lazy"
      decoding="async"
    />
  );
}

export function GitHubSection() {
  return (
    <section className="relative px-6 md:px-10 pt-20 pb-20 md:pt-20 md:pb-20 max-w-[960px] mx-auto">
      <div
        className="absolute top-0 left-6 right-6 md:left-10 md:right-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--landing-divider) 1px, transparent 1px)",
          backgroundSize: "8px 3px",
          backgroundRepeat: "repeat-x",
          height: "3px",
          opacity: 0.5,
        }}
      />
      <div className="flex flex-col">
        <div className="mb-1">
          <p className="text-[16px] font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            For engineers
          </p>
          <h2 className="mt-2 text-[28px] md:text-[22px] lg:text-[28px] font-semibold leading-[1.1] font-heading text-[var(--landing-fg)] max-w-[316px]">
            Superhands lives in your GitHub workflow
          </h2>
        </div>

        <div className="overflow-hidden">
          <GitHubMockup />
        </div>

        <p className="mt-6 text-[16px] font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[291px] self-end text-left">
          Design review happens in the PR, so your team doesn&rsquo;t need to change how they work.
        </p>
      </div>

    </section>
  );
}
