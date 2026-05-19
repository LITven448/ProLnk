import { useState } from 'react';

const paints = [
  { brand: 'Sherwin-Williams Emerald', type: '100% Acrylic Latex', heatRating: '⭐⭐⭐⭐⭐', uvResistance: 'Excellent', coverage: '$65–$85/gal', best: 'DFW premium choice' },
  { brand: 'Behr Marquee Exterior', type: 'Acrylic Latex', heatRating: '⭐⭐⭐⭐', uvResistance: 'Very Good', coverage: '$45–$65/gal', best: 'Best value for DFW' },
  { brand: 'Benjamin Moore Aura Exterior', type: 'Acrylic Latex', heatRating: '⭐⭐⭐⭐⭐', uvResistance: 'Excellent', coverage: '$70–$90/gal', best: 'Top fade resistance' },
  { brand: 'PPG Diamond Exterior', type: 'Acrylic Latex', heatRating: '⭐⭐⭐⭐', uvResistance: 'Good', coverage: '$40–$55/gal', best: 'Budget-friendly' },
];

const colorTrends = [
  { color: 'Warm Greige', hex: '#C4B5A0', desc: 'Dominant in DFW new builds, HOA-safe' },
  { color: 'Soft White', hex: '#F5F0E8', desc: 'Classic, reflects heat, timeless' },
  { color: 'Sage Green', hex: '#8FAF89', desc: 'Trending 2024–2026, earthy feel' },
  { color: 'Navy Blue', hex: '#1B2A4A', desc: 'Modern accent, popular with white trim' },
  { color: 'Charcoal Gray', hex: '#4A4A4A', desc: 'Contemporary, high contrast' },
];

export default function ExteriorPaintGuide() {
  const [sqft, setSqft] = useState('');
  const [stories, setStories] = useState('1');
  const [prep, setPrep] = useState('standard');
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null);

  const calculate = () => {
    const area = parseInt(sqft) || 0;
    if (!area) return;
    const storyMult = stories === '2′ ? 1.35 : stories === '3+' ? 1.6 : 1;
    const prepMult = prep === 'minimal' ? 0.85 : prep === 'standard' ? 1 : 1.3;
    const base = area * 2.5;
    const low = Math.round(base * storyMult * prepMult * 0.85 / 50) * 50;
    const high = Math.round(base * storyMult * prepMult * 1.35 / 50) * 50;
    setEstimate({ low, high });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎨</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Exterior Paint Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
            Best paints for Texas heat & UV, prep steps, color trends, HOA tips & cost estimator
          </p>
        </div>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🌞 Best Paints for DFW Heat & UV</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>DFW gets 230+ sunny days per year and intense UV. You need 100% acrylic latex with proven fade and heat resistance.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1e2d45′ }}>
                  {['Brand', 'Type', 'Heat Rating', 'UV Resistance', 'Price/Gal', 'Best For'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 0.8rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #2d3f58', fontSize: '0.85rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paints.map((p, i) => (
                  <tr key={p.brand} style={{ background: i % 2 === 0 ? '#111f36′ : '#0A1628' }}>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{p.brand}</td>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#cbd5e1', fontSize: '0.8rem' }}>{p.type}</td>
                    <td style={{ padding: '0.75rem 0.8rem', fontSize: '0.85rem' }}>{p.heatRating}</td>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#86efac', fontSize: '0.85rem' }}>{p.uvResistance}</td>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#F5E642', fontWeight: 600, fontSize: '0.85rem' }}>{p.coverage}</td>
                    <td style={{ padding: '0.75rem 0.8rem', color: '#60a5fa', fontSize: '0.8rem' }}>{p.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🛠️ Prep Steps (Don\'t Skip These)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem' }}>
            {[
              ['1', '🚿', 'Power wash', 'Remove all dirt, mildew, chalking. DFW dust is real — skip this and paint fails fast.'],
              ['2', '🔧', 'Repair surfaces', 'Fill cracks, re-caulk joints, replace rotted wood. Heat cycles crack siding fast in TX.'],
              ['3', '🎭', 'Prime bare surfaces', 'Any bare wood, repaired areas, or dark-to-light color changes need primer.'],
              ['4', '🪟', 'Mask & protect', 'Cover windows, doors, trim, plants. DFW wind can carry overspray far.'],
              ['5', '🌡️', 'Watch the weather', 'Apply between 50–90°F, avoid direct midday sun in summer. Early morning is ideal.'],
              ['6', '🖌️', 'Apply 2 coats minimum', 'One coat is never enough for DFW UV. Premium paints may claim 1-coat but 2 always wins.'],
            ].map(([step, icon, title, desc]) => (
              <div key={step} style={{ background: '#1e2d45', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>{step}</span>
                  <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{title}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.83rem', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🎨 DFW Color Trends 2025–2026</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {colorTrends.map(c => (
              <div key={c.color} style={{ flex: '1', minWidth: '140px', background: '#1e2d45', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ height: '60px', background: c.hex }} />
                <div style={{ padding: '0.75rem' }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{c.color}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>🏘️ HOA Color Considerations</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>Over 40% of DFW homes are in HOAs. Before you paint:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Request your HOA\’s approved color palette — most restrict to 3–5 approved colors or families',
                'Submit an Architectural Change Request (ACR) before starting — approval can take 2–4 weeks',
                'Violations typically result in fines of $25–$200/month until corrected',
                'Photographically document your color choice with the brand + code in case of disputes',
              ].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '1rem' }}>💰 Paint Job Cost Estimator</h2>
          <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Home size (sq ft):</label>
                <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2000″
                  style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '100%' }} />
              </div>
              <div>
                <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Stories:</label>
                <select value={stories} onChange={e => setStories(e.target.value)}
                  style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '100%' }}>
                  <option value="1″>1 story</option>
                  <option value="2″>2 stories</option>
                  <option value="3+">3+ stories</option>
                </select>
              </div>
              <div>
                <label style={{ color: '#cbd5e1', display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Prep level:</label>
                <select value={prep} onChange={e => setPrep(e.target.value)}
                  style={{ background: '#0A1628', border: '1px solid #2d3f58', borderRadius: '6px', padding: '0.5rem', color: '#fff', width: '100%' }}>
                  <option value="minimal">Minimal (good condition)</option>
                  <option value="standard">Standard</option>
                  <option value="heavy">Heavy (repairs needed)</option>
                </select>
              </div>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
              Estimate Cost
            </button>
            {estimate && (
              <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Estimated DFW exterior paint cost:</div>
                <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.3rem' }}>Includes labor, materials & standard prep. Get 3 quotes for accuracy.</div>
              </div>
            )}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#1e2d45', borderRadius: '12px' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎨</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Get quotes from vetted DFW painters</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with licensed, insured exterior paint pros</p>
        </div>
      </div>
    </div>
  );
}
