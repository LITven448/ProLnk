import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Star, Clock, CheckCircle, TrendingUp, TrendingDown,
  Zap, AlertTriangle, RefreshCw, Send, Info,
} from "lucide-react";

// ─── Design tokens ────────────────────────────────────────────────────────────

const D = {
  bg: "#0D0F14", surface: "#13161E", card: "#1A1E2A", border: "#252A3A",
  text: "#F0F2FF", muted: "#8B91A8", dim: "#555B72",
  cyan: "#00D4FF", green: "#00E676", amber: "#FFB300",
  red: "#FF4444", purple: "#A855F7", blue: "#3B82F6",
};

// ─── Mock data ────────────────────────────────────────────────────────────────

interface TopPartner {
  name: string;
  trade: string;
  score: number;
  response: number;
  acceptance: number;
  completion: number;
  rating: number;
  recency: number;
  trend: "up" | "down" | "flat";
}

const TOP_PARTNERS: TopPartner[] = [
  { name: "Marcus Delgado",  trade: "HVAC",        score: 97, response: 25, acceptance: 24, completion: 20, rating: 19, recency: 9,  trend: "up" },
  { name: "Tasha Williams",  trade: "Plumbing",    score: 94, response: 24, acceptance: 24, completion: 19, rating: 19, recency: 8,  trend: "up" },
  { name: "Jordan Kimura",   trade: "Electrical",  score: 91, response: 23, acceptance: 23, completion: 19, rating: 18, recency: 8,  trend: "flat" },
  { name: "Rafael Santos",   trade: "Roofing",     score: 88, response: 22, acceptance: 22, completion: 18, rating: 18, recency: 8,  trend: "up" },
  { name: "Devon Price",     trade: "HVAC",        score: 85, response: 21, acceptance: 22, completion: 18, rating: 17, recency: 7,  trend: "down" },
  { name: "Alicia Moreno",   trade: "Plumbing",    score: 83, response: 21, acceptance: 21, completion: 17, rating: 17, recency: 7,  trend: "up" },
  { name: "Chris Okafor",    trade: "Electrical",  score: 80, response: 20, acceptance: 20, completion: 17, rating: 16, recency: 7,  trend: "flat" },
  { name: "Priya Nair",      trade: "Painting",    score: 78, response: 20, acceptance: 19, completion: 16, rating: 16, recency: 7,  trend: "down" },
  { name: "Sam Boucher",     trade: "Carpentry",   score: 75, response: 19, acceptance: 19, completion: 15, rating: 15, recency: 7,  trend: "up" },
  { name: "Devon Castillo",  trade: "Landscaping", score: 72, response: 18, acceptance: 18, completion: 15, rating: 14, recency: 7,  trend: "flat" },
];

const LOW_PARTNERS = [
  { name: "Nina Kaplan",   trade: "Landscaping", score: 38, weakness: "Acceptance rate (52%)",  action: "Review lead matching criteria",       },
  { name: "Greg Hammond",  trade: "HVAC",        score: 34, weakness: "Response time (8.4 hrs)", action: "Enable push notifications",           },
  { name: "Lisa Fontaine", trade: "Plumbing",    score: 29, weakness: "Activity recency (47d)",  action: "Reactivation outreach sequence",      },
  { name: "Tom Briggs",    trade: "Roofing",     score: 25, weakness: "Completion rate (41%)",   action: "Connect with performance coach",      },
  { name: "Cara Mendes",   trade: "Electrical",  score: 19, weakness: "Customer rating (2.9★)",  action: "Mandatory quality review + training", },
];

const DISTRIBUTION = [
  { band: "0–10",  count: 3  },
  { band: "11–20", count: 7  },
  { band: "21–30", count: 11 },
  { band: "31–40", count: 18 },
  { band: "41–50", count: 24 },
  { band: "51–60", count: 31 },
  { band: "61–70", count: 47 },
  { band: "71–80", count: 62 },
  { band: "81–90", count: 55 },
  { band: "91–100",count: 38 },
];

