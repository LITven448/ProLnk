import { useState } from 'react';

const blindTypes = [
  { type: 'Cellular/Honeycomb', emoji: '🔷', insulation: 'Best', opacity: 'Light filtering to blackout', cost: '$40-120/blind', best: 'North-facing rooms, DFW winters' },
  { type: 'Solar Shades', emoji: '🌅', insulation: 'Good', opacity: '3-14% openness factor', cost: '$35-95/blind', best: 'South/west living areas — views + heat block' },
  { type: 'Blackout Roller', emoji: '🌑', insulation: 'Moderate', opacity: '100% light block', cost: '$30-80/blind', best: 'DFW west-facing bedrooms' },
  { type: 'Light Filtering', emoji: '☀️', insulation: 'Low', opacity: '60-80% light reduction', cost: '$25-65/blind', best: 'East-facing breakfast rooms' },
];

const rooms = ['Bedroom', 'Living Room', 'Home Office', 'Kitchen', 'Dining Room'];
const directions = ['North-facing', 'South-facing', 'East-facing', 'West-facing'];
const priorities = ['Maximum insulation', 'Maintain view', 'Complete darkness', 'Energy savings'];

export default function DFWRollerBlindGuide() {
  const [room, setRoom] = useState('');
  const [direction, setDirection] = useState('');
  const [priority, setPriority] = useState('');
  const [rec, setRec] = useState(null);

  const getRecommendation = () => {
    if (!room || !direction || !priority) return;
    if (priority === 'Complete darkness' || (room === 'Bedroom' && direction.includes('West'))) {
      setRec({ ...blindTypes[2], density: '100% blackout fabric', savings: '15-20% cooling reduction' });
    } else if (priority === 'Maintain view' || direction.includes('South') || direction.includes('West')) {
      setRec({ ...blindTypes[1], density: '3-5% openness recommended for DFW', savings: '10-18% cooling reduction' });
    } else if (priority === 'Maximum insulation') {
      setRec({ ...blindTypes[0], density: 'Double-cell honeycomb', savings: '20-30% heating/cooling reduction' });
    } else {
      setRec({ ...blindTypes[3], density: 'Light filtering fabric', savings: '8-12% cooling reduction' });
    }
  };

  const reset = () => { setRoom(''); setDirection(''); setPriority(''); setRec(null); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🪟</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Roller Blind Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>DFW homes need different blind strategies by room orientation — find the right shade for your DFW exposure.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[['🌡️', 'DFW Heat Problem', 'West windows can reach 140°F surface temp'], ['🌤️', 'Solar Shades', 'See-through + 75% heat rejection'], ['❄️', 'Cellular Shades', 'Best insulation — traps air in cells'], ['🌑', 'Blackout', 'Critical for DFW west-facing bedrooms']].map(([icon, label, val]) => (
            <div key={label} style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your Blind Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            {[['Room Type', rooms, room, setRoom], ['DFW Sun Direction', directions, direction, setDirection], ['Top Priority', priorities, priority, setPriority]].map(([label, opts, val, setter]) => (
              <div key={label}>
                <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                  <option value=''>Select...</option>
                  {opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
            <button onClick={reset} style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }}>Reset</button>
          </div>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{rec.emoji} Recommended: {rec.type}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                {[['Fabric Density', rec.density], ['Opacity', rec.opacity], ['Cost Range', rec.cost], ['Energy Savings', rec.savings]].map(([k, v]) => (
                  <div key={k} style={{ background: '#1E293B', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                    <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 14, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, color: '#94A3B8', fontSize: 14 }}>💡 Best for: {rec.best}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          {blindTypes.map(b => (
            <div key={b.type} style={{ background: '#1E293B', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{b.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{b.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Insulation: {b.insulation}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>{b.cost}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>{b.best}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
