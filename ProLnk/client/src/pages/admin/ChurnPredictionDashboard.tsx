import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { D, MetricCard, SectionHeader, DataTable } from "@/components/DashboardShared";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  AlertTriangle, TrendingDown, DollarSign, Users, CheckCircle, Mail, Phone,
} from "lucide-react";

const RISK_DISTRIBUTION = [
  { band: "0–20%", count: 48, color: "#00E676" },
  { band: "21–40%", count: 34, color: "#84CC16" },
  { band: "41–60%", count: 22, color: "#FFB300" },
  { band: "61–80%", count: 18, color: "#F97316" },
  { band: "81–100%", count: 12, color: "#FF4444" },
];

interface HighRiskPartner {
  name: string;
  score: number;
  signals: string[];
  predictedDate: string;
  suggestion: string;
  revenue: number;
}

const HIGH_RISK: HighRiskPartner[] = [
  {
    name: "Marcus Webb",
    score: 94,
    signals: ["No login 21 days", "0 jobs this month", "Support ticket open"],
    predictedDate: "May 28, 2026",
    suggestion: "Send personal outreach from account manager",
    revenue: 2880,
  },
  {
    name: "Sandra Kowalski",
    score: 87,
    signals: ["Login once in 30 days", "1 job this month (avg: 6)", "Responded to 2/8 leads"],
    predictedDate: "Jun 3, 2026",
    suggestion: "Offer free month with performance coaching call",
    revenue: 1788,
  },
  {
    name: "Derek Fontaine",
    score: 78,
    signals: ["No jobs last 2 weeks", "Opened cancel page twice", "Support ticket: billing"],
    predictedDate: "Jun 10, 2026",
    suggestion: "Escalate billing issue and offer rate review",
    revenue: 2388,
  },
  {
    name: "Tia Nguyen",
    score: 72,
    signals: ["Response rate dropped to 12%", "Declined 5 leads in row", "No profile update in 60 days"],
    predictedDate: "Jun 14, 2026",
    suggestion: "Automated win-back email sequence + demo refresh",
    revenue: 1788,
  },
  {
    name: "Carl Simmons",
    score: 61,
    signals: ["Jobs down 60% MoM", "Last login 14 days ago", "No reviews in 45 days"],
    predictedDate: "Jun 21, 2026",
    suggestion: "Check-in call + share lead quality report",
    revenue: 1788,
  },
];

const SIGNAL_WEIGHTS = [
  { signal: "Login frequency", weight: "30%", why: "Disengaged users churn 4× faster" },
  { signal: "Job activity", weight: "25%", why: "Core value delivery metric" },
  { signal: "Lead response rate", weight: "20%", why: "Low response = low ROI perception" },
  { signal: "Open support tickets", weight: "15%", why: "Unresolved issues predict exit intent" },
  { signal: "Subscription age", weight: "10%", why: "Month 2–3 is highest churn window" },
];

const SAVES = [
  {
    name: "Marcus R.",
    action: "Personal call from account manager + free month",
    result: "Renewed for 6 months",
    revenue: "$1,194 retained",
    date: "May 2, 2026",
  },
  {
    name: "Priya N.",
    action: "Billing dispute resolved + 20% discount applied",
    result: "Upgraded to annual plan",
    revenue: "$1,788 retained",
    date: "Apr 18, 2026",
  },
  {
    name: "James O.",
    action: "Lead quality coaching call + profile rewrite",
    result: "Response rate improved to 68%",
    revenue: "$2,388 retained",
    date: "Apr 9, 2026",
  },
];

const signalRows = SIGNAL_WEIGHTS.map(s => ({
  signal: s.signal,
  weight: s.weight,
  why: s.why,
}));

const signalCols = [
  { key: "signal", label: "Churn Signal", align: "left" as const },
  { key: "weight", label: "Weight", align: "center" as const },
  { key: "why", label: "Why It Matters", align: "left" as const },
];

