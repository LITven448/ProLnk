import React from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663388846002/dAVBxpSeSZ4jhwmMBJquFo/trustypro-logo-v2-nPx4Cz87k9qTYHs8gDFKhH.webp";

interface TrustyProLogoProps {
  variant?: "light" | "dark" | "icon-only";
  className?: string;
  height?: number;
}

/**
 * TrustyPro brand logo -- shield + house + checkmark symbol with wordmark.
 * Uses the generated CDN image asset.
 */
export function TrustyProLogo({ variant = "light", className = "", height = 40 }: TrustyProLogoProps) {
  // For dark backgrounds, we can apply a brightness filter if needed
  const style: React.CSSProperties = {
    height,
    width: "auto",
    objectFit: "contain",
    filter: variant === "dark" ? "brightness(0) invert(1)" : "none",
  };

  return (
    <img
      src={LOGO_URL}
      alt="TrustyPro"
      style={style}
      className={className}
    />
  );
}

export default TrustyProLogo;
