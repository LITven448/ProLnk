import { useState } from 'react';

const BRANDS = [
  { name: "Malarkey Vista AR", class: "Class 4″, warranty: "50-yr", costPremium: "+18%", notes: "Top DFW seller — algae resistant + Class 4" },
  { name: "Owens Corning Duration Storm", class: "Class 4″, warranty: "50-yr", costPremium: "+22%", notes: "SureNail tech, excellent in high-wind zones" },
  { name: "GAF Timberline ArmorShield II", class: "Class 4″, warranty: "lifetime", costPremium: "+20%", notes: "Widest DFW distribution network" },
  { name: "CertainTeed Landmark IR", class: "Class 3″, warranty: "30-yr", costPremium: "+10%", notes: "Budget-friendly IR entry point" },
];

export default function DFWImpactResistantRoofGuide() {
  const [homeSqft, setHomeSqft] = useState("");
  const [roofAge, setRoofAge] = useState("");
  const [claimHistory, setClaimHistory] = useState("none");
  const [result, setResult] = useState<null | { brand: string; stdCost: number; irCost: number; annualSavings: number; payback: number }>(null);

  function calculate() {
    const area = parseFloat(homeSqft);
    const age = parseFloat(roofAge);
    if (!area || !age) return;
    const roofSqft = area * 1.15;
    const stdCost = Math.round(roofSqft * 4.5);
    const irCost = Math.round(roofSqft * 5.4);
    const annualPremium = 2800;
    const discountPct = claimHistory === "multiple" ? 0.25 : claimHistory === "one" ? 0.18 : 0.12;
    const annualSavings = Math.round(annualPremium * discountPct);
    const payback = Math.round((irCost - stdCost) / annualSavings);
    setResult({ brand: BRANDS[0].name, stdCost, irCost, annualSavings, payback });
  }

  return (
    <div style={{ backgroundColor: "#0A1628″, minHeight: "100vh", color: "#E8EDF5", fontFamily: "system-ui, sans-serif", padding: "0 0 60px" }}>
      <div style={{ background: "linear-gradient(135deg, #0A1628 0%, #112240 100%)", padding: "48px 24px 40px", borderBottom: "2px solid #F5E642″ }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#F5E642″, margin: "0 0 12px" }}>DFW Impact Resistant Roof Guide</h1>
          <p style={{ fontSize: 17, color: "#94A3B8″, margin: 0 }}>Class 4 shingles are the single best roofing investment in North Texas. Here is everything you need to know.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 0″ }}>
        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 16 }}>🌨️ Why Class 4 Is Essential in DFW</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              ["📍 Hail Frequency", "DFW averages 10-15 significant hail events per year. Collin, Denton, and Tarrant counties rank top 10 nationally."],
              ["💰 Insurance Discounts", "10-30% annual premium reduction for Class 4 roofs — typical DFW savings: $280–$840/yr."],
              ["🏠 Home Value", "Buyers in DFW increasingly request IR certification — documented 1-3% value premium."],
              ["⏳ Lifespan", "Class 4 shingles typically last 5-8 years longer in hail-prone markets like DFW."],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: "#0A1628″, borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, color: "#E8EDF5″, marginBottom: 6 }}>{title}</div>
                <div style={{ color: "#94A3B8″, fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 6 }}>🔬 Class 3 vs Class 4 Impact Rating</h2>
          <p style={{ color: "#94A3B8″, fontSize: 14, marginBottom: 20 }}>UL 2218 test: 1.75″ steel ball dropped from 17 ft (Class 3) vs 2″ ball at 20 ft (Class 4). Only Class 4 qualifies for max DFW insurance discounts.</p>
          {BRANDS.map((b) => (
            <div key={b.name} style={{ borderBottom: "1px solid #1E3A5F", paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: "#E8EDF5″, marginBottom: 4 }}>{b.name}</div>
                  <div style={{ color: "#94A3B8″, fontSize: 14 }}>{b.notes}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#F5E642″, fontWeight: 700 }}>{b.costPremium} vs standard</div>
                  <div style={{ color: "#64748B", fontSize: 13 }}>{b.class} | {b.warranty} warranty</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "#112240″, borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: "#F5E642″, fontSize: 20, marginBottom: 20 }}>🧮 IR Roof ROI Calculator</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Home Sq Ft</label>
              <input value={homeSqft} onChange={e => setHomeSqft(e.target.value)} placeholder="e.g. 2400″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Current Roof Age (yrs)</label>
              <input value={roofAge} onChange={e => setRoofAge(e.target.value)} placeholder="e.g. 12″ style={{ width: "100%", background: "#0A1628", border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }} />
            </div>
            <div>
              <label style={{ display: "block", color: "#94A3B8″, fontSize: 13, marginBottom: 6 }}>Hail Claim History</label>
              <select value={claimHistory} onChange={e => setClaimHistory(e.target.value)} style={{ width: "100%", background: "#0A1628″, border: "1px solid #1E3A5F", borderRadius: 8, padding: "10px 12px", color: "#E8EDF5", fontSize: 15 }}>
                <option value="none">No prior claims</option>
                <option value="one">One claim</option>
                <option value="multiple">Multiple claims</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: "#F5E642″, color: "#0A1628", border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Calculate ROI</button>
          {result && (
            <div style={{ marginTop: 24, background: "#0A1628″, borderRadius: 10, padding: 20, borderLeft: "4px solid #F5E642" }}>
              <div style={{ color: "#F5E642″, fontWeight: 700, fontSize: 17, marginBottom: 10 }}>📊 {result.brand}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>STANDARD ROOF COST</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>${result.stdCost.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>CLASS 4 UPGRADE COST</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>${result.irCost.toLocaleString()}</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>ANNUAL INS. SAVINGS</div><div style={{ color: "#22C55E", fontWeight: 700 }}>${result.annualSavings}/yr</div></div>
                <div><div style={{ color: "#64748B", fontSize: 12 }}>PAYBACK PERIOD</div><div style={{ color: "#E8EDF5″, fontWeight: 700 }}>{result.payback} yrs</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
