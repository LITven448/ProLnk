import { useState } from 'react';

const zones = [
  { id: 'wall', label: 'Shared Wall w/ House', icon: '🏠', r: 'R-15 to R-21', note: 'Priority #1 — heat transfer into living space is massive in DFW summers.' },
  { id: 'ceiling', label: 'Garage Ceiling/Attic', icon: '🏔️', r: 'R-19 minimum', note: 'DFW attic temps hit 160°F. Without ceiling insulation your garage is an oven.' },
  { id: 'door', label: 'Garage Door', icon: '🚪', r: 'R-8 kit add-on', note: 'Uninsulated doors = 40% of heat gain. Cheap kits available at Home Depot.' },
  { id: 'exterior', label: 'Exterior Walls', icon: '🧱', r: 'R-13 to R-15', note: 'Detached garage must insulate all walls for workshop or AC use.' },
];

const uses = ['Just parking', 'Home gym', 'Workshop/hobbies', 'Home office'];
const types = ['Attached to house', 'Detached garage'];

const getGuide = (use: string, type: string) => {
  if (use === 'Just parking') return 'Insulate the shared wall only. Door kit optional but cheap upgrade.';
  if (type === 'Detached garage') return 'Full insulation package: all walls R-13+, ceiling R-19+, door R-8. Then add mini-split.';
  if (use === 'Home office') return 'Treat like living space: shared wall R-21, ceiling R-30, door upgrade, mini-split mandatory.';
  return 'Insulate shared wall R-15, ceiling R-19, and add door kit. Mini-split recommended for DFW summers.';
};

export default function DFWGarageInsulationGuide2026() {
  const [use, setUse] = useState('');
  const [type, setType] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧱 DFW Garage Insulation Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW attics hit 160°F in July. Without insulation your garage is unlivable. Here is what to insulate and in what order.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {zones.map(z => (
            <div key={z.id} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24 }}>{z.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{z.label}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>{z.r}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{z.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Get Your Insulation Plan</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8′ }}>How you use your garage:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {uses.map(u => (
                <button key={u} onClick={() => setUse(u)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: use === u ? '#F5E642′ : '#1e3a5f', color: use === u ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{u}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8′ }}>Garage type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {types.map(t => (
                <button key={t} onClick={() => setType(t)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: type === t ? '#F5E642′ : '#1e3a5f', color: type === t ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{t}</button>
              ))}
            </div>
          </div>
          {use && type && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Your DFW Insulation Plan</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{getGuide(use, type)}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#112240', borderRadius: 10 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 DFW Insulation Facts</div>
          <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>An uninsulated attached garage adds $30–$80/mo to your cooling bill</li>
            <li>Door insulation kits run $50–$150 at Home Depot — fastest ROI</li>
            <li>Spray foam on the ceiling joist is most effective for DFW attic heat</li>
            <li>Insulation alone drops garage temps 20–30°F in DFW summers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
