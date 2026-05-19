import { useState } from 'react';

const questions = [
  { q: 'What is a cap rate and how is it calculated?', options: ['No idea', 'Vaguely familiar', 'Net income / property value', 'Know it and use it for deal screening'], answer: 3 },
  { q: 'How much liquid cash reserve do you have set aside for investment properties?', options: ['None', 'Under $10K', '$10K-$50K', '$50K+'], answer: 3 },
  { q: 'What is your risk tolerance for real estate investment?', options: ['Minimal risk only', 'Conservative', 'Moderate', 'Aggressive — growth focused'], answer: 3 },
  { q: 'How familiar are you with DFW submarkets (Frisco vs South Dallas vs Mesquite)?', options: ['No knowledge', 'Know major cities', 'Understand price differences', 'Know which submarkets are appreciating'], answer: 3 },
  { q: 'What DFW investment strategy interests you most?', options: ['No strategy yet', 'Buy and hold rentals', 'Fix and flip', 'Short-term rental / Airbnb or BRRRR'], answer: 3 },
  { q: 'Do you understand DSCR loans vs conventional for investment properties?', options: ['No', 'Heard of DSCR', 'Basic understanding', 'Have used or actively researching DSCR'], answer: 3 },
  { q: 'What is your target cash-on-cash return for a DFW rental?', options: ['No target yet', 'Anything positive', '4-6%', '7%+ or I pass'], answer: 3 },
  { q: 'How do DFW property taxes affect investment underwriting?', options: ['Haven\’t thought about it', 'They\’re high, reduces returns', 'Factor them into NOI', 'Model them at 2%+ and stress test'], answer: 3 },
  { q: 'How familiar are you with the DFW short-term rental regulatory landscape?', options: ['No knowledge', 'Heard some cities restrict it', 'Know which cities allow/restrict', 'Know HOA, city rules, and occupancy tax requirements'], answer: 3 },
  { q: 'Do you have a property management plan for DFW rentals?', options: ['None', 'Self-manage plan', 'PM company shortlist', 'Active PM relationship with local market data'], answer: 3 },
  { q: 'How has DFW population growth affected real estate demand?', options: ['Don\’t track it', 'Know DFW is growing', 'Know in-migration patterns', 'Track employment hubs, migration sources, and new development corridors'], answer: 3 },
  { q: 'What is your timeline to close on your first (or next) DFW investment property?', options: ['No timeline', '12-24 months', '6-12 months', 'Under 6 months — actively shopping'], answer: 3 },
];

const strategyMatch = (score: number) => {
  if (score >= 10) return { strategy: '🏗️ BRRRR or Short-Term Rental Portfolio', label: 'Advanced Investor', desc: 'Your knowledge and reserves support an aggressive strategy. Target appreciation corridors in Frisco, McKinney, and Denton.' };
  if (score >= 7) return { strategy: '🏠 Buy-and-Hold Rental Portfolio', label: 'Intermediate Investor', desc: 'Focus on cash-flowing single-family homes in Mesquite, Garland, or Grand Prairie for 7%+ CoC returns.' };
  if (score >= 4) return { strategy: '📚 Fix and Learn', label: 'Early Stage', desc: 'Partner with an experienced investor or wholesaler on one deal before going solo. Build your underwriting skills.' };
  return { strategy: '🔍 Study First, Invest Later', label: 'Pre-Investor', desc: 'Read DFW-specific investing content, join a local REI meetup, and return when you have $50K in reserves.' };
};

export default function DFWHomeInvestmentQuiz() {
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
  const match = strategyMatch(score);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem' }}>📈</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0 0′ }}>DFW Real Estate Investor Quiz</h1>
          <p style={{ color: '#94a3b8', marginTop: '.5rem' }}>12 questions to assess your DFW investment readiness and strategy fit</p>
        </div>

        {!done ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Q{current + 1} of {questions.length}</span>
              <span style={{ color: '#94a3b8′ }}>{answers.filter(Boolean).length} correct</span>
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
                {current + 1 < questions.length ? 'Next →' : 'See My Strategy'}
              </button>
            )}
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>🎯</div>
            <h2 style={{ color: '#F5E642', fontSize: '1.4rem' }}>Your Investment Strategy Match</h2>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F5E642', margin: '1rem 0′ }}>{pct}%</div>
            <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{score} of {questions.length} aligned</p>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', textAlign: 'left' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '.5rem' }}>{match.strategy}</div>
              <div style={{ background: '#1e3a5f', display: 'inline-block', borderRadius: 6, padding: '.25rem .75rem', fontSize: '.85rem', color: '#F5E642', marginBottom: '1rem' }}>{match.label}</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{match.desc}</p>
            </div>
            <button onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setDone(false); }} style={{ marginTop: '1.5rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Retake Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
}
