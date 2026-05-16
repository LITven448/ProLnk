import { useState } from 'react';

const decades = [
  { id: '1950s', label: 'Built 1950–1959', tips: ['Knob-and-tube or early panel wiring: hire electrician for full inspection', 'Cast-iron drain and galvanized supply lines: camera-inspect sewer immediately', 'Original brick homes: inspect mortar joints — tuck-point if crumbling', 'No vapor barrier under slab: moisture intrusion common in wet years'] },
  { id: '1960s', label: 'Built 1960–1969', tips: ['Asbestos risk in floor tiles, pipe insulation, and attic vermiculite', 'Single-pane metal frame windows: upgrade for energy and comfort', 'Septic to sewer conversions: verify city connection if on older street', 'HVAC original if not updated — R-22 phase-out requires full system swap'] },
  { id: '1970s', label: 'Built 1970–1979', tips: ['Polybutylene plumbing in many 1975–1985 builds — inspect gray pipes', 'Federal Pacific/Zinsco panels: safety hazard — replace immediately', 'Brick veneer: check weep holes and flashing for water infiltration', 'Foundation: consistent perimeter watering critical for DFW clay'] },
  { id: '1980s', label: 'Built 1980–1989', tips: ['Rapid renovation activity: verify permits pulled for prior work', 'Original roof likely at end-of-life — check for missing granules', 'Dual-pane windows: fog test — seals fail at 30+ years', 'Irrigation: backflow preventer certification required annually'] },
];

export default function FarmersbranchHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const decade = decades.find(d => d.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🧱🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: 0 }}>Farmers Branch TX Homeowner Guide 2026</h1>
          <p style={{ color: '#A0AEC0', marginTop: 8 }}>Established Dallas suburb · 1950s–1989 brick homes · Rapid renovation market</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏘️ Farmers Branch at a Glance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {['🧱 Classic 1950s–1980s brick construction', '💰 Affordable Dallas market entry point', '🔧 High renovation activity citywide', '🌊 Older plumbing and electrical common', '🚇 DART rail access (Farmers Branch station)', '📈 Rising home values from flips'].map(f => (
              <div key={f} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>{f}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🗓️ Select Your Home Decade</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {decades.map(d => (
              <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)}
                style={{ backgroundColor: selected === d.id ? '#F5E642' : '#112240', color: selected === d.id ? '#0A1628' : '#E8E8E8', border: 'none', borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 15 }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {decade && (
          <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🔧 {decade.label} Repair Priority Guide</h3>
            {decade.tips.map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <span style={{ color: '#F5E642' }}>▸</span>
                <span style={{ fontSize: 14, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏗️ Buying a Renovated Home? Check These</h2>
          {[{i:'Permits',d:'Verify all permits pulled and closed — unpermitted work creates resale risk'},{i:'Electrical',d:'Confirm panel upgraded to 200A service — flips often cut corners'},{i:'Plumbing',d:'Ensure new supply lines replaced if original galvanized or PB'},{i:'Foundation',d:'Get independent inspection — cosmetic fixes can hide settling'},{i:'Roof',d:'New shingles may be layered over old — check decking condition'}].map(item => (
            <div key={item.i} style={{ marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{item.i}</div>
              <div style={{ color: '#A0AEC0', fontSize: 13 }}>{item.d}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#A0AEC0', fontSize: 13, margin: 0 }}>ProLnk connects Farmers Branch homeowners with verified local pros · prolnk.io</p>
        </div>
      </div>
    </div>
  );
}
