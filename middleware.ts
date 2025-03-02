import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// Define your supported locales
const locales = ["en", "fr", "ar"];
const defaultLocale = "ar";

// Get locale from request
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // If no language is found, use the default locale
  if (!languages || languages.length === 0) {
    languages = [defaultLocale];
  }

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Get pathname from request (e.g. /blog, /about)
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname does not have locale, redirect to default locale
  if (!pathnameHasLocale) {
    // Get locale from Accept-Language header
    const locale = getLocale(request);

    // Create new URL with the selected locale
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Preserve query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      newUrl.searchParams.set(key, value);
    });

    // Redirect to the new URL
    return NextResponse.redirect(newUrl);
  }
}

// Configure the middleware to only run on specified paths
export const config = {
  matcher: [
    // Match all pathnames except those starting with:
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
