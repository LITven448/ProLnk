import { useState } from 'react';

const TIERS = ['Charter ($149/mo)', 'Founding ($149/mo)', 'Standard ($199/mo)'];
const ACTIVITIES = ['Light (5–10 matches/mo)', 'Active (15–25 matches/mo)', 'Power (30–60 matches/mo)'];

const MONTHLY_GROWTH = [1.0, 1.05, 1.10, 1.16, 1.22, 1.28, 1.35, 1.43, 1.50, 1.60, 1.72, 1.85];

export default function DFWProLnkIncomeStatement() {
  const [tier, setTier] = useState('');
  const [activity, setActivity] = useState('');
  const [shown, setShown] = useState(false);

  const baseMatch = activity === 'Power (30–60 matches/mo)' ? 45 : activity === 'Active (15–25 matches/mo)' ? 20 : 8;
  const commRate = tier.startsWith('Charter') ? 0.25 : tier.startsWith('Founding') ? 0.25 : 0.20;
  const subCost = tier.startsWith('Standard') ? 199 : 149;
  const originRate = tier.startsWith('Charter') ? 0.015 : 0.010;

  const rows = MONTHLY_GROWTH.map((mult, i) => {
    const direct = Math.round(baseMatch * mult * 350 * commRate);
    const l1Override = Math.round((i + 1) * 0.8 * 350 * 0.07);
    const subOverride = Math.round(Math.floor((i + 1) / 2) * 149 * 0.12);
    const origination = Math.round(((i + 1) * 2) * 2800 * originRate / 12);
    const gross = direct + l1Override + subOverride + origination;
    const net = gross - subCost;
    return { month: i + 1, direct, l1Override, subOverride, origination, gross, net };
  });

  const totalGross = rows.reduce((s, r) => s + r.gross, 0);
  const totalNet = rows.reduce((s, r) => s + r.net, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>ProLnk Partner Income Statement</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Projected 12-month income statement — all 5 streams, realistic assumptions</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚙️ Partner Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Membership Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select tier...</option>
                {TIERS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Activity Level</label>
              <select value={activity} onChange={e => setActivity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select activity...</option>
                {ACTIVITIES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShown(true)} disabled={!tier || !activity} style={{ background: tier && activity ? '#F5E642' : '#1E3A5F', color: tier && activity ? '#0A1628' : '#445566', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: tier && activity ? 'pointer' : 'not-allowed', width: '100%' }}>
            Generate 12-Month Income Statement →
          </button>
        </div>

        {shown && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Year 1 Gross Revenue', val: `$${totalGross.toLocaleString()}`, icon: '📊' },
                { label: 'Year 1 Net Income', val: `$${totalNet.toLocaleString()}`, icon: '💰' },
                { label: 'Month 12 Monthly Net', val: `$${rows[11].net.toLocaleString()}`, icon: '🚀' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#0D1F38', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                  <div style={{ fontSize: 26 }}>{s.icon}</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.val}</div>
                  <div style={{ color: '#8899AA', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F38', borderRadius: 12, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: '#0A1628' }}>
                    {['Mo', 'Direct', 'L1 Override', 'Sub Override', 'Origination', 'Gross', 'Sub Cost', 'Net'].map(h => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'right', color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #1E3A5F', background: i % 2 === 0 ? 'transparent' : '#081422' }}>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#8899AA' }}>{r.month}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#fff' }}>${r.direct.toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#fff' }}>${r.l1Override.toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#fff' }}>${r.subOverride.toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#fff' }}>${r.origination.toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#C8D8E8', fontWeight: 600 }}>${r.gross.toLocaleString()}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#FF6B6B' }}>-${subCost}</td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', color: '#F5E642', fontWeight: 700 }}>${r.net.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: '2px solid #F5E642', background: '#0A1628' }}>
                    <td style={{ padding: '10px 12px', color: '#F5E642', fontWeight: 700 }}>Total</td>
                    <td colSpan={4} style={{ padding: '10px 12px' }}></td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F5E642', fontWeight: 800 }}>${totalGross.toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#FF6B6B', fontWeight: 700 }}>-${(subCost * 12).toLocaleString()}</td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: '#F5E642', fontWeight: 800 }}>${totalNet.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
