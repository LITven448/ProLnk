import { useState } from 'react';

const MONTHS = ['Mo 1', 'Mo 2', 'Mo 3', 'Mo 4', 'Mo 5', 'Mo 6', 'Mo 7', 'Mo 8', 'Mo 9', 'Mo 10', 'Mo 11', 'Mo 12'];

type MonthData = { partners: number; matches: number; networkIncome: number; subIncome: number; total: number };

export default function DFWProLnkGrowthCalculator() {
  const [startPartners, setStartPartners] = useState(5);
  const [monthlyRecruit, setMonthlyRecruit] = useState(3);
  const [attrition, setAttrition] = useState(5);
  const [matchesPerPartner, setMatchesPerPartner] = useState(8);
  const [result, setResult] = useState<MonthData[] | null>(null);

  function calculate() {
    const rows: MonthData[] = [];
    let partners = startPartners;
    for (let m = 0; m < 12; m++) {
      partners = Math.max(0, Math.round(partners + monthlyRecruit - partners * (attrition / 100)));
      const matches = partners * matchesPerPartner;
      const avgMatchValue = 125;
      const commRate = 0.20;
      const networkIncome = Math.round(matches * avgMatchValue * commRate);
      const subIncome = Math.round(partners * 149 * 0.10);
      rows.push({ partners, matches, networkIncome, subIncome, total: networkIncome + subIncome });
    }
    setResult(rows);
  }

  const maxIncome = result ? Math.max(...result.map(r => r.total)) : 1;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>📈 ProLnk Partner Growth Calculator</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Project your ProLnk DFW partner network growth and income over 12 months.</p>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 560 }}>
        <label style={{ color: '#F5E642′ }}>Starting Partners: {startPartners}
          <input type="range" min={1} max={50} value={startPartners} onChange={e => setStartPartners(+e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, accentColor: '#F5E642′ }} />
        </label>
        <label style={{ color: '#F5E642′ }}>New Partners/Month: {monthlyRecruit}
          <input type="range" min={1} max={20} value={monthlyRecruit} onChange={e => setMonthlyRecruit(+e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, accentColor: '#F5E642′ }} />
        </label>
        <label style={{ color: '#F5E642′ }}>Monthly Attrition: {attrition}%
          <input type="range" min={0} max={20} value={attrition} onChange={e => setAttrition(+e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, accentColor: '#F5E642′ }} />
        </label>
        <label style={{ color: '#F5E642′ }}>Avg Matches Per Partner/Month: {matchesPerPartner}
          <input type="range" min={2} max={30} value={matchesPerPartner} onChange={e => setMatchesPerPartner(+e.target.value)}
            style={{ display: 'block', width: '100%', marginTop: 4, accentColor: '#F5E642′ }} />
        </label>
        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Project 12-Month Growth</button>
      </div>
      {result && (
        <div style={{ marginTop: '1.5rem', maxWidth: 700 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>
            Month 12: {result[11].partners} partners · ${result[11].total.toLocaleString()}/mo income
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-end', height: 120, marginBottom: '0.5rem' }}>
            {result.map((r, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ background: '#F5E642', width: '100%', borderRadius: '3px 3px 0 0', height: Math.max(4, (r.total / maxIncome) * 100) }} />
                <div style={{ color: '#64748b', fontSize: '0.6rem' }}>{MONTHS[i]}</div>
              </div>
            ))}
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2d4a6e' }}>
                  {['Mo', 'Partners', 'Matches', 'Match $', 'Sub $', 'Total'].map(h => (
                    <th key={h} style={{ color: '#F5E642', padding: '0.4rem 0.5rem', textAlign: 'right' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e2d45', background: i % 2 === 0 ? '#0d1e33′ : ’transparent' }}>
                    <td style={{ padding: '0.35rem 0.5rem', color: '#94a3b8', textAlign: 'right' }}>{i + 1}</td>
                    <td style={{ padding: '0.35rem 0.5rem', textAlign: 'right', color: '#e2e8f0′ }}>{r.partners}</td>
                    <td style={{ padding: '0.35rem 0.5rem', textAlign: 'right', color: '#e2e8f0′ }}>{r.matches}</td>
                    <td style={{ padding: '0.35rem 0.5rem', textAlign: 'right', color: '#e2e8f0′ }}>${r.networkIncome.toLocaleString()}</td>
                    <td style={{ padding: '0.35rem 0.5rem', textAlign: 'right', color: '#e2e8f0′ }}>${r.subIncome.toLocaleString()}</td>
                    <td style={{ padding: '0.35rem 0.5rem', textAlign: 'right', color: '#F5E642', fontWeight: 700 }}>${r.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
