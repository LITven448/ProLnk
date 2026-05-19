import { useState } from 'react';

const coverTypes = [
  {
    id: 'safety',
    name: 'Safety Cover',
    description: 'Mesh or solid covers that support weight — required by some DFW city codes for pools over 18″ deep.',
    dfwNote: '📋 Arlington, Plano, and Frisco require ASTM F1346 safety covers or fencing for residential pools.',
    evaporationReduction: '15–25%',
    tempEffect: 'Neutral',
    costRange: '$1,200–$3,500 installed',
    pros: ['Code compliant', 'Child/pet safety', 'Keeps debris out'],
    cons: ['Manual to remove', 'No heating benefit'],
  },
  {
    id: 'automatic',
    name: 'Automatic Cover',
    description: 'Motorized retractable cover — luxury option that pays back through reduced evaporation in DFW heat.',
    dfwNote: '💧 DFW pools lose 1.5–2 inches of water per week in summer. Automatic cover cuts that 30–40%.',
    evaporationReduction: '30–40%',
    tempEffect: '+3–5°F in shoulder season',
    costRange: '$8,000–$20,000 installed',
    pros: ['One-touch operation', 'Safety compliant', 'Best evaporation control'],
    cons: ['High upfront cost', 'Requires recessed track in deck', 'Annual service needed'],
  },
  {
    id: 'solar',
    name: 'Solar Cover (Bubble Cover)',
    description: 'Counterintuitive in DFW: warms pool in spring/fall but acts as a trap in peak summer, making pools uncomfortably hot.',
    dfwNote: '🌡️ In July/August DFW, solar covers can push water to 95°F+. Remove in peak summer months.',
    evaporationReduction: '25–35%',
    tempEffect: '+8–15°F (double-edged in DFW)',
    costRange: '$80–$400 DIY',
    pros: ['Cheapest option', 'Extends swim season spring/fall', 'Easy to cut to shape'],
    cons: ['Too hot in DFW summer', 'Manual, bulky to store', 'Degrades in UV within 3–5 years'],
  },
  {
    id: 'winter',
    name: 'Winter Mesh Cover',
    description: 'Lightweight mesh for DFW off-season (Nov–Feb). DFW rarely freezes hard enough to need solid covers.',
    dfwNote: '❄️ DFW averages 3–5 freeze events per year. Mesh winter cover + freeze guard is sufficient.',
    evaporationReduction: '20–30%',
    tempEffect: 'Neutral to slight cooling',
    costRange: '$200–$700 DIY',
    pros: ['Affordable', 'Lets rain through (no pump needed)', 'Easy to remove in spring'],
    cons: ['Not safety rated', 'Won’t heat pool', 'Debris accumulates on mesh'],
  },
];

const recommend = (type: string, goals: string[]): string => {
  if (goals.includes('safety') && type === 'inground') return 'automatic';
  if (goals.includes('energy') && type === 'inground') return 'automatic';
  if (goals.includes('temperature') && type === 'inground') return 'solar';
  if (goals.includes('safety') && type === 'aboveground') return 'safety';
  if (goals.includes('energy') && type === 'aboveground') return 'solar';
  return 'safety';
};

export default function DFWSwimmingPoolCoverGuide() {
  const [poolType, setPoolType] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [result, setResult] = useState<typeof coverTypes[0] | null>(null);

  const toggleGoal = (g: string) => setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const getRecommendation = () => {
    if (!poolType || goals.length === 0) return;
    const id = recommend(poolType, goals);
    setResult(coverTypes.find(c => c.id === id) ?? null);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏊 DFW Pool Cover Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW's brutal summer evaporation, UV exposure, and occasional freeze events make cover selection more nuanced than anywhere else in Texas.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Cover Finder</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Pool Type</label>
            <select value={poolType} onChange={e => setPoolType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select pool type...</option>
              <option value="inground">In-ground pool</option>
              <option value="aboveground">Above-ground pool</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>DFW Goals (select all that apply)</label>
            {['safety', 'energy', 'temperature'].map(g => (
              <label key={g} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={goals.includes(g)} onChange={() => toggleGoal(g)} />
                <span style={{ textTransform: 'capitalize' }}>{g === 'safety' ? '🛡️ Child/pet safety' : g === 'energy' ? '💧 Reduce evaporation & water bills' : '🌡️ Control water temperature'}</span>
              </label>
            ))}
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get DFW Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32, border: '2px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>✅ Best Cover for Your DFW Pool</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{result.name}</h3>
            <p style={{ color: '#94A3B8', marginBottom: 12 }}>{result.description}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14 }}>{result.dfwNote}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div><strong>💧 Evaporation Reduction:</strong><br />{result.evaporationReduction}</div>
              <div><strong>🌡️ Temp Effect:</strong><br />{result.tempEffect}</div>
            </div>
            <div style={{ color: '#F5E642′ }}><strong>💰 Cost:</strong> {result.costRange}</div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>All Cover Types</h2>
        {coverTypes.map(c => (
          <div key={c.id} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{c.name}</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{c.description}</p>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{c.dfwNote}</div>
            <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {c.costRange} | 💧 Evap: {c.evaporationReduction}</div>
          </div>
        ))}

        <div style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginTop: 8 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 DFW Pro Tip</div>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>DFW water rates are rising. An automatic cover paying $10–15/month in reduced water and chemical costs has a 15–20 year payback on a $15K install — reasonable for a permanent in-ground pool.</p>
        </div>
      </div>
    </div>
  );
}
