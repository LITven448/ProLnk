import { useState } from 'react';

const brands = [
  { name: 'Andersen 400 Series', icon: '🪟', category: 'Premium', score: 95, note: '20yr glass seal warranty, best DFW UV protection, Low-E4 standard' },
  { name: 'Pella 250 Series', icon: '🔷', category: 'Mid-Premium', score: 91, note: 'Strong DFW presence, EnduraClad exterior holds up to Texas heat' },
  { name: 'Harvey Classic', icon: '💎', category: 'Value-Lifetime', score: 87, note: 'Lifetime transferable warranty — growing in DFW new construction' },
  { name: 'Milgard Tuscany', icon: '☀️', category: 'West Coast Growing', score: 85, note: 'Expanding in DFW — full lifetime warranty including glass seal' },
  { name: 'PGT WinGuard', icon: '🌪️', category: 'Impact Resistant', score: 88, note: 'Hurricane-rated windows increasingly popular in North Texas for hail' },
];

const specGuide: Record<string, { brand: string; reason: string }> = {
  'Budget Under $300/window': { brand: 'Harvey Classic', reason: 'Best value with lifetime warranty — transferable for DFW resale' },
  'Mid Budget $300–600': { brand: 'Pella 250 Series', reason: 'DFW dealer network strong — fast service, EnduraClad resists UV fading' },
  'Premium $600+': { brand: 'Andersen 400 Series', reason: '20yr glass seal, Low-E4 reduces DFW cooling load by 25–35%' },
  'Hail Resistance': { brand: 'PGT WinGuard', reason: 'Impact-rated glass — eliminates window replacement after DFW hail storms' },
  'Energy Efficiency': { brand: 'Andersen 400 Series', reason: 'SHGC 0.22 + U-factor 0.27 — top marks for DFW summer heat blocking' },
};

const dfwSpecs = [
  { spec: 'SHGC', value: '≤ 0.25', why: 'Blocks Texas solar heat gain — mandatory for Energy Star in Dallas climate zone' },
  { spec: 'Low-E', value: 'Required', why: 'Reflects infrared heat — reduces cooling costs 15–25% in DFW summers' },
  { spec: 'U-Factor', value: '≤ 0.30', why: 'Insulation rating — less critical in DFW than SHGC but matters in winter' },
  { spec: 'Glass Seal Warranty', value: '10yr min', why: 'DFW heat degrades seals — 20yr+ warranty protects against cloudy/foggy glass' },
];

export default function DFWWindowBrandGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [budget, setBudget] = useState<string>('Mid Budget $300–600');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🪟</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Window Brand Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Best window brands for Dallas-Fort Worth — SHGC, Low-E, and heat specs that matter</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 10 }}>🌡️ DFW Climate Specs That Matter</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {dfwSpecs.map(s => (
              <div key={s.spec} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '2px 8px', fontWeight: 800, fontSize: 12, whiteSpace: 'nowrap', marginTop: 2 }}>{s.spec} {s.value}</div>
                <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{s.why}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 28 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setSelected(selected === b.name ? null : b.name)}
              style={{ background: selected === b.name ? '#1e3a5f' : '#112240', border: `1px solid ${selected === b.name ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 16 }}>{b.name}</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>{b.category}</div>
                  </div>
                </div>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 10px', fontWeight: 800, fontSize: 14 }}>{b.score}/100</div>
              </div>
              {selected === b.name && <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 10, borderTop: '1px solid #1e3a5f', paddingTop: 10 }}>{b.note}</p>}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Budget + Priority → DFW Window Brand</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(specGuide).map(b => (
              <button key={b} onClick={() => setBudget(b)}
                style={{ background: budget === b ? '#F5E642′ : '#0A1628', color: budget === b ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 14px', cursor: ’pointer', fontSize: 12, fontWeight: 600 }}>
                {b}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>✅ {specGuide[budget].brand}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6 }}>{specGuide[budget].reason}</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 28 }}>ProLnk Charter window pros are DFW-licensed and carry ENERGY STAR installation certification.</p>
      </div>
    </div>
  );
}
