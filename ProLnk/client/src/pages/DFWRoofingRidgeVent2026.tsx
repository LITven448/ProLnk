import { useState } from 'react';

const SITUATIONS = [
  { id: 'no-ridge-vent', label: 'No ridge vent currently', emoji: '🚫', guide: 'Add shingle-over ridge vent during next re-roof. Ensure soffit vents are open first — ridge vent without intake airflow creates negative pressure and draws humid air into attic.' },
  { id: 'blocked', label: 'Ridge vent may be blocked', emoji: '🧱', guide: 'Most common mistake: blown-in insulation blocks soffit or ridge vent from inside. Go into attic and verify airflow path is clear end-to-end. Never insulate over soffit vents.' },
  { id: 'hail-damage', label: 'After DFW hail storm', emoji: '⛈️', guide: 'Ridge vent louvers dent and close from hail impact. Inspect after any storm with 1-inch+ hail. Metal ridge vent handles hail better than plastic cap shingles. Insurance often covers ridge vent in DFW hail claims.' },
  { id: 'replace', label: 'Replacing existing ridge vent', emoji: '🔄', guide: 'Shingle-over ridge vent: tear off cap shingles, remove old vent, install new aluminum ridge vent, reshingle over top. Metal ridge vent: no cap shingles needed, more durable. DFW cost: $300–$700 installed.' },
  { id: 'new-roof', label: 'Getting a new roof', emoji: '🏠', guide: 'Specify continuous ridge vent in your roofing contract. Require soffit vents be unblocked before sign-off. Ask for minimum 1 sq ft of net free area per 150 sq ft of attic floor (standard code).' },
  { id: 'hot-attic', label: 'Attic still hot with ridge vent', emoji: '🌡️', guide: 'Ridge vent only works with intake ventilation. Inspect soffit vents for blockage. Calculate net free area — you may need more total vent area. Check that insulation does not block the vent baffle path.' },
];

export default function DFWRoofingRidgeVent2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = SITUATIONS.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, margin: '8px 0 4px' }}>
            DFW Ridge Vent Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Best passive ventilation for DFW — how ridge vents work, fail, and get replaced</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#112240', borderRadius: 12, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 14, margin: '0 0 8px' }}>🌡️ Why Ridge Vents Win in DFW</h3>
            <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Hot air rises and exits at the peak — no mechanical parts, no electricity. In DFW where attics hit 160°F+ in summer, ridge vents drop temps 20–30°F and extend shingle life significantly.
            </p>
          </div>
          <div style={{ background: '#112240', borderRadius: 12, padding: 16, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', fontSize: 14, margin: '0 0 8px' }}>🔄 Shingle-Over vs Metal</h3>
            <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Shingle-over ridge vent blends in but can be damaged by DFW hail. Metal ridge vent is exposed but nearly indestructible. Metal preferred for hail-prone areas in N. Texas.
            </p>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 18, marginBottom: 24, borderLeft: '4px solid #FF4444' }}>
          <h2 style={{ color: '#FF4444', fontSize: 14, margin: '0 0 8px' }}>❌ Most Common Mistake: Blocked by Insulation</h2>
          <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            Blown-in insulation contractors routinely block soffit vent baffles and sometimes ridge vents. A blocked ridge vent provides zero benefit. Every attic insulation job should verify airflow path is clear before completion.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Select Your Situation → Ridge Vent Guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 10, marginBottom: 24 }}>
          {SITUATIONS.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? '#1E3A5F' : '#112240', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '14px 10px', cursor: 'pointer', color: '#fff', textAlign: 'center', fontSize: 13 }}>
              <div style={{ fontSize: 26 }}>{s.emoji}</div>
              <div style={{ fontWeight: 600, marginTop: 8 }}>{s.label}</div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 32 }}>{active.emoji}</div>
            <h3 style={{ color: '#F5E642', margin: '8px 0' }}>{active.label}</h3>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{active.guide}</p>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '0 0 12px' }}>Get roofing and ventilation quotes from vetted DFW contractors</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            🏠 Get Roofing Quotes in DFW
          </button>
        </div>
      </div>
    </div>
  );
}
