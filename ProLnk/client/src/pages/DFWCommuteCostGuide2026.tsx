import { useState } from 'react';

const workLocations = [
  { area: 'Downtown Dallas (CBD)', suburbs: ['Irving', 'Coppell', 'Addison', 'Richardson'], highway: 'I-35E / DART Green Line', avgCommute: '22 min' },
  { area: 'Uptown / Midtown Dallas', suburbs: ['Highland Park', 'Plano (S)', 'Garland (W)', 'Farmers Branch'], highway: 'US-75 / DNT', avgCommute: '18 min' },
  { area: 'Las Colinas / Irving', suburbs: ['Coppell', 'Grand Prairie', 'Grapevine', 'Euless'], highway: 'SH-114 / SH-183', avgCommute: '15 min' },
  { area: 'Fort Worth CBD', suburbs: ['North Richland Hills', 'Keller', 'Burleson', 'Azle'], highway: 'I-30 / SH-287', avgCommute: '20 min' },
  { area: 'Frisco / Allen / McKinney', suburbs: ['Prosper', 'Celina', 'Allen', 'McKinney'], highway: 'US-75 / SH-121', avgCommute: '18 min' },
  { area: 'DFW Airport Corridor', suburbs: ['Grapevine', 'Euless', 'Bedford', 'Colleyville'], highway: 'SH-121 / SH-183', avgCommute: '12 min' },
];

const prefs = ['hybrid (2-3 days/wk)', 'full remote', 'daily commute'];

export default function DFWCommuteCostGuide2026() {
  const [workIdx, setWorkIdx] = useState(0);
  const [pref, setPref] = useState('hybrid (2-3 days/wk)');

  const loc = workLocations[workIdx];

  const monthlyFuel = pref === 'full remote' ? 0 : pref === 'hybrid (2-3 days/wk)' ? 110 : 220;
  const monthlyToll = pref === 'full remote' ? 0 : pref === 'hybrid (2-3 days/wk)' ? 65 : 140;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 8px' }}>DFW Commute Cost Guide 2026</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, margin: '0 0 32px' }}>DFW traffic reality, best locations for highway access, and true commute costs by work pattern.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🚗', label: 'Avg DFW Commute', value: '32 min', sub: 'One-way, all modes' },
            { icon: '🛣️', label: 'Major Congested Highways', value: '4 corridors', sub: 'I-35, I-635, I-75, SH-121′ },
            { icon: '🚊', label: 'DART Rail Coverage', value: 'Limited', sub: 'Best for downtown Dallas routes' },
          ].map((card) => (
            <div key={card.label} style={{ background: '#132040', borderRadius: 12, padding: '20px 18px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{card.label}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{card.value}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 28, border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🗺️ Find Your Best DFW Location</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Work Location</label>
              <select value={workIdx} onChange={(e) => setWorkIdx(Number(e.target.value))} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14 }}>
                {workLocations.map((l, i) => <option key={l.area} value={i}>{l.area}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Work Pattern</label>
              <select value={pref} onChange={(e) => setPref(e.target.value)} style={{ background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14 }}>
                {prefs.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: '18px 20px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Best suburbs for {loc.area}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {loc.suburbs.map((s) => (
                <span key={s} style={{ background: '#1E3A5F', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#F5E642′ }}>{s}</span>
              ))}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 13 }}>Best highway: <strong style={{ color: '#fff' }}>{loc.highway}</strong> · Avg commute: <strong style={{ color: '#22C55E' }}>{loc.avgCommute}</strong></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: '⛽ Monthly Fuel', value: `$${monthlyFuel}` },
              { label: '🛣️ Monthly Tolls', value: `$${monthlyToll}` },
              { label: '📅 Annual Commute Cost', value: `$${((monthlyFuel + monthlyToll) * 12).toLocaleString()}` },
            ].map((item) => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132040', borderRadius: 14, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🚦 DFW Traffic Reality Check</h2>
          {[
            { highway: 'I-35E (Dallas)', congestion: 'Heavy 7-9am / 4-7pm', tip: 'Avoid Oak Cliff stretch at peak' },
            { highway: 'I-635 LBJ Freeway', congestion: 'Very Heavy (managed lanes exist)', tip: 'Use TEXpress lanes to save 20 min' },
            { highway: 'US-75 (Central)', congestion: 'Heavy northbound evenings', tip: 'SH-190 bypass helps significantly' },
            { highway: 'SH-121 Tollway', congestion: 'Moderate, best in DFW', tip: 'Best N-S option for Frisco/Plano' },
          ].map((row) => (
            <div key={row.highway} style={{ padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{row.highway}</span>
                <span style={{ color: '#F59E0B', fontSize: 13 }}>{row.congestion}</span>
              </div>
              <div style={{ color: '#64748B', fontSize: 12 }}>💡 {row.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}