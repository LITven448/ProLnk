import { useState } from 'react';

const brands = [
  { name: 'GAF', hail: 5, wind: 5, algae: 4, warranty: 5, price: 3, note: 'Class 4 impact shingles available — strongest hail defense in DFW market' },
  { name: 'Owens Corning', hail: 5, wind: 5, algae: 5, warranty: 5, price: 3, note: 'Duration Storm series dominates DFW — most popular after hail events' },
  { name: 'CertainTeed', hail: 4, wind: 4, algae: 5, warranty: 4, price: 3, note: 'Superior algae resistance — great for shaded DFW roofs, solid hail ratings' },
  { name: 'Atlas', hail: 4, wind: 5, algae: 4, warranty: 4, price: 4, note: 'StormMaster Shake rated 130 mph wind — strong value for DFW storms' },
  { name: 'IKO', hail: 3, wind: 4, algae: 3, warranty: 3, price: 5, note: 'Most affordable option — acceptable for low-hail-risk DFW zones' },
];

const recommendations: Record<string, Record<string, string>> = {
  high: { premium: 'Owens Corning', budget: 'GAF' },
  medium: { premium: 'CertainTeed', budget: 'Atlas' },
  low: { premium: 'Atlas', budget: 'IKO' },
};

const labels: Record<string, string> = {
  hail: '🧊 Hail Resistance', wind: '💨 Wind Rating', algae: '🌿 Algae Resistance',
  warranty: '📄 Warranty', price: '💰 Value',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#F5E642′ }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function DFWRoofingBrandsCompared() {
  const [budget, setBudget] = useState('premium');
  const [hailConcern, setHailConcern] = useState('high');
  const [expanded, setExpanded] = useState<string | null>(null);
  const pick = recommendations[hailConcern][budget];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Roofing Brands Compared 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>GAF · Owens Corning · CertainTeed · Atlas · IKO — rated for North Texas hail</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginBottom: 16 }}>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, margin: '0 0 10px' }}>Budget Range</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {['premium', 'budget'].map(b => (
                  <button key={b} onClick={() => setBudget(b)}
                    style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: budget === b ? '#F5E642′ : '#1e3a5f',
                      background: budget === b ? '#F5E642′ : ’transparent',
                      color: budget === b ? '#0A1628′ : '#94a3b8' }}>
                    {b.charAt(0).toUpperCase() + b.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Hail Concern Level</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {['high', 'medium', 'low'].map(h => (
                  <button key={h} onClick={() => setHailConcern(h)}
                    style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: hailConcern === h ? '#F5E642′ : '#1e3a5f',
                      background: hailConcern === h ? '#F5E642′ : ’transparent',
                      color: hailConcern === h ? '#0A1628′ : '#94a3b8' }}>
                    {h.charAt(0).toUpperCase() + h.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '14px 18px', background: '#1a3a6e', borderRadius: 10, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ margin: 0, color: '#F5E642', fontWeight: 700 }}>🏆 Recommended for your DFW roof: {pick}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setExpanded(expanded === b.name ? null : b.name)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer',
                border: b.name === pick ? '2px solid #F5E642′ : '2px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {b.name === pick && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>TOP PICK</span>}
                  <span style={{ fontWeight: 700, fontSize: 18 }}>{b.name}</span>
                </div>
                <span style={{ color: '#94a3b8′ }}>{expanded === b.name ? '▲' : '▼'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 }}>
                {Object.keys(labels).map(k => (
                  <div key={k} style={{ minWidth: 130 }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 3 }}>{labels[k]}</div>
                    <Stars n={(b as any)[k]} />
                  </div>
                ))}
              </div>
              {expanded === b.name && (
                <div style={{ marginTop: 14, padding: '12px 16px', background: '#1a3a6e', borderRadius: 8 }}>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>💡 {b.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          Get matched with top DFW roofing contractors — <span style={{ color: '#F5E642′ }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
