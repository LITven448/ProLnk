import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import {
  Star, MessageSquare, TrendingUp, Clock, Users,
  AlertTriangle, CheckCircle, Mail, BarChart2,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";

const D = {
  bg: "#F8FAFC",
  surface: "#0F1E36",
  card: "#152540",
  border: "#1E3A5F",
  text: "#F0F4FF",
  muted: "#7B96BB",
  dim: "#3A5478",
  cyan: "#00D4FF",
  green: "#00E676",
  amber: "#FFB300",
  red: "#FF4444",
  teal: "#14B8A6",
};

const NPS_TREND = [
  { month: "Dec", partner: 58, homeowner: 66 },
  { month: "Jan", partner: 61, homeowner: 70 },
  { month: "Feb", partner: 65, homeowner: 73 },
  { month: "Mar", partner: 68, homeowner: 76 },
  { month: "Apr", partner: 70, homeowner: 79 },
  { month: "May", partner: 72, homeowner: 81 },
];

const TICKET_CATEGORIES = [
  { category: "Payout delay", count: 18 },
  { category: "Lead quality", count: 14 },
  { category: "Technical", count: 9 },
  { category: "Account access", count: 6 },
  { category: "Other", count: 4 },
];

interface Review {
  id: string;
  type: "partner" | "homeowner";
  name: string;
  rating: number;
  quote: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: "r1", type: "partner", name: "Marcus T.", rating: 5,
    quote: "ProLnk sends me better leads than any other platform I've tried. The AI matching is genuinely impressive.",
    date: "May 13",
  },
  {
    id: "r2", type: "homeowner", name: "Sarah K.", rating: 5,
    quote: "Got 3 quotes in under an hour. Booked a plumber same day — couldn't be easier.",
    date: "May 12",
  },
  {
    id: "r3", type: "partner", name: "Dino P.", rating: 4,
    quote: "Solid leads, payout was a bit slow this month but support responded quickly.",
    date: "May 11",
  },
  {
    id: "r4", type: "homeowner", name: "Jennifer M.", rating: 5,
    quote: "The pros were all vetted and professional. Will definitely use ProLnk again.",
    date: "May 10",
  },
  {
    id: "r5", type: "partner", name: "Roy C.", rating: 5,
    quote: "The network income is real — I made more from referrals this month than direct jobs.",
    date: "May 9",
  },
];

interface AtRisk {
  id: string;
  type: "partner" | "homeowner";
  name: string;
  issue: string;
  days: number;
}

const AT_RISK: AtRisk[] = [
  { id: "a1", type: "homeowner", name: "David H.", issue: "No login in 94 days", days: 94 },
  { id: "a2", type: "partner", name: "Frank B.", issue: "Rating dropped from 4.8 → 3.9", days: 30 },
  { id: "a3", type: "homeowner", name: "Maria L.", issue: "No login in 112 days", days: 112 },
];

function NpsGauge({ value, label }: { value: number; label: string }) {
  const color = value > 50 ? D.green : value >= 0 ? D.amber : D.red;
  const pct = Math.min(Math.max((value + 100) / 200, 0), 1);
  const angle = pct * 180 - 90;
  const r = 54;
  const cx = 70, cy = 70;
  const x = cx + r * Math.cos((angle - 90) * Math.PI / 180);
  const y = cy + r * Math.sin((angle - 90) * Math.PI / 180);

  return (
    <div style={{
      background: D.card, border: `1px solid ${D.border}`, borderRadius: 14,
      padding: 24, flex: 1, textAlign: "center",
    }}>
      <p style={{ color: D.muted, fontSize: 13, marginBottom: 12 }}>{label}</p>
      <svg width={140} height={80} viewBox="0 0 140 80" style={{ display: "block", margin: "0 auto" }}>
        <path d="M 16 70 A 54 54 0 0 1 124 70" fill="none" stroke={D.dim} strokeWidth={10} strokeLinecap="round" />
        <path
          d={`M 16 70 A 54 54 0 0 1 ${x} ${y}`}
          fill="none" stroke={color} strokeWidth={10} strokeLinecap="round"
        />
        <text x={70} y={65} textAnchor="middle" fill={color} fontSize={24} fontWeight={700}>{value}</text>
      </svg>
      <div style={{
        display: "inline-block", marginTop: 8,
        background: color + "22", color, borderRadius: 20,
        fontSize: 12, fontWeight: 600, padding: "3px 12px",
      }}>
        {value > 50 ? "Excellent" : value >= 0 ? "Good" : "Needs Work"}
      </div>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={12} fill={i < n ? D.amber : "none"} color={i < n ? D.amber : D.dim} />
      ))}
    </span>
  );
}

