import { useState } from 'react';

const recommendations: Record<string, { type: string; reason: string; sizing: string; cost: string }> = {
  humidity: {
    type: 'ERV (Energy Recovery Ventilator)',
    reason: 'ERV transfers moisture between incoming and outgoing air streams — preventing DFW winter humidity from plummeting when you ventilate. HRV would dump dry outdoor air in and tank your indoor RH.',
    sizing: '50–150 CFM depending on home size',
    cost: '$1,800–$3,500 installed',
  },
  energy: {
    type: 'ERV (Energy Recovery Ventilator)',
    reason: 'DFW\’s mixed-humid climate favors ERV year-round. In summer, ERV transfers humidity from hot outdoor air to outgoing conditioned air — reducing latent load on your AC.',
    sizing: '75–150 CFM for most DFW homes',
    cost: '$1,800–$3,500 installed',
  },
  iaq: {
    type: 'ERV (Energy Recovery Ventilator)',
    reason: 'For fresh air ventilation in DFW, ERV recovers 70–80% of energy while managing humidity — much better than simply opening dampers which wastes conditioned air.',
    sizing: 'ASHRAE 62.2 calculation: 0.03 CFM/sq ft + 7.5 CFM/person',
    cost: '$1,800–$3,500 installed',
  },
  coldClimate: {
    type: 'HRV (Heat Recovery Ventilator)',
    reason: 'HRV is designed for cold climates where indoor humidity from people/cooking needs to exhaust. DFW is rarely cold enough to justify this — ERV is almost always better here.',
    sizing: '50–100 CFM',
    cost: '$1,500–$2,800 installed',
  },
};

const concerns = [
  { id: 'humidity', label: '🌡️ Winter humidity drops when I ventilate' },
  { id: 'energy', label: '⚡ Energy efficiency & AC load reduction' },
  { id: 'iaq', label: '🫁 Fresh air & indoor air quality' },
  { id: 'coldClimate', label: '❄️ Cold climate moisture control (rare in DFW)' },
];

export default function DFWHVACERVvsHRVGuide() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleCheck = () => {
    if (!concern) return;
    setResult(concern);
  };

  const rec = result ? recommendations[result] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🌬️ DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          ERV vs HRV for DFW Homes
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '0.75rem', lineHeight: 1.7 }}>
          DFW's mixed-humid climate makes this choice straightforward: ERV almost always wins. Here’s why — and when
          an HRV might actually make sense for a DFW home.
        </p>

        <div style={{ background: '#1a2f55', borderRadius: '10px', padding: '1rem', marginBottom: '2rem', border: '1px solid #2a4080′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#F5E642′ }}>🔑 DFW Bottom Line</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            ERV transfers both heat AND moisture. HRV transfers only heat. In DFW winters, ventilating with an HRV
            dumps dry 20–35% RH outdoor air into your home, killing your indoor humidity. ERV transfers moisture
            from the outgoing warm air back into the incoming cold air — keeping your indoor RH stable.
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 What's Your Main Concern?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id)}
                style={{ background: concern === c.id ? '#F5E642′ : '#1a2f55', color: concern === c.id ? '#0A1628' : '#fff',
                  padding: '0.75rem', borderRadius: '8px', border: '1px solid #2a4080', cursor: 'pointer',
                  fontWeight: concern === c.id ? 700 : 400, textAlign: 'left', fontSize: '0.9rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', padding: '0.7rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
        </div>

        {rec && (
          <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>✅ Best for DFW: {rec.type}</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.6 }}>{rec.reason}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>SIZING</div><div style={{ fontSize: '0.9rem' }}>{rec.sizing}</div></div>
              <div><div style={{ color: '#F5E642', fontSize: '0.75rem' }}>INSTALLED COST</div><div style={{ fontSize: '0.9rem' }}>{rec.cost}</div></div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>📊 ERV vs HRV Side by Side</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'ERV', points: ['Transfers heat + moisture', 'Prevents winter RH drop', 'Reduces summer latent load', 'Best for DFW mixed-humid climate', 'Slight extra cost ($100–200 more)'] },
            { label: 'HRV', points: ['Transfers heat only', 'Vents excess indoor moisture', 'Designed for cold/dry climates', 'Can lower DFW winter humidity too much', 'Slightly lower cost'] },
          ].map(col => (
            <div key={col.label} style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>{col.label}</div>
              <ul style={{ paddingLeft: '1.2rem', color: '#94a3b8', lineHeight: 2, margin: 0 }}>
                {col.points.map(p => <li key={p} style={{ fontSize: '0.85rem' }}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '10px', padding: '1.2rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>⚠️ DFW Sizing Formula (ASHRAE 62.2)</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Required CFM = (0.03 × floor area in sq ft) + (7.5 × number of bedrooms + 1). For a 2,500 sq ft, 4-bedroom
            DFW home: (0.03 × 2500) + (7.5 × 5) = 75 + 37.5 = ~113 CFM. Run intermittently — most DFW installs run
            20 min/hr on a timer to hit this average without over-ventilating.
          </p>
        </div>
      </div>
    </div>
  );
}
