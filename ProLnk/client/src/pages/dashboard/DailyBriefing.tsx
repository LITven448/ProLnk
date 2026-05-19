import { useState } from "react";
import {
  AlertCircle, Clock, Award, TrendingUp, TrendingDown,
  Zap, CloudLightning, Users, DollarSign, ChevronRight,
  Thermometer, Star, CheckCircle,
} from "lucide-react";

interface Priority {
  urgency: "red" | "yellow" | "green" | "blue";
  title: string;
  cta: string;
  href: string;
}

interface TrendCard {
  label: string;
  value: string;
  change: string;
  up: boolean;
}

const PRIORITIES: Priority[] = [
  {
    urgency: "red",
    title: "2 leads expire in 4 hours — accept now",
    cta: "View Leads",
    href: "/partner/inbound-leads",
  },
  {
    urgency: "yellow",
    title: "Quote to Sarah M. has been pending 48h — follow up",
    cta: "Send Follow-up",
    href: "/partner/job-log",
  },
  {
    urgency: "green",
    title: "Your HVAC tune-up certification expires in 60 days — renew early",
    cta: "Renew",
    href: "/partner/profile",
  },
  {
    urgency: "blue",
    title: "ZIP 75034 has 3 unclaimed leads — expand your service area?",
    cta: "Expand",
    href: "/partner/service-area",
  },
];

const URGENCY_CFG = {
  red:    { color: "#EF4444", bg: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.25)",   dot: "#EF4444" },
  yellow: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)",  dot: "#F59E0B" },
  green:  { color: "#10B981", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)",  dot: "#10B981" },
  blue:   { color: "#3B82F6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.25)",  dot: "#3B82F6" },
};

const TRENDS: TrendCard[] = [
  { label: "Jobs this week",    value: "5",      change: "↑ 20% vs last week", up: true },
  { label: "Avg response time", value: "38 min", change: "↓ 15% (improving)",  up: true },
  { label: "Rating",            value: "4.8★",   change: "↑ 0.1★ this month",  up: true },
];

const PRO_TIPS = [
  "Respond to leads within 15 minutes — pros who do convert 3× more.",
  "Upload a job photo after every completion — boosts your rating visibility.",
  "Request a review from every satisfied customer. One text doubles your review count.",
  "Keep your calendar updated — partners with availability shown get 40% more leads.",
  "Bundle services when quoting — customers who see packages spend 22% more.",
];

export default function DailyBriefing() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const tipIndex = new Date().getDate() % PRO_TIPS.length;

  function dismiss(i: number) {
    setDismissed(prev => new Set([...prev, i]));
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", padding: "24px 16px 48px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
              Daily Briefing — {today}
            </h1>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#A78BFA",
              background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.3)",
              borderRadius: 20, padding: "2px 10px",
            }}>AI-generated</span>
          </div>
          <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
            Good morning. Here's what matters today.
          </p>
        </div>

        {/* Yesterday Summary */}
        <div style={{
          background: "#1E293B", border: "1px solid #334155",
          borderRadius: 14, padding: "16px 20px", marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>
            Yesterday
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { icon: CheckCircle, val: "2",    label: "Jobs completed", color: "#10B981" },
              { icon: DollarSign, val: "$624",  label: "Commission earned", color: "#00B5B8" },
              { icon: Zap,        val: "3",     label: "New leads received", color: "#F59E0B" },
            ].map(({ icon: Icon, val, label, color }) => (
              <div key={label} style={{ flex: 1, textAlign: "center" as const }}>
                <Icon size={16} color={color} style={{ marginBottom: 4 }} />
                <div style={{ fontSize: 20, fontWeight: 800, color: "#F1F5F9" }}>{val}</div>
                <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.3 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weather Alert */}
        <div style={{
          background: "linear-gradient(135deg, #431407, #7C2D12)",
          border: "1px solid #C2410C", borderRadius: 14,
          padding: "14px 18px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <Thermometer size={20} color="#FB923C" />
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#FED7AA" }}>
              High of 98°F today
            </span>
            <span style={{ fontSize: 13, color: "#FDBA74", marginLeft: 8 }}>
              — HVAC calls will peak. Be ready to accept.
            </span>
          </div>
        </div>

        {/* Market Intel */}
        <div style={{
          background: "linear-gradient(135deg, #1E3A5F, #1D4ED8)",
          border: "1px solid #3B82F6", borderRadius: 14,
          padding: "16px 20px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <TrendingUp size={16} color="#93C5FD" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#93C5FD" }}>Market Intel</span>
          </div>
          <p style={{ fontSize: 14, color: "#BFDBFE", margin: 0, lineHeight: 1.6 }}>
            HVAC demand in your area is <strong style={{ color: "#fff" }}>up 34% this week</strong> — storm season starting.
            Accept more leads today while demand is high.
          </p>
        </div>

        {/* Today's Priorities */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 12 }}>Today's priorities</h2>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {PRIORITIES.map((p, i) => {
              if (dismissed.has(i)) return null;
              const cfg = URGENCY_CFG[p.urgency];
              return (
                <div key={i} style={{
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  borderRadius: 12, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: cfg.dot, minWidth: 10,
                    boxShadow: `0 0 6px ${cfg.dot}`,
                  }} />
                  <span style={{ flex: 1, fontSize: 14, color: "#E2E8F0", lineHeight: 1.4 }}>
                    {p.title}
                  </span>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <a href={p.href} style={{ textDecoration: "none" }}>
                      <button style={{
                        background: cfg.color, color: "#fff",
                        border: "none", borderRadius: 8, padding: "6px 14px",
                        fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" as const,
                      }}>{p.cta}</button>
                    </a>
                    <button
                      onClick={() => dismiss(i)}
                      style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 18, lineHeight: 1 }}
                    >×</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance vs Last Week */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 12 }}>
            Your performance vs. last week
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {TRENDS.map(t => (
              <div key={t.label} style={{
                background: "#1E293B", border: "1px solid #334155",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#F1F5F9", marginBottom: 4 }}>{t.value}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginBottom: 6, lineHeight: 1.3 }}>{t.label}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: t.up ? "#34D399" : "#F87171",
                }}>{t.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Update */}
        <div style={{
          background: "#1E293B", border: "1px solid #334155",
          borderRadius: 14, padding: "16px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: "rgba(0,181,184,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", minWidth: 40,
          }}>
            <Users size={18} color="#00B5B8" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0", marginBottom: 2 }}>Network Update</div>
            <div style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>
              Your recruit <strong style={{ color: "#E2E8F0" }}>Marcus</strong> completed 3 jobs yesterday —
              you earned <strong style={{ color: "#00B5B8" }}>$63</strong> in network income.
            </div>
          </div>
          <ChevronRight size={16} color="#475569" />
        </div>

        {/* Tip of the Day */}
        <div style={{
          background: "linear-gradient(135deg, #1A1A2E, #2D1B69)",
          border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: 14, padding: "16px 20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Star size={14} color="#A78BFA" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#A78BFA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Tip of the day
            </span>
          </div>
          <p style={{ fontSize: 14, color: "#C4B5FD", margin: 0, lineHeight: 1.6 }}>
            {PRO_TIPS[tipIndex]}
          </p>
        </div>

      </div>
    </div>
  );
}
