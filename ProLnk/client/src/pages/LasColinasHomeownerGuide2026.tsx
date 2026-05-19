import { useState } from 'react';

const propertyTypes = [
  { id: 'canal', label: 'Canal-Front Condo', tips: ['HOA handles exterior — review rules before any modification', 'Canal proximity: check HVAC condensation drainage annually', 'Inspect window seals — high humidity near water', 'Parking garage concrete: inspect for salt/moisture damage'] },
  { id: 'townhome', label: 'Townhome', tips: ['Party wall agreements govern shared-wall repairs', 'Roof: HOA typically covers structure, you cover interior damage', 'Check rooftop deck waterproofing annually', 'Elevator lobbies: HVAC maintenance often owner responsibility'] },
  { id: 'singlefamily', label: 'Single Family', tips: ['Corporate campus neighbors drive high curb appeal standards', 'Irrigated lawn: winterize system by November 15', 'Mature trees near foundations — root barriers recommended', 'HOA architectural review required before any exterior work'] },
  { id: 'highrise', label: 'High-Rise Unit', tips: ['Verify HOA reserve fund health before purchasing', 'AC cassette units: change filters monthly in Las Colinas heat', 'Balcony waterproofing — inspect annually', 'Sound transmission: check window ratings for corporate district noise'] },
];

export default function LasColinasHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const prop = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏙️🚣</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: 0 }}>Las Colinas Homeowner Guide 2026</h1>
          <p style={{ color: '#A0AEC0', marginTop: 8 }}>Master-planned urban district · Canal-front living · Irving TX</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏢 Las Colinas at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🚣 Venice-style canal system', '🏢 Fortune 500 corporate neighbors', '🏠 Mix of condos, townhomes, SFH', '📋 Very active HOA enforcement', '🌆 Urban Towers Arts District nearby', '✈️ 5 min to DFW Airport'].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏠 Select Your Property Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {propertyTypes.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{ backgroundColor: selected === p.id ? '#F5E642′ : '#112240', color: selected === p.id ? '#0A1628' : '#E8E8E8', border: ’none', borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {prop && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 {prop.label} Owner Guide</h3>
            {prop.tips.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642′ }}>▸</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 HOA Compliance Checklist</h2>
          {['Exterior paint must match approved HOA palette','Landscaping trimmed and edged — inspected quarterly','No visible storage on balconies or patios','Mailbox must match neighborhood standard','Outdoor lighting: warm tone only, no harsh white'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ fontSize: 13, color: '#A0AEC0′ }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 8, padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#A0AEC0', fontSize: 13, margin: 0 }}>ProLnk connects Las Colinas owners with HOA-approved local pros · prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
