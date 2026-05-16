import { useState } from 'react';

const floodZones = [
  { zone: 'Zone X (Shaded)', risk: '🟡 Moderate', description: '0.2% annual chance — 500-year flood plain. No mandate but risk is real.', nfipRate: '$400–900/yr', privateRate: '$300–700/yr' },
  { zone: 'Zone AE', risk: '🔴 High', description: '1% annual chance — 100-year flood plain. Mortgage lenders require flood insurance.', nfipRate: '$900–2,500/yr', privateRate: '$700–2,000/yr' },
  { zone: 'Zone X (Unshaded)', risk: '🟢 Minimal', description: 'Outside 500-year flood plain. Low but nonzero risk — 25% of flood claims come from here.', nfipRate: '$400–600/yr', privateRate: '$250–500/yr' },
  { zone: 'Zone A', risk: '🔴 High', description: 'High risk area without detailed analysis. Requires insurance if federally-backed mortgage.', nfipRate: '$1,200–3,000/yr', privateRate: '$900–2,400/yr' },
];

const notCovered = [
  { item: 'Vehicles & Cars', detail: 'Separate comprehensive auto coverage required' },
  { item: 'Landscaping & Trees', detail: 'Pools, decks, fences, and yard all excluded' },
  { item: 'Basement Contents', detail: 'Items stored in basements/crawlspaces usually excluded' },
  { item: 'Temporary Housing', detail: 'No loss-of-use coverage — rent costs come out of pocket' },
  { item: 'Currency & Documents', detail: 'Precious metals, valuable papers not covered' },
  { item: 'Moisture/Mold', detail: 'Damage that develops over time from seepage excluded' },
];

