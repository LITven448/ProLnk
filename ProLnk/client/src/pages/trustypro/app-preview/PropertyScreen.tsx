import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Home",
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
    active: true,
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

const SYSTEMS = [
  { emoji: "❄️", name: "HVAC", status: "Service due", detail: "9 years old", color: "#FACC15″, bg: "#1a1200" },
  { emoji: "💧", name: "Plumbing", status: "Good", detail: "Checked 6mo ago", color: "#10B981″, bg: "#001a0e" },
  { emoji: "🏠", name: "Roof", status: "Granule loss", detail: "Detected by scan", color: "#FACC15″, bg: "#1a1200" },
  { emoji: "⚡", name: "Electrical", status: "Good", detail: "Panel updated 2021″, color: "#10B981", bg: "#001a0e" },
  { emoji: "🏗️", name: "Foundation", status: "Stable", detail: "Scan confirmed", color: "#10B981″, bg: "#001a0e" },
  { emoji: "📋", name: "Appliances", status: "4 tracked", detail: "View inventory", color: "#8899BB", bg: "#0a1628″ },
  { emoji: "❓", name: "Windows", status: "Not logged", detail: "Tap to add", color: "#8899BB", bg: "#0a1628″ },
  { emoji: "🌿", name: "Landscaping", status: "Maintained", detail: "Last service 1mo", color: "#10B981″, bg: "#001a0e" },
];

const TABS = ["Systems", "History", "Documents", "Warranties"];

export default function PropertyScreen() {
  const [activeTab, setActiveTab] = useState("Systems");

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
      }}
    >
      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <span style={{ fontWeight: 700, fontSize: 14 }}>TrustyPro</span>
        <span>100%</span>
      </div>

      {/* Header */}
      <div style={{ padding: "8px 20px 0″ }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <svg width="18″ height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <div style={{ fontSize: 20, fontWeight: 700 }}>1234 Oak Creek Dr</div>
        </div>
        <div style={{ fontSize: 13, color: "#8899BB", paddingLeft: 28 }}>Frisco, TX 75034</div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, paddingLeft: 28, fontSize: 12, color: "#8899BB" }}>
          <span>Built 2015</span>
          <span>·</span>
          <span>2,400 sqft</span>
          <span>·</span>
          <span>4 bd / 3 ba</span>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", padding: "16px 20px 0″, gap: 0, borderBottom: "1px solid #1E2E45", marginTop: 12 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: activeTab === tab ? 700 : 400,
              color: activeTab === tab ? "#4F46E5″ : "#8899BB",
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #4F46E5″ : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Systems grid */}
      <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {SYSTEMS.map((sys) => (
            <div
              key={sys.name}
              style={{
                background: "#0F1E35″,
                border: `1px solid ${sys.color === "#10B981" ? "#10B98130" : sys.color === "#FACC15" ? "#FACC1530" : "#1E2E45"}`,
                borderRadius: 14,
                padding: "14px 12px",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{sys.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{sys.name}</div>
              <div style={{ fontSize: 11, color: sys.color, fontWeight: 600, marginBottom: 3 }}>{sys.status}</div>
              <div style={{ fontSize: 11, color: "#8899BB" }}>{sys.detail}</div>
              <div style={{ marginTop: 10, fontSize: 11, color: "#4F46E5″, fontWeight: 600 }}>Schedule →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ height: 83, background: "#0F1E35″, borderTop: "1px solid #1E2E45", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 16, flexShrink: 0 }}>
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
