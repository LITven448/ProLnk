import { useState } from 'react';

const decades = [
  {
    label: '1960s & Earlier',
    range: '1960s',
    status: '🔴 High Risk',
    material: 'Single-tab 3-tab shingles — likely at or past end of life',
    inspect: [
      'Granule loss in gutters and downspouts',
      'Curling, cracking, or missing shingles',
      'Exposed wood decking or felt paper',
      'Sagging ridge line or deck deflection',
      'Attic moisture, mold, or daylight penetration',
    ],
    budget: '$12,000–$22,000',
    note: 'Original shingles almost certainly replaced at least once. Ask for permit history. Check for improper layering (2+ layers = full tear-off required).',
    urgency: 'Inspect immediately. Budget for full replacement within 1–2 years.',
  },
  {
    label: '1970s–1980s',
    range: '1970s–1980s',
    status: '🟠 Elevated Risk',
    material: 'Mix of 3-tab and early architectural shingles. Flat sections may contain asbestos-containing materials (ACM).',
    inspect: [
      'Flat roof sections — test for ACM before any disturbance',
      'Shingle granule integrity',
      'Flashing around chimneys, vents, and valleys',
      'Evidence of multiple re-roofing layers',
      'Attic ventilation adequacy',
    ],
    budget: '$10,000–$20,000 + $2,000–$8,000 for asbestos abatement if ACM found',
    note: 'ACM testing is required before roofing work on homes built before 1980 in Texas. Budget extra if flat sections exist.',
    urgency: 'Professional inspection within 6 months. Plan replacement within 2–4 years.',
  },
  {
    label: '1990s–2000s',
    range: '1990s–2000s',
    status: '🟡 Moderate Risk',
    material: 'First-generation architectural (dimensional) shingles — 20–30 year lifespan now reached',
    inspect: [
      'Shingle layering and granule density',
      'Ridge cap condition',
      'Flashing and sealant integrity',
      'Evidence of hail damage (dimpling)',
      'Attic insulation and ventilation balance',
    ],
    budget: '$9,000–$17,000',
    note: 'DFW hail events 1995–2010 may have triggered insurance replacements. Confirm replacement history with homeowner or permit records.',
    urgency: 'Inspection recommended within 12 months. Plan for replacement within 5 years.',
  },
  {
    label: '2010s',
    range: '2010s',
    status: '🟢 Lower Risk',
    material: 'Higher-grade architectural shingles — mid-lifecycle',
    inspect: [
      'Impact resistance rating (Class 4 = insurance discount in TX)',
      'Any storm damage from DFW hail events 2015–2023',
      'Flashing and pipe boot sealant condition',
      'Attic ventilation and radiant barrier',
    ],
    budget: '$0–$5,000 for repairs; replacement $10,000–$16,000 if needed',
    note: 'If Class 4 shingles were installed, verify with insurance for potential premium discount.',
    urgency: 'Routine inspection every 3 years. No immediate action typically needed.',
  },
  {
    label: '2020s',
    range: '2020s',
    status: '✅ Good Shape',
    material: 'Modern architectural or premium shingles — early lifecycle',
    inspect: [
      'Installer workmanship and warranty registration',
      'Any damage from recent DFW hail or wind events',
      'Flashing quality at transitions',
    ],
    budget: '$0–$2,000 for minor repairs',
    note: 'Confirm manufacturer warranty is registered. Verify contractor warranty terms.',
    urgency: 'Visual check annually. No replacement expected for 15–25 years.',
  },
];

export default function DFWRoofDecadeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? decades[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Roof by Decade Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>Select your home's decade to see the most likely roof condition, what to inspect, and what to budget.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {decades.map((d, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, background: selected === i ? '#F5E642′ : '#0F2645', color: selected === i ? '#0A1628' : '#E8EAF0', fontWeight: 700, cursor: ’pointer', fontSize: 14 }}>
              {d.label}
            </button>
          ))}
        </div>
        {active && (
          <div style={{ background: '#0F2645', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{active.range} Homes</div>
            <div style={{ fontSize: 18, marginBottom: 16 }}>{active.status}</div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Likely Material: </span>{active.material}</div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔍 What to Inspect:</div>
              {active.inspect.map((item, i) => <div key={i} style={{ marginBottom: 4, paddingLeft: 12 }}>• {item}</div>)}
            </div>
            <div style={{ marginBottom: 16 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Budget Estimate: </span>{active.budget}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 14, color: '#94A3B8′ }}>{active.note}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{active.urgency}</div>
          </div>
        )}
        {!active && <div style={{ color: '#4A6080', textAlign: 'center', padding: 40, fontSize: 16 }}>👆 Select a decade above to see your roof profile</div>}
      </div>
    </div>
  );
}
