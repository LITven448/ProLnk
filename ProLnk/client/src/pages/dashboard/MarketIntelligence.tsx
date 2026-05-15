import React from 'react';
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  TrendingUp, MapPin, Home, Users, DollarSign, Zap,
  Star, AlertCircle, ChevronRight, BarChart2,
} from "lucide-react";
import { Link } from "wouter";

// ─── Static DFW market data ───────────────────────────────────────────────────

const TRADE_DEMAND: Record<string, number[]> = {
  HVAC:      [42, 48, 65, 80, 100, 98, 95, 88, 60, 50, 38, 35],
  Plumbing:  [70, 68, 72, 75, 78, 80, 82, 80, 74, 70, 65, 68],
  Roofing:   [50, 55, 80, 90, 78, 55, 50, 52, 55, 85, 70, 45],
  Electrical:[60, 62, 65, 68, 72, 75, 70, 68, 65, 62, 58, 60],
  Painting:  [40, 45, 65, 80, 85, 75, 60, 65, 75, 70, 50, 38],
  Landscaping:[35, 45, 70, 85, 90, 80, 65, 70, 80, 70, 45, 32],
  General:   [55, 58, 65, 70, 75, 72, 68, 65, 68, 65, 55, 52],
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TOP_SERVICES: Record<string, { service: string; requests: number; trend: string }[]> = {
  HVAC: [
    { service: "AC tune-up / pre-season check", requests: 342, trend: "+28%" },
    { service: "AC not cooling — diagnostic", requests: 289, trend: "+41%" },
    { service: "Thermostat replacement", requests: 178, trend: "+12%" },
    { service: "Ductwork inspection", requests: 134, trend: "+8%" },
    { service: "Refrigerant recharge", requests: 97, trend: "+19%" },
  ],
  Plumbing: [
    { service: "Leak detection & repair", requests: 410, trend: "+15%" },
    { service: "Water heater service", requests: 267, trend: "+9%" },
    { service: "Drain cleaning / clog", requests: 234, trend: "+6%" },
    { service: "Toilet repair / replacement", requests: 189, trend: "+4%" },
    { service: "Water pressure issues", requests: 122, trend: "+11%" },
  ],
  Roofing: [
    { service: "Storm damage inspection", requests: 388, trend: "+52%" },
    { service: "Shingle replacement", requests: 244, trend: "+18%" },
    { service: "Roof inspection (pre-sale)", requests: 178, trend: "+23%" },
    { service: "Gutter cleaning & repair", requests: 145, trend: "+7%" },
    { service: "Flat roof repair", requests: 88, trend: "+14%" },
  ],
  General: [
    { service: "AC service calls", requests: 342, trend: "+28%" },
    { service: "Plumbing leak detection", requests: 289, trend: "+15%" },
    { service: "Roof inspection", requests: 244, trend: "+18%" },
    { service: "Electrical panel check", requests: 178, trend: "+9%" },
    { service: "Exterior painting", requests: 145, trend: "+12%" },
  ],
};

const PRICE_GUIDES: Record<string, { job: string; low: string; market: string; premium: string }[]> = {
  HVAC: [
    { job: "AC Tune-Up", low: "$79", market: "$129", premium: "$189" },
    { job: "AC Diagnostic", low: "$89", market: "$149", premium: "$225" },
    { job: "Thermostat Install", low: "$125", market: "$195", premium: "$295" },
    { job: "Refrigerant Recharge (R-410A)", low: "$150", market: "$275", premium: "$400" },
    { job: "Capacitor Replacement", low: "$120", market: "$220", premium: "$320" },
    { job: "Contactor Replacement", low: "$130", market: "$230", premium: "$330" },
    { job: "Blower Motor Replacement", low: "$350", market: "$550", premium: "$850" },
    { job: "Compressor Replacement", low: "$800", market: "$1,400", premium: "$2,200" },
    { job: "New HVAC System (3-ton)", low: "$4,200", market: "$6,500", premium: "$10,000" },
    { job: "Ductwork Sealing", low: "$300", market: "$550", premium: "$900" },
    { job: "Air Handler Service", low: "$150", market: "$250", premium: "$375" },
    { job: "Coil Cleaning", low: "$100", market: "$175", premium: "$275" },
    { job: "Filter Replacement (media)", low: "$45", market: "$85", premium: "$150" },
    { job: "UV Air Purifier Install", low: "$250", market: "$450", premium: "$750" },
    { job: "Mini-Split Install", low: "$1,200", market: "$2,000", premium: "$3,500" },
    { job: "Heat Pump Service", low: "$130", market: "$220", premium: "$350" },
    { job: "Annual Maintenance Plan", low: "$129", market: "$189", premium: "$299" },
    { job: "Duct Leak Test", low: "$150", market: "$275", premium: "$450" },
    { job: "Zone Control Install", low: "$800", market: "$1,500", premium: "$2,800" },
    { job: "Emergency After-Hours Call", low: "$195", market: "$299", premium: "$450" },
  ],
  Plumbing: [
    { job: "Drain Cleaning (snake)", low: "$95", market: "$149", premium: "$225" },
    { job: "Leak Detection", low: "$150", market: "$275", premium: "$450" },
    { job: "Toilet Replacement", low: "$250", market: "$400", premium: "$650" },
    { job: "Faucet Replacement", low: "$120", market: "$220", premium: "$375" },
    { job: "Water Heater Replacement (40gal)", low: "$900", market: "$1,400", premium: "$2,200" },
    { job: "Garbage Disposal Install", low: "$150", market: "$250", premium: "$400" },
    { job: "Pipe Repair (section)", low: "$200", market: "$450", premium: "$800" },
    { job: "Sewer Line Camera", low: "$200", market: "$350", premium: "$550" },
    { job: "Water Pressure Regulator", low: "$200", market: "$350", premium: "$550" },
    { job: "Shut-Off Valve Replacement", low: "$125", market: "$225", premium: "$375" },
    { job: "Tankless Water Heater Install", low: "$1,200", market: "$2,200", premium: "$3,800" },
    { job: "Hose Bib Replacement", low: "$95", market: "$165", premium: "$275" },
    { job: "Sump Pump Install", low: "$400", market: "$700", premium: "$1,100" },
    { job: "Whole-House Re-pipe (partial)", low: "$2,500", market: "$5,000", premium: "$9,000" },
    { job: "Gas Line Leak Check", low: "$175", market: "$295", premium: "$475" },
    { job: "Water Softener Install", low: "$600", market: "$1,100", premium: "$2,000" },
    { job: "Backflow Preventer Test", low: "$75", market: "$125", premium: "$200" },
    { job: "Bathtub Drain Repair", low: "$95", market: "$175", premium: "$300" },
    { job: "Sewer Line Repair (spot)", low: "$800", market: "$1,800", premium: "$3,500" },
    { job: "Emergency After-Hours Call", low: "$195", market: "$299", premium: "$450" },
  ],
  Roofing: [
    { job: "Roof Inspection", low: "$Free", market: "$150", premium: "$300" },
    { job: "Shingle Repair (per square)", low: "$150", market: "$275", premium: "$450" },
    { job: "Ridge Cap Replacement", low: "$300", market: "$550", premium: "$900" },
    { job: "Flashing Repair", low: "$200", market: "$375", premium: "$600" },
    { job: "Gutter Cleaning", low: "$95", market: "$175", premium: "$275" },
    { job: "Gutter Guard Install (linear ft)", low: "$5", market: "$10", premium: "$18" },
    { job: "Skylight Repair / Reseal", low: "$200", market: "$400", premium: "$700" },
    { job: "Full Roof Replacement (2,000 sq ft)", low: "$6,500", market: "$12,000", premium: "$20,000" },
    { job: "Storm Damage Assessment", low: "$Free", market: "$200", premium: "$450" },
    { job: "Chimney Cap Repair", low: "$150", market: "$300", premium: "$550" },
    { job: "Flat Roof Patch", low: "$300", market: "$650", premium: "$1,200" },
    { job: "Underlayment Replacement", low: "$500", market: "$950", premium: "$1,800" },
    { job: "Ventilation Upgrade", low: "$350", market: "$700", premium: "$1,300" },
    { job: "Soffit & Fascia Repair", low: "$400", market: "$800", premium: "$1,600" },
    { job: "Drip Edge Install", low: "$200", market: "$375", premium: "$650" },
    { job: "Roof Coating (flat)", low: "$1.50/sqft", market: "$2.50/sqft", premium: "$4/sqft" },
    { job: "Ice & Water Shield Upgrade", low: "$400", market: "$750", premium: "$1,400" },
    { job: "Decking Replacement (partial)", low: "$350", market: "$650", premium: "$1,100" },
    { job: "Attic Insulation (blown-in)", low: "$1,200", market: "$2,200", premium: "$3,800" },
    { job: "Emergency Tarp Service", low: "$250", market: "$450", premium: "$750" },
  ],
  General: [
    { job: "HVAC Tune-Up", low: "$79", market: "$129", premium: "$189" },
    { job: "Drain Cleaning", low: "$95", market: "$149", premium: "$225" },
    { job: "Roof Inspection", low: "$Free", market: "$150", premium: "$300" },
    { job: "Electrical Panel Inspection", low: "$150", market: "$250", premium: "$450" },
    { job: "Interior Painting (room)", low: "$350", market: "$600", premium: "$1,100" },
    { job: "Fence Repair (section)", low: "$200", market: "$375", premium: "$700" },
    { job: "Pressure Washing (exterior)", low: "$200", market: "$400", premium: "$700" },
    { job: "Deck Staining", low: "$350", market: "$650", premium: "$1,200" },
    { job: "Garage Door Tune-Up", low: "$75", market: "$135", premium: "$225" },
    { job: "Ceiling Fan Install", low: "$85", market: "$150", premium: "$275" },
    { job: "Toilet Repair", low: "$95", market: "$175", premium: "$300" },
    { job: "Window Screen Repair", low: "$45", market: "$85", premium: "$150" },
    { job: "Attic Insulation Check", low: "$Free", market: "$150", premium: "$300" },
    { job: "Smoke Detector Install", low: "$45", market: "$85", premium: "$150" },
    { job: "Door Lock Replacement", low: "$85", market: "$165", premium: "$300" },
    { job: "Gutter Cleaning", low: "$95", market: "$175", premium: "$275" },
    { job: "Sprinkler Inspection", low: "$85", market: "$150", premium: "$275" },
    { job: "Drywall Patch (small)", low: "$150", market: "$275", premium: "$500" },
    { job: "Caulking (bath/kitchen)", low: "$95", market: "$175", premium: "$325" },
    { job: "Emergency After-Hours Call", low: "$195", market: "$299", premium: "$450" },
  ],
};

const SERVICE_AREA_DATA: Record<string, { homes: number; monthlyRequests: number; avgJobValue: number; competitionDensity: number }> = {
  HVAC:       { homes: 84_200, monthlyRequests: 1_840, avgJobValue: 425, competitionDensity: 38 },
  Plumbing:   { homes: 84_200, monthlyRequests: 2_140, avgJobValue: 380, competitionDensity: 54 },
  Roofing:    { homes: 84_200, monthlyRequests: 1_260, avgJobValue: 3_800, competitionDensity: 22 },
  Electrical: { homes: 84_200, monthlyRequests: 980, avgJobValue: 520, competitionDensity: 31 },
  Painting:   { homes: 84_200, monthlyRequests: 620, avgJobValue: 1_100, competitionDensity: 67 },
  Landscaping:{ homes: 84_200, monthlyRequests: 1_420, avgJobValue: 290, competitionDensity: 88 },
  General:    { homes: 84_200, monthlyRequests: 1_580, avgJobValue: 480, competitionDensity: 45 },
};

const OPPORTUNITY_SCORES: Record<string, number> = {
  HVAC: 91,
  Plumbing: 78,
  Roofing: 85,
  Electrical: 72,
  Painting: 58,
  Landscaping: 63,
  General: 70,
};

const TRADES = ["HVAC", "Plumbing", "Roofing", "Electrical", "Painting", "Landscaping", "General"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  return "Moderate";
}

function fmt(n: number): string {
  return n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : String(n);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MarketIntelligence() {
  const [trade, setTrade] = useState("HVAC");
  const currentMonth = new Date().getMonth();
  const area = SERVICE_AREA_DATA[trade] ?? SERVICE_AREA_DATA["General"];
  const demand = TRADE_DEMAND[trade] ?? TRADE_DEMAND["General"];
  const services = TOP_SERVICES[trade] ?? TOP_SERVICES["General"];
  const prices = PRICE_GUIDES[trade] ?? PRICE_GUIDES["General"];
  const score = OPPORTUNITY_SCORES[trade] ?? 70;
  const sColor = scoreColor(score);

  const chartData = MONTHS.map((m, i) => ({
    month: m,
    demand: demand[i] ?? 50,
    isCurrent: i === currentMonth,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#e5e7eb", fontFamily: "sans-serif", padding: "32px 24px" }}>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <Link href="/dashboard" style={{ color: "#6b7280", fontSize: 13, textDecoration: "none" }}>
            Dashboard
          </Link>
          <ChevronRight size={14} color="#6b7280" />
          <span style={{ color: "#e5e7eb", fontSize: 13 }}>Market Intelligence</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#fff", margin: 0 }}>DFW Market Intelligence</h1>
            <p style={{ color: "#9ca3af", fontSize: 14, margin: "4px 0 0" }}>
              Real-time demand signals and pricing data for the Dallas-Fort Worth metro
            </p>
          </div>

          {/* Trade selector */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TRADES.map(t => (
              <button
                key={t}
                onClick={() => setTrade(t)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid",
                  borderColor: trade === t ? "#22c55e" : "#374151",
                  background: trade === t ? "rgba(34,197,94,0.12)" : "transparent",
                  color: trade === t ? "#22c55e" : "#9ca3af",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* ── Row 1: Service Area Overview ─────────────────────────────────── */}
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>
            My Service Area Overview · DFW Metro (50-mile radius)
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 }}>
            <StatCard
              icon={<Home size={18} color="#22c55e" />}
              label="Estimated Homes in Area"
              value={fmt(area.homes)}
              sub="Dallas-Fort Worth metro"
              accent="#22c55e"
            />
            <StatCard
              icon={<TrendingUp size={18} color="#3b82f6" />}
              label="Monthly Service Requests"
              value={fmt(area.monthlyRequests)}
              sub={`${trade} in DFW this month`}
              accent="#3b82f6"
            />
            <StatCard
              icon={<DollarSign size={18} color="#f59e0b" />}
              label="Avg Job Value"
              value={`$${area.avgJobValue.toLocaleString()}`}
              sub="Based on completed jobs"
              accent="#f59e0b"
            />
            <StatCard
              icon={<Users size={18} color="#8b5cf6" />}
              label="Active Competitors"
              value={String(area.competitionDensity)}
              sub="Licensed pros in your trade/area"
              accent="#8b5cf6"
            />
          </div>
        </section>

        {/* ── Row 2: Opportunity Score + Seasonal Demand ───────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20, marginBottom: 28, flexWrap: "wrap" as any }}>
          {/* Opportunity Score */}
          <div style={{ background: "#1a1d27", borderRadius: 14, border: "1px solid #1e2330", padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Zap size={16} color="#f59e0b" />
              <span style={{ color: "#9ca3af", fontSize: 13, fontWeight: 500 }}>Job Opportunity Score</span>
            </div>

            {/* Score ring */}
            <div style={{ position: "relative", width: 130, height: 130 }}>
              <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="65" cy="65" r="55" fill="none" stroke="#1e2330" strokeWidth="12" />
                <circle
                  cx="65" cy="65" r="55"
                  fill="none"
                  stroke={sColor}
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 55}`}
                  strokeDashoffset={`${2 * Math.PI * 55 * (1 - score / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 34, fontWeight: 800, color: sColor }}>{score}</span>
                <span style={{ fontSize: 11, color: "#6b7280" }}>/ 100</span>
              </div>
            </div>

            <div style={{ background: `${sColor}1a`, border: `1px solid ${sColor}4d`, borderRadius: 8, padding: "6px 16px", fontSize: 14, fontWeight: 600, color: sColor }}>
              {scoreLabel(score)}
            </div>

            <p style={{ color: "#6b7280", fontSize: 12, textAlign: "center", margin: 0, lineHeight: 1.5 }}>
              {score >= 80
                ? "High demand, low competition. Now is the best time to take on more jobs."
                : score >= 60
                ? "Solid demand. Opportunities available — stay active for best results."
                : "Market is active but competitive. Focus on reviews and service speed."}
            </p>
          </div>

          {/* Seasonal Demand Chart */}
          <div style={{ background: "#1a1d27", borderRadius: 14, border: "1px solid #1e2330", padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <BarChart2 size={16} color="#3b82f6" />
              <span style={{ color: "#d1d5db", fontSize: 14, fontWeight: 600 }}>Seasonal Demand Index — {trade}</span>
            </div>
            <p style={{ color: "#6b7280", fontSize: 12, margin: "0 0 16px" }}>
              Monthly demand intensity (100 = peak). Texas-calibrated for DFW weather patterns.
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} barSize={22}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2330" />
                <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 110]} />
                <Tooltip
                  contentStyle={{ background: "#1a1d27", border: "1px solid #374151", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#e5e7eb" }}
                  itemStyle={{ color: "#9ca3af" }}
                  formatter={(v: any) => [`${v} / 100`, "Demand Index"]}
                />
                <Bar dataKey="demand" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={entry.isCurrent ? "#22c55e" : idx === currentMonth - 1 || idx === currentMonth + 1 ? "#3b82f6" : "#1e3a5f"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p style={{ color: "#4b5563", fontSize: 11, margin: "8px 0 0", textAlign: "center" }}>
              Green bar = current month
            </p>
          </div>
        </div>

        {/* ── Row 3: Top Requested Services ────────────────────────────────── */}
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: "0 0 14px" }}>
            Top Requested Services This Week · {trade}
          </h2>
          <div style={{ background: "#1a1d27", borderRadius: 14, border: "1px solid #1e2330", overflow: "hidden" }}>
            {services.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 20px",
                  borderBottom: i < services.length - 1 ? "1px solid #1e2330" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: i === 0 ? "rgba(34,197,94,0.15)" : "rgba(59,130,246,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                    color: i === 0 ? "#22c55e" : "#3b82f6",
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ color: "#e5e7eb", fontSize: 14 }}>{s.service}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ color: "#6b7280", fontSize: 13 }}>{s.requests.toLocaleString()} requests</span>
                  <span style={{
                    background: "rgba(34,197,94,0.1)", color: "#22c55e",
                    border: "1px solid rgba(34,197,94,0.25)",
                    fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
                  }}>
                    {s.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Row 4: Price Guide ───────────────────────────────────────────── */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <Star size={16} color="#f59e0b" />
            <h2 style={{ fontSize: 16, fontWeight: 600, color: "#d1d5db", margin: 0 }}>
              "What Should I Charge?" — DFW Price Guide · {trade}
            </h2>
          </div>
          <div style={{ background: "#1a1d27", borderRadius: 14, border: "1px solid #1e2330", overflow: "hidden" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 100px 100px 100px",
              padding: "10px 20px",
              background: "#141720",
              borderBottom: "1px solid #1e2330",
            }}>
              <span style={{ color: "#6b7280", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Job Type</span>
              <span style={{ color: "#6b7280", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Low</span>
              <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Market</span>
              <span style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Premium</span>
            </div>
            {prices.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 100px 100px",
                  padding: "11px 20px",
                  borderBottom: i < prices.length - 1 ? "1px solid #1e2330" : "none",
                  background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                }}
              >
                <span style={{ color: "#d1d5db", fontSize: 13 }}>{p.job}</span>
                <span style={{ color: "#9ca3af", fontSize: 13, textAlign: "right" }}>{p.low}</span>
                <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 600, textAlign: "right" }}>{p.market}</span>
                <span style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, textAlign: "right" }}>{p.premium}</span>
              </div>
            ))}
          </div>
          <p style={{ color: "#4b5563", fontSize: 12, margin: "8px 0 0" }}>
            <AlertCircle size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            Prices reflect DFW market averages. Premium pricing applies to verified pros with 4.8+ star ratings.
          </p>
        </section>
      </div>
    </div>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, accent }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div style={{
      background: "#1a1d27",
      borderRadius: 14,
      border: "1px solid #1e2330",
      padding: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        {icon}
        <span style={{ color: "#9ca3af", fontSize: 12, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: accent, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#4b5563", fontSize: 12, marginTop: 6 }}>{sub}</div>
    </div>
  );
}
