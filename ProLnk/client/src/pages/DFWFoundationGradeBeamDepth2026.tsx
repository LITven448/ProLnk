import { useState } from 'react';

export default function DFWFoundationGradeBeamDepth2026() {
  const [vintage, setVintage] = useState('pre1980');

  const guide = {
    pre1980: { depth: '18-24 inches', note: 'Older code, may not reach below active zone', risk: 'High', riskColor: '#ef4444', action: 'Consider deep pier underpinning if movement detected' },
    eighties: { depth: '24 inches', note: 'Transitional era — varies by engineer', risk: 'Moderate', riskColor: '#f59e0b', action: 'Inspect annually, monitor crack patterns' },
    nineties: { depth: '24-30 inches', note: 'Improved awareness of DFW clay behavior', risk: 'Moderate', riskColor: '#f59e0b', action: 'Monitor differential movement at corners' },
    post2000: { depth: '30+ inches', note: 'Modern spec, better clay zone clearance', risk: 'Lower', riskColor: '#22c55e', action: 'Standard maintenance, irrigation management' },
    post2015: { depth: '30-36 inches', note: 'Best practice, GPR-informed design common', risk: 'Lowest', riskColor: '#22c55e', action: 'Maintain consistent soil moisture around perimeter' },
  };

  const sel = guide[vintage as keyof typeof guide];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: '0.5rem' }}>DFW Foundation Grade Beam Depth Requirements 2026</h1>
          <p style={{ color: '#94a3b8' }}>Why DFW grade beams must reach below the active clay zone</p>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🧱 Select Your Home Vintage</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {[{k:'pre1980',l:'Pre-1980'},{k:'eighties',l:'1980s'},{k:'nineties',l:'1990s'},{k:'post2000',l:'2000-2014'},{k:'post2015',l:'2015+'}].map(v => (
              <button key={v.k} onClick={() => setVintage(v.k)}
                style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: vintage === v.k ? '2px solid #F5E642' : '2px solid #1e3a5f',
                  backgroundColor: vintage === v.k ? '#1e3a5f' : '#0d2137', color: vintage === v.k ? '#F5E642' : '#94a3b8', cursor: 'pointer' }}>{v.l}</button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><span style={{ color: '#94a3b8' }}>Grade Beam Depth</span><div style={{ fontSize: '1.6rem', color: '#F5E642' }}>{sel.depth}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Movement Risk</span><div style={{ fontSize: '1.4rem', color: sel.riskColor }}>{sel.risk}</div></div>
          </div>
          <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>{sel.note}</div>
          <div style={{ backgroundColor: '#0A1628', padding: '0.75rem', borderRadius: '8px', color: '#22c55e' }}>✅ {sel.action}</div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📊 DFW Clay Active Zone Facts</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>DFW expansive clay active zone: top 5-7 feet of soil moves seasonally</li>
            <li>Grade beams must extend BELOW active zone to anchor to stable soil</li>
            <li>Soil moisture swings of 4-6% cause 2-4 inches of vertical movement</li>
            <li>Corner lift and center sag are both caused by uneven soil moisture</li>
            <li>Deep piers (10-15 ft) bypass the active zone entirely</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
