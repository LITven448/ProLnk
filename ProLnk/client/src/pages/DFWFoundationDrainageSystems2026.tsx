import { useState } from 'react';

export default function DFWFoundationDrainageSystems2026() {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');

  const problems = [
    { label: 'Water pooling near foundation', solution: 'Surface regrading first ($500-2,000): grade away 6 inches in first 10 feet from foundation. Fastest ROI. Add downspout extensions minimum 6ft — most DFW homes discharge right at foundation.' },
    { label: 'Downspouts discharging near house', solution: 'Underground downspout extensions to daylight ($200-800 per downspout). Slope minimum 1/8 inch per foot. Use solid pipe within 10ft of foundation, then perforated.' },
    { label: 'Side yard drainage problem', solution: 'Channel drain (ACO drain) across side yard entry point ($150-300 per linear ft installed). Tie into storm system or daylight at street. Prevents sheet flow against foundation.' },
    { label: 'Chronic wet foundation perimeter', solution: 'French drain system ($25-50/linear ft): perforated pipe in gravel trench, filter fabric wrap. DFW clay = must go minimum 18 inches deep. Regrade + French drain combo is gold standard.' },
    { label: 'Backyard holds water after rain', solution: 'French drain across low point + pop-up emitter at property edge. DFW clay drains < 0.5 in/hr — standing water 24h+ after rain is normal without drainage system.' },
    { label: 'Foundation movement / pier repair', solution: 'Fix drainage BEFORE foundation repair. Piers fail when drainage unaddressed. Get drainage consult + foundation eval together. Typical DFW drainage + foundation: $8,000-25,000 combined.' },
  ];

  const handleSelect = (p: { label: string; solution: string }) => {
    setProblem(p.label);
    setSolution(p.solution);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DFW 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🌊 DFW Foundation Drainage Systems Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>Complete drainage solutions for DFW foundation protection — clay soil demands active water management.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { method: 'French Drain', cost: '$25–50/linear ft', best: 'Chronic perimeter wet' },
            { method: 'Channel Drain', cost: '$150–300/linear ft', best: 'Side yard sheet flow' },
            { method: 'Surface Regrade', cost: '$500–2,000', best: 'Poor slope away' },
            { method: 'Downspout Extension', cost: '$200–800 each', best: 'Discharge at foundation' },
          ].map(item => (
            <div key={item.method} style={{ background: '#1e2d4a', borderRadius: 8, padding: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 4 }}>{item.method}</div>
              <div style={{ fontSize: 13, color: '#e2e8f0', marginBottom: 4 }}>💰 {item.cost}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>Best for: {item.best}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔍 Drainage Problem Solver</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {problems.map(p => (
            <button key={p.label} onClick={() => handleSelect(p)} style={{ background: problem === p.label ? '#F5E642′ : '#1e2d4a', color: problem === p.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{p.label}</button>
          ))}
        </div>
        {solution && (
          <div style={{ background: '#1e2d4a', border: '1px solid #F5E642', borderRadius: 8, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Solution Guide</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>{solution}</p>
          </div>
        )}
        <div style={{ marginTop: 32, color: '#64748b', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Foundation Drainage · 2026 Edition</div>
      </div>
    </div>
  );
}