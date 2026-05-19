import { useState } from 'react';

const questions = [
  { q: 'What credit score range qualifies for the best mortgage rates?', options: ['600-650', '650-700', '700-740', '740+'], answer: 3 },
  { q: 'How much down payment have you saved for a DFW home?', options: ['Less than 3%', '3-5%', '5-10%', '10-20%+'], answer: 3 },
  { q: 'What is the average property tax rate in DFW counties?', options: ['0.5-1%', '1-1.5%', '1.8-2.5%', '3-4%'], answer: 2 },
  { q: 'How many months of mortgage payments do you have in reserves?', options: ['None', '1 month', '2-3 months', '4-6+ months'], answer: 3 },
  { q: 'What is your current debt-to-income ratio?', options: ['Below 28%', '28-36%', '36-43%', 'Above 43%'], answer: 0 },
  { q: 'DFW foundation risk: what should you require before buying?', options: ['Nothing extra', 'Fresh coat of paint', 'Foundation inspection + engineer letter', 'Seller disclosure only'], answer: 2 },
  { q: 'How long do you plan to stay in the home you buy?', options: ['Less than 2 years', '2-3 years', '3-5 years', '5+ years'], answer: 3 },
  { q: 'Have you gotten pre-approved (not just pre-qualified)?', options: ['No', 'Pre-qualified only', 'Pre-approved with one lender', 'Pre-approved with 2-3 lenders'], answer: 3 },
  { q: 'What is a homestead exemption in DFW?', options: ['A discount for seniors only', 'A property tax reduction for primary residence', 'An insurance discount', 'A city rebate program'], answer: 1 },
  { q: 'When should you schedule a home inspection?', options: ['After closing', 'During the option period', 'Before making an offer', 'Only for older homes'], answer: 1 },
  { q: 'DFW home prices: what is a realistic budget cushion above your max?', options: ['None — stick to max', '5-10% above max', '10-15% search above max', 'As high as you can go'], answer: 1 },
  { q: 'Do you understand total monthly cost beyond mortgage (taxes, HOA, insurance)?', options: ['No — just the mortgage', 'Somewhat', 'Yes, rough estimate', 'Yes, detailed breakdown'], answer: 3 },
];

const actionPlan: Record<string, string> = {
  'Credit': 'Get a free credit report, dispute errors, pay down revolving balances below 30%.',
  'Down Payment': 'Open a high-yield savings account dedicated to your down payment goal.',
  'Property Tax': 'Use DCAD.org to research tax history on any home before offering.',
  'Reserves': 'Build 3-6 months of emergency savings before buying.',
};

export default function DFWBuyerReadinessQuiz() {
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
  const readiness = pct >= 83 ? '✅ Ready to Buy' : pct >= 58 ? '⚠️ Almost Ready' : '🔴 Build Your Foundation First';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem' }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0 0' }}>DFW Buyer Readiness Quiz</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>12 questions to assess your homebuying readiness in DFW</p>
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
                {current + 1 < questions.length ? 'Next →' : 'See Results'}
              </button>
            )}
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>{readiness.split(' ')[0]}</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.4rem' }}>{readiness.slice(2)}</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F5E642', margin: '1rem 0' }}>{pct}%</div>
            <p style={{ color: '#94a3b8' }}>{score} of {questions.length} correct</p>
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>📋 Action Plan:</p>
              {Object.entries(actionPlan).map(([k, v]) => (
                <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: '.75rem 1rem', marginBottom: '.5rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.25rem' }}>{k}</div>
                  <div style={{ color: '#cbd5e1', fontSize: '.9rem' }}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setDone(false); }} style={{ marginTop: '1.5rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
