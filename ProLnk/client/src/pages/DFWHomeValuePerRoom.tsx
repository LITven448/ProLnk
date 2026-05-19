import { useState } from 'react';

const SUBMARKETS = ['Plano/Allen', 'Frisco/Prosper', 'McKinney/Celina', 'Denton/Lewisville', 'Arlington/Mansfield', 'Fort Worth Inner Loop', 'Rockwall/Rowlett', 'Garland/Mesquite', 'Uptown/Highland Park', 'Keller/Southlake'];

const BED_IMPACT: Record<string, number> = { '2/1': 0, '3/2': 1, '4/2': 1.07, '4/3': 1.14, '5/3': 1.19, '5/4': 1.24 };

const SUBMARKET_BASE: Record<string, number> = {
  'Plano/Allen': 420000, 'Frisco/Prosper': 520000, 'McKinney/Celina': 460000,
  'Denton/Lewisville': 360000, 'Arlington/Mansfield': 360000, 'Fort Worth Inner Loop': 330000,
  'Rockwall/Rowlett': 380000, 'Garland/Mesquite': 290000, 'Uptown/Highland Park': 820000,
  'Keller/Southlake': 680000,
};

const ADDITION_COSTS: Record<string, { cost: string; valueAdd: string; roi: string }> = {
  bedroom: { cost: '$25,000–$50,000', valueAdd: '$18,000–$35,000', roi: '65–85% typical' },
  bathroom_full: { cost: '$20,000–$35,000', valueAdd: '$15,000–$28,000', roi: '70–90% typical' },
  bathroom_half: { cost: '$8,000–$15,000', valueAdd: '$5,000–$12,000', roi: '60–80% typical' },
};

export default function DFWHomeValuePerRoom() {
  const [currentConfig, setCurrentConfig] = useState('');
  const [targetConfig, setTargetConfig] = useState('');
  const [submarket, setSubmarket] = useState('');
  const [addition, setAddition] = useState('');
  const [result, setResult] = useState<null | { current: number; target: number; diff: number; pct: number }>(null);

  const configs = Object.keys(BED_IMPACT);

  function calculate() {
    if (!currentConfig || !targetConfig || !submarket) return;
    const base = SUBMARKET_BASE[submarket] || 400000;
    const currentVal = base * BED_IMPACT[currentConfig];
    const targetVal = base * BED_IMPACT[targetConfig];
    const diff = Math.round((targetVal - currentVal) / 5000) * 5000;
    const pct = Math.round(((targetVal - currentVal) / currentVal) * 100 * 10) / 10;
    setResult({ current: Math.round(currentVal), target: Math.round(targetVal), diff, pct });
  }

  const additionInfo = addition ? ADDITION_COSTS[addition] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>🛏️ DFW Value Analysis</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Home Value Per Room in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How bedrooms and bathrooms drive DFW home value — and what adding a room actually returns in your submarket.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: '3/2 vs 4/2', stat: '+7%', sub: 'Avg DFW value bump for adding a bedroom' },
            { label: '4/2 vs 4/3', stat: '+8%', sub: 'Full bath addition typical value increase' },
            { label: 'Half Bath Add', stat: '+3–5%', sub: 'Lower cost, strong ROI in mid-tier DFW' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0f1f3a', border: '1px solid #1e3a5f', borderRadius: 12, padding: 18, textAlign: 'center' }}>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{c.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3a', border: '1px solid #1e3a5f', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Addition Cost vs Value Add</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            {Object.entries(ADDITION_COSTS).map(([k, v]) => (
              <button key={k} onClick={() => setAddition(k === addition ? '' : k)} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${addition === k ? '#F5E642' : '#1e3a5f'}`, background: addition === k ? '#F5E642′ : '#0A1628', color: addition === k ? '#0A1628' : '#94a3b8', cursor: ’pointer', fontSize: 13 }}>
                {k === 'bedroom' ? 'Bedroom' : k === 'bathroom_full' ? 'Full Bath' : 'Half Bath'}
              </button>
            ))}
          </div>
          {additionInfo && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}><div style={{ color: '#64748b', fontSize: 11 }}>Addition Cost</div><div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{additionInfo.cost}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}><div style={{ color: '#64748b', fontSize: 11 }}>Value Added</div><div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>{additionInfo.valueAdd}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}><div style={{ color: '#64748b', fontSize: 11 }}>ROI</div><div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{additionInfo.roi}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f1f3a', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Calculate Your DFW Value Increase</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Config</label>
              <select value={currentConfig} onChange={e => setCurrentConfig(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value=''>Beds/Baths</option>
                {configs.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Target Config</label>
              <select value={targetConfig} onChange={e => setTargetConfig(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value=''>Beds/Baths</option>
                {configs.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Submarket</label>
              <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 13 }}>
                <option value=''>Select...</option>
                {SUBMARKETS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>Calculate Value Impact</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 12, padding: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Current Est. Value</div><div style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700 }}>${result.current.toLocaleString()}</div></div>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>After Improvement</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${result.target.toLocaleString()}</div></div>
              <div><div style={{ color: '#64748b', fontSize: 12 }}>Expected Gain</div><div style={{ color: result.diff > 0 ? '#22c55e' : '#ef4444', fontSize: 18, fontWeight: 700 }}>+${result.diff.toLocaleString()} ({result.pct}%)</div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}