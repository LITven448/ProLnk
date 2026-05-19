import { useState } from 'react';

const needs = ['New Landscape Installation', 'Irrigation System Repair / Install', 'Seasonal Lawn Maintenance', 'Sod Installation', 'Tree Trimming / Removal', 'Drainage / Grading', 'Winter Prep / Dormant Seeding'];
const timings = ['January – February', 'March – April (Spring Rush)', 'May – June', 'July – August (Peak Heat)', 'September – October (Fall Window)', 'November – December'];

const needData: Record<string, { description: string; bestTime: string; worstTime: string; tip: string }> = {
  'New Landscape Installation': {
    description: 'High-demand service. Quality landscapers in DFW book 4–8 weeks out during spring. Design-build firms even longer.',
    bestTime: 'October–November (fall planting) or February (early pre-spring)',
    worstTime: 'April–May — every landscaper is booked solid. You\’ll get their C-team or pay a 30% premium.',
    tip: 'Lock in your landscaper in winter. Walk the property together in December for a spring start.',
  },
  'Irrigation System Repair / Install': {
    description: 'DFW drought conditions and watering restrictions create massive summer backlog for irrigation techs.',
    bestTime: 'March (pre-restriction season) or October (winterization)',
    worstTime: 'June–August — irrigation techs are overwhelmed. Simple repairs take 3–6 weeks.',
    tip: 'Run a full system check in late February before restrictions activate. Fix issues before summer.',
  },
  'Seasonal Lawn Maintenance': {
    description: 'Year-round service, but spring sign-ups are the most competitive for good crews.',
    bestTime: 'January–February for spring start. Sign agreements in winter.',
    worstTime: 'April–May — crews at capacity. New clients get poor scheduling.',
    tip: 'A maintenance contract locks in your spot. Month-to-month customers get bumped first.',
  },
  'Sod Installation': {
    description: 'Bermuda sod installation is heavily seasonal in DFW. Warm season, so April–June is peak.',
    bestTime: 'April–June for warm season sod. Early October for fescue in shaded areas.',
    worstTime: 'July–August — heat stress kills newly installed sod without major watering effort.',
    tip: 'St. Augustine and Bermuda are most common in DFW. Match grass type to your sun exposure.',
  },
  'Tree Trimming / Removal': {
    description: 'Good availability most of year. Ice storm aftermath (Feb) creates temporary backlogs.',
    bestTime: 'Late fall to winter — trees dormant, cleaner cuts, less disease risk.',
    worstTime: 'Post ice-storm — every tree company in DFW is slammed for 6–10 weeks.',
    tip: 'ISA-certified arborist is worth the premium for large trees. Avoid unlicensed crews with chainsaws.',
  },
  'Drainage / Grading': {
    description: 'Demand spikes after heavy rain events. DFW clay soil creates chronic drainage problems.',
    bestTime: 'September–October. Dry ground is easier to grade and landscape companies have capacity.',
    worstTime: 'Spring after rain events — every homeowner discovers their drainage issues simultaneously.',
    tip: 'French drains and channel drains are most common fixes in DFW. Get multiple bids — pricing varies widely.',
  },
  'Winter Prep / Dormant Seeding': {
    description: 'Moderate demand, concentrated October–November window. Good availability.',
    bestTime: 'October–early November for dormant seeding and pre-emergent applications.',
    worstTime: 'After first freeze — window has closed.',
    tip: 'DFW\’s mild winters still require winterizer fertilizer in Nov for healthy spring green-up.',
  },
};

const timingData: Record<string, { market: string; drought: string; capacity: string }> = {
  'January – February': { market: '🟢 Quiet — Best time to hire and negotiate.', drought: 'Low drought stress. Good window for planning and prep.', capacity: 'High availability. Landscapers actively seeking spring contracts.' },
  'March – April (Spring Rush)': { market: '🔴 Peak demand — Major bottleneck for all landscaping services.', drought: 'Moderate. Irrigation systems activating.', capacity: 'Severely limited. Book by February or face backlogs.' },
  'May – June': { market: '🟠 Still busy — Spring rush extends into early summer.', drought: 'Rising. Watering restrictions may activate.', capacity: 'Moderate. Experienced crews mostly committed.' },
  'July – August (Peak Heat)': { market: '🟡 Slightly loosens — Extreme heat slows installs. Irrigation emergencies spike.', drought: 'High. DFW drought conditions typically most severe.', capacity: 'Divided between maintenance and irrigation emergencies.' },
  'September – October (Fall Window)': { market: '🟢 Excellent — Best overall window after spring.', drought: 'Easing. Good planting conditions return.', capacity: 'Good. Fall is underrated for installs and projects.' },
  'November – December': { market: '🟢 Slowest season — Maximum leverage for negotiating contracts.', drought: 'Low. Preparation for dormant season.', capacity: 'Best availability of year. Lock in 2025 spring contracts now.' },
};

export default function DFWLandscapingMarketGuide() {
  const [need, setNeed] = useState('');
  const [timing, setTiming] = useState('');

  const needResult = need ? needData[need] : null;
  const timingResult = timing ? timingData[timing] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MARKET GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌿 DFW Landscaping Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>DFW landscaping is intensely seasonal. Spring demand overwhelms every good landscaper's schedule within weeks. Drought conditions and watering restrictions create summer irrigation backlogs. The homeowners who plan ahead get the best crews and the best prices.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[['🌡️', 'Drought Impact', 'DFW drought conditions since 2022 have permanently elevated irrigation service demand.'], ['📅', 'Timing Is Everything', 'Spring demand spikes 400–500% vs winter. The same landscaper costs 20–30% more in April.'], ['🤝', 'Loyalty Pays', 'Maintenance clients get priority. New clients in spring get last pick of scheduling.']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Your Market Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Landscaping Need</label>
              <select value={need} onChange={e => setNeed(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select need...</option>
                {needs.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Timing</label>
              <select value={timing} onChange={e => setTiming(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select timing...</option>
                {timings.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {needResult && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642', marginBottom: 12 }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642' }}>About This Service</div>
              <div style={{ marginBottom: 10, color: '#e2e8f0' }}>{needResult.description}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                <div style={{ backgroundColor: '#112240', borderRadius: 8, padding: 10 }}><div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Best Time to Book</div><div style={{ fontSize: 13, color: '#4ade80' }}>{needResult.bestTime}</div></div>
                <div style={{ backgroundColor: '#112240', borderRadius: 8, padding: 10 }}><div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Avoid Booking</div><div style={{ fontSize: 13, color: '#f87171' }}>{needResult.worstTime}</div></div>
              </div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>💡 Pro Tip: {needResult.tip}</div>
            </div>
          )}

          {timingResult && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #4ade80' }}>
              <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642' }}>Current Window Conditions</div>
              <div style={{ marginBottom: 8 }}>{timingResult.market}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div><span style={{ color: '#94a3b8', fontSize: 12, display: 'block' }}>Drought Status</span><span style={{ fontSize: 13 }}>{timingResult.drought}</span></div>
                <div><span style={{ color: '#94a3b8', fontSize: 12, display: 'block' }}>Crew Capacity</span><span style={{ fontSize: 13 }}>{timingResult.capacity}</span></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Lock In a Vetted DFW Landscaper Now</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 12 }}>ProLnk matches you with proven DFW landscapers before spring rush fills every calendar.</div>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '10px 24px', borderRadius: 8, display: 'inline-block' }}>Join ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
