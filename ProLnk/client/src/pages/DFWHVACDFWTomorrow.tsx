import { useState } from "react";

const tomorrows = [
  {
    yours: "I want to be ready for summer 2026 heat",
    vision: "By June 2026, ProLnk will have matched thousands of DFW homeowners with vetted contractors for pre-season tune-ups. Your Home Health Vault will show your system is summer-ready — with documentation.",
  },
  {
    yours: "I am curious about heat pumps for DFW",
    vision: "Heat pump adoption in DFW will accelerate through 2026-2027 as federal incentives phase in and equipment costs drop. ProLnk is building the largest certified heat pump installer network in the metro.",
  },
  {
    yours: "I want to know my home's full health history",
    vision: "The Home Health Vault will cover every DFW home by 2028 — not just HVAC, but plumbing, electrical, roofing, and foundation. Your home becomes a living document that grows smarter every year.",
  },
  {
    yours: "I am tired of reactive repairs",
    vision: "ProLnk's AI maintenance alert system — launching post-Charter — will notify you 30-60 days before predicted failures based on your system's age, usage, and DFW seasonal patterns. Reactive repairs become a relic.",
  },
  {
    yours: "I want to know when ProLnk fully launches",
    vision: "ProLnk goes live to the full DFW market after the Charter waitlist closes at 500. Charter members get priority access, founding pricing locked permanently, and first access to every new feature.",
  },
  {
    yours: "I am thinking about selling my home in a few years",
    vision: "By 2027-2028, Home Health Vault records will be standard in DFW real estate transactions — like carfax for homes. Charter members will have the longest, most complete histories — a tangible asset at closing.",
  },
];

export default function DFWHVACDFWTomorrow() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#0A1628", minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px 20px" }}>
      <div style={{ maxWidth: "820px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔭</div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#F5E642", marginBottom: "16px", lineHeight: 1.2 }}>
            What Is Coming for DFW HVAC
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: "620px", margin: "0 auto", lineHeight: 1.7 }}>
            Summer 2026, heat pump adoption, ProLnk full launch, Home Health Vault for every DFW home, AI maintenance alerts — here is ProLnk's vision for the next 2 years and how it connects to your tomorrow.
          </p>
        </div>

        <div style={{ backgroundColor: "#0F2040", borderRadius: "16px", padding: "28px", marginBottom: "32px", border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#F5E642", marginBottom: "12px" }}>🗓️ The ProLnk Timeline</h2>
          <div style={{ display: "grid", gap: "12px" }}>
            {[
              { when: "May 2026", what: "Charter waitlist closes at 500 — founding pricing locks forever" },
              { when: "Summer 2026", what: "ProLnk goes live — full matching, Home Health Vault, verified contractor network" },
              { when: "Fall 2026", what: "AI maintenance alerts launch — predictive failure warnings for every enrolled home" },
              { when: "2027", what: "Heat pump installer network completes — largest certified HP network in DFW" },
              { when: "2028", what: "Home Health Vault for all DFW — standard in real estate transactions" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ backgroundColor: "#F5E642", color: "#0A1628", borderRadius: "6px", padding: "4px 10px", fontSize: "0.8rem", fontWeight: "700", whiteSpace: "nowrap", flexShrink: 0 }}>{item.when}</div>
                <div style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.5 }}>{item.what}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#fff", marginBottom: "20px", textAlign: "center" }}>
          Select your tomorrow to see ProLnk's vision for your DFW HVAC
        </h2>

        <div style={{ display: "grid", gap: "12px", marginBottom: "32px" }}>
          {tomorrows.map((item, i) => (
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
              {selected === i ? "✅" : "🔮"} {item.yours}
              {selected === i && (
                <div style={{ marginTop: "10px", fontSize: "0.92rem", fontWeight: "400", color: "#0A1628", lineHeight: 1.6 }}>
                  🚀 {item.vision}
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: "#0F2040", borderRadius: "16px", padding: "28px", border: "1px solid #F5E642" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#F5E642", marginBottom: "10px" }}>🏁 The Charter Advantage Compounds</h3>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            Every improvement ProLnk ships — AI alerts, heat pump network, Vault expansion, real estate integration — is available to Charter members first and at founding pricing permanently. Being early is not just symbolic. In a compounding platform, it is a measurable financial advantage that grows every year.
          </p>
        </div>
      </div>
    </div>
  );
}
