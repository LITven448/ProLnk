import { useState } from 'react';

const doorHeightOptions = [
  { label: '1 step (~7")', inches: 7 },
  { label: '2 steps (~14")', inches: 14 },
  { label: '3 steps (~21")', inches: 21 },
  { label: '4 steps (~28")', inches: 28 },
  { label: '5 steps (~35")', inches: 35 },
  { label: 'Custom height', inches: 0 },
];

const spaceOptions = ['Unlimited space', 'Up to 8 feet', 'Up to 12 feet', 'Up to 16 feet', 'Up to 20 feet', 'Up to 30 feet'];

type Material = { name: string; pricePerFt: string; pros: string[]; cons: string[]; best: string };
const materials: Record<string, Material> = {
  wood: { name: '🪵 Pressure-Treated Wood', pricePerFt: '$30–55/ft', pros: ['Most affordable', 'Easy to modify', 'Warm aesthetic'], cons: ['Requires sealing every 1-2 yrs', 'Can warp in DFW heat', 'Splinter risk if not maintained'], best: 'Budget-conscious, temporary or semi-permanent' },
  aluminum: { name: '🔩 Aluminum Modular', pricePerFt: '$65–100/ft', pros: ['No maintenance', 'Weather-resistant (DFW humidity)', 'Modular — relocatable'], cons: ['Higher upfront cost', 'Industrial look', 'Can get hot in DFW sun'], best: 'Permanent installs, low-maintenance priority' },
  concrete: { name: '🪨 Poured Concrete', pricePerFt: '$80–120/ft', pros: ['Most durable', 'Matches home aesthetics', 'No ongoing maintenance'], cons: ['Highest cost', 'Permanent — cannot relocate', 'Requires permit in all DFW cities'], best: 'Permanent wheelchair users, long-term solution' },
};

function getMaterialRec(spaceAvail: string, heightIn: number): string {
  if (spaceAvail === 'Up to 8 feet' || spaceAvail === 'Up to 12 feet') return 'aluminum';
  if (heightIn >= 28) return 'concrete';
  if (spaceAvail === 'Unlimited space' && heightIn >= 21) return 'concrete';
  return 'aluminum';
}

export default function DFWAccessibilityRampGuide() {
  const [doorHeight, setDoorHeight] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [space, setSpace] = useState('');

  const selectedDoor = doorHeightOptions.find((o) => o.label === doorHeight);
  const heightIn = selectedDoor?.inches === 0 ? parseInt(customHeight) || 0 : selectedDoor?.inches || 0;
  const rampLengthFt = heightIn > 0 ? Math.ceil(heightIn) : 0;
  const materialKey = space && rampLengthFt ? getMaterialRec(space, heightIn) : '';
  const mat = materialKey ? materials[materialKey] : null;
  const priceNums = mat ? mat.pricePerFt.replace(/\$/g, '').replace(/\/ft/, '').split('–').map(Number) : [0, 0];
  const costMin = Math.round(rampLengthFt * priceNums[0]);
  const costMax = Math.round(rampLengthFt * priceNums[1]);
  const requiresPermit = rampLengthFt > 12 || materialKey === 'concrete';

  const dfw = ['Dallas', 'Fort Worth', 'Plano', 'Arlington', 'Frisco', 'McKinney', 'Irving', 'Garland'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14 }}>♿ ProLnk DFW Accessibility Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Wheelchair Ramp Guide for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          ADA-compliant ramps for DFW homes — permits, materials, costs, and the right slope for safe, smooth access.
        </p>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📐 ADA Slope Standard: 1:12 Ratio</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 14 }}>
            For every 1 inch of rise (door height above ground), you need 12 inches (1 foot) of ramp length. This is the ADA minimum — do not go steeper.
          </p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[{ label: '7" rise', ramp: "7 ft" }, { label: '14" rise', ramp: "14 ft" }, { label: '21" rise', ramp: "21 ft" }, { label: '28" rise', ramp: "28 ft" }].map((ex) => (
              <div key={ex.label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{ex.ramp}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{ex.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏗️ Material Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {Object.values(materials).map((m) => (
              <div key={m.name} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{m.name}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{m.pricePerFt}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>✅ {m.pros.join(' · ')}</div>
                <div style={{ fontSize: 12, color: '#ef4444' }}>⚠️ {m.cons.join(' · ')}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏙️ DFW Permit Requirements</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Permit requirements vary by city. Concrete ramps and ramps over 30" height always require permits in all DFW cities.</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {dfw.map((city) => (
              <span key={city} style={{ background: '#0A1628', border: '1px solid #334155', borderRadius: 6, padding: '4px 10px', fontSize: 13 }}>{city}</span>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🧮 Calculate Your Ramp</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Door/Entry Height</label>
              <select value={doorHeight} onChange={(e) => setDoorHeight(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select height...</option>
                {doorHeightOptions.map((o) => <option key={o.label} value={o.label}>{o.label}</option>)}
              </select>
              {selectedDoor?.inches === 0 && (
                <input type="number" placeholder='Enter inches (e.g. 18)' value={customHeight} onChange={(e) => setCustomHeight(e.target.value)}
                  style={{ marginTop: 8, width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }} />
              )}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Space Available</label>
              <select value={space} onChange={(e) => setSpace(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select available space...</option>
                {spaceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {mat && rampLengthFt > 0 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24 }}>{rampLengthFt} ft</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Required Ramp Length</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>${costMin.toLocaleString()}–{costMax.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Estimated Cost</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: requiresPermit ? '#f97316' : '#22c55e', fontWeight: 800, fontSize: 16 }}>{requiresPermit ? '⚠️ Permit Required' : '✅ Likely No Permit'}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>DFW Permit Status</div>
                </div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>Recommended Material: {mat.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Best for: {mat.best}</div>
              </div>
              <button style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Get Free Ramp Quote from DFW Contractor →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
