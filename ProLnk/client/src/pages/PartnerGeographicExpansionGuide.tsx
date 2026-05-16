import { useState } from 'react';

const TRADE_EXPANSION: Record<string, { strategy: string; priority: string; demand: string; notes: string }> = {
  hvac: {
    strategy: 'Expand to all DFW suburbs',
    priority: 'Universal — all geographies',
    demand: '5,000+ units per ZIP code',
    notes: 'Every home needs HVAC. DFW extreme heat creates year-round demand with summer peaks. No ZIP is a bad HVAC market.',
  },
  roofing: {
    strategy: 'Prioritize hail corridor',
    priority: 'US-75 through Allen/Plano/Frisco/McKinney',
    demand: 'Storm-event driven — spikes 400%+ post-hail',
    notes: 'Follow storm history data. Allen, Plano, and McKinney sit in the primary hail corridor. Expand north along 75 first.',
  },
  foundation: {
    strategy: 'Focus on Blackland Prairie clay soil areas',
    priority: 'Most of DFW — avoid sandy South Dallas',
    demand: 'Chronic — expanding clay soil causes constant movement',
    notes: 'Dallas area Blackland Prairie clay is one of the worst foundation soils in the US. Almost every home will need work eventually.',
  },
  pest: {
    strategy: 'Expand broadly — year-round demand',
    priority: 'All DFW suburbs equally',
    demand: 'Recurring monthly/quarterly — high retention',
    notes: 'Texas pest pressure is severe. Termites, mosquitoes, rodents, fire ants — recurring contracts make this a strong expansion play.',
  },
  landscaping: {
    strategy: 'Follow growth corridors',
    priority: 'Celina, Prosper, Frisco, McKinney new builds',
    demand: 'HOA-required maintenance in new developments',
    notes: 'New construction areas with mandatory HOA landscaping standards. Growth suburbs = built-in recurring demand.',
  },
  plumbing: {
    strategy: 'Target older home neighborhoods',
    priority: 'Garland, Mesquite, Richardson, Oak Cliff',
    demand: 'Infrastructure age — galvanized pipes failing',
    notes: 'Pre-1980 homes with galvanized or cast iron plumbing are hitting end of life. Target older suburban cores.',
  },
  electrical: {
    strategy: 'Balance old and new',
    priority: 'Older homes for panels, new construction for service calls',
    demand: 'Steady — EV charger installs growing fast',
    notes: 'EV adoption is driving charger installation demand across all DFW. Good expansion rationale for any ZIP with high household income.',
  },
};

