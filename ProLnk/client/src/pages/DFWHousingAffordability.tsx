import { useState } from 'react';

interface AffordabilityTier {
  tier: string;
  range: string;
  color: string;
  cities: string[];
  maintenanceNote: string;
}

const tiers: AffordabilityTier[] = [
  {
    tier: 'Budget',
    range: 'Under $350K',
    color: '#3b82f6',
    cities: ['Balch Springs', 'Lancaster', 'DeSoto', 'Duncanville', 'Garland', 'Mesquite'],
    maintenanceNote: 'Older housing stock. Higher maintenance frequency. Deferred issues common.',
  },
  {
    tier: 'Value',
    range: '$350K–$450K',
    color: '#10b981',
    cities: ['Arlington', 'Grand Prairie', 'Irving', 'Carrollton', 'Richardson'],
    maintenanceNote: 'Mix of ages. Moderate maintenance. Some systems approaching end of life.',
  },
  {
    tier: 'Premium',
    range: '$450K–$600K',
    color: '#f59e0b',
    cities: ['Frisco', 'Plano', 'McKinney', 'Allen', 'Southlake'],
    maintenanceNote: 'Newer construction. Lower routine maintenance but more complex systems.',
  },
  {
    tier: 'Ultra-Luxury',
    range: '$600K+',
    color: '#8b5cf6',
    cities: ['Southlake', 'Colleyville', 'University Park', 'Preston Hollow', 'Highland Park'],
    maintenanceNote: 'Premium materials and systems. High-end contractor required for quality match.',
  },
];

export default function DFWHousingAffordability() {
  const [activeTier, setActiveTier] = useState<number>(0);
  const selected = tiers[activeTier];

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#1a1a2e', color: '#F5C518', fontSize: 12, fontWeight: 700, letterSpacing: 2, padding: '4px 12px', borderRadius: 4, marginBottom: 16, textTransform: 'uppercase' }}>
            Affordability Guide 2026
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px', color: '#1a1a2e' }}>
            DFW Housing Affordability 2026 — Where Can You Actually Buy?
          </h1>
          <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, maxWidth: 700 }}>
            DFW property taxes run 2.1–2.5% — among the highest in the US — but there is no state income tax. Here is where your dollar actually goes the furthest.
          </p>
        </div>

        {/* Tax context */}
        <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 12, padding: '16px 20px', marginBottom: 40 }}>
          <strong>Property Tax Context:</strong> A $400K DFW home carries $8,400–$10,000 in annual property taxes. Factor this into your affordability calculation — it is not optional and it does not go away.
        </div>

        {/* Tier selector */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#1a1a2e' }}>Explore by Price Tier</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {tiers.map((t, i) => (
              <button
                key={t.tier}
                onClick={() => setActiveTier(i)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: `2px solid ${activeTier === i ? t.color : '#e5e5e5'}`,
                  background: activeTier === i ? t.color : '#fff',
                  color: activeTier === i ? '#fff' : '#444',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 14,
                  transition: 'all 0.15s',
                }}
              >
                {t.tier}
              </button>
            ))}
          </div>

          <div style={{ background: '#fff', border: `2px solid ${selected.color}`, borderRadius: 16, padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ background: selected.color, color: '#fff', fontWeight: 800, fontSize: 14, padding: '4px 12px', borderRadius: 6 }}>{selected.range}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#1a1a2e' }}>{selected.tier} Cities</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {selected.cities.map((c) => (
                <span key={c} style={{ background: '#f4f4f4', padding: '6px 14px', borderRadius: 20, fontSize: 14, fontWeight: 500, color: '#333' }}>{c}</span>
              ))}
            </div>
            <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '14px 16px' }}>
              <strong style={{ color: '#1a1a2e' }}>Maintenance outlook:</strong>
              <span style={{ color: '#555', marginLeft: 8 }}>{selected.maintenanceNote}</span>
            </div>
          </div>
        </div>

        {/* TrustyPro insight */}
        <div style={{ background: '#1a1a2e', borderRadius: 16, padding: 28, marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>🔍</div>
            <div>
              <h3 style={{ color: '#F5C518', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>TrustyPro Data Insight</h3>
              <p style={{ color: '#ddd', lineHeight: 1.7, margin: 0 }}>
                "Our home scanning data shows maintenance need <strong style={{ color: '#F5C518' }}>inversely correlates</strong> with home price in DFW — more affordable homes carry significantly more deferred maintenance. A $280K Garland home often has $35,000+ in unaddressed issues that a $550K Frisco home does not. Budget buyers need a home health scan more than anyone."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#fff', border: '2px solid #1a1a2e', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>Know What You Are Actually Buying</h3>
          <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 24, maxWidth: 520, margin: '0 auto 24px' }}>
            TrustyPro scans your home or the home you are purchasing for hidden issues before they become expensive surprises.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#1a1a2e', color: '#F5C518', fontWeight: 800, fontSize: 16, padding: '14px 32px', borderRadius: 8, textDecoration: 'none' }}>
            Get a Home Health Scan →
          </a>
        </div>
      </div>
    </div>
  );
}
