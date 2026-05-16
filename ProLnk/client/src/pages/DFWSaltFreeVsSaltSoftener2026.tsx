import { useState } from 'react';

const concerns = [
  {
    id: 'scale',
    label: '🔩 Scale on Appliances',
    winner: 'salt',
    summary: 'For DFW appliance scale protection, salt-based wins decisively',
    saltPros: ['Eliminates scale completely — appliances last 2-3x longer', 'Dishwasher, water heater, ice maker fully protected', 'Measurable difference at DFW 300+ ppm immediately'],
    saltFreePros: ['Reduces scale formation but does not eliminate it at DFW levels', 'Still some mineral exposure on appliances', 'Good for mild scale prevention, not DFW severity'],
  },
  {
    id: 'skin',
    label: '🧴 Skin & Hair',
    winner: 'salt',
    summary: 'Salt-based delivers the silky shower feel — salt-free does not',
    saltPros: ['Removes calcium — immediately noticeable skin softness in shower', 'Hair feels cleaner, conditioner works better', 'Soap lathers freely instead of fighting DFW minerals'],
    saltFreePros: ['Crystal structure change does not affect skin feel', 'No improvement in soap lather or hair texture', 'Not the right choice if skin/hair is primary DFW concern'],
  },
  {
    id: 'maintenance',
    label: '🔧 Low Maintenance',
    winner: 'saltfree',
    summary: 'Salt-free wins on zero maintenance — salt-based needs ongoing attention',
    saltPros: ['Requires salt refill every 4-6 weeks (40 lb bag, $8–15)', 'Annual resin cleaning and inspection recommended', 'Regeneration uses 40-80 gallons water per cycle'],
    saltFreePros: ['Zero ongoing maintenance — set and forget', 'No salt, no electricity, no drain connection needed', 'Ideal for DFW vacation homes or rentals'],
  },
  {
    id: 'budget',
    label: '💰 Tight Budget',
    winner: 'saltfree',
    summary: 'Salt-free lower upfront; salt-based lower total cost over 10 years',
    saltPros: ['Upfront: $800–$2,500 installed in DFW', '$15–30/month ongoing salt cost', 'Higher ROI: appliance savings exceed cost in 3-5 years'],
    saltFreePros: ['Upfront: $500–$1,800 installed', 'Zero ongoing chemical cost', 'Lower total 10-year cost if appliance protection need is moderate'],
  },
  {
    id: 'eco',
    label: '🌱 Eco-Conscious',
    winner: 'saltfree',
    summary: 'Salt-free has no water waste or brine discharge — greener choice',
    saltPros: ['Regeneration discharges brine into sewer system', 'Uses 40-80 gallons water per regeneration cycle', 'Some DFW municipalities monitoring softener brine discharge'],
    saltFreePros: ['Zero water waste, zero brine discharge', 'No sodium added to water supply', 'Best environmental choice for DFW water-conscious homeowners'],
  },
];

export default function DFWSaltFreeVsSaltSoftener2026() {
  const [selected, setSelected] = useState('scale');
  const current = concerns.find((c) => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚖️</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Salt vs Salt-Free Water Treatment 2026
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            Honest comparison for DFW 300+ ppm hard water — choose by your priority
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {concerns.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: selected === c.id ? '#F5E642' : '#1e3a5f',
                background: selected === c.id ? '#F5E642' : '#0d1f3c',
                color: selected === c.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '12px', padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '1rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: 0 }}>
            {current.winner === 'salt' ? '🏆 Salt-Based Wins' : '🏆 Salt-Free Wins'} — {current.summary}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#0d1f3c', borderRadius: '10px', padding: '1.2rem', border: '1px solid #1e3a5f' }}>
            <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginTop: 0 }}>🧴 Salt-Based</h3>
            <ul style={{ paddingLeft: '1rem', lineHeight: 1.7, margin: 0 }}>
              {current.saltPros.map((p, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{p}</li>)}
            </ul>
          </div>
          <div style={{ background: '#0d1f3c', borderRadius: '10px', padding: '1.2rem', border: '1px solid #1e3a5f' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: 0 }}>🌿 Salt-Free</h3>
            <ul style={{ paddingLeft: '1rem', lineHeight: 1.7, margin: 0 }}>
              {current.saltFreePros.map((p, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{p}</li>)}
            </ul>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '2rem' }}>
          ProLnk • DFW Water Quality Resources 2026
        </p>
      </div>
    </div>
  );
}