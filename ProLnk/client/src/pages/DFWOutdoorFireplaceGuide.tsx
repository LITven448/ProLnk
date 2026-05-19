import { useState } from 'react';

const FUEL_TYPES = [
  { id: 'gas', label: '🔵 Natural Gas', note: 'Most popular in DFW — consistent flame, pipe to house, no refill', install: 1800, monthly: 25 },
  { id: 'propane', label: '🟡 Propane', note: 'Portable tanks — good where gas line not feasible', install: 800, monthly: 35 },
  { id: 'wood', label: '🪵 Wood-Burning', note: 'Authentic feel — banned during county burn bans, smoke can irritate neighbors', install: 500, monthly: 15 },
  { id: 'bioethanol', label: '♻️ Bio-Ethanol', note: 'No gas line, no vent, but limited heat output — decorative more than functional', install: 600, monthly: 40 },
];

const STRUCTURE_TYPES = [
  { id: 'builtin', label: '🧱 Built-In Fireplace', costLow: 3500, costHigh: 15000, note: 'Masonry or prefab steel — permanent, requires permit, adds home value' },
  { id: 'firepit', label: '🔥 In-Ground Fire Pit', costLow: 1500, costHigh: 5000, note: 'Excavated into patio, stone or concrete surround, gas or wood' },
  { id: 'portable', label: '🪣 Portable Fire Bowl/Pit', costLow: 200, costHigh: 1200, note: 'No permit needed, move as needed, limited heat radius' },
  { id: 'table', label: '🪑 Fire Table', costLow: 800, costHigh: 3500, note: 'Integrated into outdoor furniture, propane, conversational setup' },
];

const BURN_BAN_COUNTIES = ['Dallas', 'Tarrant', 'Collin', 'Denton', 'Rockwall', 'Ellis', 'Johnson', 'Parker'];

export default function DFWOutdoorFireplaceGuide() {
  const [fuel, setFuel] = useState(FUEL_TYPES[0]);
  const [structure, setStructure] = useState(STRUCTURE_TYPES[0]);
  const [hasHOA, setHasHOA] = useState(false);
  const [spaceSize, setSpaceSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [showResult, setShowResult] = useState(false);

  const permitRequired = structure.id === 'builtin' || structure.id === 'firepit';
  const woodBurnBanRisk = fuel.id === 'wood';
  const costLow = structure.costLow + fuel.install;
  const costHigh = structure.costHigh + fuel.install;

  const clearance = spaceSize === 'small' ? '⚠️ Tight — ensure 10 ft clearance from structures' : spaceSize === 'medium' ? '✅ Adequate — maintain 10 ft clearance from overhangs' : '✅ Plenty of space — ideal placement flexibility';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
          🔥 DFW OUTDOOR FIREPLACE GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Outdoor Fireplaces & Fire Pits in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW's drought-prone climate means fire bans can shut down your wood-burning setup. Choose your fuel and structure wisely.</p>

        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <h2 style={{ color: '#ef4444', fontSize: 16, marginBottom: 8 }}>🚫 DFW County Burn Bans</h2>
          <p style={{ color: '#fca5a5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>During drought conditions — which occur frequently in DFW — county judges can issue outdoor burn bans. These apply to ALL outdoor burning including wood fire pits and fireplaces. Gas and propane units are exempt. Burn ban violations carry fines up to $500. Check your county's current burn ban status before every use.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {BURN_BAN_COUNTIES.map(c => <span key={c} style={{ background: '#7f1d1d', color: '#fca5a5', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>{c} County</span>)}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>⛽ Fuel Type Comparison</h2>
          {FUEL_TYPES.map(f => (
            <div key={f.id} onClick={() => setFuel(f)} style={{ background: fuel.id === f.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${fuel.id === f.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>{f.label}</span>
                <span style={{ color: '#F5E642', fontSize: 13 }}>Install: +${f.install.toLocaleString()}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🏗️ Structure Types</h2>
          {STRUCTURE_TYPES.map(s => (
            <div key={s.id} onClick={() => setStructure(s)} style={{ background: structure.id === s.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${structure.id === s.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700 }}>{s.label}</span>
                <span style={{ color: '#F5E642', fontSize: 13 }}>${s.costLow.toLocaleString()}–${s.costHigh.toLocaleString()}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔢 My Situation</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>Outdoor Space Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            {(['small', 'medium', 'large'] as const).map(s => (
              <div key={s} onClick={() => setSpaceSize(s)} style={{ background: spaceSize === s ? '#1e3a5f' : '#0A1628', border: `2px solid ${spaceSize === s ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, cursor: 'pointer', textAlign: 'center', fontWeight: 600, textTransform: 'capitalize' }}>
                {s === 'small' ? '🏘️ Small' : s === 'medium' ? '🏡 Medium' : '🏰 Large'}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <input type="checkbox" id="hoa" checked={hasHOA} onChange={e => setHasHOA(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
            <label htmlFor="hoa" style={{ color: '#cbd5e1', cursor: 'pointer' }}>My property is in an HOA</label>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            Get My Recommendation
          </button>
          {showResult && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 14, border: '2px solid #F5E642′ }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Total Project Cost: ${costLow.toLocaleString()} – ${costHigh.toLocaleString()}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>{structure.label} with {fuel.label} — ~${fuel.monthly}/mo operating cost</div>
              <div style={{ color: woodBurnBanRisk ? '#fbbf24′ : '#22c55e', fontSize: 14 }}>{woodBurnBanRisk ? '⚠️ Wood-burning: susceptible to county burn bans in DFW. Consider adding a gas backup.' : '✅ Gas/propane: burn ban exempt — use year-round.'}</div>
              {permitRequired && <div style={{ color: '#f97316', fontSize: 14, marginTop: 8 }}>📋 Permit required for this project — contact your city building department.</div>}
              {hasHOA && <div style={{ color: '#fbbf24', fontSize: 14, marginTop: 8 }}>🏠 HOA approval required before starting. Many DFW HOAs prohibit open flames.</div>}
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 8 }}>Space clearance: {clearance}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🛡️ Safety Clearances (Texas Fire Code)</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>10 ft minimum from any combustible structure (wood deck, fence, pergola)</li>
            <li>25 ft minimum from any building with a wood-burning open flame</li>
            <li>Gas fire pit: must have manual shutoff valve within 6 ft</li>
            <li>Keep fire extinguisher (2A:10BC minimum) within reach</li>
            <li>Never leave unattended — DFW wind gusts regularly exceed 30 mph</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
