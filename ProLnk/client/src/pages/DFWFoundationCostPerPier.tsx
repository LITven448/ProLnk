import { useState } from 'react';

const pierTypes = [
  { type: 'Steel Push Pier', range: '$400–800', avg: 600, depth: '15–30 ft', best: 'Unstable or expansive clay — the DFW standard. Reaches bedrock or load-bearing strata.', warranty: '25 years typical' },
  { type: 'Pressed Concrete Pier', range: '$350–600', avg: 475, depth: '7–12 ft', best: 'Lighter loads, less dramatic movement. Faster install. More common in older DFW neighborhoods.', warranty: '10–15 years typical' },
  { type: 'Helical Pier', range: '$500–900', avg: 700, depth: '12–25 ft', best: 'New construction, additions, tight access. Screwed into soil — less vibration than push piers.', warranty: '25 years typical' },
];

const redFlags = [
  'No written warranty on pier installation',
  'Quote in total dollars only — demand cost per pier',
  'Company cannot provide engineering report or PE stamp',
  'No mention of drainage correction (70% of DFW foundation issues are drainage-caused)',
  'Quote dramatically below market — cut-rate piers often fail within 5 years',
  'High-pressure same-day close tactics',
];

export default function DFWFoundationCostPerPier() {
  const [pierType, setPierType] = useState('');
  const [count, setCount] = useState('');
  const [result, setResult] = useState<null | { low: number; high: number; avg: number; info: typeof pierTypes[0] }>(null);

  function calculate() {
    const n = parseInt(count) || 0;
    const info = pierTypes.find(p => p.type === pierType);
    if (!n || !info) return;
    const [lo, hi] = info.range.replace(/\$/g, '').split('–').map(Number);
    setResult({ low: lo * n, high: hi * n, avg: info.avg * n, info });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Foundation Repair Cost Per Pier in DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: 32 }}>
          DFW's expansive clay soil shrinks and swells with moisture changes — making foundation movement one of the most common and misunderstood home issues in the Metroplex. Understanding cost per pier helps you evaluate quotes accurately.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 32, fontWeight: 700 }}>
          📌 DFW foundation repair: $400–900 per pier · Average job uses 8–20 piers ($5,000–15,000 total)
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Pier Types for DFW Conditions</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {pierTypes.map(p => (
            <div key={p.type} style={{ background: '#111F3A', borderRadius: 8, padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{p.type}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{p.range} per pier</div>
                  <div style={{ color: '#8A9BB5', fontSize: 12 }}>Depth: {p.depth}</div>
                </div>
              </div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>BEST FOR: </span>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{p.best}</span>
              </div>
              <div>
                <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>WARRANTY: </span>
                <span style={{ color: '#8A9BB5', fontSize: 13 }}>{p.warranty}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🏗️ Calculate Your DFW Foundation Cost</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Pier Type</label>
              <select value={pierType} onChange={e => setPierType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 14, boxSizing: 'border-box' }}>
                <option value="">Select pier type...</option>
                {pierTypes.map(p => <option key={p.type} value={p.type}>{p.type}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BB5', fontSize: 13, marginBottom: 6 }}>Number of Piers Quoted</label>
              <input value={count} onChange={e => setCount(e.target.value)} placeholder="e.g. 12″ style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%' }}>Assess Quote</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Expected range: ${result.low.toLocaleString()}–${result.high.toLocaleString()}</div>
              <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>DFW market average: ${result.avg.toLocaleString()}</div>
              <div style={{ color: '#8A9BB5', fontSize: 13, lineHeight: 1.6 }}>
                Quotes within this range are competitive for DFW. Ask for cost per pier in writing, warranty documentation, and whether drainage correction is included.
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111F3A', borderRadius: 8, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#FF4444′ }}>🚩 DFW Foundation Quote Red Flags</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {redFlags.map((f, i) => <li key={i} style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.9 }}>{f}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