export default function PartnerGeographicExpansionGuide() {
  const [trade, setTrade] = useState('');
  const [currentZips, setCurrentZips] = useState('');
  const [showRecs, setShowRecs] = useState(false);

  const trades = [
    { id: 'hvac', label: '❄️ HVAC' },
    { id: 'roofing', label: '🏠 Roofing' },
    { id: 'foundation', label: '🧱 Foundation' },
    { id: 'pest', label: '🐜 Pest Control' },
    { id: 'landscaping', label: '🌿 Landscaping' },
    { id: 'plumbing', label: '🔧 Plumbing' },
    { id: 'electrical', label: '⚡ Electrical' },
  ];

  const tradeData = trade ? TRADE_EXPANSION[trade] : null;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            🗺️ PARTNER STRATEGY
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, margin: '0 0 20px', color: '#0f172a' }}>
            Geographic Expansion Strategy
          </h1>
          <p style={{ fontSize: 19, color: '#475569', lineHeight: 1.7, maxWidth: 720 }}>
            When and Where to Add Service Areas
          </p>
        </div>

        {/* The math */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 20px' }}>📊 The Math Behind Service Area Expansion</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { coverage: 'Single ZIP', leads: '3–8 leads/mo', note: 'Starting point' },
              { coverage: '5 ZIPs', leads: '12–25 leads/mo', note: 'Coverage density effect kicks in' },
              { coverage: '15 ZIPs', leads: '30–60 leads/mo', note: 'Optimal for most trades' },
              { coverage: '20+ ZIPs', leads: '50–100+ leads/mo', note: 'Regional dominance' },
            ].map(tier => (
              <div key={tier.coverage} style={{ background: '#f8fafc', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 6 }}>{tier.coverage}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#3b82f6', marginBottom: 6 }}>{tier.leads}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{tier.note}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: 16, background: '#eff6ff', borderRadius: 10, borderLeft: '4px solid #3b82f6' }}>
            <strong style={{ color: '#1e40af' }}>Key insight:</strong>
            <span style={{ color: '#1e3a8a', marginLeft: 6 }}>Growth is not linear. Coverage density creates a multiplier effect — nearby ZIPs make each other more efficient for routing and response time.</span>
          </div>
        </div>

        {/* When to expand */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>⏰ When to Expand</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#f0fdf4', borderRadius: 10, padding: 20, borderLeft: '4px solid #22c55e' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#15803d', marginBottom: 8 }}>✓ Signal: Expand Now</div>
              <div style={{ fontSize: 14, color: '#166534', lineHeight: 1.6 }}>You are booking 80%+ of leads you receive. You have capacity to take more. Adjacent ZIPs show demand but low partner coverage.</div>
            </div>
            <div style={{ background: '#fef2f2', borderRadius: 10, padding: 20, borderLeft: '4px solid #ef4444' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#b91c1c', marginBottom: 8 }}>✗ Signal: Wait</div>
              <div style={{ fontSize: 14, color: '#991b1b', lineHeight: 1.6 }}>You are not following up on current leads within 2 hours. Your booking rate is below 50%. You cannot serve an area within 60 minutes.</div>
            </div>
          </div>
        </div>

        {/* DFW by trade */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 20px' }}>🗺️ DFW Expansion Roadmap by Trade</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          {Object.entries(TRADE_EXPANSION).map(([key, val]) => (
            <div key={key} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 6, textTransform: 'capitalize' }}>
                {trades.find(t => t.id === key)?.label || key}
              </div>
              <div style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, marginBottom: 8 }}>{val.strategy}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{val.notes}</div>
            </div>
          ))}
        </div>

        {/* How to identify */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>🔎 How to Identify Expansion Targets</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '📊', title: 'Coverage Gap Tool', desc: 'Your partner dashboard shows demand vs. active partners by ZIP — ZIPs with high demand and few partners are your best expansion targets.' },
              { icon: '🌩️', title: 'Storm History Data', desc: 'ZIPs with recent hail events show 4-6x demand spikes for roofing. ProLnk surfaces storm history as an expansion signal for roofing partners.' },
              { icon: '🏗️', title: 'Construction Activity', desc: 'New home construction creates demand across all trades. Filter by permit activity — where builders are active, service demand follows.' },
              { icon: '📍', title: 'The 60-Minute Rule', desc: 'Do not add a ZIP you cannot serve within 60 minutes. Unserved or slow leads hurt your Partner Performance Score (PPS) which affects future lead routing.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 16, padding: 16, background: '#f8fafc', borderRadius: 10 }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive planner */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>📋 Expansion Planner</h2>
          <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 24px' }}>Select your trade to get ranked expansion recommendations.</p>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10, fontWeight: 600 }}>Your Trade</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {trades.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setTrade(t.id); setShowRecs(false); }}
                  style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                    background: trade === t.id ? '#3b82f6' : '#f8fafc',
                    color: trade === t.id ? '#fff' : '#475569',
                    borderColor: trade === t.id ? '#3b82f6' : '#e2e8f0',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8, fontWeight: 600 }}>Current ZIP Codes (comma-separated)</div>
            <input
              value={currentZips}
              onChange={e => setCurrentZips(e.target.value)}
              placeholder="e.g. 75034, 75035, 75025"
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={() => { if (trade) setShowRecs(true); }}
            style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Get Expansion Recommendations →
          </button>
          {showRecs && tradeData && (
            <div style={{ marginTop: 24, background: '#f8fafc', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                {trades.find(t => t.id === trade)?.label} — Expansion Strategy
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>Recommended Strategy</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{tradeData.strategy}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>Priority Areas</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', textAlign: 'right', maxWidth: '60%' }}>{tradeData.priority}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>Demand Volume</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{tradeData.demand}</span>
                </div>
                <div style={{ padding: '12px 0' }}>
                  <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Strategic Notes</div>
                  <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.65 }}>{tradeData.notes}</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
