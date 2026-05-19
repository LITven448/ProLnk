import { useState } from 'react';

const conditions = [
  { id: 'blocked', label: '🚫 Blocked or Painted-Over Vents', guide: 'Very common in older DFW homes after repaints. Blocked soffit vents = attic temps 140°F+ in DFW summers. Use a utility knife to open channels. Replace painted-over vent covers. Cost: $5–$15 per vent.' },
  { id: 'sagging', label: '📉 Sagging Soffit Panels', guide: 'Sagging indicates moisture damage, usually from roof leak or ice dam (rare in DFW). Probe for rot. Vinyl soffit panels replace easily — $2–$4/sq ft material. Fix leak source first.' },
  { id: 'pests', label: '🐦 Pest or Animal Entry', guide: 'Gaps in soffit are primary entry point for birds, squirrels, and bats in DFW. Seal all gaps with galvanized mesh before patching. Do not seal entry while animals are inside attic.' },
  { id: 'ventilation', label: '🌡️ Attic Overheating', guide: 'DFW attics need 1 sq ft of ventilation per 300 sq ft of attic space. Combine soffit intake + ridge exhaust. Inadequate venting shortens shingle life by 5–8 years and spikes AC costs.' },
  { id: 'material', label: '🔄 Replacement Material Options', guide: 'Vinyl soffit: low maintenance, $2–$4/sq ft. Fiber cement: more durable, $4–$7/sq ft. Aluminum: good for DFW humidity, $3–$5/sq ft. Always choose vented panels for new installs.' },
];

export default function DFWSoffitVentGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = conditions.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 ProLnk › DFW Home Guides</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          🪟 DFW Soffit & Eave Guide 2026
        </h1>
        <p style={{ color: '#a0b0c8', marginBottom: '2rem' }}>
          Soffit vents are critical for attic health in DFW. Blocked vents trap 140°F air and moisture — damaging shingles, framing, and AC efficiency.
        </p>

        <div style={{ background: '#0d1e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Soffit Fast Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { label: 'Attic Temp (blocked vents)', value: 'Up to 140°F in DFW summer' },
              { label: 'Soffit Panel Replace', value: '$2–$7 per sq ft' },
              { label: 'Vent Cover Replace', value: '$5–$15 per vent' },
              { label: 'Top Risk', value: 'Painted-over vents (very common)' },
            ].map(f => (
              <div key={f.label} style={{ background: '#162032', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontWeight: 600 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 What condition do you see?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {conditions.map(i => (
            <button key={i.id} onClick={() => setSelected(i.id === selected ? null : i.id)}
              style={{ background: selected === i.id ? '#F5E642′ : '#162032', color: selected === i.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
              {i.label}
            </button>
          ))}
        </div>

        {guide && (
          <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{guide.label} — Inspection & Repair Guide</h3>
            <p style={{ lineHeight: 1.7, color: '#d0dce8′ }}>{guide.guide}</p>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#162032', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔗 Get a Free Soffit Repair Quote</div>
          <p style={{ color: '#a0b0c8', marginBottom: '1rem' }}>ProLnk connects you with trusted DFW roofing and siding contractors.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Request Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