export default function DFWFloodInsuranceGuide2026() {
  const [zipType, setZipType] = useState('moderate');
  const [homeValue, setHomeValue] = useState(350000);
  const [result, setResult] = useState<{ risk: string; nfip: string; private: string; rec: string; mandatory: string } | null>(null);

  function calculate() {
    const base = homeValue * 0.002;
    const mult = zipType === 'minimal' ? 0.5 : zipType === 'moderate' ? 0.85 : zipType === 'high' ? 1.5 : 2.0;
    const nfipLow = Math.round(base * mult * 0.8 / 50) * 50;
    const nfipHigh = Math.round(base * mult * 1.2 / 50) * 50;
    const privLow = Math.round(nfipLow * 0.75 / 50) * 50;
    const privHigh = Math.round(nfipHigh * 0.85 / 50) * 50;
    const riskLabels: Record<string, string> = { minimal: '🟢 Minimal Risk', moderate: '🟡 Moderate Risk', high: '🔴 High Risk', vhigh: '🔴 Very High Risk' };
    const mandatory: Record<string, string> = { minimal: 'Not required', moderate: 'Not required (strongly recommended)', high: 'Required with federally-backed mortgage', vhigh: 'Required — no exceptions with federally-backed mortgage' };
    setResult({
      risk: riskLabels[zipType],
      nfip: `$${nfipLow.toLocaleString()}–$${nfipHigh.toLocaleString()}/yr`,
      private: `$${privLow.toLocaleString()}–$${privHigh.toLocaleString()}/yr`,
      rec: zipType === 'minimal' ? 'Consider $100K contents policy — inexpensive and covers tail risk' : zipType === 'moderate' ? 'Strongly recommend $250K+ building coverage + $100K contents' : 'Maximum available coverage — NFIP limit $250K building / $100K contents',
      mandatory: mandatory[zipType],
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Resource · 2026</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.1 }}>DFW Flood Insurance Guide 2026</h1>
        <p style={{ fontSize: 18, color: '#8BA3C7', marginBottom: 48, maxWidth: 680 }}>Most DFW homeowners underestimate flood risk. Flash flooding, not hurricanes, is the primary threat — and most home insurance doesn't cover it.</p>

        <div style={{ background: '#1A2640', borderRadius: 16, padding: 32, marginBottom: 40, borderLeft: '4px solid #4A90D9' }}>
          <h2 style={{ color: '#4A90D9', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>💧 DFW Flash Flood Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 20 }}>
            {[
              { stat: '4th', label: 'Most flood-prone metro in Texas', sub: 'Behind Houston, San Antonio, Austin' },
              { stat: '180+', label: 'Flash flood events since 2015', sub: 'Tarrant & Dallas counties combined' },
              { stat: '30 days', label: 'NFIP waiting period', sub: 'Buy before storms form — not after' },
              { stat: '25%', label: 'Claims from low-risk zones', sub: 'No zone is zero-risk' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 800 }}>{s.stat}</div>
                <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700, margin: '6px 0 4px' }}>{s.label}</div>
                <div style={{ color: '#8BA3C7', fontSize: 12 }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, color: '#8BA3C7', fontSize: 15, lineHeight: 1.7 }}>
            ⚠️ Standard homeowner's insurance explicitly excludes flood damage. Even a few inches of water can cause $30,000–$80,000 in damage to flooring, drywall, appliances, and HVAC.
          </div>
        </div>

        <h2 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>Understanding FEMA Flood Zones in DFW</h2>
        <div style={{ marginBottom: 40 }}>
          {floodZones.map(z => (
            <div key={z.zone} style={{ background: '#1A2640', borderRadius: 12, padding: 24, marginBottom: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'center' }}>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{z.zone}</div>
                <div style={{ fontSize: 18 }}>{z.risk}</div>
                <div style={{ color: '#8BA3C7', fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{z.description}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#8BA3C7', fontSize: 12, marginBottom: 4 }}>NFIP Rate</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{z.nfipRate}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ color: '#8BA3C7', fontSize: 12, marginBottom: 4 }}>Private Market Rate</div>
                <div style={{ color: '#4A90D9', fontWeight: 700 }}>{z.privateRate}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 48 }}>
          <div style={{ background: '#1A2640', borderRadius: 16, padding: 28 }}>
            <h3 style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🏛️ NFIP (Federal)</h3>
            <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.8 }}>
              ✅ Widely available — any agent can sell<br />
              ✅ $250K building / $100K contents limits<br />
              ✅ Guaranteed renewable<br />
              ❌ 30-day waiting period (exceptions exist)<br />
              ❌ Strict limits — can't cover high-value homes fully<br />
              ❌ Replacement cost only on primary residence
            </div>
          </div>
          <div style={{ background: '#1A2640', borderRadius: 16, padding: 28 }}>
            <h3 style={{ color: '#4A90D9', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>🏢 Private Flood Insurance</h3>
            <div style={{ color: '#8BA3C7', fontSize: 14, lineHeight: 1.8 }}>
              ✅ Higher limits available ($1M+ building)<br />
              ✅ Often 10-20% cheaper for lower-risk homes<br />
              ✅ Faster claims process typically<br />
              ❌ Can be non-renewed in high-risk areas<br />
              ❌ Less standardized — read the policy carefully<br />
              ❌ May not satisfy lender requirements
            </div>
          </div>
        </div>

        <h2 style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 700, marginBottom: 20 }}>What Flood Insurance Does NOT Cover</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, marginBottom: 48 }}>
          {notCovered.map(n => (
            <div key={n.item} style={{ background: '#1A2640', borderRadius: 10, padding: 18, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>❌</span>
              <div><div style={{ color: '#FFFFFF', fontWeight: 700, marginBottom: 4 }}>{n.item}</div><div style={{ color: '#8BA3C7', fontSize: 13 }}>{n.detail}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1A2640', borderRadius: 20, padding: 36, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>💧 Estimate Your Flood Insurance Cost</h2>
          <p style={{ color: '#8BA3C7', marginBottom: 28 }}>Get a rough estimate based on your flood zone and home value.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Your Flood Zone Area</label>
              <select value={zipType} onChange={e => setZipType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2D3F5C', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="minimal">Zone X (Minimal Risk)</option>
                <option value="moderate">Zone X Shaded (Moderate)</option>
                <option value="high">Zone AE (High Risk)</option>
                <option value="vhigh">Zone A (Very High Risk)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Value: ${homeValue.toLocaleString()}</label>
              <input type="range" min={100000} max={800000} step={25000} value={homeValue} onChange={e => setHomeValue(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642', marginTop: 10 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4A5568', fontSize: 12, marginTop: 4 }}><span>$100K</span><span>$800K</span></div>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%', marginBottom: 24 }}>Estimate Flood Insurance Cost →</button>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Flood Risk Level</div><div style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 18 }}>{result.risk}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>NFIP Estimate</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.nfip}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Private Market Estimate</div><div style={{ color: '#4A90D9', fontWeight: 800, fontSize: 18 }}>{result.private}</div></div>
              <div><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Insurance Mandatory?</div><div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700 }}>{result.mandatory}</div></div>
              <div style={{ gridColumn: '1 / -1' }}><div style={{ color: '#8BA3C7', fontSize: 13, marginBottom: 4 }}>Coverage Recommendation</div><div style={{ color: '#FFFFFF', fontSize: 15 }}>{result.rec}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A2640', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Worried About Your Home's Flood Vulnerability?</h3>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>A ProLnk-connected inspector can identify drainage issues, foundation concerns, and flood-proofing improvements before they become claims.</p>
          <a href="/" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 15 }}>Get a Home Inspection Quote →</a>
        </div>
      </div>
    </div>
  );
}