const FORMULA = [
  { label: "Response Time",   max: 25, desc: "Avg response to leads",       color: D.cyan,   icon: Clock },
  { label: "Acceptance Rate", max: 25, desc: "% of leads accepted",         color: D.green,  icon: CheckCircle },
  { label: "Completion Rate", max: 20, desc: "% of jobs completed",         color: D.blue,   icon: Zap },
  { label: "Customer Rating", max: 20, desc: "Avg star rating (0–5★)",      color: D.amber,  icon: Star },
  { label: "Activity Recency",max: 10, desc: "Days since last activity",    color: D.purple, icon: TrendingUp },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{
        flex: 1, height: 6, borderRadius: 3,
        background: D.border, overflow: "hidden",
      }}>
        <div style={{
          width: `${(value / max) * 100}%`, height: "100%",
          background: color, borderRadius: 3,
          transition: "width 0.4s ease",
        }} />
      </div>
      <span style={{ fontSize: 11, color: D.muted, minWidth: 26, textAlign: "right" }}>
        {value}/{max}
      </span>
    </div>
  );
}

function TrendIcon({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up")   return <TrendingUp size={14} color={D.green} />;
  if (trend === "down") return <TrendingDown size={14} color={D.red} />;
  return <span style={{ fontSize: 12, color: D.muted }}>—</span>;
}

function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? D.green : score >= 60 ? D.cyan : score >= 40 ? D.amber : D.red;
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px",
      borderRadius: 99, fontSize: 13, fontWeight: 700,
      background: `${color}22`, color, border: `1px solid ${color}44`,
    }}>
      {score}
    </span>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PartnerEngagementScore() {
  const [recalculating, setRecalculating] = useState(false);
  const [coachSent, setCoachSent] = useState<string[]>([]);

  function handleRecalc() {
    setRecalculating(true);
    setTimeout(() => setRecalculating(false), 2200);
  }

  function handleCoach(name: string) {
    setCoachSent((prev) => [...prev, name]);
  }

  return (
    <AdminLayout>
      <div style={{
        minHeight: "100vh", background: D.bg, padding: "32px 28px",
        fontFamily: "'Inter', system-ui, sans-serif", color: D.text,
      }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" }}>
              Partner Performance Score
            </h1>
            <p style={{ color: D.muted, marginTop: 6, fontSize: 14 }}>
              The algorithm that determines lead priority
            </p>
          </div>
          <button
            onClick={handleRecalc}
            disabled={recalculating}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 10, cursor: "pointer",
              background: D.cyan + "22", border: `1px solid ${D.cyan}44`,
              color: D.cyan, fontSize: 13, fontWeight: 600,
              opacity: recalculating ? 0.6 : 1,
            }}
          >
            <RefreshCw size={14} style={{ animation: recalculating ? "spin 1s linear infinite" : "none" }} />
            {recalculating ? "Recalculating…" : "Recalculate Now"}
          </button>
        </div>

        {/* ── Score formula card ── */}
        <div style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 16, padding: 24, marginBottom: 28,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Info size={16} color={D.cyan} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>PPS Formula — 5 weighted dimensions, total 100 pts</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            {FORMULA.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} style={{
                  background: D.card, borderRadius: 12, padding: 16,
                  border: `1px solid ${f.color}30`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <Icon size={14} color={f.color} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: f.color }}>{f.label}</span>
                    <span style={{
                      marginLeft: "auto", fontSize: 12, fontWeight: 700,
                      background: `${f.color}22`, color: f.color,
                      padding: "1px 8px", borderRadius: 99,
                    }}>0–{f.max}</span>
                  </div>
                  <p style={{ fontSize: 12, color: D.muted, margin: 0 }}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Score impact callout ── */}
        <div style={{
          background: `${D.green}12`, border: `1px solid ${D.green}30`,
          borderRadius: 12, padding: "14px 20px", marginBottom: 28,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <TrendingUp size={16} color={D.green} />
          <span style={{ fontSize: 13, color: D.text }}>
            Partners with <strong style={{ color: D.green }}>PPS 80+</strong> receive{" "}
            <strong style={{ color: D.green }}>3.4× more lead assignments</strong> than those below 50.
          </span>
        </div>

        {/* ── Distribution chart ── */}
        <div style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 16, padding: 24, marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px" }}>Score Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DISTRIBUTION} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.border} vertical={false} />
              <XAxis dataKey="band" tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: D.muted, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 8, fontSize: 12 }}
                cursor={{ fill: D.cyan + "15" }}
              />
              <Bar dataKey="count" fill={D.cyan} radius={[4, 4, 0, 0]} name="Partners" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Top performers ── */}
        <div style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 16, padding: 24, marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 20px" }}>Top 10 by PPS Score</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${D.border}` }}>
                  {["Partner", "Trade", "Score", "Response", "Acceptance", "Completion", "Rating", "Recency", "Trend"].map((h) => (
                    <th key={h} style={{
                      padding: "8px 12px", textAlign: "left",
                      fontSize: 11, color: D.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOP_PARTNERS.map((p, i) => (
                  <tr key={p.name} style={{
                    borderBottom: `1px solid ${D.border}`,
                    background: i % 2 === 0 ? "transparent" : D.card + "55",
                  }}>
                    <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: "12px 12px", fontSize: 12, color: D.muted }}>{p.trade}</td>
                    <td style={{ padding: "12px 12px" }}><ScorePill score={p.score} /></td>
                    <td style={{ padding: "12px 12px", minWidth: 100 }}>
                      <ScoreBar value={p.response} max={25} color={D.cyan} />
                    </td>
                    <td style={{ padding: "12px 12px", minWidth: 100 }}>
                      <ScoreBar value={p.acceptance} max={25} color={D.green} />
                    </td>
                    <td style={{ padding: "12px 12px", minWidth: 100 }}>
                      <ScoreBar value={p.completion} max={20} color={D.blue} />
                    </td>
                    <td style={{ padding: "12px 12px", minWidth: 100 }}>
                      <ScoreBar value={p.rating} max={20} color={D.amber} />
                    </td>
                    <td style={{ padding: "12px 12px", minWidth: 80 }}>
                      <ScoreBar value={p.recency} max={10} color={D.purple} />
                    </td>
                    <td style={{ padding: "12px 12px" }}>
                      <TrendIcon trend={p.trend} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Low performers at risk ── */}
        <div style={{
          background: D.surface, border: `1px solid ${D.red}30`,
          borderRadius: 16, padding: 24, marginBottom: 28,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <AlertTriangle size={16} color={D.red} />
            <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Low Performers at Risk</h2>
            <span style={{
              marginLeft: 8, fontSize: 11, fontWeight: 700,
              background: D.red + "22", color: D.red,
              padding: "2px 8px", borderRadius: 99,
            }}>PPS &lt; 40</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LOW_PARTNERS.map((p) => {
              const sent = coachSent.includes(p.name);
              return (
                <div key={p.name} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: D.card, borderRadius: 12, padding: "14px 18px",
                  border: `1px solid ${D.border}`,
                  flexWrap: "wrap",
                }}>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: D.muted }}>{p.trade}</div>
                  </div>
                  <ScorePill score={p.score} />
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 11, color: D.red, marginBottom: 2 }}>Primary weakness</div>
                    <div style={{ fontSize: 12, color: D.text }}>{p.weakness}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 11, color: D.muted, marginBottom: 2 }}>Recommended action</div>
                    <div style={{ fontSize: 12, color: D.text }}>{p.action}</div>
                  </div>
                  <button
                    onClick={() => handleCoach(p.name)}
                    disabled={sent}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      padding: "8px 14px", borderRadius: 8, cursor: sent ? "default" : "pointer",
                      background: sent ? D.green + "22" : D.amber + "22",
                      border: `1px solid ${sent ? D.green : D.amber}44`,
                      color: sent ? D.green : D.amber,
                      fontSize: 12, fontWeight: 600,
                    }}
                  >
                    <Send size={12} />
                    {sent ? "Tip Sent" : "Send Coaching Tip"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Recalculation footer ── */}
        <div style={{
          background: D.surface, border: `1px solid ${D.border}`,
          borderRadius: 12, padding: "14px 20px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <RefreshCw size={14} color={D.muted} />
            <span style={{ fontSize: 13, color: D.muted }}>
              Scores recalculate nightly.{" "}
              <strong style={{ color: D.text }}>Next update: Tonight 2:00 AM</strong>
            </span>
          </div>
          <span style={{ fontSize: 12, color: D.dim }}>
            Last run: Today 2:01 AM · 296 partners scored
          </span>
        </div>

      </div>
    </AdminLayout>
  );
}
