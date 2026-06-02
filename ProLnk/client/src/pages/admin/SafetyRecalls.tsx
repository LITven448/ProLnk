import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  AlertTriangle, Shield, Home, Zap, Search,
  ChevronRight, Eye, Clock, Users, ExternalLink,
  CheckCircle, XCircle, Flame, FileText, Bell
} from "lucide-react";

// --- Active Recalls ----------------------------------------------------------
const ACTIVE_RECALLS = [
  {
    id: 1,
    recallId: "CPSC-24-789",
    product: "GE Electrical Panel (Model QP-2040)",
    manufacturer: "General Electric",
    hazard: "Fire risk due to defective circuit breakers that may fail to trip during overload",
    severity: 5,
    dateIssued: "Mar 15, 2026",
    propertiesMatched: 23,
    leadsGenerated: 23,
    partnersNotified: 8,
    estimatedRevenue: 69000,
    status: "active" as const,
    notified: 34,
    total: 47,
    matchMethod: "AI photo match -- electrical panel visible in 23 job photos across 4 partners",
  },
  {
    id: 2,
    recallId: "CPSC-24-456",
    product: "Rheem Water Heater (ProTerra Series)",
    manufacturer: "Rheem Manufacturing",
    hazard: "Potential gas leak from faulty valve assembly",
    severity: 4,
    dateIssued: "Feb 28, 2026",
    propertiesMatched: 12,
    leadsGenerated: 12,
    partnersNotified: 5,
    estimatedRevenue: 36000,
    status: "active" as const,
    notified: 0,
    total: 12,
    matchMethod: "AI photo match -- water heater model identified in 12 job photos across 3 partners",
  },
  {
    id: 3,
    recallId: "CPSC-24-321",
    product: "Lennox Furnace (SL280 Series)",
    manufacturer: "Lennox International",
    hazard: "Carbon monoxide risk from cracked heat exchanger",
    severity: 5,
    dateIssued: "Jan 10, 2026",
    propertiesMatched: 8,
    leadsGenerated: 8,
    partnersNotified: 4,
    estimatedRevenue: 32000,
    status: "completed" as const,
    notified: 8,
    total: 8,
    matchMethod: "AI photo match -- furnace model identified in 8 job photos across 2 partners",
  },
  {
    id: 4,
    recallId: "CPSC-24-212",
    product: "Whirlpool Dryer (WED5000DW)",
    manufacturer: "Whirlpool Corporation",
    hazard: "Overheating element may ignite lint buildup causing fire",
    severity: 3,
    dateIssued: "Apr 2, 2026",
    propertiesMatched: 6,
    leadsGenerated: 6,
    partnersNotified: 3,
    estimatedRevenue: 18000,
    status: "active" as const,
    notified: 2,
    total: 6,
    matchMethod: "AI photo match -- dryer model identified in job photos across 2 partners",
  },
  {
    id: 5,
    recallId: "CPSC-24-098",
    product: "Kidde Smoke Alarm (Model i9050)",
    manufacturer: "Kidde Fire Protection",
    hazard: "May fail to activate in presence of smoke due to sensor calibration defect",
    severity: 4,
    dateIssued: "May 1, 2026",
    propertiesMatched: 31,
    leadsGenerated: 31,
    partnersNotified: 10,
    estimatedRevenue: 93000,
    status: "active" as const,
    notified: 15,
    total: 31,
    matchMethod: "AI photo match -- smoke alarm model identified in 31 job photos across 7 partners",
  },
];

const SEVERITY_LABEL: Record<number, string> = {
  5: "Critical",
  4: "High",
  3: "Medium",
  2: "Low",
  1: "Informational",
};

const SEVERITY_COLORS: Record<number, { bg: string; text: string }> = {
  5: { bg: "#FEE2E2", text: "#DC2626" },
  4: { bg: "#FEF3C7", text: "#D97706" },
  3: { bg: "#FEF9C3", text: "#A16207" },
  2: { bg: "#DBEAFE", text: "#1D4ED8" },
  1: { bg: "#F0FDF4", text: "#16A34A" },
};

// --- Recall Stats ------------------------------------------------------------
const RECALL_STATS = [
  { month: "Jan", recalls: 2, matches: 14, leads: 14 },
  { month: "Feb", recalls: 3, matches: 18, leads: 18 },
  { month: "Mar", recalls: 2, matches: 23, leads: 23 },
];

