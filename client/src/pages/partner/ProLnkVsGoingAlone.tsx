import { useState } from 'react';

const rows = [
  { label: 'Monthly lead cost', prolnk: '$0 upfront — earn first', solo: '$500–$2,000+ (Angi, Google Ads, etc.)' },
  { label: 'Time spent marketing', prolnk: '0 hrs/week', solo: '10–20 hrs/week' },
  { label: 'Lead quality', prolnk: 'AI-matched, verified intent', solo: 'Variable, often low quality' },
  { label: 'Income stability', prolnk: 'Consistent flow from matched leads', solo: 'Feast or famine cycles' },
  { label: 'Commission on jobs', prolnk: '12–70% tiered (you keep most)', solo: '100% — but you find every job' },
  { label: 'Customer reviews', prolnk: 'Managed platform reputation', solo: 'Must build from scratch' },
  { label: 'Insurance & compliance', prolnk: 'Platform assists with verification', solo: 'Entirely on you' },
  { label: 'Referral network income', prolnk: '4-level override — earn from your network', solo: 'None' },
  { label: 'Business support', prolnk: 'Onboarding, coaching, AI tools', solo: 'None unless you pay for it' },
];

export default function ProLnkVsGoingAlone() {
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(75);

  const soloJobs = Math.floor(hours * 0.55);
  const soloMarketing = hours * 0.45;
  const soloIncome = soloJobs * rate;
  const soloMktCost = soloMarketing * 25;

  const prolnkJobs = Math.floor(hours * 0.85);
  const prolnkIncome = prolnkJobs * rate * 0.72;
  const prolnkReferral = prolnkIncome * 0.05;
  const prolnkTotal = prolnkIncome + prolnkReferral;

  const diff = prolnkTotal - soloIncome + soloMktCost;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0A1628', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>PARTNER COMPARISON</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>ProLnk vs. Going It Alone</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, margin: 0 }}>Same skills. Same hours. Completely different outcomes. Here's what the numbers actually look like.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#0A1628' }}>📋 Side-by-Side Comparison</h2>
          <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 4px 24px #0001' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <thead>
                <tr style={{ background: '#0A1628' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: '#94a3b8', fontWeight: 600, width: '34%' }}>Category</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: '#F5E642', fontWeight: 700 }}>🔗 ProLnk Partner</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', color: '#94a3b8', fontWeight: 600 }}>🧰 Solo Contractor</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: '#475569' }}>{r.label}</td>
                    <td style={{ padding: '14px 20px', color: '#0A1628', fontWeight: 500 }}>{r.prolnk}</td>
                    <td style={{ padding: '14px 20px', color: '#64748b' }}>{r.solo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ marginTop: 56, background: '#fff', borderRadius: 20, padding: '36px 32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 24px #0001' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>💰 Income Calculator</h2>
          <p style={{ color: '#64748b', marginBottom: 32 }}>Adjust your hours and rate to see the real income difference.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 36 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 10 }}>
                Hours worked per week: <span style={{ color: '#0A1628', fontSize: 18 }}>{hours}</span>
              </label>
              <input type="range" min={10} max={80} value={hours} onChange={e => setHours(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642', height: 6 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                <span>10 hrs</span><span>80 hrs</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 10 }}>
                Hourly job rate: <span style={{ color: '#0A1628', fontSize: 18 }}>${rate}/hr</span>
              </label>
              <input type="range" min={40} max={200} step={5} value={rate} onChange={e => setRate(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642', height: 6 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                <span>$40</span><span>$200</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#f8fafc', borderRadius: 14, padding: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>🧰 Solo Contractor</div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>Billable hours (55%): <strong>{soloJobs} hrs</strong></div>
              <div style={{ fontSize: 13, color: '#ef4444', marginBottom: 6 }}>Marketing hours (45%): <strong>{Math.floor(soloMarketing)} hrs lost</strong></div>
              <div style={{ fontSize: 13, color: '#ef4444', marginBottom: 16 }}>Est. monthly marketing spend: <strong>-${soloMktCost.toLocaleString()}</strong></div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0A1628' }}>${(soloIncome - soloMktCost).toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400, color: '#64748b' }}>/mo net</span></div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 14, padding: '24px', border: '2px solid #F5E642' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>🔗 ProLnk Partner</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Billable hours (85%): <strong style={{ color: '#fff' }}>{prolnkJobs} hrs</strong></div>
              <div style={{ fontSize: 13, color: '#4ade80', marginBottom: 6 }}>Marketing cost: <strong>$0</strong></div>
              <div style={{ fontSize: 13, color: '#4ade80', marginBottom: 16 }}>Network override income: <strong>+${prolnkReferral.toLocaleString()}</strong></div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>${prolnkTotal.toLocaleString()}<span style={{ fontSize: 14, fontWeight: 400, color: '#94a3b8' }}>/mo net</span></div>
            </div>
          </div>

          {diff > 0 && (
            <div style={{ marginTop: 20, background: '#4ade8015', border: '1px solid #4ade8040', borderRadius: 12, padding: '16px 20px', textAlign: 'center' }}>
              <span style={{ fontWeight: 700, color: '#4ade80', fontSize: 18 }}>ProLnk partners earn ~${diff.toLocaleString()}/mo more with these hours</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: 48, background: '#0A1628', borderRadius: 16, padding: '32px 28px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Ready to Stop Marketing and Start Earning?</h3>
          <p style={{ color: '#94a3b8', marginBottom: 0 }}>Join ProLnk and get matched with verified homeowners in your area — zero marketing budget required.</p>
        </div>
      </div>
    </div>
  );
}
