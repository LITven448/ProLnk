import { useState } from 'react';

export default function DFWConcreteDrivewayVsAsphalt2026() {
  const [situation, setSituation] = useState('');
  const [budget, setBudget] = useState('');
  const [rec, setRec] = useState('');

  const situations = ['New construction', 'Replacing cracked driveway', 'Long driveway', 'HOA restrictions'];
  const budgets = ['Under $5K', '$5K–$12K', '$12K–$25K', '$25K+'];

  const getRecommendation = () => {
    if (!situation || !budget) return;
    if (budget === 'Under $5K') setRec('🟨 Asphalt — lowest upfront cost, but expect softening in DFW summer heat above 100°F. Seal annually.');
    else if (budget === '$5K–$12K') setRec('🟩 Concrete — best value for DFW. Rigid in heat, 30+ yr lifespan, no summer softening. Slightly higher upfront.');
    else if (budget === '$12K–$25K') setRec('🟩 Concrete or Exposed Aggregate — decorative options available. Handles DFW clay soil movement better with control joints.');
    else setRec('🏆 Pavers — premium choice. Individual unit replacement, longest lifespan (50+ yrs), handles soil shift gracefully. Best curb appeal.');
  };

  const materials = [
    { name: 'Concrete', icon: '🏗️', cost: '$6–$12/sq ft', life: '30–50 yrs', dfwNote: 'Stays rigid in 100°F+ heat', pro: 'Low maintenance', con: 'Cracks from clay soil shift' },
    { name: 'Asphalt', icon: '🛣️', cost: '$3–$7/sq ft', life: '15–25 yrs', dfwNote: 'Softens at DFW summer temps', pro: 'Lowest cost', con: 'Needs annual sealing in DFW' },
    { name: 'Pavers', icon: '🧱', cost: '$15–$30/sq ft', life: '50+ yrs', dfwNote: 'Individual units flex with soil', pro: 'Easy repair, premium look', con: 'Highest upfront cost' },
    { name: 'Gravel', icon: '🪨', cost: '$1–$3/sq ft', life: 'Ongoing', dfwNote: 'No softening, good drainage', pro: 'Ultra-low cost', con: 'Messy, not HOA-friendly' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🚗</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Concrete vs Asphalt Driveway 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Material guide built for DFW heat, clay soil, and HOA rules</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginBottom: 32 }}>
          {materials.map(m => (
            <div key={m.name} style={{ background: '#1e2d45', borderRadius: 12, padding: 16, border: '1px solid #2d4a6b' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{m.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, margin: '4px 0′ }}>💰 {m.cost} | ⏳ {m.life}</div>
              <div style={{ color: '#f97316', fontSize: 12, marginBottom: 6 }}>☀️ DFW: {m.dfwNote}</div>
              <div style={{ fontSize: 12 }}>✅ {m.pro}</div>
              <div style={{ fontSize: 12, color: '#f87171′ }}>⚠️ {m.con}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 Get Your DFW Driveway Recommendation</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Your situation:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSituation(s)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: situation === s ? '#F5E642′ : '#0A1628', color: situation === s ? '#0A1628' : '#fff', fontSize: 12 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Budget:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {budgets.map(b => (
                <button key={b} onClick={() => setBudget(b)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: budget === b ? '#F5E642′ : '#0A1628', color: budget === b ? '#0A1628' : '#fff', fontSize: 12 }}>{b}</button>
              ))}
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Recommendation →</button>
          {rec && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.5 }}>{rec}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 16, fontSize: 13, color: '#94a3b8′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>☀️ DFW Climate Reality</div>
          DFW summers regularly hit 100–110°F. Asphalt softens above 120°F surface temp (common on dark driveways). Concrete is rigid but can crack from expansive clay soil — use 4–6" thickness + control joints every 10 ft.
        </div>
      </div>
    </div>
  );
}
