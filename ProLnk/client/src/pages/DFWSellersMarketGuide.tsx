import { useState } from 'react';

const DFW_AREAS = [
  'Plano / Allen / McKinney',
  'Frisco / Prosper / Celina',
  'Fort Worth / Keller / Southlake',
  'Arlington / Mansfield / Grand Prairie',
  'Irving / Las Colinas / Coppell',
  'Garland / Mesquite / Rowlett',
  'Denton / Lewisville / Flower Mound',
  'Richardson / Addison / Carrollton',
];

const HOME_CONDITIONS = [
  'Move-in ready / fully updated',
  'Minor cosmetic updates needed',
  'Needs moderate work (kitchen/bath)',
  'Fixer-upper / as-is sale',
];

type StrategyResult = {
  pricing: string;
  timing: string;
  dom: string;
  premium: string;
  offerExpectation: string;
};

const strategies: Record<string, Record<string, StrategyResult>> = {
  'Move-in ready / fully updated': {
    'Plano / Allen / McKinney': { pricing: 'List at top of comp range — updated homes in this corridor command premium. Don\’t leave money on the table by underpricing.', timing: 'List Thursday to capture weekend showings. February-June is peak; expect fastest movement April-May.', dom: '5-12 days', premium: '3-7% over list typical in hot periods', offerExpectation: 'Expect 3-8 offers in peak season. Set offer deadline 48-72 hours after listing.' },
    default: { pricing: 'Price at or slightly above top comps. Updated homes sell fast in seller\’s market DFW — trust the market.', timing: 'Spring listing (Feb-June) maximizes exposure. Thursday list date captures full weekend traffic.', dom: '7-15 days', premium: '2-5% over list', offerExpectation: 'Multiple offers expected. Structured offer deadline in 48-72 hours.' },
  },
  'Minor cosmetic updates needed': {
    default: { pricing: 'Price slightly below fully updated comps — buyers will discount mentally for paint/carpet/fixtures. Let the price do the work.', timing: 'Spring still optimal. If listing off-season, price more aggressively to compensate for lower traffic.', dom: '14-25 days', premium: '0-2% over list if priced right', offerExpectation: '1-3 offers typical. Some buyers will negotiate; be ready to offer small credit in lieu of repairs.' },
  },
  'Needs moderate work (kitchen/bath)': {
    default: { pricing: 'Price for the condition — discount 8-15% from updated comps. Buyers renovating expect a deal. Overpricing stales the listing fast.', timing: 'Condition matters less than price. Spring helps but a well-priced fixer sells year-round in DFW.', dom: '20-45 days', premium: 'Unlikely — focus on preventing reductions', offerExpectation: 'Investors and handy buyers. Expect low offers; counter with data. One clean offer is the goal.' },
  },
  'Fixer-upper / as-is sale': {
    default: { pricing: 'Investor pricing: ARV minus repairs minus 20-25% profit margin. Price it right day one — as-is stigma compounds if you sit.', timing: 'As-is sells year-round to investors. Spring doesn\’t matter much; wholesalers and flippers shop constantly.', dom: '10-30 days if priced right, 60-90+ if not', premium: 'None — discount from market expected', offerExpectation: 'Cash offers, quick close, no contingencies. Trade speed for price.' },
  },
};

export default function DFWSellersMarketGuide() {
  const [area, setArea] = useState('');
  const [condition, setCondition] = useState('');

  const getResult = (): StrategyResult | null => {
    if (!condition) return null;
    const conditionData = strategies[condition];
    if (!conditionData) return null;
    return conditionData[area] || conditionData['default'] || null;
  };

  const result = getResult();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
          🏡 DFW Real Estate Intelligence
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          DFW Seller's Market Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          DFW is predominantly a seller's market. Population growth, corporate relocations, and constrained supply in desirable corridors keep leverage with sellers. Here's how to maximize your position.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '📈', label: 'DFW Population Growth', value: '+1.3M since 2020', sub: 'Demand engine still running' },
            { icon: '🏢', label: 'Corporate HQs Relocated', value: '50+ since 2018', sub: 'Toyota, Oracle, Goldman Sachs' },
            { icon: '📦', label: 'Typical Inventory', value: '2-4 months', sub: 'Well below 6-month neutral' },
            { icon: '⚡', label: 'Peak Season DOM', value: '5-14 days', sub: 'Feb-June in top corridors' },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} style={{ background: '#0F2040', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>{label}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{value}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🎯 Get Your Seller Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select area...</option>
                {DFW_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Home Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select condition...</option>
                {HOME_CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>EXPECTED DOM</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{result.dom}</div>
                </div>
                <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>OFFER PREMIUM</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642' }}>{result.premium}</div>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>💰 Pricing Strategy</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.6 }}>{result.pricing}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📅 Timing</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.6 }}>{result.timing}</div>
              </div>
              <div style={{ padding: 14, background: '#0F2040', borderRadius: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📬 Offer Expectations</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{result.offerExpectation}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔑 DFW Seller's Playbook: Top 5 Rules</h2>
          {['List Thursday — Friday-Sunday showings drive offer velocity.', 'Set an offer deadline — creates urgency and prevents lowballs from anchoring.', 'Don\’t skip pre-listing inspection — surprises at closing kill deals.', 'Stage or virtually stage — DFW buyers browse Zillow before driving.', 'Price it right day one — stale listings lose 3-8% vs. comparable fresh ones.'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <div style={{ minWidth: 28, height: 28, background: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#0A1628' }}>{i + 1}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5, paddingTop: 4 }}>{tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
