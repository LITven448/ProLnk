import { useState } from 'react';

const decades = [
  { label: '1970s Home', tips: ['Polybutylene water lines — inspect under sinks and in utility areas', 'Aluminum wiring in some homes — needs licensed inspection', 'Attic insulation likely insufficient — upgrade to R-38', 'Check foundation slab for cracking on expansive soil', 'HVAC system at or past 20-year expected life'] },
  { label: '1980s Home', tips: ['Copper plumbing aging — inspect fittings for corrosion', 'Roof now 40+ years — full replacement almost certainly needed', 'Water heater past 12-15 year window', 'Check exterior caulking around windows for seal failure', 'Inspect garage slab for settlement'] },
  { label: '1990s Home', tips: ['Wood-frame construction — annual termite inspection critical', 'Dual-pane windows may have broken seals — look for fogging', 'Roof entering 30+ year range — professional inspection recommended', 'Ensure attic ridge and soffit ventilation is clear', 'Test GFCI breakers in bathrooms and garage'] },
  { label: '2000s+ Home', tips: ['HVAC system approaching end-of-life territory', 'Check for ice damming signs in attic after storms', 'Inspect wood decks for ledger board connection issues', 'Verify smoke and CO detectors are still operational', 'Review drainage grading — clay soil settles over time'] },
];

export default function DFWRichlandHillsHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌳</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Richland Hills TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Tarrant County · Quiet Established Suburb · Between Hurst and NRH</p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 About Richland Hills</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
            Richland Hills is a small, quiet Tarrant County city wedged between Hurst to the south and North
            Richland Hills to the north. With a population around 8,000 and most homes built between the 1970s
            and 1990s, it offers an established suburban character at affordable price points. The Tarrant
            County clay soil is a consistent concern for local homeowners.
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
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>✅ {decades[selected].label} Richland Hills Maintenance Guide</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {decades[selected].tips.map((tip, j) => (
                  <li key={j} style={{ color: '#cbd5e1', marginBottom: 10, lineHeight: 1.6, fontSize: 15 }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⚠️ Richland Hills-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🌿 Trees: Mature oak and elm roots invade older sewer lines', '🌍 Soil: Tarrant clay shifts seasonally — monitor foundation', '🌪️ Hail: Mid-Cities gets severe spring storms — check roof yearly', '💧 Water Pressure: Aging city mains cause surges — add regulator'].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f1e35', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk · Connecting Richland Hills Homeowners with Trusted Pros · 2026</p>
        </div>
      </div>
    </div>
  );
}
