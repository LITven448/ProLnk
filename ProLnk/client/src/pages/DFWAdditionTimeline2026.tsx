import { useState } from 'react';

export default function DFWAdditionTimeline2026() {
  const [type, setType] = useState('bedroom');

  const timelines: Record<string, { total: string; sqft: string; phases: { phase: string; duration: string; notes: string }[] }> = {
    bedroom: {
      total: '6–9 months',
      sqft: '200–400 sf typical',
      phases: [
        { phase: '📐 Design & Architect', duration: '4–6 weeks', notes: 'Stamped drawings req for DFW permit' },
        { phase: '📋 DFW Permit', duration: '4–8 weeks', notes: 'Dallas 6–10 wks; Frisco/Plano 3–5 wks' },
        { phase: '🏗️ Foundation', duration: '1–2 weeks', notes: 'Post-tension slab; cure 28 days' },
        { phase: '🪵 Framing', duration: '1–2 weeks', notes: 'Stick frame; connect to existing structure' },
        { phase: '🔧 Rough-In MEP', duration: '2–3 weeks', notes: 'Mechanical, electrical, plumbing rough' },
        { phase: '🧱 Insulation & Drywall', duration: '2–3 weeks', notes: 'Inspection before insulation; board + finish' },
        { phase: '🎨 Finish Work', duration: '4–6 weeks', notes: 'Paint, trim, flooring, fixtures, CO' },
      ],
    },
    garage: {
      total: '4–7 months',
      sqft: '400–800 sf typical',
      phases: [
        { phase: '📐 Design & Drawings', duration: '2–4 weeks', notes: 'HOA approval in many DFW communities' },
        { phase: '📋 DFW Permit', duration: '3–6 weeks', notes: 'Faster than living space; site plan required' },
        { phase: '🏗️ Foundation', duration: '1 week', notes: 'Thickened slab; 4″ with turndowns' },
        { phase: '🪵 Framing & Roof', duration: '1–2 weeks', notes: 'Match existing roof pitch for aesthetics' },
        { phase: '🔧 Electrical & Doors', duration: '1–2 weeks', notes: '240V for EV charger growing demand' },
        { phase: '🧱 Drywall & Finish', duration: '2–3 weeks', notes: 'Fire-rated if attached to home' },
        { phase: '✅ CO & Final', duration: '1–2 weeks', notes: 'Certificate of occupancy required' },
      ],
    },
    sunroom: {
      total: '8–14 months',
      sqft: '300–600 sf typical',
      phases: [
        { phase: '📐 Architect + Structural', duration: '6–8 weeks', notes: 'HVAC extension design critical for DFW heat' },
        { phase: '📋 DFW Permit', duration: '6–12 weeks', notes: 'Full structural review; energy compliance' },
        { phase: '🏗️ Foundation & Demo', duration: '1–2 weeks', notes: 'Remove exterior wall; beam installation' },
        { phase: '🪵 Framing & Roof', duration: '2–3 weeks', notes: 'Roof tie-in is critical; waterproofing key' },
        { phase: '🔧 Rough-In MEP', duration: '2–3 weeks', notes: 'HVAC extension; new circuits; plumbing if wet bar' },
        { phase: '🧱 Insulation & Drywall', duration: '2–3 weeks', notes: 'Spray foam recommended for DFW climate' },
        { phase: '🎨 Finish & Fixtures', duration: '4–6 weeks', notes: 'Windows, flooring, paint, trim, final CO' },
      ],
    },
  };

  const current = timelines[type];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: '0.25rem' }}>🏡 DFW Home Addition Timeline 2026</h1>
      <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Building a room addition in the DFW metroplex — design through certificate of occupancy</p>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: '#F5E642', marginRight: '1rem' }}>Addition Type:</label>
        {[{ k: 'bedroom', l: 'Bedroom/Living' }, { k: 'garage', l: 'Garage' }, { k: 'sunroom', l: 'Sunroom/Bonus' }].map(({ k, l }) => (
          <button key={k} onClick={() => setType(k)}
            style={{ marginRight: '0.5rem', padding: '0.4rem 1rem', borderRadius: '6px', border: '2px solid #F5E642',
              background: type === k ? '#F5E642′ : ’transparent', color: type === k ? '#0A1628′ : '#F5E642', cursor: ’pointer', fontWeight: '700′ }}>
            {l}
          </button>
        ))}
      </div>

      <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: '8px', padding: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ color: '#F5E642', fontWeight: '700′ }}>Estimated Total: </span>
        <span style={{ fontSize: '1.2rem' }}>{current.total}</span>
        <span style={{ color: '#aaa', marginLeft: '1rem', fontSize: '0.9rem' }}>{current.sqft}</span>
      </div>
      <p style={{ color: '#e8c94a', fontSize: '0.85rem', marginBottom: '1.5rem' }}>⚠️ DFW permit timelines are the #1 wildcard — plan for the high end</p>

      {current.phases.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', background: '#0d1e38', borderRadius: '8px', padding: '0.75rem 1rem' }}>
          <div style={{ flex: '1', fontWeight: '600′ }}>{p.phase}</div>
          <div style={{ color: '#F5E642', minWidth: '100px', textAlign: 'right' }}>{p.duration}</div>
          <div style={{ color: '#aaa', flex: '2', textAlign: 'right' }}>{p.notes}</div>
        </div>
      ))}

      <p style={{ color: '#555', fontSize: '0.8rem', marginTop: '2rem' }}>DFW permit offices (Dallas, Fort Worth, Frisco, McKinney, Allen) are managing record permit volumes in 2025–2026. Always budget 12 weeks for permits on living space additions. Contractor availability adds 4–8 weeks for popular firms.</p>
    </div>
  );
}
