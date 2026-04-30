/**
 * Brand Router Middleware
 *
 * Detects which domain the request came from and attaches brand context.
 * All three products share the same Node.js/Express deployment.
 * The hostname determines which brand is shown.
 *
 * prolnk.io       → ProLnk (partner network, partner portal, admin)
 * trustypro.io    → TrustyPro (homeowner product, homeowner portal)
 * prolnkmedia.io  → ProLnk Media (advertiser product)
 * *.manus.space   → ProLnk (development/staging)
 * localhost       → ProLnk (local dev)
 *
 * The brand is attached to res.locals.brand and can be read by any route.
 */

import type { Request, Response, NextFunction } from "express";

export type Brand = "prolnk" | "trustypro" | "prolnkmedia";

export interface BrandConfig {
  name: string;
  displayName: string;
  tagline: string;
  primaryColor: string;
  logoText: string;
  defaultPath: string;
  waitlistPath: string;
  supportEmail: string;
}

export const BRAND_CONFIGS: Record<Brand, BrandConfig> = {
  prolnk: {
    name: "prolnk",
    displayName: "ProLnk",
    tagline: "The Home Service Partner Network",
    primaryColor: "#14b8a6",
    logoText: "ProLnk",
    defaultPath: "/",
    waitlistPath: "/waitlist/pro",
    supportEmail: "support@prolnk.io",
  },
  trustypro: {
    name: "trustypro",
    displayName: "TrustyPro",
    tagline: "Your Home. Documented. Protected. Verified.",
    primaryColor: "#4F46E5",
    logoText: "TrustyPro",
    defaultPath: "/",
    waitlistPath: "/waitlist/homeowner",
    supportEmail: "support@trustypro.io",
  },
  prolnkmedia: {
    name: "prolnkmedia",
    displayName: "ProLnk Media",
    tagline: "Reach Verified Homeowners at the Moment They Need You",
    primaryColor: "#7C3AED",
    logoText: "ProLnk Media",
    defaultPath: "/advertise",
    waitlistPath: "/advertise",
    supportEmail: "media@prolnk.io",
  },
};

function detectBrand(hostname: string): Brand {
  const h = hostname.toLowerCase();
  if (h.includes("trustypro")) return "trustypro";
  if (h.includes("prolnkmedia") || h.includes("media.prolnk")) return "prolnkmedia";
  return "prolnk"; // default
}

export function brandMiddleware(req: Request, res: Response, next: NextFunction) {
  const hostname = req.hostname || req.headers.host || "prolnk.io";
  const brand = detectBrand(hostname);
  res.locals.brand = brand;
  res.locals.brandConfig = BRAND_CONFIGS[brand];
  // Also attach to request for use in route handlers
  (req as any).brand = brand;
  (req as any).brandConfig = BRAND_CONFIGS[brand];
  next();
}

// API endpoint to get brand config for a hostname (used by the React frontend)
export function getBrandForHost(hostname: string): BrandConfig {
  return BRAND_CONFIGS[detectBrand(hostname)];
}
