/**
 * Commerce Rail — Phase 1: affiliate "shop this rendering".
 *
 * STRATEGY HOOK
 * -------------
 * This is Phase 1 of the commerce rail: pure affiliate (industry-standard ~5%
 * commission). Every AI room rendering surfaces purchasable products with
 * affiliate links, and we instrument conversion from day one via the
 * `productClicks` table (impressions, CTR, conversion rate, est. commission).
 *
 * The conversion data collected here is the unlock: once we can SHOW a healthy
 * CTR and conversion rate, that number justifies graduating to the marketplace
 * take-rate phase (15-30%) and eventually private-label, per
 * BUSINESS_MODEL_V2_OPUS.md. Phase 1 must therefore be simple, additive, and
 * relentlessly instrumented.
 *
 * V1 uses rule/category-based product suggestions with affiliate SEARCH links
 * per retailer — no live product API required yet. The shape is pluggable: drop
 * a real product feed (Amazon PA-API, Wayfair/Impact, Home Depot affiliate) into
 * `fetchLiveProducts` later without touching callers.
 *
 * ENV VARS (set in Render to activate live affiliate tags — all optional; the
 * link generator no-ops gracefully when unset):
 *   AMAZON_AFFILIATE_TAG     Amazon Associates tracking id    (e.g. prolnk-20)
 *   WAYFAIR_AFFILIATE_ID     Wayfair / Impact partner id      (subId appended)
 *   HOMEDEPOT_AFFILIATE_ID   Home Depot / Impact partner id   (subId appended)
 *   NFM_AFFILIATE_ID         Nebraska Furniture Mart partner id
 */

export type Retailer = "amazon" | "wayfair" | "homedepot" | "nfm";

export type ProductCategory =
  | "rug"
  | "lighting"
  | "furniture"
  | "paint"
  | "decor"
  | "wall_art"
  | "window"
  | "storage"
  | "bedding"
  | "appliance";

export interface SuggestedProduct {
  category: ProductCategory;
  productName: string;
  retailer: Retailer;
  affiliateUrl: string;
  imageUrl: string | null;
  price: number | null;
  position: string | null;
}

export interface RenderingContext {
  roomType?: string | null;
  designStyle?: string | null;
  colorPalette?: string | null;
  budget?: string | null;
  keepItems?: string | null;
}

const AFFILIATE_TAGS: Record<Retailer, string | undefined> = {
  amazon: process.env.AMAZON_AFFILIATE_TAG,
  wayfair: process.env.WAYFAIR_AFFILIATE_ID,
  homedepot: process.env.HOMEDEPOT_AFFILIATE_ID,
  nfm: process.env.NFM_AFFILIATE_ID,
};

const SEARCH_BASE: Record<Retailer, string> = {
  amazon: "https://www.amazon.com/s",
  wayfair: "https://www.wayfair.com/keyword.php",
  homedepot: "https://www.homedepot.com/s",
  nfm: "https://www.nfm.com/search",
};

/**
 * Wrap a product URL (or build a search URL) with the affiliate tag for a
 * retailer. Defensive: if the tag env var is unset, returns a clean, working
 * link (no-op affiliate) so the rail still functions in dev/preview.
 *
 * `productUrlOrSearch` may be a full https URL (passed through, tag appended) or
 * a plain search phrase (a retailer search URL is constructed).
 */
export function generateAffiliateLink(
  retailer: Retailer,
  productUrlOrSearch: string,
): string {
  const tag = AFFILIATE_TAGS[retailer];
  const isUrl = /^https?:\/\//i.test(productUrlOrSearch.trim());

  try {
    let url: URL;
    if (isUrl) {
      url = new URL(productUrlOrSearch.trim());
    } else {
      url = new URL(SEARCH_BASE[retailer]);
      const phrase = productUrlOrSearch.trim();
      switch (retailer) {
        case "amazon":
          url.searchParams.set("k", phrase);
          break;
        case "wayfair":
          url.searchParams.set("keyword", phrase);
          break;
        case "homedepot":
          // Home Depot search path is /s/<phrase>
          url = new URL(`${SEARCH_BASE.homedepot}/${encodeURIComponent(phrase)}`);
          break;
        case "nfm":
          url.searchParams.set("q", phrase);
          break;
      }
    }

    if (tag) {
      switch (retailer) {
        case "amazon":
          url.searchParams.set("tag", tag);
          break;
        case "wayfair":
        case "homedepot":
          // Impact-style attribution uses a subId param.
          url.searchParams.set("subId1", tag);
          break;
        case "nfm":
          url.searchParams.set("affid", tag);
          break;
      }
    }
    return url.toString();
  } catch {
    // Malformed input — fall back to a bare retailer homepage search.
    const fallback = new URL(SEARCH_BASE[retailer]);
    fallback.searchParams.set("k", productUrlOrSearch);
    return fallback.toString();
  }
}

interface CategoryRule {
  category: ProductCategory;
  position: string;
  retailer: Retailer;
  // Search phrase template; {style}/{color} are interpolated.
  phrase: string;
  estPrice: number | null;
}

