import { useState } from 'react';

const homeFeatures = ['Older pipes (pre-1990)', 'Pier & beam foundation', 'Two-story home', 'Well water / private well', 'Electric-only heat', 'Attached garage'];
const priorDamage = ['Burst pipes', 'Power outage 24h+', 'Frozen HVAC', 'Roof ice dam', 'No prior damage', 'Multiple issues'];

const prepPlans: Record<string, { priority: string[]; cost: string; next48: string[] }> = {
  'Older pipes (pre-1990)|Burst pipes': {
    priority: ['Insulate all exposed pipes immediately (foam sleeves)', 'Locate and label main shutoff valve', 'Install pipe heating cables on vulnerable runs', 'Replace galvanized pipes in crawl space', 'Add backup water storage (5–10 gallons)'],
    cost: '$400–$2,500',
    next48: ['Set heat to 68°F minimum — never lower', 'Open cabinet doors under sinks', 'Let faucets drip slowly', 'Know location of main shutoff', 'Fill bathtubs as water reserve'],
  },
  'Electric-only heat|Power outage 24h+': {
    priority: ['Portable propane or kerosene heater (safe indoor model)', 'Whole-home generator or 10kW battery backup', 'Insulate interior doors to shrink heated zone', 'Stock 72-hour supply of food/water', 'Identify warm public shelter locations'],
    cost: '$800–$6,000',
    next48: ['Charge all battery banks fully', 'Fill gas cans (stabilizer added)', 'Move pets and plants to interior rooms', 'Identify warmest interior room as shelter zone', 'Alert neighbors — check on elderly'],
  },
};

function getPlan(feature: string, damage: string) {
  const key = `${feature}|${damage}`;
  return prepPlans[key] || {
    priority: ['Insulate all exterior pipes (foam sleeves + heat tape)', 'Stock 72-hour food, water, and medication supply', 'Purchase portable generator or battery backup', 'Weatherstrip all doors and windows', 'Identify neighbors who may need help'],
    cost: '$600–$3,200',
    next48: ['Set heat no lower than 68°F', 'Drip faucets connected to exterior walls', 'Charge devices and battery banks', 'Fill car with gas and check antifreeze', 'Stock up on food before storm hits'],
  };
}

export default function DFWIceStormPrepGuide() {
  const [feature, setFeature] = useState('');
  const [damage, setDamage] = useState('');
  const [result, setResult] = useState<{ priority: string[]; cost: string; next48: string[] } | null>(null);

  function handleSubmit() {
    if (!feature || !damage) return;
    setResult(getPlan(feature, damage));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🧊 DFW Ice Storm Prep Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
          February 2021 proved DFW homes are not built for sustained freezing. Millions lost power, pipes burst across the metroplex, and hundreds died. Here's how to not repeat those lessons.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>📋 Top 5 Feb 2021 Failure Points</div>
          {[['🚿', 'Burst pipes', 'DFW pipes run in exterior walls without insulation — assume yours are vulnerable'],
            ['⚡', 'Extended power outages', 'ERCOT grid failure left millions without heat for 4–7 days'],
            ['🔥', 'No alternative heat', 'Electric-only homes had zero backup when grid went down'],
            ['💧', 'Water supply failure', 'Utility pressure dropped citywide — water storage saved lives'],
            ['🚗', 'Unprepared vehicles', 'Black ice on roads + no winter tires = stranded when supplies ran out'],
          ].map(([emoji, title, desc]) => (
            <div key={title} style={{ marginBottom: '0.85rem', display: 'flex', gap: '0.75rem' }}>
              <span>{emoji}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Ice Storm Priority Plan</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Home Feature That Concerns You Most</label>
            <select value={feature} onChange={e => setFeature(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select feature...</option>
              {homeFeatures.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Prior Ice Storm Damage</label>
            <select value={damage} onChange={e => setDamage(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select damage type...</option>
              {priorDamage.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Build My Prep Plan →
          </button>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #F5E642' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🛡️ Priority Prep Investments</div>
              {result.priority.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642' }}>▸</span>
                  <span style={{ color: '#e2e8f0' }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', color: '#F5E642', fontWeight: 600 }}>
                💰 Estimated Cost: {result.cost}
              </div>
            </div>
            <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #334155' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>⏱️ When Storm is 48 Hours Out</div>
              {result.next48.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#22c55e' }}>✓</span>
                  <span style={{ color: '#e2e8f0' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
