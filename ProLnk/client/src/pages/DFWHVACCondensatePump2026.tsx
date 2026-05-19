import { useState } from 'react';

export default function DFWHVACCondensatePump2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { id: 'closet', label: '❄️ Indoor unit in closet' },
    { id: 'attic', label: '🏠 Indoor unit in attic' },
    { id: 'basement', label: '🪜 Unit in basement/utility room' },
    { id: 'garage', label: '🚗 Unit in garage' },
    { id: 'failure', label: '💧 Pump stopped working' },
  ];

  const guides: Record<string, string> = {
    closet: 'Closet units often cannot gravity-drain. A condensate pump is likely required to lift water to a nearby drain. Annual testing: pour water into pump reservoir and confirm it activates within seconds.',
    attic: 'Attic units typically gravity-drain through the roof or soffit. A pump is rarely needed but a secondary drain pan with a float switch is code-required in DFW. Check pan annually for standing water.',
    basement: 'Basement units always need a condensate pump — gravity cannot move water upward to a drain. Inspect pump float switch annually. A failed pump can flood your mechanical room within hours.',
    garage: 'Garage units usually gravity-drain to a floor drain. Confirm drain is clear of debris each spring. If no floor drain exists, a pump is required. Freeze protection sleeve recommended for DFW winters.',
    failure: 'Pump failure signs: water pooling near air handler, musty smell, unit shutting off via overflow switch. Replacement cost: $80–$200 installed. Do not run unit until pump is replaced — water damage risk is high.',
  };

  function evaluate() {
    if (!situation) return;
    setResult(guides[situation] || '');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Condensate Pump Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Most DFW homes gravity-drain condensate. Units in closets or basements often can't — a pump is essential to prevent water damage.
          </p>
        </div>

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>📍 Your Installation Situation</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(s.id)}
                style={{ background: situation === s.id ? '#F5E642′ : '#1A2F4A', color: situation === s.id ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '14px 20px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={evaluate} disabled={!situation}
            style={{ marginTop: 20, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '16px', fontWeight: 800, fontSize: 16, cursor: situation ? 'pointer' : 'not-allowed', opacity: situation ? 1 : 0.5 }}>
            Get Condensate Pump Guide →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>💡 Your Guide</h3>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{result}</p>
          </div>
        )}

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🔑 DFW Condensate Facts</h3>
          <ul style={{ paddingLeft: 20, lineHeight: 2, fontSize: 14, color: '#94A3B8′ }}>
            <li>DFW units run 6–8 months/year — condensate volume is high</li>
            <li>Float switch on pump = backup protection from overflow</li>
            <li>Annual test: pour water in pan, confirm pump activates</li>
            <li>Algae tablets in drain pan prevent clogs</li>
            <li>Pump lifespan: 3–5 years with annual maintenance</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>📋 Store This in Your Home Health Vault</p>
          <p style={{ color: '#1A2F4A', fontSize: 14 }}>ProLnk tracks your HVAC maintenance history so you never miss an inspection.</p>
        </div>
      </div>
    </div>
  );
}
