import { useState } from 'react';

const DFW_SUBMARKETS = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Allen', 'Prosper', 'Celina', 'Arlington', 'Irving', 'Garland', 'Mesquite', 'Denton', 'Lewisville'];
const CONDITION_ADJUSTMENTS = { Excellent: 1.08, Good: 1.02, Average: 1.0, Fair: 0.93, Poor: 0.85 };
const MARKET_CONDITIONS = { Hot: { days: 14, adj: 1.05 }, Warm: { days: 28, adj: 1.01 }, Neutral: { days: 45, adj: 1.0 }, Cool: { days: 65, adj: 0.96 }, Cold: { days: 90, adj: 0.91 } };

export default function DFWHousePricingCalculator() {
  const [sqft, setSqft] = useState('');
  const [beds, setBeds] = useState('3');
  const [baths, setBaths] = useState('2');
  const [yearBuilt, setYearBuilt] = useState('');
  const [submarket, setSubmarket] = useState('Plano');
  const [condition, setCondition] = useState('Good');
  const [market, setMarket] = useState('Warm');
  const [comp1, setComp1] = useState('');
  const [comp2, setComp2] = useState('');
  const [comp3, setComp3] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    const sf = parseFloat(sqft);
    if (!sf || sf < 500) return;
    const comps = [comp1, comp2, comp3].map(Number).filter(Boolean);
    const avgComp = comps.length ? comps.reduce((a, b) => a + b, 0) / comps.length : sf * 280;
    const condAdj = CONDITION_ADJUSTMENTS[condition];
    const mktAdj = MARKET_CONDITIONS[market].adj;
    const age = 2026 - (parseInt(yearBuilt) || 2000);
    const ageAdj = Math.max(0.88, 1 - age * 0.001);
    const base = avgComp * condAdj * mktAdj * ageAdj;
    const low = Math.round(base * 0.96 / 1000) * 1000;
    const high = Math.round(base * 1.04 / 1000) * 1000;
    setResult({ low, high, days: MARKET_CONDITIONS[market].days, mid: Math.round((low + high) / 2) });
  }

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#1a3a5c', color: '#fff', borderRadius: 12, padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🏠</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>DFW House Pricing Calculator</h1>
          <p style={{ margin: '0.5rem 0 0', opacity: 0.8, fontSize: 14 }}>Get your suggested listing price range based on DFW market data</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>🏡 Home Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['Square Footage', sqft, setSqft, 'e.g. 2400'], ['Year Built', yearBuilt, setYearBuilt, 'e.g. 2008']].map(([label, val, setter, ph]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>{label}</label>
                <input value={val} onChange={e => setter(e.target.value)} placeholder={ph} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
            {[['Bedrooms', beds, setBeds, ['2','3','4','5','6+']], ['Bathrooms', baths, setBaths, ['1','1.5','2','2.5','3','3.5','4']]].map(([label, val, setter, opts]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14 }}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>DFW Submarket</label>
            <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14 }}>
              {DFW_SUBMARKETS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>📊 Recent Comp Sold Prices (optional)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[['Comp 1 ($)', comp1, setComp1], ['Comp 2 ($)', comp2, setComp2], ['Comp 3 ($)', comp3, setComp3]].map(([label, val, setter]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>{label}</label>
                <input value={val} onChange={e => setter(e.target.value)} placeholder='e.g. 425000' style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#1a3a5c' }}>🌡️ Market Conditions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['Home Condition', condition, setCondition, Object.keys(CONDITION_ADJUSTMENTS)], ['DFW Market Temp', market, setMarket, Object.keys(MARKET_CONDITIONS)]].map(([label, val, setter, opts]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 4 }}>{label}</label>
                <select value={val} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14 }}>
                  {opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
        <button onClick={calculate} style={{ width: '100%', background: '#1a3a5c', color: '#F5E642', padding: '14px', borderRadius: 10, border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: '1rem' }}>
          📈 Calculate Listing Price Range
        </button>
        {result && (
          <div style={{ background: '#1a3a5c', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
            <h3 style={{ margin: '0 0 1rem', color: '#F5E642' }}>💰 Suggested Listing Price Range</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {[['Conservative', fmt(result.low), '#acd'], ['Sweet Spot', fmt(result.mid), '#F5E642'], ['Aggressive', fmt(result.high), '#f9a']].map(([label, val, color]) => (
                <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(245,230,66,0.15)', borderRadius: 8, padding: '0.75rem', fontSize: 14 }}>
              ⏱️ Expected days on market at sweet spot price: <strong style={{ color: '#F5E642' }}>{result.days} days</strong> in current {market} market
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
