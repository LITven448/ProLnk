import { useState } from 'react';

type Budget = 'low' | 'mid' | 'high' | null;

const options: Record<NonNullable<Budget>, { title: string; icon: string; upfront: string; lifespan: string; total50: string; notes: string }> = {
  low: {
    title: 'Architectural Shingle',
    icon: '🏠',
    upfront: '$14,000–$17,000',
    lifespan: '20–25 years in DFW',
    total50: '~$56,000–$68,000 (2 replacements)',
    notes: 'Most common DFW choice. DFW hail and UV shorten lifespan vs manufacturer claims. Insurance rates remain standard. Best for short-term ownership under 10 years.',
  },
  mid: {
    title: 'Class 4 Impact-Resistant Shingle',
    icon: '🛡️',
    upfront: '$17,000–$21,000',
    lifespan: '30–35 years in DFW',
    total50: '~$36,000–$44,000 (1 replacement)',
    notes: 'Sweet spot for DFW. Qualifies for 20–30% insurance discount with most carriers. DFW hail frequency makes Class 4 a strong ROI. Discount typically recoups premium in 4–6 years.',
  },
  high: {
    title: 'Standing Seam Metal',
    icon: '⚡',
    upfront: '$32,000–$42,000',
    lifespan: '50+ years in DFW',
    total50: '~$32,000–$42,000 (no replacement)',
    notes: 'Cheapest 50-year option in DFW. Sheds hail damage, reflects heat (reduces cooling load 15–25%), and qualifies for max insurance discounts. Best for long-term ownership and investment properties.',
  },
};

export default function DFWRoofingLifecycleCost2026() {
  const [budget, setBudget] = useState<Budget>(null);

  const result = budget ? options[budget] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>📊</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', marginBottom: '0.5rem' }}>DFW Roofing Lifecycle Cost 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>True 50-year cost of each roofing option — DFW hail and UV make upfront price misleading</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {(Object.entries(options) as [Budget, typeof options['low']][]).map(([key, opt]) => (
            <button
              key={key}
              onClick={() => setBudget(key)}
              style={{
                backgroundColor: budget === key ? '#F5E642' : '#1e293b',
                color: budget === key ? '#0A1628' : '#fff',
                border: '2px solid' + (budget === key ? ' #F5E642' : ' #334155'),
                borderRadius: '10px',
                padding: '1.2rem 0.8rem',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{opt.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{opt.title}</div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', opacity: 0.8 }}>{opt.upfront}</div>
            </button>
          ))}
        </div>

        {result && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginBottom: '1rem' }}>{result.icon} {result.title} — DFW Lifecycle Analysis</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.3rem' }}>UPFRONT COST</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{result.upfront}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.3rem' }}>DFW LIFESPAN</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{result.lifespan}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0f172a', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.3rem' }}>50-YEAR TOTAL COST</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{result.total50}</div>
            </div>
            <p style={{ margin: 0, lineHeight: '1.6', fontSize: '0.9rem', color: '#cbd5e1' }}>{result.notes}</p>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>
          <p>ProLnk DFW Roofing Resource · Free homeowner guidance · 2026</p>
        </div>
      </div>
    </div>
  );
}