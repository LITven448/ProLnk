import { useState } from 'react';

const HARDWARE_ITEMS = [
  { name: 'Lever Door Handles', base: 35, unit: 'per handle', icon: '🚪', note: 'ADA-compliant levers require no grasping or twisting. Replace knobs first — highest impact.' },
  { name: 'Smart Lock with Lever', base: 180, unit: 'per lock', icon: '🔐', note: 'Keypad + lever combo. Eliminates key fumbling. Works with Ring, Google, or Apple Home.' },
  { name: 'Window Cranks (Easy-Turn)', base: 25, unit: 'per window', icon: '🪟', note: 'Replace stiff or broken window cranks with ergonomic folding cranks. Big DFW heat-season benefit.' },
  { name: 'Paddle Faucet Handles', base: 55, unit: 'per faucet', icon: '🚿', note: 'Lever-style faucets require 5 lbs or less to operate per ADA. Replaces twist-style.' },
  { name: 'Cabinet D-Ring Pulls', base: 8, unit: 'per pull', icon: '🗄️', note: 'Loop pulls require no grip strength. Simple swap, no drilling. Add to kitchen + bath first.' },
];

function buildList(rooms: string[], level: string, budget: string) {
  const b = parseInt(budget) || 2000;
  const prioritized = level === 'Full ADA'
    ? HARDWARE_ITEMS
    : level === 'Moderate'
      ? HARDWARE_ITEMS.slice(0, 3)
      : HARDWARE_ITEMS.slice(0, 2);
  const roomCount = rooms.length || 1;
  const items = prioritized.map(h => ({ ...h, qty: h.name.includes('Window') ? Math.ceil(roomCount * 2) : roomCount, total: h.base * (h.name.includes('Window') ? Math.ceil(roomCount * 2) : roomCount) }));
  const totalCost = items.reduce((s, i) => s + i.total, 0);
  return { items, totalCost, withinBudget: totalCost <= b, note: totalCost > b ? `Over budget by $${(totalCost - b).toLocaleString()} — prioritize door handles + smart locks first.` : 'Estimate within budget.' };
}

export default function DFWLeverHandleGuide() {
  const [rooms, setRooms] = useState<string[]>(['Kitchen', 'Bathroom']);
  const [level, setLevel] = useState('Moderate');
  const [budget, setBudget] = useState('1500');
  const [result, setResult] = useState<ReturnType<typeof buildList> | null>(null);
  const allRooms = ['Entryway', 'Kitchen', 'Bathroom', 'Master Bedroom', 'Guest Room', 'Garage', 'Laundry Room'];

  function toggleRoom(r: string) {
    setRooms(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>DFW ACCESSIBILITY</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1rem 0 0.5rem', color: '#F5E642′ }}>🔧 Lever Handle & Accessible Hardware Guide — DFW</h1>
          <p style={{ color: '#8A9BB5', lineHeight: 1.6 }}>Round knobs require grip strength and twisting — lever handles don't. A full hardware upgrade across a typical DFW home costs $800–$3,500 and has immediate impact on daily independence.</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏷️ Hardware Reference</h2>
          {HARDWARE_ITEMS.map(h => (
            <div key={h.name} style={{ background: '#0F2035', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem', border: '1px solid #1E3A5F', display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: 24 }}>{h.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 700, color: '#E8EDF5′ }}>{h.name}</span>
                  <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>${h.base} {h.unit}</span>
                </div>
                <div style={{ color: '#8A9BB5', fontSize: 13, marginTop: 2 }}>{h.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>⚙️ Build Your Upgrade List</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 6 }}>Rooms to Update (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {allRooms.map(r => (
                <button key={r} onClick={() => toggleRoom(r)} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 13, cursor: 'pointer', background: rooms.includes(r) ? '#F5E642′ : '#0A1628', color: rooms.includes(r) ? '#0A1628' : '#8A9BB5', border: '1px solid ' + (rooms.includes(r) ? '#F5E642' : '#1E3A5F'), fontWeight: rooms.includes(r) ? 700 : 400 }}>{r}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Accessibility Level</label>
              <select value={level} onChange={e => setLevel(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6 }}>
                <option>Basic (doors only)</option><option>Moderate</option><option>Full ADA</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#8A9BB5', display: 'block', marginBottom: 4 }}>Budget ($)</label>
              <input type="number" value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '0.5rem', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={() => setResult(buildList(rooms, level, budget))} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Generate Upgrade List →</button>
        </div>

        {result && (
          <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 Your Upgrade List</h3>
            {result.items.map(i => (
              <div key={i.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span style={{ fontSize: 13, color: '#E8EDF5′ }}>{i.icon} {i.name} × {i.qty}</span>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>${i.total.toLocaleString()}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0.25rem', fontWeight: 800, fontSize: 15 }}>
              <span>Total Estimated Cost</span>
              <span style={{ color: result.withinBudget ? '#4ADE80′ : '#F87171' }}>${result.totalCost.toLocaleString()}</span>
            </div>
            <div style={{ color: '#8A9BB5', fontSize: 13 }}>{result.note}</div>
          </div>
        )}
      </div>
    </div>
  );
}
