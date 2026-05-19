import { useState } from 'react';

const situations = [
  'Replace Aging AC (10+ yrs)',
  'Add High-Efficiency System',
  'Heat Pump vs Dual-Fuel',
  'Multi-Zone Investment',
  'Selling My Home',
  'Fix or Replace Old System',
];

const strategies: Record<string, { headline: string; roi: string; timeline: string; details: string[]; verdict: string }> = {
  'Replace Aging AC (10+ yrs)': {
    headline: 'High-confidence replacement investment for DFW',
    roi: '6-10 years payback on equipment cost delta',
    timeline: 'Savings begin Month 1 of first DFW summer',
    details: [
      'A 10-year-old 10 SEER DFW system running 3,000 hours/year at $0.14/kWh costs approximately $1,400-1,800/year in electricity for cooling a 2,000 sq ft home.',
      'Replacing with a 20 SEER2 system cuts that to $700-900/year — saving $700-900 annually. System cost premium over minimum efficiency: $1,500-3,000.',
      'Federal tax credit: 25C allows 30% of cost up to $600 for qualifying high-efficiency equipment. Texas has no state income tax, so federal credits are the primary incentive.',
      'DFW\’s long cooling season (May-October, 6+ months) generates more annual savings than the same upgrade in a northern climate. ROI in DFW is 30-40% better than the national average.',
    ],
    verdict: 'Strong investment. DFW\’s extreme cooling season maximizes efficiency savings. Act before May to avoid mid-summer emergency pricing.',
  },
  'Add High-Efficiency System': {
    headline: 'Premium efficiency pays back faster in DFW than anywhere in Texas',
    roi: '18-20 SEER2 vs 15 SEER2: $300-500/yr savings, 4-7 year premium payback',
    timeline: 'Full ROI before the system needs major service',
    details: [
      'Jumping from minimum-efficiency 15 SEER2 to 20 SEER2 costs $1,500-2,500 more at installation in DFW. Annual savings: $300-500 for a 2,000 sq ft DFW home.',
      'Variable-speed compressor (required for high SEER2) also dramatically improves humidity control — a major DFW comfort factor in spring and early summer.',
      'Utility rebates: Oncor (Dallas area) offers $200-400 rebates for 18+ SEER2 systems. Apply before installation for maximum rebate eligibility.',
      '25C federal tax credit: 30% of system cost up to $600 for qualifying high-efficiency equipment. Combine with Oncor rebate for $800-1,000 first-year offset.',
    ],
    verdict: 'Worth the premium in DFW. Comfort improvement from humidity control alone is significant. Long cooling season accelerates payback.',
  },
  'Heat Pump vs Dual-Fuel': {
    headline: 'Dual-fuel is the optimal DFW investment for most homes with gas',
    roi: 'Dual-fuel saves $200-400/yr vs electric backup; heat pump saves $150-300/yr vs gas furnace for moderate winters',
    timeline: '5-8 years full payback on dual-fuel premium',
    details: [
      'DFW winters average 35-45°F with occasional hard freezes below 20°F. Heat pumps are highly efficient from 30°F-65°F (90% of DFW winter), making them ideal for most DFW heating.',
      'Dual-fuel setup: heat pump handles mild DFW winters efficiently; gas furnace activates automatically when temps drop below your balance point (typically 30-35°F for DFW).',
      'Federal 25C tax credit: $2,000 for heat pump installation (much higher than $600 for AC-only). If your DFW home has gas, dual-fuel captures both the efficiency credit and the backup benefit.',
      'Pure electric heat pump with resistance backup: not recommended for DFW — resistance strips are expensive during rare hard freeze events and can overload service panels.',
    ],
    verdict: 'Dual-fuel wins for gas-connected DFW homes. Pure heat pump is excellent for new construction with no existing gas service.',
  },
  'Multi-Zone Investment': {
    headline: 'Strong ROI for DFW two-story homes and large single-stories',
    roi: '15-25% reduction in conditioning costs vs single-zone oversizing',
    timeline: '4-8 years payback vs single-system alternative',
    details: [
      'DFW two-story homes face massive upstairs/downstairs temperature differential in summer — often 10-15°F. A zoned system addresses this without oversizing.',
      'Mini-split for upstairs zone: $2,500-5,000 installed. Eliminates the need to overcool downstairs to make upstairs comfortable. DFW savings: $200-400/year.',
      'Variable refrigerant flow (VRF) for large DFW homes (4,000+ sq ft): $15,000-30,000 installed but enables precise zone control, 25+ SEER2 equivalent efficiency, and simultaneous heating/cooling.',
      'Adding a mini-split to a DFW garage or bonus room: $1,800-3,000 installed. Enables garage workshop use year-round and prevents heat transfer into living space.',
    ],
    verdict: 'Excellent for DFW two-story homes. The comfort improvement is immediate; the financial ROI follows within a typical ownership period.',
  },
  'Selling My Home': {
    headline: 'New HVAC increases DFW home value and speeds sale',
    roi: '$0.50-0.85 return per dollar invested at sale; faster listing to close',
    timeline: 'Immediate impact on appraised value and buyer negotiation',
    details: [
      'DFW real estate market: buyers heavily scrutinize HVAC age and condition. A 10+ year old DFW system triggers $3,000-8,000 negotiated credits in most transactions.',
      'New HVAC before listing: $6,000-12,000 cost typically adds $4,000-8,000 to appraised value and eliminates buyer repair credits — net ROI 0-40%.',
      'Timing matters: replace in spring before listing. DFW summer buyers test AC aggressively. A system that trips breakers or struggles at 100°F kills deals.',
      'Disclosure: Texas law requires disclosing known HVAC defects. A new system eliminates disclosure issues and provides a warranty transferable to the buyer.',
    ],
    verdict: 'Pre-sale HVAC replacement makes financial sense in DFW if system is 10+ years old. Market premium and eliminated buyer credits often cover cost.',
  },
  'Fix or Replace Old System': {
    headline: 'The DFW repair vs replace decision framework',
    roi: 'If repair cost exceeds 50% of replacement cost: replace',
    timeline: 'Systems over 12 years old: factor total cost of ownership, not just repair cost',
    details: [
      'The DFW rule of 5,000: multiply system age by repair cost. If result exceeds $5,000, replace. Example: 12-year system needing $500 repair = 6,000 — replace.',
      'Compressor failure in DFW: a new compressor costs $1,200-2,500 with 1-year warranty on a potentially 12+ year old system. A full system replacement comes with 10-year warranty.',
      'R-22 systems: if the system uses R-22 and needs refrigerant, the economics almost always favor replacement. R-22 availability will continue declining as reclaimed supply depletes.',
      'Energy savings calculation: if repair keeps a 10 SEER system running, compare total annual cost (repair + operating) vs new 18 SEER2 system (higher purchase, lower operating). In DFW, operating cost gap is significant.',
    ],
    verdict: 'Err toward replacement for DFW systems 12+ years old needing major repairs. DFW operating costs make new-system economics compelling.',
  },
};

