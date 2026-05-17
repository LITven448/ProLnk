import { useState } from 'react';

export default function DFWPlumbingLongTerm2026() {
  const [homeAge, setHomeAge] = useState('');
  const [plan, setPlan] = useState(false);

  const phases = [
    { label: 'Years 0–10', icon: '🔵', title: 'Normal Service Phase', tasks: ['Annual water heater flush (DFW hard water = sediment)', 'Test pressure relief valve annually', 'Check under-sink supply lines for corrosion', 'Inspect hose bibs and shutoffs for drip leaks'] },
    { label: 'Years 10–20', icon: '🔧', title: 'Anode Rod & Leak Watch', tasks: ['Replace water heater anode rod (year 8-10)', 'Watch for signs of slab leak: hot spots on floor, water bill spike', 'Inspect supply lines to all fixtures (replace if original)', 'Consider water softener if not installed (DFW avg 300 ppm hardness)'] },
    { label: 'Years 20–30', icon: '⚠️', title: 'Slab Leak Risk Window', tasks: ['Slab leak probability increases significantly after year 20', 'Leak detection service recommended every 3-5 years', 'Consider repipe consultation if supply lines are original', 'Budget $3,000–$8,000 for slab leak repair if needed'] },
    { label: 'Years 30+', icon: '🔴', title: 'Repipe Consideration', tasks: ['Galvanized pipe (pre-1970s): repipe strongly recommended', 'Copper pipe: check for pinhole leaks from DFW chemistry', 'Get repipe quote: whole-home PEX repipe $8,000–$18,000', 'Document all plumbing for future resale disclosure'] },
  ];

  const statusMap: Record<string, { color: string; msg: string }> = {
    'under10': { color: '#22c55e', msg: '🟢 Low risk phase. Annual water heater maintenance is the key task. DFW hard water accelerates sediment — flush yearly.' },
    '10to20': { color: '#eab308', msg: '🟡 Watch for early slab leak signs. Unexplained bill spikes or warm floor spots need immediate attention.' },
    '20to30': { color: '#f97316', msg: '🟠 Slab leak risk zone. DFW clay movement + aging copper = elevated leak probability. Get a leak detection inspection.' },
    'over30': { color: '#dc2626', msg: '🔴 Repipe evaluation recommended. Homes over 30 in DFW with original plumbing often have systemic issues. Get a plumber assessment.' },
  };

  const s = homeAge ? statusMap[homeAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚿</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Plumbing Long-Term Ownership Plan 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>30-year plumbing plan for DFW hard water and expansive clay conditions</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Home Age</h2>
          <select value={homeAge} onChange={e => { setHomeAge(e.target.value); setPlan(false); }} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Select home age --</option>
            <option value="under10">Under 10 years</option>
            <option value="10to20">10–20 years</option>
            <option value="20to30">20–30 years</option>
            <option value="over30">Over 30 years</option>
          </select>
          <button onClick={() => setPlan(true)} disabled={!homeAge} style={{ background: homeAge ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: homeAge ? 'pointer' : 'default' }}>
            Generate My Plumbing Plan →
          </button>
        </div>

        {plan && s && (
          <div style={{ background: '#1e2d45', borderLeft: `3px solid ${s.color}`, borderRadius: 12, padding: 20, marginBottom: 20, fontSize: 14 }}>
            {s.msg}
          </div>
        )}

        {plan && phases.map((p, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>{p.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{p.title}</div>
              </div>
            </div>
            {p.tasks.map((t, j) => <div key={j} style={{ padding: '7px 12px', background: '#0A1628', borderRadius: 6, marginBottom: 6, fontSize: 13 }}>✓ {t}</div>)}
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 10 }}>💧 DFW Plumbing Facts</h3>
          {['DFW water hardness: 200–400 ppm (very hard)', 'Slab leak repair avg cost: $3,000–$8,000 per leak', 'Whole-home PEX repipe: $8,000–$18,000 in DFW', 'Water softener ROI in DFW: typically 3–5 years'].map((f, i) => (
            <div key={i} style={{ fontSize: 13, color: '#cbd5e1', padding: '6px 0', borderBottom: i < 3 ? '1px solid #334155' : 'none' }}>📍 {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
