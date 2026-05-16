import { useState } from 'react';

const symptoms = [
  { id: 'brown', label: 'Brown or rusty water at taps', emoji: '🟫', risk: 'High', note: 'Interior rust flaking off — replacement should be scheduled promptly' },
  { id: 'pressure', label: 'Weak water pressure throughout', emoji: '📉', risk: 'High', note: 'Scale buildup has narrowed pipe interior — DFW hard water accelerates this' },
  { id: 'stain', label: 'Orange stains in sinks or tubs', emoji: '🧡', risk: 'Medium', note: 'Rust deposits from galvanized pipe — cosmetic now, plumbing failure next' },
  { id: 'taste', label: 'Metallic taste in water', emoji: '💧', risk: 'High', note: 'Iron leaching into supply — health concern, test water and replace pipe' },
  { id: 'age', label: 'Home built 1950s–1970s', emoji: '🏠', risk: 'Medium', note: 'Galvanized supply likely present — inspection and proactive planning advised' },
];

const replacements = [
  { material: 'PEX', emoji: '🔴', rating: 'Best for DFW', notes: 'Flexible, freeze-resistant, handles DFW hard water, easiest retrofit' },
  { material: 'Copper', emoji: '🟠', rating: 'Reliable', notes: 'Long-lasting but DFW hard water leaves scale inside over time' },
  { material: 'CPVC', emoji: '🟡', rating: 'Good option', notes: 'Cheaper than copper, handles hot water, less flexible than PEX' },
];

export default function DFWGalvanizedPlumbingGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Galvanized Steel Plumbing Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>1950s–1970s DFW homes — what galvanized pipes mean for your water supply</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ How Galvanized Fails in DFW</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Zinc coating wears off from inside — bare steel then rusts into your water supply</li>
            <li>DFW hard water (high mineral content) accelerates scale buildup inside galvanized pipe</li>
            <li>Scale reduces interior diameter by up to 90% in heavily corroded runs</li>
            <li>Pressure loss is slow and gradual — many homeowners don't notice until it's severe</li>
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
            {replacements.map(r => (
              <div key={r.material} style={{ background: '#0f172a', borderRadius: 8, padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>{r.emoji}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{r.material} <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '0.85rem' }}>— {r.rating}</span></div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{r.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}