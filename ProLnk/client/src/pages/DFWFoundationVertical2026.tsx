import { useState } from 'react';

export default function DFWFoundationVertical2026() {
  const [observation, setObservation] = useState('');
  const [result, setResult] = useState('');

  const observations = [
    { id: 'sinking_corner', label: 'Corner of home sinking' },
    { id: 'floors_humping', label: 'Floors humping up in center' },
    { id: 'wall_cracking', label: 'Diagonal cracks at door corners' },
    { id: 'garage_door', label: 'Garage door gap at corner' },
  ];

  const assessments: Record<string, { direction: string; color: string; explanation: string; steps: string[] }> = {
    sinking_corner: {
      direction: 'VERTICAL SETTLEMENT', color: '#ef4444',
      explanation: 'Foundation sinking into soil — common in DFW when perimeter dries out in summer drought.',
      steps: [
        '📉 Corner dropping = perimeter soil has dried and shrunk under edge',
        '💧 DFW remedy: consistent perimeter moisture with soaker hose program',
        '🔩 Pier and beam repair or pressed concrete pilings may be needed',
        '📏 Get elevation survey — tells engineer how much differential movement has occurred',
        '✅ Repair approach: re-level with pilings driven to stable stratum',
      ],
    },
    floors_humping: {
      direction: 'HEAVE (Upward Movement)', color: '#f97316',
      explanation: 'Center of slab pushing up — typically from soil rehydration under DFW slab interior.',
      steps: [
        '📈 Humping floors = interior soil rehydrating and expanding',
        '💧 Common cause: plumbing leak under slab, tree removal, or AC condensate discharge',
        '⚠️ Heave is often harder to repair than settlement in DFW',
        '🔍 Plumber must scope under-slab lines BEFORE foundation work starts',
        '✅ Repair approach: address moisture source first, then monitor 6-12 months',
      ],
    },
    wall_cracking: {
      direction: 'DIFFERENTIAL MOVEMENT', color: '#f97316',
      explanation: 'Different parts of foundation moving at different rates — very common in DFW expansive clay.',
      steps: [
        '↕️ Diagonal cracks at door corners = classic differential settlement pattern',
        '📐 One corner settling while another stays put = different moisture levels',
        '🌿 Check: tree on one side, no irrigation on settling side?',
        '📏 Elevation survey confirms which corners are high and low',
        '✅ Repair: selective piers at low corners while protecting high areas',
      ],
    },
    garage_door: {
      direction: 'PERIMETER SETTLEMENT', color: '#f97316',
      explanation: 'Garage slab settling relative to house slab — common at DFW expansion joints.',
      steps: [
        '🚗 Garage door gap at corner = garage slab or house slab dropped',
        '🔗 Expansion joint allows independent movement — check which slab moved',
        '💧 Garage edges dry faster in DFW summers — common perimeter settlement zone',
        '📏 String line or laser level confirms direction and amount of drop',
        '✅ Often addressed with 2-4 pilings at garage perimeter — less expensive repair',
      ],
    },
  };

  const handleObservation = (id: string) => { setObservation(id); setResult(id); };
  const current = assessments[result];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏗️ DFW Foundation Movement Direction Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Understanding vertical settlement vs heave vs differential movement in DFW clay foundations.</p>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📊 Movement Types in DFW</div>
          {[
            { icon: '📉', type: 'Settlement', desc: 'Foundation sinking — soil drying and shrinking under slab. Most common in DFW summer drought.' },
            { icon: '📈', type: 'Heave', desc: 'Foundation pushing up — soil rehydrating under slab. Often from plumbing leaks or tree removal.' },
            { icon: '↔️', type: 'Lateral', desc: 'Foundation sliding sideways — rare in DFW. More common on slopes or near retaining walls.' },
            { icon: '↕️', type: 'Differential', desc: 'Different parts moving different amounts — most common DFW pattern due to uneven moisture.' },
          ].map((item) => (
            <div key={item.type} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div><div style={{ fontWeight: 600 }}>{item.type}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 What I Am Observing</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            {observations.map((s) => (
              <button key={s.id} onClick={() => handleObservation(s.id)} style={{ backgroundColor: observation === s.id ? '#F5E642' : '#1a2f50', color: observation === s.id ? '#0A1628' : '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</button>
            ))}
          </div>
          {current && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: current.color, fontWeight: 700, marginBottom: '0.4rem' }}>{current.direction}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{current.explanation}</div>
              {current.steps.map((step, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{step}</div>)}
              <div style={{ marginTop: '1rem', color: '#F5E642', fontSize: '0.85rem' }}>ProLnk matches you with DFW structural engineers and foundation contractors who give honest assessments. 🛡️</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
