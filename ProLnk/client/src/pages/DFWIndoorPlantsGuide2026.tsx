import { useState } from 'react';

const plants = [
  { name: 'Snake Plant', emoji: '🌿', light: ['low','medium','high'], exp: ['beginner','intermediate','expert'], tip: 'Thrives in AC — tolerates neglect and low humidity.' },
  { name: 'Peace Lily', emoji: '🤍', light: ['low','medium'], exp: ['beginner','intermediate','expert'], tip: 'Tolerates low light and signals thirst by drooping.' },
  { name: 'Pothos', emoji: '🍃', light: ['low','medium','high'], exp: ['beginner'], tip: 'Beginner-proof — trails beautifully from shelves.' },
  { name: 'Birds of Paradise', emoji: '🌺', light: ['high'], exp: ['intermediate','expert'], tip: 'Loves DFW brightness — needs bright indirect south/west light.' },
  { name: 'ZZ Plant', emoji: '🌱', light: ['low','medium'], exp: ['beginner','intermediate'], tip: 'Ultra low water — perfect for DFW summers when you travel.' },
  { name: 'Fiddle Leaf Fig', emoji: '🌳', light: ['medium','high'], exp: ['intermediate','expert'], tip: 'Dramatic statement plant — keep away from AC vents.' },
];

export default function DFWIndoorPlantsGuide2026() {
  const [light, setLight] = useState('');
  const [exp, setExp] = useState('');
  const filtered = plants.filter(p =>
    (!light || p.light.includes(light)) && (!exp || p.exp.includes(exp))
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🌿 DFW Indoor Plants Guide 2026</h1>
        <p style={{ color: '#9BA3B2', fontSize: 15, marginBottom: 32 }}>
          DFW homes run AC 9 months a year — that changes everything for plants. Low humidity, cold drafts, and intense west light require careful selection.
        </p>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Perfect Plant</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginBottom: 6 }}>HOME LIGHT LEVEL</div>
              {['low','medium','high'].map(l => (
                <button key={l} onClick={() => setLight(light === l ? '' : l)}
                  style={{ marginRight: 8, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: light === l ? '#F5E642′ : '#1C2D4A', color: light === l ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginBottom: 6 }}>EXPERIENCE LEVEL</div>
              {['beginner','intermediate','expert'].map(e => (
                <button key={e} onClick={() => setExp(exp === e ? '' : e)}
                  style={{ marginRight: 8, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: exp === e ? '#F5E642′ : '#1C2D4A', color: exp === e ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {filtered.map(p => (
            <div key={p.name} style={{ background: '#111E33', borderRadius: 12, padding: 20, border: '1px solid #1C2D4A' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{p.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#9BA3B2′ }}>{p.tip}</div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ color: '#9BA3B2', gridColumn: '1/-1', textAlign: 'center', padding: 32 }}>No plants match — try adjusting filters.</div>}
        </div>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>💧 DFW Humidity & AC Tips</h2>
          <p style={{ color: '#9BA3B2', fontSize: 14, lineHeight: 1.7 }}>
            DFW indoor humidity drops to 20–30% in summer when AC runs constantly. Group plants together to raise local humidity, use pebble trays with water, and avoid placing plants directly under AC vents. A small humidifier in plant corners can raise humidity to the ideal 40–60%.
          </p>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Need a Home Services Pro in DFW?</div>
          <div style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects you with vetted local contractors — landscaping, HVAC, and more.</div>
        </div>
      </div>
    </div>
  );
}