import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Shield, CheckCircle, AlertTriangle, XCircle, ChevronRight,
  Lock, Camera, DoorOpen, Bell, Zap, ExternalLink,
} from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0D0F14",
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8",
  dim: "#555B72",
  cyan: "#00D4FF",
  green: "#00E676",
  amber: "#FFB300",
  red: "#FF4444",
  blue: "#3B82F6",
  purple: "#A855F7",
  teal: "#14B8A6",
};

type CheckStatus = "ok" | "warn" | "missing";

interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
  note?: string;
}

interface CheckGroup {
  title: string;
  items: CheckItem[];
}

const INITIAL_GROUPS: CheckGroup[] = [
  {
    title: "Exterior",
    items: [
      { id: "e1", label: "Deadbolts on all entry doors", status: "ok" },
      { id: "e2", label: "Exterior lighting (motion-activated)", status: "ok" },
      { id: "e3", label: "Garage door secured with lock", status: "warn", note: "No secondary lock installed" },
      { id: "e4", label: "Sliding door security bar", status: "missing" },
      { id: "e5", label: "Fence / gate secured", status: "ok" },
    ],
  },
  {
    title: "Interior",
    items: [
      { id: "i1", label: "Smoke detectors on every floor", status: "ok" },
      { id: "i2", label: "CO detectors installed", status: "ok" },
      { id: "i3", label: "Fire extinguisher accessible", status: "ok" },
      { id: "i4", label: "Safe for valuables / documents", status: "missing" },
    ],
  },
  {
    title: "Smart & Tech",
    items: [
      { id: "t1", label: "Video doorbell", status: "ok" },
      { id: "t2", label: "Security cameras (all angles)", status: "warn", note: "1 of 3 recommended angles covered" },
      { id: "t3", label: "Smart locks", status: "missing" },
      { id: "t4", label: "Monitored alarm system", status: "missing" },
    ],
  },
];

interface Recommendation {
  icon: JSX.Element;
  title: string;
  price: string;
  diy: boolean;
  impact: string;
  color: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Smart Lock Installation",
    price: "$180",
    diy: true,
    impact: "High deterrence, remote access control",
    color: D.cyan,
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: "Security Camera System (3-camera)",
    price: "$300",
    diy: false,
    impact: "Full perimeter coverage, cloud recording",
    color: D.blue,
  },
  {
    icon: <DoorOpen className="w-5 h-5" />,
    title: "Garage Door Sensor & Lock",
    price: "$45",
    diy: true,
    impact: "Most common break-in entry point secured",
    color: D.amber,
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Monitored Alarm System",
    price: "$200–$600",
    diy: false,
    impact: "24/7 monitoring, fastest emergency response",
    color: D.purple,
  },
];

const STATUS_CONFIG: Record<CheckStatus, { icon: JSX.Element; color: string; label: string }> = {
  ok: { icon: <CheckCircle className="w-4 h-4" />, color: D.green, label: "Good" },
  warn: { icon: <AlertTriangle className="w-4 h-4" />, color: D.amber, label: "Partial" },
  missing: { icon: <XCircle className="w-4 h-4" />, color: D.red, label: "Missing" },
};

