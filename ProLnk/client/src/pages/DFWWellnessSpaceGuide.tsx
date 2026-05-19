import { useState } from 'react';

const wellnessTypes = [
  { type: 'Meditation / Mindfulness Room', minSqft: 80, cost: '$1,500-6,000', requirements: ['Soundproofing or white noise machine', 'Blackout curtains or shades', 'Natural materials (wood, stone)', 'Dedicated HVAC or mini-split'], icon: '🧘' },
  { type: 'Yoga Studio', minSqft: 150, cost: '$3,000-12,000', requirements: ['Sprung or cork floor (knee protection)', 'Full-length mirrors (form check)', 'Dedicated ventilation (yoga heats quickly)', 'Clearance: 7ft ceiling minimum'], icon: '🧘‍♀️' },
  { type: 'Home Spa / Massage Room', minSqft: 120, cost: '$5,000-20,000', requirements: ['Heated floor (hydronic or electric)', 'Dimmer switches + warm bulbs (2700K)', 'Massage table clearance (6ft x 10ft)', 'Aromatherapy-ready ventilation'], icon: '💆' },
  { type: 'Infrared Sauna', minSqft: 40, cost: '$4,000-15,000', requirements: ['220V dedicated circuit (electrician required)', 'Cedar or hemlock interior', 'Proper ventilation — moisture management', 'DFW climate: dehumidification in humid months'], icon: '🌡️' },
  { type: 'Cold Plunge + Recovery', minSqft: 60, cost: '$8,000-25,000', requirements: ['Drain and water line required', 'Chiller unit (DFW ambient too warm without)', 'Non-slip surround', 'Towel warming station'], icon: '🧊' },
];

export default function DFWWellnessSpaceGuide() {
  const [sqftAvail, setSqftAvail] = useState('150');
  const [wellnessGoal, setWellnessGoal] = useState('meditation');
  const [budget, setBudget] = useState('8000');
  const [result, setResult] = useState<null | { type: typeof wellnessTypes[0]; feasible: boolean; note: string; totalRange: string }>(null);

  const goalMap: Record<string, string> = {
    meditation: 'Meditation / Mindfulness Room',
    yoga: 'Yoga Studio',
    spa: 'Home Spa / Massage Room',
    sauna: 'Infrared Sauna',
    recovery: 'Cold Plunge + Recovery',
  };

  function calculate() {
    const sqft = parseInt(sqftAvail) || 150;
    const b = parseInt(budget) || 8000;
    const targetName = goalMap[wellnessGoal];
    const target = wellnessTypes.find(w => w.type === targetName) || wellnessTypes[0];
    const feasible = sqft >= target.minSqft;
    const costLow = parseInt(target.cost.replace(/\D.*/, ''));
    const costHigh = parseInt(target.cost.split('-')[1]?.replace(/\D/g, '') || '0');
    let note = feasible
      ? `Your ${sqft} sqft space comfortably fits a ${target.type} (minimum ${target.minSqft} sqft needed).`
      : `Your ${sqft} sqft space is below the ${target.minSqft} sqft minimum for a ${target.type}. Consider a smaller alternative or combining spaces.`;
    if (b < costLow) note += ` Note: your budget of $${b.toLocaleString()} may be tight — minimum recommended is $${costLow.toLocaleString()}.`;
    setResult({ type: target, feasible, note, totalRange: target.cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Wellness Space Design Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW homes average 2,500+ sqft — most have a spare room that can become a daily wellness sanctuary. This is the fastest-growing home upgrade category in 2026.</p>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: '16px 20px', marginBottom: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, textAlign: 'center' }}>
          <div><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>+22%</div><div style={{ fontSize: 12, color: '#94a3b8' }}>wellness space requests in DFW 2025-26</div></div>
          <div><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>$12K</div><div style={{ fontSize: 12, color: '#94a3b8' }}>avg DFW wellness conversion spend</div></div>
          <div><div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642' }}>60%</div><div style={{ fontSize: 12, color: '#94a3b8' }}>recoup at resale (vs 45% national avg)</div></div>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌿 Wellness Space Options</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {wellnessTypes.map(w => (
            <div key={w.type} style={{ background: '#1e293b', borderRadius: 10, padding: '16px 18px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 22 }}>{w.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{w.type}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>Min: {w.minSqft} sqft</div>
                  </div>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 14 }}>{w.cost}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {w.requirements.map((r, i) => (
                  <span key={i} style={{ fontSize: 12, background: '#0A1628', padding: '4px 8px', borderRadius: 4, color: '#94a3b8' }}>✓ {r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Wellness Space Planner</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Available Sq Footage</label>
              <input type="number" value={sqftAvail} onChange={e => setSqftAvail(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Wellness Goal</label>
              <select value={wellnessGoal} onChange={e => setWellnessGoal(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="meditation">Meditation / Mindfulness</option>
                <option value="yoga">Yoga Studio</option>
                <option value="spa">Home Spa / Massage</option>
                <option value="sauna">Infrared Sauna</option>
                <option value="recovery">Cold Plunge / Recovery</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Budget: ${parseInt(budget).toLocaleString()}</label>
            <input type="range" min="1500" max="25000" step="500" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8' }}><span>$1.5K</span><span>$25K</span></div>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Design My Wellness Space →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', border: `1px solid ${result.feasible ? '#F5E642' : '#f87171'}` }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontWeight: 700 }}>{result.type.icon} Your Wellness Space Plan</h3>
            <div style={{ background: result.feasible ? '#14532d30' : '#7f1d1d30', border: `1px solid ${result.feasible ? '#4ade80' : '#f87171'}`, borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14 }}>
              {result.feasible ? '✅' : '⚠️'} {result.note}
            </div>
            <div style={{ marginBottom: 16 }}><strong>Requirements for {result.type.type}:</strong>
              <ul style={{ marginTop: 8, paddingLeft: 20 }}>{result.type.requirements.map((r, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: 6 }}>{r}</li>)}</ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Cost Range: </span>{result.totalRange}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
