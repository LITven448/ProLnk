import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: 'Curious Homeowner', icon: '🏠', guide: ['Attend your first HOA meeting — no RSVP needed, just show up', 'Review the agenda (posted 72hrs before per TX law) to prepare questions', 'Introduce yourself and note which board seats expire soonest', 'Ask about the annual budget review process and reserve fund health', 'Sign up for the HOA email list and Nextdoor notifications'] },
  { id: 'candidate', label: 'Board Candidate', icon: '🗳️', guide: ['Confirm eligibility: current on dues, no active violations', 'Submit candidacy letter 30 days before the annual election', 'Campaign on concrete issues: reserve funding, landscaping, contractor quality', 'Highlight ProLnk as a tool to vet and manage HOA contractors', 'Prepare a 2-minute speech for the election meeting'] },
  { id: 'board', label: 'Board Member', icon: '⭐', guide: ['Understand fiduciary duty — act in best interest of ALL homeowners', 'Hold monthly meetings (standard) or quarterly (per your bylaws)', 'Maintain D&O insurance — essential for board protection in TX', 'Use ProLnk to source vetted contractors for HOA common area work', 'Keep minutes for every meeting — required under Chapter 209'] },
  { id: 'president', label: 'Board President', icon: '🏛️', guide: ['Run meetings using Roberts Rules of Order for structure', 'Manage the management company relationship (if applicable)', 'Sign contracts on behalf of the HOA — verify authority in bylaws', 'Lead annual budget process: review reserve study, set dues', 'Set contractor standards and use ProLnk for bid transparency'] },
];

const benefits = [
  { icon: '🔧', title: 'Shape Contractor Rules', desc: 'Board members can influence which contractor standards are required — ensuring quality work throughout the neighborhood' },
  { icon: '📊', title: 'Control HOA Budget', desc: 'Oversee how dues are spent on landscaping, repairs, and amenities — prevent waste and underfunded reserves' },
  { icon: '🤝', title: 'ProLnk Referral Network', desc: 'HOA board members who refer ProLnk pros earn referral income while improving neighborhood maintenance standards' },
];

export default function DFWHOABoardGuide2026() {
  const [selected, setSelected] = useState('homeowner');
  const active = roles.find(r => r.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏛️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW HOA Board Participation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            Why DFW pros and homeowners should be on their HOA board — and how to get there.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {benefits.map(b => (
            <div key={b.title} style={{ background: '#111e35', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{b.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 6 }}>{b.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select Your Role</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {roles.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id)}
              style={{ background: selected === r.id ? '#F5E642′ : '#111e35', color: selected === r.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 18px', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>{active.icon} HOA Participation Guide: {active.label}</h3>
          {active.guide.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>🔑 HOA board members who standardize on ProLnk for contractor sourcing create a higher-quality, more consistent neighborhood — while earning referral income on every project they influence.</p>
        </div>
      </div>
    </div>
  );
}
