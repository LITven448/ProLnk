import { useState } from 'react';

const configs = [
  {
    id: 'small',
    label: '👤 1-2 Person Home',
    rec: '50 GPD 5-Stage Under-Sink',
    details: [
      '50 GPD (gallons per day) capacity — sufficient for 1-2 people',
      'Standard 5-stage: sediment → 2x carbon → RO membrane → post-carbon',
      '3.2 gallon storage tank — fills in 2-4 hours from DFW tap',
      'DFW membrane life: 2-3 years (300+ ppm reduces from standard 3-5 years)',
      'Recommended brands in DFW: APEC ROES-50, iSpring RCC7',
      'Installed cost DFW: $300–$500 with professional installation',
    ],
  },
  {
    id: 'medium',
    label: '👨‍👩‍👧 3-4 Person Home',
    rec: '75-100 GPD 6-Stage Under-Sink',
    details: [
      '75-100 GPD capacity — meets drinking and cooking demand for family',
      '6-stage adds remineralization: adds calcium/magnesium back for taste',
      'Remineralization critical in DFW — pure RO water tastes flat without it',
      '4.5-5 gallon storage tank — less wait time for family use',
      'DFW membrane replacement: every 2 years at 300+ ppm hardness',
      'Installed cost DFW: $450–$700 for 6-stage with remineralization',
    ],
  },
  {
    id: 'large',
    label: '🏡 5+ Person Home',
    rec: 'Tankless 400 GPD High-Flow',
    details: [
      'Tankless design: no storage tank — produces water on demand instantly',
      '400 GPD output handles high DFW family demand without running dry',
      'Requires dedicated faucet — or connect to refrigerator ice/water line',
      'Smart leak detection and filter replacement alerts — DFW essential',
      'DFW hard water: pre-softener recommended before RO to extend membrane life',
      'Installed cost DFW: $700–$1,200 for tankless high-capacity system',
    ],
  },
  {
    id: 'countertop',
    label: '🏢 Renter / No Install',
    rec: 'Countertop or Pitcher RO',
    details: [
      'Countertop RO: connects to faucet — no permanent plumbing required',
      'Good for DFW renters who cannot modify under-sink plumbing',
      'Output: 50-75 GPD — sufficient for drinking and cooking only',
      'Popular in DFW apartments: Waterdrop D6, Frizzlife PX500',
      'Pitcher RO (ZeroWater, Clearly Filtered): slow but zero installation',
      'DFW tip: pitchers clog faster than average due to 300+ ppm mineral load',
    ],
  },
  {
    id: 'well',
    label: '🌊 Well Water / DFW Rural',
    rec: 'Pre-Treatment + 6-Stage RO',
    details: [
      'DFW rural well water often contains iron, sulfur, bacteria — test first',
      'Required pre-treatment: sediment filter + iron filter + UV sterilizer',
      'Then: standard 6-stage RO for drinking water purification',
      'Membrane fouls quickly with untreated well water — pre-treatment mandatory',
      'DFW well water hardness can exceed 500 ppm — standard 2-year membrane life',
      'Full well water system cost DFW: $1,500–$3,000 installed',
    ],
  },
];

export default function DFWROSystemGuide2026() {
  const [selected, setSelected] = useState('small');
  const current = configs.find((c) => c.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💧</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Reverse Osmosis Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            Right RO system for your DFW household — pure drinking water from 300+ ppm tap water
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {configs.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: selected === c.id ? '#F5E642′ : '#1e3a5f',
                background: selected === c.id ? '#F5E642′ : '#0d1f3c',
                color: selected === c.id ? '#0A1628′ : '#94a3b8',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, background: '#1e3a5f', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
              RECOMMENDED FOR DFW
            </span>
            <span style={{ color: '#fff', fontWeight: 700 }}>{current.rec}</span>
          </div>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8, margin: 0 }}>
            {current.details.map((d, i) => (
              <li key={i} style={{ color: '#cbd5e1', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{d}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '0.75rem 1rem' }}>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            ⚠️ DFW water at 300+ ppm hardness reduces RO membrane life — always use 5 or 6-stage systems with pre-filtration
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '2rem' }}>
          ProLnk • DFW Water Quality Resources 2026
        </p>
      </div>
    </div>
  );
}