import { useState } from 'react';

const CRACK_TYPES = [
  {
    type: 'Shrinkage Crack',
    icon: '🔵',
    pattern: 'Hairline, random, spiderweb pattern',
    cause: 'Normal concrete curing (first 1-2 years)',
    urgency: 'low',
    urgencyLabel: 'Monitor Only',
    color: '#3B82F6',
    action: 'No action needed. Seal if water intrusion is a concern. Monitor annually.',
  },
  {
    type: 'Settlement Crack',
    icon: '🟡',
    pattern: 'Diagonal, steps follow mortar joints',
    cause: 'Downward movement — soil consolidation under load',
    urgency: 'medium',
    urgencyLabel: 'Get Evaluation',
    color: '#F59E0B',
    action: 'Have a foundation engineer assess. May require underpinning if ongoing movement.',
  },
  {
    type: 'Heave Crack',
    icon: '🟠',
    pattern: 'Horizontal or upward-pushing displacement',
    cause: 'Soil expansion from moisture — DFW clay swell',
    urgency: 'high',
    urgencyLabel: 'Urgent',
    color: '#F97316',
    action: 'Address moisture source immediately. French drain or root barrier may be needed.',
  },
  {
    type: 'Tension Crack',
    icon: '🔴',
    pattern: 'Straight, uniform width, perpendicular to beam',
    cause: 'Foundation pulling apart — opposite ends settling',
    urgency: 'critical',
    urgencyLabel: 'Call Engineer Now',
    color: '#EF4444',
    action: 'Stop monitoring — call a structural engineer this week. May need piers on multiple sides.',
  },
  {
    type: 'Shear Crack',
    icon: '🔴',
    pattern: 'Diagonal in one direction, visible displacement',
    cause: 'Structural movement — one section moving past another',
    urgency: 'critical',
    urgencyLabel: 'Emergency',
    color: '#DC2626',
    action: 'Structural concern — do not delay. Engage a licensed structural engineer immediately.',
  },
];

const CRACK_QUESTIONS = [
  { id: 'width', label: 'Crack Width', options: ['Hairline (barely visible)', 'Under 1/8 inch', '1/8 to 1/4 inch', 'Over 1/4 inch'] },
  { id: 'direction', label: 'Crack Direction', options: ['Random / spiderweb', 'Diagonal (downward step)', 'Horizontal', 'Straight vertical / perpendicular', 'Diagonal with displacement'] },
];

export default function DFWFoundationConcreteBeamCrack2026() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<null | typeof CRACK_TYPES[0]>(null);

  function classify() {
    const width = answers['width'] || '';
    const direction = answers['direction'] || '';
    if (width.includes('hairline') || direction.includes('spiderweb')) { setResult(CRACK_TYPES[0]); return; }
    if (direction.includes('displacement')) { setResult(CRACK_TYPES[4]); return; }
    if (direction.includes('straight vertical')) { setResult(CRACK_TYPES[3]); return; }
    if (direction.includes('Horizontal')) { setResult(CRACK_TYPES[2]); return; }
    if (direction.includes('Diagonal (downward')) { setResult(CRACK_TYPES[1]); return; }
    if (width.includes('Over 1/4')) { setResult(CRACK_TYPES[3]); return; }
    setResult(CRACK_TYPES[1]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔍</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Foundation Beam Crack Classification 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>DFW's expansive black clay soil creates unique foundation stress. Learn to classify concrete beam cracks by type, cause, and urgency.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Crack Classification Reference</h2>
          {CRACK_TYPES.map(c => (
            <div key={c.type} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{c.icon}</span>
                  <span style={{ fontWeight: 700 }}>{c.type}</span>
                </div>
                <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${c.color}22`, color: c.color }}>{c.urgencyLabel}</span>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Pattern: {c.pattern}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Cause: {c.cause}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 Crack Classifier Tool</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CRACK_QUESTIONS.map(q => (
              <div key={q.id}>
                <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>{q.label}</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {q.options.map(opt => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '8px 12px', background: answers[q.id] === opt ? '#F5E64211' : '#0A1628', border: `1px solid ${answers[q.id] === opt ? '#F5E642' : '#1E3A5F'}`, borderRadius: 8 }}>
                      <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => setAnswers(a => ({ ...a, [q.id]: opt }))} style={{ accentColor: '#F5E642' }} />
                      <span style={{ fontSize: 14 }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={classify}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer', marginTop: 4 }}>
              Classify This Crack
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: `1px solid ${result.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>{result.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{result.type}</div>
                  <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: `${result.color}22`, color: result.color }}>{result.urgencyLabel}</span>
                </div>
              </div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 14, color: '#E8EDF5', fontSize: 14 }}>💡 {result.action}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk · DFW Foundation Specialists · Get matched with a licensed foundation engineer</div>
      </div>
    </div>
  );
}