import { useState } from 'react';

const tiers = [
  { label: 'New (0-9 jobs)', rate: 12 },
  { label: 'Silver (10-49)', rate: 20 },
  { label: 'Gold (50-99)', rate: 35 },
  { label: 'Platinum (100-499)', rate: 50 },
  { label: 'Elite (500+)', rate: 70 },
];

const counties = ['Dallas', 'Tarrant', 'Collin', 'Denton', 'Rockwall', 'Kaufman', 'Ellis'];

export default function DFWPlumberProGuide2026() {
  const [years, setYears] = useState(3);
  const avgTicket = 450;
  const jobsPerMonth = Math.min(5 + years * 2, 25);
  const tier = tiers[Math.min(Math.floor(years / 2), tiers.length - 1)];
  const monthly = jobsPerMonth * avgTicket * (tier.rate / 100);
  const annual = monthly * 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW TRADE GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔧 DFW Plumber Pro Guide 2026</h1>
        <p style={{ color: '#a0aec0', fontSize: 16, marginBottom: 32 }}>
          Licensed plumbers in the Dallas-Fort Worth metro are sitting on one of the hottest service markets in the country.
          Average job ticket: <strong style={{ color: '#F5E642′ }}>$450</strong>. ProLnk connects you to verified homeowners across all 7 DFW counties.
        </p>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📍 Service Coverage — All 7 DFW Counties</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {counties.map(c => (
              <span key={c} style={{ background: '#1a2d45', borderRadius: 6, padding: '4px 12px', fontSize: 13 }}>{c}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⭐ Charter Tier Benefits (Lock $149/mo forever)</div>
          <ul style={{ color: '#cbd5e0', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Rate locked at $149/mo — never increases as platform grows</li>
            <li>First access to new leads in your zip code</li>
            <li>Commission tiers start at 12% and climb to 70%</li>
            <li>Network override income on pros you refer</li>
            <li>Charter badge on your profile — builds instant homeowner trust</li>
          </ul>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>📊 Commission Tiers</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tiers.map(t => (
              <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', background: '#1a2d45', borderRadius: 8, padding: '10px 16px' }}>
                <span style={{ fontSize: 14 }}>{t.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{t.rate}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>💰 Income Projection Calculator</div>
          <label style={{ fontSize: 14, color: '#a0aec0′ }}>Years of Experience: <strong style={{ color: '#fff' }}>{years}</strong></label>
          <input type="range" min={1} max={15} value={years} onChange={e => setYears(+e.target.value)}
            style={{ width: '100%', margin: '12px 0', accentColor: '#F5E642′ }} />
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0′ }}>Estimated jobs/month</span>
              <span style={{ fontWeight: 700 }}>{jobsPerMonth}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0′ }}>Your tier</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{tier.label}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0′ }}>Monthly ProLnk earnings</span>
              <span style={{ fontWeight: 700, color: '#F5E642′ }}>${monthly.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0aec0′ }}>Annual ProLnk earnings</span>
              <span style={{ fontWeight: 700, color: '#F5E642', fontSize: 20 }}>${annual.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', display: 'inline-block', fontSize: 16, cursor: 'pointer' }}>
            🔧 Join ProLnk — Charter Rate $149/mo
          </div>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 12 }}>Waitlist closes at 500 Charter members. DFW slots filling fast.</p>
        </div>
      </div>
    </div>
  );
}
