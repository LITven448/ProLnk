import { useState } from 'react';

const homeSizes = [
  { label: 'Under 1,500 sq ft', minReturns: 2, cfmNeeded: 1000 },
  { label: '1,500-2,500 sq ft', minReturns: 2, cfmNeeded: 1600 },
  { label: '2,500-3,500 sq ft', minReturns: 3, cfmNeeded: 2200 },
  { label: 'Over 3,500 sq ft', minReturns: 4, cfmNeeded: 2800 },
];

const returnCounts = [
  { label: '1 central return only', cfmCapacity: 700, adequacy: 'Severely undersized', issue: 'Classic DFW problem. Positive pressure in bedrooms forces hot attic air in through ceiling gaps.' },
  { label: '2 returns (1 per floor)', cfmCapacity: 1400, adequacy: 'Marginal', issue: 'Common in 2-story DFW homes. Upstairs bedrooms often have positive pressure in summer.' },
  { label: '3 returns', cfmCapacity: 2100, adequacy: 'Adequate for most homes', issue: 'Functional for homes under 2,500 sq ft. Larger homes may still have bedroom pressure issues.' },
  { label: '4+ returns or dedicated per zone', cfmCapacity: 2800, adequacy: 'Well-designed', issue: 'Best practice. Each major zone has return air and even pressure throughout.' },
];

const improvements = [
  { name: 'Add return air duct', cost: '$400-$800 per location', desc: 'Cut new return grille in hallway near bedrooms; run flex duct back to air handler' },
  { name: 'Jump duct or transfer grille', cost: '$150-$350 per room', desc: 'Passive air transfer between bedroom and hallway - no ductwork to air handler needed' },
  { name: 'Door undercut enlargement', cost: '$0-$50', desc: 'Increase gap under bedroom doors to allow passive air return - most overlooked fix' },
  { name: 'Return plenum expansion', cost: '$600-$1,200', desc: 'Enlarge the return plenum at the air handler to accept more airflow capacity' },
];

export default function DFWReturnAirGuide() {
  const [sizeIdx, setSizeIdx] = useState(1);
  const [returnIdx, setReturnIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const home = homeSizes[sizeIdx];
  const ret = returnCounts[returnIdx];
  const adequate = ret.cfmCapacity >= home.cfmNeeded;
  const deficit = Math.max(0, home.cfmNeeded - ret.cfmCapacity);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>Return Air DFW HVAC Guide</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Return Air Problems in DFW Homes</h1>
        <p style={{ color: '#9BA4B4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          Most DFW homes were built with a single central return air grille. In a 100 degree summer that means every closed bedroom door creates a positive pressure zone which forces hot attic air into the living space through every light fixture and ceiling gap.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>The DFW Builder Minimum Problem</h2>
          <p style={{ color: '#CBD2E0', lineHeight: 1.7, marginBottom: 12 }}>
            DFW builders followed minimum code: one central return in a hallway. When bedroom doors close, the air handler creates negative pressure at the return and positive pressure in bedrooms. That pressure differential equalizes through every gap in your ceiling and exterior walls.
          </p>
          <div style={{ background: '#162035', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>The DFW summer consequence:</div>
            <div style={{ color: '#9BA4B4', fontSize: 14, lineHeight: 1.6 }}>
              A 140 degree attic is connected to your bedroom through pressure. Your AC is actively pulling hot air in. This can add 2,000-4,000 BTU per hour of heat gain per room, forcing the system to work 15-25% harder.
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Fix Options (Least to Most Invasive)</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {improvements.map(imp => (
              <div key={imp.name} style={{ background: '#162035', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: '#E8EAF0' }}>{imp.name}</div>
                  <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 12 }}>{imp.cost}</div>
                </div>
                <div style={{ color: '#9BA4B4', fontSize: 14, lineHeight: 1.5 }}>{imp.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>Check My DFW Home</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Home size:</label>
            <select value={sizeIdx} onChange={e => { setSizeIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {homeSizes.map((h, i) => <option key={i} value={i}>{h.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Current number of return air grilles:</label>
            <select value={returnIdx} onChange={e => { setReturnIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {returnCounts.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Check My Return Air
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${adequate ? '#22C55E' : '#EF4444'}` }}>
              <div style={{ fontWeight: 700, color: adequate ? '#22C55E' : '#EF4444', marginBottom: 10, fontSize: 16 }}>
                {adequate ? 'Return Air: Adequate' : 'Return Air: Undersized'}
              </div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Your system needs:</strong> {home.cfmNeeded} CFM return capacity</div>
              <div style={{ color: '#CBD2E0', marginBottom: 6 }}><strong>Current capacity estimate:</strong> {ret.cfmCapacity} CFM</div>
              {!adequate && <div style={{ color: '#EF4444', marginBottom: 6 }}><strong>Deficit:</strong> {deficit} CFM - {Math.ceil(deficit / 700)} additional return(s) recommended</div>}
              <div style={{ color: '#CBD2E0', marginBottom: 8 }}><strong>Assessment:</strong> {ret.adequacy}</div>
              <div style={{ color: '#9BA4B4', fontSize: 14, lineHeight: 1.6 }}>{ret.issue}</div>
              {!adequate && (
                <div style={{ marginTop: 12, color: '#F5E642', fontWeight: 600 }}>
                  Recommended fix: Jump ducts or transfer grilles for bedrooms (${Math.ceil(deficit / 700) * 250} to ${Math.ceil(deficit / 700) * 500} estimated)
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
