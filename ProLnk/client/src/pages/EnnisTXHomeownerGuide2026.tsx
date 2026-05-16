import { useState } from 'react';

const serviceTypes = [
  { id: 'hvac', label: '🌬️ HVAC & Heating' },
  { id: 'plumbing', label: '🚿 Plumbing & Water' },
  { id: 'electrical', label: '⚡ Electrical' },
  { id: 'exterior', label: '🏠 Roof & Exterior' },
];

const guides: Record<string, { title: string; items: string[] }> = {
  hvac: {
    title: 'Ennis HVAC & Heating Resources',
    items: [
      '⛽ Propane heat: common in Ennis — no natural gas in many rural areas',
      '🔥 Propane furnaces: service annually before November; check heat exchanger',
      '🌡️ Summer cooling: Ellis County averages 20+ days over 100°F — size AC correctly',
      '🌬️ Duct sealing: older Ennis homes have leaky flex duct — seal for 20-30% savings',
      '🏭 Mini-split systems: popular for additions and workshops on acreage properties',
      '📞 Local HVAC pros: ProLnk connects you with Ennis-area certified technicians',
    ],
  },
  plumbing: {
    title: 'Ennis Plumbing & Water Resources',
    items: [
      '💧 Septic systems: prevalent in Ennis — aerobic systems require quarterly service',
      '🔬 Well water testing: test annually for coliform, nitrates, and iron',
      '🧂 Water softeners: Ellis County hard water (300+ mg/L) — softener extends appliance life',
      '🌧️ Rainwater harvesting: legal in Texas — 2,500+ gal cisterns popular on acreage',
      '🚽 Septic alarm: if alarm sounds, call licensed aerobic technician same day',
      '🔩 Freeze protection: Ennis averages 3-5 freeze events yearly — insulate exposed pipes',
    ],
  },
  electrical: {
    title: 'Ennis Electrical Resources',
    items: [
      '⚡ Rural power: Tri-County Electric and Oncor serve Ennis — know your provider',
      '🔋 Generator prep: propane standby generators critical for rural outages',
      '💡 Whole-home surge protector: rural lines experience more surges — install at panel',
      '🔌 Panel capacity: older Ennis homes may have 100A — upgrade to 200A for EV or solar',
      '☀️ Solar: Ellis County averages 229 sunny days — strong ROI for owned properties',
      '🏚️ Older aluminum wiring (1965-1973): have licensed electrician inspect for hazards',
    ],
  },
  exterior: {
    title: 'Ennis Roof & Exterior Resources',
    items: [
      '🌪️ Hail corridor: Ennis is in Tornado Alley — inspect roof after every storm',
      '🏚️ Older homes: asphalt shingles over 20 years need replacement or insurance review',
      '🌾 Rural lots: fire-resistant roofing (metal or Class 4 shingles) reduces insurance cost',
      '🦅 Attic vents: screen all openings — rural properties attract birds and squirrels',
      '🎨 Exterior paint: 100°F+ summers degrade paint fast — repaint every 5-7 years',
      '🧹 Bluebonnet season (March-April): clean gutters before spring rains and pollen',
    ],
  },
};

export default function EnnisTXHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌸</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Ennis TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Ellis County bluebonnet town — rural character, propane living, and wide-open lots
          </p>
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Ennis Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: '#cbd5e1' }}>
            <div>🌸 National Bluebonnet Festival city</div>
            <div>⛽ Propane: primary heat source outside city limits</div>
            <div>🚽 Septic: aerobic systems required in Ellis County</div>
            <div>🏗️ Mix of older and newer residential stock</div>
            <div>🌾 Rural character: ag lots and open land near city edge</div>
            <div>🌪️ Hail risk: in active tornado alley corridor</div>
          </div>
        </div>

        <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 17 }}>Select a service type for Ennis homeowner resources:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {serviceTypes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#1e3a5f',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 10, padding: '14px 12px',
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f2044', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>{guides[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {guides[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14, color: '#e2e8f0' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 36, color: '#475569', fontSize: 13 }}>
          🔧 ProLnk connects Ennis homeowners with vetted Ellis County service pros
        </div>
      </div>
    </div>
  );
}