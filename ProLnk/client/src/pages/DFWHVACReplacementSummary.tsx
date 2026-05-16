import { useState } from 'react';

const factors = [
  { id: 'age', label: '📅 System Age', question: 'How old is your HVAC system?', options: ['Under 8 years', '8–12 years', '13–15 years', '15+ years'], scores: [0, 1, 2, 3] },
  { id: 'repair', label: '🔧 Recent Repair Cost', question: 'Cost of most recent repair (or quoted repair)', options: ['Under $500', '$500–$1,000', '$1,000–$2,000', 'Over $2,000'], scores: [0, 1, 2, 3] },
  { id: 'bills', label: '💡 Utility Bills', question: 'Summer electricity bill trend', options: ['Normal / stable', 'Slightly higher', 'Noticeably higher', 'Dramatically higher'], scores: [0, 1, 2, 3] },
  { id: 'comfort', label: '🌡️ DFW Comfort Level', question: 'Home comfort during DFW summer peak (105°F+)', options: ['Stays cool easily', 'Occasionally struggles', 'Frequently struggles', 'Cannot keep up'], scores: [0, 1, 2, 3] },
  { id: 'repairs', label: '🔁 Repair Frequency', question: 'How often has it needed repair in last 2 years?', options: ['Never', 'Once', 'Twice', 'Three or more times'], scores: [0, 1, 2, 3] },
];

const timingAdvice = [
  { month: 'Jan–Feb', advice: '✅ Best time to buy — off-season discounts 15–25%, full installer availability', color: '#4CAF50' },
  { month: 'Mar–Apr', advice: '⚠️ Book early — DFW spring rush begins, prices rising', color: '#FFB347' },
  { month: 'May–Jun', advice: '❌ Peak demand — limited scheduling, no discounts, emergency installs', color: '#FF6B6B' },
  { month: 'Jul–Aug', advice: '❌ Worst time — full emergency mode, installers booked weeks out', color: '#FF6B6B' },
  { month: 'Sep–Oct', advice: '✅ Second best — summer rush over, good deals, available crews', color: '#4CAF50' },
  { month: 'Nov–Dec', advice: '✅ Good time — off-season pricing, plan for spring delivery if needed', color: '#4CAF50' },
];

export default function DFWHVACReplacementSummary() {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const answered = Object.keys(answers).length;
  const allAnswered = answered === factors.length;

  let verdict = '';
  let verdictColor = '#8899AA';
  if (allAnswered) {
    if (totalScore <= 3) { verdict = '✅ REPAIR — Your system has life left. Repair is cost-effective.'; verdictColor = '#4CAF50'; }
    else if (totalScore <= 7) { verdict = '⚠️ BORDERLINE — Apply the $5,000 Rule: Age × Repair Cost. If over $5K, replace.'; verdictColor = '#FFB347'; }
    else { verdict = '❌ REPLACE — Multiple failure indicators. Replacement will save you money within 2–3 years.'; verdictColor = '#FF6B6B'; }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🔄</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW HVAC Replacement Decision</h1>
          <p style={{ color: '#8899AA', fontSize: '1rem' }}>The complete framework: $5,000 Rule + DFW climate factor + optimal timing</p>
        </div>

        <div style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem' }}>📐 The $5,000 DFW Rule</h3>
          <p style={{ color: '#AAB8C2', fontSize: '0.9rem', margin: 0 }}>Multiply your system's <strong style={{color:'#fff'}}>age (years)</strong> × <strong style={{color:'#fff'}}>repair cost ($)</strong>. If over <strong style={{color:'#F5E642'}}>$5,000</strong>, replace. DFW climate accelerates wear — use $4,500 if your system struggles in heat.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {factors.map(f => (
            <div key={f.id} style={{ background: '#0D1F35', border: `1px solid ${answers[f.id] !== undefined ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '1rem' }}>
              <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 0.5rem' }}>{f.label}: {f.question}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {f.options.map((opt, i) => (
                  <button key={opt} onClick={() => setAnswers(prev => ({ ...prev, [f.id]: f.scores[i] }))} style={{ padding: '0.4rem 0.8rem', borderRadius: 8, border: `2px solid ${answers[f.id] === f.scores[i] ? '#F5E642' : '#1E3A5F'}`, background: answers[f.id] === f.scores[i] ? '#F5E642' : 'transparent', color: answers[f.id] === f.scores[i] ? '#0A1628' : '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: answers[f.id] === f.scores[i] ? 700 : 400 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <div style={{ background: '#0D1F35', border: `2px solid ${verdictColor}`, borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <p style={{ color: verdictColor, fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>{verdict}</p>
            <p style={{ color: '#8899AA', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>Score: {totalScore}/15 — {totalScore <= 3 ? 'Low urgency' : totalScore <= 7 ? 'Monitor closely' : 'High urgency'}</p>
          </div>
        )}

        <div style={{ background: '#0D1F35', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 0.75rem' }}>📆 Best Time to Replace in DFW</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {timingAdvice.map(t => (
              <div key={t.month} style={{ display: 'flex', gap: '1rem', padding: '0.5rem', borderRadius: 8, background: '#0A1628' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 80, fontSize: '0.85rem' }}>{t.month}</span>
                <span style={{ color: t.color, fontSize: '0.85rem' }}>{t.advice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
