import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  Flame,
  Droplets,
  PersonStanding,
  Baby,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Minus,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Link } from "wouter";

const D = {
  bg: "#0D0F14″,
  surface: "#13161E",
  card: "#1A1E2A",
  border: "#252A3A",
  text: "#F0F2FF",
  muted: "#8B91A8″,
  dim: "#555B72″,
  cyan: "#00D4FF",
  green: "#00E676″,
  amber: "#FFB300″,
  red: "#FF4444″,
  blue: "#3B82F6″,
  purple: "#A855F7″,
  orange: "#FF6B35″,
};

type CheckStatus = "ok" | "warn" | "missing" | "na";

interface CheckItem {
  id: string;
  label: string;
  status: CheckStatus;
  fix?: "diy" | "pro";
  fixLabel?: string;
}

interface CheckGroup {
  id: string;
  title: string;
  icon: typeof Flame;
  color: string;
  items: CheckItem[];
}

const STATUS_CONFIG: Record<CheckStatus, { icon: typeof CheckCircle; color: string; label: string }> = {
  ok: { icon: CheckCircle, color: D.green, label: "Done" },
  warn: { icon: AlertTriangle, color: D.amber, label: "Partial" },
  missing: { icon: XCircle, color: D.red, label: "Missing" },
  na: { icon: Minus, color: D.dim, label: "N/A" },
};

