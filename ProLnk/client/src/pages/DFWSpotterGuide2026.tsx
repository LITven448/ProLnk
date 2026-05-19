import { useState } from 'react';

const areas = [
  { id: 'exterior', label: '🏠 Exterior', items: ['Foundation cracks or gaps at base', 'Roof granules collecting in gutters', 'Soffit/fascia rot or paint peeling', 'Grading slopes toward house', 'Driveway heaving or cracks'] },
  { id: 'interior', label: '🛋️ Interior', items: ['Water stains on ceilings or walls', 'Doors/windows sticking or gaps', 'Floor bouncing or soft spots', 'Electrical outlets warm to touch', 'Musty odors in closets or basement'] },
  { id: 'hvac', label: '❄️ HVAC', items: ['System runs >15 min without cooling', 'Unusual sounds during startup', 'Condensate line clogged or dripping', 'Filter clogged before 30-day mark', 'Vents dusty or reduced airflow'] },
  { id: 'plumbing', label: '🚿 Plumbing', items: ['Low pressure at any fixture', 'Slow drains in multiple locations', 'Water heater age >10 years', 'Toilets running between flushes', 'Hose bib dripping'] },
  { id: 'pest', label: '🐜 Pest Signs', items: ['Mud tubes near foundation', 'Wood that sounds hollow when tapped', 'Droppings near wall edges', 'Gnaw marks on wiring or wood', 'Dead insects near windowsills'] },
];

export default function DFWSpotterGuide2026() {
  const [selected, setSelected] = useState('exterior');
  const area = areas.find(a => a.id === selected)!;
  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔍 DFW Home Problem Spotter Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Monthly walkthrough checklist by home area — catch problems before they compound.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {areas.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: selected === a.id ? '#F5E642′ : '#1e2d45', color: selected === a.id ? '#0A1628' : '#94a3b8' }}>
              {a.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 16, padding: '24px', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>{area.label} — Monthly Checklist</h2>
          {area.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < area.items.length - 1 ? '1px solid #1e2d45′ : ’none' }}>
              <span style={{ fontSize: 20 }}>☐</span>
              <span style={{ color: '#e2e8f0', fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', color: '#0A1628′ }}>
          <strong>🛠️ Found an issue?</strong> ProLnk connects you with vetted DFW pros in 24 hours — no guesswork on who to call.
        </div>
      </div>
    </div>
  );
}