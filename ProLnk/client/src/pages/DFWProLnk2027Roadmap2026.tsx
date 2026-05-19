import { useState } from 'react';

const milestones = [
  { id: 'predict', icon: '🔮', title: 'Predictive Maintenance AI', desc: 'ProLnk AI knows your system needs service before you do — alerts before failure', eta: 'Q1 2027' },
  { id: 'video', icon: '📸', title: 'Video Assessment', desc: 'Photo or video in → instant diagnosis and matched pro — no inspection needed', eta: 'Q2 2027' },
  { id: 'insurance', icon: '📋', title: 'Insurance Integration', desc: 'File a claim and get a matched contractor in the same step — one workflow', eta: 'Q3 2027' },
  { id: 'houston', icon: '🌆', title: 'Houston Market Launch', desc: 'DFW playbook replicated into Houston — second major Texas market', eta: 'Q2 2027' },
  { id: 'arr', icon: '💰', title: '$10M ARR Milestone', desc: '10,000 active pros across Texas — platform hits sustainability threshold', eta: 'Q4 2027' },
  { id: 'network', icon: '🤝', title: '10,000 Pro Network', desc: 'From 500 Charter pros at launch to 10K verified pros across all trades', eta: 'Q4 2027' },
];

const stakeholders = [
  { label: 'Homeowner', match: ['predict', 'video', 'insurance'] },
  { label: 'Pro / Contractor', match: ['network', 'arr', 'houston'] },
  { label: 'Investor', match: ['arr', 'houston', 'network', 'predict'] },
  { label: 'Charter Pro', match: ['network', 'predict', 'arr'] },
];

export default function DFWProLnk2027Roadmap2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<typeof milestones | null>(null);

  function handleStakeholder(s: typeof stakeholders[0]) {
    setSelected(s.label);
    setResult(milestones.filter(m => s.match.includes(m.id)));
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>🗺️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0 0 .5rem' }}>ProLnk 2027 Roadmap for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>What ProLnk delivers by 2027 — predictive AI, video assessment, insurance integration, and Texas expansion.</p>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '1rem' }}>Who are you?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginBottom: '2rem' }}>
          {stakeholders.map(s => (
            <button key={s.label} onClick={() => handleStakeholder(s)}
              style={{ background: selected === s.label ? '#F5E642' : '#1e3a5f', color: selected === s.label ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '.6rem 1.1rem', cursor: 'pointer', fontWeight: 600 }}>
              {s.label}
            </button>
          ))}
        </div>

        {result && (
          <div>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your 2027 ProLnk Roadmap</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {result.map(m => (
                <div key={m.id} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
                  <div style={{ fontSize: '1.5rem' }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, marginTop: '.4rem' }}>{m.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '.9rem', marginTop: '.3rem' }}>{m.desc}</div>
                  <div style={{ color: '#F5E642', fontSize: '.8rem', marginTop: '.5rem' }}>Target: {m.eta}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {milestones.map(m => (
              <div key={m.id} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{m.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '.85rem' }}>{m.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: '#F5E642', fontSize: '.8rem', whiteSpace: 'nowrap' }}>{m.eta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}