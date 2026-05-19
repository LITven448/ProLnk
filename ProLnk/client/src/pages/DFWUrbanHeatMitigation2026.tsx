import { useState } from 'react';

export default function DFWUrbanHeatMitigation2026() {
  const [location, setLocation] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [priorities, setPriorities] = useState('');

  const locations = ['Inner city Dallas', 'Suburban DFW', 'Near highway', 'Wooded neighborhood'];
  const featureList = ['Large yard', 'Flat roof', 'South/west exposure', 'Dark driveway'];

  const toggleFeature = (f: string) => {
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const getPriorities = () => {
    if (!location) return;
    const tips: string[] = [];
    if (location === 'Inner city Dallas') tips.push('🌳 Tree planting is #1 priority — Dallas Urban Forest program offers free trees. Shade reduces AC 25-30%.');
    if (location === 'Suburban DFW') tips.push('🏠 Cool roof coating + attic radiant barrier — biggest ROI for suburban homes.');
    if (location === 'Near highway') tips.push('🧱 Dense vegetation buffer + sound wall plantings — reduces heat and particulate simultaneously.');
    if (location === 'Wooded neighborhood') tips.push('🌿 Maintain existing trees — dead tree removal and replanting preserves your natural heat shield. Value: priceless.');
    if (features.includes('Large yard')) tips.push('🌿 Plant native shade trees (Live Oak, Cedar Elm) on south/west sides. DFW trees reduce summer temps 5-10°F.');
    if (features.includes('Dark driveway')) tips.push('🛣️ Apply cool pavement coating — reduces driveway surface temp 30-40°F. Removes heat island near garage.');
    if (features.includes('South/west exposure')) tips.push('🪟 Solar screens on west windows — blocks 80-90% of heat before it enters. $30-$60/window DIY.');
    if (features.includes('Flat roof')) tips.push('🏠 Cool roof membrane or reflective coating — reduces roof surface temp 50-80°F. Immediate AC savings.');
    tips.push('⚡ Join Dallas Urban Heat Island working group for neighborhood-level impact.');
    setPriorities(tips.join('||'));
  };

  const strategies = [
    { icon: '🌳', title: 'Tree Planting', impact: 'High', saving: '25-30% AC reduction', time: '5-10 yrs to full benefit' },
    { icon: '🏠', title: 'Cool Roof', impact: 'High', saving: '15-20% cooling cost', time: 'Immediate' },
    { icon: '🛣️', title: 'Cool Pavement', impact: 'Medium', saving: '5-15% ambient temp', time: 'Immediate' },
    { icon: '🪟', title: 'Solar Screens', impact: 'Medium', saving: '10-15% cooling', time: 'Immediate' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Urban Heat Mitigation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Fight DFW heat island effect — home and neighborhood strategies</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 28 }}>
          {strategies.map(s => (
            <div key={s.title} style={{ background: '#1e2d45', borderRadius: 10, padding: 14, border: '1px solid #2d4a6b' }}>
              <div style={{ fontSize: 26, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.title}</div>
              <div style={{ color: '#4ade80', fontSize: 12, marginTop: 4 }}>💰 {s.saving}</div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>⏱️ {s.time}</div>
              <div style={{ marginTop: 6, fontSize: 11, background: '#0A1628', borderRadius: 6, padding: '3px 8px', display: 'inline-block', color: s.impact === 'High' ? '#4ade80' : '#f97316' }}>Impact: {s.impact}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏠 Get Your Heat Mitigation Priority List</h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Home location:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {locations.map(l => (
                <button key={l} onClick={() => setLocation(l)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: location === l ? '#F5E642' : '#0A1628', color: location === l ? '#0A1628' : '#fff', fontSize: 12 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Your home features (select all that apply):</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {featureList.map(f => (
                <button key={f} onClick={() => toggleFeature(f)} style={{ padding: '6px 12px', borderRadius: 20, border: 'none', cursor: 'pointer', background: features.includes(f) ? '#F5E642' : '#0A1628', color: features.includes(f) ? '#0A1628' : '#fff', fontSize: 12 }}>{f}</button>
              ))}
            </div>
          </div>
          <button onClick={getPriorities} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Get Priorities →</button>
          {priorities && (
            <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 14 }}>
              {priorities.split('||').map((t, i) => <div key={i} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 14, fontSize: 12, color: '#94a3b8' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🌳 DFW Urban Forest: </span>
          Dallas has planted 100K+ trees since 2019. Free street trees available via Dallas Park and Recreation. Each mature tree removes 48 lbs of CO2 and reduces nearby AC usage by up to 30%.
        </div>
      </div>
    </div>
  );
}
