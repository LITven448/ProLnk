import { useState } from 'react';

type Package = { name: string; includes: string[]; price: string; turnaround: string; bestFor: string };

const packages: Package[] = [
  { name: 'Basic Photos Only', includes: ['25–40 HDR interior/exterior photos', 'Basic editing', 'Online gallery delivery'], price: '$150–200', turnaround: '24 hours', bestFor: 'Condos, townhomes under $300K, rental listings' },
  { name: 'Photos + Drone', includes: ['35–50 HDR photos', 'FAA-certified drone aerial', '5–8 aerial shots', 'Property boundary context'], price: '$250–350', turnaround: '24–48 hours', bestFor: 'Homes with large lots, golf course, or water views' },
  { name: 'Photos + Virtual Tour', includes: ['35–50 HDR photos', 'Matterport 3D walkthrough', 'Interactive floor plan', 'Embed link for MLS'], price: '$300–400', turnaround: '48–72 hours', bestFor: 'Out-of-state buyers, luxury listings, investor properties' },
  { name: 'Full Service Package', includes: ['50+ HDR photos', 'Drone aerials', 'Matterport 3D tour', 'Measured floor plan', 'Twilight exterior shot'], price: '$450–600', turnaround: '48–72 hours', bestFor: 'Luxury homes $500K+, new construction, unique properties' },
  { name: 'Twilight / Dusk Session', includes: ['10–15 twilight exterior shots', 'Pool and landscape lighting captured', 'Blue hour sky enhancement'], price: '$150–200 add-on', turnaround: 'Same night delivery', bestFor: 'Homes with outdoor entertaining, pools, curb appeal' },
];

const dfwTips = [
  ['☀️', 'Shoot Early Morning', 'DFW sunlight is harsh from 10am–4pm. Best exterior light is 7–9am. Most photographers charge extra for morning slots.'],
  ['🌡️', 'Schedule in Shoulder Season', 'Spring (March–April) and fall (October–November) give the most forgiving light and green lawns.'],
  ['✈️', 'Drone Is Almost Mandatory', 'DFW lots are large. Aerial context shows lot size, neighborhood, proximity to highways and amenities.'],
  ['🏊', 'Capture the Pool', 'Over 40% of DFW homes over $400K have pools. A twilight pool shot can add perceived value.'],
  ['📐', 'Floor Plans Sell Faster', 'MLS listings with floor plans get 52% more views in DFW per local agent surveys.'],
];

function estimatePkg(homeType: string, services: string[]): Package[] {
  return packages.filter(p => {
    if (homeType === 'Condo / Townhome' && p.name === 'Photos + Drone') return false;
    if (services.includes('Virtual Tour') && !p.includes.some(i => i.toLowerCase().includes('matterport'))) return false;
    if (services.includes('Drone') && !p.includes.some(i => i.toLowerCase().includes('drone') || i.toLowerCase().includes('aerial'))) return false;
    return true;
  }).slice(0, 2);
}

export default function DFWRealEstatePhotographyGuide() {
  const [homeType, setHomeType] = useState('Single Family Home');
  const [services, setServices] = useState<string[]>(['Photos']);

  function toggleService(s: string) {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  const recs = estimatePkg(homeType, services);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2 }}>DFW REAL ESTATE GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Real Estate Photography in DFW</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>What's included, what it costs, how to find the best photographers, and what makes DFW shoots unique.</p>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📸 DFW Photography Packages & Pricing</h2>
          {packages.map(pkg => (
            <div key={pkg.name} style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{pkg.name}</div>
                  <div style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>Best for: {pkg.bestFor}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{pkg.price}</div>
                  <div style={{ color: '#64748B', fontSize: 12, marginTop: 2 }}>⏱ {pkg.turnaround}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {pkg.includes.map(item => (
                  <span key={item} style={{ background: '#0A1628', color: '#93C5FD', fontSize: 12, padding: '4px 12px', borderRadius: 20 }}>✓ {item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🌞 DFW-Specific Photography Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {dfwTips.map(([ico, title, desc]) => (
              <div key={title as string} style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{ico as string}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{title as string}</div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🔍 Package Recommender</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 8, fontWeight: 600 }}>HOME TYPE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Condo / Townhome', 'Single Family Home', 'Luxury Home ($500K+)', 'New Construction'].map(t => (
                <button key={t} onClick={() => setHomeType(t)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: homeType === t ? '#F5E642′ : '#0A1628', color: homeType === t ? '#0A1628' : '#94A3B8', fontWeight: 600, fontSize: 13 }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 8, fontWeight: 600 }}>DESIRED SERVICES (select all)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {['Photos', 'Drone', 'Virtual Tour', 'Floor Plan', 'Twilight'].map(s => (
                <button key={s} onClick={() => toggleService(s)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: services.includes(s) ? '#F5E642′ : '#0A1628', color: services.includes(s) ? '#0A1628' : '#94A3B8', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          {recs.length > 0 ? recs.map(r => (
            <div key={r.name} style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginBottom: 10, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{r.name}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{r.price}</div>
              <div style={{ color: '#64748B', fontSize: 13, marginTop: 4 }}>Turnaround: {r.turnaround}</div>
            </div>
          )) : (
            <div style={{ color: '#FCA5A5', fontSize: 14 }}>Select at least one service to get a recommendation.</div>
          )}
        </div>
      </div>
    </div>
  );
}
