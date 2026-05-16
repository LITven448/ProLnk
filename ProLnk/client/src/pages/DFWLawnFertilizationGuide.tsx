import { useState } from 'react';

const GRASS_TYPES = ['Bermuda', 'St. Augustine', 'Zoysia', 'Buffalo Grass', 'Tall Fescue (cool-season)'];
const DFW_LOCATIONS = ['North Dallas / Collin County', 'Fort Worth / Tarrant County', 'Arlington / Mid-Cities', 'Irving / Grand Prairie', 'Denton County', 'Rockwall / Kaufman County'];

type CalEntry = { month: string; action: string; product: string; note: string };

const CALENDARS: Record<string, CalEntry[]> = {
  Bermuda: [
    { month: 'February', action: '🛡️ Pre-emergent #1', product: 'Dimension or Barricade at 0.25 lb/1000 sq ft', note: 'Apply when soil temps hit 50–55°F — critical DFW window for crabgrass prevention' },
    { month: 'April', action: '🌱 Starter fertilizer', product: '18-24-12 or similar high-phosphorus', note: 'Only if installing new sod — apply at green-up for established lawns' },
    { month: 'May', action: '🌿 Main fertilization #1', product: 'Slow-release nitrogen, 32-0-10 or similar', note: 'Apply 1 lb nitrogen per 1,000 sq ft. DO NOT apply until grass is fully green' },
    { month: 'June', action: '🌡️ Spot weed treatment', product: 'Post-emergent broadleaf herbicide', note: 'Treat actively growing weeds — avoid spraying in temps above 90°F' },
    { month: 'July', action: '🌿 Main fertilization #2', product: 'Slow-release nitrogen, same formulation', note: 'Second nitrogen push for dense summer growth. Stop after July 15 in most DFW areas' },
    { month: 'August', action: '🛡️ Pre-emergent #2', product: 'Dimension or Barricade (half rate)', note: 'Fall pre-emergent prevents winter annual weeds like annual bluegrass' },
    { month: 'September', action: '⚠️ No fertilizer', product: 'N/A', note: 'Bermuda begins dormancy prep — fertilizing now causes frost damage' },
    { month: 'October–March', action: '❄️ Dormancy period', product: 'N/A', note: 'No fertilizer on dormant Bermuda — wait until soil is 65°F and grass is fully green' },
  ],
  'St. Augustine': [
    { month: 'February', action: '🛡️ Pre-emergent #1', product: 'Dimension (NOT Barricade — can damage St. Aug)', note: 'Use Dimension product — Barricade/prodiamine can injure St. Augustine' },
    { month: 'April', action: '🌿 First fertilization', product: 'Slow-release 15-5-10 or St. Augustine specialty', note: 'Apply when lawn is fully green, 1 lb nitrogen per 1,000 sq ft' },
    { month: 'May–June', action: '🐛 Chinch bug monitoring', product: 'Bifenthrin if detected', note: 'Check lawn edges and sunny areas — chinch bugs peak in summer heat' },
    { month: 'June', action: '🌿 Second fertilization', product: 'Same slow-release formula', note: 'Keep nitrogen moderate — excessive nitrogen worsens gray leaf spot risk' },
    { month: 'August', action: '⚠️ No fertilizer', product: 'N/A', note: 'High temps + nitrogen = gray leaf spot fungus. Stop fertilizing by Aug 1 in DFW' },
    { month: 'September', action: '🛡️ Pre-emergent #2', product: 'Dimension at reduced rate', note: 'Fall application protects against winter annual weeds' },
  ],
  Zoysia: [
    { month: 'February', action: '🛡️ Pre-emergent #1', product: 'Barricade or Dimension', note: 'Same timing as Bermuda — soil temp trigger at 50–55°F' },
    { month: 'May', action: '🌿 Main fertilization', product: 'Low-nitrogen slow-release, 15-0-15', note: 'Zoysia needs LESS nitrogen than Bermuda — over-feeding causes thatch' },
    { month: 'July', action: '🌿 Light feeding', product: 'Low-rate nitrogen application', note: 'Half rate of Bermuda recommendation — Zoysia is slow growing' },
    { month: 'September', action: '⚠️ Stop fertilizing', product: 'N/A', note: 'Zoysia goes dormant slightly earlier than Bermuda in DFW' },
  ],
  'Buffalo Grass': [
    { month: 'May', action: '🌿 Single annual fertilization', product: 'Low-nitrogen, 10-0-10 or similar', note: 'Buffalo grass is native and needs minimal feeding — over-fertilizing kills it' },
    { month: 'All year', action: '⚠️ No pre-emergent needed', product: 'N/A', note: 'Pre-emergents can damage Buffalo grass — skip entirely' },
  ],
  'Tall Fescue (cool-season)': [
    { month: 'September', action: '🌿 Primary fertilization', product: 'Slow-release nitrogen 32-0-10', note: 'Fall is the MAIN fertilization for cool-season fescue in DFW' },
    { month: 'October', action: '🌿 Secondary feeding', product: 'Same formula, half rate', note: 'Second fall application builds root reserves for winter' },
    { month: 'February', action: '🌿 Light spring feeding', product: 'Low-nitrogen formula only', note: 'Light feed only — heavy spring nitrogen causes summer burnout' },
    { month: 'May–August', action: '⚠️ No fertilizer', product: 'N/A', note: 'Fescue is dormant or heat-stressed in DFW summer — fertilizing kills it' },
  ],
};

export default function DFWLawnFertilizationGuide() {
  const [grass, setGrass] = useState('');
  const [location, setLocation] = useState('');
  const [calendar, setCalendar] = useState<CalEntry[] | null>(null);

  function generate() {
    if (grass && location) setCalendar(CALENDARS[grass] || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌱</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Lawn Fertilization Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Fertilization timing is everything in DFW. The wrong product at the wrong time causes more damage than no fertilization at all. February pre-emergent and the May nitrogen window are your two most critical annual events.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🚫 DFW Fertilization Rules</h2>
          {[
            'Never fertilize dormant grass (Nov–Mar for warm-season types)',
            'Never fertilize when temps exceed 90°F — risk of burn and disease',
            'February pre-emergent is non-negotiable for weed prevention',
            'Slow-release nitrogen is always better than quick-release for DFW heat',
            'Soil test before adding phosphorus — DFW soil is usually not deficient',
            'Stop all fertilization 6–8 weeks before first frost (typically November)',
          ].map((rule, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #ef4444' }}>⚠️ {rule}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 Get Your Annual Fertilization Calendar</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Grass Type</label>
            <select value={grass} onChange={e => setGrass(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select grass type...</option>
              {GRASS_TYPES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Location</label>
            <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select location...</option>
              {DFW_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Build My Fertilization Calendar →
          </button>
        </div>

        {calendar && (
          <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
            <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📋 {grass} Annual Calendar — {location}</h2>
            {calendar.map((entry, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < calendar.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{entry.month}: {entry.action}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>Product: {entry.product}</div>
                <div style={{ color: '#cbd5e1', fontSize: 13 }}>{entry.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
