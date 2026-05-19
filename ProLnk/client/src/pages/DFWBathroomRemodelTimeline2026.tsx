import { useState } from 'react';

export default function DFWBathroomRemodelTimeline2026() {
  const [size, setSize] = useState('standard');

  const timelines: Record<string, { total: string; phases: { phase: string; duration: string; notes: string }[] }> = {
    powder: {
      total: '2–4 weeks',
      phases: [
        { phase: '🎨 Design', duration: '3–5 days', notes: 'Fixture + tile selection' },
        { phase: '📋 Permits', duration: 'None typically', notes: 'Cosmetic work in DFW usually permit-free' },
        { phase: '🔨 Demo', duration: '1 day', notes: 'Vanity, toilet, flooring' },
        { phase: '🔧 Rough Plumbing', duration: '1–2 days', notes: 'If relocating fixtures' },
        { phase: '🪟 Tile & Flooring', duration: '2–3 days', notes: 'Plus 24-hr cure time' },
        { phase: '🚿 Fixtures', duration: '1 day', notes: 'Vanity, toilet, mirror, lighting' },
        { phase: '✅ Final', duration: '1 day', notes: 'Caulk, touch-up, punch list' },
      ],
    },
    standard: {
      total: '4–7 weeks',
      phases: [
        { phase: '🎨 Design', duration: '1–2 weeks', notes: 'Full tile layout, fixture spec' },
        { phase: '📋 Permits', duration: '1–2 weeks', notes: 'Required if moving plumbing in DFW' },
        { phase: '🔨 Demo', duration: '1–2 days', notes: 'Full gut to studs' },
        { phase: '🔧 Rough Plumbing/Electric', duration: '3–5 days', notes: 'GFCI, exhaust fan, valve updates' },
        { phase: '🪟 Tile Work', duration: '3–5 days', notes: 'Shower walls + floor; 24–48 hr cure' },
        { phase: '🚿 Fixtures', duration: '1–2 days', notes: 'Shower door lead time 1–2 wks; order early' },
        { phase: '✅ Final', duration: '1 day', notes: 'Inspection if permitted' },
      ],
    },
    master: {
      total: '8–12 weeks',
      phases: [
        { phase: '🎨 Design', duration: '2 weeks', notes: 'Designer consult, 3D layout' },
        { phase: '📋 Permits', duration: '2 weeks', notes: 'Structural + plumbing permits' },
        { phase: '🔨 Demo', duration: '2–3 days', notes: 'Full gut, possible wall relocation' },
        { phase: '🔧 Rough Plumbing/Electric', duration: '1 week', notes: 'Full replumb, panel circuit add' },
        { phase: '🪟 Tile Work', duration: '1–2 weeks', notes: 'Large format tile, heated floor' },
        { phase: '🚿 Fixtures & Glass', duration: '3–5 days', notes: 'Custom glass enclosure 3-wk lead' },
        { phase: '✅ Final', duration: '2–3 days', notes: 'Paint, trim, CO if required' },
      ],
    },
  };

  const current = timelines[size];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🚿 DFW Bathroom Remodel Timeline 2026</h1>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Realistic timelines for Dallas-Fort Worth bathroom projects</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#F5E642', marginRight: '1rem' }}>Bathroom Size:</label>
        {[{ k: 'powder', l: 'Powder Room' }, { k: 'standard', l: 'Standard' }, { k: 'master', l: 'Master Bath' }].map(({ k, l }) => (
          <button key={k} onClick={() => setSize(k)}
            style={{ marginRight: '0.5rem', padding: '0.4rem 1rem', borderRadius: '6px', border: '2px solid #F5E642',
              background: size === k ? '#F5E642′ : ’transparent', color: size === k ? '#0A1628′ : '#F5E642', cursor: ’pointer', fontWeight: '700′ }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ color: '#F5E642', fontWeight: '700′ }}>Estimated Total: </span>
        <span style={{ fontSize: '1.2rem' }}>{current.total}</span>
      </div>

      {current.phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', background: '#0d1e38', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ flex: '1', fontWeight: '600′ }}>{p.phase}</div>
          <div style={{ color: '#F5E642', minWidth: '120px', textAlign: 'right' }}>{p.duration}</div>
          <div style={{ color: '#aaa', flex: '2', textAlign: 'right' }}>{p.notes}</div>
        </div>
      ))}

      <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>DFW permit timelines vary: Dallas 1–2 wks, Frisco/Plano 1 wk, Fort Worth 2–3 wks. Tile cure and custom-order lead times are non-negotiable.</p>
    </div>
  );
}
