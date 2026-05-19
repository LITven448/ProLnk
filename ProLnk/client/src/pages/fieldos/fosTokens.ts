/**
 * Field OS design tokens — single source of truth.
 * Extracted into its own file to avoid circular imports between
 * FieldOS.tsx (shell) and the tab components that need these tokens.
 */
export const FOS = {
  bg:       "#070D1A",
  surface:  "#0D1525",
  card:     "rgba(255,255,255,0.04)",
  cardHov:  "rgba(255,255,255,0.07)",
  border:   "rgba(255,255,255,0.08)",
  teal:     "#0D9488",
  tealGlow: "rgba(13,148,136,0.20)",
  tealDim:  "rgba(13,148,136,0.12)",
  lime:     "#E8FF47",
  limeDim:  "rgba(232,255,71,0.12)",
  limeGlow: "rgba(232,255,71,0.25)",
  white:    "#FFFFFF",
  muted:    "rgba(255,255,255,0.45)",
  faint:    "rgba(255,255,255,0.20)",
  ghost:    "rgba(255,255,255,0.10)",
  red:      "#EF4444",
  amber:    "#F59E0B",
  green:    "#10B981",
} as const;
