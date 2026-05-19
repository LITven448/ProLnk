import { useState } from 'react';

const locations = [
  { name: 'Downtown Dallas', zip: '75201', intensity: 'Extreme', extra: '7°F', load: '+18%', color: '#ef4444′ },
  { name: 'Oak Lawn', zip: '75219', intensity: 'High', extra: '5°F', load: '+13%', color: '#f97316′ },
  { name: 'Deep Ellum', zip: '75226', intensity: 'High', extra: '5°F', load: '+13%', color: '#f97316′ },
  { name: 'Uptown Dallas', zip: '75204', intensity: 'High', extra: '6°F', load: '+15%', color: '#f97316′ },
  { name: 'Garland', zip: '75040', intensity: 'Moderate', extra: '3°F', load: '+8%', color: '#eab308′ },
  { name: 'Irving', zip: '75061', intensity: 'Moderate', extra: '3°F', load: '+8%', color: '#eab308′ },
  { name: 'Plano', zip: '75023', intensity: 'Low', extra: '1°F', load: '+3%', color: '#22c55e' },
  { name: 'Frisco', zip: '75034', intensity: 'Low', extra: '1°F', load: '+2%', color: '#22c55e' },
  { name: 'McKinney', zip: '75070', intensity: 'Minimal', extra: '0°F', load: '+1%', color: '#06b6d4′ },
  { name: 'Forney', zip: '75126', intensity: 'Minimal', extra: '0°F', load: '+0%', color: '#06b6d4′ },
];

const intensityInfo: Record<string, string> = {
  'Extreme': 'Dense concrete and asphalt with minimal green space traps heat all day. AC runs 20%+ longer than rural DFW baseline.',
  'High': 'Dense urban development with limited tree canopy. Expect 15-18% more AC runtime versus suburban baseline.',
  'Moderate': 'Mixed residential and commercial zones. Some tree canopy but significant paved surface area increases load.',
  'Low': 'Suburban neighborhoods with moderate tree cover. Heat island effect is minor and well within typical HVAC sizing.',
  'Minimal': 'Outer suburbs and rural fringe with extensive green space. Heat island effect negligible — rural baseline applies.',
};

export default function DFWHVACHeatIslandDFW() {
  const [selected, setSelected] = useState('Downtown Dallas');
  const loc = locations.find(l => l.name === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Urban Heat Island & Your HVAC</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW's urban core runs 5–7°F hotter than surrounding rural areas. Where you live changes your HVAC sizing, runtime, and energy cost.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>🌆 What Is the Urban Heat Island Effect?</div>
          <p style={{ color: '#e2e8f0', lineHeight: 1.7, marginBottom: 0 }}>
            Concrete, asphalt, and buildings absorb solar heat during the day and release it at night — preventing the natural cooling rural areas experience. 
            In Dallas's urban core, nighttime lows can be 8–10°F warmer than in McKinney or Forney 30 miles away, meaning your AC never gets a break.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>📍 Find Your DFW Location</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {locations.map(l => (
              <button key={l.name} onClick={() => setSelected(l.name)}
                style={{ padding: '7px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: selected === l.name ? '#F5E642′ : '#162035', color: selected === l.name ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>
                {l.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8′ }}>Heat Island Intensity</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: loc.color }}>{loc.intensity}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>ZIP {loc.zip}</div>
            </div>
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8′ }}>Extra Heat vs Rural</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{loc.extra}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>degrees F warmer</div>
            </div>
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#94a3b8′ }}>AC Load Increase</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>{loc.load}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>vs rural baseline</div>
            </div>
          </div>

          <div style={{ background: '#1a2a4a', borderRadius: 10, padding: 20, borderLeft: `4px solid ${loc.color}` }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 700 }}>WHAT THIS MEANS FOR {selected.toUpperCase()}</div>
            <div style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{intensityInfo[loc.intensity]}</div>
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔧 Heat Island HVAC Mitigation Tips</div>
          {[
            '🌳 Plant trees on south and west sides — mature shade trees cut AC load by 10-15%',
            '🎨 Cool roof coatings reflect solar radiation — reduces attic temp by 20-30°F',
            '📐 Oversize AC by 5-10% if in high/extreme heat island zone versus ACCA Manual J baseline',
            '🌙 Use programmable setback to 80°F during 10pm-6am when grid rates are lowest',
          ].map((tip, i) => (
            <div key={i} style={{ background: '#162035', borderRadius: 8, padding: 12, marginBottom: 8, fontSize: 14, color: '#e2e8f0′ }}>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18 }}>Right-Size Your HVAC for Your DFW Zone</div>
          <div style={{ color: '#162035', marginTop: 4, fontSize: 14 }}>ProLnk pros use Manual J load calculations that account for your specific location's heat island load.</div>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
