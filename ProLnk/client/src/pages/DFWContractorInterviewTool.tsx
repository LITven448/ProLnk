import { useState } from 'react';

const trades = ['HVAC', 'Plumber', 'Electrician', 'Roofer', 'Foundation/Structural', 'General Contractor', 'Painter', 'Pest Control'];
const projects: Record<string, string[]> = {
  'HVAC': ['Full system replacement', 'AC tune-up', 'Ductwork repair', 'New installation'],
  'Plumber': ['Water heater replacement', 'Drain clearing', 'Pipe repair', 'Fixture install'],
  'Electrician': ['Panel upgrade', 'Outlet/switch install', 'Whole-home rewire', 'Generator hookup'],
  'Roofer': ['Full replacement', 'Repair/patch', 'Inspection', 'Gutter install'],
  'Foundation/Structural': ['Pier installation', 'Crack repair', 'Drainage correction', 'Inspection'],
  'General Contractor': ['Kitchen remodel', 'Bathroom remodel', 'Addition', 'Renovation'],
  'Painter': ['Interior full paint', 'Exterior paint', 'Cabinet refinishing', 'Accent wall'],
  'Pest Control': ['Termite treatment', 'Rodent exclusion', 'Annual plan', 'One-time treatment'],
};

const questions: Record<string, Array<{ q: string; good: string; red: string }>> = {
  'HVAC': [
    { q: 'Are you licensed and insured in Texas?', good: 'Yes — TACLA license number provided immediately', red: 'Hesitation, cannot provide license number' },
    { q: 'What brand systems do you install/service?', good: 'Names 2–3 brands with supplier relationships', red: 'Only mentions "whatever you want"' },
    { q: 'Do you perform a Manual J load calculation before sizing?', good: 'Yes — explains why sizing matters for DFW humidity', red: '"We just match what you have"' },
    { q: 'What warranty do you provide on parts and labor?', good: '1-year minimum labor, manufacturer warranty on parts', red: 'Vague or no labor warranty' },
    { q: 'How do you handle DFW clay soil effects on outdoor unit pads?', good: 'Mentions pad leveling, concrete pad recommendations', red: 'Unaware of the issue' },
    { q: 'Who will actually perform the work — you or subcontractors?', good: 'Clear answer with tech credentials mentioned', red: '"My guys" with no further detail' },
    { q: 'Can you provide 3 references from similar DFW jobs in the past 90 days?', good: 'Provides contacts readily', red: 'Only older references or none' },
    { q: 'Do you offer financing or payment plans?', good: 'Clear terms, no pressure tactics', red: 'Demands large upfront cash payment' },
    { q: 'What is your typical project timeline for this scope?', good: 'Specific days with realistic milestones', red: '"Depends" with no follow-up detail' },
    { q: 'How do you handle unexpected issues found mid-project?', good: 'Written change order process described', red: '"We just handle it and bill you after"' },
  ],
};

const defaultQs = (trade: string, project: string) => [
  { q: `Are you licensed and insured for ${trade} work in Texas?`, good: 'Provides license number immediately', red: 'Cannot provide license on request' },
  { q: 'Can you provide a detailed written estimate before work starts?', good: 'Line-item breakdown, signed before work begins', red: '"I can tell you a ballpark"' },
  { q: 'Who does the actual work — you or subs?', good: 'Clear answer with credentials', red: 'Vague — "my crew"' },
  { q: `How many ${project} jobs have you done in DFW in the last 6 months?`, good: 'Specific number with references available', red: 'Cannot answer specifically' },
  { q: 'What does your warranty cover for parts and labor?', good: 'Written warranty provided', red: 'Verbal-only or no warranty' },
  { q: 'What permits are required and who pulls them?', good: 'Knows requirements, pulls permits themselves', red: '"You probably don\’t need one"' },
  { q: 'How do you handle unexpected scope changes?', good: 'Written change orders, your approval required', red: '"I\’ll just add it to the final bill"' },
  { q: 'What is your payment schedule?', good: 'Milestone-based, small deposit', red: '50%+ upfront required' },
  { q: 'Can I see proof of liability and workers comp insurance?', good: 'Certificate of insurance sent same day', red: 'Delays or says not required' },
  { q: 'How do you clean up and protect my home during the job?', good: 'Specific protection measures described', red: 'No clear answer' },
];

export default function DFWContractorInterviewTool() {
  const [trade, setTrade] = useState('');
  const [project, setProject] = useState('');
  const [showQs, setShowQs] = useState(false);

  const qs = trade === 'HVAC' ? questions['HVAC'] : project ? defaultQs(trade, project) : [];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW CONTRACTOR HIRING</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Interview Question Generator</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Get 10 tailored interview questions — plus what good answers and red flags look like.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>🔧 Trade Type</div>
            <select value={trade} onChange={e => { setTrade(e.target.value); setProject(''); setShowQs(false); }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontSize: 14 }}>
              <option value=''>Select trade</option>
              {trades.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>🏗️ Project Type</div>
            <select value={project} onChange={e => { setProject(e.target.value); setShowQs(false); }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0F2240', border: '1.5px solid #1E3A5F', color: '#fff', fontSize: 14 }}
              disabled={!trade}>
              <option value=''>Select project</option>
              {(projects[trade] || []).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <button onClick={() => setShowQs(!!trade && !!project)}
          style={{ width: '100%', padding: '14px', borderRadius: 10, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 28 }}>
          Generate Interview Questions →
        </button>

        {showQs && qs.length > 0 && (
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📋 Your 10 Interview Questions — {trade} / {project}</div>
            {qs.map((item, idx) => (
              <div key={idx} style={{ background: '#0F2240', borderRadius: 10, padding: '16px', marginBottom: 14 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Q{idx + 1}: {item.q}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div style={{ background: '#0A3020', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✅ Good Answer</div>
                    <div style={{ color: '#CBD5E1', fontSize: 13 }}>{item.good}</div>
                  </div>
                  <div style={{ background: '#3A0A0A', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ color: '#F87171', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>🚩 Red Flag</div>
                    <div style={{ color: '#CBD5E1', fontSize: 13 }}>{item.red}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
