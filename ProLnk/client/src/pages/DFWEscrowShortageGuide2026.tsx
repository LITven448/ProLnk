import { useState } from 'react';

export default function DFWEscrowShortageGuide2026() {
  const [shortage, setShortage] = useState('500');

  const amount = parseFloat(shortage) || 0;
  const lumpSum = amount;
  const monthly = amount > 0 ? (amount / 12).toFixed(2) : '0.00';
  const newEscrow = amount > 0 ? ((amount / 12) + 150).toFixed(2) : '150.00';

  const steps = [
    { icon: '📬', title: 'January — Lender Sends Notice', desc: 'Your lender analyzes your escrow account each January. If DFW property taxes or insurance increased, they send an escrow shortage notice.' },
    { icon: '💰', title: 'Option 1: Pay Lump Sum', desc: 'Pay the full shortage by the date on the notice (usually 30 days). Your monthly payment stays closer to its current amount.' },
    { icon: '📆', title: 'Option 2: Spread Over 12 Months', desc: 'Do nothing — lender automatically adds 1/12 of the shortage to your monthly payment for the next year.' },
    { icon: '🔍', title: 'Watch DCAD / TCAD', desc: 'Check Dallas CAD (dcad.org) or Tarrant CAD (tad.org) every spring. File a protest if your assessed value seems high.' },
    { icon: '🛡️', title: 'Request Escrow Analysis', desc: 'You can request a mid-year escrow analysis from your lender. Allowed once per year — useful after a successful tax protest.' },
  ];

  const counties = [
    { name: 'Dallas County', cad: 'DCAD', url: 'dcad.org', typical: '+4-8% annually' },
    { name: 'Tarrant County', cad: 'TCAD', url: 'tad.org', typical: '+3-7% annually' },
    { name: 'Collin County', cad: 'CCAD', url: 'collincad.org', typical: '+5-10% annually' },
    { name: 'Denton County', cad: 'DCAD', url: 'dentoncad.com', typical: '+4-9% annually' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 ProLnk DFW Resource Hub</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Escrow Shortage Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW property taxes increase almost every year. Here is exactly what to do when your lender says your escrow is short.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ fontSize: 14, color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📊 Escrow Shortage Calculator</div>
          <label style={{ fontSize: 12, color: '#94a3b8' }}>My escrow shortage amount ($)</label>
          <input
            type="number"
            value={shortage}
            onChange={e => setShortage(e.target.value)}
            placeholder="e.g. 500"
            style={{ display: 'block', marginTop: 8, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '12px', fontSize: 16 }}
          />
          {amount > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Lump Sum Payment</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, marginTop: 4 }}>${lumpSum.toFixed(2)}</div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>Pay once, payment stays lower</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Added to Monthly Payment</div>
                <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 800, marginTop: 4 }}>+${monthly}</div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>Spread over 12 months</div>
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>What To Do — Step by Step</h2>
        {steps.map((s, i) => (
          <div key={i} style={{ background: '#1e2d47', borderRadius: 10, padding: 16, marginBottom: 12, display: 'flex', gap: 14 }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{s.desc}</div>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginTop: 28, marginBottom: 16 }}>DFW County Appraisal Districts</h2>
        {counties.map(c => (
          <div key={c.name} style={{ background: '#1e2d47', borderRadius: 10, padding: 14, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{c.name} — {c.cad}</div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{c.url}</div>
            </div>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{c.typical}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

