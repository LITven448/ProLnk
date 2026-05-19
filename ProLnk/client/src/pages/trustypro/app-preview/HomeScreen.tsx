import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Home",
    active: true,
    icon: (
      <svg width="22″ height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22″/>
      </svg>
    ),
  },
  {
    label: "Scan",
    raised: true,
    icon: (
      <svg width="26″ height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12″ cy="13" r="4"/>
      </svg>
    ),
  },
  {
    label: "Property",
    icon: (
      <svg width="22″ height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2″ y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: "Find Pro",
    icon: (
      <svg width="22″ height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2″/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Alerts",
    icon: (
      <svg width="22″ height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9″/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
];

const TASKS = [
  { emoji: "❄️", name: "HVAC Filter Change", cost: "$15″, action: "Schedule", actionStyle: "teal" },
  { emoji: "🍂", name: "Gutter Inspection", cost: "$150″, action: "Schedule", actionStyle: "teal" },
  { emoji: "💧", name: "Foundation Watering", cost: "Free", action: "Remind me", actionStyle: "gray" },
];

const CHIPS = [
  { label: "Foundation", icon: "✅" },
  { label: "HVAC", icon: "⚠️" },
  { label: "Roof", icon: "✅" },
  { label: "Plumbing", icon: "✅" },
];

export default function HomeScreen() {
  const [dismissed, setDismissed] = useState(false);

  const score = 84;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: "#050d1a",
        color: "#F0F4FF",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Status bar */}
      <div style={{ height: 44, background: "#050d1a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <svg width="16″ height="11" viewBox="0 0 16 11" fill="#F0F4FF"><rect x="0" y="4" width="3" height="7" rx="1"/><rect x="4.5" y="2.5" width="3" height="8.5" rx="1"/><rect x="9" y="0.5" width="3" height="10.5" rx="1"/><rect x="13.5" y="0" width="2.5" height="11" rx="0.5" opacity="0.3"/></svg>
          <svg width="15″ height="11" viewBox="0 0 15 11" fill="#F0F4FF"><path d="M7.5 2.2C9.8 2.2 11.8 3.1 13.2 4.6L14.5 3.2C12.7 1.2 10.2 0 7.5 0C4.8 0 2.3 1.2 0.5 3.2L1.8 4.6C3.2 3.1 5.2 2.2 7.5 2.2Z" opacity="0.4"/><path d="M7.5 5C9 5 10.4 5.6 11.4 6.6L12.7 5.2C11.4 3.8 9.5 3 7.5 3C5.5 3 3.6 3.8 2.3 5.2L3.6 6.6C4.6 5.6 6 5 7.5 5Z" opacity="0.7"/><circle cx="7.5" cy="9.5" r="1.5"/></svg>
          <span style={{ fontSize: 12, fontWeight: 600 }}>100%</span>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 20px 16px" }}>
        <div>
          <div style={{ fontSize: 13, color: "#8899BB" }}>Good morning,</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>Sarah 👋</div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#4F46E5″, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700 }}>S</div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 10, height: 10, borderRadius: "50%", background: "#EF4444″, border: "2px solid #050d1a" }} />
        </div>
      </div>

      {/* Score Ring */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 20px 16px" }}>
        <div style={{ background: "#0F1E35″, borderRadius: 20, padding: "20px 24px", width: "100%", boxSizing: "border-box", border: "1px solid #1E2E45" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <svg width="130″ height="130" viewBox="0 0 130 130">
              <circle cx="65″ cy="65" r={radius} fill="none" stroke="#1E2E45" strokeWidth="10"/>
              <circle
                cx="65″ cy="65" r={radius}
                fill="none"
                stroke="#4F46E5″
                strokeWidth="10″
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 65 65)"
                style={{ filter: "drop-shadow(0 0 8px #4F46E5aa)" }}
              />
              <text x="65″ y="60" textAnchor="middle" fill="#F0F4FF" fontSize="28" fontWeight="700" fontFamily="-apple-system">{score}</text>
              <text x="65″ y="78" textAnchor="middle" fill="#8899BB" fontSize="11" fontFamily="-apple-system">out of 100</text>
            </svg>
            <div style={{ fontSize: 14, color: "#8899BB", marginTop: 4 }}>Home Health Score</div>
            <div style={{ background: "#10B98122″, color: "#10B981", border: "1px solid #10B98144", borderRadius: 20, padding: "3px 14px", fontSize: 12, fontWeight: 600, marginTop: 8 }}>Good</div>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 14, flexWrap: "wrap" }}>
            {CHIPS.map((c) => (
              <div key={c.label} style={{ background: "#0a1628″, border: "1px solid #1E2E45", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#C0CCEE", display: "flex", alignItems: "center", gap: 4 }}>
                {c.icon} {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Due This Month */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ background: "#0F1E35″, borderRadius: 16, border: "1px solid #1E2E45", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px 10px", fontSize: 13, fontWeight: 700, color: "#8899BB", textTransform: "uppercase", letterSpacing: "0.06em" }}>Due This Month</div>
          {TASKS.map((t, i) => (
            <div key={t.name} style={{ display: "flex", alignItems: "center", padding: "10px 16px", borderTop: i === 0 ? "1px solid #1E2E45″ : "1px solid #1E2E4566", gap: 12 }}>
              <span style={{ fontSize: 20 }}>{t.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#8899BB" }}>{t.cost}</div>
              </div>
              <button style={{ background: t.actionStyle === "teal" ? "#10B98122″ : "#1E2E45", color: t.actionStyle === "teal" ? "#10B981" : "#8899BB", border: t.actionStyle === "teal" ? "1px solid #10B98144" : "1px solid #1E2E45", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                {t.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Storm Alert */}
      {!dismissed && (
        <div style={{ padding: "0 20px 16px" }}>
          <div style={{ background: "#1a0e00″, border: "1px solid #FACC1566", borderRadius: 16, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#FACC15″, marginBottom: 4 }}>⚠️ Storm Alert</div>
                <div style={{ fontSize: 13, color: "#D4B88A", lineHeight: 1.5 }}>Hail warning for ZIP 75034 — inspect your roof within 72h</div>
                <button style={{ background: "none", border: "none", color: "#4F46E5″, fontSize: 13, fontWeight: 600, padding: "8px 0 0", cursor: "pointer" }}>Find a Roofer →</button>
              </div>
              <button onClick={() => setDismissed(true)} style={{ background: "none", border: "none", color: "#8899BB", fontSize: 18, cursor: "pointer", padding: "0 0 0 8px" }}>×</button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* CTA Button */}
      <div style={{ padding: "0 20px 16px" }}>
        <button style={{ width: "100%", background: "#4F46E5″, color: "#fff", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px #4F46E566", letterSpacing: "0.02em" }}>
          📷 Scan My Home
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{ height: 83, background: "#0F1E35″, borderTop: "1px solid #1E2E45", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 16 }}>
        {NAV_ITEMS.map((item) =>
          item.raised ? (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: -20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4F46E5″, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px #4F46E566", color: "#fff" }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 10, color: "#8899BB" }}>{item.label}</span>
            </div>
          ) : (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ color: item.active ? "#4F46E5″ : "#8899BB" }}>{item.icon}</div>
              <span style={{ fontSize: 10, color: item.active ? "#4F46E5″ : "#8899BB", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
