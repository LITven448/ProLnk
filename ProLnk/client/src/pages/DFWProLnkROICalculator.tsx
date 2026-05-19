import { useState } from 'react';

const HOME_SIZES = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const SERVICE_NEEDS = ['1–2 projects/year', '3–4 projects/year', '5–6 projects/year', '7+ projects/year'];

const AVG_SAVINGS_PER_PROJECT: Record<string, number> = {
  'Under 1,500 sqft': 850,
  '1,500–2,500 sqft': 1100,
  '2,500–4,000 sqft': 1400,
  '4,000+ sqft': 1800,
};

const PROJECTS_PER_YEAR: Record<string, number> = {
  '1–2 projects/year': 1.5,
  '3–4 projects/year': 3.5,
  '5–6 projects/year': 5.5,
  '7+ projects/year': 8,
};

const HOURLY_VALUE = 75;
const HOURS_SAVED_PER_PROJECT = 4;
const QUALITY_PREMIUM_PCT = 0.12;
const ORIGINATION_ANNUAL = 280;
const PROLNK_ANNUAL_COST = 0;

export default function DFWProLnkROICalculator() {
  const [homeSize, setHomeSize] = useState('1,500–2,500 sqft');
  const [serviceNeeds, setServiceNeeds] = useState('3–4 projects/year');
  const [calculated, setCalculated] = useState(false);

  const projects = PROJECTS_PER_YEAR[serviceNeeds];
  const savingsPerProject = AVG_SAVINGS_PER_PROJECT[homeSize];
  const totalSavings = Math.round(projects * savingsPerProject);
  const timeSaved = Math.round(projects * HOURS_SAVED_PER_PROJECT * HOURLY_VALUE);
  const qualityPremium = Math.round(totalSavings * QUALITY_PREMIUM_PCT);
  const totalValue = totalSavings + timeSaved + qualityPremium + ORIGINATION_ANNUAL - PROLNK_ANNUAL_COST;
  const roiMultiple = PROLNK_ANNUAL_COST > 0 ? (totalValue / PROLNK_ANNUAL_COST).toFixed(1) : '∞';

  const rows = [
    { label: 'Competitive bid savings', value: totalSavings, desc: `${projects} projects × avg $${savingsPerProject.toLocaleString()} savings vs. non-vetted contractor` },
    { label: 'Time value saved', value: timeSaved, desc: `${Math.round(projects * HOURS_SAVED_PER_PROJECT)} hrs × $75/hr — time finding & vetting contractors` },
    { label: 'Quality premium value', value: qualityPremium, desc: '12% fewer callbacks, warranty protection, licensed pros' },
    { label: 'Origination rights value', value: ORIGINATION_ANNUAL, desc: 'Avg annual share of platform fees for homes you originate' },
    { label: 'ProLnk cost to homeowner', value: -PROLNK_ANNUAL_COST, desc: 'Free for homeowners — ProLnk is paid by pros' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW ProLnk ROI Calculator</h1>
          <p style={{ color: '#64748b', margin: 0 }}>How much is ProLnk worth to a DFW homeowner each year?</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', marginTop: 0, fontSize: 18 }}>Your Home Profile</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#475569', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>🏠 Home Size</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {HOME_SIZES.map(s => (
                <button key={s} onClick={() => { setHomeSize(s); setCalculated(false); }}
                  style={{ background: homeSize === s ? '#0A1628′ : '#f1f5f9', color: homeSize === s ? '#F5E642' : '#475569', border: '1px solid', borderColor: homeSize === s ? '#0A1628' : '#e2e8f0', borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontSize: 13, fontWeight: homeSize === s ? 700 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#475569', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>🔧 Annual Service Projects</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SERVICE_NEEDS.map(s => (
                <button key={s} onClick={() => { setServiceNeeds(s); setCalculated(false); }}
                  style={{ background: serviceNeeds === s ? '#0A1628′ : '#f1f5f9', color: serviceNeeds === s ? '#F5E642' : '#475569', border: '1px solid', borderColor: serviceNeeds === s ? '#0A1628' : '#e2e8f0', borderRadius: 8, padding: '8px 14px', cursor: ’pointer', fontSize: 13, fontWeight: serviceNeeds === s ? 700 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setCalculated(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '12px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            📊 Calculate My ProLnk Value
          </button>
        </div>
        {calculated && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ textAlign: 'center', marginBottom: 24, padding: 20, background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0′ }}>
              <div style={{ fontSize: 13, color: '#15803d', fontWeight: 600, marginBottom: 4 }}>Estimated Annual Value of ProLnk</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#0A1628′ }}>${totalValue.toLocaleString()}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>ROI: {roiMultiple}x return • Free for homeowners</div>
            </div>
            <h3 style={{ color: '#0A1628', marginBottom: 16, fontSize: 15 }}>Value Breakdown</h3>
            {rows.map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < rows.length - 1 ? '1px solid #f1f5f9′ : ’none' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{row.desc}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, color: row.value >= 0 ? '#16a34a' : '#dc2626', minWidth: 80, textAlign: 'right' }}>
                  {row.value >= 0 ? '+' : ''}${Math.abs(row.value).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', padding: 20, background: '#0A1628', borderRadius: 12 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Ready to start saving on DFW home services? Sign up free.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            🔗 Join ProLnk — Free for Homeowners
          </button>
        </div>
      </div>
    </div>
  );
}
