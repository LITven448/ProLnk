import { useState } from 'react';

const eras = [
  { label: '1950s Era', tips: ['Galvanized steel pipes corroding — replace with copper or PEX', 'Fuse box electrical panels — upgrade to circuit breakers', 'Asbestos insulation and floor tiles — professional abatement', 'Foundation may be pier-and-beam — inspect annually', 'Original single-pane steel windows — replace for efficiency'] },
  { label: '1960s Era', tips: ['Early copper plumbing may have lead solder joints', 'Electrical panel capacity likely 100A — modern needs 200A', 'Check chimney flashing and mortar — common failure point', 'HVAC system well past expected lifespan', 'Clay sewer lines may be cracked — camera inspect'] },
  { label: '1970s Era', tips: ['Polybutylene supply lines — locate and replace proactively', 'Aluminum branch wiring — add AFCI breakers or pigtail copper', 'Industrial corridor means air quality concerns — seal gaps', 'Asphalt driveway cracking — reseal every 3-5 years', 'Attic insulation below code — upgrade for energy savings'] },
  { label: '1980s Era', tips: ['Roof at 40+ years — replacement overdue in most cases', 'Inspect brick mortar — Tarrant clay movement is hard on masonry', 'HVAC refrigerant may be R-22 — discontinued, plan upgrade', 'Check garage slab for settlement near Loop 820', 'Water heater past 12-year mark — replace soon'] },
];

export default function DFWHaltomCityHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🔩</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 6px' }}>Haltom City TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>North Tarrant County · Industrial-Residential Mix · Affordable Older Homes</p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📍 About Haltom City</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: 15 }}>
            Haltom City blends residential neighborhoods with a strong industrial character, especially along
            the Loop 820 commercial corridor. Homes range from 1950s bungalows to 1980s ranch-styles, offering
            some of the most affordable housing in north Tarrant County. The industrial mix means homeowners
            should pay special attention to air quality sealing and HVAC filtration.
          </p>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Select Your Home Era</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {eras.map((e, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ padding: '12px', borderRadius: 8, border: '2px solid',
                  borderColor: selected === i ? '#F5E642′ : '#1e3a5f',
                  backgroundColor: selected === i ? '#1a2f4a' : 'transparent',
                  color: selected === i ? '#F5E642′ : '#94a3b8', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
                {e.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ backgroundColor: '#0f1e35', borderRadius: 10, padding: 20 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 16 }}>✅ {eras[selected].label} Haltom City Maintenance Priorities</h3>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {eras[selected].tips.map((tip, j) => (
                  <li key={j} style={{ color: '#cbd5e1', marginBottom: 10, lineHeight: 1.6, fontSize: 15 }}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⚠️ Haltom City-Specific Risks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🏭 Air Quality: Industrial neighbors — HEPA filters and seal gaps', '🌊 Flooding: Trinity River tributary zones — verify flood insurance', '🚛 Vibration: Heavy truck traffic on 820 stresses foundations', '🌡️ Heat: Dark industrial surfaces raise local temps'].map((r, i) => (
              <div key={i} style={{ backgroundColor: '#0f1e35', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#475569', fontSize: 13 }}>ProLnk · Connecting Haltom City Homeowners with Trusted Pros · 2026</p>
        </div>
      </div>
    </div>
  );
}
