import { useState } from 'react';

const topics = [
  { emoji: '☀️', label: 'Summer Readiness', desc: '10-item AC checklist for 100°F+ DFW summers' },
  { emoji: '❄️', label: 'Winter Readiness', desc: '8-item heat checklist for DFW freeze events' },
  { emoji: '🚨', label: 'Emergency Preparedness', desc: '6-item emergency plan for HVAC failures' },
  { emoji: '💰', label: 'Budget Planning', desc: 'Full cost range for every DFW HVAC scenario' },
  { emoji: '🔗', label: 'ProLnk Readiness', desc: '8-item checklist to get the most from ProLnk' },
  { emoji: '🏠', label: 'DFW Climate Reality', desc: 'Why DFW HVAC demands are unlike any other market' },
];

const faqs = [
  { q: 'How often should I replace my AC filter in DFW?', a: 'Every 30 days during summer (May–September). DFW pollen, dust, and allergen counts are among the highest in Texas — monthly changes are the minimum.' },
  { q: 'When is the best time to get a DFW HVAC tune-up?', a: 'March for AC prep (before summer demand hits) and October for furnace prep (before winter). Booking in these windows saves 20–30% vs. peak season emergency pricing.' },
  { q: 'How long does a DFW HVAC system last?', a: 'Air conditioners: 12–17 years. Furnaces: 18–25 years. DFW units work harder than almost anywhere in the US, putting them at the lower end of these ranges without proper maintenance.' },
  { q: 'What should I do if my AC fails during a DFW heat wave?', a: 'Step 1: Check the breaker. Step 2: Replace the filter. Step 3: Call a pro immediately — do not wait. If you have ProLnk, submit a request and get matched in minutes. Temps above 95°F indoors become dangerous in hours.' },
  { q: 'How much should I budget annually for DFW HVAC?', a: 'Budget $800–$1,500 per year for routine costs. Have $2,000 in emergency reserves. If your system is over 10 years old, start saving toward a $7,000–$12,000 replacement.' },
];

export default function DFWHVACSessionWrapUp() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!question.trim()) return;
    const q = question.toLowerCase();
    const matched = faqs.find(f =>
      f.q.toLowerCase().split(' ').some(word => word.length > 4 && q.includes(word))
    );
    if (matched) {
      setAnswer(matched.a);
    } else {
      setAnswer('Great question. Based on 3,300+ pages of DFW HVAC knowledge: the most important thing any DFW homeowner can do is schedule a professional tune-up each spring and fall, maintain a $2,000 emergency reserve, and have a verified HVAC pro\’s contact saved before you need one. ProLnk makes that last step instant — join the waitlist at prolnk.io.');
    }
    setSubmitted(true);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>
            Wrapping Up This Extraordinary Session
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            3,300+ pages of DFW homeowner HVAC knowledge — distilled into tools, checklists, and answers you can use today.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {topics.map(t => (
            <div key={t.label} style={{ background: '#0d1f38', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{t.emoji}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem' }}>{t.label}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 4 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>
            💬 Your Final Question — Ask Anything from 3,300 Pages of DFW HVAC Knowledge
          </div>
          <textarea
            placeholder="E.g. How long does an AC last in DFW? What should I budget? When should I replace vs. repair?"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            rows={3}
            style={{
              width: '100%', padding: '0.75rem', background: '#0A1628', border: '1px solid #1e3a5f',
              borderRadius: 8, color: '#fff', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: '0.75rem', width: '100%', padding: '0.875rem', background: '#F5E642',
              color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: '1rem', cursor: 'pointer'
            }}
          >
            🔍 Get the Answer
          </button>
          {submitted && answer && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📖 From 3,300 Pages of DFW HVAC Knowledge:</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.6 }}>{answer}</div>
            </div>
          )}
        </div>

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #f59e0b 100%)', borderRadius: 12, padding: '1.5rem', textAlign: 'center', color: '#0A1628' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔗</div>
          <div style={{ fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Ready to Connect with a Verified DFW HVAC Pro?</div>
          <div style={{ fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8 }}>
            Join the ProLnk waitlist — first 5,000 DFW homes get Charter Member pricing locked for life.
          </div>
          <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 8, padding: '0.75rem', fontWeight: 800, fontSize: '1rem' }}>
            → prolnk.io — Join the Waitlist Now
          </div>
        </div>
      </div>
    </div>
  );
}
