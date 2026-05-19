import { useState } from 'react';

const projects = [
  { type: 'Street Tree Planting', owner: 'City (right-of-way)', timeline: '6-18 months', effort: 'Medium', note: 'Dallas, Plano, and Fort Worth have free street tree programs - apply through public works' },
  { type: 'Traffic Calming', owner: 'City Traffic Engineering', timeline: '12-36 months', effort: 'High', note: 'Requires traffic study; speed cushions faster than full roundabouts; use data (Waze alerts) in petition' },
  { type: 'Neighborhood Beautification', owner: 'HOA or City Keep Beautiful', timeline: '1-6 months', effort: 'Low', note: 'Keep Dallas Beautiful / Keep Fort Worth Beautiful provide free supplies and volunteer coordination' },
  { type: 'Sidewalk Repair', owner: 'City (usually)', timeline: '6-24 months', effort: 'Medium', note: 'Submit via 311; document with photos; organize neighbors to submit same issue for priority' },
  { type: 'Park Improvements', owner: 'City Parks Dept', timeline: '1-3 years', effort: 'High', note: 'Community input meetings required; easier with organized neighborhood association or HOA backing' },
  { type: 'Alley Cleanup', owner: 'City Sanitation + Neighbors', timeline: '1-3 months', effort: 'Low', note: 'Most DFW cities provide free bulk pickup for organized alley cleanups when coordinated through 311' },
];

const improvements = ['Street trees / greenery', 'Traffic calming / speeding', 'Sidewalk repair', 'Park or green space', 'Beautification / murals', 'Alley or common area cleanup'];
const dfwLocations = ['City of Dallas', 'City of Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Denton', 'Garland', 'Irving', 'Other DFW suburb'];

export default function DFWNeighborhoodImprovementGuide() {
  const [improvement, setImprovement] = useState('');
  const [location, setLocation] = useState('');
  const [guide, setGuide] = useState<null | { who: string; how: string; timeline: string; nextdoor: string }>(null);

  function generate() {
    if (!improvement || !location) return;
    const isTree = improvement.includes('tree');
    const isTraffic = improvement.includes('traffic') || improvement.includes('speeding');
    const isSidewalk = improvement.includes('Sidewalk');
    const isPark = improvement.includes('Park');
    const isAlley = improvement.includes('Alley');
    setGuide({
      who: isTree
        ? `${location} Urban Forestry / Public Works - call 311 or check city website for free street tree program`
        : isTraffic
        ? `${location} Traffic Engineering Department - requires formal petition with neighbor signatures and traffic data`
        : isSidewalk
        ? `${location} Public Works - submit via 311; city is responsible for sidewalks in right-of-way`
        : isPark
        ? `${location} Parks & Recreation Department - attend public input meetings; partner with your council member`
        : isAlley
        ? `${location} Sanitation / 311 - coordinate bulk pickup day; engage neighbors via Nextdoor`
        : `${location} Parks & Recreation or Keep Beautiful program for beautification supplies and volunteer support`,
      how: isTree
        ? '1. Check city tree program eligibility 2. Select from approved tree list 3. Submit application 4. City plants and maintains for 1-2 years'
        : isTraffic
        ? '1. Document the problem with video/Waze data 2. Circulate petition (70%+ neighbor sign-off typical) 3. Request traffic study via 311 4. Present at City Council if needed'
        : isSidewalk
        ? '1. Document damage with photos and address 2. Submit 311 request with all photos 3. Organize 5+ neighbors to submit same location 4. Follow up quarterly'
        : '1. Identify your council member 2. Draft a one-page project proposal 3. Bring 10+ neighbors to public input 4. Apply for any available grants',
      timeline: isTraffic ? '12-36 months for traffic calming; simple signs can be 3-6 months' : isTree ? '3-12 months depending on program waitlist' : isSidewalk ? '6-24 months; priority given to ADA-violation repairs' : isPark ? '1-3 years for capital improvements' : '1-6 months for beautification projects',
      nextdoor: 'Post on Nextdoor to find allies before approaching the city - showing 20+ neighbors support dramatically increases city responsiveness. Tag your neighborhood name and use the "safety" or "community" category.',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏘️</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F5E642', margin: '0 0 12px' }}>DFW Neighborhood Improvement Guide</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px' }}>Improving your DFW neighborhood takes knowing who to call and how to build neighbor support. Here is how to make real changes happen - whether through your HOA, city, or both.</p>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>📋 Common Projects: Who Owns What in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {projects.map(p => (
              <div key={p.type} style={{ background: '#0A1628', borderRadius: '12px', padding: '16px', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '6px' }}>{p.type}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>Owner: {p.owner} | Timeline: {p.timeline}</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '20px' }}>🤝 HOA vs. City Responsibility in DFW</h2>
          {[['Streets and sidewalks','City (unless private street community)'],['Street trees in right-of-way','City - apply through urban forestry program'],['Trees and landscaping inside your lot','Homeowner / HOA'],['Parks and greenbelts','Depends: public parks = city; HOA greenbelts = HOA'],['Streetlights','City Oncor program for standard lights; HOA for decorative'],['Traffic signs','City Traffic Engineering only - illegal for HOA to install']].map(([item, owner]) => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f', gap: '16px' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{item}</span>
              <span style={{ color: '#F5E642', fontWeight: '600', fontSize: '0.85rem', textAlign: 'right', minWidth: '160px' }}>{owner}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🔍 Get Your Improvement Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Improvement Type</label>
              <select value={improvement} onChange={e => setImprovement(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select type...</option>
                {improvements.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select city...</option>
                {dfwLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Get My Improvement Plan</button>
          {guide && (
            <div style={{ marginTop: '24px', background: '#0A1628', borderRadius: '12px', padding: '20px', border: '1px solid #F5E642' }}>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600' }}>📞 Who to contact: </span><span style={{ color: '#94a3b8' }}>{guide.who}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600' }}>📋 How to make it happen: </span><span style={{ color: '#94a3b8' }}>{guide.how}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600' }}>⏱️ Expected timeline: </span><span style={{ color: '#94a3b8' }}>{guide.timeline}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: '600' }}>📱 Nextdoor tip: </span><span style={{ color: '#94a3b8' }}>{guide.nextdoor}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
