import { useEffect, useRef } from "react";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * CSS-transform virtual scroll -- the same technique used by Framer/Lenis/Locomotive.
 *
 * How it works:
 *  1. The real page height is set on a fixed spacer div so the browser scrollbar is correct.
 *  2. The content wrapper is position:fixed and translated via CSS transform.
 *  3. On each rAF tick we lerp the current translateY toward the target (window.scrollY),
 *     producing the weighted inertia glide that makes Estatia feel premium.
 *
 * This approach gives a much deeper, more physical feel than Lenis's native-scroll mode
 * because the content is actually being moved independently of the scroll position.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spacerRef  = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const currentY   = useRef(0);
  const targetY    = useRef(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const spacer  = spacerRef.current;
    if (!wrapper || !spacer) return;

    // Sync spacer height to content height so scrollbar is correct
    const resizeObserver = new ResizeObserver(() => {
      spacer.style.height = `${wrapper.scrollHeight}px`;
    });
    resizeObserver.observe(wrapper);
    spacer.style.height = `${wrapper.scrollHeight}px`;

    // Lerp factor -- lower = more inertia / heavier feel
    const LERP = 0.075;

    function tick() {
      targetY.current = window.scrollY;
      currentY.current += (targetY.current - currentY.current) * LERP;

      // Stop jittering when close enough
      if (Math.abs(targetY.current - currentY.current) < 0.05) {
        currentY.current = targetY.current;
      }

      if (wrapper) wrapper.style.transform = `translateY(${-currentY.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      // Reset on unmount so other pages aren't affected
      document.body.style.overflow = "";
      wrapper.style.transform = "";
      spacer.style.height = "";
    };
  }, []);

  return (
    <>
      {/* Fixed content wrapper -- moved by CSS transform */}
      <div
        ref={wrapperRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          willChange: "transform",
          zIndex: 1,
        }}
      >
        {children}
      </div>
      {/* Spacer that gives the page its real scroll height */}
      <div ref={spacerRef} aria-hidden="true" />
    </>
  );
}
