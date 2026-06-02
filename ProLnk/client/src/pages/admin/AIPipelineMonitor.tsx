import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Activity, AlertTriangle, ArrowRight, BarChart2, Bell,
  CheckCircle, ChevronDown, Clock, Cpu, DollarSign,
  Eye, Filter, Inbox, Layers, RotateCcw, Send, Zap,
} from "lucide-react";

// ─── Pipeline Stages (Inbound → Scoring → Matching → Notification → Delivery) ─

interface PipelineStage {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  color: string;
  queueDepth: number;
  processed: number;
  avgLatencyMs: number;
  errorRate: number;
  bottleneck: boolean;
}

const STAGES: PipelineStage[] = [
  {
    id: "inbound",
    name: "Inbound",
    shortName: "Inbound",
    icon: Inbox,
    color: "#00D4FF",
    queueDepth: 12,
    processed: 1247,
    avgLatencyMs: 88,
    errorRate: 0.4,
    bottleneck: false,
  },
  {
    id: "scoring",
    name: "AI Scoring",
    shortName: "Scoring",
    icon: Cpu,
    color: "#0D9488",
    queueDepth: 84,
    processed: 1189,
    avgLatencyMs: 620,
    errorRate: 2.1,
    bottleneck: true,
  },
  {
    id: "matching",
    name: "Matching",
    shortName: "Matching",
    icon: Zap,
    color: "#EC407A",
    queueDepth: 31,
    processed: 1031,
    avgLatencyMs: 340,
    errorRate: 1.3,
    bottleneck: false,
  },
  {
    id: "notification",
    name: "Notification",
    shortName: "Notify",
    icon: Bell,
    color: "#FBB140",
    queueDepth: 8,
    processed: 998,
    avgLatencyMs: 210,
    errorRate: 0.8,
    bottleneck: false,
  },
  {
    id: "delivery",
    name: "Delivery",
    shortName: "Delivery",
    icon: Send,
    color: "#16A34A",
    queueDepth: 3,
    processed: 990,
    avgLatencyMs: 145,
    errorRate: 0.2,
    bottleneck: false,
  },
];

// ─── 24h throughput (hourly, last 24 hours) ────────────────────────────────────

const HOURLY_DATA = [
  { hour: "0am", vol: 18,  err: 1 },
  { hour: "1am", vol: 11,  err: 0 },
  { hour: "2am", vol: 8,   err: 0 },
  { hour: "3am", vol: 6,   err: 0 },
  { hour: "4am", vol: 9,   err: 1 },
  { hour: "5am", vol: 14,  err: 0 },
  { hour: "6am", vol: 28,  err: 1 },
  { hour: "7am", vol: 54,  err: 2 },
  { hour: "8am", vol: 82,  err: 3 },
  { hour: "9am", vol: 97,  err: 2 },
  { hour: "10am",vol: 112, err: 4 },
  { hour: "11am",vol: 104, err: 3 },
  { hour: "12pm",vol: 88,  err: 2 },
  { hour: "1pm", vol: 94,  err: 2 },
  { hour: "2pm", vol: 118, err: 5 },
  { hour: "3pm", vol: 127, err: 6 },
  { hour: "4pm", vol: 109, err: 3 },
  { hour: "5pm", vol: 76,  err: 2 },
  { hour: "6pm", vol: 58,  err: 1 },
  { hour: "7pm", vol: 44,  err: 1 },
  { hour: "8pm", vol: 36,  err: 1 },
  { hour: "9pm", vol: 29,  err: 0 },
  { hour: "10pm",vol: 22,  err: 1 },
  { hour: "11pm",vol: 19,  err: 0 },
];

// ─── Error breakdown ──────────────────────────────────────────────────────────

interface PipelineError {
  type: string;
  stage: string;
  count: number;
  lastOccurred: string;
  autoRetry: boolean;
  severity: "high" | "med" | "low";
}

