import { useState } from 'react';

export default function DFWAtticScienceGuide2026() {
  const [symptom, setSymptom] = useState('hot-rooms');

  const solutions: Record<string, { title: string; science: string; fix: string; cost: string }> = {
    'hot-rooms': {
      title: 'Excessive Heat Transfer',
      science: 'DFW attics reach 140°F in July. Without a radiant barrier, infrared heat radiates through insulation directly into living space, raising ceiling temps by 10–15°F.\',
      fix: 'Install radiant barrier on roof deck (foil-faced sheathing). Blocks 97% of radiant heat before it reaches insulation.\',
      cost: '$1,200–$2,800 installed'
    },
    'high-bills': {
      title: 'HVAC Overwork from Attic Heat',
      science: 'Each 10°F rise in attic temp forces AC to run ~5% longer. At 140°F attic, your system works 35–40% harder than designed.\',
      fix: 'Combine radiant barrier + R-38 insulation at ceiling level (not roof deck). Add soffit-to-ridge ventilation for convective cooling.\',
      cost: '$2,500–$5,500 combined'
    },
    'moisture': {
      title: 'Attic Moisture & Mold Risk',
      science: 'Poor ventilation traps humid DFW air (avg 65% RH in summer). Mold begins growing above 70% RH on wood sheathing within 48 hours.\',
      fix: '1 sq ft ventilation per 150 sq ft attic floor. Add ridge vent + soffit vents for proper cross-flow. Check vapor retarder on insulation.\',
      cost: '$800–$2,200'
    },
    'ice-dams': {
      title: 'Winter Condensation / Cold Spots',
      science: 'DFW winter swings (20°F–70°F in same week) cause rapid condensation cycles. Gaps in air sealing allow warm moist air to hit cold sheathing.\',
      fix: 'Air-seal all penetrations (can lights, HVAC boots, top plates) before adding insulation. Foam sealant at every gap.\',
      cost: '$600–$1,400'
    },
  };

  const current = solutions[symptom];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>🏠 ProLnk DFW Home Science Series</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
          🌡️ DFW Attic Science Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Understanding attic dynamics in one of America's hottest urban climates.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', label: 'Peak Attic Temp', value: '140°F', note: 'July afternoon' },
            { icon: '☀️', label: 'Radiant Barrier Effect', value: '97% blocked', note: 'of radiant heat' },
            { icon: '💨', label: 'Ventilation Ratio', value: '1:150', note: 'sq ft rule' },
          ].map(card => (
            <div key={card.label} style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{card.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem' }}>{card.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚗️ Key Attic Physics</h2>
          {[
            'Insulation R-value belongs at the ceiling plane, not the roof deck — adding it to the roof traps heat.\',
            'Radiant heat travels at the speed of light — conventional insulation alone cannot stop it, only absorb it.\',
            'Ventilation reduces both summer heat gain and winter moisture damage — it must flow soffit-to-ridge.\',
            'Air sealing is more impactful than added insulation in most DFW homes built before 2000.\',
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642' }}>▸</span>
              <span style={{ color: '#cbd5e1' }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2744', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Attic Symptom → Science Fix</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {Object.entries({ 'hot-rooms': '🔥 Hot Rooms', 'high-bills': '💸 High Bills', 'moisture': '💧 Moisture', 'ice-dams': '❄️ Cold Spots' }).map(([k, v]) => (
              <button key={k} onClick={() => setSymptom(k)}
                style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', background: symptom === k ? '#F5E642' : '#1e3a5f', color: symptom === k ? '#0A1628' : '#94a3b8', fontWeight: 600 }}>
                {v}
              </button>
            ))}
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{current.title}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.75rem' }}>🔬 Science: {current.science}</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>✅ Fix: {current.fix}</div>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>💰 {current.cost}</div>
          </div>
        </div>
      </div>
    </div>
  );
}