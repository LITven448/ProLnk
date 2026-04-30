import { useState, useMemo } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT, MONO } from "@/components/AdminLayout";
import {
  Camera, Filter, Cpu, Tag, CheckCircle, XCircle,
  ArrowRight, Activity, BarChart3, Clock, Zap,
  Eye, TrendingUp, AlertTriangle, Layers, ChevronDown
} from "lucide-react";

// --- Pipeline Stage Definitions ----------------------------------------------
const STAGES = [
  {
    id: "preprocessing",
    name: "Preprocessing",
    shortName: "Preprocess",
    icon: Camera,
    color: "#8B5CF6",
    description: "Image normalization, EXIF extraction, GPS tagging, duplicate detection",
    avgMs: 120,
    successRate: 99.2,
  },
  {
    id: "relevance_filter",
    name: "Relevance Filter",
    shortName: "Relevance",
    icon: Filter,
    color: "#3B82F6",
    description: "Determines if the photo contains analyzable property features vs. irrelevant content",
    avgMs: 340,
    successRate: 87.5,
  },
  {
    id: "feature_extraction",
    name: "Feature Extraction",
    shortName: "Features",
    icon: Cpu,
    color: "#06B6D4",
    description: "Identifies specific property assets: roof condition, HVAC units, siding, gutters, etc.",
    avgMs: 890,
    successRate: 94.1,
  },
  {
    id: "condition_classification",
    name: "Condition Classification",
    shortName: "Classify",
    icon: Tag,
    color: "#F59E0B",
    description: "Classifies each detected asset condition: excellent, good, fair, poor, or critical",
    avgMs: 560,
    successRate: 91.8,
  },
  {
    id: "confidence_scoring",
    name: "Confidence Scoring",
    shortName: "Confidence",
    icon: CheckCircle,
    color: "#10B981",
    description: "Assigns confidence scores and determines if conditions warrant lead generation",
    avgMs: 180,
    successRate: 96.3,
  },
];

// --- Demo Pipeline Runs ------------------------------------------------------
const DEMO_RUNS = [
  { id: 1, photoId: 4521, partner: "Apex Roofing DFW", stage: "completed", conditions: 3, leads: 2, confidence: 0.94, ms: 2100, time: "2m ago", status: "completed" as const },
  { id: 2, photoId: 4520, partner: "DFW Plumbing Pro", stage: "condition_classification", conditions: 1, leads: 0, confidence: 0, ms: 1350, time: "3m ago", status: "running" as const },
  { id: 3, photoId: 4519, partner: "Metro HVAC Solutions", stage: "completed", conditions: 2, leads: 1, confidence: 0.87, ms: 1890, time: "5m ago", status: "completed" as const },
  { id: 4, photoId: 4518, partner: "DFW Lawn Pros", stage: "completed", conditions: 4, leads: 3, confidence: 0.91, ms: 2340, time: "8m ago", status: "completed" as const },
  { id: 5, photoId: 4517, partner: "Premier Electric", stage: "relevance_filter", conditions: 0, leads: 0, confidence: 0, ms: 460, time: "10m ago", status: "failed" as const },
  { id: 6, photoId: 4516, partner: "Lone Star Painting", stage: "completed", conditions: 1, leads: 1, confidence: 0.78, ms: 1670, time: "12m ago", status: "completed" as const },
  { id: 7, photoId: 4515, partner: "Texas Fence Co", stage: "completed", conditions: 2, leads: 1, confidence: 0.85, ms: 1920, time: "15m ago", status: "completed" as const },
  { id: 8, photoId: 4514, partner: "Clean Gutters DFW", stage: "completed", conditions: 3, leads: 2, confidence: 0.92, ms: 2050, time: "18m ago", status: "completed" as const },
];

