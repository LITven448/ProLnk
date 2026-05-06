/**
 * useDomain — detects which brand domain the user is on.
 *
 * Returns:
 *   isTrustyPro  — true when visiting trustypro.io (or www.trustypro.io)
 *   isProLnk     — true when visiting prolnk.io or any other domain
 */
export function useDomain() {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";

  const isTrustyPro =
    hostname === "trustypro.io" ||
    hostname === "www.trustypro.io" ||
    hostname.endsWith(".trustypro.io");

  const isProLnk = !isTrustyPro;

  return { isTrustyPro, isProLnk };
}