export default function CustomerSuccessDashboard() {
  const [respondedIds, setRespondedIds] = useState<Set<string>>(new Set());
  const [outreachedIds, setOutreachedIds] = useState<Set<string>>(new Set());

  return (
    <AdminLayout>
      <div style={{ background: D.bg, minHeight: "100vh", padding: "28px 20px", maxWidth: 960, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Users size={20} color={D.cyan} />
            <h1 style={{ color: D.text, fontSize: 22, fontWeight: 700, margin: 0 }}>Customer Success</h1>
          </div>
          <p style={{ color: D.muted, fontSize: 14, margin: 0 }}>Happy partners, happy homeowners</p>
        </div>

        {/* NPS gauges */}
        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          <NpsGauge value={72} label="Partner NPS" />
          <NpsGauge value={81} label="Homeowner NPS" />
        </div>

        {/* CSAT cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Partner CSAT", value: "4.8/5", icon: Star, color: D.amber },
            { label: "Homeowner CSAT", value: "4.9/5", icon: Star, color: D.green },
            { label: "Tickets Open", value: "7", icon: MessageSquare, color: D.cyan },
            { label: "Avg Resolution", value: "4.2h", icon: Clock, color: D.teal },
          ].map(m => (
            <div key={m.label} style={{
              background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 18,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <m.icon size={16} color={m.color} />
                <span style={{ color: D.muted, fontSize: 12 }}>{m.label}</span>
              </div>
              <div style={{ color: m.color, fontSize: 24, fontWeight: 700 }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* NPS trend chart */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <TrendingUp size={15} color={D.cyan} /> NPS Trend — 6 Months
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={NPS_TREND} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.dim} />
              <XAxis dataKey="month" tick={{ fill: D.muted, fontSize: 12 }} />
              <YAxis domain={[40, 100]} tick={{ fill: D.muted, fontSize: 11 }} />
              <Tooltip contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8 }} labelStyle={{ color: D.text }} />
              <Legend wrapperStyle={{ color: D.muted, fontSize: 12 }} />
              <Line type="monotone" dataKey="partner" stroke={D.cyan} strokeWidth={2} dot={false} name="Partner NPS" />
              <Line type="monotone" dataKey="homeowner" stroke={D.green} strokeWidth={2} dot={false} name="Homeowner NPS" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent reviews */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Star size={15} color={D.amber} /> Recent Reviews
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REVIEWS.map(r => (
              <div key={r.id} style={{
                background: D.card, border: `1px solid ${D.border}`, borderRadius: 10,
                padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                  background: r.type === "partner" ? D.cyan + "22" : D.green + "22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: r.type === "partner" ? D.cyan : D.green, fontWeight: 700, fontSize: 14,
                }}>
                  {r.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <span style={{ color: D.text, fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 12,
                      background: r.type === "partner" ? D.cyan + "22" : D.green + "22",
                      color: r.type === "partner" ? D.cyan : D.green,
                    }}>
                      {r.type === "partner" ? "Partner" : "Homeowner"}
                    </span>
                    <Stars n={r.rating} />
                    <span style={{ color: D.dim, fontSize: 12, marginLeft: "auto" }}>{r.date}</span>
                  </div>
                  <p style={{ color: D.muted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>"{r.quote}"</p>
                </div>
                <button
                  onClick={() => setRespondedIds(s => new Set([...s, r.id]))}
                  style={{
                    background: respondedIds.has(r.id) ? D.green + "22" : D.surface,
                    color: respondedIds.has(r.id) ? D.green : D.cyan,
                    border: `1px solid ${respondedIds.has(r.id) ? D.green : D.cyan}44`,
                    borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {respondedIds.has(r.id) ? "Sent" : "Respond"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* At-risk accounts */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertTriangle size={15} color={D.amber} /> At-Risk Accounts
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {AT_RISK.map(a => (
              <div key={a.id} style={{
                background: "#1C1200", border: `1px solid ${D.amber}33`,
                borderRadius: 10, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <AlertTriangle size={18} color={D.amber} style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ color: D.text, fontWeight: 600, fontSize: 14 }}>{a.name}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: "1px 7px", borderRadius: 12,
                      background: a.type === "partner" ? D.cyan + "22" : D.green + "22",
                      color: a.type === "partner" ? D.cyan : D.green,
                    }}>
                      {a.type === "partner" ? "Partner" : "Homeowner"}
                    </span>
                  </div>
                  <p style={{ color: D.muted, fontSize: 13, margin: 0 }}>{a.issue}</p>
                </div>
                <button
                  onClick={() => setOutreachedIds(s => new Set([...s, a.id]))}
                  style={{
                    background: outreachedIds.has(a.id) ? D.green + "22" : D.amber + "22",
                    color: outreachedIds.has(a.id) ? D.green : D.amber,
                    border: `1px solid ${outreachedIds.has(a.id) ? D.green : D.amber}44`,
                    borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                >
                  <Mail size={13} />
                  {outreachedIds.has(a.id) ? "Sent" : "Outreach"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div style={{
          background: `linear-gradient(135deg, ${D.teal}15, ${D.green}10)`,
          border: `1px solid ${D.teal}44`, borderRadius: 12, padding: 18, marginBottom: 24,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <CheckCircle size={22} color={D.green} style={{ flexShrink: 0 }} />
          <div>
            <p style={{ color: D.green, fontWeight: 700, fontSize: 14, margin: 0 }}>This month's milestones</p>
            <p style={{ color: D.muted, fontSize: 13, margin: "4px 0 0" }}>
              4 homeowners completed their first booking · 8 partners crossed 50 jobs
            </p>
          </div>
        </div>

        {/* Ticket category chart */}
        <div style={{ background: D.card, border: `1px solid ${D.border}`, borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: D.text, fontSize: 15, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <BarChart2 size={15} color={D.cyan} /> Support Ticket Categories
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={TICKET_CATEGORIES} layout="vertical" margin={{ top: 0, right: 16, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={D.dim} horizontal={false} />
              <XAxis type="number" tick={{ fill: D.muted, fontSize: 11 }} />
              <YAxis type="category" dataKey="category" tick={{ fill: D.muted, fontSize: 12 }} width={80} />
              <Tooltip contentStyle={{ background: D.surface, border: `1px solid ${D.border}`, borderRadius: 8 }} labelStyle={{ color: D.text }} />
              <Bar dataKey="count" fill={D.cyan} radius={[0, 4, 4, 0]} name="Tickets" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </AdminLayout>
  );
}
