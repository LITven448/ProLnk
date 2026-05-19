import { useState } from 'react';

const MILESTONES = [
  { month: 'Month 1', goal: 'First Referrals', icon: '🚀', targets: ['3 homeowner registrations', '2 pro introductions', '1 confirmed match', 'Learn the pitch'] },
  { month: 'Month 2', goal: 'First Sub-Partners', icon: '🤝', targets: ['5 homeowner registrations', '2 sub-partners recruited', '3 matches completed', '$300–$600 in commissions'] },
  { month: 'Month 3', goal: 'Network Momentum', icon: '📈', targets: ['10 homeowners registered', '4 sub-partners active', '8 matches completed', '$800–$1,500 in commissions'] },
];

const TRADES = ['Plumber', 'Electrician', 'HVAC Tech', 'Roofer', 'General Contractor', 'Painter', 'Landscaper', 'Other'];
const NETWORKS = ['Solo (just me)', 'Small (5–10 contacts)', 'Medium (10–25 contacts)', 'Large (25+ contacts)'];

export default function DFWProLnkPartnerQuarter1() {
  const [trade, setTrade] = useState('');
  const [network, setNetwork] = useState('');
  const [shown, setShown] = useState(false);

  const networkMultiplier = network === 'Large (25+ contacts)' ? 1.5 : network === 'Medium (10–25 contacts)' ? 1.2 : network === 'Small (5–10 contacts)' ? 1.0 : 0.7;

  const projections = MILESTONES.map((m, i) => ({
    ...m,
    income: Math.round([400, 900, 1200][i] * networkMultiplier),
  }));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>📅</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW ProLnk Partner — Q1 Roadmap</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>Your 90-day launch plan for building a profitable partner network in DFW</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚙️ Your Starting Point</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Trade Background</label>
              <select value={trade} onChange={e => setTrade(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select trade...</option>
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899AA', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Starting Network Size</label>
              <select value={network} onChange={e => setNetwork(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select size...</option>
                {NETWORKS.map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShown(true)} disabled={!trade || !network} style={{ marginTop: 16, background: trade && network ? '#F5E642′ : '#1E3A5F', color: trade && network ? '#0A1628' : '#445566', border: ’none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: trade && network ? 'pointer' : 'not-allowed', width: '100%' }}>
            Generate My 90-Day Milestones →
          </button>
        </div>

        {MILESTONES.map((m, i) => (
          <div key={i} style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{m.icon}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{m.month}</div>
                  <div style={{ color: '#8899AA', fontSize: 13 }}>{m.goal}</div>
                </div>
              </div>
              {shown && <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', fontWeight: 800, fontSize: 15 }}>${projections[i].income.toLocaleString()}</div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {m.targets.map((t, j) => (
                <div key={j} style={{ background: '#0A1628', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#C8D8E8′ }}>✓ {t}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
