import { useState } from 'react';

const spaceTypes = [
  { label: 'Room addition (no ductwork)', icon: '🏗️', baseScenario: 'mini-split', baseReason: 'Extending ductwork to an addition costs $3,000–$6,000+ and rarely balances well with existing system. Mini-split is almost always the right call.' },
  { label: 'Garage (detached or attached)', icon: '🚗', baseScenario: 'mini-split', baseReason: 'Garages need dedicated units — no central system is designed to serve a garage in DFW\’s heat. Mini-split is the only real option.' },
  { label: 'Bonus room (above garage)', icon: '🛋️', baseScenario: 'mini-split', baseReason: 'Bonus rooms over garages are DFW\’s worst hot spots — 10–15°F hotter than the rest of the house. Central ducts can\’t compensate; mini-split fixes it.' },
  { label: 'Sunroom / enclosed patio', icon: '☀️', baseScenario: 'mini-split', baseReason: 'High solar gain in DFW summers makes sunrooms impossible to cool with shared central systems. Dedicated mini-split is the only reliable solution.' },
  { label: 'Home office (remote from air handler)', icon: '💼', baseScenario: 'compare', baseReason: 'If the office is on the same floor and ductwork is reachable, extending ducts may be cheaper. If it\’s distant or has hot spots, mini-split wins.' },
  { label: 'Master bedroom (always too hot)', icon: '🛏️', baseScenario: 'compare', baseReason: 'If your central system is undersized for DFW heat, a mini-split supplements. But check if adding a zone damper or balancing ducts solves it first.' },
];

const sizingGuide = [
  { sqft: 150, btu: 6000, tons: 0.5 },
  { sqft: 300, btu: 9000, tons: 0.75 },
  { sqft: 450, btu: 12000, tons: 1.0 },
  { sqft: 600, btu: 18000, tons: 1.5 },
  { sqft: 750, btu: 24000, tons: 2.0 },
  { sqft: 1000, btu: 30000, tons: 2.5 },
];

const sqftOptions = [150, 300, 450, 600, 750, 1000];

function getMiniSplitCost(btu: number) {
  const base = (btu / 12000) * 1800 + 800;
  return { low: Math.round(base * 0.85), high: Math.round(base * 1.25) };
}

function getDuctExtensionCost(sqft: number) {
  const base = sqft * 4 + 1500;
  return { low: Math.round(base * 0.8), high: Math.round(base * 1.4) };
}

