import { useState } from 'react';

const categories = [
  { key: 'safety', label: 'Safety & Comfort', color: '#F5E642', desc: 'Non-negotiable foundations' },
  { key: 'value', label: 'Value Building', color: '#4ECDC4', desc: 'Strategic improvements' },
  { key: 'financial', label: 'Financial Asset', color: '#A78BFA', desc: 'Equity, tax, income' },
];

const stages = ['First-Time Buyer', 'Growing Family', 'Long-Term Owner', 'Pre-Sale Prep'];
const goals = ['Safety First', 'Build Equity', 'Generate Income', 'Sell in 1-3 Years', 'Age in Place'];

const recs: Record<string, Record<string, string[]>> = {
  'First-Time Buyer': {
    'Safety First': ['Smoke/CO detectors ($150)', 'GFCI outlets ($300)', 'Security locks ($200)'],
    'Build Equity': ['Kitchen refresh ($8K-15K)', 'Bathroom update ($5K-10K)', 'Landscaping ($3K-6K)'],
    'Generate Income': ['ADU feasibility study ($500)', 'ProLnk origination rights (free)', 'Home Health Vault enrollment'],
    'Sell in 1-3 Years': ['Focus on safety + curb appeal first', 'Skip major structural work'],
    'Age in Place': ['Plan for grab bars, wide doors early', 'Single-story priority'],
  },
  'Growing Family': {
    'Safety First': ['Pool fence ($3K-6K)', 'Stair gates, window guards', 'Whole-home air quality ($2K)'],
    'Build Equity': ['Extra bedroom addition ($40K-80K)', 'Second bathroom ($15K-25K)'],
    'Generate Income': ['Enroll in ProLnk vault for origination rights', 'Refer neighbors for network income'],
    'Sell in 1-3 Years': ['Stage for family buyers — schools, safety'],
    'Age in Place': ['Flexible floorplan design', 'Multi-gen suite planning'],
  },
  'Long-Term Owner': {
    'Safety First': ['Whole-home rewire ($8K-15K)', 'HVAC air quality upgrade ($4K)', 'Roof inspection ($500)'],
    'Build Equity': ['Major kitchen remodel ($25K-60K)', 'Primary suite upgrade ($20K-40K)'],
    'Generate Income': ['Maximize origination rights network', 'Refer 5+ pros for network override income'],
    'Sell in 1-3 Years': ['Pre-sale inspection ($400)', 'Targeted updates per agent recs'],
    'Age in Place': ['Walk-in shower, step-free entry', 'Smart home automation'],
  },
  'Pre-Sale Prep': {
    'Safety First': ['Fix all code violations first', 'Fresh smoke detectors required'],
    'Build Equity': ['Paint interior/exterior ($5K-12K)', 'Stage home ($2K-5K)', 'Deep clean + declutter'],
    'Generate Income': ['Lock in origination rights before transfer', 'ProLnk farewell package for buyer'],
    'Sell in 1-3 Years': ['Focus entirely here — maximize return', 'Avoid over-improving'],
    'Age in Place': ['N/A — selling soon'],
  },
};

const catMap: Record<string, string> = {
  'Safety First': 'safety', 'Build Equity': 'value', 'Generate Income': 'financial',
  'Sell in 1-3 Years': 'value', 'Age in Place': 'safety',
};

export default function DFWHomeInvestmentFramework() {
  const [stage, setStage] = useState('');
  const [goal, setGoal] = useState('');

  const stageRecs = stage && goal ? (recs[stage]?.[goal] ?? []) : [];
  const activeCat = goal ? catMap[goal] : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Home Investment Framework</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Every dollar you spend on your DFW home falls into one of three categories. Know which before you spend it.</p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <div key={c.key} style={{ flex: 1, minWidth: 160, background: '#111d30', borderRadius: 10, padding: '1rem', borderTop: `3px solid ${c.color}`, opacity: activeCat === c.key || !activeCat ? 1 : 0.4, transition: 'opacity 0.3s' }}>
              <div style={{ color: c.color, fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Your homeowner stage</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {stages.map(s => (
              <button key={s} onClick={() => setStage(s)} style={{ background: stage === s ? '#F5E642′ : '#111d30', color: stage === s ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: 600 }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Primary goal</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {goals.map(g => (
              <button key={g} onClick={() => setGoal(g)} style={{ background: goal === g ? '#F5E642′ : '#111d30', color: goal === g ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem 1rem', cursor: ’pointer', fontWeight: 600 }}>{g}</button>
            ))}
          </div>
        </div>

        {stageRecs.length > 0 && (
          <div style={{ background: '#111d30', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>📋 Your Framework: {stage} + {goal}</div>
            {stageRecs.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>
                <span style={{ color: '#F5E642′ }}>→</span> {r}
              </div>
            ))}
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1e3a5f', color: '#64748b', fontSize: 12 }}>Category: <span style={{ color: categories.find(c => c.key === activeCat)?.color }}>{categories.find(c => c.key === activeCat)?.label}</span></div>
          </div>
        )}
        {!stage && <div style={{ color: '#334155', textAlign: 'center', marginTop: 40 }}>Select your stage and goal to get your personalized framework</div>}
      </div>
    </div>
  );
}
