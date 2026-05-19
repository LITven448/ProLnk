import { useState } from 'react';

const brands = [
  { name: 'Rheem', icon: '🔥', category: 'Water Heaters', score: 95, note: 'DFW #1 — handles hard water minerals best' },
  { name: 'Bradford White', icon: '💧', category: 'Water Heaters', score: 91, note: 'Commercial-grade, preferred by master plumbers' },
  { name: 'Kohler', icon: '✨', category: 'Fixtures', score: 93, note: 'Premium fixtures with lifetime limited warranty' },
  { name: 'Moen', icon: '🚿', category: 'Faucets', score: 90, note: 'Lifetime warranty, best DFW service network' },
  { name: 'Delta', icon: '🔧', category: 'Faucets', score: 85, note: 'Reliable mid-range, parts widely available in DFW' },
];

const fixtureGuide: Record<string, { brand: string; reason: string }> = {
  'Water Heater': { brand: 'Rheem'  , reason: 'DFW hard water rated, best warranty coverage' },
  'Kitchen Faucet': { brand: 'Moen', reason: 'Lifetime warranty + local DFW service centers' },
  'Bathroom Faucet': { brand: 'Delta', reason: 'Reliable, affordable, easy DFW part sourcing' },
  'Shower System': { brand: 'Kohler', reason: 'Premium finish holds up to DFW chlorinated water' },
  'Commercial Grade': { brand: 'Bradford White', reason: 'Pro-only brand — superior longevity in high-use settings' },
};

export default function DFWPlumbingBrandGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [fixture, setFixture] = useState<string>('Water Heater');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🪠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Plumbing Brand Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Best plumbing brands for Dallas-Fort Worth homes — hard water edition</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⚠️ DFW Hard Water Reality</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            DFW water hardness averages 15–25 grains per gallon — among the hardest in Texas. This accelerates scale buildup in water heaters and corrodes cheaper fixtures within 3–5 years. Brand choice matters more here than in most US cities.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setSelected(selected === b.name ? null : b.name)}
              style={{ background: selected === b.name ? '#1e3a5f' : '#112240', border: `1px solid ${selected === b.name ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 16 }}>{b.name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{b.category}</div>
                  </div>
                </div>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 10px', fontWeight: 800, fontSize: 14 }}>{b.score}/100</div>
              </div>
              {selected === b.name && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 10, borderTop: '1px solid #1e3a5f', paddingTop: 10 }}>{b.note}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Fixture → Brand Recommendation</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(fixtureGuide).map(f => (
              <button key={f} onClick={() => setFixture(f)}
                style={{ background: fixture === f ? '#F5E642' : '#0A1628', color: fixture === f ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>✅ {fixtureGuide[fixture].brand}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6 }}>{fixtureGuide[fixture].reason}</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 28 }}>ProLnk Charter Pros are DFW-verified and brand-agnostic — we match you with quality, not just a name.</p>
      </div>
    </div>
  );
}