export default function DFWHVACInvestmentGuide() {
  const [activeSituation, setActiveSituation] = useState(situations[0]);
  const data = strategies[activeSituation];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>💰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW HVAC Investment Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Think of your HVAC as a financial decision — select your situation</p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
          {situations.map(s => (
            <button key={s} onClick={() => setActiveSituation(s)}
              style={{ padding: '9px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: activeSituation === s ? '#F5E642' : '#1e2d45', color: activeSituation === s ? '#0A1628' : '#94a3b8' }}>
              {s}
            </button>
          ))}
        </div>

        {data && (
          <div>
            <div style={{ background: '#1e2d45', borderRadius: 14, padding: '22px 24px', marginBottom: 16, border: '1px solid #F5E642' }}>
              <h2 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 20 }}>{data.headline}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>ESTIMATED ROI</div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{data.roi}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                  <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, marginBottom: 6 }}>TIMELINE</div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{data.timeline}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 16 }}>
              {data.details.map((detail, i) => (
                <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: '18px 20px', border: '1px solid #2a3f5f', display: 'flex', gap: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 20, flexShrink: 0 }}>📊</div>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.7 }}>{detail}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#0d2137', borderRadius: 14, padding: '20px 24px', border: '2px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 14, marginBottom: 8 }}>PROLNK VERDICT</div>
              <p style={{ color: '#fff', margin: 0, fontSize: 15, lineHeight: 1.7, fontWeight: 500 }}>{data.verdict}</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', background: '#1e2d45', borderRadius: 16, padding: '28px 24px' }}>
          <div style={{ fontSize: 32 }}>🔧</div>
          <h3 style={{ color: '#F5E642', margin: '10px 0 8px' }}>Get DFW HVAC Investment Quotes</h3>
          <p style={{ color: '#94a3b8', margin: '0 0 16px', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC professionals who provide transparent pricing.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Free Quotes
          </button>
        </div>
      </div>
    </div>
  );
}
