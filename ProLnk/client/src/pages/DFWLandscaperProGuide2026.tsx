import { useState } from 'react';

const serviceTypes = [
  { label: 'Weekly Lawn Mow', avgMonthly: 200, season: 'Year-Round', demand: 'High' },
  { label: 'Irrigation Install', avgMonthly: 4500, season: 'Spring Peak', demand: 'Very High' },
  { label: 'Spring Cleanup', avgMonthly: 350, season: 'March-May', demand: 'Surging' },
  { label: 'Fall Aeration', avgMonthly: 280, season: 'Oct-Nov', demand: 'High' },
  { label: 'Full Landscape Design', avgMonthly: 8500, season: 'Spring/Fall', demand: 'Growing' },
];

const demandColors: Record<string,string> = {
  'High': '#68d391',
  'Very High': '#F5E642',
  'Surging': '#f6ad55',
  'Growing': '#b794f4',
};

export default function DFWLandscaperProGuide2026() {
  const [svcIdx, setSvcIdx] = useState(0);
  const svc = serviceTypes[svcIdx];
  const clientsOrJobs = svc.avgMonthly < 1000 ? 15 : 4;
  const commissionRate = 0.20;
  const monthly = clientsOrJobs * svc.avgMonthly * commissionRate;
  const annual = monthly * 12;
  const recurringAnnual = 2400;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW TRADE GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌿 DFW Landscaper Pro Guide 2026</h1>
        <p style={{ color: '#a0aec0', fontSize: 16, marginBottom: 32 }}>
          DFW homeowners spend an average of <strong style={{ color: '#F5E642' }}>$2,400/yr</strong> on lawn care and landscaping.
          ProLnk matches you to recurring maintenance contracts, spring startups, and one-time irrigation installs
          across all 7 DFW counties — so your calendar stays full every season.
        </p>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📅 DFW Landscaping Seasonality</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { season: 'Spring (Mar-May)', desc: 'Cleanup, mulching, planting, irrigation startup — busiest season', color: '#68d391' },
              { season: 'Summer (Jun-Sep)', desc: 'Weekly mow, turf management, drought response watering', color: '#f6ad55' },
              { season: 'Fall (Oct-Nov)', desc: 'Aeration, overseeding, leaf cleanup, winterization', color: '#b794f4' },
              { season: 'Winter (Dec-Feb)', desc: 'Holiday lighting, drainage work, landscape design planning', color: '#76e4f7' },
            ].map(({ season, desc, color }) => (
              <div key={season} style={{ background: '#1a2d45', borderRadius: 8, padding: '12px 16px', borderLeft: `4px solid ${color}` }}>
                <div style={{ fontWeight: 700, color, fontSize: 14 }}>{season}</div>
                <div style={{ color: '#cbd5e0', fontSize: 13, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>💰 Service Type → Seasonal Demand + Income Projection</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {serviceTypes.map((s, i) => (
              <button key={s.label} onClick={() => setSvcIdx(i)}
                style={{ background: i === svcIdx ? '#F5E642' : '#1a2d45', color: i === svcIdx ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 6, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Avg value per client/job</span>
              <span style={{ fontWeight: 700 }}>${svc.avgMonthly.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Peak season</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{svc.season}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#a0aec0' }}>Market demand</span>
              <span style={{ color: demandColors[svc.demand], fontWeight: 700 }}>{svc.demand}</span>
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

        <div style={{ background: '#111d30', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔄 Recurring Contract Value</div>
          <p style={{ color: '#cbd5e0', fontSize: 14, marginBottom: 8 }}>
            The average DFW homeowner spends <strong style={{ color: '#F5E642' }}>${recurringAnnual.toLocaleString()}/yr</strong> on recurring lawn care.
            ProLnk prioritizes matching landscapers with homeowners seeking ongoing contracts — not just one-time jobs.
          </p>
          <ul style={{ color: '#cbd5e0', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>$149/mo Charter rate locked for life</li>
            <li>Recurring match bonuses for multi-year contracts</li>
            <li>Commission 12% → 70% as your job history builds</li>
            <li>Override income on landscapers and irrigators you recruit</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, padding: '14px 32px', display: 'inline-block', fontSize: 16, cursor: 'pointer' }}>
            🌿 Join ProLnk — Charter Rate $149/mo
          </div>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 12 }}>Charter slots close at 500 members. Spring season is here.</p>
        </div>
      </div>
    </div>
  );
}
