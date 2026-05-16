import { useState } from "react";

const situations = [
  {
    situation: "My system is 8-12 years old",
    value: "Proper maintenance now extends life 3-5 years, deferring an $8,500-$14,000 replacement. Annual tune-ups cost $150-$250.",
    prolnk: "ProLnk matches you with a certified tech who documents condition and gives you a remaining-life estimate stored in your Home Health Vault.",
  },
  {
    situation: "I have high humidity in summer",
    value: "An unchecked drain pan overflow can soak ceiling drywall and insulation — $2,000-$6,000 in structural damage. Monitoring costs nothing.",
    prolnk: "ProLnk contractors include drain line flushing and pan inspection in every tune-up — then log results to your Vault.",
  },
  {
    situation: "My energy bills feel too high",
    value: "A properly charged, clean system at correct refrigerant levels saves 15-25% on cooling costs — $300-$700/year in DFW summers.",
    prolnk: "ProLnk uses equipment data from your Vault to match contractors who specialize in efficiency optimization for your system type.",
  },
  {
    situation: "I am planning to sell in 2-5 years",
    value: "Documented HVAC maintenance history adds 2-4% to DFW home sale prices and reduces inspection contingencies that kill deals.",
    prolnk: "Every ProLnk-matched service job creates a permanent, verified record in your Home Health Vault — transferable to buyers.",
  },
  {
    situation: "I am worried about mold",
    value: "DFW humidity averages 65-75% in summer. An undersized or malfunctioning system creates conditions for mold growth in 48-72 hours.",
    prolnk: "ProLnk contractors verify humidity control performance and flag systems that are not properly dehumidifying your home.",
  },
  {
    situation: "I had a bad contractor experience",
    value: "Unlicensed or underinsured work voids manufacturer warranties and creates liability if damage occurs — far more costly than the original job.",
    prolnk: "ProLnk verifies every contractor's license, insurance, and reviews before they see your quote request — and removes underperformers.",
  },
];

export default function DFWHVACDFWValue() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>💰</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#F5E642", marginBottom: "16px", lineHeight: 1.2 }}>
            The Value of DFW HVAC Knowledge
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            HVAC knowledge and proper maintenance are not expenses — they are investments that prevent far larger costs. Here is what that looks like in real DFW dollars.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "36px" }}>
          {[
            { label: "Emergency Replacement", value: "$8,500", desc: "Prevented by maintenance" },
            { label: "Ceiling Damage", value: "$4,200", desc: "Prevented by drain monitoring" },
            { label: "Mold Remediation", value: "$3,800", desc: "Prevented by humidity control" },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: "#0F2040", borderRadius: "12px", padding: "20px", textAlign: "center", border: "1px solid #1e3a5f" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#F5E642", marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>{stat.label}</div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff", marginBottom: "20px", textAlign: "center" }}>
          Select your DFW situation to see the value of proper HVAC care
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
          {situations.map((item, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                backgroundColor: selected === i ? "#F5E642" : "#0F2040",
                color: selected === i ? "#0A1628" : "#fff",
                border: "1px solid " + (selected === i ? "#F5E642" : "#1e3a5f"),
                borderRadius: "10px",
                padding: "16px 20px",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
                transition: "all 0.2s",
                width: "100%",
              }}
            >
              {selected === i ? "✅" : "🏡"} {item.situation}
              {selected === i && (
                <div style={{ marginTop: "12px", fontWeight: "400", color: "#0A1628", lineHeight: 1.6 }}>
                  <div style={{ marginBottom: "8px", fontSize: "0.92rem" }}>💵 <strong>The value:</strong> {item.value}</div>
                  <div style={{ fontSize: "0.92rem" }}>🟡 <strong>ProLnk contribution:</strong> {item.prolnk}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040", borderRadius: "16px", padding: "28px", border: "1px solid #F5E642" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#F5E642", marginBottom: "10px" }}>📋 The Charter Waitlist Closes at 500</h3>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            Charter members lock in founding pricing and permanent Home Health Vault access for their home — before ProLnk goes live to the full DFW market. The value of being first compounds every year you own your home.
          </p>
        </div>
      </div>
    </div>
  );
}
