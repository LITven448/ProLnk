import React from 'react';
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  RefreshCw, CheckCircle, AlertTriangle, Zap,
  Cloud, DollarSign, Users, Activity,
  ShieldCheck, TrendingUp, Star, Home, FileDown,
  Clock, CloudLightning, CreditCard, Camera,
  HeartPulse,
} from "lucide-react";

const CATEGORY_SCORES = [
  { label: "Technical",         score: 99, color: "#00E676", sub: "Uptime · Latency · Errors", icon: ShieldCheck },
  { label: "Business",          score: 91, color: "#00D4FF", sub: "MRR · Churn · Conversion", icon: TrendingUp  },
  { label: "Partner Health",    score: 89, color: "#A855F7", sub: "PPS · Retention · Activity", icon: Star       },
  { label: "Homeowner Health",  score: 97, color: "#FFB300", sub: "Satisfaction · Vault Growth", icon: Home      },
];

const OVERALL_SCORE = Math.round(CATEGORY_SCORES.reduce((s, c) => s + c.score, 0) / CATEGORY_SCORES.length);

const MINI_METRICS = [
  { label: "Deploys Today",      value: "2",      sub: "Both successful",    icon: Zap,            color: "#00E676" },
  { label: "API Error Rate",     value: "<0.1%",  sub: "Last 24 hours",      icon: Activity,       color: "#00D4FF" },
  { label: "Leads Generated",    value: "47",     sub: "Today",              icon: TrendingUp,     color: "#A855F7" },
  { label: "Partners Active",    value: "134/147",sub: "91% activity rate",  icon: Users,          color: "#00D4FF" },
  { label: "Revenue Today",      value: "$4,847", sub: "vs $4,210 yesterday",icon: DollarSign,     color: "#00E676" },
  { label: "Support Tickets",    value: "7",      sub: "Open tickets",       icon: AlertTriangle,  color: "#FFB300" },
  { label: "Storm Alerts Sent",  value: "0",      sub: "No active events",   icon: CloudLightning, color: "#8B91A8" },
  { label: "Photo AI Queue",     value: "12",     sub: "Pending analysis",   icon: Camera,         color: "#F97316" },
];

const TIMELINE_EVENTS = [
  { time: "00:14", label: "Payout sweep completed",  color: "#00E676", icon: CreditCard   },
  { time: "06:00", label: "Morning data pipeline",    color: "#00D4FF", icon: Activity     },
  { time: "09:47", label: "Deploy v2.4.1 — success", color: "#00E676", icon: Zap          },
  { time: "11:23", label: "High traffic (143 req/s)", color: "#FFB300", icon: TrendingUp   },
  { time: "14:05", label: "Deploy v2.4.2 — success", color: "#00E676", icon: Zap          },
  { time: "Now",   label: "All systems nominal",      color: "#00E676", icon: HeartPulse   },
];

