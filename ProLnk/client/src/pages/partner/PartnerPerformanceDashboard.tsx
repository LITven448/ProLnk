import { useState } from 'react';

export default function PartnerPerformanceDashboard() {
  const [convos, setConvos] = useState('');
  const [signups, setSignups] = useState('');
  const [matches, setMatches] = useState('');
  const [activations, setActivations] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const c = Number(convos), s = Number(signups), m = Number(matches), a = Number(activations);

  const conversionRate = c > 0 ? ((s / c) * 100).toFixed(0) : 0;
  const activationRate = s > 0 ? ((a / s) * 100).toFixed(0) : 0;

  const getStatus = (val: number, green: number, yellow: number) =>
    val >= green ? 'on-track' : val >= yellow ? 'needs-attention' : 'critical';

  const statusColor = (status: string) =>
    status === 'on-track' ? '#16A34A' : status === 'needs-attention' ? '#D97706' : '#DC2626';

  const statusLabel = (status: string) =>
    status === 'on-track' ? '✅ On Track' : status === 'needs-attention' ? '⚠️ Needs Attention' : '🔴 Critical';

  const nextAction = () => {
    if (c < 5) return 'Priority: Schedule 2 more prospecting conversations this week.';
    if (Number(conversionRate) < 15) return 'Focus on qualifying better before pitching. Ask more questions.';
    if (Number(activationRate) < 30) return 'Follow up with signed partners — help them complete onboarding.';
    if (m < 3) return 'Encourage your active partners to submit their first homeowner referral.';
    return 'Strong week! Consider running a local event or lunch-and-learn to accelerate.';
  };

  const metrics = [
    { label: 'Conversations / Week', value: c, green: 10, yellow: 5, unit: '' },
    { label: 'New Partner Sign-Ups', value: s, green: 2, yellow: 1, unit: '' },
    { label: 'Active Match Volume', value: m, green: 5, yellow: 2, unit: '' },
    { label: 'Network Activation Rate', value: Number(activationRate), green: 50, yellow: 25, unit: '%' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', padding: '32px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 4 }}>📊</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: 0 }}>Performance Dashboard</h1>
          <p style={{ color: '#9CA3AF', margin: '8px 0 0', fontSize: 14 }}>Self-assess your weekly activity and see where to focus</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
          <h2 style={{ color: '#0A1628', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>📝 Enter This Week's Numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Conversations Had', val: convos, setter: setConvos, placeholder: 'e.g. 8' },
              { label: 'New Partner Sign-Ups', val: signups, setter: setSignups, placeholder: 'e.g. 2' },
              { label: 'Active Match Referrals', val: matches, setter: setMatches, placeholder: 'e.g. 4' },
              { label: 'Partners Fully Activated', val: activations, setter: setActivations, placeholder: 'e.g. 1' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>{f.label}</label>
                <input type="number" min="0" value={f.val} onChange={e => { f.setter(e.target.value); setSubmitted(false); }} placeholder={f.placeholder} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} />
              </div>
            ))}
          </div>
          <button onClick={() => setSubmitted(true)} style={{ marginTop: 20, width: '100%', padding: '12px 0', borderRadius: 8, background: '#F5E642', border: 'none', color: '#0A1628', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Generate My Dashboard →</button>
        </div>

        {submitted && c > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {metrics.map(m2 => {
                const s2 = getStatus(m2.value, m2.green, m2.yellow);
                return (
                  <div key={m2.label} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: `2px solid ${statusColor(s2)}` }}>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{m2.label}</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#0A1628' }}>{m2.value}{m2.unit}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: statusColor(s2), marginTop: 6 }}>{statusLabel(s2)}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 20, border: '1px solid #E5E7EB' }}>
              <h3 style={{ color: '#0A1628', fontSize: 15, fontWeight: 700, marginTop: 0 }}>📈 Conversion Rates</h3>
              <div style={{ display: 'flex', gap: 24 }}>
                <div><div style={{ fontSize: 12, color: '#6B7280' }}>Convo → Sign-Up</div><div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>{conversionRate}%</div></div>
                <div><div style={{ fontSize: 12, color: '#6B7280' }}>Sign-Up → Activated</div><div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628' }}>{activationRate}%</div></div>
              </div>
            </div>

            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🎯 Your #1 Next Action</div>
              <div style={{ color: '#E5E7EB', fontSize: 14, lineHeight: 1.6 }}>{nextAction()}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
