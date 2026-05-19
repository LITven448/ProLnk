import { useState } from 'react';

const options = [
  { name: 'HELOC', rate: '7.5–9.5%', type: 'Variable', best: 'Ongoing projects, flexible draw', minEquity: 20, minCredit: 640 },
  { name: 'Home Equity Loan', rate: '7.0–9.0%', type: 'Fixed', best: 'Single large project with known cost', minEquity: 20, minCredit: 620 },
  { name: 'Personal Loan', rate: '8.0–24.0%', type: 'Fixed', best: 'No equity, small projects under $25K', minEquity: 0, minCredit: 580 },
  { name: 'FHA 203k', rate: '6.8–7.8%', type: 'Fixed', best: 'Buying a fixer-upper or major structural work', minEquity: 0, minCredit: 580 },
  { name: 'Fannie Mae HomeStyle', rate: '6.9–7.9%', type: 'Fixed', best: 'High-value renovation on primary or investment', minEquity: 0, minCredit: 620 },
  { name: 'Contractor Financing', rate: '0–12.99%', type: 'Promo', best: 'Promo 0% offers, quick approval', minEquity: 0, minCredit: 600 },
  { name: 'Credit Card', rate: '18–29%', type: 'Variable', best: 'Small purchases under $5K, with rewards', minEquity: 0, minCredit: 580 },
];

export default function DFWHomeRenovationFinancingOptions() {
  const [amount, setAmount] = useState('');
  const [equity, setEquity] = useState('');
  const [credit, setCredit] = useState('');
  const [results, setResults] = useState<typeof options>([]);

  function findOptions() {
    const a = parseInt(amount.replace(/\D/g, ''));
    const e = parseInt(equity.replace(/\D/g, ''));
    const c = parseInt(credit);
    if (isNaN(a) || isNaN(c)) return;
    const filtered = options.filter(o => {
      if (o.minCredit > c) return false;
      if (o.minEquity > 0 && (isNaN(e) || e < o.minEquity)) return false;
      if (o.name === 'Credit Card' && a > 10000) return false;
      return true;
    }).slice(0, 3);
    setResults(filtered);
  }

  return (
    <div style={{ background: '#0d1f3c', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW Renovation Finance</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Renovation Financing Options for DFW Homeowners</h1>
        <p style={{ fontSize: 17, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>DFW home values have surged — most homeowners have significant equity available. Here's how to put it to work for your renovation.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>📈 DFW Equity Advantage</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 0 }}>Median DFW home values rose 42% from 2020–2024. A $400K home purchased in 2020 for $280K now has ~$170K in equity — enough HELOC access for most major renovations at favorable rates compared to personal loans or credit cards.</p>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>💡 All Financing Options Compared</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #334155′ }}>
                  {['Option', 'Rate', 'Type', 'Best For', 'Min Credit'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {options.map(o => (
                  <tr key={o.name} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{o.name}</td>
                    <td style={{ padding: '12px', color: '#F5E642′ }}>{o.rate}</td>
                    <td style={{ padding: '12px', color: '#94a3b8′ }}>{o.type}</td>
                    <td style={{ padding: '12px', color: '#cbd5e1', lineHeight: 1.4 }}>{o.best}</td>
                    <td style={{ padding: '12px', color: '#94a3b8′ }}>{o.minCredit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🔍 Find My Best Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Renovation Amount</label>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder='e.g. $45,000′ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0d1f3c', color: '#fff', fontSize: 15, boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Available Equity ($)</label>
              <input value={equity} onChange={e => setEquity(e.target.value)} placeholder='e.g. $80,000′ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0d1f3c', color: '#fff', fontSize: 15, boxSizing: ’border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6, color: '#F5E642′ }}>Credit Score</label>
              <input value={credit} onChange={e => setCredit(e.target.value)} placeholder='e.g. 720′ style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #334155', background: '#0d1f3c', color: '#fff', fontSize: 15, boxSizing: ’border-box' }} />
            </div>
          </div>
          <button onClick={findOptions} style={{ background: '#F5E642', color: '#0d1f3c', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>Find Best Financing</button>
          {results.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#F5E642′ }}>Top {results.length} Recommended Options:</div>
              {results.map((r, i) => (
                <div key={r.name} style={{ background: '#0d1f3c', borderRadius: 8, padding: 16, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>#{i + 1} {r.name}</span>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.rate}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#94a3b8′ }}>{r.best}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
