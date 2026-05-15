import { useState, useEffect } from "react";

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
    active: true,
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
  },
];

const RESULTS = [
  { icon: "✅", label: "Foundation", status: "Stable", confidence: 94, color: "#10B981" },
  { icon: "⚠️", label: "Roof Shingles", status: "Granule loss detected", confidence: 87, color: "#FACC15" },
  { icon: "✅", label: "Gutters", status: "Clear", confidence: 91, color: "#10B981" },
  { icon: "⚠️", label: "HVAC Unit", status: "Age: 9 years, service recommended", confidence: 82, color: "#FACC15" },
];

const scanLineStyle = `
@keyframes scanLine {
  0% { top: 10%; }
  100% { top: 90%; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
@keyframes borderPulse {
  0%, 100% { border-color: #4F46E5; box-shadow: 0 0 0 0 #4F46E5aa; }
  50% { border-color: #818cf8; box-shadow: 0 0 0 6px #4F46E500; }
}
@keyframes dot {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
`;

export default function ScanScreen() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div
      style={{
        width: 390,
        minHeight: 844,
        background: phase === 0 ? "#050d1a" : "#050d1a",
        color: "#F0F4FF",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{scanLineStyle}</style>

      {/* Status bar */}
      <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", fontSize: 12, fontWeight: 600, position: "relative", zIndex: 10 }}>
        <span>9:41</span>
        <span style={{ fontWeight: 700, fontSize: 14 }}>TrustyPro</span>
        <span>100%</span>
      </div>

      {/* ── Phase 0: Camera View ── */}
      {phase === 0 && (
        <>
          <div style={{ flex: 1, background: "#0a0a0a", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* Top right link */}
            <div style={{ position: "absolute", top: 12, right: 16, color: "#8899BB", fontSize: 12 }}>Scan History (47)</div>

            {/* Animated border overlay */}
            <div style={{
              width: 280,
              height: 320,
              border: "2px solid #4F46E5",
              borderRadius: 16,
              animation: "borderPulse 2s ease-in-out infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}>
              {/* Corner accents */}
              {[
                { top: -2, left: -2, borderRight: "none", borderBottom: "none" },
                { top: -2, right: -2, borderLeft: "none", borderBottom: "none" },
                { bottom: -2, left: -2, borderRight: "none", borderTop: "none" },
                { bottom: -2, right: -2, borderLeft: "none", borderTop: "none" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 24, height: 24, border: "3px solid #FACC15", borderRadius: 4, ...s }} />
              ))}
              <div style={{ textAlign: "center", color: "#8899BB" }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>🏠</div>
                <div style={{ fontSize: 13 }}>Point at your home</div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#F0F4FF" }}>Point at any part of your home</div>
              <div style={{ fontSize: 13, color: "#8899BB", marginTop: 6 }}>Tap to capture your home</div>
            </div>
          </div>

          {/* Shutter */}
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 0 16px", background: "#0a0a0a" }}>
            <button
              onClick={() => setPhase(1)}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#fff",
                border: "4px solid #8899BB",
                cursor: "pointer",
                boxShadow: "0 0 0 3px #0a0a0a, 0 0 0 6px #4F46E5",
              }}
            />
          </div>
        </>
      )}

      {/* ── Phase 1: Analyzing ── */}
      {phase === 1 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", background: "#0a0a0a" }}>
          {/* Blurred capture placeholder */}
          <div style={{ width: "100%", height: 380, background: "linear-gradient(180deg, #1a2a44 0%, #0a0a0a 100%)", position: "relative", overflow: "hidden", filter: "blur(2px)" }}>
            {/* Scanning line */}
            <div style={{
              position: "absolute",
              left: 0, right: 0,
              height: 2,
              background: "linear-gradient(90deg, transparent, #4F46E5, #818cf8, #4F46E5, transparent)",
              animation: "scanLine 1.5s linear infinite",
              boxShadow: "0 0 12px #4F46E5",
            }} />
          </div>
          <div style={{ textAlign: "center", padding: "24px 20px" }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>AI is analyzing your home...</div>
            <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 12 }}>
              {[0, 0.3, 0.6].map((delay, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#4F46E5", animation: `dot 1.4s ease-in-out ${delay}s infinite` }} />
              ))}
            </div>
            <div style={{ fontSize: 13, color: "#8899BB" }}>This takes about 5 seconds</div>
          </div>
        </div>
      )}

      {/* ── Phase 2: Results ── */}
      {phase === 2 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Photo placeholder */}
          <div style={{ flex: 1, background: "linear-gradient(180deg, #1a2a44 0%, #050d1a 100%)", minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", color: "#8899BB", fontSize: 13 }}>
            📸 Captured image
          </div>

          {/* Results card slides up */}
          <div style={{
            background: "#0F1E35",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            border: "1px solid #1E2E45",
            padding: "20px 20px 0",
            animation: "slideUp 0.4s ease-out",
          }}>
            <div style={{ width: 36, height: 4, background: "#1E2E45", borderRadius: 2, margin: "0 auto 16px" }} />
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📊 Scan Complete</div>
            {RESULTS.map((r) => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #1E2E4566" }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: "#8899BB" }}>{r.status}</div>
                </div>
                <div style={{ fontSize: 11, color: r.color, fontWeight: 600 }}>
                  {r.confidence}%
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "8px 12px", background: "#FACC1514", border: "1px solid #FACC1544", borderRadius: 10, fontSize: 13, color: "#FACC15", fontWeight: 600 }}>
              Fair — 2 items need attention
            </div>
            <div style={{ padding: "16px 0 8px", display: "flex", flexDirection: "column", gap: 10 }}>
              <button style={{ background: "#4F46E5", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
                Get Quotes for Issues
              </button>
              <button style={{ background: "transparent", color: "#8899BB", border: "1px solid #1E2E45", borderRadius: 12, padding: "13px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                Save to My Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ height: 83, background: "#0F1E35", borderTop: "1px solid #1E2E45", display: "flex", alignItems: "center", justifyContent: "space-around", paddingBottom: 16 }}>
        {NAV_ITEMS.map((item) =>
          item.raised ? (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: -20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px #4F46E566", color: "#fff" }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 10, color: "#4F46E5", fontWeight: 600 }}>{item.label}</span>
            </div>
          ) : (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ color: "#8899BB" }}>{item.icon}</div>
              <span style={{ fontSize: 10, color: "#8899BB" }}>{item.label}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
