import { NextRequest, NextResponse } from "next/server";

const URL_PROXY_BASE = "https://app.superhands.ai/url-proxy";
const PUBLIC_PATH_PREFIXES = ["/fonts/", "/images/"];
const PUBLIC_PATHS = new Set(["/favicon.ico", "/favicon.svg"]);
// Marketing pages served by this app (in addition to "/"). Anything not listed
// here is treated as a URL to hand off to the external url-proxy.
const MARKETING_PATHS = new Set(["/new-prop-1", "/new-prop-2", "/new-prop-3"]);

function safelyDecodePath(path: string) {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function asHttpsUrlForBareDomain(value: string) {
  try {
    const url = new URL(`https://${value}`);

    if (!url.hostname.includes(".")) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function appendSearch(value: string, search: string) {
  if (!search) {
    return value;
  }

  return value.includes("?") ? `${value}&${search.slice(1)}` : `${value}${search}`;
}

function restoreCollapsedProtocol(value: string) {
  return value.replace(/^(https?):\/(?!\/)/i, "$1://");
}

function isApplicationPath(pathname: string) {
  return (
    pathname === "/" ||
    MARKETING_PATHS.has(pathname.replace(/\/$/, "")) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    PUBLIC_PATHS.has(pathname) ||
    PUBLIC_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function getUrlToProxy(request: NextRequest) {
  const { nextUrl } = request;
  const pathValue = restoreCollapsedProtocol(
    safelyDecodePath(nextUrl.pathname.replace(/^\/+/, "")),
  );

  if (isHttpUrl(pathValue)) {
    return appendSearch(pathValue, nextUrl.search);
  }

  const bareDomainUrl = asHttpsUrlForBareDomain(pathValue);
  if (bareDomainUrl) {
    return appendSearch(bareDomainUrl, nextUrl.search);
  }

  return new URL(`${nextUrl.pathname}${nextUrl.search}`, nextUrl.origin).toString();
}

export function proxy(request: NextRequest) {
  if (isApplicationPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const redirectUrl = new URL(URL_PROXY_BASE);
  redirectUrl.searchParams.set("url", getUrlToProxy(request));

  return NextResponse.redirect(redirectUrl, 307);
}

export const config = {
  matcher: ["/((?!_next(?:/|$)).*)"],
};
