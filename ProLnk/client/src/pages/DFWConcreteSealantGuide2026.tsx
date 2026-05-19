import { useState } from 'react';

const surfaces = [
  {
    id: 'driveway',
    label: 'Driveway',
    icon: '🚗',
    sealant: 'Penetrating Silane/Siloxane Sealer',
    frequency: 'Every 2–3 years',
    notes: 'DFW heat accelerates breakdown — use UV-stable penetrating sealer. Do NOT use acrylic on driveways (peels under car traffic).',
    steps: ['Clean with pressure washer', 'Allow 48hr dry time', 'Apply sealer in cool morning hours', 'Allow 24hr cure before traffic'],
    when: 'Spring or Fall (avoid 90°F+ days)',
  },
  {
    id: 'garage',
    label: 'Garage Floor',
    icon: '🏠',
    sealant: 'Epoxy Coating or Penetrating Sealer',
    frequency: 'Epoxy: 5–10 yrs | Penetrating: 3–5 yrs',
    notes: 'DFW garages get extreme heat — epoxy can yellow/peel. Use 100% solids epoxy or water-based polyaspartic for better heat resistance.',
    steps: ['Acid etch or diamond grind surface', 'Fill cracks with epoxy filler', 'Apply base coat + broadcast chips', 'Topcoat for durability'],
    when: 'Avoid summer (epoxy fails above 85°F application temp)',
  },
  {
    id: 'patio',
    label: 'Patio / Pool Deck',
    icon: '☀️',
    sealant: 'Acrylic Sealer (color-enhancing)',
    frequency: 'Every 1–2 years in DFW UV',
    notes: 'DFW UV destroys untreated patio concrete. Acrylic sealers restore color and protect from UV bleaching. Recoat before it chalks.',
    steps: ['Clean and degrease surface', 'Strip old sealer if failing', 'Apply thin, even coat', 'Second coat after 4hr dry'],
    when: 'Spring before summer heat, or Fall before freeze season',
  },
  {
    id: 'sidewalk',
    label: 'Sidewalk / Walkway',
    icon: '🚶',
    sealant: 'Penetrating Sealer (low sheen)',
    frequency: 'Every 3–4 years',
    notes: 'DFW freeze-thaw cycles (rare but real) cause spalling. Penetrating sealer prevents water intrusion without slippery surface.',
    steps: ['Sweep and clean surface', 'Apply low-VOC penetrating sealer', 'Allow full 24hr cure'],
    when: 'Avoid sealing before forecast rain or below 50°F',
  },
];

const conditions = [
  { id: 'new', label: 'New Concrete (< 1 yr)', icon: '✨' },
  { id: 'faded', label: 'Faded / Chalky', icon: '🪨' },
  { id: 'cracked', label: 'Cracked', icon: '💥' },
  { id: 'replace', label: '> 30% Damage', icon: '⚠️' },
];

export default function DFWConcreteSealantGuide2026() {
  const [activeSurface, setActiveSurface] = useState<string | null>(null);
  const [condition, setCondition] = useState<string | null>(null);

  const surface = surfaces.find(s => s.id === activeSurface);
  const shouldReplace = condition === 'replace';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Concrete Sealant Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Protect concrete from DFW heat, UV, and occasional freeze-thaw — matched to your surface type.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>📋 Concrete Condition</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {conditions.map(c => (
              <button key={c.id} onClick={() => setCondition(c.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  borderColor: condition === c.id ? '#F5E642′ : '#1e3a5f',
                  background: condition === c.id ? '#F5E642′ : '#0A1628',
                  color: condition === c.id ? '#0A1628′ : '#94a3b8' }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          {shouldReplace && (
            <div style={{ marginTop: 14, background: '#1e1428', borderRadius: 8, padding: 14, borderLeft: '4px solid #f87171′ }}>
              <span style={{ color: '#f87171', fontWeight: 700 }}>⚠️ Recommendation: Replace, Don't Seal</span>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '6px 0 0′ }}>When damage exceeds 30%, sealing is a band-aid. DFW contractors typically recommend full removal and repour.</p>
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏗️ Select Your Surface Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
          {surfaces.map(s => (
            <button key={s.id} onClick={() => setActiveSurface(activeSurface === s.id ? null : s.id)}
              style={{ background: activeSurface === s.id ? '#1a3a6a' : '#0f2040', border: '2px solid', borderColor: activeSurface === s.id ? '#F5E642′ : '#1e3a5f',
                borderRadius: 12, padding: 16, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 6 }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.frequency}</div>
            </button>
          ))}
        </div>

        {surface && !shouldReplace && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 10px' }}>{surface.icon} {surface.label} — Recommended: {surface.sealant}</h3>
            <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>{surface.notes}</p>
            <div style={{ color: '#60a5fa', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>🗓️ BEST TIME: {surface.when}</div>
            <div style={{ color: '#4ade80', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>📋 APPLICATION STEPS</div>
            {surface.steps.map((step, i) => (
              <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 5 }}>{i + 1}. {step}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW Concrete Quote</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with licensed concrete pros in Dallas-Fort Worth.</p>
        </div>
      </div>
    </div>
  );
}