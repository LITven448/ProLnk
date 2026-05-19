import { useState } from 'react';

const jobTypes = [
  { label: 'Plumbing', icon: '🔧', response: '< 2 hours', how: 'Licensed plumbers in your zip code are ranked by proximity, current availability, and plumbing-specific ratings. The first available licensed partner gets the match.' },
  { label: 'HVAC', icon: '❄️', response: '< 3 hours', how: 'HVAC partners are filtered by system type (central, mini-split, heat pump) and certification level. Seasonal demand is factored into availability scoring.' },
  { label: 'Electrical', icon: '⚡', response: '< 2 hours', how: 'Only licensed master or journeyman electricians are matched for electrical work. License number is verified before any match is made.' },
  { label: 'Roofing', icon: '🏠', response: '< 4 hours', how: 'Roofing partners are matched by job size (repair vs full replacement), material expertise, and current crew availability. Insurance certificate is always confirmed.' },
  { label: 'General Repair', icon: '🔨', response: '< 1 hour', how: 'Handyman and general repair partners are matched by task category and proximity. Response times are fastest because coverage is widest.' },
];

export default function ProLnkMatchingExplained() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔗</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>How ProLnk Matching Works</h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 560, margin: '0 auto' }}>
            No bidding wars. No pay-per-click. Just fast, qualified matches — and you only pay if it works.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            { step: '1', icon: '📋', title: 'You post your job', desc: 'Describe your service need, location, and rough timeline. Takes under 2 minutes.' },
            { step: '2', icon: '🤖', title: 'AI scores the match', desc: 'ProLnk ranks available partners by location, urgency, trade specialty, and your budget range.' },
            { step: '3', icon: '📲', title: '3 vetted partners are notified', desc: 'The top 3 qualified partners in your area receive your job details instantly.' },
            { step: '4', icon: '✅', title: 'First qualified response wins', desc: 'The first partner who confirms availability and qualifications gets connected to you.' },
            { step: '5', icon: '💳', title: 'Match fee paid only on success', desc: 'ProLnk charges the partner a match fee only after a successful connection — not for clicking or browsing.' },
          ].map((item) => (
            <div key={item.step} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start', boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{item.step}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{item.icon} {item.title}</div>
                <div style={{ color: '#555', fontSize: 15 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0A1628′ }}>🆚 Why ProLnk Beats Angi & Thumbtack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 20 }}>
            {[
              { platform: 'Angi', color: '#ff6b6b', issues: ['Pay-per-click leads', 'Same lead sold to 5+ pros', 'No quality guarantee', 'Pros pass cost to you'] },
              { platform: 'Thumbtack', color: '#ff6b6b', issues: ['Bidding war format', 'Pros pay to quote you', 'No response guarantee', 'Quality varies widely'] },
              { platform: 'ProLnk', color: '#27ae60', issues: ['Fee only on success', 'Max 3 pros per job', 'Vetted and licensed only', 'Free for homeowners'] },
            ].map((p) => (
              <div key={p.platform} style={{ background: '#f8f9fa', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 800, color: p.color, marginBottom: 10, fontSize: 16 }}>{p.platform}</div>
                {p.issues.map((i) => <div key={i} style={{ fontSize: 13, color: '#444', marginBottom: 6 }}>{'• ' + i}</div>)}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0A1628′ }}>⚙️ How Matching Works for Your Job Type</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>Select a job type to see exactly how ProLnk finds your match.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {jobTypes.map((j, i) => (
              <button key={j.label} onClick={() => setSelected(i)} style={{ padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '2px solid #ddd', background: selected === i ? '#0A1628' : '#fff', color: selected === i ? '#F5E642' : '#333', fontWeight: 600, cursor: ’pointer', fontSize: 14 }}>
                {j.icon} {j.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#f0f9ff', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>⏱ Expected response time: <span style={{ color: '#0077cc' }}>{jobTypes[selected].response}</span></div>
              <div style={{ color: '#333', fontSize: 15, lineHeight: 1.6 }}>{jobTypes[selected].how}</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
