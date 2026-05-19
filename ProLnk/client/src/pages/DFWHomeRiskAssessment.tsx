import { useState } from 'react';

const QUESTIONS = [
  { id: 'floodZone', category: 'Location', text: 'Is your home in a FEMA flood zone (Zone A or AE)?', weight: 3, options: ['Yes — flood zone', 'No — not in flood zone', "Don't know"] },
  { id: 'hailHistory', category: 'Location', text: 'Has your area had significant hail in the past 2 years?', weight: 2, options: ['Yes — major hail events', 'Minor hail only', 'No major hail'] },
  { id: 'tornadoRisk', category: 'Location', text: 'Are you in a high tornado corridor area of DFW?', weight: 2, options: ['Yes — north TX corridor', 'Moderate risk area', 'Lower risk area'] },
  { id: 'foundationType', category: 'Structural', text: 'What type of foundation does your home have?', weight: 3, options: ['Slab on expansive clay (high risk)', 'Pier & beam (moderate)', 'Recently repaired slab'] },
  { id: 'homeAge', category: 'Structural', text: 'How old is your home?', weight: 2, options: ['30+ years', '15–30 years', 'Under 15 years'] },
  { id: 'hvacAge', category: 'Systems', text: 'How old is your primary HVAC system?', weight: 3, options: ['12+ years (end of life)', '8–12 years', 'Under 8 years'] },
  { id: 'roofAge', category: 'Systems', text: 'How old is your roof?', weight: 3, options: ['20+ years', '10–20 years', 'Under 10 years'] },
  { id: 'electricalAge', category: 'Systems', text: 'Does your home have an older electrical panel (60/100 amp or Federal Pacific)?', weight: 2, options: ['Yes — older panel', 'Unsure', 'No — updated panel'] },
  { id: 'plumbingType', category: 'Systems', text: 'What plumbing material does your home have?', weight: 2, options: ['Galvanized steel (pre-1980)', 'Polybutylene (recall risk)', 'Copper or PEX'] },
  { id: 'maintenanceFreq', category: 'Maintenance', text: 'How often do you perform routine home maintenance?', weight: 2, options: ['Rarely or never', 'Occasionally', 'Regularly (annual inspections)'] },
  { id: 'hvacFilter', category: 'Maintenance', text: 'How often do you change HVAC filters?', weight: 1, options: ['Never / unsure', 'Every 6+ months', 'Every 1–3 months'] },
  { id: 'foundationWater', category: 'Maintenance', text: 'Do you maintain consistent moisture around your foundation?', weight: 2, options: ['No — irregular watering', 'Sometimes', 'Yes — consistent soaker hose'] },
  { id: 'inspections', category: 'Maintenance', text: 'Have you had a professional home inspection in the past 3 years?', weight: 2, options: ['No', 'Unsure', 'Yes'] },
  { id: 'insuranceCoverage', category: 'Maintenance', text: 'Is your homeowner insurance current with adequate coverage?', weight: 1, options: ['No / lapsed', 'Basic only', 'Fully covered including flood'] },
  { id: 'treeRisk', category: 'Location', text: 'Do you have large trees near the home or roofline?', weight: 1, options: ['Yes — overhanging roof', 'Nearby but trimmed', 'No large trees nearby'] },
];

const SCORE_MAP: Record<string, number> = {};
QUESTIONS.forEach(q => { q.options.forEach((o, i) => { SCORE_MAP[`${q.id}_${i}`] = i === 0 ? 3 : i === 1 ? 1.5 : 0; }); });

export default function DFWHomeRiskAssessment() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (id: string, idx: number) => setAnswers(prev => ({ ...prev, [id]: idx }));
  const totalAnswered = Object.keys(answers).length;
  const totalWeight = QUESTIONS.reduce((s, q) => s + q.weight, 0);
  const rawScore = QUESTIONS.reduce((s, q) => s + (answers[q.id] !== undefined ? SCORE_MAP[`${q.id}_${answers[q.id]}`] * q.weight : 0), 0);
  const maxScore = totalWeight * 3;
  const riskPct = Math.round((rawScore / maxScore) * 100);
  const riskLabel = riskPct >= 65 ? 'High Risk' : riskPct >= 35 ? 'Moderate Risk' : 'Lower Risk';
  const riskColor = riskPct >= 65 ? '#ef4444' : riskPct >= 35 ? '#f97316' : '#22c55e';

  const topRisks = QUESTIONS
    .filter(q => answers[q.id] === 0)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3);

  const categories = [...new Set(QUESTIONS.map(q => q.category))];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Home Risk Assessment</h1>
          <p style={{ color: '#94a3b8' }}>15 questions covering location, structural, systems, and maintenance risk</p>
        </div>

        {!submitted ? (
          <>
            {categories.map(cat => (
              <div key={cat} style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem' }}>
                <h3 style={{ color: '#F5E642', marginTop: 0 }}>{cat === 'Location' ? '📍' : cat === 'Structural' ? '🏗️' : cat === 'Systems' ? '⚙️' : '🔨'} {cat} Risk</h3>
                {QUESTIONS.filter(q => q.category === cat).map(q => (
                  <div key={q.id} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ color: '#e2e8f0', marginBottom: 8, fontSize: '0.95rem' }}>{q.text}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {q.options.map((opt, i) => (
                        <button key={i} onClick={() => setAnswer(q.id, i)}
                          style={{ textAlign: 'left', padding: '0.6rem 1rem', borderRadius: 8, border: `1px solid ${answers[q.id] === i ? '#F5E642' : '#1e3a5f'}`, background: answers[q.id] === i ? '#1a2d4a' : 'transparent', color: answers[q.id] === i ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontSize: '0.9rem' }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={() => { if (totalAnswered >= QUESTIONS.length) setSubmitted(true); }}
              disabled={totalAnswered < QUESTIONS.length}
              style={{ width: '100%', padding: '1rem', borderRadius: 10, background: totalAnswered >= QUESTIONS.length ? '#F5E642' : '#1e3a5f', color: '#0A1628', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: totalAnswered >= QUESTIONS.length ? 'pointer' : 'not-allowed' }}>
              {totalAnswered < QUESTIONS.length ? `Answer ${QUESTIONS.length - totalAnswered} more question(s)` : 'See My Risk Score →'}
            </button>
          </>
        ) : (
          <div>
            <div style={{ background: '#0f2040', borderRadius: 12, padding: '2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ color: '#94a3b8', marginBottom: 8 }}>Your DFW Home Risk Score</div>
              <div style={{ color: riskColor, fontSize: '3.5rem', fontWeight: 700 }}>{riskPct}%</div>
              <div style={{ color: riskColor, fontSize: '1.3rem', fontWeight: 700 }}>{riskLabel}</div>
              <div style={{ height: 12, background: '#1e3a5f', borderRadius: 6, margin: '1rem 0' }}>
                <div style={{ height: '100%', width: `${riskPct}%`, background: riskColor, borderRadius: 6 }} />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>DFW Average: 42% (Moderate)</div>
            </div>
            {topRisks.length > 0 && (
              <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem' }}>
                <h3 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Top 3 Risks to Address</h3>
                {topRisks.map((q, i) => (
                  <div key={q.id} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                    <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 4 }}>#{i + 1} — {q.category} Risk</div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{q.text}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: 4 }}>Priority Weight: {q.weight}/3</div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => { setSubmitted(false); setAnswers({}); }}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 10, background: 'transparent', border: '1px solid #F5E642', color: '#F5E642', fontWeight: 600, cursor: 'pointer' }}>
              ← Retake Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
