import { useState } from 'react';

const systems = [
  { id: 'overhead', label: 'Overhead Racks', icon: '🏗️', cost: '$150–$500', note: 'Keep items off DFW floors — pests, flooding, moisture. Best for seasonal items and bulky gear.' },
  { id: 'slatwall', label: 'Slatwall Panels', icon: '🧩', cost: '$200–$600', note: 'Flexible wall system. Hooks, bins, shelves all adjust. Great for tools and sports equipment.' },
  { id: 'pegboard', label: 'Pegboard', icon: '📌', cost: '$50–$200', note: 'Classic tool wall. DFW humidity can warp cheap boards — use metal or treated wood.' },
  { id: 'frenchcleat', label: 'French Cleat System', icon: '🪚', cost: '$100–$300 DIY', note: 'Most flexible wall system. Build custom holders for anything. Workshop favorite.' },
  { id: 'cabinets', label: 'Steel Cabinets', icon: '🗄️', cost: '$300–$1,500', note: 'Protect items from DFW dust and pests. Lock valuables. Avoid particle board in DFW humidity.' },
];

const needs = ['Tools and equipment', 'Seasonal decorations', 'Sports and outdoor gear', 'General household overflow'];
const budgets = ['Under $200', '$200–$600', '$600–$1,500', '$1,500+'];

const getRec = (need: string, bud: string) => {
  if (bud === 'Under $200') return systems[2];
  if (need === 'Tools and equipment') return systems[3];
  if (need === 'Seasonal decorations') return systems[0];
  if (bud === '$200–$600') return systems[1];
  return systems[4];
};

export default function DFWGarageStorageSystems2026() {
  const [need, setNeed] = useState('');
  const [bud, setBud] = useState('');
  const rec = need && bud ? getRec(need, bud) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📦 DFW Garage Storage Systems Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW garages face pests, flooding, dust, and 130°F heat. Your storage system must protect items from all four. Here is how to set it up right.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {systems.slice(0, 4).map(s => (
            <div key={s.id} style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6, fontSize: 14 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginTop: 4 }}>{s.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 14, marginBottom: 28 }}>
          <div style={{ fontSize: 22 }}>{systems[4].icon}</div>
          <div style={{ fontWeight: 700, marginTop: 6 }}>{systems[4].label}</div>
          <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>{systems[4].cost}</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{systems[4].note}</div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Find Your System</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>What you need to store:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {needs.map(n => (
                <button key={n} onClick={() => setNeed(n)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: need === n ? '#F5E642' : '#1e3a5f', color: need === n ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{n}</button>
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
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{rec.cost}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#112240', borderRadius: 10 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Storage Warnings</div>
          <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Never store electronics or lithium batteries in uninsulated DFW garage — 130°F destroys them</li>
            <li>Keep chemicals off the floor — DFW flooding risk is real</li>
            <li>Overhead racks need 4 anchor points in drywall studs minimum</li>
            <li>Particle board shelves warp in DFW humidity — use metal or solid wood</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
