import { useState } from 'react';

const crackData: Record<string, { severity: string; color: string; action: string; details: string[] }> = {
  hairline: { severity: 'NORMAL — Monitor Only', color: '#22c55e', action: 'Monitor annually. No immediate action needed.', details: ['Less than 1/16" wide','Common in new construction settling','Typically cosmetic only','Seal with hydraulic cement as maintenance','Re-inspect in 12 months'] },
  stairstep: { severity: 'WARNING — Evaluate Soon', color: '#f59e0b', action: 'Schedule foundation inspection within 30–60 days.', details: ['Follows mortar joints in brick or block','Indicates differential settlement','DFW clay soil expansion/contraction typical cause','If crack is widening: urgent evaluation needed','Engineer or foundation specialist recommended'] },
  horizontal: { severity: 'SERIOUS — Act Now', color: '#ef4444', action: 'Contact a licensed foundation engineer immediately.', details: ['Indicates lateral pressure on wall','Most serious crack type in basements','Can signal imminent structural failure','Do not ignore or delay','May require wall anchors, carbon fiber straps, or excavation'] },
  vertical: { severity: 'MODERATE — Evaluate', color: '#f59e0b', action: 'Monitor for movement; inspect within 30 days.', details: ['Often from settlement or curing shrinkage','Straight vertical = less concern','Tapered or widening = more concern','Mark ends with pencil + date to track movement','Wider than 1/4": get engineer opinion'] },
  diagonal: { severity: 'WARNING — Evaluate Soon', color: '#f59e0b', action: 'Foundation inspection recommended within 30 days.', details: ['45-degree cracks near corners = differential settlement','DFW clay soil a primary cause','Plumbing leak beneath slab can accelerate','Check for door/window sticking alongside crack','Pier and beam vs slab — different repair approach'] },
  widegaping: { severity: 'URGENT — Immediate Action', color: '#dc2626', action: 'Stop use of affected area. Call structural engineer today.', details: ['Any crack wider than 1/4"','Structural integrity may be compromised','Document with photos before any repair','Do not attempt DIY repair','Insurance may cover if sudden/accidental cause'] },
};

export default function DFWFoundationCracksGuide2026() {
  const [crackType, setCrackType] = useState('');
  const result = crackType ? crackData[crackType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME HEALTH VAULT · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Foundation Cracks Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>DFW's expansive clay soil is notorious for foundation movement. Not all cracks are created equal — learn what you're looking at before you panic or ignore it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 32 }}>
          {[['🧱','DFW Clay Soil','Shrinks in drought, expands in rain'],['🏠','#1 DFW Issue','Foundation repair most common home repair'],['💲','Repair Range','$1,500–$25,000+ depending on severity']].map(([icon, title, sub]) => (
            <div key={title} style={{ background: '#1a2744', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642' }}>{title}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Crack Severity Rating</h2>
          <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 14 }}>Describe the crack:</label>
          <select value={crackType} onChange={e => setCrackType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155', fontSize: 15, marginBottom: 16 }}>
            <option value=''>-- Select crack type --</option>
            <option value='hairline'>Hairline crack (spider web, very thin)</option>
            <option value='stairstep'>Stair-step crack in brick/block</option>
            <option value='horizontal'>Horizontal crack in wall</option>
            <option value='vertical'>Vertical crack running up/down</option>
            <option value='diagonal'>Diagonal / 45-degree crack near corner</option>
            <option value='widegaping'>Wide or gaping crack (1/4"+ wide)</option>
          </select>
          {result && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, borderLeft: `4px solid ${result.color}` }}>
                <div style={{ fontWeight: 800, color: result.color, marginBottom: 4 }}>{result.severity}</div>
                <div style={{ fontSize: 14, color: '#cbd5e1' }}>{result.action}</div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Details:</div>
              {result.details.map(d => <div key={d} style={{ fontSize: 14, color: '#cbd5e1', marginBottom: 6 }}>• {d}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642' }}>🌿 DFW Prevention Tips</div>
          {[['💧','Water Consistently','Maintain consistent soil moisture with soaker hose in drought'],['🌳','Tree Distance','Keep large trees 20+ ft from foundation (root damage risk)'],['🏔️','Grade Away','Ensure soil slopes away from foundation — 6" drop in 10 ft'],['🔧','Annual Check','Inspect foundation every spring after winter freeze cycles']].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 18 }}>{icon}</div>
              <div><span style={{ fontWeight: 600, fontSize: 13 }}>{title}: </span><span style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
