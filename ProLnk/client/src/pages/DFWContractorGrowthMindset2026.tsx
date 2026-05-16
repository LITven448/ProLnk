import { useState } from 'react';

const stages = [
  {
    id: 'solo',
    label: '🔨 Solo Operator',
    description: 'You do everything — sales, work, invoicing. Capped at ~$120K/yr. The goal: systemize so you can hire.',
    moves: [
      'Stop quoting by phone — use digital estimates only',
      'Track every job in a spreadsheet (or ProLnk)',
      'Identify your 3 most profitable services — cut the rest',
      'Build a simple follow-up system for past customers',
      'Join ProLnk now — leads come to you instead of hustle',
    ],
    income: '$40K–$120K/yr',
    nextStage: 'First hire: field tech or admin'
  },
  {
    id: 'small',
    label: '👷 Small Team (2–5)',
    description: 'You have crew but still selling. Revenue plateaus around $400K. The goal: remove yourself from production.',
    moves: [
      'Promote best tech to lead — pay them for it',
      'Set minimum job size — fire unprofitable customers',
      'Build a referral system — 1 in 10 customers should refer',
      'ProLnk network income: recruit 3 pros = passive income',
      'Invest in company vehicle branding — rolling billboard',
    ],
    income: '$150K–$400K/yr',
    nextStage: 'Hire sales / office manager'
  },
  {
    id: 'growth',
    label: '📈 Growth Phase (6–15)',
    description: 'Revenue $500K–$2M. You are the business. The goal: build systems that run without you daily.',
    moves: [
      'Implement job management software (ServiceTitan, etc.)',
      'Create training docs for every role',
      'Hire a dedicated salesperson — track close rate',
      'ProLnk 5-stream income: subscription + matching + override cascade',
      'Explore commercial contracts for predictable revenue',
    ],
    income: '$400K–$2M/yr',
    nextStage: 'Franchise model or regional expansion'
  },
  {
    id: 'scale',
    label: '🏢 Scaling (15+)',
    description: 'You have managers. Revenue $2M+. The goal: build an asset, not just a job. Think exit or legacy.',
    moves: [
      'Document everything — buyers pay for systems',
      'ProLnk Level 4 override: your network earns you passive monthly',
      'Hire a GM — step back from operations',
      'Build Home Health Vault origination rights — permanent income stream',
      'Explore acquisition of smaller competitors in DFW',
    ],
    income: '$2M–$10M+/yr',
    nextStage: 'Exit, franchise, or DFW market ownership'
  },
];

export default function DFWContractorGrowthMindset2026() {
  const [stage, setStage] = useState('solo');
  const s = stages.find(x => x.id === stage)!;
  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚀 DFW Contractor Growth Mindset Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Select your current stage — get the exact moves to level up in DFW's booming home services market.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {stages.map(st => (
            <button key={st.id} onClick={() => setStage(st.id)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: stage === st.id ? '#F5E642' : '#1e2d45', color: stage === st.id ? '#0A1628' : '#94a3b8' }}>
              {st.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{s.label}</h2>
            <span style={{ background: '#1e2d45', color: '#F5E642', fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>{s.income}</span>
          </div>
          <p style={{ color: '#cbd5e1', marginBottom: 20, lineHeight: 1.6 }}>{s.description}</p>
          <h3 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>⚡ Level-Up Moves</h3>
          {s.moves.map((m, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < s.moves.length - 1 ? '1px solid #1e2d45' : 'none', color: '#e2e8f0', fontSize: 14 }}>
              → {m}
            </div>
          ))}
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#0A1628', borderRadius: 10 }}>
            <span style={{ color: '#64748b', fontSize: 13 }}>Next milestone: </span>
            <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{s.nextStage}</span>
          </div>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', color: '#0A1628' }}>
          <strong>💰 ProLnk 5-stream income compounds at every stage.</strong> The sooner you join, the bigger the override network you build.
        </div>
      </div>
    </div>
  );
}