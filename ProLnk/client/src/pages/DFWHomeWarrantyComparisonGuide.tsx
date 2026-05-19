import { useState } from 'react';

const PROVIDERS = [
  {
    name: 'American Home Shield (AHS)',
    monthly: '$39–$69',
    deductible: '$75–$125/call',
    dfwClaims: '⭐⭐⭐⭐',
    coverage: 'HVAC, plumbing, electrical, appliances',
    pros: ['Largest contractor network in DFW', 'HVAC coverage is best-in-class', 'Pre-existing conditions sometimes covered'],
    cons: ['Payout caps on some items', 'Slow claim resolution (3–5 days avg)', 'Appliance coverage excludes some brands'],
    bestFor: 'Older homes (10+ years) with aging HVAC systems',
  },
  {
    name: 'Choice Home Warranty',
    monthly: '$36–$55',
    deductible: '$85/call',
    dfwClaims: '⭐⭐⭐',
    coverage: 'HVAC, plumbing, electrical, appliances, roof leaks',
    pros: ['Lower monthly cost', 'Roof leak coverage available', 'Fast claims processing (24–48h)'],
    cons: ['DFW HVAC contractor network thinner', 'Frequent policy change complaints', 'Max payout limits lower than AHS'],
    bestFor: 'Budget-conscious buyers wanting broad coverage',
  },
  {
    name: 'First American Home Warranty',
    monthly: '$42–$72',
    deductible: '$75–$125/call',
    dfwClaims: '⭐⭐⭐⭐',
    coverage: 'Systems + appliances; optional pool/spa',
    pros: ['Strong DFW contractor relationships', 'Pool and spa optional add-on', 'Good appliance brand coverage'],
    cons: ['Higher monthly cost', 'HVAC cap ($1,500) low for DFW system replacements', 'No roof coverage base plan'],
    bestFor: 'Homes with pools — DFW-specific add-on is competitive',
  },
  {
    name: '2-10 Home Buyers Warranty (HBW)',
    monthly: '$20–$55',
    deductible: '$65–$100/call',
    dfwClaims: '⭐⭐⭐',
    coverage: 'Builder warranty + systems + appliances',
    pros: ['Best for new construction DFW homes', 'Structural coverage available', 'Lower deductible options'],
    cons: ['Less established for resale homes', 'Smaller DFW contractor network', 'Claims take 3–7 days'],
    bestFor: 'New DFW construction (Frisco, McKinney, Celina) in first 10 years',
  },
];

const HOME_AGES = ['0–5 years (new construction)', '6–10 years', '11–20 years', '21–30 years', '30+ years'];
const PRIORITIES = ['HVAC system', 'Kitchen appliances', 'Plumbing systems', 'Pool / spa', 'Everything balanced'];

const RECS: Record<string, { provider: string; plan: string; why: string }> = {
  '0–5 years (new construction)-HVAC system': { provider: '2-10 HBW', plan: 'Supreme', why: 'New construction DFW homes often have builder warranties — supplement with 2-10 HBW for structural + HVAC overlap coverage.' },
  '0–5 years (new construction)-Pool / spa': { provider: 'First American', plan: 'Premier + Pool', why: 'First American pool add-on is the best value for DFW homes with in-ground pools.' },
  '6–10 years-HVAC system': { provider: 'American Home Shield', plan: 'ShieldGold', why: 'AHS has the deepest HVAC contractor network in DFW — critical as 6–10 year systems hit first failure points.' },
  '6–10 years-Kitchen appliances': { provider: 'American Home Shield', plan: 'ShieldPlus', why: 'AHS appliance coverage is broadest across DFW-region brands including Samsung and LG.' },
  '11–20 years-HVAC system': { provider: 'American Home Shield', plan: 'ShieldPlatinum', why: 'This home age bracket has the highest HVAC failure rate in DFW — AHS Platinum uncaps HVAC payout.' },
  '11–20 years-Everything balanced': { provider: 'American Home Shield', plan: 'ShieldGold', why: 'Best all-in coverage for this age range. Systems and appliances start failing together in DFW heat cycles.' },
  '21–30 years-HVAC system': { provider: 'American Home Shield', plan: 'ShieldPlatinum', why: 'Platinum removes payout caps — essential for 20+ year homes facing $5,000+ HVAC replacements in DFW.' },
  '21–30 years-Plumbing systems': { provider: 'First American', plan: 'Premier', why: 'First American covers cast-iron drain lines and slab leaks that are common in older DFW construction.' },
  '30+ years-Everything balanced': { provider: 'American Home Shield', plan: 'ShieldPlatinum', why: 'For homes this age in DFW, full coverage with no payout caps is essential. Budget for $65–$69/mo.' },
};

