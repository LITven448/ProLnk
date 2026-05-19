import { useState } from 'react';

const poolSituations = [
  { id: "inground_gas", label: "Inground Pool + Gas Heater", icon: "🔥" },
  { id: "inground_hp", label: "Inground Pool + Heat Pump", icon: "♨️" },
  { id: "no_heater", label: "Inground Pool, No Heater", icon: "🏊" },
  { id: "above_ground", label: "Above Ground Pool", icon: "🌊" },
];

const guides: Record<string, { spaType: string; heatingNote: string; cost: string; months: string; steps: string[]; safety: string[] }> = {
  inground_gas: {
    spaType: "Attached Spillover Spa",
    heatingNote: "Gas heater heats spa in 30-45 min — ideal for DFW winter use",
    cost: "$18,000 - $35,000″,
    months: "Year-round use possible in DFW",
    steps: [
      "🔩 Attached spa shares pool equipment — most cost-efficient option",
      "🔥 Size gas heater for BOTH pool + spa (250,000-400,000 BTU for DFW)",
      "🔄 Install dedicated spa valve actuator for automation",
      "💧 Spillover spa: jets spill water from spa into pool (beautiful visual)",
      "📐 Standard DFW spa: 7x7 ft, 3.5-4 ft deep, 6-8 jets",
      "✅ DFW permit required — spas are regulated as pool additions",
    ],
    safety: ["Never leave spa unattended with children", "Max temp 104°F — maintain thermostat controls", "Drain spa before extended travel"],
  },
  inground_hp: {
    spaType: "Attached Spa with Gas Heater Addition",
    heatingNote: "Heat pump is too slow for DFW spa use — add gas heater for spa circuit",
    cost: "$20,000 - $40,000″,
    months: "Oct-April spa use common in DFW",
    steps: [
      "⚠️ Heat pump takes 24-48 hrs to raise spa temp — not practical for DFW winters",
      "🔥 Add gas heater on spa circuit for rapid heating (strongly recommended)",
      "🔄 Dual-heater system: heat pump for pool, gas for spa",
      "🔩 Attached spillover spa recommended — shares circulation equipment",
      "📐 Keep spa separate valve circuit for independent heating",
      "✅ Gas line extension required — budget $800-1,500 additional",
    ],
    safety: ["Always test spa temp before entry", "Limit soak time to 15-20 min in 104°F water", "Keep spa cover on when not in use"],
  },
  no_heater: {
    spaType: "Attached Spa + New Gas Heater Package",
    heatingNote: "Add gas heater with spa — doubles as pool heater extending DFW swim season",
    cost: "$22,000 - $45,000″,
    months: "Extend pool season to 10-11 months in DFW",
    steps: [
      "💡 Adding spa is the perfect time to add pool heating in DFW",
      "🔥 400,000 BTU gas heater handles both pool and spa for DFW",
      "🔩 Attached spa shares new equipment — most economical path",
      "🏗️ Excavation, gunite, and tiling added to existing pool deck",
      "📐 Must maintain 4-foot separation from existing pool equipment",
      "✅ DFW permit + gas line installation required",
    ],
    safety: ["Install anti-entrapment drain covers (VGB required)", "Always maintain drain cover integrity", "Spa GFCI protection required by code"],
  },
  above_ground: {
    spaType: "Separate Freestanding Hot Tub (Recommended)",
    heatingNote: "Above-ground pools cannot support attached spas — portable hot tub is better",
    cost: "$4,000 - $12,000″,
    months: "Year-round use in DFW (mild winters)",
    steps: [
      "⚠️ Above-ground pools cannot support an attached gunite spa",
      "🛁 Portable hot tub (6-8 person) is the practical DFW solution",
      "⚡ 240V electrical hookup required (50-amp GFCI breaker)",
      "🏗️ Level pad required — pavers or concrete preferred in DFW",
      "💧 Top brands: Jacuzzi, Hot Spring, Bullfrog — all have DFW dealers",
      "✅ No permit needed for portable hot tub in most DFW cities",
    ],
    safety: ["Locking cover required when children in home", "Test water chemistry weekly", "Drain and refill every 3-4 months in DFW heat"],
  },
};

export default function DFWPoolSpaCombo2026() {
  const [situation, setSituation] = useState("");
  const guide = situation ? guides[situation] : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "24px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🛁</div>
          <h1 style={{ color: "#F5E642″, fontSize: 28, fontWeight: 700, margin: "8px 0 4px" }}>DFW Pool and Spa Combo Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Add a spa to your DFW pool — gas heating is essential for DFW winter enjoyment</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[["🔥","Gas Heating","30-45 min to 104°F spa temp"],["🌡️","DFW Winters","Dec-Feb avg 45°F — spa is worth it"],["💰","Home Value","Adds $15-25K to DFW home value"]].map(([icon,t,d]) => (
            <div key={t} style={{ background: "#0f2035″, borderRadius: 10, padding: 14, textAlign: "center" }}>
              <div style={{ fontSize: 28 }}>{icon}</div>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, marginTop: 4 }}>{t}</div>
              <div style={{ color: "#94a3b8″, fontSize: 11, marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f2035″, borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>🏊 Select Your Pool Situation</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginBottom: 20 }}>
            {poolSituations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)}
                style={{ padding: "14px 12px", borderRadius: 10, border: `2px solid ${situation===s.id ? "#F5E642" : "#1e3a5f"}`, background: situation===s.id ? "#1e3a5f" : "#0A1628″, color: "#fff", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontSize: 24 }}>{s.icon}</div>
                <div style={{ fontWeight: situation===s.id ? 700 : 400, fontSize: 13, marginTop: 4, color: situation===s.id ? "#F5E642″ : "#fff" }}>{s.label}</div>
              </button>
            ))}
          </div>

          {guide && (
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 20 }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>✅ Best Option: {guide.spaType}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
                {[["Cost Range", guide.cost],["Seasonality", guide.months],["Key Tip", "See steps below"]].map(([l,v]) => (
                  <div key={l} style={{ background: "#0f2035″, borderRadius: 8, padding: 10 }}>
                    <div style={{ color: "#94a3b8″, fontSize: 11 }}>{l}</div>
                    <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 12, marginTop: 2 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#1e2a4a", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, borderLeft: "3px solid #F5E642″ }}>
                💡 {guide.heatingNote}
              </div>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ background: "#0f2035″, borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 13 }}>{step}</div>
              ))}
              <div style={{ marginTop: 14 }}>
                <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8, fontSize: 13 }}>🔒 Safety Requirements</div>
                {guide.safety.map((s, i) => (
                  <div key={i} style={{ background: "#1e2a4a", borderRadius: 8, padding: "8px 12px", marginBottom: 6, fontSize: 12 }}>⚠️ {s}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", padding: 20, background: "#0f2035″, borderRadius: 12 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: 8 }}>Ready to add a spa to your DFW pool?</div>
          <div style={{ color: "#94a3b8″, fontSize: 13 }}>ProLnk connects you with licensed DFW pool builders who specialize in spa additions</div>
          <button style={{ marginTop: 12, background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>Get DFW Spa Addition Quotes 🛁</button>
        </div>
      </div>
    </div>
  );
}
