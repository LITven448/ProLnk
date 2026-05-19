import { useState } from 'react';

const metrics = [
  {
    id: 'photo',
    emoji: '📸',
    name: 'Photo Detection Rate',
    description: 'What % of your uploaded photos generate AI-detected opportunities?',
    target: 15,
    unit: '%',
    avg: 12,
    action: (val) => val < 10
      ? 'Upload higher-quality photos with better lighting. Focus on HVAC units, roofs, and mechanicals.'
      : val < 15
        ? 'You’re close to target. Try wider shots that capture more of each system.'
        : 'Excellent! Maintain photo quality and keep capturing all home systems.',
  },
  {
    id: 'acceptance',
    emoji: '✅',
    name: 'Lead Acceptance Rate',
    description: 'What % of leads dispatched to you do you accept?',
    target: 85,
    unit: '%',
    avg: 78,
    action: (val) => val < 70
      ? 'CRITICAL: PPS penalty active below 70%. Review and accept more leads or adjust your service area.'
      : val < 85
        ? 'Below target. Review declined leads — are they outside your zone or outside your trades?'
        : 'On target. Staying above 85% protects your PPS standing.',
  },
  {
    id: 'close',
    emoji: '🤝',
    name: 'Lead Close Rate',
    description: 'What % of accepted leads convert to closed jobs?',
    target: 65,
    unit: '%',
    avg: 55,
    action: (val) => val < 40
      ? 'Low close rate. Review your initial homeowner contact scripts and response speed.'
      : val < 65
        ? 'Below target. Contact leads within 5 minutes — 8x higher close rate vs. 30+ minutes.'
        : 'Strong close rate. Prioritize storm leads where your target is 65%+.',
  },
  {
    id: 'network',
    emoji: '🌐',
    name: 'Network Growth Rate',
    description: 'How many new recruits per month?',
    target: 2,
    unit: '/mo',
    avg: 0.8,
    action: (val) => val < 1
      ? 'Share your partner link in trade Facebook groups and local contractor associations.'
      : val < 2
        ? 'Good start. Add 1 more referral/month with LinkedIn outreach to trade contacts.'
        : 'Strong growth. Your passive income stream is building. Keep the pace.',
  },
  {
    id: 'velocity',
    emoji: '⚡',
    name: 'Commission Velocity',
    description: 'Average days from job to commission payout.',
    target: 7,
    unit: ' days',
    avg: 11,
    action: (val) => val > 14
      ? 'Slow payout. Ensure job completion is marked in the app same day — delays cause batch processing lag.'
      : val > 7
        ? 'Slightly above target. Confirm job status updates within 24h of completion.'
        : 'Excellent velocity. You’re processing faster than average.',
    lowerIsBetter: true,
  },
];

const monthlyData = [
  { month: 'Jan', photo: 11, acceptance: 82, close: 58, network: 1, velocity: 9 },
  { month: 'Feb', photo: 12, acceptance: 84, close: 61, network: 1, velocity: 8 },
  { month: 'Mar', photo: 13, acceptance: 87, close: 63, network: 2, velocity: 7 },
  { month: 'Apr', photo: 14, acceptance: 88, close: 66, network: 2, velocity: 6 },
];

export default function PartnerSuccessMetrics() {
  const [values, setValues] = useState({ photo: 12, acceptance: 78, close: 55, network: 1, velocity: 11 });

  const updateVal = (id, val) => setValues(prev => ({ ...prev, [id]: val }));

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>📊 Partner Resources</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0f172a', margin: '0 0 12px' }}>
            Track These 5 Metrics to Grow Your ProLnk Income
          </h1>
          <p style={{ fontSize: 17, color: '#475569', margin: 0 }}>
            Your income is directly tied to these five performance levers. Partners in the top 20% outperform average by 3.1x.
          </p>
        </div>

        {/* Metrics */}
        <div style={{ display: 'grid', gap: 20, marginBottom: 40 }}>
          {metrics.map((m, idx) => {
            const current = values[m.id];
            const onTarget = m.lowerIsBetter ? current <= m.target : current >= m.target;
            const pct = m.lowerIsBetter ? Math.min(100, (m.target / current) * 100) : Math.min(100, (current / m.target) * 100);
            return (
              <div key={m.id} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: `2px solid ${onTarget ? '#bbf7d0' : '#fde8d8'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Metric {idx + 1}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{m.emoji} {m.name}</h3>
                    <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>{m.description}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                    <div style={{ fontSize: 12, color: '#94a3b8′ }}>Target</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#3b82f6′ }}>{m.target}{m.unit}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8′ }}>Avg: {m.avg}{m.unit}</div>
                  </div>
                </div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: onTarget ? '#22c55e' : '#f97316', borderRadius: 4, transition: 'width 0.3s' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: '#475569', whiteSpace: 'nowrap' }}>Your value: <strong>{current}{m.unit}</strong></label>
                  <input type="range" min={m.lowerIsBetter ? 1 : 0} max={m.lowerIsBetter ? 30 : m.id === 'network' ? 10 : 100} step={m.lowerIsBetter || m.id === 'network' ? 1 : 1} value={current}
                    onChange={e => updateVal(m.id, Number(e.target.value))}
                    style={{ flex: 1, accentColor: onTarget ? '#22c55e' : '#f97316′ }} />
                </div>
                <div style={{ background: onTarget ? '#f0fdf4′ : '#fff7ed', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: onTarget ? '#166534' : '#9a3412' }}>
                  {m.lowerIsBetter ? m.action(current) : m.action(current)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Monthly Review Dashboard */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: 20 }}>📅 Monthly Review Dashboard Template</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>Month</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>📸 Photo Det.</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>✅ Acceptance</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>🤝 Close Rate</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>🌐 Network</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', color: '#475569', fontWeight: 600, borderBottom: '1px solid #e2e8f0′ }}>⚡ Velocity</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, i) => (
                  <tr key={row.month} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #f1f5f9′ }}>{row.month}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: row.photo >= 15 ? '#16a34a' : '#ea580c', borderBottom: '1px solid #f1f5f9′ }}>{row.photo}%</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: row.acceptance >= 85 ? '#16a34a' : '#ea580c', borderBottom: '1px solid #f1f5f9′ }}>{row.acceptance}%</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: row.close >= 65 ? '#16a34a' : '#ea580c', borderBottom: '1px solid #f1f5f9′ }}>{row.close}%</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: row.network >= 2 ? '#16a34a' : '#ea580c', borderBottom: '1px solid #f1f5f9′ }}>{row.network}/mo</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: row.velocity <= 7 ? '#16a34a' : '#ea580c', borderBottom: '1px solid #f1f5f9′ }}>{row.velocity}d</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '12px 0 0′ }}>Sample data shown. Your live metrics appear in your partner dashboard after activation.</p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginTop: 0 }}>Ready to start tracking?</h3>
          <p style={{ color: '#475569', marginBottom: 20 }}>Apply as a partner and get access to your live metrics dashboard from day one.</p>
          <a href="/apply" style={{ display: 'inline-block', background: '#3b82f6', color: '#fff', padding: '14px 36px', borderRadius: 10, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            📊 Apply as a Partner
          </a>
        </div>

      </div>
    </div>
  );
}
