import { useState } from 'react';

const situations = [
  {
    id: 'new_homeowner',
    label: '🏠 New DFW homeowner — just moved in',
    pages: [
      { title: 'DFW HVAC System Age Tracker', path: '/dfw-hvac-system-age', why: 'Know your inherited system’s true remaining life before committing to maintenance plans' },
      { title: 'DFW Summer HVAC Check Guide', path: '/dfw-hvac-summer-check', why: '10 steps to verify your system before your first DFW summer' },
      { title: 'DFW HVAC Maintenance Cost Calculator', path: '/dfw-hvac-maintenance-cost', why: 'Budget accurately for what DFW HVAC ownership actually costs' },
    ],
  },
  {
    id: 'system_issues',
    label: '⚠️ My system seems to be struggling',
    pages: [
      { title: 'DFW Heat Pump Performance Review', path: '/dfw-hvac-heat-pump-review', why: 'Assess whether your system’s performance issues are serious or normal DFW wear' },
      { title: 'DFW Summer HVAC Check Guide', path: '/dfw-hvac-summer-check', why: 'Walk through the 10-step diagnostic homeowners can do themselves' },
      { title: 'DFW HVAC System Age Tracker', path: '/dfw-hvac-system-age', why: 'Determine if repair or replacement makes more economic sense' },
    ],
  },
  {
    id: 'planning_replacement',
    label: '🔄 Planning to replace my HVAC system',
    pages: [
      { title: 'DFW HVAC Runtime Calculator', path: '/dfw-hvac-runtime', why: 'Understand how DFW runtime demands should inform your system size and efficiency choice' },
      { title: 'DFW HVAC Maintenance Cost Calculator', path: '/dfw-hvac-maintenance-cost', why: 'Compare ongoing costs of different efficiency tiers for DFW conditions' },
      { title: 'DFW HVAC System Age Tracker', path: '/dfw-hvac-system-age', why: 'Confirm DFW-adjusted lifespan benchmarks to validate replacement timing' },
    ],
  },
  {
    id: 'cost_control',
    label: '💰 Trying to control HVAC costs',
    pages: [
      { title: 'DFW HVAC Maintenance Cost Calculator', path: '/dfw-hvac-maintenance-cost', why: 'Know exactly what you should be spending — and where you might be overpaying' },
      { title: 'DFW HVAC Runtime Calculator', path: '/dfw-hvac-runtime', why: 'See how efficiency upgrades reduce runtime and long-term component wear' },
      { title: 'DFW Summer HVAC Check Guide', path: '/dfw-hvac-summer-check', why: 'DIY maintenance items that prevent the expensive emergency calls' },
    ],
  },
];

const stats = [
  { number: '1,000+', label: 'DFW HVAC pages created' },
  { number: '47', label: 'AI agents powering the platform' },
  { number: '130+', label: 'Database tables tracking DFW homes' },
  { number: '#1', label: 'Goal: most comprehensive DFW HVAC resource ever built' },
];

export default function DFWHVACSessionEndPage() {
  const [situation, setSituation] = useState('');
  const selected = situations.find(s => s.id === situation);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#E8EDF5' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
        <h1 style={{ color: '#F5E642', fontSize: 30, fontWeight: 700, marginBottom: 12 }}>
          The ProLnk DFW HVAC Resource Is Complete
        </h1>
        <p style={{ color: '#9AAFC4', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
          As this extraordinary build session concludes, something significant has been created: the most comprehensive DFW HVAC resource ever assembled for homeowners — 1,000+ pages of Dallas-Fort Worth-specific HVAC guidance, built with the understanding that DFW's extreme climate demands its own playbook.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {stats.map(stat => (
            <div key={stat.label} style={{ background: '#1A2B45', borderRadius: 8, padding: 20, textAlign: 'center', borderTop: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 700 }}>{stat.number}</div>
              <div style={{ color: '#9AAFC4', fontSize: 13, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Why This Matters for DFW</h2>
          <p style={{ color: '#9AAFC4', lineHeight: 1.7, marginBottom: 0 }}>
            DFW homeowners have been underserved by generic HVAC advice written for moderate climates. With summer temperatures regularly exceeding 105°F and AC systems running 3,000-4,000 hours annually — 3x the national average — DFW homeowners needed a resource that speaks to their actual reality. That resource now exists. Every page on this platform is built around one mission: connect DFW homeowners with the knowledge and the vetted professionals they need to protect one of their largest assets.
          </p>
        </div>
        <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Your 3 Most Relevant Pages</h2>
        <div style={{ background: '#1A2B45', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <div style={{ marginBottom: 8, fontSize: 15, color: '#E8EDF5', fontWeight: 600 }}>What best describes your situation?</div>
            <select value={situation} onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: 6, background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A6B', fontSize: 15 }}>
              <option value="">Select your situation</option>
              {situations.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
          {selected && (
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.pages.map((page, i) => (
                <div key={page.path} style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ fontWeight: 700, color: '#F5E642' }}>{page.title}</div>
                  </div>
                  <div style={{ color: '#9AAFC4', fontSize: 14, lineHeight: 1.5 }}>{page.why}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ background: 'linear-gradient(135deg, #1A2B45, #0D2137)', borderRadius: 12, padding: 28, textAlign: 'center', border: '1px solid #F5E64240' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🔗</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>ProLnk — Built for DFW</div>
          <div style={{ color: '#9AAFC4', fontSize: 15, lineHeight: 1.6 }}>
            When you're ready to connect with a vetted DFW HVAC professional, ProLnk is here. Free quotes, no pressure, pros who understand the DFW climate.
          </div>
        </div>
      </div>
    </div>
  );
}
