import { useState } from 'react';

const questions = [
  { q: 'Do you have a current foundation inspection letter from a licensed engineer?', options: ['No', 'Seller disclosure only', 'Inspection done, no letter', 'Yes, letter in hand'], answer: 3 },
  { q: 'What is your home\’s current condition compared to comparable sales?', options: ['Needs major work', 'Dated but functional', 'Updated key areas', 'Move-in ready throughout'], answer: 3 },
  { q: 'Do you have permits for all improvements made to the home?', options: ['No improvements made', 'Done work, no permits', 'Some permitted', 'All work fully permitted'], answer: 3 },
  { q: 'How familiar are you with current DFW market pricing in your zip code?', options: ['No idea', 'Rough estimate', 'Checked Zillow/Redfin', 'Reviewed agent CMA reports'], answer: 3 },
  { q: 'What is your timeline to close?', options: ['Under 30 days', '30-45 days', '45-60 days', 'Flexible, 60+ days'], answer: 3 },
  { q: 'Is your home professionally staged or decluttered for photos?', options: ['No plans', 'Cleaned up', 'Decluttered and painted', 'Professional staging done'], answer: 3 },
  { q: 'Do you have a plan if your home doesn\’t sell in 30 days?', options: ['No', 'Drop price immediately', 'Review strategy with agent', 'Pre-planned price and incentive steps'], answer: 3 },
  { q: 'Are all HVAC systems serviced and documented?', options: ['Unknown status', 'Working but unserviced', 'Recent service, no records', 'Serviced and documented'], answer: 3 },
  { q: 'How will you handle simultaneous buy/sell timing?', options: ['Haven\’t thought about it', 'Bridge loan maybe', 'Sale contingency plan', 'Full plan with agent and lender'], answer: 3 },
  { q: 'Have you completed a pre-listing inspection?', options: ['No — buyers can inspect', 'Planning to', 'Inspected, not addressed', 'Inspected and addressed issues'], answer: 3 },
  { q: 'How do you plan to select a listing agent?', options: ['Family friend', 'Lowest commission', 'Online reviews only', 'Interview 3+ agents with CMA review'], answer: 3 },
  { q: 'Do you understand your net proceeds after fees and mortgage payoff?', options: ['No', 'Rough guess', 'Estimated with online tool', 'Detailed net sheet from agent/title'], answer: 3 },
];

const preListTips = [
  'Order a foundation inspection before listing — it signals confidence.',
  'Pull permits for all improvements — unpermitted work can kill deals.',
  'Get 3 CMAs from local agents before pricing.',
  'Pre-listing inspection finds problems buyers would use to renegotiate.',
  'Professional photography increases showing traffic by 40%+.',
];

export default function DFWSellerReadinessQuiz() {
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
  const grade = pct >= 83 ? '🏆 Ready to List' : pct >= 58 ? '⚠️ Address Key Gaps First' : '🔴 Not Ready — Plan More Prep';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem' }}>🏷️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0 0' }}>DFW Seller Readiness Quiz</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>12 questions every DFW home seller should assess before listing</p>
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
            <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>{grade.split(' ')[0]}</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.3rem' }}>{grade.slice(2)}</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F5E642', margin: '1rem 0' }}>{pct}%</div>
            <p style={{ color: '#94a3b8' }}>{score} of {questions.length} correct</p>
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '.75rem' }}>📋 Pre-Listing Checklist:</p>
              {preListTips.map((tip, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '.6rem 1rem', marginBottom: '.5rem', color: '#cbd5e1', fontSize: '.9rem' }}>
                  ✅ {tip}
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
