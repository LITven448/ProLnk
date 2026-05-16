import { useState } from 'react';

const homeAges = ['Built 2000+', 'Built 1985–2000', 'Built 1970–1985', 'Built before 1970'];
const serviceTypes = ['Leak / Repair', 'Water Heater', 'Whole-Home Repiping', 'Drain & Sewer', 'Luxury Fixture Install'];

type ServiceResult = { tier: string; details: string; cost: string };

const results: Record<string, Record<string, ServiceResult>> = {
  'Built 2000+': {
    'Leak / Repair': { tier: '✅ Standard Premium Service', details: 'PEX or copper systems — straightforward diagnosis. Southlake contractors use video leak detection on first visit.', cost: '$250 – $600' },
    'Water Heater': { tier: '✅ Standard Premium Service', details: 'Tankless or high-capacity tank replacement. Southlake norm: 75–100 gal or on-demand tankless.', cost: '$1,800 – $4,500' },
    'Whole-Home Repiping': { tier: '🔵 Rare at This Age', details: 'Unlikely needed. If insurance-driven, expect full PEX replacement with 3-day access.', cost: '$8,000 – $14,000' },
    'Drain & Sewer': { tier: '✅ Standard Service', details: 'Hydro-jet cleaning standard. Camera inspection recommended annually on large lots.', cost: '$350 – $900' },
    'Luxury Fixture Install': { tier: '💎 White-Glove Service', details: 'Kohler, Grohe, Brizo installations. Southlake pros handle designer fixtures without voiding warranties.', cost: '$400 – $1,500/fixture' },
  },
  'Built 1985–2000': {
    'Leak / Repair': { tier: '🟡 Moderate Risk', details: 'CPVC or copper systems — some early CPVC may be brittle. Southlake pros inspect fittings on every repair.', cost: '$300 – $800' },
    'Water Heater': { tier: '🟡 Upgrade Recommended', details: 'If original water heater, replace immediately. Tankless upgrade adds value in Southlake resale.', cost: '$2,000 – $5,000' },
    'Whole-Home Repiping': { tier: '🟡 Evaluation Needed', details: 'CPVC systems from this era often need full replacement. Get inspection before listing or renovating.', cost: '$10,000 – $18,000' },
    'Drain & Sewer': { tier: '🟡 Camera Inspection First', details: 'Cast iron drain lines may be corroding. Camera inspection before hydro-jetting is essential.', cost: '$500 – $1,200' },
    'Luxury Fixture Install': { tier: '💎 White-Glove Service', details: 'May need supply line upgrades to handle high-flow fixtures. Factor $150–$300 per fixture for line work.', cost: '$550 – $1,800/fixture' },
  },
  'Built 1970–1985': {
    'Leak / Repair': { tier: '🔴 High Risk System', details: 'Possible galvanized steel pipes. Corrosion-related leaks compound quickly — inspect full run on every repair.', cost: '$400 – $1,200' },
    'Water Heater': { tier: '🔴 Replace Immediately if Original', details: 'Sediment buildup in old lines affects new heater life. Full flush and anode rod check required.', cost: '$2,200 – $5,500' },
    'Whole-Home Repiping': { tier: '🔴 Strongly Recommended', details: 'Galvanized pipes at this age are corroding internally. Full PEX repipe protects home value.', cost: '$14,000 – $22,000' },
    'Drain & Sewer': { tier: '🔴 Priority Inspection', details: 'Cast iron drain lines from this era routinely crack. Camera + hydro-jet + possible liner or excavation.', cost: '$800 – $3,500' },
    'Luxury Fixture Install': { tier: '💎 Prep Work Required', details: 'Supply lines must be updated before premium fixtures. Bundle with repipe for best value.', cost: '$700 – $2,500/fixture' },
  },
  'Built before 1970': {
    'Leak / Repair': { tier: '🚨 Emergency Priority', details: 'Galvanized or lead-era supply lines. Any leak is a signal of widespread system failure. Full inspection mandatory.', cost: '$600 – $2,000+' },
    'Water Heater': { tier: '🚨 Full System Evaluation', details: 'Old supply lines will contaminate a new heater fast. Repipe is often the right first step.', cost: '$2,500 – $6,000' },
    'Whole-Home Repiping': { tier: '🚨 Do Not Delay', details: 'Pre-1970 Southlake homes with original plumbing face imminent failure risk. PEX repipe is urgent.', cost: '$16,000 – $28,000' },
    'Drain & Sewer': { tier: '🚨 Root Intrusion Likely', details: 'Mature trees + old clay or cast iron drains = recurring blockage. Full sewer line assessment needed.', cost: '$1,200 – $6,000' },
    'Luxury Fixture Install': { tier: '💎 Full Plumbing First', details: 'Modernize plumbing before investing in luxury fixtures. Southlake pros can phase the work strategically.', cost: 'Quote after repipe' },
  },
};

export default function DFWPlumberSouthlake() {
  const [age, setAge] = useState('');
  const [service, setService] = useState('');

  const result = age && service ? results[age]?.[service] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          🔧 ProLnk · Southlake TX
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>Southlake TX Plumbers</h1>
        <p style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Luxury Home Specialists</p>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 40, maxWidth: 640 }}>
          Southlake is one of the wealthiest zip codes in Texas. Homes here demand plumbers with luxury fixture experience, Kohler and Grohe familiarity, and the professionalism to work in high-end environments without shortcuts.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {[
            ['💎', 'Luxury Fixture Expertise', 'Southlake pros handle Kohler, Brizo, and Grohe installations without voiding designer warranties.'],
            ['🏠', 'Large Home Complexity', 'Multiple bathrooms, outdoor kitchens, and pool houses require coordinated plumbing expertise.'],
            ['📋', 'Carrier Wave District', 'Near the Southlake Town Square corridor — some commercial plumbing experience required for mixed-use properties.'],
            ['🔍', 'Inspection-Grade Work', 'Southlake homes transact at high prices. Plumbing must pass rigorous buyer inspections.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111e35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🏠 Southlake Plumbing Estimator</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>When was your home built?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeAges.map(a => (
                <button key={a} onClick={() => setAge(a)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642' : '#1e3a5f', backgroundColor: age === a ? '#F5E642' : 'transparent', color: age === a ? '#0A1628' : '#fff', fontWeight: age === a ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{a}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Service needed?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {serviceTypes.map(s => (
                <button key={s} onClick={() => setService(s)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: service === s ? '#F5E642' : '#1e3a5f', backgroundColor: service === s ? '#F5E642' : 'transparent', color: service === s ? '#0A1628' : '#fff', fontWeight: service === s ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{result.tier}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 16, fontSize: 14 }}>{result.details}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>Southlake Market Estimate</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.cost}</div>
                </div>
                <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15 }}>Get Luxury Quotes →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          ProLnk only connects Southlake homeowners with fully licensed, luxury-experienced plumbers.
        </div>
      </div>
    </div>
  );
}
