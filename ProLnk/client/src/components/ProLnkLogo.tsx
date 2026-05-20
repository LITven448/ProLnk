import React from "react";
import { PROLNK_LOGO_LIGHT } from "./prolnk-logo-data";

interface ProLnkLogoProps {
  variant?: "light" | "dark" | "icon-only";
  className?: string;
  height?: number;
}

/**
 * ProLnk brand logo — uses the exact official brand image (base64 embedded PNG).
 * This is the authoritative logo. DO NOT replace with a different mark.
 *
 *  - `light`     — logo on light/white backgrounds (default rendering)
 *  - `dark`      — same logo but inverted to white via CSS filter for use on dark backgrounds
 *  - `icon-only` — currently renders the full logo; cropping not yet wired
 */
export function ProLnkLogo({ variant = "light", className = "", height = 56 }: ProLnkLogoProps) {
  // The cropped logo image has a 3:1 aspect ratio (1677x565 px)
  const aspectRatio = 1677 / 565;
  const width = Math.round(height * aspectRatio);

  // For dark backgrounds: invert + brightness makes the logo render as solid white,
  // preserving the original artwork's silhouette without altering its design.
  const darkFilter = variant === "dark" ? "brightness(0) invert(1)" : undefined;

  return (
    <img
      src={PROLNK_LOGO_LIGHT}
      alt="ProLnk"
      height={height}
      width={width}
      className={`shrink-0 ${className}`}
      style={{ display: "block", objectFit: "contain", filter: darkFilter }}
    />
  );
}

export default ProLnkLogo;
