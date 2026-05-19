import { useState } from 'react';

const BED_TYPES = ['Landscape beds with mulch', 'Concrete/hard edge border', 'Natural grass edge against driveway', 'Flower beds / annuals', 'Tree rings'];
const GRASS_TYPES = ['Bermuda', 'St. Augustine', 'Zoysia', 'Tall Fescue'];

type EdgePlan = { frequency: string; method: string; cost: string; tips: string[] };

const EDGE_PLANS: Record<string, Record<string, EdgePlan>> = {
  'Landscape beds with mulch': {
    Bermuda: {
      frequency: 'Every 3–4 weeks during growing season (April–October)',
      method: 'Mechanical bed edger (stick edger) — re-cut the clean vertical edge each visit',
      cost: '$40–$80 per service for typical DFW yard',
      tips: [
        '⚡ Bermuda is the most aggressive DFW grass — it WILL invade beds within weeks',
        'Re-define the bed edge with a stick edger at minimum monthly — never let Bermuda get a foothold',
        'Apply a grass-specific pre-emergent herbicide to bed edges in February to slow invasion',
        'For stubborn invasion: apply fluazifop-p-butyl (Fusilade) selectively to grass in beds',
        'DFW clay heaves bed edges — re-cut to maintain clean vertical cut every visit',
        'Power edging once per year in spring + string trimmer maintenance between',
      ],
    },
    'St. Augustine': {
      frequency: 'Every 4–5 weeks during growing season',
      method: 'Mechanical bed edger or manual half-moon edger',
      cost: '$35–$70 per service',
      tips: [
        'St. Aug spreads via stolons — still invasive but slightly less aggressive than Bermuda',
        'Monthly edging is sufficient for most DFW St. Aug lawns',
        'Manual half-moon edger works well for occasional maintenance',
        'DFW clay compaction causes bed edges to heave — mechanical re-cut helps reset clean line',
        'Apply pre-emergent herbicide to bed soil in February to slow grass invasion',
      ],
    },
    Zoysia: {
      frequency: 'Every 4–6 weeks during growing season',
      method: 'Mechanical bed edger — Zoysia has dense rhizomes',
      cost: '$35–$70 per service',
      tips: [
        'Zoysia spreads slowly but forms very dense mats once established in beds',
        'Hard to remove once Zoysia invades — frequent edging prevents establishment',
        'Power bed edger cuts through Zoysia rhizomes better than string trimmer',
        'Less aggressive than Bermuda but still requires regular management',
      ],
    },
    'Tall Fescue': {
      frequency: 'Every 4–6 weeks in fall/spring; minimal in summer (dormant)',
      method: 'Manual or mechanical edger — Fescue is bunch-type, less invasive',
      cost: '$30–$60 per service',
      tips: [
        'Fescue does NOT spread via stolons — much less invasive than warm-season grasses',
        'Edging in DFW is still important but less urgent than Bermuda situations',
        'Focus edging effort in fall and spring when fescue is actively growing',
        'Summer: fescue may thin near bed edges from heat — less edging needed',
      ],
    },
  },
  'Concrete/hard edge border': {
    Bermuda: {
      frequency: 'Every 2–3 weeks in peak season — Bermuda grows FAST over hard edges',
      method: 'Stick edger along concrete + string trimmer cleanup',
      cost: '$20–$40 per weekly lawn service (included)',
      tips: [
        'Concrete edges do NOT stop Bermuda — it grows right over them',
        'Weekly stick edging during summer is necessary for clean appearance',
        'Bermuda overgrowing driveway cracks is a DFW-specific problem — don\’t let it get ahead',
        'Blade edging creates a 1/4" gap that slows regrowth vs trimmer against concrete',
      ],
    },
    'St. Augustine': {
      frequency: 'Every 3–4 weeks in growing season',
      method: 'Stick edger or rotary edger along concrete',
      cost: '$20–$40 per service',
      tips: [
        'St. Aug grows over hard edges but slightly slower than Bermuda',
        'Clean concrete edges add significant curb appeal — worth the regular maintenance',
        'DFW wind deposits seeds in crack gaps — pre-emergent on concrete edges helps',
      ],
    },
    Zoysia: { frequency: 'Every 4 weeks', method: 'Stick edger', cost: '$20–$35', tips: ['Zoysia grows slower — 4-week cycle is usually sufficient for concrete edges', 'Creates a beautiful clean edge once maintained consistently'] },
    'Tall Fescue': { frequency: 'Every 3–4 weeks in growing season', method: 'Stick edger', cost: '$20–$35', tips: ['Fescue against concrete is straightforward — bunch grass doesn\’t creep as aggressively', 'Fall and spring are primary maintenance windows'] },
  },
};

