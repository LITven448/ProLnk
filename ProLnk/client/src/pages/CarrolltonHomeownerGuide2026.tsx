import { useState } from 'react';

const decades = [
  { id: '1970s', label: 'Built 1970–1979', county: 'Dallas County', tips: ['Cast-iron drain lines: camera inspect — 50-year-old pipes degrade fast', 'Federal Pacific or Zinsco panels: replace immediately for safety', 'Vermiculite attic insulation: test for asbestos before any attic work', 'Slab foundation: water around perimeter is critical to prevent shifting'] },
  { id: '1980s', label: 'Built 1980–1989', county: 'Both Counties', tips: ['Polybutylene plumbing risk in 1983–1995 builds — inspect gray plastic pipes', 'R-22 HVAC refrigerant phase-out: replace aging systems now', 'Check for Chinese drywall if renovated 2005–2010', 'Varied soil: Denton County homes more expansive clay — monitor foundation'] },
  { id: '1990s', label: 'Built 1990–1999', county: 'Denton County', tips: ['Roof at or beyond 25-year threshold — inspect shingles for granule loss', 'CPVC plumbing brittle with age — check under sinks and at manifold', 'Irrigation: test and backflow certify annually per Carrollton code', 'HOA rules vary significantly between Dallas/Denton county sections'] },
  { id: '2000s', label: 'Built 2000–2015', county: 'Mixed', tips: ['EIFS stucco: moisture probe test every 3 years', 'Energy audit: identify insulation gaps before summer AC costs peak', 'Check attic ridge vent integrity — storm damage common', 'Smart irrigation: Carrollton drought restrictions enforced April–October'] },
];

export default function CarrolltonHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const decade = decades.find(d => d.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏘️🌍</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: 0 }}>Carrollton TX Homeowner Guide 2026</h1>
          <p style={{ color: '#A0AEC0', marginTop: 8 }}>Diverse Dallas-area suburb · Dallas & Denton counties · 1970s–2015 homes</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏙️ Carrollton at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🌍 Highly diverse — 100+ nationalities', '🗺️ Spans Dallas & Denton counties', '🏠 High homeownership rates', '🌱 Varied soil: clay to loam', '🚇 DART light rail access', '🔧 Active renovation market'].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🗓️ Select Your Home Decade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {decades.map(d => (
              <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
                style={{ backgroundColor: selected === d.id ? '#F5E642′ : '#112240', color: selected === d.id ? '#0A1628' : '#E8E8E8', border: ’none', borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>{d.label}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{d.county}</div>
              </button>
            ))}
          </div>
        </div>

        {decade && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 {decade.label} Maintenance Guide</h3>
            {decade.tips.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642′ }}>▸</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ Carrollton-Specific Watch Items</h2>
          {[{i:'County boundary',d:'Your county determines tax rate, appraisal district, and permit office'},{i:'Soil testing',d:'West Carrollton clay expands 3–4 inches — critical for foundation'},{i:'Water quality',d:'Test annually — Carrollton water source varies by neighborhood'},{i:'Permits',d:'Any addition or structure requires permit — HOA and city both enforce'}].map(item => (
            <div key={item.i} style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{item.i}</div>
              <div style={{ color: '#A0AEC0', fontSize: 13 }}>{item.d}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#A0AEC0', fontSize: 13, margin: 0 }}>ProLnk connects Carrollton homeowners with verified local pros · prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
