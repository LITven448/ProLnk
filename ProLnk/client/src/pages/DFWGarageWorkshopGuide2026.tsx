import { useState } from 'react';

const features = [
  { id: 'electric', label: 'Dedicated Circuits', icon: '⚡', detail: '20A circuits, separate breakers. DFW code requires AFCI/GFCI in garages. Plan before drywall.' },
  { id: 'dust', label: 'Dust Collection', icon: '🌪️', detail: 'DFW construction dust is extreme. 1.5HP minimum collector + HEPA filter. Wall-mount to save floor space.' },
  { id: 'air', label: 'Air Filtration', icon: '🫁', detail: 'Ambient air filtration for fine particles. Run 2–3x per hour. Critical for DFW cedar allergy season.' },
  { id: 'climate', label: 'Climate Control', icon: '❄️', detail: 'Mini-split required for year-round DFW work. Wood moves in humidity — stable temp = better joinery.' },
  { id: 'fire', label: 'Fire Suppression', icon: '🧯', detail: 'ABC extinguisher near exit. DFW fire code requires one if storing flammables. Check with city.' },
  { id: 'lighting', label: 'LED Shop Lighting', icon: '💡', detail: '5000K daylight LED strips. 50–75 foot candles at work surface. Ceiling mount on 8ft straps.' },
];

const tools = ['Woodworking', 'Metalworking', 'Auto/mechanics', 'Painting/finishing'];
const situations = ['Attached garage', 'Detached garage'];

const getGuide = (tool: string, sit: string) => {
  if (tool === 'Metalworking') return 'Prioritize: dedicated 240V circuit for welder, fire suppression, air filtration for metal dust. DFW humidity = rust risk — store metal properly.';
  if (tool === 'Painting/finishing') return 'Priority: explosion-proof fan/AC (fumes + heat), fire suppression, air filtration. DFW summers accelerate dry time — watch your finish windows.';
  if (tool === 'Auto/mechanics') return 'Prioritize: 240V for lift or compressor, floor drain if possible, exhaust fan for fumes. DFW concrete absorbs oil — seal floor first.';
  if (sit === 'Detached garage') return 'Run 60A+ subpanel from house first. Then: mini-split, dust collection, dedicated circuits for each major tool. Insulate all walls.';
  return 'Start with: 2x dedicated 20A circuits, dust collection, LED lighting. Add mini-split before DFW summer. Run extra circuits now while walls are open.';
};

export default function DFWGarageWorkshopGuide2026() {
  const [tool, setTool] = useState('');
  const [sit, setSit] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔧 DFW Home Workshop Setup Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW garages present unique workshop challenges: extreme heat, dust, humidity swings, and strict fire codes. Plan your shop right from the start.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {features.map(f => (
            <div key={f.id} style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 22 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6, fontSize: 14 }}>{f.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{f.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Get Your Workshop Plan</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>Primary tool type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {tools.map(t => (
                <button key={t} onClick={() => setTool(t)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: tool === t ? '#F5E642' : '#1e3a5f', color: tool === t ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>Garage type:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSit(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: sit === s ? '#F5E642' : '#1e3a5f', color: sit === s ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          {tool && sit && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Your DFW Workshop Plan</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{getGuide(tool, sit)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
