/**
 * ProLnk Field OS -- Partner Mobile App Shell (v4)
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
import {
  Home, Camera, Zap, Building2, DollarSign,
  WifiOff, Loader2, X, Download,
  Wrench, Droplets, Wind, Flame, Leaf, Bug,
  MapPin, Trophy, Sparkles,
} from "lucide-react";

type Tab = "home" | "job" | "feed" | "profiles" | "earnings";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

import { FOS } from "./fosTokens";
export { FOS } from "./fosTokens";

const MOCK_TODAY_JOBS = [
  { id: 1, trade: "HVAC",        icon: Wind,     address: "1428 Maple Ave, Dallas", value: 285, status: "done",    color: "#06B6D4" },
  { id: 2, trade: "Plumbing",    icon: Droplets, address: "3301 Oak Ln, Garland",   value: 195, status: "done",    color: "#3B82F6" },
  { id: 3, trade: "Landscaping", icon: Leaf,     address: "805 Elm St, Irving",     value: 120, status: "pending", color: "#10B981" },
];

const MOCK_NEARBY_LEADS = [
  { id: 1, type: "HVAC Repair",       distance: "0.4 mi", value: 350, icon: Flame,    color: "#F97316", urgency: "high" },
  { id: 2, type: "Pest Inspection",   distance: "0.9 mi", value: 180, icon: Bug,      color: "#EF4444", urgency: "med"  },
  { id: 3, type: "Fence Replacement", distance: "1.2 mi", value: 920, icon: Wrench,   color: "#8B5CF6", urgency: "low"  },
];

function TodayJobCard({ job }: { job: typeof MOCK_TODAY_JOBS[0] }) {
  const Icon = job.icon;
  return (
    <div
      className="flex-shrink-0 w-52 rounded-3xl p-4 flex flex-col gap-3"
      style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
    >
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${job.color}18` }}>
          <Icon className="w-5 h-5" style={{ color: job.color }} />
        </div>
        <span
          className="text-[10px] font-black px-2 py-0.5 rounded-full"
          style={{
            background: job.status === "done" ? "rgba(16,185,129,0.12)" : "rgba(245,158,11,0.12)",
            color:      job.status === "done" ? FOS.green : FOS.amber,
          }}
        >
          {job.status === "done" ? "Done" : "Upcoming"}
        </span>
      </div>
      <div>
        <p className="text-white font-black text-sm leading-tight">{job.trade}</p>
        <p className="text-[10px] mt-0.5 leading-tight" style={{ color: FOS.muted }}>{job.address}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px]" style={{ color: FOS.faint }}>Est. value</span>
        <span className="text-sm font-black" style={{ color: FOS.lime }}>${job.value}</span>
      </div>
    </div>
  );
}

function NearbyLeadCard({ lead, onClaim }: { lead: typeof MOCK_NEARBY_LEADS[0]; onClaim: () => void }) {
  const Icon = lead.icon;
  const urgencyConfig = {
    high: { label: "HOT",    bg: "rgba(239,68,68,0.12)",    color: "#EF4444" },
    med:  { label: "OPEN",   bg: "rgba(245,158,11,0.12)",   color: FOS.amber },
    low:  { label: "NEW",    bg: "rgba(167,139,250,0.12)",  color: "#A78BFA" },
  }[lead.urgency as "high" | "med" | "low"];
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-3"
      style={{ background: FOS.surface, border: `1px solid ${FOS.border}` }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${lead.color}18` }}>
        <Icon className="w-5 h-5" style={{ color: lead.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-white text-xs font-black truncate">{lead.type}</span>
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: urgencyConfig.bg, color: urgencyConfig.color }}>
            {urgencyConfig.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-2.5 h-2.5 flex-shrink-0" style={{ color: FOS.faint }} />
          <span className="text-[10px]" style={{ color: FOS.muted }}>{lead.distance}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <span className="text-sm font-black" style={{ color: FOS.lime }}>${lead.value}</span>
        <button
          onClick={onClaim}
          className="text-[10px] font-black px-3 py-1 rounded-xl active:scale-90 transition-transform"
          style={{ background: FOS.tealDim, color: FOS.teal, border: `1px solid ${FOS.teal}30` }}
        >
          Claim
        </button>
      </div>
    </div>
  );
}

function AICoachWidget({ jobsToNextTier = 2 }: { jobsToNextTier?: number }) {
  return (
    <div
      className="mx-5 mb-5 rounded-2xl p-4 flex items-start gap-3"
      style={{
        background: `linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(232,255,71,0.06) 100%)`,
        border: `1px solid ${FOS.teal}30`,
      }}
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}25` }}>
        <Sparkles className="w-4 h-4" style={{ color: FOS.teal }} />
      </div>
      <div className="flex-1">
        <p className="text-xs font-black" style={{ color: FOS.teal }}>ProLnk AI Coach</p>
        <p className="text-white text-sm font-bold leading-snug mt-0.5">
          You're <span style={{ color: FOS.lime }}>{jobsToNextTier} jobs</span> away from your next tier badge! 🏆
        </p>
        <p className="text-[10px] mt-1 leading-tight" style={{ color: FOS.muted }}>
          Log {jobsToNextTier} more job{jobsToNextTier !== 1 ? "s" : ""} this week to unlock higher commission rates.
        </p>
      </div>
    </div>
  );
}

export default function FieldOS() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedPhotos, setQueuedPhotos] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: FOS.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: FOS.tealDim, border: `1px solid ${FOS.teal}30` }}>
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: FOS.teal }} />
          </div>
          <p className="text-sm font-medium" style={{ color: FOS.muted }}>Loading Field OS...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-8" style={{ background: FOS.bg }}>
        <div className="flex flex-col items-center gap-5">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
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
              Log jobs, scan properties, and earn commissions — all from your phone.
            </p>
          </div>
        </div>
        <div className="w-full max-w-xs flex flex-col gap-3">
          <a
            href={getLoginUrl()}
            className="w-full py-4 rounded-2xl text-center font-black text-base tracking-wide transition-all active:scale-95"
            style={{ background: FOS.teal, color: "#fff", boxShadow: `0 8px 32px ${FOS.tealGlow}` }}
          >
            Sign In to Continue
          </a>
        </div>
        <p className="text-xs" style={{ color: FOS.ghost }}>ProLnk Partner Network · DFW</p>
      </div>
    );
  }

  const tabs: { id: Tab; icon: any; label: string; badge?: number }[] = [
    { id: "home",     icon: Home,       label: "Home"     },
    { id: "job",      icon: Camera,     label: "Log Job",  badge: queuedPhotos > 0 ? queuedPhotos : undefined },
    { id: "feed",     icon: Zap,        label: "AI Feed"  },
    { id: "profiles", icon: Building2,  label: "Homes"    },
    { id: "earnings", icon: DollarSign, label: "Earnings" },
  ];

  const doneToday = MOCK_TODAY_JOBS.filter(j => j.status === "done").length;
  const todayEarnings = MOCK_TODAY_JOBS.filter(j => j.status === "done").reduce((s, j) => s + j.value * 0.12, 0);

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative" style={{ background: FOS.bg }}>

      {!isOnline && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b"
          style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.2)" }}>
          <WifiOff className="w-3.5 h-3.5 shrink-0" style={{ color: FOS.amber }} />
          <p className="text-xs font-medium" style={{ color: "#FCD34D" }}>
            Offline — photos will sync when reconnected{queuedPhotos > 0 && ` (${queuedPhotos} queued)`}
          </p>
        </div>
      )}

      {showInstallBanner && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b"
          style={{ background: FOS.tealDim, borderColor: `${FOS.teal}25` }}>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Download className="w-4 h-4 shrink-0" style={{ color: FOS.teal }} />
            <p className="text-xs font-medium" style={{ color: FOS.white }}>Add Field OS to your home screen</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleInstall}
              className="text-xs font-black px-3 py-1.5 rounded-xl transition-all active:scale-95"
              style={{ background: FOS.teal, color: "#fff" }}>
              Install
            </button>
            <button
              onClick={() => { setShowInstallBanner(false); localStorage.setItem("fieldos_install_dismissed", "1"); }}
              className="w-7 h-7 flex items-center justify-center rounded-full transition-all active:scale-90"
              style={{ background: FOS.ghost }}>
              <X className="w-3.5 h-3.5" style={{ color: FOS.muted }} />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pb-24">

        {/* -- Today's Jobs Widget (visible on home tab) -- */}
        {activeTab === "home" && (
          <>
            {/* Today header strip */}
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>Today's Jobs</p>
                <p className="text-white font-black text-sm mt-0.5">{doneToday}/{MOCK_TODAY_JOBS.length} completed · <span style={{ color: FOS.lime }}>${todayEarnings.toFixed(0)} earned</span></p>
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: FOS.limeDim, border: `1px solid ${FOS.lime}20` }}
              >
                <Trophy className="w-4 h-4" style={{ color: FOS.lime }} />
              </div>
            </div>

            {/* Horizontal job cards */}
            <div className="px-5 mb-5 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {MOCK_TODAY_JOBS.map(job => (
                <TodayJobCard key={job.id} job={job} />
              ))}
              <button
                onClick={() => setActiveTab("job")}
                className="flex-shrink-0 w-36 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
                style={{ background: FOS.tealDim, border: `1.5px dashed ${FOS.teal}40` }}
              >
                <Camera className="w-6 h-6" style={{ color: FOS.teal }} />
                <span className="text-xs font-black" style={{ color: FOS.teal }}>+ Log Job</span>
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="px-5 mb-5">
              <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: FOS.muted }}>Quick Actions</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Log Job",       icon: Camera,      color: FOS.teal,  bg: FOS.tealDim, tab: "job"      },
                  { label: "Add Photo",     icon: Zap,         color: FOS.lime,  bg: FOS.limeDim, tab: "job"      },
                  { label: "Earnings",      icon: DollarSign,  color: "#A78BFA", bg: "rgba(167,139,250,0.10)", tab: "earnings" },
                  { label: "Find Lead",     icon: MapPin,      color: FOS.amber, bg: "rgba(245,158,11,0.10)", tab: "feed"     },
                ].map(({ label, icon: Icon, color, bg, tab }) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(tab as Tab)}
                    className="rounded-2xl py-3 flex flex-col items-center gap-1.5 active:scale-90 transition-transform"
                    style={{ background: bg, border: `1px solid ${color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                    <span className="text-[9px] font-bold text-center leading-tight" style={{ color }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Opportunities */}
            <div className="px-5 mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" style={{ color: FOS.teal }} />
                  <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: FOS.muted }}>Nearby Opportunities</p>
                </div>
                <button onClick={() => setActiveTab("feed")} className="text-[10px] font-bold" style={{ color: FOS.teal }}>
                  See All →
                </button>
              </div>
              <div className="space-y-2">
                {MOCK_NEARBY_LEADS.map(lead => (
                  <NearbyLeadCard
                    key={lead.id}
                    lead={lead}
                    onClaim={() => setActiveTab("feed")}
                  />
                ))}
              </div>
            </div>

            {/* AI Coach */}
            <AICoachWidget jobsToNextTier={2} />
          </>
        )}

        {/* -- Tab content -- */}
        {activeTab === "home"     && <FieldHome onNavigate={setActiveTab} />}
        {activeTab === "job"      && <FieldJobLog onSubmitSuccess={() => setActiveTab("feed")} onQueueUpdate={setQueuedPhotos} />}
        {activeTab === "feed"     && <FieldAIFeed />}
        {activeTab === "profiles" && <FieldHomeProfiles />}
        {activeTab === "earnings" && <FieldEarnings />}
      </div>

      {/* -- Fixed Bottom Nav -- */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50">
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
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: isActive ? activeBg : "transparent" }}
                  >
                    <Icon className="w-5 h-5 transition-colors" style={{ color: isActive ? activeColor : FOS.ghost }} />
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
                  style={{ color: isActive ? (isJob ? FOS.teal : activeColor) : FOS.ghost }}
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
