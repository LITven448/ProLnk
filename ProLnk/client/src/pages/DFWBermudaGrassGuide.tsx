import { useState } from 'react';

const SUBMARKETS = ['North Dallas', 'Fort Worth', 'Plano/Frisco', 'Arlington', 'McKinney', 'Irving', 'Denton'];
const CONDITIONS = ['Healthy & thick', 'Thin & patchy', 'Dormant (winter)', 'Brown/stressed', 'Mixed weeds'];

const SCHEDULES: Record<string, { tasks: string[]; cost: string }> = {
  'Healthy & thick': {
    tasks: ['Feb: Apply pre-emergent before soil hits 55°F', 'Apr: First mow at 1.5"–2" as growth resumes', 'May: Fertilize with 3-1-2 ratio nitrogen', 'Jun–Aug: Mow every 5–7 days, maintain 1.5"–2"', 'Jul: Second fertilizer application', 'Sep: Reduce mowing frequency as growth slows', 'Oct–Nov: Let go dormant naturally — no fertilizer'],
    cost: '$300–$600/season for pro care',
  },
  'Thin & patchy': {
    tasks: ['Mar–Apr: Dethatch if thatch exceeds 0.5"', 'Apr–May: Core aerate DFW clay soil', 'May: Fertilize heavily with slow-release nitrogen', 'Jun: Overseed bare spots with Bermuda seed', 'Jul: Second fertilizer push for fill-in', 'Aug: Spot treat weeds competing with Bermuda', 'Oct: Evaluate results before dormancy'],
    cost: '$500–$900/season for restoration',
  },
  'Dormant (winter)': {
    tasks: ['Nov–Mar: Do NOT fertilize dormant grass', 'Dec–Feb: Optional ryegrass overseed for green look', 'Jan: Plan pre-emergent timing for Feb application', 'Feb: Apply pre-emergent (critical DFW window)', 'Mar: Watch soil temps — Bermuda wakes at 65°F', 'Apr: Begin normal spring program when green'],
    cost: '$150–$300 for winter overseed',
  },
  'Brown/stressed': {
    tasks: ['Identify cause: drought, disease, or grubs first', 'Water deeply 1" per week if drought stress', 'May–Jun: Fungicide if brown patch suspected', 'Delay fertilizer until grass shows recovery', 'Jul: Soil test to identify nutrient deficiencies', 'Aug: Grub treatment if June beetle larvae found'],
    cost: '$200–$800 depending on cause',
  },
  'Mixed weeds': {
    tasks: ['Feb: Pre-emergent is your first line of defense', 'Apr: Post-emergent broadleaf herbicide when Bermuda active', 'May: Fertilize to thicken Bermuda and crowd weeds', 'Jun–Jul: Spot treat remaining weeds', 'Aug: Second pre-emergent application for fall weeds', 'Sep: Evaluate and plan next spring strategy'],
    cost: '$400–$700/season for weed management',
  },
};

export default function DFWBermudaGrassGuide() {
  const [condition, setCondition] = useState('');
  const [submarket, setSubmarket] = useState('');
  const [result, setResult] = useState<{ tasks: string[]; cost: string } | null>(null);

  function generate() {
    if (condition && submarket) setResult(SCHEDULES[condition]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌿</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Bermuda Grass Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Bermuda grass dominates DFW lawns — drought-tolerant, full-sun loving, and aggressive. It goes dormant November through March and thrives in our heat. The two most critical care windows: May fertilization and July fertilization.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚡ Key Bermuda Facts for DFW</h2>
          {[
            '☀️ Requires 6+ hours of direct sun — shaded Bermuda will thin and die',
            '💤 Dormant Nov–Mar — tan/brown is normal, not dead',
            '🌡️ Wakes up when soil hits 65°F (typically late March–April)',
            '💧 Drought-tolerant once established, but needs 1" water/week in peak summer',
            '📅 Never fertilize dormant grass — wait for active green growth',
            '🌱 Spreads via stolons and rhizomes — very aggressive spreader',
          ].map((fact, i) => (
            <div key={i} style={{ color: '#cbd5e1', marginBottom: 8, fontSize: 14 }}>{fact}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🗺️ Get Your Bermuda Care Schedule</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Your DFW Area</label>
            <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select submarket...</option>
              {SUBMARKETS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Lawn Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select condition...</option>
              {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Generate My Bermuda Schedule →
          </button>
        </div>

        {result && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 Your {condition} Bermuda Plan — {submarket}</h2>
            {result.tasks.map((task, i) => (
              <div key={i} style={{ color: '#cbd5e1', marginBottom: 10, fontSize: 14, paddingLeft: 12, borderLeft: '2px solid #F5E642' }}>{task}</div>
            ))}
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>💰 Estimated Cost: </span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>❄️ Winter Overseed Option</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>
            For year-round green, overseed dormant Bermuda with annual ryegrass in October–November. Apply at 5–10 lbs per 1,000 sq ft. The ryegrass dies in spring heat, allowing Bermuda to re-emerge. Cost: $150–$300 for materials + labor.
          </p>
        </div>
      </div>
    </div>
  );
}
