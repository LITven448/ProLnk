import { useState } from 'react';

const liveOakFacts = [
  { label: 'Leaf Drop Season', value: 'February–April (NOT fall)', note: 'DFW live oaks are semi-evergreen — they drop leaves in spring, not fall like northern oaks' },
  { label: 'Acorn Season', value: 'October–December', note: 'Heavy acorn years occur every 2-3 years; cleanup needed weekly' },
  { label: 'Oak Wilt Risk Window', value: 'April 1 – July 1', note: 'Never prune during this period — nitidula beetles spread spores via fresh cuts' },
  { label: 'Root Spread', value: '2-3x canopy width', note: 'Roots extend far beyond drip line — major consideration near foundations' },
  { label: 'Lifespan', value: '200–500+ years', note: 'Heritage trees in DFW can have historic value and protections' },
];

const gutterSchedule = [
  { month: 'February', task: 'Heavy cleaning — spring leaf drop begins', priority: 'High' },
  { month: 'March', task: 'Clean 2x during peak drop (catkins + leaves)', priority: 'High' },
  { month: 'April', task: 'Final spring clean — drop slows', priority: 'Medium' },
  { month: 'October', task: 'Acorn cleanup begins', priority: 'Medium' },
  { month: 'November', task: 'Heavy acorn season — clean gutters weekly', priority: 'High' },
  { month: 'December', task: 'Final fall clean — acorn drop ends', priority: 'Medium' },
];

const foundationDistances = [
  { distance: 'Under 15 ft', risk: 'Critical', color: '#ef4444', action: 'Consult foundation specialist AND arborist. Root barrier likely needed. Monitor foundation quarterly.' },
  { distance: '15–25 ft', risk: 'High', color: '#f97316', action: 'Annual foundation inspection. Watch for soil movement. Maintain consistent watering to stabilize clay soil.' },
  { distance: '25–35 ft', risk: 'Moderate', color: '#fbbf24', action: 'Biennial foundation inspection. Deep root watering during drought helps stabilize clay.' },
  { distance: 'Over 35 ft', risk: 'Low', color: '#4ade80', action: 'Standard monitoring. Keep soil moisture consistent to prevent clay shrink/swell cycles.' },
];

const situations = ['Spring Leaf Drop Overwhelming', 'Acorn Cleanup Needed', 'Gutter Clogging', 'Foundation Concern', 'Oak Wilt Suspected', 'Pruning Needed'];
const foundationDistanceOptions = ['Under 15 feet', '15–25 feet', '25–35 feet', 'Over 35 feet'];

export default function DFWLiveOakGuide() {
  const [situation, setSituation] = useState('');
  const [foundationDist, setFoundationDist] = useState('');
  const [showAdvice, setShowAdvice] = useState(false);

  const getMaintenanceAdvice = () => {
    if (situation === 'Spring Leaf Drop Overwhelming') return ['This is normal — DFW live oaks drop in Feb–April, not fall', 'Rake or blow leaves weekly during Feb–April peak', 'Mulch leaves in place under tree when possible', 'Avoid removing leaf litter too far from drip line — nutrients return to soil', 'Spring drop lasts 4–6 weeks then stops completely'];
    if (situation === 'Acorn Cleanup Needed') return ['Rake or vacuum weekly October–December during heavy years', 'Acorns can be composted or bagged for disposal', 'Avoid letting acorns pile near foundation — moisture retention risk', 'Squirrels will remove a significant portion naturally', 'Heavy acorn years (mast years) occur every 2–3 years'];
    if (situation === 'Gutter Clogging') return ['Install gutter guards rated for fine debris (catkins and small leaves)', 'Clean gutters in February, March, April, October, November, December', 'Check downspouts for catkin buildup — they compact and block flow', 'Annual professional gutter cleaning recommended for large oaks', 'LeafFilter or similar mesh guards work best for live oak debris'];
    if (situation === 'Foundation Concern') return ['Get a foundation inspection from a licensed engineer ($300–500)', 'Maintain consistent soil moisture — DFW clay shrinks when dry', 'Install soaker hose 18 inches from foundation year-round', 'Root barrier installation ($1,000–3,000) can redirect roots', 'Do NOT remove the tree without professional consultation'];
    if (situation === 'Oak Wilt Suspected') return ['Call ISA-certified arborist immediately', 'Look for: leaves browning from outer edges inward, rapid whole-tree decline', 'Do NOT prune — spreads disease further', 'Fungicide (propiconazole) injections can save tree if caught early', 'Trenching to sever root connections may protect nearby oaks'];
    return ['Prune only August 1 – March 31', 'Never remove more than 25% of canopy per season', 'Hire ISA-certified arborist for limbs over 2 inches diameter', 'Paint all cuts immediately with latex paint (no pruning sealer)', 'Crown raising for clearance is acceptable any time for small limbs'];
  };

  const selectedFoundation = foundationDistances.find(f => f.distance === foundationDist?.replace('feet', 'ft').trim());

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🌿</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Live Oak Guide</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>The most common tree in DFW — what every homeowner needs to know</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📚 Live Oak Facts for DFW Homeowners</h2>
          {liveOakFacts.map(f => (
            <div key={f.label} style={{ padding: '12px 0', borderBottom: '1px solid #2d3f5e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>{f.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{f.value}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{f.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🍂 Gutter Cleaning Schedule for Live Oaks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {gutterSchedule.map(g => (
              <div key={g.month} style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', border: `1px solid ${g.priority === 'High' ? '#F5E642' : '#2d3f5e'}` }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '4px' }}>{g.month}</div>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{g.task}</div>
                <div style={{ fontSize: '0.75rem', color: g.priority === 'High' ? '#fbbf24' : '#64748b', marginTop: '4px' }}>{g.priority} Priority</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>🏠 Foundation Distance Risk by Tree Distance</h2>
          {foundationDistances.map(f => (
            <div key={f.distance} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid #2d3f5e', alignItems: 'flex-start' }}>
              <div style={{ background: f.color, borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 700, color: '#0A1628', minWidth: '70px', textAlign: 'center' }}>{f.risk}</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>{f.distance}</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{f.action}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid #2d3f5e' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>📋 Get Situation-Specific Advice</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select situation...</option>
                {situations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '6px' }}>Tree Distance from Foundation</label>
              <select value={foundationDist} onChange={e => setFoundationDist(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #2d3f5e', color: '#e2e8f0', padding: '10px', borderRadius: '8px' }}>
                <option value="">Select distance...</option>
                {foundationDistanceOptions.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowAdvice(true)} disabled={!situation} style={{ background: situation ? '#F5E642' : '#2d3f5e', color: situation ? '#0A1628' : '#64748b', border: 'none', borderRadius: '8px', padding: '12px 24px', fontWeight: 700, cursor: situation ? 'pointer' : 'not-allowed' }}>
            Get My Live Oak Advice
          </button>
          {showAdvice && situation && (
            <div style={{ marginTop: '16px', background: '#0A1628', borderRadius: '8px', padding: '16px', border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '10px' }}>🌿 {situation} — Maintenance Approach</div>
              {getMaintenanceAdvice().map((item, i) => (
                <div key={i} style={{ padding: '6px 0', fontSize: '0.9rem', color: '#e2e8f0', borderBottom: '1px solid #1e2d45' }}>✅ {item}</div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>ProLnk Home Services · DFW Tree Care Resource</div>
      </div>
    </div>
  );
}
