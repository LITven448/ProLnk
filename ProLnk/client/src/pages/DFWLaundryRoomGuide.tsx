import { useState } from 'react';

const upgrades = [
  { name: 'Water Softener Integration', cost: '800–2,500', priority: 1, why: 'DFW hard water (300+ ppm) destroys washing machine drums and seals in 5–7 years vs 12+ with softener' },
  { name: 'Gas Dryer Ventilation', cost: '200–600', priority: 1, why: 'Proper exterior venting required by code — lint buildup is #1 cause of home fires in Texas' },
  { name: 'Utility Sink Installation', cost: '400–1,200', priority: 2, why: 'Hand-washing delicates, soaking, pet cleanup — plumbing already nearby in laundry room' },
  { name: 'Upper Storage Cabinets', cost: '600–2,000', priority: 2, why: 'Detergent, supplies, backup linens — captures unused vertical space above machines' },
  { name: 'Folding Station / Countertop', cost: '300–1,200', priority: 3, why: 'Built-in countertop over machines or pull-out station eliminates bedroom folding piles' },
  { name: 'Ventilation Fan Upgrade', cost: '150–400', priority: 3, why: 'DFW humidity causes mildew in laundry rooms — proper CFM fan eliminates musty odor' },
  { name: 'Ironing Center (wall-mounted)', cost: '200–500', priority: 4, why: 'Folds flat into wall, keeps iron and board contained' },
  { name: 'Pedestal Drawers', cost: '300–800', priority: 4, why: 'Raises machines to ergonomic height, adds storage below' },
];

const hardWaterSigns = [
  'White scale deposits on machine drum or door seal',
  'Clothes feel stiff or scratchy after washing',
  'Machine making grinding or rattling noise',
  'Soap scum buildup in drum',
  'Clothes not coming fully clean with normal detergent',
  'Machine valve or hose connections showing mineral deposits',
];

export default function DFWLaundryRoomGuide() {
  const [roomSize, setRoomSize] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [hasGas, setHasGas] = useState(false);
  const [result, setResult] = useState<{ priorities: typeof upgrades; total: string } | null>(null);

  const goalOptions = ['More storage', 'Folding station', 'Utility sink', 'Better ventilation', 'Water softener', 'Ergonomics'];

  function toggleGoal(g: string) {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  }

  function plan() {
    const size = parseFloat(roomSize);
    let picks = [...upgrades];
    if (!hasGas) picks = picks.filter(u => u.name !== 'Gas Dryer Ventilation');
    if (!goals.includes('Utility sink')) picks = picks.filter(u => u.name !== 'Utility Sink Installation');
    if (!goals.includes('Folding station')) picks = picks.filter(u => u.name !== 'Folding Station / Countertop');
    if (size < 40) picks = picks.filter(u => u.priority <= 2);
    const sorted = picks.sort((a, b) => a.priority - b.priority).slice(0, 5);
    const minTotal = sorted.reduce((s, u) => s + parseInt(u.cost.split('–')[0].replace(/,/g, '')), 0);
    const maxTotal = sorted.reduce((s, u) => s + parseInt(u.cost.split('–')[1].replace(/,/g, '')), 0);
    setResult({ priorities: sorted, total: `$${minTotal.toLocaleString()}–$${maxTotal.toLocaleString()}` });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME ORGANIZATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Laundry Room Upgrade Guide — Dallas-Fort Worth 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32, maxWidth: 680 }}>DFW hard water silently destroys washing machines. A $1,200 water softener can extend machine life by 5+ years. Lint trap maintenance prevents the leading cause of DFW house fires.</p>

        <div style={{ background: '#1a0000', border: '1px solid #7f1d1d', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 10 }}>🔥 FIRE SAFETY: Dryer Lint Trap Maintenance</div>
          <div style={{ color: '#fca5a5', fontSize: 14, marginBottom: 8 }}>Dryer fires are the #1 appliance-related fire in Texas homes. DFW lint accumulates faster in high-humidity months. Clean the lint trap after EVERY load. Clean the dryer vent duct annually ($80–150 professional service).</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Warning signs: dryer running hot, clothes taking 2+ cycles to dry, burning smell, exterior vent flap not opening properly.</div>
        </div>

        <div style={{ background: '#0a1a0a', border: '1px solid #14532d', borderRadius: 12, padding: 20, marginBottom: 40 }}>
          <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 10 }}>💧 DFW Hard Water Warning Signs</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 6 }}>
            {hardWaterSigns.map(s => <div key={s} style={{ color: '#94a3b8', fontSize: 13, padding: '4px 0' }}>• {s}</div>)}
          </div>
          <div style={{ marginTop: 12, color: '#22c55e', fontSize: 13 }}>DFW water averages 300–400 ppm hardness (very hard). A water softener pays for itself in extended appliance life and detergent savings within 3–4 years.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
          {upgrades.map(u => (
            <div key={u.name} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>P{u.priority}</div>
              </div>
              <div style={{ color: '#22c55e', fontSize: 13, marginBottom: 6 }}>${u.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{u.why}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Renovation Priority Planner</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Laundry room sq footage</label>
              <input value={roomSize} onChange={e => setRoomSize(e.target.value)} type="number" placeholder="e.g. 60" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 22 }}>
              <input type="checkbox" checked={hasGas} onChange={e => setHasGas(e.target.checked)} id="gas" />
              <label htmlFor="gas" style={{ color: '#94a3b8', fontSize: 14, cursor: 'pointer' }}>Gas dryer installed</label>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>Upgrade goals (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {goalOptions.map(g => (
                <button key={g} onClick={() => toggleGoal(g)} style={{ background: goals.includes(g) ? '#F5E642' : '#0A1628', color: goals.includes(g) ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 6, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>{g}</button>
              ))}
            </div>
          </div>
          <button onClick={plan} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Build Priority List →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Your Prioritized Upgrade List — Est. {result.total}</div>
              {result.priorities.map((u, i) => (
                <div key={u.name} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>#{i + 1}</div>
                  <div><div style={{ color: '#fff', fontSize: 14 }}>{u.name} — <span style={{ color: '#22c55e' }}>${u.cost}</span></div><div style={{ color: '#64748b', fontSize: 12 }}>{u.why}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
