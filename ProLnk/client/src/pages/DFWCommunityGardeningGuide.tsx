import { useState } from 'react';

const gardens = [
  { name: 'Bonton Farms', area: 'South Dallas', size: 'Large', type: 'Urban Farm', contact: 'bontonfarms.org' },
  { name: 'Eastside Community Garden', area: 'East Dallas', size: 'Medium', type: 'Neighborhood', contact: 'eastsidegarden.org' },
  { name: 'Frisco Community Garden', area: 'Frisco', size: 'Large', type: 'City-run', contact: 'friscotexas.gov' },
  { name: 'Plano Heritage Farmstead', area: 'Plano', size: 'Large', type: 'Historic Farm', contact: 'planotexas.org' },
  { name: 'Denton Community Garden', area: 'Denton', size: 'Medium', type: 'Cooperative', contact: 'dentontexas.gov' },
  { name: 'Arlington Urban Garden', area: 'Arlington', size: 'Medium', type: 'City-run', contact: 'arlingtontx.gov' },
];

const plantingCalendar: Record<string, { plant: string; start: string; notes: string }[]> = {
  Spring: [
    { plant: 'Tomatoes', start: 'Mid-March', notes: 'Plant after last frost (~Mar 15)' },
    { plant: 'Peppers', start: 'Mid-March', notes: 'Need warm soil, mulch heavily' },
    { plant: 'Squash', start: 'Early April', notes: 'Fast grower in DFW heat' },
  ],
  Fall: [
    { plant: 'Kale & Collards', start: 'Early September', notes: 'DFW fall is the best vegetable season' },
    { plant: 'Broccoli', start: 'Late August', notes: 'Plant transplants for Oct-Nov harvest' },
    { plant: 'Carrots', start: 'September', notes: 'Sweetened by light frost' },
    { plant: 'Spinach', start: 'October', notes: 'Thrives in cool DFW winters' },
  ],
  Winter: [
    { plant: 'Swiss Chard', start: 'November', notes: 'Hardy through DFW mild winters' },
    { plant: 'Lettuce', start: 'October-November', notes: 'Use row cover on frost nights' },
  ],
  Summer: [
    { plant: 'Okra', start: 'May', notes: 'Loves DFW heat, very low water needs' },
    { plant: 'Sweet Potatoes', start: 'May', notes: 'Drought tolerant, high yield' },
  ],
};

export default function DFWCommunityGardeningGuide() {
  const [area, setArea] = useState('');
  const [goal, setGoal] = useState('');
  const [season, setSeason] = useState('Fall');
  const [showResults, setShowResults] = useState(false);

  const filteredGardens = gardens.filter(g =>
    area ? g.area.toLowerCase().includes(area.toLowerCase()) : true
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🌱 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Community Gardening in DFW</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Dallas-Fort Worth has a growing urban agriculture movement. Fall is DFW's prime vegetable season — cool nights and mild days create ideal growing conditions Oct–Dec.
        </p>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏙️ City of Dallas Grow Local Program</h2>
          <p style={{ color: '#AAB8C2', marginBottom: 12 }}>
            Dallas's Grow Local initiative supports neighborhood gardens through land access, compost partnerships, and grant funding. Apply at <span style={{ color: '#F5E642' }}>dallascityhall.com/growlocal</span>
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {['🌍 Free compost from McCommas Bluff Landfill', '📋 Zoning exemptions for urban gardens', '💧 Reduced water rates for community plots', '🤝 Neighbor coordination support'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 8, padding: 12, color: '#AAB8C2', fontSize: 14 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find Gardens + What to Plant</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>YOUR DFW AREA</label>
              <input value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. Dallas, Plano, Frisco..."
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>PLANTING SEASON</label>
              <select value={season} onChange={e => setSeason(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                {Object.keys(plantingCalendar).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Show Gardens + Planting Guide
          </button>
        </div>

        {showResults && (
          <>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>📍 Community Gardens Near You</h3>
              {filteredGardens.length === 0 ? <p style={{ color: '#8899AA' }}>No gardens found — try starting one! (See guide below)</p> : filteredGardens.map(g => (
                <div key={g.name} style={{ borderBottom: '1px solid #1E3A5F', padding: '12px 0′ }}>
                  <div style={{ fontWeight: 700 }}>{g.name} <span style={{ color: '#8899AA', fontWeight: 400, fontSize: 14 }}>— {g.area}</span></div>
                  <div style={{ color: '#8899AA', fontSize: 13 }}>🏷️ {g.type} · 📏 {g.size} · 🌐 {g.contact}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🗓️ {season} Planting Guide for DFW</h3>
              {plantingCalendar[season].map(p => (
                <div key={p.plant} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1E3A5F', padding: '10px 0′ }}>
                  <div><span style={{ fontWeight: 700 }}>{p.plant}</span> <span style={{ color: '#8899AA', fontSize: 13 }}>· Plant: {p.start}</span></div>
                  <div style={{ color: '#AAB8C2', fontSize: 13, maxWidth: 300, textAlign: 'right' }}>{p.notes}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>♻️ Free Compost in DFW</h3>
              <p style={{ color: '#AAB8C2′ }}>Dallas residents can pick up free compost at <strong>McCommas Bluff Landfill</strong> (5000 Youngblood Rd) — bring your own containers. Fort Worth offers similar pickup at <strong>Brennan Recycling Center</strong>. Most DFW suburbs have curbside organics programs starting in 2025.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
