import { useState } from 'react';

const situations = [
  { label: 'New driveway — no expansion joints installed', guide: 'Demand them before pour. Specify tooled or saw-cut joints every 10 ft. DFW clay moves 1–3 inches seasonally. Without joints, cracks are certain within 3–5 years.' },
  { label: 'Existing patio — joints present but caulk cracked', guide: 'Remove old caulk fully. Use a self-leveling polyurethane sealant (Sikaflex 1a or similar). DFW heat degrades standard caulk in 2–3 summers. Budget $3–6 per linear foot.' },
  { label: 'Driveway has random cracks (no joints)', guide: 'Joints were likely omitted to cut costs. Saw-cut joints can be added retroactively. Fill existing cracks with epoxy first. New joints every 10–12 ft prevent future cracking.' },
  { label: 'Joint is heaving — one panel raised above another', guide: 'Clay expansion is pushing panels up. Joint alone cannot prevent this — investigate drainage. French drain or soil stabilization may be needed before resealing the joint.' },
  { label: 'Pool deck — joints separating at coping', guide: 'Pool decks move with water table and clay. Joints at coping line are critical. Use a foam backer rod + polyurethane sealant rated for pool chemicals.' },
];

export default function DFWFoundationExpansionJoint2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME SERVICES · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>🏗️ DFW Foundation Expansion Joint Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.7 }}>
          DFW's expansive clay soil moves <strong style={{ color: '#F5E642' }}>1–3 inches seasonally</strong>. Expansion joints in concrete flatwork
          absorb this movement — without them, cracks are inevitable. They're often skipped to cut costs, costing homeowners far more later.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📏', label: 'Flatwork Joint Spacing', value: 'Every 10–15 feet' },
            { icon: '🌱', label: 'DFW Clay Movement', value: '1–3 in. seasonal shift' },
            { icon: '💰', label: 'Sealant Cost (DIY)', value: '$3–6 per linear foot' },
            { icon: '⏳', label: 'Sealant Lifespan (DFW)', value: '2–4 years (heat degrades fast)' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ Why DFW Joints Are Often Missing</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <div>💸 Contractors skip them to reduce labor time by 15–20%</div>
            <div>📋 DFW cities rarely inspect residential flatwork closely</div>
            <div>🕐 Cracks appear 3–5 yrs later — contractor is long gone</div>
            <div>🔧 Retroactive saw-cut joints: $8–15/linear ft installed</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 Your Situation → Expansion Joint Guide</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#112240', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{s.label}</div>
              {selected === i && (
                <div style={{ marginTop: 10, color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>💡 {s.guide}</div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Foundation Expansion Joint Guide 2026 · Data: ACI 360R, PCA
        </div>
      </div>
    </div>
  );
}