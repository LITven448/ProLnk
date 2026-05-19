import { useState } from 'react';

const priorities = [
  {
    id: 'space',
    label: '🏠 More Space',
    rec: 'Townhome',
    reason: 'Townhomes offer multi-level living, small private yards, and a house-like feel at a condo price point — ideal in Uptown Dallas or Plano.',
    hotspots: ['Uptown Dallas', 'Plano Legacy Area', 'Frisco'],
  },
  {
    id: 'lowmaint',
    label: '🛋️ Low Maintenance',
    rec: 'Condo',
    reason: 'Condos put most exterior maintenance on the HOA — perfect if you travel often or want zero yard work.',
    hotspots: ['Las Colinas', 'Downtown Dallas', 'Legacy West'],
  },
  {
    id: 'yard',
    label: '🌳 Real Yard/Space',
    rec: 'Single-Family Home',
    reason: 'If a real yard and full separation from neighbors is the priority, a DFW SFH in Frisco, Prosper, or McKinney fits best.',
    hotspots: ['Frisco', 'Prosper', 'McKinney'],
  },
  {
    id: 'walkable',
    label: '🚶 Walkability',
    rec: 'Townhome or Condo',
    reason: 'DFW townhomes in Uptown and Knox-Henderson put you steps from restaurants and nightlife with more space than a condo.',
    hotspots: ['Uptown Dallas', 'Knox-Henderson', 'Deep Ellum'],
  },
];

export default function DFWTownhomeGuide2026() {
  const [selected, setSelected] = useState('space');
  const active = priorities.find((p) => p.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>🏘️ ProLnk Guide · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Townhome Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Townhome vs. condo vs. SFH — find your best fit in the DFW market.</p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🎯 What Matters Most to You?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {priorities.map((p) => (
              <button key={p.id} onClick={() => setSelected(p.id)}
                style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selected === p.id ? '#F5E642' : '#1e2e4a', color: selected === p.id ? '#0A1628' : '#94a3b8' }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Our Recommendation</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>{active.rec}</div>
            <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 12 }}>{active.reason}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>🔥 Top DFW Hotspots</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {active.hotspots.map((h) => (
                <span key={h} style={{ background: '#1e2e4a', color: '#F5E642', borderRadius: 6, padding: '3px 10px', fontSize: 12 }}>{h}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>⚖️ Townhome Reality Check</div>
          {[
            { icon: '🔊', title: 'Shared Walls = Sound', note: 'Townhomes share 1–2 walls with neighbors. Concrete construction (rare in DFW) muffles sound; wood-frame townhomes transmit more noise.' },
            { icon: '💰', title: 'HOA Covers Exterior', note: 'Most DFW townhome HOAs cover roof, exterior paint, and landscaping — reducing your out-of-pocket maintenance vs. a SFH.' },
            { icon: '🏡', title: 'Private Entry & Garage', note: 'Unlike condos, townhomes typically have a private front door, attached garage, and small patio — more house-like autonomy.' },
            { icon: '📈', title: 'Resale Appreciation', note: 'DFW townhomes in walkable areas (Uptown, Knox) have appreciated 30–40% since 2020; suburban townhomes trail SFH appreciation.' },
          ].map((row) => (
            <div key={row.title} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{row.title}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Find Your DFW Townhome</div>
          <div style={{ fontSize: 13, color: '#1e2e4a' }}>ProLnk connects townhome buyers with inspectors, buyer agents, and HOA review specialists across DFW.</div>
        </div>
      </div>
    </div>
  );
}
