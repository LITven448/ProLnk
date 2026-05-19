import { useState } from 'react';

const filterSystems = [
  {
    id: 'sediment',
    name: 'Sediment Filter (Stage 1)',
    description: 'Removes particles, rust, and sand. Required first stage for all DFW whole-house systems.',
    dfwNote: '🏗️ DFW infrastructure is aging — many areas see elevated sediment from pipe corrosion. Replace cartridge every 3–6 months.',
    targetsConcerns: ['rust', 'sediment', 'cloudy'],
    dfwCities: ['All DFW cities'],
    cost: '$150–$400 installed',
    maintenance: 'Cartridge replacement every 3–6 months ($15–$40)',
    installLocation: 'Main water line entry, before water heater',
  },
  {
    id: 'carbon',
    name: 'Activated Carbon Filter (Stage 2)',
    description: 'Removes chlorine, chloramines, VOCs, and improves taste and odor across all DFW water sources.',
    dfwNote: '🧪 Fort Worth uses chloramines (chlorine + ammonia) instead of chlorine. Standard carbon filters require longer contact time — use catalytic carbon for FW.',
    targetsConcerns: ['chlorine', 'taste', 'odor', 'vocs'],
    dfwCities: ['All DFW cities', 'Especially Fort Worth (chloramines)'],
    cost: '$400–$900 installed',
    maintenance: 'Media replacement every 5–10 years ($200–$400)',
    installLocation: 'After sediment filter, before softener',
  },
  {
    id: 'softener',
    name: 'Water Softener',
    description: 'Ion exchange removes calcium and magnesium. DFW water hardness 150–450 PPM — among the hardest in Texas.',
    dfwNote: '⚠️ DFW average water hardness is 18–26 GPG (extremely hard). Softener is nearly essential for appliance longevity and skin/hair health.',
    targetsConcerns: ['hardness', 'scale', 'appliances', 'skin'],
    dfwCities: ['All DFW cities — Dallas 16 GPG, Plano 19 GPG, Fort Worth 22 GPG avg'],
    cost: '$1,200–$3,000 installed',
    maintenance: 'Salt refill monthly $20–$40, resin replacement 10–15 years',
    installLocation: 'After carbon filter, before water heater',
  },
  {
    id: 'ro',
    name: 'Reverse Osmosis (Point of Use)',
    description: 'Not whole-house — under-sink RO for drinking/cooking water. Removes 95%+ of all contaminants including nitrates and lead.',
    dfwNote: '🚰 RO pairs with whole-house filtration: use softener + carbon whole-house, RO at kitchen sink for drinking. Standalone RO strips minerals needed by appliances.',
    targetsConcerns: ['drinking', 'lead', 'nitrates', 'everything'],
    dfwCities: ['All DFW cities — especially older homes with lead solder'],
    cost: '$300–$800 installed (under-sink)',
    maintenance: 'Filters every 6–12 months $50–$150/yr, membrane every 2–3 years',
    installLocation: 'Under kitchen sink, separate faucet',
  },
];

const cityHardness: Record<string, string> = {
  dallas: '16 GPG — Hard. Sediment + Carbon + Softener recommended.',
  plano: '19 GPG — Very Hard. Full 3-stage system recommended.',
  fortworth: '22 GPG — Very Hard. Use catalytic carbon (chloramines). Full system.',
  arlington: '18 GPG — Hard. Standard 3-stage system.',
  frisco: '21 GPG — Very Hard. Full system + RO for drinking.',
  mckinney: '20 GPG — Very Hard. Full system recommended.',
  garland: '17 GPG — Hard. Sediment + Carbon + Softener.',
  irving: '15 GPG — Hard. Softener recommended.',
  other: '15–25 GPG typical. Request water quality report from your utility.',
};

const recommend = (city: string, concern: string): string[] => {
  const base = ['sediment', 'carbon', 'softener'];
  if (concern === 'drinking') return [...base, 'ro'];
  if (concern === 'scale') return base;
  if (concern === 'taste') return ['sediment', 'carbon'];
  return base;
};

export default function DFWWholeHouseFilterGuide() {
  const [city, setCity] = useState('');
  const [concern, setConcern] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const getRecommendation = () => {
    if (!city || !concern) return;
    setResults(recommend(city, concern));
  };

  const cityInfo = cityHardness[city] ?? '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚿 DFW Whole House Water Filter Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW has some of the hardest water in Texas — 15–26 grains per gallon depending on your city. Without filtration, you're shortening appliance life and paying for it in scale buildup.</p>

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Filter System Finder</h2>
        <div style={{ background: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select your DFW city...</option>
              {Object.keys(cityHardness).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          {city && <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: '#F5E642' }}>💧 {cityInfo}</div>}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>Primary Water Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8 }}>
              <option value="">Select concern...</option>
              <option value="scale">⬜ Scale buildup on fixtures / appliances</option>
              <option value="taste">👅 Taste / odor issues</option>
              <option value="drinking">🚰 Safe drinking water priority</option>
              <option value="skin">🧴 Skin and hair dryness</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get Filter Recommendation →
          </button>
        </div>

        {results.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>✅ Recommended System (install in order)</div>
            {filterSystems.filter(f => results.includes(f.id)).map((f, i) => (
              <div key={f.id} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 12, border: '1px solid #F5E642' }}>
                <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 4 }}>Stage {i + 1}</div>
                <h3 style={{ fontWeight: 700, marginBottom: 8 }}>{f.name}</h3>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 10, fontSize: 13, marginBottom: 8 }}>{f.dfwNote}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>📍 Install: {f.installLocation}</div>
                <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {f.cost} | 🔧 {f.maintenance}</div>
              </div>
            ))}
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>All Filter Types</h2>
        {filterSystems.map(f => (
          <div key={f.id} style={{ background: '#111F3A', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{f.name}</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{f.description}</p>
            <div style={{ fontSize: 13, marginBottom: 6 }}>{f.dfwNote}</div>
            <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {f.cost}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
