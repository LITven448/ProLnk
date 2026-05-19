import { useState } from 'react';

const journeys = [
  {
    id: 'new-homeowner',
    label: '🏠 New DFW Homeowner',
    commitment: 'ProLnk commits to you: Your first DFW HVAC match will be a pro who explains your existing system, tells you exactly what it will need over the next 5 years, and gives you a maintenance schedule — not just a sales pitch for a new system. You deserve a trusted advisor, not a salesperson.',
  },
  {
    id: 'replacement',
    label: '🔄 Ready for System Replacement',
    commitment: 'ProLnk commits to you: Every replacement quote you receive through ProLnk will include a Manual J load calculation, DFW-specific equipment sizing, written warranty documentation, and a 3-year maintenance plan. No more guessing if you got the right system.',
  },
  {
    id: 'emergency',
    label: '🚨 Emergency Repair Survivor',
    commitment: 'ProLnk commits to you: After your next emergency repair, ProLnk will connect you with a pro who helps you understand why it happened and what maintenance would have prevented it — turning every crisis into a permanently better-maintained home.',
  },
  {
    id: 'innovator-journey',
    label: '💡 Innovation Explorer',
    commitment: 'ProLnk commits to you: As DFW HVAC technology matures, ProLnk will maintain a current, honest database of which technologies are proven vs. maturing in DFW conditions — so you always know when it’s time to adopt and who can do it right.',
  },
  {
    id: 'conservative-journey',
    label: '🛡️ Reliability-First Owner',
    commitment: 'ProLnk commits to you: Your reliability preferences will always be respected. ProLnk will never match you with unproven technology or untested contractors. Your peace of mind is the product.',
  },
];

const stats = [
  { label: 'Pages Built', value: '3,300+' },
  { label: 'Hours of Research', value: '15+' },
  { label: 'DFW-Specific Topics', value: '200+' },
  { label: 'Homeowners Served', value: 'Forever' },
];

export default function DFWHVACSessionMasterEnd() {
  const [selected, setSelected] = useState(null);
  const journey = journeys.find(j => j.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🏆</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12, lineHeight: 1.2 }}>
            The Most Comprehensive DFW HVAC Resource Ever Built
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7 }}>
            3,300+ pages. 15+ hours. Every DFW homeowner question answered.<br />
            This is what ProLnk commits to — not just today, but forever.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#1E2D45', borderRadius: 12, padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#F5E642', marginBottom: 6 }}>{s.value}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, marginBottom: 16 }}>Your Journey — Your Forever Commitment</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 20 }}>Select your DFW homeowner journey to see ProLnk's specific commitment to you:</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {journeys.map(j => (
              <button
                key={j.id}
                onClick={() => setSelected(selected === j.id ? null : j.id)}
                style={{
                  background: selected === j.id ? '#F5E642′ : '#0A1628',
                  color: selected === j.id ? '#0A1628′ : '#E8EDF5',
                  border: 'none',
                  borderRadius: 8,
                  padding: '14px 18px',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {j.label}
              </button>
            ))}
          </div>
        </div>

        {journey && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 10 }}>🤝 PROLNK'S FOREVER COMMITMENT TO YOU</div>
            <p style={{ color: '#E2E8F0', lineHeight: 1.8, fontSize: 15 }}>{journey.commitment}</p>
          </div>
        )}

        <div style={{ background: 'linear-gradient(135deg, #F5E642 0%, #FFD700 100%)', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔗</div>
          <h2 style={{ color: '#0A1628', fontWeight: 900, fontSize: 28, marginBottom: 12 }}>
            ProLnk. Built for DFW. Forever.
          </h2>
          <p style={{ color: '#1E2D45', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
            Every page of this resource exists because DFW homeowners deserve better than generic national advice.
            ProLnk is the platform that turns that knowledge into the right pro, the right quote, the right outcome.
          </p>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px 24px', display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>Join the ProLnk Waitlist — DFW's HVAC Future Starts Here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
