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
    icon: (
      <svg width="22″ height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2″ y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: "Find Pro",
    active: true,
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

const TRADES = [
  { label: "HVAC", emoji: "🌡️" },
  { label: "Plumbing", emoji: "💧" },
  { label: "Roofing", emoji: "🏠" },
  { label: "Electrical", emoji: "⚡" },
  { label: "Foundation", emoji: "🏗️" },
  { label: "Pest Control", emoji: "🐛" },
  { label: "Landscaping", emoji: "🌿" },
  { label: "Handyman", emoji: "🔧" },
];

const PROS = [
  { name: "Marcus Rivera", trade: "HVAC", rating: 4.9, reviews: 84, dist: "2.3mi", price: "$89–150″, verified: true, aiMatch: true },
  { name: "David Chen", trade: "HVAC", rating: 4.7, reviews: 62, dist: "3.1mi", price: "$79–140″, verified: true, aiMatch: false },
  { name: "Sarah Williams", trade: "HVAC", rating: 4.8, reviews: 91, dist: "4.2mi", price: "$95–160″, verified: true, aiMatch: false },
];

const FILTERS = ["Available Now", "4.5★+", "Verified"];

export default function FindProScreen() {
  const [selectedTrade, setSelectedTrade] = useState<string | null>("HVAC");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Verified"]);

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);

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
      <div style={{ padding: "8px 20px 14px" }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Find a Pro</div>
        {/* Search bar */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#0F1E35″, border: "1px solid #1E2E45", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16″ height="16" viewBox="0 0 24 24" fill="none" stroke="#8899BB" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span style={{ fontSize: 14, color: "#8899BB" }}>What do you need?</span>
          </div>
          <div style={{ background: "#0F1E35″, border: "1px solid #4F46E5", borderRadius: 12, padding: "10px 12px", fontSize: 12, color: "#8899BB", whiteSpace: "nowrap" }}>
            📍 75034
          </div>
        </div>
      </div>

      {/* Trade grid */}
      <div style={{ padding: "0 20px 14px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {TRADES.map((t) => (
            <button
              key={t.label}
              onClick={() => setSelectedTrade(t.label)}
              style={{
                background: selectedTrade === t.label ? "#4F46E5″ : "#0F1E35",
                border: selectedTrade === t.label ? "1px solid #4F46E5″ : "1px solid #1E2E45",
                borderRadius: 12,
                padding: "10px 4px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                cursor: "pointer",
                color: "#F0F4FF",
              }}
            >
              <span style={{ fontSize: 20 }}>{t.emoji}</span>
              <span style={{ fontSize: 10, fontWeight: 600 }}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedTrade && (
        <>
          {/* Filter chips */}
          <div style={{ display: "flex", gap: 8, padding: "0 20px 14px", overflowX: "auto" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                style={{
                  background: activeFilters.includes(f) ? "#4F46E522″ : "#0F1E35",
                  border: activeFilters.includes(f) ? "1px solid #4F46E5″ : "1px solid #1E2E45",
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontSize: 12,
                  color: activeFilters.includes(f) ? "#818cf8″ : "#8899BB",
                  fontWeight: activeFilters.includes(f) ? 600 : 400,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* AI recommendation */}
          <div style={{ margin: "0 20px 12px", background: "#4F46E514″, border: "1px solid #4F46E544", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, color: "#818cf8″, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>✨ AI Recommendation</div>
            <div style={{ fontSize: 13, color: "#C0CCEE", lineHeight: 1.5 }}>Based on your scan results, <span style={{ color: "#F0F4FF", fontWeight: 700 }}>Marcus R.</span> is a great match for HVAC service</div>
          </div>

          {/* Pro cards */}
          <div style={{ flex: 1, padding: "0 20px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
            {PROS.map((pro, i) => (
              <div
                key={pro.name}
                style={{
                  background: "#0F1E35″,
                  border: i === 0 ? "1px solid #4F46E566″ : "1px solid #1E2E45",
                  borderRadius: 16,
                  padding: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#4F46E5″, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
                    {pro.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{pro.name}</span>
                      {pro.verified && <span style={{ fontSize: 10, background: "#10B98122″, color: "#10B981", border: "1px solid #10B98144", borderRadius: 10, padding: "1px 6px" }}>✅ Verified</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "#8899BB", marginTop: 2 }}>
                      {pro.trade} · ⭐ {pro.rating} ({pro.reviews} reviews) · {pro.dist}
                    </div>
                    <div style={{ fontSize: 12, color: "#C0CCEE", marginTop: 2 }}>{pro.price}</div>
                  </div>
                </div>
                <button style={{ marginTop: 10, width: "100%", background: "#FACC15″, color: "#050d1a", border: "none", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bottom Nav */}
      <div style={{ height: 83, background: "#0F1E35″, borderTop: "1px solid #1E2E45", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 16, marginTop: 12, flexShrink: 0 }}>
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
