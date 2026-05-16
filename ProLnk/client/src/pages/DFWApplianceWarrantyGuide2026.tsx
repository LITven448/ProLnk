import { useState } from 'react';

type Appliance = "Refrigerator" | "HVAC System" | "Water Heater" | "Dishwasher" | "Washer / Dryer" | "Oven / Range";

const appliances: Record<Appliance, { standard: string; extended: string; age: number; status: (a: number) => string; tip: string }> = {
  "Refrigerator": { standard: "1-year full, 5-year compressor", extended: "Register for extended compressor coverage with most brands", age: 5, status: (a) => a <= 1 ? "Full 1-year warranty active" : a <= 5 ? "Compressor warranty active" : "Standard warranty expired", tip: "Compressor is the expensive part — always register and keep service records." },
  "HVAC System": { standard: "5-year parts (unregistered)", extended: "10-year parts with registration within 60 days", age: 10, status: (a) => a <= 5 ? "Full coverage active" : a <= 10 ? "Extended coverage (if registered)" : "Warranty expired", tip: "Most important appliance to register — do it the day of install." },
  "Water Heater": { standard: "6-year tank (standard), 12-year (premium)", extended: "Extended anode rod coverage adds 2-3 years", age: 6, status: (a) => a <= 6 ? "Standard tank warranty active" : a <= 12 ? "Premium warranty (if purchased)" : "Warranty expired", tip: "Flush tank annually — sediment buildup can void warranty. DFW hard water accelerates buildup." },
  "Dishwasher": { standard: "1-year limited", extended: "Extended warranty available 1-3 years", age: 1, status: (a) => a <= 1 ? "Full 1-year warranty active" : "Warranty expired", tip: "Dishwashers have high failure rates — extended warranty often worth it on premium brands." },
  "Washer / Dryer": { standard: "1-year limited", extended: "2-3 year extended common", age: 1, status: (a) => a <= 1 ? "Full 1-year warranty active" : "Warranty expired", tip: "Drum and motor warranty sometimes separate from main warranty — check documentation." },
  "Oven / Range": { standard: "1-year limited", extended: "1-3 years depending on retailer", age: 1, status: (a) => a <= 1 ? "Full 1-year warranty active" : "Warranty expired", tip: "Ceramic cooktops are rarely covered for cracks — use caution and document original condition." },
};

export default function DFWApplianceWarrantyGuide2026() {
  const [appliance, setAppliance] = useState<Appliance>("HVAC System");
  const [age, setAge] = useState(3);

  const info = appliances[appliance];
  const statusText = info.status(age);
  const isActive = age <= info.age;

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ marginBottom: 8, color: "#F5E642", fontSize: 13 }}>🏠 ProLnk Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Appliance Warranty Guide 2026</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32, lineHeight: 1.6 }}>
          Most DFW homeowners have no idea when their appliance warranties expire. ProLnk Home Health Vault tracks all of them automatically.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { icon: "🧊", label: "Refrigerator", sub: "1yr full / 5yr compressor" },
            { icon: "❄️", label: "HVAC", sub: "10yr with registration" },
            { icon: "🚿", label: "Water Heater", sub: "6-12yr tank warranty" },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: "#111f38", borderRadius: 10, padding: 16, border: "1px solid #1e3a5f", textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: "#94a3b8", fontSize: 11 }}>{item.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#F5E642" }}>🔍 Appliance Warranty Status Checker</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 8 }}>Appliance Type</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(Object.keys(appliances) as Appliance[]).map((a) => (
                <button key={a} onClick={() => setAppliance(a)}
                  style={{ padding: "8px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12,
                    backgroundColor: appliance === a ? "#F5E642" : "#1e3a5f", color: appliance === a ? "#0A1628" : "#fff" }}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 8 }}>Appliance Age: {age} year{age !== 1 ? "s" : ""}</label>
            <input type="range" min={1} max={15} value={age} onChange={(e) => setAge(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#F5E642" }} />
          </div>
          <div style={{ backgroundColor: isActive ? "#0f2d1a" : "#2d0f0f", borderRadius: 10, padding: 20, border: `1px solid ${isActive ? "#4ade80" : "#f87171"}` }}>
            <div style={{ fontWeight: 700, color: isActive ? "#4ade80" : "#f87171", fontSize: 15, marginBottom: 10 }}>
              {isActive ? "✅ " : "❌ "}{statusText}
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 6 }}>📦 Standard: <strong>{info.standard}</strong></div>
            <div style={{ color: "#cbd5e1", fontSize: 14, marginBottom: 10 }}>📋 Extended option: <strong>{info.extended}</strong></div>
            <div style={{ color: "#94a3b8", fontSize: 13, fontStyle: "italic" }}>💡 {info.tip}</div>
          </div>
        </div>

        <div style={{ backgroundColor: "#111f38", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#F5E642" }}>📋 Are Extended Warranties Worth It?</h2>
          {[
            { item: "HVAC System", worth: true, reason: "Yes — repair costs $800-3,000+. Extended warranty pays for itself in one repair." },
            { item: "Refrigerator", worth: true, reason: "Yes — compressor replacement $700-1,400. Extended coverage for 5yr compressor is valuable." },
            { item: "Dishwasher", worth: false, reason: "Maybe — high failure rate but repairs often $200-400. Evaluate on brand and price." },
            { item: "Washer / Dryer", worth: false, reason: "Skip it — most repairs are under $200 and units last 10-15 years without issues." },
            { item: "Oven / Range", worth: false, reason: "Usually not — gas ranges rarely fail. Electric range repairs are inexpensive." },
          ].map(({ item, worth, reason }) => (
            <div key={item} style={{ display: "flex", gap: 12, marginBottom: 14, padding: "10px 14px", borderRadius: 8, backgroundColor: "#0A1628" }}>
              <span style={{ fontSize: 18 }}>{worth ? "✅" : "⚪"}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item}</div>
                <div style={{ color: "#94a3b8", fontSize: 13 }}>{reason}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: "#F5E642", borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🏠</div>
          <div style={{ fontWeight: 700, color: "#0A1628", marginBottom: 4 }}>ProLnk Home Health Vault Tracks Every Appliance Warranty</div>
          <div style={{ color: "#1e3a5f", fontSize: 13 }}>Add purchase dates, serial numbers, and warranty docs — get alerts before coverage expires and access to vetted repair pros.</div>
        </div>
      </div>
    </div>
  );
}
