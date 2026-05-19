import { useState } from 'react';

const brands = [
  { name: 'GAF Timberline HDZ', icon: '🏠', category: 'Architectural Shingles', score: 96, note: 'DFW standard — most installed brand, lifetime warranty, hail resistant' },
  { name: 'Owens Corning Duration Storm', icon: '🌪️', category: 'Impact Resistant', score: 94, note: 'Class 4 IR rating — can lower DFW insurance premiums' },
  { name: 'CertainTeed Landmark', icon: '⭐', category: 'Premium', score: 91, note: 'Premium aesthetics, SureStart warranty, popular in Southlake' },
  { name: 'Malarkey Vista', icon: '🌿', category: 'Eco-Friendly', score: 87, note: 'NEX polymer — better hail/UV resistance for DFW heat' },
  { name: 'Owens Corning Duration', icon: '🔶', category: 'Mid-Premium', score: 89, note: 'SureNail technology — wind resistance key for DFW storms' },
];

const priorityGuide: Record<string, { brand: string; reason: string }> = {
  'Insurance Savings': { brand: 'Owens Corning Duration Storm', reason: 'Class 4 IR rating qualifies for 20–30% insurance discount in DFW' },
  'Best Value': { brand: 'GAF Timberline HDZ', reason: 'Widest contractor network in DFW = competitive bids + warranty options' },
  'Premium Look': { brand: 'CertainTeed Landmark Premium', reason: 'Layered shadow lines — best curb appeal for luxury DFW neighborhoods' },
  'Eco Priority': { brand: 'Malarkey Vista', reason: 'Algae-resistant, recycled content, holds up to DFW summer UV' },
  'Storm Defense': { brand: 'Owens Corning Duration Storm', reason: '130 mph wind rating + Class 4 hail — built for DFW severe weather' },
};

export default function DFWRoofingBrandGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [priority, setPriority] = useState<string>('Best Value');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Roofing Brand Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Top shingle brands for Dallas-Fort Worth — hail, heat, and insurance rated</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🌩️ Why DFW Roofing Is Different</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            DFW averages 8–12 hail events per year and summer UV index peaks at 11+. A standard 3-tab shingle lasts 8–12 years here vs. 20+ in mild climates. Class 4 Impact Resistant shingles are the smartest investment for DFW homeowners — often paying back via insurance savings in 3–5 years.
          </p>
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
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Priority → DFW Brand Match</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(priorityGuide).map(p => (
              <button key={p} onClick={() => setPriority(p)}
                style={{ background: priority === p ? '#F5E642′ : '#0A1628', color: priority === p ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 14px', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                {p}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>✅ {priorityGuide[priority].brand}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6 }}>{priorityGuide[priority].reason}</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 28 }}>ProLnk Charter roofers carry Class 4 certification and full DFW insurance claim experience.</p>
      </div>
    </div>
  );
}
