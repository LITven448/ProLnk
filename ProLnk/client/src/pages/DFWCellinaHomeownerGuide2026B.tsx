import { useState } from 'react';

const yearGuide: Record<string, { label: string; tips: string[] }> = {
  '2020': {
    label: '2020 Build — Year 6',
    tips: [
      '📋 10-year structural warranty still active — document any settling cracks now',
      '❄️ HVAC at 6 years — first filter and coil deep clean critical in Celina dust',
      '🏗️ Foundation settling phase largely complete — verify with door/window audit',
      '🌿 Landscaping established — assess drainage to ensure positive slope from foundation',
      '🔋 Smoke/CO detectors due for replacement — 10-year lithium recommended',
    ],
  },
  '2021': {
    label: '2021 Build — Year 5',
    tips: [
      '🏗️ Active settling year — stair-step brick cracks and interior drywall gaps expected',
      '🌿 Irrigation system first major service — head alignment and backflow check',
      '❄️ HVAC 5-year maintenance — coil cleaning and refrigerant level verification',
      '🪟 Window seals at mid-warranty — report any fogging to builder while warranty open',
      '🛡️ HOA establishing precedents — attend board meetings to shape community standards',
    ],
  },
  '2022': {
    label: '2022 Build — Year 4',
    tips: [
      '📐 Builder corrections still possible — push on any framing or MEP punch list items',
      '🏗️ Slab monitoring year — install foundation level monitors on corners',
      '🌬️ HVAC filtration critical — Celina construction dust clogs filters faster',
      '💧 Plumbing connections at 4 years — inspect under sinks and at water heater',
      '🌿 Tree growth assessment — remove any saplings within 10 feet of foundation',
    ],
  },
  '2023': {
    label: '2023 Build — Year 3',
    tips: [
      '📋 Year 3 is warranty inflection — push builder on all cosmetic items before year 1 interior warranty expires',
      '🏗️ Maximum settling risk window — monitor quarterly and document photographically',
      '🔌 Smart home systems — verify all rough-in conduit before warranty work crew visits',
      '🌿 Establish grading now — Celina flat lots flood in heavy rain without positive slope',
      '🛡️ HOA architectural rules forming — get approval for fence and landscape before standards tighten',
    ],
  },
  '2024-2026': {
    label: '2024–2026 Build — Brand New',
    tips: [
      '📋 Document every punch list item with photos before closing — builder crews are overloaded',
      '🏗️ Year 1 warranty is most valuable — submit all cosmetic and structural issues in writing',
      '🌿 No established drainage — grade and plant ground cover immediately',
      '🔌 EV charger conduit — ask builder to rough-in before drywall while free',
      '🛡️ Community is forming — your HOA is essentially in startup mode; participate early',
    ],
  },
};

export default function DFWCellinaHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const years = Object.keys(yearGuide);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · CELINA TX · PART 2 OF 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Celina TX Homeowner Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Texas's fastest-growing city: 6,000 in 2015 → 25,000+ in 2026. Every home is new construction. Know exactly where you are in the settling and warranty lifecycle.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {[{ icon: '🚀', label: '2015→2026 Growth', val: '6K → 25K+ residents' }, { icon: '🏗️', label: 'Build Vintage', val: '100% new construction' }, { icon: '🏠', label: 'Median Home Price', val: '$420K (2026)' }, { icon: '🏘️', label: 'HOA Status', val: 'Developing standards' }].map(c => (
            <div key={c.label} style={{ background: '#111e35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏗️ Select Your Build Year</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {years.map(y => (
              <button key={y} onClick={() => setSelected(y === selected ? null : y)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: selected === y ? '#F5E642' : '#1e2f4a', color: selected === y ? '#0A1628' : '#fff' }}>
                {y}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{yearGuide[selected].label}</div>
              {yearGuide[selected].tips.map((t, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🚀 Celina Growth Context</h2>
          {[{ icon: '🌾', text: 'Former farmland — expansive clay soil creates above-average foundation settling in first 5 years' }, { icon: '🏗️', text: '25,000+ new residents since 2015 — builder queues are long, document early and push hard' }, { icon: '🛡️', text: 'HOA rules are still being written — early owners have disproportionate influence on standards' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center', fontWeight: 700 }}>
          Get Celina-Verified Pros on ProLnk — Free Quotes in 24 Hours
        </div>
      </div>
    </div>
  );
}