import { useState } from 'react';

const grounds = [
  { reason: 'Non-payment of Rent', notice: '3-Day Notice to Vacate', filingFee: '$46–92', timeline: '21–35 days total', cost: '$500–900' },
  { reason: 'Lease Violation', notice: '3-Day Notice to Vacate', filingFee: '$46–92', timeline: '25–40 days total', cost: '$600–1,200' },
  { reason: 'End of Lease / Holdover', notice: '30-Day Notice to Vacate', filingFee: '$46–92', timeline: '45–65 days total', cost: '$700–1,500' },
  { reason: 'Illegal Activity', notice: 'Immediate / 3-Day', filingFee: '$46–92', timeline: '20–30 days total', cost: '$800–2,500' },
  { reason: 'Property Damage', notice: '3-Day Notice to Vacate', filingFee: '$46–92', timeline: '25–40 days total', cost: '$600–2,000' },
];

const steps = [
  { step: 1, title: 'Serve Proper Notice', detail: 'Deliver written notice (hand-deliver, post on door, or certified mail). Keep proof of service.', days: 'Day 1–3' },
  { step: 2, title: 'Wait Notice Period', detail: 'Wait the full notice period. Do NOT accept partial rent if evicting for non-payment — it resets the clock.', days: 'Day 4–33' },
  { step: 3, title: 'File at Justice Court', detail: 'File a Petition for Eviction at your local Justice of the Peace Court in DFW. Bring lease, notices, and documentation.', days: 'Day 3–10' },
  { step: 4, title: 'Serve the Citation', detail: 'Court clerk or constable serves citation to tenant. Hearing scheduled within 10–21 days of filing.', days: 'Day 10–20' },
  { step: 5, title: 'Attend Hearing', detail: 'Present your case. Bring lease, payment records, photos, communication logs. Judge rules same day typically.', days: 'Day 20–30' },
  { step: 6, title: 'Writ of Possession', detail: 'If you win, wait 5 days (tenant appeal period), then file for Writ of Possession. Constable executes the lockout.', days: 'Day 31–42' },
];

const preventionTips = [
  'Screen tenants thoroughly — credit, income, and eviction history',
  'Use Texas-compliant lease agreements (TREC forms)',
  'Respond to maintenance requests promptly to avoid habitability defenses',
  'Send payment reminders 3–5 days before rent is due',
  'Offer a cash-for-keys agreement before filing — often faster and cheaper',
  'Keep detailed records of all tenant communications',
  'Never change locks or remove belongings without a court order (illegal self-help eviction)',
];

const costBreakdown: Record<string, { courtFee: number; constable: number; attorney: number; lostRent: number }> = {
  nonPayment: { courtFee: 70, constable: 200, attorney: 0, lostRent: 2200 },
  leaseViolation: { courtFee: 70, constable: 200, attorney: 400, lostRent: 2200 },
  holdover: { courtFee: 70, constable: 200, attorney: 400, lostRent: 4400 },
  illegalActivity: { courtFee: 70, constable: 200, attorney: 800, lostRent: 2200 },
};

