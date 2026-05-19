import { useState } from 'react';

export default function DFWFoundationGradeBeam2026() {
  const [workType, setWorkType] = useState('');
  const [awareness, setAwareness] = useState('');

  const workTypes = [
    { label: 'Installing interior pier or pier and beam conversion', key: 'pier' },
    { label: 'Cutting slab for plumbing access', key: 'plumbing' },
    { label: 'Adding a room addition or extension', key: 'addition' },
    { label: 'Tunneling under slab for plumbing repair', key: 'tunnel' },
    { label: 'Evaluating foundation repair bids', key: 'eval' },
  ];

  const awarenesses: Record<string, string> = {
    pier: '🏗️ Interior piers must NOT be placed directly under grade beams without engineering approval — the beam distributes loads and pier placement affects the entire load path. Require a structural engineer to specify pier locations relative to grade beams and turndown beams.',
    plumbing: '⚠️ Slab cuts for plumbing in DFW post-tension homes must avoid grade beam locations. Grade beams are 18–24 inches deep and 12 inches wide — cutting into one damages structural integrity. Get a GPR scan before ANY slab cut.',
    addition: '🔧 Room additions require new grade beams at the addition perimeter tied to existing beams. The connection detail is critical — improper ties cause differential settlement. Require a structural engineer to design the beam tie-in detail.',
    tunnel: '🚇 Tunneling is preferred over slab cuts for post-tension homes. Grade beams extend 18–24 inches below slab — tunneling crews must avoid undermining beam footings. Maintain 12 inches of clearance from beam bottom during excavation.',
    eval: '📋 Ask every foundation contractor: Where are the grade beams? How does your repair plan interact with grade beams and turndown beams? Any contractor who cannot answer is not qualified for DFW post-tension slab work.',
  };

  const beamTypes = [
    { icon: '🔲', name: 'Exterior Grade Beam', depth: '18–24 inches', width: '12 inches', role: 'Carries perimeter loads, deepest point' },
    { icon: '➕', name: 'Interior Turndown Beam', depth: '12–18 inches', width: '8–12 inches', role: 'Under load-bearing walls, thickened slab' },
    { icon: '⚡', name: 'Post-Tension Paths', depth: 'Slab depth 4–5 in', width: 'Cable spacing 4–5 ft', role: 'Runs between beams, avoid cutting' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏗️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#F5E642', margin: '0 0 8px' }}>DFW Grade Beam Foundation Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>Grade beams in DFW slab foundations — where they are, what they do, and why they matter for every repair</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {beamTypes.map(b => (
            <div key={b.name} style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '32px', flexShrink: 0 }}>{b.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginBottom: '6px' }}>{b.name}</div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '13px' }}>Depth: <strong style={{ color: '#E8EAF0′ }}>{b.depth}</strong></span>
                  <span style={{ color: '#94A3B8', fontSize: '13px' }}>Width: <strong style={{ color: '#E8EAF0′ }}>{b.width}</strong></span>
                </div>
                <div style={{ color: '#64748B', fontSize: '13px' }}>{b.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>🔧 Foundation Work Type → Grade Beam Awareness</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {workTypes.map(w => (
              <button key={w.key} onClick={() => { setWorkType(w.key); setAwareness(awarenesses[w.key]); }}
                style={{ background: workType === w.key ? '#F5E642′ : '#1E3A5F', color: workType === w.key ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: '8px', padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: '600′ }}>
                {w.label}
              </button>
            ))}
          </div>
          {awareness && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#E8EAF0', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{awareness}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2240', border: '1px solid #1E3A5F', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>📍 How to Identify Grade Beam Locations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {[
              { icon: '🗺️', method: 'Original Engineering Plans', note: 'Request from builder or city building dept' },
              { icon: '📡', method: 'GPR Scan', note: 'Ground-penetrating radar — most accurate' },
              { icon: '🏠', method: 'Exterior Inspection', note: 'Grade beam runs at foundation perimeter' },
              { icon: '🧱', method: 'Wall Identification', note: 'Interior beams run under load-bearing walls' },
            ].map(m => (
              <div key={m.method} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{m.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{m.method}</div>
                <div style={{ color: '#64748B', fontSize: '12px' }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}