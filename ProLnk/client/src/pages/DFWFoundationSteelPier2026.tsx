import { useState } from 'react';

const concerns = [
  { id: 'corner', label: 'Corner Cracking', icon: '📐', applicable: true, depth: '18–22 ft', count: '4–6 piers', desc: 'Corner settlement is ideal for push piers. Hydraulic ram drives steel sections until refusal on bedrock or dense stratum.' },
  { id: 'center', label: 'Center Sag', icon: '📉', applicable: true, depth: '20–28 ft', count: '8–14 piers', desc: 'Interior sag requires piers along grade beam at multiple points. More complex but fully addressable with steel piers.' },
  { id: 'uniform', label: 'Uniform Settling', icon: '↕️', applicable: false, depth: 'N/A', count: 'N/A', desc: 'Uniform settling (whole house same level) often needs piers around full perimeter. May indicate soil shrinkage — engineering report first.' },
  { id: 'active', label: 'Active Movement', icon: '🔄', applicable: true, depth: '22–30 ft', count: '6–10 piers', desc: 'Active movement requires deep refusal. DFW bedrock (Austin Chalk) typically 20–25 ft. Piers lock foundation to stable layer.' },
  { id: 'stair', label: 'Stair-Step Brick Cracks', icon: '🧱', applicable: true, depth: '15–20 ft', count: '3–5 piers', desc: 'Classic DFW clay soil symptom. Stair-step cracking in brick veneer indicates localized corner or edge movement — highly treatable.' },
];

export default function DFWFoundationSteelPier2026() {
  const [selected, setSelected] = useState('corner');
  const active = concerns.find(c => c.id === selected) || concerns[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚙️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Steel Push Pier Deep Dive 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>How steel push piers solve foundation settlement in North Texas clay soil</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔎 Select Foundation Concern</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                  background: selected === c.id ? '#F5E642′ : '#1e3a5f',
                  color: selected === c.id ? '#0A1628′ : '#fff', border: ’none', fontSize: '0.85rem' }}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a3a6e', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>{active.icon} {active.label} — {active.applicable ? '✅ Push Pier Candidate' : '⚠️ Evaluate First'}</div>
            {active.applicable && (
              <div style={{ display: 'flex', gap: '1rem', marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ background: '#0f2040', padding: '0.3rem 0.8rem', borderRadius: 6, color: '#F5E642', fontSize: '0.85rem' }}>📏 Depth: {active.depth}</span>
                <span style={{ background: '#0f2040', padding: '0.3rem 0.8rem', borderRadius: 6, color: '#F5E642', fontSize: '0.85rem' }}>🔩 Piers: {active.count}</span>
              </div>
            )}
            <p style={{ color: '#cbd5e1', margin: 0 }}>{active.desc}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🔩', title: 'How Push Piers Work', text: 'A hydraulic ram drives interlocking steel sections through soil until reaching refusal — the point where resistance means stable load-bearing layer. A steel bracket then transfers the foundation load from unstable soil to the pier.' },
            { icon: '📏', title: 'Typical DFW Depths', text: 'Austin Chalk limestone sits 15–25 feet beneath most DFW homes. This is the target refusal layer. Sandy or gravel strata can also provide refusal at shallower depths in some East DFW areas.' },
            { icon: '🏗️', title: 'Grade Beam Bracket', text: 'The bracket welds or bolts to the concrete grade beam (foundation perimeter beam). This is the load transfer mechanism — the pier now carries the weight, not the soil below.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#0f2040', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW Foundation Evaluation</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>ProLnk connects you with certified DFW structural engineers and foundation repair contractors</p>
        </div>
      </div>
    </div>
  );
}