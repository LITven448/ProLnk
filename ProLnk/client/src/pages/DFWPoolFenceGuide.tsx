import { useState } from 'react';

const COST_PER_FOOT: Record<string, number> = {
  chain: 18,
  aluminum: 32,
  wood: 28,
  vinyl: 35,
};

const CITY_RULES: Record<string, { height: number; note: string }> = {
  Dallas: { height: 4, note: 'Standard Texas code applies' },
  Plano: { height: 5, note: 'Plano requires 5-foot barrier' },
  Frisco: { height: 5, note: 'Frisco requires 5-foot barrier' },
  Allen: { height: 4, note: 'Standard Texas code applies' },
  McKinney: { height: 4, note: 'Standard Texas code applies' },
  Arlington: { height: 4, note: 'Standard Texas code applies' },
  Irving: { height: 4, note: 'Standard Texas code applies' },
  Garland: { height: 4, note: 'Standard Texas code applies' },
};

export default function DFWPoolFenceGuide() {
  const [city, setCity] = useState('Dallas');
  const [perimeter, setPerimeter] = useState(100);
  const [material, setMaterial] = useState('aluminum');
  const [hasWallSide, setHasWallSide] = useState(false);
  const [hasGate, setHasGate] = useState(true);
  const [result, setResult] = useState<null | {
    required: number;
    fenceNeeded: number;
    cost: [number, number];
    compliant: boolean;
    issues: string[];
  }>(null);

  function calculate() {
    const rule = CITY_RULES[city] || { height: 4, note: '' };
    const fenceNeeded = hasWallSide ? Math.round(perimeter * 0.75) : perimeter;
    const low = fenceNeeded * (COST_PER_FOOT[material] * 0.85);
    const high = fenceNeeded * (COST_PER_FOOT[material] * 1.15) + (hasGate ? 350 : 0);
    const issues: string[] = [];
    if (!hasGate) issues.push('Self-latching gate required on all openings');
    if (material === 'chain' && rule.height >= 5) issues.push('Chain link may not meet 5-ft visibility requirements in your city');
    setResult({
      required: rule.height,
      fenceNeeded,
      cost: [Math.round(low), Math.round(high)],
      compliant: issues.length === 0,
      issues,
    });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🏊 DFW HOME SAFETY GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Pool Fence Requirements</h1>
        <p style={{ color: '#9AA3B2', marginBottom: '2rem' }}>Texas HB 1921 requires a 4-foot barrier around all residential pools. Some DFW cities require 5 feet. Here's what you need to know.</p>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚖️ Texas Law (HB 1921)</h2>
          <ul style={{ color: '#C8D0DC', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Minimum 4-foot barrier completely surrounding pool</li>
            <li>Self-latching gates that open outward (away from pool)</li>
            <li>Latch must be at least 54" from ground or on pool-side of gate</li>
            <li>No gaps larger than 4 inches in fence or gate</li>
            <li>House wall can serve as one side of barrier if door has alarm</li>
            <li>Homeowner liability: negligence claims average $2–8M in DFW courts</li>
          </ul>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔢 Cost Estimator</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Your City</span>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }}>
                {Object.keys(CITY_RULES).map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Pool Perimeter (linear feet)</span>
              <input type="number" value={perimeter} onChange={e => setPerimeter(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Fence Material</span>
              <select value={material} onChange={e => setMaterial(e.target.value)} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }}>
                <option value="aluminum">Aluminum (~$32/ft)</option>
                <option value="vinyl">Vinyl (~$35/ft)</option>
                <option value="wood">Wood (~$28/ft)</option>
                <option value="chain">Chain Link (~$18/ft)</option>
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasWallSide} onChange={e => setHasWallSide(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>House wall covers one side (~25%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasGate} onChange={e => setHasGate(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Include self-latching gate</span>
            </label>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
              Check Compliance + Estimate Cost
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: result.compliant ? '#0D2B1A' : '#2B1A0D', border: `1px solid ${result.compliant ? '#2ECC71' : '#E67E22'}`, borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: result.compliant ? '#2ECC71' : '#E67E22', marginBottom: '0.5rem' }}>
              {result.compliant ? '✅ Plan looks compliant' : '⚠️ Action required'}
            </div>
            <div style={{ color: '#C8D0DC', lineHeight: 1.8 }}>
              <div>Required barrier height in {city}: <strong style={{ color: '#F5E642' }}>{result.required} feet</strong></div>
              <div>Estimated fence needed: <strong style={{ color: '#F5E642' }}>{result.fenceNeeded} linear feet</strong></div>
              <div>Cost estimate: <strong style={{ color: '#F5E642' }}>${result.cost[0].toLocaleString()} – ${result.cost[1].toLocaleString()}</strong></div>
              {result.issues.map((issue, i) => <div key={i} style={{ color: '#E67E22', marginTop: 4 }}>• {issue}</div>)}
            </div>
          </div>
        )}

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🛡️ Insurance Impact</h2>
          <p style={{ color: '#C8D0DC', lineHeight: 1.7 }}>Non-compliant pool barriers can void homeowner's liability coverage. Most DFW insurers require proof of code-compliant fencing for pools. An inspector can document compliance for your insurer — ask your contractor for a certificate of completion.</p>
        </div>
      </div>
    </div>
  );
}
