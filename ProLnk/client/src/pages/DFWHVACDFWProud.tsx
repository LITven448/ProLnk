import { useState } from "react";

const knowledgeAreas = [
  { area: "Filter replacement schedule", protection: "Prevents HVAC failure during July/August peak heat — a $8,500 emergency in DFW summer" },
  { area: "Drain pan monitoring", protection: "Stops ceiling collapse from overflow — DFW humidity creates overflow risk 6+ months per year" },
  { area: "Refrigerant charge awareness", protection: "Catches low refrigerant before your system burns out during a 105F week" },
  { area: "Thermostat setpoints by season", protection: "Saves $180-$400/year in energy while keeping your DFW home comfortable" },
  { area: "Contractor vetting knowledge", protection: "Lets you reject unlicensed or underinsured contractors — common in DFW post-storm surge" },
  { area: "Equipment age and lifecycle", protection: "Lets you plan replacements vs. emergency buys — DFW systems age faster due to extreme cycles" },
  { area: "Home Health Vault records", protection: "Gives future buyers proof of care — adds 2-4% to DFW home resale value" },
];

export default function DFWHVACDFWProud() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🏆</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800″, color: "#F5E642", marginBottom: "16px", lineHeight: 1.2 }}>
            Knowing Your DFW HVAC Sets You Apart
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8″, maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            Most DFW homeowners have no idea how their HVAC system works, who installed it, or when it was last serviced. You do. ProLnk has made you an expert — and that knowledge protects your family and your investment.
          </p>
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "16px", padding: "28px", marginBottom: "32px", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700″, color: "#F5E642", marginBottom: "12px" }}>🏠 The DFW Reality</h2>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            In a metro area with 7.7 million people and summer temps that regularly hit 105F, HVAC is not a comfort luxury — it is a survival system. Yet surveys show fewer than 15% of DFW homeowners can name their equipment brand, age, or last service date. You are in the top 15%.
          </p>
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700″, color: "#fff", marginBottom: "20px", textAlign: "center" }}>
          Select a knowledge area to see how it protects your DFW home
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
          {knowledgeAreas.map((item, i) => (
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
              {selected === i ? "✅" : "📋"} {item.area}
              {selected === i && (
                <div style={{ marginTop: "10px", fontSize: "0.92rem", fontWeight: "400″, color: "#0A1628", lineHeight: 1.6 }}>
                  🛡️ {item.protection}
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040″, borderRadius: "16px", padding: "28px", border: "1px solid #F5E642" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700″, color: "#F5E642", marginBottom: "10px" }}>📊 What ProLnk Did for You</h3>
          <p style={{ color: "#94a3b8″, lineHeight: 1.7, margin: 0 }}>
            Through 3,200+ pages of DFW HVAC content, the Home Health Vault, and vetted contractor matching, ProLnk transformed you from a passive homeowner into a knowledgeable steward of one of your largest assets. That is a competitive advantage in the DFW real estate market.
          </p>
        </div>
      </div>
    </div>
  );
}
