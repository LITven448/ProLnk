import { useState } from 'react';

const questions = [
  { id: 'pipes', text: 'Pipe insulation installed on exposed pipes in attic, garage, and exterior walls?', weight: 12 },
  { id: 'heat', text: 'Heating system professionally inspected and serviced this fall?', weight: 11 },
  { id: 'generator', text: 'Generator tested, fuel stocked, or backup heating plan in place (learned from 2021)?', weight: 12 },
  { id: 'faucets', text: 'Outdoor faucets insulated and hoses disconnected before first freeze?', weight: 9 },
  { id: 'drip', text: 'Know how to drip faucets and shut off main water valve in an emergency?', weight: 8 },
  { id: 'furnace_filter', text: 'Furnace filter replaced in the last 60 days?', weight: 7 },
  { id: 'weatherstrip', text: 'Weatherstripping on doors and windows in good condition — no drafts?', weight: 6 },
  { id: 'attic', text: 'Attic access door insulated and sealed?', weight: 6 },
  { id: 'fireplace', text: 'Fireplace or alternative heat source inspected and ready (if applicable)?', weight: 5 },
  { id: 'emergency', text: 'Emergency supplies: 72-hour water, food, blankets, flashlights stocked?', weight: 8 },
  { id: 'smoke', text: 'Smoke and CO detectors working — CO risk rises in winter from heating equipment?', weight: 7 },
  { id: 'roof', text: 'Roof and gutters cleared — ice dams rare in DFW but storms cause debris damage?', weight: 5 },
  { id: 'foundation', text: 'Foundation watering reduced but not stopped — DFW clay soil still shifts in winter?', weight: 7 },
  { id: 'neighbor', text: 'Connected with a neighbor to check on each other during extended freeze?', weight: 4 },
  { id: 'contractors', text: 'Plumber and HVAC contact saved — do NOT wait for freeze to search?', weight: 3 },
];

const totalWeight = questions.reduce((s, q) => s + q.weight, 0);

export default function DFWWinterReadinessScore2026() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string, val: boolean) => setAnswers(prev => ({ ...prev, [id]: val }));

  const answered = Object.keys(answers).length;
  const score = Math.round(
    (questions.reduce((s, q) => s + (answers[q.id] === true ? q.weight : 0), 0) / totalWeight) * 100
  );

  const scoreColor = score >= 80 ? '#22c55e' : score >= 55 ? '#F5E642′ : '#ef4444';
  const label = score >= 80 ? 'Winter Ready ❄️' : score >= 55 ? 'Needs Action ⚠️' : 'High Risk 🔴';

  const priorities = questions
    .filter(q => answers[q.id] === false)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>
            DFW Winter Readiness Score 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>
            Post-2021 freeze edition · 15 questions · ~3 minutes
          </p>
        </div>

        {questions.map((q, i) => (
          <div key={q.id} style={{ background: '#111f3a', borderRadius: 10, padding: '14px 16px', marginBottom: 10 }}>
            <p style={{ margin: '0 0 10px', fontSize: 14, lineHeight: 1.5 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span> {q.text}
              <span style={{ color: '#64748b', fontSize: 11, marginLeft: 6 }}>(weight {q.weight})</span>
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[true, false].map(v => (
                <button key={String(v)} onClick={() => toggle(q.id, v)} style={{
                  padding: '6px 18px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: answers[q.id] === v ? (v ? '#22c55e' : '#ef4444') : '#1e3a5f',
                  color: answers[q.id] === v ? '#fff' : '#94a3b8',
                }}>
                  {v ? '✅ Yes' : '❌ No'}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button onClick={() => setSubmitted(true)} disabled={answered < 15}
          style={{ width: '100%', marginTop: 20, padding: '14px', borderRadius: 10, border: 'none',
            cursor: answered < 15 ? 'not-allowed' : 'pointer',
            background: answered < 15 ? '#1e3a5f' : '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16 }}>
          {answered < 15 ? `Answer all questions (${answered}/15)` : 'Get My Winter Score'}
        </button>

        {submitted && (
          <div style={{ marginTop: 28, background: '#111f3a', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 56, fontWeight: 800, color: scoreColor }}>{score}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: scoreColor, marginBottom: 8 }}>{label}</div>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: priorities.length ? 20 : 0 }}>
              DFW freeze risk is real. Pipes and heating are your top priorities.
            </p>
            {priorities.length > 0 && (
              <>
                <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>Fix These First</h3>
                {priorities.map(p => (
                  <div key={p.id} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, textAlign: 'left', fontSize: 13 }}>
                    🔧 {p.text}
                  </div>
                ))}
              </>
            )}
            <p style={{ color: '#F5E642', fontSize: 13, marginTop: 16 }}>ProLnk has vetted DFW plumbers and HVAC pros ready before the next freeze.</p>
          </div>
        )}
      </div>
    </div>
  );
}
