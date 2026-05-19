import { useState } from 'react';

const SYSTEMS = [
  { key: 'electrical', label: 'Electrical', icon: '⚡', description: 'Panel, GFCI, wiring, surge protection', dfwNote: 'Lightning storms + aging FPE/Zinsco panels = high DFW risk' },
  { key: 'plumbing', label: 'Plumbing', icon: '🔧', description: 'Pipes, pressure, water heater, slab leaks', dfwNote: 'Clay soil slab movement + hard water = #1 DFW plumbing threat' },
  { key: 'roof', label: 'Roof', icon: '🏠', description: 'Age, shingles, flashing, gutters', dfwNote: 'DFW averages 8+ hail events/year — hail alley demands Class 4 shingles' },
  { key: 'foundation', label: 'Foundation', icon: '🏗️', description: 'Cracks, drainage, tree proximity, watering', dfwNote: 'Expansive CH clay soil — worst foundation conditions in the country' },
  { key: 'hvac', label: 'HVAC', icon: '❄️', description: 'Age, efficiency, filter, ductwork condition', dfwNote: 'DFW heat (110°F+) runs AC 9 months/year — systems fail faster here' },
];

export default function DFWHomeSystemsSafetyTotal() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const parsed = SYSTEMS.map(s => ({
    ...s,
    score: Math.min(100, Math.max(0, parseInt(scores[s.key] || '0', 10) || 0)),
  }));

  const totalAvg = submitted ? Math.round(parsed.reduce((a, s) => a + s.score, 0) / SYSTEMS.length) : 0;
  const grade = totalAvg >= 90 ? 'A' : totalAvg >= 75 ? 'B' : totalAvg >= 60 ? 'C' : totalAvg >= 45 ? 'D' : 'F';
  const gradeColor = totalAvg >= 90 ? '#22c55e' : totalAvg >= 75 ? '#84cc16' : totalAvg >= 60 ? '#eab308' : totalAvg >= 45 ? '#f97316' : '#ef4444';

  const systemGrade = (n: number) => n >= 90 ? 'A' : n >= 75 ? 'B' : n >= 60 ? 'C' : n >= 45 ? 'D' : 'F';
  const systemColor = (n: number) => n >= 90 ? '#22c55e' : n >= 75 ? '#84cc16' : n >= 60 ? '#eab308' : n >= 45 ? '#f97316' : '#ef4444';

  const worstThree = [...parsed].sort((a, b) => a.score - b.score).slice(0, 3);

  const allFilled = SYSTEMS.every(s => scores[s.key] && scores[s.key].trim() !== '');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0' }}>DFW Home Safety Total Score</h1>
          <p style={{ color: '#94a3b8' }}>Enter your score (0–100) from each system assessment</p>
        </div>

        {!submitted ? (
          <>
            {SYSTEMS.map(s => (
              <div key={s.key} style={{ background: '#0f2038', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18 }}>{s.label}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.description}</div>
                  </div>
                </div>
                <div style={{ background: '#0a1e3a', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontSize: 13, color: '#f97316' }}>
                  ⚠️ DFW Note: {s.dfwNote}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input
                    type="number" min={0} max={100}
                    placeholder="Your score (0–100)"
                    value={scores[s.key] || ''}
                    onChange={e => setScores(prev => ({ ...prev, [s.key]: e.target.value }))}
                    style={{ flex: 1, background: '#1e3a5f', color: '#fff', border: '2px solid #2d4a6e', borderRadius: 8, padding: '10px 14px', fontSize: 16 }}
                  />
                  {scores[s.key] && (
                    <div style={{ fontSize: 24, fontWeight: 900, color: systemColor(parseInt(scores[s.key], 10)) }}>
                      {systemGrade(parseInt(scores[s.key], 10))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <button onClick={() => setSubmitted(true)} disabled={!allFilled}
              style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 12, padding: '16px', fontSize: 18, fontWeight: 700, cursor: 'pointer', opacity: allFilled ? 1 : 0.5 }}>
              Calculate Total Home Safety Grade
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2038', borderRadius: 16, padding: 32, marginBottom: 24, textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', margin: 0 }}>Overall Home Safety Grade</p>
              <div style={{ fontSize: 96, fontWeight: 900, color: gradeColor, lineHeight: 1 }}>{grade}</div>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#F5E642' }}>{totalAvg}%</div>
            </div>

            <div style={{ background: '#0f2038', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>System Breakdown</h3>
              {parsed.map(s => (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontWeight: 600 }}>{s.label}</span>
                      <span style={{ color: systemColor(s.score), fontWeight: 700 }}>{systemGrade(s.score)} ({s.score}%)</span>
                    </div>
                    <div style={{ background: '#1e3a5f', borderRadius: 4, height: 8 }}>
                      <div style={{ background: systemColor(s.score), borderRadius: 4, height: 8, width: `${s.score}%`, transition: 'width 0.5s' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#1a0a0a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <h3 style={{ color: '#ef4444', marginBottom: 12 }}>🔴 Top 3 DFW Risks to Address</h3>
              {worstThree.map((s, i) => (
                <div key={s.key} style={{ marginBottom: 12 }}>
                  <div style={{ color: '#fca5a5', fontWeight: 600 }}>#{i + 1} {s.icon} {s.label} — Score: {s.score}%</div>
                  <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{s.dfwNote}</div>
                </div>
              ))}
            </div>

            <button onClick={() => { setScores({}); setSubmitted(false); }}
              style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 12, padding: '14px', fontWeight: 700, cursor: 'pointer' }}>
              Recalculate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
