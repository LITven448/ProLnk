import { useState } from 'react';

const checklistItems = [
  { category: 'Access', items: ['Unlock all doors, gates, sheds, and garage', 'Leave ALL interior doors open', 'Clear access to attic hatch', 'Move vehicles out of garage', 'Ensure electricity is on and all circuits active'] },
  { category: 'Systems', items: ['Turn on all pilot lights (water heater, fireplace)', 'Leave HVAC at normal operating temp', 'Do not run dishwasher or laundry during inspection', 'Ensure water is on and pressure is normal', 'Leave all appliances plugged in and accessible'] },
  { category: 'Exterior', items: ['Clear debris from foundation perimeter', 'Trim back bushes from exterior walls', 'Move items away from AC condenser', 'Ensure roof access isn\’t blocked', 'Clear gutters of visible debris if possible'] },
  { category: 'Documentation', items: ['Leave all appliance manuals', 'Leave previous inspection reports if available', 'Note any known issues to disclose', 'Provide access to utility bills if requested', 'Leave permits for recent work'] },
];

const dfwRedFlags = [
  { flag: 'Active Foundation Movement', severity: 'DEAL BREAKER', color: '#EF4444', icon: '🚨', desc: 'Cracks wider than 1/4 inch, stair-step cracks in brick, doors/windows out of square. DFW clay soil expands and contracts — foundation repair costs $8K–$30K+.' },
  { flag: 'Unpermitted Additions', severity: 'DEAL BREAKER', color: '#EF4444', icon: '🚨', desc: 'Garage conversions, room additions, or structural changes without city permits. Insurance won\’t cover, lenders may refuse, and you inherit the liability.' },
  { flag: 'Active Roof Leaks', severity: 'DEAL BREAKER', color: '#EF4444', icon: '🚨', desc: 'Water stains on ceilings, attic moisture damage, rotted decking. DFW hail storms accelerate roof deterioration — replacement costs $12K–$28K.' },
  { flag: 'Knob & Tube or Aluminum Wiring', severity: 'SERIOUS', color: '#F97316', icon: '⚠️', desc: 'Fire risk. Older Dallas-area homes may still have original wiring. Rewiring a full home runs $8K–$20K.' },
  { flag: 'HVAC End of Life', severity: 'SERIOUS', color: '#F97316', icon: '⚠️', desc: 'DFW summers are brutal — 100°+ days from June–September. A failing HVAC unit means $6K–$14K replacement. Verify age and service history.' },
  { flag: 'Polybutylene Plumbing', severity: 'SERIOUS', color: '#F97316', icon: '⚠️', desc: 'Gray plastic pipe used in 1970s–90s DFW construction. Prone to sudden failure. Full repipe costs $4K–$12K.' },
  { flag: 'Sewer Line Issues', severity: 'SERIOUS', color: '#F97316', icon: '⚠️', desc: 'Older Dallas neighborhoods may have cast iron or clay sewer lines with root intrusion or collapse. Sewer scope is essential — repair costs $3K–$15K.' },
  { flag: 'Cosmetic Issues Only', severity: 'MINOR', color: '#34D399', icon: '✅', desc: 'Peeling paint, dated fixtures, worn carpet — these are negotiating chips, not deal killers. Budget $5–$15/sqft for cosmetic refresh.' },
];

const costBySize = [
  { size: 'Under 1,500 sqft', range: '$350–$450', time: '2–3 hours' },
  { size: '1,500–2,500 sqft', range: '$400–$550', time: '3–4 hours' },
  { size: '2,500–3,500 sqft', range: '$500–$650', time: '4–5 hours' },
  { size: '3,500–5,000 sqft', range: '$600–$800', time: '5–7 hours' },
  { size: '5,000+ sqft', range: '$800–$1,200+', time: '7–10 hours' },
];

const reportSections = [
  { section: 'Major Systems', what: 'HVAC, electrical panel, plumbing, water heater — age, condition, remaining life' },
  { section: 'Roof & Attic', what: 'Shingle condition, decking, insulation R-value, ventilation, any active leaks' },
  { section: 'Foundation', what: 'Crack evaluation, pier locations if applicable, drainage grading' },
  { section: 'Exterior', what: 'Siding, windows, doors, garage, fencing, driveway cracks' },
  { section: 'Interior', what: 'Walls, ceilings, floors, doors, stairs — moisture, structural concerns' },
  { section: 'Appliances', what: 'Built-in appliances tested and operational status noted' },
];

