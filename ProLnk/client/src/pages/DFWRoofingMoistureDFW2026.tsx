import { useState } from 'react';

export default function DFWRoofingMoistureDFW2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const concerns = [
    { id: 'attic-condensation', label: '💧 Seeing condensation or wet insulation in attic' },
    { id: 'spring-leaks', label: '🌧️ Noticing leaks after spring DFW storms' },
    { id: 'ice-damage', label: '🧊 Worried about ice damage from DFW winter freezes' },
    { id: 'ventilation', label: '💨 Not sure if attic ventilation is adequate' },
  ];

  const guide: Record<string, string> = {
    'attic-condensation': 'DFW summer humidity causes warm humid air to condense on cold surfaces in air-conditioned attics. Fix: ensure all ductwork is sealed and insulated, check that attic vents are unobstructed, confirm vapor barrier is intact. Condensation is almost always a ventilation problem, not a roof problem.',
    'spring-leaks': 'After DFW spring storms, check all penetration points: pipe boots, skylights, chimney flashing, valleys. These fail before the field shingles do. Have a roofer apply fresh sealant to all boots and rebed any lifted flashing. Hail damage often opens micro-cracks that only leak under driving rain.',
    'ice-damage': 'DFW ice dams are rare but occurred in 2021 and 2023 freezes. Ice dams form when heat escapes attic, melts snow/ice, water refreezes at cold eaves. Prevention: proper attic insulation (R-38 recommended for DFW) keeps heat inside home, not in attic. After freeze events, inspect flashing and pipe boots first.',
    'ventilation': 'DFW code requires 1 sq ft ventilation per 150 sq ft attic space. Balanced ventilation = equal intake (soffits) and exhaust (ridge). Signs of poor ventilation: extreme heat in attic (over 140°F summer), moisture staining, premature shingle aging. Ridge vent + baffled soffit vents is the DFW gold standard.',
  };

  function handleSelect(id: string) {
    setConcern(id);
    setResult(guide[id]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ROOFING GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Roof Moisture Management Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          DFW roofs face three moisture threats: summer attic condensation from humidity, spring storm infiltration at penetrations, and rare ice dam events in severe freezes. Proper attic ventilation prevents most of these issues.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '☀️', label: 'Summer Humidity', sub: 'Condensation risk' },
            { icon: '⛈️', label: 'Spring Storms', sub: 'Penetration leaks' },
            { icon: '🧊', label: 'Winter Ice', sub: 'Rare but damaging' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: '#F5E642' }}>🔍 Your DFW Moisture Concern → Roof Guide</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => handleSelect(c.id)}
              style={{ background: concern === c.id ? '#F5E642' : '#1e2d45', color: concern === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
              {c.label}
            </button>
          ))}
        </div>
        {result && (
          <div style={{ background: '#1e2d45', borderLeft: '4px solid #F5E642', borderRadius: 8, padding: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            {result}
          </div>
        )}
        <div style={{ marginTop: 32, padding: 16, background: '#1e2d45', borderRadius: 10, fontSize: 13, color: '#94a3b8' }}>
          💡 ProLnk connects DFW homeowners with verified roofing contractors who specialize in moisture management.
        </div>
      </div>
    </div>
  );
}
