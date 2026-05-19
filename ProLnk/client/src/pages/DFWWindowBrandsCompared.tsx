import { useState } from 'react';

const brands = [
  { name: 'Andersen', shgc: 5, lowe: 5, warranty: 5, price: 2, dealer: 4, note: 'Best-in-class SHGC ratings — 400 series blocks DFW solar heat gain exceptionally well' },
  { name: 'Pella', shgc: 5, lowe: 5, warranty: 4, price: 3, dealer: 5, note: 'Insynctive smart window tech + strong DFW dealer network, premium energy performance' },
  { name: 'Simonton', shgc: 4, lowe: 4, warranty: 4, price: 4, dealer: 4, note: 'Best value vinyl — solid DFW heat performance at mid-range price, great ROI' },
  { name: 'ProVia', shgc: 4, lowe: 4, warranty: 5, price: 3, dealer: 3, note: 'Heritage series — excellent insulation, limited DFW distributors but worth sourcing' },
  { name: 'Harvey', shgc: 3, lowe: 3, warranty: 3, price: 5, dealer: 2, note: 'Northeast brand — budget option, limited DFW availability, acceptable performance' },
];

type BudgetLevel = 'premium' | 'mid' | 'budget';
type EnergyPriority = 'high' | 'medium' | 'low';
type WindowStyle = 'double-hung' | 'casement' | 'picture';

const recs: Record<BudgetLevel, Record<EnergyPriority, string>> = {
  premium: { high: 'Andersen', medium: 'Pella', low: 'Pella' },
  mid: { high: 'Simonton', medium: 'Simonton', low: 'ProVia' },
  budget: { high: 'Simonton', medium: 'Harvey', low: 'Harvey' },
};

const styleNote: Record<WindowStyle, string> = {
  'double-hung': '↕️ Double-hung windows are most common in DFW — all brands offer strong selection',
  'casement': '🪟 Casement windows seal tighter — best choice for DFW heat reduction',
  'picture': '🖼️ Picture windows have highest SHGC impact — prioritize Low-E coatings',
};

const labels: Record<string, string> = {
  shgc: '☀️ Heat Performance', lowe: '🪟 Low-E Coating', warranty: '📄 Warranty',
  price: '💰 Value', dealer: '🏪 DFW Availability',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#F5E642′ }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function DFWWindowBrandsCompared() {
  const [budgetLevel, setBudgetLevel] = useState<BudgetLevel>('mid');
  const [energyPriority, setEnergyPriority] = useState<EnergyPriority>('high');
  const [style, setStyle] = useState<WindowStyle>('double-hung');
  const [expanded, setExpanded] = useState<string | null>(null);
  const pick = recs[budgetLevel][energyPriority];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🪟</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Window Brands Compared 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Andersen · Pella · Simonton · ProVia · Harvey — rated for Texas heat</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Budget Range</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['premium', 'mid', 'budget'] as BudgetLevel[]).map(b => (
                  <button key={b} onClick={() => setBudgetLevel(b)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: budgetLevel === b ? '#F5E642′ : '#1e3a5f',
                      background: budgetLevel === b ? '#F5E642′ : ’transparent',
                      color: budgetLevel === b ? '#0A1628′ : '#94a3b8' }}>
                    {b.charAt(0).toUpperCase() + b.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Energy Priority</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['high', 'medium', 'low'] as EnergyPriority[]).map(e => (
                  <button key={e} onClick={() => setEnergyPriority(e)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: energyPriority === e ? '#F5E642′ : '#1e3a5f',
                      background: energyPriority === e ? '#F5E642′ : ’transparent',
                      color: energyPriority === e ? '#0A1628′ : '#94a3b8' }}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Window Style</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['double-hung', 'casement', 'picture'] as WindowStyle[]).map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: style === s ? '#F5E642′ : '#1e3a5f',
                      background: style === s ? '#F5E642′ : ’transparent',
                      color: style === s ? '#0A1628′ : '#94a3b8' }}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '14px 18px', background: '#1a3a6e', borderRadius: 10, borderLeft: '4px solid #F5E642', marginBottom: 10 }}>
            <p style={{ margin: 0, color: '#F5E642', fontWeight: 700 }}>🏆 Recommended for your DFW home: {pick}</p>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: '8px 0 0′ }}>{styleNote[style]}</p>
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
                  <div key={k} style={{ minWidth: 120 }}>
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
          Get matched with top DFW window contractors — <span style={{ color: '#F5E642′ }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
