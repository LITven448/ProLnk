import { useState } from 'react';

const CITY_HARDNESS: Record<string, number> = {
  'Dallas': 16,
  'Fort Worth': 14,
  'Plano': 17,
  'Arlington': 15,
  'Frisco': 18,
  'McKinney': 17,
  'Irving': 15,
  'Garland': 16,
  'Denton': 13,
  'Allen': 17,
  'Other DFW': 15,
};

function getCostComparison(hardness: number) {
  const applianceLifeLoss = hardness > 15 ? 30 : 20;
  const applianceCostWithout = 12000;
  const applianceCostWith = applianceCostWithout * (1 - applianceLifeLoss / 100);
  const softenerCost = hardness > 15 ? 2200 : 1500;
  const saltAnnual = 180;
  const savingsOverTen = applianceCostWithout - applianceCostWith - softenerCost - saltAnnual * 10;
  return { applianceCostWithout, applianceCostWith, softenerCost, saltAnnual, savingsOverTen };
}

function getRecommendation(hardness: number) {
  if (hardness >= 17) return { type: 'Dual-Tank Salt-Based Softener', reason: 'Extremely hard water requires maximum capacity. Dual tank ensures no downtime during regeneration.' };
  if (hardness >= 14) return { type: 'Salt-Based Ion Exchange Softener', reason: 'Standard solution for DFW\’s hard water. Most cost-effective for whole-home protection.' };
  return { type: 'Salt-Free Conditioner', reason: 'Moderate hardness — a conditioner prevents scale without the ongoing salt cost.' };
}

