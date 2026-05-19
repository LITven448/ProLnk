import { useState } from 'react';

const homeSizes = [
  { id: 'small', label: 'Small (under 1,500 sq ft)', gutterFt: 120, baseCost: 120 },
  { id: 'medium', label: 'Medium (1,500–2,500 sq ft)', gutterFt: 160, baseCost: 175 },
  { id: 'large', label: 'Large (2,500–4,000 sq ft)', gutterFt: 200, baseCost: 225 },
  { id: 'xlarge', label: 'Extra Large (4,000+ sq ft)', gutterFt: 280, baseCost: 320 },
];

const treeLevels = [
  { id: 'low', label: '🌿 Few/No Trees', multiplier: 1.0, cleans: 1, guardPayoff: false },
  { id: 'medium', label: '🌳 Some Trees Nearby', multiplier: 1.15, cleans: 2, guardPayoff: false },
  { id: 'heavy', label: '🌲 Heavy Tree Coverage', multiplier: 1.35, cleans: 3, guardPayoff: true },
  { id: 'pine', label: '🌲🌲 Pine/Oak Overhanging', multiplier: 1.5, cleans: 4, guardPayoff: true },
];

export default function DFWGutterCleaningGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [treeLevel, setTreeLevel] = useState('');

  const home = homeSizes.find(h => h.id === homeSize);
  const trees = treeLevels.find(t => t.id === treeLevel);
  const annualCost = home && trees ? Math.round(home.baseCost * trees.multiplier * trees.cleans) : null;
  const guardCost = home ? Math.round(home.gutterFt * 7.5) : null;
  const payoff = trees?.guardPayoff && annualCost && guardCost ? Math.round(guardCost / annualCost) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🏠</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Services Guide</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Gutter Cleaning Guide for DFW
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            In DFW, gutters don't just prevent water damage — they protect your foundation. Clay soil expands and contracts dramatically with moisture. Proper gutter function is critical to keeping that water away from your slab.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏗️ The DFW Foundation Connection</h2>
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054′ }}>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: '0 0 12px' }}>
              DFW sits on expansive clay soil (Blackland Prairie) that swells when wet and shrinks when dry. Foundation repair in DFW costs $5,000–$25,000. Clogged gutters that overflow near your foundation accelerate this cycle and are one of the top causes of foundation movement.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#F5E642′ }}>Minimum recommended:</strong> Clean gutters twice yearly — once in late November after fall leaves, and once in late March after spring pollen and seed pods.
            </p>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🌧️ What's Included in a Professional Cleaning</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 40 }}>
            {[
              { icon: '🧹', title: 'Debris Removal', desc: 'All leaves, seeds, and buildup removed by hand' },
              { icon: '💧', title: 'Flush & Flow Test', desc: 'Water flushed through to confirm drainage' },
              { icon: '🔩', title: 'Downspout Check', desc: 'Clogs cleared, extensions inspected' },
              { icon: '🔍', title: 'Visual Inspection', desc: 'Sags, separations, and damage noted' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111E33', border: '1px solid #1E3054', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#E8EDF5′ }}>{item.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054′ }}>
            <h3 style={{ color: '#E8EDF5', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📏 Downspout Extensions</h3>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: '0 0 8px' }}>
              Downspouts should discharge water at least 4–6 feet from the foundation. In DFW, many pros recommend 6–10 feet given clay soil conditions. Splash blocks alone are rarely sufficient.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>Cost: Downspout extensions run $10–$30 each at hardware stores, or $50–$150 installed professionally per downspout.</p>
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 14, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🧮 Cleaning Frequency & Cost Calculator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select your home size and tree coverage to get a DFW-specific recommendation.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Home Size</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {homeSizes.map(h => (
                <button key={h.id} onClick={() => setHomeSize(h.id)} style={{
                  textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: homeSize === h.id ? '#F5E642′ : '#1E3054',
                  background: homeSize === h.id ? 'rgba(245,230,66,0.1)' : 'transparent',
                  color: homeSize === h.id ? '#F5E642′ : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: ’pointer'
                }}>{h.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Tree Coverage Near Home</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {treeLevels.map(t => (
                <button key={t.id} onClick={() => setTreeLevel(t.id)} style={{
                  textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: treeLevel === t.id ? '#F5E642′ : '#1E3054',
                  background: treeLevel === t.id ? 'rgba(245,230,66,0.1)' : 'transparent',
                  color: treeLevel === t.id ? '#F5E642′ : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: ’pointer'
                }}>{t.label}</button>
              ))}
            </div>
          </div>

          {annualCost && trees && guardCost && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3054′ }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Cleanings Per Year</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{trees.cleans}x</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Annual Cost</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>${annualCost}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Gutter Guards Install</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#E8EDF5′ }}>${guardCost}</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #1E3054', paddingTop: 14 }}>
                {trees.guardPayoff && payoff
                  ? <p style={{ color: '#F5E642', fontSize: 14, margin: 0 }}>✅ Gutter guards likely pay off in ~{payoff} years given your tree coverage. Look for micro-mesh guards ($6–$12/ft installed).</p>
                  : <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>💡 With low tree coverage, gutter guards may not pay off. Regular cleaning is the cost-effective choice.</p>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
