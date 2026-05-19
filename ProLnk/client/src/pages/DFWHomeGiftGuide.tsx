import { useState } from 'react';

const gifts = [
  { name: 'Rekey Door Locks', cost: 80, situation: ['new'], priority: 'essential', why: 'Previous owners/agents have keys — rekeying is the #1 new DFW homeowner safety move', vendor: 'Local locksmith or Home Depot key service' },
  { name: 'HVAC Filter Subscription', cost: 60, situation: ['new', 'firsthome'], priority: 'essential', why: 'DFW dust and pollen are brutal — 1" filters monthly, 4" filters quarterly. Filterbuy or Amazon Subscribe & Save', vendor: 'Filterbuy.com or Amazon Subscribe & Save' },
  { name: 'Water Softener Salt (6-month supply)', cost: 120, situation: ['new', 'renovation', 'firsthome'], priority: 'high', why: 'DFW has very hard water — softener salt extends water heater and appliance life significantly', vendor: 'Morton Salt or Lowes — 40lb bags' },
  { name: 'Quarterly Pest Control Plan', cost: 200, situation: ['new', 'firsthome'], priority: 'high', why: 'DFW has scorpions, roaches, and fire ants — quarterly treatment is standard practice here', vendor: 'Terminix, Arrow, or local DFW company' },
  { name: 'Tree Trimming Gift Card', cost: 250, situation: ['new', 'renovation'], priority: 'high', why: 'DFW spring storms hit hard — overhanging oak or elm limbs are a roof risk. Annual trim is essential', vendor: 'Local arborist or GreenPal' },
  { name: 'Smart Thermostat', cost: 180, situation: ['new', 'firsthome', 'renovation'], priority: 'high', why: 'DFW electric bills hit $400+ in summer. Ecobee or Nest cuts cooling cost 15–20% with DFW schedules', vendor: 'Ecobee SmartThermostat or Google Nest' },
  { name: 'Whole-Home Surge Protector', cost: 300, situation: ['new', 'firsthome'], priority: 'medium', why: 'DFW summer thunderstorms cause frequent surges — panel-level protectors guard all appliances at once', vendor: 'Electrician install — Siemens or Square D unit' },
  { name: 'Sprinkler System Tune-Up', cost: 150, situation: ['new', 'renovation'], priority: 'medium', why: 'DFW summer Stage 2 drought restrictions require efficient irrigation. Annual calibration saves water and fines', vendor: 'RainBird certified local tech' },
  { name: 'Exterior Door Weatherstripping Kit', cost: 45, situation: ['firsthome'], priority: 'medium', why: 'DFW energy costs soar when air leaks — weatherstripping is the highest ROI home improvement under $50', vendor: 'Home Depot or Lowes — foam/rubber strip kits' },
  { name: 'Emergency Home Kit', cost: 95, situation: ['firsthome', 'new'], priority: 'medium', why: 'DFW severe weather season (Mar–Jun) requires: flashlights, water, radio, first aid, phone charger bank', vendor: 'American Red Cross kit or build your own' },
];

export default function DFWHomeGiftGuide() {
  const [budget, setBudget] = useState(150);
  const [situation, setSituation] = useState('');
  const [results, setResults] = useState<typeof gifts>([]);

  function getGifts() {
    if (!situation) return;
    const filtered = gifts.filter(g => g.situation.includes(situation) && g.cost <= budget);
    setResults(filtered.sort((a, b) => a.cost - b.cost));
  }

  const priorityColor = (p: string) => p === 'essential' ? '#f87171' : p === 'high' ? '#F5E642' : '#94a3b8';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🎁🏠</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>DFW Homeowner Gift Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Skip the candles. DFW homeowners need practical gifts that address the real challenges of owning a home in North Texas.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find the Right DFW Gift</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Budget: ${budget}</label>
            <input type="range" min={40} max={500} step={10} value={budget} onChange={e => setBudget(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 12 }}>
              <span>$40</span><span>$500</span>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Recipient Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f' }}>
              <option value="">Select...</option>
              <option value="new">Just bought a DFW home</option>
              <option value="firsthome">First-time homeowner</option>
              <option value="renovation">Active renovation / upgrade</option>
            </select>
          </div>
          <button onClick={getGifts} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>Find DFW Gift Ideas</button>
        </div>

        {results.length > 0 && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: 16 }}>{results.length} gifts found under ${budget}</p>
            {results.map(g => (
              <div key={g.name} style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 16 }}>{g.name}</h3>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: priorityColor(g.priority), fontSize: 12, fontWeight: 600, background: '#0A1628', padding: '2px 8px', borderRadius: 4 }}>{g.priority.toUpperCase()}</span>
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>${g.cost}</span>
                  </div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8 }}>{g.why}</p>
                <p style={{ color: '#64748b', fontSize: 12 }}>🛒 {g.vendor}</p>
              </div>
            ))}
          </div>
        )}

        {results.length === 0 && situation && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 24, textAlign: 'center' }}>
            <p style={{ color: '#94a3b8' }}>No gifts found — try increasing your budget above $40</p>
          </div>
        )}
      </div>
    </div>
  );
}
