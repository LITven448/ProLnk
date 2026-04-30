/**
 * Brand detection for the React frontend.
 *
 * Reads window.location.hostname and returns the active brand.
 * Used to conditionally render the right logo, colors, and navigation.
 */

export type Brand = "prolnk" | "trustypro" | "prolnkmedia";

export interface BrandConfig {
  name: Brand;
  displayName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  logoText: string;
  faviconEmoji: string;
  defaultLoginRedirect: string;
  waitlistPath: string;
  supportEmail: string;
  homePath: string;
}

export const BRAND_CONFIGS: Record<Brand, BrandConfig> = {
  prolnk: {
    name: "prolnk",
    displayName: "ProLnk",
    tagline: "The Home Service Partner Network",
    primaryColor: "#14b8a6",
    accentColor: "#0891b2",
    logoText: "ProLnk",
    faviconEmoji: "🔗",
    defaultLoginRedirect: "/dashboard",
    waitlistPath: "/waitlist/pro",
    supportEmail: "support@prolnk.io",
    homePath: "/",
  },
  trustypro: {
    name: "trustypro",
    displayName: "TrustyPro",
    tagline: "Your Home. Documented. Protected. Verified.",
    primaryColor: "#4F46E5",
    accentColor: "#7C3AED",
    logoText: "TrustyPro",
    faviconEmoji: "🏠",
    defaultLoginRedirect: "/my-home",
    waitlistPath: "/waitlist/homeowner",
    supportEmail: "support@trustypro.io",
    homePath: "/",
  },
  prolnkmedia: {
    name: "prolnkmedia",
    displayName: "ProLnk Media",
    tagline: "Reach Verified Homeowners at the Moment They Need You",
    primaryColor: "#7C3AED",
    accentColor: "#6D28D9",
    logoText: "ProLnk Media",
    faviconEmoji: "📺",
    defaultLoginRedirect: "/advertiser/dashboard",
    waitlistPath: "/advertise",
    supportEmail: "media@prolnk.io",
    homePath: "/advertise",
  },
};

export function detectBrand(): Brand {
  if (typeof window === "undefined") return "prolnk";
  const h = window.location.hostname.toLowerCase();
  if (h.includes("trustypro")) return "trustypro";
  if (h.includes("prolnkmedia") || h.includes("media.prolnk")) return "prolnkmedia";
  return "prolnk";
}

export function useBrand(): BrandConfig {
  return BRAND_CONFIGS[detectBrand()];
}

export const currentBrand: BrandConfig = BRAND_CONFIGS[detectBrand()];
