import { useState } from 'react';

export default function DFWFencingGuide2026() {
  const [fenceType, setFenceType] = useState('wood');
  const [linearFeet, setLinearFeet] = useState(150);

  const fenceData: Record<string, { costLow: number; costHigh: number; lifespan: string; notes: string }> = {
    wood: { costLow: 18, costHigh: 28, lifespan: '8-10 years', notes: 'Cedar preferred in DFW — more termite resistant. Heat warps pine quickly.' },
    vinyl: { costLow: 28, costHigh: 40, lifespan: '20-25 years', notes: 'Low maintenance, no painting. May yellow slightly after years of DFW sun.' },
    iron: { costLow: 35, costHigh: 55, lifespan: '30+ years', notes: 'Ornamental iron lasts a lifetime with annual rust prevention coating.' },
    chainlink: { costLow: 12, costHigh: 18, lifespan: '15-20 years', notes: 'Most budget-friendly. Not HOA-approved in many DFW neighborhoods.' },
  };

  const fence = fenceData[fenceType];
  const lowTotal = (fence.costLow * linearFeet).toLocaleString();
  const highTotal = (fence.costHigh * linearFeet).toLocaleString();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2 }}>DFW HOME SERVICES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Fencing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Wood fences last 8-10 years in DFW heat and termite pressure. Permits are required in most DFW cities for fences over 6 feet. Always check HOA restrictions before buying materials.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🪲', label: 'Termite Risk', val: 'Cedar preferred' }, { icon: '📋', label: 'Permit Needed', val: 'Over 6ft in DFW' }, { icon: '🌡️', label: 'Heat Warping', val: 'Check wood annually' }].map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: '#cbd5e1′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>💰 Cost & Longevity Estimator</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>FENCE TYPE</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {Object.keys(fenceData).map(t => (
                <button key={t} onClick={() => setFenceType(t)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: fenceType === t ? '#F5E642′ : '#2d3f5a', color: fenceType === t ? '#0A1628' : '#fff' }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>LINEAR FEET: {linearFeet}</div>
            <input type="range" min={50} max={500} step={10} value={linearFeet} onChange={e => setLinearFeet(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${lowTotal} - ${highTotal}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>EXPECTED LIFESPAN</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{fence.lifespan}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{fence.notes}</div>
        </div>
      </div>
    </div>
  );
}