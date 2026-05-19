import { useState, useMemo } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import { Link } from "wouter";
import {
  CloudLightning, Clock, Home, AlertTriangle, Radar,
  TrendingUp, Zap, ArrowRight, Activity, Shield,
  ChevronRight, BarChart3, Eye, Play, Pause,
  CheckCircle, XCircle, Loader2, Target, Flame
} from "lucide-react";

// --- Engine Definitions ------------------------------------------------------
const ENGINES = [
  {
    id: "weather",
    name: "Storm Watch",
    subtitle: "Weather Trigger Engine",
    claim: "Claim 29",
    icon: CloudLightning,
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    description: "Monitors NOAA weather forecasts. When severe weather is predicted, cross-references property database for homes with pre-existing vulnerabilities identified from past contractor photos.",
    href: "/admin/storm-watch",
    stats: { triggers: 23, properties: 847, leads: 156, revenue: 234500 },
    status: "active" as const,
    lastFired: "2h ago",
  },
  {
    id: "aging",
    name: "Asset Aging",
    subtitle: "Predictive Aging Engine",
    claim: "Claim 30",
    icon: Clock,
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    description: "Identifies assets (HVAC, water heaters, roofs) during AI photo analysis and estimates remaining lifespan. Sets temporal triggers to auto-generate replacement leads at end-of-life.",
    href: "/admin/asset-aging",
    stats: { triggers: 89, properties: 2341, leads: 412, revenue: 618000 },
    status: "active" as const,
    lastFired: "45m ago",
  },
  {
    id: "realestate",
    name: "Market Events",
    subtitle: "Real Estate Trigger Engine",
    claim: "Claim 31",
    icon: Home,
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    description: "Integrates with MLS databases. When a property is listed for sale, generates pre-inspection repair leads. When sold, generates post-move-in maintenance leads for the buyer.",
    href: "/admin/predict",
    stats: { triggers: 34, properties: 567, leads: 89, revenue: 133500 },
    status: "standby" as const,
    lastFired: "1d ago",
  },
  {
    id: "recall",
    name: "Safety Recalls",
    subtitle: "Manufacturer Recall Engine",
    claim: "Claim 32",
    icon: AlertTriangle,
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
    description: "Monitors CPSC recall databases. When a recall is issued, queries the photo database to find all properties where the recalled product was photographed. Generates high-priority safety leads.",
    href: "/admin/recalls",
    stats: { triggers: 7, properties: 234, leads: 67, revenue: 100500 },
    status: "active" as const,
    lastFired: "3d ago",
  },
];

// --- Recent Event Feed (demo data) ------------------------------------------
const RECENT_EVENTS = [
  { id: 1, type: "weather", title: "Hail Warning -- Tarrant County", severity: 4, properties: 127, leads: 34, time: "2h ago", status: "processing" },
  { id: 2, type: "aging", title: "HVAC End-of-Life -- 15yr+ Units", severity: 3, properties: 89, leads: 89, time: "45m ago", status: "completed" },
  { id: 3, type: "recall", title: "GE Electrical Panel Recall #24-789", severity: 5, properties: 23, leads: 23, time: "3d ago", status: "completed" },
  { id: 4, type: "weather", title: "Freeze Warning -- DFW Metro", severity: 3, properties: 234, leads: 56, time: "5d ago", status: "completed" },
  { id: 5, type: "aging", title: "Water Heater Replacement -- 12yr+ Units", severity: 2, properties: 156, leads: 78, time: "1w ago", status: "completed" },
  { id: 6, type: "realestate", title: "New Listing -- 4521 Oak Lawn Ave", severity: 1, properties: 1, leads: 3, time: "1d ago", status: "completed" },
  { id: 7, type: "aging", title: "Roof Replacement -- 20yr+ Shingles", severity: 3, properties: 67, leads: 45, time: "2w ago", status: "completed" },
  { id: 8, type: "recall", title: "Rheem Water Heater Recall #24-456", severity: 4, properties: 12, leads: 12, time: "2w ago", status: "completed" },
];

