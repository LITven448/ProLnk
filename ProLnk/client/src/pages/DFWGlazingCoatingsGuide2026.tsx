import { useState } from 'react';

export default function DFWGlazingCoatingsGuide2026() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  const problems = [
    'Too much heat coming in',
    'UV fading furniture',
    'High energy bills',
    'Glare on screens',
    'Old single-pane windows',
  ];

  const getSolution = () => {
    if (!problem) return;
    if (problem === 'Too much heat coming in') setSolution('🌡️ Spectrally Selective Low-E Coating — blocks solar heat (SHGC < 0.25) while allowing daylight. Works 3x better than tint alone. Exterior application best for DFW west-facing windows.');
    else if (problem === 'UV fading furniture') setSolution('🌞 Low-E Window Film (3M Prestige or equivalent) — blocks 99% UV with no significant tint. Apply to existing glass. Payback: 3-5 yrs in DFW sun exposure. Much cheaper than replacement.');
    else if (problem === 'High energy bills') setSolution('⚡ Double-pane Low-E replacement windows — industry standard for DFW. Triple-pane NOT recommended (ROI > 30 yrs in DFW climate, minimal benefit). Target U-factor < 0.30, SHGC < 0.25.');
    else if (problem === 'Glare on screens') setSolution('🖥️ Neutral-density window film + solar shades — reduces visible light transmission 40-60% without blocking heat. Stack with Low-E coating on west-facing rooms. Cheap and fast to install.');
    else setSolution('🪟 Full replacement with double-pane Low-E units — single-pane in DFW loses 3x more energy. Budget $400-$800/window installed. Look for ENERGY STAR certified with DFW climate zone rating.');
  };

  const glazingTypes = [
    { name: 'Low-E Coating', icon: '🔵', uvBlock: '70%', heatBlock: '40%', cost: 'Included in new windows' },
    { name: 'Spectrally Selective', icon: '🌈', uvBlock: '99%', heatBlock: '60%', cost: '$100-$200 premium' },
    { name: 'Window Film', icon: '🎞️', uvBlock: '99%', heatBlock: '30-50%', cost: '$5-$15/sq ft' },
    { name: 'Triple Pane', icon: '🪟', uvBlock: '70%', heatBlock: '50%', cost: '30-50% over double' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🪟</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Window Glazing and Coatings Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Advanced glazing solutions for DFW sun, heat, and UV intensity</p>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: 28 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#1e2d45′ }}>
                {['Type', 'UV Block', 'Heat Block', 'Cost'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#F5E642', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {glazingTypes.map((g, i) => (
                <tr key={g.name} style={{ background: i % 2 === 0 ? '#0f1f35′ : '#1e2d45' }}>
                  <td style={{ padding: '10px 14px' }}>{g.icon} {g.name}</td>
                  <td style={{ padding: '10px 14px', color: '#4ade80′ }}>{g.uvBlock}</td>
                  <td style={{ padding: '10px 14px', color: '#f97316′ }}>{g.heatBlock}</td>
                  <td style={{ padding: '10px 14px', color: '#94a3b8′ }}>{g.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Find Your DFW Glazing Solution</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>What is your window problem?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {problems.map(p => (
                <button key={p} onClick={() => setProblem(p)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: problem === p ? '#F5E642′ : '#0A1628', color: problem === p ? '#0A1628' : '#fff', fontSize: 13, textAlign: ’left' }}>{p}</button>
              ))}
            </div>
          </div>
          <button onClick={getSolution} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Solution →</button>
          {solution && <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.6 }}>{solution}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 14, fontSize: 12, color: '#94a3b8′ }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 DFW Pro Tip: </span>
          Triple-pane windows have a 30+ year payback period in DFW climate — the milder winters do not justify the cost. Double-pane Low-E is the sweet spot. For existing windows, 3M Prestige film is the highest ROI upgrade you can make.
        </div>
      </div>
    </div>
  );
}
