import { useState } from 'react';

export default function PartnerYear1Projection() {
  const [trade, setTrade] = useState('plumbing');
  const [connections, setConnections] = useState(15);

  const tradeMultiplier: Record<string, number> = {
    plumbing: 1.2,
    hvac: 1.3,
    electrical: 1.15,
    roofing: 1.1,
    general: 1.0,
  };

  const mult = tradeMultiplier[trade] || 1.0;
  const networkBonus = Math.floor(connections / 5) * 0.05;

  const months = [
    { label: 'Month 1', phase: 'Learning & Setup', matches: 0, overrideNetwork: 0 },
    { label: 'Month 2', phase: 'Learning & Setup', matches: 1, overrideNetwork: 0 },
    { label: 'Month 3', phase: 'First Matches', matches: 3, overrideNetwork: 1 },
    { label: 'Month 4', phase: 'First Matches', matches: 5, overrideNetwork: 2 },
    { label: 'Month 5', phase: 'Growing Network', matches: 8, overrideNetwork: 3 },
    { label: 'Month 6', phase: 'Growing Network', matches: 10, overrideNetwork: 5 },
    { label: 'Month 7', phase: 'Growing Network', matches: 12, overrideNetwork: 6 },
    { label: 'Month 8', phase: 'Growing Network', matches: 14, overrideNetwork: 8 },
    { label: 'Month 9', phase: 'Full Stride', matches: 18, overrideNetwork: 10 },
    { label: 'Month 10', phase: 'Full Stride', matches: 20, overrideNetwork: 12 },
    { label: 'Month 11', phase: 'Full Stride', matches: 22, overrideNetwork: 14 },
    { label: 'Month 12', phase: 'Full Stride', matches: 25, overrideNetwork: 16 },
  ];

  const projected = months.map((m) => {
    const directIncome = m.matches * 85 * mult * (1 + networkBonus);
    const overrideIncome = m.overrideNetwork * 12;
    const total = directIncome + overrideIncome;
    return { ...m, directIncome: Math.round(directIncome), overrideIncome: Math.round(overrideIncome), total: Math.round(total) };
  });

  const yearTotal = projected.reduce((sum, m) => sum + m.total, 0);

  const milestones = [
    { month: 3, label: 'First Paycheck' },
    { month: 6, label: 'Network Active' },
    { month: 9, label: 'Consistent Income' },
    { month: 12, label: 'Full Partner' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24, color: 'white' }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📈 Year 1 Income Projection</div>
          <div style={{ color: '#94A3B8', fontSize: 15 }}>Your personalized 12-month earning roadmap as a ProLnk Partner in DFW</div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>⚙️ Customize Your Projection</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Your Trade</label>
              <select value={trade} onChange={e => setTrade(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 14 }}>
                <option value="plumbing">Plumbing</option>
                <option value="hvac">HVAC</option>
                <option value="electrical">Electrical</option>
                <option value="roofing">Roofing</option>
                <option value="general">General Contractor</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Starting Connections: {connections}</label>
              <input type="range" min={0} max={100} value={connections} onChange={e => setConnections(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>📅 Month-by-Month Breakdown</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  {['Month', 'Phase', 'Direct', 'Override', 'Total'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: '#6B7280', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projected.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F3F4F6′ }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0A1628′ }}>{m.label}</td>
                    <td style={{ padding: '8px 12px', color: '#6B7280', fontSize: 12 }}>{m.phase}</td>
                    <td style={{ padding: '8px 12px', color: '#059669′ }}>${m.directIncome.toLocaleString()}</td>
                    <td style={{ padding: '8px 12px', color: '#3B82F6′ }}>${m.overrideIncome.toLocaleString()}</td>
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: '#0A1628′ }}>${m.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, color: 'white', textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>Projected Year 1 Total</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642′ }}>${yearTotal.toLocaleString()}</div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
            <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>🎯 Key Milestones</div>
            {milestones.map((ms, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F3F4F6', fontSize: 13 }}>
                <span style={{ color: '#6B7280′ }}>{ms.label}</span>
                <span style={{ fontWeight: 600, color: '#0A1628′ }}>Month {ms.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#FFFBEB', border: '1px solid #F5E642', borderRadius: 12, padding: 16, fontSize: 13, color: '#78350F' }}>
          💡 Projections are estimates based on average DFW partner performance. Results vary by activity level, trade demand, and network growth.
        </div>
      </div>
    </div>
  );
}
