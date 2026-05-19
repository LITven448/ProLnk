import { useState } from 'react';

export default function DFWHomeImprovementFinancing2026() {
  const [projectCost, setProjectCost] = useState('');
  const [homeEquity, setHomeEquity] = useState('');
  const [result, setResult] = useState<{ recommended: string; reason: string; estRate: string; estPayment: string } | null>(null);

  const calculate = () => {
    const cost = parseFloat(projectCost.replace(/,/g, ''));
    const equity = parseFloat(homeEquity.replace(/,/g, ''));
    if (!cost || isNaN(cost)) return;
    if (cost < 10000) {
      setResult({ recommended: 'Personal Loan', reason: 'Under $10K — no equity tap needed, fast approval, no closing costs', estRate: '7–14%', estPayment: '$' + Math.round(cost / 36 * 1.10).toLocaleString() + '/mo (3yr)' });
    } else if (cost < 25000 && (!equity || equity < cost * 2)) {
      setResult({ recommended: 'FHA Title I Loan', reason: 'Moderate project, limited equity — FHA Title I allows up to $25K unsecured', estRate: '6.5–8.5%', estPayment: '$' + Math.round(cost / 60 * 1.075).toLocaleString() + '/mo (5yr)' });
    } else if (cost >= 25000 && equity >= cost) {
      setResult({ recommended: 'HELOC', reason: 'Large project with good equity — draw as needed, variable rate, interest-only option', estRate: '8.25–9.50%', estPayment: '$' + Math.round(cost * 0.085 / 12).toLocaleString() + '/mo (interest-only)' });
    } else if (cost >= 50000) {
      setResult({ recommended: 'FHA 203k Loan', reason: 'Major renovation — 203k bundles purchase/refi + renovation into one loan', estRate: '6.75–7.90%', estPayment: '$' + Math.round(cost / 300 * 1.073).toLocaleString() + '/mo (25yr)' });
    } else {
      setResult({ recommended: 'Home Equity Loan', reason: 'Solid project size with available equity — fixed rate, predictable payments', estRate: '7.90–9.10%', estPayment: '$' + Math.round(cost / 120 * 1.085).toLocaleString() + '/mo (10yr)' });
    }
  };

  const options = [
    { name: 'Personal Loan', rate: '7–14%', max: '$50K', pros: 'Fast, no equity needed', cons: 'Higher rate', best: '< $10K' },
    { name: 'HELOC', rate: '8.25–9.50%', max: 'Equity limit', pros: 'Flexible draws', cons: 'Variable rate', best: 'Ongoing projects' },
    { name: 'Home Equity Loan', rate: '7.90–9.10%', max: 'Equity limit', pros: 'Fixed rate', cons: 'Closing costs', best: '$15K–$100K' },
    { name: 'FHA 203k', rate: '6.75–7.90%', max: '$431,250', pros: 'Large projects', cons: 'Complex process', best: '$50K+' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔨💳</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: '0.5rem 0' }}>DFW Home Improvement Financing 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Personal loan vs HELOC vs home equity loan vs FHA 203k — which makes sense for your project?</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📊 Option Comparison 2026</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead><tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                {['Option','Rate','Max Amount','Best For'].map(h => <th key={h} style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {options.map(o => (
                  <tr key={o.name} style={{ borderBottom: '1px solid #0A1628' }}>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#F5E642', fontWeight: 600 }}>{o.name}</td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#e2e8f0' }}>{o.rate}</td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#e2e8f0' }}>{o.max}</td>
                    <td style={{ padding: '0.6rem 0.5rem', color: '#94a3b8' }}>{o.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏗️ By Project Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['🛁 Bath Remodel $8–20K','Personal Loan or HELOC'],['🍳 Kitchen $20–80K','HELOC or HE Loan'],['🌡️ HVAC $8–15K','Personal Loan'],['🏠 Major Reno $80K+','FHA 203k'],['🔒 Security $3–8K','Personal Loan'],['🪟 Windows/Doors $10–30K','HE Loan + IRA credit']].map(([proj, rec]) => (
              <div key={proj} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>{proj}</div>
                <div style={{ fontSize: '0.8rem', color: '#F5E642', marginTop: 2 }}>→ {rec}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🧮 Financing Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[['Project Cost', projectCost, setProjectCost, 'e.g. 35,000'],['Available Home Equity', homeEquity, setHomeEquity, 'e.g. 120,000']].map(([label, val, setter, ph]) => (
              <div key={label as string}>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>{label as string}</label>
                <input value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} placeholder={ph as string}
                  style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 6, color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Find Best Option</button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1.25rem', border: '1px solid #F5E642' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F5E642' }}>✅ {result.recommended}</div>
              <div style={{ color: '#cbd5e1', margin: '0.5rem 0', fontSize: '0.9rem' }}>{result.reason}</div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Rate: <strong style={{ color: '#F5E642' }}>{result.estRate}</strong></span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Est. Payment: <strong style={{ color: '#F5E642' }}>{result.estPayment}</strong></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}