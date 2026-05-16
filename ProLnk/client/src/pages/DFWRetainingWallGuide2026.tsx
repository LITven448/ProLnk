import { useState } from 'react';

const wallGuide = [
  { height: 'Under 2 ft', use: 'Garden Bed', material: 'Timber or Landscape Blocks', icon: '🌿', note: 'Low pressure, DIY-friendly. Timber rots faster in DFW humidity — use treated lumber. Expect 10-12 year lifespan.' },
  { height: 'Under 2 ft', use: 'Slope Control', material: 'Boulder / Dry-Stack', icon: '🪨', note: 'Natural look, no mortar needed. Works well with DFW clay soil pressure. Boulders are heavy — rent equipment.' },
  { height: '2–4 ft', use: 'Garden Bed', material: 'Concrete Block (Allan Block)', icon: '🧱', note: 'Most common in DFW. Interlocking blocks handle clay expansion. No engineer required under 4 ft in most DFW cities.' },
  { height: '2–4 ft', use: 'Slope Control', material: 'Concrete Segmental Block', icon: '🏗️', note: 'Engineered block systems handle DFW clay pressure well. Drainage behind wall is critical — use gravel backfill.' },
  { height: '4–6 ft', use: 'Garden Bed', material: 'Poured Concrete (Engineer Required)', icon: '⚠️', note: 'DFW cities require building permits and engineer-stamped drawings for walls over 4 ft. Clay soil adds 30% more lateral pressure than sandy soil.' },
  { height: '4–6 ft', use: 'Slope Control', material: 'Concrete Block + Geogrid (Engineer Required)', icon: '🔧', note: 'Geogrid reinforcement essential in DFW clay. Engineer calculates soil pressure — do not skip. Drainage critical.' },
  { height: '6 ft+', use: 'Garden Bed', material: 'Poured Concrete Wall (Structural)', icon: '🏛️', note: 'Full structural wall required. DFW permit, engineer stamp, inspection. Budget $300-600/linear ft installed.' },
  { height: '6 ft+', use: 'Slope Control', material: 'Poured Concrete / Sheet Pile (Structural)', icon: '🏛️', note: 'Major project. DFW expansive clay requires deep footings and robust drainage system. Always hire structural engineer.' },
];

export default function DFWRetainingWallGuide2026() {
  const [height, setHeight] = useState('2–4 ft');
  const [use, setUse] = useState('Slope Control');

  const result = wallGuide.find(w => w.height === height && w.use === use);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🧱</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Retaining Wall Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW clay soil makes retaining walls uniquely challenging — here's what you need to know</p>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>⚠️ Why DFW Clay Soil Is Tricky</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['💧', 'Hydrostatic pressure', 'Clay absorbs water and expands 30-40% in volume, pushing hard against walls'],
              ['☀️', 'Seasonal shrink/swell', 'DFW clay shrinks in drought, swells in rain — walls experience constant movement'],
              ['🔧', '4 ft rule', 'DFW-area cities require engineer + permit for walls over 4 feet — no exceptions'],
              ['🌊', 'Drainage essential', 'Gravel backfill and drainage pipe behind every wall or it will fail within 5 years'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: '#162842', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🔍 Find Your DFW Wall Solution</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Wall Height</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Under 2 ft', '2–4 ft', '4–6 ft', '6 ft+'].map(h => (
                <button key={h} onClick={() => setHeight(h)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: height === h ? '#F5E642' : '#162842', color: height === h ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{h}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Use</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Garden Bed', 'Slope Control'].map(u => (
                <button key={u} onClick={() => setUse(u)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: use === u ? '#F5E642' : '#162842', color: use === u ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{u}</button>
              ))}
            </div>
          </div>
          {result && (
            <div style={{ background: '#162842', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{result.material}</div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>📋 ProLnk Tip</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>ProLnk connects you with DFW-licensed retaining wall contractors who understand local clay soil conditions and city permit requirements. Get 3 quotes and store your wall documentation in your Home Health Vault for future reference.</p>
        </div>
      </div>
    </div>
  );
}