import { useState } from 'react';

const ageGroups = [
  { label: '1960s Home', tips: ['Original cast iron drains corroding — camera inspect main line', 'Knob-and-tube or early panel wiring possible', 'Asbestos floor tiles and pipe insulation — do not disturb', 'Foundation may need pier underpinning on expansive clay', 'Single-pane aluminum windows — replace for energy savings'] },
  { label: '1970s Home', tips: ['Polybutylene plumbing era — look for gray supply lines', 'Aluminum wiring common — needs anti-oxidant and pigtails', 'Attic insulation typically R-11 or less', 'HVAC likely 20+ years old — budget for replacement', 'Check brick veneer for mortar joint deterioration'] },
  { label: '1980s Home', tips: ['Copper plumbing solid — check for pinhole leaks at joints', 'Roof at 35-45 year mark — full replacement likely needed', 'Inspect for tree root intrusion in older sewer lines', 'Check exterior caulking around windows and doors', 'Water heater over 12 years — replace proactively'] },
  { label: 'Post-1990 Home', tips: ['Newer construction but check for drainage issues', 'Window seals may be fogging — indicates failed dual-pane', 'Test GFCI outlets in kitchens and bathrooms', 'Inspect wood deck or patio for rot and ledger connection', 'Ensure attic ventilation is adequate for DFW summers'] },
];

export default function DFWEvermanHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Everman TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Tarrant County Enclave · Affordable Older Homes · Close to South Fort Worth</p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 About Everman</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
            Everman is one of Tarrant County's smallest cities with fewer than 7,000 residents, forming a tiny
            enclave surrounded by Fort Worth and Forest Hill. Most homes were built in the 1960s through 1980s,
            making it a genuinely affordable option in the DFW area with a close-knit neighborhood character.
          </p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Select Your Home Age</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {ageGroups.map((a, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ padding: '12px', borderRadius: 8, border: '2px solid',
                  borderColor: selected === i ? '#F5E642' : '#1e3a5f',
                  backgroundColor: selected === i ? '#1a2f4a' : 'transparent',
                  color: selected === i ? '#F5E642' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {a.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e35', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>✅ {ageGroups[selected].label} Everman Maintenance Guide</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {ageGroups[selected].tips.map((tip, j) => (
                  <li key={j} style={{ color: '#cbd5e1', marginBottom: 10, lineHeight: 1.6, fontSize: 15 }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⚠️ Everman-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🌡️ Heat Island: Dense neighborhood traps heat — insulate well', '🐛 Termites: Older wood construction at high risk', '🌊 Flooding: Some areas in FEMA flood zones — verify coverage', '🔌 Electrical: Pre-1980 homes may need panel upgrades'].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f1e35', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk · Connecting Everman Homeowners with Trusted Pros · 2026</p>
        </div>
      </div>
    </div>
  );
}
