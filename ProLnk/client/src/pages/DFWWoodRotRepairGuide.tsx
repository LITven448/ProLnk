import { useState } from 'react';

const rotLocations = ['Fascia Boards', 'Window Sills', 'Door Frames', 'Deck Posts'];
const extents = ['Superficial (Surface Only)', 'Moderate (< 1″ Deep)', 'Severe (Structural Softness)', 'Complete Failure'];

function getPlan(location: string, extent: string) {
  const materials: Record<string, string> = {
    'Fascia Boards': 'PVC or Fiber Cement Replacement Board',
    'Window Sills': 'Epoxy Wood Filler + Primer + Paint',
    'Door Frames': 'Epoxy Consolidant + Filler or Full Frame Replacement',
    'Deck Posts': 'Post Replacement + Post Base Hardware',
  };
  const approach: Record<string, string> = {
    'Superficial (Surface Only)': 'Epoxy Filler + Sand + Prime + Paint',
    'Moderate (< 1″ Deep)': 'Epoxy Consolidant + Filler Rebuild',
    'Severe (Structural Softness)': 'Full Section or Board Replacement',
    'Complete Failure': 'Full Replacement — Structural Safety Issue',
  };
  const baseCosts: Record<string, number> = {
    'Fascia Boards': 600,
    'Window Sills': 250,
    'Door Frames': 400,
    'Deck Posts': 800,
  };
  const extentMultiplier: Record<string, number> = {
    'Superficial (Surface Only)': 0.4,
    'Moderate (< 1″ Deep)': 0.75,
    'Severe (Structural Softness)': 1.2,
    'Complete Failure': 2.0,
  };
  const prevention: Record<string, string> = {
    'Fascia Boards': 'Install aluminum fascia cap or use PVC board; clean gutters to prevent overflow',
    'Window Sills': 'Caulk all gaps annually; apply exterior paint every 5–7 years',
    'Door Frames': 'Ensure door sweep seals properly; overhang protects frame from direct rain',
    'Deck Posts': 'Use post base hardware to keep post off concrete; apply sealant every 2 years',
  };
  return {
    material: materials[location],
    approach: approach[extent],
    cost: Math.round(baseCosts[location] * extentMultiplier[extent]),
    prevention: prevention[location],
    diy: extent === 'Superficial (Surface Only)' || (extent === 'Moderate (< 1″ Deep)' && location !== 'Deck Posts'),
  };
}

export default function DFWWoodRotRepairGuide() {
  const [location, setLocation] = useState('');
  const [extent, setExtent] = useState('');
  const result = location && extent ? getPlan(location, extent) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🪵 DFW Wood Rot Repair Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW's humidity — especially in spring — accelerates wood rot on exposed exterior components. Catching it early saves thousands in replacement costs.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏠', title: 'Fascia Boards', desc: 'Runs along your roofline where gutters attach. DFW homes with overflowing gutters saturate fascia year after year — wood rot is nearly guaranteed within 10 years without protection.' },
            { icon: '🪟', title: 'Window Sills', desc: 'Horizontal sills collect rainwater and debris. Paint failure in DFW\’s UV-intense summers exposes bare wood to rapid moisture penetration and rot.' },
            { icon: '🚪', title: 'Door Frames', desc: 'Bottom corners of exterior door frames are a rot hotspot — water pools here after rain and wicks into the wood. Often misdiagnosed as a settling crack.' },
            { icon: '🏗️', title: 'Deck Posts', desc: 'Where post meets concrete or soil is where rot starts. DFW clay holds moisture around post bases long after rain — a post base bracket is the best prevention.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div style={{ color: '#F5E642', fontWeight: 600, marginTop: 6, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🧪 Epoxy Filler vs. Board Replacement</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 6 }}>✅ Use Epoxy Filler When</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
                <li>Rot is surface-level or under 1" deep</li>
                <li>Surrounding wood is still structurally firm</li>
                <li>Area is less than 6" × 6″</li>
                <li>Component is non-load-bearing</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#f87171', fontWeight: 600, marginBottom: 6 }}>🔴 Replace the Board When</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
                <li>Wood is soft more than 1" deep</li>
                <li>Structural component (deck post, header)</li>
                <li>Rot spans more than 30% of the board</li>
                <li>Fungal growth visible (black/green staining)</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Repair Estimator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Rot Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select location</option>
                {rotLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Extent of Rot</label>
              <select value={extent} onChange={e => setExtent(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select extent</option>
                {extents.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Approach</div>
                  <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700 }}>{result.approach}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Est. Cost</div>
                  <div style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700 }}>${result.cost.toLocaleString()}</div>
                </div>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>DIY?</div>
                  <div style={{ color: result.diy ? '#4ade80′ : '#f87171', fontSize: '1rem', fontWeight: 700 }}>{result.diy ? ’Possible' : 'Hire Pro'}</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid #1e3a5f', paddingTop: '0.75rem', fontSize: '0.85rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>🛡️ Best Material: {result.material}</div>
                <div style={{ color: '#94a3b8′ }}>💡 Prevention: {result.prevention}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
