import { useState } from 'react';

const purchaseStages = [
  { stage: 'Pre-Contract', items: ['Research builder reputation online (Google, BBB, Yelp)', 'Visit completed communities — talk to current residents', 'Hire your own buyer’s agent (builder pays commission, costs you nothing)', 'Get pre-approved with an outside lender before visiting sales office'] },
  { stage: 'Contract Signing', items: ['Read the entire purchase agreement before signing', 'Negotiate upgrades, not list price (builders rarely move on price)', 'Avoid builder’s lender incentives — they often don’t pencil out', 'Document everything verbally promised in writing'] },
  { stage: 'Construction Phase', items: ['Schedule pre-pour inspection (foundation before concrete pours)', 'Schedule framing inspection (after framing, before drywall)', 'Document any changes to plans with builder in writing', 'Visit the site regularly — bring your agent'] },
  { stage: 'Pre-Closing', items: ['Hire an independent home inspector — non-negotiable', 'Do final walkthrough 1–2 days before close (not same day)', 'Document all punch-list items with photos', 'Confirm all permits pulled and inspections passed'] },
  { stage: 'Post-Close (Year 1)', items: ['Document all warranty claims in writing immediately', 'Schedule a TrustyPro scan before year-1 warranty expires', 'Test all systems: HVAC, plumbing, electrical', 'Submit all builder warranty repairs before 12-month mark'] },
];

