import { useState } from 'react';

const CERTIFICATIONS = {
  energyStar: {
    name: 'ENERGY STAR Homes',
    icon: '⭐',
    body: 'EPA',
    costPremium: { min: 2, max: 5 },
    annualSavings: { min: 600, max: 1200 },
    resaleBoost: 3,
    timeToAchieve: '3-6 months',
    requirements: ['HERS rating of 55 or lower', 'Thermal enclosure checklist', 'HVAC quality installation', 'Water management system'],
    bestFor: 'Most DFW production and semi-custom builders — widely adopted, lower hurdle',
  },
  leed: {
    name: 'LEED for Homes',
    icon: '🌿',
    body: 'USGBC',
    costPremium: { min: 5, max: 12 },
    annualSavings: { min: 1200, max: 2500 },
    resaleBoost: 7,
    timeToAchieve: '6-12 months',
    requirements: ['Innovation + location credits', 'Water efficiency (20%+ reduction)', 'Indoor air quality standards', 'Third-party verification required'],
    bestFor: 'Custom homes in DFW — buyers who want premium resale story and energy performance',
  },
  greenBuiltTX: {
    name: 'Green Built Texas',
    icon: '🤠',
    body: 'TGBA',
    costPremium: { min: 3, max: 8 },
    annualSavings: { min: 900, max: 1800 },
    resaleBoost: 4,
    timeToAchieve: '4-8 months',
    requirements: ['Texas-specific climate criteria', 'Site sustainability points', 'Energy efficiency threshold', 'Indoor health requirements'],
    bestFor: 'Texas buyers who want local relevance — recognized by Texas appraisers more than national certs',
  },
  austinEnergy: {
    name: 'Austin Energy Green Building',
    icon: '🔋',
    body: 'AEGB',
    costPremium: { min: 4, max: 10 },
    annualSavings: { min: 1100, max: 2200 },
    resaleBoost: 5,
    timeToAchieve: '5-10 months',
    requirements: ['4-star or 5-star rating', 'Net zero ready optional', 'Solar-ready wiring required', 'Austin utility territory for rebates'],
    bestFor: 'DFW builders expanding south or buyers who want transferable green credentials',
  },
};

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function DFWGreenBuildingCertificationsGuide() {
  const [homeValue, setHomeValue] = useState(500000);
  const [premiumPct, setPremiumPct] = useState(5);
  const [homeSqft, setHomeSqft] = useState(2400);

  const premium = homeValue * (premiumPct / 100);
  const paybackYears = (cert: typeof CERTIFICATIONS.energyStar) => {
    const midSavings = (cert.annualSavings.min + cert.annualSavings.max) / 2;
    const midPremium = homeValue * ((cert.costPremium.min + cert.costPremium.max) / 2) / 100;
    return Math.round(midPremium / midSavings);
  };
  const resaleGain = (cert: typeof CERTIFICATIONS.energyStar) => homeValue * cert.resaleBoost / 100;

  const achievable = Object.values(CERTIFICATIONS).filter(cert => {
    const midPremiumPct = (cert.costPremium.min + cert.costPremium.max) / 2;
    return premiumPct >= midPremiumPct - 1;
  });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 12 }}>
          DFW Construction Guide
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Green Building Certifications Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40 }}>
          ENERGY STAR, LEED, Green Built Texas, and Austin Energy Green Building — costs, savings, and resale impact in DFW.
        </p>

        <div style={{ background: '#0d1f38', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#F5E642′ }}>🌱 Calculate Your Green ROI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Home Value</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(Number(e.target.value))} step={50000}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Budget Premium (%)</label>
              <input type="number" value={premiumPct} onChange={e => setPremiumPct(Math.max(0, Math.min(20, Number(e.target.value))))} min={0} max={20}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600 }}>Home Size (sq ft)</label>
              <input type="number" value={homeSqft} onChange={e => setHomeSqft(Number(e.target.value))} step={200}
                style={{ width: '100%', background: '#1a2a4a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 16, marginTop: 8, boxSizing: 'border-box' as const }} />
            </div>
          </div>
          <div style={{ background: '#1a2a4a', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>Certifications achievable at {premiumPct}% premium ({fmt(premium)}):</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
              {achievable.length > 0 ? achievable.map(c => (
                <span key={c.name} style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 14px', fontSize: 13, fontWeight: 700 }}>
                  {c.icon} {c.name}
                </span>
              )) : <span style={{ color: '#ef4444′ }}>Increase budget premium to unlock certifications</span>}
            </div>
          </div>
        </div>

        {Object.values(CERTIFICATIONS).map(cert => (
          <div key={cert.name} style={{ background: '#0d1f38', borderRadius: 16, padding: 28, marginBottom: 20, border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 2 }}>{cert.icon} {cert.name}</h3>
                <div style={{ color: '#64748b', fontSize: 13 }}>Issued by {cert.body} &bull; {cert.timeToAchieve} to achieve</div>
              </div>
              <div style={{ textAlign: 'right' as const }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>+{cert.costPremium.min}–{cert.costPremium.max}% cost</div>
                <div style={{ color: '#22c55e', fontSize: 13 }}>+{cert.resaleBoost}% resale ({fmt(resaleGain(cert))})</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Cost Premium', val: `${fmt(homeValue * cert.costPremium.min / 100)} – ${fmt(homeValue * cert.costPremium.max / 100)}` },
                { label: 'Annual Energy Savings', val: `${fmt(cert.annualSavings.min)} – ${fmt(cert.annualSavings.max)}` },
                { label: 'Payback Period', val: `${paybackYears(cert)} years` },
              ].map(item => (
                <div key={item.label} style={{ background: '#1a2a4a', borderRadius: 8, padding: 12, textAlign: 'center' as const }}>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{item.val}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#0a1628', borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>KEY REQUIREMENTS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                {cert.requirements.map(r => <div key={r} style={{ color: '#94a3b8', fontSize: 13 }}>• {r}</div>)}
              </div>
            </div>

            <div style={{ color: '#cbd5e1', fontSize: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Best for: </span>{cert.bestFor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
