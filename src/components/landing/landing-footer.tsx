"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "hello@superhands.ai";
const linkClass =
  "shrink-0 cursor-pointer whitespace-nowrap text-[14px] max-[355px]:text-[13px] font-medium font-body text-[var(--landing-fg)] opacity-80 transition-opacity hover:opacity-60";

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Fallback for older browsers / denied clipboard
      const el = document.createElement("textarea");
      el.value = EMAIL;
      el.setAttribute("readonly", "");
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }

    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={onCopy}
        className={linkClass}
        aria-label={`Copy ${EMAIL} to clipboard`}
      >
        {EMAIL}
      </button>
      {copied ? (
        <span
          role="status"
          className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--landing-fg)] px-2 py-1 text-[12px] font-medium text-[var(--landing-bg)] font-body shadow-sm"
        >
          Copied
        </span>
      ) : null}
    </span>
  );
}

export function LandingFooter() {
  return (
    <footer
      className="px-6 md:px-10 pt-0 max-w-[960px] mx-auto relative overflow-visible"
      style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/Footer.png"
        srcSet="/images/Footer.png 1x, /images/Footer@2x.png 2x"
        alt=""
        role="presentation"
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none"
        loading="lazy"
        decoding="async"
      />

      <div className="relative pt-6">
        <div className="flex w-full flex-col items-center justify-center gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/superhandsai/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
            <CopyEmailButton />
            <span
              className="hidden translate-y-px text-[10px] text-[var(--landing-fg)] opacity-80 sm:inline"
              aria-hidden="true"
            >
              |
            </span>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap text-[14px] max-[355px]:text-[13px] font-medium font-body text-[var(--landing-fg-secondary)]">
            <span>Shipped with Superhands</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
