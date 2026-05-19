import { useState } from 'react';

export default function DFWFoundationDrainPipe2026() {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState('');

  const problems = [
    'Water pooling near foundation',
    'Downspouts dumping at foundation',
    'Yard drains to foundation from street',
    'Crawl space or under-slab moisture',
  ];

  const guide: Record<string, string> = {
    'Water pooling near foundation': 'French drain is the solution. Install 4″ perforated HDPE pipe at 18-24″ depth alongside foundation (DFW clay requires depth to get below shrink-swell zone). Slope 1/8″ per foot minimum toward outlet. Wrap pipe in filter fabric to prevent DFW clay intrusion. Cover with washed gravel then filter fabric then soil. Cost: $25-45/linear foot installed.',
    'Downspouts dumping at foundation': 'Install solid 4″ PVC or corrugated HDPE downspout extension underground. Solid pipe (not perforated) carries roof water away — perforated near foundation defeats the purpose. Minimum 10-foot extension, 15-20 ft preferred in DFW. Slope 1/4″ per foot. Pop-up emitter at discharge end. Cost: $300-800 per downspout.',
    'Yard drains to foundation from street': 'French drain across yard intercepts surface flow. Install 4″ perforated pipe perpendicular to flow direction, 12-18″ deep in DFW clay. Yard drains (catch basins) at low spots connect to solid drain pipe to street or detention area. DFW municipalities have rules about where you can discharge — check with city before installing.',
    'Crawl space or under-slab moisture': 'Under-slab drainage requires excavation or injection. French drain around perimeter exterior is first step. For severe cases, interior drain tile under slab connected to sump pump. DFW clay moves significantly — ensure all pipes have flexible joints or use HDPE with bell ends. Foundation contractor required for under-slab work.',
  };

  function handleCheck() {
    if (!problem) return;
    setResult(guide[problem] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>💧🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 4 }}>DFW Foundation Drain Pipe Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Proper drainage is the most important thing you can do for a DFW foundation. Expansive clay soils mean water control equals foundation stability.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔧 Pipe Types for DFW Foundations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🟠', label: 'Perforated HDPE', desc: 'French drains — flexible, handles DFW clay movement' },
              { icon: '⚪', label: 'Solid PVC', desc: 'Downspout extensions — smooth bore, best flow rate' },
              { icon: '🔵', label: 'Corrugated HDPE', desc: 'Flexible downspout extensions — good for curves' },
              { icon: '🟡', label: 'HDPE Bell End', desc: 'Under-slab — handles movement at joints' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0d2137', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 My Problem → Pipe Solution</h2>
          <select
            value={problem}
            onChange={e => { setProblem(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14, marginBottom: 12 }}
          >
            <option value="">Select your drainage problem...</option>
            {problems.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Get Pipe Solution
          </button>
          {result && (
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 16, marginTop: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📐 DFW Drain Standards</h2>
          {[
            'Minimum slope: 1/8 inch per foot for perforated pipe, 1/4 inch for solid pipe',
            'Depth: 18-24 inches in DFW clay to reach below active shrink-swell zone',
            'Always wrap perforated pipe in filter fabric sock to prevent clay clogging',
            'HDPE is preferred over PVC in DFW for flexibility as clay moves seasonally',
            'Get a drainage survey before installing — water goes somewhere and you need to know where',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
