import { useState } from 'react';

const stages = [
  { id: 'just-looking', label: 'Just Browsing', icon: '👀' },
  { id: 'serious', label: 'Seriously Shopping', icon: '🏠' },
  { id: 'offer', label: 'Making an Offer', icon: '✍️' },
  { id: 'under-contract', label: 'Under Contract', icon: '📋' },
];

const guides: Record<string, { title: string; items: { icon: string; check: string; detail: string; flag: string }[] }> = {
  'just-looking': {
    title: 'Drive-By Roof Scan',
    items: [
      { icon: '🔭', check: 'Shingle Condition', detail: 'Use binoculars from the street — look for curling, missing, or discolored shingles', flag: 'Curling edges or bare spots = near end of life, budget $15K–$35K for DFW re-roof' },
      { icon: '📐', check: 'Ridge Line Sag', detail: 'Sight along the ridge from the street — it should be perfectly straight', flag: 'Any sag indicates deck damage or rafter issues — structural, not cosmetic' },
      { icon: '🌿', check: 'Algae or Moss', detail: 'Dark streaking or green patches on north-facing slopes = moisture retention', flag: 'DFW humidity accelerates algae — black streaks reduce shingle life 30-40%' },
    ],
  },
  'serious': {
    title: 'Detailed Drive-By Assessment',
    items: [
      { icon: '🍂', check: 'Gutter Attachment', detail: 'Look for gutters pulling away from fascia or sagging sections', flag: 'Pulling gutters = fascia rot or improper slope — often signals deferred maintenance' },
      { icon: '💧', check: 'Soft Metal Damage', detail: 'Flashing, vent caps, and chimney caps show hail damage as dents', flag: 'DFW hail (2021, 2024 storms) — dented soft metals = shingle damage too, file insurance' },
      { icon: '📦', check: 'Stacked Shingles', detail: 'Look for raised lines across slope — two layers of shingles add 80 lbs per square', flag: 'TX code allows max 2 layers — third layer = must full tear-off, adds $3K–$8K' },
    ],
  },
  'offer': {
    title: 'Pre-Offer Roof Checklist',
    items: [
      { icon: '🏠', check: 'Hip vs Gable Design', detail: 'Hip roofs (4 slopes) outperform gable roofs in DFW wind events', flag: 'Gable-end bracing is required by TX code since 2000 — older homes often missing' },
      { icon: '🌀', check: 'Ventilation', detail: 'Count ridge vents and soffit vents from ground — should match 1:150 rule', flag: 'Poor attic ventilation in DFW adds $300–$600/yr in AC costs and shortens shingle life' },
      { icon: '📜', check: 'Ask for Permit History', detail: 'Roof replacement requires permit in most DFW cities — get the permit number', flag: 'Unpermitted roof = no inspection = may not meet current code' },
    ],
  },
  'under-contract': {
    title: 'Inspection and Negotiation',
    items: [
      { icon: '🔍', check: 'Get Roof Cert ($150–$300)', detail: 'Roofing contractor provides written certification of remaining life', flag: 'Insurance companies require this for DFW homes 15+ years old' },
      { icon: '💰', check: 'DFW Re-Roof Pricing', detail: '3,000 sq ft home: $15K–$28K (architectural), $22K–$35K (metal)', flag: 'Metal roofs: higher upfront but 40-50 year life, major DFW resale advantage' },
      { icon: '🌪️', check: 'Insurance Claim History', detail: 'Request C.L.U.E. report — shows prior roof claims on the home', flag: 'Multiple claims may mean insurance non-renewal in DFW — check before close' },
    ],
  },
};

export default function DFWRoofingDriveBy2026() {
  const [stage, setStage] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Drive-By Roofing Assessment Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>What you can spot from the ground before buying a DFW home — binoculars recommended</p>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>📍 WHERE ARE YOU IN YOUR DFW HOME PURCHASE?</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setStage(s.id)} style={{ padding: '12px', borderRadius: 8, border: '2px solid', borderColor: stage === s.id ? '#F5E642′ : '#334155', backgroundColor: stage === s.id ? '#F5E64220' : '#0f2744', color: '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {stage && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔎 {guides[stage].title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides[stage].items.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.check}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{item.detail}</div>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#fbbf24′ }}>⚠️ {item.flag}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#1e3a5f', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Need a DFW roofing contractor you can trust?</p>
              <a href="https://prolnk.io" style={{ color: '#F5E642', fontWeight: 700, textDecoration: 'none' }}>🔗 Find vetted DFW roofers at ProLnk.io →</a>
            </div>
          </div>
        )}

        {!stage && (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 40 }}>
            ☝️ Select your purchase stage above to get your personalized roofing drive-by checklist
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #1e3a5f', paddingTop: 20 }}>
          <p style={{ color: '#475569', fontSize: 12 }}>ProLnk DFW Home Services Platform · prolnk.io · Storm damage expertise · May 2026</p>
        </div>
      </div>
    </div>
  );
}