const INITIAL_GROUPS: CheckGroup[] = [
  {
    id: "fire",
    title: "Fire Safety",
    icon: Flame,
    color: D.orange,
    items: [
      { id: "f1″, label: "Smoke detectors on each level", status: "ok" },
      { id: "f2″, label: "CO detectors installed", status: "ok" },
      { id: "f3″, label: "Fire extinguisher (kitchen)", status: "ok" },
      { id: "f4″, label: "Escape route planned", status: "ok" },
      { id: "f5″, label: "Dryer vent cleaned", status: "warn", fix: "diy", fixLabel: "DIY: Disconnect duct & vacuum out lint" },
      { id: "f6″, label: "Electrical panel labeled", status: "missing", fix: "pro", fixLabel: "Electrician labels breakers + checks wiring" },
    ],
  },
  {
    id: "water",
    title: "Water Safety",
    icon: Droplets,
    color: D.blue,
    items: [
      { id: "w1″, label: "Main shutoff known & accessible", status: "ok" },
      { id: "w2″, label: "Water heater temp set <120°F", status: "ok" },
      { id: "w3″, label: "No leaks under sinks", status: "ok" },
      { id: "w4″, label: "Sump pump tested", status: "warn", fix: "diy", fixLabel: "Pour water into pit to verify float activates" },
    ],
  },
  {
    id: "fall",
    title: "Fall Prevention",
    icon: PersonStanding,
    color: D.purple,
    items: [
      { id: "p1″, label: "Handrails on all stairs", status: "ok" },
      { id: "p2″, label: "Non-slip bath mats", status: "ok" },
      { id: "p3″, label: "Adequate lighting in hallways", status: "ok" },
      { id: "p4″, label: "Grab bars in shower/bath", status: "missing", fix: "pro", fixLabel: "Plumber installs into wall studs — critical for safety" },
    ],
  },
  {
    id: "child",
    title: "Child & Pet Safety",
    icon: Baby,
    color: D.cyan,
    items: [
      { id: "c1″, label: "Outlet covers installed", status: "ok" },
      { id: "c2″, label: "Cabinet locks on hazardous storage", status: "ok" },
      { id: "c3″, label: "Pool fence & gate (if applicable)", status: "na" },
      { id: "c4″, label: "Large furniture anchored to wall", status: "warn", fix: "diy", fixLabel: "Anchor strap kits ~$15 at any hardware store" },
    ],
  },
];

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const scoreColor = score >= 85 ? D.green : score >= 65 ? D.amber : D.red;
  const label = score >= 85 ? "Great" : score >= 65 ? "Good" : "Needs Work";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <svg width="140″ height="140" viewBox="0 0 140 140">
        <circle cx="70″ cy="70" r={r} fill="none" stroke={D.border} strokeWidth="10" />
        <circle
          cx="70″ cy="70" r={r}
          fill="none"
          stroke={scoreColor}
          strokeWidth="10″
          strokeDasharray={`${filled} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ filter: `drop-shadow(0 0 6px ${scoreColor}60)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold" style={{ color: D.text }}>{score}</span>
        <span className="text-xs font-bold" style={{ color: scoreColor }}>{label}</span>
      </div>
    </div>
  );
}

export default function HomeSafetyChecklist() {
  const [groups, setGroups] = useState<CheckGroup[]>(INITIAL_GROUPS);

  function toggleItem(groupId: string, itemId: string) {
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        items: g.items.map(item => {
          if (item.id !== itemId) return item;
          if (item.status === "na") return item;
          const next: CheckStatus = item.status === "ok" ? "missing" : "ok";
          return { ...item, status: next };
        }),
      };
    }));
  }

  const allItems = groups.flatMap(g => g.items).filter(i => i.status !== "na");
  const okCount = allItems.filter(i => i.status === "ok").length;
  const score = Math.round((okCount / allItems.length) * 100);

  const actionItems = groups.flatMap(g =>
    g.items
      .filter(i => i.status === "missing" || i.status === "warn")
      .map(i => ({ ...i, groupTitle: g.title, groupColor: g.color }))
  );

  return (
    <HomeownerLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6″>

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: D.text }}>Home Safety Checklist</h1>
          <p className="text-sm mt-1″ style={{ color: D.muted }}>Your home should be your safest place</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6″>
          {/* Main checklist */}
          <div className="lg:col-span-2 space-y-5″>
            {groups.map(group => {
              const GroupIcon = group.icon;
              return (
                <div key={group.id} className="rounded-2xl p-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
                  <div className="flex items-center gap-2 mb-4″>
                    <GroupIcon className="w-4 h-4″ style={{ color: group.color }} />
                    <h2 className="text-sm font-bold" style={{ color: D.text }}>{group.title}</h2>
                    <span className="text-xs px-2 py-0.5 rounded-full ml-auto" style={{ background: group.color + "18″, color: group.color }}>
                      {group.items.filter(i => i.status === "ok").length}/{group.items.filter(i => i.status !== "na").length}
                    </span>
                  </div>
                  <div className="space-y-2″>
                    {group.items.map(item => {
                      const cfg = STATUS_CONFIG[item.status];
                      const StatusIcon = cfg.icon;
                      return (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all hover:opacity-80″
                          style={{ background: D.surface }}
                          onClick={() => toggleItem(group.id, item.id)}
                        >
                          <StatusIcon className="w-4 h-4 mt-0.5 flex-shrink-0″ style={{ color: cfg.color }} />
                          <div className="min-w-0 flex-1″>
                            <p className="text-sm" style={{ color: item.status === "ok" ? D.muted : D.text }}>{item.label}</p>
                            {item.status !== "ok" && item.status !== "na" && item.fixLabel && (
                              <p className="text-xs mt-0.5″ style={{ color: D.dim }}>{item.fixLabel}</p>
                            )}
                          </div>
                          <span className="text-xs flex-shrink-0″ style={{ color: cfg.color }}>{cfg.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Action items */}
            {actionItems.length > 0 && (
              <div className="rounded-2xl p-5″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
                <h2 className="text-sm font-bold mb-4″ style={{ color: D.text }}>Action Items</h2>
                <div className="space-y-3″>
                  {actionItems.map(item => (
                    <div key={item.id} className="flex items-start justify-between gap-3 p-3 rounded-xl" style={{ background: D.surface, border: `1px solid ${item.status === "missing" ? D.red + "30" : D.amber + "30"}` }}>
                      <div className="min-w-0″>
                        <p className="text-xs font-bold" style={{ color: D.text }}>{item.label}</p>
                        <p className="text-xs mt-0.5″ style={{ color: D.muted }}>{item.groupTitle}</p>
                        {item.fixLabel && (
                          <p className="text-xs mt-1″ style={{ color: D.dim }}>{item.fixLabel}</p>
                        )}
                      </div>
                      {item.fix && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0″
                          style={{
                            background: item.fix === "diy" ? D.green + "18″ : D.orange + "18",
                            color: item.fix === "diy" ? D.green : D.orange,
                          }}
                        >
                          {item.fix === "diy" ? "Quick Fix" : "Call a Pro"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Safety reminder schedule */}
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: D.amber + "10″, border: `1px solid ${D.amber}25` }}>
              <Bell className="w-4 h-4 flex-shrink-0 mt-0.5″ style={{ color: D.amber }} />
              <p className="text-sm" style={{ color: D.amber }}>
                <strong>Safety reminders:</strong> Test smoke detectors monthly. Replace batteries every October. Replace detectors every 10 years.
              </p>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5″>
            {/* Score ring */}
            <div className="rounded-2xl p-5 flex flex-col items-center" style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold mb-4 self-start" style={{ color: D.text }}>Safety Score</h2>
              <ScoreRing score={score} />
              <p className="text-xs mt-3 text-center" style={{ color: D.muted }}>
                {actionItems.length > 0
                  ? `${actionItems.length} item${actionItems.length > 1 ? "s" : ""} need${actionItems.length === 1 ? "s" : ""} attention`
                  : "All items complete!"}
              </p>
            </div>

            {/* Status summary */}
            <div className="rounded-2xl p-4 space-y-3″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-sm font-bold" style={{ color: D.text }}>Status Summary</h2>
              {[
                { label: "Complete", count: allItems.filter(i => i.status === "ok").length, color: D.green },
                { label: "Partial", count: allItems.filter(i => i.status === "warn").length, color: D.amber },
                { label: "Missing", count: allItems.filter(i => i.status === "missing").length, color: D.red },
              ].map(stat => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2″>
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }} />
                    <span className="text-xs" style={{ color: D.muted }}>{stat.label}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.count}</span>
                </div>
              ))}
            </div>

            {/* Find Safety Pro CTA */}
            {actionItems.some(i => i.fix === "pro") && (
              <div
                className="rounded-2xl p-4 text-center"
                style={{ background: `linear-gradient(135deg, ${D.orange}18, ${D.red}12)`, border: `1px solid ${D.orange}35` }}
              >
                <Flame className="w-8 h-8 mx-auto mb-2″ style={{ color: D.orange }} />
                <p className="text-sm font-bold mb-1″ style={{ color: D.text }}>Pro Help Recommended</p>
                <p className="text-xs mb-4″ style={{ color: D.muted }}>
                  {actionItems.filter(i => i.fix === "pro").length} item{actionItems.filter(i => i.fix === "pro").length > 1 ? "s" : ""} flagged for professional service.
                </p>
                <Link href="/trustypro/book">
                  <div
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-all hover:opacity-90″
                    style={{ background: D.orange, color: "#fff" }}
                  >
                    Find Safety Pro
                    <ChevronRight className="w-4 h-4″ />
                  </div>
                </Link>
              </div>
            )}

            {/* Quick DIY tip */}
            <div className="rounded-2xl p-4″ style={{ background: D.card, border: `1px solid ${D.border}` }}>
              <h2 className="text-xs font-bold mb-2″ style={{ color: D.text }}>Monthly Checks</h2>
              <div className="space-y-1.5″>
                {[
                  "Test smoke & CO detector buttons",
                  "Check fire extinguisher pressure gauge",
                  "Run water in unused drains",
                  "Inspect under-sink pipes for drips",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2″>
                    <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0″ style={{ color: D.dim }} />
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
