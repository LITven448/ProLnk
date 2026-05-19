import { useState } from 'react';

const SUBURBS = ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Frisco', 'McKinney', 'Irving', 'Garland', 'Southlake', 'Grapevine'];
const GARAGE_SIZES = ['1-car garage', '2-car garage', '3-car garage', 'Oversized/RV capable'];
const USE_TYPES = ['General storage', 'Vehicle storage', 'Boat/RV storage', 'Workshop space'];

interface GarageResult {
  monthly: number;
  priceRange: string;
  insuranceNote: string;
}

const BASE_RATES: Record<string, number> = {
  '1-car garage': 120,
  '2-car garage': 200,
  '3-car garage': 300,
  'Oversized/RV capable': 420,
};

const USE_MULT: Record<string, number> = {
  'General storage': 1.0,
  'Vehicle storage': 1.25,
  'Boat/RV storage': 1.6,
  'Workshop space': 1.4,
};

const SUBURB_MULT: Record<string, number> = {
  Dallas: 1.1, 'Fort Worth': 1.0, Arlington: 1.05, Plano: 1.15,
  Frisco: 1.2, McKinney: 1.12, Irving: 1.08, Garland: 0.95,
  Southlake: 1.3, Grapevine: 1.18,
};

const INSURANCE_INFO: Record<string, string> = {
  'General storage': 'Notify insurer — stored items are renter\’s responsibility. Consider requiring renter\’s insurance.',
  'Vehicle storage': 'Your homeowner\’s policy likely excludes vehicles. Renter must carry comprehensive auto coverage.',
  'Boat/RV storage': 'High-value items. Require proof of renter\’s watercraft/RV insurance. Inspect monthly.',
  'Workshop space': 'Highest liability risk. Require general liability policy from renter. Consult your agent.',
};

const PLATFORMS = [
  { name: 'Neighbor.com', focus: 'General & vehicle storage', fee: '4.9%' },
  { name: 'StoreAtMyHouse', focus: 'Household goods storage', fee: '5%' },
  { name: 'Spacer', focus: 'All storage types', fee: '10%' },
  { name: 'Direct listing (Craigslist/FB)', focus: 'Any type', fee: '0% but no vetting' },
];

export default function DFWGarageRentalIncomeGuide() {
  const [suburb, setSuburb] = useState('');
  const [size, setSize] = useState('');
  const [useType, setUseType] = useState('');
  const [result, setResult] = useState<GarageResult | null>(null);

  function calculate() {
    if (!suburb || !size || !useType) return;
    const base = BASE_RATES[size] ?? 200;
    const useMult = USE_MULT[useType] ?? 1.0;
    const subMult = SUBURB_MULT[suburb] ?? 1.0;
    const monthly = Math.round(base * useMult * subMult);
    const low = Math.round(monthly * 0.85);
    const high = Math.round(monthly * 1.18);
    setResult({
      monthly,
      priceRange: `$${low}–$${high}/month`,
      insuranceNote: INSURANCE_INFO[useType] ?? '',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🚗</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642' }}>DFW Garage Rental Income Guide</h1>
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>DFW has some of the highest storage demand in the country. A 2-car garage can generate $200–$380/month depending on location and use type — with zero marketing effort on Neighbor.com.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📦 Why DFW Storage Demand is So High</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            <li>DFW population grew 1.2M+ in last decade — many renters have no storage</li>
            <li>Public storage vacancy in DFW under 6% — lowest in Texas</li>
            <li>Average public storage 10x10 unit: $140-200/mo — your garage wins on price and access</li>
            <li>Seasonal demand spikes: college move-out (May/Aug), holiday decorations (Nov-Dec)</li>
            <li>Boat/RV storage: Lake Texoma + LBJ proximity drives year-round demand</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>💰 Income Calculator</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            {[
              { label: 'DFW Suburb', val: suburb, set: setSuburb, opts: SUBURBS },
              { label: 'Garage Size', val: size, set: setSize, opts: GARAGE_SIZES },
              { label: 'Intended Use Type', val: useType, set: setUseType, opts: USE_TYPES },
            ].map(({ label, val, set, opts }) => (
              <div key={label}>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={e => set(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                  <option value="">Select...</option>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Calculate Rental Income</button>
          {result && (
            <div style={{ marginTop: 20, background: 'rgba(245,230,66,0.1)', border: '1.5px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>~${result.monthly.toLocaleString()}/month</div>
              <div style={{ marginBottom: 8, opacity: 0.85 }}>Market range: {result.priceRange}</div>
              <div style={{ fontSize: 13, opacity: 0.75, fontStyle: 'italic' }}>⚠️ {result.insuranceNote}</div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📱 Platforms to List Your Garage</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {PLATFORMS.map(p => (
              <div key={p.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.7 }}>{p.focus}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, alignSelf: 'center' }}>{p.fee} fee</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
