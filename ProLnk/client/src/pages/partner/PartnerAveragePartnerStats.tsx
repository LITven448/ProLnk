import { useState } from 'react';

export default function PartnerAveragePartnerStats() {
  const [activityLevel, setActivityLevel] = useState(3);
  const [networkSize, setNetworkSize] = useState(10);
  const [tradeYears, setTradeYears] = useState(5);

  const tiers = [
    {
      label: 'Top 25%',
      icon: '🏆',
      color: '#F5E642',
      bg: '#0A1628',
      annualIncome: '$68,400',
      monthlyMatches: 22,
      networkPartners: 18,
      homesAdded: 45,
      key90Days: 'Consistent daily outreach, 3+ new partners by month 2',
    },
    {
      label: 'Average',
      icon: '📊',
      color: '#0A1628',
      bg: '#EFF6FF',
      annualIncome: '$28,800',
      monthlyMatches: 10,
      networkPartners: 7,
      homesAdded: 18,
      key90Days: 'Sporadic outreach, 1-2 new partners by month 3',
    },
    {
      label: 'Bottom 25%',
      icon: '📉',
      color: '#6B7280',
      bg: '#F9FAFB',
      annualIncome: '$6,200',
      monthlyMatches: 2,
      networkPartners: 1,
      homesAdded: 4,
      key90Days: 'Passive approach, waiting for leads to come in',
    },
  ];

  const score = activityLevel * 2 + Math.floor(networkSize / 5) + Math.floor(tradeYears / 3);

  const tier = score >= 14 ? 0 : score >= 8 ? 1 : 2;
  const tierLabels = ['Top 25%', 'Average', 'Bottom 25%'];

  const improvements = [
    { action: 'Add 2 more partners to your network', impact: '+$3,200/yr' },
    { action: 'Increase match activity by 20%', impact: '+$2,400/yr' },
    { action: 'Add 10 homes to origination rights', impact: '+$1,800/yr' },
    { action: 'Attend 1 ProLnk partner event per quarter', impact: '+$4,100/yr' },
  ];

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24, color: 'white' }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📊 Average Partner Performance Stats</div>
          <div style={{ color: '#94A3B8', fontSize: 15 }}>What separates top earners from average — and how your first 90 days predict long-term success</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{ background: t.bg, borderRadius: 12, padding: 20, border: i === 0 ? 'none' : '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: t.color, marginBottom: 12 }}>{t.label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: t.color, marginBottom: 12 }}>{t.annualIncome}</div>
              <div style={{ fontSize: 12, color: i === 0 ? '#94A3B8′ : '#6B7280' }}>per year</div>
              <div style={{ marginTop: 16, borderTop: `1px solid ${i === 0 ? '#1E3A5F' : '#E5E7EB'}`, paddingTop: 12 }}>
                {[
                  { k: 'Monthly Matches', v: t.monthlyMatches },
                  { k: 'Network Partners', v: t.networkPartners },
                  { k: 'Homes Added Y1', v: t.homesAdded },
                ].map((item, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                    <span style={{ color: i === 0 ? '#94A3B8′ : '#9CA3AF' }}>{item.k}</span>
                    <span style={{ fontWeight: 700, color: t.color }}>{item.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: '8px 10px', background: i === 0 ? '#1E3A5F' : '#F3F4F6', borderRadius: 8, fontSize: 11, color: i === 0 ? '#CBD5E1′ : '#6B7280', fontStyle: ’italic' }}>
                "{t.key90Days}"
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>🎯 Where Will You Land? Tell Us About Yourself</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Activity Level (1-5): {activityLevel}</label>
              <input type="range" min={1} max={5} value={activityLevel} onChange={e => setActivityLevel(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                <span>Passive</span><span>Very Active</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Existing Network: {networkSize}</label>
              <input type="range" min={0} max={50} value={networkSize} onChange={e => setNetworkSize(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Years in Trade: {tradeYears}</label>
              <input type="range" min={0} max={30} value={tradeYears} onChange={e => setTradeYears(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Your Predicted Tier</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{tierLabels[tier]}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Projected Annual Income</div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: 22 }}>{tiers[tier].annualIncome}</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 14 }}>⬆️ Actions to Move Up a Tier</div>
          {improvements.map((imp, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6′ }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{'💡'}</span>
                <span style={{ fontSize: 13, color: '#374151′ }}>{imp.action}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#059669', whiteSpace: 'nowrap', marginLeft: 12 }}>{imp.impact}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFBEB', border: '1px solid #F5E642', borderRadius: 12, padding: 16, fontSize: 13, color: '#78350F' }}>
          💡 Stats based on DFW partner cohort data. Individual results vary based on trade type, geographic density, and time invested.
        </div>
      </div>
    </div>
  );
}
