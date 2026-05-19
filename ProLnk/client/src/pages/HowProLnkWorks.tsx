import { useState } from 'react';

const steps = [
  { emoji: '📋', title: 'Post Your Need', time: '2 min', desc: 'Describe the job: trade type, what’s broken or needed, your address, and when you need it done. No account required to start.' },
  { emoji: '🤖', title: 'Get Matched', time: '< 2 hrs', desc: 'Our AI scans verified pros in your zip code, checks their ratings, availability, and specialization, and finds your best match.' },
  { emoji: '📊', title: 'Compare Pros', time: '5 min', desc: 'Review your matched pro’s profile — license info, reviews, response rate, and average job price. No obligation to move forward.' },
  { emoji: '🤝', title: 'Hire & Pay', time: 'Your timeline', desc: 'Contact the pro directly, agree on price and scope, then hire. You pay the pro, not ProLnk. We only facilitate the match.' },
];

const quizQuestions = [
  {
    question: 'What type of service do you need?',
    options: ['Plumbing', 'HVAC / Heating & Cooling', 'Electrical', 'Roofing', 'Other'],
  },
  {
    question: 'How urgent is this?',
    options: ['Emergency — today', 'This week', 'Within a month', 'Planning ahead'],
  },
  {
    question: 'Do you own or rent your home?',
    options: ['Own', 'Rent (landlord approval needed)', 'Rent (I handle repairs)'],
  },
  {
    question: 'Have you hired a contractor in the last 12 months?',
    options: ['Yes, through a platform like Angi', 'Yes, word of mouth', 'No — first time'],
  },
  {
    question: 'What matters most to you?',
    options: ['Speed of response', 'Lowest price', 'Verified reviews & trust', 'All of the above'],
  },
];

const outcomes: Record<string, string> = {
  emergency: '🚨 We\’ll match you to an on-call pro in your area within 30 minutes. Emergency jobs are prioritized in our system.',
  thisWeek: '📅 You\’ll have a matched pro reaching out within 2 hours. Most jobs are scheduled same-week.',
  planning: '🗓️ Perfect timing — get matched now, review the pro\’s profile, and schedule when you\’re ready. No rush.',
  default: '✅ Great news — ProLnk is built for exactly your situation. Post your need and we\’ll match you with the right pro for the job.',
};

export default function HowProLnkWorks() {
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const getOutcome = () => {
    const urgency = answers[1] || '';
    if (urgency.includes('Emergency')) return outcomes.emergency;
    if (urgency.includes('week')) return outcomes.thisWeek;
    if (urgency.includes('month') || urgency.includes('Planning')) return outcomes.planning;
    return outcomes.default;
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <div style={{ background: '#f8f9fc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e8edf5', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#0A1628', fontWeight: 700, letterSpacing: 2, marginBottom: 14, textTransform: 'uppercase', background: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 6 }}>For Homeowners</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, margin: '16px 0', color: '#0A1628', lineHeight: 1.1 }}>How ProLnk Works</h1>
          <p style={{ fontSize: 19, color: '#555', lineHeight: 1.7 }}>
            From posting your need to hiring a trusted pro — the whole process takes less than a day. Here's exactly what happens.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', marginBottom: 40, color: '#0A1628′ }}>4 Simple Steps</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', position: 'relative', paddingBottom: i < steps.length - 1 ? 0 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: 64, height: 64, background: '#0A1628', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, zIndex: 1 }}>
                    {step.emoji}
                  </div>
                  {i < steps.length - 1 && <div style={{ width: 2, height: 40, background: '#dde3ed', margin: '4px 0′ }} />}
                </div>
                <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', flex: 1, marginBottom: i < steps.length - 1 ? 0 : 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{step.title}</h3>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0A1628', background: '#F5E642', padding: '4px 10px', borderRadius: 20 }}>⏱ {step.time}</span>
                  </div>
                  <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', borderRadius: 16, padding: 40, marginBottom: 60, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: '#0A1628', textAlign: 'center' }}>⚡ Response Time Benchmarks</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 28, fontSize: 15 }}>Based on real ProLnk match data across all service categories</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, textAlign: 'center' }}>
            {[
              { label: 'First Match', value: '< 2 hrs', sub: 'average' },
              { label: 'Pro Response', value: '< 4 hrs', sub: 'to contact you' },
              { label: 'Job Booked', value: '< 24 hrs', sub: 'from post to schedule' },
              { label: 'Satisfaction', value: '94%', sub: 'homeowner rating' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: 20, background: '#f8f9fc', borderRadius: 10 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#0A1628′ }}>{stat.value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#333', marginTop: 4 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#fff', borderRadius: 16, padding: 40, marginBottom: 60, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: '#0A1628', textAlign: 'center' }}>🎯 Homeowner Journey Quiz</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: 32, fontSize: 15 }}>Answer 5 quick questions — we'll tell you exactly what to expect next.</p>

          {!showResult ? (
            <div>
              <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                {quizQuestions.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= quizStep ? '#0A1628′ : '#e0e6f0' }} />
                ))}
              </div>
              <p style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>Question {quizStep + 1} of {quizQuestions.length}</p>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#0A1628′ }}>{quizQuestions[quizStep].question}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {quizQuestions[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    style={{ width: '100%', textAlign: 'left', padding: '14px 20px', background: '#f8f9fc', border: '2px solid #e0e6f0', borderRadius: 10, cursor: 'pointer', fontSize: 15, fontWeight: 500, transition: 'all 0.15s' }}
                    onMouseOver={e => { (e.target as HTMLElement).style.borderColor = '#0A1628'; (e.target as HTMLElement).style.background = '#eef0f8'; }}
                    onMouseOut={e => { (e.target as HTMLElement).style.borderColor = '#e0e6f0'; (e.target as HTMLElement).style.background = '#f8f9fc'; }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: '#0A1628′ }}>Here’s What Happens Next</h3>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: '#444', maxWidth: 480, margin: '0 auto 28px' }}>{getOutcome()}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Post My Need Now</button>
                <button onClick={resetQuiz} style={{ background: '#f8f9fc', color: '#0A1628', border: '2px solid #0A1628', borderRadius: 8, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Retake Quiz</button>
              </div>
            </div>
          )}
        </section>

        <section style={{ background: '#0A1628', borderRadius: 16, padding: 36, color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Zero Cost to Homeowners</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 12 }}>ProLnk is always free for homeowners</h2>
          <p style={{ color: '#a0aec0', fontSize: 15, lineHeight: 1.7, maxWidth: 480, margin: '0 auto 24px' }}>
            No subscription. No lead fees. No hidden charges. You pay only the pro you hire, at the price you agree on.
          </p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Get Matched Free →</button>
        </section>
      </div>
    </div>
  );
}
