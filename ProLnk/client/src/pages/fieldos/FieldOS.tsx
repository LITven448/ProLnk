/**
 * ProLnk Field OS -- Partner Mobile App Shell (v3)
 * Design system: Teal #0D9488 (actions)  Lime #E8FF47 (money)  Navy #070D1A (bg)
 * Frosted glass tab bar  Geist Sans  Native-app feel
 */
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import FieldHome from "./FieldHome";
import FieldJobLog from "./FieldJobLog";
import FieldAIFeed from "./FieldAIFeed";
import FieldHomeProfiles from "./FieldHomeProfiles";
import FieldEarnings from "./FieldEarnings";
import { Home, Camera, Zap, Building2, DollarSign, WifiOff, Loader2, X, Download } from "lucide-react";

type Tab = "home" | "job" | "feed" | "profiles" | "earnings";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/* -- Design tokens (imported from fosTokens.ts to avoid circular imports) ----- */
import { FOS } from "./fosTokens";
export { FOS } from "./fosTokens";

export default function FieldOS() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedPhotos, setQueuedPhotos] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const { loading, isAuthenticated } = useAuth();

  /* -- Online/offline listener -- */
  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  /* -- Offline queue counter -- */
  useEffect(() => {
    const check = () => {
      try {
        const q = JSON.parse(localStorage.getItem("fieldos_offline_queue") ?? "[]");
        setQueuedPhotos(Array.isArray(q) ? q.length : 0);
      } catch { setQueuedPhotos(0); }
    };
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  /* -- PWA install prompt -- */
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      if (!localStorage.getItem("fieldos_install_dismissed")) setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") setShowInstallBanner(false);
    setInstallPrompt(null);
  };

  /* -- Loading state -- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: FOS.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}30` }}
          >
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: FOS.teal }} />
          </div>
          <p className="text-sm font-medium" style={{ color: FOS.muted }}>Loading Field OS...</p>
        </div>
      </div>
    );
  }

  /* -- Auth gate -- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8" style={{ background: FOS.bg }}>
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-5">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${FOS.tealDim} 0%, ${FOS.surface} 100%)`,
              border: `1.5px solid ${FOS.teal}40`,
              boxShadow: `0 0 40px ${FOS.tealGlow}`,
            }}
          >
            <Camera className="w-12 h-12" style={{ color: FOS.teal }} />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: FOS.teal }}>ProLnk</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Field OS</h1>
            <p className="text-sm mt-2 leading-relaxed max-w-xs" style={{ color: FOS.muted }}>
              Log jobs, scan properties, and earn commissions -- all from your phone.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full max-w-xs flex flex-col gap-3">
          <a
            href={getLoginUrl()}
            className="w-full py-4 rounded-2xl text-center font-black text-base tracking-wide transition-all active:scale-95"
            style={{ background: FOS.teal, color: "#fff", boxShadow: `0 8px 32px ${FOS.tealGlow}` }}
          >
            Sign In to Continue
          </a>
        </div>

        <p className="text-xs" style={{ color: FOS.ghost }}>ProLnk Partner Network  DFW</p>
      </div>
    );
  }

  /* -- Tab config -- */
  const tabs: { id: Tab; icon: any; label: string; badge?: number }[] = [
    { id: "home",     icon: Home,       label: "Home"    },
    { id: "job",      icon: Camera,     label: "Log Job", badge: queuedPhotos > 0 ? queuedPhotos : undefined },
    { id: "feed",     icon: Zap,        label: "AI Feed" },
    { id: "profiles", icon: Building2,  label: "Homes"   },
    { id: "earnings", icon: DollarSign, label: "Earnings"},
  ];

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative" style={{ background: FOS.bg }}>

      {/* -- Offline banner -- */}
      {!isOnline && (
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)" }}
        >
          <WifiOff className="w-3.5 h-3.5 shrink-0" style={{ color: FOS.amber }} />
          <p className="text-xs font-medium" style={{ color: "#FCD34D" }}>
            Offline -- photos will sync when reconnected{queuedPhotos > 0 && ` (${queuedPhotos} queued)`}
          </p>
        </div>
      )}

      {/* -- PWA install banner -- */}
      {showInstallBanner && (
        <div
          className="flex items-center justify-between gap-3 px-4 py-3 border-b"
          style={{ background: FOS.tealDim, borderColor: `${FOS.teal}25` }}
        >
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Download className="w-4 h-4 shrink-0" style={{ color: FOS.teal }} />
            <p className="text-xs font-medium" style={{ color: FOS.white }}>Add Field OS to your home screen</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstall}
              className="text-xs font-black px-3 py-1.5 rounded-xl transition-all active:scale-95"
              style={{ background: FOS.teal, color: "#fff" }}
            >
              Install
            </button>
            <button
              onClick={() => { setShowInstallBanner(false); localStorage.setItem("fieldos_install_dismissed", "1"); }}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-all active:scale-90"
              style={{ background: FOS.ghost }}
            >
              <X className="w-3.5 h-3.5" style={{ color: FOS.muted }} />
            </button>
          </div>
        </div>
      )}

      {/* -- Main content -- */}
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === "home"     && <FieldHome onNavigate={setActiveTab} />}
        {activeTab === "job"      && <FieldJobLog onSubmitSuccess={() => setActiveTab("feed")} onQueueUpdate={setQueuedPhotos} />}
        {activeTab === "feed"     && <FieldAIFeed />}
        {activeTab === "profiles" && <FieldHomeProfiles />}
        {activeTab === "earnings" && <FieldEarnings />}
      </div>

      {/* -- Bottom tab bar -- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
        {/* Frosted glass backdrop */}
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{ background: `${FOS.bg}e8`, borderTop: `1px solid ${FOS.border}` }}
        />

        <div
          className="relative flex items-end justify-around px-2 pt-2"
          style={{ paddingBottom: "max(14px, env(safe-area-inset-bottom))" }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isJob = tab.id === "job";
            const isEarnings = tab.id === "earnings";
            const activeColor = isEarnings ? FOS.lime : FOS.teal;
            const activeBg    = isEarnings ? FOS.limeDim : FOS.tealDim;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-col items-center gap-1 transition-all active:scale-90"
                style={{ minWidth: 56 }}
              >
                {isJob ? (
                  /* -- Raised camera button -- */
                  <div
                    className="-mt-6 w-14 h-14 rounded-[18px] flex items-center justify-center transition-all"
                    style={{
                      background: isActive
                        ? `linear-gradient(145deg, ${FOS.teal} 0%, #0F766E 100%)`
                        : `linear-gradient(145deg, #0F1E35 0%, ${FOS.surface} 100%)`,
                      border: isActive ? "none" : `1.5px solid ${FOS.teal}35`,
                      boxShadow: isActive
                        ? `0 8px 28px ${FOS.tealGlow}, 0 2px 8px rgba(0,0,0,0.5)`
                        : `0 4px 16px rgba(0,0,0,0.6)`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: isActive ? "#fff" : FOS.teal }} />
                    {(tab.badge ?? 0) > 0 && (
                      <span
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black"
                        style={{ background: FOS.red, color: "#fff" }}
                      >
                        {(tab.badge ?? 0) > 9 ? "9+" : tab.badge}
                      </span>
                    )}
                  </div>
                ) : (
                  /* -- Regular tab -- */
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: isActive ? activeBg : "transparent" }}
                  >
                    <Icon
                      className="w-5 h-5 transition-colors"
                      style={{ color: isActive ? activeColor : FOS.ghost }}
                    />
                    {(tab.badge ?? 0) > 0 && (
                      <span
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                        style={{ background: FOS.red, color: "#fff" }}
                      >
                        {(tab.badge ?? 0) > 9 ? "9+" : tab.badge}
                      </span>
                    )}
                  </div>
                )}

                <span
                  className="text-[9px] font-semibold leading-none transition-colors"
                  style={{
                    color: isActive
                      ? (isJob ? FOS.teal : activeColor)
                      : FOS.ghost,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
