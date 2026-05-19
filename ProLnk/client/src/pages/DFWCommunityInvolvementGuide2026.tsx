import { useState } from 'react';

const interests = [
  { id: 'hoa', label: 'HOA Participation', icon: '🏛️', tips: ['Attend monthly HOA meetings to vote on budgets and rules', 'Join the architectural review committee', 'Run for an open board seat during annual elections', 'Review HOA financials — request audited statements annually'] },
  { id: 'nextdoor', label: 'Nextdoor & Social', icon: '📱', tips: ['Verify your address to unlock neighborhood-only posts', 'Share ProLnk contractor reviews to help neighbors', 'Use the Free & For Sale section to reduce waste', 'Enable urgent alerts for real-time neighborhood updates'] },
  { id: 'school', label: 'School Involvement', icon: '🎓', tips: ['Join the PTA/PTO at your local DFW school district', 'Volunteer for school beautification days', 'Sponsor sports teams through your ProLnk pro network', 'Attend DISD/FWISD school board meetings quarterly'] },
  { id: 'block', label: 'Block Parties & Events', icon: '🎉', tips: ['Get a free Dallas block party permit at dallascityhall.com', 'Fort Worth requires 48hr street closure notice to Public Works', 'Pool $20-50/household for food, games, and supplies', 'Invite local pros to demo services — builds community + leads'] },
  { id: 'association', label: 'Neighborhood Associations', icon: '🤝', tips: ['Form a 501(c)(4) for tax-advantaged neighborhood funds', 'Apply for City of Dallas Neighborhood Vitality grants', 'Partner with Keep DFW Beautiful for cleanup events', 'Connect with North Texas Community Development Corp'] },
];

const stats = [
  { label: 'Avg Value Lift', value: '+4.2%', sub: 'Strong HOA communities' },
  { label: 'Faster Sales', value: '18 Days', sub: 'Vs DFW avg 31 days' },
  { label: 'Nextdoor Reach', value: '2.1M', sub: 'DFW active users' },
];

export default function DFWCommunityInvolvementGuide2026() {
  const [selected, setSelected] = useState('hoa');
  const active = interests.find(i => i.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Community Involvement Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            How DFW homeowners build strong communities — and why it directly lifts property values and speeds home sales.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#111e35', borderRadius: 12, padding: '20px 16px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>{s.value}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Choose Your Community Interest</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {interests.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id)}
              style={{ background: selected === i.id ? '#F5E642' : '#111e35', color: selected === i.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {i.icon} {i.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>{active.icon} {active.label} Engagement Guide</h3>
          {active.tips.map((tip, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2d1a', borderRadius: 12, padding: 24, border: '1px solid #166534', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <h3 style={{ color: '#4ade80', margin: '0 0 8px' }}>ProLnk Keeps Your Neighborhood Strong</h3>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
            Verified local pros maintain neighborhood standards — fast quotes, quality work, no ghost contractors. Community involvement starts with reliable home maintenance.
          </p>
        </div>
      </div>
    </div>
  );
}
