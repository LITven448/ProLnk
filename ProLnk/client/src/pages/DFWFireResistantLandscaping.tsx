import { useState } from 'react';

const locations = ['Inner DFW (Dallas/Fort Worth city)', 'Mid-ring suburb (Frisco, McKinney, Mansfield)', 'Outer suburb (Weatherford, Granbury, Gainesville)', 'Rural/acreage property', 'Lake community'];
const riskLevels = ['Low — green lawn, irrigated yard', 'Moderate — drought-stressed grass, some dead brush', 'High — dry season, adjacent to open grassland', 'Very High — active drought, fire weather watch issued'];

const plans: Record<string, string> = {
  'Inner DFW (Dallas/Fort Worth city)|Low — green lawn, irrigated yard': 'Low risk urban setting. Focus on fire-smart habits: keep gutters clear of dry leaves, store firewood 30 feet from home, avoid cedar mulch against foundation. Maintain irrigation in drought to keep lawn green as a natural firebreak.',
  'Outer suburb (Weatherford, Granbury, Gainesville)|High — dry season, adjacent to open grassland': 'High-priority zone for DFW fire risk. Create 30-foot defensible space: Zone 1 (0-30ft) — irrigated lawn, low-growth plants, no wood mulch, clean gutters monthly. Zone 2 (30-100ft) — reduce grass to 4 inches, space trees 10ft apart, remove dead wood immediately.',
  'Outer suburb (Weatherford, Granbury, Gainesville)|Very High — active drought, fire weather watch issued': 'Immediate action needed. Remove all dead vegetation within 30 feet. Clear roof and gutters today. Move propane tanks, firewood, and combustibles away from structure. Wet-mop wood decks if active fire weather watch. Have go-bag ready.',
  'Rural/acreage property|High — dry season, adjacent to open grassland': 'Acreage properties in Parker, Hood, Cooke counties face the highest DFW area risk. Mow to 4 inches within 100 feet. Create gravel paths that serve as firebreaks. Replace wood fencing nearest home with metal or block. Install ember-resistant vents.',
  'Lake community|Moderate — drought-stressed grass, some dead brush': 'Lake communities like Possum Kingdom and Lake Granbury have concentrated fire risk due to cedar and dry grass. Clear cedar trees within 50 feet — cedar is highly flammable and common here. Use gravel or decomposed granite over wood mulch near structures.',
  'Mid-ring suburb (Frisco, McKinney, Mansfield)|Moderate — drought-stressed grass, some dead brush': 'Mid-ring suburbs face increasing risk as development meets open land. Remove dead annual grasses from fence lines. Replace cedar mulch beds with decomposed granite. Keep lawn irrigation active through October — DFW fire season peaks in fall.',
};

const fallback = (loc: string, risk: string) =>
  `For ${loc} at ${risk.toLowerCase()} risk: DFW wildfire risk has increased significantly in outer suburbs and lake communities. Core strategy: 30-foot lean, clean, and green zone around structures; fire-resistant plants (yucca, agave, sage, ornamental grasses); gravel over wood mulch; metal or masonry fencing adjacent to home.`;

const plants = [
  { name: 'Yucca / Agave', why: 'High moisture content, resists ignition' },
  { name: 'Texas Sage (Cenizo)', why: 'Native, drought-tolerant, low fuel load' },
  { name: 'Knockout Rose', why: 'Low-spreading, moist stems slow fire' },
  { name: 'Ornamental grasses (cut back annually)', why: 'Manageable fuel load when maintained' },
  { name: 'Decomposed granite / gravel', why: 'Non-combustible ground cover near home' },
];

export default function DFWFireResistantLandscaping() {
  const [location, setLocation] = useState('');
  const [risk, setRisk] = useState('');
  const [result, setResult] = useState('');

  const analyze = () => {
    if (!location || !risk) return;
    setResult(plans[`${location}|${risk}`] || fallback(location, risk));
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>🔥 DFW Fire-Resistant Landscaping</div>
        <p style={{ color: '#9BACC8', marginBottom: '2rem' }}>Creating defensible space for DFW outer suburbs and lake communities</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>Why DFW Homeowners Need to Think About Fire</div>
          <p style={{ color: '#CBD5E8', lineHeight: 1.7, margin: 0 }}>
            DFW outer suburbs — Weatherford, Granbury, Gainesville, Lake areas — face serious wildfire risk during drought years.
            Bermuda grass dies out in July-August drought and becomes fuel. Cedar trees are highly flammable and spread rapidly across open land.
            Fire weather watches occur every fall when humidity drops below 15% and winds exceed 20 mph. Defensible space is the single most
            effective mitigation for suburban and rural DFW homes.
          </p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🌿 Best Fire-Resistant Plants for DFW</div>
          {plants.map(p => (
            <div key={p.name} style={{ display: 'flex', gap: '1rem', padding: '0.4rem 0', borderBottom: '1px solid #1A2F4F' }}>
              <div style={{ color: '#F5E642', minWidth: 200 }}>{p.name}</div>
              <div style={{ color: '#9BACC8′ }}>{p.why}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🗺️ Build Your Landscape Plan</div>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>DFW Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '0.75rem' }}>
            <option value="">Select your location...</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <label style={{ color: '#9BACC8', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Current Risk Level</label>
          <select value={risk} onChange={e => setRisk(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#162035', color: '#E8EDF5', border: '1px solid #2A3F5F', borderRadius: 8, marginBottom: '1rem' }}>
            <option value="">Select risk level...</option>
            {riskLevels.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.7rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Generate Landscape Plan</button>
          {result && <div style={{ marginTop: '1rem', background: '#162035', borderRadius: 8, padding: '1rem', color: '#CBD5E8', lineHeight: 1.7, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <p style={{ color: '#6B7FA3', fontSize: '0.8rem', textAlign: 'center' }}>
          Contact your local DFW fire department or Texas A&amp;M Forest Service for a free home ignitability assessment.
        </p>
      </div>
    </div>
  );
}
