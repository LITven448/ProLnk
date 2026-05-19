import { useState } from 'react';

const questions = [
  { q: 'How old is your roof?', options: ['Under 5 years', '5–10 years', '10–20 years', '20+ years'], weights: [0, 1, 2, 4] },
  { q: 'Any visible cracks in your foundation or basement walls?', options: ['None', 'Hairline only', 'Some wider cracks', 'Yes, significant'], weights: [0, 1, 3, 5] },
  { q: 'How old is your HVAC system?', options: ['Under 5 years', '5–10 years', '10–15 years', '15+ years'], weights: [0, 1, 2, 4] },
  { q: 'Any water stains on ceilings or walls?', options: ['None', 'Old/dried', 'Active/recent', 'Multiple areas'], weights: [0, 1, 3, 5] },
  { q: 'How would you rate exterior paint/siding condition?', options: ['Excellent', 'Good', 'Fair', 'Poor'], weights: [0, 1, 2, 4] },
  { q: 'Any moisture or mold smell in basement/crawlspace?', options: ['Never', 'Occasionally', 'Seasonally', 'Frequently'], weights: [0, 1, 2, 4] },
  { q: 'How old are your windows?', options: ['Under 10 years', '10–20 years', '20–30 years', '30+ years'], weights: [0, 1, 2, 3] },
  { q: 'Any plumbing issues in the last 2 years?', options: ['None', 'Minor/fixed', 'Ongoing minor', 'Major issues'], weights: [0, 1, 2, 4] },
];

const recommendations: Record<string, string[]> = {
  excellent: ['Annual maintenance scan', 'Gutter cleaning check', 'HVAC filter verification'],
  good: ['Roof condition scan', 'Foundation moisture check', 'Window seal audit'],
  fair: ['Comprehensive exterior scan', 'Moisture intrusion assessment', 'HVAC efficiency review'],
  poor: ['Full property health scan (urgent)', 'Structural foundation review', 'Moisture & mold assessment'],
};

export default function TrustyProForHomeowners() {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const answered = answers.filter(a => a !== -1).length;
  const totalScore = answers.reduce((sum, a, i) => sum + (a === -1 ? 0 : questions[i].weights[a]), 0);
  const maxScore = questions.reduce((sum, q) => sum + Math.max(...q.weights), 0);
  const healthPct = submitted ? Math.max(0, Math.round(100 - (totalScore / maxScore) * 100)) : null;

  const tier = healthPct === null ? null : healthPct >= 85 ? 'excellent' : healthPct >= 65 ? 'good' : healthPct >= 40 ? 'fair' : 'poor';
  const tierLabel = tier === 'excellent' ? '🟢 Excellent' : tier === 'good' ? '🟡 Good' : tier === 'fair' ? '🟠 Fair' : '🔴 Needs Attention';

  return (
    <div style={{ background: '#050d1a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ background: '#4F46E5', display: 'inline-block', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>FOR HOMEOWNERS</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>Know Before<br /><span style={{ color: '#4F46E5' }}>You Hire</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 580, margin: '0 auto' }}>Get a full property health report — the same data your contractor sees — before you ever pick up the phone. Free forever.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 80 }}>
          {[
            { icon: '🔍', title: 'See What Pros See', desc: 'Know exactly what condition your roof, foundation, HVAC, and more are in — before any contractor tells you.' },
            { icon: '💪', title: 'Negotiate from Knowledge', desc: 'Walk into every estimate with a verified property report. No more wondering if you\’re being oversold.' },
            { icon: '🆓', title: '100% Free Forever', desc: 'TrustyPro\’s homeowner health reports are free. We make money when pros win jobs — not from you.' },
            { icon: '🔒', title: 'Your Data Stays Yours', desc: 'You control who sees your scan data. Share with a contractor, keep it private, or delete it anytime.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{b.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 20, padding: 40, border: '1px solid #1e3a5f', marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>Home Health Quiz</h2>
          <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 40, fontSize: 15 }}>Answer 8 quick questions → get your estimated health score + top 3 recommended assessments</p>

          {!submitted ? (
            <>
              {questions.map((q, qi) => (
                <div key={qi} style={{ marginBottom: 32 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 14, color: '#e2e8f0' }}>{qi + 1}. {q.q}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
                    {q.options.map((opt, oi) => (
                      <button key={oi} onClick={() => { const next = [...answers]; next[qi] = oi; setAnswers(next); }} style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${answers[qi] === oi ? '#4F46E5' : '#1e3a5f'}`, background: answers[qi] === oi ? '#1e1b4b' : 'transparent', color: answers[qi] === oi ? '#fff' : '#94a3b8', fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ textAlign: 'center' }}>
                <button onClick={() => answered === questions.length && setSubmitted(true)} style={{ background: answered === questions.length ? '#4F46E5' : '#1e3a5f', color: answered === questions.length ? '#fff' : '#64748b', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 17, fontWeight: 700, cursor: answered === questions.length ? 'pointer' : 'not-allowed' }}>
                  {answered < questions.length ? `Answer all questions (${answered}/${questions.length})` : 'Get My Health Score →'}
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 80, fontWeight: 900, color: '#FACC15', marginBottom: 8 }}>{healthPct}</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Home Health Score</div>
              <div style={{ fontSize: 22, marginBottom: 32 }}>{tierLabel}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#a5b4fc' }}>Top 3 Recommended Assessments</h3>
              {tier && recommendations[tier].map((r, i) => (
                <div key={i} style={{ background: '#050d1a', borderRadius: 10, padding: '14px 20px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, maxWidth: 480, margin: '0 auto 10px' }}>
                  <span style={{ color: '#4F46E5', fontSize: 20 }}>▸</span>
                  <span style={{ fontSize: 15, color: '#e2e8f0' }}>{r}</span>
                </div>
              ))}
              <button onClick={() => { setAnswers(Array(questions.length).fill(-1)); setSubmitted(false); }} style={{ marginTop: 28, background: 'transparent', border: '1px solid #1e3a5f', color: '#94a3b8', borderRadius: 8, padding: '10px 24px', fontSize: 14, cursor: 'pointer' }}>Retake Quiz</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Ready for your real health report?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 16 }}>Join the homeowner waitlist. TrustyPro launches in DFW first.</p>
          <button style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>Join Homeowner Waitlist</button>
        </div>

      </div>
    </div>
  );
}
