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
      className="w-full max-w-[840px] h-auto"
      loading="lazy"
      decoding="async"
    />
  );
}

export function GitHubSection() {
  return (
    <section className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 max-w-[960px] mx-auto">
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-[16px] font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body">
            For engineers
          </p>
          <h2 className="mt-2 text-[28px] font-semibold leading-[1.1] font-heading text-[var(--landing-fg)] max-w-[316px]">
            Superhands lives in your GitHub workflow
          </h2>
        </div>

        <GitHubMockup />

        <p className="text-[16px] font-medium leading-[1.44] text-[var(--landing-fg-secondary)] font-body max-w-[291px] self-end md:text-right">
          The design review happens in the PR, so your team doesn&rsquo;t need to change how they work.
        </p>
      </div>

    </section>
  );
}