function SecurityRing({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const scoreColor = score >= 80 ? D.green : score >= 60 ? D.amber : D.red;
  const label = score >= 80 ? "Strong" : score >= 60 ? "Good" : "At Risk";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" strokeWidth="10" stroke={`${scoreColor}20`} />
          <circle
            cx="64" cy="64" r={radius} fill="none" strokeWidth="10"
            stroke={scoreColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black" style={{ color: scoreColor }}>{score}</span>
          <span className="text-xs font-semibold" style={{ color: D.muted }}>/100</span>
        </div>
      </div>
      <span className="text-sm font-bold" style={{ color: scoreColor }}>{label}</span>
      <span className="text-xs text-center" style={{ color: D.muted }}>Addressing gaps could reach 92/100</span>
    </div>
  );
}

export default function HomeSecurityGuide() {
  const [groups, setGroups] = useState<CheckGroup[]>(INITIAL_GROUPS);

  function toggleStatus(groupIdx: number, itemId: string) {
    setGroups(prev => prev.map((g, gi) => {
      if (gi !== groupIdx) return g;
      return {
        ...g,
        items: g.items.map(item => {
          if (item.id !== itemId) return item;
          const next: CheckStatus = item.status === "ok" ? "missing" : item.status === "warn" ? "ok" : "ok";
          return { ...item, status: next };
        }),
      };
    }));
  }

  const allItems = groups.flatMap(g => g.items);
  const gapCount = allItems.filter(i => i.status !== "ok").length;
  const score = Math.round((allItems.filter(i => i.status === "ok").length / allItems.length) * 100);

  return (
    <HomeownerLayout>
      <div style={{ minHeight: "100vh", backgroundColor: D.bg, padding: "32px 24px", fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${D.blue}20` }}>
              <Shield className="w-5 h-5" style={{ color: D.blue }} />
            </div>
            <h1 className="text-2xl font-black" style={{ color: D.text }}>Home Security</h1>
          </div>
          <p className="text-sm ml-14" style={{ color: D.muted }}>Protect your biggest investment</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left: checklist + alerts */}
          <div className="xl:col-span-2 space-y-6">

            {/* Gap Alert */}
            {gapCount > 0 && (
              <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: `${D.amber}15`, border: `1px solid ${D.amber}40` }}>
                <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: D.amber }} />
                <div>
                  <p className="text-sm font-bold mb-0.5" style={{ color: D.amber }}>
                    You have {gapCount} security gap{gapCount > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs" style={{ color: D.muted }}>
                    Addressing them could prevent $8,000+ in losses from break-ins or fire damage
                  </p>
                </div>
              </div>
            )}

            {/* Checklist */}
            {groups.map((group, gi) => (
              <div key={group.title} className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${D.border}`, background: D.surface }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.muted }}>{group.title}</span>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="text-xs font-bold" style={{ color: D.green }}>
                      {group.items.filter(i => i.status === "ok").length}/{group.items.length} complete
                    </span>
                  </div>
                </div>
                <div className="divide-y" style={{ borderColor: D.border }}>
                  {group.items.map(item => {
                    const cfg = STATUS_CONFIG[item.status];
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleStatus(gi, item.id)}
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-all hover:opacity-80"
                        style={{ background: "transparent" }}
                      >
                        <div style={{ color: cfg.color }}>{cfg.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold" style={{ color: D.text }}>{item.label}</p>
                          {item.note && <p className="text-xs mt-0.5" style={{ color: D.muted }}>{item.note}</p>}
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ background: `${cfg.color}20`, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Recommendations */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold" style={{ color: D.text }}>Improvement Recommendations</h2>
                  <p className="text-xs mt-0.5" style={{ color: D.muted }}>Prioritized by impact and cost</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {RECOMMENDATIONS.map(rec => (
                  <div key={rec.title} className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${rec.color}20`, color: rec.color }}
                      >
                        {rec.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold mb-1" style={{ color: D.text }}>{rec.title}</p>
                        <p className="text-xs mb-2" style={{ color: D.muted }}>{rec.impact}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black" style={{ color: rec.color }}>{rec.price}</span>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{
                              background: rec.diy ? `${D.green}20` : `${D.amber}20`,
                              color: rec.diy ? D.green : D.amber,
                            }}
                          >
                            {rec.diy ? "DIY" : "Pro Install"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insurance Discount */}
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: `${D.green}12`, border: `1px solid ${D.green}30` }}>
              <Zap className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: D.green }} />
              <div>
                <p className="text-sm font-bold mb-1" style={{ color: D.green }}>Insurance Discount Opportunity</p>
                <p className="text-sm" style={{ color: D.text }}>
                  Many insurers offer a <strong style={{ color: D.green }}>5–15% discount</strong> for security systems and monitored alarms.
                </p>
                <p className="text-xs mt-1" style={{ color: D.muted }}>
                  Worth <strong style={{ color: D.text }}>$162–$486/yr</strong> on a $3,240 premium — pays for upgrades in under 2 years.
                </p>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">

            {/* Score Ring */}
            <div className="rounded-2xl p-6 flex flex-col items-center" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-4 self-start" style={{ color: D.text }}>Security Score</h2>
              <SecurityRing score={score} />
            </div>

            {/* Summary stats */}
            <div className="rounded-2xl p-4 space-y-3" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: D.text }}>Status Summary</h2>
              {[
                { label: "Secured", count: allItems.filter(i => i.status === "ok").length, color: D.green },
                { label: "Partial", count: allItems.filter(i => i.status === "warn").length, color: D.amber },
                { label: "Missing", count: allItems.filter(i => i.status === "missing").length, color: D.red },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-xs" style={{ color: D.muted }}>{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.count}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-4 text-center" style={{ background: `linear-gradient(135deg, ${D.blue}18, ${D.purple}18)`, border: `1px solid ${D.blue}40` }}>
              <Shield className="w-8 h-8 mx-auto mb-2" style={{ color: D.blue }} />
              <p className="text-sm font-bold mb-1" style={{ color: D.text }}>Get Professional Help</p>
              <p className="text-xs mb-4" style={{ color: D.muted }}>
                Vetted security installers in your area. Free quotes, background-checked pros.
              </p>
              <Link href="/trustypro/book">
                <div
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all hover:opacity-90"
                  style={{ background: D.blue, color: "#fff" }}
                >
                  Find a Security Pro
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </div>

            {/* Quick tips */}
            <div className="rounded-2xl p-4" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-3" style={{ color: D.text }}>Quick Wins (Free)</h2>
              <div className="space-y-2">
                {[
                  "Trim shrubs near windows/doors",
                  "Post visible security warning signs",
                  "Use timers on interior lights",
                  "Don't announce vacations on social media",
                  "Engrave valuables with ID number",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: D.teal }} />
                    <span className="text-xs" style={{ color: D.muted }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeownerLayout>
  );
}
