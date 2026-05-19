import { useState } from 'react';

const questions: { q: string; options: string[]; correct: number; explanation: string }[] = [
  { q: 'What is the minimum SEER2 rating for a new central AC system in DFW (North Texas climate zone)?', options: ['13 SEER2', '14 SEER2', '15 SEER2', '16 SEER2'], correct: 1, explanation: 'As of Jan 2023, the DOE requires 14 SEER2 minimum for North Texas (Southeast region). This replaced the old 14 SEER standard under the new M1 test procedure.' },
  { q: 'How often should you replace your air filter in a DFW home running the AC during summer?', options: ['Once a year', 'Every 6 months', 'Every 1–3 months', 'Every 2 weeks'], correct: 2, explanation: 'DFW\’s heavy pollen, dust, and extreme runtime means most homes need filter changes every 1–2 months in summer. Neglecting this is the #1 cause of coil freeze and airflow problems.' },
  { q: 'What is DFW\’s outdoor design temperature used for HVAC equipment sizing?', options: ['95°F', '98°F', '100°F', '105°F'], correct: 2, explanation: 'ACCA Manual J uses 100°F for Dallas-Fort Worth. This means your system must be sized to handle 100°F outdoor temps, which occur regularly in July and August.' },
  { q: 'Your condensate drain line is slow-draining. What is the fastest fix to prevent an overflow?', options: ['Pour bleach down the line', 'Replace the drain pan', 'Use a wet-dry vac to pull the clog from the exterior drain', 'Add a secondary drain pan'], correct: 2, explanation: 'Attaching a wet-dry vac to the exterior drain port and pulling the clog out takes 60 seconds and works 90% of the time. Bleach can damage PVC fittings and is a secondary step.' },
  { q: 'What refrigerant do most new DFW residential HVAC systems use as of 2025?', options: ['R-22 (Freon)', 'R-410A', 'R-454B (Puron Advance)', 'R-32'], correct: 2, explanation: 'The EPA phased out R-410A for new equipment effective Jan 2025. New systems now use A2L refrigerants — primarily R-454B (Puron Advance) and R-32. Your 2024+ unit uses this.' },
  { q: 'DFW\’s average cooling season runs approximately how many months?', options: ['3–4 months', '5–6 months', '7–8 months', '9–10 months'], correct: 2, explanation: 'DFW runs AC from roughly April through October — 7 months. Some years see AC needed in March and November. This extreme runtime demands more frequent maintenance than most of the country.' },
  { q: 'Your heat pump is blowing cold air in heating mode. What should you check first?', options: ['Refrigerant charge', 'Defrost cycle status', 'Reversing valve', 'Thermostat settings'], correct: 1, explanation: 'First check if the system is in a defrost cycle — this is normal and lasts 5–15 min. If defrost is not active, then investigate the reversing valve, refrigerant charge, and thermostat wiring.' },
  { q: 'What does a dirty evaporator coil cause in a DFW summer?', options: ['Higher SEER rating', 'Reduced airflow and coil freeze', 'Lower refrigerant pressure', 'Louder compressor noise'], correct: 1, explanation: 'A dirty evaporator coil restricts airflow, dropping coil temperature below 32°F and causing ice formation. The ice further blocks airflow, compounding the problem until the system shuts down.' },
  { q: 'At what outdoor temperature does a DFW heat pump typically switch to auxiliary heat?', options: ['45°F', '40°F', '32–35°F', '20°F'], correct: 2, explanation: 'Most DFW heat pumps are configured with balance points between 30–38°F. Auxiliary heat activates when outdoor temps fall below this point — which in DFW happens only a few weeks per year.' },
  { q: 'What does high superheat AND high subcooling together indicate?', options: ['Refrigerant overcharge', 'Refrigerant undercharge', 'Liquid line restriction', 'TXV stuck open'], correct: 2, explanation: 'High superheat + high subcooling = liquid line restriction. The refrigerant is subcooling well at the condenser but struggling to reach the evaporator, causing high superheat at the outlet.' },
  { q: 'Your outdoor unit fan is running but the compressor is not. In DFW summer what is most likely?', options: ['Dirty filter', 'Compressor overload tripped due to heat', 'Refrigerant overcharge', 'Capacitor failure on condenser fan'], correct: 1, explanation: 'In DFW summer heat, compressor overload protection trips when the unit gets too hot. Also check: capacitor failure (compressor capacitor, not fan), high head pressure from dirty condenser coil, low voltage.' },
  { q: 'How should you clean a DFW home\’s outdoor condenser coil?', options: ['Pressure wash from outside in', 'Garden hose from inside out (top down)', 'Dish soap and scrub brush', 'Compressed air from top'], correct: 1, explanation: 'Always rinse the condenser coil from inside out — this pushes debris out the direction it entered. Pressure washing from outside drives debris deeper into the fins. Hose pressure, not pressure washer.' },
  { q: 'What size breaker typically serves a DFW 4-ton central AC system?', options: ['20A', '30A', '40–50A', '60A'], correct: 2, explanation: 'A 4-ton system (48,000 BTU) typically draws 15–20 amps at 240V and requires a 40–50A double-pole breaker with appropriate wire gauge. Always verify with the equipment nameplate MCA and MOCP ratings.' },
  { q: 'Your DFW home is 2,400 sq ft. What is a reasonable AC system size estimate?', options: ['2 tons', '3 tons', '3.5–4 tons', '5 tons'], correct: 2, explanation: 'DFW\’s heat intensity means higher cooling loads than national averages. A rough estimate is 600 sq ft per ton in DFW (vs. 700–800 in mild climates), putting 2,400 sq ft at approximately 3.5–4 tons. Manual J required for accurate sizing.' },
  { q: 'What annual maintenance task most directly prevents expensive DFW summer breakdowns?', options: ['Replacing the capacitor proactively', 'Spring tune-up with coil cleaning + refrigerant check + electrical inspection', 'Painting the outdoor unit white to reflect heat', 'Installing a smart thermostat'], correct: 1, explanation: 'A spring tune-up before DFW summer is the single highest-ROI maintenance task. It catches low refrigerant, weak capacitors, dirty coils, and electrical issues before 100°F days stress them to failure.' },
];

