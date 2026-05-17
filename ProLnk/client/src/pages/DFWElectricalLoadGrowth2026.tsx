import { useState } from 'react';

const loads = [
  { item: "Original 1980s DFW Home (100A panel)", amps: 60, color: "#86efac", desc: "Central AC 30A + range 40A + water heater 30A — manageable with 100A service in 1985" },
  { item: "Modern EV Charger (Level 2)", amps: 50, color: "#fde68a", desc: "Tesla/Ford Level 2 EVSE requires dedicated 50A/240V circuit — largest single addition to most DFW homes" },
  { item: "Replacement HVAC Unit (modern)", amps: 40, color: "#fde68a", desc: "Modern 5-ton DFW units draw 35–45A at startup. Two-stage units peak at startup, then reduce to 20–25A" },
  { item: "Home Office + Smart Home", amps: 20, color: "#93c5fd", desc: "Dual monitors, standing desk, mesh WiFi, smart switches, security system — easily 20A continuous" },
  { item: "Induction Range (replacing gas)", amps: 50, color: "#fca5a5", desc: "DFW trend: converting from gas to induction. 40–50A required vs 30A for electric resistance. Game-changer for old panels." },
];

export default function DFWElectricalLoadGrowth2026() {
  const [panel, setPanel] = useState<"100" | "200" | "400">("100");
  const [hasEV, setHasEV] = useState(false);
  const [hasInduction, setHasInduction] = useState(false);
  const [hasOffice, setHasOffice] = useState(false);

  const base = 60;
  const additions = (hasEV ? 50 : 0) + (hasInduction ? 50 : 0) + (hasOffice ? 20 : 0);
  const total = base + additions;
  const panelCap = { "100": 80, "200": 160, "400": 320 }[panel];
  const remaining = panelCap - total;
  const status = remaining < 0 ? "danger" : remaining < 30 ? "warning" : "ok";
  const statusColor = { danger: "#fca5a5", warning: "#fde68a", ok: "#86efac" }[status];
  const statusLabel = { danger: "UPGRADE NOW", warning: "AT CAPACITY", ok: "Adequate" }[status];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⚡</div>
          <h1 style={{ color: "#F5E642", fontSize: "1.8rem", fontWeight: 700, margin: 0 }}>DFW Electrical Load Growth Guide 2026</h1>
          <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>How DFW homes outgrow their panels — and when to upgrade to 200A or 400A service</p>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #F5E64244" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0, fontSize: "1.1rem" }}>🧮 Panel Capacity Calculator</h2>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Current Panel Size:</label>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              {(["100", "200", "400"] as const).map(p => (
                <button key={p} onClick={() => setPanel(p)}
                  style={{ flex: 1, padding: "0.7rem", borderRadius: 7, border: `2px solid ${panel === p ? "#F5E642" : "#1e3a5f"}`, background: panel === p ? "#1a3a5c" : "#0A1628", color: panel === p ? "#F5E642" : "#94a3b8", cursor: "pointer", fontWeight: 700 }}>
                  {p}A Service
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ color: "#94a3b8", fontSize: "0.9rem", display: "block", marginBottom: "0.5rem" }}>Planned Additions:</label>
            {[
              { label: "EV Charger (Level 2)", val: hasEV, set: setHasEV, amps: 50 },
              { label: "Induction Range", val: hasInduction, set: setHasInduction, amps: 50 },
              { label: "Home Office", val: hasOffice, set: setHasOffice, amps: 20 },
            ].map((item, i) => (
              <div key={i} onClick={() => item.set(!item.val)}
                style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0.8rem", background: item.val ? "#1a3a5c" : "#0A1628", borderRadius: 7, marginBottom: "0.4rem", cursor: "pointer", border: `1px solid ${item.val ? "#F5E642" : "#1e3a5f"}` }}>
                <span style={{ color: item.val ? "#F5E642" : "#94a3b8" }}>{item.val ? "☑" : "☐"} {item.label}</span>
                <span style={{ color: "#fca5a5", fontWeight: 700 }}>+{item.amps}A</span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.8rem" }}>
            {[
              { label: "Estimated Load", val: `${total}A`, icon: "⚡" },
              { label: "Panel Capacity", val: `${panelCap}A usable`, icon: "🔌" },
              { label: "Status", val: statusLabel, icon: "📊", color: statusColor },
            ].map((r, i) => (
              <div key={i} style={{ background: "#0A1628", borderRadius: 8, padding: "1rem", textAlign: "center", border: `1px solid ${r.color || "#1e3a5f"}` }}>
                <div style={{ fontSize: "1.4rem" }}>{r.icon}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.75rem", marginTop: "0.3rem" }}>{r.label}</div>
                <div style={{ color: r.color || "#F5E642", fontWeight: 700, marginTop: "0.2rem" }}>{r.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#0f2035", borderRadius: 10, padding: "1.2rem", border: "1px solid #1e3a5f" }}>
          <h3 style={{ color: "#F5E642", marginTop: 0 }}>📋 DFW Electrical Upgrade Truth</h3>
          <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.7 }}>200A service is now the minimum for modern DFW living. 400A is recommended if adding EV + solar + induction range. Underground service upgrades in DFW typically cost $3,000–$8,000 depending on meter location and ONCOR coordination. Plan 6–8 weeks for utility coordination in DFW metro.</p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#475569", fontSize: "0.8rem" }}>
          ProLnk DFW Electrical Guide 2026 · Panel Upgrade Planning · Connect with licensed DFW electricians
        </div>
      </div>
    </div>
  );
}