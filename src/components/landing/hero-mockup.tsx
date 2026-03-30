"use client";

import { useRef, useEffect, useState } from "react";

const W = 762;
const H = 489;

/* eslint-disable @next/next/no-img-element */

export function HeroMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="relative mx-auto"
        style={{ width: W * scale, height: H * scale }}
      >
        <div
          className="absolute top-0 left-0"
          style={{
            width: W,
            height: H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Cover />
        </div>
      </div>
    </div>
  );
}

function Cover() {
  return (
    <div className="relative w-[762px] h-[489px] bg-gradient-to-t from-[#e4e4e4] to-[#fcfcfc] overflow-hidden rounded-[8px]">
      {/* ── Browser Chrome ── */}
      <BrowserTitleBar />
      <BrowserAddressBar />

      {/* ── Left sidebar background ── */}
      <div className="absolute left-0 w-[190.5px] h-[498.31px] bg-[#fcfcfc] border-r-[0.929px] border-[rgba(82,82,84,0.05)]" style={{ top: "calc(50% + 44.82px)", transform: "translateY(-50%)" }} />

      {/* ── Left sidebar content ── */}
      <SidebarPRHeader />
      <SidebarChangeCount />
      <SidebarDivider />
      <SidebarChangeItem />

      {/* ── Main viewport ── */}
      <MainViewport />

      {/* ── App toolbar (above viewport) ── */}
      <AppToolbar />

      {/* ── Inspector panel (floating) ── */}
      <InspectorPanel />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Browser Chrome
   ───────────────────────────────────────────── */

function BrowserTitleBar() {
  return (
    <div className="absolute top-0 left-0 w-[762px] h-[20px] bg-[#242424] border-b-[10px] border-[#383838]">
      {/* Traffic lights */}
      <div className="absolute bottom-[-10px] left-0 h-[18px] w-[42px]">
        <img alt="" className="absolute block max-w-none size-full" src="/images/hero/chrome-traffic-lights.svg" />
      </div>

      {/* Active tab */}
      <div className="absolute bottom-[-10px] left-[42px] flex gap-[4px] h-[18px] items-center bg-[#383838] rounded-tl-[8px] rounded-tr-[8px] p-[8px]">
        <div className="shrink-0 size-[8px]">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/chrome-favicon.svg" />
        </div>
        <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative shrink-0">
          <span className="col-start-1 row-start-1 mt-[5.34px] text-[7px] font-normal text-[rgba(252,252,252,0.8)] whitespace-nowrap leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
            Superhands — Pull requests
          </span>
          <div className="col-start-1 row-start-1 ml-[69.96px] w-[24.04px] h-[17px] bg-gradient-to-l from-[#383838] to-[rgba(56,56,56,0)]" />
        </div>
        <div className="shrink-0 size-[7px]">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-tab-close.svg" />
        </div>
      </div>

      {/* Right tab bar area */}
      <div className="absolute bottom-[-10px] left-[175px] flex items-center justify-between w-[587px]">
        <div className="flex-1 flex h-[18px] items-center bg-[#242424] p-[2px] rounded-bl-[8px]">
          <div className="flex flex-col h-full items-center justify-center overflow-hidden px-[6px] py-[3px] rounded-[4px] shrink-0 w-[14px]">
            <div className="shrink-0 size-[7px] relative">
              <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame26.svg" />
            </div>
          </div>
        </div>
        <div className="flex h-[18px] items-center bg-[#242424] pb-[2px] pr-[2px] shrink-0">
          <div className="flex flex-col h-full items-center justify-center bg-[#383838] overflow-hidden px-[6px] py-[3px] rounded-[7px] shrink-0 w-[16px]">
            <div className="shrink-0 size-[7px] relative">
              <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame27.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserAddressBar() {
  return (
    <div className="absolute top-[20px] left-0 w-[762px] h-[20px] bg-[#383838] flex items-center pb-[4px] pt-[3px] px-[2px]">
      {/* Nav buttons */}
      <div className="flex gap-[8px] h-full items-center pl-[6px] pr-[8px] shrink-0">
        <div className="shrink-0 size-[7.731px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/chrome-back.svg" />
        </div>
        <div className="shrink-0 size-[7.731px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/chrome-forward.svg" />
        </div>
        <div className="shrink-0 size-[6.73px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/chrome-reload.svg" />
        </div>
      </div>

      {/* URL bar */}
      <div className="flex-1 flex h-full items-center bg-[#242424] px-[5px] rounded-[37.171px]">
        <p className="text-[6px] leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="text-[#fcfcfc]">app.superhands.ai</span>
          <span className="text-[#b5b5b5]">/c/61b138a4</span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Left Sidebar Sections
   ───────────────────────────────────────────── */

function SidebarPRHeader() {
  return (
    <div className="absolute left-[0.93px] top-[40.15px] w-[188.641px] flex items-center justify-between p-[7.434px] border-b-[0.929px] border-[rgba(82,82,84,0.05)]">
      <div className="flex gap-[7.434px] items-center shrink-0">
        {/* Superhands logo */}
        <div className="h-[14.868px] w-[14.255px] shrink-0 relative">
          <div className="absolute" style={{ inset: "-0.37% -0.39% -0.38% -0.39%" }}>
            <img alt="" className="block max-w-none size-full" src="/images/hero/icon-superhands-logo.svg" />
          </div>
        </div>

        {/* PR info */}
        <div className="flex flex-col items-start shrink-0">
          <span className="text-[7.434px] font-medium text-[#29292b] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Add interactive search bar
          </span>
          <div className="flex gap-[1.778px] h-[8.363px] items-center w-full">
            <div className="flex gap-[1.778px] h-[8.363px] items-center justify-center shrink-0">
              <div className="shrink-0 size-[6.221px] relative">
                <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-pr.svg" />
              </div>
              <span className="text-[5.777px] font-normal text-[rgba(41,41,43,0.8)] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
                #47
              </span>
            </div>
            <span className="text-[3.555px] text-[rgba(41,41,43,0.8)] text-center w-[2.222px] leading-[1.44]">•</span>
            <span className="text-[5.777px] font-normal text-[rgba(41,41,43,0.8)] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
              Jackson
            </span>
            <span className="text-[3.555px] text-[rgba(41,41,43,0.8)] text-center w-[2.222px] leading-[1.44]">•</span>
            <span className="text-[5.777px] font-normal text-[rgba(41,41,43,0.8)] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
              1d ago
            </span>
          </div>
        </div>

        {/* Dropdown icon */}
        <div className="shrink-0 size-[9.293px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame5.svg" />
        </div>
      </div>

      {/* Expand icon */}
      <div className="shrink-0 size-[9.293px] relative">
        <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame6.svg" />
      </div>
    </div>
  );
}

function SidebarChangeCount() {
  return (
    <div className="absolute left-[0.93px] top-[74.54px] w-[188.641px] flex items-center justify-between pl-[7.434px]">
      <span className="text-[7.434px] font-normal text-[rgba(41,41,43,0.8)] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
        1 change
      </span>
      <div className="flex gap-[3.717px] h-[26.02px] items-center p-[7.434px] border-l-[0.929px] border-[rgba(82,82,84,0.05)] shrink-0">
        <span className="text-[7.434px] font-medium text-[#909091] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Demo
        </span>
        <div className="shrink-0 size-[8.363px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame7.svg" />
        </div>
      </div>
    </div>
  );
}

function SidebarDivider() {
  return (
    <div className="absolute left-[0.93px] top-[88.48px] w-[188.641px] h-0">
      <img alt="" className="absolute block max-w-none size-full" src="/images/hero/line-divider-h.svg" />
    </div>
  );
}

function SidebarChangeItem() {
  return (
    <div className="absolute left-[0.93px] top-[100.56px] w-[188.641px] flex flex-col gap-[3.717px] items-start justify-center px-[7.434px] py-[9.293px] border-t-[0.929px] border-b-[0.929px] border-[rgba(82,82,84,0.05)]">
      <div className="flex gap-[9.293px] items-center w-full shrink-0">
        <span className="flex-1 text-[7.434px] font-normal text-[#29292b] leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          {`New interactive search bar with location & date pickers`}
        </span>
        <div className="shrink-0 size-[8.363px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame1.svg" />
        </div>
      </div>
      <div className="flex items-start justify-center shrink-0">
        <div className="shrink-0 size-[8.363px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame2.svg" />
        </div>
        <div className="shrink-0 size-[8.363px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame3.svg" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Viewport (right side)
   ───────────────────────────────────────────── */

function MainViewport() {
  return (
    <div className="absolute left-[190.5px] top-[74.54px] w-[571.5px] h-[473.927px] bg-white">
      {/* Dark hero header */}
      <div
        className="absolute top-0 right-[-2.19px] w-[573.693px] h-[169.595px] border-b-[0.929px] border-[#0a0c10]"
        style={{ backgroundImage: "linear-gradient(103.55deg, rgb(23,28,36) 2.92%, rgb(33,43,59) 49.51%, rgb(23,28,36) 96.11%)" }}
      />
      <p
        className="absolute left-1/2 -translate-x-1/2 top-[-1.55px] -translate-y-1/2 text-[24.161px] font-bold text-[#e6eaef] whitespace-nowrap leading-[1.44]"
        style={{ fontFamily: "'Manrope', sans-serif" }}
      >
        Find your next stay today
      </p>

      {/* Search bar */}
      <SearchBar />

      {/* Content screenshot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[170.99px] w-[544.551px] h-[364.576px]">
        <img alt="Travel listings" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/images/hero/viewport-screenshot.png" />
      </div>

      {/* Search dropdown popup */}
      <SearchDropdown />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-[0.31px] right-0 w-[571.5px] h-[191.429px] flex items-center justify-center">
        <div className="rotate-180 h-[191.429px] w-[571.5px] relative">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/images/hero/viewport-gradient.png" />
        </div>
      </div>

      {/* Inspection highlights */}
      <div className="absolute left-[11.8px] top-[47.48px] w-[95.988px] h-[7.868px] border-[1.124px] border-[#00a0cd]" style={{ left: "calc(50% - 285.75px + 11.8px)" }} />
      <div className="absolute left-[11.78px] top-[64.34px] w-[201.499px] h-[37.093px] border-[1.124px] border-[#00a0cd]" style={{ left: "calc(50% - 285.75px + 11.78px)" }} />

      {/* Cursor icon */}
      <div className="absolute left-[87.57px] top-[77.48px] size-[19.214px]" style={{ left: "calc(50% - 285.75px + 87.57px)" }}>
        <div className="absolute" style={{ inset: "-14.62% -26.33% -38.03% -26.33%" }}>
          <img alt="" className="block max-w-none size-full" src="/images/hero/icon-cursor.svg" />
        </div>
      </div>

      {/* Measurement indicator */}
      <div
        className="absolute left-[51.7px] top-[55.35px] w-[12.926px] h-[8.992px] flex items-center justify-center bg-[#c4f2ff] border-l-[1.124px] border-[#00a0cd] px-[0.562px] py-[1.686px] shadow-[0px_2.248px_4.496px_0px_rgba(0,0,0,0.1)]"
        style={{ left: "calc(50% - 285.75px + 51.7px)" }}
      >
        <span className="text-[5.62px] font-medium text-[#00a0cd] text-center whitespace-nowrap leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
          16
        </span>
      </div>
    </div>
  );
}

function SearchBar() {
  const fields = [
    { label: "Where", sub: "Search destinations", dim: true },
    { label: "Check in", sub: "Add dates" },
    { label: "Check out", sub: "Add dates" },
    { label: "Guests", sub: "Add guests" },
  ];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-158.54px)] -translate-y-1/2 flex gap-[23.605px] items-center justify-center h-[50.898px] px-[23.605px] py-[5.901px] bg-[#fcfcfc] border-[0.746px] border-[rgba(82,82,84,0.05)] rounded-[29.506px]">
      {fields.map((f, i) => (
        <div key={f.label} className="flex items-center gap-[23.605px] shrink-0">
          {i > 0 && (
            <div className="flex h-[27.293px] items-center justify-center w-0 shrink-0">
              <div className="rotate-90 h-0 w-[27.293px] relative">
                <div className="absolute" style={{ inset: "-0.74px 0 0 0" }}>
                  <img alt="" className="block max-w-none size-full" src="/images/hero/line-divider-v.svg" />
                </div>
              </div>
            </div>
          )}
          <div className={`flex flex-col items-start leading-[0] shrink-0 ${f.dim ? "opacity-75" : ""}`}>
            <span className={`text-[7.376px] font-bold text-[#171c24] leading-[1.44] ${f.dim ? "opacity-75" : ""}`} style={{ fontFamily: "'Manrope', sans-serif" }}>
              {f.label}
            </span>
            <span className="text-[8.852px] font-medium text-[#808080] leading-[1.44] whitespace-nowrap" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {f.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchDropdown() {
  const destinations = [
    { city: "San Francisco", region: "California", highlighted: true },
    { city: "Miami", region: "Florida" },
    { city: "New York City", region: "New York" },
    { city: "Los Angeles", region: "California" },
  ];

  return (
    <div className="absolute right-[261.94px] top-[110.59px] w-[225.929px] h-[187.712px] bg-[#fcfcfc] border-[0.568px] border-[rgba(82,82,84,0.05)] rounded-[15.905px] shadow-[0px_4.544px_9.089px_0px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Search input */}
      <div className="absolute left-[11.8px] top-[11.8px] w-[200.919px] h-[26.696px] border-[0.562px] border-[rgba(128,128,128,0.5)] rounded-[6.182px]" />
      <div className="absolute left-[18.54px] top-[20.09px] size-[10.116px]">
        <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-search.svg" />
      </div>

      {/* Popular destinations label */}
      <span
        className="absolute left-[46.8px] top-[51.48px] -translate-x-1/2 -translate-y-1/2 text-[5.62px] font-semibold text-[#808080] text-center uppercase whitespace-nowrap leading-[1.44]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Popular destinations
      </span>

      {/* Highlighted row background */}
      <div className="absolute left-[12.36px] top-[64.91px] w-[201.482px] h-[37.093px] bg-[#eceff3] rounded-[6.182px]" />

      {/* Destination rows */}
      {destinations.map((d, i) => {
        const topOffset = 78 + i * 28;
        const subOffset = topOffset + 10.74;
        return (
          <div key={d.city}>
            <span
              className="absolute left-[21.93px] text-[7.868px] font-medium text-[#171c24] leading-[1.44] -translate-y-1/2"
              style={{ top: `${topOffset}px`, fontFamily: "'Manrope', sans-serif" }}
            >
              {d.city}
            </span>
            <span
              className="absolute left-[21.93px] text-[6.744px] font-medium text-[#808080] leading-[1.44] -translate-y-1/2"
              style={{ top: `${subOffset}px`, fontFamily: "'Manrope', sans-serif" }}
            >
              {d.region}
            </span>
          </div>
        );
      })}

      {/* Cyan inspection borders */}
      <div className="absolute left-[11.8px] top-[47.48px] w-[95.988px] h-[7.868px] border-[1.124px] border-[#00a0cd]" />
      <div className="absolute left-[11.78px] top-[64.34px] w-[201.499px] h-[37.093px] border-[1.124px] border-[#00a0cd]" />

      {/* Cursor */}
      <div className="absolute left-[87.57px] top-[77.48px] size-[19.214px]">
        <div className="absolute" style={{ inset: "-14.62% -26.33% -38.03% -26.33%" }}>
          <img alt="" className="block max-w-none size-full" src="/images/hero/icon-cursor.svg" />
        </div>
      </div>

      {/* Measurement badge */}
      <div className="absolute left-[51.7px] top-[55.35px] w-[12.926px] h-[8.992px] flex items-center justify-center bg-[#c4f2ff] border-l-[1.124px] border-[#00a0cd] px-[0.562px] py-[1.686px] shadow-[0px_2.248px_4.496px_0px_rgba(0,0,0,0.1)]">
        <span className="text-[5.62px] font-medium text-[#00a0cd] text-center whitespace-nowrap leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
          16
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   App Toolbar
   ───────────────────────────────────────────── */

function AppToolbar() {
  return (
    <div className="absolute left-[190.5px] top-[40.15px] w-[570.571px] h-[34.383px] bg-[#fcfcfc] border-b-[0.929px] border-[rgba(82,82,84,0.05)] flex items-center">
      {/* Live tab */}
      <div className="flex gap-[3.717px] h-[32.524px] items-center px-[14.868px] py-[7.434px] border-r-[0.929px] border-[rgba(82,82,84,0.05)] shrink-0">
        <div className="shrink-0 size-[9.293px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-eye.svg" />
        </div>
        <span className="text-[7.434px] font-medium text-[#909091] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Live
        </span>
      </div>

      {/* Inspecting tab (active) */}
      <div className="flex gap-[3.717px] h-[32.524px] items-center px-[14.868px] py-[7.434px] bg-gradient-to-b from-[#fafafa] from-[55.321%] to-[#f5f5f5] border-b-[1.859px] border-[#00a0cd] shrink-0">
        <div className="shrink-0 size-[9.293px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-inspect.svg" />
        </div>
        <span className="text-[7.434px] font-medium text-[#00a0cd] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Inspecting
        </span>
      </div>

      {/* Nav icons */}
      <div className="flex gap-[9.293px] h-[32.524px] items-center px-[9.293px] border-l-[0.929px] border-[rgba(82,82,84,0.05)] shrink-0">
        <div className="shrink-0 size-[10.222px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame10.svg" />
        </div>
        <div className="shrink-0 size-[10.222px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame11.svg" />
        </div>
        <div className="shrink-0 size-[10.222px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame12.svg" />
        </div>
      </div>

      {/* URL bar area */}
      <div className="flex-1 flex h-[32.524px] items-center bg-[#fcfcfc] py-[5.576px] rounded-tr-[33.454px]">
        <div className="flex-1 flex h-full items-center justify-between bg-[#f7f7f7] border-[0.929px] border-[#efefef] px-[7.434px] py-[3.717px] rounded-[37.171px]">
          <div className="flex items-center shrink-0">
            <div className="shrink-0 size-[10.222px] relative">
              <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame13.svg" />
            </div>
            <div className="shrink-0 size-[8.518px] relative">
              <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame14.svg" />
            </div>
          </div>
          <div className="shrink-0 size-[9.293px] relative">
            <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame15.svg" />
          </div>
        </div>
      </div>

      {/* Right action icons */}
      <div className="flex gap-[1.859px] h-[32.524px] items-center justify-center pl-[9.293px] shrink-0">
        <div className="shrink-0 size-[10.222px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame16.svg" />
        </div>
        <div className="shrink-0 size-[9.293px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame17.svg" />
        </div>
      </div>

      {/* Approve button */}
      <div className="flex flex-col h-[32.524px] items-center justify-center px-[7.434px] py-[5.576px] shrink-0">
        <div className="flex-1 flex gap-[1.859px] items-center justify-center bg-gradient-to-b from-[#1fc146] to-[#1daf40] border-[0.465px] border-[rgba(82,82,84,0.02)] px-[5.576px] rounded-[11.151px]">
          <div className="shrink-0 size-[9.293px] relative">
            <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-approve.svg" />
          </div>
          <span className="text-[7.434px] font-medium text-[#fcfcfc] whitespace-nowrap leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
            Approve
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Inspector Panel (floating)
   ───────────────────────────────────────────── */

function InspectorPanel() {
  return (
    <div className="absolute bottom-[14.54px] w-[206.298px] h-[236.963px] bg-gradient-to-b from-[#fafafa] from-[63.246%] to-[#f5f5f5] border-[0.551px] border-[rgba(82,82,84,0.05)] rounded-[13.094px] shadow-[0px_4.365px_8.729px_0px_rgba(0,0,0,0.1)]" style={{ left: "calc(50% - 262.98px)" }}>
      {/* Breadcrumb */}
      <div className="absolute bottom-[212.49px] left-[8.18px] flex gap-[3.717px] items-center">
        <span className="text-[8.729px] font-normal text-[rgba(41,41,43,0.5)] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          search
        </span>
        <div className="shrink-0 size-[7.434px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame25.svg" />
        </div>
        <span className="text-[8.729px] font-normal text-[#29292b] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          div.flex
        </span>
      </div>

      {/* Close button */}
      <div className="absolute bottom-[209.18px] left-[176.22px] size-[20.732px] flex items-center justify-center px-[7.093px] py-[4.365px]">
        <div className="shrink-0 size-[9.293px] relative">
          <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame24.svg" />
        </div>
      </div>

      {/* State tabs */}
      <div className="absolute bottom-[186.89px] left-[8.18px] w-[188.772px] flex gap-[4.365px] items-center">
        {/* Normal (active) */}
        <div className="flex-1 flex items-center justify-center bg-[#c4f2ff] border-[0.546px] border-[rgba(82,82,84,0.05)] px-[8.729px] py-[3.274px] rounded-[21.823px]">
          <span className="text-[7.638px] font-medium text-[#00a0cd] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
            Normal
          </span>
        </div>
        {["Hover", "Active", "Disabled"].map((label) => (
          <div key={label} className="flex-1 flex items-center justify-center bg-[#fcfcfc] border-[0.546px] border-[rgba(82,82,84,0.05)] px-[8.729px] py-[3.274px] rounded-[21.823px]">
            <span className="text-[7.638px] font-normal text-[rgba(41,41,43,0.5)] whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Margin / Padding row */}
      <div className="absolute bottom-[136.7px] left-[8.18px] w-[188.772px] flex gap-[13.094px] items-center">
        <InspectorInput label="Margin" value="16" />
        <InspectorInput label="Padding" value="2" />
      </div>

      {/* Fill row */}
      <div className="absolute bottom-[86.5px] left-[8.18px] w-[188.772px] flex flex-col gap-[4.365px] items-start">
        <span className="text-[7.638px] font-normal text-[rgba(41,41,43,0.5)] w-full leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Fill
        </span>
        <div className="flex items-center w-full">
          <div className="flex-1 flex gap-[4.365px] items-center bg-[#fcfcfc] border-[0.546px] border-[rgba(82,82,84,0.05)] overflow-hidden p-[4.365px] rounded-tl-[4.365px] rounded-bl-[4.365px]">
            <div className="size-[13.094px] bg-[#e6eaef] rounded-[1.091px] shrink-0" />
            <span className="text-[7.638px] font-medium text-[rgba(41,41,43,0.8)] text-center whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
              808080
            </span>
          </div>
          <div className="flex items-center justify-between w-[31.098px] h-[21.823px] bg-[#fcfcfc] border-[0.546px] border-[rgba(82,82,84,0.05)] border-l-0 overflow-hidden p-[4.365px] rounded-tr-[4.365px] rounded-br-[4.365px] shrink-0">
            <span className="text-[7.638px] font-medium text-[rgba(41,41,43,0.8)] text-center leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
              100
            </span>
            <span className="text-[7.638px] font-medium text-[#909091] text-center leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
              %
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal divider */}
      <div className="absolute bottom-[78.01px] left-[-0.55px] w-[206.231px] h-0">
        <div className="absolute" style={{ inset: "-0.55px 0 0 0" }}>
          <img alt="" className="block max-w-none size-full" src="/images/hero/inspector-line-h.svg" />
        </div>
      </div>

      {/* Vertical divider tick */}
      <div className="absolute bottom-[57.35px] left-[8.18px] flex h-[11.525px] items-center justify-center w-0">
        <div className="rotate-90 h-0 w-[11.525px] relative">
          <div className="absolute" style={{ inset: "-0.55px 0 0 0" }}>
            <img alt="" className="block max-w-none size-full" src="/images/hero/inspector-line-v.svg" />
          </div>
        </div>
      </div>

      {/* Style change input */}
      <span
        className="absolute bottom-[62.65px] left-[9.27px] translate-y-1/2 text-[8.729px] font-normal text-[rgba(41,41,43,0.5)] whitespace-nowrap leading-[1.44]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Describe a style change..
      </span>

      {/* Bottom toolbar */}
      <div className="absolute bottom-[8.18px] left-[8.18px] size-[21.823px]">
        <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame20.svg" />
      </div>
      <div className="absolute bottom-[8.18px] left-[33.82px] size-[21.823px]">
        <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame21.svg" />
      </div>
      <div className="absolute bottom-[8.18px] left-[175.13px] size-[21.823px]">
        <img alt="" className="absolute block max-w-none size-full" src="/images/hero/icon-frame19.svg" />
      </div>
    </div>
  );
}

function InspectorInput({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 flex flex-col gap-[4.365px] items-start">
      <span className="text-[7.638px] font-normal text-[rgba(41,41,43,0.5)] w-full leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
      </span>
      <div className="flex items-center justify-between w-full h-[21.823px] bg-[#fcfcfc] border-[0.546px] border-[rgba(82,82,84,0.05)] overflow-hidden pl-[5.456px] py-[4.365px] rounded-[4.365px]">
        <div className="flex gap-[4.365px] items-center shrink-0">
          <div className="shrink-0 size-[6.547px] relative">
            <div className="absolute" style={{ inset: "-6.25%" }}>
              <img alt="" className="block max-w-none size-full" src="/images/hero/icon-link.svg" />
            </div>
          </div>
          <span className="text-[7.638px] font-medium text-[rgba(41,41,43,0.8)] text-center whitespace-nowrap leading-[1.44]" style={{ fontFamily: "'Inter', sans-serif" }}>
            {value}
          </span>
        </div>
        <div className="shrink-0 size-[20.732px] relative">
          <img alt="" className="absolute block max-w-none size-full" src={label === "Margin" ? "/images/hero/icon-frame22.svg" : "/images/hero/icon-frame23.svg"} />
        </div>
      </div>
    </div>
  );
}