export default function DFWHomeInspectionGuide() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'flags' | 'report'>('overview');
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null);

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  const totalItems = checklistItems.reduce((acc, c) => acc + c.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress = Math.round((checkedCount / totalItems) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Home Inspection Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>
            What to expect, what it costs, how to read the report, and the DFW-specific red flags that should stop a deal cold.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['overview', 'checklist', 'flags', 'report'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: activeTab === tab ? '#F5E642′ : '#1E3A5F', color: activeTab === tab ? '#0A1628' : '#fff',
              }}
            >
              {tab === 'overview' ? '📋 Overview' : tab === 'checklist' ? '✅ Pre-Inspection Checklist' : tab === 'flags' ? '🚩 Red Flags' : '📄 Reading the Report'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              {[
                { label: 'What\’s Covered', icon: '✅', items: ['Roof condition and visible decking', 'Foundation cracks and drainage', 'Electrical panel and visible wiring', 'HVAC age, operation, and airflow', 'Plumbing supply, drain, and water pressure', 'Water heater age and condition', 'All built-in appliances', 'Attic insulation and ventilation', 'Windows, doors, and weatherstripping', 'Exterior grading and drainage'] },
                { label: 'What\’s NOT Covered', icon: '❌', items: ['Inside walls (inspector doesn\’t open walls)', 'Underground plumbing (add sewer scope)', 'Pool and spa (add pool inspection)', 'Septic systems (add septic inspection)', 'Chinese drywall (requires specialized test)', 'Mold (requires air quality sampling)', 'Pest/termite inspection (add separately)', 'Chimney interior (add chimney scope)', 'Foundation engineering report (add if needed)', 'Survey and boundary disputes'] },
              ].map(card => (
                <div key={card.label} style={{ background: '#1E3A5F', borderRadius: 12, padding: 24 }}>
                  <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 16 }}>{card.icon} {card.label}</h3>
                  {card.items.map(item => (
                    <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 8, color: '#CBD5E1', fontSize: 13 }}>
                      <span style={{ color: card.icon === '✅' ? '#34D399′ : '#F87171', flexShrink: 0 }}>{card.icon === '✅' ? '✓' : '✗'}</span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>💰 DFW Inspection Cost by Home Size</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <thead>
                    <tr>
                      {['Home Size', 'Typical Cost', 'Time On-Site'].map(h => (
                        <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#94A3B8', borderBottom: '1px solid #2D4A6B' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {costBySize.map(row => (
                      <tr key={row.size} style={{ borderBottom: '1px solid #1A2E4A' }}>
                        <td style={{ padding: '12px 16px', color: '#fff', fontWeight: 600 }}>{row.size}</td>
                        <td style={{ padding: '12px 16px', color: '#F5E642', fontWeight: 700 }}>{row.range}</td>
                        <td style={{ padding: '12px 16px', color: '#94A3B8′ }}>{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginTop: 16, fontSize: 13, color: '#94A3B8′ }}>
                💡 Add-ons: Sewer scope +$150–$250 | Pool inspection +$100–$200 | Mold testing +$300–$600 | Chimney scope +$100–$200
              </div>
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 DFW-Specific Issues Inspectors Commonly Find</h3>
              {[
                { issue: 'Foundation Movement', freq: 'Very Common', desc: 'Expansive black clay soil in DFW causes seasonal foundation movement. Look for stair-step cracks in brick, diagonal cracks from window corners, and sticky doors.' },
                { issue: 'Hail Damage to Roof', freq: 'Common', desc: 'North Texas averages 4–6 hail events per year. Inspectors check for bruised shingles, dented metal flashing, and gutters. Previous insurance claims may have been filed.' },
                { issue: 'Inadequate Attic Insulation', freq: 'Common', desc: 'Older DFW homes frequently have R-19 or less. Code requires R-38. Upgrading saves 20–30% on cooling bills in summer.' },
                { issue: 'HVAC Oversizing', freq: 'Common', desc: 'Short-cycling systems from oversized equipment. Common in DFW additions. Causes humidity problems and shortened equipment life.' },
                { issue: 'Drain Grade Issues', freq: 'Common', desc: 'DFW\’s flat terrain means poor grading directs water toward foundations. Inspectors check 6-inch drop in first 10 feet from foundation.' },
              ].map(item => (
                <div key={item.issue} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, color: '#fff' }}>{item.issue}</div>
                    <div style={{ fontSize: 12, color: '#F5E642', background: '#1E3A5F', padding: '2px 10px', borderRadius: 20 }}>{item.freq}</div>
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ color: '#F5E642', fontSize: 22 }}>Pre-Inspection Seller Checklist</h2>
                  <p style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>Complete these before your inspector arrives to avoid failed re-inspection or repair credits.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: progress === 100 ? '#34D399′ : '#F5E642' }}>{progress}%</div>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>{checkedCount}/{totalItems} items</div>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, height: 8, marginBottom: 28 }}>
                <div style={{ background: progress === 100 ? '#34D399′ : '#F5E642', height: 8, borderRadius: 8, width: `${progress}%`, transition: ’width 0.3s' }} />
              </div>
              {checklistItems.map(cat => (
                <div key={cat.category} style={{ marginBottom: 28 }}>
                  <h3 style={{ color: '#60A5FA', fontSize: 15, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{cat.category}</h3>
                  {cat.items.map(item => (
                    <div
                      key={item}
                      onClick={() => toggleCheck(item)}
                      style={{
                        display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0',
                        borderBottom: '1px solid #1A2E4A', cursor: 'pointer',
                      }}
                    >
                      <div style={{
                        width: 22, height: 22, borderRadius: 6, border: `2px solid ${checkedItems.has(item) ? '#F5E642' : '#2D4A6B'}`,
                        background: checkedItems.has(item) ? '#F5E642′ : ’transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                      }}>
                        {checkedItems.has(item) && <span style={{ color: '#0A1628', fontSize: 14, fontWeight: 800 }}>✓</span>}
                      </div>
                      <span style={{ color: checkedItems.has(item) ? '#64748B' : '#CBD5E1', fontSize: 14, textDecoration: checkedItems.has(item) ? 'line-through' : 'none' }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
              {progress === 100 && (
                <div style={{ background: '#1A4A3A', border: '2px solid #34D399', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 32 }}>🎉</div>
                  <div style={{ color: '#34D399', fontWeight: 700, fontSize: 18 }}>You're inspection-ready!</div>
                  <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>A prepared seller signals credibility — buyers and agents notice.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'flags' && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 20 }}>🚩 Red Flags That Should Stop a Deal</h2>
            <div style={{ display: 'grid', gap: 16 }}>
              {dfwRedFlags.map(item => (
                <div
                  key={item.flag}
                  style={{ background: '#1E3A5F', borderRadius: 12, padding: 24, borderLeft: `4px solid ${item.color}`, cursor: 'pointer' }}
                  onClick={() => setExpandedFlag(expandedFlag === item.flag ? null : item.flag)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>{item.flag}</span>
                    </div>
                    <div style={{ background: item.color + '22', color: item.color, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{item.severity}</div>
                  </div>
                  {expandedFlag === item.flag && (
                    <p style={{ color: '#94A3B8', fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>{item.desc}</p>
                  )}
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 8 }}>
                    {expandedFlag === item.flag ? '▲ Collapse' : '▼ See details'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>📄 How to Read Your Inspection Report</h2>
              <p style={{ color: '#94A3B8', marginBottom: 24 }}>DFW inspection reports average 40–100 pages. Here's how to separate the signal from the noise.</p>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginBottom: 20 }}>
                <h3 style={{ color: '#60A5FA', marginBottom: 12 }}>Report Severity Levels</h3>
                {[
                  { level: 'Safety', color: '#EF4444', desc: 'Immediate hazard — requires action before closing or occupancy' },
                  { level: 'Major Defect', color: '#F97316', desc: 'Significant cost to repair — use as negotiating leverage or exit trigger' },
                  { level: 'Minor Defect', color: '#F5E642', desc: 'Cosmetic or normal wear — expect and absorb in most cases' },
                  { level: 'Efficiency Note', color: '#60A5FA', desc: 'Recommended upgrades — improve comfort or reduce utility costs' },
                ].map(item => (
                  <div key={item.level} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{ background: item.color, borderRadius: 4, padding: '2px 10px', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0, marginTop: 2 }}>{item.level}</div>
                    <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
              <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>What Each Section Covers</h3>
              {reportSections.map(row => (
                <div key={row.section} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 10 }}>
                  <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{row.section}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{row.what}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🧮 How to Use the Report in Negotiations</h3>
              {['Focus on safety issues and major defects — ignore cosmetic items in your request', 'Ask for repair credits rather than repairs — you\’ll control quality and timeline', 'Get contractor bids for major items before submitting repair request', 'Prioritize items that affect lender appraisal or insurability', 'In competitive markets, request credit for top 3 items only — avoid overwhelming sellers', 'Use report to renegotiate price if significant undisclosed issues are found', 'Always attend the inspection in person — photos miss context'].map(tip => (
                <div key={tip} style={{ display: 'flex', gap: 12, marginBottom: 12, color: '#CBD5E1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span> {tip}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1E3A5F', borderRadius: 12, padding: 28, marginTop: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>Need a Trusted DFW Home Inspector?</h3>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>ProLnk connects you with vetted home inspectors, foundation specialists, and repair contractors across DFW.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
            Find a DFW Inspector →
          </button>
        </div>
      </div>
    </div>
  );
}
