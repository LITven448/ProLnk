import { useState } from 'react';

export default function PartnerRetirementIncomePlan() {
  const [targetMonthly, setTargetMonthly] = useState(5000);
  const [activityYearsLeft, setActivityYearsLeft] = useState(10);
  const [currentAge, setCurrentAge] = useState(45);

  const dfwMonthlyExpenses = {
    housing: 1800,
    food: 600,
    transport: 450,
    healthcare: 550,
    leisure: 400,
    misc: 300,
  };
  const dfwTotal = Object.values(dfwMonthlyExpenses).reduce((a, b) => a + b, 0);

  const matchIncomeNeeded = Math.round(targetMonthly * 0.35);
  const networkOverrideNeeded = Math.round(targetMonthly * 0.40);
  const originationNeeded = Math.round(targetMonthly * 0.25);

  const partnersNeeded = Math.round(networkOverrideNeeded / (149 * 0.07));
  const homesNeeded = Math.round(originationNeeded / 18 / 2.5);
  const matchesMonthly = Math.round(matchIncomeNeeded / 85);

  const buildYears = activityYearsLeft;
  const retireAge = currentAge + buildYears;
  const intensityLabel = buildYears >= 10 ? 'Steady pace' : buildYears >= 6 ? 'Active pace' : 'Aggressive pace';

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24, color: 'white' }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🌅 ProLnk Retirement Income Plan</div>
          <div style={{ color: '#94A3B8', fontSize: 15 }}>Build enough passive ProLnk income to supplement — or replace — retirement in DFW</div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 6 }}>🏙️ DFW Monthly Cost of Living Reference</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Median comfortable retirement lifestyle, Dallas-Fort Worth Metro</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
            {Object.entries(dfwMonthlyExpenses).map(([k, v]) => (
              <div key={k} style={{ background: '#F9FAFB', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'capitalize', marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0A1628' }}>${v.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F0F9FF', borderRadius: 8, padding: '12px 16px' }}>
            <span style={{ fontWeight: 700, color: '#0369A1' }}>Total DFW Comfortable Monthly</span>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#0369A1' }}>${dfwTotal.toLocaleString()}</span>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#0A1628', marginBottom: 16 }}>⚙️ Your Retirement Income Goal</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Target Monthly Income: ${targetMonthly.toLocaleString()}</label>
              <input type="range" min={1000} max={20000} step={500} value={targetMonthly} onChange={e => setTargetMonthly(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Years to Build: {activityYearsLeft} yrs</label>
              <input type="range" min={2} max={25} value={activityYearsLeft} onChange={e => setActivityYearsLeft(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#6B7280', display: 'block', marginBottom: 6 }}>Your Current Age: {currentAge}</label>
              <input type="range" min={25} max={70} value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24, color: 'white' }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🎯 What You Need to Build by Age {retireAge}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { icon: '🔨', label: 'Monthly Matches', value: matchesMonthly, unit: 'matches/mo', color: '#34D399' },
              { icon: '🌐', label: 'Network Partners', value: partnersNeeded, unit: 'active partners', color: '#60A5FA' },
              { icon: '🏠', label: 'Homes in Vault', value: homesNeeded, unit: 'properties', color: '#FBBF24' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#1E3A5F', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{item.unit}</div>
                <div style={{ fontSize: 12, color: '#CBD5E1', marginTop: 6 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#1E3A5F', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>Build Intensity</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{intensityLabel}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>Target Retirement Age</div>
              <div style={{ color: 'white', fontWeight: 800, fontSize: 22 }}>{retireAge}</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 16, border: '1px solid #E5E7EB' }}>
          <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>📋 Income Stream Breakdown at Retirement Target</div>
          {[
            { stream: 'Direct Match Income', pct: 35, monthly: matchIncomeNeeded, color: '#059669' },
            { stream: 'Network Override Income', pct: 40, monthly: networkOverrideNeeded, color: '#3B82F6' },
            { stream: 'Origination Rights', pct: 25, monthly: originationNeeded, color: '#F59E0B' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 120, fontSize: 12, color: '#6B7280' }}>{s.stream}</div>
              <div style={{ flex: 1, background: '#F3F4F6', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: 4 }} />
              </div>
              <div style={{ width: 90, textAlign: 'right', fontWeight: 700, color: s.color, fontSize: 13 }}>${s.monthly.toLocaleString()}/mo</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFBEB', border: '1px solid #F5E642', borderRadius: 12, padding: 16, fontSize: 13, color: '#78350F' }}>
          💡 This plan is illustrative. ProLnk income is not guaranteed. Consult a financial advisor before making retirement decisions based on any income projection.
        </div>
      </div>
    </div>
  );
}
