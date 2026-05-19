import { useState } from 'react';

const SYSTEM_TYPES = [
  { id: 'conventional', label: 'Conventional' },
  { id: 'aerobic', label: 'Aerobic' },
  { id: 'mound', label: 'Mound System' },
];

const SCHEDULES: Record<string, string[]> = {
  conventional: ['Pump every 3-5 years', 'Inspect distribution box annually', 'Avoid flushing wipes/grease', 'Keep vehicles off drain field'],
  aerobic: ['Service contract required by TCEQ', 'Inspect spray heads monthly', 'Add chlorine tablets quarterly', 'Annual licensed inspector visit'],
  mound: ['Pump every 3-4 years', 'Keep mound vegetation mowed', 'Divert surface water away from mound', 'Annual inspection of pump and float'],
};

const FAILURE_SIGNS = [
  '🚨 Sewage odors indoors or outdoors',
  '💧 Wet soggy patches over drain field',
  '🚽 Slow drains throughout home',
  '🌿 Unusually lush green grass over tank',
  '🔴 Sewage backup in toilets or sinks',
];

const COUNTIES = ['Denton', 'Parker', 'Ellis', 'Hood', 'Wise', 'Johnson'];

export default function DFWSepticSystemGuide2026() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [county, setCounty] = useState('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪣 DFW Septic System Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Rural DFW properties in Denton, Parker, Ellis, Hood, Wise, and Johnson counties frequently rely on onsite sewage facilities (OSSF). Texas TCEQ regulates all septic systems — proper maintenance protects your property value and avoids costly violations.
        </p>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Your County</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {COUNTIES.map(c => (
              <button key={c} onClick={() => setCounty(c)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: county === c ? '#F5E642′ : '#1e2d4a', color: county === c ? '#0A1628' : '#fff' }}>{c} County</button>
            ))}
          </div>
          {county && <p style={{ marginTop: 12, color: '#F5E642', fontSize: 14 }}>✅ {county} County: TCEQ OSSF regulations apply. Permits required for new installs and major repairs.</p>}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚙️ Select Your System Type</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            {SYSTEM_TYPES.map(s => (
              <button key={s.id} onClick={() => setSelectedType(s.id)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, backgroundColor: selectedType === s.id ? '#F5E642′ : '#1e2d4a', color: selectedType === s.id ? '#0A1628' : '#fff' }}>{s.label}</button>
            ))}
          </div>
          {selectedType && (
            <div>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>Maintenance Schedule — {SYSTEM_TYPES.find(s => s.id === selectedType)?.label}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {SCHEDULES[selectedType].map((item, i) => (
                  <li key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e2d4a', color: '#cbd5e1', fontSize: 14 }}>✅ {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🚨 Signs of Septic Failure</h2>
          {FAILURE_SIGNS.map((sign, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e2d4a', fontSize: 14, color: '#f87171′ }}>{sign}</div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#0A1628', fontWeight: 800, marginBottom: 8 }}>Connect with Licensed Septic Services</h2>
          <p style={{ color: '#0A1628', marginBottom: 16, fontSize: 14 }}>ProLnk connects you with TCEQ-licensed septic installers and pumpers across DFW's rural counties.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Septic Quotes →</button>
        </div>
      </div>
    </div>
  );
}