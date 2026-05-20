import React from "react";
import { PROLNK_LOGO_LIGHT } from "./prolnk-logo-data";

interface ProLnkLogoProps {
  variant?: "light" | "dark" | "icon-only";
  className?: string;
  height?: number;
}

/**
 * ProLnk brand logo — renders the authoritative base64 PNG.
 * Use on light backgrounds. For dark backgrounds, use a light hero section instead
 * (the original artwork uses dark navy text that won't read on dark bgs).
 */
export function ProLnkLogo({ variant = "light", className = "", height = 56 }: ProLnkLogoProps) {
  void variant;
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
