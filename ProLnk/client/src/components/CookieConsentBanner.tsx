/**
 * CookieConsentBanner — GDPR/CCPA compliant cookie consent notice.
 * Stores user preference in localStorage. Shows on first visit only.
 */
import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "prolnk_cookie_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[9999] rounded-2xl shadow-2xl p-5 flex flex-col gap-3 animate-in slide-in-from-bottom-4 duration-300"
      style={{
        backgroundColor: "#1a1a2e",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(99,102,241,0.2)" }}>
          <Cookie className="w-5 h-5" style={{ color: "#818cf8" }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white mb-1">We use cookies</h3>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
            ProLnk uses cookies to improve your experience, analyze site traffic, and personalize content. By clicking "Accept", you consent to our use of cookies.{" "}
            <a href="/privacy" className="underline hover:text-white transition-colors" style={{ color: "#818cf8" }}>
              Privacy Policy
            </a>
          </p>
        </div>
        <button
          onClick={decline}
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5 text-white/50" />
        </button>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 text-xs font-semibold"
          style={{ backgroundColor: "#6366f1", color: "white" }}
          onClick={accept}
        >
          Accept All
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1 text-xs font-semibold border-white/20 text-white/70 hover:text-white hover:bg-white/10"
          onClick={decline}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
