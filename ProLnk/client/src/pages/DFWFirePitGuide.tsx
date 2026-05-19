import { useState } from 'react';

const FUEL_DATA: Record<string, { label: string; banSafe: boolean; cost: string; maintenance: string; windNote: string }> = {
  propane: { label: 'Propane Fire Pit', banSafe: true, cost: '$500–$4,000 + $25–$50/tank fill', maintenance: 'Replace igniter every 3–5 years, annual burner inspection', windNote: 'Adjustable flame — lower flame in high DFW winds' },
  natural_gas: { label: 'Natural Gas Fire Pit', banSafe: true, cost: '$2,000–$8,000 installed (gas line run)', maintenance: 'Annual gas line inspection, burner cleaning', windNote: 'Consistent pressure regardless of wind — ideal for DFW' },
  wood: { label: 'Wood-Burning Fire Pit', banSafe: false, cost: '$200–$2,500', maintenance: 'Ash removal after each use, annual inspection', windNote: 'Circular bowl design reduces ember scatter in DFW wind' },
};

const HOA_CITIES: Record<string, string> = {
  plano: 'Plano HOAs frequently restrict open flame — verify before purchasing.',
  frisco: 'Frisco HOAs generally allow gas fire pits with approved screening.',
  mckinney: 'McKinney allows gas fire features, wood-burning varies by subdivision.',
  allen: 'Allen requires 10 ft clearance from structures per most HOA rules.',
  southlake: 'Southlake HOAs often require architectural review for any hardscape feature.',
  other: 'Check your HOA CC&Rs under "outdoor fire features" or "landscaping structures."',
};

export default function DFWFirePitGuide() {
  const [fuel, setFuel] = useState('');
  const [city, setCity] = useState('');
  const [patio, setPatio] = useState('');
  const [result, setResult] = useState<{ label: string; banSafe: boolean; cost: string; clearance: string; hoa: string; windTip: string } | null>(null);

  function calculate() {
    const f = fuel || 'propane';
    const fd = FUEL_DATA[f];
    const patioSqft = parseInt(patio);
    const clearance = patioSqft < 200
      ? '10 ft min from structure — tight fit, wall-mount option may work better'
      : '10 ft from structure, 3 ft from seating — your patio can accommodate this safely';
    const hoa = HOA_CITIES[city] || HOA_CITIES['other'];
    setResult({ label: fd.label, banSafe: fd.banSafe, cost: fd.cost, clearance, hoa, windTip: fd.windNote });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.25rem' }}>🔥 DFW Fire Pit Guide</div>
        <div style={{ color: '#94A3B8', marginBottom: '2rem' }}>Navigate DFW burn bans and wind — choose the right fire feature</div>

        <div style={{ background: '#7F1D1D', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #EF4444' }}>
          <div style={{ color: '#FCA5A5', fontWeight: 700, marginBottom: '0.5rem' }}>🚨 DFW Burn Ban Reality</div>
          <div style={{ color: '#FEE2E2', lineHeight: 1.7 }}>
            DFW counties issue burn bans 30–80 days per year during drought conditions. <strong>Wood-burning fire pits are prohibited during burn bans.</strong> Propane and natural gas fire pits are legal even during most burn bans because they produce no airborne embers. If you want a year-round fire feature in DFW, gas is the only reliable option.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>💨 DFW Wind Considerations</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW averages 12–15 mph sustained winds with frequent 25–35 mph gusts. For wood-burning pits, a <strong style={{ color: '#fff' }}>circular bowl design</strong> creates a windbreak effect and reduces ember scatter by ~40% versus open ring designs. For gas, choose a burner rated for wind exposure — many decorative burners extinguish below 20 mph. Look for sealed-pilot ignition systems.
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🪑 Seating Arrangement for DFW Gatherings</div>
          <div style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW group sizes tend to be large (12–20 person backyard gatherings common). Plan seating in concentric arc, 3–4 ft from pit edge. For 12 seats, you need a 14 ft diameter seating circle — require 200 sq ft of patio minimum. Swivel chairs outperform fixed seating because DFW wind forces guests to reposition frequently.
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1.25rem' }}>🧮 Fire Pit Recommender</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Fuel Preference</div>
              <select value={fuel} onChange={e => setFuel(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select fuel type</option>
                <option value="propane">Propane (no gas line needed)</option>
                <option value="natural_gas">Natural Gas (permanent)</option>
                <option value="wood">Wood-Burning</option>
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>DFW City</div>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }}>
                <option value="">Select city</option>
                {Object.keys(HOA_CITIES).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Patio Size (sq ft)</div>
              <input value={patio} onChange={e => setPatio(e.target.value)} placeholder="e.g. 300" style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2D4A6E', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', border: '1px solid #F5E642' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.label}</div>
                <div style={{ background: result.banSafe ? '#14532D' : '#7F1D1D', color: result.banSafe ? '#86EFAC' : '#FCA5A5', borderRadius: 6, padding: '0.15rem 0.5rem', fontSize: '0.8rem' }}>{result.banSafe ? '✅ Burn Ban Safe' : '⚠️ Banned During Restrictions'}</div>
              </div>
              <div style={{ color: '#CBD5E1' }}>Cost: {result.cost}</div>
              <div style={{ color: '#CBD5E1', marginTop: '0.25rem' }}>Safety Clearances: {result.clearance}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>💨 Wind tip: {result.windTip}</div>
              <div style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.85rem' }}>🏘️ HOA: {result.hoa}</div>
            </div>
          )}
        </div>

        <div style={{ color: '#475569', textAlign: 'center', fontSize: '0.8rem' }}>ProLnk connects you with DFW outdoor fire feature pros · prolnk.io</div>
      </div>
    </div>
  );
}
