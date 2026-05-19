import { useState } from 'react';

export default function DFWFoundationRepairTimeline2026() {
  const [scope, setScope] = useState('moderate');

  const timelines: Record<string, { total: string; piers: string; phases: { phase: string; duration: string; notes: string }[] }> = {
    minor: {
      total: '6–10 weeks',
      piers: '4–8 piers',
      phases: [
        { phase: '🔍 Structural Engineer Inspection', duration: '1–2 weeks', notes: 'Independent engineer; ~$500–$800 in DFW' },
        { phase: '📋 Quote Process', duration: '1–2 weeks', notes: '2–3 bids; lifetime transferable warranty' },
        { phase: '📅 Scheduling', duration: '2–4 weeks', notes: 'DFW foundation cos book 3–6 wks out' },
        { phase: '🏗️ Pier Installation', duration: '1 day', notes: 'Steel push piers; minimal disruption' },
        { phase: '🔎 Permit & Inspection', duration: '1 week', notes: 'Dallas/Tarrant require permit for 5+ piers' },
        { phase: '🌱 Settlement Period', duration: '4–6 weeks', notes: 'Monitor for 30 days before cosmetic repairs' },
      ],
    },
    moderate: {
      total: '10–16 weeks',
      piers: '10–20 piers',
      phases: [
        { phase: '🔍 Structural Engineer Inspection', duration: '1–2 weeks', notes: 'Floor elevation survey included; $800–$1,500′ },
        { phase: '📋 Quote Process', duration: '1–2 weeks', notes: 'Multiple contractors; verify DFW soil report' },
        { phase: '📅 Scheduling', duration: '3–6 weeks', notes: 'Spring/fall busy season in DFW' },
        { phase: '🏗️ Pier Installation', duration: '1–2 days', notes: 'Concrete pressed pilings or steel push' },
        { phase: '🔎 Permit & Inspection', duration: '1 week', notes: 'City structural inspection required' },
        { phase: '🌱 Settlement & Monitoring', duration: '4–6 weeks', notes: 'Drainage improvements may be concurrent' },
        { phase: '🛠️ Cosmetic Repairs', duration: '1–2 weeks', notes: 'Drywall cracks, doors, flooring after settle' },
      ],
    },
    severe: {
      total: '16–26 weeks',
      piers: '25–50+ piers',
      phases: [
        { phase: '🔍 Geotech + Engineer', duration: '2–3 weeks', notes: 'Soil boring test; $1,500–$3,000′ },
        { phase: '📋 Quote Process', duration: '2–3 weeks', notes: 'Major work; engineer specs required' },
        { phase: '💧 Drainage System', duration: '2–3 weeks', notes: 'Root barrier + French drain often first step' },
        { phase: '📅 Scheduling', duration: '4–6 weeks', notes: 'Large crews; specialty equipment' },
        { phase: '🏗️ Pier Installation', duration: '3–5 days', notes: 'Helical piers for expansive clay soil' },
        { phase: '🔎 Permit & Multi-Inspection', duration: '2 weeks', notes: 'Multiple city inspections' },
        { phase: '🌱 Settlement Period', duration: '6–8 weeks', notes: 'Mandatory wait before cosmetic work' },
        { phase: '🛠️ Cosmetic Restoration', duration: '2–4 weeks', notes: 'Full interior repair after stabilization' },
      ],
    },
  };

  const current = timelines[scope];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🏗️ DFW Foundation Repair Timeline 2026</h1>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>What to expect for Dallas-Fort Worth foundation repair — clay soil, piers, and permits</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#F5E642', marginRight: '1rem' }}>Repair Scope:</label>
        {[{ k: 'minor', l: 'Minor (4–8 piers)' }, { k: 'moderate', l: 'Moderate (10–20)' }, { k: 'severe', l: 'Severe (25+)' }].map(({ k, l }) => (
          <button key={k} onClick={() => setScope(k)}
            style={{ marginRight: '0.5rem', marginBottom: '0.5rem', padding: '0.4rem 1rem', borderRadius: '6px', border: '2px solid #F5E642',
              background: scope === k ? '#F5E642′ : ’transparent', color: scope === k ? '#0A1628′ : '#F5E642', cursor: ’pointer', fontWeight: '700′ }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <span style={{ color: '#F5E642', fontWeight: '700′ }}>Estimated Total: </span>
        <span style={{ fontSize: '1.2rem' }}>{current.total}</span>
        <span style={{ color: '#aaa', marginLeft: '1rem', fontSize: '0.9rem' }}>{current.piers}</span>
      </div>

      {current.phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', background: '#0d1e38', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ flex: '1', fontWeight: '600′ }}>{p.phase}</div>
          <div style={{ color: '#F5E642', minWidth: '100px', textAlign: 'right' }}>{p.duration}</div>
          <div style={{ color: '#aaa', flex: '2', textAlign: 'right' }}>{p.notes}</div>
        </div>
      ))}

      <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>North Texas expansive clay soil (the Blackland Prairie) makes DFW one of the highest foundation-risk markets in the US. Always get an independent structural engineer before accepting a contractor quote.</p>
    </div>
  );
}
