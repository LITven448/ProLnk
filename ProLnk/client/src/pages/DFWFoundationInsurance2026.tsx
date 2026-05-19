import { useState } from 'react';

const coverageMap: Record<string, { likelihood: string; color: string; detail: string }> = {
  sudden_collapse: { likelihood: 'Likely Covered', color: '#22c55e', detail: 'Sudden structural collapse is typically covered under standard homeowner policies. Document with photos immediately and file within 48 hours.' },
  plumbing_leak: { likelihood: 'Often Covered', color: '#84cc16', detail: 'Foundation damage caused by a sudden plumbing leak (not slow seep) is often covered. Get a plumber to confirm source before filing.' },
  settling: { likelihood: 'Rarely Covered', color: '#f59e0b', detail: 'Gradual settlement is considered normal wear and excluded by most policies. A few specialty policies cover this — check your endorsements.' },
  clay_movement: { likelihood: 'Not Covered', color: '#ef4444', detail: 'Expansive clay soil movement is universally excluded as a "earth movement" exclusion. This is your repair cost to bear — get competing bids.' },
  tree_roots: { likelihood: 'Rarely Covered', color: '#f59e0b', detail: 'Tree root damage is typically excluded. Some policies cover resultant damage but not root removal. Document thoroughly.' },
  poor_drainage: { likelihood: 'Not Covered', color: '#ef4444', detail: 'Drainage-related foundation damage is excluded as a maintenance issue. Prevention is your only option here.' },
};

export default function DFWFoundationInsurance2026() {
  const [damageType, setDamageType] = useState('');
  const result = damageType ? coverageMap[damageType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Foundation & Homeowner Insurance</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Most DFW foundation repair is NOT covered by standard homeowner insurance. Here's what you need to know.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { label: '❌ What\’s Excluded', desc: 'Settling, clay soil movement, poor drainage, tree roots — all excluded as "earth movement" or maintenance issues.' },
            { label: '✅ What\’s Covered', desc: 'Sudden collapse, foundation damage from burst pipe, fire, or vehicle impact. Must be sudden and accidental.' },
            { label: '📋 Engineer\’s Report', desc: 'For any claim over $10K, insurers may require a PE report ($300-600). Get one before filing — it protects you.' },
            { label: '🛡️ Company Warranties', desc: 'Reputable foundation companies offer lifetime transferable warranties. This is your real "insurance" for DFW foundations.' },
          ].map((c) => (
            <div key={c.label} style={{ background: '#112240', borderRadius: 8, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h3 style={{ fontWeight: 700, marginBottom: 8 }}>📸 How to Document Foundation Damage</h3>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Photograph all cracks with a ruler for scale — date-stamp each photo</li>
            <li>Measure crack widths — anything over 1/4 inch is significant</li>
            <li>Video walkthrough of all affected areas</li>
            <li>Get 3 contractor estimates in writing before calling insurer</li>
            <li>Request a PE structural report if claim exceeds $5,000</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 8, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Coverage Likelihood Checker</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>My damage type is:</label>
          <select value={damageType} onChange={(e) => setDamageType(e.target.value)}
            style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, marginBottom: 16 }}>
            <option value="">Select damage type...</option>
            <option value="sudden_collapse">Sudden structural collapse</option>
            <option value="plumbing_leak">Damage from plumbing leak</option>
            <option value="settling">Gradual settling over time</option>
            <option value="clay_movement">Clay soil expansion/contraction</option>
            <option value="tree_roots">Tree root intrusion</option>
            <option value="poor_drainage">Poor drainage / water pooling</option>
          </select>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 6, padding: 16, border: `1px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 700, marginBottom: 8 }}>{result.likelihood}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{result.detail}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, padding: 20, background: '#112240', borderRadius: 8, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get Foundation Quotes Before Filing Any Claim</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Know your costs first. ProLnk connects you with 3 vetted DFW foundation pros — free quotes, no obligation.</div>
        </div>
      </div>
    </div>
  );
}
