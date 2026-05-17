import { useState } from 'react';

const categories = [
  {
    label: 'HVAC — 350+ Pages',
    icon: '❄️',
    pages: ['AC tune-up guides by DFW city', 'Furnace replacement cost guides', 'Duct sealing and insulation', 'Smart thermostat guides', 'Emergency AC repair DFW', 'Seasonal HVAC prep guides', 'HVAC brand comparison guides', 'Filter change schedules by DFW season'],
    summary: '350+ HVAC pages cover every DFW city, every HVAC trade, and every season. From Frisco to Fort Worth, from spring tune-ups to July emergencies.',
  },
  {
    label: 'Foundation — 250+ Pages',
    icon: '🏗️',
    pages: ['DFW clay soil guides by area', 'Foundation watering programs', 'Crack monitoring guides', 'Pier and beam vs. slab guides', 'Foundation repair cost guides', 'Drainage and grading guides', 'Foundation inspection guides', 'Post-repair monitoring guides'],
    summary: '250+ foundation pages make ProLnk the go-to resource for DFW homeowners dealing with the unique challenges of North Texas clay soil.',
  },
  {
    label: 'Roofing — 200+ Pages',
    icon: '🏠',
    pages: ['DFW hail damage guides by city', 'Insurance claim process guides', 'Class 4 shingle guides', 'Roof replacement cost guides', 'Storm chaser warning guides', 'Annual inspection guides', 'Roof material comparison guides', 'Wind damage documentation guides'],
    summary: '200+ roofing pages address every DFW roofing situation — from storm prep to insurance claims to Class 4 upgrades.',
  },
  {
    label: 'Plumbing — 200+ Pages',
    icon: '🚿',
    pages: ['Water heater replacement guides', 'DFW hard water treatment guides', 'Freeze protection (rare cold snaps)', 'Slab leak detection guides', 'Water pressure guides', 'Drain cleaning guides', 'Repiping cost guides', 'Gas line guides'],
    summary: '200+ plumbing pages cover DFW-specific issues: hard water, slab leaks, and the occasional deep freeze that catches DFW homeowners off guard.',
  },
  {
    label: 'Financial & Pro Career — 350+ Pages',
    icon: '💰',
    pages: ['Home services budgeting guides', 'ProLnk Network Income System guides', 'Charter tier comparison guides', 'Pro income stream breakdowns', 'Referral network guides', 'Home Health Vault value guides', 'Pro trade career guides', 'Commission and payout guides'],
    summary: '350+ financial and pro career pages recruit and educate both sides of the ProLnk marketplace — homeowners planning their budgets and pros building their income.',
  },
  {
    label: 'Electrical — 150+ Pages',
    icon: '⚡',
    pages: ['Panel upgrade guides by DFW city', 'EV charger installation guides', 'Generator installation guides', 'Outlet and switch guides', 'Smoke and CO detector guides', 'Whole-home surge protection', 'Lighting upgrade guides', 'Outdoor electrical guides'],
    summary: '150+ electrical pages address growing DFW demand for panel upgrades (EV adoption) and whole-home generator installations after severe weather events.',
  },
  {
    label: 'Seasonal & Specialty — 700+ Pages',
    icon: '🌤️',
    pages: ['Spring hail prep guides', 'Summer AC emergency guides', 'Fall HVAC tune-up guides', 'Winter freeze prep guides', 'Cedar fever + air quality guides', 'Storm recovery guides', 'New construction inspection guides', 'Home buying inspection guides'],
    summary: '700+ seasonal and specialty pages ensure ProLnk has comprehensive coverage of DFW-specific events, seasons, and homeowner situations throughout the year.',
  },
  {
    label: 'DFW City Coverage — 100+ Cities',
    icon: '📍',
    pages: ['Frisco, Plano, Allen, McKinney', 'Southlake, Keller, Colleyville', 'Arlington, Irving, Grand Prairie', 'Garland, Mesquite, Richardson', 'Denton, Lewisville, Flower Mound', 'Fort Worth metro area cities', 'East DFW: Rockwall, Rowlett', 'South DFW: Mansfield, Midlothian'],
    summary: '100+ DFW cities each have dedicated ProLnk coverage — ensuring that a homeowner in any part of the metroplex finds relevant, local content when they search.',
  },
];

export default function DFWProLnkContentLibrary2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 10 }}>
            ProLnk DFW Content Library Overview 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            5,200+ pages of DFW-specific home services expertise. The most comprehensive resource of its kind in North Texas.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
          {[['5,200+', 'Total Pages'], ['100+', 'DFW Cities'], ['20+', 'Trades'], ['8', 'Categories']].map(([num, label]) => (
            <div key={label} style={{ background: '#0d1f3c', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{num}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>
          Explore by category:
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {categories.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#1e3a5f' : '#0d1f3c',
                border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '16px 20px',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0d1f3c', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
              {categories[selected].icon} {categories[selected].label}
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{categories[selected].summary}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {categories[selected].pages.map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#F5E642', fontSize: 12 }}>▶</span>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
            Join the ProLnk DFW Charter
          </h3>
          <p style={{ color: '#0A1628', fontSize: 14, lineHeight: 1.6 }}>
            5,200+ pages of knowledge. One platform. The DFW home services resource you have been waiting for.
          </p>
        </div>
      </div>
    </div>
  );
}