// Rule-based product palette per room type. V1 — replace/augment with a live
// product feed via `fetchLiveProducts` without changing callers.
const ROOM_RULES: Record<string, CategoryRule[]> = {
  living_room: [
    { category: "rug", position: "floor", retailer: "wayfair", phrase: "{style} area rug {color}", estPrice: 189 },
    { category: "lighting", position: "corner", retailer: "amazon", phrase: "{style} floor lamp", estPrice: 79 },
    { category: "decor", position: "sofa", retailer: "amazon", phrase: "{style} throw pillows {color}", estPrice: 34 },
    { category: "wall_art", position: "wall", retailer: "wayfair", phrase: "{style} framed wall art", estPrice: 119 },
    { category: "furniture", position: "center", retailer: "nfm", phrase: "{style} coffee table", estPrice: 249 },
  ],
  bedroom: [
    { category: "bedding", position: "bed", retailer: "amazon", phrase: "{style} duvet cover {color}", estPrice: 89 },
    { category: "lighting", position: "nightstand", retailer: "amazon", phrase: "{style} table lamp", estPrice: 49 },
    { category: "rug", position: "floor", retailer: "wayfair", phrase: "{style} bedroom rug {color}", estPrice: 159 },
    { category: "window", position: "window", retailer: "wayfair", phrase: "{style} blackout curtains {color}", estPrice: 44 },
    { category: "furniture", position: "wall", retailer: "nfm", phrase: "{style} dresser", estPrice: 399 },
  ],
  kitchen: [
    { category: "lighting", position: "island", retailer: "wayfair", phrase: "{style} pendant light", estPrice: 129 },
    { category: "decor", position: "counter", retailer: "amazon", phrase: "{style} kitchen canister set", estPrice: 39 },
    { category: "storage", position: "wall", retailer: "homedepot", phrase: "{style} open shelving", estPrice: 89 },
    { category: "rug", position: "floor", retailer: "wayfair", phrase: "{style} kitchen runner rug", estPrice: 59 },
  ],
  bathroom: [
    { category: "lighting", position: "vanity", retailer: "homedepot", phrase: "{style} vanity light fixture", estPrice: 99 },
    { category: "decor", position: "counter", retailer: "amazon", phrase: "{style} bathroom accessory set {color}", estPrice: 42 },
    { category: "storage", position: "wall", retailer: "wayfair", phrase: "{style} bathroom storage cabinet", estPrice: 149 },
    { category: "window", position: "window", retailer: "amazon", phrase: "{style} bathroom window shade", estPrice: 36 },
  ],
  home_office: [
    { category: "furniture", position: "center", retailer: "nfm", phrase: "{style} office desk", estPrice: 329 },
    { category: "furniture", position: "desk", retailer: "wayfair", phrase: "{style} ergonomic office chair", estPrice: 219 },
    { category: "lighting", position: "desk", retailer: "amazon", phrase: "{style} desk lamp", estPrice: 45 },
    { category: "storage", position: "wall", retailer: "wayfair", phrase: "{style} bookshelf", estPrice: 179 },
  ],
  dining_room: [
    { category: "lighting", position: "ceiling", retailer: "wayfair", phrase: "{style} dining chandelier", estPrice: 199 },
    { category: "furniture", position: "center", retailer: "nfm", phrase: "{style} dining table set", estPrice: 699 },
    { category: "rug", position: "floor", retailer: "wayfair", phrase: "{style} dining room rug {color}", estPrice: 209 },
    { category: "wall_art", position: "wall", retailer: "amazon", phrase: "{style} wall mirror", estPrice: 89 },
  ],
};

// Fallback palette for any room type without an explicit rule set.
const DEFAULT_RULES: CategoryRule[] = [
  { category: "lighting", position: "ceiling", retailer: "wayfair", phrase: "{style} ceiling light", estPrice: 99 },
  { category: "rug", position: "floor", retailer: "wayfair", phrase: "{style} area rug {color}", estPrice: 149 },
  { category: "decor", position: "wall", retailer: "amazon", phrase: "{style} wall decor {color}", estPrice: 49 },
  { category: "furniture", position: "center", retailer: "nfm", phrase: "{style} accent furniture", estPrice: 199 },
];

function humanize(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(/_/g, " ").trim();
}

/**
 * Pluggable seam for a future live product API (Amazon PA-API, Impact feed,
 * etc.). V1 returns null → callers fall back to rule-based search suggestions.
 * Implement this later and the rest of the rail keeps working unchanged.
 */
export async function fetchLiveProducts(
  _context: RenderingContext,
): Promise<SuggestedProduct[] | null> {
  return null;
}

/**
 * Given a rendering's detected room type / style / palette, return a list of
 * product suggestions, each with a category and a search-based affiliate link.
 * Defensive: always returns at least the default palette, never throws.
 */
export async function suggestProductsForRendering(
  context: RenderingContext,
): Promise<SuggestedProduct[]> {
  try {
    const live = await fetchLiveProducts(context);
    if (live && live.length > 0) return live;
  } catch {
    // Live feed unavailable — fall through to rule-based.
  }

  const roomKey = (context.roomType ?? "").toLowerCase().trim();
  const rules = ROOM_RULES[roomKey] ?? DEFAULT_RULES;

  const style = humanize(context.designStyle) || "modern";
  const color = humanize(context.colorPalette);

  return rules.map((rule) => {
    const phrase = rule.phrase
      .replace("{style}", style)
      .replace("{color}", color)
      .replace(/\s+/g, " ")
      .trim();
    const productName = phrase
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
    return {
      category: rule.category,
      productName,
      retailer: rule.retailer,
      affiliateUrl: generateAffiliateLink(rule.retailer, phrase),
      imageUrl: null,
      price: rule.estPrice,
      position: rule.position,
    };
  });
}
