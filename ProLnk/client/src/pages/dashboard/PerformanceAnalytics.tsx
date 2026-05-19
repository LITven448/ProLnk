import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import {
  TrendingUp, Target, Star, Clock, CheckCircle,
  DollarSign, Zap, Camera, MessageSquare, BarChart3,
  ChevronUp, Award,
} from "lucide-react";

const TEAL = "#00B5B8";
const GREEN = "#22C55E";
const AMBER = "#F59E0B";
const RED = "#EF4444";
const DIM = "#8B91A8";
const BORDER = "#1E2A3A";
const CARD = "#0F1D2E";
const BG = "#0A1628";

const benchmarks = [
  {
    label: "Lead acceptance rate",
    you: "87%",
    avg: "71%",
    top: "94%",
    youNum: 87,
    avgNum: 71,
    topNum: 94,
    icon: <CheckCircle size={16} />,
    unit: "%",
  },
  {
    label: "Avg response time",
    you: "4.2 min",
    avg: "12.4 min",
    top: "1.8 min",
    youNum: 4.2,
    avgNum: 12.4,
    topNum: 1.8,
    icon: <Clock size={16} />,
    unit: "min",
    lowerBetter: true,
  },
  {
    label: "Job completion rate",
    you: "96%",
    avg: "91%",
    top: "99%",
    youNum: 96,
    avgNum: 91,
    topNum: 99,
    icon: <CheckCircle size={16} />,
    unit: "%",
  },
  {
    label: "Customer rating",
    you: "4.8★",
    avg: "4.4★",
    top: "4.9★",
    youNum: 4.8,
    avgNum: 4.4,
    topNum: 4.9,
    icon: <Star size={16} />,
    unit: "★",
  },
  {
    label: "Commission per job",
    you: "$312",
    avg: "$248",
    top: "$487",
    youNum: 312,
    avgNum: 248,
    topNum: 487,
    icon: <DollarSign size={16} />,
    unit: "$",
    prefix: true,
  },
];

const responseData = [
  { day: "May 1", you: 6.2, target: 5 },
  { day: "May 2", you: 5.1, target: 5 },
  { day: "May 3", you: 7.8, target: 5 },
  { day: "May 4", you: 4.9, target: 5 },
  { day: "May 5", you: 3.8, target: 5 },
  { day: "May 6", you: 4.2, target: 5 },
  { day: "May 7", you: 3.5, target: 5 },
  { day: "May 8", you: 6.1, target: 5 },
  { day: "May 9", you: 4.7, target: 5 },
  { day: "May 10", you: 3.9, target: 5 },
  { day: "May 11", you: 4.2, target: 5 },
  { day: "May 12", you: 3.1, target: 5 },
  { day: "May 13", you: 2.9, target: 5 },
  { day: "May 14", you: 4.2, target: 5 },
];

const tips = [
  {
    icon: <Camera size={20} />,
    color: TEAL,
    title: "Add more job photos",
    body: "Pros with 5+ photos per job earn 2.3x more. You're averaging 2 photos.",
    action: "Upload photos",
  },
  {
    icon: <Zap size={20} />,
    color: AMBER,
    title: "Unlock the top 10% response time",
    body: "Responding within 2 minutes boosts acceptance 31%. Try mobile alerts.",
    action: "Enable push notifications",
  },
  {
    icon: <MessageSquare size={20} />,
    color: "#A855F7",
    title: "Ask for reviews after every job",
    body: "Pros who request reviews actively get 4x more — and earn 18% higher rates.",
    action: "Send review request",
  },
];

function ScoreRing({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <circle cx={65} cy={65} r={r} fill="none" stroke={BORDER} strokeWidth={10} />
      <circle
        cx={65} cy={65} r={r}
        fill="none"
        stroke={TEAL}
        strokeWidth={10}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform="rotate(-90 65 65)"
      />
      <text x={65} y={60} textAnchor="middle" fill="#F0F2FF" fontSize={26} fontWeight={700}>{score}</text>
      <text x={65} y={78} textAnchor="middle" fill={DIM} fontSize={11}>/100</text>
    </svg>
  );
}

