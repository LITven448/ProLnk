import { useState } from 'react';

const cities: Record<string, { electric: string; gas: string; water: string; electricPhone: string; gasPhone: string; waterPhone: string }> = {
  Dallas: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "City of Dallas Water", waterPhone: "214-651-1441" },
  "Fort Worth": { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "Fort Worth Water", waterPhone: "817-392-4477" },
  Plano: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "City of Plano Water", waterPhone: "972-769-4150" },
  Arlington: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "City of Arlington Water", waterPhone: "817-275-5931" },
  Frisco: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "City of Frisco Water", waterPhone: "972-292-5000" },
  McKinney: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "City of McKinney Water", waterPhone: "972-547-7400" },
  Irving: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "City of Irving Water", waterPhone: "972-721-2281" },
  Garland: { electric: "Oncor Electric", electricPhone: "1-888-313-4747″, gas: "Atmos Energy", gasPhone: "1-888-286-6700", water: "Garland Water", waterPhone: "972-205-2671" },
};

export default function DFWUtilityContactsGuide2026() {
  const [selected, setSelected] = useState("Dallas");
  const info = cities[selected];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>⚡</div>
          <h1 style={{ color: "#F5E642″, fontSize: "2rem", marginBottom: ".5rem" }}>DFW Utility Contacts Guide 2026</h1>
          <p style={{ color: "#94a3b8″ }}>All DFW utility contacts — electricity, gas, water, and outage reporting</p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, marginBottom: "1rem" }}>🏙️ Select Your DFW City</h2>
          <select
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#1a3a5c", color: "#fff", border: "1px solid #F5E642″, fontSize: "1rem" }}
          >
            {Object.keys(cities).map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {info && (
          <div style={{ display: "grid", gap: "1rem" }}>
            {[
              { icon: "⚡", label: "Electric Provider", name: info.electric, phone: info.electricPhone, note: "Report outage online at oncor.com or call 24/7″ },
              { icon: "🔥", label: "Gas Provider", name: info.gas, phone: info.gasPhone, note: "Smell gas? Evacuate first, then call from outside" },
              { icon: "💧", label: "Water Provider", name: info.water, phone: info.waterPhone, note: "Billing, outages, and new account setup" },
            ].map(u => (
              <div key={u.label} style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", borderLeft: "4px solid #F5E642" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: ".25rem" }}>{u.icon} {u.label}</div>
                <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: "1.1rem" }}>{u.name}</div>
                <div style={{ color: "#94a3b8″, marginBottom: ".5rem" }}>{u.phone}</div>
                <div style={{ color: "#64748b", fontSize: ".85rem" }}>{u.note}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.25rem", marginTop: "1.5rem" }}>
          <h3 style={{ color: "#F5E642″ }}>📋 New Homeowner Setup Checklist</h3>
          {["Transfer electric account to your name before closing", "Set up Atmos gas account 3 days before move-in", "Contact city water for meter transfer and deposit", "Register for online outage alerts with each utility"].map(s => (
            <div key={s} style={{ display: "flex", gap: ".75rem", marginTop: ".75rem", color: "#94a3b8″ }}>
              <span style={{ color: "#F5E642″ }}>✓</span> {s}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem", color: "#64748b", fontSize: ".85rem" }}>
          ProLnk helps DFW homeowners navigate home services. Data current as of 2026.
        </div>
      </div>
    </div>
  );
}