import { useState } from 'react';

export default function DFWHomeEquityGuide2026() {
  const [homeValue, setHomeValue] = useState('');
  const [mortgageBalance, setMortgageBalance] = useState('');
  const [result, setResult] = useState<{ equity: number; maxLoan: number; helocRate: string; loanRate: string } | null>(null);

  const calculate = () => {
    const value = parseFloat(homeValue.replace(/,/g, ''));
    const balance = parseFloat(mortgageBalance.replace(/,/g, ''));
    if (!value || !balance || isNaN(value) || isNaN(balance)) return;
    const equity = value - balance;
    const maxLoan = value * 0.80 - balance;
    setResult({ equity, maxLoan, helocRate: '8.25%–9.50%', loanRate: '7.90%–9.10%' });
  };

  const fmt = (n: number) => n < 0 ? '-$' + Math.abs(Math.round(n)).toLocaleString() : '$' + Math.round(n).toLocaleString();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠💰</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: '0.5rem 0' }}>DFW Home Equity Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>DFW homeowners gained an average of $68K in equity since 2021. Here is how to use it.</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📈 DFW Equity Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '1rem' }}>
            {[['Avg Equity Gained', '$68K', 'Since 2021'], ['Median Home Value', '$385K', 'DFW 2026'], ['Max LTV Allowed', '80%', 'Texas law']].map(([label, val, sub]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642' }}>{val}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>⚖️ Texas Home Equity Rules (Unique)</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem' }}>
            <li>Combined loans cannot exceed <strong style={{ color: '#F5E642' }}>80% LTV</strong> — stricter than national 85–90%</li>
            <li>Only <strong style={{ color: '#F5E642' }}>one home equity loan</strong> allowed per property per year</li>
            <li>3-day cooling off period before closing</li>
            <li>Must be processed at title company, attorney, or lender office — not kitchen table</li>
            <li>Cannot use equity loan to buy more land</li>
          </ul>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔄 HELOC vs Home Equity Loan vs Cash-Out Refi</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead><tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                {['', 'HELOC', 'HE Loan', 'Cash-Out Refi'].map(h => <th key={h} style={{ padding: '0.5rem', textAlign: 'left', color: '#94a3b8' }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[['Rate 2026', '8.25–9.50%', '7.90–9.10%', '6.75–7.50%'],['Rate Type','Variable','Fixed','Fixed'],['Draw Period','10 yrs','Lump sum','Lump sum'],['Best For','Ongoing projects','One large project','Rate reset needed']].map(row => (
                  <tr key={row[0]} style={{ borderBottom: '1px solid #0A1628' }}>
                    {row.map((cell, i) => <td key={i} style={{ padding: '0.6rem 0.5rem', color: i === 0 ? '#94a3b8' : '#e2e8f0' }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🧮 Equity Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {[['Home Value', homeValue, setHomeValue, 'e.g. 400,000'],['Mortgage Balance', mortgageBalance, setMortgageBalance, 'e.g. 220,000']].map(([label, val, setter, ph]) => (
              <div key={label as string}>
                <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>{label as string}</label>
                <input value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} placeholder={ph as string}
                  style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 6, color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Calculate Equity</button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[['Total Equity', fmt(result.equity), '💎'],['Max Loan (80% TX)', fmt(result.maxLoan), '🏦'],['HELOC Rate', result.helocRate, '📊'],['HE Loan Rate', result.loanRate, '📋']].map(([label, val, icon]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F5E642' }}>{val}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}