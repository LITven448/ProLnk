import { useState } from 'react';

const IMPROVEMENT_TYPES = [
  { type: "Kitchen Remodel", icon: "🍳", taxBenefit: "Capital improvement — reduces taxable gain at sale", saleImpact: "+5–15% resale value increase in DFW market", track: ["Contractor invoice with license number", "Material receipts", "Permit number and closeout", "Before/after photos", "Appliance warranties"], irsNote: "Full cost is added to your cost basis" },
  { type: "Bathroom Addition/Remodel", icon: "🛁", taxBenefit: "Capital improvement — reduces taxable gain at sale", saleImpact: "+3–10% resale value in DFW", track: ["Plumbing permit", "Electrical permit (if upgraded)", "Contractor invoices", "Fixture receipts", "Lien waivers"], irsNote: "Adds to cost basis; keep all receipts" },
  { type: "Roof Replacement", icon: "🏠", taxBenefit: "Capital improvement for sale; may qualify for energy credit with cool-roof materials", saleImpact: "+$5,000–$20,000 in DFW market", track: ["Invoice with warranty details", "Material specs (for energy credit eligibility)", "Permit", "Photos"], irsNote: "Document material type — ENERGY STAR roof may qualify for 30% federal credit" },
  { type: "HVAC System", icon: "❄️", taxBenefit: "Energy Efficient Home Improvement Credit — up to $600 per system (25C)", saleImpact: "Essential for DFW buyers; aging HVAC kills deals", track: ["AHRI certificate", "Installer invoice", "Equipment model/serial", "SEER rating documentation"], irsNote: "Must meet minimum efficiency rating. File Form 5695. Credit is 30%, max $600." },
  { type: "Pool/Outdoor Structure", icon: "🏊", taxBenefit: "Capital improvement — adds to cost basis", saleImpact: "Varies in DFW — pools standard in luxury market, may not recover cost in starter-home areas", track: ["Builder permit", "Engineering drawings", "All invoices", "Fence permit"], irsNote: "Full cost basis addition. If rented, depreciation rules apply." },
  { type: "Foundation Repair", icon: "🏗️", taxBenefit: "Capital improvement if structural; may be casualty loss if from sudden event", saleImpact: "Mandatory disclosure in Texas; documented repair increases buyer confidence", track: ["Engineering report", "Repair invoice", "Warranty certificate", "Soil tests"], irsNote: "Keep warranty — transferable foundation warranties are major DFW selling point" },
  { type: "Solar Panels", icon: "☀️", taxBenefit: "Residential Clean Energy Credit — 30% of cost, no cap (26D)", saleImpact: "+$10,000–$30,000 in DFW (leased panels reduce appeal)", track: ["Installation contract", "Equipment specs", "Interconnection agreement", "Utility bills before/after"], irsNote: "Must own (not lease) panels. File Form 5695. Carry forward excess credit." },
  { type: "Flooring", icon: "🪵", taxBenefit: "Capital improvement — adds to cost basis", saleImpact: "+2–5% in DFW market (hardwood preferred over carpet)", track: ["Material receipts", "Installer invoice", "Product specs/warranty"], irsNote: "Simpler documentation needed; keep receipts by room" },
];

export default function DFWHomeImprovementTrackingGuide() {
  const [selected, setSelected] = useState<string>("");
  const detail = IMPROVEMENT_TYPES.find((i) => i.type === selected);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ background: "#F5E642", color: "#0A1628", padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginTop: "1rem", marginBottom: "0.5rem" }}>🔨 Home Improvement Tracking Guide</h1>
          <p style={{ color: "#9BAAC5", fontSize: 16 }}>Every dollar you spend on your home can reduce your taxes or increase your sale price — but only if you document it correctly.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ background: "#111E35", borderRadius: 8, padding: "1.25rem", border: "1px solid #F5E642", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>📉</div>
            <h3 style={{ color: "#F5E642", fontSize: 14, marginBottom: "0.5rem" }}>Reduce Capital Gains</h3>
            <p style={{ color: "#9BAAC5", fontSize: 13 }}>Capital improvements add to your cost basis, reducing taxable gain when you sell</p>
          </div>
          <div style={{ background: "#111E35", borderRadius: 8, padding: "1.25rem", border: "1px solid #2A6A9E", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>🔧</div>
            <h3 style={{ color: "#7EC8E3", fontSize: 14, marginBottom: "0.5rem" }}>Win Insurance Claims</h3>
            <p style={{ color: "#9BAAC5", fontSize: 13 }}>Documented improvements with receipts make insurance claims faster and larger</p>
          </div>
          <div style={{ background: "#111E35", borderRadius: 8, padding: "1.25rem", border: "1px solid #2ECC71", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>🏷️</div>
            <h3 style={{ color: "#2ECC71", fontSize: 14, marginBottom: "0.5rem" }}>Maximize Sale Price</h3>
            <p style={{ color: "#9BAAC5", fontSize: 13 }}>Buyers pay more for homes with documented improvements and transferable warranties</p>
          </div>
        </div>

        <div style={{ background: "#111E35", borderRadius: 10, padding: "1.5rem", marginBottom: "2rem", border: "1px solid #1E3A5F" }}>
          <h2 style={{ fontSize: 18, marginBottom: "1rem" }}>🔍 What Should I Track for This Improvement?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.75rem", marginBottom: "1.25rem" }}>
            {IMPROVEMENT_TYPES.map((imp) => (
              <button key={imp.type} onClick={() => setSelected(imp.type)} style={{ background: selected === imp.type ? "#F5E642" : "#0A1628", color: selected === imp.type ? "#0A1628" : "#E8EDF5", border: `1px solid ${selected === imp.type ? "#F5E642" : "#2A4A7F"}`, borderRadius: 6, padding: "0.6rem 0.75rem", fontSize: 13, cursor: "pointer", textAlign: "left", fontWeight: selected === imp.type ? 700 : 400 }}>
                {imp.icon} {imp.type}
              </button>
            ))}
          </div>

          {detail && (
            <div style={{ background: "#0A1628", borderRadius: 8, padding: "1.5rem", border: "1px solid #F5E642" }}>
              <h3 style={{ color: "#F5E642", fontSize: 18, marginBottom: "1rem" }}>{detail.icon} {detail.type}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <div style={{ color: "#9BAAC5", fontSize: 12, marginBottom: "0.25rem" }}>TAX BENEFIT</div>
                  <div style={{ color: "#2ECC71", fontSize: 14 }}>{detail.taxBenefit}</div>
                </div>
                <div>
                  <div style={{ color: "#9BAAC5", fontSize: 12, marginBottom: "0.25rem" }}>DFW SALE IMPACT</div>
                  <div style={{ color: "#7EC8E3", fontSize: 14 }}>{detail.saleImpact}</div>
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <div style={{ color: "#9BAAC5", fontSize: 12, marginBottom: "0.5rem" }}>WHAT TO DOCUMENT</div>
                {detail.track.map((t) => <div key={t} style={{ color: "#E8EDF5", fontSize: 14, padding: "0.2rem 0" }}>✅ {t}</div>)}
              </div>
              <div style={{ background: "#1A1A00", border: "1px solid #F5E642", borderRadius: 6, padding: "0.75rem", fontSize: 13, color: "#CBD5E8" }}>
                💡 <strong style={{ color: "#F5E642" }}>IRS Note:</strong> {detail.irsNote}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

