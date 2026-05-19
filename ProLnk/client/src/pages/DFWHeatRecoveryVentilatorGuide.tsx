import { useState } from 'react';

const ages = [
  { id: 'new', label: '🏠 New construction (post-2010, tight envelope)' },
  { id: 'retrofitted', label: '🔧 Retrofitted / weatherized older home' },
  { id: 'drafty', label: '🌬️ Older drafty home (pre-1990)' },
];

const concerns = [
  { id: 'humidity', label: '💧 DFW summer humidity / stuffiness' },
  { id: 'co2', label: '😮‍💨 Stale air / CO2 buildup (work from home)' },
  { id: 'mold', label: '🍄 Mold or moisture concerns' },
  { id: 'energy', label: '⚡ Energy efficiency — don’t want to waste conditioned air' },
];

function getResult(age: string, concern: string) {
  const needsVent = age !== 'drafty';
  if (!needsVent) return {
    unit: 'Not Recommended Yet',
    sizing: 'N/A',
    cost: 'N/A',
    note: 'Drafty older DFW homes get natural air exchange through gaps and cracks. Air-seal first (attic, outlets, doors), then reassess ventilation needs. Adding an HRV/ERV before air-sealing wastes money.',
  };

  const useERV = concern === 'humidity' || concern === 'mold' || age === 'new';
  return {
    unit: useERV ? 'ERV (Energy Recovery Ventilator)' : 'HRV (Heat Recovery Ventilator)',
    sizing: age === 'new' ? '150–200 CFM unit for 2,000–3,000 sq ft DFW home' : '100–150 CFM retrofit unit',
    cost: '$1,800–$4,500 installed in DFW',
    note: useERV
      ? 'ERVs transfer both heat AND moisture between exhaust and fresh air. In DFW\’s humid summers, this prevents outside humidity from flooding your home while still providing fresh air. Essential for new tight construction.'
      : 'HRVs recover heat only — ideal for DFW winter use when outdoor air is dry and cold. For CO2 and stale air concerns without humidity worries, HRV performs well and costs slightly less than ERV.',
  };
}

export default function DFWHeatRecoveryVentilatorGuide() {
  const [age, setAge] = useState('');
  const [concern, setConcern] = useState('');
  const result = age && concern ? getResult(age, concern) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>🌀 DFW HVAC GUIDE</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>HRV & ERV Ventilation Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Modern DFW homes are built tighter than ever for energy efficiency — but that means less natural air exchange. Without mechanical ventilation, indoor CO2, VOCs, and humidity build up. HRVs and ERVs solve this without wasting your conditioned air.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔄', title: 'How It Works', desc: 'Stale indoor air exits while fresh outdoor air enters — but they pass through a heat exchanger first, transferring 70–80% of energy back indoors.' },
            { icon: '💧', title: 'ERV vs HRV for DFW', desc: 'ERVs also transfer moisture — critical for DFW summers where outdoor humidity would otherwise spike indoor levels. HRVs transfer heat only.' },
            { icon: '🏠', title: 'Who Needs This', desc: 'Homes built post-2010 with spray foam insulation, new windows, and air-sealed envelopes. These homes can hit 1,200+ ppm CO2 without mechanical ventilation.' },
            { icon: '⚡', title: 'Energy Impact', desc: 'Without an ERV, opening a window to ventilate wastes all your conditioned air. ERVs recover 70–80% of that energy — paying back in 3–6 years in DFW.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0f2240', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</p>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 HRV vs ERV — Find Your DFW Match</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your home's age and tightness:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {ages.map(a => (
              <button key={a.id} onClick={() => setAge(a.id)} style={{ background: age === a.id ? '#F5E642' : '#1e3a5f', color: age === a.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{a.label}</button>
            ))}
          </div>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your primary DFW climate concern:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setConcern(c.id)} style={{ background: concern === c.id ? '#F5E642' : '#1e3a5f', color: concern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{c.label}</button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#1a2e4a', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Recommendation: {result.unit}</p>
              {result.sizing !== 'N/A' && <p style={{ color: '#e2e8f0', marginBottom: 4 }}>📐 Sizing: <strong>{result.sizing}</strong></p>}
              {result.cost !== 'N/A' && <p style={{ color: '#e2e8f0', marginBottom: 8 }}>💰 DFW installed cost: <strong>{result.cost}</strong></p>}
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>
          ProLnk connects DFW homeowners with verified HVAC professionals. Get 3 quotes, fast.
        </p>
      </div>
    </div>
  );
}
