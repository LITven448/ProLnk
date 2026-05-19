import { useState } from 'react';

export default function DFWConcreteGuide2026() {
  const [projectType, setProjectType] = useState('driveway');
  const [sqft, setSqft] = useState(400);

  const projectData: Record<string, { lowCost: number; highCost: number; notes: string; permitRequired: boolean }> = {
    driveway: { lowCost: 7, highCost: 12, notes: 'Concrete driveways expand and crack in DFW heat. Expansion joints every 10ft are critical. Pavers cost more upfront but easier to repair.', permitRequired: false },
    patio: { lowCost: 6, highCost: 10, notes: 'Stamped concrete adds $3-5/sqft. DFW heat causes color fade — use UV-stable sealers. Broom finish recommended for non-slip surface.', permitRequired: false },
    sidewalk: { lowCost: 6, highCost: 9, notes: 'City sidewalk repairs may require city permit and inspector. Private walkways generally permit-free under 200sqft.', permitRequired: true },
    foundation: { lowCost: 8, highCost: 14, notes: 'DFW expansive clay soil is brutal on foundations. Post-tension or pier-and-beam recommended. Always get soil test first.', permitRequired: true },
  };

  const proj = projectData[projectType];
  const low = (proj.lowCost * sqft).toLocaleString();
  const high = (proj.highCost * sqft).toLocaleString();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2 }}>DFW HOME SERVICES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Concrete & Flatwork Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW concrete projects run $6-12/sqft. Expansive clay soil and summer heat make proper joint spacing and sealing essential to longevity.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[{ icon: '🌡️', label: 'Heat Cracking', val: 'Joints every 10ft' }, { icon: '🧱', label: 'Clay Soil Risk', val: 'Proper base critical' }, { icon: '📋', label: 'Permit Varies', val: 'By project type' }].map((s, i) => (
            <div key={i} style={{ background: '#1E2D45', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, marginTop: 4, color: '#cbd5e1' }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>💰 Cost Estimator</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>PROJECT TYPE</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {Object.keys(projectData).map(t => (
                <button key={t} onClick={() => setProjectType(t)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                    background: projectType === t ? '#F5E642' : '#2d3f5a', color: projectType === t ? '#0A1628' : '#fff' }}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>SQUARE FOOTAGE: {sqft} sqft</div>
            <input type="range" min={100} max={2000} step={50} value={sqft} onChange={e => setSqft(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>${low} - ${high}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT REQUIRED</div>
              <div style={{ color: proj.permitRequired ? '#f97316' : '#22c55e', fontSize: 20, fontWeight: 800 }}>{proj.permitRequired ? 'Yes' : 'Usually No'}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 14, color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{proj.notes}</div>
        </div>
      </div>
    </div>
  );
}