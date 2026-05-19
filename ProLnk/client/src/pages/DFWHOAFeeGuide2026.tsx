import { useState } from 'react';

const communityTypes = [
  {
    type: 'Master-Planned Community',
    monthlyFee: '125-250',
    avgFee: 187,
    covers: ['Community pools', 'Walking trails', 'Landscaping of common areas', 'Clubhouse access', 'Playground maintenance'],
    examples: 'Frisco, Prosper, Celina communities',
    priority: 'family',
  },
  {
    type: 'Gated Community',
    monthlyFee: '200-400',
    avgFee: 300,
    covers: ['24/7 gate security', 'Guard service', 'Road maintenance', 'Common area upkeep', 'Community events'],
    examples: 'Southlake, Colleyville, Westlake gated areas',
    priority: 'security',
  },
  {
    type: 'Condo / Townhome',
    monthlyFee: '300-600',
    avgFee: 450,
    covers: ['Exterior building maintenance', 'Roof reserves', 'Insurance (structure)', 'Trash + water', 'Common areas'],
    examples: 'Uptown Dallas, Frisco Station, Las Colinas',
    priority: 'low maintenance',
  },
  {
    type: 'No HOA',
    monthlyFee: '0',
    avgFee: 0,
    covers: ['No restrictions on property use', 'No monthly fees', 'Full owner autonomy', 'No approval needed for changes'],
    examples: 'Mesquite, Lancaster, parts of Grand Prairie',
    priority: 'freedom',
  },
];

const priorities = ['family', 'security', 'low maintenance', 'freedom'];

export default function DFWHOAFeeGuide2026() {
  const [priority, setPriority] = useState('family');

  const selected = communityTypes.find((c) => c.priority === priority) || communityTypes[0];
  const annualCost = selected.avgFee * 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 8px' }}>DFW HOA Fee Guide 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, margin: '0 0 32px' }}>Average HOA fees by community type in DFW — and how to evaluate an HOA before you buy.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏘️', label: 'Master-Planned HOA', value: '$125-250/mo', sub: 'Most common in DFW suburbs' },
            { icon: '🔐', label: 'Gated Community HOA', value: '$200-400/mo', sub: 'Security + exclusivity premium' },
            { icon: '🏢', label: 'Condo HOA', value: '$300-600/mo', sub: 'Covers exterior + structure' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: '20px 18px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{card.value}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🏡 Find Your Community Type</h2>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>What matters most to you?</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              {priorities.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '20px 22px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{selected.type}</div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{selected.examples}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>${selected.monthlyFee}/mo</div>
                {annualCost > 0 && <div style={{ color: '#64748B', fontSize: 13 }}>${annualCost.toLocaleString()}/yr</div>}
              </div>
            </div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8, fontWeight: 600 }}>What this covers:</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {selected.covers.map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                  <span style={{ color: '#22C55E' }}>✓</span>
                  <span style={{ color: '#CBD5E1' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 HOA Evaluation Checklist Before You Buy</h2>
          {[
            { item: 'Request last 3 years of meeting minutes', why: 'Reveals ongoing disputes, special assessments, management issues' },
            { item: 'Review reserve fund balance', why: 'Underfunded reserves = future special assessments (often $2K-10K)' },
            { item: 'Check delinquency rate', why: '>15% delinquency signals financial instability' },
            { item: 'Read CC&Rs and bylaws fully', why: 'Look for rental restrictions, pet rules, exterior change approval process' },
            { item: 'Ask about pending litigation', why: 'Active lawsuits can freeze financing and tank resale value' },
            { item: 'Verify management company reputation', why: 'Self-managed HOAs vary widely; check online reviews' },
          ].map((row) => (
            <div key={row.item} style={{ padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#fff', marginBottom: 4 }}>✅ {row.item}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>{row.why}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}