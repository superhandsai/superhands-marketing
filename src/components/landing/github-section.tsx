function SuperhandsBadge() {
  return (
    <div className="w-8 h-8 rounded-lg bg-[#0c1117] flex items-center justify-center">
      <svg
        viewBox="0 0 39 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
      >
        <path
          d="M26.415 5.65625C27.598 5.82254 28.6771 6.15868 29.6504 6.66699C31.01 7.34666 32.1014 8.31693 32.9219 9.57617L33.082 9.83105L33.083 9.83301C33.8929 11.2189 34.2949 12.8487 34.2949 14.7178C34.2949 16.584 33.9352 18.1343 33.2061 19.3604L33.2051 19.3613C32.4796 20.5483 31.4891 21.5208 30.2363 22.2773L30.2344 22.2783C28.9888 22.9979 27.5787 23.6024 26.0049 24.0918H26.0039L23.6963 24.7842H23.6953C22.382 25.1722 21.2342 25.6068 20.2529 26.0898L20.2539 26.0908C19.3093 26.5692 18.5707 27.2056 18.0342 27.998L18.0332 27.9971C17.5295 28.7816 17.2725 29.8428 17.2725 31.1904C17.2725 33.2078 17.9084 34.7279 19.165 35.7705L19.4111 35.9678C20.663 36.9191 22.2144 37.3974 24.0723 37.3975C24.1727 37.3975 24.2731 37.3953 24.373 37.3926L24.4912 37.3896L24.501 37.5078C24.5762 38.4715 24.772 39.3598 25.0859 40.1738L25.1465 40.332L24.9775 40.3428C24.8294 40.3529 24.68 40.3608 24.5293 40.3662L24.0723 40.375C22.1597 40.375 20.477 39.9978 19.0273 39.2402V39.2393C17.5784 38.5144 16.4339 37.4605 15.5977 36.0771L15.5967 36.0752C14.787 34.6893 14.3848 33.0594 14.3848 31.1904C14.3848 29.3245 14.7447 27.7747 15.4736 26.5488L15.4746 26.5469C16.2001 25.36 17.1907 24.3884 18.4434 23.6318L18.4453 23.6309L18.9199 23.3662C20.0459 22.7618 21.2976 22.2456 22.6748 21.8174H22.6758L24.9834 21.125L25.4688 20.9766C26.582 20.6265 27.5679 20.2402 28.4268 19.8174C29.3708 19.3391 30.1092 18.7032 30.6455 17.9111C31.1493 17.1265 31.4072 16.0656 31.4072 14.7178C31.4072 12.7005 30.7713 11.1812 29.5146 10.1387V10.1377C28.765 9.51033 27.9016 9.06519 26.9238 8.80078L26.8359 8.77637L26.832 8.68555C26.782 7.64702 26.5977 6.6927 26.2803 5.82227L26.209 5.62695L26.415 5.65625Z"
          fill="#e6edf3"
        />
      </svg>
    </div>
  );
}

function GreenCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4 shrink-0"
    >
      <circle cx="8" cy="8" r="8" fill="#3fb950" />
      <path
        d="M5 8.5L7 10.5L11 6"
        stroke="#0d1117"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BotBadge() {
  return (
    <span className="text-[11px] font-medium leading-none px-1.5 py-0.5 rounded-full border border-[#30363d] text-[#7d8590]">
      bot
    </span>
  );
}

function GitHubMockup() {
  return (
    <div className="w-full max-w-[815px] h-[410px] rounded-[37px] border border-[rgba(82,82,84,0.05)] overflow-hidden bg-gradient-to-t from-[#e4e4e4] to-[#fcfcfc] relative">
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="mb-4">
          <SuperhandsBadge />
        </div>

        <div className="flex-1 flex items-start justify-center">
          <div className="w-full max-w-[680px] rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#30363d] flex items-center gap-2 flex-wrap">
              <GreenCheckIcon />
              <span className="text-[13px] font-semibold text-[#e6edf3]">superhands-connect</span>
              <BotBadge />
              <span className="text-[13px] text-[#7d8590]">approved these changes 3 days ago</span>
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="text-[13px] font-semibold text-[#e6edf3]">superhands-connect</span>
                <BotBadge />
                <span className="text-[13px] text-[#7d8590]">left a comment</span>
              </div>

              <div className="bg-[#0d1117] rounded-lg border border-[#30363d] p-4 text-[13px] leading-relaxed text-[#e6edf3]">
                <p className="mb-3">
                  <a href="#" className="text-[#58a6ff] transition-opacity hover:opacity-70">grant@superhands.ai</a>
                  {" "}approved this PR via{" "}
                  <a href="#" className="text-[#58a6ff] transition-opacity hover:opacity-70">Superhands</a>.
                </p>

                <div className="border-l-4 border-[#30363d] pl-3 mb-3 text-[#e6edf3]">
                  <span aria-hidden="true" role="img">&#x1F525;</span> Letss gooo
                </div>

                <p className="font-semibold mb-2">Changes made:</p>
                <ul className="list-disc list-inside space-y-1 text-[#e6edf3]">
                  <li>Reduce paragraph spacing in page layout</li>
                  <li>Remove uppercase transform and drop shadow from h1 heading</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-[260px] h-[200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(81,202,235,0.12) 0%, transparent 70%)",
        }}
      />
    </div>
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
    </section>
  );
}
