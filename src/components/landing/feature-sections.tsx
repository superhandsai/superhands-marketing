import type { ReactNode } from "react";

const INTER = { fontFamily: "'Inter', sans-serif" } as const;

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
        className={`flex flex-col items-center gap-10 md:gap-16 lg:gap-24 md:items-center ${
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
 * Icons
 * -------------------------------------------------------------------------*/

function GitMergeIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 6v6M6 5c2 0 4 1 6 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 11l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 9.5l3-3M9 5l1.5-1.5a2.12 2.12 0 0 1 3 3L12 8M7 11L5.5 12.5a2.12 2.12 0 0 1-3-3L4 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SidebarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="2"
        width="14"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6 2v12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12V4m0 0L4 8m4-4l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H6l-3 2.5V11H4a2 2 0 0 1-2-2V4z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
 * SeeSection – PR list mockup
 * -------------------------------------------------------------------------*/

const PR_ITEMS = [
  {
    title: "Add footer navigation",
    author: "Lara",
    color: "#e8b4b8",
    changes: 6,
    time: "42m ago",
    number: "#58",
    isNew: true,
  },
  {
    title: "Add interactive search bar",
    author: "Jackson",
    color: "#b4c8e8",
    changes: 1,
    time: "1d ago",
    number: "#47",
    isNew: false,
  },
  {
    title: "Fix homepage search filters",
    author: "Jackson",
    color: "#b4c8e8",
    changes: 2,
    time: "1d ago",
    number: "#46",
    isNew: false,
  },
  {
    title: "Update review count icons",
    author: "Lara",
    color: "#e8b4b8",
    changes: 1,
    time: "2d ago",
    number: "#52",
    isNew: true,
  },
] as const;

function SeeMockup() {
  return (
    <div
      className="relative w-[410px] h-[410px] rounded-[37px] border border-[rgba(82,82,84,0.05)] overflow-hidden bg-gradient-to-t from-[#e4e4e4] to-[#fcfcfc]"
      style={INTER}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-[30px] w-[340px]">
        <div className="bg-white rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-4">
          <div className="flex gap-2 mb-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-[11px] font-semibold text-[#1a1a1a] shadow-[0_0_0_1px_rgba(0,0,0,0.08)]">
              Open
              <span className="bg-[#f0f0f0] text-[10px] text-[#666] rounded-full px-1.5 py-0.5 leading-none">
                9
              </span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f5f5f5] rounded-full text-[11px] font-medium text-[#888]">
              Approved
              <span className="bg-[#eaeaea] text-[10px] text-[#999] rounded-full px-1.5 py-0.5 leading-none">
                3
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-[10px]">
            {PR_ITEMS.map((pr) => (
              <div
                key={pr.number}
                className="bg-white rounded-[12px] border border-[rgba(0,0,0,0.06)] p-3"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[12px] font-semibold text-[#1a1a1a] leading-tight">
                    {pr.title}
                  </span>
                  {pr.isNew && (
                    <span className="bg-[#c4f2ff] text-[#00a0cd] text-[9px] uppercase font-semibold rounded-full px-2 py-0.5 leading-none whitespace-nowrap">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#999]">
                  <div
                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                    style={{ backgroundColor: pr.color }}
                  >
                    {pr.author[0]}
                  </div>
                  <span className="text-[#666]">{pr.author}</span>
                  <span className="text-[#ccc]">&middot;</span>
                  <span>
                    {pr.changes} change{pr.changes !== 1 && "s"}
                  </span>
                  <span className="text-[#ccc]">&middot;</span>
                  <span>{pr.time}</span>
                  <span className="ml-auto flex items-center gap-1 text-[#bbb]">
                    <GitMergeIcon size={10} />
                    {pr.number}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none rounded-b-[16px]"
          style={{
            background:
              "linear-gradient(to top, #e4e4e4, transparent)",
          }}
        />
      </div>
    </div>
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
    <div
      className="relative w-[410px] h-[410px] rounded-[37px] border border-[rgba(82,82,84,0.05)] overflow-hidden bg-[#2d2d2d]"
      style={INTER}
    >
      {/* Browser chrome */}
      <div className="flex items-center h-[32px] px-3 bg-[#1e1e1e] gap-2">
        <div className="flex gap-1.5">
          <div className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
          <div className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
          <div className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[#383838] rounded-md px-3 py-1 text-[9px] leading-none flex items-center gap-0.5">
            <span className="text-white">app.superhands.ai</span>
            <span className="text-[#888]">/c/61b138a4</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center h-[30px] px-3 bg-white border-b border-[#e5e5e5] gap-3">
        <div className="text-[#999]">
          <SidebarIcon />
        </div>
        <div className="flex items-center gap-0 text-[10px] font-medium">
          <span className="px-2 py-1 text-[#999]">Live</span>
          <span className="px-2 py-1 text-[#00a0cd] border-b-2 border-[#00a0cd]">
            Inspecting
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative bg-white" style={{ height: "calc(100% - 62px)" }}>
        {/* Hero section */}
        <div
          className="flex items-end justify-center pb-3"
          style={{
            height: 100,
            background: "linear-gradient(to bottom, #171c24, #283448)",
          }}
        >
          <span className="text-white text-[14px] font-bold">
            Find your next stay
          </span>
        </div>

        {/* Search bar */}
        <div className="flex items-center mx-6 -mt-4 relative z-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] h-[32px] px-3 text-[8px] text-[#999]">
          <div className="flex items-center gap-1 flex-1 border-r border-[#eee] pr-2">
            <span className="text-[#333] font-semibold text-[8px]">Where</span>
            <span className="text-[#bbb]">Search destinations</span>
          </div>
          <div className="flex items-center gap-1 flex-1 pl-2">
            <span className="text-[#333] font-semibold text-[8px]">
              Check in
            </span>
            <span className="text-[#bbb]">Add dates</span>
          </div>
          <div className="w-[20px] h-[20px] rounded-full bg-[#00a0cd] flex items-center justify-center text-white ml-2">
            <SearchIcon size={10} />
          </div>
        </div>

        {/* Content area */}
        <div className="px-6 pt-5">
          <span className="text-[11px] font-bold text-[#1a1a1a] block mb-2">
            Homes
          </span>
          <div className="flex gap-2">
            <div className="w-[80px] h-[56px] rounded-lg bg-gradient-to-br from-[#fde68a] to-[#f59e0b]" />
            <div className="w-[80px] h-[56px] rounded-lg bg-gradient-to-br from-[#93c5fd] to-[#3b82f6]" />
            <div className="w-[80px] h-[56px] rounded-lg bg-gradient-to-br from-[#a7f3d0] to-[#10b981]" />
          </div>
        </div>

        {/* Inspection overlays */}
        <div className="absolute top-[107px] left-[24px] w-[110px] h-[32px] border-2 border-[#00a0cd] rounded pointer-events-none" />
        <div className="absolute top-[155px] left-[24px] w-[80px] h-[56px] border-2 border-[#00a0cd] rounded-lg pointer-events-none" />

        {/* Measurement badge */}
        <div className="absolute top-[142px] left-[62px] bg-[#c4f2ff] text-[#00a0cd] text-[8px] font-bold rounded px-1.5 py-0.5 leading-none">
          16
        </div>

        {/* Cursor */}
        <svg
          className="absolute"
          style={{ top: 168, left: 112 }}
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1l4 16 2.5-5.5L13 9z" fill="#1a1a1a" stroke="white" strokeWidth="1" />
        </svg>
      </div>
    </div>
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
    <div
      className="relative w-[410px] h-[410px] rounded-[37px] border border-[rgba(82,82,84,0.05)] overflow-hidden bg-[#fcfcfc]"
      style={INTER}
    >
      {/* Faded website preview background */}
      <div className="absolute inset-0 opacity-[0.35] p-8 pt-10">
        <div className="w-full h-[18px] rounded bg-[#ddd] mb-3" />
        <div className="w-3/4 h-[10px] rounded bg-[#e5e5e5] mb-2" />
        <div className="w-2/3 h-[10px] rounded bg-[#e5e5e5] mb-6" />
        <div className="flex gap-3">
          <div className="w-1/3 h-[60px] rounded-lg bg-[#e0e0e0]" />
          <div className="w-1/3 h-[60px] rounded-lg bg-[#e0e0e0]" />
          <div className="w-1/3 h-[60px] rounded-lg bg-[#e0e0e0]" />
        </div>
        <div className="mt-4 w-full h-[10px] rounded bg-[#e5e5e5] mb-2" />
        <div className="w-5/6 h-[10px] rounded bg-[#e5e5e5]" />
      </div>

      {/* Floating style editor panel */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[40px] w-[340px] rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] overflow-hidden">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 px-5 pt-4 pb-2 text-[9px] text-[#bbb]">
          <span>Page</span>
          <span>/</span>
          <span>Section</span>
          <span>/</span>
          <span className="text-[#666]">Button</span>
        </div>

        {/* State tabs */}
        <div className="flex items-center gap-1.5 px-5 pb-3">
          {["Normal", "Hover", "Active", "Disabled"].map((tab) => (
            <span
              key={tab}
              className={`px-3 py-1 text-[10px] font-medium rounded-full ${
                tab === "Normal"
                  ? "bg-[#c4f2ff] text-[#00a0cd]"
                  : "bg-white text-[#999] border border-[#e5e5e5]"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Margin / Padding */}
        <div className="flex gap-3 px-5 pb-3">
          <div className="flex-1">
            <span className="text-[9px] text-[#999] font-medium block mb-1">
              Margin
            </span>
            <div className="flex items-center bg-white rounded-lg border border-[#e5e5e5] h-[30px] px-2 gap-1.5">
              <span className="text-[#ccc]">
                <LinkIcon size={10} />
              </span>
              <span className="text-[11px] text-[#333] font-medium flex-1">
                16
              </span>
              <span className="text-[10px] text-[#ccc]">px</span>
            </div>
          </div>
          <div className="flex-1">
            <span className="text-[9px] text-[#999] font-medium block mb-1">
              Padding
            </span>
            <div className="flex items-center bg-white rounded-lg border border-[#e5e5e5] h-[30px] px-2 gap-1.5">
              <span className="text-[#ccc]">
                <LinkIcon size={10} />
              </span>
              <span className="text-[11px] text-[#333] font-medium flex-1">
                2
              </span>
              <span className="text-[10px] text-[#ccc]">px</span>
            </div>
          </div>
        </div>

        {/* Fill */}
        <div className="px-5 pb-3">
          <span className="text-[9px] text-[#999] font-medium block mb-1">
            Fill
          </span>
          <div className="flex items-center bg-white rounded-lg border border-[#e5e5e5] h-[30px] px-2 gap-2">
            <div className="w-[16px] h-[16px] rounded bg-[#e6eaef] border border-[#ddd]" />
            <span className="text-[11px] text-[#333] font-medium tracking-wide">
              ECEFF3
            </span>
            <span className="ml-auto text-[10px] text-[#999]">100 %</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-[#e8e8e8]" />

        {/* AI prompt */}
        <div className="flex items-center gap-2 px-5 py-3">
          <div className="w-[3px] h-[20px] rounded-full bg-[#00a0cd]" />
          <span className="text-[11px] text-[#ccc] italic flex-1">
            Describe a style change..
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-5 pb-4">
          <div className="flex items-center gap-2 text-[#bbb]">
            <CommentIcon />
            <PlusIcon />
          </div>
          <div className="w-[28px] h-[28px] rounded-full bg-[#00a0cd] flex items-center justify-center text-white">
            <ArrowUpIcon />
          </div>
        </div>
      </div>
    </div>
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
