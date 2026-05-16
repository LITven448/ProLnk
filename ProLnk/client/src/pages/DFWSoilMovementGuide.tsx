import { useState } from 'react';

const movementTypes = [
  { key: 'cracks_drywall', label: 'Diagonal cracks in drywall at door/window corners' },
  { key: 'sticking_doors', label: 'Doors or windows sticking or not latching' },
  { key: 'gaps_crown', label: 'Gaps between crown molding and ceiling' },
  { key: 'floor_slope', label: 'Sloping or uneven floors' },
  { key: 'exterior_cracks', label: 'Brick or stucco exterior cracks' },
  { key: 'driveway', label: 'Cracked, heaving, or sunken driveway/patio' },
];

const results: Record<string, { verdict: string; color: string; monitor: string[]; callEngineer: boolean }> = {
  cracks_drywall: { verdict: 'Likely Normal Seasonal Movement', color: '#F5E642', monitor: ['Mark cracks with pencil and date them', 'Check width again in 3 months', 'If crack grows wider than 1/4 inch, escalate'], callEngineer: false },
  sticking_doors: { verdict: 'Monitor Closely — Common But Worth Tracking', color: '#FB923C', monitor: ['Note which season doors stick most', 'Check if sticking is getting progressively worse year-over-year', 'Severe sticking with new cracks = engineer now'], callEngineer: false },
  gaps_crown: { verdict: 'Likely Normal — Seasonal Gap Opening', color: '#F5E642', monitor: ['Gaps should close partially in wet season', 'If gap is over 1/2 inch year-round, investigate further', 'Combined with floor slope = red flag'], callEngineer: false },
  floor_slope: { verdict: 'Warrants Evaluation — Slope Over 1 Inch Concerns', color: '#FB923C', monitor: ['Use a level to measure slope across 10 feet', 'Document measurements seasonally', 'Slope over 2 inches in 10 feet requires engineer assessment'], callEngineer: true },
  exterior_cracks: { verdict: 'Significant — Schedule Structural Review', color: '#EF4444', monitor: ['Photograph and measure all exterior cracks', 'Horizontal cracks in brick are more serious than vertical', 'Do not caulk cracks until cause is understood'], callEngineer: true },
  driveway: { verdict: 'Normal for DFW — Cosmetic Unless Severe', color: '#F5E642', monitor: ['DFW driveways average 5-8 inch seasonal movement', 'Hairline cracks are cosmetic', 'Heaving near foundation edge or sinking near house = call engineer'], callEngineer: false },
};

export default function DFWSoilMovementGuide() {
  const [selected, setSelected] = useState('');
  const [res, setRes] = useState<null | typeof results[string]>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌍</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Soil Movement & Subsidence Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>DFW is built on Blackland Prairie — some of the most expansive clay soil in the US. This soil swells up to 8 inches when wet and contracts when dry. Every structure on it moves. Here is how to know when movement is normal and when it is not.</p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📊 The DFW Soil Reality</h2>
          {[['5-8 inches', 'Typical seasonal vertical movement of DFW clay soil'],['Every structure moves', 'Roads, foundations, driveways, patios — all shift seasonally'],['Wet season rises', 'Heavy spring rains expand soil — doors stick, floors shift'],['Dry season drops', 'Hot summers contract soil — gaps appear, cracks open'],['Foundation maintenance matters', 'Watering foundation perimeter during drought slows contraction damage']].map(([stat, desc]) => (
            <div key={stat} style={{ display: 'flex', gap: 16, borderBottom: '1px solid #1E2D4A', padding: '10px 0', alignItems: 'flex-start' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, minWidth: 120, fontSize: 15 }}>{stat}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 What Are You Seeing?</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {movementTypes.map(mt => (
              <button key={mt.key} onClick={() => { setSelected(mt.key); setRes(results[mt.key]); }} style={{ background: selected === mt.key ? '#F5E642' : '#0A1628', color: selected === mt.key ? '#0A1628' : '#E8EDF5', border: '1px solid #1E2D4A', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontSize: 14, textAlign: 'left', fontWeight: selected === mt.key ? 700 : 400 }}>{mt.label}</button>
            ))}
          </div>
        </div>

        {res && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, borderLeft: `4px solid ${res.color}` }}>
              <div style={{ fontWeight: 700, color: res.color, marginBottom: 4 }}>Assessment</div>
              <div style={{ fontSize: 16 }}>{res.verdict}</div>
            </div>
            <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>📋 What to Monitor</h3>
            <ul style={{ paddingLeft: 20, marginBottom: 16 }}>{res.monitor.map((m, i) => <li key={i} style={{ marginBottom: 6, color: '#E8EDF5' }}>{m}</li>)}</ul>
            {res.callEngineer && (
              <div style={{ background: '#3B1A00', borderRadius: 8, padding: 16, borderLeft: '4px solid #EF4444' }}>
                <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 4 }}>🔴 Get a Structural Engineer</div>
                <div style={{ color: '#FCA5A5', fontSize: 14 }}>The pattern you are describing warrants a professional foundation evaluation. A licensed structural engineer (not a foundation repair company) gives unbiased assessment. Expect -600 for inspection report.</div>
              </div>
            )}
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>💡 Insurance Note</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>Foundation/soil movement damage is generally excluded from standard homeowner policies. Separate foundation insurance riders exist but are expensive. Prevention via foundation watering is your best tool.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