function HealthRing({ score }: { score: number }) {
  const r = 68;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const color = score >= 90 ? "#00E676" : score >= 70 ? "#FFB300" : "#FF4444";
  const label = score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Needs Attention";

  return (
    <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx="80" cy="80" r={r} fill="none" stroke="#1A1E2A" strokeWidth="18" />
        <circle
          cx="80" cy="80" r={r}
          fill="none" stroke={color} strokeWidth="18"
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, fontWeight: 900, color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, color: "#8B91A8" }}>/ 100</div>
        <div style={{ fontSize: 12, fontWeight: 700, color, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function CategoryBar({ label, score, color, sub, icon: Icon }: typeof CATEGORY_SCORES[0] & { icon: React.ComponentType<{size:number;color:string}> }) {
  return (
    <div style={{ flex: 1, minWidth: 120 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <Icon size={14} color={color} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#8B91A8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, color, lineHeight: 1, marginBottom: 3 }}>{score}</div>
      <div style={{ height: 4, borderRadius: 2, background: "#1A1E2A", overflow: "hidden", marginBottom: 4 }}>
        <div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 2, transition: "width 0.6s ease" }} />
      </div>
      <div style={{ fontSize: 10, color: "#555B72" }}>{sub}</div>
    </div>
  );
}

export default function PlatformHealthSummary() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  };

  const handleExport = () => {
    const csv = [
      "Category,Score,Status",
      ...CATEGORY_SCORES.map(c => `${c.label},${c.score},${c.score >= 90 ? "Excellent" : "Good"}`),
      `Overall,${OVERALL_SCORE},Excellent`,
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "platform-health-summary.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout>
      <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "32px 24px", fontFamily: "'Inter',system-ui,sans-serif" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#00E67622,#00E67644)", border: "1px solid #00E67640", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <HeartPulse size={22} color="#00E676" />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#F0F2FF", margin: 0 }}>Platform Health Summary</h1>
              <p style={{ fontSize: 12, color: "#8B91A8", margin: 0 }}>Last updated: just now</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleRefresh}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#13161E", border: "1px solid #252A3A", color: "#8B91A8", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              <RefreshCw size={14} style={{ animation: refreshing ? "spin 0.6s linear" : "none" }} />
              Refresh
            </button>
            <button
              onClick={handleExport}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#00E676", color: "#F8FAFC", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}
            >
              <FileDown size={14} />
              Generate Report
            </button>
          </div>
        </div>

        {/* Overall Health Score */}
        <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 24, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
            <HealthRing score={OVERALL_SCORE} />
            <div style={{ display: "flex", gap: 28, flex: 1, flexWrap: "wrap" }}>
              {CATEGORY_SCORES.map((c) => (
                <CategoryBar key={c.label} {...c} />
              ))}
            </div>
          </div>
        </div>

        {/* Critical Alerts — All Clear */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, background: "#00E67612", border: "1px solid #00E67630", marginBottom: 16 }}>
          <CheckCircle size={18} color="#00E676" />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#00E676" }}>All systems nominal — no critical alerts</span>
        </div>

        {/* Mini Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          {MINI_METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} style={{ background: "#13161E", borderRadius: 12, border: "1px solid #252A3A", padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Icon size={14} color={m.color} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#8B91A8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{m.label}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: 10, color: "#555B72", marginTop: 3 }}>{m.sub}</div>
              </div>
            );
          })}
        </div>

        {/* 24-Hour Timeline */}
        <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Clock size={14} color="#8B91A8" />
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8", textTransform: "uppercase", margin: 0 }}>24-Hour Timeline</p>
          </div>

          {/* Horizontal bar */}
          <div style={{ position: "relative", height: 6, background: "#1A1E2A", borderRadius: 3, marginBottom: 24, overflow: "visible" }}>
            <div style={{ height: "100%", width: `${(new Date().getHours() / 24) * 100}%`, background: "linear-gradient(90deg,#00D4FF,#00E676)", borderRadius: 3 }} />
            {TIMELINE_EVENTS.map((e, i) => {
              const pct = e.time === "Now" ? (new Date().getHours() / 24) * 100 : (() => {
                const [h, m] = e.time.split(":").map(Number);
                return ((h * 60 + m) / (24 * 60)) * 100;
              })();
              return (
                <div key={i} style={{ position: "absolute", left: `${pct}%`, top: "-3px", transform: "translateX(-50%)" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: e.color, border: "2px solid #13161E", boxShadow: `0 0 6px ${e.color}88` }} />
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TIMELINE_EVENTS.map((e) => {
              const Icon = e.icon;
              return (
                <div key={e.time} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: "#555B72", width: 38, flexShrink: 0, textAlign: "right" }}>{e.time}</span>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${e.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={12} color={e.color} />
                  </div>
                  <span style={{ fontSize: 13, color: "#F0F2FF" }}>{e.label}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </AdminLayout>
  );
}
