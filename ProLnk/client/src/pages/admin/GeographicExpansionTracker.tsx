import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin, TrendingUp, Users, CheckCircle, XCircle, AlertTriangle,
  DollarSign, Clock, Target, ChevronRight, BarChart3,
} from "lucide-react";

interface MarketRow {
  market: string;
  population: string;
  tam: string;
  pipeline: number;
  homeownerInterest: number;
  readiness: number;
  status: "Live" | "Planning" | "Interest" | "Watch";
}

const MARKETS: MarketRow[] = [
  { market: "Dallas-Fort Worth", population: "7.8M", tam: "$4.2B", pipeline: 147, homeownerInterest: 5800, readiness: 82, status: "Live" },
  { market: "Houston",           population: "7.3M", tam: "$3.9B", pipeline: 42,  homeownerInterest: 3200, readiness: 54, status: "Planning" },
  { market: "San Antonio",       population: "2.6M", tam: "$1.4B", pipeline: 18,  homeownerInterest: 1400, readiness: 38, status: "Planning" },
  { market: "Austin",            population: "2.3M", tam: "$1.3B", pipeline: 29,  homeownerInterest: 2100, readiness: 45, status: "Planning" },
  { market: "Phoenix",           population: "5.0M", tam: "$2.7B", pipeline: 11,  homeownerInterest: 890,  readiness: 28, status: "Interest" },
  { market: "Denver",            population: "2.9M", tam: "$1.6B", pipeline: 8,   homeownerInterest: 640,  readiness: 22, status: "Interest" },
  { market: "Atlanta",           population: "6.2M", tam: "$3.3B", pipeline: 5,   homeownerInterest: 410,  readiness: 14, status: "Watch" },
  { market: "Charlotte",         population: "2.7M", tam: "$1.5B", pipeline: 3,   homeownerInterest: 280,  readiness: 10, status: "Watch" },
];

const STATUS_CFG = {
  Live:     { color: "#10B981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.25)" },
  Planning: { color: "#F59E0B", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.25)" },
  Interest: { color: "#3B82F6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.25)" },
  Watch:    { color: "#64748B", bg: "rgba(100,116,139,0.12)", border: "rgba(100,116,139,0.25)" },
};

const HOUSTON_CHECKLIST = [
  { label: "Partner pipeline (42 signed up, need 100)", done: false, Icon: Users },
  { label: "Homeowner demand (3,200 homes waitlisted)", done: true,  Icon: Target },
  { label: "Legal/compliance (Texas already covered)",  done: true,  Icon: CheckCircle },
  { label: "Payment processing (Stripe TX ready)",       done: true,  Icon: DollarSign },
  { label: "Support coverage (need 1 FTE)",              done: false, Icon: AlertTriangle },
];

const TIMELINE = [
  { label: "DFW",         period: "Q1 2026", active: true },
  { label: "Houston",     period: "Q3 2026", active: false },
  { label: "San Antonio", period: "Q4 2026", active: false },
  { label: "Austin",      period: "Q1 2027", active: false },
  { label: "Phoenix",     period: "Q2 2027", active: false },
];