export default function DFWHomeWarrantyComparisonGuide() {
  const [homeAge, setHomeAge] = useState(HOME_AGES[2]);
  const [priority, setPriority] = useState(PRIORITIES[0]);
  const [result, setResult] = useState<null | typeof RECS[string]>(null);

  function evaluate() {
    const key = `${homeAge}-${priority}`;
    const found = RECS[key];
    if (found) {
      setResult(found);
    } else {
      setResult({ provider: 'American Home Shield', plan: 'ShieldGold', why: 'For most DFW homes, AHS ShieldGold offers the best balance of HVAC coverage depth and contractor availability in the metroplex.' });
    }
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1E3A', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>🏡 Home Warranty Comparison for DFW</h1>
          <p style={{ color: '#94A3B8', margin: 0, fontSize: 15 }}>DFW's extreme heat, hard water, and storm activity drive higher claim rates than the national average. Here's how the top 4 providers stack up for North Texas homeowners.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '32px auto', padding: '0 24px' }}>
        <div style={{ backgroundColor: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 12, padding: '18px 22px', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 8px' }}>☀️ Why DFW Claims Run Higher</h2>
          <p style={{ color: '#CBD5E1', margin: 0, fontSize: 14, lineHeight: 1.7 }}>HVAC systems in DFW run 2,200+ hours per year — nearly double the national average. Average claim payout in Texas runs $450 vs. $280 nationally. HVAC replacement cost in DFW averages $5,800–$12,000 depending on system size and efficiency tier. A $50/mo warranty paying for one HVAC replacement breaks even in under 10 years.</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📊 Provider Comparison</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {PROVIDERS.map(p => (
            <div key={p.name} style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <h3 style={{ color: '#F1F5F9', fontSize: 16, margin: 0 }}>{p.name}</h3>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{p.monthly}/mo</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>Service call: {p.deductible}</div>
                </div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 10 }}>DFW Claims Experience: {p.dfwClaims}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ color: '#4ADE80', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✓ Pros</div>
                  {p.pros.map(pr => <div key={pr} style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>• {pr}</div>)}
                </div>
                <div>
                  <div style={{ color: '#F87171', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>✗ Cons</div>
                  {p.cons.map(c => <div key={c} style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>• {c}</div>)}
                </div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#F5E642' }}>Best for: {p.bestFor}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>🔍 Find the Right Plan for Your DFW Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Home Age</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {HOME_AGES.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Coverage Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#F1F5F9', fontSize: 14, boxSizing: 'border-box' }}>
                {PRIORITIES.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <button onClick={evaluate} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Recommended: {result.provider} — {result.plan}</div>
              <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7, fontSize: 14 }}>{result.why}</p>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0D1E3A', border: '1px solid #1E3A5F', borderRadius: 12, padding: 22 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, margin: '0 0 10px' }}>💡 When to Buy — DFW Timing Tips</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              { label: 'At purchase', detail: 'Best time — sellers often pay first year as concession. Ask during negotiation.' },
              { label: 'Before summer', detail: 'HVAC claims spike June–August. Buy in April–May before your system is stressed.' },
              { label: 'After first failure', detail: 'Most plans have a 30-day waiting period. Buy before things break, not during.' },
              { label: 'When home is 8+ years', detail: 'DFW systems average first major failure at 8–10 years. That\’s the buy window.' },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1E3A5F' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 130, fontSize: 14 }}>{t.label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{t.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
