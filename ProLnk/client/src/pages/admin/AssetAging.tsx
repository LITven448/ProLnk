import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  Clock, Flame, Home, Zap, TrendingUp, AlertTriangle,
  ChevronRight, Eye, Calendar, Wrench, Shield,
  ThermometerSun, Droplets, Plug, Wind
} from "lucide-react";

// --- Asset Type Definitions --------------------------------------------------
const ASSET_TYPES = [
  { id: "roof", name: "Roof / Shingles", icon: Home, color: "#EF4444", avgLifespan: 25, tracked: 847, approaching: 67, critical: 12 },
  { id: "hvac", name: "HVAC System", icon: ThermometerSun, color: "#F59E0B", avgLifespan: 15, tracked: 623, approaching: 89, critical: 23 },
  { id: "water_heater", name: "Water Heater", icon: Droplets, color: "#3B82F6", avgLifespan: 12, tracked: 534, approaching: 156, critical: 34 },
  { id: "electrical_panel", name: "Electrical Panel", icon: Plug, color: "#8B5CF6", avgLifespan: 30, tracked: 412, approaching: 23, critical: 5 },
  { id: "siding", name: "Siding / Exterior", icon: Wind, color: "#06B6D4", avgLifespan: 20, tracked: 389, approaching: 45, critical: 8 },
  { id: "windows", name: "Windows", icon: Eye, color: "#10B981", avgLifespan: 20, tracked: 278, approaching: 34, critical: 6 },
  { id: "gutters", name: "Gutters", icon: Droplets, color: "#EC4899", avgLifespan: 20, tracked: 456, approaching: 78, critical: 15 },
  { id: "fence", name: "Fencing", icon: Shield, color: "#78716C", avgLifespan: 15, tracked: 312, approaching: 56, critical: 11 },
];

// --- Timeline Data (upcoming EOL events) -------------------------------------
const TIMELINE = [
  { month: "Apr 2026", assets: 34, types: ["HVAC (12)", "Water Heater (15)", "Gutters (7)"], leads: 34, revenue: 51000 },
  { month: "May 2026", assets: 45, types: ["Roof (8)", "HVAC (18)", "Water Heater (12)", "Fence (7)"], leads: 45, revenue: 67500 },
  { month: "Jun 2026", assets: 67, types: ["HVAC (28)", "Water Heater (22)", "Windows (10)", "Siding (7)"], leads: 67, revenue: 100500 },
  { month: "Jul 2026", assets: 52, types: ["Roof (15)", "HVAC (20)", "Electrical (8)", "Gutters (9)"], leads: 52, revenue: 78000 },
  { month: "Aug 2026", assets: 38, types: ["Water Heater (18)", "HVAC (12)", "Fence (8)"], leads: 38, revenue: 57000 },
  { month: "Sep 2026", assets: 56, types: ["Roof (22)", "Siding (14)", "Windows (12)", "Gutters (8)"], leads: 56, revenue: 84000 },
];

