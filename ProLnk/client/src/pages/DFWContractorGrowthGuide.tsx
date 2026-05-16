import { useState } from 'react';

const growthStages = [
  {
    stage: 1, label: 'Solo Operator', revenue: '$0–$120K', crew: '0', overhead: '15–20%',
    description: 'You do all the work. High margins, low scale. Focus on reputation and consistent lead flow.',
    fieldWork: '100%', milestones: ['5-star avg rating', '15+ repeat clients', 'Full pipeline via ProLnk', '$100K annual revenue'],
    prolnkIncome: '$6,000–$18,000/yr in commissions at Tier 2',
  },
  {
    stage: 2, label: 'Solo + Helper', revenue: '$120K–$250K', crew: '1', overhead: '25–32%',
    description: 'Part-time or full-time helper lets you bid more and take bigger jobs. First hire is the hardest.',
    fieldWork: '80%', milestones: ['Hire reliable W-2 helper', '$180K+ revenue', 'Job costing system in place', 'Separate business checking'],
    prolnkIncome: '$15,000–$35,000/yr in commissions at Tier 3',
  },
  {
    stage: 3, label: 'Small Team (2–4 crew)', revenue: '$250K–$650K', crew: '2-4', overhead: '35–42%',
    description: 'You may still run jobs but administrative work is growing. First office hire or bookkeeper here.',
    fieldWork: '50–60%', milestones: ['Dedicated estimator/PM', 'Fleet management system', '$450K+ revenue', 'ProLnk Tier 4 unlocked'],
    prolnkIncome: '$30,000–$80,000/yr in commissions + network overrides',
  },
  {
    stage: 4, label: 'Multi-Crew (5–12)', revenue: '$650K–$2M', crew: '5-12', overhead: '42–50%',
    description: 'Operations run without you in the field. Profitability depends on job costing and overhead discipline.',
    fieldWork: '10–20%', milestones: ['Operations manager hired', 'Dispatch system live', '$1M+ revenue', 'Monthly financial review cadence'],
    prolnkIncome: '$70,000–$200,000/yr combined streams',
  },
  {
    stage: 5, label: 'Regional Operator', revenue: '$2M+', crew: '12+', overhead: '45–55%',
    description: 'You are a CEO. Focus is capital allocation, key hires, and market expansion. Lead gen at scale.',
    fieldWork: '0–5%', milestones: ['Full management team', 'Multi-location presence', '$2M+ sustained', 'Board or advisory group'],
    prolnkIncome: '$200,000+/yr all 5 income streams active',
  },
];

export default function DFWContractorGrowthGuide() {
  const [revenue, setRevenue] = useState('');
  const [crew, setCrew] = useState('');
  const [result, setResult] = useState<null | typeof growthStages[0]>(null);

  function assess() {
    const rev = parseInt(revenue) || 0;
    const crewSize = parseInt(crew) || 0;
    let stage = growthStages[0];
    if (rev >= 2000000 || crewSize >= 12) stage = growthStages[4];
    else if (rev >= 650000 || crewSize >= 5) stage = growthStages[3];
    else if (rev >= 250000 || crewSize >= 2) stage = growthStages[2];
    else if (rev >= 120000 || crewSize >= 1) stage = growthStages[1];
    setResult(stage);
  }

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#1e40af', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK CONTRACTOR GUIDES — DFW GROWTH</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.1, color: '#0A1628' }}>Growing Your DFW Home Service Business</h1>
        <p style={{ color: '#475569', fontSize: 16, margin: '0 0 40px' }}>5 stages from solo to regional. Know exactly when to hire, when to stop field work, and what ProLnk income looks like at every level.</p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📊 5 Stages of Business Growth</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {growthStages.map((s) => (
              <div key={s.stage} style={{ background: '#fff', borderRadius: 12, padding: '20px 22px', border: '2px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
                  <div>
                    <span style={{ background: '#0A1628', color: '#F5E642', fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, marginRight: 8 }}>STAGE {s.stage}</span>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{s.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#1e40af', fontWeight: 700, fontSize: 15 }}>{s.revenue}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{s.crew} employees</div>
                  </div>
                </div>
                <p style={{ color: '#475569', fontSize: 13, margin: '0 0 12px' }}>{s.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 2 }}>YOU IN THE FIELD</div>
                    <div style={{ fontWeight: 700, color: '#0A1628' }}>{s.fieldWork}</div>
                  </div>
                  <div style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 12px' }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 2 }}>OVERHEAD</div>
                    <div style={{ fontWeight: 700, color: '#0A1628' }}>{s.overhead}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>KEY MILESTONES</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.milestones.map((m, i) => (
                      <span key={i} style={{ background: '#eff6ff', color: '#1e40af', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>{m}</span>
                    ))}
                  </div>
                </div>
                <div style={{ background: '#fefce8', borderRadius: 8, padding: '10px 12px', border: '1px solid #fde68a' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#92400e' }}>💰 ProLnk Income Potential: </span>
                  <span style={{ fontSize: 12, color: '#78350f' }}>{s.prolnkIncome}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: '#0A1628', borderRadius: 14, padding: 28, border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>📍 Find Your Growth Stage</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Annual revenue (last 12 months, $)</label>
              <input type="number" value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="e.g. 320000"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#131f35', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current crew size (full-time employees, not including you)</label>
              <input type="number" value={crew} onChange={e => setCrew(e.target.value)} placeholder="e.g. 2"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#131f35', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', width: '100%' }}>
            Show My Growth Stage + ProLnk Potential →
          </button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#131f35', borderRadius: 10, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 8 }}>You're at Stage {result.stage}: {result.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>{result.description}</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>NEXT MILESTONES</div>
                {result.milestones.map((m, i) => <div key={i} style={{ color: '#e2e8f0', fontSize: 13, marginBottom: 4 }}>→ {m}</div>)}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginTop: 12, border: '1px solid #F5E642' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>💰 Your ProLnk Income Potential</div>
                <div style={{ color: '#fbbf24', fontSize: 13, marginTop: 4 }}>{result.prolnkIncome}</div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
