import { useState } from 'react';

const locations = [
  {
    id: 'garage',
    label: 'Garage',
    emoji: '🏠',
    dfwIssue: 'Extreme summer heat (140°F+)',
    implications: [
      'Unit works 30–40% harder in DFW summers',
      'Refrigerant lines exposed to radiant heat',
      'Efficiency drops significantly July–August',
      'Higher utility bills than alternatives',
    ],
    improvements: [
      'Add garage insulation and ventilation',
      'Install radiant barrier on garage door',
      'Consider relocating unit to conditioned closet',
      'Add mini-split to cool the garage itself',
    ],
    score: 2,
  },
  {
    id: 'attic',
    label: 'Attic',
    emoji: '🏗️',
    dfwIssue: 'Hottest DFW location (150°F+ in summer)',
    implications: [
      'Air handler in unconditioned 150°F space',
      'Ductwork leaks cost DFW homeowners avg $600/yr',
      'Insulation R-value degrades from heat cycling',
      'Most common DFW setup — and most inefficient',
    ],
    improvements: [
      'Seal and insulate all ductwork (mastic sealant)',
      'Add radiant barrier under roof decking',
      'Upgrade attic insulation to R-38 minimum',
      'Consider spray foam roof deck to condition attic',
    ],
    score: 1,
  },
  {
    id: 'closet',
    label: 'Interior Closet',
    emoji: '🚪',
    dfwIssue: 'Best DFW option for efficiency',
    implications: [
      'Air handler stays in conditioned space',
      'No heat stress from DFW summers',
      'Short duct runs = less heat gain',
      'Quieter operation than garage/attic',
    ],
    improvements: [
      'Ensure adequate return air clearance',
      'Add sound dampening around closet walls',
      'Keep condensate drain clear (high DFW humidity swings)',
      'Annual coil cleaning is sufficient',
    ],
    score: 4,
  },
  {
    id: 'outside',
    label: 'Outdoor Ground Unit',
    emoji: '☀️',
    dfwIssue: 'Condenser heat + DFW sun exposure',
    implications: [
      'Condenser coils in direct DFW sun degrade faster',
      'Hail risk is real — DFW averages 5 hail events/year',
      'North-facing placement reduces heat load 15%',
      'Vegetation clearance critical (2ft minimum)',
    ],
    improvements: [
      'Install condenser shade structure (not blocking airflow)',
      'Consider hail guard covers',
      'Relocate to north or east side of home',
      'Keep 2ft clearance from shrubs and fences',
    ],
    score: 3,
  },
];

export default function DFWHVACLocationGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const loc = locations.find((l) => l.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Where Is Your HVAC Equipment?</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Location is the single biggest factor in DFW HVAC efficiency. Select yours to see the implications and what you can do.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {locations.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelected(l.id)}
              style={{
                background: selected === l.id ? '#F5E642' : '#0f2040',
                color: selected === l.id ? '#0A1628' : '#fff',
                border: '2px solid',
                borderColor: selected === l.id ? '#F5E642' : '#1e3a5f',
                borderRadius: 12,
                padding: '16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{l.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{l.label}</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{l.dfwIssue}</div>
            </button>
          ))}
        </div>
        {loc && (
          <div style={{ background: '#0f2040', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 36 }}>{loc.emoji}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20 }}>{loc.label}</div>
                <div style={{ color: '#F5E642', fontSize: 13 }}>{loc.dfwIssue}</div>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>DFW IMPLICATIONS</div>
              {loc.implications.map((imp, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14 }}>
                  <span style={{ color: '#F5E642' }}>⚡</span>
                  <span>{imp}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>IMPROVEMENT OPTIONS</div>
              {loc.improvements.map((imp, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 14 }}>
                  <span style={{ color: '#34d399' }}>✓</span>
                  <span>{imp}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Want a DFW HVAC pro to evaluate your setup?</div>
              <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                Get Free ProLnk Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
