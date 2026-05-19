import { useState } from 'react';

type DeckType = 'wood' | 'composite' | '';
const deckSchedules: Record<'wood' | 'composite', { age: string; tasks: { task: string; cost: string; freq: string }[] }[]> = {
  wood: [
    { age: 'Year 1', tasks: [
      { task: 'Clean deck with oxygen bleach solution', cost: '$0–$80 DIY', freq: 'Spring' },
      { task: 'Inspect all boards for rot, splitting, looseness', cost: '$0 DIY', freq: 'Spring' },
      { task: 'Check railings — push test every section', cost: '$0 DIY', freq: 'Spring' },
      { task: 'Apply oil-based penetrating sealer', cost: '$150–$400 DIY / $600–$1,200 pro', freq: 'Spring after cleaning' },
    ]},
    { age: 'Year 2', tasks: [
      { task: 'Clean and re-inspect', cost: '$0–$80 DIY', freq: 'Spring' },
      { task: 'Spot-treat any graying boards', cost: '$20–$60 DIY', freq: 'Spring' },
      { task: 'Check ledger board for moisture intrusion', cost: '$0 DIY', freq: 'Spring' },
    ]},
    { age: 'Year 3', tasks: [
      { task: 'Full clean + re-seal (scheduled cycle)', cost: '$150–$400 DIY / $600–$1,200 pro', freq: 'Spring' },
      { task: 'Post bases — probe with screwdriver for softness', cost: '$0 DIY', freq: 'Spring' },
      { task: 'Replace any split or damaged boards', cost: '$200–$800 depending on count', freq: 'As needed' },
      { task: 'Ledger board full inspection + flashing check', cost: '$0 DIY / $150–$300 pro', freq: 'Every 3 years' },
    ]},
  ],
  composite: [
    { age: 'Year 1', tasks: [
      { task: 'Rinse with garden hose — remove debris from gaps', cost: '$0', freq: 'Spring & Fall' },
      { task: 'Scrub with composite deck cleaner', cost: '$20–$50 DIY', freq: 'Spring' },
      { task: 'Check fasteners for backing out', cost: '$0 DIY', freq: 'Annual' },
    ]},
    { age: 'Year 2', tasks: [
      { task: 'Full cleaning cycle', cost: '$20–$50 DIY', freq: 'Spring' },
      { task: 'Inspect after any large hail event — look for cracking', cost: '$0 DIY', freq: 'Post-storm' },
    ]},
    { age: 'Year 3', tasks: [
      { task: 'Full cleaning + inspect all structural connections', cost: '$20–$50 DIY', freq: 'Spring' },
      { task: 'Check ledger board attachment (applies to all deck types)', cost: '$0 DIY / $150–$300 pro', freq: 'Every 3 years' },
    ]},
  ],
};

