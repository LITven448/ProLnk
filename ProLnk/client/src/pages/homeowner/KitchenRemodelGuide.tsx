import { useState } from 'react';

const tiers = [
  {
    name: 'Refresh',
    emoji: '🖌️',
    budget: '$8,000–$20,000',
    timeline: '2–4 weeks',
    color: '#34D399',
    description: 'Update the look without moving anything. Paint cabinets, replace hardware, new countertops, and updated lighting.',
    includes: ['Cabinet repainting or refacing', 'New hardware and pulls', 'Laminate or butcher block countertops', 'Backsplash tile', 'Light fixture swap', 'New faucet'],
    notIncludes: ['New cabinet boxes', 'Layout changes', 'Appliance replacement', 'Electrical panel work'],
    bestFor: 'Rentals, homes you plan to sell in 2–3 years, budget-conscious updates',
  },
  {
    name: 'Mid-Grade Remodel',
    emoji: '🔨',
    budget: '$25,000–$60,000',
    timeline: '6–10 weeks',
    color: '#60A5FA',
    description: 'New semi-custom cabinets, stone countertops, and updated appliances in the same footprint.',
    includes: ['Semi-custom cabinets', 'Quartz or granite countertops', 'Mid-grade appliance package', 'Subway or mosaic backsplash', 'Recessed lighting plan', 'Sink and faucet upgrade', 'Flooring replacement'],
    notIncludes: ['Full layout reconfiguration', 'Island addition requiring gas/plumbing relocation', 'High-end custom cabinetry'],
    bestFor: 'Primary residence you plan to stay in 5+ years, preparing for significant value-add',
  },
  {
    name: 'Full Renovation',
    emoji: '🏗️',
    budget: '$70,000–$150,000+',
    timeline: '12–20 weeks',
    color: '#F59E0B',
    description: 'Complete gut and redesign — custom cabinetry, luxury appliances, layout changes, and premium finishes throughout.',
    includes: ['Custom cabinetry', 'Waterfall quartz or marble countertops', 'Luxury appliance suite', 'Layout reconfiguration', 'Island with prep sink', 'Hidden pantry', 'Under-cabinet lighting', 'Statement range hood', 'Heated floors'],
    notIncludes: ['Structural wall removal (priced separately)', 'Addition square footage'],
    bestFor: 'Dream home, luxury remodel, high-value properties in premium DFW submarkets',
  },
];

const allocations: Record<string, { label: string; pct: number }[]> = {
  Refresh: [
    { label: 'Cabinets / Refacing', pct: 30 },
    { label: 'Countertops', pct: 20 },
    { label: 'Labor', pct: 25 },
    { label: 'Backsplash', pct: 10 },
    { label: 'Fixtures & Hardware', pct: 10 },
    { label: 'Misc / Contingency', pct: 5 },
  ],
  'Mid-Grade Remodel': [
    { label: 'Cabinets', pct: 30 },
    { label: 'Countertops', pct: 15 },
    { label: 'Appliances', pct: 18 },
    { label: 'Labor', pct: 22 },
    { label: 'Flooring', pct: 8 },
    { label: 'Misc / Contingency', pct: 7 },
  ],
  'Full Renovation': [
    { label: 'Custom Cabinets', pct: 35 },
    { label: 'Countertops', pct: 12 },
    { label: 'Appliances', pct: 15 },
    { label: 'Labor', pct: 22 },
    { label: 'Layout / Structural', pct: 8 },
    { label: 'Misc / Contingency', pct: 8 },
  ],
};

const COLORS = ['#60A5FA', '#34D399', '#F59E0B', '#F87171', '#A78BFA', '#FB923C', '#22D3EE'];

