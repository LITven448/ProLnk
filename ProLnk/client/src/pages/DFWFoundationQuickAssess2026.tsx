import { useState } from 'react';

export default function DFWFoundationQuickAssess2026() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState('');

  const checkItems = [
    { id: 'ext-doors', label: '🚪 Exterior doors', detail: 'Open and close all exterior doors. Sticking, gaps, or misalignment = possible movement.' },
    { id: 'int-doors', label: '🚪 Interior doors', detail: 'Interior doors that stick or swing open on their own indicate floor slope.' },
    { id: 'wall-cracks', label: '🧱 Wall cracks', detail: 'Mark any new cracks with date and width. Diagonal cracks at window corners = high concern.' },
    { id: 'floor-level', label: '📐 Floor evenness', detail: 'Place a marble on kitchen/bathroom floors. Movement in one direction = slab slope.' },
    { id: 'soil-perim', label: '🌱 Perimeter soil', detail: 'DFW clay soil must stay consistently moist. Gaps between soil and foundation = shrinkage.' },
  ];

  const results: Record<string, { label: string; detail: string; action: string }> = {
    'ext-doors': { label: '🚪 Exterior Door Issues', detail: 'Door frame misalignment often appears before visible cracks. Note which corners are tight vs. which have gaps.', action: 'Document with photos. If more than one door affected, call ProLnk for foundation assessment.' },
    'int-doors': { label: '🚪 Interior Door Issues', detail: 'Self-opening or heavy-closing doors suggest the floor plane has shifted. Mark the date you first noticed.', action: 'If combined with wall cracks, this is a pattern — ProLnk foundation assessment recommended.' },
    'wall-cracks': { label: '🧱 Wall Crack Found', detail: 'Hairline cracks under 1/16" are usually cosmetic. Diagonal cracks wider than a quarter = structural concern.', action: 'Photograph with a coin for scale. Call ProLnk if crack is diagonal, wide, or growing.' },
    'floor-level': { label: '📐 Floor Not Level', detail: 'Slope over 1" per 8 feet is considered significant in DFW engineering standards.', action: 'ProLnk can connect you with a licensed engineer for a level survey — often free initial assessment.' },
    'soil-perim': { label: '🌱 Soil Gap Found', detail: 'DFW clay soil expands and contracts with moisture. Dry soil pulling away stresses the slab edge.', action: 'Install soaker hoses 18" from foundation. If gaps are over 2", call ProLnk for watering protocol.' },
  };

  const checkedCount = Object.values(checks).filter(Boolean).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ProLnk DFW · 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>🏠 DFW Foundation Quick Assessment</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>15-minute DFW foundation check. Expansive clay soil shifts every season — catch it early.</p>

        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Check each item — tap for guidance</p>
          {checkItems.map(item => (
            <div key={item.id} style={{ background: '#1e2d45', borderRadius: '12px', padding: '16px', marginBottom: '10px', display: 'flex', gap: '14px', alignItems: 'flex-start', cursor: 'pointer' }}
              onClick={() => setSelected(selected === item.id ? '' : item.id)}>
              <div onClick={e => { e.stopPropagation(); setChecks(c => ({ ...c, [item.id]: !c[item.id] })); }}
                style={{ width: '24px', height: '24px', borderRadius: '6px', border: '2px solid', borderColor: checks[item.id] ? '#F5E642' : '#475569', background: checks[item.id] ? '#F5E642' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0A1628', fontSize: '14px' }}>
                {checks[item.id] ? '✓' : ''}
              </div>
              <div>
                <p style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '14px' }}>{item.label}</p>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>{item.detail}</p>
                {selected === item.id && results[item.id] && (
                  <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', marginTop: '10px' }}>
                    <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{results[item.id].label}</p>
                    <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 6px' }}>{results[item.id].detail}</p>
                    <p style={{ color: '#fff', fontSize: '13px', margin: 0 }}>👉 {results[item.id].action}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '14px', padding: '20px' }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>✅ {checkedCount}/5 items checked</p>
          <p style={{ color: '#0A1628', fontSize: '14px', margin: '0 0 12px' }}>If you found issues, ProLnk connects you with DFW foundation specialists — engineer-supervised, warranty-backed, and rated by your neighbors.</p>
          <a href="/" style={{ background: '#0A1628', color: '#F5E642', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Get DFW Foundation Quote →</a>
        </div>
      </div>
    </div>
  );
}