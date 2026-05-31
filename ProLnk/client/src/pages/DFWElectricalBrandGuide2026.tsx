import { useState } from 'react';

const brands = [
  { name: 'Square D', icon: '⚡', category: 'Panels', score: 97, note: `DFW electricians' preferred panel — QO series is industry standard` },
  { name: 'Eaton', icon: '🔌', category: 'Panels', score: 92, note: 'Solid alternative to Square D, CH series widely stocked in DFW' },
  { name: 'Leviton', icon: '🔲', category: 'Outlets/Switches', score: 88, note: 'Most installed outlets in DFW new construction' },
  { name: 'Lutron', icon: '💡', category: 'Smart Switches', score: 93, note: 'Caseta line dominates DFW smart home installs' },
  { name: 'Legrand', icon: '✨', category: 'Premium Devices', score: 90, note: 'Adorne collection — premium aesthetics for high-end DFW builds' },
];

const needGuide: Record<string, { brand: string; reason: string }> = {
  'Panel Upgrade': { brand: 'Square D QO', reason: 'DFW electricians stock QO breakers — fastest service + best parts availability' },
  'Panel Alternative': { brand: 'Eaton CH', reason: 'Comparable quality, often $200–400 cheaper on panel replacements' },
  'Standard Outlets': { brand: 'Leviton', reason: 'Trusted, widely available at DFW electrical supply houses' },
  'Smart Switches': { brand: 'Lutron Caseta', reason: 'Works without neutral wire — critical for older DFW homes' },
  'Luxury Finish': { brand: 'Legrand Adorne', reason: 'Designer look for Southlake/Highland Park remodels' },
};

export default function DFWElectricalBrandGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [need, setNeed] = useState<string>('Panel Upgrade');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Electrical Brand Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Electrical brands DFW licensed electricians actually install and stand behind</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏠 DFW Electrical Context</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            Most DFW homes built pre-2000 use Federal Pacific or Zinsco panels - both flagged as fire hazards. Panel replacements are the #1 electrical job in DFW. Brand choice affects future service cost and parts availability significantly.
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
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔍 Electrical Need → Brand Match</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(needGuide).map(n => (
              <button key={n} onClick={() => setNeed(n)}
                style={{ background: need === n ? '#F5E642' : '#0A1628', color: need === n ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>✅ {needGuide[need].brand}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginTop: 6 }}>{needGuide[need].reason}</div>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 28 }}>ProLnk vets DFW electricians by license, insurance, and completed job reviews - not brand affiliation.</p>
      </div>
    </div>
  );
}
