import { useState } from 'react';

const geoFacts = [
  { icon: '🌡️', title: 'DFW Ground Temperature', desc: 'DFW ground temperature stabilizes at ~68°F year-round at 6–10 feet depth — ideal for geothermal exchange. The delta from summer highs (100°F+) is what drives efficiency.' },
  { icon: '⚡', title: 'Efficiency Advantage', desc: 'Geothermal COP (Coefficient of Performance) of 3–5 vs gas furnace COP of ~0.95. You get 3–5 units of heat/cooling for every 1 unit of electricity consumed.' },
  { icon: '🧱', title: 'DFW Clay Soil Challenge', desc: 'Blackland Prairie clay has good thermal conductivity but high moisture retention and significant shrink-swell. Ground loops must account for soil movement — longer loops often needed.' },
  { icon: '💰', title: 'Federal Tax Credit', desc: '30% federal tax credit (IRA 2022) applies to full system cost including installation. No cap. DFW state incentives are limited — federal credit is the primary driver.' },
  { icon: '🔄', title: 'Closed-Loop vs Open-Loop', desc: 'Closed-loop (horizontal or vertical bore) is most common in DFW. Open-loop uses groundwater from aquifer — requires water rights and Barnett Shale proximity adds complexity.' },
  { icon: '📉', title: 'Long-Term Savings', desc: 'DFW homeowners average $1,200–$2,400/yr savings vs conventional HVAC. Payback period: 6–12 years depending on current system age and energy prices.' },
];

const systemTypes = [
  { type: 'Horizontal Closed-Loop', bestFor: 'Large lots (0.5+ acres)', depth: '4–8 ft deep, 200–400 ft trenches', pros: 'Lower drilling cost', cons: 'Needs significant yard space; DFW clay movement' },
  { type: 'Vertical Closed-Loop', bestFor: 'Typical DFW suburban lots', depth: '150–300 ft bore holes', pros: 'Fits any lot size; more stable in clay', cons: 'Higher drilling cost ($15–$25/ft)' },
  { type: 'Pond/Lake Loop', bestFor: 'Lakefront / pond-adjacent properties', depth: 'Submerged coils', pros: 'Lowest cost if water available', cons: 'Requires adequate water body on property' },
];

export default function DFWGeoThermalHomeGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [hvacAge, setHvacAge] = useState('');
  const [budget, setBudget] = useState('');
  const [showResults, setShowResults] = useState(false);

  const getFeasibility = () => {
    const results: { label: string; value: string; detail: string }[] = [];

    const sizeMap: Record<string, { tons: string; cost: string; savings: string }> = {
      small: { tons: '2–3 ton system', cost: '$18,000–$25,000', savings: '$900–$1,400/yr' },
      medium: { tons: '3–5 ton system', cost: '$22,000–$35,000', savings: '$1,200–$2,000/yr' },
      large: { tons: '5–6 ton system', cost: '$32,000–$50,000', savings: '$1,800–$2,800/yr' },
    };

    const data = sizeMap[homeSize] || sizeMap.medium;
    results.push({ label: 'Recommended System', value: data.tons, detail: `DFW load calculations favor oversizing slightly for 100°F summers.` });
    results.push({ label: 'Estimated System Cost', value: data.cost, detail: `After 30% federal tax credit: ${homeSize === 'small' ? '$12,600–$17,500' : homeSize === 'large' ? '$22,400–$35,000' : '$15,400–$24,500'}` });
    results.push({ label: 'Annual Energy Savings', value: data.savings, detail: 'Vs. average DFW gas/electric conventional HVAC. Electricity rate changes affect this.' });

    if (hvacAge === 'old') {
      results.push({ label: 'Replacement Timing', value: '✅ Excellent now', detail: 'Aging HVAC + geothermal replacement maximizes ROI. Avoid double capital spend.' });
    } else if (hvacAge === 'mid') {
      results.push({ label: 'Replacement Timing', value: '🟡 Consider planning', detail: 'HVAC has 5–10 years left. Plan geothermal for next replacement cycle to optimize tax credit timing.' });
    } else {
      results.push({ label: 'Replacement Timing', value: '🟠 Wait unless motivated', detail: 'New HVAC is efficient. Geothermal ROI improves if current system fails or utility rates rise significantly.' });
    }

    const budgetFeasible = budget === 'over30k' || (budget === '20to30k' && homeSize !== 'large');
    results.push({ label: 'Budget Feasibility', value: budgetFeasible ? '✅ Feasible' : '⚠️ May need financing', detail: budgetFeasible ? 'Budget aligns with system cost after federal credit.' : 'Consider GreenSky or Mosaic geothermal loans (0% for 18–24 months often available).' });

    return results;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Health</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.2 }}>🌍 Geothermal Heating & Cooling Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>DFW's extreme summers and stable ground temperature make geothermal one of the most efficient HVAC options — but DFW clay soil creates unique installation considerations.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {geoFacts.map((f, i) => (
            <div key={i} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🔧 System Types for DFW</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {systemTypes.map((s, i) => (
            <div key={i} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontWeight: 700, color: '#F5E642' }}>{s.type}</span>
                <span style={{ color: '#60a5fa', fontSize: '0.85rem' }}>{s.depth}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: 4 }}>Best for: {s.bestFor}</div>
              <div style={{ fontSize: '0.85rem' }}><span style={{ color: '#4ade80' }}>✅ {s.pros}</span> &nbsp;|&nbsp; <span style={{ color: '#f87171' }}>⚠️ {s.cons}</span></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1.25rem' }}>🏠 Is Geothermal Right for Your DFW Home?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>HOME SIZE</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='small'>Under 2,000 sq ft</option>
                <option value='medium'>2,000–3,500 sq ft</option>
                <option value='large'>3,500+ sq ft</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>CURRENT HVAC AGE</label>
              <select value={hvacAge} onChange={e => setHvacAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='new'>Under 5 years</option>
                <option value='mid'>5–12 years</option>
                <option value='old'>12+ years</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>BUDGET (after tax credit)</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='under15k'>Under $15K</option>
                <option value='15to20k'>$15K–$20K</option>
                <option value='20to30k'>$20K–$30K</option>
                <option value='over30k'>$30K+</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
            Calculate Feasibility →
          </button>
          {showResults && (
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {getFeasibility().map((item, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.875rem 1rem', border: '1px solid #1e3a5f', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: 2 }}>{item.label}</div>
                    <div style={{ fontWeight: 700, color: '#F5E642' }}>{item.value}</div>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.875rem', flex: 1 }}>{item.detail}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f', color: '#94a3b8', fontSize: '0.875rem' }}>
          💡 DFW-specific installer tip: Require your contractor to use grouted boreholes (not just water-filled) to account for Blackland Clay shrink-swell. Ask for loop pressure tests before backfill.
        </div>
      </div>
    </div>
  );
}
