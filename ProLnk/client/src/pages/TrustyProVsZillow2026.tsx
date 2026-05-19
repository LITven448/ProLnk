import { useState } from 'react';

const goals = [
  {
    id: 'buying',
    label: 'Buying a Home',
    zillow: 'Zillow Zestimate uses MLS sale history, tax records, and public comps. It cannot see foundation cracks, HVAC age, roof condition, or deferred maintenance. Median Zestimate error rate nationally is around 2-3% but can swing wildly on individual homes.',
    trustypro: 'TrustyPro visual scan layers physical condition data on top of public records. See estimated HVAC replacement timeline, roof wear score, plumbing risk indicators, and structural flags before making an offer. Know what you are actually buying.',
  },
  {
    id: 'selling',
    label: 'Selling a Home',
    zillow: 'Zestimate gives sellers a ballpark. But if your home has been recently renovated, Zillow likely undervalues it. There is no mechanism to input new roof, new HVAC, or updated electrical to correct the estimate.',
    trustypro: 'TrustyPro lets sellers document condition improvements with verified scan data. A certified Home Health Score can be shared with buyers as a trust signal, justifying asking price and accelerating time on market.',
  },
  {
    id: 'maintaining',
    label: 'Maintaining a Home',
    zillow: 'Zillow has no maintenance planning features. It tells you what your home might be worth, not what it needs. There is no alert system for aging systems or recommended service intervals.',
    trustypro: 'TrustyPro creates a living Home Health Profile. Track system ages, get proactive service reminders, log completed maintenance, and see how each improvement affects your health score and estimated value.',
  },
  {
    id: 'investing',
    label: 'Investment Property',
    zillow: 'Zestimate and Rent Zestimate are useful starting points for investment analysis. Public data coverage is broad. But condition risk is invisible — you could be acquiring a money pit.',
    trustypro: 'TrustyPro gives investors condition-adjusted return modeling. See capital expenditure risk scores before acquisition. Portfolio tracking shows aggregate health across multiple properties with system replacement timelines.',
  },
];

export default function TrustyProVsZillow2026() {
  const [active, setActive] = useState(goals[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>2026 Platform Comparison</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>TrustyPro vs Zillow</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            Zillow knows what homes sold for. TrustyPro knows what homes are made of. Here is the difference that matters for your situation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { label: 'Zillow Data Sources', value: 'Public Only', sub: 'MLS, tax records, comps', warn: true },
            { label: 'TrustyPro Data Sources', value: 'Public + Physical', sub: 'visual scan + condition history', warn: false },
            { label: 'Zillow Condition Visibility', value: 'None', sub: 'cannot see inside the home', warn: true },
            { label: 'TrustyPro Condition Visibility', value: 'Full', sub: 'system age, wear, risk scoring', warn: false },
          ].map((s) => (
            <div key={s.label} style={{ background: '#111c2e', borderRadius: 12, padding: '20px 24px', border: s.warn ? '1px solid #4a1010′ : '1px solid #1e3a1e' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.warn ? '#f87171′ : '#4ade80' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c2e', borderRadius: 14, padding: 28, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Select your goal to see which platform serves you better</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => setActive(g)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: active.id === g.id ? '#F5E642′ : '#1e2d45', color: active.id === g.id ? '#0A1628' : '#94a3b8' }}>
                {g.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#1a0a0a', borderRadius: 10, padding: 20, border: '1px solid #4a1010′ }}>
              <div style={{ fontSize: 12, color: '#f87171', marginBottom: 10, fontWeight: 700 }}>🏠 ZILLOW</div>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{active.zillow}</p>
            </div>
            <div style={{ background: '#0a1a0a', borderRadius: 10, padding: 20, border: '1px solid #1e3a1e' }}>
              <div style={{ fontSize: 12, color: '#4ade80', marginBottom: 10, fontWeight: 700 }}>🟢 TRUSTYPRO</div>
              <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>{active.trustypro}</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: '28px 20px' }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Go beyond the Zestimate.</div>
          <div style={{ fontSize: 14, color: '#1e293b' }}>TrustyPro Home Health Profiles are available now for DFW homes. Get your scan on the waitlist.</div>
        </div>
      </div>
    </div>
  );
}

