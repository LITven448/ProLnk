import { useState } from 'react';

const ercotLevels = [
  { level: "Normal Operations", color: "#22C55E", description: "Grid operating normally. No demand response active. Good time to pre-cool home if afternoon event expected." },
  { level: "ERCOT Watch", color: "#F59E0B", description: "Reserves tightening. Demand response programs may activate. Smart thermostats auto-adjust if enrolled." },
  { level: "ERCOT Warning", color: "#EF4444″, description: "Grid stress high. Demand response events active. Enrolled homeowners receive payments now. Reduce HVAC load." },
  { level: "ERCOT Emergency", color: "#DC2626″, description: "Critical grid stress. Maximum demand response. Premium payments ($1.50-2.00/kWh). Reduce all non-essential loads." }
];

const setupOptions = [
  { setup: "Basic thermostat (no smart control)", eligible: false, payment: "$0″, note: "Not eligible for ERCOT demand response programs" },
  { setup: "Smart thermostat (Ecobee, Nest, Honeywell T9)", eligible: true, payment: "$0.50-0.75/kWh", note: "Enroll via Oncor Smart Savers or your retail provider" },
  { setup: "Smart thermostat + smart meter (AMS)", eligible: true, payment: "$0.75-1.25/kWh", note: "Oncor's Advanced Meter enables real-time price response" },
  { setup: "Full smart home (EV charger + smart thermostat + battery)", eligible: true, payment: "$1.50-2.00/kWh", note: "Maximum earnings — EV and battery can dispatch during events" }
];

export default function DFWHVACERCOTDemandGuide2026() {
  const [setup, setSetup] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const selected = setupOptions[setup];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: "#F5E642″, fontWeight: 700, letterSpacing: 1 }}>DFW ENERGY GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#FFFFFF", marginBottom: 8 }}>⚡ HVAC & ERCOT Demand Response</h1>
        <p style={{ color: "#9BA3B8″, marginBottom: 28, lineHeight: 1.6 }}>
          DFW homeowners with smart thermostats can earn money by reducing HVAC usage during ERCOT grid stress events — typically summer afternoons from 3-7 PM.
        </p>

        <div style={{ background: "#111E33″, borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 14 }}>📊 ERCOT Grid Alert Levels</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ercotLevels.map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: l.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: l.color, fontSize: 14 }}>{l.level}</div>
                  <div style={{ color: "#9BA3B8″, fontSize: 13 }}>{l.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#111E33″, borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid #1E2D4A" }}>
          <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 16 }}>💰 Your Demand Response Opportunity</h2>
          <label style={{ display: "block", color: "#9BA3B8″, fontSize: 13, marginBottom: 8 }}>Select Your Smart Home Setup</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
            {setupOptions.map((s, i) => (
              <button key={i} onClick={() => { setSetup(i); setShowDetail(false); }}
                style={{ textAlign: "left", padding: "12px 16px", borderRadius: 8, background: setup === i ? "#0D1F3C" : "#0A1628″,
                  border: `1px solid ${setup === i ? "#F5E642" : "#2A3A5A"}`, color: "#E8EAF0″, cursor: "pointer", fontSize: 14 }}>
                {s.setup}
              </button>
            ))}
          </div>
          <button onClick={() => setShowDetail(true)}
            style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 24px", fontWeight: 700, fontSize: 15, cursor: "pointer", width: "100%" }}>
            Show My ERCOT Opportunity
          </button>
        </div>

        {showDetail && (
          <div style={{ background: "#0D1F3C", borderRadius: 12, padding: 20, border: `2px solid ${selected.eligible ? "#F5E642" : "#9BA3B8"}` }}>
            <h3 style={{ color: selected.eligible ? "#F5E642″ : "#9BA3B8", marginBottom: 12 }}>
              {selected.eligible ? "✅ Eligible for Demand Response" : "❌ Not Currently Eligible"}
            </h3>
            <div style={{ marginBottom: 10 }}>
              <span style={{ color: "#9BA3B8″ }}>Estimated Payment: </span>
              <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 18 }}>{selected.payment}</span>
            </div>
            <div style={{ color: "#C8CEDF", marginBottom: 12 }}>{selected.note}</div>
            {selected.eligible && (
              <div style={{ padding: 12, background: "#111E33″, borderRadius: 8, color: "#9BA3B8", fontSize: 13 }}>
                💡 How to enroll: Contact your retail electricity provider (Reliant, TXU, Green Mountain) and ask about their demand response program. Oncor also offers Smart Savers directly.
              </div>
            )}
            {!selected.eligible && (
              <div style={{ padding: 12, background: "#111E33″, borderRadius: 8, color: "#F5E642", fontSize: 13 }}>
                ⬆️ Upgrade to a smart thermostat ($150-300 installed) and start earning on ERCOT events within 30 days.
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: "#111E33″, borderRadius: 10, border: "1px solid #1E2D4A", color: "#9BA3B8", fontSize: 13, lineHeight: 1.7 }}>
          <strong style={{ color: "#F5E642″ }}>ProLnk DFW:</strong> Find certified HVAC pros who install and configure Ecobee and Nest thermostats for ERCOT demand response — get quotes in 24 hours.
        </div>
      </div>
    </div>
  );
}