import { useState } from 'react';

const stages = [
  { range: '1–5 Years', emoji: '🟢', label: 'Peak Efficiency', desc: 'Full manufacturer warranty active. System runs at rated SEER. Minimal maintenance beyond annual tune-up.', action: 'Schedule annual tune-up. Keep warranty documentation. Register with manufacturer if not done.' },
  { range: '5–10 Years', emoji: '🟡', label: 'First Issues Emerge', desc: 'Capacitors, contactors, and refrigerant levels may need attention. Efficiency begins slight decline.', action: 'Bi-annual inspections. Watch for unusual sounds, higher bills, or uneven cooling.' },
  { range: '10–15 Years', emoji: '🟠', label: 'Declining Efficiency', desc: 'Repair frequency increases. DFW heat accelerates wear on compressors. Energy bills climb noticeably.', action: 'Get repair-vs-replace analysis. Rule of thumb: repair cost > 50% of new unit = replace.' },
  { range: '15+ Years', emoji: '🔴', label: 'Replacement Zone', desc: 'DFW summers push aging systems past their limits. Emergency failure risk is high June–August. Modern units are 30–40% more efficient.', action: 'Plan replacement before summer. ProLnk matches you with certified DFW HVAC pros for quotes.' },
];

export default function DFWHVACSystemAge2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [age, setAge] = useState('');

  const getStageIndex = (a: number) => {
    if (a <= 5) return 0;
    if (a <= 10) return 1;
    if (a <= 15) return 2;
    return 3;
  };

  const result = age !== '' && !isNaN(Number(age)) && Number(age) >= 0 ? stages[getStageIndex(Number(age))] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK · DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>❄️ DFW HVAC System Age Impact Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How your system's age shapes performance — and your risk — in the DFW climate.</p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {stages.map((s, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#0f2235', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{s.range} — {s.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.desc}</div>
                </div>
              </div>
              {selected === i && (
                <div style={{ marginTop: 12, background: '#0A1628', borderRadius: 8, padding: '10px 14px', color: '#F5E642', fontSize: 13, fontWeight: 600 }}>
                  ✅ {s.action}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2235', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Enter Your System Age</h2>
          <input
            type="number" placeholder="e.g. 11" value={age} onChange={e => setAge(e.target.value)}
            style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, boxSizing: 'border-box' }}
          />
          {result && (
            <div style={{ marginTop: 16, background: '#1e3a5f', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 20 }}>{result.emoji} <strong>{result.label}</strong></div>
              <div style={{ color: '#cbd5e1', marginTop: 6 }}>{result.desc}</div>
              <div style={{ color: '#F5E642', marginTop: 10, fontWeight: 600, fontSize: 13 }}>👉 {result.action}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>🏠 Get a Free HVAC Quote from a DFW Pro</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>ProLnk vets all HVAC contractors for DFW climate expertise.</div>
        </div>
      </div>
    </div>
  );
}