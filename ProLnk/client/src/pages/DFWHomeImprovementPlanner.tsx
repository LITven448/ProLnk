import { useState } from 'react';

const issues = ['HVAC aging', 'Roof wear', 'Plumbing leaks', 'Electrical outdated', 'Foundation settling', 'Poor insulation', 'Windows drafty', 'Pest damage'];
const goals = ['Comfort', 'Safety', 'Value boost', 'Sale prep'];
const budgets = ['$5K–$15K', '$15K–$40K', '$40K–$100K', '$100K+'];
const timelines = ['1–3 months', '3–6 months', '6–12 months', '1–2 years'];

const planData: Record<string, { cost: string; seq: number; note: string }> = {
  'HVAC aging': { cost: '$8,000–$14,000', seq: 1, note: 'DFW summers demand reliable cooling — highest ROI fix' },
  'Roof wear': { cost: '$12,000–$22,000', seq: 2, note: 'Protects everything below; insurance rate impact' },
  'Plumbing leaks': { cost: '$2,000–$8,000', seq: 3, note: 'Stop water damage before it compounds' },
  'Electrical outdated': { cost: '$4,000–$12,000', seq: 4, note: 'Safety first; required for most permits' },
  'Foundation settling': { cost: '$5,000–$25,000', seq: 5, note: 'DFW clay soil moves — address early' },
  'Poor insulation': { cost: '$3,000–$7,000', seq: 6, note: 'Cuts energy bills 20–30% in DFW heat' },
  'Windows drafty': { cost: '$6,000–$18,000', seq: 7, note: 'Comfort + energy efficiency gain' },
  'Pest damage': { cost: '$1,500–$6,000', seq: 8, note: 'Structural integrity and sale disclosure risk' },
};

export default function DFWHomeImprovementPlanner() {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  };

  const plan = selectedIssues
    .map(i => ({ issue: i, ...planData[i] }))
    .sort((a, b) => a.seq - b.seq);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME IMPROVEMENT</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Improvement Planner</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Select your issues and goals — get a prioritized plan built for DFW.</p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏠 Home Issues</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {issues.map(i => (
              <button key={i} onClick={() => toggle(selectedIssues, setSelectedIssues, i)}
                style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${selectedIssues.includes(i) ? '#F5E642' : '#1E3A5F'}`, background: selectedIssues.includes(i) ? '#F5E642' : 'transparent', color: selectedIssues.includes(i) ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {i}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🎯 Goals</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {goals.map(g => (
              <button key={g} onClick={() => toggle(selectedGoals, setSelectedGoals, g)}
                style={{ padding: '8px 14px', borderRadius: 8, border: `1.5px solid ${selectedGoals.includes(g) ? '#F5E642' : '#1E3A5F'}`, background: selectedGoals.includes(g) ? '#F5E642' : 'transparent', color: selectedGoals.includes(g) ? '#0A1628' : '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>💰 Budget Range</div>
            <select value={budget} onChange={e => setBudget(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontSize: 14 }}>
              <option value=''>Select budget</option>
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>📅 Timeline</div>
            <select value={timeline} onChange={e => setTimeline(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontSize: 14 }}>
              <option value=''>Select timeline</option>
              {timelines.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <button onClick={() => setShowPlan(selectedIssues.length > 0)}
          style={{ width: '100%', padding: '14px', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 28 }}>
          Generate My Improvement Plan →
        </button>

        {showPlan && plan.length > 0 && (
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📋 Your Prioritized Plan</div>
            {plan.map((item, idx) => (
              <div key={item.issue} style={{ background: '#0F2240', borderRadius: 10, padding: '16px', marginBottom: 12, borderLeft: '3px solid #F5E642' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700 }}>#{idx + 1} — {item.issue}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700 }}>{item.cost}</span>
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
