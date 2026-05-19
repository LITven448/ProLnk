import { useState } from 'react';

const trades = [
  {
    trade: "HVAC", icon: "❄️",
    houses: [
      { name: "Johnstone Supply", desc: "Largest HVAC distributor in DFW, multiple locations. Carrier, Lennox, Trane equipment. Contractor account required.", locations: "Dallas, Fort Worth, Arlington, Plano" },
      { name: "Wittichen Supply", desc: "Regional HVAC distributor, strong in commercial equipment and parts. Competitive pricing on refrigerants.", locations: "Dallas, Fort Worth" },
      { name: "Gemaire Distributors", desc: "Goodman/Daikin brand specialist in DFW. Popular for value-tier residential installs.", locations: "Grand Prairie, Garland" },
    ]
  },
  {
    trade: "Plumbing", icon: "🔧",
    houses: [
      { name: "Ferguson Enterprises", desc: "Premier plumbing, HVAC, waterworks distributor. Showroom for fixtures. Pros get trade pricing. Multiple DFW branches.", locations: "Dallas, Fort Worth, Irving, McKinney" },
      { name: "Waxman Supply", desc: "Plumbing wholesale, strong on commodity fittings and valves. Better pricing than box stores on bulk orders.", locations: "Dallas, Garland" },
      { name: "HD Supply", desc: "MRO and plumbing for commercial/multifamily pros. Online ordering with same-day pickup at DFW branches.", locations: "Dallas, Fort Worth, Irving" },
    ]
  },
  {
    trade: "Roofing", icon: "🏠",
    houses: [
      { name: "ABC Supply", desc: "Largest roofing distributor in DFW. Full shingle lines (GAF, Owens Corning, CertainTeed). Delivery to job site.", locations: "10+ DFW locations" },
      { name: "Beacon Roofing Supply", desc: "Competitor to ABC, strong on commercial roofing materials. Good for flat roof systems.", locations: "Dallas, Fort Worth, Denton" },
      { name: "SRS Distribution", desc: "Growing DFW presence. Competitive on storm-damage shingle orders which are frequent in DFW hail season.", locations: "Dallas, Fort Worth" },
    ]
  },
  {
    trade: "Electrical", icon: "⚡",
    houses: [
      { name: "Platt Electric Supply", desc: "Full-line electrical distributor. Wire, breakers, panels, conduit. Contractor accounts get net-30 terms.", locations: "Dallas, Fort Worth, Garland" },
      { name: "Graybar Electric", desc: "National distributor with strong DFW presence. Commercial and industrial focus. Large inventory of specialty items.", locations: "Dallas, Fort Worth" },
      { name: "Elliott Electric Supply", desc: "Texas-based, strong regional relationships. Known for next-day delivery on special orders in DFW.", locations: "Dallas, Fort Worth, Tyler" },
    ]
  },
];

export default function DFWContractorSupplyHouses2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = trades.find(t => t.trade === selected);

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", padding: "32px 16px", fontFamily: "sans-serif", color: "#fff" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏭</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#F5E642″, margin: "0 0 8px" }}>DFW Contractor Supply Houses 2026</h1>
          <p style={{ color: "#94a3b8″, fontSize: 15 }}>Where DFW pros actually buy materials — not the box store</p>
        </div>

        <div style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 16, marginBottom: 24, border: "1px solid #1e3a5f" }}>
          <p style={{ color: "#F5E642″, fontWeight: 700, fontSize: 13, margin: "0 0 6px" }}>💡 Why Supply Houses Beat Box Stores</p>
          <p style={{ color: "#94a3b8″, fontSize: 13, margin: 0 }}>Contractor-grade materials are thicker, better-rated, and carry longer warranties. Supply house pricing is typically 15–30% lower than Home Depot or Lowes on comparable items. ProLnk pros pass these savings to you.</p>
        </div>

        <h2 style={{ fontSize: 16, color: "#F5E642″, marginBottom: 12 }}>Select Your Trade</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          {trades.map(t => (
            <button key={t.trade} onClick={() => setSelected(t.trade)}
              style={{ backgroundColor: selected === t.trade ? "#F5E642″ : "#111f3a", color: selected === t.trade ? "#0A1628" : "#fff", border: "1px solid #1e3a5f", borderRadius: 10, padding: "14px", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>
              {t.icon} {t.trade}
            </button>
          ))}
        </div>

        {result && (
          <div>
            <h3 style={{ color: "#F5E642″, fontSize: 18, marginBottom: 16 }}>{result.icon} Top DFW {result.trade} Supply Houses</h3>
            {result.houses.map(h => (
              <div key={h.name} style={{ backgroundColor: "#111f3a", borderRadius: 12, padding: 20, marginBottom: 12, border: "1px solid #1e3a5f" }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{h.name}</div>
                <div style={{ color: "#94a3b8″, fontSize: 13, marginBottom: 8 }}>{h.desc}</div>
                <div style={{ fontSize: 12, color: "#F5E642″ }}>📍 {h.locations}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
