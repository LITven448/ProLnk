import { useState } from 'react';

const questions = [
  { q: 'What does SEER stand for and what does it measure?', options: ['System Efficiency Energy Rating', 'Seasonal Energy Efficiency Ratio', 'Summer Energy Exchange Rate', 'Standard Equipment Efficiency Ranking'], answer: 1 },
  { q: 'What minimum SEER rating is recommended for DFW climate?', options: ['10 SEER', '13-14 SEER', '16+ SEER', 'SEER doesn\’t matter in DFW'], answer: 2 },
  { q: 'How often should you change a 1-inch HVAC filter in DFW?', options: ['Every 6 months', 'Every 3-4 months', 'Every 1-3 months', 'Once a year'], answer: 2 },
  { q: 'What is the recommended thermostat setting for DFW summer when away from home?', options: ['68°F', '72°F', '78-80°F', '85°F'], answer: 2 },
  { q: 'A sign your DFW AC is low on refrigerant is:', options: ['Higher electricity bills', 'Ice on refrigerant lines or the evaporator coil', 'Loud clicking noise', 'Yellow flame on furnace'], answer: 1 },
  { q: 'How often should a DFW homeowner have their HVAC professionally serviced?', options: ['Once every 5 years', 'Annually', 'Twice a year (spring and fall)', 'Only when it breaks'], answer: 2 },
  { q: 'What is the purpose of the condensate drain line on a DFW AC system?', options: ['Releases refrigerant', 'Drains humidity removed from indoor air', 'Circulates freon', 'Cools the compressor'], answer: 1 },
  { q: 'In DFW, what outdoor temperature makes it too cold to run your AC efficiently?', options: ['Below 80°F', 'Below 65°F', 'Below 55°F', 'Below 40°F'], answer: 2 },
  { q: 'What filter MERV rating balances filtration and airflow for most DFW HVAC systems?', options: ['MERV 1-4', 'MERV 8-11', 'MERV 14-16', 'MERV 20+'], answer: 1 },
  { q: 'A burning smell from your DFW HVAC system typically indicates:', options: ['Normal first-run dust burn-off or a serious wiring issue', 'Refrigerant leak', 'Thermostat battery dying', 'Duct cleaning is needed'], answer: 0 },
  { q: 'What is the average lifespan of a DFW air conditioning unit running at peak load?', options: ['5-8 years', '10-12 years', '15-20 years', '25+ years'], answer: 1 },
  { q: 'If your DFW AC is running constantly but not cooling, the first thing to check is:', options: ['Call an HVAC company immediately', 'Check/replace the air filter and verify thermostat settings', 'Add refrigerant yourself', 'Replace the compressor'], answer: 1 },
  { q: 'What DFW-specific issue causes HVAC drain lines to clog frequently?', options: ['Hard water deposits', 'Algae growth in humid indoor air', 'Dust and pollen buildup', 'Refrigerant crystallization'], answer: 1 },
  { q: 'A two-stage or variable-speed AC compressor is beneficial in DFW because:', options: ['It\’s cheaper upfront', 'It runs longer at lower capacity, better humidity control', 'It uses more power efficiently', 'It doesn\’t require filters'], answer: 1 },
  { q: 'When should you consider replacing vs repairing your DFW HVAC system?', options: ['Any repair over $500', 'Repair cost exceeds 50% of new unit cost or system is 10+ years old', 'After the first breakdown', 'Only when it stops completely'], answer: 1 },
];

const learningResources = [
  'SEER ratings guide — why DFW needs 16+ for ROI',
  'Seasonal maintenance checklist — spring AC prep, fall furnace check',
  'Filter selection guide — MERV 8-11 sweet spot for DFW',
  'Condensate drain maintenance — monthly flush with bleach',
  'When to repair vs replace — the 5,000 rule explained',
];

export default function DFWHVACKnowledgeQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const handleSelect = (i: number) => { if (selected === null) setSelected(i); };

  const handleNext = () => {
    const correct = selected === questions[current].answer;
    const next = [...answers, correct];
    setAnswers(next);
    setSelected(null);
    if (current + 1 < questions.length) { setCurrent(current + 1); } else { setDone(true); }
  };

  const score = answers.filter(Boolean).length;
  const pct = Math.round((score / questions.length) * 100);
  const grade = pct >= 80 ? '🏆 HVAC Expert' : pct >= 60 ? '🔧 Solid Homeowner Knowledge' : pct >= 40 ? '📚 Learning in Progress' : '🚨 Knowledge Gaps — Act Before Summer';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0 0' }}>DFW HVAC Knowledge Quiz</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>15 questions every DFW homeowner should know before the summer heat hits</p>
        </div>

        {!done ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Q{current + 1} of {questions.length}</span>
              <span style={{ color: '#94a3b8' }}>{answers.filter(Boolean).length} correct</span>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 6, height: 6, marginBottom: '1.5rem' }}>
              <div style={{ background: '#F5E642', height: 6, borderRadius: 6, width: `${(current / questions.length) * 100}%`, transition: 'width .3s' }} />
            </div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{questions[current].q}</p>
            {questions[current].options.map((opt, i) => {
              let bg = '#0A1628';
              if (selected !== null) {
                if (i === questions[current].answer) bg = '#15803d';
                else if (i === selected) bg = '#991b1b';
              }
              return (
                <button key={i} onClick={() => handleSelect(i)} style={{ display: 'block', width: '100%', textAlign: 'left', background: bg, color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '.75rem 1rem', marginBottom: '.5rem', cursor: selected === null ? 'pointer' : 'default', fontSize: '.95rem' }}>
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}
            {selected !== null && (
              <button onClick={handleNext} style={{ marginTop: '1rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                {current + 1 < questions.length ? 'Next Question →' : 'See My Score'}
              </button>
            )}
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>{grade.split(' ')[0]}</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.3rem' }}>{grade.slice(2)}</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F5E642', margin: '1rem 0' }}>{pct}%</div>
            <p style={{ color: '#94a3b8' }}>{score} of {questions.length} correct</p>
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>📚 Recommended Learning:</p>
              {learningResources.map((r, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '.6rem 1rem', marginBottom: '.5rem', color: '#cbd5e1', fontSize: '.9rem' }}>
                  🔧 {r}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'left' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.25rem' }}>💡 DFW Summer Tip</p>
              <p style={{ color: '#cbd5e1', fontSize: '.9rem', margin: 0 }}>Schedule your AC tune-up before May 1. Wait times hit 2-3 weeks in peak summer — get ahead of the queue.</p>
            </div>
            <button onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setDone(false); }} style={{ marginTop: '1.5rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
