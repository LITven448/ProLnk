/**
 * Per-domain identity.
 *
 * prolnk.xyz and trustypro.io are served by the same bundle, so index.html
 * can only carry one <title>. Without this, every TrustyPro page introduces
 * itself as ProLnk in the browser tab, in search results, and in social cards.
 */

export type Brand = "prolnk" | "trustypro";

export function getBrand(): Brand {
  const h = typeof window !== "undefined" ? window.location.hostname : "";
  return h === "trustypro.io" || h === "www.trustypro.io" || h.endsWith(".trustypro.io")
    ? "trustypro"
    : "prolnk";
}

interface BrandMeta {
  shortName: string;
  title: string;
  description: string;
  themeColor: string;
}

const META: Record<Brand, BrandMeta> = {
  prolnk: {
    shortName: "ProLnk",
    title: "ProLnk — The Network Where Pros Set Their Own Price",
    description:
      "Verified professionals, real work, and no lead fees. You quote it, you keep it — we only earn when you get paid.",
    themeColor: "#0D9488",
  },
  trustypro: {
    shortName: "TrustyPro",
    title: "TrustyPro — Your Home, Handled",
    description:
      "Scan your home, see its health, and get matched with vetted pros. Your home's records, kept for life.",
    themeColor: "#4F46E5",
  },
};

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  if (typeof document === "undefined") return;
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Call once on app mount. Returns the resolved brand. */
export function applyDomainMeta(): Brand {
  const brand = getBrand();
  const m = META[brand];
  if (typeof document === "undefined") return brand;

  document.title = m.title;
  upsertMeta("name", "description", m.description);
  upsertMeta("property", "og:title", m.title);
  upsertMeta("property", "og:description", m.description);
  upsertMeta("property", "og:site_name", m.shortName);
  upsertMeta("name", "twitter:title", m.title);
  upsertMeta("name", "twitter:description", m.description);
  upsertMeta("name", "theme-color", m.themeColor);
  document.documentElement.setAttribute("data-brand", brand);
  return brand;
}

/** Per-page title. Pass undefined to restore the brand default. */
export function setPageTitle(pageTitle?: string): void {
  if (typeof document === "undefined") return;
  const m = META[getBrand()];
  document.title = pageTitle ? `${pageTitle} — ${m.shortName}` : m.title;
}

export function brandShortName(): string {
  return META[getBrand()].shortName;
}
