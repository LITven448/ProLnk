import { useState } from 'react';

const homeAges = [
  { label: 'Pre-1950 (Original Neighborhood Stock)', value: 'pre1950′ },
  { label: '1950s-1970s (Post-War Expansion)', value: '1950s' },
  { label: '1980s-2000s (Medical Professional Era)', value: '1980s' },
];
const homeTypes = [
  { label: 'Single Family Residential', value: 'sfr' },
  { label: 'Medical Professional Housing (larger, premium)', value: 'medpro' },
  { label: 'Rental / Investment Property', value: 'rental' },
];

const data: Record<string, Record<string, { maintenance: string[]; considerations: string[] }>> = {
  pre1950: {
    sfr: { maintenance: ['Cast iron sewer lines — root intrusion near mature trees', 'Lead paint and asbestos (required disclosure + testing)', 'Knob-and-tube or early wiring — insurance difficulty', 'Foundation: pier-and-beam common, check for settling', 'Original wood windows: restore or replace for efficiency'], considerations: ['Medical district proximity = reliable rental market fallback', 'Older neighborhoods: check utility easements before renovating', 'City of Fort Worth historic overlays may apply in some blocks', 'Harris Methodist and JPS shift workers = strong rental demand'] },
    medpro: { maintenance: ['Larger footprint = larger systems to maintain', 'HVAC multi-zone systems: aging fast if original', 'Roof area: more square footage = higher replacement cost ($20-35K)', 'Pool or large landscaping: professional maintenance essential'], considerations: ['Medical professional buyers expect move-in ready condition', 'Proximity to hospitals = faster sales in this price tier', 'HOA rules common in medical professional housing tracts'] },
    rental: { maintenance: ['Tenant-proof all surfaces: LVP, quartz, matte fixtures', 'HVAC reliability is non-negotiable for rental income', 'Plumbing: fix all deferred issues before tenant placement', 'Security: exterior lighting, deadbolts, smart locks'], considerations: ['Near-hospital rentals command 10-15% premium over area average', 'Nurse and resident turnover: plan for annual unit turns', 'Property management standard in this district'] },
  },
  '1950s': {
    sfr: { maintenance: ['Galvanized supply lines (low pressure, iron contamination)', 'Asbestos floor tiles, duct wrap, roofing shingles', 'Single-pane aluminum windows: poor efficiency', 'Electrical: 60A service common — upgrade required for modern loads', 'Foundation slab: watch for moisture intrusion near grade'], considerations: ['Near-hospital location offsets age concerns for most buyers', 'Renovation ROI strong: area values supported by employment anchor', 'Permit history important — many 1950s updates were unpermitted'] },
    medpro: { maintenance: ['Full systems audit before occupancy', 'HVAC zoning: older homes often have single-zone only', 'Roof: 15+ year roofs need immediate replacement assessment', 'Electrical panel upgrade to 200A standard'], considerations: ['Medical professional buyers move fast — pre-inspected homes sell faster', 'Area appreciation tied to hospital system expansion plans', 'JPS expansion plans ongoing — monitor for neighborhood impact'] },
    rental: { maintenance: ['Budget $15-25K for systems update before first rental', 'Asbestos abatement must be documented before tenant placement', 'Exterior paint and curb appeal drive rental rate', 'HVAC must be under active warranty for rental compliance'], considerations: ['Short-term rental market near medical district is strong', 'Furnished units command premium for travel nurses', 'City of Fort Worth STR registration required'] },
  },
  '1980s': {
    sfr: { maintenance: ['Polybutylene plumbing: check and replace if present', 'HVAC: 40-year-old systems are well past replacement window', 'Roof: 25-35 year roofs in immediate replacement territory', 'Foundation: clay soil movement most active in this era footprint', 'Exterior: trim, fascia, and soffits showing age'], considerations: ['1980s Fort Worth medical district homes: solid price-per-sqft', 'Renovation budget $60-120K positions well for resale', 'Medical center employers: stable buyer pool for this zone'] },
    medpro: { maintenance: ['Whole-home systems audit: all major components at end-of-life', 'Pool if present: equipment replacement ($8-15K)', 'Landscaping: mature trees near foundation — root monitoring', 'Smart home and EV charging: buyers expect this at this price'], considerations: ['Larger homes in medical corridor: strong hold-to-rent case', 'Hospital campus growth = long-term appreciation support', 'Consider medical professional rental during carry period'] },
    rental: { maintenance: ['Full cosmetic neutralization: paint, flooring, fixtures', 'All mechanical systems under active warranty', 'Appliance suite: replace if more than 10 years old', 'Exterior: clean, functional, low-maintenance'], considerations: ['Near-hospital furnished rentals: $2800-4500/mo typical', 'Travel nurse platforms (Furnished Finder, etc.) serve this zone', 'Professional property management: 8-10% of gross rent'] },
  },
};

export default function DFWFortWorthMedStarGuide() {
  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const result = age && type ? data[age]?.[type] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Homeowner Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏥 Fort Worth Medical District Homeowner Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.7 }}>Texas Health Harris Methodist, JPS Health Network, and Cook Children's anchor one of Fort Worth’s most stable employment corridors. Surrounding neighborhoods range from original 1920s stock to 1990s medical professional housing.</p>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🏗️ Home Age</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeAges.map(a => (
              <button key={a.value} onClick={() => setAge(a.value)} style={{ background: age === a.value ? '#F5E642′ : '#1E2D45', color: age === a.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{a.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D30', borderRadius: 12, padding: 20, marginBottom: 14 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🏠 Home Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {homeTypes.map(t => (
              <button key={t.value} onClick={() => setType(t.value)} style={{ background: type === t.value ? '#F5E642′ : '#1E2D45', color: type === t.value ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{t.label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🔧 Maintenance Priorities</div>
              {result.maintenance.map((m, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #F5E642′ }}>{m}</div>)}
            </div>
            <div style={{ background: '#111D30', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>📍 Neighborhood-Specific Considerations</div>
              {result.considerations.map((c, i) => <div key={i} style={{ color: '#CBD5E1', marginBottom: 6, paddingLeft: 14, borderLeft: '3px solid #22D3EE' }}>{c}</div>)}
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, background: '#111D30', borderRadius: 12, padding: 18, color: '#94A3B8', fontSize: 13 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk Tip: </span>Fort Worth medical district contractors often work on a mix of residential and light commercial. Verify they carry proper residential license and liability insurance — not just commercial credentials.
        </div>
      </div>
    </div>
  );
}
