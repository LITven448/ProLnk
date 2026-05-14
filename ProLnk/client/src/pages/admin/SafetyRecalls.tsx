import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  AlertTriangle, Shield, Home, Zap, Search,
  ChevronRight, Eye, Clock, Users, ExternalLink,
  CheckCircle, XCircle, Flame, FileText
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
    status: "completed" as const,
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
    matchMethod: "AI photo match -- furnace model identified in 8 job photos across 2 partners",
  },
];

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

  return (
    <AdminLayout title="Safety Recalls" subtitle="Manufacturer Recall Engine -- Patent Claim 32">
      <div className="p-6 space-y-6" style={{ fontFamily: FONT }}>

        {/* -- Alert Banner -------------------------------------------------- */}
        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FEE2E2" }}>
            <AlertTriangle className="w-5 h-5" style={{ color: "#DC2626" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold" style={{ color: "#991B1B" }}>1 Active Safety Recall Affecting Your Network</p>
            <p className="text-xs" style={{ color: "#B91C1C" }}>GE Electrical Panel recall -- 23 properties identified via AI photo matching</p>
          </div>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: "#FEE2E2", color: "#DC2626" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            CPSC Feed Active
          </span>
        </div>

        {/* -- Stats Row ----------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Recalls", value: "1", icon: AlertTriangle, gradient: BADGE_GRADIENTS.pink },
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
          <h2 className="text-lg font-bold mb-4" style={{ color: T.text }}>Recall Tracking</h2>
          <div className="space-y-4">
            {ACTIVE_RECALLS.map(recall => {
              const isExpanded = expandedRecall === recall.id;
              const isActive = recall.status === "active";
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
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: T.bg, color: T.muted, fontFamily: MONO }}>{recall.recallId}</span>
                          <h3 className="font-bold text-sm" style={{ color: T.text }}>{recall.product}</h3>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: isActive ? "#FEE2E2" : "#D1FAE5",
                              color: isActive ? "#DC2626" : "#059669",
                            }}
                          >
                            {isActive ? "Active" : "Resolved"}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: T.muted }}>
                          {recall.manufacturer}  Severity {recall.severity}/5  Issued {recall.dateIssued}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
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
                        <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} style={{ color: T.dim }} />
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-0 space-y-4">
                      {/* Hazard description */}
                      <div className="p-3 rounded-xl" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Flame className="w-3 h-3" style={{ color: "#DC2626" }} />
                          <span className="text-xs font-bold" style={{ color: "#991B1B" }}>Hazard Description</span>
                        </div>
                        <p className="text-xs" style={{ color: "#B91C1C" }}>{recall.hazard}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Match method */}
                        <div className="rounded-xl p-4" style={{ backgroundColor: T.bg }}>
                          <h4 className="text-xs font-bold mb-2" style={{ color: T.text }}>
                            <Eye className="w-3 h-3 inline mr-1" /> How Properties Were Matched
                          </h4>
                          <p className="text-xs leading-relaxed" style={{ color: T.muted }}>{recall.matchMethod}</p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#DBEAFE", color: "#1D4ED8" }}>AI Photo Analysis</span>
                            <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#F3E8FF", color: "#7C3AED" }}>Model Recognition</span>
                            <span className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}>CPSC Database</span>
                          </div>
                        </div>
                        {/* Response stats */}
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