function getColor(row: typeof benchmarks[0]) {
  if (row.lowerBetter) {
    if (row.youNum <= row.topNum) return GREEN;
    if (row.youNum <= row.avgNum) return GREEN;
    return AMBER;
  }
  if (row.youNum >= row.topNum) return GREEN;
  if (row.youNum >= row.avgNum) return GREEN;
  return AMBER;
}

export default function PerformanceAnalytics() {
  const [activeTab, setActiveTab] = useState<"overview" | "response">("overview");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: BG, padding: "24px 20px", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <BarChart3 size={22} color={TEAL} />
            <h1 style={{ color: "#F0F2FF", fontSize: 22, fontWeight: 700, margin: 0 }}>
              Performance Analytics
            </h1>
          </div>
          <p style={{ color: DIM, margin: 0, fontSize: 14 }}>
            Your numbers vs. the best in your market
          </p>
        </div>

        {/* Top row: Score + Beat Your Best */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

          {/* Score card */}
          <div style={{ backgroundColor: CARD, borderRadius: 12, border: `1px solid ${BORDER}`, padding: "24px 28px", display: "flex", alignItems: "center", gap: 28 }}>
            <ScoreRing score={84} />
            <div>
              <div style={{ color: TEAL, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                Performance Score
              </div>
              <div style={{ color: "#F0F2FF", fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
                84 / 100
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, backgroundColor: "#22C55E18", border: "1px solid #22C55E44", borderRadius: 20, padding: "3px 10px" }}>
                <ChevronUp size={12} color={GREEN} />
                <span style={{ color: GREEN, fontSize: 12, fontWeight: 600 }}>Above Average</span>
              </div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "Speed", pct: 72 },
                  { label: "Quality", pct: 92 },
                  { label: "Volume", pct: 78 },
                ].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: DIM, fontSize: 11, width: 44 }}>{b.label}</span>
                    <div style={{ flex: 1, height: 5, backgroundColor: BORDER, borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${b.pct}%`, backgroundColor: TEAL, borderRadius: 4 }} />
                    </div>
                    <span style={{ color: "#F0F2FF", fontSize: 11, width: 28, textAlign: "right" }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Beat your best */}
          <div style={{ backgroundColor: CARD, borderRadius: 12, border: `1px solid ${BORDER}`, padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Award size={18} color={AMBER} />
              <span style={{ color: "#F0F2FF", fontWeight: 700, fontSize: 15 }}>Beat Your Best</span>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: DIM, fontSize: 12, marginBottom: 4 }}>Single-day record</div>
              <div style={{ color: AMBER, fontSize: 32, fontWeight: 700 }}>$847</div>
            </div>
            <div style={{ backgroundColor: "#1A2540", borderRadius: 8, padding: 12, marginBottom: 16 }}>
              <div style={{ color: DIM, fontSize: 12, marginBottom: 2 }}>Today's pace</div>
              <div style={{ color: "#F0F2FF", fontSize: 20, fontWeight: 700 }}>$490</div>
              <div style={{ marginTop: 8, height: 6, backgroundColor: BORDER, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "58%", backgroundColor: AMBER, borderRadius: 4, transition: "width 1s ease" }} />
              </div>
              <div style={{ color: DIM, fontSize: 11, marginTop: 4 }}>58% of your record</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "2 more jobs", detail: "~$180 avg" },
                { label: "Premium job", detail: "~$357+ needed" },
              ].map(opt => (
                <div key={opt.label} style={{ flex: 1, backgroundColor: "#0A1628", borderRadius: 8, border: `1px solid ${BORDER}`, padding: "8px 10px" }}>
                  <div style={{ color: TEAL, fontSize: 12, fontWeight: 600 }}>{opt.label}</div>
                  <div style={{ color: DIM, fontSize: 11 }}>{opt.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          {(["overview", "response"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 18px",
                borderRadius: 8,
                border: `1px solid ${activeTab === tab ? TEAL : BORDER}`,
                backgroundColor: activeTab === tab ? "#00B5B818" : "transparent",
                color: activeTab === tab ? TEAL : DIM,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all .15s",
              }}
            >
              {tab === "overview" ? "Benchmark Overview" : "Response Time Chart"}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div style={{ backgroundColor: CARD, borderRadius: 12, border: `1px solid ${BORDER}`, marginBottom: 16, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "12px 20px", borderBottom: `1px solid ${BORDER}` }}>
              {["Metric", "You", "DFW Avg", "Top 10%"].map(h => (
                <div key={h} style={{ color: DIM, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</div>
              ))}
            </div>
            {benchmarks.map((row, i) => {
              const color = getColor(row);
              return (
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    padding: "14px 20px",
                    borderBottom: i < benchmarks.length - 1 ? `1px solid ${BORDER}` : "none",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#F0F2FF", fontSize: 14 }}>
                    <span style={{ color: DIM }}>{row.icon}</span>
                    {row.label}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color, fontWeight: 700, fontSize: 15 }}>{row.you}</span>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
                  </div>
                  <div style={{ color: DIM, fontSize: 14 }}>{row.avg}</div>
                  <div style={{ color: "#A855F7", fontSize: 14, fontWeight: 600 }}>{row.top}</div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "response" && (
          <div style={{ backgroundColor: CARD, borderRadius: 12, border: `1px solid ${BORDER}`, padding: "20px 24px", marginBottom: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: "#F0F2FF", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                Avg Response Time — Last 14 Days
              </div>
              <div style={{ color: DIM, fontSize: 13 }}>
                Dashed line = 5-min target. Faster responses win more jobs.
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={responseData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid stroke={BORDER} strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fill: DIM, fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: DIM, fontSize: 11 }} tickLine={false} axisLine={false} unit=" min" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F1D2E", border: `1px solid ${BORDER}`, borderRadius: 8 }}
                  labelStyle={{ color: "#F0F2FF", fontSize: 12 }}
                  itemStyle={{ fontSize: 12 }}
                  formatter={(v: number) => [`${v} min`]}
                />
                <ReferenceLine y={5} stroke={AMBER} strokeDasharray="6 3" label={{ value: "5-min target", fill: AMBER, fontSize: 11 }} />
                <Line type="monotone" dataKey="you" stroke={TEAL} strokeWidth={2.5} dot={{ r: 3, fill: TEAL }} name="Your response" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Trend analysis */}
        <div style={{ backgroundColor: "#00B5B810", border: `1px solid #00B5B830`, borderRadius: 12, padding: "14px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <TrendingUp size={20} color={TEAL} />
          <div>
            <span style={{ color: "#F0F2FF", fontSize: 14, fontWeight: 600 }}>Trending up this month — </span>
            <span style={{ color: TEAL, fontSize: 14 }}>
              Your acceptance rate improved 12% — you're in the top 15% of DFW HVAC pros.
            </span>
          </div>
        </div>

        {/* Improvement tips */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Target size={16} color={DIM} />
            <span style={{ color: DIM, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Personalized Improvement Tips
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {tips.map(tip => (
              <div
                key={tip.title}
                style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: `${tip.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: tip.color }}>
                    {tip.icon}
                  </div>
                  <div style={{ color: "#F0F2FF", fontWeight: 600, fontSize: 13 }}>{tip.title}</div>
                </div>
                <p style={{ color: DIM, fontSize: 12, lineHeight: 1.5, margin: "0 0 12px" }}>{tip.body}</p>
                <button style={{ backgroundColor: "transparent", border: `1px solid ${tip.color}66`, borderRadius: 6, padding: "5px 12px", color: tip.color, fontSize: 12, fontWeight: 600, cursor: "pointer", width: "100%" }}>
                  {tip.action}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