function fmt$(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function AssetAging() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const totalTracked = ASSET_TYPES.reduce((a, t) => a + t.tracked, 0);
  const totalApproaching = ASSET_TYPES.reduce((a, t) => a + t.approaching, 0);
  const totalCritical = ASSET_TYPES.reduce((a, t) => a + t.critical, 0);
  const maxTimeline = Math.max(...TIMELINE.map(t => t.assets));

  return (
    <AdminLayout title="Asset Aging" subtitle="Predictive Aging Engine -- Patent Claim 30">
      <div className="p-6 space-y-6" style={{ fontFamily: FONT }}>

        {/* -- Stats Row ----------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Assets Tracked", value: totalTracked.toLocaleString(), icon: Eye, gradient: BADGE_GRADIENTS.blue, sub: "Across all property photos" },
            { label: "Approaching EOL", value: totalApproaching.toString(), icon: Clock, gradient: BADGE_GRADIENTS.orange, sub: "Within next 12 months" },
            { label: "Critical (Past EOL)", value: totalCritical.toString(), icon: AlertTriangle, gradient: BADGE_GRADIENTS.pink, sub: "Immediate replacement needed" },
            { label: "Scheduled Leads", value: "292", icon: Calendar, gradient: BADGE_GRADIENTS.green, sub: "Auto-fire in next 6 months" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: T.muted }}>{s.label}</p>
                  <p className="text-xl font-bold mt-0.5" style={{ color: T.text }}>{s.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: T.muted }}>{s.sub}</p>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.gradient }}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* -- Asset Type Breakdown ------------------------------------------- */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm" style={{ color: T.text }}>Asset Type Breakdown</h3>
              <p className="text-xs" style={{ color: T.muted }}>AI-identified property assets tracked across the network, with lifespan estimates</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ASSET_TYPES.map(asset => {
              const isSelected = selectedAsset === asset.id;
              const pctApproaching = Math.round((asset.approaching / asset.tracked) * 100);
              const pctCritical = Math.round((asset.critical / asset.tracked) * 100);
              return (
                <div
                  key={asset.id}
                  className="rounded-xl p-4 cursor-pointer transition-all"
                  style={{
                    backgroundColor: isSelected ? `${asset.color}08` : T.bg,
                    border: `1px solid ${isSelected ? `${asset.color}40` : T.border}`,
                  }}
                  onClick={() => setSelectedAsset(isSelected ? null : asset.id)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${asset.color}15` }}>
                      <asset.icon className="w-4 h-4" style={{ color: asset.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: T.text }}>{asset.name}</p>
                      <p className="text-[10px]" style={{ color: T.muted }}>Avg lifespan: {asset.avgLifespan} yrs</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: T.muted }}>Tracked</span>
                      <span className="text-xs font-bold" style={{ color: T.text, fontFamily: MONO }}>{asset.tracked}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: T.amber }}>Approaching EOL</span>
                      <span className="text-xs font-bold" style={{ color: T.amber, fontFamily: MONO }}>{asset.approaching} ({pctApproaching}%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: T.red }}>Critical</span>
                      <span className="text-xs font-bold" style={{ color: T.red, fontFamily: MONO }}>{asset.critical} ({pctCritical}%)</span>
                    </div>
                    {/* Stacked bar */}
                    <div className="h-2 rounded-full overflow-hidden flex" style={{ backgroundColor: `${asset.color}10` }}>
                      <div style={{ width: `${100 - pctApproaching - pctCritical}%`, backgroundColor: `${asset.color}30` }} />
                      <div style={{ width: `${pctApproaching}%`, backgroundColor: T.amber }} />
                      <div style={{ width: `${pctCritical}%`, backgroundColor: T.red }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* -- Replacement Timeline ------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm" style={{ color: T.text }}>Scheduled Lead Timeline</h3>
                <p className="text-xs" style={{ color: T.muted }}>Auto-generated replacement leads by month -- no new photo required</p>
              </div>
            </div>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs font-bold w-16 flex-shrink-0" style={{ color: T.text, fontFamily: MONO }}>{t.month}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="h-6 rounded-lg flex items-center justify-end px-2"
                        style={{
                          width: `${(t.assets / maxTimeline) * 100}%`,
                          background: "linear-gradient(90deg, #F59E0B20, #F59E0B)",
                          minWidth: 40,
                        }}
                      >
                        <span className="text-[10px] font-bold text-white">{t.assets}</span>
                      </div>
                      <span className="text-[10px] font-bold" style={{ color: T.green }}>{t.leads} leads</span>
                      <span className="text-[10px]" style={{ color: T.muted }}></span>
                      <span className="text-[10px] font-bold" style={{ color: T.blue }}>{fmt$(t.revenue)}</span>
                    </div>
                    <p className="text-[10px]" style={{ color: T.muted }}>{t.types.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: T.text }}>How Predictive Aging Works</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Photo Analysis", desc: "When a contractor uploads job photos, AI identifies all visible property assets (roof, HVAC, water heater, etc.)", color: "#8B5CF6" },
                { step: 2, title: "Age Estimation", desc: "AI estimates the asset's current age based on visual indicators, manufacturer data, and regional installation patterns", color: "#3B82F6" },
                { step: 3, title: "Lifespan Calculation", desc: "System calculates estimated remaining lifespan using industry averages and local climate factors", color: "#F59E0B" },
                { step: 4, title: "Temporal Trigger", desc: "When an asset reaches end-of-life, the engine automatically generates a replacement lead -- no new photo needed", color: "#10B981" },
                { step: 5, title: "Partner Dispatch", desc: "Lead is dispatched to the highest-priority partner qualified for that asset type in the property's area", color: "#EF4444" },
              ].map(s => (
                <div key={s.step} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: T.text }}>{s.title}</p>
                    <p className="text-[10px] leading-relaxed" style={{ color: T.muted }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
              <p className="text-[10px] font-bold" style={{ color: "#166534" }}>Patent Claim 30</p>
              <p className="text-[10px] leading-relaxed" style={{ color: "#15803D" }}>
                "The system identifies assets and estimates remaining lifespan. Sets temporal triggers. When an asset reaches end-of-life, automatically generates a replacement lead without a new photo."
              </p>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
