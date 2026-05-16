import { useState } from 'react';

export default function DFWProLnkNetworkIncomeCalc() {
  const [directMatches, setDirectMatches] = useState('20');
  const [avgMatchVal, setAvgMatchVal] = useState('350');
  const [commRate, setCommRate] = useState('25');
  const [l1Partners, setL1Partners] = useState('3');
  const [l2Partners, setL2Partners] = useState('6');
  const [l3Partners, setL3Partners] = useState('9');
  const [l4Partners, setL4Partners] = useState('12');
  const [subPartners, setSubPartners] = useState('5');
  const [homes, setHomes] = useState('20');
  const [shown, setShown] = useState(false);

  const dm = parseInt(directMatches) || 0;
  const amv = parseInt(avgMatchVal) || 0;
  const cr = parseInt(commRate) / 100 || 0.25;

  const directIncome = dm * amv * cr;
  const l1Income = (parseInt(l1Partners) || 0) * 10 * amv * 0.07;
  const l2Income = (parseInt(l2Partners) || 0) * 8 * amv * 0.04;
  const l3Income = (parseInt(l3Partners) || 0) * 6 * amv * 0.02;
  const l4Income = (parseInt(l4Partners) || 0) * 4 * amv * 0.01;
  const subIncome = (parseInt(subPartners) || 0) * 149 * 0.12;
  const originIncome = (parseInt(homes) || 0) * 2800 * 0.015 / 12;

  const total = directIncome + l1Income + l2Income + l3Income + l4Income + subIncome + originIncome;

  const streams = [
    { label: 'Direct Match Income', val: directIncome, icon: '⚡', desc: `${dm} matches × $${amv} × ${commRate}%` },
    { label: 'L1 Override (7%)', val: l1Income, icon: '👥', desc: `${l1Partners} partners × 10 matches` },
    { label: 'L2 Override (4%)', val: l2Income, icon: '👥', desc: `${l2Partners} partners × 8 matches` },
    { label: 'L3 Override (2%)', val: l3Income, icon: '👥', desc: `${l3Partners} partners × 6 matches` },
    { label: 'L4 Override (1%)', val: l4Income, icon: '👥', desc: `${l4Partners} partners × 4 matches` },
    { label: 'Subscription Override (12%)', val: subIncome, icon: '🔄', desc: `${subPartners} subs × $149/mo` },
    { label: 'Origination Rights (1.5%)', val: originIncome, icon: '🏠', desc: `${homes} homes × $2,800 avg` },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>Network Income Calculator</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Model all 5 ProLnk income streams in one place</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚙️ Adjust All Income Levers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {[
              { label: 'Your Monthly Matches', val: directMatches, set: setDirectMatches },
              { label: 'Avg Match Value ($)', val: avgMatchVal, set: setAvgMatchVal },
              { label: 'Commission Rate (%)', val: commRate, set: setCommRate },
              { label: 'L1 Partners', val: l1Partners, set: setL1Partners },
              { label: 'L2 Partners', val: l2Partners, set: setL2Partners },
              { label: 'L3 Partners', val: l3Partners, set: setL3Partners },
              { label: 'L4 Partners', val: l4Partners, set: setL4Partners },
              { label: 'Referred Subscribers', val: subPartners, set: setSubPartners },
              { label: 'Homes Registered', val: homes, set: setHomes },
            ].map((f, i) => (
              <div key={i}>
                <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 5 }}>{f.label}</label>
                <input type='number' value={f.val} onChange={e => f.set(e.target.value)} min={0} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '9px 12px', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button onClick={() => setShown(true)} style={{ marginTop: 16, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Calculate Total Monthly Income →
          </button>
        </div>

        {shown && (
          <>
            <div style={{ background: '#1A3A00', border: '2px solid #F5E642', borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: 20 }}>
              <div style={{ color: '#8899AA', fontSize: 14, marginBottom: 4 }}>Total Monthly Network Income</div>
              <div style={{ color: '#F5E642', fontSize: 48, fontWeight: 900 }}>${total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
              <div style={{ color: '#8899AA', fontSize: 13, marginTop: 4 }}>Annual: ${(total * 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {streams.map((s, i) => (
                <div key={i} style={{ background: '#0D1F38', borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 22 }}>{s.icon}</span>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{s.label}</div>
                      <div style={{ color: '#8899AA', fontSize: 12 }}>{s.desc}</div>
                    </div>
                  </div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>${s.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