type Answer = number | null;

export default function DFWHVACFinalKnowledgeTest() {
  const [answers, setAnswers] = useState<Answer[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const score = submitted ? answers.filter((a, i) => a === questions[i].correct).length : 0;
  const pct = Math.round((score / questions.length) * 100);
  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';
  const gradeColor = pct >= 80 ? '#10B981' : pct >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🎓</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC Final Knowledge Test</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>15 questions every DFW homeowner should be able to answer before Texas summer hits</p>
        </div>

        {questions.map((q, qi) => (
          <div key={qi} style={{ background: '#0F2140', borderRadius: 12, padding: 20, marginBottom: 16, border: submitted && answers[qi] !== q.correct ? '1px solid #EF4444' : submitted ? '1px solid #10B981' : '1px solid #1E3A5F' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Q{qi + 1}: {q.q}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {q.options.map((opt, oi) => {
                let bg = '#1E3A5F';
                if (submitted) {
                  if (oi === q.correct) bg = '#064E3B';
                  else if (oi === answers[qi] && oi !== q.correct) bg = '#450A0A';
                } else if (answers[qi] === oi) bg = '#1E4A7F';
                return (
                  <button key={oi} onClick={() => { if (!submitted) { const a = [...answers]; a[qi] = oi; setAnswers(a); } }}
                    style={{ background: bg, border: 'none', borderRadius: 8, padding: '10px 14px', color: '#E2E8F0', textAlign: 'left', cursor: submitted ? 'default' : 'pointer', fontSize: 13 }}>
                    {['A', 'B', 'C', 'D'][oi]}) {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div style={{ marginTop: 10, color: '#94A3B8', fontSize: 12, lineHeight: 1.5, borderTop: '1px solid #334155', paddingTop: 10 }}>
                💡 {q.explanation}
              </div>
            )}
          </div>
        ))}

        {!submitted ? (
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>{answers.filter(a => a !== null).length} of {questions.length} answered</div>
            <button onClick={() => setSubmitted(true)} disabled={answers.some(a => a === null)}
              style={{ background: answers.some(a => a === null) ? '#334155' : '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, padding: '14px 36px', cursor: answers.some(a => a === null) ? 'not-allowed' : 'pointer' }}>
              Submit Quiz
            </button>
          </div>
        ) : (
          <div style={{ background: '#0F2140', borderRadius: 12, padding: 28, textAlign: 'center', border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 56, marginBottom: 8 }}>📊</div>
            <div style={{ color: gradeColor, fontSize: 52, fontWeight: 900 }}>{grade}</div>
            <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '8px 0 4px' }}>{score} / {questions.length} correct ({pct}%)</div>
            <div style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>
              {pct >= 90 ? 'Outstanding — you know DFW HVAC as well as most technicians.' : pct >= 70 ? 'Solid knowledge. Review the questions you missed — they are the expensive ones.' : 'Time to brush up. The gaps in your knowledge are where contractors can overcharge you.'}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>How ProLnk helps with what you do not know yet:</div>
              <div style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.6 }}>Every ProLnk technician is vetted, reviewed, and matched to your specific DFW HVAC situation. No guessing. No upsells. Just a qualified pro who shows up with the right tools and knowledge — so you can skip the quiz next time.</div>
            </div>
            <button onClick={() => { setAnswers(Array(questions.length).fill(null)); setSubmitted(false); }}
              style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 13, marginRight: 12 }}>Retake Quiz</button>
            <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Find a DFW Pro via ProLnk →</button>
          </div>
        )}
      </div>
    </div>
  );
}
