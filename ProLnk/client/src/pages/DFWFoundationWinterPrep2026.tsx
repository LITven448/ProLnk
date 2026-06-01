import { useState } from 'react';

export default function DFWFoundationWinterPrep2026() {
  const [homeType, setHomeType] = useState('slab');
  const [prepStage, setPrepStage] = useState('');
  const [guide, setGuide] = useState('');

  function generateGuide() {
    if (!prepStage) { setGuide('Select your current prep stage.'); return; }
    const slabTips = ['Gradually reduce watering by 25% each week starting October 1 — abrupt cutoff causes clay shrinkage and slab movement', 'Clear all gutters and downspouts before first winter rain — DFW clay becomes impermeable when frozen', 'Inspect French drains and ensure slope directs water away from foundation perimeter', 'Mark any existing foundation cracks with tape to monitor winter movement'];
    const pierTips = ['Wrap exposed pier and beam perimeter with thermal insulation before first freeze', 'Inspect crawl space vents — close in winter to reduce freeze risk to pipes and wood framing', 'Check for moisture accumulation under pier and beam before cold season', 'Ensure vapor barrier is intact across crawl space floor'];
    const tips = homeType === 'pier_beam' ? pierTips : slabTips;
    setGuide(tips.join('\n\n'));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>DFW Foundation Winter Preparation</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW clay soil expands in wet conditions and shrinks when dry or frozen. Proper fall and winter preparation protects your foundation from differential movement caused by freeze-thaw cycles and sudden cold events.</p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>📅 DFW Winter Foundation Timeline</h2>
          {[
            ['October', 'Begin gradual watering reduction (25%/week). Do NOT cut off watering abruptly — clay shrinkage cracks foundations.'],
            ['Late October', 'Clear gutters and downspouts. Inspect French drains. Mark existing cracks for monitoring.'],
            ['November', 'Confirm drainage slopes away from house. Install soaker hose perimeter if soil is dry at foundation.'],
            ['First Freeze Warning', 'Wrap exposed pipes. Pier and beam: close crawl space vents. Confirm vapor barrier intact.'],
            ['Post-Freeze', 'Walk perimeter and check for new cracks or soil separation. Photograph any changes.'],
          ].map(([month, desc]) => (
            <div key={month} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 130, fontSize: '0.9rem' }}>{month}</span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ DFW-Specific Winter Risks</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['❄️', 'February freeze events', 'DFW experiences sudden Arctic blasts (like 2021 Winter Storm Uri). Clay freezes unevenly, lifting slab sections.'],
              ['🌧️', 'Winter rain on dry clay', 'After dry summers, the first heavy winter rain causes rapid clay expansion — high heave risk if drainage is blocked.'],
              ['💧', 'Condensation under pier and beam', 'Cold outside air and warm interior create condensation under uninsulated pier and beam homes.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', display: 'flex', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Winter Prep Guide</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Foundation Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}>
                <option value='slab'>Concrete Slab (most DFW homes)</option>
                <option value='pier_beam'>Pier and Beam</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Current Prep Stage</label>
              <select value={prepStage} onChange={e => setPrepStage(e.target.value)} style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}>
                <option value=''>Select stage...</option>
                <option value='not_started'>Haven't started</option>
                <option value='early'>Reduced watering, checked drains</option>
                <option value='ready'>Fully prepped</option>
              </select>
            </div>
            <button onClick={generateGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get My Prep Guide</button>
            {guide && <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{guide}</div>}
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' }}>ProLnk DFW Foundation Resource 2026</div>
      </div>
    </div>
  );
}