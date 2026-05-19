import { useState } from 'react';

export default function DFWGroundLevelHVACGuide2026() {
  const [installType, setInstallType] = useState('');
  const [info, setInfo] = useState<{ pros: string[]; cons: string[]; upgrade: string } | null>(null);

  const types: Record<string, { pros: string[]; cons: string[]; upgrade: string }> = {
    'Attic (Air Handler)': {
      pros: ['Most common in DFW — installers know it well', 'Frees up interior closet/garage space', 'Condensate drain gravity-fed easily'],
      cons: ['Attic temps reach 130°F in DFW summer — duct losses are massive', 'R-8 duct insulation minimum (many have only R-4)', 'Service access harder in summer heat'],
      upgrade: 'Upgrade path: Seal and insulate attic floor to R-38. Insulate ducts to R-8. Move ducts inside conditioned space during next system replacement for max efficiency.'
    },
    'Interior Closet': {
      pros: ['System in conditioned space — duct losses eliminated', 'Easy service access year-round', 'Best efficiency location in DFW climate'],
      cons: ['Noise can be issue if adjacent to bedroom', 'Condensate line needs careful routing', 'Floor space consumed'],
      upgrade: 'Best location in DFW — maintain it well. Add vibration isolation pad under unit ($50-100). Clean coil annually (DFW dust loads). Ensure drain pan has float switch.'
    },
    'Garage Installation': {
      pros: ['Out of living space, noise isolated', 'Service access excellent', 'Common in DFW slab homes'],
      cons: ['Garage is semi-conditioned at best — efficiency hit vs. closet', 'Duct run to living space can be long', 'Must seal air handler cabinet (garage air = fumes, humidity)'],
      upgrade: 'Seal air handler cabinet completely — critical to prevent garage air (CO, fumes) entering supply. Add garage insulation ($1,500-3,000) to improve surrounding temp. Consider mini-split for garage separately.'
    },
    'Ground Level Package Unit': {
      pros: ['All-in-one outside unit — no indoor air handler', 'Easy service access', 'Common in older DFW commercial-style homes'],
      cons: ['Exposed to DFW hail and storm damage', 'Duct typically runs under slab or through crawl', 'Efficiency typically lower than split system'],
      upgrade: 'Add hail guard/fence ($300-600). Check under-slab or crawl ducts for leaks — these systems lose 30-40% to duct leakage commonly. Consider split system conversion at replacement.'
    },
  };

  const handleSelect = (t: string) => {
    setInstallType(t);
    setInfo(types[t]);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DFW 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏠 DFW HVAC Installation Location Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>Where your HVAC lives matters enormously in DFW heat — attic installs lose 20-30% efficiency vs conditioned space.</p>

        <div style={{ background: '#1e2d4a', borderRadius: 8, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>📊 DFW HVAC Location Breakdown</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, fontSize: 13 }}>
            {['Attic: 65%', 'Closet: 20%', 'Garage: 10%', 'Package: 5%'].map(s => (
              <div key={s} style={{ background: '#0A1628', borderRadius: 6, padding: '8px', textAlign: 'center', color: '#F5E642', fontWeight: 700 }}>{s}</div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔍 Select Your Installation Type</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {Object.keys(types).map(t => (
            <button key={t} onClick={() => handleSelect(t)} style={{ background: installType === t ? '#F5E642′ : '#1e2d4a', color: installType === t ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{t}</button>
          ))}
        </div>
        {info && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ background: '#1e2d4a', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>✅ Pros for DFW</div>
              {info.pros.map(p => <div key={p} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {p}</div>)}
            </div>
            <div style={{ background: '#1e2d4a', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠️ Cons for DFW</div>
              {info.cons.map(c => <div key={c} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 4 }}>• {c}</div>)}
            </div>
            <div style={{ background: '#1e2d4a', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔧 Upgrade Considerations</div>
              <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{info.upgrade}</p>
            </div>
          </div>
        )}
        <div style={{ marginTop: 32, color: '#64748b', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW HVAC Installation · 2026 Edition</div>
      </div>
    </div>
  );
}