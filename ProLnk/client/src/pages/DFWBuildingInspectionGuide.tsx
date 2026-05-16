import { useState } from 'react';

const INSPECTION_DATA: Record<string, Record<string, Record<string, { type: string; cost: string; redFlags: string[] }>>> = {
  office: {
    new: { purchase: { type: 'Commercial Property Inspection', cost: '$800–$1,800', redFlags: ['Roof membrane age & condition', 'HVAC tonnage vs. space', 'Electrical panel capacity', 'ADA parking compliance'] } },
    mid: { purchase: { type: 'Commercial Inspection + Phase 1 ESA', cost: '$2,200–$4,500', redFlags: ['Prior tenant chemical use', 'Asbestos in ceiling tiles or flooring', 'Underground storage tanks', 'HVAC original vs. replaced'] } },
    old: { purchase: { type: 'Full Due Diligence Package', cost: '$4,500–$9,000+', redFlags: ['Lead paint (pre-1978)', 'Knob-and-tube wiring', 'Asbestos throughout', 'Foundation settlement', 'Plumbing material (galvanized)'] } },
  },
  retail: {
    new: { purchase: { type: 'Commercial Property Inspection', cost: '$700–$1,500', redFlags: ['Storefront glazing condition', 'Roof drainage & slope', 'Grease trap if food use', 'ADA path of travel compliance'] } },
    mid: { purchase: { type: 'Commercial Inspection + Phase 1 ESA', cost: '$2,000–$4,000', redFlags: ['Former dry cleaner or auto tenant', 'Parking lot condition', 'HVAC coils & ductwork', 'Fire suppression system age'] } },
    old: { purchase: { type: 'Full Due Diligence Package', cost: '$4,000–$8,500+', redFlags: ['Structural masonry cracks', 'Roof deck condition', 'Historical flood risk (DFW)', 'Electrical service age', 'ADA retrofit cost exposure'] } },
  },
  warehouse: {
    new: { purchase: { type: 'Commercial Property Inspection', cost: '$900–$2,000', redFlags: ['Dock leveler condition', 'Overhead door hardware', 'Fire suppression coverage', 'Column spacing & clear height'] } },
    mid: { purchase: { type: 'Commercial Inspection + Phase 1 ESA', cost: '$2,500–$5,000', redFlags: ['Prior industrial use contamination', 'Concrete slab cracks', 'HVAC & make-up air units', 'Roof membrane punctures'] } },
    old: { purchase: { type: 'Full Due Diligence Package', cost: '$5,000–$11,000+', redFlags: ['Soil contamination (Phase 2 may be needed)', 'Column base plate corrosion', 'Electrical buss duct age', 'Fire code upgrade exposure', 'Asbestos pipe insulation'] } },
  },
};

export default function DFWBuildingInspectionGuide() {
  const [buildingType, setBuildingType] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [intendedUse, setIntendedUse] = useState('purchase');
  const [result, setResult] = useState<{ type: string; cost: string; redFlags: string[] } | null>(null);

  function generate() {
    if (!buildingType || !buildingAge) return;
    setResult(INSPECTION_DATA[buildingType]?.[buildingAge]?.[intendedUse] || INSPECTION_DATA[buildingType]?.[buildingAge]?.['purchase'] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#F5E642', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🔍</div>
        <h1 style={{ color: '#0A1628', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Commercial Building Inspection Guide</h1>
        <p style={{ color: '#0A1628', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>Know what to inspect, what it costs, and what red flags to negotiate — before you sign.</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏗️ When You Need an Inspection</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🏦 Purchasing', 'Always — before due diligence period expires'], ['🔄 Renewing Lease', 'Document existing conditions before you sign'], ['📋 Pre-Renovation', 'Identify asbestos/lead before demo work'], ['💰 Refinancing', 'Lender may require condition report'], ['⚠️ Post-Casualty', 'After fire, flood, or severe storm'], ['📆 Periodic Review', 'Every 5–7 years for owned properties']].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🌍 Phase 1 Environmental Assessment</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 16 }}>A Phase 1 ESA is a records and site review — no soil sampling — that identifies Recognized Environmental Conditions (RECs). Required by most commercial lenders. Cost: $1,500–$3,500. Timeline: 2–3 weeks. If RECs are found, a Phase 2 ESA with lab sampling may be needed ($5K–$50K+). In DFW, former dry cleaners, gas stations, and auto shops are the most common contamination sources.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Negotiation Tip</div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>Phase 1 findings rarely kill a deal — but they give you powerful leverage. Request price reductions or remediation escrow equal to 150% of estimated cleanup cost.</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 20 }}>🔎 Get Your Inspection Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Building Type</label>
              <select value={buildingType} onChange={e => setBuildingType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select</option>
                <option value="office">Office</option>
                <option value="retail">Retail</option>
                <option value="warehouse">Warehouse/Industrial</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Building Age</label>
              <select value={buildingAge} onChange={e => setBuildingAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select</option>
                <option value="new">Newer (&lt;15 yrs)</option>
                <option value="mid">Mid-Age (15–30 yrs)</option>
                <option value="old">Older (30+ yrs)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Intended Use</label>
              <select value={intendedUse} onChange={e => setIntendedUse(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="purchase">Purchase</option>
                <option value="lease">Lease</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#fff', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 17, marginBottom: 4 }}>Recommended: {result.type}</div>
              <div style={{ color: '#374151', fontSize: 15, marginBottom: 16 }}>Estimated Cost: <strong>{result.cost}</strong></div>
              <div style={{ color: '#374151', fontWeight: 700, marginBottom: 8 }}>⚠️ Red Flags to Watch For:</div>
              {result.redFlags.map((flag, i) => <div key={i} style={{ color: '#DC2626', fontSize: 14, padding: '3px 0' }}>• {flag}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 18, marginBottom: 8 }}>🔧 Need an Inspector or Remediation Contractor?</h3>
          <p style={{ color: '#0A1628', fontSize: 14, marginBottom: 16 }}>ProLnk connects DFW property investors with vetted inspectors and environmental consultants.</p>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>Find Inspectors →</a>
        </div>
      </div>
    </div>
  );
}
