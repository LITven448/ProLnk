import { useState } from 'react';

const steps = [
  { icon: '📝', title: 'Apply Online', desc: 'Submit your trade license number, insurance certificate, and basic business info.' },
  { icon: '🔍', title: 'Background Check (Checkr)', desc: 'Automated identity and criminal background check — typically completes in 24-48 hours.' },
  { icon: '👤', title: 'Build Your Profile', desc: 'Upload a professional photo, list your trades, define your service area and hourly rate.' },
  { icon: '💳', title: 'Charter Tier Enrollment', desc: 'Activate your $149/mo Charter membership to unlock the match feed and full income system.' },
  { icon: '🔔', title: 'First Match Notification', desc: 'ProLnk AI sends your first homeowner match — review details and choose to accept or pass.' },
  { icon: '⭐', title: 'Complete Job + Get Rated', desc: 'Finish the job, homeowner rates you. Strong ratings unlock priority placement in future matches.' },
];

const tradeTimeMap: Record<string, string> = {
  Plumbing: 'Avg 3.2 days to first match in DFW market',
  Electrical: 'Avg 2.8 days to first match — high demand trade',
  HVAC: 'Avg 1.9 days — emergency calls available immediately',
  Roofing: 'Avg 4.1 days — seasonal peaks in spring/fall',
  General: 'Avg 5.0 days — broad trade set increases variety',
};

export default function ProLnkGettingStartedPro() {
  const [trade, setTrade] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Getting Started as a Pro</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>From application to first paid job — your complete roadmap.</p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: '#0F2035', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, minWidth: 44, textAlign: 'center' }}>{s.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>STEP {i + 1}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: '#8899AA', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ Estimated Time to First Match by Trade</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {Object.keys(tradeTimeMap).map(t => (
              <button key={t} onClick={() => setTrade(t)} style={{
                background: trade === t ? '#F5E642' : '#1A2F4A',
                color: trade === t ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14
              }}>{t}</button>
            ))}
          </div>
          {trade && (
            <div style={{ background: '#1A2F4A', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600 }}>
              🏆 {tradeTimeMap[trade]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}