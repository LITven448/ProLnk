import { useState } from 'react';

const questions = [
  { q: 'How often should you change your HVAC air filter in DFW?', options: ['Every 6-12 months', 'Every 1-3 months', 'Once a year', 'Only when visibly dirty'], answer: 1 },
  { q: 'DFW clay soil expands and contracts. How often should you water your foundation?', options: ['Never — rain is enough', 'Only in summer', 'Year-round, consistently', 'Only when you see cracks'], answer: 2 },
  { q: 'What is the deadline to protest your DFW property tax appraisal?', options: ['March 31', 'May 31', 'June 30', 'April 15'], answer: 1 },
  { q: 'Which of these is a DIY task vs calling a pro?', options: ['Replacing a breaker', 'Patching drywall', 'Gas line repair', 'Roof structural repair'], answer: 1 },
  { q: 'How often should gutters be cleaned in DFW?', options: ['Every 5 years', 'Twice a year', 'Monthly', 'Only after storms'], answer: 1 },
  { q: 'DFW summer heat: what thermostat setting saves money while home?', options: ['68°F', '72°F', '76-78°F', '82°F'], answer: 2 },
  { q: 'How often should DFW homeowners have their HVAC serviced?', options: ['Every 5 years', 'Once a year', 'Twice a year', 'Only when it breaks'], answer: 2 },
  { q: 'What sign indicates a foundation issue in DFW?', options: ['Doors sticking or gaps', 'Peeling paint', 'High water bill', 'Slow drains'], answer: 0 },
  { q: 'How long should you run a new GFCI outlet test cycle?', options: ['You cannot test them', 'Monthly', 'Annually', 'They are self-testing'], answer: 1 },
  { q: 'When should you flush your water heater in DFW?', options: ['Never', 'Every 1-2 years', 'Every 10 years', 'Only when it makes noise'], answer: 1 },
  { q: 'DFW plumbing: what is the best freeze protection for pipes?', options: ['Turn off main', 'Let faucets drip and open cabinets', 'Wrap only outdoor spigots', 'Nothing needed in DFW'], answer: 1 },
  { q: 'How often should smoke detector batteries be replaced?', options: ['Every 5 years', 'Annually', 'Every 10 years', 'Only when chirping'], answer: 1 },
  { q: 'Which DFW pest is a major structural threat to homes?', options: ['Fire ants', 'Mosquitoes', 'Termites', 'Roaches'], answer: 2 },
  { q: 'How often should DFW homeowners have their roof inspected?', options: ['Every 10 years', 'Annually or after major hail', 'Only at resale', 'Every 5 years'], answer: 1 },
  { q: 'What is the top cause of homeowner insurance claims in DFW?', options: ['Foundation damage', 'Fire', 'Hail and wind damage', 'Flooding'], answer: 2 },
];

const resources = ['HVAC maintenance schedule', 'Foundation watering guide', 'Property tax protest process', 'Seasonal home checklist'];

export default function DFWHomeMaintenanceQuiz() {
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

  const grade = pct >= 80 ? '🏆 Expert DFW Homeowner' : pct >= 60 ? '📚 Solid Foundation' : pct >= 40 ? '🔧 Room to Grow' : '🚨 Knowledge Gaps Found';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: 0 }}>DFW Home Maintenance Quiz</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>15 questions every DFW homeowner should be able to answer</p>
        </div>

        {!done ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Q{current + 1} of {questions.length}</span>
              <span style={{ color: '#94a3b8' }}>{answers.filter(Boolean).length} correct so far</span>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 6, height: 6, marginBottom: '1.5rem' }}>
              <div style={{ background: '#F5E642', height: 6, borderRadius: 6, width: `${((current) / questions.length) * 100}%`, transition: 'width .3s' }} />
            </div>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{questions[current].q}</p>
            {questions[current].options.map((opt, i) => {
              let bg = '#0A1628';
              if (selected !== null) {
                if (i === questions[current].answer) bg = '#15803d';
                else if (i === selected) bg = '#991b1b';
              } else if (selected === i) bg = '#1e3a5f';
              return (
                <button key={i} onClick={() => handleSelect(i)} style={{ display: 'block', width: '100%', textAlign: 'left', background: bg, color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '.75rem 1rem', marginBottom: '.5rem', cursor: selected === null ? 'pointer' : 'default', fontSize: '.95rem' }}>
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              );
            })}
            {selected !== null && (
              <button onClick={handleNext} style={{ marginTop: '1rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                {current + 1 < questions.length ? 'Next Question →' : 'See My Results'}
              </button>
            )}
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{grade.split(' ')[0]}</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.4rem' }}>{grade.slice(2)}</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F5E642', margin: '1rem 0' }}>{pct}%</div>
            <p style={{ color: '#94a3b8' }}>{score} of {questions.length} correct</p>
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>📋 Recommended Resources:</p>
              {resources.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '.6rem 1rem', marginBottom: '.5rem', color: '#cbd5e1' }}>📌 {r}</div>)}
            </div>
            <button onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setDone(false); }} style={{ marginTop: '1.5rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
