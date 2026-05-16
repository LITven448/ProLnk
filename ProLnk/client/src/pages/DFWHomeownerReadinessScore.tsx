import { useState } from 'react';

const categories = [
  { id: 'financial', label: '💰 Financial Readiness', questions: [
    { q: 'Do you have 3-6 months of housing costs in emergency savings?', weight: 10 },
    { q: 'Is your credit score above 700?', weight: 8 },
    { q: 'Is your housing cost below 30% of gross income?', weight: 7 },
  ]},
  { id: 'knowledge', label: '🏠 Home Knowledge', questions: [
    { q: 'Do you know your foundation type and DFW clay-soil risks?', weight: 8 },
    { q: 'Do you have a seasonal maintenance schedule (spring/fall DFW)?', weight: 7 },
  ]},
  { id: 'legal', label: '📋 Legal Readiness', questions: [
    { q: 'Is your homeowner insurance current and hail-rated?', weight: 8 },
    { q: 'Do you have a will or estate plan including your home?', weight: 7 },
  ]},
  { id: 'prolnk', label: '🔗 ProLnk Readiness', questions: [
    { q: 'Do you have at least 2 trusted contractors you can refer?', weight: 8 },
    { q: 'Do you know 5+ DFW homeowners who need reliable service pros?', weight: 7 },
    { q: 'Are you ready to earn origination rights by adding homes to the Vault?', weight: 10 },
  ]},
];

export default function DFWHomeownerReadinessScore() {
  const [answers, setAnswers] = useState<Record<string, Record<number, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalWeight = categories.flatMap(c => c.questions).reduce((s, q) => s + q.weight, 0);
  const score = Math.round(
    categories.flatMap(c => c.questions.map((q, qi) => answers[c.id]?.[qi] ? q.weight : 0))
      .reduce((s, v) => s + v, 0) / totalWeight * 100
  );
  const gaps = categories
    .flatMap(c => c.questions.map((q, qi) => ({ label: q.q, answered: !!answers[c.id]?.[qi], weight: q.weight })))
    .filter(g => !g.answered).sort((a, b) => b.weight - a.weight).slice(0, 3);
  const allQs = categories.flatMap(c => c.questions);
  const answered = categories.flatMap(c => c.questions.map((_, qi) => answers[c.id]?.[qi])).filter(v => v !== undefined).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>📊</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Homeowner Readiness Score</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>10-question assessment — get your 0-100 readiness score</p>
        </div>
        {categories.map(cat => (
          <div key={cat.id} style={{ background: '#111d30', borderRadius: 16, padding: 24, marginBottom: 20, border: '1px solid #1e3a5f' }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{cat.label}</div>
            {cat.questions.map((q, qi) => (
              <label key={qi} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14, cursor: 'pointer' }}>
                <input type="checkbox" checked={!!answers[cat.id]?.[qi]}
                  onChange={e => setAnswers(prev => ({ ...prev, [cat.id]: { ...prev[cat.id], [qi]: e.target.checked } }))}
                  style={{ marginTop: 3, accentColor: '#F5E642', width: 18, height: 18 }} />
                <span style={{ color: '#cbd5e1', fontSize: 15 }}>{q.q} <span style={{ color: '#F5E642', fontSize: 12 }}>+{q.weight}pts</span></span>
              </label>
            ))}
          </div>
        ))}
        <button onClick={() => setSubmitted(true)} disabled={answered < allQs.length}
          style={{ width: '100%', padding: '16px', background: answered === allQs.length ? '#F5E642' : '#1e3a5f', color: answered === allQs.length ? '#0A1628' : '#64748b', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 18, cursor: answered === allQs.length ? 'pointer' : 'not-allowed', marginBottom: 28 }}>
          {answered < allQs.length ? `Answer all ${allQs.length} questions (${answered}/${allQs.length})` : 'Calculate My Score →'}
        </button>
        {submitted && (
          <div style={{ background: '#111d30', borderRadius: 20, padding: 32, border: '2px solid #F5E642', textAlign: 'center' }}>
            <div style={{ fontSize: 72, fontWeight: 900, color: '#F5E642' }}>{score}</div>
            <div style={{ fontSize: 20, marginBottom: 24, color: '#cbd5e1' }}>/ 100 Readiness Score</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🎯 Top 3 Gaps to Fill:</div>
              {gaps.map((g, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 10, padding: '12px 16px', marginBottom: 10, color: '#94a3b8', fontSize: 14 }}>{i+1}. {g.label}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
