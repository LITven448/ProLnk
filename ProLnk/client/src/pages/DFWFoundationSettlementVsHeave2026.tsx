import { useState } from 'react';

export default function DFWFoundationSettlementVsHeave2026() {
  const [pattern, setPattern] = useState('');
  const [assessment, setAssessment] = useState('');

  const patterns = [
    { label: 'Center of house is lower than edges (floors slope inward)', key: 'center_low' },
    { label: 'Edges of house lower than center (floors slope outward)', key: 'edge_low' },
    { label: 'One corner or side notably higher than rest', key: 'corner_high' },
    { label: 'One corner or side notably lower than rest', key: 'corner_low' },
    { label: 'Uniform elevation change — whole house shifted', key: 'uniform' },
  ];

  const assessments: Record<string, string> = {
    center_low: '⬇️ CENTER LIFT (Settlement) PATTERN: Interior slab has settled away from grade beams. This is classic DFW center settlement from clay drying under the interior. Piers or pressed pilings under interior slab areas are the typical fix. Average cost: $8,000–$20,000. Get 3 engineered quotes.',
    edge_low: '⬇️ EDGE SETTLEMENT PATTERN: Perimeter grade beams have settled. Usually caused by soil erosion or clay shrinkage at perimeter. Exterior piers installed under grade beam is standard fix. Check gutters and drainage first — fix drainage before piers or settlement continues.',
    corner_high: '⬆️ CORNER HEAVE PATTERN: Localized moisture intrusion causing clay expansion under one corner. Most dangerous — differential movement creates shear stress. Identify moisture source (broken pipe, downspout, irrigation) and eliminate BEFORE any structural repair. May self-correct after moisture normalized.',
    corner_low: '⬇️ DIFFERENTIAL SETTLEMENT PATTERN: Most common DFW pattern. One corner settling independently creates diagonal cracking (stair-step cracks in brick, diagonal wall cracks). Pier installation under low corner. Requires geotechnical report to confirm soil conditions before repair.',
    uniform: '↕️ UNIFORM MOVEMENT: Less structurally dangerous than differential movement — house moved together. May be seasonal clay response that normalizes with moisture equalization. Monitor with elevation benchmarks over 6–12 months before committing to repair. Consult structural engineer first.',
  };

  const movements = [
    { icon: '⬇️', type: 'Settlement', direction: 'Foundation sinking', cause: 'Clay drying, voids, erosion', visual: 'Center lower than edges', danger: 'Medium' },
    { icon: '⬆️', type: 'Heave', direction: 'Foundation pushing up', cause: 'Excess moisture, clay expansion', visual: 'Edges lower than center', danger: 'High' },
    { icon: '↔️', type: 'Differential', direction: 'Uneven movement', cause: 'Localized moisture/soil variation', visual: 'One area vs another', danger: 'Critical' },
  ];

  const dangerColors: Record<string, string> = { Medium: '#EAB308', High: '#F97316', Critical: '#EF4444′ };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>↕️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>DFW Foundation Settlement vs Heave Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>Understanding DFW foundation movement direction — the direction of movement determines the repair approach</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {movements.map(m => (
            <div key={m.type} style={{ background: '#0F2240', border: `1px solid ${dangerColors[m.danger]}40`, borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '32px', flexShrink: 0 }}>{m.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px' }}>{m.type}</span>
                  <span style={{ background: `${dangerColors[m.danger]}20`, color: dangerColors[m.danger], borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: '700′ }}>{m.danger}</span>
                </div>
                <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>Direction: {m.direction}</div>
                <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '4px' }}>Cause: {m.cause}</div>
                <div style={{ color: '#64748B', fontSize: '13px' }}>Visual: {m.visual}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🔍 Observed Movement Pattern → Assessment Guide</h2>
          <p style={{ color: '#94A3B8', fontSize: '14px', marginBottom: '16px' }}>Select what you observe in your home:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {patterns.map(p => (
              <button key={p.key} onClick={() => { setPattern(p.key); setAssessment(assessments[p.key]); }}
                style={{ background: pattern === p.key ? '#F5E642′ : '#1E3A5F', color: pattern === p.key ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600′ }}>
                {p.label}
              </button>
            ))}
          </div>
          {assessment && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#E8EAF0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{assessment}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>📐 How to Measure DFW Foundation Movement</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { icon: '📱', tool: 'Laser Level App', use: 'Quick floor slope check — free' },
              { icon: '📏', tool: 'Zip Level / Altimeter', use: 'Professional elevation benchmarks' },
              { icon: '🔭', tool: 'Optical Level', use: 'Engineer standard, ±1/8 inch accuracy' },
              { icon: '📋', tool: 'Elevation Report', use: 'Document current state before repair' },
            ].map(t => (
              <div key={t.tool} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{t.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{t.tool}</div>
                <div style={{ color: '#64748B', fontSize: '12px' }}>{t.use}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}