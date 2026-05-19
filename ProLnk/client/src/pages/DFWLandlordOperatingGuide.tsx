import { useState } from 'react';

type PropertyType = 'sfr' | 'duplex' | 'smallmulti';
type UnitCount = 'one' | 'two' | 'threefive';

const guides: Record<PropertyType, Record<UnitCount, { monthlyOps: string; legalReqs: string[]; estimatedCosts: string[]; checklist: string[] }>> = {
  sfr: {
    one: {
      monthlyOps: '~4–6 hrs/month self-managed; ~$100–$180/mo for PM firm',
      legalReqs: ['Security deposit: no statutory max in Texas; must return within 30 days of move-out', 'Itemized deductions required in writing within 30 days', '24-hr notice before entry (not legally required but strongly recommended)', 'Repair & deduct: tenant right if landlord fails to fix within "reasonable time"', 'Written lease required for leases over 1 year'],
      estimatedCosts: ['Mortgage/insurance/tax: varies', 'Property manager (if used): 8–12% of rent', 'Maintenance reserve: $100–$200/mo', 'Vacancy reserve: 1 month/yr budget', 'DFW avg 1BR rent 2026: $1,450 | 2BR: $1,780 | 3BR: $2,100'],
      checklist: ['File for homestead exemption removal if converting to rental', 'Get landlord liability insurance (not homeowner policy)', 'HVAC filter change every 30 days in DFW summers', 'Inspect roof before June storm season', 'Add slab leak detection sensor — #1 DFW landlord claim'],
    },
    two: { monthlyOps: '~6–8 hrs/month', legalReqs: ['Same as single-family + lease termination: must give 30-day notice for month-to-month'], estimatedCosts: ['DFW avg 2BR rent: $1,780', 'Maintenance reserve: $150/mo'], checklist: ['Separate utility meters if possible', 'Document pre-move-in condition with photos'] },
    threefive: { monthlyOps: '~8–12 hrs/month', legalReqs: ['Same as above'], estimatedCosts: ['Budget 10% gross rent for maintenance', 'PM firm often worth it at 3+ units'], checklist: ['Consider PM firm at this size', 'Set up separate bank account per property'] },
  },
  duplex: {
    one: {
      monthlyOps: '~6–10 hrs/month; PM firm 8–10% per unit',
      legalReqs: ['Each unit treated as separate tenancy under Texas law', 'Cannot lock out tenant for non-payment — must file eviction in JP court', 'Eviction process: 3-day notice, file JP court ($121 filing fee), hearing in 10–21 days', 'Texas no rent control — can raise rent with proper notice on lease renewal', 'Utility allocation must be disclosed upfront if on shared meter'],
      estimatedCosts: ['DFW duplex avg rent per unit: $1,400–$1,800', 'Insurance: duplex landlord policy ~$1,200–$2,400/yr', 'Maintenance: $150–$250/mo per unit', 'Vacancy: budget 1 month/unit/yr', 'Property tax: ~2.2–2.8% assessed value in DFW'],
      checklist: ['Separate electricity meters standard in DFW duplexes — verify before purchase', 'Use separate leases for each unit', 'HVAC inspection both units before summer', 'Get written move-in condition report signed by tenant', 'Install smoke/CO detectors per unit — Texas code requires'],
    },
    two: { monthlyOps: '~10–14 hrs/month', legalReqs: ['Consider PM firm at 2+ duplexes (4 units)', 'All Texas landlord-tenant law applies uniformly'], estimatedCosts: ['Budget 12% of gross rent for all expenses', 'PM firm cost: 8–10% per unit (~$560–$720/mo at avg DFW rents'], checklist: ['Automate rent collection (Avail, TurboTenant, AppFolio)', 'Create maintenance request system'] },
    threefive: { monthlyOps: '~14–20 hrs/month or hire PM', legalReqs: ['Same — scale applies uniformly in Texas'], estimatedCosts: ['PM highly recommended at 6–10 units', 'Costs scale linearly'], checklist: ['AppFolio or Buildium for portfolio management', 'Annual property tax protest — most DFW landlords overpay'] },
  },
  smallmulti: {
    one: {
      monthlyOps: '~15–25 hrs/month self-managed; PM firm strongly recommended',
      legalReqs: ['Texas Uniform Residential Landlord Tenant Act applies', 'Cannot waive repair and deduct rights in lease — any waiver is void', 'Must maintain property to local housing code at all times', 'Application fee: can charge; must refund if not processed', 'Late fees: must be in lease; Texas no statutory cap but courts scrutinize >10%'],
      estimatedCosts: ['DFW 3–5 unit avg gross rent: $6,000–$10,500/mo', 'PM firm: 8–10% of collected rent', 'Insurance: commercial landlord policy, ~$3,000–$8,000/yr', 'Maintenance: 10–15% of gross rent budget', 'DFW property tax protest: avg 15–20% reduction when protested'],
      checklist: ['File as commercial property — different tax treatment', 'Hire licensed property manager — tenant law at this scale is complex', 'Annual property tax protest is almost always worthwhile in DFW', 'Roof, HVAC, plumbing budget 1% of property value/year for reserves', 'Consider LLC for liability protection — consult TX attorney'],
    },
    two: { monthlyOps: 'Hire PM firm', legalReqs: ['All Texas law applies; compliance becomes critical at scale'], estimatedCosts: ['Scale PM costs, maintenance reserves accordingly'], checklist: ['Professional management required at this size', 'Annual audit of lease terms for legal compliance'] },
    threefive: { monthlyOps: 'Professional management required', legalReqs: ['Same Texas law; consider consulting a TX landlord-tenant attorney annually'], estimatedCosts: ['Budget 15–20% gross for all ops costs including PM'], checklist: ['Engage a CPA familiar with TX real estate tax treatment', 'Consider cost segregation study for depreciation'] },
  },
};

