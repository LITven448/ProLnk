import { useState } from 'react';

export default function DFWForeClosureDataGuide2026() {
  const [investorType, setInvestorType] = useState<'firstTimer'|'experienced'|'flipper'|'landlord'>('firstTimer');

  const strategies: Record<string, { title: string; steps: string[]; risks: string[]; emoji: string }> = {
    firstTimer: {
      emoji: '🌱',
      title: 'Start with Pre-Foreclosures',
      steps: [
        'Search county courthouse records for lis pendens filings',
        'Contact homeowner directly — they often prefer a private sale',
        'Get a title search done immediately (liens may exist)',
        'Use a real estate attorney for the transaction',
        'Expect 5–15% below market if you close quickly',
      ],
      risks: ['Unknown repair costs without inspection', 'Homeowner may redeem before closing', 'Title complications from unpaid HOA/taxes'],
    },
    experienced: {
      emoji: '🏛',
      title: 'Courthouse Auction Strategy',
      steps: [
        'Pull the foreclosure auction list from county trustee (Tuesdays in TX)',
        'Research title and lien history before bidding',
        'Set a firm max bid — no financing contingency at auction',
        'Bring cashier's check (full payment often due same day)',
        'Budget 10–20% of purchase price for post-close repairs',
      ],
      risks: ['No inspection possible pre-auction', 'Occupied properties — eviction costs', 'Second liens survive in some cases'],
    },
    flipper: {
      emoji: '🔨',
      title: 'REO / Bank-Owned Focus',
      steps: [
        'Monitor Fannie Mae HomePath, Freddie Mac HomeSteps, HUD listings',
        'Properties are vacant — inspection usually allowed',
        'Make aggressive offers in first 2 weeks on market',
        'Factor full renovation budget into your ARV calculation',
        'Target Tarrant County for best flip margins in 2026',
      ],
      risks: ['REO properties often stripped of fixtures', 'Banks move slowly — 45-90 day closes typical', 'Competition from institutional buyers is fierce'],
    },
    landlord: {
      emoji: '🏘',
      title: 'Probate & Divorce Opportunities',
      steps: [
        'Monitor probate court filings in Dallas & Tarrant counties',
        'Heirs often want fast cash — motivated sellers',
        'Divorce attorney referrals can surface off-market deals',
        'Condition varies widely — budget conservatively',
        'BRRRR strategy works well: Buy, Rehab, Rent, Refinance, Repeat',
      ],
      risks: ['Multiple heirs can complicate negotiations', 'Properties may have deferred maintenance', 'Emotional sellers sometimes pull back'],
    },
  };

  const strat = strategies[investorType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MARKET DATA</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚖️ DFW Foreclosure Guide 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Low foreclosure rate, big opportunities — how to navigate the DFW distressed market</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Foreclosure Rate', value: '0.3%', icon: '📉' },
            { label: 'Monthly Filings', value: '~820', icon: '📋' },
            { label: 'Avg Discount vs Market', value: '8–14%', icon: '💰' },
          ].map(s => (
            <div key={s.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>{s.value}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3060' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>📍 Texas Foreclosure Process (Non-Judicial)</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            {['Default Notice', '20-Day Cure', 'Posting (21 days)', 'Auction (1st Tue)', 'REO/Bank Owned'].map((step, i) => (
              <div key={step} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 6px' }}>{i+1}</div>
                <div style={{ color: '#8899BB', fontSize: 11 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Strategy by Investor Type</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {([['firstTimer','First Timer'],['experienced','Experienced'],['flipper','Flipper'],['landlord','Landlord']] as const).map(([k,label]) => (
              <button key={k} onClick={()=>setInvestorType(k)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: investorType===k ? '#F5E642' : '#1E3060', color: investorType===k ? '#0A1628' : '#fff', fontWeight: 700 }}>{label}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>{strat.emoji} {strat.title}</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Steps:</div>
            {strat.steps.map((s,i) => <div key={i} style={{ color: '#8899BB', marginBottom: 6, paddingLeft: 16 }}>• {s}</div>)}
            <div style={{ fontWeight: 600, marginTop: 16, marginBottom: 8, color: '#FF6B6B' }}>Key Risks:</div>
            {strat.risks.map((r,i) => <div key={i} style={{ color: '#FF6B6B', opacity: 0.8, marginBottom: 6, paddingLeft: 16, fontSize: 14 }}>⚠️ {r}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
