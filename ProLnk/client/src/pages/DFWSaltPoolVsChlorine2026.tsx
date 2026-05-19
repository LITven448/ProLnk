import { useState } from 'react';

type Priority = 'cost' | 'feel' | 'maintenance' | 'environment';

const recommendations: Record<Priority, { type: string; why: string; caveats: string[] }> = {
  cost: {
    type: '🧴 Traditional Chlorine',
    why: 'Lower upfront installation cost ($0 vs $1,500-2,500 for salt conversion). Chlorine tabs and liquid are widely available across DFW. If budget is the primary driver, stick with chlorine.',
    caveats: ['Running costs are slightly higher long-term ($300-500/year more in chemicals', 'Requires more frequent handling of chemicals', 'Consider salt only when ready to invest in full system upgrade'],
  },
  feel: {
    type: '🧂 Salt Water Pool',
    why: 'Salt water feels noticeably softer and silkier — DFW swimmers almost universally prefer the feel. Less eye and skin irritation. Hair and swimwear hold up better long-term.',
    caveats: ['Budget $1,500-2,500 for conversion of existing pool', 'DFW hard water requires quarterly salt cell cleaning — don\’t skip this', 'Still need to balance chemistry weekly — salt is not "no maintenance"'],
  },
  maintenance: {
    type: '⚖️ Either Works — Your Habits Matter More',
    why: 'Both systems require weekly chemistry testing in DFW. Salt pools need quarterly cell cleaning instead of buying chlorine tabs. Total time commitment is similar — just different tasks.',
    caveats: ['Salt: remember cell cleaning every 90 days or you\’ll lose chlorine output', 'Chlorine: remember to check tabs weekly — DFW heat burns through tabs fast', 'Automation + either system is the real maintenance reducer'],
  },
  environment: {
    type: '🧂 Salt Water Pool (Slight Edge)',
    why: 'Salt pools use less packaged chemical, reducing plastic waste and manufacturing footprint. Lower cyanuric acid (stabilizer) accumulation over time. Both systems are safe for DFW environment.',
    caveats: ['Salt discharge at drain/backwash time — check local ordinances for soil impact near landscaping', 'Manufacturing a salt cell has its own environmental cost', 'Variable-speed pump (required for most salt systems) reduces energy use significantly'],
  },
};

export default function DFWSaltPoolVsChlorine2026() {
  const [selected, setSelected] = useState<Priority | null>(null);
  const rec = selected ? recommendations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚖️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Salt Pool vs Traditional Chlorine 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            The definitive comparison for DFW pool owners. Both systems produce the same sanitizer (chlorine).
            The differences are in cost, feel, and maintenance habits.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { system: '🧂 Salt Water', items: ['Softer water feel', 'Lower long-term chemical cost', '$1,500-2,500 upfront conversion', 'Quarterly cell cleaning required', 'DFW hard water = calcium on cell', 'Variable-speed pump recommended'] },
            { system: '🧴 Traditional Chlorine', items: ['Lower installation cost', 'Flexible chemical options', 'Higher ongoing tab/liquid cost', 'No cell to clean', 'Works with any pump type', 'Proven technology in any climate'] },
          ].map(col => (
            <div key={col.system} style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.25rem', border: '1px solid #2d4a7a' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>{col.system}</div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {col.items.map(i => <li key={i} style={{ color: '#e2e8f0', marginBottom: '0.35rem', fontSize: '0.875rem' }}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🌡️ DFW Climate — Both Systems Work</h2>
          <p style={{ color: '#94a3b8′ }}>Neither salt nor chlorine has a meaningful advantage in DFW’s climate. Both handle the 9-month swim season fine. The key DFW variable is hard water: it accelerates calcium scaling on salt cells and can cloud chlorine pools if not managed. Test weekly either way, and the DFW climate is very manageable for both systems.</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Your Priority → Pool Type Recommendation</h2>
          <p style={{ color: '#94a3b8', marginTop: 0, marginBottom: '1rem' }}>What matters most to you?</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {([['cost','💰 Lowest Cost'],['feel','✨ Best Water Feel'],['maintenance','🔧 Least Maintenance'],['environment','🌿 Environmental Impact']] as [Priority,string][]).map(([id, label]) => (
              <button key={id} onClick={() => setSelected(id === selected ? null : id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === id ? '#F5E642′ : '#2d4a7a', background: selected === id ? '#F5E642' : '#0A1628', color: selected === id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {label}
              </button>
            ))}
          </div>
          {rec && (
            <div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Recommendation: {rec.type}</div>
              <p style={{ color: '#e2e8f0', marginBottom: '0.75rem' }}>{rec.why}</p>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Important caveats:</div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                {rec.caveats.map(c => <li key={c} style={{ color: '#94a3b8', marginBottom: '0.35rem', fontSize: '0.875rem' }}>{c}</li>)}
              </ul>
            </div>
          )}
          {!selected && <p style={{ color: '#94a3b8′ }}>Select your top priority above to get a DFW-specific pool system recommendation.</p>}
        </div>
      </div>
    </div>
  );
}