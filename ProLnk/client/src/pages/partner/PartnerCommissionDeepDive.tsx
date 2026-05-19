import { useState } from 'react';

const TIERS = ['Charter ($149/mo)', 'Founding ($149/mo)'];

export default function PartnerCommissionDeepDive() {
  const [jobValue, setJobValue] = useState(1500);
  const [networkSize, setNetworkSize] = useState(10);
  const [tier, setTier] = useState('Charter ($149/mo)');
  const isCharter = tier.startsWith('Charter');

  const directCommissionRate = 0.12;
  const stream1 = Math.round(jobValue * directCommissionRate);
  const stream2L1 = Math.round(stream1 * 0.07 * networkSize);
  const stream2L2 = Math.round(stream1 * 0.04 * Math.floor(networkSize * 2));
  const stream2L3 = Math.round(stream1 * 0.02 * Math.floor(networkSize * 4));
  const stream2L4 = Math.round(stream1 * 0.01 * Math.floor(networkSize * 8));
  const stream3 = Math.round(149 * 0.10 * networkSize);
  const stream4 = Math.round(50 * Math.floor(networkSize / 3));
  const stream5Rate = isCharter ? 0.015 : 0.010;
  const stream5 = Math.round(jobValue * stream5Rate);
  const total = stream1 + stream2L1 + stream2L2 + stream2L3 + stream2L4 + stream3 + stream4 + stream5;

  const fiveYearCharter = [1, 2, 3, 4, 5].map(yr => ({
    year: yr,
    charter: Math.round(((stream1 + stream3) * 12) * Math.pow(1.35, yr - 1)),
    founding: Math.round(((stream1 + stream3 * 0.9) * 12) * Math.pow(1.28, yr - 1)),
  }));

  const streams = [
    { label: 'Stream 1', name: 'Direct Commission', value: stream1, rate: '12% of job match value', color: '#0A1628′ },
    { label: 'Stream 2 L1', name: 'Network Override Lvl 1', value: stream2L1, rate: `7% × ${networkSize} pros`, color: '#1E3A5F' },
    { label: 'Stream 2 L2', name: 'Network Override Lvl 2', value: stream2L2, rate: `4% × ${Math.floor(networkSize * 2)} pros`, color: '#2D5A8E' },
    { label: 'Stream 2 L3', name: 'Network Override Lvl 3', value: stream2L3, rate: `2% × ${Math.floor(networkSize * 4)} pros`, color: '#3D7ABD' },
    { label: 'Stream 2 L4', name: 'Network Override Lvl 4', value: stream2L4, rate: `1% × ${Math.floor(networkSize * 8)} pros`, color: '#4D9AEC' },
    { label: 'Stream 3', name: 'Subscription Override', value: stream3, rate: `10% × ${networkSize} subs × $149`, color: '#059669′ },
    { label: 'Stream 4', name: 'Homeowner Referral', value: stream4, rate: '$50 per qualified homeowner', color: '#7C3AED' },
    { label: 'Stream 5', name: 'Origination Rights', value: stream5, rate: `${isCharter ? '1.5%' : '1.0%'} of job value (permanent)`, color: '#D97706′ },
  ];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💰</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Commission Deep Dive</h1>
          <p style={{ fontSize: 18, color: '#4B5563', maxWidth: 600, margin: '0 auto' }}>
            Real math. All 5 streams. See exactly how your earnings compound with every person you add.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔢 Commission Flow Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Job Value ($)</label>
              <input type="number" value={jobValue} onChange={e => setJobValue(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Level 1 Network Size</label>
              <input type="number" value={networkSize} onChange={e => setNetworkSize(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Tier</label>
              <select value={tier} onChange={e => setTier(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                {TIERS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {streams.map(s => (
              <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 120px 80px',
                gap: 12, alignItems: 'center', padding: '12px 16px', borderRadius: 10,
                background: s.color, color: '#fff' }}>
                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8 }}>{s.label}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{s.rate}</div>
                </div>
                <div style={{ fontSize: 11, opacity: 0.8, textAlign: 'right' }}>{s.rate.includes('%') ? '' : ''}</div>
                <div style={{ fontSize: 18, fontWeight: 800, textAlign: 'right' }}>${s.value.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>TOTAL FROM ONE ${ jobValue.toLocaleString() } JOB + {networkSize} PERSON NETWORK</div>
            <div style={{ fontSize: 42, fontWeight: 800 }}>${total.toLocaleString()}</div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 28, border: '1px solid #E5E7EB' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📈 Charter vs Founding — 5-Year Projection</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #E5E7EB' }}>Year</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', borderBottom: '2px solid #E5E7EB', color: '#0A1628′ }}>Charter Annual</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', borderBottom: '2px solid #E5E7EB', color: '#4B5563′ }}>Founding Annual</th>
                  <th style={{ textAlign: 'right', padding: '10px 12px', borderBottom: '2px solid #E5E7EB', color: '#059669′ }}>Charter Advantage</th>
                </tr>
              </thead>
              <tbody>
                {fiveYearCharter.map(row => (
                  <tr key={row.year} style={{ borderBottom: '1px solid #F3F4F6′ }}>
                    <td style={{ padding: '12px 12px', fontWeight: 700 }}>Year {row.year}</td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', fontWeight: 700, color: '#0A1628′ }}>${row.charter.toLocaleString()}</td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', color: '#4B5563′ }}>${row.founding.toLocaleString()}</td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', color: '#059669', fontWeight: 600 }}>
                      +${(row.charter - row.founding).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Charter closes at 500 applications.</div>
          <p style={{ color: '#9CA3AF', marginBottom: 20 }}>Once gone, the 1.5% origination rate and Charter network position are locked forever.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15,
            padding: '14px 32px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Secure My Charter Spot →
          </button>
        </div>
      </div>
    </div>
  );
}
