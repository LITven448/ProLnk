import { useState } from "react";
import HomeownerLayout from "@/components/HomeownerLayout";
import {
  DollarSign, AlertTriangle, TrendingUp,
  CheckCircle, Calendar, Wrench, Droplets, Shield, Home,
} from "lucide-react";

const BUDGET_SLICES = [
  { label: "Mortgage",    amount: 2100, color: "#00D4FF" },
  { label: "Utilities",   amount: 587,  color: "#A855F7″ },
  { label: "Maintenance", amount: 200,  color: "#00E676″ },
  { label: "Insurance",   amount: 270,  color: "#FFB300″ },
  { label: "HOA",         amount: 185,  color: "#F97316″ },
];

const TOTAL = BUDGET_SLICES.reduce((s, b) => s + b.amount, 0);

const UPCOMING = [
  { label: "HVAC tune-up",              date: "May 2026″,  cost: "$150",        status: "scheduled", icon: Wrench },
  { label: "Roof inspection",           date: "Jun 2026″,  cost: "$200",        status: "upcoming",  icon: Home },
  { label: "Foundation check",          date: "Sept 2026″, cost: "$150",        status: "upcoming",  icon: Shield },
  { label: "Water heater replacement",  date: "2027 est.", cost: "$800–$1,200″, status: "planning",  icon: Droplets },
];

const STATUS_COLOR: Record<string, string> = {
  scheduled: "#00E676″,
  upcoming:  "#00D4FF",
  planning:  "#FFB300″,
};

function DonutChart() {
  const r = 70;
  const cx = 90;
  const cy = 90;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const slices = BUDGET_SLICES.map((b) => {
    const pct = b.amount / TOTAL;
    const dash = pct * circumference;
    const gap = circumference - dash;
    const rotation = offset * 360;
    offset += pct;
    return { ...b, dash, gap, rotation };
  });

  return (
    <svg width="180″ height="180" viewBox="0 0 180 180">
      {slices.map((s, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="22″
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={0}
          transform={`rotate(${s.rotation * 360 / (2 * Math.PI) - 90} ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      ))}
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#F0F2FF" fontSize="18″ fontWeight="700">${TOTAL.toLocaleString()}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#8B91A8″ fontSize="10">/month</text>
    </svg>
  );
}

export default function SmartBudgetPlanner() {
  const [activeSlice, setActiveSlice] = useState<string | null>(null);

  return (
    <HomeownerLayout homeownerName="" homeownerAddress="">
      <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "32px 24px", fontFamily: "'Inter',system-ui,sans-serif" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#00D4FF22,#00D4FF44)", border: "1px solid #00D4FF40″, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <DollarSign size={22} color="#00D4FF" />
            </div>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: "#F0F2FF", margin: 0 }}>Smart Budget Planner</h1>
              <p style={{ fontSize: 13, color: "#8B91A8″, margin: 0 }}>Plan for every expense before it surprises you</p>
            </div>
          </div>
        </div>

        {/* Monthly Budget Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: "24px", marginBottom: 20, alignItems: "center" }}>
          <DonutChart />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8″, textTransform: "uppercase", marginBottom: 12 }}>Monthly Breakdown</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BUDGET_SLICES.map((b) => (
                <div
                  key={b.label}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: 8, cursor: "default", background: activeSlice === b.label ? `${b.color}18` : "transparent", transition: "background 0.2s" }}
                  onMouseEnter={() => setActiveSlice(b.label)}
                  onMouseLeave={() => setActiveSlice(null)}
                >
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: b.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#F0F2FF", flex: 1 }}>{b.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: b.color }}>${b.amount.toLocaleString()}</span>
                  <span style={{ fontSize: 11, color: "#8B91A8″, width: 32, textAlign: "right" }}>{Math.round(b.amount / TOTAL * 100)}%</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: "8px 10px", borderRadius: 8, background: "#1A1E2A", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#8B91A8″ }}>Total Monthly</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: "#F0F2FF" }}>${TOTAL.toLocaleString()}/mo</span>
            </div>
          </div>
        </div>

        {/* Two column: Maintenance Fund + Emergency Fund */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {/* Annual Maintenance Fund */}
          <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8″, textTransform: "uppercase", marginBottom: 12 }}>Annual Maintenance Fund</p>
            <p style={{ fontSize: 13, color: "#8B91A8″, marginBottom: 12, lineHeight: 1.6 }}>
              Recommended: <strong style={{ color: "#F0F2FF" }}>1–2% of home value per year</strong>
            </p>
            <div style={{ background: "#1A1E2A", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#8B91A8″ }}>Your home estimate</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#00D4FF" }}>$4,850–$9,700/yr</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#8B91A8″ }}>Currently saving</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#00E676″ }}>$200/mo ($2,400/yr)</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#FFB30022″, border: "1px solid #FFB30040" }}>
              <AlertTriangle size={14} color="#FFB300″ />
              <span style={{ fontSize: 12, color: "#FFB300″ }}>Underfunded vs. recommended minimum</span>
            </div>
          </div>

          {/* Emergency Fund */}
          <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8″, textTransform: "uppercase", marginBottom: 12 }}>Emergency Fund Status</p>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#F0F2FF" }}>Currently saved</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: "#00E676″ }}>$2,400</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#8B91A8″ }}>Recommended (3–6 mo)</span>
                <span style={{ fontSize: 12, color: "#8B91A8″ }}>$3,600–$7,200</span>
              </div>
              {/* Progress bar */}
              <div style={{ height: 8, borderRadius: 4, background: "#1A1E2A", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "67%", background: "linear-gradient(90deg,#00E676,#00D4FF)", borderRadius: 4, transition: "width 0.8s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 11, color: "#8B91A8″ }}>67% funded</span>
                <span style={{ fontSize: 11, color: "#8B91A8″ }}>Goal: $3,600</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: "#FFB30022″, border: "1px solid #FFB30040" }}>
              <AlertTriangle size={14} color="#FFB300″ />
              <span style={{ fontSize: 12, color: "#FFB300″ }}>$1,200 short of minimum</span>
            </div>
          </div>
        </div>

        {/* Upcoming Expenses */}
        <div style={{ background: "#13161E", borderRadius: 16, border: "1px solid #252A3A", padding: 20, marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#8B91A8″, textTransform: "uppercase", marginBottom: 16 }}>Upcoming Expenses — Next 12 Months</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {UPCOMING.map((u) => {
              const Icon = u.icon;
              const col = STATUS_COLOR[u.status];
              return (
                <div key={u.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, background: "#1A1E2A" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${col}18`, border: `1px solid ${col}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color={col} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#F0F2FF", margin: 0 }}>{u.label}</p>
                    <p style={{ fontSize: 11, color: "#8B91A8″, margin: 0 }}>{u.date}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: col, margin: 0 }}>{u.cost}</p>
                    <p style={{ fontSize: 10, color: "#8B91A8″, margin: 0, textTransform: "capitalize" }}>{u.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Budget Alerts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {[
            { title: "Maintenance Funding Gap", body: "You're underfunding home maintenance by $204/mo based on your home's estimated value and current savings rate." },
            { title: "Emergency Fund Gap", body: "No dedicated emergency fund for major appliance failure. A single water heater or HVAC replacement could deplete your savings." },
          ].map((a) => (
            <div key={a.title} style={{ display: "flex", gap: 12, padding: 16, borderRadius: 12, background: "#FFB30012″, border: "1px solid #FFB30040" }}>
              <AlertTriangle size={18} color="#FFB300″ style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#FFB300″, margin: "0 0 4px" }}>{a.title}</p>
                <p style={{ fontSize: 12, color: "#8B91A8″, margin: 0, lineHeight: 1.5 }}>{a.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Savings Recommendation */}
        <div style={{ display: "flex", gap: 12, padding: 18, borderRadius: 12, background: "linear-gradient(135deg,#00E67612,#00D4FF12)", border: "1px solid #00E67630″, alignItems: "center" }}>
          <TrendingUp size={22} color="#00E676″ style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#00E676″, margin: "0 0 3px" }}>Savings Recommendation</p>
            <p style={{ fontSize: 13, color: "#8B91A8″, margin: 0 }}>Add <strong style={{ color: "#F0F2FF" }}>$204/mo</strong> to your maintenance savings to reach full funding by end of year. Consider auto-transferring after your next paycheck.</p>
          </div>
          <button style={{ padding: "8px 18px", borderRadius: 8, background: "#00E676″, color: "#0A1628", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
            Set Up Savings
          </button>
        </div>

      </div>
    </HomeownerLayout>
  );
}