function fmt$(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export default function SafetyRecalls() {
  const [expandedRecall, setExpandedRecall] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [notifiedMap, setNotifiedMap] = useState<Record<number, boolean>>({});

  const activeCount = ACTIVE_RECALLS.filter(r => r.status === "active").length;

  const filtered = ACTIVE_RECALLS.filter(r => {
    const q = search.toLowerCase();
    return !q || r.product.toLowerCase().includes(q) || r.manufacturer.toLowerCase().includes(q) || r.recallId.toLowerCase().includes(q);
  });

  function notifyHomeowners(id: number) {
    setNotifiedMap(prev => ({ ...prev, [id]: true }));
  }

  return (
    <AdminLayout title="Safety Recalls" subtitle="Manufacturer Recall Engine -- Patent Claim 32">
      <div className="p-6 space-y-6" style={{ fontFamily: FONT }}>

        {/* -- Animated Alert Banner ----------------------------------------- */}
        <div className="flex items-center gap-4 p-4 rounded-2xl animate-pulse-slow" style={{ backgroundColor: "#FEF2F2", border: "2px solid #EF4444" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FEE2E2" }}>
            <AlertTriangle className="w-5 h-5" style={{ color: "#DC2626" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: "#991B1B" }}>2 active recall notices affecting homes in your network</p>
            <p className="text-xs" style={{ color: "#B91C1C" }}>GE Electrical Panel (23 homes) &amp; Kidde Smoke Alarm (31 homes) — immediate action required</p>
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            CPSC Feed Active
          </span>
        </div>

        {/* -- Coverage Progress --------------------------------------------- */}
        <div className="rounded-2xl p-4" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold" style={{ color: T.text }}>Notification Coverage</span>
            <span className="text-sm font-bold" style={{ color: T.green }}>34 of 47 homeowners notified (72%)</span>
          </div>
          <div className="w-full rounded-full h-3" style={{ backgroundColor: T.bg }}>
            <div className="h-3 rounded-full transition-all" style={{ width: "72%", backgroundColor: T.green }} />
          </div>
          <p className="text-xs mt-2" style={{ color: T.muted }}>13 homeowners still need to be notified across active recalls</p>
        </div>

        {/* -- Search Bar ---------------------------------------------------- */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: T.dim }} />
          <input
            type="text"
            placeholder="Search by product, brand, or recall ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, color: T.text }}
          />
        </div>

        {/* -- Stats Row ----------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Recalls", value: String(activeCount), icon: AlertTriangle, gradient: BADGE_GRADIENTS.pink },
            { label: "Properties Matched", value: "43", icon: Home, gradient: BADGE_GRADIENTS.blue },
            { label: "Safety Leads", value: "43", icon: Shield, gradient: BADGE_GRADIENTS.green },
            { label: "Est. Revenue", value: "$137K", icon: Zap, gradient: BADGE_GRADIENTS.orange },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: T.muted }}>{s.label}</p>
                  <p className="text-xl font-bold mt-0.5" style={{ color: T.text }}>{s.value}</p>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.gradient }}>
                  <s.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* -- Recall Cards -------------------------------------------------- */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: T.text }}>Recall Tracking ({filtered.length})</h2>
          <div className="space-y-4">
            {filtered.map(recall => {
              const isExpanded = expandedRecall === recall.id;
              const isActive = recall.status === "active";
              const sev = SEVERITY_COLORS[recall.severity] || SEVERITY_COLORS[3];
              const notifPct = recall.total > 0 ? Math.round((recall.notified / recall.total) * 100) : 0;
              const isNotified = notifiedMap[recall.id];
              return (
                <div key={recall.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                  <div className="h-1" style={{ backgroundColor: isActive ? "#EF4444" : T.green }} />
                  <div className="p-5 cursor-pointer" onClick={() => setExpandedRecall(isExpanded ? null : recall.id)}>
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: isActive ? "#FEE2E2" : "#D1FAE5" }}
                      >
                        {isActive ? (
                          <AlertTriangle className="w-5 h-5" style={{ color: "#DC2626" }} />
                        ) : (
                          <CheckCircle className="w-5 h-5" style={{ color: "#059669" }} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: T.bg, color: T.muted, fontFamily: MONO }}>{recall.recallId}</span>
                          <h3 className="font-bold text-sm" style={{ color: T.text }}>{recall.product}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: isActive ? "#FEE2E2" : "#D1FAE5", color: isActive ? "#DC2626" : "#059669" }}>
                            {isActive ? "Active" : "Resolved"}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: sev.bg, color: sev.text }}>
                            {SEVERITY_LABEL[recall.severity]}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: T.muted }}>
                          {recall.manufacturer} &nbsp;·&nbsp; Severity {recall.severity}/5 &nbsp;·&nbsp; Issued {recall.dateIssued}
                        </p>
                        {/* Per-recall notification progress */}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: T.bg }}>
                            <div className="h-1.5 rounded-full" style={{ width: `${notifPct}%`, backgroundColor: notifPct === 100 ? T.green : "#F59E0B" }} />
                          </div>
                          <span className="text-[10px]" style={{ color: T.muted }}>{recall.notified}/{recall.total} notified</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <button
                          onClick={e => { e.stopPropagation(); notifyHomeowners(recall.id); }}
                          disabled={isNotified || !isActive}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{
                            backgroundColor: isNotified || !isActive ? T.bg : "#EF4444",
                            color: isNotified || !isActive ? T.muted : "#fff",
                            cursor: isNotified || !isActive ? "default" : "pointer",
                          }}
                        >
                          <Bell className="w-3 h-3" />
                          {isNotified ? "Notified" : "Notify Homeowners"}
                        </button>
                        <div className="text-center">
                          <p className="text-sm font-bold" style={{ color: T.text }}>{recall.propertiesMatched}</p>
                          <p className="text-[10px]" style={{ color: T.muted }}>Matched</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold" style={{ color: T.green }}>{recall.leadsGenerated}</p>
                          <p className="text-[10px]" style={{ color: T.muted }}>Leads</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold" style={{ color: T.blue }}>{fmt$(recall.estimatedRevenue)}</p>
                          <p className="text-[10px]" style={{ color: T.muted }}>Revenue</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} style={{ color: T.dim }} />
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-0 space-y-4">
                      <div className="p-3 rounded-xl" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Flame className="w-3 h-3" style={{ color: "#DC2626" }} />
                          <span className="text-xs font-bold" style={{ color: "#991B1B" }}>Hazard Description</span>
                        </div>
                        <p className="text-xs" style={{ color: "#B91C1C" }}>{recall.hazard}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl p-4" style={{ backgroundColor: T.bg }}>
                          <h4 className="text-xs font-bold mb-2" style={{ color: T.text }}>
                            <Eye className="w-3 h-3 inline mr-1" /> How Properties Were Matched
                          </h4>
                          <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{recall.matchMethod}</p>
                          <div className="mt-3 flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}>AI Photo Analysis</span>
                            <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#F3E8FF", color: "#0D9488" }}>Model Recognition</span>
                            <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>CPSC Database</span>
                          </div>
                        </div>
                        <div className="rounded-xl p-4" style={{ backgroundColor: T.bg }}>
                          <h4 className="text-xs font-bold mb-2" style={{ color: T.text }}>
                            <Users className="w-3 h-3 inline mr-1" /> Response Summary
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: T.muted }}>Partners notified</span>
                              <span className="text-xs font-bold" style={{ color: T.text }}>{recall.partnersNotified}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: T.muted }}>Leads dispatched</span>
                              <span className="text-xs font-bold" style={{ color: T.green }}>{recall.leadsGenerated}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: T.muted }}>Est. revenue</span>
                              <span className="text-xs font-bold" style={{ color: T.blue }}>{fmt$(recall.estimatedRevenue)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs" style={{ color: T.muted }}>Priority level</span>
                              <span className="text-xs font-bold" style={{ color: T.red }}>SAFETY -- Highest</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* -- How It Works --------------------------------------------------- */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: T.text }}>How Recall Matching Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: 1, title: "CPSC Monitoring", desc: "Engine monitors CPSC recall database for new manufacturer recalls", icon: Search, color: "#3B82F6" },
              { step: 2, title: "Product Identification", desc: "AI searches photo database for images containing the recalled product", icon: Eye, color: "#8B5CF6" },
              { step: 3, title: "Property Matching", desc: "Cross-references matched photos with property addresses in the system", icon: Home, color: "#F59E0B" },
              { step: 4, title: "Lead Generation", desc: "Auto-generates high-priority safety leads for affected properties", icon: Zap, color: "#EF4444" },
              { step: 5, title: "Partner Dispatch", desc: "Routes leads to qualified partners in the affected area", icon: Users, color: "#10B981" },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="text-[10px] font-bold" style={{ color: s.color }}>Step {s.step}</p>
                <p className="text-xs font-bold mt-1" style={{ color: T.text }}>{s.title}</p>
                <p className="text-[10px] mt-1 leading-relaxed" style={{ color: T.muted }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
            <p className="text-[10px] font-bold" style={{ color: "#166534" }}>Patent Claim 32</p>
            <p className="text-[10px] leading-relaxed" style={{ color: "#15803D" }}>
              "The system monitors manufacturer recall databases. When a recall is issued, queries the photo database to find all properties where the recalled product was photographed. Generates high-priority safety leads."
            </p>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
