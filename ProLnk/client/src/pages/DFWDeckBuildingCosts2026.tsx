import { useState } from 'react';

export default function DFWDeckBuildingCosts2026() {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>( 'medium');
  const [material, setMaterial] = useState<'pressure' | 'composite' | 'aluminum'>('pressure');

  const costs: Record<string, Record<string, string>> = {
    small: { pressure: '$5,500–$8,000', composite: '$9,000–$13,000', aluminum: '$10,000–$15,000′ },
    medium: { pressure: '$8,000–$12,000', composite: '$14,000–$20,000', aluminum: '$15,000–$22,000′ },
    large: { pressure: '$14,000–$20,000', composite: '$22,000–$32,000', aluminum: '$26,000–$38,000′ },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🏠 DFW HOME GUIDES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Deck Building Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Real costs for adding a deck in Dallas-Fort Worth — updated for 2026 material and labor prices.</p>

        <div style={{ background: '#111e33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Estimate Your DFW Deck Cost</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Deck Size</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['small', 'medium', 'large'] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: size === s ? '#F5E642′ : '#1e2d45', color: size === s ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {s === 'small' ? '10×12′ : s === ’medium' ? '12×16′ : '16×20'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Material</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['pressure', 'composite', 'aluminum'] as const).map(m => (
                <button key={m} onClick={() => setMaterial(m)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: material === m ? '#F5E642′ : '#1e2d45', color: material === m ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {m === 'pressure' ? 'Pressure Treated' : m === 'composite' ? 'Composite (Trex)' : 'Aluminum'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated DFW Cost</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642′ }}>{costs[size][material]}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>+ $150–400 DFW permit</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌿', title: 'Pressure Treated Lumber', desc: 'Most affordable. Requires sealing every 2–3 years in DFW UV/heat. Great starter deck.' },
            { icon: '🏆', title: 'Composite (Trex/TimberTech)', desc: 'Low maintenance winner for DFW. Heat-stable, fade-resistant, 25-yr warranty common.' },
            { icon: '💠', title: 'Aluminum Decking', desc: 'Premium tier. Hail-resistant, never rots. Best for DFW waterfront/pool decks.' },
            { icon: '📐', title: 'Elevated vs Ground Level', desc: 'Elevated decks add $2,000–5,000 for footings and framing. Required on slopes.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111e33', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e33', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 DFW Deck Permit Notes</h3>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Most DFW cities require a permit for decks over 200 sq ft or 30 inches off ground</li>
            <li>Permit cost: $150–400 depending on city (Dallas, Plano, Frisco vary)</li>
            <li>Railing type (wood vs cable vs glass) adds $1,500–6,000</li>
            <li>HOA approval required in most DFW master-planned communities</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get DFW Deck Quotes in 24 Hours</div>
          <div style={{ color: '#1e2d45', fontSize: 13 }}>ProLnk connects you with vetted DFW deck builders — free, no obligation estimates.</div>
        </div>
      </div>
    </div>
  );
}
