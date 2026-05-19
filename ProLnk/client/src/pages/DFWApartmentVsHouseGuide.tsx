import { useState } from 'react';

const dfwNeighborhoods = {
  walkable: ['Deep Ellum', 'Uptown Dallas', 'Lower Greenville', 'Knox-Henderson', 'Bishop Arts', 'West 7th Fort Worth'],
  suburban: ['Frisco', 'Plano', 'McKinney', 'Southlake', 'Flower Mound', 'Allen', 'Keller'],
  mixed: ['Richardson', 'Garland', 'Irving', 'Grand Prairie', 'Mesquite', 'Denton'],
};

function calcCosts(budget: number, type: string, location: string) {
  const aptRent = budget * 0.38;
  const aptUtils = 180;
  const aptTotal = aptRent + aptUtils;

  const homePrice = budget * (location === 'suburban' ? 4.2 : 3.5);
  const mortgage = homePrice * 0.006;
  const taxes = homePrice * 0.022 / 12;
  const insurance = homePrice * 0.0012 / 12;
  const maintenance = homePrice * 0.01 / 12;
  const hoa = location === 'suburban' ? 80 : 0;
  const homeTotal = mortgage + taxes + insurance + maintenance + hoa;

  return { aptTotal: Math.round(aptTotal), homeTotal: Math.round(homeTotal), homePrice: Math.round(homePrice), mortgage: Math.round(mortgage), taxes: Math.round(taxes) };
}

export default function DFWApartmentVsHouseGuide() {
  const [household, setHousehold] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState(5000);
  const [result, setResult] = useState<null | { rec: string; reason: string; aptTotal: number; homeTotal: number; homePrice: number }>(null);

  function analyze() {
    if (!household || !location) return;
    const costs = calcCosts(budget, household, location);
    let rec = '';
    let reason = '';
    if (household === 'single' && location === 'urban') {
      rec = '🏢 Apartment';
      reason = 'Walkable DFW neighborhoods like Uptown offer lifestyle premium apartments can\’t match with a house. Flexibility wins.';
    } else if (household === 'family') {
      rec = '🏡 House';
      reason = 'DFW suburban school districts (Frisco ISD, Plano ISD) are top-rated. Yard space and garage essential for family life here.';
    } else if (costs.homeTotal > budget * 0.42) {
      rec = '🏢 Apartment (for now)';
      reason = 'At this budget, true homeownership cost in DFW exceeds 42% income — build equity in savings first.';
    } else {
      rec = '🏡 House';
      reason = 'DFW home appreciation averages 6–8%/year. At your budget, building equity beats renting long-term.';
    }
    setResult({ rec, reason, aptTotal: costs.aptTotal, homeTotal: costs.homeTotal, homePrice: costs.homePrice });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏢🏡</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Apartment vs. House Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW is one of the fastest-growing metros in the US. The right choice depends on where in DFW you're looking — and your life stage.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🗺️ Walkable DFW Neighborhoods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Walk-Friendly Apartments</p>
              {dfwNeighborhoods.walkable.map(n => <p key={n} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>📍 {n}</p>)}
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Family Suburban Zones</p>
              {dfwNeighborhoods.suburban.map(n => <p key={n} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 4 }}>🏘️ {n}</p>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Run Your DFW Numbers</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Household Type</label>
            <select value={household} onChange={e => setHousehold(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="single">Single / Couple No Kids</option>
              <option value="family">Family with Children</option>
              <option value="remote">Remote Worker / Flexibility Priority</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>DFW Zone</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="urban">Urban Core (Dallas/Fort Worth)</option>
              <option value="suburban">Suburb (Frisco, Plano, McKinney)</option>
              <option value="mixed">Mid-Ring (Richardson, Irving, Garland)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Monthly Budget: ${budget.toLocaleString()}</label>
            <input type="range" min={2000} max={15000} step={250} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Compare Options</button>
        </div>

        {result && (
          <div style={{ background: '#1a3a5c', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', fontSize: 22, marginBottom: 12 }}>{result.rec}</h3>
            <p style={{ color: '#cbd5e1', marginBottom: 20 }}>{result.reason}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>Apartment True Cost/mo</p>
                <p style={{ color: '#F5E642', fontSize: 24, fontWeight: 700 }}>${result.aptTotal.toLocaleString()}</p>
                <p style={{ color: '#64748b', fontSize: 12 }}>Rent + utilities, builds $0 equity</p>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>Homeownership True Cost/mo</p>
                <p style={{ color: '#F5E642', fontSize: 24, fontWeight: 700 }}>${result.homeTotal.toLocaleString()}</p>
                <p style={{ color: '#64748b', fontSize: 12 }}>~${result.homePrice.toLocaleString()} home est.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
