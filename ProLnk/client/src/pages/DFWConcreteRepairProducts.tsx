import { useState } from 'react';

const crackTypes = ['Hairline Surface Crack', 'Structural Crack (moving)', 'Spalled / Flaking Surface', 'Active Water Leak', 'Sunken / Uneven Slab', 'Expansion Joint Failure'];
const locations = ['Driveway', 'Foundation / Basement', 'Garage Floor', 'Patio / Pool Deck', 'Sidewalk', 'Interior Floor'];

const data: Record<string, { product: string; type: string; method: string; cost: string; dfwNote: string; brand: string }> = {
  'Hairline Surface Crack': { product: 'Concrete Crack Filler', type: 'Polyurethane or Epoxy Crack Filler', method: '1. Clean crack with wire brush and air. 2. Pour filler and work into crack with putty knife. 3. Feather edges. 4. Seal entire surface after cure.', cost: '$12-35 per tube, covers 30-50 linear ft', dfwNote: 'DFW UV exposure degrades unfilled cracks fast. Even hairlines need filler before DFW summer', brand: 'Sikaflex Concrete Fix or Quikrete Polyurethane Filler' },
  'Structural Crack (moving)': { product: 'Epoxy Injection System', type: 'Two-Part Epoxy Injection', method: '1. Monitor crack movement for 2 weeks first. 2. Install injection ports every 8-12 in. 3. Inject low-viscosity epoxy from bottom up. 4. Plug ports after cure.', cost: '$45-120 per kit, covers 10-15 linear ft', dfwNote: 'DFW expansive clay can keep cracks moving — confirm soil stabilized before sealing', brand: 'Polygem Polymortar or Rhino Carbon Fiber Epoxy' },
  'Spalled / Flaking Surface': { product: 'Concrete Resurfacer', type: 'Polymer-Modified Overlay', method: '1. Remove all loose material. 2. Pressure wash and let dry 24 hrs. 3. Apply bonding agent. 4. Mix resurfacer to paint consistency. 5. Spread 1/8-1/4 in layer.', cost: '$25-45 per 40 lb bag, covers 50-75 sq ft', dfwNote: 'DFW sun bleaches and oxidizes concrete — resurfacer restores AND protects from UV', brand: 'Quikrete Concrete Resurfacer or Sakrete Flo-Coat' },
  'Active Water Leak': { product: 'Hydraulic Cement', type: 'Rapid-Setting Hydraulic Cement', method: '1. Enlarge crack to V-shape (key it). 2. Wet area. 3. Mix hydraulic cement to stiff putty in 30 sec. 4. Press into crack and hold 3-5 min. 5. Sets against active water.', cost: '$18-28 per 10 lb container', dfwNote: 'DFW clay swells after heavy rain creating hydrostatic pressure — hydraulic cement is the ONLY product that works against active leaks', brand: 'Quikrete Hydraulic Water-Stop or Sakrete Water-Plug' },
  'Sunken / Uneven Slab': { product: 'Self-Leveling Compound', type: 'Self-Leveling Underlayment or Slab Lift', method: 'DIY: 1. Prepare surface. 2. Pour self-leveler and spread. 3. Covers up to 1.5 in. Pro option: Polyurethane foam injection (mudjacking alternative) raises slab without replacement.', cost: 'DIY: $35-65 per 50 lb bag. Foam lift: $500-2500 depending on slab size', dfwNote: 'DFW clay shrink-swell causes most slab settlement. Fix drainage first or it re-sinks', brand: 'Ardex K-15 or Mapei Ultraplan for leveling; PolyLevel for foam injection' },
  'Expansion Joint Failure': { product: 'Polyurethane Joint Sealant', type: 'Self-Leveling Polyurethane Caulk', method: '1. Remove all old joint material with oscillating tool. 2. Install backer rod (foam) to control depth. 3. Apply self-leveling sealant. 4. Tool to slight concave profile.', cost: '$15-28 per tube, covers 15-20 linear ft at standard joint width', dfwNote: 'DFW temperature swings from -5°F to 115°F = 120°F range. Joints must be resealed every 5-7 years or cracks propagate into slab', brand: 'NP1 Self-Leveling Sealant or Sikaflex 1a' },
};

export default function DFWConcreteRepairProducts() {
  const [crack, setCrack] = useState('');
  const [loc, setLoc] = useState('');
  const result = crack ? data[crack] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🔧</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Concrete Repair Products</h1>
          <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>
            DFW concrete repair fails when homeowners use the wrong product for the damage type. Crack filler won't stop an active leak. Resurfacer won’t fix a structural crack. Use this guide to match product to problem — and get the DFW-specific application notes that most product labels skip.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Damage Type</label>
            <select value={crack} onChange={e => setCrack(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select damage...</option>
              {crackTypes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Location</label>
            <select value={loc} onChange={e => setLoc(e.target.value)} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1e293b', color: '#fff', border: '1px solid #334155', borderRadius: '6px', fontSize: '1rem' }}>
              <option value=''>Select location...</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        {result && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>✅ Repair Solution</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Product Category</div>
                <div style={{ color: '#F5E642', fontWeight: 'bold' }}>{result.product}</div>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>💰 Cost Range</div>
                <div style={{ color: '#fff' }}>{result.cost}</div>
              </div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Product Type</div>
              <div style={{ color: '#fff', marginTop: '0.25rem' }}>{result.type}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🛠️ Application Method</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{result.method}</div>
            </div>
            <div style={{ backgroundColor: '#1e3a5f', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ color: '#93c5fd', fontSize: '0.85rem' }}>🌡️ DFW-Specific Note</div>
              <div style={{ color: '#fff', marginTop: '0.25rem', lineHeight: 1.6 }}>{result.dfwNote}</div>
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>🏷️ Recommended Brands</div>
              <div style={{ color: '#F5E642', marginTop: '0.25rem' }}>{result.brand}</div>
            </div>
          </div>
        )}
        <div style={{ backgroundColor: '#1e293b', borderRadius: '8px', padding: '1.25rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>⚡ Quick Product Match</h3>
          {[['Active leak', 'Hydraulic Cement', 'Only product that sets against water'], ['Structural crack', 'Epoxy Injection', 'Restores structural integrity'], ['Surface flaking', 'Concrete Resurfacer', 'Bonds and protects'], ['Joint failure', 'Polyurethane Caulk', 'Flexible for DFW temp swings'], ['Sunken slab', 'Foam Injection', 'Raises without full replacement']].map(([damage, product, note]) => (
            <div key={damage} style={{ display: 'grid', gridTemplateColumns: '140px 160px 1fr', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #334155′ }}>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{damage}</span>
              <span style={{ color: '#F5E642', fontWeight: 'bold', fontSize: '0.9rem' }}>{product}</span>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
