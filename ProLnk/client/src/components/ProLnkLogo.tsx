import React from "react";

interface ProLnkLogoProps {
  variant?: "light" | "dark" | "icon-only";
  className?: string;
  height?: number;
}

/**
 * ProLnk brand logo — inline SVG vector.
 *
 * Renders the two interlocking link nodes (icon mark) plus the "ProLnk" wordmark.
 *
 *  - `light`     — for use on white/light backgrounds: navy + brand blue
 *  - `dark`      — for use on dark backgrounds: white + teal accents (cleaner than wrapping in a white card)
 *  - `icon-only` — just the link-node mark, omits the wordmark (use a smaller width)
 */
export function ProLnkLogo({ variant = "light", className = "", height = 56 }: ProLnkLogoProps) {
  const isDark = variant === "dark";
  const isIcon = variant === "icon-only";

  // Colour tokens
  const nodeA = isDark ? "#FFFFFF" : "#0A1628";
  const nodeB = isDark ? "#5EEAD4" : "#1B4FD8"; // teal accent on dark, brand blue on light
  const innerHole = isDark ? "#0A1628" : "#FFFFFF";
  const bridge = nodeB;
  const wordA = isDark ? "#FFFFFF" : "#0A1628";
  const wordB = isDark ? "#5EEAD4" : "#1B4FD8";

  // Aspect ratio: icon-only = 1:1 (just the mark), full = roughly 4.6:1 to fit "ProLnk"
  const viewBox = isIcon ? "0 0 48 48" : "0 0 220 48";
  const aspectRatio = isIcon ? 1 : 220 / 48;
  const width = Math.round(height * aspectRatio);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={width}
      height={height}
      className={`shrink-0 ${className}`}
      role="img"
      aria-label="ProLnk"
      style={{ display: "block" }}
    >
      {/* Two interlocking link nodes */}
      <circle cx="16" cy="24" r="10" fill={nodeA} />
      <circle cx="36" cy="24" r="10" fill={nodeB} />
      <circle cx="16" cy="24" r="5" fill={innerHole} />
      <circle cx="36" cy="24" r="5" fill={innerHole} />
      {/* Connecting bridge */}
      <rect x="21" y="21" width="10" height="6" rx="3" fill={bridge} />

      {!isIcon && (
        <>
          <text
            x="56"
            y="32"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="700"
            fontSize="22"
            fill={wordA}
            letterSpacing="-0.5"
          >
            Pro
          </text>
          <text
            x="93"
            y="32"
            fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
            fontWeight="700"
            fontSize="22"
            fill={wordB}
            letterSpacing="-0.5"
          >
            Lnk
          </text>
        </>
      )}
    </svg>
  );
}

export default ProLnkLogo;
