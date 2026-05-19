import { useState } from 'react';

const dfwRentData = [
  { type: 'Studio', avgRent: 1340, notes: 'DFW urban core avg 2026' },
  { type: '1 Bedroom', avgRent: 1580, notes: 'Most common renter unit' },
  { type: '2 Bedroom', avgRent: 1850, notes: 'DFW metro avg 2026' },
  { type: '3 Bedroom', avgRent: 2280, notes: 'Near SF home mortgage territory' },
];

const appreciationLoss = [
  { year: 2016, dfwHomeValue: 245000, todayValue: 398000, missedGain: 153000 },
  { year: 2018, dfwHomeValue: 282000, todayValue: 398000, missedGain: 116000 },
  { year: 2020, dfwHomeValue: 310000, todayValue: 398000, missedGain: 88000 },
  { year: 2022, dfwHomeValue: 390000, todayValue: 398000, missedGain: 8000 },
];

export default function DFWActualCostOfRenting() {
  const [rent, setRent] = useState('');
  const [years, setYears] = useState('');
  const [homePrice, setHomePrice] = useState('');
  const [result, setResult] = useState<null | { totalRent: number; downPayment: number; equityMissed: number; opportunityCost: number }>(null);

  function calculate() {
    const r = parseInt(rent.replace(/\D/g, ''), 10);
    const y = parseInt(years, 10);
    const h = parseInt(homePrice.replace(/\D/g, ''), 10);
    if (!r || !y || !h) return;
    const totalRent = r * 12 * y;
    const downPayment = h * 0.05;
    const appreciationRate = 0.048;
    const homeValueNow = h * Math.pow(1 + appreciationRate, y);
    const equityFromDown = downPayment * Math.pow(1 + appreciationRate, y);
    const equityMissed = Math.round(homeValueNow - h);
    const opportunityCost = Math.round(totalRent + equityMissed);
    setResult({ totalRent: Math.round(totalRent), downPayment: Math.round(downPayment), equityMissed, opportunityCost });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW REAL ESTATE GUIDE</div>
          <h1 style={{ color: '#fff', fontSize: 28, margin: 0 }}>The True Cost of Renting in DFW</h1>
          <p style={{ color: '#94a3b8', marginTop: 10, fontSize: 15 }}>
            DFW renters paid an average of $1,850/mo for a 2BR in 2026. Here's what they didn't pay: equity.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>💵 DFW Average Rent 2026</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {dfwRentData.map(d => (
              <div key={d.type} style={{ background: '#f8fafc', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{d.type}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#dc2626', marginTop: 4 }}>${d.avgRent.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400 }}>/mo</span></div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{d.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>📉 What DFW Renters Missed in Home Appreciation</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 0, marginBottom: 16 }}>Based on median DFW home value of $398K in 2026.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Started Renting', 'DFW Home Value Then', 'Value in 2026', 'Appreciation Missed'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appreciationLoss.map(r => (
                  <tr key={r.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{r.year}</td>
                    <td style={{ padding: '10px 12px' }}>${r.dfwHomeValue.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px' }}>${r.todayValue.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', color: '#dc2626', fontWeight: 700 }}>+${r.missedGain.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, margin: '0 0 6px' }}>🧮 Opportunity Cost of Renting Calculator</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 0, marginBottom: 16 }}>See how much renting has cost you vs owning in DFW.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Your monthly rent</label>
              <input type="text" placeholder="$1,850" value={rent} onChange={e => setRent(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Years renting</label>
              <input type="number" placeholder="5" value={years} onChange={e => setYears(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Target DFW home price</label>
            <input type="text" placeholder="$380,000" value={homePrice} onChange={e => setHomePrice(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Calculate My Opportunity Cost
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Total rent paid</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#dc2626' }}>${result.totalRent.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Equity appreciation missed</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: '#dc2626' }}>${result.equityMissed.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ marginTop: 12, padding: 12, background: '#fef2f2', borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b' }}>Total opportunity cost of renting</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#dc2626' }}>${result.opportunityCost.toLocaleString()}</div>
              </div>
              <div style={{ marginTop: 10, fontSize: 13, color: '#475569' }}>
                You only needed ${result.downPayment.toLocaleString()} (5%) to start building equity. The rest went to your landlord.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