export default function DFWLandlordOperatingGuide() {
  const [propType, setPropType] = useState<PropertyType | null>(null);
  const [units, setUnits] = useState<UnitCount | null>(null);

  const result = propType && units ? guides[propType][units] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW LANDLORD GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Rental Property Operating Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 24, lineHeight: 1.6 }}>
          Texas landlord-tenant law, DFW market rents, operating costs, and what to include in your lease — by property type and scale.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>⚖️ KEY TEXAS LANDLORD LAWS</div>
          {['No rent control — raise rent at renewal with proper notice', 'Security deposit: no max; return within 30 days with written itemization', 'Eviction: JP court, 3-day notice, $121 filing fee, hearing in 10–21 days', 'Repair & deduct: tenant right if you ignore reasonable repair requests', 'No lockouts — must use legal eviction process only'].map((l, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, color: '#C8D0E0', marginBottom: 6 }}>• {l}</div>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>1️⃣ PROPERTY TYPE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[['sfr', '🏠 Single Family'], ['duplex', '🏘️ Duplex'], ['smallmulti', '🏢 3–5 Units']] .map(([k, label]) => (
              <button key={k} onClick={() => setPropType(k as PropertyType)} style={{ background: propType === k ? '#F5E642′ : '#111E35', color: propType === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (propType === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '12px 10px', cursor: ’pointer', fontWeight: 700, fontSize: 12, textAlign: 'center' }}>{label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>2️⃣ HOW MANY UNITS DO YOU OWN?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[['one', '1 Unit'], ['two', '2 Units'], ['threefive', '3–5 Units']] .map(([k, label]) => (
              <button key={k} onClick={() => setUnits(k as UnitCount)} style={{ background: units === k ? '#F5E642′ : '#111E35', color: units === k ? '#0A1628' : '#E8EAF0', border: '1px solid ' + (units === k ? '#F5E642' : '#1E2D45'), borderRadius: 8, padding: '12px 10px', cursor: ’pointer', fontWeight: 700, fontSize: 12, textAlign: 'center' }}>{label}</button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#111E35', border: '2px solid #F5E642', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>⏱️ OPERATING TIME</div>
              <div style={{ color: '#C8D0E0′ }}>{result.monthlyOps}</div>
            </div>
            <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>⚖️ LEGAL REQUIREMENTS</div>
              {result.legalReqs.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, color: '#C8D0E0', marginBottom: 6 }}>• {r}</div>)}
            </div>
            <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>💰 ESTIMATED COSTS</div>
              {result.estimatedCosts.map((c, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, color: '#C8D0E0', marginBottom: 6 }}>• {c}</div>)}
            </div>
            <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>✅ OPERATING CHECKLIST</div>
              {result.checklist.map((c, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, color: '#C8D0E0', marginBottom: 6 }}>☐ {c}</div>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
