import React from "react";
import { PROLNK_LOGO_LIGHT } from "./prolnk-logo-data";

interface ProLnkLogoProps {
  variant?: "light" | "dark" | "icon-only";
  className?: string;
  height?: number;
}

/**
 * ProLnk brand logo -- uses the exact official brand image (base64 embedded PNG).
 * This is the authoritative logo. DO NOT replace with SVG or other assets.
 *
 * The "light" variant shows the logo on light/white backgrounds.
 * The "dark" variant inverts the wordmark text to white (not yet implemented -- use light for now).
 * The "icon-only" variant shows just the teal triangle icon portion.
 */
export function ProLnkLogo({ variant = "light", className = "", height = 40 }: ProLnkLogoProps) {
  // The cropped logo image has a 3:1 aspect ratio (1677565 px)
  const aspectRatio = 1677 / 565;
  const width = Math.round(height * aspectRatio);

  return (
    <img
      src={PROLNK_LOGO_LIGHT}
      alt="ProLnk"
      height={height}
      width={width}
      className={`shrink-0 ${className}`}
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}

export default ProLnkLogo;
