import { useState } from 'react';

const decades = [
  { label: '1960s Home', tips: ['Cast iron plumbing may be corroding — inspect drains', 'Original electrical panels often undersized for modern loads', 'Asbestos possible in floor tiles and insulation', 'Single-pane windows losing efficiency fast', 'Foundation pier issues common on clay-heavy Forest Hill soil'] },
  { label: '1970s Home', tips: ['Polybutylene pipe risk — check for gray plastic supply lines', 'Aluminum wiring era — have licensed electrician inspect', 'Attic insulation likely R-11 or less, upgrade to R-38', 'HVAC system at or past 20-year lifespan', 'Check slab for movement — Tarrant County clay shifts seasonally'] },
  { label: '1980s Home', tips: ['Copper plumbing is good but check for pinhole leaks', 'Roof likely needs replacement — 25-40 year shingles aging', 'Garage door openers pre-2000 lack safety reversal', 'Check for Chinese drywall if renovated 2006-2009', 'HVAC efficiency below modern standards — consider upgrade'] },
  { label: '1990s Home', tips: ['Wood-framed construction — inspect for termite damage', 'Roof shingles entering 30-year window', 'Windows may be dual-pane but seals could be failing', 'Water heater likely due for replacement', 'Check exterior wood trim for rot near ground level'] },
];

export default function DFWForestHillHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Forest Hill TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>South Tarrant County · Working-Class Community · Affordable DFW Entry Point</p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 About Forest Hill</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
            Forest Hill is a small city of ~13,000 tucked between Fort Worth and Everman in south Tarrant County.
            Homes here were largely built between the 1960s and 1990s, offering some of the most affordable entry
            points in the DFW market. The area has strong working-class roots and a tight-knit community feel.
          </p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Select Your Home Decade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {decades.map((d, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ padding: '12px', borderRadius: 8, border: '2px solid',
                  borderColor: selected === i ? '#F5E642' : '#1e3a5f',
                  backgroundColor: selected === i ? '#1a2f4a' : 'transparent',
                  color: selected === i ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {d.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e35', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>✅ {decades[selected].label} Maintenance Priorities</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {decades[selected].tips.map((tip, j) => (
                  <li key={j} style={{ color: '#cbd5e1', marginBottom: 10, lineHeight: 1.6, fontSize: 15 }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⚠️ Forest Hill-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🌧️ Drainage: Low-lying lots flood near Sycamore Creek', '🔥 Heat: Extreme summer heat stresses older HVAC systems', '🐜 Pests: Termite activity high in older wood-frame homes', '💧 Water: City water quality varies — test annually'].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f1e35', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk · Connecting Forest Hill Homeowners with Trusted Pros · 2026</p>
        </div>
      </div>
    </div>
  );
}
