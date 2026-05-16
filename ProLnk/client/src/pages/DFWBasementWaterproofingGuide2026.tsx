import { useState } from 'react';

const spaceTypes = ['Storm Shelter', 'Below-Grade Storage', 'Sunken Living Room', 'Partial Basement'];
const moistureLevels = ['Dry (no visible issues)', 'Damp (musty smell)', 'Wet (standing water or seepage)', 'Severe (active flooding)'];

const solutions: Record<string, Record<string, { solution: string; cost: string; notes: string }>> = {
  'Storm Shelter': {
    'Dry (no visible issues)': { solution: 'Preventive elastomeric coating + drain inspection', cost: '$800–$1,500', notes: 'Annual inspection recommended before storm season' },
    'Damp (musty smell)': { solution: 'Interior drainage membrane + dehumidifier', cost: '$2,000–$4,000', notes: 'Address ventilation first — shelters trap humid air' },
    'Wet (standing water or seepage)': { solution: 'Sump pump installation + interior drain tile', cost: '$3,500–$7,000', notes: 'Critical: water in shelter creates serious safety hazard' },
    'Severe (active flooding)': { solution: 'Full exterior excavation + waterproof membrane + sump system', cost: '$8,000–$18,000', notes: 'Requires permit; professional evaluation mandatory' },
  },
  'Below-Grade Storage': {
    'Dry (no visible issues)': { solution: 'Vapor barrier floor + wall sealer', cost: '$500–$1,200', notes: 'DFW clay soil can shift seasonally — monitor cracks' },
    'Damp (musty smell)': { solution: 'Crystalline waterproof coating + ventilation upgrade', cost: '$1,500–$3,500', notes: 'Common in 1960s–80s DFW construction' },
    'Wet (standing water or seepage)': { solution: 'Interior drain tile + sump pump + wall membrane', cost: '$4,000–$9,000', notes: 'Identify entry point before sealing — hydrostatic pressure reroutes water' },
    'Severe (active flooding)': { solution: 'Exterior waterproofing + French drain + sump system', cost: '$10,000–$22,000', notes: 'May require engineered solution due to DFW expansive soils' },
  },
  'Sunken Living Room': {
    'Dry (no visible issues)': { solution: 'Perimeter caulk + floor sealer + grading check', cost: '$300–$800', notes: 'Confirm exterior grade slopes away from sunken area' },
    'Damp (musty smell)': { solution: 'Interior drainage channel + moisture barrier under flooring', cost: '$2,500–$5,000', notes: 'Flooring removal likely required' },
    'Wet (standing water or seepage)': { solution: 'Interior perimeter drain + sump pump + subfloor membrane', cost: '$5,000–$11,000', notes: 'Popular in 1970s DFW homes — common retrofit project' },
    'Severe (active flooding)': { solution: 'Full system: exterior grading + drain tile + sump + membrane', cost: '$12,000–$25,000', notes: 'Consider converting to at-grade level if flooding is chronic' },
  },
  'Partial Basement': {
    'Dry (no visible issues)': { solution: 'Sealer coat + window well covers + gutter check', cost: '$600–$1,400', notes: 'Partial basements rare in DFW — likely pre-1950 construction' },
    'Damp (musty smell)': { solution: 'Interior waterproof paint + dehumidifier + drain tile', cost: '$2,000–$4,500', notes: 'Ensure HVAC is not drawing moist basement air into living space' },
    'Wet (standing water or seepage)': { solution: 'Sump pump + interior drain system + crack injection', cost: '$4,500–$10,000', notes: 'Crack injection with polyurethane foam effective for DFW concrete' },
    'Severe (active flooding)': { solution: 'Full excavation waterproofing + drainage + structural review', cost: '$15,000–$30,000', notes: 'Structural engineer consult required for older DFW foundations' },
  },
};

export default function DFWBasementWaterproofingGuide2026() {
  const [spaceType, setSpaceType] = useState('');
  const [moistureLevel, setMoistureLevel] = useState('');
  const result = spaceType && moistureLevel ? solutions[spaceType]?.[moistureLevel] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ background: '#0D1E35', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME SERVICES GUIDE · 2026</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.2 }}>🌧️ Below-Grade & Storm Shelter Waterproofing Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, lineHeight: 1.6 }}>DFW has few true basements — but storm shelters, sunken living rooms, and below-grade storage rooms all face the same threat: water intrusion driven by clay soil, heavy rain, and seasonal ground movement.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{ label: '🏠 Space Type', val: spaceType, set: setSpaceType, opts: spaceTypes }, { label: '💧 Moisture Level', val: moistureLevel, set: setMoistureLevel, opts: moistureLevels }].map(({ label, val, set, opts }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {opts.map(o => (
                  <button key={o} onClick={() => set(o)} style={{ background: val === o ? '#F5E642' : '#1A2D4A', color: val === o ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: val === o ? 700 : 400, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {result ? (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED SOLUTION</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', marginBottom: 12 }}>{result.solution}</div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '14px 18px', marginBottom: 12 }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated Cost: </span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</span>
            </div>
            <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>⚠️ {result.notes}</div>
          </div>
        ) : (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8' }}>Select your space type and moisture level above to get a waterproofing recommendation.</div>
        )}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ icon: '🔩', title: 'Sump Pump Basics', text: 'A sump pump sits in a pit at the lowest point and pumps water away. Battery backup is essential — DFW storms knock out power exactly when you need it most.' }, { icon: '🧱', title: 'Interior Drain Tile', text: 'A perforated pipe runs along the interior perimeter, collecting seepage before it hits your floor. Less invasive than exterior excavation.' }, { icon: '🌡️', title: 'Clay Soil Factor', text: 'DFW expansive clay absorbs water and swells, pressing against walls. It then shrinks in drought, creating gaps. Waterproofing must flex with this movement.' }, { icon: '📋', title: 'Permit Requirements', text: 'Most municipalities require permits for sump pump installation and drain tile work. Your contractor should pull permits — if they offer to skip them, walk away.' }].map(({ icon, title, text }) => (
            <div key={title} style={{ background: '#1A2D4A', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6, fontSize: 15 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
