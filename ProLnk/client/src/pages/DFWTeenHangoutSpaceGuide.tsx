import { useState } from 'react';

const spaceTypes = [
  { type: 'Bonus Room', pros: 'Climate controlled, already permitted, easiest conversion', cons: 'No separate entrance, parents walk through', cost: '$3,000-8,000′ },
  { type: 'Detached Garage', pros: 'Separate entrance, soundproof potential, max privacy', cons: 'Needs HVAC, insulation, permits', cost: '$12,000-25,000′ },
  { type: 'Attached Garage', pros: 'Partial climate control, separate door', cons: 'HOA restrictions common in DFW suburbs', cost: '$8,000-18,000′ },
  { type: 'Basement (rare in DFW)', pros: 'Natural temperature stability, total separation', cons: 'Very rare in DFW — moisture management critical', cost: '$15,000-30,000′ },
];

export default function DFWTeenHangoutSpaceGuide() {
  const [spaceType, setSpaceType] = useState('bonus');
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState('10000');
  const [result, setResult] = useState<null | { setup: string[]; upgrades: string[]; cost: string; warning?: string }>(null);

  const toggleInterest = (i: string) => setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  function calculate() {
    const b = parseInt(budget) || 10000;
    const setup: string[] = ['Sectional sofa or gaming chairs', 'Mini fridge (essential)'];
    const upgrades: string[] = [];
    if (interests.includes('gaming')) { setup.push('65″+ TV with low-latency mode', 'Gaming PC or console zone', 'RGB ambient lighting'); }
    if (interests.includes('music')) { setup.push('Acoustic panels (DFW open floors echo badly)'); upgrades.push('Soundproofing foam on shared walls'); }
    if (interests.includes('fitness')) { setup.push('Rubber floor tiles', 'Free weights or resistance setup'); }
    if (interests.includes('art')) { setup.push('Proper task lighting (5000K)', 'Utility sink if budget allows'); }
    if (spaceType === 'garage') { upgrades.push('Mini-split HVAC (DFW heat mandatory)', 'Insulate all walls + ceiling', 'Epoxy floor or LVP', 'Permit for occupancy change'); }
    const totalLow = b * 0.85;
    const totalHigh = b * 1.15;
    const warning = spaceType === 'garage' ? 'DFW garage conversions require city permit. Verify HOA approval first — many Plano/Frisco HOAs restrict this.' : undefined;
    setResult({ setup, upgrades, cost: `$${Math.round(totalLow).toLocaleString()} – $${Math.round(totalHigh).toLocaleString()}`, warning });
  }

  const interestOptions = ['gaming', 'music', 'fitness', 'art', 'movies', 'social'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Teen Hangout Space Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW homes average 2,500+ sqft — most have a bonus room or garage that can be converted into a dedicated teen space that keeps them home and safe.</p>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📐 Space Type Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {spaceTypes.map(s => (
            <div key={s.type} style={{ background: '#1e293b', borderRadius: 10, padding: '14px 18px', border: '1px solid #334155′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{s.type} <span style={{ color: '#F5E642', fontSize: 13, marginLeft: 8 }}>{s.cost}</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13 }}>
                <div style={{ color: '#4ade80′ }}>✅ {s.pros}</div>
                <div style={{ color: '#f87171′ }}>⚠️ {s.cons}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🧮 Space Designer</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Available Space</label>
            <select value={spaceType} onChange={e => setSpaceType(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
              <option value="bonus">Bonus Room / Game Room</option>
              <option value="garage">Detached Garage</option>
              <option value="attached">Attached Garage</option>
              <option value="basement">Basement</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 10, fontSize: 14, color: '#94a3b8′ }}>Teen Interests (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {interestOptions.map(i => (
                <button key={i} onClick={() => toggleInterest(i)} style={{ padding: '8px 14px', borderRadius: 20, border: `2px solid ${interests.includes(i) ? '#F5E642' : '#334155'}`, background: interests.includes(i) ? '#F5E642′ : ’transparent', color: interests.includes(i) ? '#0A1628′ : '#fff', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                  {i.charAt(0).toUpperCase() + i.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8′ }}>Total Budget: ${parseInt(budget || '0').toLocaleString()}</label>
            <input type="range" min="3000″ max="30000" step="1000" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8′ }}><span>$3K</span><span>$30K</span></div>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Design My Teen Space →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', border: '1px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontWeight: 700 }}>🎮 Your Teen Hangout Plan</h3>
            {result.warning && <div style={{ background: '#7c3aed20', border: '1px solid #7c3aed', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#c4b5fd' }}>⚠️ {result.warning}</div>}
            <div style={{ marginBottom: 12 }}><strong>Essential Setup:</strong><ul style={{ marginTop: 6, paddingLeft: 20 }}>{result.setup.map((s, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: 4 }}>{s}</li>)}</ul></div>
            {result.upgrades.length > 0 && <div style={{ marginBottom: 12 }}><strong>Required Upgrades:</strong><ul style={{ marginTop: 6, paddingLeft: 20 }}>{result.upgrades.map((u, i) => <li key={i} style={{ color: '#fbbf24', marginBottom: 4 }}>{u}</li>)}</ul></div>}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Estimated Cost: </span>{result.cost}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
