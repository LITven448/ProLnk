import { useState } from 'react';

const cities = ["Dallas", "Fort Worth", "Plano", "Arlington", "Frisco", "McKinney", "Allen", "Garland", "Irving", "Denton"];
const gasUtility = { name: "Atmos Energy Gas Emergency", phone: "866-322-8667", icon: "🔥" };
const electricUtilities: Record<string, { name: string; phone: string }> = {
  "Dallas": { name: "Oncor Electric", phone: "888-313-4747" },
  "Fort Worth": { name: "Oncor Electric", phone: "888-313-4747" },
  "Plano": { name: "Oncor Electric", phone: "888-313-4747" },
  "Arlington": { name: "Oncor Electric", phone: "888-313-4747" },
  "Frisco": { name: "Oncor Electric", phone: "888-313-4747" },
  "McKinney": { name: "Oncor Electric", phone: "888-313-4747" },
  "Allen": { name: "Oncor Electric", phone: "888-313-4747" },
  "Garland": { name: "Oncor Electric", phone: "888-313-4747" },
  "Irving": { name: "Oncor Electric", phone: "888-313-4747" },
  "Denton": { name: "CoServ Electric", phone: "800-274-4014" },
};

export default function DFWEmergencyContactsGuide() {
  const [city, setCity] = useState("Dallas");
  const [hasPool, setHasPool] = useState(false);
  const [hasGas, setHasGas] = useState(true);
  const [generated, setGenerated] = useState(false);

  const electric = electricUtilities[city] || electricUtilities["Dallas"];

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 24px", maxWidth: 720, margin: "0 auto" }}>
      <div style={{ color: "#F5E642", fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME SAFETY GUIDE</div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Emergency Contacts for DFW Homeowners</h1>
      <p style={{ color: "#94a3b8", marginBottom: 24 }}>
        Print this sheet and put it on your refrigerator. In a real emergency, seconds count — having numbers visible beats searching your phone.
      </p>

      <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, color: "#F5E642", marginBottom: 16 }}>⚙️ Personalize Your Sheet</h2>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6, color: "#94a3b8" }}>Your DFW City</label>
          <select value={city} onChange={e => { setCity(e.target.value); setGenerated(false); }}
            style={{ width: "100%", padding: "8px 12px", borderRadius: 8, background: "#1a3a60", color: "#fff", border: "1px solid #2d4a7a" }}>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={hasGas} onChange={e => setHasGas(e.target.checked)} style={{ accentColor: "#F5E642" }} />
            <span style={{ color: "#94a3b8" }}>Gas appliances/line</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ accentColor: "#F5E642" }} />
            <span style={{ color: "#94a3b8" }}>Swimming pool</span>
          </label>
        </div>
        <button onClick={() => setGenerated(true)} style={{ background: "#F5E642", color: "#0A1628", padding: "10px 24px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", fontSize: 15 }}>
          Generate My Contact Sheet →
        </button>
      </div>

      {generated && (
        <div style={{ background: "#0f2240", borderRadius: 12, padding: 20, marginBottom: 24, border: "2px solid #F5E642" }}>
          <h2 style={{ fontSize: 18, color: "#F5E642", marginBottom: 16 }}>📋 {city} Emergency Contacts</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {[
              { icon: "🚨", name: "Fire / Police / EMS", phone: "911" },
              { icon: "⚡", name: electric.name, phone: electric.phone },
              ...(hasGas ? [{ icon: gasUtility.icon, name: gasUtility.name, phone: gasUtility.phone }] : []),
              { icon: "🚰", name: `${city} Water Emergency`, phone: "311" },
              { icon: "🌪️", name: "NWS DFW Tornado Hotline", phone: "817-978-1111" },
              ...(hasPool ? [{ icon: "🏊", name: "Pool Chemical Emergency (Poison Control)", phone: "800-222-1222" }] : []),
              { icon: "🔧", name: "Trusted Plumber (fill in)", phone: "_____________" },
              { icon: "❄️", name: "HVAC Emergency (fill in)", phone: "_____________" },
              { icon: "👨‍👩‍👧", name: "Family Contact 1 (fill in)", phone: "_____________" },
              { icon: "👤", name: "Family Contact 2 (fill in)", phone: "_____________" },
            ].map(c => (
              <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0A1628", padding: "10px 14px", borderRadius: 8 }}>
                <span>{c.icon} {c.name}</span>
                <span style={{ color: "#F5E642", fontWeight: 700 }}>{c.phone}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: "#0f2240", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642" }}>
        <div style={{ fontWeight: 700, marginBottom: 6 }}>⚡ Pro Tip</div>
        <p style={{ color: "#94a3b8", margin: 0, fontSize: 14 }}>Laminate this sheet and stick it to your fridge with a magnet. Update your plumber and HVAC contacts annually — relationships matter in DFW where good contractors book out weeks in advance.</p>
      </div>
    </div>
  );
}
