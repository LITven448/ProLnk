import { useState } from "react";

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
};

const STEPS = [
  { label: "Accepted", state: "done" },
  { label: "En Route", state: "done" },
  { label: "On Site", state: "active" },
  { label: "Complete", state: "pending" },
];

export default function JobDocScreen() {
  const [navActive, setNavActive] = useState("leads");
  const [photos, setPhotos] = useState<("before" | "after" | null)[]>(["before", "after", null]);
  const [notes, setNotes] = useState("Replaced capacitor, recharged refrigerant, system running...");

  const photoCount = photos.filter(Boolean).length;
  const canComplete = photoCount >= 3;

  const handleAddPhoto = () => {
    setPhotos(["before", "after", "added"]);
  };

  return (
    <div style={{ width: 390, minHeight: 844, background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", flexDirection: "column", margin: "0 auto", overflow: "hidden" }}>
      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600 }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 6 }}><span>●●●●</span><span>WiFi</span><span>🔋</span></div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 20px 4px" }}>
        <button style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 10, width: 36, height: 36, color: COLORS.text, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>Job #4821</span>
            <span style={{ background: `${COLORS.amber}22`, border: `1px solid ${COLORS.amber}`, borderRadius: 7, padding: "2px 8px", fontSize: 11, fontWeight: 700, color: COLORS.amber }}>In Progress</span>
          </div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 1 }}>HVAC · Frisco TX</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {/* Progress bar */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: "16px 14px", border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {STEPS.map((step, i) => (
              <div key={step.label} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 14,
                    background: step.state === "done" ? COLORS.green : step.state === "active" ? COLORS.yellow : COLORS.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700,
                    color: step.state === "pending" ? COLORS.muted : COLORS.bg,
                  }}>
                    {step.state === "done" ? "✓" : step.state === "active" ? "●" : "○"}
                  </div>
                  <div style={{ fontSize: 9, color: step.state === "active" ? COLORS.yellow : step.state === "done" ? COLORS.green : COLORS.muted, fontWeight: step.state === "active" ? 700 : 400, whiteSpace: "nowrap" }}>
                    {step.label}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: step.state === "done" ? COLORS.green : COLORS.border, margin: "0 4px", marginBottom: 16 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Photo grid */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Job Photos</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {/* Before */}
            <div style={{ aspectRatio: "1″, borderRadius: 10, background: "linear-gradient(135deg, #1E3A5F, #152035)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.green}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 6, right: 6, width: 18, height: 18, borderRadius: 9, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
              <span style={{ fontSize: 22 }}>📷</span>
              <span style={{ fontSize: 9, color: COLORS.muted, marginTop: 4 }}>Before</span>
            </div>
            {/* After */}
            <div style={{ aspectRatio: "1″, borderRadius: 10, background: "linear-gradient(135deg, #1E3A5F, #152035)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.green}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 6, right: 6, width: 18, height: 18, borderRadius: 9, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
              <span style={{ fontSize: 22 }}>📷</span>
              <span style={{ fontSize: 9, color: COLORS.muted, marginTop: 4 }}>After</span>
            </div>
            {/* Add photo slot */}
            {photos[2] ? (
              <div style={{ aspectRatio: "1″, borderRadius: 10, background: "linear-gradient(135deg, #1E3A5F, #152035)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${COLORS.green}`, position: "relative" }}>
                <div style={{ position: "absolute", top: 6, right: 6, width: 18, height: 18, borderRadius: 9, background: COLORS.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
                <span style={{ fontSize: 22 }}>📷</span>
                <span style={{ fontSize: 9, color: COLORS.green, marginTop: 4 }}>Added</span>
              </div>
            ) : (
              <button onClick={handleAddPhoto} style={{ aspectRatio: "1″, borderRadius: 10, background: "transparent", border: `2px dashed ${COLORS.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 24, color: COLORS.muted }}>📷</span>
                <span style={{ fontSize: 9, color: COLORS.muted, marginTop: 4 }}>+ Add photo</span>
              </button>
            )}
          </div>

          {/* Warning */}
          {!canComplete && (
            <div style={{ marginTop: 10, background: `${COLORS.amber}18`, border: `1px solid ${COLORS.amber}55`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: COLORS.amber }}>
              ⚠️ 1 more photo required to complete job
            </div>
          )}
        </div>

        {/* Site notes */}
        <div style={{ background: COLORS.card, borderRadius: 16, padding: 16, border: `1px solid ${COLORS.border}`, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: COLORS.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Site Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            style={{ width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "10px 12px", color: COLORS.text, fontSize: 13, resize: "none", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* Earnings preview */}
        <div style={{ background: `${COLORS.yellow}12`, borderRadius: 16, padding: 14, border: `1px solid ${COLORS.yellow}44`, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.yellow }}>$312 commission</div>
              <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2 }}>releases when homeowner confirms ✓</div>
            </div>
            <div style={{ fontSize: 26 }}>💰</div>
          </div>
        </div>

        {/* Complete button */}
        <button
          onClick={canComplete ? undefined : handleAddPhoto}
          style={{
            width: "100%",
            background: canComplete ? COLORS.yellow : COLORS.border,
            color: canComplete ? COLORS.bg : COLORS.muted,
            border: "none",
            borderRadius: 14,
            padding: "17px 20px",
            fontSize: 15,
            fontWeight: 800,
            cursor: canComplete ? "pointer" : "not-allowed",
            marginBottom: 8,
            transition: "all 0.2s",
          }}
        >
          {canComplete ? "✅ Complete Job" : "🔒 Complete Job"}
        </button>
        {!canComplete && (
          <div style={{ textAlign: "center", fontSize: 12, color: COLORS.muted, marginBottom: 16 }}>
            Upload 1 more photo to unlock
          </div>
        )}
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
