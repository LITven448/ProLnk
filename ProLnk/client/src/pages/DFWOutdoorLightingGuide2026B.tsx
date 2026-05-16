import { useState } from 'react';

export default function DFWOutdoorLightingGuide2026B() {
  const [spaceType, setSpaceType] = useState('pathway');
  const [guide, setGuide] = useState('');

  const getGuide = () => {
    const guides: Record<string, string> = {
      pathway: 'Install 12V LED path lights every 6-8 feet along walkways. Use warm white (2700K) for welcoming feel. Stake lights 12 inches from path edge. Avoid direct sun locations for heat-sensitive fixtures in DFW summers.',
      patio: 'Combine string lights overhead with step lights at grade level. Use motion-sensor floodlights on corners for security. 12V transformer with timer — set for dusk-to-11pm to reduce DFW energy costs.',
      trees: 'Uplights at base of trees create dramatic effect. Use ground-mount LED spotlights, 3W-5W each. Avoid aiming directly at neighbor windows. Adjust aim seasonally as DFW trees fill out in spring.',
      garden: 'Accent spotlights highlight specimen plants and garden art. Use low-angle spotlights for texture. 12V systems allow easy DIY reconfiguration as DFW gardens change seasonally.',
      driveway: 'Bollard lights every 10-12 feet along driveway edges. Motion sensors at entry points. Use polycarbonate fixtures rated for DFW heat — avoid thin plastic that warps in July-August.',
      security: 'Motion-sensor LED floodlights at all entry points. 120-degree coverage, 20-30 foot range. Set sensitivity for large motion (not triggered by DFW wind-blown trees). Combine with a timer for always-on accent lighting.',
    };
    setGuide(guides[spaceType] ?? 'Select a space type above.');
  };

  const lightTypes = [
    { icon: '🔦', name: 'Path Lights', voltage: '12V LED', note: 'Safe, DIY-friendly, stake-in installation along walkways and bed borders.' },
    { icon: '💡', name: 'Spotlights', voltage: '12V LED', note: 'Accent trees and architecture. Adjust aim seasonally as DFW plants grow.' },
    { icon: '🌟', name: 'Uplights', voltage: '12V LED', note: 'Dramatic upward lighting for trees and architectural features.' },
    { icon: '🚨', name: 'Motion Floodlights', voltage: '120V or 12V', note: 'Security and entry coverage. Use heat-resistant models for DFW full-sun locations.' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK RESOURCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Outdoor Lighting Guide 2026 (Part 2) 💡</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Low-voltage 12V LED landscape lighting for DFW — safe, DIY-friendly, and beautiful. Transformer sizing, fixture types, and DFW-specific tips.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>⚡ Transformer Sizing for DFW Yards</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', lineHeight: 1.9, fontSize: 14 }}>
            <li><strong style={{ color: '#fff' }}>Small yard (&lt;10 fixtures):</strong> 150W transformer — enough for most 12V LED setups</li>
            <li><strong style={{ color: '#fff' }}>Medium yard (10-20 fixtures):</strong> 300W transformer with 2 zones</li>
            <li><strong style={{ color: '#fff' }}>Large yard (20+ fixtures):</strong> 600W multi-zone transformer, run multiple circuits</li>
            <li>DFW tip: Add 20% buffer to total wattage — heat increases resistance in summer</li>
          </ul>
        </div>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {lightTypes.map(l => (
            <div key={l.name} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <span style={{ fontSize: 28 }}>{l.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{l.name}</span>
                  <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{l.voltage}</span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{l.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Lighting Design Guide</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Outdoor Space Type</label>
            <select value={spaceType} onChange={e => setSpaceType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
              <option value="pathway">Pathway / Walkway</option>
              <option value="patio">Patio / Deck</option>
              <option value="trees">Trees / Landscaping</option>
              <option value="garden">Garden Beds</option>
              <option value="driveway">Driveway</option>
              <option value="security">Security / Entry</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}>Get Lighting Design</button>
          {guide && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>💡 {guide}</div>}
        </div>
        <p style={{ marginTop: 32, color: '#475569', fontSize: 13, textAlign: 'center' }}>ProLnk connects you with licensed DFW landscape lighting professionals.</p>
      </div>
    </div>
  );
}