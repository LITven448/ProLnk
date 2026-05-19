import { useState } from "react";

const improvements = [
  {
    area: "Finding a trustworthy contractor",
    how: "ProLnk vets every contractor with license checks, insurance verification, and review audits before they reach your quote request.",
    role: "ProLnk runs background checks and filters out 60-70% of applicants who do not meet minimum standards.",
  },
  {
    area: "Equipment that handles DFW heat",
    how: "Variable-speed compressors and two-stage systems maintain comfort at 105F without the on/off cycling that kills standard units.",
    role: "ProLnk matches you with contractors certified to install and service variable-speed and heat pump systems.",
  },
  {
    area: "Knowing what was done to my home",
    how: "Home Health Vault captures every service record, equipment spec, and repair note — searchable and permanent.",
    role: "ProLnk feeds verified service data into your Home Health Vault automatically after every matched job.",
  },
  {
    area: "Getting the right contractor the first time",
    how: "AI matching considers your ZIP code, equipment brand, system age, and trade specialty — not just availability.",
    role: "ProLnk's matching algorithm improves with every DFW job completed, making each match smarter than the last.",
  },
  {
    area: "Heat pump adoption in DFW",
    how: "Modern heat pumps now handle DFW winters and cut cooling costs 30-40% vs. traditional AC — adoption is accelerating.",
    role: "ProLnk is building the largest network of heat pump-certified contractors in the DFW metro.",
  },
  {
    area: "Pricing transparency",
    how: "Competitive multi-quote matching exposes market rates and eliminates the information asymmetry contractors have relied on.",
    role: "ProLnk's multi-quote system gives DFW homeowners real-time pricing benchmarks for every common service.",
  },
];

export default function DFWHVACDFWBetter() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📈</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800″, color: "#F5E642", marginBottom: "16px", lineHeight: 1.2 }}>
            How DFW Home Services Are Getting Better
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8″, maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            DFW HVAC is improving across every dimension — better contractors, better equipment, better data, better matching. ProLnk is the engine behind most of it.
          </p>
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "16px", padding: "28px", marginBottom: "32px", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700″, color: "#F5E642", marginBottom: "12px" }}>🔧 Why Improvement Matters in DFW</h2>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            DFW grows by 150,000+ people per year. Every new home needs HVAC service. Every aging home needs maintenance. The market has historically been opaque, fragmented, and contractor-favoring. That is changing fast — and ProLnk is one of the primary reasons why.
          </p>
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700″, color: "#fff", marginBottom: "20px", textAlign: "center" }}>
          Select an area of concern to see how it is improving and ProLnk's role
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
          {improvements.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                backgroundColor: selected === i ? "#F5E642″ : "#0F2040",
                color: selected === i ? "#0A1628″ : "#fff",
                border: "1px solid " + (selected === i ? "#F5E642″ : "#1e3a5f"),
                borderRadius: "10px",
                padding: "16px 20px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600″,
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              {selected === i ? "✅" : "⬆️"} {item.area}
              {selected === i && (
                <div style={{ marginTop: "12px", fontWeight: "400″, color: "#0A1628", lineHeight: 1.6 }}>
                  <div style={{ marginBottom: "8px", fontSize: "0.92rem" }}>🔧 <strong>How it is improving:</strong> {item.how}</div>
                  <div style={{ fontSize: "0.92rem" }}>🟡 <strong>ProLnk role:</strong> {item.role}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "16px", padding: "28px", border: "1px solid #F5E642" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700″, color: "#F5E642", marginBottom: "10px" }}>🚀 The Compounding Effect</h3>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            Better contractors attract better homeowners. Better data improves matching. Better matching builds trust. Trust builds volume. Volume improves every metric. ProLnk is building a flywheel that makes DFW home services measurably better with every transaction.
          </p>
        </div>
      </div>
    </div>
  );
}
