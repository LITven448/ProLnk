import { useState } from 'react';

const questions = [
  { id: 'age', label: 'System age?', options: ['<5 years', '5-10 years', '10-15 years', '>15 years'] },
  { id: 'tuneup', label: 'Last professional tune-up?', options: ['<1 year', '1-2 years', '2-3 years', 'Never/unknown'] },
  { id: 'filter', label: 'Filter condition and replacement frequency?', options: ['Monthly, clean', 'Every 3mo', 'Every 6mo+', 'Unknown/never'] },
  { id: 'drain', label: 'Condensate drain line condition?', options: ['Clear, flushed annually', 'Clear, never flushed', 'Partial blockage suspected', 'Overflowed before'] },
  { id: 'refrigerant', label: 'Refrigerant charge status?', options: ['Verified correct', 'Not checked recently', 'Low suspected', 'Known low/leak'] },
  { id: 'blower', label: 'Blower motor and belt condition?', options: ['Inspected, good', 'Running fine, unchecked', 'Noisy', 'Known issue'] },
  { id: 'ducts', label: 'Duct insulation in attic?', options: ['R-8+ insulated', 'R-6 insulated', 'Minimal insulation', 'Uninsulated'] },
  { id: 'thermostat', label: 'Thermostat type and calibration?', options: ['Smart, calibrated', 'Programmable', 'Basic digital', 'Manual/old'] },
  { id: 'cooling', label: 'Summer cooling performance?', options: ['Reaches setpoint easily', 'Slightly struggles >100°F', 'Struggles most days', 'Cannot cool adequately'] },
  { id: 'humidity', label: 'Indoor humidity control in summer?', options: ['55-60% maintained', '60-65%', '65-70%', '>70% or unknown'] },
  { id: 'coil', label: 'Evaporator/condenser coil cleanliness?', options: ['Cleaned last year', 'Cleaned 2-3yr ago', 'Never cleaned', 'Visibly dirty'] },
  { id: 'outdoor', label: 'Outdoor unit clearance and shade?', options: ['2ft clear, some shade', '2ft clear, full sun', 'Partially obstructed', 'Blocked/overgrown'] },
  { id: 'noise', label: 'Unusual noises during operation?', options: ['None', 'Minor hum', 'Rattling/banging', 'Loud or frequent'] },
  { id: 'bills', label: 'Summer electric bills vs neighbors?', options: ['Below average', 'Average', 'Above average', 'Significantly higher'] },
  { id: 'zones', label: 'Zoning or multi-stage capability?', options: ['Multi-zone, variable', 'Multi-zone, single stage', 'Single zone, 2-stage', 'Single zone, single stage'] },
];

const weights = [0, 1, 2, 3];

export default function DFWHVACInspectionScore() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; risk: string; items: string[] } | null>(null);

  const allAnswered = Object.keys(answers).length === questions.length;

  function calculate() {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const max = questions.length * 3;
    const score = Math.round(100 - (total / max) * 100);
    const risk = total <= 10 ? 'Low Risk — DFW Ready' : total <= 25 ? 'Moderate Risk — Pre-Summer Action Needed' : 'High Risk — System Failure Likely This Summer';
    const items: string[] = [];
    if (answers['filter'] >= 2) items.push('Switch to monthly filter replacement — DFW dust and allergens clog filters fast');
    if (answers['drain'] >= 2) items.push('Flush condensate drain with bleach — DFW humidity causes algae blockages monthly');
    if (answers['coil'] >= 2) items.push('Schedule professional coil cleaning — dirty coils cut efficiency 30% in DFW heat');
    if (answers['ducts'] >= 2) items.push('Upgrade attic duct insulation to R-8 — attic temps reach 160°F in DFW summers');
    if (answers['age'] >= 2) items.push('Budget for system replacement — units >10yr old struggle with DFW peak demand');
    if (answers['cooling'] >= 2) items.push('Emergency tune-up before June — DFW 100°F+ days test system limits daily');
    if (items.length === 0) {
      items.push('Schedule annual tune-up each March before DFW heat season');
      items.push('Flush condensate drain monthly May-September');
      items.push('Keep outdoor unit clear and shaded if possible');
    }
    setResult({ score, risk, items });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: 'white', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 8 }}>❄️ DFW HOME HEALTH</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Inspection Score</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>15-question assessment calibrated for North Texas extreme heat and humidity conditions.</p>
        </div>

        {questions.map((q, qi) => (
          <div key={q.id} style={{ background: '#0f1f3a', borderRadius: 12, padding: '16px 20px', marginBottom: 12 }}>
            <p style={{ fontWeight: 600, marginBottom: 12, fontSize: 15 }}>{qi + 1}. {q.label}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {q.options.map((opt, oi) => (
                <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: weights[oi] }))}
                  style={{ padding: '10px 14px', borderRadius: 8, border: '2px solid',
                    borderColor: answers[q.id] === weights[oi] ? '#F5E642′ : '#1e3a5f',
                    background: answers[q.id] === weights[oi] ? 'rgba(245,230,66,0.12)' : 'transparent',
                    color: answers[q.id] === weights[oi] ? '#F5E642′ : '#94a3b8',
                    cursor: 'pointer', fontSize: 13, textAlign: 'left' }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={calculate} disabled={!allAnswered}
          style={{ width: '100%', padding: '16px', background: allAnswered ? '#F5E642′ : '#1e3a5f',
            color: allAnswered ? '#0A1628′ : '#4a6080', border: ’none', borderRadius: 12,
            fontWeight: 700, fontSize: 16, cursor: allAnswered ? 'pointer' : 'not-allowed', marginTop: 8 }}>
          {allAnswered ? 'Calculate HVAC Score →' : `Answer ${questions.length - Object.keys(answers).length} more question(s)`}
        </button>

        {result && (
          <div style={{ marginTop: 24, background: '#0f1f3a', borderRadius: 16, padding: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 72, fontWeight: 800, color: result.score >= 70 ? '#22c55e' : result.score >= 45 ? '#f59e0b' : '#ef4444′ }}>
                {result.score}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>HVAC Health Score</div>
              <div style={{ display: 'inline-block', background: 'rgba(245,230,66,0.15)', color: '#F5E642', padding: '6px 16px', borderRadius: 20, fontSize: 13 }}>
                🌡️ {result.risk}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔧 Priority Maintenance Items</div>
              {result.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span>{item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
