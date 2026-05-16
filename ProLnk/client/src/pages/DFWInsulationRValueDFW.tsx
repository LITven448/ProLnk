import { useState } from 'react';

export default function DFWInsulationRValueDFW() {
  const [homeArea, setHomeArea] = useState('');
  const [currentRValue, setCurrentRValue] = useState('');
  const [result, setResult] = useState<null | { compliant: boolean; atticGap: number; savings: number }>(null);

  function assess() {
    const area = parseFloat(homeArea) || 2000;
    const r = parseFloat(currentRValue) || 11;
    const compliant = r >= 38;
    const atticGap = Math.max(0, 38 - r);
    const savings = compliant ? 0 : Math.round(area * 0.045 * atticGap * 0.12);
    setResult({ compliant, atticGap, savings });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Energy Series</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>DFW Insulation R-Value Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Dallas-Fort Worth sits in IECC Climate Zone 3A — a mixed-humid zone with brutal summers and mild but real winters. Your insulation requirements and ROI are different from colder climates.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 DFW Zone 3A Code Requirements</h2>
          {[
            { zone: 'Attic / Ceiling', req: 'R-38 minimum', note: 'R-49 strongly recommended for DFW summers' },
            { zone: 'Walls (Wood Frame)', req: 'R-13 minimum', note: 'R-13 + R-5 continuous foam = best practice' },
            { zone: 'Floors Over Unconditioned Space', req: 'R-10 minimum', note: 'Crawl spaces, garages below living space' },
            { zone: 'Basement Walls', req: 'R-5 minimum', note: 'Rare in DFW but applicable for semi-conditioned spaces' },
          ].map(row => (
            <div key={row.zone} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #1a3a5c' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{row.zone}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{row.note}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, minWidth: 90, textAlign: 'right' }}>{row.req}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🌡️ Why DFW R-Values Matter More in Summer</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>DFW attics reach 140–160°F in July. The temperature delta between your attic and living space is 80°F+. Every R-value point reduces heat flow — and in DFW, the payback period for attic upgrades is 3–5 years vs. 7–10 years in colder climates.</p>
          {[
            { label: 'R-11 attic (old home)', monthly: '$240', annual: '$2,880' },
            { label: 'R-30 attic', monthly: '$185', annual: '$2,220' },
            { label: 'R-38 attic (code)', monthly: '$165', annual: '$1,980' },
            { label: 'R-49 attic (best practice)', monthly: '$148', annual: '$1,776' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a3a5c' }}>
              <span style={{ color: '#cbd5e1' }}>{row.label}</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{row.monthly}/mo</span>
            </div>
          ))}
          <div style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>*Estimates for 2,000 sq ft DFW home. Actual savings vary.</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🧮 DFW Compliance & ROI Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Area (sq ft)</label>
              <input value={homeArea} onChange={e => setHomeArea(e.target.value)} placeholder="2000" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Current Attic R-Value</label>
              <input value={currentRValue} onChange={e => setCurrentRValue(e.target.value)} placeholder="11" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Check DFW Compliance →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 16, background: result.compliant ? '#0d2d1a' : '#2d1a0d', borderRadius: 8, borderLeft: `4px solid ${result.compliant ? '#22c55e' : '#F5E642'}` }}>
              <div style={{ fontWeight: 700, color: result.compliant ? '#22c55e' : '#F5E642', marginBottom: 8 }}>{result.compliant ? '✅ DFW Code Compliant' : '⚠️ Below DFW Code Minimum'}</div>
              {!result.compliant && <div style={{ color: '#cbd5e1' }}>You need R-{result.atticGap} more insulation to reach DFW code. Estimated annual savings after upgrade: <strong style={{ color: '#F5E642' }}>${result.savings}</strong>/yr.</div>}
              {result.compliant && <div style={{ color: '#cbd5e1' }}>Your attic meets DFW Zone 3A requirements. Consider upgrading to R-49 for maximum DFW summer savings.</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏠 Get a Free DFW Insulation Quote</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>ProLnk connects you with vetted DFW insulation pros who know Zone 3A requirements. Get 3 quotes in 24 hours.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Get Free DFW Quotes →</button>
        </div>
      </div>
    </div>
  );
}
