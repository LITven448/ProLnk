import { useState } from 'react';

const TRADES = ['Roofing', 'HVAC', 'Plumbing', 'Electrical', 'Foundation', 'General Contractor', 'Handyman'];
const NETWORK_SIZES = ['Just me (0 referrals)', '5–10 contacts', '11–25 contacts', '26–50 contacts', '50+ contacts'];
const TIME_AVAILABLE = ['2–4 hrs/week', '5–10 hrs/week', '11–20 hrs/week', '20+ hrs/week'];

const NETWORK_MATCH_FEES: Record<string, number> = {
  'Just me (0 referrals)': 0, '5–10 contacts': 320, '11–25 contacts': 860,
  '26–50 contacts': 1800, '50+ contacts': 3200,
};
const SUBSCRIPTION_OVERRIDES: Record<string, number> = {
  'Just me (0 referrals)': 0, '5–10 contacts': 89, '11–25 contacts': 240,
  '26–50 contacts': 520, '50+ contacts': 960,
};
const TIME_MULTIPLIER: Record<string, number> = {
  '2–4 hrs/week': 0.4, '5–10 hrs/week': 0.7, '11–20 hrs/week': 0.9, '20+ hrs/week': 1.0,
};
const CHARTER_COST = 149;
const OWN_MATCH_INCOME = 800;

function buildMonths(matchFees: number, subOverrides: number, timeMultiplier: number) {
  const months = [];
  for (let m = 1; m <= 12; m++) {
    const rampFactor = Math.min(1, m / 4);
    const monthly = Math.round((OWN_MATCH_INCOME + matchFees * rampFactor + subOverrides * rampFactor) * timeMultiplier);
    const cumulative = months.reduce((s, x) => s + x.monthly, 0) + monthly;
    const net = monthly - CHARTER_COST;
    months.push({ month: m, monthly, cumulative, net });
  }
  return months;
}

export default function DFWPartnerROICalculator() {
  const [trade, setTrade] = useState('Roofing');
  const [network, setNetwork] = useState('11–25 contacts');
  const [time, setTime] = useState('5–10 hrs/week');
  const [calculated, setCalculated] = useState(false);

  const matchFees = NETWORK_MATCH_FEES[network];
  const subOverrides = SUBSCRIPTION_OVERRIDES[network];
  const timeMult = TIME_MULTIPLIER[time];
  const months = buildMonths(matchFees, subOverrides, timeMult);
  const month6 = months[5];
  const month12 = months[11];
  const breakEvenMonth = months.find(m => m.net > 0)?.month ?? null;
  const totalInvest = CHARTER_COST * 12;
  const totalReturn = months.reduce((s, m) => s + m.monthly, 0);
  const netROI = Math.round(((totalReturn - totalInvest) / totalInvest) * 100);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36 }}>📈</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', margin: '8px 0 4px' }}>DFW Partner ROI Calculator</h1>
          <p style={{ color: '#64748b', margin: 0 }}>Model your Charter membership return — month by month</p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ marginTop: 0, fontSize: 18, color: '#0A1628′ }}>Your Profile</h2>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>🔨 Your Trade</label>
            <select value={trade} onChange={e => { setTrade(e.target.value); setCalculated(false); }}
              style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#1e293b', padding: '9px 14px', borderRadius: 8, fontSize: 14, width: '100%' }}>
              {TRADES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>👥 Starting Network Size</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {NETWORK_SIZES.map(s => (
                <button key={s} onClick={() => { setNetwork(s); setCalculated(false); }}
                  style={{ background: network === s ? '#0A1628′ : '#f1f5f9', color: network === s ? '#F5E642' : '#475569', border: '1px solid', borderColor: network === s ? '#0A1628' : '#e2e8f0', borderRadius: 8, padding: '7px 12px', cursor: ’pointer', fontSize: 12, fontWeight: network === s ? 700 : 400 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>⏰ Time Available for ProLnk</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {TIME_AVAILABLE.map(t => (
                <button key={t} onClick={() => { setTime(t); setCalculated(false); }}
                  style={{ background: time === t ? '#0A1628′ : '#f1f5f9', color: time === t ? '#F5E642' : '#475569', border: '1px solid', borderColor: time === t ? '#0A1628' : '#e2e8f0', borderRadius: 8, padding: '7px 12px', cursor: ’pointer', fontSize: 12, fontWeight: time === t ? 700 : 400 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setCalculated(true)}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '12px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            📊 Calculate My ROI
          </button>
        </div>
        {calculated && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 20 }}>
              {[
                { label: 'Month 6 Income', value: `$${month6.monthly.toLocaleString()}/mo`, sub: `Net: $${month6.net.toLocaleString()}`, color: '#16a34a' },
                { label: 'Month 12 Income', value: `$${month12.monthly.toLocaleString()}/mo`, sub: `Net: $${month12.net.toLocaleString()}`, color: '#0A1628′ },
                { label: 'Break-Even', value: breakEvenMonth ? `Month ${breakEvenMonth}` : 'Month 1+', sub: 'Cost recovered', color: '#7c3aed' },
                { label: '12-Month Net ROI', value: `${netROI}%`, sub: `$${(totalReturn - totalInvest).toLocaleString()} profit`, color: '#dc2626′ },
              ].map((card, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 18, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{card.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: card.color }}>{card.value}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{card.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 20 }}>
              <h3 style={{ color: '#0A1628', marginTop: 0, fontSize: 15 }}>Month-by-Month Projection</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['Month', 'Gross Income', 'Membership Cost', 'Net'].map(h => (
                        <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#64748b', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {months.map(m => (
                      <tr key={m.month} style={{ background: m.month % 2 === 0 ? '#fafafa' : '#fff' }}>
                        <td style={{ padding: '8px 12px', color: '#475569′ }}>Mo. {m.month}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600, color: '#16a34a' }}>${m.monthly.toLocaleString()}</td>
                        <td style={{ padding: '8px 12px', color: '#dc2626′ }}>-${CHARTER_COST}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 700, color: m.net >= 0 ? '#16a34a' : '#dc2626′ }}>${m.net.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        <div style={{ textAlign: 'center', padding: 20, background: '#0A1628', borderRadius: 12 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Waitlist closes at 500 Charter members. Lock in your position today.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '10px 28px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            🔗 Join as Charter Partner
          </button>
        </div>
      </div>
    </div>
  );
}
