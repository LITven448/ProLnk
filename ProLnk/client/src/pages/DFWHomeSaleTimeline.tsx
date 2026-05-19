import { useState } from 'react';

const stages = [
  {
    id: 0,
    label: 'Month 1',
    title: 'Pre-Listing Prep',
    subtitle: 'Contractor repairs, staging, photography',
    color: '#F59E0B',
    tasks: [
      'Hire a licensed inspector for a pre-listing inspection ($350–$500)',
      'Complete foundation check — DFW clay soil causes movement in 60% of homes',
      'HVAC service and filter replacement ($150–$300)',
      'Roof inspection and repair of any visible damage ($200–$2,000+)',
      'Deep clean, declutter, and depersonalize every room',
      'Stage key rooms: living, kitchen, primary bedroom',
      'Professional photography + 3D Matterport tour ($400–$800)',
    ],
    costs: [
      { item: 'Pre-listing inspection', range: '$350–$500′ },
      { item: 'Minor repairs (avg)', range: '$1,200–$4,500′ },
      { item: 'Deep clean', range: '$300–$600′ },
      { item: 'Staging consultation', range: '$500–$1,500′ },
      { item: 'Photography + tour', range: '$400–$800′ },
    ],
    tip: 'Homes that are pre-inspected sell 11% faster and with fewer post-offer renegotiations.',
  },
  {
    id: 1,
    label: 'Month 2',
    title: 'List and Show',
    subtitle: 'Pricing, MLS, showings, open house',
    color: '#1E3A5F',
    tasks: [
      'Set price using CMA — DFW avg 98% of list price closes in 2026',
      'List on MLS with professional photos (Day 1 matters most)',
      'Schedule showings via lockbox; respond within 1 hour to all requests',
      'Host one strategic open house in Week 1 (Saturday 1–4pm)',
      'Review feedback from every showing with your agent',
      'Frisco and Plano: expect offers in 12–18 days. Dallas proper: 28–35 days',
      'Negotiate offers: price, closing date, buyer concessions, leaseback options',
    ],
    costs: [
      { item: 'Listing agent commission', range: '2.5–3% of sale price' },
      { item: 'Buyer agent commission', range: '2.5–3% of sale price' },
      { item: 'Open house prep/refreshments', range: '$100–$300′ },
    ],
    tip: 'Homes priced within 2% of market value receive 3x more showings in the first 7 days.',
  },
  {
    id: 2,
    label: 'Month 3',
    title: 'Contract to Close',
    subtitle: 'Inspection, negotiation, repairs, closing',
    color: '#059669',
    tasks: [
      'Accept best offer and execute Texas TREC contract',
      'Buyer inspection: 10-day option period is standard in DFW',
      'Negotiate inspection repairs — offer credits rather than completing repairs when possible',
      'Appraisal ordered by buyer’s lender (allow 2–3 weeks)',
      'Clear any title issues — HOA liens, survey disputes common in DFW suburbs',
      'Final walkthrough 24 hours before closing',
      'Close at title company — wire funds, sign docs, hand over keys',
    ],
    costs: [
      { item: 'Seller closing costs', range: '1–3% of sale price' },
      { item: 'Repair credits (negotiated)', range: '$500–$5,000′ },
      { item: 'Title/HOA transfer fees', range: '$300–$800′ },
      { item: 'Home warranty (optional)', range: '$400–$700′ },
    ],
    tip: 'Average DFW close takes 32 days from executed contract. Plan your move-out accordingly.',
  },
];

const dealKillers = [
  {
    issue: 'Foundation Movement',
    detail: 'DFW’s expansive clay soil causes foundation issues in ~40% of older homes. Buyers will request engineering reports. Cost to repair: $3,000–$25,000.',
    risk: 'High',
  },
  {
    issue: 'HVAC Age',
    detail: 'Systems over 12 years old will be flagged. DFW summers demand reliable AC. Buyers often request replacement or a $3,000–$5,000 credit.',
    risk: 'High',
  },
  {
    issue: 'Roof Condition',
    detail: 'Hail damage is common in DFW. If your roof is over 15 years old or has visible damage, buyers' insurance may deny coverage, killing the deal.',
    risk: 'High',
  },
  {
    issue: 'Electrical Panels',
    detail: 'Federal Pacific and Zinsco panels are fire hazards. Many insurers won’t cover homes with them. Replacement runs $1,500–$3,500.',
    risk: 'Medium',
  },
  {
    issue: 'Inspection Findings Pile-Up',
    detail: 'No single item kills a deal — it’s the cumulative weight. Foundation + old HVAC + old roof in one report often sends buyers running.',
    risk: 'Medium',
  },
];

const preListingChecklist = [
  'Foundation inspection by licensed structural engineer',
  'HVAC service, filter replacement, and coil cleaning',
  'Roof inspection and gutter cleaning',
  'Electrical panel inspection (confirm no Federal Pacific/Zinsco)',
  'Plumbing check: water pressure, supply lines, water heater age',
  'Attic insulation inspection (R-38+ recommended for DFW)',
  'Interior paint touch-up on all scuffs and nail holes',
];

export default function DFWHomeSaleTimeline() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = stages[activeStage];

  return (
    <div className="min-h-screen" style={{ background: '#FAFAF9', fontFamily: 'system-ui, sans-serif' }}>
      <div className="max-w-4xl mx-auto px-4 py-12″>

        {/* Header */}
        <div className="mb-10″>
          <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            DFW Real Estate Guide
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3″ style={{ color: '#1E3A5F' }}>
            DFW Home Sale Timeline
          </h1>
          <p className="text-lg text-gray-600″>
            From Decision to Close in 60–90 Days — What to Do, When, and How Much It Costs
          </p>
          <div className="flex flex-wrap gap-4 mt-4″>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100″>
              <span className="text-xs text-gray-500 block">Avg Days on Market</span>
              <span className="font-bold text-lg" style={{ color: '#1E3A5F' }}>28 Days</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100″>
              <span className="text-xs text-gray-500 block">Avg Sale / List Price</span>
              <span className="font-bold text-lg" style={{ color: '#1E3A5F' }}>98%</span>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100″>
              <span className="text-xs text-gray-500 block">Fastest Markets</span>
              <span className="font-bold text-lg" style={{ color: '#1E3A5F' }}>Frisco & Plano</span>
            </div>
          </div>
        </div>

        {/* Stage Selector */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2″>
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStage(s.id)}
              className="flex-shrink-0 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200″
              style={{
                background: activeStage === s.id ? s.color : '#fff',
                color: activeStage === s.id ? '#fff' : '#374151',
                border: `2px solid ${activeStage === s.id ? s.color : '#E5E7EB'}`,
                boxShadow: activeStage === s.id ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              <div className="text-xs font-normal opacity-80″>{s.label}</div>
              <div>{s.title}</div>
            </button>
          ))}
        </div>

        {/* Stage Detail */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8″>
          <div className="flex items-center gap-3 mb-5″>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: stage.color }}
            >
              {stage.id + 1}
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#1E3A5F' }}>{stage.title}</h2>
              <p className="text-sm text-gray-500″>{stage.subtitle}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6″>
            <div>
              <h3 className="font-semibold text-gray-700 mb-3″>Key Tasks</h3>
              <ul className="space-y-2″>
                {stage.tasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600″>
                    <span
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5″
                      style={{ background: stage.color }}
                    >
                      ✓
                    </span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-3″>Typical Costs</h3>
              <div className="space-y-2″>
                {stage.costs.map((c, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-600″>{c.item}</span>
                    <span className="font-medium" style={{ color: '#1E3A5F' }}>{c.range}</span>
                  </div>
                ))}
              </div>
              <div
                className="mt-4 p-3 rounded-lg text-sm"
                style={{ background: `${stage.color}15`, borderLeft: `3px solid ${stage.color}` }}
              >
                <span className="font-semibold">Pro tip: </span>
                {stage.tip}
              </div>
            </div>
          </div>
        </div>

        {/* Deal Killers */}
        <div className="mb-8″>
          <h2 className="text-xl font-bold mb-4″ style={{ color: '#1E3A5F' }}>
            What Kills DFW Deals — 5 Common Deal-Breakers
          </h2>
          <div className="space-y-3″>
            {dealKillers.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4″>
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5″
                  style={{ background: d.risk === 'High' ? '#DC2626′ : '#D97706' }}
                >
                  !
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1″>
                    <span className="font-semibold text-gray-800″>{d.issue}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: d.risk === 'High' ? '#FEE2E2′ : '#FEF3C7',
                        color: d.risk === 'High' ? '#DC2626′ : '#D97706',
                      }}
                    >
                      {d.risk} Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-600″>{d.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Listing Checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8″>
          <h2 className="text-xl font-bold mb-4″ style={{ color: '#1E3A5F' }}>
            Pre-Listing Contractor Checklist (7 Items)
          </h2>
          <p className="text-sm text-gray-500 mb-4″>
            Complete these before your photographer arrives. Every unchecked item is a negotiating lever for buyers.
          </p>
          <div className="space-y-3″>
            {preListingChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-700″>
                <div
                  className="w-6 h-6 rounded border-2 flex-shrink-0″
                  style={{ borderColor: '#1E3A5F' }}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-6 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5F8A 100%)' }}
        >
          <h3 className="text-xl font-bold mb-2″>Ready to Prep Your Home for Market?</h3>
          <p className="text-blue-200 mb-4 text-sm">
            Get quotes from vetted DFW contractors for every item on your pre-listing checklist.
            Most pros respond within 2 hours.
          </p>
          <a
            href="/trustypro/book"
            className="inline-block font-semibold px-6 py-3 rounded-xl transition-all"
            style={{ background: '#F59E0B', color: '#1E3A5F' }}
          >
            Get Pre-Listing Contractor Quotes →
          </a>
        </div>

      </div>
    </div>
  );
}