export default function DFWEvictionGuide() {
  const [evictionReason, setEvictionReason] = useState('nonPayment');
  const [monthlyRent, setMonthlyRent] = useState(2000);

  const costs = costBreakdown[evictionReason] || costBreakdown.nonPayment;
  const lostRent = evictionReason === 'holdover' ? monthlyRent * 2 : monthlyRent;
  const totalCost = costs.courtFee + costs.constable + costs.attorney + lostRent;

  const selectedGround = grounds.find(g => {
    if (evictionReason === 'nonPayment') return g.reason === 'Non-payment of Rent';
    if (evictionReason === 'leaseViolation') return g.reason === 'Lease Violation';
    if (evictionReason === 'holdover') return g.reason === 'End of Lease / Holdover';
    if (evictionReason === 'illegalActivity') return g.reason === 'Illegal Activity';
    return false;
  }) || grounds[0];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A2B3C 0%, #2D4A6B 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>⚖️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Eviction Guide</h1>
        <p style={{ fontSize: 18, color: '#B0C8E0', maxWidth: 640, margin: '0 auto' }}>Texas eviction process, proper notice requirements, Justice Court filing, and cost estimates for DFW landlords</p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, margin: '32px 0', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '2px solid #1A2B3C' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Eviction Process & Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#4A5568', fontSize: 13, marginBottom: 6 }}>Eviction Reason</label>
              <select value={evictionReason} onChange={e => setEvictionReason(e.target.value)} style={{ width: '100%', background: '#F8FAFC', color: '#1A2B3C', border: '2px solid #1A2B3C', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>
                <option value="nonPayment">Non-Payment of Rent</option>
                <option value="leaseViolation">Lease Violation</option>
                <option value="holdover">Holdover / End of Lease</option>
                <option value="illegalActivity">Illegal Activity</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#4A5568', fontSize: 13, marginBottom: 6 }}>Monthly Rent ($)</label>
              <input type="number" min={500} max={10000} step={50} value={monthlyRent} onChange={e => setMonthlyRent(parseInt(e.target.value) || 0)} style={{ width: '100%', background: '#F8FAFC', color: '#1A2B3C', border: '2px solid #1A2B3C', borderRadius: 8, padding: '10px 14px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Required Notice', value: selectedGround.notice, color: '#3B82F6' },
              { label: 'Total Timeline', value: selectedGround.timeline, color: '#8B5CF6' },
              { label: 'Court Filing Fee', value: `$${costs.courtFee}–$92`, color: '#F59E0B' },
              { label: 'Total Estimated Cost', value: `$${totalCost.toLocaleString()}`, color: '#EF4444' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ background: '#F8FAFC', borderRadius: 10, padding: 16, border: `1px solid ${color}30` }}>
                <div style={{ color: '#6B7280', fontSize: 13 }}>{label}</div>
                <div style={{ color, fontSize: 20, fontWeight: 800, marginTop: 4 }}>{value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#FEF9C3', borderRadius: 10, padding: 16, border: '1px solid #FDE68A' }}>
            <div style={{ color: '#92400E', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>💡 Cash-for-Keys Alternative</div>
            <div style={{ color: '#78350F', fontSize: 14 }}>Offering tenants $500–1,500 to vacate voluntarily often saves ${(totalCost - 1500).toLocaleString()}+ in legal fees, lost rent, and property damage. Always get a signed vacate agreement before paying.</div>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, margin: '0 0 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📋 Texas Eviction Step-by-Step</h2>
          {steps.map((s) => (
            <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: '50%', background: '#1A2B3C', color: '#F5E642', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 }}>{s.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div style={{ color: '#1A2B3C', fontWeight: 700, fontSize: 16 }}>{s.title}</div>
                  <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: 12, fontWeight: 600, borderRadius: 6, padding: '2px 8px', flexShrink: 0, marginLeft: 8 }}>{s.days}</span>
                </div>
                <div style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.6 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, margin: '0 0 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📊 Eviction Grounds Quick Reference</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1A2B3C' }}>
                  {['Reason', 'Notice Required', 'Filing Fee', 'Timeline', 'Est. Cost'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#1A2B3C', fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {grounds.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', background: i % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                    <td style={{ padding: '10px 12px', color: '#1A2B3C', fontWeight: 600, fontSize: 14 }}>{row.reason}</td>
                    <td style={{ padding: '10px 12px', color: '#4A5568', fontSize: 13 }}>{row.notice}</td>
                    <td style={{ padding: '10px 12px', color: '#4A5568', fontSize: 13 }}>{row.filingFee}</td>
                    <td style={{ padding: '10px 12px', color: '#4A5568', fontSize: 13 }}>{row.timeline}</td>
                    <td style={{ padding: '10px 12px', color: '#EF4444', fontWeight: 700, fontSize: 14 }}>{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#1A2B3C', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🛡️ How to Prevent Evictions</h2>
          {preventionTips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ color: '#10B981', fontSize: 18, flexShrink: 0 }}>✓</span>
              <span style={{ color: '#374151', fontSize: 15 }}>{tip}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, background: '#FEF2F2', borderRadius: 10, padding: 16, border: '1px solid #FECACA' }}>
            <strong style={{ color: '#991B1B' }}>⚠️ Never Do This:</strong>
            <span style={{ color: '#7F1D1D', fontSize: 14 }}> Changing locks, removing doors, shutting off utilities, or removing tenant belongings without a court order is illegal self-help eviction in Texas — you can be liable for actual damages plus $1,000 per violation.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
