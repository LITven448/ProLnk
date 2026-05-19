import { useState } from 'react';

export default function DFWMigrationPatterns2026() {
  const [selectedState, setSelectedState] = useState('California');

  const origins = [
    { state: 'California', pct: 18, emoji: '🌊', topCities: ['Frisco', 'Plano', 'Allen'], reason: 'Lower taxes, cost of living, remote work flexibility' },
    { state: 'New York', pct: 12, emoji: '🗽', topCities: ['Southlake', 'Colleyville', 'Grapevine'], reason: 'Financial sector relocation, tax relief, more space' },
    { state: 'Illinois', pct: 8, emoji: '🌆', topCities: ['McKinney', 'Prosper', 'Celina'], reason: 'Escaping high property taxes, job opportunities' },
    { state: 'Washington', pct: 6, emoji: '🌲', topCities: ['Richardson', 'Garland', 'Plano'], reason: 'Tech sector expansion, Goldman/Toyota campuses' },
    { state: 'Florida', pct: 5, emoji: '🌴', topCities: ['Arlington', 'Mansfield', 'Midlothian'], reason: 'Retirement relocation, family proximity' },
  ];

  const internalMigration = [
    { from: 'Dallas proper', to: 'Northern suburbs', pct: 22, emoji: '🏙→🏡' },
    { from: 'Fort Worth', to: 'Tarrant Co suburbs', pct: 15, emoji: '🤠→🌿' },
    { from: 'Other TX cities', to: 'DFW metro', pct: 19, emoji: '🌵→🏘' },
  ];

  const selected = origins.find(o => o.state === selectedState) || origins[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK MARKET DATA</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🗺 DFW Migration Patterns 2026</h1>
        <p style={{ color: '#8899BB', marginBottom: 32 }}>Where DFW's newest residents are coming from — and where they're landing</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Net New Residents/Year', value: '146K', icon: '👥' },
            { label: 'From Out of State', value: '58%', icon: '✈️' },
            { label: 'Internal TX Migration', value: '42%', icon: '🤠' },
          ].map(s => (
            <div key={s.label} style={{ background: '#132040', borderRadius: 12, padding: 20, border: '1px solid #1E3060' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>{s.value}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3060' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🏙 Internal Texas Migration to DFW</h2>
          {internalMigration.map(m => (
            <div key={m.from} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E3060' }}>
              <span style={{ fontSize: 18 }}>{m.emoji}</span>
              <span style={{ color: '#8899BB', flex: 1, marginLeft: 12 }}>{m.from} → {m.to}</span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{m.pct}% of arrivals</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Origin State → DFW Neighborhood Match</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {origins.map(o => (
              <button key={o.state} onClick={() => setSelectedState(o.state)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: selectedState === o.state ? '#F5E642' : '#1E3060',
                  color: selectedState === o.state ? '#0A1628' : '#fff', fontWeight: 700, fontSize: 13 }}>
                {o.emoji} {o.state} ({o.pct}%)
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>{selected.emoji} From {selected.state}</div>
            <div style={{ color: '#8899BB', marginBottom: 12 }}>Why they move: {selected.reason}</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Top landing spots:</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {selected.topCities.map(c => (
                <span key={c} style={{ background: '#132040', padding: '6px 14px', borderRadius: 20, fontSize: 14, color: '#F5E642', fontWeight: 600 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
