import { useState } from 'react';

const cityPrograms = [
  { city: 'Dallas', program: 'Grow Local Dallas', url: 'dallasurbanag.org', note: 'Free community garden plots in city parks; compost program available' },
  { city: 'Fort Worth', program: 'FW Urban Agriculture', url: 'fortworthtexas.gov/urbanag', note: 'Urban agriculture permits for food production; chickens allowed in most zones' },
  { city: 'Tarrant County', program: 'AgriLife Extension', url: 'tarrant.agrilife.org', note: 'Master Gardener program, soil testing, community education events' },
  { city: 'Plano', program: 'Parks & Rec Community Gardens', url: 'plano.gov/parks', note: 'Annual plot rental available; tools and water provided on site' },
  { city: 'Denton', program: 'Denton Community Garden', url: 'cityofdenton.com/gardens', note: 'Multiple sites; low-income plots available; regular workshops' },
];

const calendar = [
  { months: 'Feb-Mar', grow: 'Lettuce, spinach, kale, broccoli, peas, carrots', note: 'Start indoors 6 weeks before last frost (Mar 15 avg for DFW)' },
  { months: 'Apr-May', grow: 'Tomatoes, peppers, squash, cucumbers, beans', note: 'Main planting season - best time for most vegetables in DFW' },
  { months: 'Jun-Jul', grow: 'Okra, sweet potato, black-eyed peas, herbs', note: 'Only heat-lovers survive; focus on water management' },
  { months: 'Aug-Sep', grow: 'Second planting of tomatoes, peppers for fall harvest', note: 'Plant by Aug 15 for fall crop before first frost (Nov 15 avg)' },
  { months: 'Oct-Nov', grow: 'Lettuce, spinach, broccoli, cauliflower, garlic', note: 'Best fall crops; mild temps improve flavor of cool-season greens' },
  { months: 'Dec-Jan', grow: 'Garlic, cover crops, planning and soil building', note: 'Rest and prepare beds; heavy compost application season' },
];

const dfwCities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Denton', 'Irving', 'Garland', 'Mesquite'];
const groupSizes = ['Just me (solo garden)', '2-5 neighbors', '6-15 people', '16-30 people', '30+ (formal community org)'];

export default function DFWCommunityGardenStartGuide() {
  const [city, setCity] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [guide, setGuide] = useState<null | { steps: string[]; resource: string; firstCrop: string }>(null);

  function generate() {
    if (!city || !groupSize) return;
    const isLarge = groupSize.includes('16') || groupSize.includes('30+');
    const isSolo = groupSize.includes('solo');
    const matchedCity = cityPrograms.find(c => c.city === city);
    setGuide({
      steps: isSolo
        ? ['Apply for a plot at your city parks department', 'Get a soil test from Texas A&M AgriLife ($15)', 'Start with 4x8 raised bed; expand year 2', 'Join a local gardening Facebook group for DFW-specific tips']
        : isLarge
        ? ['File for nonprofit status or partner with existing org', 'Secure land via city parks, church, or school partnership', 'Apply for grants (USDA BFRDP, local community foundations)', 'Establish committees: planting, water, maintenance, events', 'Create plot rental agreement and bylaws']
        : ['Identify 3-5 committed neighbors before anything else', 'Survey interest with a one-page flyer or Nextdoor post', 'Get a free soil test to understand what amendments are needed', 'Choose a sunny location (6+ hours direct sun) near water access', 'Divide into individual plots or assign a rotating crew schedule'],
      resource: matchedCity ? `${matchedCity.program}: ${matchedCity.note}` : `Contact your city's Parks & Recreation department for urban agriculture resources`,
      firstCrop: 'Start with tomatoes, peppers, and herbs in April - they are forgiving, productive, and give your group visible wins fast.',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥬</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F5E642', margin: '0 0 12px' }}>Starting a Community Garden in DFW</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px' }}>DFW cities have active programs supporting community food production. From a single shared plot to a full neighborhood farm, here is how to make it happen.</p>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🏙️ DFW City Programs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {cityPrograms.map(p => (
              <div key={p.city} style={{ background: '#0A1628', borderRadius: '12px', padding: '16px', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '4px' }}>{p.city}</div>
                <div style={{ fontSize: '0.82rem', color: '#60a5fa', marginBottom: '8px' }}>{p.program}</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8′ }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '20px' }}>🗓️ DFW Community Garden Planting Calendar</h2>
          {calendar.map(c => (
            <div key={c.months} style={{ display: 'flex', gap: '16px', marginBottom: '14px', alignItems: 'flex-start' }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: '8px', padding: '4px 10px', fontSize: '0.78rem', fontWeight: '700', whiteSpace: 'nowrap', minWidth: '75px', textAlign: 'center' }}>{c.months}</div>
              <div>
                <div style={{ color: '#e2e8f0', fontSize: '0.88rem', marginBottom: '3px' }}>{c.grow}</div>
                <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{c.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🔍 Get Your Startup Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select city...</option>
                {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Group Size</label>
              <select value={groupSize} onChange={e => setGroupSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select size...</option>
                {groupSizes.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Get My Community Garden Guide</button>
          {guide && (
            <div style={{ marginTop: '24px', background: '#0A1628', borderRadius: '12px', padding: '20px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '12px' }}>📋 Your Startup Steps:</div>
              {guide.steps.map((s, i) => <div key={i} style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px', paddingLeft: '12px' }}>Step {i + 1}: {s}</div>)}
              <div style={{ marginTop: '14px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>🏙️ City Resource: </span><span style={{ color: '#94a3b8' }}>{guide.resource}</span></div>
              <div style={{ marginTop: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>🌱 First Crop Recommendation: </span><span style={{ color: '#94a3b8' }}>{guide.firstCrop}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
