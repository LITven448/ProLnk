import { useState } from 'react';

const PIER_COSTS: Record<string, { low: number; high: number; warranty: string; note: string }> = {
  steel: { low: 1200, high: 1800, warranty: 'Lifetime transferable', note: 'Best for deep load-bearing soil; most common in DFW' },
  helical: { low: 900, high: 1500, warranty: 'Lifetime transferable', note: 'Ideal for lighter loads, new construction, areas with expansive clay' },
  concrete: { low: 350, high: 600, warranty: '5–10 years', note: 'Pressed concrete cylinders; lower cost but shorter warranty, less reliable in DFW clay' },
};

export default function DFWFoundationRepairCostGuide() {
  const [sqft, setSqft] = useState('');
  const [corners, setCorners] = useState('');
  const [pierType, setPierType] = useState('');
  const [result, setResult] = useState<null | { low: number; high: number; pierInfo: typeof PIER_COSTS.steel; totalPiers: number }>(null);

  function estimate() {
    const sf = parseInt(sqft);
    const c = parseInt(corners);
    if (!sf || !c || !pierType) return;
    const piers = PIER_COSTS[pierType];
    const basePiers = Math.round(sf / 150);
    const cornerMultiplier = c <= 1 ? 0.3 : c <= 2 ? 0.5 : c <= 3 ? 0.75 : 1;
    const totalPiers = Math.max(4, Math.round(basePiers * cornerMultiplier));
    setResult({ low: totalPiers * piers.low, high: totalPiers * piers.high, pierInfo: piers, totalPiers });
  }

  const pill = (label: string, val: string, current: string, set: (v: string) => void) => (
    <button key={val} onClick={() => set(val)} style={{
      padding: '8px 16px', borderRadius: 20, border: '2px solid',
      borderColor: current === val ? '#F5E642' : '#2A3A5C',
      background: current === val ? '#F5E642' : 'transparent',
      color: current === val ? '#0A1628' : '#CBD5E1',
      cursor: 'pointer', fontWeight: 600, fontSize: 13, margin: '4px 6px 4px 0'
    }}>{label}</button>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#CBD5E1', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', margin: '0 0 8px' }}>Foundation Repair Cost Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW sits on some of the most <strong style={{ color: '#F5E642' }}>expansive clay soil in the US</strong> — called Blackland Prairie clay. It swells when wet and shrinks when dry, making foundation movement a near-universal issue. Here's what repair actually costs.
        </p>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Home Square Footage</label>
            <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2200"
              style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '2px solid #2A3A5C', background: '#0A1628', color: '#F1F5F9', fontSize: 16, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Number of Affected Corners / Areas</label>
            <div>{[['1 corner', '1'], ['2 corners', '2'], ['3 corners', '3'], ['4+ / widespread', '4']].map(([l, v]) => pill(l, v, corners, setCorners))}</div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Pier Type</label>
            <div>{[['Steel Push Pier', 'steel'], ['Helical Pier', 'helical'], ['Pressed Concrete', 'concrete']].map(([l, v]) => pill(l, v, pierType, setPierType))}</div>
          </div>
          <button onClick={estimate} style={{ width: '100%', padding: '14px', borderRadius: 8, background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            Estimate My Cost →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F1F3D', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>Estimated Range ({result.totalPiers} piers)</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 16 }}>
              ${result.low.toLocaleString()} – ${result.high.toLocaleString()}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>Warranty: {result.pierInfo.warranty}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{result.pierInfo.note}</div>
            </div>
            <div style={{ padding: 16, background: '#1a1500', borderRadius: 8, border: '1px solid #F5E642' }}>
              <strong style={{ color: '#F5E642' }}>⚠️ Get at least 3 quotes.</strong>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}> Foundation repair pricing in DFW varies 40–60% between companies. The number of piers recommended varies too — more isn't always better.</span>
            </div>
          </div>
        )}

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>🔩 Pier Type Comparison</h3>
          {Object.entries(PIER_COSTS).map(([key, p]) => (
            <div key={key} style={{ padding: '16px 0', borderBottom: '1px solid #2A3A5C' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontWeight: 700, color: '#F1F5F9', textTransform: 'capitalize' }}>{key === '3tab' ? '3-Tab' : key} Pier</div>
                <div style={{ fontWeight: 800, color: '#F5E642' }}>${p.low.toLocaleString()}–${p.high.toLocaleString()}/pier</div>
              </div>
              <div style={{ color: '#64748B', fontSize: 13, marginBottom: 4 }}>{p.note}</div>
              <div style={{ fontSize: 13, color: '#22C55E' }}>Warranty: {p.warranty}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16, marginTop: 0 }}>📋 What to Look for in Foundation Quotes</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['✅ Lifetime Transferable Warranty', 'Transferable warranty adds value when you sell. Non-transferable warranties are a red flag.'],
              ['✅ Engineer Certification', 'Reputable DFW companies include a PE-stamped engineer evaluation. Avoid companies that skip this.'],
              ['✅ Pier Depth Specification', 'Piers must reach stable soil — typically 10–22 ft in DFW. Ask for the target depth in writing.'],
              ['❌ Red Flag: Unusually Low Bid', 'A quote 40%+ below others often means fewer piers, shallower installation, or inferior materials.'],
              ['❌ Red Flag: No Permit', 'Foundation work requires a permit in most DFW cities. Companies that skip permits put you at legal risk.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 18, minWidth: 24 }}>{(title as string).split(' ')[0]}</div>
                <div><strong style={{ color: '#F1F5F9', fontSize: 14 }}>{(title as string).slice(2)}</strong><br /><span style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0F1F3D', borderRadius: 12 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Get 3 Free Foundation Quotes in DFW</div>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Compare licensed foundation companies — we verify credentials so you don't have to.</p>
          <button style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', fontWeight: 800, borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 16 }}>
            Compare Foundation Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
