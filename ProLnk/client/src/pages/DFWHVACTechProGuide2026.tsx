import { useState } from 'react';

const services = [
  { label: 'AC Repair', avgJob: 350, season: 'Summer Peak' },
  { label: 'Full Replacement', avgJob: 8000, season: 'Year-Round' },
  { label: 'Heating Repair', avgJob: 420, season: 'Winter Peak' },
  { label: 'Maintenance', avgJob: 180, season: 'All Seasons' },
  { label: 'Mini-Split Install', avgJob: 3200, season: 'Spring/Fall' },
];

const seasonColors: Record<string,string> = {
  'Summer Peak': '#f6ad55',
  'Year-Round': '#68d391',
  'Winter Peak': '#76e4f7',
  'All Seasons': '#F5E642',
  'Spring/Fall': '#b794f4',
};

export default function DFWHVACTechProGuide2026() {
  const [serviceIdx, setServiceIdx] = useState(0);
  const service = services[serviceIdx];
  const jobsPerMonth = service.avgJob < 500 ? 20 : service.avgJob < 2000 ? 6 : 3;
  const commissionRate = 0.20;
  const monthly = jobsPerMonth * service.avgJob * commissionRate;
  const annual = monthly * 12;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW TRADE GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>❄️ DFW HVAC Tech Pro Guide 2026</h1>
        <p style={{ color: '#a0aec0', fontSize: 16, marginBottom: 32 }}>
          DFW summers are brutal — and every homeowner needs their AC. Average repair: <strong style={{ color: '#F5E642' }}>$350</strong>.
          Full replacement: <strong style={{ color: '#F5E642' }}>$8,000+</strong>. ProLnk fills your slow winter months with maintenance calls so income stays steady year-round.
        </p>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🌡️ DFW HVAC Seasonality</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { season: 'Summer (Jun-Sep)', desc: 'Emergency AC calls dominate — 3-5 day backlogs common', color: '#f6ad55' },
              { season: 'Spring/Fall (Apr-May, Oct-Nov)', desc: 'Tune-ups, inspections, and system upgrades', color: '#b794f4' },
              { season: 'Winter (Dec-Feb)', desc: 'Heating repairs + proactive maintenance installs', color: '#76e4f7' },
            ].map(({ season, desc, color }) => (
              <div key={season} style={{ background: '#1a2d45', borderRadius: 8, padding: '12px 16px', borderLeft: `4px solid ${color}` }}>
                <div style={{ fontWeight: 700, color, fontSize: 14 }}>{season}</div>
                <div style={{ color: '#cbd5e0', fontSize: 13, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>💰 Service Type → Income Projection</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {services.map((s, i) => (
              <button key={s.label} onClick={() => setServiceIdx(i)}
                style={{ background: i === serviceIdx ? '#F5E642' : '#1a2d45', color: i === serviceIdx ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Avg job value</span>
              <span style={{ fontWeight: 700 }}>${service.avgJob.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Peak season</span>
              <span style={{ color: seasonColors[service.season], fontWeight: 700 }}>{service.season}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Est. jobs/month</span>
              <span style={{ fontWeight: 700 }}>{jobsPerMonth}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Monthly ProLnk earnings</span>
              <span style={{ fontWeight: 700, color: '#F5E642' }}>${monthly.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a0aec0' }}>Annual ProLnk earnings</span>
              <span style={{ fontWeight: 800, color: '#F5E642', fontSize: 20 }}>${annual.toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', display: 'inline-block', fontSize: 16, cursor: 'pointer' }}>
            ❄️ Join ProLnk — Charter Rate $149/mo
          </div>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 12 }}>Charter spots are limited. DFW HVAC techs are joining fast.</p>
        </div>
      </div>
    </div>
  );
}
