import { useState } from 'react';

const wildlife = [
  { animal: 'Coyote', range: 'All DFW suburbs', trend: 'Increasing', risk: 'Pets/small animals', tip: 'Never feed; secure trash; walk pets on leash at dusk/dawn' },
  { animal: 'White-tailed Deer', range: 'Outer suburbs (Frisco, Prosper, Mansfield)', trend: 'Stable', risk: 'Gardens, car collisions', tip: 'Plant deer-resistant natives; use motion lights near roads' },
  { animal: 'Raccoon', range: 'All DFW', trend: 'High', risk: 'Trash, attic entry', tip: 'Bungee trash lids; cap chimney; trim trees touching roofline' },
  { animal: 'Virginia Opossum', range: 'All DFW', trend: 'Common', risk: 'Low - beneficial', tip: 'Opossums eat ticks and pests; relocation is unnecessary' },
  { animal: 'Red-tailed Hawk', range: 'All DFW', trend: 'Common', risk: 'Small pets outdoors', tip: 'Supervise pets under 15 lbs outdoors; no feeding of wildlife' },
  { animal: 'Great Horned Owl', range: 'Wooded DFW neighborhoods', trend: 'Stable', risk: 'Cats, small dogs', tip: 'Keep pets indoors at night; owls are protected - do not disturb' },
];

const concerns = ['Coyotes near my yard', 'Deer eating my garden', 'Raccoons in my trash', 'Bird of prey near pets', 'General wildlife coexistence'];
const locations = ['Inner Dallas/Fort Worth', 'Inner ring suburbs (Plano, Irving, Arlington)', 'Outer suburbs (Frisco, Prosper, Mansfield, Midlothian)', 'Rural edge (Parker, Weatherford, Waxahachie area)'];

export default function DFWWildlifeInYardGuide() {
  const [concern, setConcern] = useState('');
  const [location, setLocation] = useState('');
  const [guide, setGuide] = useState<null | { title: string; attracts: string; discourage: string; pets: string }>(null);

  function generate() {
    if (!concern || !location) return;
    const isCoyote = concern.includes('Coyote');
    const isDeer = concern.includes('Deer');
    const isRaccoon = concern.includes('Raccoon');
    const isBird = concern.includes('Bird');
    setGuide({
      title: isCoyote ? 'Coyote Coexistence Plan' : isDeer ? 'Deer Management Plan' : isRaccoon ? 'Raccoon Prevention Plan' : isBird ? 'Raptor Coexistence Plan' : 'General Wildlife Coexistence Guide',
      attracts: isCoyote ? 'Pet food left outside, unsecured compost, fallen fruit, small free-roaming pets' : isDeer ? 'Roses, hostas, tulips, vegetable gardens, fruit trees' : isRaccoon ? 'Unsecured trash, pet food, bird feeders, open compost bins' : isBird ? 'Feeders attracting small birds, open areas, small outdoor pets' : 'Food sources, water, and dense ground cover are primary attractants for all DFW wildlife',
      discourage: isCoyote ? 'Haze coyotes by yelling and waving arms; install motion lights; use coyote-proof fencing (5ft+ with coyote roller)' : isDeer ? 'Install 8ft fencing for true exclusion; use deer-resistant plants; apply scent repellents monthly' : isRaccoon ? 'Secure all food sources; use raccoon-proof trash cans; install chimney caps and vent covers' : isBird ? 'Keep pets indoors or supervised; avoid feeding wildlife that attracts raptors' : 'Remove attractants, use motion-activated deterrents, and maintain a tidy yard',
      pets: location.includes('Outer') || location.includes('Rural') ? 'High caution: keep pets indoors at night; supervise all outdoor time; consider GPS collar for cats' : 'Moderate caution: leash pets outdoors at dawn/dusk; do not leave small pets unattended in yard',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 32px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🦌</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#F5E642', margin: '0 0 12px' }}>DFW Backyard Wildlife Guide</h1>
          <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px' }}>DFW is home to dozens of wildlife species increasingly living alongside residents. Learn how to coexist safely with coyotes, deer, raptors, and more across the metroplex.</p>
        </div>
      </div>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🐾 Common DFW Wildlife</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {wildlife.map(w => (
              <div key={w.animal} style={{ background: '#0A1628', borderRadius: '12px', padding: '16px', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '1rem', marginBottom: '6px' }}>{w.animal}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px' }}>📍 {w.range} | 📈 {w.trend}</div>
                <div style={{ fontSize: '0.82rem', color: '#ef4444', marginBottom: '6px' }}>⚠️ Risk: {w.risk}</div>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8′ }}>✅ {w.tip}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', marginBottom: '32px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '16px' }}>🚫 What Not to Feed Wildlife</h2>
          {[['🍕 Human food scraps','Attracts coyotes, raccoons, and rodents to your yard and neighbors'],['🌽 Corn or bread','Draws deer into neighborhoods and creates dependency on humans'],['🐟 Cat/dog food left outside','Primary coyote attractant in suburban DFW - never leave it out'],['🦆 Bread near water','Harms waterfowl and attracts nuisance wildlife to water features']].map(([item, reason]) => (
            <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '12px', background: '#0A1628', borderRadius: '8px', padding: '12px' }}>
              <span style={{ fontSize: '1rem' }}>{item}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{reason}</span>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: '16px', padding: '32px', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.4rem', marginBottom: '24px' }}>🔍 Get Your Wildlife Coexistence Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>Wildlife Concern</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select concern...</option>
                {concerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '8px' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px', fontSize: '0.9rem' }}>
                <option value=''>Select location...</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '10px', padding: '12px 28px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Get My Coexistence Guide</button>
          {guide && (
            <div style={{ marginTop: '24px', background: '#0A1628', borderRadius: '12px', padding: '20px', border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '1.1rem', marginBottom: '16px' }}>{guide.title}</div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>🎯 What attracts them: </span><span style={{ color: '#94a3b8' }}>{guide.attracts}</span></div>
              <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642', fontWeight: '600′ }}>🚫 How to discourage: </span><span style={{ color: '#94a3b8' }}>{guide.discourage}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: '600′ }}>🐕 Pet safety: </span><span style={{ color: '#94a3b8' }}>{guide.pets}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
