import { useState } from 'react';

const dfwCities = ['Dallas','Fort Worth','Plano','Frisco','McKinney','Arlington','Irving','Garland','Mesquite','Richardson','Allen','Lewisville','Carrollton','Denton','Flower Mound','Grapevine','Southlake','Colleyville','Keller','Bedford','Hurst','Euless','Addison','Coppell','Rockwall','Rowlett','Wylie','Prosper','Celina','Little Elm'];
const wasteTypes = ['Regular household trash','Bulk furniture / appliances','Electronics (e-waste)','Hazardous materials (paint, batteries)','Yard waste / brush','Construction debris'];

const cityData: Record<string, { provider: string; schedule: string; recycling: string; bulk: string; hazmat: string }> = {
  Dallas: { provider: 'Dallas Sanitation Services (city-provided)', schedule: 'Weekly trash + weekly recycling', recycling: 'Cardboard, paper, plastic #1-7, glass, aluminum, steel cans', bulk: 'On-call bulk pickup via 311 — schedule at least 48hrs ahead', hazmat: 'City-run HazMat events quarterly; check dallascityhall.com' },
  Plano: { provider: 'City of Plano Solid Waste (city-provided)', schedule: 'Weekly trash + weekly recycling + weekly yard waste', recycling: 'Wide acceptance: cardboard, plastics, metals, glass. No plastic bags.', bulk: 'Monthly bulk day by zone — check plano.gov for your zone date', hazmat: 'Plano Environmental Waste Center (free drop-off year-round)' },
  Frisco: { provider: 'City of Frisco (Republic Services contract)', schedule: 'Weekly trash + weekly recycling', recycling: 'Cardboard, paper, plastic #1-2, metals. No glass in curbside bin.', bulk: 'Monthly bulk collection — no advance scheduling needed', hazmat: 'Frisco Hazardous Waste Collection events twice yearly' },
  McKinney: { provider: 'City of McKinney (Republic Services)', schedule: 'Weekly trash + bi-weekly recycling', recycling: 'Standard recyclables; no glass curbside', bulk: 'On-call bulk pickup — call 972-547-7350', hazmat: 'County HHW events in coordination with Collin County' },
  Arlington: { provider: 'City of Arlington Solid Waste', schedule: 'Weekly trash + weekly recycling', recycling: 'Paper, cardboard, plastic #1-2, metals, glass accepted', bulk: 'Monthly bulk by route — arlington.gov schedule lookup', hazmat: 'City HazMat events 4x/year at designated sites' },
  default: { provider: 'Contact your city hall or utility billing department', schedule: 'Typically weekly trash + weekly or bi-weekly recycling', recycling: 'Most DFW cities accept: paper, cardboard, plastic #1-2, metal cans. Check city website for glass policy.', bulk: 'Most cities offer monthly or on-call bulk — call city or check website', hazmat: 'Collin/Dallas/Tarrant/Denton county HHW programs accept paint, batteries, chemicals' },
};

function getCityData(city: string) {
  return cityData[city] || { ...cityData.default, provider: `${city}: Contact city hall for solid waste provider` };
}

function getWasteInfo(wasteType: string) {
  const map: Record<string, string> = {
    'Regular household trash': '🗑️ Set out night before or morning of collection day. Don\’t overfill bin — lid must close fully.',
    'Bulk furniture / appliances': '🛋️ Schedule in advance or check your monthly bulk day. No freon-containing appliances without certification.',
    'Electronics (e-waste)': '💻 Never in regular trash. Use city e-waste events, Best Buy drop-off, or Goodwill Tech Center.',
    'Hazardous materials (paint, batteries)': '⚠️ Latex paint: dry it out (kitty litter method) before trash. Oil paint, batteries, chemicals: HHW events only.',
    'Yard waste / brush': '🌿 Most cities accept in brown paper bags or tied bundles. Some cities have green cart programs.',
    'Construction debris': '🏗️ NOT covered by regular service. Rent a dumpster or hire a junk removal service. Some cities allow limited amounts.',
  };
  return map[wasteType] || '📦 Check your city\’s solid waste website for specific disposal guidelines.';
}

export default function DFWGarbageServiceGuide() {
  const [city, setCity] = useState('');
  const [wasteType, setWasteType] = useState('');
  const data = city ? getCityData(city) : null;
  const wasteInfo = wasteType ? getWasteInfo(wasteType) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🗑️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Garbage & Recycling Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>City-by-city guide to trash, recycling, bulk pickup, and hazardous waste in DFW</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0 }}>🏙️ City-Provided vs Private Service</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Most DFW cities provide <strong style={{ color: '#F5E642′ }}>city-managed solid waste</strong> included in your water/utility bill. Some contract with Republic Services or Waste Management. A few outer suburbs require you to hire a private hauler. When you move, always confirm with the city whether service is automatic or requires setup.</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🔍 Look Up Your City</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Your DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select city</option>
                {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Waste Type to Dispose</label>
              <select value={wasteType} onChange={e => setWasteType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select waste type</option>
                {wasteTypes.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
          </div>
          {data && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f', marginBottom: '0.75rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📍 {city} Solid Waste Info</div>
              {[
                ['🏢 Provider', data.provider],
                ['📅 Schedule', data.schedule],
                ['♻️ Recycling Accepted', data.recycling],
                ['🛋️ Bulk Pickup', data.bulk],
                ['⚠️ Hazmat / HHW', data.hazmat],
              ].map(([label, value]) => (
                <div key={label as string} style={{ marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{label as string}</span>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{value as string}</div>
                </div>
              ))}
            </div>
          )}
          {wasteInfo && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>Disposal Guidance</div>
              <div style={{ color: '#cbd5e1′ }}>{wasteInfo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
