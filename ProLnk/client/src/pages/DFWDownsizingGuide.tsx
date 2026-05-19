import { useState } from 'react';

const communities = [
  { name: 'Robson Ranch', city: 'Denton', age: '55+', homes: '$400K–$650K', amenities: ['Golf course', 'Fitness center', 'Tennis', 'Pools', 'Art studio'], note: 'Largest 55+ community in DFW, over 4,500 homes' },
  { name: 'Sun City Texas', city: 'Georgetown (near DFW)', age: '55+', homes: '$350K–$600K', amenities: ['Golf', 'Fitness', 'Social clubs 200+', 'Pools', 'Restaurant'], note: 'Del Webb community, highly social, strong resale value' },
  { name: 'Frisco Lakes', city: 'Frisco', age: '55+', homes: '$420K–$700K', amenities: ['Lakeside clubhouse', 'Fitness', 'Tennis', 'Group activities'], note: 'North Dallas premium location, newer construction' },
  { name: 'Heritage Ranch', city: 'Fairview', age: '55+', homes: '$380K–$580K', amenities: ['Golf', 'Fitness', 'Pool', 'Social calendar'], note: 'Gated community, lower density than larger developments' },
  { name: 'McKinney Active Adult', city: 'McKinney', age: '55+', homes: '$350K–$520K', amenities: ['Clubhouse', 'Fitness', 'Walking trails', 'Pickleball'], note: 'Multiple developments near historic McKinney downtown' },
];

const timeline = [
  { phase: '12–18 Months Out', tasks: ['Declutter systematically — one room per month', 'Research 55+ communities and target neighborhoods', 'Track your current home\’s market value monthly', 'Meet with financial advisor on tax implications', 'Start downsizing large furniture that won\’t fit'] },
  { phase: '6–12 Months Out', tasks: ['Get a pre-listing home inspection', 'Complete light repairs and paint to maximize value', 'Stage your home for photography', 'Tour 5–10 target properties or communities', 'Get pre-approved for new mortgage if needed'] },
  { phase: '3–6 Months Out', tasks: ['List your current home', 'Make offer on target home (bridge loan if needed)', 'Reserve storage unit for staging period', 'Begin shipping or donating excess belongings', 'Coordinate movers for both properties'] },
  { phase: 'Closing Month', tasks: ['Final walkthrough on new home', 'Transfer utilities 2 weeks ahead', 'Update address with USPS, Medicare, Social Security', 'Set up home monitoring/security in new home', 'Review HOA rules and restrictions before move-in'] },
];