export default function GeographicExpansionTracker() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MapPin size={22} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#F8FAFC", margin: 0 }}>
                Geographic Expansion Tracker
              </h1>
              <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>
                From DFW to nationwide, one market at a time
              </p>
            </div>
          </div>
        </div>

        {/* DFW Deep Dive */}
        <div style={{
          background: "linear-gradient(135deg, #1A1A2E, #2D1B69)",
          border: "1px solid rgba(124,58,237,0.4)",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{
              background: "#10B981", borderRadius: 20,
              padding: "2px 10px", fontSize: 11, fontWeight: 700, color: "#fff",
            }}>LIVE</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#E2E8F0" }}>Dallas-Fort Worth — Home Market</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
            {[
              { label: "Active partners",    value: "147",    color: "#A78BFA" },
              { label: "ZIP coverage",        value: "89/342", color: "#00B5B8" },
              { label: "Coverage %",          value: "26%",    color: "#F59E0B" },
              { label: "Monthly MRR",         value: "$147K",  color: "#34D399" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ textAlign: "center" as const }}>
                <div style={{ fontSize: 24, fontWeight: 800, color, marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 14, padding: "10px 14px",
            background: "rgba(255,255,255,0.04)", borderRadius: 10,
            fontSize: 13, color: "#94A3B8",
          }}>
            <Clock size={13} color="#64748B" style={{ marginRight: 6, verticalAlign: "middle" }} />
            <strong style={{ color: "#C4B5FD" }}>18 months</strong> estimated to full DFW ZIP coverage at current growth rate
          </div>
        </div>

        {/* Houston Next Market */}
        <div style={{
          background: "#1E293B", border: "1px solid #F59E0B44",
          borderRadius: 16, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Target size={18} color="#F59E0B" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#E2E8F0" }}>Next Market: Houston</span>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "#F59E0B",
              background: "rgba(245,158,11,0.12)", borderRadius: 20, padding: "2px 10px",
            }}>Target Q3 2026</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 10 }}>
            {HOUSTON_CHECKLIST.map(({ label, done, Icon }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                background: done ? "rgba(16,185,129,0.06)" : "rgba(239,68,68,0.06)",
                borderRadius: 10,
                border: done ? "1px solid rgba(16,185,129,0.2)" : "1px solid rgba(239,68,68,0.2)",
              }}>
                {done
                  ? <CheckCircle size={16} color="#10B981" />
                  : <XCircle size={16} color="#EF4444" />
                }
                <span style={{ fontSize: 14, color: done ? "#86EFAC" : "#FCA5A5" }}>{label}</span>
              </div>
            ))}
          </div>
          <Button
            onClick={() => window.location.href = "/admin/broadcast?city=houston"}
            style={{
              marginTop: 16, background: "#F59E0B", color: "#1C1917",
              fontWeight: 700, borderRadius: 10, padding: "10px 22px",
              border: "none", cursor: "pointer", fontSize: 14,
            }}
          >
            Start Houston Recruitment →
          </Button>
        </div>

        {/* Market Pipeline Table */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 14 }}>Market pipeline</h2>
          <Card style={{ background: "#1E293B", border: "1px solid #334155", overflow: "hidden" }}>
            <CardContent style={{ padding: 0 }}>
              {/* Table header */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 80px 100px 80px 90px",
                gap: 0, padding: "10px 20px",
                background: "#0F172A", borderBottom: "1px solid #334155",
              }}>
                {["Market", "Population", "TAM ($B)", "Pipeline", "HO Interest", "Readiness", "Status"].map(h => (
                  <div key={h} style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</div>
                ))}
              </div>
              {MARKETS.map((row, i) => {
                const cfg = STATUS_CFG[row.status];
                const isHovered = hovered === i;
                return (
                  <div
                    key={row.market}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1fr 1fr 80px 100px 80px 90px",
                      padding: "13px 20px", alignItems: "center",
                      borderBottom: i < MARKETS.length - 1 ? "1px solid #293548" : "none",
                      background: isHovered ? "rgba(255,255,255,0.03)" : "transparent",
                      transition: "background 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <MapPin size={14} color={cfg.color} />
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>{row.market}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#94A3B8" }}>{row.population}</div>
                    <div style={{ fontSize: 13, color: "#94A3B8" }}>{row.tam}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#E2E8F0" }}>{row.pipeline}</div>
                    <div style={{ fontSize: 13, color: "#94A3B8" }}>{row.homeownerInterest.toLocaleString()}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{
                          flex: 1, height: 6, background: "#0F172A",
                          borderRadius: 3, overflow: "hidden",
                        }}>
                          <div style={{
                            width: `${row.readiness}%`, height: "100%",
                            background: cfg.color, borderRadius: 3,
                          }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: cfg.color, minWidth: 28 }}>
                          {row.readiness}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        fontSize: 11, fontWeight: 700, color: cfg.color,
                        background: cfg.bg, border: `1px solid ${cfg.border}`,
                        borderRadius: 20, padding: "3px 10px",
                      }}>{row.status}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Cost Model */}
        <div style={{
          background: "#1E293B", border: "1px solid #334155",
          borderRadius: 14, padding: "20px 24px", marginBottom: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <BarChart3 size={18} color="#00B5B8" />
            <span style={{ fontSize: 16, fontWeight: 700, color: "#E2E8F0" }}>Expansion cost model</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              { label: "Partner recruitment",  amount: "$15K", desc: "Initial market entry" },
              { label: "Homeowner marketing",  amount: "$5K",  desc: "Demand generation" },
              { label: "Runway required",       amount: "3 mo", desc: "Before self-sustaining" },
            ].map(({ label, amount, desc }) => (
              <div key={label} style={{
                background: "#0F172A", borderRadius: 10,
                padding: "14px 16px", textAlign: "center" as const,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#00B5B8", marginBottom: 4 }}>{amount}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#E2E8F0", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 11, color: "#64748B" }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
            borderRadius: 10, padding: "12px 16px",
            fontSize: 14, color: "#6EE7B7", lineHeight: 1.5,
          }}>
            <strong style={{ color: "#34D399" }}>ROI break-even at 50 active partners</strong> — generating ~$7,350/mo in subscription revenue alone.
          </div>
        </div>

        {/* Expansion Timeline */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", marginBottom: 16 }}>Expansion timeline</h2>
          <div style={{
            background: "#1E293B", border: "1px solid #334155",
            borderRadius: 14, padding: "24px 28px",
          }}>
            <div style={{ display: "flex", alignItems: "center", position: "relative" as const }}>
              {/* connecting line */}
              <div style={{
                position: "absolute" as const,
                top: 14, left: 14, right: 14,
                height: 2, background: "#334155", zIndex: 0,
              }} />
              {TIMELINE.map((item, i) => (
                <div key={item.label} style={{
                  flex: 1, display: "flex", flexDirection: "column" as const,
                  alignItems: "center", position: "relative" as const, zIndex: 1,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: item.active ? "#7C3AED" : "#1E293B",
                    border: item.active ? "3px solid #A78BFA" : "2px solid #334155",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 10,
                    boxShadow: item.active ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                  }}>
                    {item.active && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: item.active ? "#C4B5FD" : "#E2E8F0",
                    marginBottom: 2, textAlign: "center" as const,
                  }}>{item.label}</div>
                  <div style={{
                    fontSize: 11, color: item.active ? "#A78BFA" : "#64748B",
                    textAlign: "center" as const,
                  }}>{item.period}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
