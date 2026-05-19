import { useState } from 'react';

export default function DFWChimneyFireplaceGuide2026() {
  const [fireplaceType, setFireplaceType] = useState('wood');
  const [showChecklist, setShowChecklist] = useState(false);

  const checklists: Record<string, string[]> = {
    wood: ['Annual chimney sweep (creosote removal)', 'Inspect firebox bricks and mortar', 'Check damper operation', 'Inspect chimney cap and crown', 'Test smoke draw before first use', 'Stock seasoned hardwood only'],
    gas: ['Inspect gas line connections and valve', 'Clean glass panels', 'Check pilot light and ignition', 'Inspect burner and ember bed', 'Test CO detector nearby', 'Annual professional gas inspection'],
    electric: ['Wipe down heating elements', 'Check thermostat calibration', 'Inspect power cord and outlet', 'Clean interior with dry cloth', 'Verify flame effect operation', 'Test safety shutoff'],
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2 }}>DFW HOME SERVICES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔥 DFW Chimney & Fireplace Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW winters are mild, but fireplaces remain a popular luxury feature. Annual chimney inspection is required for safe use regardless of frequency.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🪵', label: 'Creosote Risk', val: 'Inspect annually' }, { icon: '🏠', label: 'Cap & Crown', val: 'Check every season' }, { icon: '🔍', label: 'Gas vs Wood', val: 'Different care needs' }].map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: '#cbd5e1′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📋 Annual Maintenance Checklist</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {['wood', 'gas', 'electric'].map(t => (
              <button key={t} onClick={() => { setFireplaceType(t); setShowChecklist(true); }}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  background: fireplaceType === t ? '#F5E642′ : '#2d3f5a', color: fireplaceType === t ? '#0A1628' : '#fff' }}>
                {t.charAt(0).toUpperCase() + t.slice(1)} Burning
              </button>
            ))}
          </div>
          {showChecklist && (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {checklists[fireplaceType].map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #2d3f5a', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#F5E642′ }}>✓</span><span style={{ color: '#cbd5e1' }}>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>⚠️ DFW-Specific Risks</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Even occasional fireplace use in DFW can cause creosote buildup. Gas logs require annual professional inspection. Wood-burning fireplaces must have chimney caps to keep out pests year-round.
          </p>
        </div>
      </div>
    </div>
  );
}