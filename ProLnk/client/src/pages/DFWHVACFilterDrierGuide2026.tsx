import { useState } from 'react';

export default function DFWHVACFilterDrierGuide2026() {
  const [situation, setSituation] = useState<string | null>(null);

  const facts = [
    { icon: '💧', title: 'Moisture Removal', body: 'Filter drier absorbs moisture from refrigerant circuit. Even tiny amounts of moisture react with refrigerant to form acids that destroy compressor.' },
    { icon: '🔄', title: 'Always Replace When Opened', body: 'Any time refrigerant is recovered and recharged, drier must be replaced. Saturated drier = acid formation. This is non-negotiable — any pro skipping this step is cutting corners.' },
    { icon: '⚠️', title: 'Acid-Damaged System', body: 'Acid from failed drier attacks copper tubing, TXV, and compressor valves. Contaminated system requires full flush — $800-1,500 job. Prevention costs $50.' },
    { icon: '🚫', title: 'TXV Restriction', body: 'Saturated drier can restrict refrigerant flow just like a failed TXV. Many misdiagnosed TXV calls are actually clogged driers. Freeze at drier outlet = confirmed restriction.' },
  ];

  const situations = [
    { id: 'refwork', label: 'Refrigerant being added or recovered', guide: 'Replace drier every time without exception. Budget $40-80 for the part. Tech should install new bi-directional drier on liquid line before pulling vacuum and recharging.' },
    { id: 'burn', label: 'Compressor burned out', guide: 'Acid contamination guaranteed. Install suction line filter AND liquid line drier after flush. Run system 200+ hours, then replace driers again to capture remaining debris.' },
    { id: 'restrict', label: 'Frost or ice at drier location', guide: 'Confirmed drier restriction. Refrigerant pressure drop across drier causes temperature drop → frost. Replace immediately — this is causing TXV-like symptoms and reducing efficiency.' },
    { id: 'old', label: 'System is 10+ years old, never serviced', guide: 'Replace drier at next refrigerant service. Also inspect sight glass (if equipped) for bubbles indicating moisture. Proactive replacement on aging DFW systems is good practice.' },
    { id: 'moisture', label: 'Sight glass showing bubbles or yellow indicator', guide: 'Moisture detected in system. Replace drier immediately, then run system and monitor. If sight glass stays yellow, system needs refrigerant recovery, full moisture purge, and new drier.' },
  ];

  const sel = situations.find(s => s.id === situation);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔵</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC Filter Drier Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>The $50 part that prevents $2,000 compressor failures</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {facts.map((f, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{f.title}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5' }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #334155' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>📋 Situation → Service Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSituation(situation === s.id ? null : s.id)}
                style={{ background: situation === s.id ? '#F5E642' : '#0f172a', color: situation === s.id ? '#0A1628' : '#e2e8f0',
                  border: '1px solid' + (situation === s.id ? ' #F5E642' : ' #334155'), borderRadius: '0.5rem',
                  padding: '0.75rem 1rem', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem' }}>
                {s.label}
              </button>
            ))}
          </div>
          {sel && (
            <div style={{ background: '#0f172a', borderRadius: '0.5rem', padding: '1rem', borderLeft: '4px solid #4ade80' }}>
              <div style={{ color: '#4ade80', fontWeight: '700', marginBottom: '0.5rem' }}>✅ Recommended Action</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.6' }}>{sel.guide}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk — Connecting DFW Homeowners with Honest HVAC Pros
        </div>
      </div>
    </div>
  );
}
