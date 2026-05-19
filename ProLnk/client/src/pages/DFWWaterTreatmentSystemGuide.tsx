import { useState } from 'react';

const cityWaterProfiles: Record<string, { hardness: string; chloramine: boolean; sediment: string }> = {
  'Dallas': { hardness: 'Moderate (8–12 gpg)', chloramine: true, sediment: 'Low' },
  'Fort Worth': { hardness: 'Moderate-Hard (10–15 gpg)', chloramine: true, sediment: 'Moderate' },
  'Plano': { hardness: 'Hard (12–16 gpg)', chloramine: true, sediment: 'Low' },
  'Frisco': { hardness: 'Very Hard (14–18 gpg)', chloramine: false, sediment: 'Low' },
  'McKinney': { hardness: 'Hard (12–15 gpg)', chloramine: false, sediment: 'Low' },
  'Allen': { hardness: 'Hard (12–16 gpg)', chloramine: false, sediment: 'Low' },
  'Denton': { hardness: 'Moderate (8–12 gpg)', chloramine: true, sediment: 'Moderate' },
  'Arlington': { hardness: 'Moderate-Hard (10–14 gpg)', chloramine: true, sediment: 'Low' },
  'Garland': { hardness: 'Hard (12–15 gpg)', chloramine: true, sediment: 'Low' },
  'Irving': { hardness: 'Moderate (9–13 gpg)', chloramine: true, sediment: 'Low' },
  'Lewisville': { hardness: 'Hard (13–17 gpg)', chloramine: true, sediment: 'Moderate' },
  'Other': { hardness: 'Variable — test recommended', chloramine: true, sediment: 'Moderate' },
};

const concerns = ['Taste & odor', 'Hard water (scale buildup)', 'Everything — full treatment', 'Drinking water safety only', 'Sediment / particles'];

function getRecommendation(city: string, concern: string) {
  const profile = cityWaterProfiles[city] ?? cityWaterProfiles['Other'];
  if (concern === 'Everything — full treatment') {
    return { system: 'Full 4-stage: Sediment → Carbon → Softener → RO drinking', cost: '$2,800–$5,500 installed', maintenance: '$200–$350/yr (salt + filters)', note: `${city} water benefits from complete treatment. Very hard water accelerates appliance wear without a softener.` };
  }
  if (concern === 'Hard water (scale buildup)') {
    return { system: 'Water softener (salt-based ion exchange)', cost: '$800–$2,000 installed', maintenance: '$100–$200/yr (salt)', note: `${city} has ${profile.hardness}. A softener will protect your water heater, dishwasher, and fixtures from scale.` };
  }
  if (concern === 'Taste & odor') {
    return { system: profile.chloramine ? 'Carbon block filter (chloramine-rated)' : 'Activated carbon filter', cost: '$400–$900 installed', maintenance: '$80–$150/yr (filter replacement)', note: profile.chloramine ? `${city} uses chloramine (not chlorine) — requires a specialized carbon block filter rated for chloramine removal.` : `Standard activated carbon effectively removes chlorine taste and odor in ${city} water.` };
  }
  if (concern === 'Drinking water safety only') {
    return { system: 'Under-sink reverse osmosis (RO) system', cost: '$400–$900 installed', maintenance: '$80–$150/yr (membrane + filters)', note: 'RO removes 95–99% of contaminants including lead, nitrates, and chloramine from your drinking and cooking water.' };
  }
  return { system: 'Whole-house sediment filter (5-micron)', cost: '$200–$500 installed', maintenance: '$50–$100/yr (filter cartridges)', note: `Sediment filtration protects your appliances and water heater from particulates. ${profile.sediment} sediment levels in ${city}.` };
}

export default function DFWWaterTreatmentSystemGuide() {
  const [city, setCity] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getRecommendation> | null>(null);

  function calculate() {
    if (!city || !concern) return;
    setResult(getRecommendation(city, concern));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>💧 DFW Water Treatment Guide</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Water Treatment Systems for DFW Homes</h1>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>DFW's Water Challenges</h2>
          <p style={{ lineHeight: 1.7, color: '#c8d8f0′ }}>
            DFW water has three main issues: <strong style={{ color: '#F5E642′ }}>hardness</strong> (scale on everything),
            <strong style={{ color: '#F5E642′ }}> chloramine</strong> (harder to remove than chlorine — needs special filters),
            and <strong style={{ color: '#F5E642′ }}>sediment</strong> in some supply areas. The right system depends on
            which problems matter most to you.
          </p>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>The DFW Treatment Hierarchy</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
            {[
              ['1️⃣', 'Sediment Filter', 'First line — removes particles, protects downstream filters and appliances'],
              ['2️⃣', 'Carbon Filter', 'Removes chlorine/chloramine, taste, odor, VOCs'],
              ['3️⃣', 'Water Softener', 'Removes calcium/magnesium (hardness) via ion exchange — protects water heater'],
              ['4️⃣', 'Reverse Osmosis', 'Final polish — removes remaining contaminants for drinking/cooking water'],
            ].map(([num, name, desc]) => (
              <div key={name} style={{ background: '#0d1e38', borderRadius: 8, padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.4rem', minWidth: 36 }}>{num}</div>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.2rem' }}>{name}</div>
                  <div style={{ color: '#c8d8f0', fontSize: '0.9rem' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Get Your Treatment Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select city...</option>
                {Object.keys(cityWaterProfiles).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {city && cityWaterProfiles[city] && (
                <div style={{ color: '#c8d8f0', fontSize: '0.85rem', marginTop: '0.4rem' }}>
                  Hardness: {cityWaterProfiles[city].hardness} · Chloramine: {cityWaterProfiles[city].chloramine ? '✅ Yes' : '❌ No'} · Sediment: {cityWaterProfiles[city].sediment}
                </div>
              )}
            </div>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Primary Water Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select concern...</option>
                {concerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Get Recommendation
            </button>
          </div>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0d1e38', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Recommended: {result.system}</div>
              <div style={{ color: '#c8d8f0', lineHeight: 1.9 }}>
                <div>💰 Install Cost: <strong style={{ color: '#fff' }}>{result.cost}</strong></div>
                <div>🔧 Annual Maintenance: <strong style={{ color: '#fff' }}>{result.maintenance}</strong></div>
                <div style={{ marginTop: '0.75rem', color: '#F5E642′ }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Get a DFW Water Treatment Specialist</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>ProLnk connects you with licensed plumbers who specialize in DFW water treatment installation and service.</div>
        </div>
      </div>
    </div>
  );
}
