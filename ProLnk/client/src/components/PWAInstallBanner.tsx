import { useEffect, useState } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    if (localStorage.getItem("pwa-install-dismissed")) return;

    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    // iOS detection
    const ua = navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua) && !(window as any).MSStream;
    setIsIOS(ios);

    if (ios) {
      // iOS doesn't support beforeinstallprompt -- show manual instructions
      setShowBanner(true);
      return;
    }

    // Android / Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    localStorage.setItem("pwa-install-dismissed", "1");
  };

  if (!showBanner || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div
        className="max-w-sm mx-auto bg-gray-900 text-white rounded-2xl shadow-2xl p-4 flex items-start gap-3 pointer-events-auto"
        style={{ border: "1px solid rgba(0,181,184,0.3)" }}
      >
        <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden">
          <img src="/icon-192.png" alt="ProLnk" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-heading text-sm text-white">Install ProLnk</div>
          {isIOS ? (
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
              Tap <strong className="text-white">Share</strong> then{" "}
              <strong className="text-white">Add to Home Screen</strong> for the full app experience.
            </p>
          ) : (
            <p className="text-xs text-gray-400 mt-0.5">
              Add to your home screen for quick access to leads and job logging.
            </p>
          )}
          {!isIOS && (
            <Button
              size="sm"
              className="mt-2 h-7 text-xs text-white"
              style={{ backgroundColor: "#0A1628" }}
              onClick={handleInstall}
            >
              <Download className="w-3 h-3 mr-1" /> Install App
            </Button>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-300 flex-shrink-0 mt-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