export default function DFWWaterSoftenerGuide() {
  const [city, setCity] = useState('Dallas');
  const [customHardness, setCustomHardness] = useState('');
  const [showCalc, setShowCalc] = useState(false);

  const hardness = customHardness ? parseInt(customHardness) : CITY_HARDNESS[city] ?? 15;
  const rec = getRecommendation(hardness);
  const costs = getCostComparison(hardness);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>💧 DFW WATER QUALITY GUIDE</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>Water Softener Guide<br /><span style={{ color: '#F5E642' }}>for DFW Homeowners</span></h1>
          <p style={{ fontSize: 16, color: '#8BA3C7', maxWidth: 620, margin: 0 }}>Dallas-Fort Worth sits on one of the hardest water regions in the US. Limestone aquifers push hardness levels to 14–18 GPG — nearly 3× the national average. Here's what that means for your home.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🪨 Why DFW Water Is So Hard</h2>
          <p style={{ color: '#C0D0E8', lineHeight: 1.7 }}>DFW's water supply draws from the Trinity, Elm Fork, and West Fork river basins — all flowing through the Austin Chalk and Eagle Ford limestone formations. As water percolates through these layers, it absorbs calcium and magnesium carbonate, driving hardness to 14–18 grains per gallon (GPG). The EPA considers anything above 7 GPG "hard." DFW averages more than double that.</p>
        </section>

        <section style={{ marginTop: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>⚠️ Effects on Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🔧', title: 'Pipes & Fixtures', desc: 'Scale buildup narrows pipe diameter 15–20% in 10 years. Faucet aerators clog every 6–12 months.' },
              { icon: '🫧', title: 'Water Heaters', desc: 'Scale reduces efficiency 25–40%. DFW water heaters last 8–10 yrs vs 12 yr national average.' },
              { icon: '👕', title: 'Appliances', desc: 'Dishwashers, washing machines, and ice makers all suffer scale buildup that shortens lifespan.' },
              { icon: '🚿', title: 'Skin & Hair', desc: 'Hard water strips natural oils, causes dry skin, and makes hair feel dull and flat.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🔬 Water Softener Types</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F5E642', color: '#0A1628' }}>
                  {['Type', 'How It Works', 'Best For', 'Cost Installed', 'Ongoing'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Salt-Based Ion Exchange', 'Replaces Ca²⁺/Mg²⁺ with Na⁺', 'DFW 14+ GPG', '$1,200–2,200', '$120–200/yr salt'],
                  ['Salt-Free Conditioner', 'Crystallizes minerals (no removal)', 'Moderate hardness', '$800–1,500', 'Near zero'],
                  ['Dual-Tank Salt-Based', '2 tanks = continuous soft water', 'Very hard / large homes', '$2,000–3,000', '$180–240/yr salt'],
                  ['Reverse Osmosis (add-on)', 'Removes all minerals at tap', 'Drinking water only', '$300–600', '$50–100/yr filters'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#0E1E35' : '#112240' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 14px', color: j === 0 ? '#F5E642' : '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 40, background: '#112240', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🧮 DFW Water Hardness Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>SELECT YOUR CITY</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15 }}>
                {Object.keys(CITY_HARDNESS).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>OVERRIDE HARDNESS (GPG)</label>
              <input type="number" placeholder={`Default: ${CITY_HARDNESS[city]}`} value={customHardness} onChange={e => setCustomHardness(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#8BA3C7', marginBottom: 4 }}>YOUR WATER HARDNESS</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: hardness >= 16 ? '#FF6B6B' : hardness >= 13 ? '#F5E642' : '#4ECDC4' }}>{hardness} GPG</div>
            <div style={{ fontSize: 13, color: '#8BA3C7', marginTop: 4 }}>{hardness >= 17 ? 'Extremely Hard' : hardness >= 14 ? 'Very Hard' : hardness >= 10 ? 'Hard' : 'Moderately Hard'}</div>
          </div>

          <div style={{ background: '#0D1B2E', border: '1px solid #1E3A5F', borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ RECOMMENDATION</div>
            <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 6 }}>{rec.type}</div>
            <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.6 }}>{rec.reason}</div>
            <div style={{ marginTop: 12, fontWeight: 700, color: '#F5E642' }}>Estimated Installed Cost: ${costs.softenerCost.toLocaleString()}</div>
          </div>

          <button onClick={() => setShowCalc(!showCalc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            {showCalc ? '▲ Hide' : '▼ Show'} 10-Year Cost Comparison
          </button>

          {showCalc && (
            <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Without Softener', items: [`Appliance replacement: $${costs.applianceCostWithout.toLocaleString()}`, 'Higher energy bills (scale buildup)', 'More frequent plumber visits', `10-yr total: ~$${(costs.applianceCostWithout + 2400).toLocaleString()}`], color: '#FF6B6B' },
                { label: 'With Softener', items: [`Softener installed: $${costs.softenerCost.toLocaleString()}`, `Salt over 10 yrs: $${(costs.saltAnnual * 10).toLocaleString()}`, `Protected appliances: $${Math.round(costs.applianceCostWith).toLocaleString()}`, `10-yr total: ~$${Math.round(costs.softenerCost + costs.saltAnnual * 10 + costs.applianceCostWith).toLocaleString()}`], color: '#4ECDC4' },
              ].map(col => (
                <div key={col.label} style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderTop: `3px solid ${col.color}` }}>
                  <div style={{ fontWeight: 800, color: col.color, marginBottom: 10 }}>{col.label}</div>
                  {col.items.map((item, i) => <div key={i} style={{ color: '#C0D0E8', fontSize: 13, marginBottom: 6 }}>• {item}</div>)}
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ marginTop: 40, background: '#0D1B2E', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginBottom: 12 }}>💡 Salt Cost Reality Check</h2>
          <p style={{ color: '#C0D0E8', lineHeight: 1.7, margin: 0 }}>A typical DFW household uses 1–2 bags of softener salt per month ($8–15/bag). That's $96–360/year. Compared to $400–600 in water heater efficiency losses and shortened appliance life, the math consistently favors softening. Most DFW homeowners break even within 2–3 years.</p>
        </section>

        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#0A1628', marginBottom: 8 }}>Get a Free Water Softener Quote</div>
          <p style={{ color: '#112240', margin: '0 0 16px' }}>Licensed DFW plumbers will test your water hardness and recommend the right system for your home.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '14px 32px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Request Free Quote →</div>
        </div>
      </div>
    </div>
  );
}
