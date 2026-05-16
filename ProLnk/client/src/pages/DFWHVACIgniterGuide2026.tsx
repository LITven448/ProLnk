import { useState } from 'react';

const symptoms = [
  { id: 'noHeat', label: 'Furnace not heating', diagnosis: 'Igniter likely failed — most common cause in DFW gas furnaces' },
  { id: 'clicking', label: 'Clicking but no ignition', diagnosis: 'Igniter cracked or burned out — visible crack if you inspect carefully' },
  { id: 'blinking', label: 'Error code / blinking light', diagnosis: 'Check furnace label: 3 blinks often means igniter fault on Carrier/Lennox' },
  { id: 'seasonal', label: 'First cold snap, no heat', diagnosis: 'Classic DFW October/November igniter failure after months of dormancy' },
];

export default function DFWHVACIgniterGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK — DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔥 DFW Furnace Igniter Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Hot surface igniters are the most common failure point in DFW gas furnaces. DFW furnaces sit idle all summer — then face their first real test in October or November. Here's what you need to know.
        </p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚡ Igniter Types in DFW Homes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Silicon Carbide</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Older standard. Orange glow. Fragile — cracks from thermal shock. Lifespan 3–5 years in DFW heat cycles.</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>Silicon Nitride ✓ Preferred</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>Modern standard. More durable. Handles DFW temperature swings better. Lifespan 7–10 years.</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>💰 Replacement Cost in DFW (2026)</h2>
          <div style={{ color: '#94a3b8', marginBottom: 12 }}>Parts + labor for a licensed HVAC tech:</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>$150 – $300</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Most replacements take under 1 hour. Do not attempt DIY — 120V AC shock risk and voiding warranties.</div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🩺 Symptom → Diagnosis Tool</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#0A1628',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: 8,
                  padding: '12px 16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Likely Diagnosis:</div>
              <div style={{ color: '#e2e8f0' }}>{match.diagnosis}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Need a DFW HVAC Tech?</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with licensed local pros — free quote, no commitment.</div>
        </div>
      </div>
    </div>
  );
}