export default function DFWNewConstructionGuide() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeStage, setActiveStage] = useState(0);

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const stageItems = purchaseStages[activeStage].items;
  const stageChecked = stageItems.filter(item => checked[`${activeStage}-${item}`]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0D2144 0%, #1A3A6B 100%)', padding: '60px 24px 48px', borderBottom: '1px solid #1E3A5F' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏗️ 🏠</div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2 }}>
            DFW New Construction Guide
          </h1>
          <p style={{ fontSize: 18, color: '#8FB0D4', margin: 0 }}>Buying a Builder Home Without Getting Burned</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>

        {/* DFW Reality */}
        <section style={{ marginTop: 48, background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#FCD34D', marginBottom: 12 }}>📊 DFW New Construction Reality</h2>
          <p style={{ color: '#A8C4E0', fontSize: 15, margin: '0 0 12px', lineHeight: 1.7 }}>
            Over <strong style={{ color: '#FFFFFF' }}>70% of new homes in DFW</strong> are in master-planned communities (Frisco, McKinney, Celina, Prosper, Forney, Mansfield, etc.). Builders set the price — there is essentially <strong style={{ color: '#F87171′ }}>no negotiation on list price</strong>, but significant room to negotiate on upgrades, lot premiums, closing costs, and incentives.
          </p>
          <p style={{ color: '#A8C4E0', fontSize: 15, margin: 0, lineHeight: 1.7 }}>
            Top builders active in DFW: D.R. Horton, Lennar, Taylor Morrison, Highland Homes, Toll Brothers, Perry Homes, Meritage Homes, Drees Custom Homes.
          </p>
        </section>

        {/* Builder vs. Resale */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#60A5FA', marginBottom: 20 }}>⚖️ Builder vs. Resale Comparison</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#0D2144′ }}>
                  {['Factor', '🏗️ New Construction', '🏡 Traditional Resale', '📱 TrustyPro Scanned Resale'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#60A5FA', fontWeight: 700, borderBottom: '2px solid #1E3A5F' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Condition', 'Brand new', 'Unknown', 'Fully documented'],
                  ['Maintenance (yr 1-5)', 'Very low', 'Variable', 'Predictable'],
                  ['Neighborhood', 'Under development', 'Established', 'Established'],
                  ['Hidden issues', 'Possible (builder rushing)', 'High risk', 'Low risk'],
                  ['Price negotiation', 'No (upgrades only)', 'Yes', 'Yes'],
                  ['Move-in timeline', '6-14 months', '30-45 days', '30-45 days'],
                  ['Warranty', '1-2-10 builder warranty', 'None', 'TrustyPro scan coverage'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#0A1628′ : '#0D2144' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '11px 16px', color: j === 0 ? '#FFFFFF' : '#A8C4E0', borderBottom: '1px solid #1E3A5F', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Builder Red Flags */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F87171', marginBottom: 20 }}>🚩 Builder Red Flags</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { flag: '"Design Center" Markups', detail: 'Builder design centers mark up options 60–80% over retail. Granite that costs $2,000 installed gets charged at $4,500. Budget selectively — only upgrade what you cannot easily change later (flooring, cabinets, tile).' },
              { flag: 'Using the Builder’s Lender', detail: 'Builders offer incentives ($5K toward upgrades, rate buydowns) to use their preferred lender. Run the numbers carefully — these incentives often don’t offset the higher rate or fees. Always get a competing quote from an outside lender.' },
              { flag: 'Waiving the Inspection', detail: 'Never, ever waive the independent home inspection on new construction. Builder-employed quality control inspectors miss or ignore issues. Common finds: unsealed plumbing penetrations, uncommissioned HVAC, insulation gaps, improperly graded lots.' },
              { flag: 'Verbal Promises Without Documentation', detail: 'If it’s not in the purchase contract or an addendum, it does not exist legally. Every promised upgrade, change, or inclusion must be in writing with builder signature.' },
            ].map(item => (
              <div key={item.flag} style={{ background: '#1A0D0D', border: '1px solid #4A1515', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F87171', marginBottom: 8 }}>🚩 {item.flag}</div>
                <p style={{ color: '#D4A0A0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Builder Warranty */}
        <section style={{ marginTop: 48, background: '#0D2144', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#60A5FA', marginBottom: 16 }}>📋 The 1-2-10 Builder Warranty</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 16 }}>
            {[
              { period: '1 Year', coverage: 'Comprehensive', desc: 'Workmanship, materials — nearly everything' },
              { period: '2 Years', coverage: 'Mechanical Systems', desc: 'HVAC, plumbing, electrical systems' },
              { period: '10 Years', coverage: 'Structural', desc: 'Foundation, load-bearing components' },
            ].map(w => (
              <div key={w.period} style={{ background: '#162A4A', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#FCD34D', marginBottom: 4 }}>{w.period}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>{w.coverage}</div>
                <div style={{ fontSize: 13, color: '#8FB0D4′ }}>{w.desc}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#A8C4E0', fontSize: 14, margin: 0 }}>Submit all warranty claims <strong style={{ color: '#FFFFFF' }}>in writing</strong> within the warranty period. Verbal requests are not binding.</p>
        </section>

        {/* Interactive Checklist */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#60A5FA', marginBottom: 20 }}>✅ Purchase Stage Checklist</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            {purchaseStages.map((s, i) => (
              <button
                key={s.stage}
                onClick={() => setActiveStage(i)}
                style={{
                  padding: '8px 16px',
                  background: activeStage === i ? '#2563EB' : '#0D2144',
                  color: activeStage === i ? '#FFFFFF' : '#8FB0D4',
                  border: `1px solid ${activeStage === i ? '#2563EB' : '#1E3A5F'}`,
                  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {s.stage}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {stageItems.map(item => {
              const key = `${activeStage}-${item}`;
              return (
                <div
                  key={key}
                  onClick={() => toggle(key)}
                  style={{
                    background: checked[key] ? '#0D3321′ : '#0D2144',
                    border: `1px solid ${checked[key] ? '#22C55E' : '#1E3A5F'}`,
                    borderRadius: 10, padding: '14px 20px',
                    display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: checked[key] ? '#22C55E' : 'transparent',
                    border: `2px solid ${checked[key] ? '#22C55E' : '#4A6A8A'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, color: '#FFFFFF',
                  }}>
                    {checked[key] ? '✓' : ''}
                  </div>
                  <span style={{ fontSize: 14, color: checked[key] ? '#4ADE80′ : '#E8EDF5', fontWeight: checked[key] ? 600 : 400 }}>{item}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 16, padding: '12px 20px', background: '#0D2144', borderRadius: 10, border: '1px solid #1E3A5F', fontSize: 14 }}>
            <span style={{ color: '#8FB0D4′ }}>Stage progress: </span>
            <span style={{ color: '#60A5FA', fontWeight: 700 }}>{stageChecked} of {stageItems.length}</span>
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: 48, background: 'linear-gradient(135deg, #0D3321 0%, #0A2218 100%)', border: '1px solid #22C55E', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Scan Before Your Warranty Expires</h2>
          <p style={{ color: '#A8C4E0', fontSize: 15, margin: '0 0 24px', lineHeight: 1.7 }}>
            Your builder warranty is most powerful in year 1. Schedule a TrustyPro scan before the 12-month mark to document all issues while the builder is still obligated to fix them.
          </p>
          <a href="/scan" style={{ display: 'inline-block', padding: '14px 36px', background: '#22C55E', color: '#0A1628', borderRadius: 10, fontWeight: 800, fontSize: 16, textDecoration: 'none' }}>
            Schedule Your Year-1 Scan →
          </a>
        </section>

      </div>
    </div>
  );
}
