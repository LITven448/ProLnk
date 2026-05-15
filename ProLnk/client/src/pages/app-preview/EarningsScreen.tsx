import { useState } from "react";

const NAV = [
  { icon: "🏠", label: "Home", key: "home" },
  { icon: "⚡", label: "Leads", key: "leads", center: true },
  { icon: "$", label: "Earn", key: "earn" },
  { icon: "👥", label: "Network", key: "network" },
  { icon: "👤", label: "Profile", key: "profile" },
];

const COLORS = {
  bg: "#0A1628",
  card: "#152035",
  border: "#1E2E45",
  text: "#F0F4FF",
  muted: "#7A8BA8",
  yellow: "#F5E642",
  green: "#10B981",
};

const BARS = [120, 200, 165, 310, 280, 190, 420];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const STREAMS = [
  { label: "Job Commissions", amount: "$840", pct: 67, color: "#F5E642" },
  { label: "Network L1 Overrides", amount: "$247", pct: 50, color: "#F5E642CC" },
  { label: "Network L2 Overrides", amount: "$89", pct: 28, color: "#F5E64288" },
  { label: "Subscription Overrides", amount: "$71", pct: 22, color: "#F5E64260" },
  { label: "Origination Rights", amount: "$0", pct: 0, color: "#1E2E45", muted: true },
];

export default function EarningsScreen() {
  const [period, setPeriod] = useState<"Week" | "Month" | "YTD">("Month");
  const [navActive, setNavActive] = useState("earn");

  const maxBar = Math.max(...BARS);

  return (
    <div style={{ width: 390, minHeight: 844, background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", margin: "0 auto", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6 }}><span>●●●●</span><span>WiFi</span><span>🔋</span></div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>Earnings</div>
        {/* Period selector */}
        <div style={{ display: "flex", background: COLORS.card, borderRadius: 10, padding: 3, border: `1px solid ${COLORS.border}`, gap: 2 }}>
          {(["Week", "Month", "YTD"] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "5px 12px", fontSize: 12, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", background: period === p ? COLORS.yellow : "transparent", color: period === p ? COLORS.bg : COLORS.muted, transition: "all 0.15s" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {/* Big number */}
        <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
          <div style={{ fontSize: 52, fontWeight: 900, color: COLORS.yellow, lineHeight: 1 }}>$1,247</div>
          <div style={{ fontSize: 13, color: COLORS.green, marginTop: 8, fontWeight: 600 }}>This month · ↑ 12% vs last month</div>
        </div>

        {/* SVG Bar Chart */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "16px 14px 12px", border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Daily Earnings</div>
          <svg width="100%" height="80" viewBox="0 0 330 80" style={{ display: "block" }}>
            {BARS.map((v, i) => {
              const barH = Math.round((v / maxBar) * 60);
              const x = i * 47 + 6;
              const isToday = i === 6;
              return (
                <g key={i}>
                  <rect x={x} y={70 - barH} width={34} height={barH} rx={6} fill={isToday ? COLORS.yellow : "#F5E64233"} />
                  <text x={x + 17} y={78} textAnchor="middle" fontSize={10} fill={isToday ? COLORS.yellow : COLORS.muted}>{DAYS[i]}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Income stream breakdown */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Income Streams</div>
          {STREAMS.map((s) => (
            <div key={s.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: s.muted ? COLORS.muted : COLORS.text }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.muted ? COLORS.muted : COLORS.yellow }}>{s.amount}</span>
              </div>
              <div style={{ height: 6, background: COLORS.border, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${s.pct}%`, background: s.color, borderRadius: 3, transition: "width 0.5s" }} />
              </div>
              {s.muted && <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 3 }}>Add homes to earn origination rights</div>}
            </div>
          ))}
        </div>

        {/* Payout status */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Payout Status</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>Next sweep</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Tonight 2:00 AM</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>Pending</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.yellow }}>$312 · Job #4821</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: COLORS.muted }}>Bank</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Chase ••••4821</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ height: 80, background: COLORS.card, borderTop: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8px 8px", flexShrink: 0 }}>
        {NAV.map((item) =>
          item.center ? (
            <div key={item.key} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginTop: -20, boxShadow: `0 4px 16px ${COLORS.yellow}55` }}>
                <span style={{ color: COLORS.bg, fontWeight: 800 }}>⚡</span>
              </div>
              <span style={{ fontSize: 10, color: COLORS.muted, marginTop: 2 }}>{item.label}</span>
            </div>
          ) : (
            <button key={item.key} onClick={() => setNavActive(item.key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>
              <span style={{ fontSize: 20, opacity: navActive === item.key ? 1 : 0.4 }}>{item.icon}</span>
              <span style={{ fontSize: 10, color: navActive === item.key ? COLORS.yellow : COLORS.muted }}>{item.label}</span>
              {navActive === item.key && <div style={{ width: 4, height: 4, borderRadius: 2, background: COLORS.yellow }} />}
            </button>
          )
        )}
      </div>
    </div>
  );
}