export default function ChurnPredictionDashboard() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalHighRisk = HIGH_RISK.length;
  const totalRevAtRisk = HIGH_RISK.reduce((s, p) => s + p.revenue, 0);

  return (
    <AdminLayout title="Churn Prediction" subtitle="Know who's leaving before they go">
      <div style={{ background: D.bg, minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 20px 60px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Page header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "linear-gradient(135deg, #FF444422, #FF444444)",
                border: "1px solid #FF444430",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <TrendingDown size={22} color="#FF4444" />
              </div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: D.text, margin: 0 }}>Churn Prediction</h1>
                <p style={{ fontSize: 13, color: D.muted, margin: 0 }}>Know who's leaving before they go</p>
              </div>
            </div>
          </div>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
            <MetricCard
              label="High Churn Risk"
              value="12"
              sub="Partners — action needed"
              color="#FF4444"
              icon={<AlertTriangle size={16} />}
            />
            <MetricCard
              label="Medium Risk"
              value="28"
              sub="Partners — monitor closely"
              color="#FFB300"
              icon={<Users size={16} />}
            />
            <MetricCard
              label="Saved This Month"
              value="4"
              sub="Interventions that worked"
              color="#00E676"
              icon={<CheckCircle size={16} />}
            />
            <MetricCard
              label="Revenue at Risk"
              value="$18,400"
              sub="Annual — if all high-risk churn"
              color="#A855F7"
              icon={<DollarSign size={16} />}
            />
          </div>

          {/* Risk distribution chart */}
          <div style={{
            background: D.card, border: `1px solid ${D.border}`,
            borderRadius: 16, padding: "20px 24px", marginBottom: 28,
          }}>
            <SectionHeader title="Risk Distribution" subtitle="Partners by churn probability band" />
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={RISK_DISTRIBUTION} barSize={40}>
                <XAxis
                  dataKey="band"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: D.muted, fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: D.muted, fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8, color: D.text }}
                  labelStyle={{ color: D.text }}
                  cursor={{ fill: D.surface }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {RISK_DISTRIBUTION.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
              {RISK_DISTRIBUTION.map(b => (
                <div key={b.band} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: b.color }} />
                  <span style={{ fontSize: 11, color: D.muted }}>{b.band}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High risk partners */}
          <div style={{ marginBottom: 28 }}>
            <SectionHeader
              title="High Risk Partners"
              subtitle={`${totalHighRisk} partners with 60%+ churn probability — intervene now`}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {HIGH_RISK.map(partner => {
                const open = expanded === partner.name;
                const scoreColor = partner.score >= 80 ? "#FF4444" : partner.score >= 60 ? "#F97316" : "#FFB300";
                return (
                  <div
                    key={partner.name}
                    style={{
                      background: D.card, border: `1px solid ${open ? scoreColor + "60" : D.border}`,
                      borderRadius: 14, overflow: "hidden", transition: "border-color 0.2s",
                    }}
                  >
                    <button
                      onClick={() => setExpanded(open ? null : partner.name)}
                      style={{
                        width: "100%", background: "none", border: "none", cursor: "pointer",
                        padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 10,
                          background: `${scoreColor}18`,
                          border: `1px solid ${scoreColor}30`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexDirection: "column",
                        }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>{partner.score}%</span>
                          <span style={{ fontSize: 9, color: D.muted, textTransform: "uppercase", letterSpacing: 0.5 }}>risk</span>
                        </div>
                        <div>
                          <p style={{ fontSize: 15, fontWeight: 700, color: D.text, margin: 0 }}>{partner.name}</p>
                          <p style={{ fontSize: 12, color: D.muted, margin: 0 }}>
                            Predicted churn: <span style={{ color: scoreColor }}>{partner.predictedDate}</span>
                            {" · "}${partner.revenue.toLocaleString()}/yr at risk
                          </p>
                        </div>
                      </div>
                      <span style={{ fontSize: 18, color: D.muted, lineHeight: 1 }}>{open ? "−" : "+"}</span>
                    </button>
                    {open && (
                      <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${D.border}` }}>
                        <div style={{ marginTop: 14, marginBottom: 14 }}>
                          <p style={{ fontSize: 11, fontWeight: 700, color: D.muted, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>
                            Churn Signals
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}>
                            {partner.signals.map((sig, i) => (
                              <span key={i} style={{
                                fontSize: 12, color: "#FF4444", background: "#FF444415",
                                border: "1px solid #FF444430", borderRadius: 20, padding: "3px 10px",
                              }}>
                                {sig}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{
                          background: "#00E67610", border: "1px solid #00E67630",
                          borderRadius: 10, padding: "12px 16px",
                          display: "flex", alignItems: "flex-start", gap: 10,
                        }}>
                          <CheckCircle size={16} color="#00E676" style={{ marginTop: 1 }} />
                          <div>
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#00E676", textTransform: "uppercase", letterSpacing: 0.6, margin: 0 }}>
                              Recommended Intervention
                            </p>
                            <p style={{ fontSize: 13, color: D.text, margin: "4px 0 0" }}>{partner.suggestion}</p>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                          <button style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#3B82F620", border: "1px solid #3B82F640",
                            color: "#3B82F6", fontSize: 13, fontWeight: 600, cursor: "pointer",
                          }}>
                            <Mail size={14} /> Send Email
                          </button>
                          <button style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8,
                            background: "#00E67615", border: "1px solid #00E67630",
                            color: "#00E676", fontSize: 13, fontWeight: 600, cursor: "pointer",
                          }}>
                            <Phone size={14} /> Log Call
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Signal weights table */}
          <div style={{ marginBottom: 28 }}>
            <SectionHeader title="Churn Signal Weights" subtitle="What the ML model uses to score churn probability" />
            <DataTable columns={signalCols} rows={signalRows} accentCol="weight" />
          </div>

          {/* Intervention history */}
          <div style={{ marginBottom: 28 }}>
            <SectionHeader title="Intervention History" subtitle="Recent successful saves" />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SAVES.map((s, i) => (
                <div key={i} style={{
                  background: D.card, border: `1px solid ${D.border}`,
                  borderRadius: 12, padding: "16px 20px",
                  display: "flex", alignItems: "flex-start", gap: 14,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "#00E67618", border: "1px solid #00E67630",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <CheckCircle size={18} color="#00E676" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: D.text, margin: 0 }}>
                        Personal call from account manager saved {s.name}
                      </p>
                      <span style={{ fontSize: 11, color: D.dim, whiteSpace: "nowrap" as const, marginLeft: 12 }}>{s.date}</span>
                    </div>
                    <p style={{ fontSize: 13, color: D.muted, margin: 0, marginBottom: 4 }}>{s.action}</p>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, color: "#00E676",
                        background: "#00E67615", border: "1px solid #00E67630",
                        borderRadius: 20, padding: "2px 10px",
                      }}>{s.result}</span>
                      <span style={{
                        fontSize: 12, fontWeight: 600, color: "#A855F7",
                        background: "#A855F715", border: "1px solid #A855F730",
                        borderRadius: 20, padding: "2px 10px",
                      }}>{s.revenue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predicted impact */}
          <div style={{
            background: "linear-gradient(135deg, #A855F718, #3B82F618)",
            border: "1px solid #A855F730",
            borderRadius: 16, padding: "20px 24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <DollarSign size={20} color="#A855F7" />
              <span style={{ fontSize: 16, fontWeight: 700, color: D.text }}>Predicted Impact</span>
            </div>
            <p style={{ fontSize: 15, color: D.text, margin: 0, lineHeight: 1.6 }}>
              Saving <strong style={{ color: "#00E676" }}>50% of high-risk partners</strong> = <strong style={{ color: "#A855F7" }}>$9,200/yr retained revenue</strong>.
              {" "}At current intervention success rate of 67%, proactive outreach to all 12 high-risk partners
              {" "}could recover <strong style={{ color: "#00D4FF" }}>${Math.round(totalRevAtRisk * 0.67 * 0.5).toLocaleString()}/yr</strong>.
            </p>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
