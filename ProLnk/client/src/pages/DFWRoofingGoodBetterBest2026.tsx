import { useState } from 'react';

export default function DFWRoofingGoodBetterBest2026() {
  const [priority, setPriority] = useState('');
  const [budget, setBudget] = useState('');

  const getTier = () => {
    if (!priority || !budget) return null;
    if (budget === 'tight') return 'good';
    if (budget === 'premium') return 'best';
    return 'better';
  };

  const tier = getTier();

  const tiers: Record<string, { label: string; points: string[]; note: string }> = {
    good: {
      label: '✅ Good — 30-Year Architectural Shingles',
      points: ['Meets 2026 DFW building code', 'Standard wind resistance: 110 mph', 'No insurance discount', 'Wide color and style selection', 'Est. cost: $8,000–$13,000 installed'],
      note: 'Solid choice for standard replacement. Limited protection in DFW hail alley.',
    },
    better: {
      label: '⭐ Better — Class 4 Impact-Resistant Shingles',
      points: ['UL 2218 Class 4 impact rating', 'Withstands 2-inch hail in testing', 'Insurance discount: 20–40% in DFW', 'Best value for DFW hail risk', 'Est. cost: $11,000–$18,000 installed'],
      note: 'The DFW smart choice. Insurance savings often offset cost premium in 3–5 years.',
    },
    best: {
      label: '🏆 Best — Standing Seam Metal Roofing',
      points: ['50+ year lifespan', 'Superior hail resistance: Class 4 by default', 'Energy reflective: 10–25% HVAC savings', 'Nearly maintenance-free', 'Est. cost: $20,000–$40,000 installed'],
      note: 'The last roof you will ever buy. Best ROI over a 20+ year ownership horizon.',
    },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>🏠 DFW Roofing Good / Better / Best</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW is in the heart of hail alley. One severe storm can total a standard roof. Choose your protection level wisely.</p>
        <div style={{ background: '#0f1f38', borderRadius: 12, padding: 16, marginBottom: 24, border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>🌩️ DFW Hail Alley Fact</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>DFW averages 5+ significant hail events per year and ranks in the top 5 most hail-damaged metros in the US. Roofing tier choice is a financial decision as much as a home decision.</div>
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {Object.entries(tiers).map(([key, t]) => (
            <div key={key} style={{ background: tier === key ? '#1e3a5f' : '#0f1f38', border: `2px solid ${tier === key ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 10, color: tier === key ? '#F5E642' : '#fff' }}>{t.label}</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#cbd5e1', lineHeight: 1.8 }}>
                {t.points.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <div style={{ marginTop: 12, fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>{t.note}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#0f1f38', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🎯 Find Your Roofing Tier</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Top priority</div>
            {([['insurance', '📉 Insurance savings'], ['longevity', '🕐 Long-term ownership'], ['minimal', '💰 Minimal upfront']] as [string,string][]).map(([v, l]) => (
              <button key={v} onClick={() => setPriority(v)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid #1e3a5f', background: priority === v ? '#F5E642' : '#0A1628', color: priority === v ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 12 }}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Budget range</div>
            {([['tight', 'Under $14K'], ['moderate', '$14K–$22K'], ['premium', '$22K+']] as [string,string][]).map(([v, l]) => (
              <button key={v} onClick={() => setBudget(v)} style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: '1px solid #1e3a5f', background: budget === v ? '#F5E642' : '#0A1628', color: budget === v ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          {tier && <div style={{ marginTop: 16, padding: 14, background: '#F5E642', borderRadius: 8, color: '#0A1628', fontWeight: 700 }}>Recommended: {tiers[tier].label}</div>}
        </div>
        <div style={{ marginTop: 32, textAlign: 'center', color: '#64748b', fontSize: 12 }}>ProLnk connects DFW homeowners with verified roofing contractors — prolnk.io</div>
      </div>
    </div>
  );
}
