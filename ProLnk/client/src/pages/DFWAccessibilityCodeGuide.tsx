import { useState } from 'react';

const ADA_DATA: Record<string, Record<string, Record<string, { violations: string[]; retrofitCost: string; priorities: string[] }>>> = {
  commercial: {
    pre1990: {
      small: { violations: ['Non-compliant parking (no van accessible, improper slope)', 'No accessible route from parking to entrance', 'Entry door too narrow (<32" clear)', 'Restroom non-compliant (grab bars, turning radius)', 'Interior door hardware (round knobs)'], retrofitCost: '$18,000–$55,000', priorities: ['Parking + accessible route — highest liability', 'Entry door width & hardware', 'Restroom compliance — ADA first enforcement target'] },
      large: { violations: ['Multiple inaccessible parking zones', 'Ramp slope too steep (>1:12)', 'Elevator missing or non-compliant', 'Signage (Braille + tactile missing)', 'Service counter height non-compliant'], retrofitCost: '$65,000–$250,000+', priorities: ['Elevator installation or upgrade', 'Parking lot reconfiguration', 'Service counter height & knee clearance'] },
    },
    post1990: {
      small: { violations: ['Van accessible space may be missing if older permit', 'Door hardware wear', 'Restroom paper towel dispenser height', 'Threshold height at entries'], retrofitCost: '$4,000–$18,000', priorities: ['Van accessible space verification', 'Restroom fixture height audit', 'Entry threshold corrections'] },
      large: { violations: ['Signage non-compliance (updated Braille standards)', 'Accessible parking ratios (updated 2010 ADA)', 'Elevator modernization', 'Website accessibility (WCAG 2.1)'], retrofitCost: '$15,000–$80,000', priorities: ['Parking ratio audit against 2010 ADA Standards', 'Elevator modernization plan', 'Digital accessibility audit'] },
    },
  },
  multifamily: {
    pre1990: {
      small: { violations: ['No accessible units (FHA may apply if 4+ units built after 1991)', 'Common area accessibility', 'Mailbox height non-compliant', 'Laundry room clearance'], retrofitCost: '$8,000–$35,000', priorities: ['Determine FHA applicability (built after 3/13/1991)', 'Common area path of travel', 'Mailbox and amenity corrections'] },
      large: { violations: ['Accessible unit percentage non-compliant', 'Pool lift missing', 'Fitness center equipment spacing', 'Leasing office path of travel'], retrofitCost: '$40,000–$180,000', priorities: ['Pool lift — high enforcement priority in Texas', 'Leasing office accessibility', 'Unit type ratio audit against FHA'] },
    },
    post1990: {
      small: { violations: ['Accessible route wear', 'Parking surface deterioration', 'Grab bar backing (missing in pre-installed walls)', 'Intercom height'], retrofitCost: '$3,000–$12,000', priorities: ['Grab bar blocking in unit walls', 'Parking surface restriping', 'Accessible route surface repairs'] },
      large: { violations: ['Pool lift compliance (2012 ADA update)', 'Fitness equipment spacing', 'EV charging accessible space', 'Updated signage standards'], retrofitCost: '$12,000–$60,000', priorities: ['Pool lift — retroactive requirement since 2013', 'EV charging accessible space planning', 'Common area signage audit'] },
    },
  },
};

export default function DFWAccessibilityCodeGuide() {
  const [propertyType, setPropertyType] = useState('');
  const [constructionYear, setConstructionYear] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [result, setResult] = useState<{ violations: string[]; retrofitCost: string; priorities: string[] } | null>(null);

  function generate() {
    if (!propertyType || !constructionYear || !propertySize) return;
    const era = constructionYear === 'pre1990' ? 'pre1990' : 'post1990';
    setResult(ADA_DATA[propertyType]?.[era]?.[propertySize] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#F5E642', padding: '40px 24px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>♿</div>
        <h1 style={{ color: '#0A1628', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW ADA Accessibility Code Guide</h1>
        <p style={{ color: '#0A1628', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>When ADA applies, common DFW violations, Texas Accessibility Standards, and your estimated retrofit cost.</p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📋 When ADA Applies in Texas</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🏢 Commercial', 'All places of public accommodation — retail, office, restaurants, hotels'], ['🏗️ New Construction', 'All commercial & multi-family built after 1/26/1993 must be fully compliant'], ['🔧 Renovation', 'Any alteration triggers path of travel requirements in affected area'], ['🏘️ Multi-Family', 'FHA applies to buildings with 4+ units built after 3/13/1991'], ['⚖️ Texas TAS', 'Texas Accessibility Standards (TAS) may be stricter than ADA in some areas'], ['💻 Digital', 'Website accessibility (WCAG 2.1) increasingly enforced in Texas']].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>⚠️ Most Common DFW ADA Violations</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['🅿️ Parking', 'Wrong van accessible space ratio, improper slope (must be <2%), missing signage'], ['🚪 Entry Doors', 'Clear width under 32", excessive opening force (>5 lbs interior), round knobs'], ['🛗 Ramps', 'Slope exceeds 1:12, no level landing at top/bottom, no handrails both sides'], ['🚻 Restrooms', 'Missing grab bars, non-compliant turning radius, paper towel dispenser height'], ['🏊 Pools', 'Pool lift required since 2013 — commonly missing in DFW multifamily']].map(([icon, title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', gap: 12 }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div><div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{title}</div><div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, marginTop: 20 }}>
          <h2 style={{ color: '#0A1628', fontSize: 20, marginBottom: 20 }}>🔍 Check Your ADA Exposure</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Property Type</label>
              <select value={propertyType} onChange={e => setPropertyType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select</option>
                <option value="commercial">Commercial</option>
                <option value="multifamily">Multi-Family</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Construction Year</label>
              <select value={constructionYear} onChange={e => setConstructionYear(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select</option>
                <option value="pre1990">Before 1990</option>
                <option value="post1990">1990 or Later</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#0A1628', fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>Property Size</label>
              <select value={propertySize} onChange={e => setPropertySize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select</option>
                <option value="small">Small (&lt;5,000 sqft / &lt;20 units)</option>
                <option value="large">Large (5,000+ sqft / 20+ units)</option>
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>Run ADA Compliance Check →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#fff', borderRadius: 8, padding: 20 }}>
              <div style={{ color: '#DC2626', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>⚠️ Common Violations for This Profile:</div>
              {result.violations.map((v, i) => <div key={i} style={{ color: '#374151', fontSize: 13, padding: '3px 0' }}>• {v}</div>)}
              <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 15, margin: '16px 0 4px' }}>Estimated Retrofit Cost: {result.retrofitCost}</div>
              <div style={{ color: '#374151', fontWeight: 700, marginBottom: 8, marginTop: 12 }}>✅ Priority Fixes:</div>
              {result.priorities.map((p, i) => <div key={i} style={{ color: '#374151', fontSize: 13, padding: '3px 0' }}>{i + 1}. {p}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginTop: 20, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 18, marginBottom: 8 }}>♿ Find ADA Retrofit Contractors in DFW</h3>
          <p style={{ color: '#0A1628', fontSize: 14, marginBottom: 16 }}>ProLnk connects DFW property owners with contractors specializing in ADA compliance retrofits and TAS-compliant construction.</p>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700 }}>Find ADA Contractors →</a>
        </div>
      </div>
    </div>
  );
}
