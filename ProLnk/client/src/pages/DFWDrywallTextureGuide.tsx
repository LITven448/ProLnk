import { useState } from 'react';

export default function DFWDrywallTextureGuide() {
  const [textureType, setTextureType] = useState('');
  const [repairArea, setRepairArea] = useState('');
  const [result, setResult] = useState(null);

  const guide = {
    skipTrowel: {
      small: { technique: 'Hand-apply with 6" trowel, pull at 15° angle', tools: 'Trowel, joint compound, sanding sponge', diy: true, note: 'Skip trowel is forgiving — DFW\’s most DIY-friendly texture' },
      medium: { technique: 'Multiple passes with trowel, feather edges 8" out', tools: '6" and 10" trowel, mud pan, sanding block', diy: true, note: 'Practice on cardboard first to match your existing skip pattern' },
      large: { technique: 'Full section re-texture recommended', tools: 'All trowels + spray equipment', diy: false, note: 'Large areas are hard to blend — consider professional for rooms over 10 sq ft' },
    },
    orangePeel: {
      small: { technique: 'Homax spray can — 2–3 light coats from 18"', tools: 'Homax Orange Peel spray can, primer', diy: true, note: 'Test spray pattern on cardboard to match bead size before applying' },
      medium: { technique: 'Spray can with multiple light passes', tools: 'Homax can, tape, primer, sanding sponge', diy: true, note: 'Let each coat tack before adding next — DFW humidity slows this' },
      large: { technique: 'Hopper gun with air compressor at 25–30 PSI', tools: 'Hopper gun, compressor, joint compound thinned 50%', diy: false, note: 'Professional sprayers achieve much more consistent results on large areas' },
    },
    smooth: {
      small: { technique: 'Skim coat with all-purpose compound, sand to 220 grit', tools: '12" knife, compound, fine sanding sponge', diy: true, note: 'Smooth texture shows every imperfection — prime before painting' },
      medium: { technique: '2–3 skim coats, feather wide, sand between each', tools: '12–18" finishing knife, pole sander, 220 grit', diy: false, note: 'Medium smooth patches are very hard to hide — professional recommended' },
      large: { technique: 'Full wall skim coat or drywall replacement', tools: 'Full skim coat setup or new drywall', diy: false, note: 'Large smooth texture repairs almost always require professional finishing' },
    },
    popcorn: {
      small: { technique: 'Homax spray can or mix and stipple with brush', tools: 'Homax Popcorn texture can or DIY mix, brush', diy: true, note: 'Test for asbestos if home built before 1980 — very important in DFW older homes' },
      medium: { technique: 'Spray or stipple brush over primed surface', tools: 'Popcorn texture mix, pump sprayer or brush', diy: true, note: 'Wet slightly before applying to help blend with existing texture' },
      large: { technique: 'Consider removing all popcorn and replacing with modern texture', tools: 'Scraper, spray equipment or trowel tools', diy: false, note: 'Many DFW homeowners use large repairs as opportunity to upgrade texture' },
    },
  };

  function calculate() {
    if (!textureType || !repairArea) return;
    setResult(guide[textureType][repairArea]);
  }

  const textures = [
    { val: 'skipTrowel', label: 'Skip Trowel', icon: '🖐️', desc: 'Most common in DFW — random swirl/skip pattern' },
    { val: 'orangePeel', label: 'Orange Peel', icon: '🍊', desc: 'Second most common — fine stippled bumps' },
    { val: 'smooth', label: 'Smooth / Flat', icon: '📄', desc: 'Growing trend in modern DFW homes' },
    { val: 'popcorn', label: 'Popcorn', icon: '🍿', desc: 'Older DFW homes — heavily textured ceiling' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Drywall Texture Matching Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>DFW homes have distinct texture profiles by era. Matching your repair to the original texture is the difference between invisible and obvious.</p>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Identify Your DFW Texture</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {textures.map(t => (
              <div key={t.val} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔬 How to Identify Your Texture</h2>
          {[
            { step: '1', title: 'Take a side-light photo', desc: 'Hold a flashlight at a sharp angle to the wall and photograph. Texture pops in raking light.' },
            { step: '2', title: 'Measure the pattern', desc: 'Skip trowel: 2–4" patterns. Orange peel: 1/8"–1/4" bumps. Smooth: no depth. Popcorn: dense coverage.' },
            { step: '3', title: 'Check the era', desc: 'DFW homes pre-1990: likely popcorn ceilings, skip trowel walls. 1990–2010: orange peel. 2010+: smooth or skip trowel.' },
          ].map(item => (
            <div key={item.step} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{item.step}</div>
              <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div><div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🎯 Get Your Matching Technique</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>EXISTING TEXTURE</label>
              {textures.map(opt => (
                <button key={opt.val} onClick={() => setTextureType(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${textureType === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: textureType === opt.val ? '#F5E642' : 'transparent', color: textureType === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{opt.icon} {opt.label}</button>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 8 }}>REPAIR AREA</label>
              {[{ val: 'small', label: 'Under 4 sq ft' }, { val: 'medium', label: '4–10 sq ft' }, { val: 'large', label: 'Over 10 sq ft' }].map(opt => (
                <button key={opt.val} onClick={() => setRepairArea(opt.val)} style={{ display: 'block', width: '100%', padding: '10px 14px', marginBottom: 8, borderRadius: 8, border: `2px solid ${repairArea === opt.val ? '#F5E642' : '#1e3a5f'}`, backgroundColor: repairArea === opt.val ? '#F5E642' : 'transparent', color: repairArea === opt.val ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 14 }}>{opt.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Get Technique →</button>

          {result && (
            <div style={{ marginTop: 24, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${result.diy ? '#22c55e' : '#ef4444'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Matching Technique</div>
                <div style={{ backgroundColor: result.diy ? '#22c55e' : '#ef4444', color: '#fff', borderRadius: 6, padding: '4px 12px', fontSize: 13, fontWeight: 700 }}>{result.diy ? '✅ DIY Friendly' : '⚠️ Pro Recommended'}</div>
              </div>
              <div style={{ color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>🔧 {result.technique}</div>
              <div style={{ color: '#94a3b8', marginBottom: 12, fontSize: 14 }}>🛒 Tools: {result.tools}</div>
              <div style={{ backgroundColor: '#0f1f3d', borderRadius: 8, padding: 12 }}><span style={{ color: '#F5E642' }}>💡 </span><span style={{ color: '#94a3b8', fontSize: 14 }}>{result.note}</span></div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Always prime and paint after texture repair · Test on scrap before applying to wall</div>
      </div>
    </div>
  );
}