const ERROR_TYPES: PipelineError[] = [
  { type: "SCORING_TIMEOUT",     stage: "AI Scoring",   count: 14, lastOccurred: "6m ago",    autoRetry: true,  severity: "high" },
  { type: "NO_MATCHING_PRO",     stage: "Matching",     count: 9,  lastOccurred: "18m ago",   autoRetry: false, severity: "med"  },
  { type: "SMS_DELIVERY_FAIL",   stage: "Notification", count: 6,  lastOccurred: "42m ago",   autoRetry: true,  severity: "med"  },
  { type: "DUPLICATE_LEAD",      stage: "Inbound",      count: 5,  lastOccurred: "1h ago",    autoRetry: false, severity: "low"  },
  { type: "INVALID_ADDRESS",     stage: "Inbound",      count: 4,  lastOccurred: "1.5h ago",  autoRetry: false, severity: "low"  },
  { type: "SCORE_API_429",       stage: "AI Scoring",   count: 3,  lastOccurred: "2h ago",    autoRetry: true,  severity: "high" },
  { type: "DELIVERY_WEBHOOK_500",stage: "Delivery",     count: 2,  lastOccurred: "3h ago",    autoRetry: true,  severity: "med"  },
  { type: "MATCH_RADIUS_EMPTY",  stage: "Matching",     count: 2,  lastOccurred: "4h ago",    autoRetry: false, severity: "low"  },
];

// ─── Recent runs ──────────────────────────────────────────────────────────────

const RECENT_RUNS = [
  { id: 5421, source: "Homeowner Waitlist", trade: "Roofing",    stage: "delivery",     status: "completed" as const, matched: "Apex Roofing DFW",    score: 0.94, ms: 1840, time: "2m ago" },
  { id: 5420, source: "Storm Lead",         trade: "HVAC",       stage: "matching",     status: "running"   as const, matched: null,                  score: 0,    ms: 920,  time: "3m ago" },
  { id: 5419, source: "Photo Scan",         trade: "Plumbing",   stage: "delivery",     status: "completed" as const, matched: "DFW Plumbing Pro",     score: 0.87, ms: 2100, time: "5m ago" },
  { id: 5418, source: "Homeowner Waitlist", trade: "Electrical", stage: "scoring",      status: "failed"    as const, matched: null,                  score: 0,    ms: 340,  time: "8m ago" },
  { id: 5417, source: "Photo Scan",         trade: "Painting",   stage: "delivery",     status: "completed" as const, matched: "Lone Star Painting",   score: 0.81, ms: 1560, time: "11m ago"},
  { id: 5416, source: "Storm Lead",         trade: "Roofing",    stage: "notification", status: "completed" as const, matched: "StormReady Roofing",   score: 0.92, ms: 1210, time: "14m ago"},
  { id: 5415, source: "Homeowner Waitlist", trade: "Lawn",       stage: "delivery",     status: "completed" as const, matched: "DFW Lawn Pros",        score: 0.78, ms: 1880, time: "17m ago"},
  { id: 5414, source: "Photo Scan",         trade: "Gutters",    stage: "delivery",     status: "completed" as const, matched: "Clean Gutters DFW",    score: 0.91, ms: 1640, time: "20m ago"},
];

const STAGE_ORDER = ["inbound","scoring","matching","notification","delivery"];

function stageIdx(stage: string) {
  const idx = STAGE_ORDER.indexOf(stage);
  return idx >= 0 ? idx : STAGE_ORDER.length;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function QueuePill({ depth }: { depth: number }) {
  const color = depth >= 80 ? "#EA0606" : depth >= 40 ? "#FBB140" : "#16A34A";
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: `${color}18`, border: `1px solid ${color}40`, color }}
    >
      {depth} queued
    </span>
  );
}