const FALLBACK: EdgePlan = {
  frequency: 'Monthly during growing season (April–October for most DFW grasses)',
  method: 'Mechanical stick edger for beds, rotary edger for hard surfaces',
  cost: '$35–$80 per service depending on bed scope',
  tips: [
    'Bermuda grass is the most aggressive DFW spreader — beds need more frequent edging than other regions',
    'DFW clay heaves bed borders — re-define edges with power edger annually each spring',
    'Chemical edge treatment (selective herbicide) extends time between mechanical edging',
    'Clean bed edges are the #1 visual impact improvement for DFW curb appeal',
  ],
};

export default function DFWEdgingGuide() {
  const [bedType, setBedType] = useState('');
  const [grassType, setGrassType] = useState('');
  const [plan, setPlan] = useState<EdgePlan | null>(null);

  function generate() {
    if (bedType && grassType) {
      setPlan(EDGE_PLANS[bedType]?.[grassType] || FALLBACK);
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✂️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Lawn Edging Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Edging is where DFW lawns win or lose curb appeal. Bermuda grass is the most aggressive spreader in the Dallas market — it will claim every unedged bed within a season. DFW clay also heaves bed borders, requiring annual re-definition. Get the timing and method right.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ DFW Edging Realities</h2>
          {[
            ['🌿 Bermuda spreads fast', 'Fastest-spreading grass in DFW — requires edging every 3 weeks in summer or beds are gone'],
            ['🏺 DFW clay heaves borders', 'Clay soil expands/contracts with moisture changes — bed edges need spring re-cut annually'],
            ['🔧 Mechanical beats manual', 'Stick edger creates a clean vertical cut that slows regrowth vs trimmer damage'],
            ['🧪 Chemical + mechanical', 'Best results: mechanical edging + selective herbicide to slow invasion between cuts'],
            ['📅 Spring reset is critical', 'One power edging pass in March sets up the whole season for DFW beds'],
          ].map(([label, detail]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{label}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Get Your Edging Plan</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Bed / Edge Type</label>
            <select value={bedType} onChange={e => setBedType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select bed type...</option>
              {BED_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Grass Type</label>
            <select value={grassType} onChange={e => setGrassType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select grass type...</option>
              {GRASS_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Edging Schedule →
          </button>
        </div>

        {plan && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Your Edging Plan</h2>
            <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
              {[['Edging Frequency', plan.frequency], ['Best Method', plan.method], ['Estimated Cost', plan.cost]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
                  <div style={{ color: '#fff', fontSize: 14, marginTop: 2, fontWeight: label === 'Estimated Cost' ? 700 : 400, ...(label === 'Estimated Cost' ? { color: '#F5E642' } : {}) }}>{val}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>📌 DFW-Specific Tips</div>
              {plan.tips.map((tip, i) => (
                <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{tip}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Edging Method Comparison</h2>
          {[
            ['Stick edger (mechanical)', 'Best results — clean vertical blade cut. Best for concrete edges and formal bed lines'],
            ['String trimmer', 'Maintenance between cuts — not a substitute for mechanical edging for clean lines'],
            ['Manual half-moon edger', 'Works for occasional small areas — labor intensive for full DFW yard'],
            ['Chemical edging', 'Selective herbicide on bed borders — extends time between cuts by 1–2 weeks'],
            ['Steel edging installation', 'One-time $500–$1,500 install — reduces maintenance and contains DFW Bermuda'],
          ].map(([method, desc]) => (
            <div key={method} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{method}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
