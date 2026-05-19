import { useState } from 'react';

export default function DFWRefrigerantLeakGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);

  const symptoms = [
    { id: 'warm-air', label: '🌬️ Warm air from vents', weight: 3 },
    { id: 'frozen-coil', label: '🧊 Frozen evaporator coil', weight: 3 },
    { id: 'ice-suction', label: '🧊 Ice on suction line', weight: 3 },
    { id: 'bill-spike', label: '💸 Sudden electric bill spike', weight: 2 },
    { id: 'hissing', label: '🔊 Bubbling or hissing noise', weight: 2 },
    { id: 'long-cycles', label: '⏱️ System runs constantly', weight: 2 },
    { id: 'warm-home', label: '🌡️ Home cannot reach set temp', weight: 1 },
  ];

  function toggleSymptom(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  const score = selected.reduce((sum, id) => {
    const s = symptoms.find(s => s.id === id);
    return sum + (s?.weight ?? 0);
  }, 0);

  function getResult() {
    if (score >= 8) return { label: 'High Probability Leak', color: '#ef4444', action: 'Call an HVAC tech today — likely significant refrigerant loss. Do not run system continuously as it can damage compressor.' };
    if (score >= 4) return { label: 'Moderate Concern', color: '#f59e0b', action: 'Schedule inspection within 1 week. Could be low charge or early leak. Continued operation risks compressor failure.' };
    if (score >= 1) return { label: 'Minor Concern', color: '#22c55e', action: 'Monitor for 48 hours. If symptoms persist or worsen, schedule an inspection. Could be dirty filter or other issue.' };
    return { label: 'No Symptoms Selected', color: '#64748b', action: 'Select symptoms above to assess your system.' };
  }

  const result = getResult();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>❄️ ProLnk DFW Home Science Series</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
          🌬️ DFW Refrigerant Leak Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Signs your AC is low on refrigerant — and what R-410A phase-out means for DFW homeowners.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', label: 'Most Common Sign', value: 'Warm air', note: 'from supply vents' },
            { icon: '🔄', label: 'R-410A Status', value: 'Phase-Out', note: 'recovery required' },
            { icon: '⚠️', label: 'Compressor Risk', value: 'High', note: 'when run low on charge' },
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
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚗️ The Science of Refrigerant Leaks</h2>
          {[
            'Refrigerant operates in a sealed loop — low charge always means there is a leak, not just used-up refrigerant.',
            'Low refrigerant causes evaporator coil to drop below freezing, icing over and blocking airflow entirely.',
            'R-410A is now in phase-out under EPA regulations. Technicians must recover and recycle — no venting allowed.',
            'New systems use R-454B (Puron Advance) or R-32 — significantly lower global warming potential.',
            'Running a compressor with insufficient refrigerant causes liquid slugging — often results in compressor replacement ($1,800–$3,500).',
          ].map((fact, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642' }}>▸</span>
              <span style={{ color: '#cbd5e1' }}>{fact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2744', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🩺 Refrigerant Leak Symptom Checker</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Select all symptoms your system is showing:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => toggleSymptom(s.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: selected.includes(s.id) ? '2px solid #F5E642' : '2px solid #1e3a5f', cursor: 'pointer', background: selected.includes(s.id) ? '#1a2f4a' : '#0d1f36', color: '#e2e8f0', textAlign: 'left', fontSize: '0.95rem' }}>
                <span style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid', borderColor: selected.includes(s.id) ? '#F5E642' : '#475569', background: selected.includes(s.id) ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selected.includes(s.id) && <span style={{ color: '#0A1628', fontSize: '12px', fontWeight: 700 }}>✓</span>}
                </span>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: '10px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: result.color, fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{result.label}</div>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.action}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
