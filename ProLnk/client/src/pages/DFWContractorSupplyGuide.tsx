import { useState } from 'react';

const supplyMatrix = [
  { material: "Faucets and fixtures", source: "Ferguson Plumbing Supply", locations: "Richardson, Addison, Fort Worth", savings: "20–35% vs retail", tip: "Walk-in welcome. Ask for the showroom — they carry Kohler, Moen, Delta at contractor pricing." },
  { material: "Rough plumbing (pipe, fittings)", source: "Ferguson or Dallas Wholesale Plumbing", locations: "Multiple DFW", savings: "25–40% vs HD", tip: "Bring your pipe measurements. They'll cut PVC to length." },
  { material: "HVAC equipment and parts", source: "Johnstone Supply", locations: "Dallas, Arlington, Irving, Plano", savings: "30–50% vs retail", tip: "Open to homeowners. Best for Goodman, Carrier parts, contactors, capacitors. Bring model number." },
  { material: "HVAC refrigerant (R-410A, R-22)", source: "Johnstone Supply (licensed only)", locations: "Multiple DFW", savings: "N/A — license required", tip: "You must have an EPA 608 cert to buy refrigerant. Johnstone cannot sell to uncertified buyers." },
  { material: "Electrical wire and conduit", source: "Dealers Electrical Supply", locations: "Carrollton, Irving, Garland", savings: "15–30% vs HD", tip: "Ask for 500-foot spools vs by-the-foot. Much cheaper per foot. Romex, THHN, conduit all in stock." },
  { material: "Electrical panels and breakers", source: "Dealers Electrical Supply or Graybar", locations: "DFW metro", savings: "20–35% vs retail", tip: "Graybar in Irving stocks Square D, Eaton, Siemens. Dealers good for residential panels and breakers." },
  { material: "Drywall in bulk", source: "Builder's FirstSource or USG direct", locations: "North and South DFW", savings: "15–25% vs big box", tip: "Minimum orders apply. Builder's FirstSource will deliver to your address. Much cheaper per sheet for 50+ sheets." },
  { material: "Lumber in bulk", source: "Builder's FirstSource or McCoy's", locations: "DFW metro", savings: "10–20% vs HD on volume", tip: "Builder's FirstSource requires a contractor account but homeowners can often buy through a general contractor." },
];

export default function DFWContractorSupplyGuide() {
  const [material, setMaterial] = useState("");

  const result = supplyMatrix.find(r => r.material === material);

  return (
    <div style={{ background: "#0A1628", minHeight: "100vh", color: "#E8EAF0", fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🏭</div>
        <h1 style={{ color: "#F5E642", fontSize: "1.8rem", marginBottom: "0.5rem" }}>DFW Contractor Supply Guide</h1>
        <p style={{ color: "#9BA3B5", marginBottom: "2rem" }}>The stores contractors use that DFW homeowners can also shop — Ferguson, Johnstone, Dealers Electrical, and more. Save 20–40% on materials.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { name: "🔧 Ferguson", trade: "Plumbing", note: "Best plumbing fixture showroom in DFW. Walk in, browse, buy at contractor pricing." },
            { name: "❄️ Johnstone Supply", trade: "HVAC", note: "The HVAC parts house. Bring your unit's model number and they'll pull the part." },
            { name: "⚡ Dealers Electrical", trade: "Electrical", note: "Carrollton flagship stocks the DFW electrical supply chain. Homeowners welcome." },
          ].map(item => (
            <div key={item.name} style={{ background: "#1A2840", borderRadius: 8, padding: "1.25rem" }}>
              <div style={{ fontWeight: 700, color: "#F5E642", marginBottom: "0.25rem" }}>{item.name}</div>
              <div style={{ color: "#9BA3B5", fontSize: "0.8rem", marginBottom: "0.5rem", textTransform: "uppercase" }}>{item.trade}</div>
              <p style={{ color: "#9BA3B5", fontSize: "0.85rem", margin: 0, lineHeight: 1.6 }}>{item.note}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "#1A2840", borderRadius: 8, padding: "1.5rem", marginBottom: "2rem" }}>
          <h3 style={{ color: "#F5E642", marginTop: 0 }}>💡 Why Contractor Supply vs Big Box?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <div style={{ color: "#9BA3B5", fontSize: "0.9rem", lineHeight: 1.7 }}>
                <strong style={{ color: "#E8EAF0" }}>Better quality:</strong> Contractor-grade fixtures last 2–3x longer than builder-grade at big box. Ferguson's base Moen fixture vs HD's builder-grade Moen — different product entirely.
              </div>
            </div>
            <div>
              <div style={{ color: "#9BA3B5", fontSize: "0.9rem", lineHeight: 1.7 }}>
                <strong style={{ color: "#E8EAF0" }}>Real expertise:</strong> Counter staff at Johnstone can diagnose your AC issue from symptoms. That's not available at Home Depot. Worth the drive to a supply house.
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: "#1A2840", borderRadius: 12, padding: "2rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#F5E642", marginTop: 0 }}>Find Your DFW Supply Source</h2>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#9BA3B5", display: "block", marginBottom: "0.5rem" }}>Material Type</label>
            <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: "100%", padding: "0.75rem", background: "#0A1628", color: "#E8EAF0", border: "1px solid #2A3A50", borderRadius: 6 }}>
              <option value="">Select material type...</option>
              {supplyMatrix.map(r => <option key={r.material} value={r.material}>{r.material}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: "#0D2A1A", borderRadius: 8, padding: "1.5rem", border: "2px solid #F5E642" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div><div style={{ color: "#9BA3B5", fontSize: "0.8rem" }}>GO TO</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.source}</div></div>
                <div><div style={{ color: "#9BA3B5", fontSize: "0.8rem" }}>DFW LOCATIONS</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.locations}</div></div>
                <div><div style={{ color: "#9BA3B5", fontSize: "0.8rem" }}>SAVINGS VS RETAIL</div><div style={{ color: "#F5E642", fontWeight: 700 }}>{result.savings}</div></div>
              </div>
              <div style={{ color: "#9BA3B5", borderTop: "1px solid #2A3A50", paddingTop: "1rem", lineHeight: 1.6 }}>💡 {result.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: "#1A2840", borderRadius: 8, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "#9BA3B5", margin: "0 0 1rem" }}>Want a DFW contractor who already has accounts at these supply houses?</p>
          <button style={{ background: "#F5E642", color: "#0A1628", padding: "0.75rem 2rem", borderRadius: 6, border: "none", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>Find a DFW Pro on ProLnk</button>
        </div>
      </div>
    </div>
  );
}
