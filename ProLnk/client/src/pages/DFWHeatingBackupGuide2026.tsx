import { useState } from 'react';

export default function DFWHeatingBackupGuide2026() {
  const [features, setFeatures] = useState('');
  const [prepLevel, setPrepLevel] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!features || !prepLevel) { setResult('Please fill in all fields.'); return; }
    if (prepLevel === 'none') {
      setResult('🔴 You are not ready for a DFW freeze event. After February 2021, this is a real risk. Minimum prep: buy two 1,500W electric space heaters ($30–$60 each at Home Depot), keep them in a closet. Cost to start: $60–$120. These cover a bedroom and living area during a short outage.');
      return;
    }
    if (features === 'gas-fireplace' && prepLevel !== 'none') {
      setResult('✅ Gas fireplace is your best freeze backup. Most DFW gas fireplaces ignite without electricity (standing pilot or battery ignition). During an ERCOT outage, it can heat 400–800 sqft. Have firewood or gas logs ready. Supplement with a propane Mr. Heater ($100–$200) for bedroom heat at night.');
      return;
    }
    if (features === 'generator' && prepLevel === 'full') {
      setResult('✅ Strong preparation. A 5,000W generator powers: electric space heaters, refrigerator, lights, phone charging. Do not run in garage — CO risk. Budget $500–$2,000 for portable generator + 5-gallon gas cans. Add a Mr. Heater Buddy as backup if generator fails.');
      return;
    }
    if (features === 'none' && prepLevel === 'basic') {
      setResult('🟡 Basic prep. Electric space heaters are your primary option. Concentrate people in one room — close off the rest. A 1,500W heater keeps a well-insulated 200 sqft room at 65°F when it\’s 20°F outside. Budget $100–$200 total: two heaters + extension cord rated for 15A minimum.');
      return;
    }
    if (prepLevel === 'full') {
      setResult('✅ Well prepared. Full freeze kit: generator ($500–$2,000) + propane Mr. Heater ($100–$200) + electric space heaters ($60–$120) + 7-day food/water supply. Rotate propane canisters annually. Test generator before November each year.');
      return;
    }
    setResult('🟡 Moderate prep. Add propane Mr. Heater Buddy ($100) and one electric space heater ($40) to fill gaps. Keep a week of water (1 gallon/person/day) since DFW freeze events can disrupt water service too.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🧊❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Heating Backup Guide 2026</h1>
          <p style={{ color: '#a0aec0' }}>Lessons from February 2021 — be ready before the next DFW freeze</p>
        </div>

        <div style={{ background: '#1a0a0a', border: '2px solid #e53e3e', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#fc8181', marginTop: 0 }}>⚠️ February 2021 Was a Warning</h2>
          <p style={{ color: '#fed7d7', lineHeight: 1.6, margin: 0, fontSize: '0.9rem' }}>
            Uri left 4.5 million Texas homes without power for 2–5 days in 20°F weather. Over 200 deaths. DFW pipes froze in homes that had never needed insulation. ERCOT has improved the grid, but Texas climatologists project 1–2 similar events per decade. The question is not <em>if</em> — it's <em>when</em>.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '⚡', title: 'Electric Space Heaters', cost: '$30–$80 each', note: 'Safest indoor option. 1,500W = 5,100 BTU. Requires electricity — grid must be working. Best for short outages. Buy 2.' },
            { icon: '🔶', title: 'Propane Mr. Heater Buddy', cost: '$100–$200', note: 'Safe for indoor use with ventilation (crack a window 1 inch). One 1lb canister = 5–6 hours on low. Stockpile 10–20 canisters before November.' },
            { icon: '⛽', title: 'Generator + Heater Combo', cost: '$500–$2,500', note: 'Run generator outdoors — NEVER inside. Powers electric heaters, refrigerator, medical equipment. Get transfer switch installed by electrician ($800–$1,200).' },
            { icon: '🪵', title: 'Wood-Burning Fireplace', cost: 'Stock 1/4 cord firewood', note: 'Grid-independent heat. DFW firewood: mesquite or oak $200–$350 per cord. Store covered but not against the house. Works during any outage scenario.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#F5E642', margin: 0, fontSize: '1rem' }}>{card.title}</h3>
                <span style={{ color: '#48bb78', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: 8 }}>{card.cost}</span>
              </div>
              <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{card.note}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🛡️ Freeze Prep Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Home Features (primary)</label>
              <select value={features} onChange={e => setFeatures(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
                <option value=''>Select feature</option>
                <option value='gas-fireplace'>Gas fireplace (working)</option>
                <option value='wood-fireplace'>Wood-burning fireplace</option>
                <option value='generator'>Generator (owned)</option>
                <option value='none'>None of the above</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Current Prep Level</label>
              <select value={prepLevel} onChange={e => setPrepLevel(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
                <option value=''>Select level</option>
                <option value='none'>Nothing purchased yet</option>
                <option value='basic'>Have space heaters only</option>
                <option value='moderate'>Have heaters + propane</option>
                <option value='full'>Full kit: generator + propane + heaters</option>
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get My Plan
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>🛒 Minimum Freeze Prep Kit — Under $200</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[['2x Space Heater 1500W', '$60–$120'], ['Mr. Heater Buddy', '$100–$150'], ['10x Propane 1lb Cans', '$25–$40'], ['CO Detector', '$25–$40'], ['Pipe Insulation Foam', '$15–$30'], ['7-Day Water Supply', '$20–$30']].map(([label, val], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#a0aec0', fontSize: '0.75rem' }}>{label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4, fontSize: '0.875rem' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
