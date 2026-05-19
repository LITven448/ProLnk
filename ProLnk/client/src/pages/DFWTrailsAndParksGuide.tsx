import { useState } from 'react';

type Lifestyle = 'Runner' | 'Cyclist' | 'Family' | 'Dog Owner' | 'Nature';

const neighborhoodData: Record<Lifestyle, { neighborhoods: { name: string; trails: string; premium: string; note: string }[] }> = {
  Runner: {
    neighborhoods: [
      { name: 'Highland Park / University Park', trails: 'Katy Trail (3.5 mi), Turtle Creek greenway', premium: '+12–18%', note: 'Premier running corridor, connects to White Rock Lake' },
      { name: 'Uptown Dallas', trails: 'Katy Trail direct access', premium: '+8–15%', note: 'Urban trail access, walkable neighborhood' },
      { name: 'Plano (West)', trails: 'Chisholm Trail, 60+ mi suburban network', premium: '+5–10%', note: 'Flat, well-maintained, safe surface' },
      { name: 'Frisco', trails: 'Frisco Trail (growing to 60+ mi)', premium: '+4–8%', note: 'Rapidly expanding trail network' },
    ],
  },
  Cyclist: {
    neighborhoods: [
      { name: 'Allen / McKinney', trails: 'Chisholm Trail Bikeway, regional connectors', premium: '+4–7%', note: 'Long uninterrupted stretches, less traffic crossings' },
      { name: 'Flower Mound', trails: 'Lakeside trail system, 60+ mi network', premium: '+5–9%', note: 'Lake Grapevine proximity adds elevation variety' },
      { name: 'Southlake', trails: 'Bear Creek, Bicentennial trails', premium: '+6–10%', note: 'Quieter roads, wide shoulders' },
      { name: 'Arlington', trails: 'River Legacy trails, 14 mi paved', premium: '+3–6%', note: 'Nature corridor with minimal pavement gaps' },
    ],
  },
  Family: {
    neighborhoods: [
      { name: 'Frisco / Little Elm', trails: 'Community parks every 0.5 mi, splash pads', premium: '+5–8%', note: 'Most new master plans require 10% park land' },
      { name: 'Coppell', trails: 'Andrew Brown Park, 25+ mi of trails', premium: '+6–10%', note: 'One of DFW\’s highest trail-to-resident ratios' },
      { name: 'Prosper / Celina', trails: 'New community parks, future trail plans', premium: '+3–6%', note: 'Growing trail network, buy early for appreciation' },
      { name: 'Grapevine', trails: 'Lake Grapevine, Dove Creek trails', premium: '+5–9%', note: 'Water access plus trails unusual combination' },
    ],
  },
  'Dog Owner': {
    neighborhoods: [
      { name: 'McKinney', trails: 'Bonnie Wenk Park off-leash, 40+ mi trails', premium: '+4–7%', note: 'Multiple off-leash dog parks plus trail system' },
      { name: 'Plano', trails: 'Jack Carter, Bob Woodruff dog parks + Chisholm', premium: '+4–8%', note: 'Quality off-leash facilities integrated with trails' },
      { name: 'Garland', trails: 'Audubon Park, Rowlett Creek preserve', premium: '+3–5%', note: 'Large nature preserves allow leashed trail use' },
      { name: 'Richardson', trails: 'Breckinridge Park, 6 dog parks', premium: '+4–7%', note: 'Dense park network in walkable neighborhoods' },
    ],
  },
  Nature: {
    neighborhoods: [
      { name: 'Arlington', trails: 'River Legacy Parks, 1,300 acres', premium: '+5–9%', note: 'Largest urban forest in DFW, bottomland hardwoods' },
      { name: 'Grapevine', trails: 'Northshore Trail, USACE lake access', premium: '+6–10%', note: 'Technical hiking, birding, lake views' },
      { name: 'Garland / Rowlett', trails: 'Rowlett Creek Preserve, Harry Myers', premium: '+3–6%', note: 'Underrated — large undeveloped nature corridor' },
      { name: 'Denton', trails: 'Clear Creek, Lewisville Lake preserve', premium: '+3–5%', note: 'College town with strong nature access, growing fast' },
    ],
  },
};

export default function DFWTrailsAndParksGuide() {
  const [lifestyle, setLifestyle] = useState<Lifestyle | ''>('');

  const lifestyles: Lifestyle[] = ['Runner', 'Cyclist', 'Family', 'Dog Owner', 'Nature'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🌿 DFW Trails & Parks Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Trail proximity adds real home value in DFW. Find which suburbs have the best access for your lifestyle — and what you'll pay for it.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📈 Trail Proximity Value Premium (DFW Research)</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <div>🏡 Within 0.25 mi of trail: +8–18% value</div>
            <div>🏘️ Within 0.5 mi of trail: +4–10% value</div>
            <div>🌳 Park-adjacent lots: +5–12% premium</div>
            <div>🚴 Katy Trail (Dallas): highest premium in DFW</div>
            <div>📊 Effect strongest in $300K–$700K price range</div>
            <div>⬆️ Value gap widening post-2020 lifestyle shift</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🔍 Find Neighborhoods by Lifestyle</div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {lifestyles.map(l => (
              <button key={l} onClick={() => setLifestyle(l)} style={{ padding: '0.5rem 1.2rem', borderRadius: 8, border: '2px solid', borderColor: lifestyle === l ? '#F5E642' : '#1e3a5f', background: lifestyle === l ? '#F5E642' : 'transparent', color: lifestyle === l ? '#0A1628' : '#94a3b8', fontWeight: 600, cursor: 'pointer' }}>
                {l === 'Runner' ? '🏃' : l === 'Cyclist' ? '🚴' : l === 'Family' ? '👨‍👩‍👧' : l === 'Dog Owner' ? '🐕' : '🌲'} {l}
              </button>
            ))}
          </div>
        </div>

        {lifestyle && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏘️ Best DFW Neighborhoods for {lifestyle}s</div>
            {neighborhoodData[lifestyle].neighborhoods.map((n, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{n.name}</div>
                  <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '0.9rem' }}>{n.premium}</div>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <div>🗺️ {n.trails}</div>
                  <div>💡 {n.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>🔎 How to Research Trail Adjacency Before Buying</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Use <strong style={{ color: '#F5E642' }}>AllTrails</strong> or <strong style={{ color: '#F5E642' }}>TrailLink</strong> satellite view to confirm trail location • Check city GIS portal for planned trail extensions • Visit in person — app maps lag real conditions by 1–2 years • Verify maintenance responsibility (city vs HOA) • Ask listing agent about any planned development that could disrupt trail access
          </div>
        </div>
      </div>
    </div>
  );
}
