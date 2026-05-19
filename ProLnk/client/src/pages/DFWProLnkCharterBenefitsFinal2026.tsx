import { useState } from 'react';

const trades = ["HVAC", "Roofing", "Plumbing", "Electrical", "Foundation"];
const experienceLevels = ["0-2 years", "3-7 years", "8-15 years", "16+ years"];

const valueCalc = (trade: string, exp: string): { annualValue: number; highlights: string[] } => {
  const baseLeads: Record<string, number> = { HVAC: 48, Roofing: 60, Plumbing: 52, Electrical: 44, Foundation: 36 };
  const avgJob: Record<string, number> = { HVAC: 3200, Roofing: 8500, Plumbing: 2800, Electrical: 2400, Foundation: 7200 };
  const expMultiplier: Record<string, number> = { "0-2 years": 0.7, "3-7 years": 0.9, "8-15 years": 1.1, "16+ years": 1.3 };
  const leads = Math.round(baseLeads[trade] * expMultiplier[exp]);
  const closeRate: Record<string, number> = { "0-2 years": 0.28, "3-7 years": 0.38, "8-15 years": 0.48, "16+ years": 0.55 };
  const closed = Math.round(leads * closeRate[exp]);
  const annualRevenue = closed * avgJob[trade];
  const commission = Math.round(annualRevenue * 0.12);
  const networkOverride = Math.round(commission * 0.25 * 3);
  const annualValue = commission + networkOverride - (149 * 12);

  return {
    annualValue,
    highlights: [
      `~${leads} matched leads/year in DFW ${trade} market`,
      `~${closed} closed jobs at ${Math.round(closeRate[exp] * 100)}% close rate`,
      `$${commission.toLocaleString()} direct commission (12% Charter rate vs 7% Founding)`,
      `$${networkOverride.toLocaleString()} estimated network override (25% of 3 active recruits)`,
      "$1,788/yr locked subscription (vs market rate increases post-waitlist)",
      "First match priority — Charter pros get leads before Founding tier",
      "ProLnk Performance Certification — displayed on your public profile",
      "Exclusive DFW market data — seasonal demand, pricing benchmarks",
    ],
  };
};

export default function DFWProLnkCharterBenefitsFinal2026() {
  const [trade, setTrade] = useState<string>("");
  const [exp, setExp] = useState<string>("");

  const result = trade && exp ? valueCalc(trade, exp) : null;

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏆</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0" }}>
            ProLnk Charter Tier — Definitive Benefits 2026
          </h1>
          <p style={{ color: "#94a3b8″, fontSize: "1rem" }}>
            Calculate your Charter value by trade and experience — DFW market
          </p>
        </div>

        <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>🔧 Your Trade</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {trades.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrade(t)}
                    style={{
                      background: trade === t ? "#F5E642″ : "#1e3a5f",
                      color: trade === t ? "#0A1628″ : "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "0.6rem 1rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      textAlign: "left",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#F5E642″, fontWeight: 700, marginBottom: "0.75rem" }}>📅 Years Experience</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {experienceLevels.map((e) => (
                  <button
                    key={e}
                    onClick={() => setExp(e)}
                    style={{
                      background: exp === e ? "#F5E642″ : "#1e3a5f",
                      color: exp === e ? "#0A1628″ : "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "0.6rem 1rem",
                      cursor: "pointer",
                      fontWeight: 700,
                      textAlign: "left",
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ background: "#0f2040″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
              <div style={{ color: "#94a3b8″, fontSize: "0.9rem" }}>Estimated Annual Charter Value</div>
              <div style={{ color: "#F5E642″, fontSize: "2.5rem", fontWeight: 800 }}>${result.annualValue.toLocaleString()}</div>
              <div style={{ color: "#94a3b8″, fontSize: "0.8rem" }}>net of subscription · {trade} · {exp}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {result.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    background: "#162d4a",
                    borderRadius: 8,
                    padding: "0.75rem",
                    color: i < 4 ? "#e2e8f0″ : "#94a3b8",
                    fontSize: "0.9rem",
                  }}
                >
                  {i < 4 ? "💰" : "✅"} {h}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <div style={{ color: "#0A1628″, fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.25rem" }}>
            Charter Waitlist Closes at 500 Applications
          </div>
          <div style={{ color: "#0A1628″, fontSize: "0.9rem" }}>$149/mo locked forever · First 500 pros only · DFW market open now</div>
        </div>
      </div>
    </div>
  );
}
