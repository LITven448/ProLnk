import { useState } from 'react';

export default function DFWNewGraduateHomeGuide2026() {
  const [income, setIncome] = useState("");

  const guides: Record<string, { title: string; icon: string; detail: string }[]> = {
    low: [
      { icon: "⏳", title: "Wait 2 Years First", detail: "FHA requires 2 years employment history. Use this time to save 3.5% down + closing costs (~$10–15K on a $250K home)." },
      { icon: "🏘️", title: "Target Garland / Grand Prairie", detail: "DFW affordable entry: Garland, Grand Prairie, Mesquite, and Lancaster have homes $160–220K — reachable on $45K income." },
      { icon: "💵", title: "Texas DPA Programs", detail: "My First Texas Home offers up to 5% DPA + below-market rate. At $45K income you likely qualify for most programs." },
    ],
    mid: [
      { icon: "🏠", title: "FHA 3.5% Down — Go Now", detail: "At $55–70K income with 2yr employment, FHA qualifies you for $250–320K homes. Down payment: $8,750–11,200." },
      { icon: "📊", title: "Rent vs. Buy Math", detail: "DFW rent averages $1,650/mo. A $270K FHA mortgage is $1,820/mo PITI — but you're building equity. Buy if staying 3+ years." },
      { icon: "🌱", title: "Buy Small, Build Equity", detail: "A $220K townhome in Mesquite builds $30–50K equity in 5 years. Use that to trade up. Don't wait for the perfect home." },
    ],
    high: [
      { icon: "🔑", title: "Conventional 5% Down", detail: "At $80K+ income you can avoid FHA and go conventional — lower insurance costs, faster equity build." },
      { icon: "📍", title: "Plano / Frisco / Allen Access", detail: "On $85K+ you can qualify for $350–420K homes in Collin County — some of DFW's best appreciation corridors." },
      { icon: "💡", title: "Consider House Hacking", detail: "Buy a duplex or home with ADU — rent the second unit to offset mortgage. DFW market has solid inventory." },
    ],
  };

  const labels: Record<string, string> = {
    low: "Under $50K / year",
    mid: "$50K–$80K / year",
    high: "$80K+ / year",
  };

  return (
    <div style={{ background: "#0A1628″, minHeight: "100vh", padding: "40px 20px", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, marginBottom: 8 }}>DFW New Graduate Home Buying Guide 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Buying your first DFW home as a new grad — real numbers, real strategy.</p>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: "#F5E642″, marginBottom: 12 }}>📊 DFW Market Reality for Grads</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {([["Avg DFW Home", "$335K", "2026 median"], ["FHA Min Down", "3.5%", "$11,725 on $335K"], ["Rent vs Buy", "$1,650 rent", "$1,950 PITI avg"]] as [string, string, string][]).map(([label, val, sub]) => (
              <div key={label} style={{ background: "#0f172a", borderRadius: 8, padding: 12, textAlign: "center" }}>
                <div style={{ color: "#94a3b8″, fontSize: 12 }}>{label}</div>
                <div style={{ color: "#F5E642″, fontWeight: 800, fontSize: 18 }}>{val}</div>
                <div style={{ color: "#64748b", fontSize: 11 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>Select your starting income:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {Object.keys(labels).map(k => (
              <button key={k} onClick={() => setIncome(k)}
                style={{ background: income === k ? "#F5E642″ : "#0f172a", color: income === k ? "#0A1628" : "#fff", border: "1px solid #334155", borderRadius: 8, padding: "12px 10px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                {labels[k]}
              </button>
            ))}
          </div>
        </div>

        {income && guides[income] && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            <h2 style={{ color: "#F5E642″, fontSize: 18 }}>Your DFW Buying Feasibility Guide:</h2>
            {guides[income].map((g, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 10, padding: 16, borderLeft: "4px solid #F5E642″ }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{g.icon} {g.title}</div>
                <div style={{ color: "#94a3b8″, fontSize: 14 }}>{g.detail}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "#F5E642″, borderRadius: 12, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>🔗</div>
          <div style={{ color: "#0A1628″, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ProLnk — Protect Your First Home</div>
          <div style={{ color: "#1e293b", fontSize: 14 }}>Once you buy, ProLnk connects you with verified DFW contractors — so your first home stays in top condition.</div>
        </div>
      </div>
    </div>
  );
}
