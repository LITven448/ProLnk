import { useState, useEffect } from "react";

const NAV = [
  { icon: "🏠", label: "Home", key: "home" },
  { icon: "⚡", label: "Leads", key: "leads", center: true },
  { icon: "$", label: "Earn", key: "earn" },
  { icon: "👥", label: "Network", key: "network" },
  { icon: "👤", label: "Profile", key: "profile" },
];

const COLORS = {
  bg: "#0A1628″,
  card: "#152035″,
  border: "#1E2E45″,
  text: "#F0F4FF",
  muted: "#7A8BA8″,
  yellow: "#F5E642″,
  green: "#10B981″,
  red: "#EF4444″,
  amber: "#F59E0B",
  blue: "#3B82F6″,
};

export default function HomeScreen() {
  const [active, setActive] = useState("home");
  const [timeLeft, setTimeLeft] = useState(13338);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m.toString().padStart(2, "0")}m ${sec.toString().padStart(2, "0")}s`;
  };

  return (
    <div style={{ width: 390, minHeight: 844, background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", position: "relative", margin: "0 auto", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span>●●●●</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 20px 16px" }}>
        <div>
          <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>ProLnk Partner</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>Good morning, Marcus ☀️</div>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 21, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: COLORS.bg }}>M</div>
      </div>

      {/* Stat grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 16px 16px" }}>
        {[
          { label: "Active Leads", value: "3″, color: COLORS.yellow },
          { label: "Jobs This Month", value: "8″, color: COLORS.green },
          { label: "Network Recruits", value: "12″, color: COLORS.yellow },
          { label: "Month Earnings", value: "$1,247″, color: COLORS.green, large: true },
        ].map((s) => (
          <div key={s.label} style={{ background: COLORS.card, borderRadius: 14, padding: "14px 16px", border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: s.large ? 22 : 26, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Priority feed */}
      <div style={{ padding: "0 16px", flex: 1 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Priority Actions</div>

        {/* Card 1 — Red */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: "14px 16px", borderLeft: `4px solid ${COLORS.red}`, border: `1px solid ${COLORS.border}`, borderLeftColor: COLORS.red, marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>⚡ New lead expiring</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>HVAC emergency · 1234 Oak Creek Dr, Frisco</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: COLORS.red, fontWeight: 600 }}>⏱ {fmt(timeLeft)} left</span>
            <button style={{ background: COLORS.yellow, color: COLORS.bg, border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Accept Now</button>
          </div>
        </div>

        {/* Card 2 — Amber */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: "14px 16px", borderLeft: `4px solid ${COLORS.amber}`, border: `1px solid ${COLORS.border}`, borderLeftColor: COLORS.amber, marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>📋 Quote pending</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>John M. hasn't replied in 48h</div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ background: "transparent", color: COLORS.yellow, border: `1px solid ${COLORS.yellow}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Follow Up</button>
          </div>
        </div>

        {/* Card 3 — Green */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: "14px 16px", borderLeft: `4px solid ${COLORS.green}`, border: `1px solid ${COLORS.border}`, borderLeftColor: COLORS.green, marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>✅ Job #4821 complete</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>$312 commission queued</div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ background: "transparent", color: COLORS.green, border: `1px solid ${COLORS.green}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Payout</button>
          </div>
        </div>

        {/* Card 4 — Blue */}
        <div style={{ background: COLORS.card, borderRadius: 14, padding: "14px 16px", borderLeft: `4px solid ${COLORS.blue}`, border: `1px solid ${COLORS.border}`, borderLeftColor: COLORS.blue, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>📸 Upload more photos</div>
          <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 8 }}>Upload 3 more to unlock 2 AI-detected leads</div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={{ background: "transparent", color: COLORS.blue, border: `1px solid ${COLORS.blue}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Upload Photos</button>
          </div>
        </div>

        {/* Big CTA */}
        <button style={{ width: "100%", background: COLORS.yellow, color: COLORS.bg, border: "none", borderRadius: 14, padding: "16px 20px", fontSize: 15, fontWeight: 800, cursor: "pointer", marginBottom: 20 }}>
          📷 Upload Job Photos — Generate Leads
        </button>
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
            <button key={item.key} onClick={() => setActive(item.key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>
              <span style={{ fontSize: 20, filter: active === item.key ? "brightness(10)" : "none", opacity: active === item.key ? 1 : 0.4 }}>{item.icon}</span>
              <span style={{ fontSize: 10, color: active === item.key ? COLORS.yellow : COLORS.muted }}>{item.label}</span>
              {active === item.key && <div style={{ width: 4, height: 4, borderRadius: 2, background: COLORS.yellow }} />}
            </button>
          )
        )}
      </div>
    </div>
  );
}
