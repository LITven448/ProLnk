import { useState } from 'react';

const appliances = [
  {
    id: 'dishwasher',
    label: '🍽️ Dishwasher',
    tips: [
      'Run on hot cycle — DFW 300+ ppm hardness leaves residue on lower temps',
      'Use quality detergent with citric acid to neutralize mineral deposits',
      'Run empty with 2 cups white vinegar monthly to flush buildup',
      'Check spray arm holes for blockage every 3 months',
      'Install under-sink softener or whole-house system for best results',
    ],
  },
  {
    id: 'icemaker',
    label: '🧊 Ice Maker',
    tips: [
      'DFW water produces cloudy, mineral-heavy ice without filtration',
      'Install dedicated inline filter — replace every 6 months in DFW',
      'Scale buildup clogs water lines — flush line annually',
      'Nugget/Sonic ice makers suffer most from DFW hardness',
      'RO-fed ice maker produces crystal-clear ice — top DFW upgrade',
    ],
  },
  {
    id: 'coffeemaker',
    label: '☕ Coffee Maker',
    tips: [
      'DFW hardness creates bitter taste and white scale in carafe',
      'Descale monthly: run 50/50 white vinegar and water cycle',
      'Rinse twice with plain water after descaling',
      'Use filtered water to extend machine life 2-3x in DFW',
      'Pod machines (Keurig, Nespresso) need descaling every 4-6 weeks',
    ],
  },
  {
    id: 'washer',
    label: '🫧 Washing Machine',
    tips: [
      'DFW minerals reduce soap lather — use more detergent than label says',
      'Run empty hot wash with washing machine cleaner monthly',
      'Mineral buildup in drum causes odors — wipe gasket after every load',
      'Use liquid detergent — powder can leave undissolved residue in hard water',
      'Front-loaders suffer more scale buildup than top-loaders in DFW',
    ],
  },
  {
    id: 'waterheater',
    label: '🔥 Water Heater',
    tips: [
      'DFW scale reduces water heater efficiency by up to 48%',
      'Flush tank annually — connect hose to drain valve, run until clear',
      'Scale at bottom causes rumbling/popping — flush immediately',
      'Set thermostat to 120°F — above 140°F accelerates DFW scale formation',
      'Replace anode rod every 3-4 years (faster in DFW hard water)',
    ],
  },
];

export default function DFWHardwaterApplianceGuide2026() {
  const [selected, setSelected] = useState('dishwasher');
  const current = appliances.find((a) => a.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💧</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW Hard Water Appliance Protection Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>
            DFW tap water averages 300+ ppm hardness — protect your appliances now
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {appliances.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: selected === a.id ? '#F5E642' : '#1e3a5f',
                background: selected === a.id ? '#F5E642' : '#0d1f3c',
                color: selected === a.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              {a.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginTop: 0 }}>{current.label} — DFW Hard Water Care</h2>
          <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.8 }}>
            {current.tips.map((tip, i) => (
              <li key={i} style={{ color: '#cbd5e1', marginBottom: '0.4rem' }}>{tip}</li>
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