import { useState } from 'react';

const SUBMARKETS = {
  Uptown: 1.32, 'Downtown Dallas': 1.28, Plano: 1.18, Frisco: 1.22, McKinney: 1.15, Allen: 1.13,
  Prosper: 1.20, Irving: 1.08, Arlington: 1.02, Garland: 0.97, Mesquite: 0.94, Denton: 1.04, Lewisville: 1.06, Carrollton: 1.09
};
const BASE_RATES = { 'Single-Family': 1750, Townhome: 1550, Condo: 1400 };
const BED_ADJ = { 1: 0.72, 2: 0.88, 3: 1.0, 4: 1.18, 5: 1.35 };
const BATH_ADJ = { 1: 0.92, 1.5: 0.96, 2: 1.0, 2.5: 1.05, 3: 1.09, 4: 1.14 };

export default function DFWRentalRateCalculator() {
  const [propType, setPropType] = useState('Single-Family');
  const [submarket, setSubmarket] = useState('Plano');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const [sqft, setSqft] = useState('');
  const [garage, setGarage] = useState('2-car');
  const [pool, setPool] = useState(false);
  const [pets, setPets] = useState(false);
  const [washer, setWasher] = useState(true);
  const [result, setResult] = useState(null);

  function calculate() {
    const base = BASE_RATES[propType];
    const mkt = SUBMARKETS[submarket] || 1.0;
    const bed = BED_ADJ[parseInt(beds)] || 1.0;
    const bath = BATH_ADJ[parseFloat(baths)] || 1.0;
    const garAdj = garage === 'None' ? 0.97 : garage === '1-car' ? 1.0 : garage === '2-car' ? 1.04 : 1.07;
    const sf = parseFloat(sqft);
    const sfAdj = sf ? Math.min(1.12, Math.max(0.9, 1 + (sf - 1800) * 0.00004)) : 1.0;
    const amenity = (pool ? 1.06 : 1) * (pets ? 1.03 : 1) * (washer ? 1.02 : 1);
    const est = Math.round(base * mkt * bed * bath * garAdj * sfAdj * amenity / 25) * 25;
    setResult({ est, low: est - 75, high: est + 100, annual: est * 12, yield: sf ? ((est * 12) / (sf * 185) * 100) : null });
  }

  return (
    <div style={{ background: '#f0f4f8', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏘️</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>DFW Rental Rate Calculator</h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.8, fontSize: 14 }}>Estimate market rent for your DFW property</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>🏠 Property Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['Property Type', propType, setPropType, Object.keys(BASE_RATES)], ['DFW Submarket', submarket, setSubmarket, Object.keys(SUBMARKETS)], ['Bedrooms', beds, setBeds, ['1','2','3','4','5']], ['Bathrooms', baths, setBaths, ['1','1.5','2','2.5','3','4']], ['Garage', garage, setGarage, ['None','1-car','2-car','3-car']]].map(([label, val, setter, opts]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14 }}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>Square Footage (optional)</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder='e.g. 2000' style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>✨ Amenities</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[['🏊 Pool', pool, setPool], ['🐾 Pets OK', pets, setPets], ['🫧 W/D Included', washer, setWasher]].map(([label, val, setter]) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: val ? '#e8f0fe' : '#f5f5f5', padding: '10px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                <input type='checkbox' checked={val} onChange={e => setter(e.target.checked)} style={{ width: 16, height: 16 }} />
                {label}
              </label>
            ))}
          </div>
        </div>
        <button onClick={calculate} style={{ width: '100%', background: '#1a3a5c', color: '#F5E642', padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: '1rem' }}>
          💵 Calculate Market Rent
        </button>
        {result && (
          <div style={{ background: '#1a3a5c', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
            <h3 style={{ margin: '0 0 1rem', color: '#F5E642' }}>📊 DFW Market Rent Estimate</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[['Rent Low', , '#acd'], ['Market Rate', , '#F5E642'], ['Rent High', , '#f9a']].map(([label, val, color]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(245,230,66,0.15)', borderRadius: 8, padding: '0.75rem', fontSize: 13 }}>
              📅 Annual revenue at market rate: <strong style={{ color: '#F5E642' }}>${result.annual.toLocaleString()}</strong>
              {result.yield && <span> &nbsp;|&nbsp; Estimated gross yield: <strong style={{ color: '#F5E642' }}>{result.yield.toFixed(1)}%</strong></span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
