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
};

export default function LeadDetailScreen() {
  const [active, setActive] = useState("leads");
  const [secs, setSecs] = useState(13338);
  const [declined, setDeclined] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const isUrgent = secs < 7200;

  return (
    <div style={{ width: 390, minHeight: 844, background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", margin: "0 auto", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6 }}><span>●●●●</span><span>WiFi</span><span>🔋</span></div>
      </div>

      {/* Back + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px 16px" }}>
        <button style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, width: 36, height: 36, color: COLORS.text, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Lead #4821</div>
          <div style={{ fontSize: 11, color: COLORS.muted }}>HVAC Emergency</div>
        </div>
        <div style={{ marginLeft: "auto", background: "#EF44441A", border: `1px solid ${COLORS.red}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, color: COLORS.red, fontWeight: 600 }}>HOT</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {/* Lead summary card */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 18, border: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Lead Details</div>
          {[
            { icon: "📍", label: "Property", value: "1234 Oak Creek Dr, Frisco TX 75034″ },
            { icon: "🔧", label: "Service", value: "HVAC emergency — AC not cooling" },
            { icon: "👤", label: "Homeowner", value: "Sarah M." },
            { icon: "📏", label: "Distance", value: "2.3 miles away" },
            { icon: "💵", label: "Job Estimate", value: "$800 – $1,500″ },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, marginTop: 1 }}>{row.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: COLORS.muted }}>{row.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 1 }}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Earnings preview */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 18, border: `2px solid ${COLORS.yellow}`, marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.yellow }}>Your Estimated Commission</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.yellow }}>$312</div>
          </div>
          <div style={{ background: "#0A162880″, borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 4 }}>Breakdown</div>
            <div style={{ fontSize: 12, color: COLORS.text }}>$1,100 avg job × 28.4% commission tier = <span style={{ color: COLORS.yellow, fontWeight: 700 }}>$312</span></div>
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 10 }}>
            Arrives via Stripe within 2 business days after job confirmation
          </div>
        </div>

        {/* Timer */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 18, border: `1px solid ${isUrgent ? COLORS.red : COLORS.border}`, marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Expires In</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: isUrgent ? COLORS.red : COLORS.text, letterSpacing: 2, fontVariantNumeric: "tabular-nums" }}>
            ⏱ {h}:{m.toString().padStart(2, "0″)}:{s.toString().padStart(2, "0")}
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 6 }}>2 other pros are viewing this lead</div>
        </div>

        {/* Action buttons */}
        <button
          onClick={() => setAccepted(true)}
          style={{ width: "100%", background: accepted ? COLORS.green : COLORS.yellow, color: COLORS.bg, border: "none", borderRadius: 14, padding: "17px 20px", fontSize: 16, fontWeight: 800, cursor: "pointer", marginBottom: 10, transition: "background 0.2s" }}
        >
          {accepted ? "✅ Lead Accepted!" : "✅ Accept Lead"}
        </button>
        <button
          onClick={() => setDeclined(true)}
          style={{ width: "100%", background: "transparent", color: declined ? COLORS.red : COLORS.muted, border: `1px solid ${declined ? COLORS.red : COLORS.border}`, borderRadius: 14, padding: "15px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginBottom: 20 }}
        >
          {declined ? "Lead Declined" : "✗ Decline"}
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
              <span style={{ fontSize: 20, opacity: active === item.key ? 1 : 0.4 }}>{item.icon}</span>
              <span style={{ fontSize: 10, color: active === item.key ? COLORS.yellow : COLORS.muted }}>{item.label}</span>
              {active === item.key && <div style={{ width: 4, height: 4, borderRadius: 2, background: COLORS.yellow }} />}
            </button>
          )
        )}
      </div>
    </div>
  );
}
