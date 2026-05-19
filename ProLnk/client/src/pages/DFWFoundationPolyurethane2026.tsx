import { useState } from 'react';

export default function DFWFoundationPolyurethane2026() {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');

  const getGuide = () => {
    if (!location) { setResult('Please select a concrete location.'); return; }
    const guides: Record<string, string> = {
      driveway: '🚗 DRIVEWAY: Polyurethane foam lifting is an excellent option for sunken driveway sections. Lighter than mudjacking (better for DFW clay which has limited bearing capacity), lifts in minutes, and cures in 15-30 min. Cost: $500-1,500 per section vs. full replacement at $3,000-8,000. Best for settlement under 3 inches.',
      sidewalk: '🚶 SIDEWALK: Polyurethane is ideal for sunken sidewalk panels — trip hazard elimination is the primary goal and foam achieves it fast with minimal disruption. A 2-panel sidewalk lift typically runs $300-700. Lighter than mudjacking reduces risk of further settlement in DFW clay.',
      interior: '🏠 INTERIOR FLOOR: Polyurethane foam for interior DFW slab settling is specialized work — requires smaller injection ports and precise expansion control. Cost: $1,500-4,000 for a typical room. More appropriate than mudjacking for interior use since it\’s lighter and doesn\’t require water slurry. Get multiple quotes and verify contractor experience with interior lifts.',
      porch: '🏡 PORCH/PATIO: Great polyurethane candidate. Settled porches and patios in DFW are extremely common due to clay movement under the perimeter of covered areas. Foam lifts fast, is invisible when done, and costs $400-1,200 typically. Verify the porch is not structurally connected to the home foundation before lifting.'
    };
    setResult(guides[location] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💉 DFW Polyurethane Foundation Lifting Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Expanding polyurethane foam is the modern alternative to mudjacking for sunken concrete — faster, lighter, and better suited for DFW clay soil conditions.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>⚗️ Polyurethane vs. Mudjacking in DFW</h2>
          {[['Weight','Polyurethane: 2-4 lbs/ft³ | Mudjacking slurry: 100+ lbs/ft³ — critical in DFW clay'],['Cure Time','Polyurethane: 15-30 min | Mudjacking: 24-48 hours before traffic'],['Precision','Foam expands to fill voids precisely — mudjacking can overshoot'],['Cost','Polyurethane: 25-50% more expensive | Worth it for interior and clay-soil applications'],['DFW Advantage','Lighter foam reduces total load on DFW clay — lower risk of future re-settlement']].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</span>
              <span style={{ color: '#94a3b8', fontSize: 13, maxWidth: '58%', textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔬 How the Process Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Small Ports','5/8" holes drilled through concrete — nearly invisible when patched'],['Foam Injection','Two-part polyurethane injected under pressure — expands to fill voids'],['Precision Lift','Technician monitors lift in real-time and stops at target elevation'],['Fast Cure','Ready for traffic in 15-30 minutes — no waiting like mudjacking']].map(([title, desc]) => (
              <div key={title} style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧮 Get Location-Specific Guidance</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Where is the sunken concrete?</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}>
              <option value=''>Select location...</option>
              <option value='driveway'>Driveway section</option>
              <option value='sidewalk'>Sidewalk panel</option>
              <option value='interior'>Interior floor / settled slab</option>
              <option value='porch'>Porch or patio</option>
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Lifting Guide →</button>
          {result && <div style={{ marginTop: 16, background: '#1a2f50', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Find a DFW Foundation Lifting Specialist via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk matches you with licensed DFW foundation contractors experienced in both polyurethane foam lifting and traditional mudjacking. Background-checked, insured, and rated.</p>
        </div>
      </div>
    </div>
  );
}