export default function DFWHVACMiniSplitCalc() {
  const [spaceIdx, setSpaceIdx] = useState<number | null>(null);
  const [sqft, setSqft] = useState<number | null>(null);
  const [issue, setIssue] = useState<string>('');

  const sizing = sqft ? sizingGuide.find(s => s.sqft >= sqft) || sizingGuide[sizingGuide.length - 1] : null;
  const miniCost = sizing ? getMiniSplitCost(sizing.btu) : null;
  const ductCost = sqft ? getDuctExtensionCost(sqft) : null;
  const space = spaceIdx !== null ? spaceTypes[spaceIdx] : null;

  const miniWins = space?.baseScenario === 'mini-split';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HVAC CALCULATOR</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Mini-Split vs Extend Ducts Calculator for DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: '2rem' }}>Find out when a mini-split beats extending central ductwork for DFW hot spots and difficult spaces.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', fontWeight: 700 }}>
          🌡️ DFW Rule of Thumb: <span style={{ fontWeight: 400 }}>For additions, garages, bonus rooms, and sunrooms — mini-split almost always wins in DFW. Central ductwork extension costs $3,000–$8,000+ and usually doesn't solve the heat problem.</span>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Step 1: Select Your Space Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {spaceTypes.map((s, i) => (
            <button key={i} onClick={() => setSpaceIdx(i)}
              style={{ background: spaceIdx === i ? '#162035' : '#111D33', border: `1.5px solid ${spaceIdx === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.75rem', cursor: 'pointer', color: '#E8EAF0', textAlign: 'left' }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.label}</div>
            </button>
          ))}
        </div>

        {space && (
          <div style={{ background: miniWins ? '#0D1F0D' : '#1A1A0D', border: `1.5px solid ${miniWins ? '#7ED321' : '#F5E642'}`, borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 800, color: miniWins ? '#7ED321' : '#F5E642', marginBottom: '0.5rem' }}>
              {miniWins ? '✅ Mini-Split Recommended for DFW' : '⚖️ Compare Both Options for DFW'}
            </div>
            <p style={{ color: '#E8EAF0', fontSize: '0.9rem' }}>{space.baseReason}</p>
          </div>
        )}

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#F5E642' }}>Step 2: Space Size (sq ft)</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {sqftOptions.map(s => (
            <button key={s} onClick={() => setSqft(s)}
              style={{ background: sqft === s ? '#F5E642' : '#111D33', border: `1.5px solid ${sqft === s ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', color: sqft === s ? '#0A1628' : '#E8EAF0', fontWeight: 700 }}>
              {s} sq ft
            </button>
          ))}
        </div>

        {sizing && miniCost && ductCost && (
          <div>
            <div style={{ background: '#111D33', border: '1.5px solid #1E2D45', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '0.75rem' }}>
              <div style={{ color: '#8A9BB5', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>SIZING RECOMMENDATION FOR {sqft} SQ FT IN DFW</div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div><span style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.2rem' }}>{sizing.btu.toLocaleString()} BTU</span><span style={{ color: '#8A9BB5', fontSize: '0.85rem' }}> ({sizing.tons} ton)</span></div>
              </div>
              <div style={{ color: '#8A9BB5', fontSize: '0.8rem', marginTop: '0.25rem' }}>DFW sizing adds ~10% for extreme heat load vs standard calc</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#162035', border: '2px solid #7ED321', borderRadius: 10, padding: '1rem' }}>
                <div style={{ color: '#7ED321', fontWeight: 800, marginBottom: '0.5rem' }}>🌡️ Mini-Split</div>
                <div style={{ color: '#7ED321', fontWeight: 800, fontSize: '1.5rem' }}>${miniCost.low.toLocaleString()}–${miniCost.high.toLocaleString()}</div>
                <div style={{ color: '#8A9BB5', fontSize: '0.8rem', marginTop: '0.25rem' }}>Installed, DFW labor rates</div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ color: '#7ED321' }}>✓ Precise temp control</div>
                  <div style={{ color: '#7ED321' }}>✓ High efficiency (18–26 SEER)</div>
                  <div style={{ color: '#7ED321' }}>✓ No duct heat gain</div>
                  <div style={{ color: '#8A9BB5' }}>✗ Separate thermostat</div>
                  <div style={{ color: '#8A9BB5' }}>✗ Wall unit visible</div>
                </div>
              </div>
              <div style={{ background: '#111D33', border: '1.5px solid #1E2D45', borderRadius: 10, padding: '1rem' }}>
                <div style={{ color: '#4A9EFF', fontWeight: 800, marginBottom: '0.5rem' }}>🌀 Extend Central Ducts</div>
                <div style={{ color: '#4A9EFF', fontWeight: 800, fontSize: '1.5rem' }}>${ductCost.low.toLocaleString()}–${ductCost.high.toLocaleString()}</div>
                <div style={{ color: '#8A9BB5', fontSize: '0.8rem', marginTop: '0.25rem' }}>DFW market estimate</div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ color: '#7ED321' }}>✓ Single thermostat control</div>
                  <div style={{ color: '#7ED321' }}>✓ No visible equipment</div>
                  <div style={{ color: '#E87D4A' }}>✗ May not fix hot spots</div>
                  <div style={{ color: '#E87D4A' }}>✗ Duct heat loss in DFW attics</div>
                  <div style={{ color: '#E87D4A' }}>✗ May overload existing unit</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