export default function DFWDownsizingGuide() {
  const [currentValue, setCurrentValue] = useState(550000);
  const [currentMortgage, setCurrentMortgage] = useState(120000);
  const [targetValue, setTargetValue] = useState(350000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('married');
  const [activeTab, setActiveTab] = useState<'why' | 'timeline' | 'communities' | 'calculator'>('why');

  const equity = currentValue - currentMortgage;
  const gain = currentValue - 0;
  const exclusion = filingStatus === 'married' ? 500000 : 250000;
  const taxableGain = Math.max(0, gain - exclusion);
  const estimatedTax = Math.round(taxableGain * 0.15);
  const netProceeds = equity - estimatedTax;
  const newHomeCost = targetValue;
  const equityFreed = netProceeds - newHomeCost;
  const monthlyPaymentReduction = Math.round(((currentValue - currentMortgage) * 0.065 / 12) - (targetValue * 0.065 / 12));

  return (
    <div style={{ background: '#F8F5F0', minHeight: '100vh', color: '#1A1A2E', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1A1A2E', marginBottom: 12 }}>
            Downsizing in DFW
          </h1>
          <p style={{ fontSize: 20, color: '#2D4A6B', fontWeight: 300, marginBottom: 8 }}>A Homeowner's Guide to Your Next Chapter</p>
          <p style={{ fontSize: 16, color: '#64748B', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you're an empty nester, approaching retirement, or simply ready to simplify — DFW has outstanding options for right-sizing your home and freeing up equity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['why', 'timeline', 'communities', 'calculator'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: `2px solid ${activeTab === tab ? '#2D4A6B' : '#CBD5E1'}`,
                background: activeTab === tab ? '#2D4A6B' : 'transparent',
                color: activeTab === tab ? '#fff' : '#64748B',
                cursor: 'pointer', fontWeight: 600, fontSize: 14, fontFamily: 'system-ui, sans-serif',
              }}
            >
              {tab === 'why' ? '💭 When to Downsize' : tab === 'timeline' ? '📅 Timeline' : tab === 'communities' ? '🏘️ 55+ Communities' : '🧮 Equity Calculator'}
            </button>
          ))}
        </div>

        {activeTab === 'why' && (
          <div>
            <div style={{ display: 'grid', gap: 20, marginBottom: 28 }}>
              {[
                { trigger: 'Empty Nest', icon: '🐣', detail: 'Children have left home. You\’re maintaining 4 bedrooms for 2 people. The math no longer works — and neither does the cleaning.' },
                { trigger: 'Approaching Retirement', icon: '🌅', detail: 'Fixed income makes large mortgages and high property taxes harder. Freeing equity now funds retirement lifestyle and reduces stress.' },
                { trigger: 'Maintenance Burden', icon: '🔧', detail: 'A 3,500 sqft home with a pool and large yard requires significant time, money, and physical upkeep. Downsizing reclaims both.' },
                { trigger: 'Mobility Considerations', icon: '♿', detail: 'Single-story homes, wider doorways, and step-free entries become practical needs. Planning ahead beats retrofitting.' },
                { trigger: 'Financial Optimization', icon: '💰', detail: 'With DFW home values at historic highs, selling now and moving to a right-sized home can free $150K–$400K in equity while locking in gains.' },
              ].map(item => (
                <div key={item.trigger} style={{ background: '#fff', borderRadius: 12, padding: 24, borderLeft: '4px solid #2D4A6B', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 28 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 17, color: '#1A1A2E', marginBottom: 6 }}>{item.trigger}</div>
                      <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ color: '#2D4A6B', fontSize: 18, marginBottom: 16 }}>📦 What To Do With Everything</h3>
              {[
                { category: 'Furniture', options: 'Estate sale (best return), Facebook Marketplace, consignment shops in Lakewood/Park Cities' },
                { category: 'Clothing & Linens', options: 'Goodwill, Purple Heart Foundation pickup, or local shelters' },
                { category: 'Books, Records, Art', options: 'Half Price Books, art consignment, or donate to Dallas Public Library' },
                { category: 'Kitchenware', options: 'Keep only what fits your new kitchen footprint. Donate rest to community kitchen or shelter.' },
                { category: 'Sentimental Items', options: 'Document and photograph everything before dispersing. Consider family distribution event before the move.' },
                { category: 'Tools & Workshop', options: 'Estate sale or Facebook Marketplace. Dallas Tool Library accepts donations for community use.' },
              ].map(row => (
                <div key={row.category} style={{ padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
                  <div style={{ fontWeight: 700, color: '#1A1A2E', fontSize: 14, marginBottom: 4 }}>{row.category}</div>
                  <div style={{ color: '#64748B', fontSize: 13 }}>{row.options}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            {timeline.map(phase => (
              <div key={phase.phase} style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <h3 style={{ color: '#2D4A6B', fontSize: 17, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ background: '#2D4A6B', color: '#fff', padding: '4px 14px', borderRadius: 20, fontSize: 13 }}>{phase.phase}</span>
                </h3>
                {phase.tasks.map(task => (
                  <div key={task} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                    <span style={{ color: '#2D4A6B', fontWeight: 700, flexShrink: 0, fontSize: 16 }}>→</span>
                    <span style={{ color: '#475569', fontSize: 14 }}>{task}</span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: '#FFF8E7', border: '2px solid #D4A017', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#92400E', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💡 Selling First vs Buying First</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontFamily: 'system-ui, sans-serif' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 8 }}>Sell First ✓</div>
                  {['No bridge loan needed', 'Know exact equity available', 'Less financial pressure', 'Temporary rental may be required'].map(p => <div key={p} style={{ color: '#78350F', fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#92400E', marginBottom: 8 }}>Buy First ✓</div>
                  {['No temporary housing', 'Take time choosing right home', 'Requires bridge loan or HELOC', 'Carrying two mortgages temporarily'].map(p => <div key={p} style={{ color: '#78350F', fontSize: 13, marginBottom: 4 }}>• {p}</div>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communities' && (
          <div>
            <p style={{ color: '#64748B', marginBottom: 24, fontSize: 14 }}>DFW has excellent 55+ active adult communities — from golf-focused resort living to smaller, quieter neighborhoods near urban amenities.</p>
            <div style={{ display: 'grid', gap: 20 }}>
              {communities.map(c => (
                <div key={c.name} style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E' }}>{c.name}</h3>
                      <div style={{ color: '#64748B', fontSize: 13 }}>{c.city} • Age-Restricted: {c.age}</div>
                    </div>
                    <div style={{ background: '#2D4A6B', color: '#fff', padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700 }}>{c.homes}</div>
                  </div>
                  <p style={{ color: '#475569', fontSize: 14, marginBottom: 14 }}>{c.note}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {c.amenities.map(a => (
                      <span key={a} style={{ background: '#F1F5F9', color: '#2D4A6B', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{a}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 24 }}>
              <h2 style={{ color: '#2D4A6B', fontSize: 22, marginBottom: 20, fontFamily: 'system-ui, sans-serif' }}>🧮 Equity & Tax Estimate Calculator</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontFamily: 'system-ui, sans-serif' }}>
                {[
                  { label: 'Current Home Value', value: currentValue, setter: setCurrentValue, min: 200000, max: 3000000, step: 25000, format: (v: number) => `$${v.toLocaleString()}` },
                  { label: 'Remaining Mortgage Balance', value: currentMortgage, setter: setCurrentMortgage, min: 0, max: 2000000, step: 10000, format: (v: number) => `$${v.toLocaleString()}` },
                  { label: 'Target Home Price', value: targetValue, setter: setTargetValue, min: 150000, max: 2000000, step: 25000, format: (v: number) => `$${v.toLocaleString()}` },
                ].map(field => (
                  <div key={field.label} style={{ gridColumn: field.label.includes('Target') ? '1 / -1' : undefined }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <label style={{ color: '#64748B', fontSize: 13 }}>{field.label}</label>
                      <span style={{ color: '#2D4A6B', fontWeight: 700 }}>{field.format(field.value)}</span>
                    </div>
                    <input type="range" min={field.min} max={field.max} step={field.step} value={field.value}
                      onChange={e => field.setter(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#2D4A6B' }} />
                  </div>
                ))}
                <div>
                  <label style={{ color: '#64748B', fontSize: 13, display: 'block', marginBottom: 8 }}>Filing Status</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(['married', 'single'] as const).map(s => (
                      <button key={s} onClick={() => setFilingStatus(s)}
                        style={{ flex: 1, padding: '10px', borderRadius: 8, border: `2px solid ${filingStatus === s ? '#2D4A6B' : '#CBD5E1'}`, background: filingStatus === s ? '#2D4A6B' : 'transparent', color: filingStatus === s ? '#fff' : '#64748B', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                        {s === 'married' ? '👫 Married/Joint' : '👤 Single'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Home Equity', value: `$${Math.max(0, equity).toLocaleString()}`, note: 'Current value minus mortgage', color: '#2D4A6B' },
                { label: 'Capital Gains Exclusion', value: `$${exclusion.toLocaleString()}`, note: filingStatus === 'married' ? '$500K married filing jointly' : '$250K single', color: '#059669' },
                { label: 'Est. Capital Gains Tax', value: estimatedTax > 0 ? `$${estimatedTax.toLocaleString()}` : '$0', note: estimatedTax > 0 ? 'At 15% long-term rate' : 'Within exclusion — no tax owed', color: estimatedTax > 0 ? '#DC2626' : '#059669' },
                { label: 'Equity Freed After Move', value: `${equityFreed >= 0 ? '+' : ''}$${Math.abs(Math.round(equityFreed)).toLocaleString()}`, note: 'Net proceeds minus new home purchase', color: equityFreed >= 0 ? '#059669' : '#DC2626' },
              ].map(metric => (
                <div key={metric.label} style={{ background: '#fff', borderRadius: 12, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: metric.color, fontFamily: 'system-ui, sans-serif' }}>{metric.value}</div>
                  <div style={{ color: '#1A1A2E', fontWeight: 600, fontSize: 13, marginTop: 4, fontFamily: 'system-ui, sans-serif' }}>{metric.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4, fontFamily: 'system-ui, sans-serif' }}>{metric.note}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#FFF8E7', border: '2px solid #D4A017', borderRadius: 12, padding: 20, fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ fontSize: 13, color: '#92400E' }}>⚠️ This calculator provides estimates only. Capital gains exclusions require 2+ years primary residence. Consult a CPA for your specific situation. Texas has no state capital gains tax.</div>
            </div>
          </div>
        )}

        <div style={{ background: '#2D4A6B', borderRadius: 12, padding: 28, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏡</div>
          <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 8, fontFamily: 'system-ui, sans-serif' }}>Ready to Plan Your DFW Downsize?</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20, fontFamily: 'system-ui, sans-serif' }}>Connect with downsizing specialists, estate sale coordinators, and senior move managers through ProLnk.</p>
          <button style={{ background: '#F5E642', color: '#1A1A2E', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', fontFamily: 'system-ui, sans-serif' }}>
            Connect with Downsizing Pros →
          </button>
        </div>
      </div>
    </div>
  );
}
