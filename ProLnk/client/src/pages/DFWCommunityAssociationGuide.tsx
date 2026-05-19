import { useState } from 'react';

const BUDGET_DATA: Record<string, Record<string, { budget: string; topNeeds: string[] }>> = {
  gated: {
    small: { budget: '$85,000–$140,000/yr', topNeeds: ['Gate maintenance & repairs', 'Landscaping & irrigation', 'Security lighting', 'Fence & wall repairs', 'Amenity center upkeep'] },
    medium: { budget: '$190,000–$340,000/yr', topNeeds: ['Pool service (commercial)', 'Parking lot resurfacing', 'Clubhouse HVAC', 'Gate system upgrades', 'Landscaping contracts'] },
    large: { budget: '$420,000–$900,000+/yr', topNeeds: ['Multiple pool service contracts', 'Full-time groundskeeping', 'Roofing reserves', 'Road maintenance', 'Security systems'] },
  },
  condo: {
    small: { budget: '$60,000–$110,000/yr', topNeeds: ['Elevator maintenance', 'Hallway lighting', 'Roof inspections', 'Parking structure', 'HVAC common areas'] },
    medium: { budget: '$150,000–$280,000/yr', topNeeds: ['Elevator modernization', 'Facade inspections', 'Fire suppression', 'Parking garage upkeep', 'Common area refresh'] },
    large: { budget: '$350,000–$750,000+/yr', topNeeds: ['Structural engineering reviews', 'Balcony waterproofing', 'Full elevator contracts', 'Boiler/chiller systems', 'Security & access control'] },
  },
  townhome: {
    small: { budget: '$40,000–$75,000/yr', topNeeds: ['Roof reserve contributions', 'Lawn care contracts', 'Sidewalk repairs', 'Entry signage', 'Exterior painting schedule'] },
    medium: { budget: '$100,000–$190,000/yr', topNeeds: ['Pool & splash pad service', 'Road & curb repairs', 'Tree trimming', 'Fence line maintenance', 'Exterior pest control'] },
    large: { budget: '$220,000–$500,000+/yr', topNeeds: ['Sub-association amenities', 'Multiple pool contracts', 'Streetlight maintenance', 'Trail & greenspace upkeep', 'Reserve fund studies'] },
  },
};

export default function DFWCommunityAssociationGuide() {
  const [communityType, setCommunityType] = useState('');
  const [communitySize, setCommunitySize] = useState('');
  const [result, setResult] = useState<{ budget: string; topNeeds: string[] } | null>(null);

  function generate() {
    if (!communityType || !communitySize) return;
    setResult(BUDGET_DATA[communityType]?.[communitySize] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#F5E642', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🏡</div>
        <h1 style={{ color: '#0A1628', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Community Association Maintenance Guide</h1>
        <p style={{ color: '#0A1628', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>Common area maintenance planning, procurement best practices, and reserve fund guidance for DFW communities.</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏊 Common Area Maintenance Needs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['🏊', 'Pools & Splash Pads', 'Weekly service + annual commercial inspection'], ['🌿', 'Landscaping', 'Mowing, irrigation, seasonal color'], ['🅿️', 'Parking Lots', 'Resurfacing every 7–10 years in DFW heat'], ['💡', 'Lighting', 'LED retrofit, photocell sensors, poles'], ['🚧', 'Gates & Entry', 'Electronic systems, intercoms, barriers'], ['🏋️', 'Amenity Centers', 'HVAC, plumbing, fitness equipment service']].map(([icon, title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📑 Proper Procurement Process</h2>
          <ol style={{ color: '#CBD5E1', paddingLeft: 20, lineHeight: 2 }}>
            <li>Develop written scope of work before contacting vendors</li>
            <li>Send RFP to minimum 3 qualified contractors</li>
            <li>Require certificate of insurance with association named as additional insured</li>
            <li>Board reviews bids — select based on value, not lowest price alone</li>
            <li>Execute written contract with scope, timeline, warranty terms, and payment schedule</li>
            <li>Collect lien waiver at each payment milestone</li>
          </ol>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>💰 Reserve Fund Planning</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: 16 }}>Texas law requires HOAs to maintain adequate reserves for major component replacement. A reserve study should be commissioned every 3–5 years by a certified reserve specialist (RS or PRA designation). DFW climate creates accelerated wear on roofing, parking surfaces, and irrigation — factor 1.2x national averages.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Reserve Fund Rule of Thumb</div>
            <div style={{ color: '#94A3B8', fontSize: 14 }}>Target 70–100% funded ratio. Under 50% = underfunded risk. Annual contribution: 15–30% of total budget.</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 20 }}>📊 Estimate Annual Maintenance Budget</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Community Type</label>
              <select value={communityType} onChange={e => setCommunityType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select type</option>
                <option value="gated">Gated Subdivision</option>
                <option value="condo">Condominium</option>
                <option value="townhome">Townhome Community</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Community Size</label>
              <select value={communitySize} onChange={e => setCommunitySize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select size</option>
                <option value="small">Small (&lt;75 units)</option>
                <option value="medium">Medium (75–250 units)</option>
                <option value="large">Large (250+ units)</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Generate Estimate →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#fff', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Estimated Budget: {result.budget}</div>
              <div style={{ color: '#374151', fontWeight: 700, marginBottom: 8 }}>Top Service Needs:</div>
              {result.topNeeds.map((need, i) => <div key={i} style={{ color: '#374151', fontSize: 14, padding: '4px 0' }}>• {need}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 18, marginBottom: 8 }}>🤝 ProLnk for Community Associations</h3>
          <p style={{ color: '#0A1628', fontSize: 14, marginBottom: 16 }}>Vetted contractors, competitive bids, and documentation all in one platform — built for DFW communities.</p>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>Join ProLnk →</a>
        </div>
      </div>
    </div>
  );
}
