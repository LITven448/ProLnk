import { useState } from 'react';

const YEAR_END_TASKS = [
  { id: 'tax', label: '💰 Pay Property Taxes Before Dec 31', content: 'DFW property taxes are due January 31, but paying before December 31 allows you to deduct them on the current year\’s federal return (if itemizing). The SALT deduction cap is $10,000 — factor this into your strategy with your CPA.' },
  { id: 'credits', label: '⚡ Complete Projects for 25C Credits', content: 'Federal 25C energy tax credits (30%, up to $3,200/year) require the project to be completed and paid in the same tax year. Heat pump HVAC, insulation, and ENERGY STAR windows must be installed by December 31 to claim current-year credits.' },
  { id: 'booking', label: '📅 Book January-February Projects Now', content: 'DFW contractors are least busy January through February. Book roofing, foundation inspections, interior painting, and kitchen remodels now for 10-25% better pricing and guaranteed scheduling. Demand spikes again in March.' },
  { id: 'insurance', label: '🛡️ Update Home Insurance', content: 'Year-end is the ideal time to review your homeowner\’s policy. DFW hail and wind events frequently trigger undercoverage issues. Request a coverage review and ensure your dwelling limit matches current reconstruction costs (DFW labor costs have risen 30% since 2020).' },
  { id: 'hvac', label: '❄️ HVAC Winter Prep', content: 'DFW\’s occasional hard freezes (like Winter Storm Uri in 2021) expose heating vulnerabilities. Schedule a furnace/heat pump inspection in November before demand spikes. Replace filters, check heat exchanger integrity, and verify thermostat calibration.' },
  { id: 'pipes', label: '🔧 Freeze Protection', content: 'Insulate exposed pipes in garages, crawl spaces, and attic runs before December. Know where your main water shutoff is located. Keep interior heat above 55°F during hard freeze events. A single burst pipe in DFW averages $8,000-$15,000 in damage.' },
];

type Situation = 'deductions' | 'projects' | 'insurance' | 'freeze' | '';

const ACTION_PLANS: Record<string, { title: string; actions: string[]; savings: string }> = {
  deductions: {
    title: '💰 Year-End Tax Deduction Plan',
    actions: [
      'Pay current-year property taxes online at your county appraisal website by December 31',
      'Ensure any qualifying energy improvements are paid and installed before year-end',
      'Gather all home-related receipts and organize by category for your CPA',
      'Review mortgage interest statements (Form 1098) for accuracy',
      'Document home office measurements if claiming deduction — changes in use affect eligibility',
    ],
    savings: 'DFW homeowners can capture $2,000-$8,000+ in deductions with proper year-end planning',
  },
  projects: {
    title: '📅 Off-Season Project Booking Strategy',
    actions: [
      'Call 3 roofing contractors in November — book inspection + any repairs at off-peak rates',
      'Schedule interior painting for January when painters have zero backlog',
      'Get foundation evaluation quotes from 2-3 firms — DFW clay soil shifts seasonally',
      'Order appliances in November-December (holiday sales) for January installation',
      'Lock in landscaping overhaul quotes now for February-March spring execution',
    ],
    savings: 'Off-season contractor bookings save DFW homeowners 15-25% vs. peak spring pricing',
  },
  insurance: {
    title: '🛡️ Insurance Year-End Review',
    actions: [
      'Request updated dwelling replacement cost estimate — DFW construction costs rose sharply post-pandemic',
      'Review deductible levels: a 1% wind/hail deductible on a $400K home = $4,000 out-of-pocket',
      'Confirm personal property coverage limits — electronics and jewelry often need riders',
      'Add umbrella policy if net worth exceeds $500K — DFW jury awards trend high',
      'Document all valuables with video walkthrough — store backup in cloud and safe deposit box',
    ],
    savings: 'Proper coverage prevents DFW homeowners from being 20-40% underinsured after major events',
  },
  freeze: {
    title: '❄️ DFW Freeze Protection Plan',
    actions: [
      'Locate and label main water shutoff valve — practice turning it off before a freeze emergency',
      'Insulate all exposed pipes in garage, attic, and exterior walls with foam pipe sleeves',
      'Drain and winterize irrigation system by November 15 in North Texas',
      'Service generator if you have one; test and fuel before first hard freeze forecast',
      'Stock emergency water (1 gallon/person/day for 3 days) before freeze events',
    ],
    savings: 'Average DFW burst pipe claim: $8,000-$15,000 — prevention costs under $200',
  },
};

export default function DFWEndOfYearHomeGuide() {
  const [active, setActive] = useState<string | null>(null);
  const [situation, setSituation] = useState<Situation>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎯</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Year-End Home Guide
          </h1>
          <p style={{ color: '#8A9BB5', fontSize: 15, margin: 0 }}>
            November–December: the financial and maintenance checklist every DFW homeowner needs
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {YEAR_END_TASKS.map(t => (
            <div key={t.id}>
              <button
                onClick={() => setActive(active === t.id ? null : t.id)}
                style={{ width: '100%', textAlign: 'left', background: active === t.id ? '#1E3A5F' : '#0F2340', border: '1px solid', borderColor: active === t.id ? '#F5E642′ : '#1E3A5F', borderRadius: 10, padding: '14px 18px', color: '#E8EDF5', fontSize: 15, fontWeight: 600, cursor: ’pointer' }}
              >
                {t.label}
              </button>
              {active === t.id && (
                <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px', fontSize: 14, color: '#B8C8DC', lineHeight: 1.6 }}>
                  {t.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>
            📋 Build Your Year-End Action Plan
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {([
              { key: 'deductions', label: '💰 Max Deductions' },
              { key: 'projects', label: '📅 Off-Season Projects' },
              { key: 'insurance', label: '🛡️ Insurance Review' },
              { key: 'freeze', label: '❄️ Freeze Protection' },
            ] as const).map(opt => (
              <button
                key={opt.key}
                onClick={() => setSituation(opt.key)}
                style={{ padding: '12px 8px', background: situation === opt.key ? '#F5E642′ : '#1E3A5F', color: situation === opt.key ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {situation && (
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 18 }}>
              <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, margin: '0 0 14px' }}>
                {ACTION_PLANS[situation].title}
              </h3>
              <ol style={{ margin: '0 0 14px', padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ACTION_PLANS[situation].actions.map((action, i) => (
                  <li key={i} style={{ color: '#B8C8DC', fontSize: 14, lineHeight: 1.6 }}>{action}</li>
                ))}
              </ol>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#F5E642', fontWeight: 600 }}>
                💡 {ACTION_PLANS[situation].savings}
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#3A5070', fontSize: 12, marginTop: 32 }}>
          ProLnk — DFW Home Intelligence
        </p>
      </div>
    </div>
  );
}
