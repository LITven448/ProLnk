import { useState } from 'react';

const priorities = [
  {
    id: 'walk-bike-daily',
    label: 'Kids walking or biking to school daily is essential',
    neighborhoods: [
      { name: 'Lakewood / East Dallas', city: 'Dallas', school: 'Lakewood Elementary (DISD)', premium: '+12–18%', note: 'True walkable elementary — sidewalks, low traffic, neighborhood grid' },
      { name: 'Munger Place / Peak\’s Addition', city: 'Dallas', school: 'Geneva Heights Elementary', premium: '+10–15%', note: 'Historic grid streets, bikeable to school, strong neighborhood association' },
      { name: 'University Park', city: 'Highland Park ISD', school: 'Multiple walkable elementaries', premium: '+25–40%', note: 'Top-rated district with genuine walk-to-school infrastructure' },
      { name: 'Downtown Fort Worth Near Magnolia', city: 'Fort Worth', school: 'Limited — verify current year', premium: '+5–10%', note: 'Some urban elementaries accessible on foot — confirm enrollment zones' },
    ],
  },
  {
    id: 'proximity-values',
    label: 'School proximity matters for home value — driving is OK',
    neighborhoods: [
      { name: 'Frisco / Little Elm', city: 'Frisco ISD', school: 'Multiple highly-rated elementaries', premium: '+8–14%', note: 'Top-performing district; most homes require driving but proximity still adds value' },
      { name: 'Southlake / Grapevine', city: 'Carroll ISD', school: 'Carroll Elementary cluster', premium: '+15–22%', note: 'Prestige district; car-dependent but homes near schools command premium' },
      { name: 'Allen / McKinney', city: 'Allen ISD / McKinney ISD', school: 'Multiple campuses', premium: '+6–10%', note: 'Strong districts; half-mile radius to school still adds 5–8% to home value' },
    ],
  },
  {
    id: 'flexible',
    label: 'Flexible — open to bus, carpool, or driving',
    neighborhoods: [
      { name: 'Plano / Murphy', city: 'Plano ISD', school: 'Large district, bus routes available', premium: 'Neutral', note: 'Excellent schools, car-centric design, bus service reduces driving burden' },
      { name: 'Arlington / Mansfield', city: 'Mansfield ISD', school: 'New campuses, bus routes', premium: 'Neutral', note: 'More affordable; solid schools; driving or bus is standard' },
      { name: 'North Garland / Sachse', city: 'Garland ISD / Wylie ISD', school: 'Mixed options', premium: 'Neutral', note: 'Value areas with decent districts; driving to school is the norm' },
    ],
  },
];

export default function DFWWalkToSchoolGuide() {
  const [selected, setSelected] = useState('');
  const match = priorities.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'system-ui, sans-serif', color: '#e8eaf0′ }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 32, marginBottom: 24, border: '1px solid #1e3560′ }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🚶 🚲 🏫</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642′ }}>DFW Walk-to-School Neighborhood Guide</h1>
          <p style={{ margin: 0, color: '#a0aec0', fontSize: 15, lineHeight: 1.6 }}>
            Most of DFW was built around the car. True walk-to-school neighborhoods are rare — and they carry a <strong style={{ color: '#F5E642′ }}>significant home price premium</strong>. Here’s where to find them and what to expect.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🚗', title: 'DFW Reality: Driving Is the Default', body: 'The vast majority of DFW suburbs — Plano, Frisco, McKinney, Allen, Mansfield, Arlington — were designed with cars in mind. Sidewalks are often absent near schools, arterial roads are too dangerous to bike across, and school boundaries span miles.' },
            { icon: '🏙️', title: 'Where Walk-to-School Actually Exists', body: 'Older, urban-grid neighborhoods in Dallas proper (Lakewood, Munger Place) and the Highland Park / University Park enclave are the main exceptions. Fort Worth has pockets near Magnolia. Suburban cities almost universally require driving.' },
            { icon: '💵', title: 'The Walkability Premium', body: 'Homes within a 0.5-mile walk of a well-rated elementary school command 10–25% premiums over comparable homes requiring driving. In Highland Park ISD, that premium can reach 30–40%. Walkability + school quality is the most powerful value combination in DFW real estate.' },
            { icon: '📍', title: 'How to Verify Walk Route Safety', body: 'Use the district\’s "Safe Routes to School" maps (available on most district websites). Walk the route yourself before buying — Google Maps doesn\’t account for missing sidewalks, drainage ditches, or 5-lane arterial crossings common in DFW suburbia.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#111f3a', borderRadius: 10, padding: 20, border: '1px solid #1e3560′ }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon}</div>
              <h3 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>{card.title}</h3>
              <p style={{ margin: 0, color: '#a0aec0', fontSize: 14, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 28, border: '1px solid #1e3560′ }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700, color: '#F5E642′ }}>🎯 Your Priorities → DFW Neighborhoods</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {priorities.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)}
                style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === p.id ? '#F5E642' : '#1e3560'}`, background: selected === p.id ? 'rgba(245,230,66,0.1)' : '#0d1a30', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 14, color: '#e8eaf0′ }}>
                {p.label}
              </button>
            ))}
          </div>
          {match && (
            <div>
              {match.neighborhoods.map((n, i) => (
                <div key={i} style={{ background: '#0d1a30', borderRadius: 8, padding: 16, marginBottom: 12, borderLeft: '3px solid #F5E642′ }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{n.name}</div>
                    <div style={{ background: 'rgba(245,230,66,0.15)', color: '#F5E642', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{n.premium}</div>
                  </div>
                  <div style={{ color: '#8899aa', fontSize: 12, marginBottom: 4 }}>{n.city} · {n.school}</div>
                  <div style={{ color: '#a0aec0', fontSize: 13 }}>{n.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
