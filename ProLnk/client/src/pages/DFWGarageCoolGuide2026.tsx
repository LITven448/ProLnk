import { useState } from 'react';

const solutions = [
  { id: 'minisplit', label: 'Mini-Split AC', icon: '❄️', cost: '$2,500–$5,000 installed', note: 'Most effective for DFW. Cools 130°F garage to 72°F. Insulate first for best results.' },
  { id: 'portable', label: 'Portable AC Unit', icon: '🌀', cost: '$400–$800', note: 'Temporary fix only. Struggles above 100°F ambient. Requires exhaust duct to outside.' },
  { id: 'fan', label: 'Ceiling Fan', icon: '💨', cost: '$150–$400', note: 'Improves comfort via wind chill but does not lower actual temperature. Use with AC.' },
  { id: 'ventilation', label: 'Attic Ventilation', icon: '🌬️', cost: '$300–$800', note: 'Exhaust fan in ceiling pulls hot air out. Cheap first step before full AC.' },
];

const uses = ['Occasional parking', 'Weekend hobbyist', 'Daily workshop', 'Year-round workspace'];
const budgets = ['Under $500', '$500–$1,500', '$1,500–$5,000', '$5,000+'];

const getRec = (use: string, bud: string) => {
  if (bud === 'Under $500') return solutions[2];
  if (bud === '$500–$1,500') return solutions[1];
  if (use === 'Occasional parking') return solutions[3];
  return solutions[0];
};

export default function DFWGarageCoolGuide2026() {
  const [use, setUse] = useState('');
  const [bud, setBud] = useState('');
  const rec = use && bud ? getRec(use, bud) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>❄️ DFW Garage Cooling Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW garages hit 130°F in July. Without cooling, most tools, paint, and people cannot function. Here is how to make your garage livable.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {solutions.map(s => (
            <div key={s.id} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>{s.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Find Your Cooling Solution</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>How you use your garage:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {uses.map(u => (
                <button key={u} onClick={() => setUse(u)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: use === u ? '#F5E642' : '#1e3a5f', color: use === u ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{u}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>Budget:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {budgets.map(b => (
                <button key={b} onClick={() => setBud(b)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: bud === b ? '#F5E642' : '#1e3a5f', color: bud === b ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{b}</button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>✅ Recommended: {rec.icon} {rec.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{rec.note}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>Estimated cost: {rec.cost}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#112240', borderRadius: 10 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🌡️ DFW Cooling Order of Operations</div>
          <ol style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Insulate first — AC without insulation wastes money</li>
            <li>Add attic exhaust fan to remove heat buildup</li>
            <li>Install ceiling fan for air circulation</li>
            <li>Add mini-split for true temperature control</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
