import { useState } from 'react';

const propertyTypes = [
  { id: 'condo', label: 'Condo / Apartment', tips: ['HOA handles exterior — focus on unit interior systems', 'High turnover market: update appliances to attract renters/buyers', 'HVAC filter monthly in Addison restaurant corridor — grease particulates', 'Balcony grills may be prohibited — check HOA rules'] },
  { id: 'townhome', label: 'Townhome', tips: ['Verify HOA reserve fund — small Addison HOAs sometimes underfunded', 'Roof: confirm HOA vs. owner responsibility in CC&Rs', 'Parking: tandem spaces common — ensure access easements are clear', 'Sound: restaurant/entertainment district noise — check window STC ratings'] },
  { id: 'commercial', label: 'Mixed-Use/Commercial Adjacent', tips: ['Restaurant row proximity: grease trap odors — check HVAC air intake orientation', 'Parking lot drainage: city of Addison actively enforces stormwater code', 'Security lighting: high pedestrian traffic area — ensure coverage', 'Signage: strict Addison sign ordinances — review before any exterior changes'] },
  { id: 'singlefamily', label: 'Single Family (rare)', tips: ['Only ~3,700 residences in 4 sq miles — high demand, fast resale', 'Exterior maintenance highly visible — city inspection common', 'Tree permits required for removal — Addison green canopy ordinance', 'Irrigation: Addison water restrictions apply May–October'] },
];

export default function AddisonHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const prop = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🍽️🏙️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: 0 }}>Addison TX Homeowner Guide 2026</h1>
          <p style={{ color: '#A0AEC0', marginTop: 8 }}>4-square-mile municipality · Restaurant/entertainment hub · Dense urban living</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏙️ Addison at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['📐 Only 4 square miles total', '🍽️ 170+ restaurants per sq mile', '🏠 ~3,700 residences only', '✈️ Addison Airport (private)', '🔄 High tenant/owner turnover', '📋 Strict exterior ordinances'].map(f => (
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
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 {prop.label} Maintenance Guide</h3>
            {prop.tips.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642′ }}>▸</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Addison Exterior Compliance</h2>
          {['Façade must be maintained — city inspects annually','No peeling paint or damaged trim visible from street','Landscaping: edged, mulched, and irrigated per code','Trash/recycling containers stored out of public view','Exterior modifications require city design review'].map(item => (
            <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'center' }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ fontSize: 13, color: '#A0AEC0′ }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#A0AEC0', fontSize: 13, margin: 0 }}>ProLnk connects Addison owners with verified local pros · prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
