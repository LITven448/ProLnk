import { useState } from 'react';

const decades = [
  { id: '1980s', label: 'Built 1980–1989', tips: ['Polybutylene plumbing: budget $5,000–$9,000 for full replacement', 'Original HVAC likely end-of-life — R-22 refrigerant phase-out', 'Check for aluminum wiring in older sections', 'Root intrusion from mature oak/pecan trees common'] },
  { id: '1990s', label: 'Built 1990–1999', tips: ['Roof likely at or near 25-year replacement threshold', 'CPVC plumbing: inspect for hairline cracks and brittleness', 'Dual-pane windows: seals fail at 20–25 years — check for fog', 'Foundation: monitor quarterly — Coppell clay soil shifts seasonally'] },
  { id: '2000s', label: 'Built 2000–2009', tips: ['Irrigation systems: replace heads and check timer batteries annually', 'Composite decking: check for warping in DFW heat', 'Inspect flashing around skylights if present', 'HOA paint schedule: plan exterior repaint every 7–8 years'] },
  { id: '2010s', label: 'Built 2010–2019', tips: ['Tankless water heaters: flush annually for mineral buildup', 'Smart home systems: update firmware and check battery backups', 'Fiber connectivity available — verify whole-home wiring', 'Energy audit: identify gaps in spray-foam insulation'] },
];

export default function CoppellHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const decade = decades.find(d => d.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌳🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: 0 }}>Coppell TX Homeowner Guide 2026</h1>
          <p style={{ color: '#A0AEC0', marginTop: 8 }}>Affluent mid-cities suburb · Top-rated schools · 1980s–2019 homes</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏘️ Coppell at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🎓 Top-10 DISD school district', '🌳 Mature tree canopy — root risks', '📋 Strong HOA culture citywide', '💰 High home values drive maintenance standards', '🏗️ Active renovation market', '🌧️ Clay soil shifts with rainfall'].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🗓️ Select Your Home Decade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {decades.map(d => (
              <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
                style={{ backgroundColor: selected === d.id ? '#F5E642′ : '#112240', color: selected === d.id ? '#0A1628' : '#E8E8E8', border: ’none', borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {decade && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 {decade.label} Maintenance Priorities</h3>
            {decade.tips.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642′ }}>▸</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌳 Tree Risk Management</h2>
          {[{r:'Root intrusion',d:'Camera-inspect sewer lines every 5 years if large oaks nearby'},{r:'Foundation risk',d:'Maintain consistent soil moisture — install soaker hose perimeter'},{r:'Storm damage',d:'Annual arborist inspection before spring storm season'},{r:'Insurance',d:'Verify coverage for tree-fall events — Coppell claims spike after ice storms'}].map(item => (
            <div key={item.r} style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{item.r}</div>
              <div style={{ color: '#A0AEC0', fontSize: 13 }}>{item.d}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#A0AEC0', fontSize: 13, margin: 0 }}>ProLnk connects Coppell homeowners with verified local pros · prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
