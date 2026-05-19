import { useState } from 'react';

const homeTypes = ['Single Story Slab', 'Two Story Wood Frame', 'Brick Veneer', 'Pier & Beam', 'Manufactured Home'];
const weatherConcerns = ['Summer Heat (100°F+)', 'Ice Storms', '60mph Wind Gusts', 'Flash Floods', 'Tornado Risk', 'Hail'];

const recommendations: Record<string, { items: string[]; cost: string }> = {
  'Single Story Slab|Summer Heat (100°F+)': { items: ['Radiant barrier in attic', 'Upgrade attic insulation to R-38+', 'Solar attic fan', 'Programmable thermostat', 'Seal all ductwork'], cost: '$1,200–$3,500′ },
  'Single Story Slab|Ice Storms': { items: ['Pipe insulation in exterior walls', 'Outdoor faucet covers', 'Attic hatch insulation', 'Weatherstrip all doors', 'Generator hookup'], cost: '$800–$2,200′ },
  'Single Story Slab|60mph Wind Gusts': { items: ['Reinforce garage door (bracing kit)', 'Impact-rated entry doors', 'Strap down HVAC unit', 'Trim overhanging trees', 'Inspect roof fasteners'], cost: '$1,500–$4,000′ },
  'Single Story Slab|Flash Floods': { items: ['Regrade yard away from foundation', 'French drain installation', 'Flood vents in garage', 'Sump pump in low spots', 'Extend downspouts 6ft+'], cost: '$2,000–$8,000′ },
  'Single Story Slab|Tornado Risk': { items: ['Safe room installation', 'Reinforce garage door', 'Secure outdoor furniture anchors', 'Interior safe room or shelter', 'Emergency kit + plan'], cost: '$5,000–$12,000′ },
  'Single Story Slab|Hail': { items: ['Class 4 impact-resistant roof', 'Hail-rated skylights', 'Screen HVAC condenser', 'Vehicle covered parking', 'Document pre-storm condition'], cost: '$8,000–$18,000′ },
};

function getRecommendation(home: string, concern: string) {
  const key = `${home}|${concern}`;
  return recommendations[key] || {
    items: ['Inspect roof and gutters annually', 'Seal foundation cracks', 'Maintain HVAC filters', 'Keep emergency supplies stocked', 'Review homeowner insurance coverage'],
    cost: '$500–$2,500',
  };
}

export default function DFWHomeWeatherProofingGuide() {
  const [homeType, setHomeType] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<{ items: string[]; cost: string } | null>(null);

  function handleSubmit() {
    if (!homeType || !concern) return;
    setResult(getRecommendation(homeType, concern));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🌪️ DFW Home Weather-Proofing Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW homeowners face the full weather spectrum: 100°F+ summers, devastating ice storms, 60mph straight-line winds, sudden flash floods, and tornado risk. This guide helps you prioritize what to protect first.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>🏠 Priority Weather Protection by Risk</div>
          {[['☀️ Summer Heat', 'Radiant barrier + R-38 insulation = 20–30% cooling cost reduction'],
            ['🧊 Ice Storms', 'Pipe insulation + generator = prevents most Feb 2021-style losses'],
            ['💨 Wind', 'Garage door bracing is #1 — single largest point of failure in high wind'],
            ['🌊 Floods', 'French drains + grading = first line of defense before water hits foundation'],
            ['🌩️ Tornado', 'No exterior fix replaces a safe room — shelter is the only true protection'],
          ].map(([icon, tip]) => (
            <div key={icon} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.1rem' }}>{icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>🔍 Get Your Priority List</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select home type...</option>
              {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Biggest Weather Concern</label>
            <select value={concern} onChange={e => setConcern(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select concern...</option>
              {weatherConcerns.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Get Priority Investments →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>✅ Your Priority Weatherproofing Investments</div>
            {result.items.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#F5E642′ }}>▸</span>
                <span style={{ color: '#e2e8f0′ }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', color: '#F5E642', fontWeight: 600 }}>
              💰 Estimated Cost Range: {result.cost}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
