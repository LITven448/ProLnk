import { useState } from 'react';

const homeTypes = [
  { id: 'waterfront-custom', label: '🌊 Waterfront Custom Home', tips: ['Lake Grapevine shoreline: Corps of Engineers owns the bank — dock permit via USACE', 'Erosion control landscaping required within 50ft of lake boundary', 'Storm-driven silt can block drainage channels — clear annually post-summer storms'] },
  { id: 'master-planned', label: '🏘️ Master-Planned Community', tips: ['Flower Mound master-planned communities have multi-layered HOA governance — read all three tiers', 'Nature trail easements run behind many lots — verify before fence installation', 'Community lakes are HOA-maintained; confirm chemical treatment schedule for pests'] },
  { id: 'affluent-2010s', label: '🏡 Affluent 2010s Build', tips: ['High-end 2010s builds often have 3-zone HVAC — each zone needs individual filter service', 'Premium materials: stone and stucco exteriors need annual caulk and sealant inspection', 'Flower Mound green belt adjacency: expect increased pollen and allergen load in HVAC'] },
];

const flowerMoundFacts = [
  'Flower Mound is consistently ranked a top-10 DFW suburb for quality of life',
  'Lake Grapevine access drives waterfront premium of 15-25% over inland Flower Mound homes',
  'Nature trail network spans 50+ miles — proximity is a strong selling point',
  'Upscale demographics: median HHI over $120K — buyer expectations are high',
];

export default function DFWFlowerMoundLakeshoreGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = homeTypes.find(h => h.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>FLOWER MOUND · LAKESHORE · 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px' }}>🌿 Flower Mound Lakeshore Guide</h1>
        <p style={{ color: '#8899aa', marginBottom: 28 }}>Upscale Lake Grapevine corridor · Master-planned waterfront · 2000s–2020s builds · Nature trail access</p>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📍 Area Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '🌊', label: 'Lake', val: 'Grapevine' }, { icon: '🏗️', label: 'Build Era', val: '2000s–2020s' }, { icon: '📈', label: 'Water Premium', val: '15–25%' }, { icon: '🌿', label: 'Trails', val: '50+ Miles' }].map(s => (
              <div key={s.label} style={{ background: '#162236', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#8899aa', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🔍 Select Your Home Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setSelected(h.id === selected ? null : h.id)}
                style={{ background: selected === h.id ? '#F5E642′ : '#162236', color: selected === h.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {h.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#162236', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 14 }}>{active.label} — Maintenance Guide</h3>
              {active.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span>
                  <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🏞️ Flower Mound Lakeshore Key Facts</h2>
          {flowerMoundFacts.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642′ }}>→</span>
              <span style={{ color: '#ccd6e0', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: 12, marginTop: 32 }}>ProLnk · Flower Mound Lakeshore · 2026</p>
      </div>
    </div>
  );
}