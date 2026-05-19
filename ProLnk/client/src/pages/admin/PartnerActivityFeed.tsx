import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Activity, CheckCircle, Briefcase, Camera, User, MessageSquare, Users, DollarSign, AlertCircle, RefreshCw } from "lucide-react";

type ActionType = "lead" | "job" | "payment" | "network" | "profile" | "message";

interface FeedItem {
  id: number;
  partner: string;
  trade: string;
  action: ActionType;
  label: string;
  timestamp: Date;
  value?: string;
}

const TRADES = ["HVAC", "Plumbing", "Electrical", "Roofing", "General"];
const NAMES = [
  "Marcus T.", "Sandra K.", "DeShawn R.", "Priya N.", "Carlos M.",
  "Latasha B.", "Kevin O.", "Mei L.", "Jamal H.", "Angela F.",
  "Omar S.", "Brittany W.", "Tyrone C.", "Nadia P.", "Luis G.",
];
const ACTIONS: { type: ActionType; labels: string[]; values?: string[] }[] = [
  { type: "lead", labels: ["Lead accepted", "Lead viewed", "Quote sent", "Lead declined"], values: ["$85", "$120", "$200", "", "$310"] },
  { type: "job", labels: ["Job completed", "Job started", "Job scheduled", "Job cancelled"] },
  { type: "payment", labels: ["Commission earned", "Payout processed", "Bonus unlocked"], values: ["$155", "$312", "$88", "$440", "$220"] },
  { type: "network", labels: ["New recruit enrolled", "Team milestone hit", "Override earned"], values: ["$12", "$28"] },
  { type: "profile", labels: ["Profile updated", "Photo uploaded", "License verified", "Badge earned"] },
  { type: "message", labels: ["Message sent", "Review submitted", "Support ticket opened"] },
];

const ACTION_COLORS: Record<ActionType, string> = {
  lead: "text-sky-400",
  job: "text-emerald-400",
  payment: "text-yellow-400",
  network: "text-purple-400",
  profile: "text-slate-400",
  message: "text-orange-400",
};
const ACTION_BG: Record<ActionType, string> = {
  lead: "bg-sky-500/20 border-sky-500/30",
  job: "bg-emerald-500/20 border-emerald-500/30",
  payment: "bg-yellow-500/20 border-yellow-500/30",
  network: "bg-purple-500/20 border-purple-500/30",
  profile: "bg-slate-500/20 border-slate-500/30",
  message: "bg-orange-500/20 border-orange-500/30",
};
const ACTION_ICONS: Record<ActionType, typeof Activity> = {
  lead: CheckCircle,
  job: Briefcase,
  payment: DollarSign,
  network: Users,
  profile: User,
  message: MessageSquare,
};

const QUIET = [
  { name: "Robert J.", trade: "Plumbing", days: 9 },
  { name: "Felicia D.", trade: "Electrical", days: 8 },
  { name: "Jerome K.", trade: "HVAC", days: 12 },
];

const MOST_ACTIVE = [
  { name: "Marcus T.", trade: "HVAC", count: 34 },
  { name: "Priya N.", trade: "Plumbing", count: 28 },
  { name: "Carlos M.", trade: "Electrical", count: 22 },
];

let nextId = 1000;
function makeItem(): FeedItem {
  const a = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const label = a.labels[Math.floor(Math.random() * a.labels.length)];
  const value = a.values ? a.values[Math.floor(Math.random() * a.values.length)] : undefined;
  return {
    id: nextId++,
    partner: NAMES[Math.floor(Math.random() * NAMES.length)],
    trade: TRADES[Math.floor(Math.random() * TRADES.length)],
    action: a.type,
    label,
    timestamp: new Date(),
    value: value || undefined,
  };
}

const SEED: FeedItem[] = Array.from({ length: 25 }, (_, i) => ({
  ...makeItem(),
  id: i,
  timestamp: new Date(Date.now() - Math.random() * 3600 * 1000),
}));

type Filter = "all" | ActionType;
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "lead", label: "Lead actions" },
  { key: "job", label: "Job activity" },
  { key: "payment", label: "Payments" },
  { key: "network", label: "Network" },
  { key: "profile", label: "Profile" },
];

