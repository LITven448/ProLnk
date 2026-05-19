import { useState } from 'react';

const softenerTypes = [
  {
    id: 'saltbased',
    label: '🧴 Salt-Based Ion Exchange',
    badge: 'Most Effective for DFW',
    badgeColor: '#22c55e',
    details: [
      'True softening — replaces calcium/magnesium ions with sodium ions',
      'DFW 300+ ppm hardness: only salt-based delivers fully softened water',
      'Installation cost: $800–$2,500 installed in DFW market',
      'Ongoing cost: $15–30/month in salt (40 lb bag every 4-6 weeks)',
      'Regeneration cycle uses 40-80 gallons water — runs overnight',
      'Lifespan: 10-20 years with proper DFW maintenance',
      'Best for: DFW homes with 2+ bathrooms, dishwashers, water heaters',
    ],
  },
  {
    id: 'saltfree',
    label: '🌿 Salt-Free Conditioner',
    badge: 'Partial DFW Effectiveness',
    badgeColor: '#eab308',
    details: [
      'Template-assisted crystallization (TAC) — changes mineral crystal structure',
      'Does NOT remove hardness minerals — does NOT soften water by definition',
      'At DFW 300+ ppm, effectiveness is limited compared to salt-based',
      'No salt, no electricity, no drain — zero ongoing maintenance',
      'Installation cost: $500–$1,800 installed',
      'Scale prevention (not elimination) — appliances still see some mineral exposure',
      'Best for: DFW renters, eco-conscious owners, light scale prevention',
    ],
  },
  {
    id: 'electronic',
    label: '⚡ Electronic Descaler',
    badge: 'Limited DFW Evidence',
    badgeColor: '#ef4444',
    details: [
      'Wraps wire around pipes, emits electromagnetic frequencies',
      'Claims to change crystal structure of minerals — controversial',
      'No peer-reviewed evidence of effectiveness at DFW hardness levels',
      'Very low cost: $100–$400 installed',
      'No salt, no water waste, no plumbing changes needed',
      'Anecdotal DFW results vary widely — not recommended as primary solution',
      'Best for: DFW skeptics wanting low-risk experiment only',
    ],
  },
  {
    id: 'ro',
    label: '💧 Reverse Osmosis',
    badge: 'Drinking Water Only',
    badgeColor: '#3b82f6',
    details: [
      'Forces water through semi-permeable membrane — removes 95-99% of minerals',
      'Produces the purest drinking water possible from DFW tap',
      'Under-sink only — does NOT treat shower, laundry, or appliances',
      'Installation cost: $300–$800 for 5-6 stage under-sink system',
      'Wastes 3-4 gallons per gallon of purified water (improving in newer models)',
      'Membrane replacement: every 2-3 years in DFW (300+ ppm reduces lifespan)',
      'Best for: DFW families wanting pure drinking/cooking water affordably',
    ],
  },
];

export default function DFWWaterSoftenerTypes2026() {
  const [selected, setSelected] = useState('saltbased');
  const current = softenerTypes.find((s) => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔬</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Water Softener Types Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            Choosing the right treatment for DFW 300+ ppm hard water
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {softenerTypes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f',
                background: selected === s.id ? '#F5E642′ : '#0d1f3c',
                color: selected === s.id ? '#0A1628′ : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', margin: 0 }}>{current.label}</h2>
            <span style={{ background: current.badgeColor, color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
              {current.badge}
            </span>
          </div>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8 }}>
            {current.details.map((d, i) => (
              <li key={i} style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>{d}</li>
            ))}
          </ul>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '2rem' }}>
          ProLnk • DFW Water Quality Resources 2026
        </p>
      </div>
    </div>
  );
}