import { useState } from 'react';

const VRF_BENEFITS = [
  { icon: '🌡️', title: 'Simultaneous Heat & Cool', desc: 'Heat recovery VRF can cool master suite while heating a study in the same system' },
  { icon: '⚡', title: 'Higher Efficiency', desc: 'VRF systems achieve 20-30% better efficiency than conventional split systems in large DFW homes' },
  { icon: '🔇', title: 'Quieter Operation', desc: 'Variable-speed compressors run at precise capacity — fewer on/off cycles, much quieter' },
  { icon: '📱', title: 'Zone Control', desc: 'Each room or zone gets its own setpoint — critical for large DFW homes with varied sun exposure' },
];

const SIZE_TIERS = [
  { range: 'Under 3,000 sq ft', rec: 'Mini-splits or conventional zoned system', vrf: false, costLow: 0, costHigh: 0 },
  { range: '3,000–5,000 sq ft', rec: 'Borderline — compare VRF vs. dual system', vrf: false, costLow: 18000, costHigh: 28000 },
  { range: '5,000–8,000 sq ft', rec: 'VRF strongly recommended for efficiency', vrf: true, costLow: 25000, costHigh: 38000 },
  { range: '8,000+ sq ft', rec: 'VRF is the clear best choice for DFW', vrf: true, costLow: 35000, costHigh: 60000 },
];

export default function DFWHVACVRFSystem2026() {
  const [sqft, setSqft] = useState('');
  const [zones, setZones] = useState('');
  const [result, setResult] = useState<null | { tier: typeof SIZE_TIERS[0]; zoneCount: number; totalEst: string }>(null);

  function calculate() {
    const area = parseFloat(sqft);
    const zoneCount = parseInt(zones) || 4;
    if (!area || area < 500) return;
    const tier = area < 3000 ? SIZE_TIERS[0] : area < 5000 ? SIZE_TIERS[1] : area < 8000 ? SIZE_TIERS[2] : SIZE_TIERS[3];
    const zoneAdj = (zoneCount - 4) * 1500;
    const low = tier.costLow + zoneAdj;
    const high = tier.costHigh + zoneAdj;
    const totalEst = tier.vrf ? `$${low.toLocaleString()} – $${high.toLocaleString()}` : 'Get quotes for mini-split or zoned system';
    setResult({ tier, zoneCount, totalEst });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌀</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW VRF/VRV System Guide 2026</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>Variable refrigerant flow systems for large DFW homes and commercial buildings — when VRF makes sense vs. multiple mini-splits.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚙️ What is VRF/VRV?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 16px' }}>VRF (Variable Refrigerant Flow) uses one outdoor unit to drive multiple indoor air handlers simultaneously. Unlike mini-splits, VRF uses a single refrigerant loop serving 4–64+ zones with precise capacity control via inverter-driven compressors.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {VRF_BENEFITS.map(b => (
              <div key={b.title} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px' }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{b.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>{b.title}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 DFW Home Size vs. System Choice</h2>
          {SIZE_TIERS.map(t => (
            <div key={t.range} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.range}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{t.rec}</div>
              </div>
              <span style={{ marginLeft: 12, padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700, background: t.vrf ? '#F5E64222′ : '#1E3A5F', color: t.vrf ? '#F5E642' : '#94A3B8', whiteSpace: ’nowrap' }}>
                {t.vrf ? '✅ VRF' : '⬜ Other'}
              </span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 VRF Feasibility Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home or Building Size (sq ft)</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 6000″
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Number of Desired Zones (rooms)</label>
              <input type="number" value={zones} onChange={e => setZones(e.target.value)} placeholder="e.g. 8″
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 24px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
              Check VRF Feasibility
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ background: result.tier.vrf ? '#14532D22′ : '#1E3A5F', border: `1px solid ${result.tier.vrf ? '#22C55E' : '#475569'}`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{result.tier.vrf ? '✅ VRF Recommended' : '⬜ Consider Alternatives'}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{result.tier.rec}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0′ }}>
                <span style={{ color: '#94A3B8′ }}>Estimated Installed Cost</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.totalEst}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0′ }}>
                <span style={{ color: '#94A3B8′ }}>Configured Zones</span>
                <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{result.zoneCount} zones</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk · DFW HVAC Specialists · Get matched with a VRF-certified contractor</div>
      </div>
    </div>
  );
}