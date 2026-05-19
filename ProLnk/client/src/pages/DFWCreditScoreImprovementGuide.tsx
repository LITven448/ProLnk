import { useState } from 'react';

const actions = [
  { label: 'Pay down credit card to <30% utilization', points: 40, detail: 'Utilization is 30% of your score — fastest lever you have.' },
  { label: 'Dispute errors on credit report', points: 20, detail: 'Pull free reports at AnnualCreditReport.com. Errors affect 1 in 5 reports.' },
  { label: 'Medical debt removed (2024 CFPB rule)', points: 15, detail: 'As of 2024, medical debt no longer appears on credit reports per CFPB ruling.' },
  { label: 'Keep oldest accounts open', points: 10, detail: 'Length of credit history is 15% of your score.' },
  { label: 'Become authorized user on family account', points: 20, detail: 'Piggyback on a trusted family member long-standing account.' },
  { label: 'Add 1 new credit account (if none)', points: 10, detail: 'Credit mix matters. A secured card or credit-builder loan helps.' },
  { label: 'Make all payments on time for 12 months', points: 30, detail: 'Payment history is 35% of your score — the single biggest factor.' },
];

export default function DFWCreditScoreImprovementGuide() {
  const [score, setScore] = useState(580);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (i: number) => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const totalPoints = selected.reduce((sum, i) => sum + actions[i].points, 0);
  const projected = Math.min(850, score + totalPoints);

  const tier = projected >= 740 ? { label: 'Excellent', color: '#22c55e' }
    : projected >= 700 ? { label: 'Good', color: '#84cc16′ }
    : projected >= 660 ? { label: 'Fair', color: '#eab308′ }
    : { label: 'Needs Work', color: '#ef4444′ };

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📊 DFW Credit Score Improvement Guide</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>12-month roadmap from 580 to 700+ for DFW homebuyers. Includes the 2024 CFPB medical debt ruling.</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🎯 Your Starting Point</h2>
          <label style={{ fontWeight: 600 }}>Current Credit Score: <span style={{ color: '#F5E642', background: '#0A1628', padding: '2px 10px', borderRadius: 6 }}>{score}</span></label>
          <input type="range" min={500} max={800} value={score} onChange={e => setScore(+e.target.value)} style={{ width: '100%', margin: '1rem 0', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 13 }}>
            <span>500 (Poor)</span><span>620 (Fair)</span><span>700 (Good)</span><span>800 (Excellent)</span>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>✅ Select Actions You Can Take</h2>
          {actions.map((a, i) => (
            <div key={i} onClick={() => toggle(i)} style={{
              border: `2px solid ${selected.includes(i) ? '#F5E642' : '#e2e8f0'}`,
              borderRadius: 10, padding: '1rem', marginBottom: 10, cursor: 'pointer',
              background: selected.includes(i) ? '#fefce8′ : '#fff', transition: ’all 0.2s'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{a.label}</span>
                <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: 20, padding: '2px 12px', fontSize: 13, fontWeight: 700 }}>+{a.points} pts</span>
              </div>
              {selected.includes(i) && <p style={{ margin: '8px 0 0', color: '#475569', fontSize: 14 }}>{a.detail}</p>}
            </div>
          ))}
        </div>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
          <h2 style={{ marginTop: 0, color: '#F5E642′ }}>📈 Your Projected Score</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 800 }}>{projected}</div>
              <div style={{ color: tier.color, fontWeight: 700, fontSize: 18 }}>{tier.label}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, color: '#F5E642', fontWeight: 700 }}>+{totalPoints} points</div>
              <div style={{ color: '#94a3b8′ }}>from {selected.length} action{selected.length !== 1 ? ’s' : ''}</div>
            </div>
          </div>
          {projected >= 700
            ? <div style={{ background: '#166534', borderRadius: 8, padding: '1rem', color: '#bbf7d0′ }}>✅ At 700+ you qualify for conventional loans with competitive DFW rates.</div>
            : <div style={{ background: '#7c2d12', borderRadius: 8, padding: '1rem', color: '#fed7aa' }}>📌 Select more actions above to reach 700+. Focus on utilization first.</div>
          }
        </div>
      </div>
    </div>
  );
}
