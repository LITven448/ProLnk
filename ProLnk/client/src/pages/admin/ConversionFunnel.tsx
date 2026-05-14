import type React from "react";
import { useState } from "react";
import AdminLayout, { T, BADGE_GRADIENTS, FONT } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell,
} from "recharts";
import { Filter, TrendingDown, Users, MousePointer, CheckCircle, Activity, Eye } from "lucide-react";

const FUNNEL_STAGES = [
  { label: "Site Visitors",    value: 12400, icon: Eye,          color: T.accent },
  { label: "Waitlist Signups", value: 847,   icon: MousePointer, color: T.blue },
  { label: "Applications",     value: 412,   icon: Users,        color: T.purple },
  { label: "Onboarded",        value: 198,   icon: CheckCircle,  color: T.green },
  { label: "Active",           value: 147,   icon: Activity,     color: T.amber },
];

const DROPOFF = [
  { from: "Visitors → Signups",      lost: 11553, pct: "93.2%", reason: "Low intent / just browsing" },
  { from: "Signups → Applications",  lost: 435,   pct: "51.4%", reason: "Application friction / form length" },
  { from: "Applications → Onboarded",lost: 214,   pct: "51.9%", reason: "Awaiting approval / slow review" },
  { from: "Onboarded → Active",       lost: 51,    pct: "25.8%", reason: "No first job posted yet" },
];

const TRAFFIC_SOURCES = [
  { name: "Organic",  value: 44, color: T.green },
  { name: "Referral", value: 28, color: T.accent },
  { name: "Direct",   value: 18, color: T.blue },
  { name: "Paid",     value: 10, color: T.amber },
];

const WEEKLY_TREND = [
  { week: "Mar 24", conversions: 48 },
  { week: "Mar 31", conversions: 61 },
  { week: "Apr 7",  conversions: 55 },
  { week: "Apr 14", conversions: 72 },
  { week: "Apr 21", conversions: 84 },
  { week: "Apr 28", conversions: 91 },
  { week: "May 5",  conversions: 103 },
  { week: "May 12", conversions: 118 },
];

const CARD: React.CSSProperties = {
  background: T.surface,
  borderRadius: 16,
  border: `1px solid ${T.border}`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
  fontFamily: FONT,
};

function conversionRate(from: number, to: number) {
  return ((to / from) * 100).toFixed(1) + "%";
}

const MAX_VAL = FUNNEL_STAGES[0].value;

export default function ConversionFunnel() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  return (
    <AdminLayout>
      <div style={{ background: T.bg, minHeight: "100vh", padding: "24px 32px", fontFamily: FONT }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: BADGE_GRADIENTS.cyan, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Filter style={{ color: "#fff", width: 20, height: 20 }} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: 0 }}>Conversion Funnel</h1>
            <p style={{ fontSize: 13, color: T.muted, margin: 0 }}>End-to-end conversion analytics · Last 90 days</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>

          {/* LEFT: Funnel + dropoff */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Funnel visualization */}
            <div style={{ ...CARD, padding: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 24 }}>Partner Acquisition Funnel</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FUNNEL_STAGES.map((stage, i) => {
                  const pct = (stage.value / MAX_VAL) * 100;
                  const convRate = i > 0 ? conversionRate(FUNNEL_STAGES[i - 1].value, stage.value) : null;
                  const Icon = stage.icon;
                  return (
                    <div key={stage.label}>
                      {convRate && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0 6px 20px" }}>
                          <TrendingDown style={{ width: 14, height: 14, color: T.muted }} />
                          <span style={{ fontSize: 12, color: T.muted }}>
                            {convRate} conversion rate
                          </span>
                          <span style={{ fontSize: 11, color: T.dim, marginLeft: "auto", paddingRight: 4 }}>
                            −{(FUNNEL_STAGES[i-1].value - stage.value).toLocaleString()} dropped
                          </span>
                        </div>
                      )}
                      <div
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHoveredStage(i)}
                        onMouseLeave={() => setHoveredStage(null)}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                          <Icon style={{ width: 16, height: 16, color: stage.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: T.text, minWidth: 140 }}>{stage.label}</span>
                          <span style={{ fontSize: 18, fontWeight: 800, color: stage.color, marginLeft: "auto" }}>
                            {stage.value.toLocaleString()}
                          </span>
                        </div>
                        <div style={{ background: T.bg, borderRadius: 8, height: 32, overflow: "hidden" }}>
                          <div style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: stage.color,
                            borderRadius: 8,
                            opacity: hoveredStage === i ? 1 : 0.8,
                            transition: "width 0.6s ease, opacity 0.2s",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 12,
                          }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                              {pct.toFixed(1)}% of visitors
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Drop-off table */}
            <div style={{ ...CARD, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px 12px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.text }}>Drop-off Analysis</div>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: T.bg }}>
                    {["Transition", "Lost", "Drop Rate", "Top Reason"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DROPOFF.map((row, i) => (
                    <tr key={i} style={{ borderTop: `1px solid ${T.border}` }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: T.text }}>{row.from}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: T.red, fontWeight: 700 }}>−{row.lost.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ background: "#FFF0F0", color: T.red, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{row.pct}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Weekly trend */}
            <div style={{ ...CARD, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 20 }}>Weekly Conversions (Last 8 Weeks)</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={WEEKLY_TREND} margin={{ top: 0, right: 4, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: T.muted }} />
                  <YAxis tick={{ fontSize: 11, fill: T.muted }} />
                  <Tooltip
                    contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12 }}
                    cursor={{ fill: T.accentBg }}
                  />
                  <Bar dataKey="conversions" fill={T.blue} radius={[4, 4, 0, 0]} name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: Traffic sources donut + summary stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Summary stat cards */}
            {[
              { label: "Overall Conversion", value: "1.19%", sub: "Visitors → Active", color: T.green },
              { label: "Avg Time to Active", value: "11 days", sub: "From signup to first job", color: T.blue },
              { label: "Waitlist → App Rate", value: "48.6%", sub: "Strong intent signal", color: T.accent },
              { label: "Onboard → Active",    value: "74.2%", sub: "Final activation rate", color: T.amber },
            ].map(s => (
              <div key={s.label} style={{ ...CARD, padding: "20px 24px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: T.dim, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}

            {/* Traffic source donut */}
            <div style={{ ...CARD, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 16 }}>Traffic Sources</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={TRAFFIC_SOURCES}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {TRAFFIC_SOURCES.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => [`${v}%`, ""]}
                    contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {TRAFFIC_SOURCES.map(s => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: T.text, flex: 1 }}>{s.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
