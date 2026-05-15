import { useState } from "react";

const NAV_ITEMS = [
  {
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    label: "Scan",
    raised: true,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    label: "Property",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: "Find Pro",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    label: "Alerts",
    active: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
];

const TABS = ["All", "Urgent", "Deals", "Maintenance"];

const ALERTS = [
  {
    id: 1,
    type: "urgent",
    icon: "🔴",
    borderColor: "#EF4444",
    bg: "#1a0505",
    title: "Storm Alert",
    body: "Hail warning: ZIP 75034 — inspect your roof within 72 hours",
    time: "2h ago",
    action: "Find a Roofer",
    actionColor: "#EF4444",
    actionBg: "#EF444420",
  },
  {
    id: 2,
    type: "urgent",
    icon: "🟡",
    borderColor: "#FACC15",
    bg: "#1a1200",
    title: "Recall Notice",
    body: "Product recall: GE panel model XA48 — check if your home is affected",
    time: "1d ago",
    action: "Check My Home",
    actionColor: "#FACC15",
    actionBg: "#FACC1520",
  },
  {
    id: 3,
    type: "deal",
    icon: "🔵",
    borderColor: "#4F46E5",
    bg: "#0a0a1f",
    title: "Group Deal",
    body: "HVAC Pre-Season Tune-up — 8 of 10 neighbors joined · $89 (normally $149)",
    time: "1d ago",
    action: null,
    progress: { current: 8, total: 10 },
    joinBtn: true,
  },
  {
    id: 4,
    type: "maintenance",
    icon: "🟢",
    borderColor: "#10B981",
    bg: "#001a0e",
    title: "Maintenance Due",
    body: "HVAC filter due — 94 days since last change. Prevent coil freeze.",
    time: "2d ago",
    action: "Schedule Service",
    actionColor: "#10B981",
    actionBg: "#10B98120",
  },
  {
    id: 5,
    type: "insight",
    icon: "🔵",
    borderColor: "#3B82F6",
    bg: "#050d1a",
    title: "Home Insight",
    body: "Your roof is 9 years old — peak DFW hail season starts April",
    time: "3d ago",
    action: "View Report",
    actionColor: "#3B82F6",
    actionBg: "#3B82F620",
  },
];

export default function AlertsScreen() {
  const [activeTab, setActiveTab] = useState("All");
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  const visible = ALERTS.filter((a) => !dismissed.has(a.id));

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
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 20px 0" }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Alerts</div>
        <div style={{ background: "#EF4444", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 700, color: "#fff" }}>4 unread</div>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", padding: "12px 20px 0", gap: 0, borderBottom: "1px solid #1E2E45" }}>
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
              color: activeTab === tab ? "#4F46E5" : "#8899BB",
              cursor: "pointer",
              borderBottom: activeTab === tab ? "2px solid #4F46E5" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Alert feed */}
      <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {visible.map((alert) => (
          <div
            key={alert.id}
            style={{
              background: alert.bg,
              border: `1px solid ${alert.borderColor}`,
              borderLeft: `4px solid ${alert.borderColor}`,
              borderRadius: 14,
              padding: "14px",
              position: "relative",
            }}
          >
            {/* Dismiss button */}
            <button
              onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
              style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", color: "#8899BB", fontSize: 16, cursor: "pointer", lineHeight: 1 }}
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <span style={{ fontSize: 18 }}>{alert.icon}</span>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{alert.title}</span>
                  <span style={{ fontSize: 11, color: "#8899BB" }}>{alert.time}</span>
                </div>
                <div style={{ fontSize: 13, color: "#C0CCEE", lineHeight: 1.5, marginBottom: 10 }}>{alert.body}</div>

                {/* Progress bar for group deal */}
                {alert.progress && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8899BB", marginBottom: 4 }}>
                      <span>{alert.progress.current} of {alert.progress.total} neighbors joined</span>
                      <span style={{ color: "#4F46E5", fontWeight: 600 }}>{Math.round((alert.progress.current / alert.progress.total) * 100)}%</span>
                    </div>
                    <div style={{ height: 6, background: "#1E2E45", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(alert.progress.current / alert.progress.total) * 100}%`, background: "#4F46E5", borderRadius: 3 }} />
                    </div>
                  </div>
                )}

                {/* Action button */}
                {alert.joinBtn ? (
                  <button style={{ background: "#FACC15", color: "#050d1a", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                    Join Group Deal
                  </button>
                ) : alert.action ? (
                  <button style={{ background: alert.actionBg, color: alert.actionColor, border: `1px solid ${alert.actionColor}44`, borderRadius: 10, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    {alert.action}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}

        {visible.length === 0 && (
          <div style={{ textAlign: "center", color: "#8899BB", paddingTop: 60 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>All clear!</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>No active alerts</div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ height: 83, background: "#0F1E35", borderTop: "1px solid #1E2E45", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 16, flexShrink: 0 }}>
        {NAV_ITEMS.map((item) =>
          item.raised ? (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: -20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px #4F46E566", color: "#fff" }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 10, color: "#8899BB" }}>{item.label}</span>
            </div>
          ) : (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ color: item.active ? "#4F46E5" : "#8899BB" }}>{item.icon}</div>
              <span style={{ fontSize: 10, color: item.active ? "#4F46E5" : "#8899BB", fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
