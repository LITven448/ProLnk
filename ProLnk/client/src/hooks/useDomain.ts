/**
 * useDomain — detects which brand domain the user is on.
 *
 * Checks (in priority order):
 *   1. window.__BRAND__ — injected by server based on hostname (works on Render too)
 *   2. Actual hostname — trustypro.io or www.trustypro.io
 */
export function useDomain() {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const serverBrand = typeof window !== "undefined" ? (window as any).__BRAND__ : undefined;

  const isTrustyPro =
    serverBrand === "trustypro" ||
    hostname === "trustypro.io" ||
    hostname === "www.trustypro.io" ||
    hostname.endsWith(".trustypro.io");

  const isProLnk = !isTrustyPro;
  return { isTrustyPro, isProLnk };
}
