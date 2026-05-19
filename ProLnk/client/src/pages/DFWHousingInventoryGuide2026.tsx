import { useState } from 'react';

export default function DFWHousingInventoryGuide2026() {
  const [buyerType, setBuyerType] = useState<'firstTime'|'moveUp'|'investor'|'relocating'>('firstTime');

  const strategies: Record<string, { title: string; tactics: string[]; outlook: string; emoji: string }> = {
    firstTime: {
      emoji: '🏠',
      title: 'First-Time Buyer Navigation',
      tactics: [
        'Get pre-approved before you find a home — agents won’t show without it',
        'Set alerts on Zillow/Realtor.com for new listings — move within hours not days',
        'Consider new construction in Celina, Anna, Forney for more selection',
        'Ask about 2-1 rate buydowns from builders to lower Year 1-2 payments',
        'Don’t skip the inspection — low inventory creates pressure to waive; resist',
      ],
      outlook: 'Market slightly favors sellers but you have leverage in new construction communities hungry for closings.',
    },
    moveUp: {
      emoji: '📈',
      title: 'Move-Up Buyer Strategy',
      tactics: [
        'Leverage your current home equity — you likely have 40-60% equity post-2020',
        'Bridge loan or HELOC to fund down payment before selling current home',
        'Target homes priced $500K–$700K — less competition than entry-level',
        'Negotiate extended close dates — sellers often need time to find next home too',
        'List your home in spring (March-May) for max buyer pool',
      ],
      outlook: 'Rate lock effect works in your favor — other move-up sellers are also hesitant, creating pockets of opportunity.',
    },
    investor: {
      emoji: '💰',
      title: 'Investor Playbook',
      tactics: [
        'Target SFR rentals in Garland, Mesquite, Grand Prairie for best rent-to-price ratios',
        'Institutional competition is heaviest under $350K — consider $350–500K range',
        'Short-term rental (STR) permits are tightening in many DFW cities — verify before buying',
        'Multifamily under 4 units still qualifies for conventional financing',
        'Build relationships with wholesalers for off-market inventory',
      ],
      outlook: 'Cap rates compressed but rent growth (4.2% YoY) and appreciation offset yield limitations.',
    },
    relocating: {
      emoji: '✈️',
      title: 'Relocation Buyer Guide',
      tactics: [
        'Use a remote buyer specialist — many DFW agents specialize in out-of-state clients',
        'Plan a 3-5 day "house hunting trip" — try to see 8-12 homes per day',
        'Virtual tours are standard but always see your finalist in person',
        'Temporary housing (30-90 day leases) buys time to find the right home',
        'Research school districts first — they drive 30-40% of location decisions in DFW',
      ],
      outlook: 'DFW’s growth means inventory in your target area exists — a good local agent is your competitive advantage.',
    },
  };

  const strat = strategies[buyerType];

  const inventoryReasons = [
    { reason: 'Rate Lock Effect', detail: '68% of DFW homeowners have mortgages below 4% — few will sell into 6.8% market', emoji: '🔒' },
    { reason: 'Demand Surge', detail: '146K new residents annually, only 42K new homes built', emoji: '👥' },
    { reason: 'Investor Ownership', detail: '12% of DFW homes owned by investors/funds — off natural market rotation', emoji: '🏦' },
    { reason: 'Construction Lag', detail: 'Builder supply chain constraints delayed 8,000+ homes in 2025', emoji: '⏳' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MARKET DATA</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📦 DFW Housing Inventory 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Why DFW has tight inventory — and how to navigate it as a buyer</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Months of Supply', value: '1.8 mo', icon: '📦' },
            { label: 'Balanced Market', value: '5–6 mo', icon: '⚖️' },
            { label: 'Inventory Gap', value: '-68%', icon: '📉' },
          ].map(s => (
            <div key={s.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>{s.value}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3060' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Why Is Inventory So Low?</h2>
          {inventoryReasons.map(r => (
            <div key={r.reason} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid #1E3060' }}>
              <span style={{ fontSize: 24 }}>{r.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.reason}</div>
                <div style={{ color: '#8899BB', fontSize: 14 }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Your Market Navigation Strategy</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {([['firstTime','First-Time Buyer'],['moveUp','Move-Up Buyer'],['investor','Investor'],['relocating','Relocating']] as const).map(([k,label]) => (
              <button key={k} onClick={()=>setBuyerType(k)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: buyerType===k ? '#F5E642' : '#1E3060', color: buyerType===k ? '#0A1628' : '#fff', fontWeight: 700 }}>{label}</button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>{strat.emoji} {strat.title}</div>
            {strat.tactics.map((t,i) => <div key={i} style={{ color: '#8899BB', marginBottom: 8, paddingLeft: 16 }}>• {t}</div>)}
            <div style={{ marginTop: 16, padding: 12, background: '#132040', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Outlook: </span>
              <span style={{ color: '#8899BB' }}>{strat.outlook}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
