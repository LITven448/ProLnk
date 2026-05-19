import { useState } from 'react';

const countyData: Record<string, Record<string, { system: string; maintenance: string; cost: string }>> = {
  Parker: {
    rural: { system: 'Aerobic Septic System (OSSF required)', maintenance: 'Quarterly TCEQ inspection + annual permit renewal. Licensed maintenance company required by Texas law.', cost: '$12,000–$18,000 installed; $300–$500/yr maintenance' },
    suburban: { system: 'Aerobic Septic or Municipal Sewer (check availability)', maintenance: 'If aerobic: quarterly inspection. If sewer: standard utility billing.', cost: 'Aerobic $12K–$18K or sewer tap $3K–$8K' },
  },
  Kaufman: {
    rural: { system: 'Aerobic Septic System (OSSF required)', maintenance: 'Quarterly inspections mandatory. Spray heads must be maintained. Annual permit via Kaufman County.', cost: '$11,000–$17,000 installed; $280–$450/yr maintenance' },
    suburban: { system: 'Municipal sewer often available — verify with city', maintenance: 'If no sewer access: aerobic OSSF with quarterly service contract.', cost: 'Sewer tap $2K–$6K or aerobic $11K–$17K' },
  },
  Ellis: {
    rural: { system: 'Aerobic Septic System (OSSF required per TCEQ Chapter 285)', maintenance: 'Licensed Maintenance Provider (LMP) contract required. Quarterly visits, chlorine checks, spray head inspection.', cost: '$12,500–$19,000 installed; $320–$480/yr maintenance' },
    suburban: { system: 'Waxahachie/Midlothian sewer available in developed areas', maintenance: 'Verify with Ellis County OSSF department — aerobic required outside city limits.', cost: 'Varies by city — sewer tap $2K–$7K' },
  },
  Tarrant: {
    rural: { system: 'Aerobic OSSF for properties without sewer access', maintenance: 'Quarterly TCEQ-compliant inspections. Most Tarrant County properties have municipal sewer.', cost: '$11,000–$16,000; quarterly service $70–$120/visit' },
    suburban: { system: 'Municipal sewer is standard in most of Tarrant County', maintenance: 'Aerobic only needed in far western or unincorporated areas.', cost: 'Standard utility billing; aerobic if rural: $11K–$16K' },
  },
};

export default function DFWSepticAlternativesGuide() {
  const [county, setCounty] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const result = county && propertyType ? countyData[county]?.[propertyType] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏡 DFW HOME SYSTEMS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Septic Alternatives Guide — DFW</h1>
        <p style={{ color: '#A0AABB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Many DFW counties outside city sewer service areas require aerobic On-Site Sewage Facilities (OSSFs). Parker, Kaufman, and Ellis counties are common examples where aerobic systems are mandatory for rural and semi-rural lots.
        </p>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Aerobic vs Conventional Septic</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Conventional Septic', points: ['Anaerobic treatment only', 'Drain field dispersal', 'Minimal maintenance', 'Not allowed in many DFW counties'] },
              { label: 'Aerobic OSSF', points: ['Adds oxygen for better treatment', 'Spray/drip irrigation output', 'Quarterly inspections required', 'TCEQ Chapter 285 governs all'] },
            ].map(col => (
              <div key={col.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 14 }}>{col.label}</div>
                {col.points.map(p => <div key={p} style={{ color: '#A0AABB', fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 County + Property Lookup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW County</label>
              <select value={county} onChange={e => setCounty(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select county...</option>
                {Object.keys(countyData).map(c => <option key={c} value={c}>{c} County</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Property Type</label>
              <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select type...</option>
                <option value="rural">Rural / Unincorporated</option>
                <option value="suburban">Suburban / In City Limits</option>
              </select>
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>REQUIRED SYSTEM</div>
                <div style={{ color: '#E8EAF0', fontSize: 15 }}>{result.system}</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>MAINTENANCE OBLIGATIONS</div>
                <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.5 }}>{result.maintenance}</div>
              </div>
              <div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>ESTIMATED COST</div>
                <div style={{ color: '#A0AABB', fontSize: 14 }}>{result.cost}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>📋 TCEQ COMPLIANCE NOTE</div>
          <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.6 }}>All aerobic OSSFs in Texas must have a signed maintenance contract with a TCEQ-licensed provider. Operating without an active contract is a violation. Inspections must be documented and records kept for 5 years.</div>
        </div>
      </div>
    </div>
  );
}
