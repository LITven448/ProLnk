import { useState } from 'react';

const cities = [
  { city: 'Dallas', required: true, cost: '$75-150', time: '1-3 days', inspection: 'Mechanical inspector checks refrigerant lines, electrical disconnect, ductwork connections, and equipment nameplate.' },
  { city: 'Fort Worth', required: true, cost: '$80-160', time: '2-4 days', inspection: 'City inspector verifies equipment sizing, refrigerant handling certification, and proper disconnect installation.' },
  { city: 'Plano', required: true, cost: '$70-130', time: '1-2 days', inspection: 'Mechanical inspection required within 30 days of installation. Inspector checks all connections and load calculation.' },
  { city: 'Frisco', required: true, cost: '$90-170', time: '2-3 days', inspection: 'Inspector verifies SEER2 compliance, refrigerant type, disconnect placement, and drain line routing.' },
  { city: 'McKinney', required: true, cost: '$85-155', time: '1-3 days', inspection: 'Mechanical permit required. Inspector checks refrigerant certification, duct connections, and equipment pad.' },
  { city: 'Allen', required: true, cost: '$65-120', time: '1-2 days', inspection: 'Residential mechanical permit covers equipment and duct modifications. Inspection within 14 days.' },
  { city: 'Richardson', required: true, cost: '$70-135', time: '1-3 days', inspection: 'City requires permit for any HVAC replacement. Inspector checks equipment placement and electrical.' },
  { city: 'Garland', required: true, cost: '$60-120', time: '2-4 days', inspection: 'Permit required for all residential mechanical replacements. 24-hour inspection scheduling.' },
  { city: 'Irving', required: true, cost: '$75-145', time: '2-3 days', inspection: 'Mechanical permit required. Inspector verifies equipment and refrigerant handling compliance.' },
  { city: 'Arlington', required: true, cost: '$80-150', time: '2-4 days', inspection: 'City of Arlington requires permit + inspection for all HVAC replacements, including like-for-like.' },
  { city: 'Denton', required: true, cost: '$70-130', time: '1-3 days', inspection: 'Mechanical permit and inspection required for all residential HVAC work.' },
  { city: 'Lewisville', required: true, cost: '$65-125', time: '1-2 days', inspection: 'Permit and inspection required. Inspector checks all connections and SEER2 rating compliance.' },
];

const dfwCities = cities.map(c => c.city);

const resaleRisks = [
  'Title company may flag unpermitted HVAC during closing — can delay or kill sale',
  "Buyer's inspector discovers no permit — gives buyer negotiating leverage or exit right",
  'Homeowner insurance may deny HVAC-related claims if work was unpermitted',
  'If home burns and fire is traced to HVAC, unpermitted work complicates liability',
];

export default function DFWHVACInstallationPermit() {
  const [selectedCity, setSelectedCity] = useState('');
  const cityData = cities.find(c => c.city === selectedCity);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Installation Permits in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12 }}>Every city in the DFW metroplex requires a permit for HVAC replacement — including like-for-like swaps. Skipping this step creates serious resale and liability risks.</p>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 10, padding: '14px 20px', marginBottom: 32 }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>✅ Rule: </span>
          <span style={{ color: '#e2e8f0′ }}>All DFW cities require permits. Any contractor who says otherwise is cutting corners. Always verify the permit was pulled before work begins.</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 40 }}>
          {cities.slice(0, 8).map(c => (
            <div key={c.city} style={{ background: '#0f1f3d', borderRadius: 10, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 600 }}>{c.city}</div>
              <div style={{ color: '#22c55e', fontSize: 13 }}>✅ Permit required</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>{c.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏙️ Look Up Your DFW City</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>Select Your DFW City</label>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value=''>Select city...</option>
              {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {cityData && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>📋 {cityData.city} Permit Requirements</div>
              <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Permit required: </span><span style={{ color: '#22c55e' }}>✅ Yes — all HVAC replacements</span></div>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Permit cost: </span><span style={{ color: '#fff' }}>{cityData.cost}</span></div>
                <div><span style={{ color: '#94a3b8', fontSize: 13 }}>Typical approval time: </span><span style={{ color: '#fff' }}>{cityData.time}</span></div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, paddingTop: 12, borderTop: '1px solid #1e3a5f' }}>
                <div style={{ color: '#e2e8f0', marginBottom: 4 }}>What the inspector checks:</div>
                {cityData.inspection}
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🏠 Resale Risks of Unpermitted HVAC in DFW</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 32 }}>
          {resaleRisks.map((r, i) => (
            <div key={i} style={{ background: '#0f1f3d', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#ef4444', fontSize: 18, flexShrink: 0 }}>⚠️</span>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{r}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Find a Licensed DFW HVAC Contractor Who Pulls Permits</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>All ProLnk-matched contractors are licensed and permit-compliant in your DFW city.</div>
        </div>
      </div>
    </div>
  );
}
