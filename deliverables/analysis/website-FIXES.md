# Website Fixes — prolnk.xyz & trustypro.io
**Ready-to-apply. Both domains are one React app (`ProLnk/client`) with a hostname router.**
**Nothing here has been executed — apply and run the build.**

---

# W1 · BLOCKER — trustypro.io serves ProLnk's identity

**Problem:** one `index.html`, one `<title>`. Every trustypro.io page shows *"ProLnk — AI-Powered Home Service Partner Network"* in the browser tab, in Google results, and in every social share. The meta description reads *"Every job photo becomes a lead. Every partner earns more."* — contractor language on the consumer brand.

**Fix:** set head tags at runtime from the hostname. New file `client/src/lib/domainMeta.ts`:
```ts
export type Brand = "prolnk" | "trustypro";

export function getBrand(): Brand {
  const h = typeof window !== "undefined" ? window.location.hostname : "";
  return h === "trustypro.io" || h === "www.trustypro.io" || h.endsWith(".trustypro.io")
    ? "trustypro"
    : "prolnk";
}

const META: Record<Brand, { title: string; description: string; themeColor: string }> = {
  prolnk: {
    title: "ProLnk — The Network Where Pros Set Their Own Price",
    description:
      "Verified professionals, real jobs, and no lead fees. You quote it, you keep it — we only earn when you get paid.",
    themeColor: "#0D9488",
  },
  trustypro: {
    title: "TrustyPro — Your Home, Handled",
    description:
      "Scan your home, see its health, and get matched with vetted pros. Your home's records, kept for life.",
    themeColor: "#4F46E5",
  },
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applyDomainMeta(): Brand {
  const brand = getBrand();
  const m = META[brand];
  document.title = m.title;
  setMeta("name", "description", m.description);
  setMeta("property", "og:title", m.title);
  setMeta("property", "og:description", m.description);
  setMeta("name", "twitter:title", m.title);
  setMeta("name", "twitter:description", m.description);
  setMeta("name", "theme-color", m.themeColor);
  document.documentElement.setAttribute("data-brand", brand);
  return brand;
}
```
Call `applyDomainMeta()` once inside `DomainRouter`'s effect in `App.tsx`.

**Also needed — per-page titles.** Add to the same file:
```ts
export function setPageTitle(pageTitle?: string) {
  const base = META[getBrand()].title;
  document.title = pageTitle ? `${pageTitle} — ${base.split(" — ")[0]}` : base;
}
```
Call it from each routed page's mount effect.

**Proper fix (do this when the marketing sites are rebuilt):** static pre-rendered pages per domain. Crawlers do not run JavaScript reliably, so runtime titles help users and social cards but not SEO. The four-site rebuild should be statically generated with real per-page head tags.

---

# W2 · BLOCKER — trustypro.io redirects almost every URL to the homepage

**Problem:** `DomainRouter` uses an allow-list. Only `/waitlist*`, `/trustypro/*`, `/request-service*`, and `/my-request*` survive. **Every other path silently redirects to root** — so any TrustyPro link that isn't one of those four dumps the visitor on the homepage with no explanation.

**Fix:** invert it. Allow everything except pro-only routes. In `App.tsx`, REPLACE the body of the `isTrustyPro` branch:
```ts
if (isTrustyPro) {
  if (location === "/waitlist" || location === "/waitlist/") {
    navigate("/waitlist/homeowner", { replace: true });
    return;
  }
  // Pro-side routes that must not render on the consumer brand.
  const PRO_ONLY = [
    "/apply", "/apply-v2", "/application-status", "/pro-waitlist", "/waitlist/pro",
    "/checkout", "/partner", "/partners", "/admin", "/dashboard",
    "/pricing/standard", "/resources/pricing-strategy", "/pro/join", "/referral",
  ];
  if (PRO_ONLY.some(p => location === p || location.startsWith(p + "/"))) {
    window.location.href = `https://prolnk.xyz${location}`;
    return;
  }
  return; // everything else renders normally on trustypro.io
}
```
Pro routes now **cross-link to prolnk.xyz** instead of vanishing — the visitor lands where they meant to go.

---

# W3 · CRITICAL — ten pricing pages, at least three contradicting each other

**What is live today:**

| Route | Page | Claims |
|---|---|---|
| `/pricing` | `Pricing.tsx` | $99/$149/$249 — keep **40/50/60%** |
| `/pricing/standard` | `PostFoundingPricing.tsx` | same tiers — keep **40/55/65%** |
| `/pricing-transparency` | `ProLnkPricingTransparency.tsx` | **$119, $140, $150, $175, $225, $280** |
| `/pricing/homeowners` | `ProLnkPricingExplained.tsx` | "free" |
| `/trustypro/plans` | `TrustyProPricing.tsx` | $99/$149/$249, $15, "15% of" |
| `/resources/pricing-strategy` | `PartnerPricingStrategy.tsx` | pro-facing strategy content |
| — | `ProLnkPricingPagePros`, `ProLnkPricingROICalculator`, `TrustyProPricingExplainer`, `SeasonalPricingGuide` | additional variants |

A professional comparing `/pricing` against `/pricing/standard` sees two different offers for the same product. Both are indexed.

**Fix — one source of truth.** New file `client/src/config/pricing.ts`:
```ts
/** THE ONLY PLACE PRICING IS DEFINED. Every page imports from here. */
export interface Tier {
  id: "starter" | "solo" | "team" | "business";
  name: string;
  monthly: number;          // USD
  jobFeePct: number;        // % of job value charged to the pro
  seats: number;            // dashboard logins
  proPasses: number;        // technicians included
  zips: number;
  featured?: boolean;
}

