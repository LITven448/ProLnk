import { useState } from 'react';

export default function DFWFoundationSteelBeamGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    'Load-bearing wall with pier failure',
    'Beam under masonry chimney',
    'Spanning multiple pier points',
    'Engineer specified beam in report',
  ];

  const guide: Record<string, string> = {
    'Load-bearing wall with pier failure': 'Steel beam is often the right answer here. A W8x31 or W10x33 beam can span 12-16 feet under a load-bearing wall, eliminating the need for piers every 6-8 feet. Engineer must specify size. Permit required. Cost: $3,500-7,000 installed including permit.',
    'Beam under masonry chimney': 'Steel I-beam under chimneys is common in DFW repairs. The chimney creates a point load that piers alone cannot handle — a beam distributes it. W8x24 typical for single-story chimney. Requires structural engineer stamp on DFW permits.',
    'Spanning multiple pier points': 'Grade beam reinforcement with steel may be specified when piers are spaced too far apart or where clay movement is extreme. The beam ties piers together structurally. Less common than pier-only, more expensive but more stable in extreme DFW clay.',
    'Engineer specified beam in report': 'Follow the engineer report exactly — do not substitute pier-only approach. Structural engineers in DFW specify beams when load paths require it. Get 3 bids from licensed foundation contractors. Verify each bid uses the engineer-specified beam size and length.',
  };

  function handleCheck() {
    if (!situation) return;
    setResult(guide[situation] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏗️🔩</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 4 }}>DFW Steel Beam in Foundation Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Steel I-beams are sometimes specified by structural engineers as foundation repair components in DFW — not a DIY option, always requires permit and engineer oversight.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚖️ Steel Beam vs Pier Approach</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#0d2137' }}>
                  {['Factor', 'Piers Only', 'Steel Beam'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#F5E642' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Cost', '$1,500-4,500', '$3,500-7,000'],
                  ['Spans', '6-8 ft', '12-20 ft'],
                  ['Permit', 'Usually', 'Always'],
                  ['Engineer', 'Recommended', 'Required'],
                  ['Clay movement', 'Good', 'Excellent'],
                ].map(([f, p, s]) => (
                  <tr key={f} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '8px 12px', color: '#94a3b8' }}>{f}</td>
                    <td style={{ padding: '8px 12px', color: '#e2e8f0' }}>{p}</td>
                    <td style={{ padding: '8px 12px', color: '#e2e8f0' }}>{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 My Situation → Steel Beam Applicability</h2>
          <select
            value={situation}
            onChange={e => { setSituation(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14, marginBottom: 12 }}
          >
            <option value="">Select your situation...</option>
            {situations.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Get Steel Beam Guide
          </button>
          {result && (
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 16, marginTop: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🚨 Always Required in DFW</h2>
          {[
            'Structural engineer must specify beam size, depth, and bearing conditions',
            'City permit required — Dallas, Fort Worth, Plano, and all DFW cities enforce this',
            'Inspection required after beam installation before backfill',
            'Contractor must be licensed in Texas (TSLB licensed)',
            'Get engineer sign-off letter after completion for future sale disclosure',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>⚠️</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
