import { useState } from 'react';

export default function HomeHealthVaultExplainer() {
  const [selected, setSelected] = useState<string | null>(null);

  const features = [
    { type: "🔥 HVAC", stored: "System age, service dates, filter changes, warranty expiration, technician notes" },
    { type: "💧 Plumbing", stored: "Pipe materials, water heater install date, repairs, shut-off valve locations, leak history" },
    { type: "⚡ Electrical", stored: "Panel capacity, upgrade history, outlet/wiring type, permit records, inspection dates" },
    { type: "🏠 Roof", stored: "Install year, material type, warranty, repair history, storm damage claims, inspection reports" },
    { type: "🪟 Windows & Doors", stored: "Install year, energy rating, seal replacements, lock hardware, frame material" },
    { type: "🌿 Foundation", stored: "Material type, inspection history, crack reports, waterproofing records, soil reports" },
    { type: "🔧 Appliances", stored: "Make/model/serial numbers, purchase dates, warranties, service records, recall notices" },
    { type: "🛡️ Safety Systems", stored: "Smoke detector locations, CO detector history, security system info, fire suppression" },
  ];

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏦</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, marginBottom: 12 }}>Home Health Vault</h1>
          <p style={{ fontSize: 18, color: "#94a3b8″, lineHeight: 1.6, maxWidth: 600, margin: "0 auto" }}>
            A secure, permanent digital record of everything about your home — systems, appliances, repairs, warranties, and safety data — tied forever to your property address.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
          {[
            { icon: "🔒", title: "Permanently Tied to Address", desc: "Records follow the property, not the owner. Transfers at sale automatically." },
            { icon: "📋", title: "Full Maintenance History", desc: "Every repair, service call, and upgrade logged with date, contractor, and cost." },
            { icon: "📑", title: "Warranty Tracking", desc: "Never lose a warranty again. Get alerts before coverage expires." },
            { icon: "🏥", title: "Health & Safety Data", desc: "Mold reports, air quality, radon tests, lead paint disclosures, and more." },
          ].map((item) => (
            <div key={item.title} style={{ background: "#0f1f3d", borderRadius: 12, padding: 20, border: "1px solid #1e3a6e" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#94a3b8″, fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0f1f3d", borderRadius: 16, padding: 28, border: "1px solid #1e3a6e" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#F5E642″, marginBottom: 6 }}>What Gets Stored?</h2>
          <p style={{ color: "#94a3b8″, fontSize: 14, marginBottom: 20 }}>Tap a home system to see exactly what the Vault tracks:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {features.map((f) => (
              <button key={f.type} onClick={() => setSelected(selected === f.type ? null : f.type)}
                style={{ background: selected === f.type ? "#F5E642″ : "#1e3a6e", color: selected === f.type ? "#0A1628" : "#fff", border: "none", borderRadius: 20, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
                {f.type}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: "#0A1628″, borderRadius: 10, padding: 16, border: "1px solid #F5E642" }}>
              <div style={{ fontWeight: 700, color: "#F5E642″, marginBottom: 8 }}>{selected} — Vault Records:</div>
              <div style={{ color: "#e2e8f0″, lineHeight: 1.7 }}>{features.find((f) => f.type === selected)?.stored}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 16 }}>🔗 Powered by ProLnk — every service call auto-logged to your Vault</div>
        </div>
      </div>
    </div>
  );
}