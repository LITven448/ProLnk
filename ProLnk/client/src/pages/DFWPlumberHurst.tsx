import { useState } from 'react';

const symptoms = [
  {
    id: 'low-pressure',
    label: '💧 Low Water Pressure',
    likelyCause: 'Galvanized pipe corrosion and buildup — very common in Hurst homes built before 1985. Mineral deposits narrow the pipe interior over decades.',
    urgency: '🟡 Moderate',
    fix: 'Partial or full repipe in PEX depending on extent. Confirm with pressure test at main shutoff.',
    costRange: '$800 – $12,000',
    costNote: 'Spot repipe of one line: $800-2,500. Full house repipe: $7,000-12,000.',
    galvanizedRisk: true,
  },
  {
    id: 'discoloration',
    label: '🟤 Rust/Brown Water',
    likelyCause: 'Galvanized pipe rust actively flaking into water supply. This is a health and safety concern. Common in HEB-area homes from the 1960s-1980s.',
    urgency: '🔴 High — act now',
    fix: 'Repipe required. Do not delay — rust particles indicate pipe failure in progress.',
    costRange: '$6,500 – $14,000',
    costNote: 'Full repipe typical. Filter-only approaches mask the problem; pipe replacement is the only real fix.',
    galvanizedRisk: true,
  },
  {
    id: 'slow-drain',
    label: '🌀 Slow Draining Drains',
    likelyCause: 'Hair and grease buildup in drain lines is most common. Older cast-iron drain lines in HEB homes can also crack and accumulate debris.',
    urgency: '🟢 Low-Moderate',
    fix: 'Try enzymatic drain cleaner first. If persistent, cable or hydro-jet cleaning.',
    costRange: '$120 – $850',
    costNote: 'Basic snaking: $120-250. Hydro-jet with camera: $450-850. DIY enzymatic cleaner: $15-40.',
    galvanizedRisk: false,
  },
  {
    id: 'no-hot-water',
    label: '🔥 No Hot Water',
    likelyCause: 'Water heater failure — pilot light, thermocouple, heating element (electric), or tank corrosion. Hurst homes with 10+ year water heaters are overdue for replacement.',
    urgency: '🟠 High — comfort issue',
    fix: 'Check pilot light / reset breaker first. If no improvement, call a plumber for diagnosis.',
    costRange: '$85 – $2,200',
    costNote: 'Thermocouple/element repair: $85-350. Tank replacement: $850-1,400. Tankless upgrade: $1,800-2,200.',
    galvanizedRisk: false,
  },
];

export default function DFWPlumberHurst() {
  const [selected, setSelected] = useState('');
  const symptom = symptoms.find((s) => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            🔧 HURST TX — HEB METROPLEX SPECIALISTS
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Hurst Plumbers<br />Galvanized Pipe Experts
          </h1>
          <p style={{ color: '#a0aec0', fontSize: 18, marginTop: 16, maxWidth: 640 }}>
            Hurst's older housing stock — much of it built in the 1960s and 1980s — means galvanized steel pipes are still in tens of thousands of homes. Our plumbers specialize in diagnosing and solving the problems that come with aging HEB-area plumbing.
          </p>
        </div>

        <div style={{ backgroundColor: '#3a1a1a', border: '1px solid #7f1d1d', borderRadius: 12, padding: 20, marginBottom: 32, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 28 }}>⚠️</span>
          <div>
            <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: 4 }}>Galvanized Pipe Warning — Hurst Homeowners</div>
            <div style={{ color: '#a0aec0', fontSize: 15 }}>Homes built before 1985 in the HEB area frequently have galvanized steel supply pipes. These corrode from the inside out over 40-60 years. If your home has never been repiped, you likely have reduced water pressure, potential rust contamination, and pipes that could fail without warning. Ask your plumber to inspect on any service call.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏠', label: '1960s–1980s Homes', detail: 'Original galvanized pipes' },
            { icon: '🔩', label: 'Repipe Specialists', detail: 'PEX-A full repipe crew' },
            { icon: '🏫', label: 'HEB School District', detail: 'Local Hurst families' },
            { icon: '💧', label: 'Water Quality', detail: 'Rust & pressure issues' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f35', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
            🔍 Symptom Checker
          </h2>
          <p style={{ color: '#a0aec0', marginBottom: 24 }}>Select what you're experiencing to get the likely cause, urgency level, and estimated repair cost.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 28 }}>
            {symptoms.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  padding: '16px 12px',
                  backgroundColor: selected === s.id ? '#F5E642' : '#0A1628',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: `1px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: 10,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {symptom && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
              {symptom.galvanizedRisk && (
                <div style={{ backgroundColor: '#3a1a1a', border: '1px solid #7f1d1d', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 14, color: '#fca5a5', fontWeight: 600 }}>
                  ⚠️ Galvanized pipe issue — common in 1960s–1985 Hurst homes
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>URGENCY</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{symptom.urgency}</div>
                </div>
                <div style={{ backgroundColor: '#111f35', borderRadius: 8, padding: '12px 20px' }}>
                  <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>{symptom.costRange}</div>
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 6 }}>LIKELY CAUSE</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{symptom.likelyCause}</div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: '#a0aec0', fontSize: 12, marginBottom: 6 }}>RECOMMENDED FIX</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.6 }}>{symptom.fix}</div>
              </div>
              <div style={{ color: '#a0aec0', fontSize: 13, fontStyle: 'italic' }}>{symptom.costNote}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🔩', label: 'Full House Repipe', price: 'From $7,500' },
            { icon: '🚿', label: 'Water Heater Replace', price: 'From $950' },
            { icon: '🌀', label: 'Hydro-Jet Cleaning', price: 'From $450' },
            { icon: '🔍', label: 'Camera Inspection', price: 'From $225' },
          ].map((svc) => (
            <div key={svc.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{svc.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{svc.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{svc.price}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Get a Hurst Plumber Today</div>
          <p style={{ color: '#1a2f4a', marginBottom: 24 }}>Licensed Texas plumbers. Galvanized pipe specialists. Serving all of Hurst, Euless, and Bedford.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 17, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Get My Free Quote 🔧
          </button>
        </div>

      </div>
    </div>
  );
}
