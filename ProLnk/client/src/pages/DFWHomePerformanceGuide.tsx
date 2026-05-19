import { useState } from 'react';

const systems = [
  { id: 'hvac', label: 'HVAC System', icon: '❄️', desc: 'Heating and cooling' },
  { id: 'insulation', label: 'Insulation', icon: '🧱', desc: 'Attic, walls, floors' },
  { id: 'airsealing', label: 'Air Sealing', icon: '💨', desc: 'Leaks, gaps, penetrations' },
  { id: 'windows', label: 'Windows & Doors', icon: '🪟', desc: 'Glazing, frames, seals' },
];

const problems = [
  { id: 'highbills', label: 'Sky-high summer bills', icon: '💸' },
  { id: 'hotrooms', label: 'Hot rooms even when AC runs', icon: '🥵' },
  { id: 'humidity', label: 'Humidity problems indoors', icon: '💧' },
  { id: 'dusty', label: 'Dusty / poor air quality', icon: '🌫️' },
  { id: 'drafts', label: 'Drafts in winter', icon: '🌬️' },
];

const matrix: Record<string, { check: string[]; avoid: string; note: string }> = {
  highbills: { check: ['airsealing', 'insulation', 'hvac'], avoid: 'windows', note: 'In DFW, 80% of high-bill issues are air sealing and attic insulation, not windows. Windows help last.' },
  hotrooms: { check: ['airsealing', 'insulation'], avoid: 'hvac', note: 'Adding HVAC capacity to a leaky home makes hot rooms worse, not better. Seal and insulate first.' },
  humidity: { check: ['airsealing', 'hvac'], avoid: 'insulation', note: 'DFW humidity often enters through air leaks. Your HVAC must be properly sized to dehumidify — oversized units short-cycle and leave moisture.' },
  dusty: { check: ['airsealing', 'hvac'], avoid: 'windows', note: 'Dust infiltration in DFW is mostly air sealing failure. Check duct leakage and attic penetrations.' },
  drafts: { check: ['airsealing', 'windows'], avoid: 'hvac', note: 'Drafts are always an air sealing problem first. New HVAC will not fix drafts.' },
};

export default function DFWHomePerformanceGuide() {
  const [selectedProblem, setSelectedProblem] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = selectedProblem ? matrix[selectedProblem] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 8 }}>DFW Whole-Home Performance Guide</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            Your DFW home is a system. HVAC, insulation, air sealing, and windows interact — fixing one incorrectly can make others worse.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {systems.map(s => (
            <div key={s.id} style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 10, padding: '0.6rem 1rem', textAlign: 'center', minWidth: 120 }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#F5E642' }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>What performance problem are you experiencing?</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {problems.map(p => (
            <div
              key={p.id}
              onClick={() => { setSelectedProblem(p.id); setShowResult(false); }}
              style={{
                background: selectedProblem === p.id ? 'rgba(245,230,66,0.12)' : 'rgba(255,255,255,0.05)',
                border: selectedProblem === p.id ? '1px solid #F5E642' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, padding: '0.85rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              <span style={{ fontWeight: 500 }}>{p.label}</span>
            </div>
          ))}
        </div>

        {selectedProblem && (
          <button
            onClick={() => setShowResult(true)}
            style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '0.85rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginBottom: '1.5rem' }}
          >
            Show Whole-Home Assessment →
          </button>
        )}

        {showResult && result && (
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '1.5rem', border: '1px solid rgba(245,230,66,0.2)' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>✅ Check First</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {result.check.map(id => {
                const s = systems.find(x => x.id === id);
                return s ? (
                  <span key={id} style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                    {s.icon} {s.label}
                  </span>
                ) : null;
              })}
            </div>
            <h3 style={{ color: '#f97316', marginBottom: '0.5rem' }}>⚠️ Do Not Start With</h3>
            <div style={{ marginBottom: '1rem' }}>
              {(() => { const s = systems.find(x => x.id === result.avoid); return s ? (
                <span style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: 8, padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}>
                  {s.icon} {s.label}
                </span>
              ) : null; })()}
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{result.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
