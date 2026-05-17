import { useState } from 'react';

const systemTypes = [
  {
    id: 'txv',
    label: '🔬 TXV System (Thermostatic Expansion Valve)',
    method: 'Subcooling Method',
    desc: 'TXV systems self-regulate refrigerant flow. Charge by subcooling — how much the liquid refrigerant is cooled below its condensing point.',
    targets: ['DFW Summer Target: 10–15°F subcooling (typical)', 'Measure at liquid line leaving condenser', 'High ambient (100°F+): target may shift slightly higher', 'Manufacturer spec always overrides general targets'],
    overcharge: 'High subcooling (>20°F): overcharged. High head pressure, compressor stress, reduced efficiency.',
    undercharge: 'Low subcooling (<8°F): undercharged or restriction. Low suction pressure, poor cooling, possible compressor damage.',
    dfwNote: 'DFW July/August ambient temps of 100–110°F push head pressures high. Always use manufacturer subcooling chart for ambient correction.',
  },
  {
    id: 'fixed',
    label: '⚙️ Fixed Orifice System (Piston/Orifice)',
    method: 'Superheat Method',
    desc: 'Fixed orifice systems use a set metering device. Charge by superheat — how much the suction gas is heated above its boiling point.',
    targets: ['DFW Summer Target: 10–15°F superheat at evaporator, verify with chart', 'Measure at suction line near evaporator', 'Requires knowing indoor wet bulb + outdoor dry bulb', 'Use Charging Calculator: (3 × WB) - (0.28 × ODB) - 40.2'],
    overcharge: 'Low superheat (<5°F): overcharged. Liquid flooding compressor, short cycling, compressor damage.',
    undercharge: 'High superheat (>20°F): undercharged. High discharge temps, poor cooling, overheating compressor.',
    dfwNote: 'DFW attic air handler with 140°F attic temp affects wet bulb readings. Take indoor measurements at the return air grille for accuracy.',
  },
];

export default function DFWHVACSuperheatSubcool2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const sys = systemTypes.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', margin: '0.5rem 0' }}>DFW HVAC Superheat & Subcooling Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>How to properly charge refrigerant in DFW — ambient temperature changes everything</p>
        </div>

        <div style={{ background: '#0f2233', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', borderLeft: '3px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700 }}>⚠️ DFW Summer Charging Reality</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>At 100°F ambient, head pressures are 50–80 PSI higher than at 70°F. A system that looks overcharged at 9am may read normal at 2pm. Always charge during peak heat or use ambient-corrected charts.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {systemTypes.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ background: selected === s.id ? '#1e3a5f' : '#0f2233', border: `2px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '1rem', color: '#fff', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '0.8rem', fontWeight: 700 }}>Method: {s.method}</div>
            </button>
          ))}
        </div>

        {sys && (
          <div style={{ background: '#0f2233', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{sys.label}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1rem' }}>{sys.desc}</p>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: '0.5rem' }}>🎯 DFW Target Values</div>
              {sys.targets.map((t, i) => <div key={i} style={{ color: '#94a3b8', padding: '0.3rem 0', fontSize: '0.9rem', borderBottom: '1px solid #1e3a5f' }}>• {t}</div>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ background: '#1a0a0a', borderRadius: 8, padding: '0.8rem', borderLeft: '3px solid #f87171' }}>
                <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>⬆️ Overcharge Signs</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sys.overcharge}</div>
              </div>
              <div style={{ background: '#0a1a0a', borderRadius: 8, padding: '0.8rem', borderLeft: '3px solid #fbbf24' }}>
                <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem' }}>⬇️ Undercharge Signs</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sys.undercharge}</div>
              </div>
            </div>
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.3rem' }}>🌡️ DFW-Specific Note</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>{sys.dfwNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