export const TIERS: Tier[] = [
  { id: "starter",  name: "Starter",  monthly: 0,   jobFeePct: 15, seats: 1, proPasses: 1,  zips: 5  },
  { id: "solo",     name: "Solo",     monthly: 99,  jobFeePct: 10, seats: 1, proPasses: 1,  zips: 8  },
  { id: "team",     name: "Team",     monthly: 189, jobFeePct: 9,  seats: 3, proPasses: 4,  zips: 20, featured: true },
  { id: "business", name: "Business", monthly: 349, jobFeePct: 8,  seats: 8, proPasses: 10, zips: 50 },
];

export const ADDONS = {
  proPass:   { label: "Additional ProPass (technician)", monthly: 20 },
  seat:      { label: "Additional dashboard seat",       monthly: 29 },
  zipPack:   { label: "Coverage pack (10 ZIP codes)",    monthly: 25 },
};

export const LANES = {
  enterprise: { label: "Enterprise lane — rental & property-manager work orders", monthly: 49 },
  commercial: { label: "Commercial lane — commercial trades",                     monthly: 99 },
};

/** Founding network — closed at 2,125. Never marketed publicly. */
export const FOUNDING = { cap: 2125, monthly: 149, lockedForLife: true };

export const HOMEOWNER_PRICE = { label: "Free for homeowners", monthly: 0 };
```

**Then:**
1. `Pricing.tsx` becomes the ONLY pro pricing page — rewrite it to render from `TIERS`
2. `TrustyProPricing.tsx` becomes the only consumer page — renders `HOMEOWNER_PRICE`
3. **Delete or redirect** `PostFoundingPricing`, `ProLnkPricingTransparency`, `ProLnkPricingExplained`, `ProLnkPricingPagePros`, `ProLnkPricingROICalculator`, `TrustyProPricingExplainer`
4. Add 301-style redirects so existing links and search results do not break:
```ts
<Route path="/pricing/standard">{() => <Redirect to="/pricing" />}</Route>
<Route path="/pricing-transparency">{() => <Redirect to="/pricing" />}</Route>
<Route path="/pricing/homeowners">{() => <Redirect to="/trustypro/plans" />}</Route>
```
5. `PartnerPricingStrategy` is internal content — move it behind auth or delete it. It should not be publicly indexed.

**Guard against regression** — add a test:
```ts
// No page may hardcode a price. Everything imports from config/pricing.
it("no hardcoded prices in pricing pages", () => {
  const files = glob("client/src/pages/*Pricing*.tsx");
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    expect(src).not.toMatch(/\$\d{2,4}/);
    expect(src).not.toMatch(/\d{2}% (keep|commission)/);
  }
});
```

---

# W4 · Remove the orphaned tier ladder

`shared/dfw-zipcodes.ts` `TIER_ZIP_LIMITS` defines a completely separate product: `scout` **free** / `pro` $29 / `crew` $79 / `company` $149 / `enterprise` $299. It contradicts the real pricing and includes a free tier that is against policy.

**Fix:** keep the ZIP limits, drop the pricing fiction, and key it to real tier ids:
```ts
export const TIER_ZIP_LIMITS: Record<string, number> = {
  starter: 5, solo: 8, team: 20, business: 50, enterprise: 999,
};
```
Then delete the legacy aliases (`scout`, `crew`, `company`) once `TIER_ALIAS` in `routers/stripe.ts` is updated to match.

**Also fix in the same pass:** `TARGET_PARTNER_TO_HOMEOWNER_RATIO` is set to 40–60 homes per partner. Founder decision is **20:1**:
```ts
export const TARGET_PARTNER_TO_HOMEOWNER_RATIO = { min: 15, max: 25, ideal: 20 };
```

---

# W5 · Kill the keep-rate language everywhere

"40% commission keep" describes a two-step transaction (charge 10%, refund 40% of it) that nobody understands and that five files disagree about. Replace with the plain fee:

- **Before:** "40% commission keep on every completed job"
- **After:** "10% platform fee — you keep 90% of every job"

Applies to `Pricing.tsx`, `PostFoundingPricing.tsx` (being deleted), the tier-upgrade email in `server/email.ts` (which renders a keep-rate percentage), and `TIER_PRODUCTS` in `routers/stripe.ts`.

---

# Apply order
1. **W1 + W2** — half a day, immediate stop-the-bleeding on the consumer brand
2. **W3** — one day, the largest public inconsistency
3. **W4 + W5** — half a day, removes the internal contradictions that caused W3
4. Add the regression test before closing the ticket
