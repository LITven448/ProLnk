import { useState } from 'react';

const hailSizes = [
  {
    name: 'Pea',
    diameter: '0.25\"',
    emoji: '🟢',
    carDamage: 'None',
    roofDamage: 'None',
    homeDamage: 'Negligible — cosmetic only if any',
    inspect: ['None required'],
    insurance: 'Likely not worth filing a claim',
    color: '#22c55e',
  },
  {
    name: 'Marble',
    diameter: '0.5\"',
    emoji: '🔵',
    carDamage: 'Minor dents on soft panels',
    roofDamage: 'Granule loss on older shingles',
    homeDamage: 'Minor — may dent gutters, AC fins',
    inspect: ['Gutters for dents', 'AC condenser fins', 'Soft metal flashing'],
    insurance: 'Document damage; threshold claim if repair > deductible',
    color: '#3b82f6',
  },
  {
    name: 'Golf Ball',
    diameter: '1.75\"',
    emoji: '⚪',
    carDamage: 'Significant dents, cracked windshields',
    roofDamage: 'Likely impact damage, shingle bruising',
    homeDamage: 'Moderate — roof, siding, skylights at risk',
    inspect: ['Roof shingles for bruising/cracks', 'Siding', 'Skylights', 'Window screens', 'Gutters'],
    insurance: 'File a claim — damage likely exceeds deductible',
    color: '#f59e0b',
  },
  {
    name: 'Baseball',
    diameter: '2.75\"',
    emoji: '⚾',
    carDamage: 'Severe dents, broken glass',
    roofDamage: 'Punctures, cracked decking, major granule loss',
    homeDamage: 'Serious — roof replacement likely needed',
    inspect: ['Full roof inspection by licensed roofer', 'All siding', 'Windows and frames', 'Vents and pipes', 'AC unit'],
    insurance: 'File immediately — likely total roof loss',
    color: '#ef4444',
  },
  {
    name: 'Softball+',
    diameter: '4\"+',
    emoji: '🟠',
    carDamage: 'Totaled vehicles possible',
    roofDamage: 'Structural damage, decking exposed',
    homeDamage: 'Severe — structural integrity may be compromised',
    inspect: ['Structural engineer assessment', 'Full roof replacement', 'All exterior surfaces', 'Interior for water intrusion'],
    insurance: 'Emergency claim — contact insurer same day',
    color: '#7c3aed',
  },
];

export default function DFWHailSizeGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  const info = selected !== null ? hailSizes[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌨️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            DFW Hail Size Guide
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto' }}>
            Understanding hail sizes and what they mean for your home. DFW averages 8–10 hail events per year. Tap a hail size to see its impact.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {hailSizes.map((h, i) => (
            <button
              key={h.name}
              onClick={() => setSelected(i === selected ? null : i)}
              style={{
                background: selected === i ? h.color : '#1e2d47',
                border: `2px solid ${h.color}`,
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.2s',
                minWidth: 110,
              }}
            >
              <div style={{ fontSize: '1.8rem' }}>{h.emoji}</div>
              <div>{h.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{h.diameter}</div>
            </button>
          ))}
        </div>

        {info && (
          <div style={{ background: '#1e2d47', borderRadius: '16px', padding: '1.5rem', border: `2px solid ${info.color}` }}>
            <h2 style={{ color: info.color, fontSize: '1.5rem', marginBottom: '1rem' }}>
              {info.emoji} {info.name} Hail ({info.diameter})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🚗 Vehicle Damage</div>
                <div style={{ color: '#e2e8f0' }}>{info.carDamage}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🏠 Home Damage</div>
                <div style={{ color: '#e2e8f0' }}>{info.homeDamage}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔍 What to Inspect</div>
                <ul style={{ margin: 0, paddingLeft: '1rem', color: '#e2e8f0' }}>
                  {info.inspect.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📋 Insurance Guidance</div>
                <div style={{ color: '#e2e8f0' }}>{info.insurance}</div>
              </div>
            </div>
          </div>
        )}

        {!info && (
          <div style={{ textAlign: 'center', color: '#94a3b8', marginTop: '2rem' }}>
            👆 Select a hail size above to see home damage assessment and insurance guidance
          </div>
        )}
      </div>
    </div>
  );
}
