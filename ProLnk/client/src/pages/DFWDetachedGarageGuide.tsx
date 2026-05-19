import { useState } from 'react';

type DFWCity = 'dallas' | 'plano' | 'frisco' | 'arlington' | 'mckinney' | 'denton';
type GarageUse = 'parking' | 'workshop' | 'storage' | 'studio';
type GarageSize = '20x20′ | '24x24' | '24x30' | '30x30' | '30x40';

const citySetbacks: Record<DFWCity, { rear: number; side: number; notes: string }> = {
  dallas: { rear: 5, side: 3, notes: 'Max 15 ft height; must match home exterior materials' },
  plano: { rear: 10, side: 5, notes: 'Masonry required on street-facing elevations' },
  frisco: { rear: 10, side: 5, notes: 'Must not exceed primary structure size' },
  arlington: { rear: 5, side: 3, notes: 'Permit required over 120 sq ft' },
  mckinney: { rear: 10, side: 5, notes: 'Architectural review may apply in HOA areas' },
  denton: { rear: 5, side: 3, notes: 'Flexible — verify with city for specific lot' },
};

const sizeCosts: Record<GarageSize, { sqft: number; cost: string; foundation: string }> = {
  '20x20': { sqft: 400, cost: '$20,000–$28,000', foundation: 'Monolithic slab, 4″ min' },
  '24x24': { sqft: 576, cost: '$28,000–$38,000', foundation: 'Monolithic slab, 4″ min' },
  '24x30': { sqft: 720, cost: '$35,000–$46,000', foundation: 'Thickened edge slab, 6″ perimeter' },
  '30x30': { sqft: 900, cost: '$44,000–$58,000', foundation: 'Thickened edge slab, pier-and-beam option' },
  '30x40': { sqft: 1200, cost: '$55,000–$75,000', foundation: 'Engineered slab required on DFW clay' },
};

const useElectrical: Record<GarageUse, string> = {
  parking: '60A subpanel, 240V for EV charger, GFCI outlets',
  workshop: '200A subpanel, multiple 240V circuits, LED shop lights',
  storage: '30A subpanel, standard 120V outlets',
  studio: '100A subpanel, dedicated circuits for equipment',
};

export default function DFWDetachedGarageGuide() {
  const [city, setCity] = useState<DFWCity>('dallas');
  const [size, setSize] = useState<GarageSize>('24x24');
  const [use, setUse] = useState<GarageUse>('parking');
  const [showResults, setShowResults] = useState(false);

  const setback = citySetbacks[city];
  const sizeInfo = sizeCosts[size];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Detached Garage Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 600, margin: '0 auto' }}>Setback rules, foundation options on clay soil, permits, and costs across DFW cities.</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, margin: '40px 0′ }}>
          {[
            { icon: '📐', title: '24×24 Minimum', desc: 'Industry standard for 2-car. Anything smaller limits usability and resale.' },
            { icon: '🏗️', title: 'Clay Soil Matters', desc: 'DFW expansive clay requires engineered slabs on larger structures.' },
            { icon: '💰', title: '$20K–$75K Range', desc: 'Cost varies by size, finishes, and electrical scope.' },
            { icon: '📋', title: 'Always Permit', desc: 'Every DFW city requires permits. Unpermitted structures cause title issues.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', borderRadius: 12, padding: 22, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 15 }}>{card.title}</h3>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 16px' }}>🏠 Attached vs Detached: DFW Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <h4 style={{ color: '#F5E642', margin: '0 0 10px' }}>Adding Detached</h4>
              {['Flexible placement on lot', 'Requires setback compliance', 'Full permit + foundation', 'No connection to home HVAC', 'Better resale than nothing'].map(i => <div key={i} style={{ color: '#94A3B8', fontSize: 13, padding: '3px 0′ }}>• {i}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <h4 style={{ color: '#F5E642', margin: '0 0 10px' }}>Converting Attached</h4>
              {['Simpler permit in most cities', 'Shares home electrical', 'Climate control easier', 'May affect home insurance', 'Loses curb appeal if door removed'].map(i => <div key={i} style={{ color: '#94A3B8', fontSize: 13, padding: '3px 0′ }}>• {i}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 8px' }}>🏗️ Foundation on DFW Clay Soil</h2>
          <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>DFW's expansive clay soil moves seasonally. Foundation choice is critical.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { type: 'Monolithic Slab', desc: 'Best for under 576 sq ft. Poured in one pour. $6–$9/sq ft.', tag: 'Small Garages' },
              { type: 'Thickened Edge', desc: 'Perimeter beam adds rigidity. Required by most DFW engineers over 700 sq ft.', tag: 'Standard Choice' },
              { type: 'Engineered Slab', desc: 'PE-stamped with rebar grid. Required over 1,000 sq ft or bad soil reports.', tag: 'Large Structures' },
            ].map(f => (
              <div key={f.type} style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 10, background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', display: 'inline-block', marginBottom: 8, fontWeight: 700 }}>{f.tag}</div>
                <h4 style={{ color: '#fff', margin: '0 0 6px', fontSize: 14 }}>{f.type}</h4>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 12, lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32 }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 24px' }}>📊 Personalized Garage Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => { setCity(e.target.value as DFWCity); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="dallas">Dallas</option>
                <option value="plano">Plano</option>
                <option value="frisco">Frisco</option>
                <option value="arlington">Arlington</option>
                <option value="mckinney">McKinney</option>
                <option value="denton">Denton</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Garage Size</label>
              <select value={size} onChange={e => { setSize(e.target.value as GarageSize); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                {(['20x20','24x24','24x30','30x30','30x40'] as GarageSize[]).map(s => <option key={s} value={s}>{s} ({sizeCosts[s].sqft} sq ft)</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Intended Use</label>
              <select value={use} onChange={e => { setUse(e.target.value as GarageUse); setShowResults(false); }} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="parking">Parking / EV Charging</option>
                <option value="workshop">Workshop</option>
                <option value="storage">Storage</option>
                <option value="studio">Studio / Office</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Get My Estimate →</button>
          {showResults && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Rear Setback</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{setback.rear} ft</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Side Setback</div><div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{setback.side} ft</div></div>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}><div style={{ color: '#94A3B8', fontSize: 12 }}>Cost Estimate</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{sizeInfo.cost}</div></div>
                <div style={{ background: '#F5E642', borderRadius: 10, padding: 16 }}><div style={{ color: '#0A1628', fontSize: 12, fontWeight: 600 }}>Foundation Type</div><div style={{ color: '#0A1628', fontSize: 13, fontWeight: 700 }}>{sizeInfo.foundation}</div></div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 10, padding: 18 }}>
                <p style={{ color: '#94A3B8', margin: '0 0 8px', fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>Electrical for {use}:</strong> {useElectrical[use]}</p>
                <p style={{ color: '#94A3B8', margin: 0, fontSize: 13 }}><strong style={{ color: '#F5E642′ }}>{city.charAt(0).toUpperCase() + city.slice(1)} Notes:</strong> {setback.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
