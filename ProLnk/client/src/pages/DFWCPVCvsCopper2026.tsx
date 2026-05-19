import { useState } from 'react';

type Situation = 'freeze' | 'hotwater' | 'diy' | 'budget' | 'hardwater';

const situations: { id: Situation; label: string; emoji: string }[] = [
  { id: 'freeze', label: 'Worried about DFW freeze events', emoji: '🧊' },
  { id: 'hotwater', label: 'Hot water supply line replacement', emoji: '🔥' },
  { id: 'diy', label: 'DIY-friendly install', emoji: '🔨' },
  { id: 'budget', label: 'Budget is a priority', emoji: '💰' },
  { id: 'hardwater', label: 'Concerned about DFW hard water scale', emoji: '💧' },
];

const recommendations: Record<Situation, { material: string; emoji: string; why: string }> = {
  freeze: { material: 'PEX', emoji: '🔴', why: 'PEX flexes instead of bursting during freeze — best choice for DFW freeze vulnerability' },
  hotwater: { material: 'CPVC or Copper', emoji: '🟡', why: 'Both rated for hot water; CPVC up to 180°F, copper is the proven long-term choice' },
  diy: { material: 'PEX', emoji: '🔴', why: 'Easiest to work with — push-fit or crimp fittings, no soldering required' },
  budget: { material: 'CPVC', emoji: '🟡', why: 'Lower material cost than copper, easier installation, rated for hot water use' },
  hardwater: { material: 'PEX', emoji: '🔴', why: 'Smooth plastic interior resists mineral buildup unlike copper which scales over time in DFW' },
};

const materials = [
  { name: 'Copper', emoji: '🟠', hotwater: '✅', freeze: '❌', diy: '⚠️', hardwater: '⚠️', cost: '$$$' },
  { name: 'CPVC', emoji: '🟡', hotwater: '✅', freeze: '⚠️', diy: '✅', hardwater: '✅', cost: '$$' },
  { name: 'PEX', emoji: '🔴', hotwater: '✅', freeze: '✅', diy: '✅', hardwater: '✅', cost: '$' },
];

export default function DFWCPVCvsCopper2026() {
  const [selected, setSelected] = useState<Situation | null>(null);

  const rec = selected ? recommendations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔀</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW CPVC vs Copper Plumbing Guide 2026</h1>
          <p style={{ color: '#94a3b8′ }}>Hot water pipe material comparison for DFW homes — with PEX in the mix</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📊 Quick Comparison</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ color: '#94a3b8', borderBottom: '1px solid #334155′ }}>
                <th style={{ textAlign: 'left', padding: '0.5rem' }}>Material</th>
                <th style={{ padding: '0.5rem' }}>Hot Water</th>
                <th style={{ padding: '0.5rem' }}>Freeze</th>
                <th style={{ padding: '0.5rem' }}>DIY</th>
                <th style={{ padding: '0.5rem' }}>Hard Water</th>
                <th style={{ padding: '0.5rem' }}>Cost</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(m => (
                <tr key={m.name} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '0.5rem', color: '#F5E642', fontWeight: 700 }}>{m.emoji} {m.name}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{m.hotwater}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{m.freeze}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{m.diy}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>{m.hardwater}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center', color: '#94a3b8′ }}>{m.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🎯 Situation → Recommendation</h2>
          <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#0f172a', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.75rem 1rem', textAlign: ’left', cursor: 'pointer', fontSize: '0.95rem' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{rec.emoji} Use {rec.material}</div>
              <div style={{ color: '#cbd5e1′ }}>{rec.why}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}