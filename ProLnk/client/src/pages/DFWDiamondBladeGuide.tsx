import { useState } from 'react';

const bladeMatrix = [
  { app: 'Concrete Cutting', material: 'Standard Concrete', spec: 'Segmented Rim, 10mm segment', wetDry: 'Either (wet preferred)', rpm: '6,000–8,000 RPM' },
  { app: 'Concrete Cutting', material: 'Reinforced Concrete', spec: 'Turbo Segmented, 12mm segment', wetDry: 'Wet', rpm: '5,000–7,000 RPM' },
  { app: 'Brick Cutting', material: 'Standard Brick', spec: 'Segmented Rim, 7mm segment', wetDry: 'Either', rpm: '6,000–8,000 RPM' },
  { app: 'Brick Cutting', material: 'Fire Brick', spec: 'Continuous Rim', wetDry: 'Wet', rpm: '5,000–6,000 RPM' },
  { app: 'Tile Cutting', material: 'Ceramic/Porcelain', spec: 'Continuous Rim, ultra-thin', wetDry: 'Wet', rpm: '6,000–8,000 RPM' },
  { app: 'Tile Cutting', material: 'Granite/Natural Stone', spec: 'Turbo Continuous Rim', wetDry: 'Wet only', rpm: '5,500–7,000 RPM' },
];

export default function DFWDiamondBladeGuide() {
  const [app, setApp] = useState('');
  const [material, setMaterial] = useState('');
  const [result, setResult] = useState<typeof bladeMatrix[0] | null>(null);

  const materials = app ? [...new Set(bladeMatrix.filter(b => b.app === app).map(b => b.material))] : [];

  function calculate() {
    const match = bladeMatrix.find(b => b.app === app && b.material === material);
    setResult(match || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>💎 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Diamond Blade Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW's mix of concrete slabs, brick facades, and imported tile demands the right diamond blade. Wet vs. dry cutting, blade spec, and RPM ratings all matter — especially in DFW’s extreme heat where dry blades overheat fast.
        </p>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💎 DFW Blade Selector</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Cutting Application</label>
            <select value={app} onChange={e => { setApp(e.target.value); setMaterial(''); setResult(null); }} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select application...</option>
              <option>Concrete Cutting</option>
              <option>Brick Cutting</option>
              <option>Tile Cutting</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6, fontSize: 13 }}>Material</label>
            <select value={material} onChange={e => setMaterial(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value=''>Select material...</option>
              {materials.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Blade Spec</button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: '#F5E642′ }}>💎 Recommended Blade</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Blade Type', result.spec],
                ['Wet vs Dry', result.wetDry],
                ['RPM Range', result.rpm],
                ['DFW Note', result.wetDry.includes('Wet') ? 'Keep water flowing — DFW summer heat accelerates blade glazing' : 'Limit dry cuts to 30 sec bursts in DFW heat'],
              ].map(([label, value], i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ DFW Cutting Conditions</h2>
          {[
            { icon: '☀️', title: 'Summer Heat (100°F+)', desc: 'Always wet-cut in DFW summer. Dry blades glaze over quickly above 95°F, causing blade bounce and cracking.' },
            { icon: '💨', title: 'Dust Control', desc: 'DFW clay dust is fine and hazardous. Wet cutting is mandatory for silica-containing materials (concrete, stone).' },
            { icon: '🌧️', title: 'Winter/Rain', desc: 'Wet cutting remains preferred year-round. Cold temps below 40°F can cause thermal shock on continuous rim blades.' },
          ].map((tip, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{tip.icon} {tip.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{tip.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Need a DFW Tile or Concrete Pro?</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Large format tile, natural stone, and reinforced concrete cutting should be left to licensed pros. ProLnk connects you with vetted DFW tradespeople.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
