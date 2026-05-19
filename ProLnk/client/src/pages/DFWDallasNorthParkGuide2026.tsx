import { useState } from 'react';

const propertyTypes = [
  { id: 'apartment', label: '🏢 1960s–1980s Apartment', tips: ['Renter insurance is mandatory — fire, theft, and liability coverage minimum $100K', 'Check window A/C unit seals and drainage — leaks cause mold in older wall cavities', 'Balcony railings in older buildings: report wobbling or rust to management immediately', 'Know your building\’s water shutoff location — critical in leak emergencies', 'Document unit condition with photos at move-in and move-out to protect deposits'] },
  { id: 'sfh', label: '🏠 Single-Family Home', tips: ['Vickery Meadow clay soil: water foundation perimeter in summer to prevent shrinkage cracking', 'Roof inspections after each storm — DFW hail season peaks April–June', 'HVAC filter replacement every 45 days in high-dust urban areas like Vickery Meadow', 'Security: reinforce door frames and deadbolts; consider smart lock for front entry', 'Check for mold in bathrooms and under sinks annually — older homes have less ventilation'] },
  { id: 'duplex', label: '🏘️ Duplex / Small Multifamily', tips: ['Shared utility meters: install sub-meters to identify tenant consumption separately', 'Landlord responsibilities: habitability, heating, plumbing — document all maintenance', 'Roof condition affects both units equally — annual inspection splits cost risk fairly', 'Exterior paint and trim: budget 5-year repaint cycle to maintain curb appeal and value', 'Turnover prep checklist: HVAC filter, smoke detectors, drip pans, lock re-key every vacancy'] },
];

export default function DFWDallasNorthParkGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 1 }}>
          PROLNK · DFW LOCAL GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🛍️ Dallas North Park / Vickery Meadow
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          One of Dallas's most diverse neighborhoods — a dense mix of apartments, duplexes,
          and single-family homes near NorthPark Center. Affordable entry point for buyers,
          high rental demand. Maintenance needs vary widely by property type.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>📍 Area Snapshot</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            ZIP codes 75231, 75243 · Vickery Meadow Planning District active since 1990s ·
            NorthPark Center retail corridor · DART bus network hub ·
            Multicultural commercial strips on Greenville Ave and Park Lane ·
            High renter concentration — ~70% of housing units
          </div>
        </div>

        <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
          Select your property type for a tailored guide:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {propertyTypes.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{
                background: selected === p.id ? '#F5E642' : '#0f2040',
                color: selected === p.id ? '#0A1628' : '#fff',
                border: '1px solid ' + (selected === p.id ? '#F5E642' : '#1e3a5f'),
                borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>
              {active.label} — 2026 Priorities
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>🔒 North Park Area Safety Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Motion-activated exterior lighting reduces break-in risk by up to 60%. Smart doorbell
            cameras (Ring, Nest) are particularly effective in denser neighborhoods. Coordinate
            with neighbors for overlapping coverage zones.
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '1rem' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, marginBottom: '0.3rem' }}>Connect with North Park / Vickery pros</div>
          <div style={{ color: '#0A1628', fontSize: '0.85rem' }}>HVAC, electrical, and security specialists serving 75231 &amp; 75243 on ProLnk</div>
        </div>
      </div>
    </div>
  );
}