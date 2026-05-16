import { useState } from 'react';

const crewSizes = [
  { label: 'Solo (1-2)', crewSize: 1, jobsPerMonth: 3 },
  { label: 'Small (3-5)', crewSize: 3, jobsPerMonth: 6 },
  { label: 'Medium (6-10)', crewSize: 6, jobsPerMonth: 12 },
  { label: 'Large (11+)', crewSize: 11, jobsPerMonth: 20 },
];

export default function DFWRooferProGuide2026() {
  const [crewIdx, setCrewIdx] = useState(1);
  const crew = crewSizes[crewIdx];
  const avgRoofReplacement = 18000;
  const commissionRate = 0.20;
  const monthly = crew.jobsPerMonth * avgRoofReplacement * commissionRate;
  const annual = monthly * 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW TRADE GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Roofer Pro Guide 2026</h1>
        <p style={{ color: '#a0aec0', fontSize: 16, marginBottom: 32 }}>
          Hail storms in DFW are a gold rush for roofing contractors. Average roof replacement:
          <strong style={{ color: '#F5E642' }}> $18,000</strong>. ProLnk connects you to homeowners
          immediately after storm events — before the competition knocks on their door.
        </p>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⛈️ Why DFW is Roofing Gold</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🌨️', text: 'DFW averages 7+ significant hail events per year — highest in Texas' },
              { icon: '🏘️', text: '2.5M+ homes in metro — hundreds affected every storm season' },
              { icon: '📋', text: 'Insurance-involved jobs push average ticket above $18K' },
              { icon: '⚡', text: 'ProLnk alerts match you to storm-affected homeowners within hours' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 12, background: '#1a2d45', borderRadius: 8, padding: '10px 14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: '#cbd5e0', fontSize: 14, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>👷 Crew Size → Monthly Volume Calculator</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {crewSizes.map((c, i) => (
              <button key={c.label} onClick={() => setCrewIdx(i)}
                style={{ background: i === crewIdx ? '#F5E642' : '#1a2d45', color: i === crewIdx ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {c.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Avg roof replacement</span>
              <span style={{ fontWeight: 700 }}>$18,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Est. jobs/month with ProLnk</span>
              <span style={{ fontWeight: 700 }}>{crew.jobsPerMonth}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Monthly ProLnk commission</span>
              <span style={{ fontWeight: 700, color: '#F5E642' }}>${monthly.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0aec0' }}>Annual ProLnk earnings</span>
              <span style={{ fontWeight: 800, color: '#F5E642', fontSize: 20 }}>${annual.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⭐ Charter Tier — Storm-Ready Benefits</div>
          <ul style={{ color: '#cbd5e0', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Priority storm event notifications before non-Charter pros</li>
            <li>$149/mo rate locked — your cost stays fixed as platform grows</li>
            <li>Commission escalates 12% → 70% as your job count climbs</li>
            <li>Referral overrides on other roofers you recruit to ProLnk</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', display: 'inline-block', fontSize: 16, cursor: 'pointer' }}>
            🏠 Join ProLnk — Charter Rate $149/mo
          </div>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 12 }}>Charter waitlist closes at 500 members. DFW slots are limited.</p>
        </div>
      </div>
    </div>
  );
}
