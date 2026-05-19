import { useState } from 'react';

export default function DFWConcreteFloorGuide2026() {
  const [homeType, setHomeType] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [guide, setGuide] = useState('');

  const homeTypes = ['New build', '1960s-1990s home', 'Slab foundation', 'Raised foundation'];
  const lifestyles = ['Allergy sufferers', 'Pets', 'Kids + high traffic', 'Minimalist aesthetic'];

  const getGuide = () => {
    if (!homeType || !lifestyle) return;
    if (lifestyle === 'Allergy sufferers') setGuide('✅ Polished concrete is ideal — no carpet fibers trapping pollen, dust mites, or pet dander. Seal every 2-3 yrs with DFW hard water. Add radiant in-floor heat for winters.');
    else if (lifestyle === 'Pets') setGuide('🐾 Use penetrating sealer (not topcoat) for scratch resistance. DFW clay soil movement means micro-cracks are normal — choose matte finish to hide imperfections. Clean spills fast; pet acids etch unsealed concrete.');
    else if (lifestyle === 'Kids + high traffic') setGuide('👶 Epoxy coating over concrete — harder than polished, resists scuffs. Add area rugs for comfort. DFW thermal mass keeps floors 5-8°F cooler in summer, a real benefit.');
    else setGuide('🏠 Polished + dyed concrete for minimalist look. Gray or charcoal tones hide DFW dust. Pair with in-floor radiant heating for winter comfort. Thermal mass helps energy bills significantly.');
  };

  const benefits = [
    { icon: '❄️', title: 'Thermal Mass', desc: 'Stays cool in summer, absorbs heat in winter' },
    { icon: '🌿', title: 'Allergy Friendly', desc: 'No fibers, no mold risk, easy to clean' },
    { icon: '💧', title: 'Water Resistant', desc: 'Sealed properly withstands DFW flooding events' },
    { icon: '⚡', title: 'Energy Savings', desc: 'Reduces AC load 10-20% via thermal regulation' },
  ];

  const warnings = [
    '🏚️ DFW clay soil causes slab movement — expect hairline cracks, not defects',
    '💧 DFW hard water leaves mineral deposits — use penetrating sealer annually',
    '🐾 Pet urine etches unsealed concrete permanently — seal immediately after install',
    '🥶 Feels cold in winter — pair with radiant heat or area rugs',
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🪵</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Concrete Floor Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Polished, epoxy, and sealed concrete floors for DFW homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 28 }}>
          {benefits.map(b => (
            <div key={b.title} style={{ background: '#1e2d45', borderRadius: 10, padding: 14, border: '1px solid #2d4a6b' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{b.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{b.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 Get Your DFW Concrete Floor Guide</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Home type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {homeTypes.map(h => (
                <button key={h} onClick={() => setHomeType(h)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: homeType === h ? '#F5E642′ : '#0A1628', color: homeType === h ? '#0A1628' : '#fff', fontSize: 12 }}>{h}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Your lifestyle:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {lifestyles.map(l => (
                <button key={l} onClick={() => setLifestyle(l)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: lifestyle === l ? '#F5E642′ : '#0A1628', color: lifestyle === l ? '#0A1628' : '#fff', fontSize: 12 }}>{l}</button>
              ))}
            </div>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Guide →</button>
          {guide && <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.6 }}>{guide}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>⚠️ DFW-Specific Warnings</div>
          {warnings.map((w, i) => <div key={i} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{w}</div>)}
        </div>
      </div>
    </div>
  );
}
