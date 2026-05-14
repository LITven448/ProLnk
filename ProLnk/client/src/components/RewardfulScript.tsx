import { useEffect } from "react";
import { useLocation } from "wouter";

export default function RewardfulScript() {
  const [location] = useLocation();
  const campaignId = import.meta.env.VITE_REWARDFUL_CAMPAIGN_ID as string | undefined;

  const isWaitlistRoute = location === "/pro-waitlist" || location.startsWith("/pro-waitlist");

  useEffect(() => {
    if (!campaignId || !isWaitlistRoute) return;

    const params = new URLSearchParams(window.location.search);
    const viaCode = params.get("via");

    const script = document.createElement("script");
    script.src = "https://r.wdfl.co/rw.js";
    script.setAttribute("data-rewardful", campaignId);
    if (viaCode) {
      script.setAttribute("data-rewardful-id", viaCode);
    }
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [campaignId, isWaitlistRoute]);

  return null;
}
