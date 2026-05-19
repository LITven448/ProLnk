import { useState } from 'react';

const DOOR_MATERIALS = ['Wood', 'Steel', 'Fiberglass', 'Aluminum'];
const EXPOSURES = ['South-facing (most intense)', 'West-facing (brutal afternoon sun)', 'East-facing (morning sun)', 'North-facing (least sun)'];
const CONCERNS = ['Heat warping', 'Hail damage', 'Humidity swings', 'Fading/UV damage', 'Smart lock compatibility', 'Energy efficiency'];

const recommendations: Record<string, { material: string; reason: string; cost: string; smartLock: string }> = {
  'Wood': { material: 'Fiberglass', reason: 'DFW humidity swings cause wood to expand and contract — fiberglass mimics wood grain without warping.', cost: '$1,200–$4,500 installed', smartLock: 'Most smart locks mount on fiberglass — prep the bore kit before install.' },
  'Steel': { material: 'Fiberglass', reason: 'DFW hailstorms dent steel badly. Fiberglass resists impact and insulates better in Texas heat.', cost: '$1,200–$4,500 installed', smartLock: 'Smart lock compatible with standard 2-1/8″ bore.' },
  'Fiberglass': { material: 'Fiberglass (upgrade glaze)', reason: 'Already the best choice for DFW — but upgrade to Low-E glass inserts if sun-facing.', cost: '$200–$800 for glass upgrade', smartLock: 'Already compatible. Consider Schlage Encode or August for DFW heat tolerance.' },
  'Aluminum': { material: 'Fiberglass', reason: 'Aluminum conducts heat — bad in DFW summers. Fiberglass with polyurethane foam core cuts energy transfer dramatically.', cost: '$1,200–$4,500 installed', smartLock: 'Full door replacement — spec smart lock compatibility upfront.' },
};

export default function DFWFrontDoorGuide() {
  const [material, setMaterial] = useState('');
  const [exposure, setExposure] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | typeof recommendations['Wood']>(null);

  function handleAnalyze() {
    if (!material) return;
    setResult(recommendations[material]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>🚪 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Front Door Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW front doors take a beating. South and west exposures get relentless sun — surface temps hit 160°F+.
          Hailstorms dent steel. Humidity swings warp wood. Here's what holds up in North Texas.
        </p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '🌳 Current Door Material', value: material, setter: setMaterial, options: DOOR_MATERIALS },
            { label: '☀️ Door Exposure', value: exposure, setter: setExposure, options: EXPOSURES },
            { label: '⚠️ Primary Concern', value: concern, setter: setConcern, options: CONCERNS },
          ].map(({ label, value, setter, options }) => (
            <div key={label}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>{label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {options.map(o => (
                  <button key={o} onClick={() => setter(o)}
                    style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: '1.5px solid', cursor: 'pointer', fontSize: '0.85rem',
                      borderColor: value === o ? '#F5E642′ : '#1e3a5f', background: value === o ? '#F5E642' : '#111c30',
                      color: value === o ? '#0A1628′ : '#cbd5e1', fontWeight: value === o ? 700 : 400 }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleAnalyze} disabled={!material}
          style={{ background: material ? '#F5E642′ : '#1e3a5f', color: material ? '#0A1628' : '#475569',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: material ? 'pointer' : 'default', marginBottom: '2rem' }}>
          Get DFW Recommendation →
        </button>

        {result && (
          <div style={{ background: '#111c30', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1rem' }}>✅ Recommendation for Your DFW Home</div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>BEST MATERIAL FOR DFW CLIMATE</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{result.material}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>WHY IT WORKS IN DFW</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6 }}>{result.reason}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>💰 ESTIMATED COST</div>
                <div style={{ fontWeight: 700, color: '#F5E642′ }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.25rem' }}>🔐 SMART LOCK NOTE</div>
                <div style={{ fontSize: '0.85rem', color: '#cbd5e1′ }}>{result.smartLock}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: '#111c30', borderRadius: 10, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>🔑 DFW Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Fiberglass is the clear winner in DFW. It does not dent (hail), does not warp (humidity), and insulates better than steel.
            Budget $150–$300 extra for a Low-E glass sidelight if your entry is south or west facing.
          </div>
        </div>
      </div>
    </div>
  );
}
