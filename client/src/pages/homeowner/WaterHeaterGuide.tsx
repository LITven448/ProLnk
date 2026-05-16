import { useState } from 'react';

const types = [
  { name: 'Tank (Standard)', emoji: '🪣', lifespan: '8–12 yrs', cost: '$800–$1,500', pros: 'Low upfront cost, easy install', cons: 'Standby heat loss, runs out of hot water' },
  { name: 'Tankless', emoji: '⚡', lifespan: '15–20 yrs', cost: '$1,500–$3,500', pros: 'Endless hot water, energy efficient', cons: 'High upfront cost, gas line may need upgrade' },
  { name: 'Hybrid Heat Pump', emoji: '♻️', lifespan: '10–15 yrs', cost: '$1,200–$2,500', pros: 'Most energy efficient, rebates available', cons: 'Needs 1,000 sq ft of space, slower recovery' },
];

const symptoms = [
  { id: 'rust', label: 'Rusty or discolored water' },
  { id: 'noise', label: 'Rumbling or popping noises' },
  { id: 'leak', label: 'Visible leaks or pooling water' },
  { id: 'cold', label: 'Not heating consistently' },
  { id: 'smell', label: 'Sulfur or metallic smell' },
];

export default function WaterHeaterGuide() {
  const [age, setAge] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<null | { action: string; reason: string; cost: string }>(null);

  const toggleSymptom = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const analyze = () => {
    const a = parseInt(age, 10);
    const serious = selected.includes('leak') || selected.includes('rust');
    if (isNaN(a)) return;
    if (a >= 10 || (a >= 7 && serious)) {
      setResult({ action: 'Replace', reason: 'Your water heater is past or near end of life — repair costs rarely pay off at this stage. DFW hard water accelerates mineral buildup and corrosion, making replacement the smarter investment.', cost: '$800–$3,500 depending on type' });
    } else if (a < 5 && !serious) {
      setResult({ action: 'Repair', reason: 'Your unit is relatively young with minor symptoms. A flush, anode rod replacement, or thermostat fix is likely all you need.', cost: '$150–$450 for typical repairs' });
    } else {
      setResult({ action: 'Repair + Monitor', reason: 'Your heater is mid-life. Repair now but start budgeting for replacement within 2–3 years. DFW hard water deposits can shorten lifespan — consider a water softener.', cost: '$200–$500 repair; plan $1,000+ for future replacement' });
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4d 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🚿</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px' }}>Water Heater Guide</h1>
        <p style={{ color: '#F5E642', fontWeight: 600, fontSize: 16, margin: 0 }}>DFW Homeowner Edition — Hard Water, Hot Summers & Smart Choices</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚠️ DFW Hard Water Warning</h2>
          <p style={{ color: '#b0b8cc', lineHeight: 1.7 }}>
            North Texas has some of the hardest water in the country — 15–25 grains per gallon in many DFW cities. This accelerates mineral buildup inside your tank, forcing your heater to work harder and shortening its lifespan by 2–4 years. Flushing your tank annually and installing a water softener can save thousands.
          </p>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Compare Water Heater Types</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {types.map(t => (
              <div key={t.name} style={{ background: '#111f3a', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{t.emoji}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{t.name}</h3>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{t.cost}</div>
                <div style={{ color: '#8a9ab5', fontSize: 13, marginBottom: 4 }}>⏱ Lifespan: {t.lifespan}</div>
                <div style={{ color: '#6bcf8a', fontSize: 13, marginBottom: 4 }}>✅ {t.pros}</div>
                <div style={{ color: '#e07070', fontSize: 13 }}>❌ {t.cons}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>💧 Hard Water Impact by City</h2>
          <div style={{ background: '#111f3a', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
            {[['Dallas', '19 gpg', 'Very Hard — flush every 6 months'], ['Fort Worth', '17 gpg', 'Very Hard — water softener recommended'], ['Plano', '22 gpg', 'Extremely Hard — tank life -3 yrs'], ['Arlington', '16 gpg', 'Hard — annual flush minimum'], ['Frisco', '20 gpg', 'Very Hard — consider tankless']].map(([city, gpg, note], i) => (
              <div key={city} style={{ display: 'grid', gridTemplateColumns: '140px 100px 1fr', gap: 12, padding: '14px 20px', background: i % 2 === 0 ? 'transparent' : '#0d1930', borderTop: i > 0 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ fontWeight: 600 }}>{city}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{gpg}</span>
                <span style={{ color: '#8a9ab5', fontSize: 14 }}>{note}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48, background: '#111f3a', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>🔧 Repair or Replace? Quiz</h2>
          <p style={{ color: '#8a9ab5', marginBottom: 24 }}>Answer two quick questions for a personalized recommendation.</p>

          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>How old is your water heater?</label>
          <input
            type="number"
            value={age}
            onChange={e => { setAge(e.target.value); setResult(null); }}
            placeholder="Enter years (e.g. 9)"
            style={{ background: '#0A1628', border: '1px solid #2a4a7a', color: '#fff', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box', marginBottom: 24 }}
          />

          <label style={{ display: 'block', marginBottom: 12, fontWeight: 600 }}>Select any symptoms you notice:</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {symptoms.map(s => (
              <button
                key={s.id}
                onClick={() => toggleSymptom(s.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid', borderColor: selected.includes(s.id) ? '#F5E642' : '#2a4a7a', background: selected.includes(s.id) ? '#F5E64222' : 'transparent', color: selected.includes(s.id) ? '#F5E642' : '#8a9ab5', cursor: 'pointer', fontSize: 14, transition: 'all 0.2s' }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button
            onClick={analyze}
            style={{ background: '#F5E642', color: '#0A1628', padding: '14px 28px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}
          >
            Get My Recommendation →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: result.action === 'Replace' ? '#3a1f1f' : result.action === 'Repair' ? '#1a3a25' : '#1f2f3a', borderRadius: 12, padding: 24, border: '1px solid #2a4a7a' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.action === 'Replace' ? '🔄' : result.action === 'Repair' ? '🔧' : '⚙️'}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Recommendation: {result.action}</h3>
              <p style={{ color: '#b0b8cc', lineHeight: 1.7, marginBottom: 12 }}>{result.reason}</p>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>Estimated Cost: {result.cost}</div>
            </div>
          )}
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>📋 Annual Maintenance Checklist</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {['Flush tank to remove sediment (every 6–12 months)', 'Test pressure relief valve annually', 'Inspect anode rod every 3–5 years', 'Check for moisture or corrosion around unit', 'Set thermostat to 120°F (ideal for DFW summers)', 'Insulate pipes if in unconditioned space'].map(item => (
              <div key={item} style={{ background: '#111f3a', borderRadius: 8, padding: '14px 20px', color: '#b0b8cc', display: 'flex', gap: 12, alignItems: 'center', border: '1px solid #1e3a5f' }}>
                <span style={{ color: '#F5E642' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #F5E642 0%, #e8d800 100%)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Ready to Replace or Upgrade?</h3>
          <p style={{ color: '#0A1628', marginBottom: 0, fontWeight: 500 }}>Get free quotes from licensed DFW plumbers through ProLnk — no pushy sales, just fair prices.</p>
        </div>
      </div>
    </div>
  );
}
