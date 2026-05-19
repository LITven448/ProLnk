import { useState } from 'react';

export default function DFWBuildVsBuyGuide2026() {
  const [budget, setBudget] = useState(450000);
  const [timeline, setTimeline] = useState(12);

  const canAffordNew = budget >= 400000;
  const canWait = timeline >= 12;

  const recommendation = canAffordNew && canWait ? 'BUILD' : !canAffordNew ? 'BUY_RESALE' : 'DEPENDS';
  const recColor = recommendation === 'BUILD' ? '#34D399′ : recommendation === ’BUY_RESALE' ? '#60A5FA' : '#F5E642';

  const newBuilds = [
    { city: 'Celina / Prosper', range: '$420–600K', timeline: '14–18 mo', note: 'Fastest growing' },
    { city: 'Forney / Rockwall', range: '$380–500K', timeline: '12–16 mo', note: 'East DFW value' },
    { city: 'Mansfield / Midlothian', range: '$380–520K', timeline: '12–16 mo', note: 'South DFW family areas' },
    { city: 'Anna / Melissa', range: '$360–460K', timeline: '10–14 mo', note: 'Affordable new build' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEBUYER GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px' }}>🏗️ Build vs Buy in DFW 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>New construction runs $400–600K in DFW growth corridors with 12–18 month build times. Resale is cheaper and faster, but you inherit older systems.</p>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>⚙️ Your Build vs Buy Match</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Your Budget</label>
              <input type="range" min={250000} max={750000} step={10000} value={budget} onChange={e => setBudget(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${(budget / 1000).toFixed(0)}K</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>How Soon You Need to Move</label>
              <input type="range" min={1} max={24} step={1} value={timeline} onChange={e => setTimeline(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{timeline} months</div>
            </div>
          </div>
          <div style={{ background: `${recColor}22`, border: `2px solid ${recColor}`, borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{recommendation === 'BUILD' ? '🏗️' : recommendation === 'BUY_RESALE' ? '🏠' : '🤔'}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: recColor }}>
              {recommendation === 'BUILD' ? 'New Construction is Right for You' : recommendation === 'BUY_RESALE' ? 'Buy Resale — Better Fit' : 'Either Could Work'}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 6 }}>
              {recommendation === 'BUILD' ? 'Your budget and timeline align well with DFW new construction timelines.'
                : recommendation === 'BUY_RESALE' ? 'Under $400K makes new construction tough in DFW. Resale gives you more options.'
                : 'Timeline is tight for new build. Consider a spec home (move-in ready new construction) as middle ground.'}
            </div>
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📍 DFW New Build Hot Zones 2026</h2>
          {newBuilds.map(({ city, range, timeline: tl, note }) => (
            <div key={city} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: 8, padding: '12px 0', borderBottom: '1px solid #1E293B', alignItems: 'center' }}>
              <div style={{ fontWeight: 600 }}>{city}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{range}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>⏱ {tl}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>{note}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { title: '✅ New Build Pros', items: ['Everything brand new — roof, HVAC, plumbing', 'Builder warranty (1-2-10 year)', 'Energy efficient construction', 'Customize finishes and layout', 'No bidding wars'], color: '#34D399′ },
            { title: '⚠️ New Build Cons', items: ['12–18 month wait minimum', '$400K+ floor in DFW market', 'Rising costs + delays are common', 'HOA restrictions in new developments', 'No established trees/landscaping'], color: '#F87171′ },
          ].map(({ title, items, color }) => (
            <div key={title} style={{ background: '#1E293B', borderRadius: 12, padding: 20 }}>
              <h3 style={{ color, fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
              {items.map(item => <div key={item} style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>• {item}</div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
