import { useState } from 'react';

const constructionTypes = [
  { label: 'Slab-on-grade concrete floors', value: 'slab' },
  { label: 'Wood frame with carpet', value: 'wood' },
  { label: 'Pier and beam with wood floors', value: 'pier' },
  { label: 'Tile or stone floors', value: 'tile' },
];

const orientations = [
  { label: 'Primarily north-south facing', value: 'ns' },
  { label: 'Primarily east-west facing', value: 'ew' },
  { label: 'Corner lot or complex', value: 'corner' },
];

const thermalMassData = {
  slab: {
    ns: { opportunity: 'High', note: 'Concrete slab is already thermal mass. Add tile or polished concrete finish to maximize contact. North-south orientation limits summer overheating risk.', actions: ['Polish or tile the concrete slab', 'Add radiant heating in slab for winter', 'Use ceiling fans to distribute stored heat at night'] },
    ew: { opportunity: 'Medium', note: 'Slab is good thermal mass but east-west exposure means afternoon sun hits west walls -- can overheat mass without shade. External shading is critical.', actions: ['Install west-facing exterior shading before maximizing mass', 'Add tile to DFW-shaded areas first', 'Use motorized blinds on west glass'] },
    corner: { opportunity: 'Medium', note: 'Complex orientation requires room-by-room analysis. Slab is an asset but shading strategy must come first.', actions: ['Map sun angles for each room', 'Prioritize mass in shaded north/east rooms', 'Use window film on unshaded exposures'] },
  },
  wood: {
    ns: { opportunity: 'Low', note: 'Carpet and wood frame have minimal thermal mass. Adding mass means tile replacement or interior masonry walls.', actions: ['Replace carpet with tile in high-sun rooms', 'Add interior stone or brick feature wall on south side', 'Consider exposed concrete countertops as mass elements'] },
    ew: { opportunity: 'Low', note: 'Wood frame with carpet is poor thermal mass and east-west sun will cause temperature swings. Focus on shading before adding mass.', actions: ['Install exterior shade structures first', 'Replace west-room carpet with tile', 'Add heavy curtains or exterior shutters'] },
    corner: { opportunity: 'Low', note: 'Wood frame with carpet has little mass to work with. Strategic tile replacement in key rooms is the most cost-effective path.', actions: ['Tile high-traffic south-facing rooms', 'Add stone hearth or feature walls where feasible', 'Pair mass additions with proper shading'] },
  },
  pier: {
    ns: { opportunity: 'Medium', note: 'Pier and beam creates airflow under the house which reduces ground coupling. Wood floors have low mass but are upgradeable.', actions: ['Replace wood floors with tile in sun-exposed rooms', 'Insulate under-floor cavity to prevent summer heat infiltration', 'Add concrete or stone decorative elements inside'] },
    ew: { opportunity: 'Low-Medium', note: 'Pier and beam with east-west sun is challenging. Under-floor ventilation can help in shoulder seasons but limits ground thermal coupling.', actions: ['Seal and insulate pier and beam cavity', 'Replace east and west room floors with tile', 'Install exterior overhangs on east and west'] },
    corner: { opportunity: 'Low-Medium', note: 'Pier and beam on a corner lot needs a complete shading strategy before thermal mass investment pays off.', actions: ['Audit all solar exposures', 'Insulate pier and beam first', 'Replace highest-sun-exposure room floors with tile'] },
  },
  tile: {
    ns: { opportunity: 'Very High', note: 'You already have excellent thermal mass. North-south orientation is ideal for DFW -- tile absorbs daytime heat, releases overnight without overheating.', actions: ['Maximize south-facing glass with proper overhangs', 'Use ceiling fans to distribute stored heat at night', 'Add interior masonry walls or fireplace for more mass'] },
    ew: { opportunity: 'High', note: 'Tile floors are great mass but west-facing exposure needs external shading to prevent overheating the mass in afternoon.', actions: ['Install west-facing exterior shading immediately', 'Use thermal mass for overnight release -- open windows after 10pm in shoulder seasons', 'Consider insulated window shades for west glass'] },
    corner: { opportunity: 'High', note: 'Tile throughout is a strong foundation. Map which rooms receive most sun and optimize shading there first.', actions: ['Shade highest-sun rooms first', 'Use whole-house fan in shoulder seasons to flush heat at night', 'Leverage DFW south breeze for overnight cooling when tile has absorbed daytime heat'] },
  },
};

export default function DFWThermalMassGuide() {
  const [construction, setConstruction] = useState('slab');
  const [orientation, setOrientation] = useState('ns');
  const data = thermalMassData[construction as keyof typeof thermalMassData][orientation as 'ns' | 'ew' | 'corner'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94A3B8' }}>🏠 DFW Building Science</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          Thermal Mass Guide for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.7 }}>
          Concrete, tile, and stone absorb heat during the day and release it at night. In DFW, this cuts peak cooling load -- but only when paired with shade. Without shade, thermal mass becomes a heat battery that works against you.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏗️ Construction Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {constructionTypes.map(opt => (
              <button key={opt.value} onClick={() => setConstruction(opt.value)} style={{
                background: construction === opt.value ? '#F5E642' : '#1E3A5F',
                color: construction === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', marginBottom: '0.75rem', fontSize: '1.1rem' }}>🧭 Home Orientation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {orientations.map(opt => (
              <button key={opt.value} onClick={() => setOrientation(opt.value)} style={{
                background: orientation === opt.value ? '#F5E642' : '#1E3A5F',
                color: orientation === opt.value ? '#0A1628' : '#E2E8F0',
                border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textAlign: 'left',
              }}>{opt.label}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', margin: 0 }}>📊 Thermal Mass Opportunity</h2>
            <span style={{ background: data.opportunity.includes('Very') ? '#065F46' : data.opportunity === 'High' ? '#1E3A5F' : '#374151', color: data.opportunity.includes('Very') ? '#6EE7B7' : data.opportunity === 'High' ? '#F5E642' : '#9CA3AF', borderRadius: 6, padding: '0.25rem 0.75rem', fontSize: '0.85rem', fontWeight: 700 }}>{data.opportunity}</span>
          </div>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.95rem' }}>{data.note}</p>
          <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.75rem' }}>✅ Recommended Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {data.actions.map((a, i) => (
              <div key={i} style={{ background: '#1E3A5F', borderRadius: 8, padding: '0.75rem', fontSize: '0.9rem', color: '#E2E8F0' }}>🔧 {a}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628' }}>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>☀️ DFW Rule of Thumb</div>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>Thermal mass only helps when shaded from direct sun. A tiled floor with an unshaded west window becomes a radiant heater after 3pm. Shade first, then maximize mass -- in that order.</div>
        </div>
      </div>
    </div>
  );
}
