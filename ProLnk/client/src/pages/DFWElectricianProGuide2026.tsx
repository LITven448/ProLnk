import { useState } from 'react';

const specialties = [
  { label: 'Panel Upgrades', avgJob: 4200, demand: 'Very High' },
  { label: 'EV Charger Install', avgJob: 1200, demand: 'Surging' },
  { label: 'Solar Tie-In', avgJob: 2800, demand: 'High' },
  { label: 'General Wiring', avgJob: 650, demand: 'Steady' },
  { label: 'Smart Home', avgJob: 1800, demand: 'Growing' },
];

export default function DFWElectricianProGuide2026() {
  const [specialtyIdx, setSpecialtyIdx] = useState(0);
  const specialty = specialties[specialtyIdx];
  const jobsPerMonth = 8;
  const commissionRate = 0.20;
  const monthly = jobsPerMonth * specialty.avgJob * commissionRate;
  const annual = monthly * 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW TRADE GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚡ DFW Electrician Pro Guide 2026</h1>
        <p style={{ color: '#a0aec0', fontSize: 16, marginBottom: 32 }}>
          DFW is electrifying fast — EV chargers, aging panel upgrades, and solar tie-ins are fueling a multi-year boom.
          Charter tier locks you in at <strong style={{ color: '#F5E642′ }}>$149/mo forever</strong> while leads are claimed by zip code.
        </p>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📈 2026 DFW Market Trends</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🚗', text: 'EV registrations in DFW up 340% since 2023 — every new EV needs a charger' },
              { icon: '🏠', text: '600K+ DFW homes built before 1990 need panel upgrades for modern loads' },
              { icon: '☀️', text: 'Texas solar installs require licensed electricians for utility interconnect' },
              { icon: '🏗️', text: 'DFW construction permits up 28% YoY — new builds need full electrical' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 12, background: '#1a2d45', borderRadius: 8, padding: '10px 14px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ color: '#cbd5e0', fontSize: 14, lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>💡 Specialty → Earnings Calculator</div>
          <label style={{ fontSize: 14, color: '#a0aec0′ }}>Your Primary Specialty</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10, marginBottom: 16 }}>
            {specialties.map((s, i) => (
              <button key={s.label} onClick={() => setSpecialtyIdx(i)}
                style={{ background: i === specialtyIdx ? '#F5E642′ : '#1a2d45', color: i === specialtyIdx ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0′ }}>Avg DFW job value</span>
              <span style={{ fontWeight: 700 }}>${specialty.avgJob.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0′ }}>Market demand</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{specialty.demand}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0′ }}>Est. monthly ProLnk earnings</span>
              <span style={{ fontWeight: 700, color: '#F5E642′ }}>${monthly.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0aec0′ }}>Annual ProLnk earnings</span>
              <span style={{ fontWeight: 800, color: '#F5E642', fontSize: 20 }}>${annual.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>⭐ Charter Tier — Why Join Now</div>
          <ul style={{ color: '#cbd5e0', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>$149/mo rate locked for life — never goes up</li>
            <li>First-pick on EV charger and panel upgrade leads by zip</li>
            <li>Commission climbs from 12% to 70% as you complete jobs</li>
            <li>Earn override income from electricians you recruit</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', display: 'inline-block', fontSize: 16, cursor: 'pointer' }}>
            ⚡ Join ProLnk — Charter Rate $149/mo
          </div>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 12 }}>Waitlist closes at 500 Charter members.</p>
        </div>
      </div>
    </div>
  );
}
