import { useState } from 'react';

export default function DFWPoolSummerGuide2026() {
  const [poolSize, setPoolSize] = useState('');
  const [situation, setSituation] = useState('');
  const [guide, setGuide] = useState<string[]>([]);

  const getGuide = () => {
    const tips: string[] = [];
    const gallons = parseFloat(poolSize);

    tips.push('☀️ DFW SUMMER ESSENTIALS (95°F+ days are the norm June-August):');
    tips.push('🌡️ Chlorine demand: At 95°F, chlorine burns off 2x faster than spring. Maintain 3-5 ppm free chlorine (vs 2-4 ppm other seasons).');
    tips.push('💧 Evaporation: Expect 1-2 inches per week in DFW summer. Top off with garden hose — but watch calcium hardness creep up as water evaporates.');
    tips.push('⏱️ Pump runtime: Run pump 9-12 hrs/day in summer (vs 6-8 hrs in spring/fall). Peak heat from noon-6pm — run pump through these hours.');

    if (!isNaN(gallons) && gallons > 0) {
      const shock = (gallons / 10000 * 1.5).toFixed(1);
      tips.push(`🧪 Your pool (${gallons.toLocaleString()} gal): shock with ${shock} lbs calcium hypochlorite weekly in peak summer.`);
    }

    if (situation === 'heavy_use') {
      tips.push('👨‍👩‍👧‍👦 Heavy bather load: Sunscreen and body oils consume chlorine fast. Shock after every pool party. Consider phosphate remover monthly.');
    } else if (situation === 'algae') {
      tips.push('🌿 Algae risk: DFW summer heat + high bather load = algae risk. Add polyquat algaecide weekly as prevention. Test water every 3-4 days.');
    } else if (situation === 'drought') {
      tips.push('🚱 Drought restrictions: Use a pool cover to cut evaporation by up to 95%. Backwash only when pressure rises 8-10 psi above normal.');
    } else if (situation === 'vacation') {
      tips.push('🏖️ Leaving for vacation: Super-chlorinate before leaving, add algaecide, set pump to run 10 hrs/day on timer. Have neighbor check water level weekly.');
    }

    tips.push('🔆 UV note: DFW UV index regularly hits 10-11 in summer. CYA stabilizer (30-80 ppm) is essential to prevent rapid chlorine loss.');
    setGuide(tips);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>☀️ DFW Pool Summer Management 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 24 }}>DFW summers are brutal on pools. 100°F+ days, intense UV, and heavy use demand a different maintenance strategy than the rest of the year.</p>

        <div style={{ marginBottom: 20 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 6, fontSize: 14 }}>Pool Size (gallons)</label>
          <input value={poolSize} onChange={e => setPoolSize(e.target.value)} placeholder='e.g. 15000'
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #F5E642', backgroundColor: '#0d1e36', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 8 }}>Your Summer Situation</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{v:'heavy_use',l:'👨‍👩‍👧 Heavy Pool Use'},{v:'algae',l:'🌿 Algae Concerns'},{v:'drought',l:'🚱 Drought Restrictions'},{v:'vacation',l:'🏖️ Going on Vacation'}].map(({v,l}) => (
              <button key={v} onClick={() => setSituation(v)}
                style={{ padding: '12px', borderRadius: 8, border: `2px solid ${situation===v?'#F5E642':'#1e3a5f'}`, backgroundColor: situation===v?'#F5E642':'#0d1e36', color: situation===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Get My Summer Management Guide
        </button>

        {guide.length > 0 && (
          <div style={{ backgroundColor: '#0d1e36', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>🗂️ Your Summer Pool Guide</h2>
            {guide.map((tip, i) => (
              <p key={i} style={{ marginBottom: 10, color: '#ddd', lineHeight: 1.6 }}>{tip}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
