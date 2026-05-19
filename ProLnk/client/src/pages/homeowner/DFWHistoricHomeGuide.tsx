import { useState } from 'react';

const districts = [
  { name: 'Swiss Avenue', city: 'Dallas', era: '1905–1930', style: 'Eclectic Revival' },
  { name: 'Munger Place', city: 'Dallas', era: '1905–1920', style: 'Prairie Craftsman' },
  { name: 'Hollywood Heights', city: 'Dallas', era: '1920–1940', style: 'Bungalow/Tudor' },
  { name: 'M Streets (East Dallas)', city: 'Dallas', era: '1920–1945', style: 'Mixed Revival' },
  { name: 'Fairmount', city: 'Fort Worth', era: '1885–1940', style: 'Victorian/Craftsman' },
];

function decadeCost(year: number, sqft: number) {
  const age = 2026 - year;
  let base = 0;
  if (age >= 85) base = 30000;
  else if (age >= 65) base = 22000;
  else if (age >= 45) base = 15000;
  else base = 10000;
  const sizeMultiplier = sqft / 2000;
  return Math.round(base * sizeMultiplier);
}

export default function DFWHistoricHomeGuide() {
  const [homeYear, setHomeYear] = useState('');
  const [sqft, setSqft] = useState('');
  const [budgetResult, setBudgetResult] = useState<number | null>(null);

  function calculate() {
    const y = parseInt(homeYear);
    const s = parseInt(sqft);
    if (y >= 1800 && y <= 1985 && s > 0) {
      setBudgetResult(decadeCost(y, s));
    }
  }

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e8e8e8', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🏛️</span>
          <span style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 2 }}>HomeOwner Guide</span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', lineHeight: 1.2, marginBottom: 16 }}>
          DFW Historic Home Guide
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 48 }}>
          Owning a Piece of Dallas History
        </p>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>📍 Historic Districts in DFW</h2>
          <p style={{ color: '#9ca3af', marginBottom: 20 }}>Generally, pre-1940 construction qualifies as historic. DFW's most recognized historic districts:</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {districts.map(d => (
              <div key={d.name} style={{ background: '#1a1d27', borderRadius: 10, padding: 20, border: '1px solid #2a2d3a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ fontWeight: 600, color: '#ffffff', marginBottom: 4 }}>{d.name}</p>
                  <p style={{ fontSize: 13, color: '#6b7280′ }}>{d.city} · {d.style}</p>
                </div>
                <span style={{ background: '#1e3a5f', color: '#93c5fd', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>{d.era}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>✅ Benefits of Historic Designation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { icon: '💰', title: 'Tax Abatement', desc: 'Texas Historic Preservation Tax Credit may reduce property tax burden during approved renovations.' },
              { icon: '🏆', title: 'Pride & Identity', desc: 'Historic districts have strong neighborhood associations and consistent aesthetic standards.' },
              { icon: '🔨', title: 'Build Quality', desc: 'Pre-1940 homes often used old-growth lumber, thicker walls, and higher-grade materials than 1980s–2000s builds.' },
            ].map(b => (
              <div key={b.title} style={{ background: '#1a1d27', borderRadius: 10, padding: 22, border: '1px solid #2a2d3a' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{b.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>{b.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>⚠️ Challenges Unique to Historic Homes</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '📋', title: 'HPO Approval Required', cost: 'Time cost', desc: 'Cannot change exterior without Historic Preservation Office approval. Includes siding, windows, doors, additions.' },
              { icon: '☠️', title: 'Lead Paint (pre-1978)', cost: '$2,000–15,000 to remediate', desc: 'Assume present in any pre-1978 home. Encapsulation or full abatement required before renovation.' },
              { icon: '🧶', title: 'Asbestos (pre-1980)', cost: '$1,500–10,000 to remove', desc: 'Common in insulation, floor tiles, popcorn ceilings. Must be professionally tested before disturbing.' },
              { icon: '⚡', title: 'Knob-and-Tube Wiring', cost: '$8,000–25,000 to replace', desc: 'Pre-1940 wiring standard. Modern insurers often refuse coverage without replacement.' },
              { icon: '🪠', title: 'Cast Iron Plumbing', cost: '$5,000–20,000 to replace', desc: '70–100 year old cast iron is reaching end of life. Expect corrosion, root intrusion, slow drains.' },
              { icon: '🪟', title: 'Original Windows', cost: 'Varies by HPO', desc: 'Beautiful but inefficient. Replacement may require HPO approval to maintain historic character.' },
            ].map(c => (
              <div key={c.title} style={{ background: '#1a1d27', borderRadius: 10, padding: 22, border: '1px solid #2a2d3a', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff' }}>{c.title}</h3>
                    <span style={{ background: '#2d1b00', color: '#fb923c', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{c.cost}</span>
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>🧮 Historic Home Budget Checker</h2>
          <div style={{ background: '#1a1d27', borderRadius: 12, padding: 28, border: '1px solid #2a2d3a' }}>
            <p style={{ color: '#9ca3af', marginBottom: 20 }}>Estimated additional maintenance cost per decade compared to an equivalent newer home:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, marginBottom: 6 }}>Year Built</label>
                <input
                  type="number"
                  placeholder="e.g. 1928″
                  value={homeYear}
                  onChange={e => setHomeYear(e.target.value)}
                  style={{ width: '100%', background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: '10px 14px', color: '#ffffff', fontSize: 15 }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, marginBottom: 6 }}>Square Footage</label>
                <input
                  type="number"
                  placeholder="e.g. 2400″
                  value={sqft}
                  onChange={e => setSqft(e.target.value)}
                  style={{ width: '100%', background: '#111827', border: '1px solid #374151', borderRadius: 8, padding: '10px 14px', color: '#ffffff', fontSize: 15 }}
                />
              </div>
            </div>
            <button
              onClick={calculate}
              style={{ background: '#3b82f6', color: '#ffffff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              Calculate Decade Cost
            </button>
            {budgetResult !== null && (
              <div style={{ marginTop: 24, background: '#0f2544', borderRadius: 10, padding: 20, border: '1px solid #3b82f6′ }}>
                <p style={{ color: '#93c5fd', fontSize: 13, marginBottom: 4 }}>Estimated additional maintenance per decade:</p>
                <p style={{ color: '#ffffff', fontSize: 32, fontWeight: 700 }}>
                  ${budgetResult.toLocaleString()}
                </p>
                <p style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
                  This estimate covers typical overruns from aging systems, historic compliance, and material costs vs. comparable modern construction.
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f2544)', borderRadius: 16, padding: 36, textAlign: 'center', border: '1px solid #3b82f6′ }}>
            <span style={{ fontSize: 36 }}>🤖</span>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', margin: '16px 0 12px' }}>TrustyPro AI Scanning for Historic Homes</h2>
            <p style={{ color: '#93c5fd', lineHeight: 1.7, marginBottom: 24, maxWidth: 540, margin: '0 auto 24px' }}>
              Our AI can detect lead paint risk areas, moisture in old cast iron pipe areas, and signs of aging wiring — giving you a comprehensive historic home health picture before issues escalate.
            </p>
            <a
              href="/waitlist/homeowner"
              style={{ display: 'inline-block', background: '#3b82f6', color: '#ffffff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 16 }}
            >
              Get a Free AI Home Scan →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