export default function KitchenRemodelGuide() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [budget, setBudget] = useState(40000);

  const activeTier = tiers.find(t => t.name === selectedTier);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '60px 24px 40px', textAlign: 'center', borderBottom: '1px solid #1e3a5f' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🍳</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 12px', color: '#FFFFFF' }}>
          DFW Kitchen Remodel Guide
        </h1>
        <p style={{ fontSize: 18, color: '#8BA3C0', maxWidth: 640, margin: '0 auto 16px' }}>
          Three remodel tiers, DFW cost benchmarks, and a budget allocator — everything you need before talking to a contractor.
        </p>
        <div style={{ display: 'inline-block', background: '#1e3a5f', borderRadius: 8, padding: '8px 20px', fontSize: 14, color: '#60A5FA' }}>
          📍 Costs benchmarked to Dallas-Fort Worth market (2025–2026)
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        {/* Tier Selector */}
        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px', textAlign: 'center' }}>
          Pick Your Remodel Tier
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {tiers.map(tier => (
            <div
              key={tier.name}
              onClick={() => setSelectedTier(tier.name === selectedTier ? null : tier.name)}
              style={{
                background: selectedTier === tier.name ? '#1e3a5f' : '#0f2035',
                border: `2px solid ${selectedTier === tier.name ? tier.color : '#1e3a5f'}`,
                borderRadius: 12, padding: 24, cursor: 'pointer', transition: 'all 0.15s'
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{tier.emoji}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px' }}>{tier.name}</h3>
              <p style={{ color: tier.color, fontWeight: 700, margin: '0 0 8px', fontSize: 16 }}>{tier.budget}</p>
              <p style={{ color: '#8BA3C0', fontSize: 13, margin: '0 0 12px' }}>Timeline: {tier.timeline}</p>
              <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{tier.description}</p>
            </div>
          ))}
        </div>

        {/* Expanded Tier Detail */}
        {activeTier && (
          <div style={{ background: '#0f2035', borderRadius: 12, padding: 32, marginBottom: 40, border: `1px solid ${activeTier.color}` }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: '0 0 20px' }}>
              {activeTier.emoji} {activeTier.name} — What is Included
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
              <div>
                <p style={{ color: '#34D399', fontWeight: 700, margin: '0 0 10px', fontSize: 15 }}>Typically Included</p>
                {activeTier.includes.map(item => (
                  <p key={item} style={{ color: '#CBD5E1', fontSize: 14, margin: '0 0 6px' }}>✅ {item}</p>
                ))}
              </div>
              <div>
                <p style={{ color: '#F87171', fontWeight: 700, margin: '0 0 10px', fontSize: 15 }}>Usually Extra</p>
                {activeTier.notIncludes.map(item => (
                  <p key={item} style={{ color: '#CBD5E1', fontSize: 14, margin: '0 0 6px' }}>❌ {item}</p>
                ))}
              </div>
            </div>
            <div style={{ background: '#1a2d4a', borderRadius: 8, padding: '12px 16px', borderLeft: `3px solid ${activeTier.color}` }}>
              <strong style={{ color: activeTier.color }}>Best for:</strong>
              <span style={{ color: '#CBD5E1', marginLeft: 8, fontSize: 14 }}>{activeTier.bestFor}</span>
            </div>
          </div>
        )}

        {/* Budget Allocator */}
        <div style={{ background: '#0f2035', borderRadius: 12, padding: 32, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
            💵 Budget Allocator
          </h2>
          <p style={{ color: '#8BA3C0', margin: '0 0 24px' }}>
            Set your total budget and see how it breaks down by category:
          </p>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ color: '#CBD5E1', fontWeight: 600 }}>Total Budget</label>
              <span style={{ color: '#60A5FA', fontWeight: 800, fontSize: 22 }}>${budget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={8000}
              max={150000}
              step={1000}
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#60A5FA' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B6A8A', fontSize: 12, marginTop: 4 }}>
              <span>$8K Refresh</span>
              <span>$150K+ Full Reno</span>
            </div>
          </div>

          {(() => {
            const tierKey = budget < 22000 ? 'Refresh' : budget < 65000 ? 'Mid-Grade Remodel' : 'Full Renovation';
            const rows = allocations[tierKey];
            return (
              <div>
                <p style={{ color: '#8BA3C0', fontSize: 13, margin: '0 0 16px' }}>
                  Using <strong style={{ color: '#FFFFFF' }}>{tierKey}</strong> allocation ratios:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {rows.map((row, i) => {
                    const amount = Math.round(budget * (row.pct / 100));
                    return (
                      <div key={row.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ color: '#CBD5E1', fontSize: 14 }}>{row.label}</span>
                          <span style={{ color: COLORS[i], fontWeight: 700 }}>${amount.toLocaleString()} ({row.pct}%)</span>
                        </div>
                        <div style={{ height: 8, background: '#1e3a5f', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${row.pct}%`, background: COLORS[i], borderRadius: 4 }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

        {/* DFW Notes */}
        <div style={{ background: '#0f2035', borderRadius: 12, padding: 28, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: '0 0 16px' }}>📍 DFW Market Notes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Always add 10–15% contingency — DFW homes frequently have surprises behind walls (outdated plumbing, aluminum wiring in older suburbs).',
              'Labor costs in DFW run 15–20% below national average but material costs are near-national due to supply chain normalization.',
              'Permit required in Dallas, Fort Worth, Plano, Frisco, and most municipalities for any electrical or plumbing changes — budget $300–600.',
              'Best time to start: January through March — contractor availability is highest and lead times on cabinets are shortest.',
              'Quartz dominates DFW kitchen countertops; marble is increasingly popular in luxury submarkets (Southlake, Westlake, University Park).',
            ].map((note, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', background: '#0A1628', borderRadius: 8 }}>
                <span style={{ color: '#60A5FA', fontWeight: 700, minWidth: 24 }}>📌</span>
                <span style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: 14 }}>{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563EB)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>
            Get Quotes from DFW Kitchen Remodelers
          </h2>
          <p style={{ color: '#93C5FD', fontSize: 16, margin: '0 auto 28px', maxWidth: 500 }}>
            ProLnk matches you with verified kitchen contractors in your area — compare quotes without the runaround.
          </p>
          <button style={{ background: '#FFFFFF', color: '#1e3a5f', border: 'none', borderRadius: 10, padding: '16px 40px', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
