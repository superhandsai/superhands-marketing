"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const EMAIL = "hello@superhands.ai";
const COPIED_HOLD_MS = 1800;
const linkClass =
  "shrink-0 cursor-pointer whitespace-nowrap text-[14px] max-[355px]:text-[13px] font-medium font-body text-[var(--landing-fg)] opacity-80 transition-opacity duration-300";
const linkHoverClass = "hover:opacity-60";
const labelLayerClass =
  "col-start-1 row-start-1 inline-flex items-center justify-center gap-1 transition-opacity duration-300 ease-in-out";

function CopiedIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 5.25C22 3.45507 20.5449 2 18.75 2H11.25C9.45508 2 8 3.45507 8 5.25V8H5.25C3.45508 8 2 9.45507 2 11.25V18.75C2 20.5449 3.45507 22 5.25 22H12.75C14.5449 22 16 20.5449 16 18.75V16H18.75C20.5449 16 22 14.5449 22 12.75V5.25ZM16 14H18.75C19.4404 14 20 13.4404 20 12.75V5.25C20 4.55964 19.4404 4 18.75 4H11.25C10.5596 4 10 4.55964 10 5.25V8H12.75C14.5449 8 16 9.45507 16 11.25V14Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [suppressHover, setSuppressHover] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    setSuppressHover(true);
    buttonRef.current?.blur();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), COPIED_HOLD_MS);
  };

  const onPointerEnter = () => {
    setHovered(true);
    if (!copied) setSuppressHover(false);
  };

  const onPointerLeave = () => {
    setHovered(false);
    if (!copied) setSuppressHover(false);
  };

  const showCopyTooltip = hovered && !copied && !suppressHover;

  return (
    <span className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        onClick={onCopy}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        className={cn(linkClass, "inline-flex items-center gap-1", !copied && linkHoverClass)}
        aria-label={copied ? "Copied" : `Copy ${EMAIL} to clipboard`}
      >
        <span className="grid items-center justify-items-center">
          <span
            className={cn(labelLayerClass, copied && "opacity-0")}
            aria-hidden={copied}
          >
            {EMAIL}
            <CopiedIcon className="size-3.5 shrink-0 md:hidden" />
          </span>
          <span
            role="status"
            aria-hidden={!copied}
            className={cn(
              labelLayerClass,
              copied ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <CopiedIcon className="hidden size-3.5 shrink-0 md:inline" />
            Copied
            <CopiedIcon className="size-3.5 shrink-0 md:hidden" />
          </span>
        </span>
      </button>
      <span
        aria-hidden={!showCopyTooltip}
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-[var(--landing-fg)] px-1.5 py-0.5 text-[12px] font-medium text-[var(--landing-bg)] font-body transition-[opacity,transform] duration-200 ease-out max-md:hidden",
          showCopyTooltip ? "translate-y-0 opacity-100" : "translate-y-0.5 opacity-0",
          copied && "duration-0",
        )}
      >
        Copy
        <span
          aria-hidden
          className="absolute left-1/2 top-full -mt-px h-0 w-0 -translate-x-1/2 border-x-[4px] border-t-[4px] border-x-transparent border-t-[var(--landing-fg)]"
        />
      </span>
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
              className={cn(linkClass, linkHoverClass)}
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