// --- Hourly throughput data --------------------------------------------------
const HOURLY_DATA = [
  { hour: "6am", processed: 12, leads: 4 },
  { hour: "7am", processed: 28, leads: 9 },
  { hour: "8am", processed: 45, leads: 18 },
  { hour: "9am", processed: 67, leads: 24 },
  { hour: "10am", processed: 82, leads: 31 },
  { hour: "11am", processed: 78, leads: 28 },
  { hour: "12pm", processed: 56, leads: 19 },
  { hour: "1pm", processed: 71, leads: 26 },
  { hour: "2pm", processed: 89, leads: 34 },
  { hour: "3pm", processed: 94, leads: 38 },
  { hour: "4pm", processed: 76, leads: 27 },
  { hour: "5pm", processed: 43, leads: 15 },
];

function stageIndex(stage: string) {
  const idx = STAGES.findIndex(s => s.id === stage);
  return idx >= 0 ? idx : stage === "completed" ? STAGES.length : -1;
}

export default function AIPipelineMonitor() {
  const [expandedRun, setExpandedRun] = useState<number | null>(null);

  const maxProcessed = Math.max(...HOURLY_DATA.map(d => d.processed));

  return (
    <AdminLayout title="AI Pipeline Monitor" subtitle="Multi-Stage Waterfall Analysis -- Patent Claim 19">
      <div className="p-6 space-y-6" style={{ fontFamily: FONT }}>

        {/* -- Pipeline Overview Stats --------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Photos Today", value: "741", icon: Camera, gradient: BADGE_GRADIENTS.blue, sub: " 12% vs yesterday" },
            { label: "Avg Processing", value: "2.1s", icon: Clock, gradient: BADGE_GRADIENTS.cyan, sub: "Per photo end-to-end" },
            { label: "Conditions Found", value: "1,847", icon: Eye, gradient: BADGE_GRADIENTS.purple, sub: "2.49 per photo avg" },
            { label: "Leads Generated", value: "523", icon: Zap, gradient: BADGE_GRADIENTS.green, sub: "28.3% conversion rate" },
            { label: "Pipeline Health", value: "98.7%", icon: Activity, gradient: BADGE_GRADIENTS.orange, sub: "Uptime last 30 days" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-4 relative" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: T.muted }}>{stat.label}</p>
                  <p className="text-xl font-bold mt-0.5" style={{ color: T.text }}>{stat.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: T.green }}>{stat.sub}</p>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: stat.gradient }}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* -- 5-Stage Waterfall Visualization ------------------------------- */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-sm" style={{ color: T.text }}>5-Stage Waterfall Pipeline</h3>
              <p className="text-xs" style={{ color: T.muted }}>Each photo passes through 5 sequential analysis stages before lead generation</p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ backgroundColor: "#D1FAE5", color: "#059669" }}>
              All Stages Operational
            </span>
          </div>

          {/* Stage cards with connecting arrows */}
          <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-stretch flex-shrink-0">
                <div className="w-48 rounded-xl p-4 flex flex-col" style={{ backgroundColor: T.bg, border: `1px solid ${T.border}` }}>
                  {/* Stage number */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-xs font-bold" style={{ color: T.text }}>{stage.shortName}</span>
                  </div>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${stage.color}15` }}>
                    <stage.icon className="w-5 h-5" style={{ color: stage.color }} />
                  </div>
                  {/* Description */}
                  <p className="text-[10px] leading-relaxed mb-3 flex-1" style={{ color: T.muted }}>{stage.description}</p>
                  {/* Metrics */}
                  <div className="space-y-1.5 pt-2" style={{ borderTop: `1px solid ${T.border}` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: T.muted }}>Avg Time</span>
                      <span className="text-[10px] font-bold" style={{ color: T.text, fontFamily: MONO }}>{stage.avgMs}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px]" style={{ color: T.muted }}>Pass Rate</span>
                      <span className="text-[10px] font-bold" style={{ color: stage.successRate > 95 ? T.green : stage.successRate > 90 ? T.amber : T.red, fontFamily: MONO }}>
                        {stage.successRate}%
                      </span>
                    </div>
                    {/* Mini progress bar */}
                    <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: `${stage.color}20` }}>
                      <div className="h-full rounded-full" style={{ width: `${stage.successRate}%`, backgroundColor: stage.color }} />
                    </div>
                  </div>
                </div>
                {/* Arrow connector */}
                {i < STAGES.length - 1 && (
                  <div className="flex items-center px-1 flex-shrink-0">
                    <ArrowRight className="w-4 h-4" style={{ color: T.dim }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* -- Throughput Chart + Recent Runs -------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Hourly throughput */}
          <div className="lg:col-span-1 rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <h3 className="font-bold text-sm mb-1" style={{ color: T.text }}>Hourly Throughput</h3>
            <p className="text-xs mb-4" style={{ color: T.muted }}>Photos processed vs. leads generated</p>
            <div className="space-y-2">
              {HOURLY_DATA.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] w-8 text-right flex-shrink-0" style={{ color: T.muted, fontFamily: MONO }}>{d.hour}</span>
                  <div className="flex-1 flex items-center gap-1 h-4">
                    <div
                      className="h-3 rounded-sm"
                      style={{ width: `${(d.processed / maxProcessed) * 100}%`, backgroundColor: "#3B82F6", opacity: 0.3 }}
                    />
                  </div>
                  <span className="text-[10px] font-bold w-6 text-right" style={{ color: T.text, fontFamily: MONO }}>{d.processed}</span>
                  <span className="text-[10px] w-4 text-right" style={{ color: T.green, fontFamily: MONO }}>{d.leads}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: `1px solid ${T.border}` }}>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: T.muted }}>
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: "#3B82F6", opacity: 0.3 }} /> Processed
              </span>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: T.muted }}>
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: T.green }} /> Leads
              </span>
            </div>
          </div>

          {/* Recent pipeline runs */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${T.border}` }}>
              <div>
                <h3 className="font-bold text-sm" style={{ color: T.text }}>Recent Pipeline Runs</h3>
                <p className="text-xs" style={{ color: T.muted }}>Live processing status for incoming photos</p>
              </div>
              <Layers className="w-4 h-4" style={{ color: T.muted }} />
            </div>
            <div className="divide-y" style={{ borderColor: T.border }}>
              {DEMO_RUNS.map(run => {
                const currentStageIdx = stageIndex(run.stage);
                const isExpanded = expandedRun === run.id;
                return (
                  <div key={run.id}>
                    <div
                      className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                    >
                      {/* Status indicator */}
                      <div className="flex-shrink-0">
                        {run.status === "completed" ? (
                          <CheckCircle className="w-4 h-4" style={{ color: T.green }} />
                        ) : run.status === "running" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${T.accent} transparent ${T.accent} ${T.accent}` }} />
                        ) : (
                          <XCircle className="w-4 h-4" style={{ color: T.red }} />
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold" style={{ color: T.text, fontFamily: MONO }}>#{run.photoId}</span>
                          <span className="text-xs" style={{ color: T.muted }}>{run.partner}</span>
                        </div>
                      </div>
                      {/* Stage progress dots */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {STAGES.map((stage, i) => (
                          <div
                            key={stage.id}
                            className="w-5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: i < currentStageIdx ? stage.color :
                                i === currentStageIdx && run.status === "running" ? `${stage.color}60` :
                                i === currentStageIdx && run.status === "failed" ? T.red :
                                `${T.border}`,
                            }}
                          />
                        ))}
                      </div>
                      {/* Stats */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-[10px]" style={{ color: T.muted }}>{run.conditions} conditions</span>
                        <span className="text-[10px] font-bold" style={{ color: run.leads > 0 ? T.green : T.muted }}>{run.leads} leads</span>
                        <span className="text-[10px]" style={{ color: T.dim, fontFamily: MONO }}>{run.ms}ms</span>
                      </div>
                      <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} style={{ color: T.dim }} />
                    </div>
                    {/* Expanded detail */}
                    {isExpanded && (
                      <div className="px-5 pb-4 pt-1">
                        <div className="flex items-center gap-2 mb-3">
                          {STAGES.map((stage, i) => {
                            const passed = i < currentStageIdx;
                            const current = i === currentStageIdx;
                            const failed = current && run.status === "failed";
                            return (
                              <div key={stage.id} className="flex items-center gap-2 flex-1">
                                <div
                                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg flex-1"
                                  style={{
                                    backgroundColor: passed ? `${stage.color}15` : failed ? "#FEE2E2" : current ? `${stage.color}08` : T.bg,
                                    border: `1px solid ${passed ? `${stage.color}30` : failed ? "#FECACA" : T.border}`,
                                  }}
                                >
                                  {passed ? (
                                    <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: stage.color }} />
                                  ) : failed ? (
                                    <XCircle className="w-3 h-3 flex-shrink-0" style={{ color: T.red }} />
                                  ) : current && run.status === "running" ? (
                                    <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0" style={{ borderColor: `${stage.color} transparent ${stage.color} ${stage.color}` }} />
                                  ) : (
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: T.border }} />
                                  )}
                                  <span className="text-[10px] font-medium" style={{ color: passed ? stage.color : failed ? T.red : T.muted }}>
                                    {stage.shortName}
                                  </span>
                                </div>
                                {i < STAGES.length - 1 && (
                                  <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: passed ? stage.color : T.dim }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {run.confidence > 0 && (
                          <div className="flex items-center gap-4 text-xs" style={{ color: T.muted }}>
                            <span>Confidence: <strong style={{ color: T.text }}>{(run.confidence * 100).toFixed(1)}%</strong></span>
                            <span>Processing: <strong style={{ color: T.text }}>{run.ms}ms</strong></span>
                            <span>Conditions: <strong style={{ color: T.text }}>{run.conditions}</strong></span>
                            <span>Leads: <strong style={{ color: T.green }}>{run.leads}</strong></span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* -- Stage Performance Breakdown ----------------------------------- */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: T.card, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: T.text }}>Stage Performance Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  <th className="text-left py-2 px-3 font-semibold" style={{ color: T.muted }}>Stage</th>
                  <th className="text-right py-2 px-3 font-semibold" style={{ color: T.muted }}>Processed</th>
                  <th className="text-right py-2 px-3 font-semibold" style={{ color: T.muted }}>Passed</th>
                  <th className="text-right py-2 px-3 font-semibold" style={{ color: T.muted }}>Failed</th>
                  <th className="text-right py-2 px-3 font-semibold" style={{ color: T.muted }}>Pass Rate</th>
                  <th className="text-right py-2 px-3 font-semibold" style={{ color: T.muted }}>Avg Time</th>
                  <th className="text-right py-2 px-3 font-semibold" style={{ color: T.muted }}>P95 Time</th>
                </tr>
              </thead>
              <tbody>
                {STAGES.map((stage, i) => {
                  const processed = 741 - (i * 23);
                  const passed = Math.round(processed * stage.successRate / 100);
                  const failed = processed - passed;
                  return (
                    <tr key={stage.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${stage.color}15` }}>
                            <stage.icon className="w-3 h-3" style={{ color: stage.color }} />
                          </div>
                          <span className="font-medium" style={{ color: T.text }}>{stage.name}</span>
                        </div>
                      </td>
                      <td className="text-right py-2.5 px-3 font-bold" style={{ color: T.text, fontFamily: MONO }}>{processed.toLocaleString()}</td>
                      <td className="text-right py-2.5 px-3" style={{ color: T.green, fontFamily: MONO }}>{passed.toLocaleString()}</td>
                      <td className="text-right py-2.5 px-3" style={{ color: failed > 0 ? T.red : T.dim, fontFamily: MONO }}>{failed}</td>
                      <td className="text-right py-2.5 px-3">
                        <span className="font-bold" style={{ color: stage.successRate > 95 ? T.green : stage.successRate > 90 ? T.amber : T.red, fontFamily: MONO }}>
                          {stage.successRate}%
                        </span>
                      </td>
                      <td className="text-right py-2.5 px-3" style={{ color: T.text, fontFamily: MONO }}>{stage.avgMs}ms</td>
                      <td className="text-right py-2.5 px-3" style={{ color: T.muted, fontFamily: MONO }}>{Math.round(stage.avgMs * 1.8)}ms</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