function fmt(d: Date) {
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function PartnerActivityFeed() {
  const [items, setItems] = useState<FeedItem[]>(SEED);
  const [filter, setFilter] = useState<Filter>("all");
  const [live, setLive] = useState(true);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => {
      const newItem = makeItem();
      setItems(prev => [newItem, ...prev.slice(0, 99)]);
    }, 3000);
    return () => clearInterval(t);
  }, [live]);

  const visible = filter === "all" ? items : items.filter(i => i.action === filter);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#0A1628] text-white p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Activity className="w-7 h-7 text-sky-400" />
              Partner Activity Feed
            </h1>
            <p className="text-slate-400 mt-1">What your network is doing right now</p>
          </div>
          <button
            onClick={() => setLive(v => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium text-sm transition-colors ${live ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : "bg-slate-700/40 border-slate-600 text-slate-400"}`}
          >
            <RefreshCw className={`w-4 h-4 ${live ? "animate-spin" : ""}`} />
            {live ? "Live" : "Paused"}
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Actions today", value: "847", icon: Activity, color: "text-sky-400" },
            { label: "Active partners", value: "134 / 147", icon: Users, color: "text-emerald-400" },
            { label: "Jobs completed", value: "12", icon: Briefcase, color: "text-purple-400" },
            { label: "Commissions earned", value: "$4,847", icon: DollarSign, color: "text-yellow-400" },
          ].map(m => (
            <div key={m.label} className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <m.icon className={`w-4 h-4 ${m.color}`} />
                <p className="text-slate-400 text-xs">{m.label}</p>
              </div>
              <p className="text-white text-2xl font-bold">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${filter === f.key ? "bg-sky-600 border-sky-500 text-white" : "bg-[#1A2942] border-[#2A3F5F] text-slate-400 hover:text-white"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live feed */}
          <div className="lg:col-span-2 bg-[#1A2942] border border-[#2A3F5F] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#2A3F5F] flex items-center justify-between">
              <h2 className="text-white font-semibold">Live Feed</h2>
              <span className="text-xs text-slate-400">{visible.length} events</span>
            </div>
            <div ref={topRef} className="overflow-y-auto max-h-[520px] divide-y divide-[#1E3050]">
              {visible.map(item => {
                const Icon = ACTION_ICONS[item.action];
                return (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#0F1E35] transition-colors">
                    <div className={`p-2 rounded-lg border ${ACTION_BG[item.action]}`}>
                      <Icon className={`w-4 h-4 ${ACTION_COLORS[item.action]}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white text-sm font-medium">{item.partner}</span>
                        <span className="text-xs px-1.5 py-0.5 bg-[#0F1E35] border border-[#2A3F5F] rounded text-slate-400">{item.trade}</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-0.5">{item.label}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {item.value && <p className="text-emerald-400 text-sm font-semibold">{item.value}</p>}
                      <p className="text-slate-500 text-xs">{fmt(item.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Most active */}
            <div className="bg-[#1A2942] border border-[#2A3F5F] rounded-xl p-4">
              <h3 className="text-white font-semibold mb-3">Most Active Today</h3>
              <div className="space-y-3">
                {MOST_ACTIVE.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm w-5">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{p.name}</p>
                      <p className="text-slate-400 text-xs">{p.trade}</p>
                    </div>
                    <span className="text-sky-400 font-bold text-sm">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiet partners */}
            <div className="bg-[#1A2942] border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-white font-semibold text-sm">13 Quiet Partners</h3>
              </div>
              <p className="text-slate-400 text-xs mb-3">No activity in 7+ days</p>
              <div className="space-y-2">
                {QUIET.map(p => (
                  <div key={p.name} className="flex items-center justify-between bg-[#0F1E35] rounded-lg p-2.5">
                    <div>
                      <p className="text-white text-xs font-medium">{p.name}</p>
                      <p className="text-slate-400 text-xs">{p.trade} · {p.days}d ago</p>
                    </div>
                    <button className="text-xs text-sky-400 hover:text-sky-300 font-medium px-2 py-1 rounded border border-sky-500/30 hover:border-sky-400/50 transition-colors">
                      Nudge
                    </button>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-xs text-slate-400 hover:text-white border border-[#2A3F5F] hover:border-slate-500 py-2 rounded-lg transition-colors">
                View all 13
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
