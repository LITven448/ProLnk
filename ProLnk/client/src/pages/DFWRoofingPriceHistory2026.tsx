import { useState } from 'react';

const years = [
  { id: "2019″, label: "2019", avg: 8500, note: "Pre-pandemic baseline. Labor and materials stable. Standard 3-tab shingles $6,500–$9,000; architectural $8,000–$11,000 for 2,000 sq ft DFW home." },
  { id: "2021″, label: "2021", avg: 11000, note: "COVID supply chain disruption. Material costs surged 25–35%. Fiberglass mat shortages. Contractors fully booked 6–8 weeks out across DFW. Prices spiked rapidly mid-year." },
  { id: "2022″, label: "2022", avg: 12500, note: "Costs stabilized at higher plateau. Labor shortage continued. DFW saw massive hail season driving demand further. Many homeowners waited 3+ months for service." },
  { id: "2023″, label: "2023", avg: 13500, note: "Architectural shingles standard for most DFW reroofs: $12,000–$14,000 average. Premium impact-resistant shingles (Class 4) ran $15,000–$18,000. Insurance incentive driving Class 4 demand." },
  { id: "2024″, label: "2024", avg: 14500, note: "Modest cost increases. Impact-resistant product demand high due to DFW insurance premium discounts. Labor costs up 8% year-over-year. Supply chain normalized but demand remained elevated." },
  { id: "2026″, label: "2026", avg: 15500, note: "Current DFW average: $13,000–$18,000 for architectural shingles on 2,000 sq ft home. Class 4 impact-resistant adds $1,500–$3,000 premium. Metal roofing now $22,000–$35,000 range." },
];

export default function DFWRoofingPriceHistory2026() {
  const [selected, setSelected] = useState("");

  const active = years.find(y => y.id === selected);
  const maxAvg = Math.max(...years.map(y => y.avg));

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628″, color: "#e2e8f0", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem" }}>🏘️</div>
          <h1 style={{ color: "#F5E642″, fontSize: "1.8rem", fontWeight: 700, margin: "0.5rem 0" }}>
            DFW Roofing Price History and Trends 2026
          </h1>
          <p style={{ color: "#94a3b8″, maxWidth: 560, margin: "0 auto" }}>
            How Dallas-Fort Worth roofing costs have changed since 2019 — and what to expect for your project today.
          </p>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1.25rem" }}>📈 Price Trend (2,000 sq ft Home)</h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 140, padding: "0 0.5rem" }}>
            {years.map(y => (
              <div
                key={y.id}
                onClick={() => setSelected(y.id === selected ? "" : y.id)}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
              >
                <div style={{ color: "#94a3b8″, fontSize: "0.7rem", marginBottom: 4 }}>${(y.avg/1000).toFixed(0)}K</div>
                <div style={{ width: "100%", background: selected === y.id ? "#F5E642″ : "#1e3a5f", borderRadius: "4px 4px 0 0", height: `${(y.avg / maxAvg) * 100}px`, transition: "all 0.2s" }} />
                <div style={{ color: selected === y.id ? "#F5E642″ : "#64748b", fontSize: "0.78rem", marginTop: 4, fontWeight: selected === y.id ? 700 : 400 }}>{y.label}</div>
              </div>
            ))}
          </div>
        </div>

        {active && (
          <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", borderLeft: "4px solid #F5E642", marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#F5E642″, margin: "0 0 0.5rem" }}>📅 {active.label} — ${active.avg.toLocaleString()} Average</h3>
            <p style={{ color: "#cbd5e1″, lineHeight: 1.7, margin: 0 }}>{active.note}</p>
          </div>
        )}

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
          <h2 style={{ color: "#F5E642″, fontSize: "1.1rem", marginBottom: "1rem" }}>📊 What Drove DFW Costs Up</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "0.75rem" }}>
            {[
              { icon: "⚠️", label: "Supply Chain", text: "Fiberglass mat and asphalt shortages 2021–2022″ },
              { icon: "👷", label: "Labor Shortage", text: "Roofing crews in short supply across DFW metro" },
              { icon: "🌩️", label: "Hail Demand", text: "Major DFW hail events create surge pricing periods" },
              { icon: "🛡️", label: "Insurance Shift", text: "Class 4 impact-resistant demand drives premium product volume" },
            ].map(item => (
              <div key={item.label} style={{ background: "#0A1628″, borderRadius: 8, padding: "0.875rem" }}>
                <div style={{ fontSize: "1.25rem" }}>{item.icon}</div>
                <div style={{ color: "#F5E642″, fontWeight: 600, margin: "4px 0" }}>{item.label}</div>
                <div style={{ color: "#94a3b8″, fontSize: "0.82rem" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ color: "#94a3b8″, margin: 0, fontSize: "0.9rem" }}>
            🏠 Ready to get DFW roofing quotes? <span style={{ color: "#F5E642″ }}>ProLnk connects you with licensed roofers for competitive bids.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
