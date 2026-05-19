import { useState } from 'react';

const LOCATIONS = [
  { id: 'bathtub', label: '🛁 Bathtub/Shower surround' },
  { id: 'windows', label: '🪟 Window frames (interior)' },
  { id: 'doors', label: '🚪 Door frames / exterior doors' },
  { id: 'baseboards', label: '🏠 Baseboards / floor transition' },
  { id: 'kitchen_sink', label: '🍽️ Kitchen sink / backsplash' },
  { id: 'toilet', label: '🚽 Toilet base' },
];

const CAULK_TYPES = {
  bathtub: { type: '100% Silicone', brand: 'GE Supreme or DAP 3.0', reason: 'DFW humidity and constant water contact — silicone won\’t shrink or mold' },
  windows: { type: 'Paintable Latex Acrylic', brand: 'DAP Alex Plus', reason: 'Needs to flex with DFW temp swings; must be paintable for trim match' },
  doors: { type: 'Paintable Latex Acrylic', brand: 'DAP Alex Flex', reason: 'DFW heat warps door frames — flexible formula handles movement' },
  baseboards: { type: 'Paintable Latex Acrylic', brand: 'DAP Alex Plus', reason: 'Paintable, sandable, easy cleanup — floors move with DFW humidity' },
  kitchen_sink: { type: '100% Silicone (clear or white)', brand: 'GE Supreme Kitchen & Bath', reason: 'Food-safe, waterproof, handles grease and cleaning chemicals' },
  toilet: { type: 'Siliconized Latex', brand: 'DAP Kwik Seal Plus', reason: 'Antimicrobial formula — critical in DFW bathroom humidity cycles' },
};

function getEstimate(selectedIds: string[]) {
  const tubes = selectedIds.length;
  const hours = tubes * 0.5 + 0.5;
  const cost = tubes * 8 + 12;
  const skill = tubes <= 2 ? 'Beginner' : 'Beginner–Intermediate';
  return { tubes, hours: hours.toFixed(1), cost, skill };
}

export default function DFWDIYCaulkingGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const est = selected.length > 0 ? getEstimate(selected) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔧</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>DFW DIY Caulking Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Right caulk for every DFW location — humidity, heat, and movement all demand specific formulas.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>⚠️ DFW Caulk Reality Check</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>DFW's extreme temp swings (20°F winter to 110°F summer) cause constant expansion and contraction. Cheap or wrong caulk cracks within a season. DFW humidity also promotes mold in failed caulk — replace when you see black spots forming underneath, not just on the surface.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>✂️ Proper Technique (Every Time)</h2>
          {[
            ['Cut tip at 45°', 'Cut only ¼" opening — DFW beginners cut too big and apply too much'],
            ['Remove all old caulk first', 'Use oscillating tool or caulk remover tool — adding on top never seals properly'],
            ['Dry surface completely', 'Wipe with rubbing alcohol; in DFW bathrooms wait 24 hrs after last shower'],
            ['Apply steady pull motion', 'Pull the gun toward you at 45° — pushing creates air pockets'],
            ['Smooth immediately', 'Wet finger or caulk tool within 60 seconds; silicone sets faster in DFW heat'],
            ['Tape for clean lines', 'Blue painter tape on both sides; remove tape while caulk is still wet'],
          ].map(([step, detail]) => (
            <div key={step} style={{ marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{step}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🔄 Replace vs. Add On Top</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 6 }}>Add on top ✅ (ONLY if)</div>
              <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 16, margin: 0 }}>
                <li>Existing caulk is firmly bonded</li>
                <li>No mold or discoloration underneath</li>
                <li>Gap is hairline — purely cosmetic crack</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 6 }}>Always replace if</div>
              <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 16, margin: 0 }}>
                <li>Black mold visible</li>
                <li>Caulk is pulling away from surface</li>
                <li>Crumbling or shrinking sections</li>
                <li>Water getting behind — soft drywall</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>🛑 When to Call a Pro</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Call a plumber or tile contractor if you find: soft drywall or subfloor behind the tub surround, grout cracking in the field (not just caulk joints), water stains on the ceiling below a bathroom, or a toilet that rocks (wax ring issue, not caulk).</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, margin: '0 0 20px' }}>🧮 Location Estimator</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>Select locations to caulk — get product recommendation + time + cost:</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {LOCATIONS.map(loc => (
              <button key={loc.id} onClick={() => toggle(loc.id)} style={{ padding: '12px 16px', borderRadius: 8, border: '2px solid', borderColor: selected.includes(loc.id) ? '#F5E642′ : '#334155', background: selected.includes(loc.id) ? '#F5E64215' : ’transparent', color: selected.includes(loc.id) ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                {loc.label}
              </button>
            ))}
          </div>

          <button onClick={() => setShowResults(true)} disabled={selected.length === 0} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: selected.length === 0 ? 0.4 : 1 }}>
            Get Recommendations →
          </button>

          {showResults && est && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[['🧴 Tubes', `${est.tubes}`], ['🕐 Time', `${est.hours} hrs`], ['💰 Cost', `~$${est.cost}`]].map(([label, val]) => (
                  <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#cbd5e1', fontWeight: 700, marginBottom: 12 }}>Product Recommendations by Location:</div>
              {selected.map(id => {
                const c = CAULK_TYPES[id as keyof typeof CAULK_TYPES];
                const loc = LOCATIONS.find(l => l.id === id);
                return (
                  <div key={id} style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{loc?.label}</div>
                    <div style={{ color: '#fff', fontSize: 14, marginBottom: 4 }}>Type: <span style={{ color: '#F5E642′ }}>{c.type}</span> — {c.brand}</div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.reason}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