const TYPE_CONFIG: Record<string, { icon: typeof CloudLightning; color: string; label: string }> = {
  weather:    { icon: CloudLightning, color: "#3B82F6", label: "Weather" },
  aging:      { icon: Clock,          color: "#F59E0B", label: "Aging" },
  realestate: { icon: Home,           color: "#10B981", label: "Real Estate" },
  recall:     { icon: AlertTriangle,  color: "#EF4444", label: "Recall" },
};

const STATUS_BADGE: Record<string, { label: string; color: string; bg: string }> = {
  processing: { label: "Processing", color: "#F59E0B", bg: "#FEF3C7" },
  completed:  { label: "Completed",  color: "#10B981", bg: "#D1FAE5" },
  active:     { label: "Active",     color: "#3B82F6", bg: "#DBEAFE" },
  failed:     { label: "Failed",     color: "#EF4444", bg: "#FEE2E2" },
};

// --- Weekly Trend Data -------------------------------------------------------
const WEEKLY_TREND = [
  { day: "Mon", weather: 12, aging: 34, realestate: 5, recall: 2 },
  { day: "Tue", weather: 8, aging: 28, realestate: 7, recall: 0 },
  { day: "Wed", weather: 45, aging: 31, realestate: 4, recall: 8 },
  { day: "Thu", weather: 23, aging: 35, realestate: 6, recall: 0 },
  { day: "Fri", weather: 15, aging: 29, realestate: 9, recall: 3 },
  { day: "Sat", weather: 5, aging: 22, realestate: 3, recall: 0 },
  { day: "Sun", weather: 3, aging: 18, realestate: 2, recall: 0 },
];

