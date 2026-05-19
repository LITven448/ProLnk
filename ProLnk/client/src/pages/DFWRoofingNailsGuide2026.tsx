import { useState } from 'react';

const assessments = [
  { concern: 'Shingles lifting or loose', cause: 'Seal failure', icon: '🔓', detail: 'Seal strip failure — common in DFW heat. Hand-nail replacement shingles with 6 nails per shingle in Wind Zone 2. Check for overdriven nails on adjacent shingles causing seal gap.' },
  { concern: 'Nail pops visible', cause: 'Nail pop', icon: '📌', detail: 'Nail pop from expansion/contraction cycles — DFW temperature range causes wood deck movement. Recess and re-ring-shank nail, cover with sealant. Check for widespread pattern indicating deck issues.' },
  { concern: 'Post-storm damage', cause: 'Wind assessment', icon: '🌪️', detail: 'DFW Wind Zone 2: code requires 6 fasteners per shingle in high-wind areas. Both hand-nailed and pneumatic acceptable if properly placed in fastener zone (1 inch from edge, in nail line).' },
  { concern: 'New roof quality check', cause: 'Installation verify', icon: '✅', detail: 'Most common roofer error: overdriven nails cutting through shingle mat. Inspect exposed nails — should sit flush, not recessed. Pneumatic guns set too high is top cause. Get independent inspection.' },
];

export default function DFWRoofingNailsGuide2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<typeof assessments[0] | null>(null);

  const concerns = assessments.map(a => a.concern);

  const getAssessment = () => {
    const match = assessments.find(a => a.concern === concern);
    setResult(match || null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔩</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Roofing Fasteners Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Why nailing technique determines your DFW roof performance in high-wind zones.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Fastener Standards</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🌪️', label: 'Wind Zone', val: 'Zone 2 — most of DFW metro' },
              { icon: '🔩', label: 'Nails Required', val: '6 per shingle high-wind areas' },
              { icon: '🔨', label: 'Method', val: 'Hand or pneumatic both OK' },
              { icon: '⚠️', label: 'Top Error', val: 'Overdriven nails cut shingle mat' },
            ].map(f => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 12 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Fastener Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>What is your concern?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select concern...</option>
              {concerns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={getAssessment} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Assessment →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.cause}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.detail}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', color: '#475569', fontSize: 12 }}>ProLnk DFW Roofing Intelligence • 2026</div>
      </div>
    </div>
  );
}