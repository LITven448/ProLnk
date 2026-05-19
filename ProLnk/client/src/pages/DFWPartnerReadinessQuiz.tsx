import { useState } from 'react';

const questions = [
  { q: 'How large is your existing professional or community network?', options: ['Mostly friends and family', '50-100 contacts', '100-300 contacts', '300+ active contacts'], answer: 3 },
  { q: 'Do you work in or around the home services industry?', options: ['No connection at all', 'Occasional exposure', 'Adjacent industry', 'Active pro or in industry daily'], answer: 3 },
  { q: 'How many hours per week can you dedicate to ProLnk partner activity?', options: ['Under 2 hours', '2-5 hours', '5-10 hours', '10+ hours'], answer: 3 },
  { q: 'What is your primary income motivation for joining ProLnk?', options: ['Occasional side money', 'Consistent side income', 'Replace part-time income', 'Replace full-time income'], answer: 3 },
  { q: 'How comfortable are you explaining the ProLnk model to others?', options: ['Not comfortable', 'If someone asks', 'Can give a brief pitch', 'Confident, can recruit and explain all streams'], answer: 3 },
  { q: 'Do you understand the difference between Charter and Founding partner tiers?', options: ['No', 'Heard of them', 'Basic understanding', 'Yes, can explain benefits of each'], answer: 3 },
  { q: 'How experienced are you with referral or commission-based income?', options: ['No experience', 'One referral program', 'Multiple programs', 'Experienced, consistent earner'], answer: 3 },
  { q: 'How motivated are you by residual income (earning while you sleep)?', options: ['Not a priority', 'Nice to have', 'Very interested', 'This is my primary goal'], answer: 3 },
  { q: 'Can you commit to at least 12 months of consistent partner activity?', options: ['No, looking short-term', 'Maybe 3-6 months', '6-12 months', 'Yes, 12+ months'], answer: 3 },
  { q: 'Do you know homeowners or contractors in DFW who need connections?', options: ['No', '1-2 people', '5-10 people', '10+ people you could contact this week'], answer: 3 },
  { q: 'How familiar are you with ProLnk\’s 5-stream income model?', options: ['Never heard of it', 'Read the overview', 'Understand the basics', 'Understand all 5 streams in detail'], answer: 3 },
  { q: 'What describes your natural personality?', options: ['Introvert, prefer solo work', 'Analytical, data-focused', 'Occasional networker', 'Natural connector, love making introductions'], answer: 3 },
];

const streamMatch = (score: number) => {
  if (score >= 10) return { stream: '💰 All 5 Income Streams', tier: 'Charter Partner ($149/mo)', desc: 'You are built for this. Start with Charter tier before waitlist closes at 500.' };
  if (score >= 7) return { stream: '🔗 Direct Commission + Subscription Override', tier: 'Founding Partner', desc: 'Focus on recruiting pros and connecting homeowners. Subscription overrides are your fastest path.' };
  if (score >= 4) return { stream: '🏠 Homeowner Override', tier: 'Start Here', desc: 'Connect homeowners to the platform and earn per-lead fees. Low barrier, build from there.' };
  return { stream: '📚 Learn First', tier: 'Not Yet Ready', desc: 'Study the platform, build your network, revisit in 90 days.' };
};

export default function DFWPartnerReadinessQuiz() {
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
  const match = streamMatch(score);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem' }}>🤝</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0 0' }}>ProLnk Partner Readiness Quiz</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>12 questions to find your income stream fit and best entry tier</p>
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
                {current + 1 < questions.length ? 'Next →' : 'See My Match'}
              </button>
            )}
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>🎯</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.4rem' }}>Your Partner Match</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F5E642', margin: '1rem 0' }}>{pct}%</div>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{score} of {questions.length} aligned</p>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', textAlign: 'left' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '.5rem' }}>{match.stream}</div>
              <div style={{ background: '#1e3a5f', display: 'inline-block', borderRadius: 6, padding: '.25rem .75rem', fontSize: '.85rem', color: '#F5E642', marginBottom: '1rem' }}>{match.tier}</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{match.desc}</p>
            </div>
            <button onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setDone(false); }} style={{ marginTop: '1.5rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
