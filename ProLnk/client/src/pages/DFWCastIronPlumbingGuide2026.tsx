import { useState } from 'react';

const symptoms = [
  { id: 'slow', label: 'Slow drains throughout house', emoji: '🐌', risk: 'High', note: 'Scale buildup or pipe sag — video inspection recommended' },
  { id: 'gurgle', label: 'Gurgling after flush', emoji: '🌀', risk: 'Medium', note: 'Partial blockage in horizontal cast iron run' },
  { id: 'odor', label: 'Sewage odor in basement', emoji: '👃', risk: 'High', note: 'Cracked cast iron joint — DFW clay movement is the likely cause' },
  { id: 'backup', label: 'Recurring backups', emoji: '🚿', risk: 'Critical', note: 'Tuberculation blocking flow — replacement strongly advised' },
  { id: 'age', label: 'Home built before 1970', emoji: '🏠', risk: 'Medium', note: 'Cast iron likely present — proactive video inspection saves money' },
];

const options = [
  { material: 'PVC', emoji: '🔵', cost: '$', notes: 'Lightweight, smooth interior, industry standard replacement' },
  { material: 'ABS', emoji: '⚫', cost: '$', notes: 'Similar to PVC, slightly more flexible, common in older retrofits' },
  { material: 'Keep Cast Iron', emoji: '🩺', cost: 'Free', notes: 'Only if video inspection shows no cracks, scale, or sag' },
];

export default function DFWCastIronPlumbingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔩</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Cast Iron Plumbing Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Pre-1970 DFW homes — what to know about cast iron drain pipes</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ Why Cast Iron Fails in DFW</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Internal corrosion builds scale that narrows pipe diameter over decades</li>
            <li>DFW expansive clay soil shifts horizontal runs — causing sags and low spots</li>
            <li>Tuberculation (iron nodules) creates rough interior that traps grease and waste</li>
            <li>Joints crack under repeated DFW clay movement cycles</li>
          </ul>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔍 Symptom → Assessment Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>Select your symptom:</p>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#0f172a', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'left', cursor: 'pointer', fontSize: '0.95rem' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: '1rem', background: '#0f172a', borderRadius: 8, padding: '1rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>Risk Level: {match.risk}</div>
              <div style={{ color: '#cbd5e1' }}>{match.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🛠️ Replacement Options</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {options.map(o => (
              <div key={o.material} style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{o.emoji}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{o.material} <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.85rem' }}>({o.cost})</span></div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{o.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}