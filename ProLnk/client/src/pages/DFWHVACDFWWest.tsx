import { useState } from 'react';

const suburbs = [
  {
    name: 'Fort Worth',
    utility: 'Oncor',
    waitTime: '3–5 days',
    commonSystem: '4-ton split system',
    avgAge: '12 years',
    notes: 'Dense urban core, many older homes with original ductwork. Oncor territory with standard TDU rates.',
  },
  {
    name: 'Weatherford',
    utility: 'Oncor / Tri-County Electric',
    waitTime: '5–8 days',
    commonSystem: '3.5-ton split system',
    avgAge: '10 years',
    notes: 'Semi-rural. Some areas served by Tri-County co-op — verify before scheduling. Longer wait due to contractor distance.',
  },
  {
    name: 'Granbury',
    utility: 'Tri-County Electric Coop',
    waitTime: '7–12 days',
    commonSystem: '3-ton split system',
    avgAge: '14 years',
    notes: 'Rural co-op territory. Fewer contractors service this area. Plan ahead for summer emergencies.',
  },
  {
    name: 'Aledo',
    utility: 'Oncor',
    waitTime: '4–6 days',
    commonSystem: '4-ton split system',
    avgAge: '8 years',
    notes: 'Growing suburb with newer construction. Mostly Oncor. Better contractor availability than deeper rural areas.',
  },
  {
    name: 'Azle',
    utility: 'Oncor / CoServ',
    waitTime: '5–7 days',
    commonSystem: '3.5-ton split system',
    avgAge: '11 years',
    notes: 'Mixed utility territory. Confirm your provider before requesting service. Moderate wait times.',
  },
];

export default function DFWHVACDFWWest() {
  const [selected, setSelected] = useState<string | null>(null);

  const profile = suburbs.find((s) => s.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🏠 DFW HVAC Guide — West Suburbs</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>West DFW HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Fort Worth, Weatherford, Granbury, and surrounding areas have different utility providers and longer
          contractor wait times than central DFW. Know your provider before calling for service.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚡ Key West DFW Differences</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🔌', label: 'Multiple Utility Providers', desc: 'Oncor, Tri-County, CoServ — varies by address' },
              { icon: '⏱️', label: 'Longer Wait Times', desc: 'Rural areas see 7–12 day wait vs 2–3 in central DFW' },
              { icon: '🏡', label: 'Mixed Housing Stock', desc: 'Older Fort Worth homes to new Aledo builds' },
            ].map((item) => (
              <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>
          🗺️ Select Your Suburb
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
          {suburbs.map((s) => (
            <button
              key={s.name}
              onClick={() => setSelected(s.name)}
              style={{
                padding: '0.6rem 1.2rem',
                borderRadius: 8,
                border: `2px solid ${selected === s.name ? '#F5E642' : '#1e3a5f'}`,
                background: selected === s.name ? '#F5E642′ : '#0F2040',
                color: selected === s.name ? '#0A1628′ : '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>

        {profile && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', fontSize: '1.3rem', marginBottom: '1rem' }}>📍 {profile.name} HVAC Profile</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { label: 'Utility Provider', value: profile.utility },
                { label: 'Contractor Wait', value: profile.waitTime },
                { label: 'Common System', value: profile.commonSystem },
                { label: 'Avg System Age', value: profile.avgAge },
              ].map((item) => (
                <div key={item.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '0.85rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642′ }}>{item.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1a2f50', borderRadius: 8, padding: '1rem', color: '#cbd5e1′ }}>
              💡 {profile.notes}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🛠️ Pro Tips for West DFW</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Call for service in April or October — avoid summer emergency rates</li>
            <li>Verify your utility provider at powertochoose.org before requesting bids</li>
            <li>Rural co-op customers may need propane backup — confirm with installer</li>
            <li>System sizing: larger lots and older ductwork often need upsizing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
