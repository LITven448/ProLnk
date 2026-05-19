import { useState } from 'react';

const solutions = [
  { problem: 'Blazing Sun', fix: 'Shade Sail', detail: '14x16ft sail blocks 90% UV; $200-600 DIY install; requires 3-4 anchor points', icon: '⛵' },
  { problem: 'Scorching Floor', fix: 'Light-Colored Pavers', detail: 'Light concrete or limestone pavers stay 20-30F cooler than dark surfaces in DFW sun', icon: '🪨' },
  { problem: 'No Shade Structure', fix: 'Pergola with Vines', detail: 'Cedar pergola + wisteria or crossvine = natural AC by year 2; cost $1500-5000 DIY', icon: '🌿' },
  { problem: 'Hot Afternoon Side', fix: 'Cantilever Umbrella', detail: '11ft offset umbrella moves with sun; best for east-facing patios; $300-900', icon: '☂️' },
  { problem: 'Still Hot Air', fix: 'Outdoor Misting System', detail: 'High-pressure mist drops temp 15-25F; DFW low humidity makes misting very effective', icon: '💦' },
  { problem: 'Unusable at Night', fix: 'Smart Lighting', detail: 'String lights + pathway LEDs extend usable hours to 9pm+ even in July; solar or low-voltage', icon: '💡' },
];

const patioTypes = ['Concrete slab', 'Wood deck', 'Pavers', 'Gravel/decomposed granite', 'No patio yet'];
const goals = ['Use it midday in summer', 'Host evening gatherings', 'Create a cool retreat', 'All-day usability', 'Kid-friendly space'];

export default function DFWSummerPatioRescue() {
  const [patioType, setPatioType] = useState('');
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState<null | { priority: string; cost: string; tip: string; lighting: string }>(null);

  function generate() {
    if (!patioType || !goal) return;
    const isDeck = patioType === 'Wood deck';
    const isMidday = goal.includes('midday');
    const isEvening = goal.includes('evening');
    setPlan({
      priority: isMidday ? 'Shade sail or cantilever umbrella is your highest ROI first step - install before May' : isEvening ? 'Smart lighting + misting system transforms evening usability immediately' : 'Shade structure first, then misting, then lighting for full-day coverage',
      cost: isDeck ? '$600-2,500 total for shade + misting on deck (avoid heavy structures on wood without engineering review)' : '$400-3,000 depending on shade type; pergola is highest cost but permanent value',
      tip: isDeck ? 'Wood decks in DFW heat benefit from light-colored stain to reflect heat; re-stain every 2-3 years' : patioType === 'Concrete slab' ? 'Apply elastomeric deck coating in light gray or tan to drop surface temp 15-25F' : 'Light-colored pavers or decomposed granite stay cooler than dark concrete in DFW sun',
      lighting: 'Warm 2700K string lights on a smart plug timer - set to auto-on at sunset, off at 11pm for perfect ambiance without effort',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌡️</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F5E642', margin: '0 0 12px' }}>DFW Summer Patio Rescue</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px' }}>DFW summers average 40+ days above 100F. With the right upgrades, your patio can be genuinely comfortable and usable - even in July.</p>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🛠️ DFW Patio Problem Solvers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '16px' }}>
            {solutions.map(s => (
              <div key={s.fix} style={{ background: '#0A1628', borderRadius: '12px', padding: '18px', border: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{s.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '4px' }}>{s.fix}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '8px' }}>Solves: {s.problem}</div>
                <div style={{ fontSize: '0.83rem', color: '#94a3b8′ }}>{s.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '20px' }}>🌡️ DFW Summer Reality Check</h2>
          {[['Average days above 100F','40+ days (June-August peak)'],['Surface temp of dark concrete at noon','150-165F'],['Misting system temperature drop','15-25F in DFW low humidity'],['Best outdoor hours in July','Before 10am or after 7:30pm'],['When to install upgrades','March-April before heat arrives']].map(([k,v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{k}</span>
              <span style={{ color: '#F5E642', fontWeight: '600', fontSize: '0.9rem' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🔧 Get Your Patio Rescue Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Patio Type</label>
              <select value={patioType} onChange={e => setPatioType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select type...</option>
                {patioTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>DFW Summer Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select goal...</option>
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Get My Patio Rescue Plan</button>
          {plan && (
            <div style={{ marginTop: '24px', background: '#0A1628', borderRadius: '12px', padding: '20px', border: '1px solid #F5E642′ }}>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>🎯 Priority upgrade: </span><span style={{ color: '#94a3b8' }}>{plan.priority}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>💰 Estimated cost: </span><span style={{ color: '#94a3b8' }}>{plan.cost}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>🪨 Surface tip: </span><span style={{ color: '#94a3b8' }}>{plan.tip}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: '600′ }}>💡 Lighting: </span><span style={{ color: '#94a3b8' }}>{plan.lighting}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
