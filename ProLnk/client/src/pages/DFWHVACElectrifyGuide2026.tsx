import { useState } from 'react';

export default function DFWHVACElectrifyGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const appliances = [
    {
      id: 'furnace',
      gas: 'Gas Furnace',
      electric: 'Heat Pump (heating mode)',
      cost: '$4,500–$8,000',
      savings: '$400–$800/yr',
      timeline: 'Year 1–3',
      icon: '🔥',
      note: 'DFW mild winters make heat pumps ideal — COP of 3x vs gas efficiency 95%',
    },
    {
      id: 'waterheater',
      gas: 'Gas Water Heater',
      electric: 'Heat Pump Water Heater',
      cost: '$1,200–$2,000',
      savings: '$300–$500/yr',
      timeline: 'Year 1–2',
      icon: '💧',
      note: 'Install in conditioned space or garage — efficiency drops below 40°F ambient',
    },
    {
      id: 'range',
      gas: 'Gas Range',
      electric: 'Induction Range',
      cost: '$800–$2,500',
      savings: '$100–$200/yr',
      timeline: 'Year 2–5',
      icon: '🍳',
      note: 'Induction is 90% efficient vs 40% gas; faster boil times, safer for DFW homes',
    },
    {
      id: 'dryer',
      gas: 'Gas Dryer',
      electric: 'Heat Pump Dryer',
      cost: '$1,000–$1,800',
      savings: '$150–$250/yr',
      timeline: 'Year 3–6',
      icon: '👕',
      note: 'Uses 40–50% less energy; no need for gas line — just 240V outlet',
    },
  ];

  const phases = [
    { phase: 'Phase 1 (Now)', action: 'Audit current gas appliances + get utility rebates', icon: '📋' },
    { phase: 'Phase 2 (Year 1–2)', action: 'Replace water heater + HVAC at end of life', icon: '🔄' },
    { phase: 'Phase 3 (Year 3–5)', action: 'Upgrade range + dryer; add solar panels', icon: '☀️' },
    { phase: 'Phase 4 (Year 5+)', action: 'Full electrification complete — lock in Oncor TOU rate', icon: '✅' },
  ];

  const item = appliances.find(a => a.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW Home Electrification Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Going all-electric in the Dallas–Fort Worth area — appliance by appliance</p>
        </div>

        <p style={{ color: '#cbd5e1', marginBottom: 24, fontSize: 15 }}>
          DFW's mild winters and hot summers make electrification financially smart. Heat pumps outperform gas in heating efficiency here, and Oncor offers time-of-use rates that reward all-electric homes.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select an appliance to see your electrification roadmap:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {appliances.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id === selected ? null : a.id)}
              style={{ background: selected === a.id ? '#F5E642′ : '#1e2d45', border: '2px solid',
                borderColor: selected === a.id ? '#F5E642′ : '#2d3f5a', borderRadius: 10,
                padding: '16px', cursor: 'pointer', textAlign: 'left',
                color: selected === a.id ? '#0A1628′ : '#fff' }}>
              <div style={{ fontSize: 28 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{a.gas}</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>→ {a.electric}</div>
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>{item.icon} {item.gas} → {item.electric}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[{l:'Install Cost',v:item.cost},{l:'Annual Savings',v:item.savings},{l:'Timeline',v:item.timeline}].map(r => (
                <div key={r.l} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>{r.l}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{r.v}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>💡 {item.note}</p>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Full Electrification Timeline</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {phases.map(p => (
            <div key={p.phase} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 24 }}>{p.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{p.phase}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{p.action}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with DFW electricians and HVAC pros who specialize in electrification upgrades.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Get 3 transparent quotes — no markup surprises.</p>
        </div>
      </div>
    </div>
  );
}
