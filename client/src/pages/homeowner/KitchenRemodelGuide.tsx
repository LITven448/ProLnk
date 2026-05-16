import { useState } from 'react';

const tiers = [
  {
    name: 'Refresh',
    range: '$5,000–$15,000',
    emoji: '🔄',
    color: '#60a5fa',
    includes: [
      'New cabinet hardware & paint',
      'Laminate countertops',
      'New faucet & sink',
      'Updated lighting fixtures',
      'Fresh backsplash tile',
      'Appliance refresh (1–2 items)',
    ],
    roi: '65%',
    desc: 'Cosmetic upgrades that modernize without a full renovation. Great for rentals or quick-sell prep.',
  },
  {
    name: 'Mid-Range',
    range: '$15,000–$40,000',
    emoji: '🛠️',
    color: '#F5E642',
    includes: [
      'Semi-custom cabinets',
      'Quartz or granite countertops',
      'New appliance suite',
      'Tile flooring',
      'Under-cabinet lighting',
      'New layout adjustments (minor)',
    ],
    roi: '72%',
    desc: 'The most popular DFW remodel tier. Significant quality upgrade with strong resale return.',
  },
  {
    name: 'Full Gut',
    range: '$40,000–$100,000+',
    emoji: '🏗️',
    color: '#a78bfa',
    includes: [
      'Custom cabinetry floor-to-ceiling',
      'High-end stone countertops',
      'Professional appliance suite',
      'Layout reconfiguration',
      'Hardwood or luxury flooring',
      'Island addition, custom hood',
    ],
    roi: '60%',
    desc: 'Complete transformation. Best for forever homes or luxury market positioning.',
  },
];

const allocs = [
  { label: 'Cabinets', pct: 0.30, emoji: '🗄️' },
  { label: 'Countertops', pct: 0.12, emoji: '🪨' },
  { label: 'Appliances', pct: 0.15, emoji: '🍳' },
  { label: 'Labor', pct: 0.28, emoji: '👷' },
  { label: 'Flooring', pct: 0.08, emoji: '🪵' },
  { label: 'Misc / Lighting', pct: 0.07, emoji: '💡' },
];

export default function KitchenRemodelGuide() {
  const [budget, setBudget] = useState('');
  const [showAlloc, setShowAlloc] = useState(false);
  const [activeTier, setActiveTier] = useState(1);

  const parsed = parseInt(budget.replace(/\D/g, ''), 10) || 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW KITCHEN REMODEL GUIDE</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.15 }}>Kitchen Remodel Guide for DFW Homeowners</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, margin: 0 }}>Kitchen remodels return 60–80% of cost at resale — and DFW buyers rate kitchens as the #1 factor in purchasing decisions.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🏷️ The 3 Remodel Tiers</h2>
          <div style={{ display: 'flex', gap: 0, background: '#112240', borderRadius: 12, padding: 4, marginBottom: 28, width: 'fit-content' }}>
            {tiers.map((t, i) => (
              <button key={i} onClick={() => setActiveTier(i)}
                style={{ padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15, background: activeTier === i ? t.color : 'transparent', color: activeTier === i ? '#0A1628' : '#94a3b8', transition: 'all 0.2s' }}>
                {t.emoji} {t.name}
              </button>
            ))}
          </div>

          {(() => {
            const t = tiers[activeTier];
            return (
              <div style={{ background: '#112240', borderRadius: 16, padding: '28px', border: `2px solid ${t.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{t.emoji} {t.name} Remodel</h3>
                    <div style={{ color: t.color, fontWeight: 700, fontSize: 20, marginTop: 6 }}>{t.range}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 12, padding: '12px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Avg ROI</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#4ade80' }}>{t.roi}</div>
                  </div>
                </div>
                <p style={{ color: '#94a3b8', marginBottom: 20 }}>{t.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
                  {t.includes.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'center', color: '#cbd5e1', fontSize: 14 }}>
                      <span style={{ color: '#4ade80' }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        <div style={{ marginTop: 48, background: '#112240', borderRadius: 16, padding: '32px 28px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>💰 Budget Allocator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>Enter your total budget and see how DFW contractors typically allocate spend.</p>

          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#0A1628', borderRadius: 10, border: '2px solid #1e3a5f', padding: '12px 18px', gap: 8, flex: '1 1 200px' }}>
              <span style={{ color: '#F5E642', fontSize: 20 }}>$</span>
              <input
                type="text"
                placeholder="Enter your budget"
                value={budget}
                onChange={e => { setBudget(e.target.value); setShowAlloc(false); }}
                style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 18, fontWeight: 600, width: '100%' }}
              />
            </div>
            <button
              onClick={() => setShowAlloc(true)}
              disabled={parsed < 1000}
              style={{ background: parsed >= 1000 ? '#F5E642' : '#1e3a5f', color: parsed >= 1000 ? '#0A1628' : '#4a6080', border: 'none', borderRadius: 10, padding: '14px 28px', fontWeight: 700, fontSize: 15, cursor: parsed >= 1000 ? 'pointer' : 'not-allowed' }}
            >Calculate Allocation</button>
          </div>

          {showAlloc && parsed >= 1000 && (
            <div style={{ display: 'grid', gap: 12 }}>
              {allocs.map((a, i) => {
                const amount = Math.round(parsed * a.pct);
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 120, fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>{a.emoji} {a.label}</div>
                    <div style={{ flex: 1, background: '#0A1628', borderRadius: 20, height: 12, overflow: 'hidden' }}>
                      <div style={{ width: `${a.pct * 100 / 0.30 * 30}%`, background: '#F5E642', height: '100%', borderRadius: 20 }} />
                    </div>
                    <div style={{ width: 90, textAlign: 'right', color: '#F5E642', fontWeight: 700 }}>${amount.toLocaleString()}</div>
                    <div style={{ width: 40, textAlign: 'right', color: '#94a3b8', fontSize: 13 }}>{Math.round(a.pct * 100)}%</div>
                  </div>
                );
              })}
              <div style={{ marginTop: 8, paddingTop: 16, borderTop: '1px solid #1e3a5f', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>Total Budget</span>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>${parsed.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 48, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 16, padding: '28px 24px' }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🔧 Ready to Start Your Kitchen Remodel?</h3>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects DFW homeowners with vetted kitchen remodelers — get 3 quotes in 24 hours, no commitment required.</p>
        </div>
      </div>
    </div>
  );
}