function SeverityBadge({ sev }: { sev: PipelineError["severity"] }) {
  const map = {
    high: { bg: "#EA060618", border: "#EA060640", color: "#EA0606", label: "HIGH" },
    med:  { bg: "#FBB14018", border: "#FBB14040", color: "#FBB140", label: "MED" },
    low:  { bg: "#16A34A18", border: "#16A34A40", color: "#16A34A", label: "LOW" },
  };
  const s = map[sev];
  return (
    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      {s.label}
    </span>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function AIPipelineMonitor() {
  const [expandedRun, setExpandedRun] = useState<number | null>(null);
  const [expandedErr, setExpandedErr] = useState<string | null>(null);

  const maxVol = Math.max(...HOURLY_DATA.map(d => d.vol));
  const totalToday = HOURLY_DATA.reduce((s, d) => s + d.vol, 0);
  const totalErrors = HOURLY_DATA.reduce((s, d) => s + d.err, 0);
  const bottlenecks = STAGES.filter(s => s.bottleneck);
  const totalDelivered = STAGES[STAGES.length - 1].processed;
  const conversionPct = Math.round((totalDelivered / STAGES[0].processed) * 100);

  return (
    <AdminLayout title="AI Pipeline Monitor" subtitle="Inbound → Scoring → Matching → Notification → Delivery">
      <div className="p-6 space-y-6">

        {/* ── Bottleneck Alerts ───────────────────────────────────────────────── */}
        {bottlenecks.map(stage => (
          <div
            key={stage.id}
            className="flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{ background: "#FBB14010", border: "1px solid #FBB14050" }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#FBB140" }} />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Bottleneck Detected — {stage.name} Stage</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Queue depth is <strong style={{ color: "#FBB140" }}>{stage.queueDepth} items</strong> — above threshold of 50. Avg latency elevated to <strong style={{ color: "#FBB140" }}>{stage.avgLatencyMs}ms</strong>. Consider scaling the scoring tier or checking the AI rate limit.
              </p>
            </div>
            <QueuePill depth={stage.queueDepth} />
          </div>
        ))}

        {/* ── KPI Strip ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Leads Today",      value: totalToday,           sub: "+12% vs yesterday", icon: Inbox,     color: "#00D4FF" },
            { label: "Delivered",         value: totalDelivered,       sub: `${conversionPct}% conversion`, icon: Send,      color: "#16A34A" },
            { label: "Errors (24h)",      value: totalErrors,          sub: `${((totalErrors/totalToday)*100).toFixed(1)}% error rate`, icon: AlertTriangle, color: "#EA0606" },
            { label: "Avg Latency",       value: "1.4s",               sub: "End-to-end",        icon: Clock,     color: "#0D9488" },
            { label: "Pipeline Health",   value: "97.8%",              sub: "Uptime last 30d",   icon: Activity,  color: "#FBB140" },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold mt-0.5 text-gray-900">{stat.value}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: stat.color }}>{stat.sub}</p>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Pipeline Stage Visualization ─────────────────────────────────────── */}
        <div className="rounded-2xl p-5" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-sm text-gray-900">5-Stage Pipeline</h2>
              <p className="text-xs text-muted-foreground">Live queue depths and per-stage metrics</p>
            </div>
            <span
              className="text-xs px-3 py-1.5 rounded-full font-medium"
              style={{ background: bottlenecks.length ? "#FBB14020" : "#16A34A20", color: bottlenecks.length ? "#FBB140" : "#16A34A", border: `1px solid ${bottlenecks.length ? "#FBB14050" : "#16A34A50"}` }}
            >
              {bottlenecks.length ? `${bottlenecks.length} Bottleneck` : "All Stages Clear"}
            </span>
          </div>

          <div className="flex items-stretch gap-0 overflow-x-auto pb-2">
            {STAGES.map((stage, i) => {
              const StageIcon = stage.icon;
              return (
                <div key={stage.id} className="flex items-stretch flex-shrink-0">
                  <div
                    className="w-52 rounded-xl p-4 flex flex-col"
                    style={{
                      background: stage.bottleneck ? "#FBB14008" : "#F8FAFC",
                      border: `1px solid ${stage.bottleneck ? "#FBB14050" : "#ffffff12"}`,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-900" style={{ backgroundColor: stage.color }}>
                          {i + 1}
                        </div>
                        <span className="text-xs font-bold text-gray-900">{stage.shortName}</span>
                      </div>
                      {stage.bottleneck && <AlertTriangle className="w-3.5 h-3.5" style={{ color: "#FBB140" }} />}
                    </div>
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${stage.color}18` }}>
                      <StageIcon className="w-5 h-5" style={{ color: stage.color }} />
                    </div>
                    {/* Queue depth */}
                    <QueuePill depth={stage.queueDepth} />
                    {/* Metrics */}
                    <div className="space-y-2 mt-3 pt-3" style={{ borderTop: "1px solid #ffffff10" }}>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Processed</span>
                        <span className="font-bold text-gray-900 font-mono">{stage.processed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Avg Latency</span>
                        <span className="font-bold font-mono" style={{ color: stage.avgLatencyMs > 500 ? "#FBB140" : "#16A34A" }}>
                          {stage.avgLatencyMs}ms
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Error Rate</span>
                        <span className="font-bold font-mono" style={{ color: stage.errorRate > 2 ? "#EA0606" : stage.errorRate > 1 ? "#FBB140" : "#16A34A" }}>
                          {stage.errorRate}%
                        </span>
                      </div>
                      {/* Error rate bar */}
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: "#ffffff10" }}>
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(stage.errorRate * 20, 100)}%`,
                            backgroundColor: stage.errorRate > 2 ? "#EA0606" : stage.errorRate > 1 ? "#FBB140" : "#16A34A",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="flex items-center px-1.5 flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 24h Throughput Chart (pure CSS bars) + Recent Runs ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Chart */}
          <div className="lg:col-span-2 rounded-2xl p-5" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-sm text-gray-900">24h Throughput</h2>
                <p className="text-xs text-muted-foreground">Leads processed vs. errors per hour</p>
              </div>
              <BarChart2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              {HOURLY_DATA.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[9px] w-7 text-right flex-shrink-0 font-mono text-muted-foreground">{d.hour}</span>
                  {/* Volume bar */}
                  <div className="flex-1 h-3 relative">
                    <div
                      className="absolute inset-y-0 left-0 rounded-sm"
                      style={{ width: `${(d.vol / maxVol) * 100}%`, background: "linear-gradient(90deg, #00D4FF40, #0D948840)" }}
                    />
                    {/* Error overlay */}
                    {d.err > 0 && (
                      <div
                        className="absolute inset-y-0 left-0 rounded-sm"
                        style={{ width: `${(d.err / maxVol) * 100}%`, backgroundColor: "#EA060670" }}
                      />
                    )}
                  </div>
                  <span className="text-[9px] w-7 text-right font-bold font-mono text-gray-900">{d.vol}</span>
                  <span className="text-[9px] w-4 text-right font-mono" style={{ color: d.err ? "#EA0606" : "#5a7a94" }}>{d.err || ""}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: "1px solid #ffffff10" }}>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="w-2 h-2 rounded-sm" style={{ background: "#00D4FF40" }} /> Volume
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span className="w-2 h-2 rounded-sm bg-red-500/70" /> Errors
              </span>
            </div>
          </div>

          {/* Recent runs */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #ffffff10" }}>
              <div>
                <h2 className="font-bold text-sm text-gray-900">Recent Pipeline Runs</h2>
                <p className="text-xs text-muted-foreground">Live lead processing status</p>
              </div>
              <Layers className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="divide-y" style={{ borderColor: "#ffffff08" }}>
              {RECENT_RUNS.map(run => {
                const currentIdx = stageIdx(run.stage);
                const isExpanded = expandedRun === run.id;
                return (
                  <div key={run.id}>
                    <div
                      className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                    >
                      {/* Status */}
                      <div className="flex-shrink-0">
                        {run.status === "completed"
                          ? <CheckCircle className="w-4 h-4" style={{ color: "#16A34A" }} />
                          : run.status === "running"
                          ? <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#00D4FF transparent #00D4FF #00D4FF" }} />
                          : <AlertTriangle className="w-4 h-4 text-red-500" />}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-bold font-mono text-gray-900">#{run.id}</span>
                          <span className="text-xs text-muted-foreground">{run.source}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: "#0D948820", color: "#0D9488" }}>{run.trade}</span>
                        </div>
                        {run.matched && (
                          <p className="text-[10px] mt-0.5" style={{ color: "#5a7a94" }}>→ {run.matched}</p>
                        )}
                      </div>
                      {/* Stage progress */}
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        {STAGES.map((stage, i) => (
                          <div
                            key={stage.id}
                            className="h-1.5 w-5 rounded-full"
                            style={{
                              backgroundColor: i < currentIdx ? stage.color
                                : i === currentIdx && run.status === "running" ? `${stage.color}60`
                                : i === currentIdx && run.status === "failed" ? "#EA0606"
                                : "#ffffff12",
                            }}
                          />
                        ))}
                      </div>
                      {/* Score + time */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {run.score > 0 && (
                          <span className="text-[10px] font-bold font-mono" style={{ color: run.score > 0.85 ? "#16A34A" : "#FBB140" }}>
                            {(run.score * 100).toFixed(0)}%
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-muted-foreground">{run.ms}ms</span>
                        <span className="text-[10px] text-muted-foreground">{run.time}</span>
                      </div>
                      <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </div>
                    {isExpanded && (
                      <div className="px-5 pb-4 pt-1">
                        <div className="flex items-center gap-1.5 flex-wrap mb-2">
                          {STAGES.map((stage, i) => {
                            const StageIcon = stage.icon;
                            const passed  = i < currentIdx;
                            const current = i === currentIdx;
                            const failed  = current && run.status === "failed";
                            return (
                              <div key={stage.id} className="flex items-center gap-1">
                                <div
                                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
                                  style={{
                                    background: passed ? `${stage.color}18` : failed ? "#EA060610" : current ? `${stage.color}08` : "#F8FAFC",
                                    border: `1px solid ${passed ? `${stage.color}40` : failed ? "#EA060640" : "#ffffff10"}`,
                                  }}
                                >
                                  {passed ? (
                                    <CheckCircle className="w-3 h-3" style={{ color: stage.color }} />
                                  ) : failed ? (
                                    <AlertTriangle className="w-3 h-3 text-red-500" />
                                  ) : current && run.status === "running" ? (
                                    <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: `${stage.color} transparent ${stage.color} ${stage.color}` }} />
                                  ) : (
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ffffff15" }} />
                                  )}
                                  <span className="text-[10px] font-medium" style={{ color: passed ? stage.color : failed ? "#EA0606" : "#5a7a94" }}>
                                    {stage.shortName}
                                  </span>
                                </div>
                                {i < STAGES.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground/40" />}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Source: <strong className="text-gray-900">{run.source}</strong></span>
                          <span>Trade: <strong className="text-gray-900">{run.trade}</strong></span>
                          {run.score > 0 && <span>Score: <strong style={{ color: "#16A34A" }}>{(run.score * 100).toFixed(1)}%</strong></span>}
                          <span>Time: <strong className="text-gray-900 font-mono">{run.ms}ms</strong></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Error Breakdown Table ─────────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid #ffffff10" }}>
            <Filter className="w-4 h-4" style={{ color: "#EA0606" }} />
            <h2 className="font-bold text-sm text-gray-900">Error Breakdown</h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: "#EA060618", color: "#EA0606" }}>
              {ERROR_TYPES.reduce((s, e) => s + e.count, 0)} total
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff08" }}>
                  {["Error Type","Stage","Count","Last Occurred","Auto-Retry","Severity"].map(h => (
                    <th key={h} className="text-left py-2.5 px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ERROR_TYPES.map((err, i) => (
                  <tr
                    key={i}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    style={{ borderBottom: "1px solid #ffffff06" }}
                    onClick={() => setExpandedErr(expandedErr === err.type ? null : err.type)}
                  >
                    <td className="py-2.5 px-4">
                      <code className="font-mono text-[11px]" style={{ color: "#EA0606" }}>{err.type}</code>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="font-medium text-muted-foreground">{err.stage}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      <span className="font-bold font-mono text-gray-900">{err.count}</span>
                    </td>
                    <td className="py-2.5 px-4 text-muted-foreground">{err.lastOccurred}</td>
                    <td className="py-2.5 px-4">
                      {err.autoRetry
                        ? <span className="flex items-center gap-1 text-[10px]" style={{ color: "#16A34A" }}><RotateCcw className="w-3 h-3" /> Yes</span>
                        : <span className="text-[10px] text-muted-foreground">No</span>}
                    </td>
                    <td className="py-2.5 px-4">
                      <SeverityBadge sev={err.severity} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Stage Performance Table ──────────────────────────────────────────── */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#0D1F38", border: "1px solid #ffffff12" }}>
          <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid #ffffff10" }}>
            <Eye className="w-4 h-4" style={{ color: "#00D4FF" }} />
            <h2 className="font-bold text-sm text-gray-900">Stage Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #ffffff08" }}>
                  {["Stage","Processed","Queue Depth","Avg Latency","P95 Latency","Error Rate","Status"].map(h => (
                    <th key={h} className="text-left py-2.5 px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STAGES.map((stage) => {
                  const StageIcon = stage.icon;
                  return (
                    <tr key={stage.id} style={{ borderBottom: "1px solid #ffffff06" }} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: `${stage.color}18` }}>
                            <StageIcon className="w-3 h-3" style={{ color: stage.color }} />
                          </div>
                          <span className="font-semibold" style={{ color: stage.color }}>{stage.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-bold font-mono text-gray-900">{stage.processed.toLocaleString()}</td>
                      <td className="py-2.5 px-4">
                        <QueuePill depth={stage.queueDepth} />
                      </td>
                      <td className="py-2.5 px-4 font-mono" style={{ color: stage.avgLatencyMs > 500 ? "#FBB140" : "#16A34A" }}>
                        {stage.avgLatencyMs}ms
                      </td>
                      <td className="py-2.5 px-4 font-mono text-muted-foreground">{Math.round(stage.avgLatencyMs * 1.9)}ms</td>
                      <td className="py-2.5 px-4 font-bold font-mono" style={{ color: stage.errorRate > 2 ? "#EA0606" : stage.errorRate > 1 ? "#FBB140" : "#16A34A" }}>
                        {stage.errorRate}%
                      </td>
                      <td className="py-2.5 px-4">
                        {stage.bottleneck
                          ? <span className="flex items-center gap-1 text-[10px]" style={{ color: "#FBB140" }}><AlertTriangle className="w-3 h-3" /> Bottleneck</span>
                          : <span className="flex items-center gap-1 text-[10px]" style={{ color: "#16A34A" }}><CheckCircle className="w-3 h-3" /> Healthy</span>}
                      </td>
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
