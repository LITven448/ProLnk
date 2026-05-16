import { useState } from 'react';

export default function DFWFoundationWatproof2026() {
  const [situation, setSituation] = useState('');
  const [approach, setApproach] = useState('');

  const situations = [
    { label: 'Water seeping through slab cracks', key: 'crack' },
    { label: 'Moisture wicking up through slab (no visible crack)', key: 'wick' },
    { label: 'Water entering at slab-wall joint', key: 'joint' },
    { label: 'Standing water after rain near foundation', key: 'standing' },
    { label: 'Basement or below-grade room moisture', key: 'below' },
  ];

  const approaches: Record<string, string> = {
    crack: '🔧 Polyurethane or epoxy crack injection seals active water entry. Polyurethane expands to fill voids; epoxy restores structural strength. Address exterior drainage first — injection alone fails if hydrostatic pressure continues.',
    wick: '💧 Capillary action through concrete is common in DFW areas with high seasonal water tables. Interior vapor barrier or crystalline waterproofing additive in an overlay can help. Exterior drainage improvement is the root fix.',
    joint: '⚠️ Slab-to-wall joints are common entry points. Hydraulic cement as emergency stop, then polyurethane sealant injection. Exterior French drain to relieve hydrostatic pressure is the permanent solution.',
    standing: '🌧️ Standing water against the foundation is the #1 cause of DFW water intrusion. Regrade soil away from foundation (min. 6" drop in 10 feet). Extend downspouts 6+ feet. French drain if regrading is insufficient.',
    below: '🏗️ Below-grade spaces in DFW are rare but exist. Interior drainage channel (trench drain + sump pump) is last resort. Exterior dimple mat waterproofing + drain tile is preferred. Budget $8,000–$25,000 for comprehensive solution.',
  };

  const methods = [
    { icon: '💉', name: 'Crack Injection', type: 'Polyurethane / Epoxy', best: 'Active water cracks', cost: '$300–$1,500' },
    { icon: '🚰', name: 'French Drain', type: 'Exterior drain system', best: 'Hydrostatic pressure', cost: '$3,000–$8,000' },
    { icon: '🪨', name: 'Crystalline WP', type: 'Penetrating sealant', best: 'Capillary moisture', cost: '$2,000–$6,000' },
    { icon: '🏗️', name: 'Interior Drain', type: 'Trench + sump pump', best: 'Last resort only', cost: '$8,000–$20,000' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>💧</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>DFW Foundation Waterproofing Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>Below-grade waterproofing in DFW — most slab foundations lack traditional waterproofing; here's what to do</p>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '22px' }}>ℹ️</span>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>Most DFW slab-on-grade foundations have no traditional waterproofing membrane. A vapor barrier under the slab is common but not waterproofing. Water entry is addressed through drainage, crack sealing, and moisture management.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '28px' }}>
          {methods.map(m => (
            <div key={m.name} style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{m.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>{m.name}</div>
              <div style={{ color: '#64748B', fontSize: '12px', marginBottom: '8px' }}>{m.type}</div>
              <div style={{ color: '#22C55E', fontSize: '12px', marginBottom: '4px' }}>Best for: {m.best}</div>
              <div style={{ color: '#F5E642', fontSize: '13px', fontWeight: '700' }}>{m.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>💧 Water Entry Situation → Waterproofing Approach</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {situations.map(s => (
              <button key={s.key} onClick={() => { setSituation(s.key); setApproach(approaches[s.key]); }}
                style={{ background: situation === s.key ? '#F5E642' : '#1E3A5F', color: situation === s.key ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>
                {s.label}
              </button>
            ))}
          </div>
          {approach && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#E8EAF0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{approach}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>🌊 DFW Water Table Context</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              '🗺️ Most of DFW has moderate water table depth (15–30 ft) — hydrostatic pressure is less common than drainage issues',
              '🌧️ Trinity River floodplain areas (Irving, Grand Prairie, south Dallas) can see seasonal high water tables',
              '🏜️ Upland areas (Frisco, McKinney, north Collin County) rarely have water table issues — drainage is usually sufficient',
              '🔍 Expansive clay controls most moisture movement at DFW slab level — drainage management is the primary defense',
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', color: '#94A3B8', fontSize: '14px', lineHeight: '1.5' }}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}