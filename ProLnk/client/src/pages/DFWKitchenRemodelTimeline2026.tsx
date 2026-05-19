import { useState } from 'react';

export default function DFWKitchenRemodelTimeline2026() {
  const [scope, setScope] = useState('medium');

  const timelines: Record<string, { total: string; phases: { phase: string; duration: string; notes: string }[] }> = {
    small: {
      total: '8–12 weeks',
      phases: [
        { phase: '🎨 Design & Planning', duration: '2 weeks', notes: 'Cabinet selection, material sourcing' },
        { phase: '📋 Permits', duration: '1–2 weeks', notes: 'Dallas/Plano/Frisco vary; cosmetic may skip' },
        { phase: '🔨 Demolition', duration: '1–2 days', notes: 'Haul-away included' },
        { phase: '🔧 Rough-In', duration: '1 week', notes: 'Plumbing + electrical updates' },
        { phase: '🗄️ Cabinets', duration: '1 week', notes: 'Install after rough-in inspection' },
        { phase: '🪨 Countertops', duration: '2 weeks', notes: 'Quartz/granite 2-wk lead after template' },
        { phase: '✅ Final Details', duration: '1 week', notes: 'Backsplash, fixtures, punch list' },
      ],
    },
    medium: {
      total: '12–16 weeks',
      phases: [
        { phase: '🎨 Design & Planning', duration: '3 weeks', notes: 'Architect/designer review, full material spec' },
        { phase: '📋 Permits', duration: '2–4 weeks', notes: 'Structural changes need DFW city permit' },
        { phase: '🔨 Demolition', duration: '1 week', notes: 'Full gut including soffit removal' },
        { phase: '🔧 Rough-In', duration: '2 weeks', notes: 'Relocated plumbing/electrical' },
        { phase: '🗄️ Cabinets', duration: '1–2 weeks', notes: 'Custom cab lead 4–8 wks; order early' },
        { phase: '🪨 Countertops', duration: '2–3 weeks', notes: 'Template after cabinets set' },
        { phase: '✅ Final Details', duration: '1–2 weeks', notes: 'Appliances, trim, final inspection' },
      ],
    },
    large: {
      total: '18–26 weeks',
      phases: [
        { phase: '🎨 Design & Planning', duration: '4 weeks', notes: 'Full architect drawings, 3D rendering' },
        { phase: '📋 Permits', duration: '4 weeks', notes: 'Structural + MEP permits in DFW' },
        { phase: '🔨 Demolition', duration: '1 week', notes: 'Load-bearing wall removal possible' },
        { phase: '🔧 Rough-In', duration: '2–3 weeks', notes: 'Full replumb + panel upgrade' },
        { phase: '🗄️ Cabinets', duration: '2 weeks', notes: 'Custom semi-custom install' },
        { phase: '🪨 Countertops', duration: '3 weeks', notes: 'Waterfall island + perimeter' },
        { phase: '✅ Final Details', duration: '2–3 weeks', notes: 'Flooring, paint, built-ins, CO' },
      ],
    },
  };

  const current = timelines[scope];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🍳 DFW Kitchen Remodel Timeline 2026</h1>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Week-by-week guide for Dallas-Fort Worth kitchen projects</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#F5E642', marginRight: '1rem' }}>Project Scope:</label>
        {['small', 'medium', 'large'].map(s => (
          <button key={s} onClick={() => setScope(s)}
            style={{ marginRight: '0.5rem', padding: '0.4rem 1rem', borderRadius: '6px', border: '2px solid #F5E642',
              background: scope === s ? '#F5E642' : 'transparent', color: scope === s ? '#0A1628' : '#F5E642', cursor: 'pointer', fontWeight: '700' }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ color: '#F5E642', fontWeight: '700' }}>Estimated Total: </span>
        <span style={{ fontSize: '1.2rem' }}>{current.total}</span>
      </div>

      {current.phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', background: '#0d1e38', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ flex: '1', fontWeight: '600' }}>{p.phase}</div>
          <div style={{ color: '#F5E642', minWidth: '100px', textAlign: 'right' }}>{p.duration}</div>
          <div style={{ color: '#aaa', flex: '2', textAlign: 'right' }}>{p.notes}</div>
        </div>
      ))}

      <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>Timelines reflect typical DFW permit offices (Dallas, Plano, Frisco, McKinney, Fort Worth). Actual schedules vary by contractor availability.</p>
    </div>
  );
}
