import { useState } from 'react';

const counties = [
  {
    id: 'dallas',
    label: '🏙️ Dallas County',
    details: [
      '✅ School District Exemption: $100,000 off appraised value (state law, all districts)',
      '✅ Senior Exemption: Additional $10,000 off for 65+ (most Dallas ISD districts)',
      '❄️ Tax Freeze: School taxes FROZEN at age 65 — value increases don\’t raise your school tax',
      '🏠 Additional Freeze: Dallas County offers tax ceiling for 65+ on county portion',
      '📋 Apply at: Dallas Central Appraisal District (DCAD) — dcad.org',
      '📅 Deadline: April 30 each year (or within 1 year of turning 65)',
      '💡 Retroactive: Can apply for up to 2 prior years if you missed the deadline',
    ],
  },
  {
    id: 'tarrant',
    label: '🤠 Tarrant County',
    details: [
      '✅ School District Exemption: $100,000 off appraised value (state law)',
      '✅ Senior Exemption: Additional $10,000 off for 65+ on school taxes',
      '❄️ Tax Freeze: Tarrant County offers tax ceiling — total tax bill frozen for 65+',
      '🏠 Fort Worth, Arlington, Mansfield, and other cities may add city-level senior exemptions',
      '📋 Apply at: Tarrant Appraisal District — tad.org',
      '📅 Deadline: April 30 each year',
      '📞 TAD Senior helpline: (817) 284-0024',
    ],
  },
  {
    id: 'collin',
    label: '🌆 Collin County (Plano, Allen, Frisco)',
    details: [
      '✅ School District Exemption: $100,000 off (state law — Plano ISD, Frisco ISD, Allen ISD)',
      '✅ Senior Exemption: Collin County adds $50,000 additional exemption for 65+ (above state minimum)',
      '❄️ Tax Freeze: School and county portions freeze at 65 — significant protection in fast-growing market',
      '🏠 Frisco and Plano city councils may offer additional city senior exemptions',
      '📋 Apply at: Collin Central Appraisal District — collincad.org',
      '📅 Note: Collin County exemptions are among the most generous in DFW',
    ],
  },
  {
    id: 'denton',
    label: '🌳 Denton County (Lewisville, Flower Mound)',
    details: [
      '✅ School District Exemption: $100,000 off (state law)',
      '✅ Senior Exemption: $10,000 additional off for 65+ — varies slightly by school district',
      '❄️ Tax Freeze: Denton County offers senior tax ceiling on county portion',
      '🏠 Individual cities (Denton, Lewisville, Flower Mound) may add city-level exemptions',
      '📋 Apply at: Denton Central Appraisal District — dentoncad.com',
      '💡 Check with each taxing entity separately — city, county, and school district are independent',
    ],
  },
];

export default function DFWSeniorPropertyTaxRelief2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = counties.find((c) => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            DFW Senior Property Tax Relief Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Texas law provides major property tax breaks for homeowners 65+ — most DFW seniors are leaving thousands on the table
          </p>
        </div>

        <div style={{ background: '#22c55e20', border: '1px solid #22c55e', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#86efac' }}>
            💡 <strong>State Law Guarantees:</strong> Every Texas homeowner 65+ gets at least a $100,000 school district exemption + $10,000 senior exemption. Most DFW counties add MORE on top of that. The school tax FREEZE means your bill can never go up again.
          </p>
        </div>

        <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#F5E642', fontSize: '0.9rem' }}>📋 Texas Statewide Guaranteed Benefits (All Counties):</p>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <li>$100,000 school district exemption at age 65</li>
            <li>Minimum $10,000 additional senior exemption</li>
            <li>School tax ceiling (your bill is FROZEN — cannot increase)</li>
            <li>Disability exemption available if receiving SS disability benefits</li>
          </ul>
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Select your DFW county to see your complete tax relief guide:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {counties.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642' : '#1e2d45',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: '0.9rem 1.2rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>{active.label} — Tax Relief Guide</h2>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {active.details.map((d, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.5 }}>{d}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 10, padding: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
            🏡 ProLnk — DFW Senior Homeowner Resources
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            Tax savings keep you in your home. ProLnk keeps your home in great shape. Verified pros, senior pricing.
          </p>
        </div>
      </div>
    </div>
  );
}
