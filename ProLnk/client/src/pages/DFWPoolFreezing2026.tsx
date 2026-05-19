import { useState } from 'react';

const equipmentTypes = [
  { id: 'basic', label: '🔌 Basic Pump Only', plan: ['Install a freeze guard sensor ($30-80) that plugs into your pump outlet and runs pump when temps drop below 34°F', 'If pump is single-speed, run it 24/7 during freeze warnings — not ideal but protects the plumbing', 'Wrap exposed above-ground pipe and fittings with foam pipe insulation — Home Depot carries sizes for most pool pipe', 'Know your equipment shutoff valve location before the freeze — panicked searching in the dark is not the time to learn', 'Disconnect and drain any above-ground solar heating panels before a freeze — they burst easily', 'Keep one freeze event supply kit: heat gun, pipe insulation, duct tape, plumber\’s putty'] },
  { id: 'automation', label: '🤖 Automation System', plan: ['Your automation system\’s freeze protection mode is your best tool — verify it is enabled and set to 34°F trigger', 'Test freeze mode in October before DFW winter season — cycle pump manually from app', 'Confirm all equipment is on the automation circuit; items on separate breakers won\’t be protected', 'Add a backup freeze sensor on the equipment pad as a failsafe if automation loses power', 'Enable push notifications for freeze alerts from your automation app', 'Review your app\’s low-temp alert threshold — some systems default to 36°F which may not trigger soon enough'] },
  { id: 'full', label: '🏆 Full Equipment + Heater', plan: ['Run heater to maintain water at 55°F+ during extended freezes — this is the gold standard protection', 'Keep spa jets running during freeze to circulate water through the spa loop', 'Insulate heater gas line exposed sections with foam lagging — these burst first in extreme DFW freezes', 'Check pool water level before freeze: low water means exposed skimmer throat which cracks at 28°F', 'After a freeze event, inspect all unions and fittings before restarting — leaks hide behind equipment pads', 'Budget $500-2,000 for post-freeze repairs if a DFW hard freeze catches you unprepared'] },
];

export default function DFWPoolFreezing2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const plan = equipmentTypes.find(e => e.id === selected)?.plan ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Pool Freeze Protection Guide 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>
            DFW freezes are rare but catastrophic. Most pool owners are caught unprepared because it happens
            once every few years. Know your plan before temps drop.
          </p>
        </div>

        <div style={{ background: '#7f1d1d', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', border: '1px solid #ef4444′ }}>
          <div style={{ color: '#fca5a5', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ Critical: Do NOT Drain During a Freeze</div>
          <div style={{ color: '#fecaca', fontSize: '0.875rem' }}>Draining a pool during a freeze event causes hydrostatic pressure from groundwater to lift and crack the shell. A cracked plaster or fiberglass shell costs $10,000-30,000 to repair. Keep water in the pool — flowing water is your protection.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌡️', label: 'Trigger at 34°F', desc: 'Run pump whenever temps approach freezing — water movement prevents ice in pipes' },
            { icon: '🧱', label: 'Insulate Pipes', desc: 'Foam pipe insulation on exposed above-ground plumbing is cheap insurance' },
            { icon: '🔥', label: 'Heater = Best Defense', desc: 'Maintaining 55°F water temp prevents freeze damage even in extended DFW cold snaps' },
            { icon: '🔧', label: 'Post-Freeze Inspection', desc: 'Check all unions and fittings before restarting after any freeze event' },
          ].map(c => (
            <div key={c.label} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem', border: '1px solid #2d4a7a' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', border: '1px solid #2d4a7a' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🛡️ Pool Equipment Setup → Freeze Protection Plan</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {equipmentTypes.map(e => (
              <button key={e.id} onClick={() => setSelected(e.id === selected ? null : e.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, border: '2px solid', borderColor: selected === e.id ? '#F5E642′ : '#2d4a7a', background: selected === e.id ? '#F5E642' : '#0A1628', color: selected === e.id ? '#0A1628' : '#fff', cursor: ’pointer', fontWeight: 600 }}>
                {e.label}
              </button>
            ))}
          </div>
          {plan.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {plan.map(p => <li key={p} style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}>{p}</li>)}
            </ul>
          )}
          {!selected && <p style={{ color: '#94a3b8′ }}>Select your equipment type above to see your personalized DFW freeze protection plan.</p>}
        </div>
      </div>
    </div>
  );
}