export default function DeckMaintenanceGuide() {
  const [deckType, setDeckType] = useState<DeckType>('');
  const [deckAge, setDeckAge] = useState('');
  const [lastMaintenance, setLastMaintenance] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  const canGenerate = deckType && deckAge && lastMaintenance;

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>Home Maintenance</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: 16 }}>
            DFW Deck and Patio Maintenance Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>
            Survive Texas weather. UV index 11+, 100°F+ summers, hard freezes, and golf-ball hail demand a different maintenance approach than any other region.
          </p>
        </div>

        {/* DFW Challenge Card */}
        <div style={{ background: '#1e293b', borderRadius: 14, padding: 28, marginBottom: 40, border: '1px solid #334155′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 16 }}>🌡️ Why DFW Is Harder on Decks Than Anywhere Else</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '☀️', label: 'UV Index', val: '11+ (extreme)' },
              { icon: '🌡️', label: 'Temp Range', val: '10°F to 110°F' },
              { icon: '⛈️', label: 'Rain Events', val: 'Flash flooding common' },
              { icon: '🧊', label: 'Hail Risk', val: 'Large hail annually' },
            ].map(c => (
              <div key={c.label} style={{ background: '#0f172a', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{c.icon}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontWeight: 700, color: '#f1f5f9′ }}>{c.val}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, background: '#172033', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #3b82f6′ }}>
            <p style={{ margin: 0, color: '#93c5fd', fontSize: 15 }}>
              <strong>DFW Pro Tip:</strong> Pressure washing alone removes the protective finish on wood decks. Always apply an oil-based penetrating sealer within 48 hours of washing.
            </p>
          </div>
        </div>

        {/* Wood vs Composite */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
          {[
            { type: 'Wood Deck', icon: '🪵', bullets: ['Annual: Clean + full inspect', 'Every 2–3 yrs: Stain/seal (oil-based penetrating)', 'Every 5–7 yrs: Ledger board inspection', 'Lifespan in DFW: 10–15 years', 'Cost to replace: $8,000–$20,000'], color: '#92400e', border: '#78350f' },
            { type: 'Composite Deck', icon: '🏗️', bullets: ['Annual: Pressure wash + debris removal', 'No staining required — ever', 'Every 3 yrs: Ledger + structural check', 'Lifespan in DFW: 25–30 years', 'Cost to install: $12,000–$30,000'], color: '#1e3a5f', border: '#1e40af' },
          ].map(d => (
            <div key={d.type} style={{ background: '#1e293b', borderRadius: 14, padding: 24, border: `1px solid ${d.border}` }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{d.icon}</div>
              <h3 style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 14 }}>{d.type}</h3>
              <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#94a3b8', lineHeight: 2 }}>
                {d.bullets.map((b, i) => <li key={i} style={{ fontSize: 14 }}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Common Problems */}
        <div style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 }}>🔍 Common DFW Deck Problems</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { name: 'Ledger Board Rot', severity: 'CRITICAL', desc: 'Where the deck attaches to your house. Check annually. Repair cost: $500–$2,000. If ignored: deck collapse risk.', color: '#ef4444′ },
              { name: 'Board Splitting', severity: 'MODERATE', desc: 'Extreme heat/cold cycles crack wood fibers. Replace split boards before structural issues develop.', color: '#f97316′ },
              { name: 'Post Rot at Ground', severity: 'HIGH', desc: 'Base of deck posts at grade level. If the wood feels soft when you press it — replace that post immediately.', color: '#f59e0b' },
              { name: 'Hail Damage', severity: 'POST-STORM', desc: 'Composite boards can crack from large hail impacts. Inspect after every significant hail event.', color: '#3b82f6′ },
            ].map(p => (
              <div key={p.name} style={{ background: '#1e293b', borderRadius: 10, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start', border: '1px solid #334155′ }}>
                <span style={{ background: p.color + '20', color: p.color, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap', marginTop: 2 }}>{p.severity}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>{p.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planner */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, border: '1px solid #334155′ }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>📅 3-Year Maintenance Planner</h2>
          <p style={{ color: '#64748b', marginBottom: 28, fontSize: 15 }}>Enter your deck details to generate a personalized maintenance schedule with cost estimates.</p>

          <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Deck Type</label>
              <div style={{ display: 'flex', gap: 12 }}>
                {['wood', 'composite'].map(t => (
                  <button key={t} onClick={() => { setDeckType(t as DeckType); setShowPlan(false); }}
                    style={{ flex: 1, padding: '12px', borderRadius: 8, border: `1px solid ${deckType === t ? '#3b82f6' : '#334155'}`, background: deckType === t ? '#1d4ed8′ : '#0f172a', color: deckType === t ? '#fff' : '#94a3b8', fontWeight: 600, cursor: ’pointer', fontSize: 15, textTransform: 'capitalize' }}>
                    {t === 'wood' ? '🪵 Wood' : '🏗️ Composite'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Deck Age (years)</label>
              <input type="number" min="0″ max="50" value={deckAge} onChange={e => { setDeckAge(e.target.value); setShowPlan(false); }}
                placeholder="e.g. 7″
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Last Maintenance (year)</label>
              <input type="number" min="2015″ max="2026" value={lastMaintenance} onChange={e => { setLastMaintenance(e.target.value); setShowPlan(false); }}
                placeholder="e.g. 2023″
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>

          {canGenerate && (
            <button onClick={() => setShowPlan(true)}
              style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
              Generate My 3-Year Plan
            </button>
          )}

          {showPlan && deckType && (
            <div>
              <div style={{ marginBottom: 8, color: '#64748b', fontSize: 14 }}>
                Your plan — {deckType} deck, {deckAge} years old, last maintained {lastMaintenance}
              </div>
              {deckSchedules[deckType].map((yr, yi) => (
                <div key={yi} style={{ marginBottom: 16, background: '#0f172a', borderRadius: 12, overflow: 'hidden', border: '1px solid #334155′ }}>
                  <div style={{ background: '#1d4ed8', padding: '10px 20px', fontWeight: 700, color: '#fff' }}>{yr.age}</div>
                  {yr.tasks.map((t, ti) => (
                    <div key={ti} style={{ padding: '14px 20px', borderTop: ti > 0 ? '1px solid #1e293b' : 'none', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                      <div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 2 }}>{t.task}</div>
                        <div style={{ color: '#64748b', fontSize: 13 }}>{t.freq}</div>
                      </div>
                      <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>{t.cost}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
