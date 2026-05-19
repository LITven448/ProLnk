import { useState } from 'react';

const brands: Record<string, { standard: string; registered: string; voids: string[] }> = {
  "Carrier": { standard: "5-year parts", registered: "10-year parts + limited labor", voids: ["Wrong refrigerant type", "No annual service record", "DIY installation"] },
  "Trane": { standard: "5-year parts", registered: "10-year parts + compressor", voids: ["Improper refrigerant charge", "Skipping annual tune-up", "Unauthorized repair"] },
  "Lennox": { standard: "5-year parts", registered: "10-year parts + heat exchanger", voids: ["Installing wrong filter size", "No licensed contractor on install", "Refrigerant contamination"] },
  "Rheem": { standard: "5-year compressor", registered: "10-year compressor + parts", voids: ["Electrical surges without surge protector", "Blocked airflow over time", "Wrong refrigerant"] },
  "Goodman": { standard: "5-year parts", registered: "10-year parts + lifetime compressor", voids: ["DIY install", "Missing annual maintenance", "Dirty coils never cleaned"] },
  "York": { standard: "5-year parts", registered: "10-year parts", voids: ["Improper sizing (wrong tonnage)", "No commissioning checklist", "Refrigerant leak unaddressed"] },
};

export default function DFWHVACManufacturerWarranty2026() {
  const [brand, setBrand] = useState("Carrier");
  const [age, setAge] = useState(3);

  const info = brands[brand];
  const isRegistered = age <= 10;
  const claimable = age <= 10;

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642″, fontSize: 13 }}>❄️ ProLnk Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW HVAC Manufacturer Warranty Guide 2026</h1>
        <p style={{ color: "#94a3b8″, marginBottom: 32, lineHeight: 1.6 }}>
          Most DFW homeowners lose their 10-year HVAC warranty without knowing it. Registration within 60 days of install is required — here is everything you need to know.
        </p>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: 16, marginBottom: 28, display: "flex", gap: 12, alignItems: "flex-start" }}>
          <span style={{ fontSize: 22 }}>⏰</span>
          <div>
            <div style={{ fontWeight: 800, color: "#0A1628″, marginBottom: 2 }}>Register within 60 days or lose the extended warranty</div>
            <div style={{ color: "#1e3a5f", fontSize: 13 }}>Most brands default to 5-year coverage without registration. Registering extends to 10 years at no cost.</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38″, borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#F5E642″ }}>🔍 HVAC Warranty Status Checker</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 8 }}>HVAC Brand</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.keys(brands).map((b) => (
                <button key={b} onClick={() => setBrand(b)}
                  style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13,
                    backgroundColor: brand === b ? "#F5E642″ : "#1e3a5f", color: brand === b ? "#0A1628" : "#fff" }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8″, fontSize: 13, display: "block", marginBottom: 8 }}>Unit Age: {age} year{age !== 1 ? "s" : ""}</label>
            <input type="range" min={1} max={20} value={age} onChange={(e) => setAge(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642″ }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: 12, marginTop: 4 }}>
              <span>New (1yr)</span><span>10yr</span><span>Older (20yr)</span>
            </div>
          </div>
          <div style={{ backgroundColor: claimable ? "#0f2d1a" : "#2d0f0f", borderRadius: 10, padding: 20, border: `1px solid ${claimable ? "#4ade80" : "#f87171"}` }}>
            <div style={{ fontWeight: 700, color: claimable ? "#4ade80″ : "#f87171", marginBottom: 10, fontSize: 16 }}>
              {claimable ? "✅ Warranty Likely Active" : "❌ Warranty Likely Expired"}
            </div>
            <div style={{ color: "#cbd5e1″, fontSize: 14, marginBottom: 6 }}>📦 Unregistered coverage: <strong>{info.standard}</strong></div>
            <div style={{ color: "#cbd5e1″, fontSize: 14, marginBottom: 6 }}>📋 Registered coverage: <strong>{info.registered}</strong></div>
            {!isRegistered && <div style={{ color: "#f87171″, fontSize: 13, marginTop: 8 }}>Unit is past 10-year mark — extended coverage window closed.</div>}
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38″, borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#F5E642″ }}>🚫 What Voids {brand} Warranty</h2>
          {info.voids.map((v) => (
            <div key={v} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: "#f87171″ }}>⚠️</span>
              <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#111f38″, borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "#F5E642″ }}>📞 How to File a Claim</h2>
          {["Contact a licensed HVAC contractor — not DIY", "Ask contractor to diagnose and document the defect", "Contractor contacts manufacturer warranty line with unit serial number", "Manufacturer may send inspector before authorizing parts", "Parts shipped to contractor; labor may or may not be covered", "Keep all invoices and service records for future claims"].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#F5E642″, color: "#0A1628",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ color: "#cbd5e1″, fontSize: 14 }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>❄️</div>
          <div style={{ fontWeight: 700, color: "#0A1628″, marginBottom: 4 }}>ProLnk Tracks Your HVAC Warranty Automatically</div>
          <div style={{ color: "#1e3a5f", fontSize: 13 }}>Add your unit to Home Health Vault — we alert you before registration deadlines and schedule annual maintenance.</div>
        </div>
      </div>
    </div>
  );
}