function fmt$(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function EventEngineDashboard() {
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);

  const totals = useMemo(() => {
    return ENGINES.reduce(
      (acc, e) => ({
        triggers: acc.triggers + e.stats.triggers,
        properties: acc.properties + e.stats.properties,
        leads: acc.leads + e.stats.leads,
        revenue: acc.revenue + e.stats.revenue,
      }),
      { triggers: 0, properties: 0, leads: 0, revenue: 0 }
    );
  }, []);

  return (
    <AdminLayout title="Predictive Engine" subtitle="V6 Event-Driven Lead Generation -- Patent Claims 28-32">
      <div className="p-6 space-y-6" style={{ fontFamily: FONT }}>

        {/* -- Hero Stats Row ----------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Active Triggers", value: totals.triggers.toString(), icon: Radar, gradient: BADGE_GRADIENTS.cyan, delta: "+12 this week" },
            { label: "Properties Monitored", value: totals.properties.toLocaleString(), icon: Eye, gradient: BADGE_GRADIENTS.blue, delta: "+234 this month" },
            { label: "Predictive Leads", value: totals.leads.toLocaleString(), icon: Target, gradient: BADGE_GRADIENTS.green, delta: "+89 this week" },
            { label: "Projected Revenue", value: fmt$(totals.revenue), icon: TrendingUp, gradient: BADGE_GRADIENTS.orange, delta: "+18% vs last month" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-5 relative overflow-hidden" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: T.muted }}>{stat.label}</p>
                  <p className="text-2xl font-bold mt-1" style={{ color: T.text }}>{stat.value}</p>
                  <p className="text-xs mt-1" style={{ color: T.green }}>{stat.delta}</p>
                </div>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: stat.gradient }}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* -- Engine Status Cards ------------------------------------------- */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold" style={{ color: T.text }}>Trigger Engines</h2>
              <p className="text-sm" style={{ color: T.muted }}>Four autonomous engines monitoring external data sources for lead generation opportunities</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: "#D1FAE5", color: "#059669" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                3 Active
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>
                1 Standby
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {ENGINES.map(engine => {
              const isSelected = selectedEngine === engine.id;
              return (
                <div
                  key={engine.id}
                  className="rounded-2xl overflow-hidden transition-all cursor-pointer"
                  style={{
                    backgroundColor: T.card,
                    boxShadow: isSelected ? `0 0 0 2px ${engine.color}, 0 4px 20px rgba(0,0,0,0.12)` : "0 2px 12px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => setSelectedEngine(isSelected ? null : engine.id)}
                >
                  {/* Header bar with gradient */}
                  <div className="h-1.5" style={{ background: engine.gradient }} />

                  <div className="p-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: engine.gradient }}
                        >
                          <engine.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm" style={{ color: T.text }}>{engine.name}</h3>
                          <p className="text-xs" style={{ color: T.muted }}>{engine.subtitle}  {engine.claim}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1"
                          style={{
                            backgroundColor: engine.status === "active" ? "#D1FAE5" : "#FEF3C7",
                            color: engine.status === "active" ? "#059669" : "#D97706",
                          }}
                        >
                          {engine.status === "active" ? (
                            <><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active</>
                          ) : (
                            <><Pause className="w-3 h-3" /> Standby</>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs leading-relaxed mb-4" style={{ color: T.muted }}>
                      {engine.description}
                    </p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      {[
                        { label: "Triggers", value: engine.stats.triggers },
                        { label: "Properties", value: engine.stats.properties.toLocaleString() },
                        { label: "Leads", value: engine.stats.leads },
                        { label: "Revenue", value: fmt$(engine.stats.revenue) },
                      ].map((s, i) => (
                        <div key={i} className="text-center p-2 rounded-lg" style={{ backgroundColor: T.bg }}>
                          <p className="text-xs font-bold" style={{ color: T.text }}>{s.value}</p>
                          <p className="text-[10px]" style={{ color: T.muted }}>{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
                      <span className="text-xs" style={{ color: T.muted }}>Last fired: {engine.lastFired}</span>
                      <Link href={engine.href}>
                        <span className="text-xs font-medium flex items-center gap-1 cursor-pointer" style={{ color: engine.color }}>
                          View Details <ChevronRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* -- Weekly Lead Generation Trend ---------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Chart area */}
          <div className="lg:col-span-2 rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm" style={{ color: T.text }}>Weekly Lead Generation by Engine</h3>
                <p className="text-xs" style={{ color: T.muted }}>Leads generated per day, broken down by trigger type</p>
              </div>
              <div className="flex items-center gap-3">
                {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                  <span key={key} className="flex items-center gap-1.5 text-[10px]" style={{ color: T.muted }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                    {cfg.label}
                  </span>
                ))}
              </div>
            </div>
            {/* Stacked bar chart */}
            <div className="flex items-end gap-3 h-48">
              {WEEKLY_TREND.map((day, i) => {
                const total = day.weather + day.aging + day.realestate + day.recall;
                const maxTotal = Math.max(...WEEKLY_TREND.map(d => d.weather + d.aging + d.realestate + d.recall));
                const scale = 160 / maxTotal;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold" style={{ color: T.text, fontFamily: MONO }}>{total}</span>
                    <div className="w-full flex flex-col-reverse rounded-lg overflow-hidden" style={{ height: total * scale }}>
                      <div style={{ height: day.weather * scale, backgroundColor: "#3B82F6" }} />
                      <div style={{ height: day.aging * scale, backgroundColor: "#F59E0B" }} />
                      <div style={{ height: day.realestate * scale, backgroundColor: "#10B981" }} />
                      <div style={{ height: day.recall * scale, backgroundColor: "#EF4444" }} />
                    </div>
                    <span className="text-[10px]" style={{ color: T.muted }}>{day.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conversion funnel */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: T.text }}>Lead Conversion Funnel</h3>
            <div className="space-y-3">
              {[
                { label: "Triggers Fired", value: 153, pct: 100, color: "#3B82F6" },
                { label: "Properties Matched", value: 3989, pct: 85, color: "#8B5CF6" },
                { label: "Leads Generated", value: 724, pct: 62, color: "#F59E0B" },
                { label: "Leads Dispatched", value: 612, pct: 48, color: "#10B981" },
                { label: "Leads Accepted", value: 489, pct: 38, color: "#06B6D4" },
                { label: "Jobs Completed", value: 312, pct: 25, color: "#059669" },
              ].map((step, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: T.muted }}>{step.label}</span>
                    <span className="text-xs font-bold" style={{ color: T.text, fontFamily: MONO }}>{step.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: T.bg }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${step.pct}%`, backgroundColor: step.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 text-center" style={{ borderTop: `1px solid ${T.border}` }}>
              <p className="text-xs" style={{ color: T.muted }}>Overall Conversion Rate</p>
              <p className="text-2xl font-bold" style={{ color: T.green }}>43.1%</p>
            </div>
          </div>
        </div>

        {/* -- Recent Event Feed --------------------------------------------- */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
            <div>
              <h3 className="font-bold text-sm" style={{ color: T.text }}>Recent Trigger Events</h3>
              <p className="text-xs" style={{ color: T.muted }}>Live feed of external events processed by the engine</p>
            </div>
            <Activity className="w-4 h-4" style={{ color: T.muted }} />
          </div>
          <div className="divide-y" style={{ borderColor: T.border }}>
            {RECENT_EVENTS.map(event => {
              const cfg = TYPE_CONFIG[event.type];
              const statusCfg = STATUS_BADGE[event.status] ?? STATUS_BADGE.completed;
              return (
                <div key={event.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cfg.color}15` }}
                  >
                    <cfg.icon className="w-4 h-4" style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate" style={{ color: T.text }}>{event.title}</p>
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: statusCfg.bg, color: statusCfg.color }}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: T.muted }}>
                      {event.properties} properties matched  {event.leads} leads generated  Severity {event.severity}/5
                    </p>
                  </div>
                  <span className="text-xs flex-shrink-0" style={{ color: T.dim }}>{event.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* -- Patent Architecture Reference -------------------------------- */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: BADGE_GRADIENTS.purple }}>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm" style={{ color: T.text }}>Patent Architecture Reference</h3>
              <p className="text-xs" style={{ color: T.muted }}>V6 Event-Driven Lead Generation Engine -- Module 800</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { claim: "Claim 28", title: "Event-Driven Engine Core", desc: "Base architecture for autonomous trigger-based lead generation from external data sources" },
              { claim: "Claim 29", title: "Weather Trigger Integration", desc: "NOAA forecast ingestion with property vulnerability cross-referencing" },
              { claim: "Claim 30", title: "Predictive Asset Aging", desc: "AI-estimated asset lifespan with temporal trigger for replacement leads" },
              { claim: "Claim 31", title: "Real Estate Event Monitor", desc: "MLS integration for pre-sale inspection and post-sale maintenance leads" },
              { claim: "Claim 32", title: "Manufacturer Recall Match", desc: "CPSC recall monitoring with photo-based product identification" },
              { claim: "Claims 16-18", title: "Visual Upsell Engine", desc: "AI-generated before/after renderings for homeowner engagement" },
              { claim: "Claim 19", title: "Multi-Stage AI Pipeline", desc: "5-stage waterfall: preprocess  relevance  features  classify  confidence" },
              { claim: "Claims 21-22", title: "Report Generation", desc: "Insurance and appraisal property condition reports from AI analysis" },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-xl" style={{ backgroundColor: T.bg }}>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: T.accent }}>{item.claim}</span>
                <p className="text-xs font-semibold mt-1" style={{ color: T.text }}>{item.title}</p>
                <p className="text-[11px] mt-1 leading-relaxed" style={{ color: T.muted }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
