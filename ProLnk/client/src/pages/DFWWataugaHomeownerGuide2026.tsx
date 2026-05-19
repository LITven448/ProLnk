import { useState } from 'react';

const decades = [
  { label: '1970s Home', tips: ['Polybutylene plumbing — look for gray pipe under sinks', 'Aluminum wiring possible — inspect panel and outlets', 'Attic insulation minimal — upgrade to R-38 for DFW heat', 'HVAC system past expected life — plan replacement', 'Check foundation for pier issues on north Tarrant clay'] },
  { label: '1980s Home', tips: ['Copper plumbing aging — inspect for pinhole leaks', 'Roof shingles 40+ years — likely overdue for replacement', 'Check drainage away from foundation — critical near Lake Worth', 'Inspect wood fence posts for rot at ground level', 'Water heater exceeding 12-year lifespan — replace soon'] },
  { label: '1990s Home', tips: ['Wood-frame construction — inspect for termite damage annually', 'Dual-pane windows may have failed seals', 'Roof at 30-35 year mark — get professional inspection', 'Check attic ventilation — ridge and soffit vents working?', 'Garage door safety reverse function — test monthly'] },
  { label: '2000s Home', tips: ['HVAC system entering end-of-life range', 'Check for ice dam or attic moisture issues after storms', 'Water heater likely needs replacement', 'Inspect deck ledger board connection to house', 'Verify smoke and CO detectors are current generation'] },
];

export default function DFWWataugaHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Watauga TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>North Tarrant County · Established Neighborhoods · Lake Worth Proximity</p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 About Watauga</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
            Watauga sits in north Tarrant County between Haltom City and Keller, offering an affordable
            alternative with an established neighborhood feel. Most homes were built from the 1970s through
            the 1990s. The proximity to Lake Worth adds unique moisture and drainage considerations for
            homeowners in lower-elevation sections.
          </p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Select Your Home Decade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {decades.map((d, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ padding: '12px', borderRadius: 8, border: '2px solid',
                  borderColor: selected === i ? '#F5E642′ : '#1e3a5f',
                  backgroundColor: selected === i ? '#1a2f4a' : 'transparent',
                  color: selected === i ? '#F5E642′ : '#94a3b8', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
                {d.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e35', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>✅ {decades[selected].label} Watauga Maintenance Guide</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {decades[selected].tips.map((tip, j) => (
                  <li key={j} style={{ color: '#cbd5e1', marginBottom: 10, lineHeight: 1.6, fontSize: 15 }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⚠️ Watauga-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['💧 Lake Proximity: Higher humidity — watch for mold in crawlspaces', '🌧️ Drainage: Clay soil expands — grade away from foundation', '🌬️ Wind: North Tarrant storms — check roof flashing annually', '🐜 Pests: Moisture attracts termites and carpenter ants'].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f1e35', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk · Connecting Watauga Homeowners with Trusted Pros · 2026</p>
        </div>
      </div>
    </div>
  );
}
