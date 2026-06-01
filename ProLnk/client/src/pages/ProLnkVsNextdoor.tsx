import { useState } from 'react';

const COMPARISONS = [
  { label: 'Contractor Vetting', nextdoor: 'Zero vetting — neighbor recommendations with no background check or license check', prolnk: 'Criminal background, license verify, insurance confirm — every contractor, every time' },
  { label: 'Accountability', nextdoor: "No formal accountability — reviews are neighbors' opinions, no enforcement", prolnk: 'Performance scores, complaint review, and automatic suspension for bad actors' },
  { label: 'Insurance Coverage', nextdoor: 'Unknown — homeowner has no way to verify contractor is insured', prolnk: 'Insurance certificates verified before any contractor joins the network' },
  { label: 'Quote Process', nextdoor: 'DM the contractor yourself — no structured quote comparison', prolnk: '3 vetted contractors respond to your one job posting with competing quotes' },
  { label: 'Speed', nextdoor: 'Dependent on community activity and response rate — can take days', prolnk: 'Match engine routes your job within minutes; quotes arrive in 24 hours' },
  { label: 'Cost to Homeowner', nextdoor: 'Free — but risk of unknown contractor is real cost not shown on screen', prolnk: 'Free — risk is managed through vetting, not passed to the homeowner' },
];

const SCENARIOS = [
  { job: 'Leaky faucet or minor plumbing', risk: 'low', rec: 'nextdoor', reason: 'Low-stakes, low-cost job where a neighbor’s recommendation is often enough. Nextdoor works fine here.' },
  { job: 'Roof replacement or major structural work', risk: 'high', rec: 'prolnk', reason: 'High-dollar job with major liability. Always use a licensed, insured, background-checked contractor — ProLnk.' },
  { job: 'Electrical panel upgrade', risk: 'high', rec: 'prolnk', reason: 'Electrical work requires licensed electricians and permits. ProLnk verifies credentials Nextdoor cannot.' },
  { job: 'Lawn mowing or yard cleanup', risk: 'low', rec: 'nextdoor', reason: 'Low risk, and your neighbor’s recommended landscaper is probably fine for this.' },
  { job: 'HVAC installation or replacement', risk: 'high', rec: 'prolnk', reason: 'HVAC requires refrigerant licensing and manufacturer certification. ProLnk’s vetting catches this — Nextdoor doesn’t.' },
  { job: 'House cleaning or organizing', risk: 'low', rec: 'either', reason: 'Moderate risk — Nextdoor for trusted neighbor referrals, ProLnk for background-checked professionals.' },
];

export default function ProLnkVsNextdoor() {
  const [selectedScenario, setSelectedScenario] = useState(0);

  const rec = SCENARIOS[selectedScenario].rec;
  const recColor = rec === 'prolnk' ? '#F5E642' : rec === 'nextdoor' ? '#6EE7B7' : '#93C5FD';
  const recLabel = rec === 'prolnk' ? '⚡ Use ProLnk' : rec === 'nextdoor' ? '🏘️ Nextdoor works here' : '✅ Either works';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 38, marginBottom: 12 }}>🏘️ ⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>ProLnk vs Nextdoor</h1>
          <p style={{ fontSize: 16, color: '#6B7280' }}>Neighbor recommendations vs professional marketplace — when to use each</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🏘️</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Nextdoor</h3>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>Community-based neighbor recommendations. Works great for low-stakes tasks, terrible for high-liability work. No vetting, no accountability, no insurance verification.</p>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>ProLnk</h3>
            <p style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.7 }}>Professional marketplace with background-checked, licensed, insured contractors. Structured quote process, performance accountability, and dispute resolution built in.</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          {COMPARISONS.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', padding: '16px 20px', borderBottom: '1px solid #F3F4F6', backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>{c.label}</div>
              <div style={{ fontSize: 12, color: '#9CA3AF', paddingRight: 12 }}>{c.nextdoor}</div>
              <div style={{ fontSize: 12, color: '#059669', paddingRight: 12 }}>{c.prolnk}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Which Should You Use?</h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Select your job type:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {SCENARIOS.map((s, i) => (
              <button key={i} onClick={() => setSelectedScenario(i)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: selectedScenario === i ? '#F5E642' : '#E5E7EB',
                  backgroundColor: selectedScenario === i ? '#F5E642' : '#fff', color: '#0A1628', fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                {s.job}
              </button>
            ))}
          </div>
          <div style={{ backgroundColor: '#F9FAFB', borderRadius: 10, padding: 20, borderLeft: '4px solid ' + recColor }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>{recLabel}</div>
            <p style={{ fontSize: 13, color: '#4B5563', margin: 0 }}>{SCENARIOS[selectedScenario].reason}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 16, padding: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Get Vetted Pros for Your Next Job</h2>
          <p style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 22 }}>Free for homeowners. Background-checked contractors only.</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 32px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Join ProLnk Waitlist →
          </button>
        </div>
      </div>
    </div>
  );
}
