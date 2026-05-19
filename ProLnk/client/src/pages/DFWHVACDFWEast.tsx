import { useState } from 'react';

const suburbs = [
  {
    name: 'Rockwall',
    lakeEffect: 'High — Lake Ray Hubbard proximity',
    humidity: 'Higher than inland DFW',
    housingMix: 'Newer lakeside communities, some older inland',
    commonSystem: '4-ton dehumidifying system',
    avgAge: '9 years',
    notes: 'Lake Ray Hubbard raises local humidity significantly. Systems should include dehumidification capability. Corrosion on outdoor units accelerates near water.',
  },
  {
    name: 'Forney',
    lakeEffect: 'Moderate — inland from lake',
    humidity: 'Slightly elevated',
    housingMix: 'Rapid new construction 2015–present',
    commonSystem: '3.5-ton split system',
    avgAge: '6 years',
    notes: 'One of fastest-growing cities in TX. Builder-installed systems are mostly modern but vary widely by subdivision.',
  },
  {
    name: 'Terrell',
    lakeEffect: 'Low — farther east',
    humidity: 'Standard East Texas edge',
    housingMix: 'Older rural and small-town stock',
    commonSystem: '3-ton split system',
    avgAge: '15 years',
    notes: 'Further east into Kaufman County. Older housing means higher replacement demand. Fewer contractors service this far out.',
  },
  {
    name: 'Rowlett',
    lakeEffect: 'High — direct lake access',
    humidity: 'High, especially summers',
    housingMix: '1980s–2000s established neighborhoods',
    commonSystem: '4-ton system with dehumidifier',
    avgAge: '14 years',
    notes: 'Established lakeside city. High humidity + aging systems = prime replacement territory. Ensure drain pans and condensate lines are inspected.',
  },
  {
    name: 'Garland',
    lakeEffect: 'Moderate — partial lake influence',
    humidity: 'Moderate to high',
    housingMix: '1970s–1990s dense suburban',
    commonSystem: '3.5-ton split system',
    avgAge: '17 years',
    notes: 'Older housing stock throughout. Many systems are at or past end of life. Strong market for replacements and ductwork overhauls.',
  },
];

export default function DFWHVACDFWEast() {
  const [selected, setSelected] = useState<string | null>(null);

  const profile = suburbs.find((s) => s.name === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>🏠 DFW HVAC Guide — East Suburbs</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>East DFW HVAC Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          Forney, Terrell, Rockwall, Rowlett, and east DFW suburbs are shaped by Lake Ray Hubbard proximity.
          Higher humidity near the lake accelerates corrosion and increases dehumidification needs.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>💧 Lake Effect HVAC Considerations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '💧', label: 'Higher Humidity', desc: 'Lake Ray Hubbard raises local humidity — dehumidification matters' },
              { icon: '🔩', label: 'Accelerated Corrosion', desc: 'Outdoor condenser units near water corrode faster — inspect annually' },
              { icon: '🏘️', label: 'Mixed Eras', desc: 'Rockwall/Rowlett older vs Forney brand new — vary by address' },
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
                { label: 'Lake Effect', value: profile.lakeEffect },
                { label: 'Humidity Level', value: profile.humidity },
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
              💧 {profile.notes}
            </div>
          </div>
        )}

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🛠️ East DFW HVAC Tips</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Request dehumidifier integration if within 5 miles of Lake Ray Hubbard</li>
            <li>Inspect outdoor condenser coils annually — corrosion near water is real</li>
            <li>Condensate drain lines need quarterly flushing in high-humidity zones</li>
            <li>Terrell and far-east areas: book HVAC service in early spring — contractor wait is long</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
