import { useState } from 'react';

const needs = [
  { label: 'Privacy (Bedroom/Bath)', value: 'privacy' },
  { label: 'Sound Reduction (Office/Media)', value: 'sound' },
  { label: 'Space Saving (Small Room)', value: 'space' },
  { label: 'Decorative / Aesthetic', value: 'decor' },
  { label: 'Budget Build-Out', value: 'budget' },
];

const doors = {
  privacy: { type: 'Solid Core', icon: '🚪', why: 'Best for DFW master bedroom and bath where privacy matters. Solid core significantly outperforms hollow core on sound transmission.', cost: '$150–$350 per door installed. More expensive than hollow core but adds real value in DFW resale.', note: 'Standard DFW builder spec is hollow core — upgrading master bedroom and bath doors is a high-ROI finishing move.' },
  sound: { type: 'Solid Core' , icon: '🔇', why: 'Critical for DFW home offices and media rooms. Open-concept DFW homes amplify sound — solid core is the primary mitigation tool.', cost: '$150–$350 installed. Some DFW pros also add door sweeps and weatherstripping for additional STC points.', note: 'STC rating: hollow core ~20, solid core ~30. For true sound isolation, pair with acoustic caulk at frame.' },
  space: { type: 'Pocket Door', icon: '↔️', why: 'Ideal for small DFW bathrooms, closets, and laundry rooms where a swing door wastes usable floor space.', cost: '$300–$600 installed. Requires wall cavity framing — easier to plan during build or remodel than post-build.', note: 'Common complaint in DFW: pocket door hardware fails after 10–15 years. Specify commercial-grade hardware upfront.' },
  decor: { type: 'Barn Door', icon: '🎨', why: 'Trending in DFW interior design 2019–present. Works well in farmhouse, transitional, and contemporary DFW home styles.', cost: '$400–$900 installed. Hardware is the premium component — barn door rail kits vary $150–$600.', note: 'HOAs in some DFW communities may restrict external-facing barn door hardware. Check before specifying.' },
  budget: { type: 'Hollow Core', icon: '💲', why: 'Standard in virtually all DFW production builder homes. Light, inexpensive, easy to install and paint.', cost: '$60–$120 installed. Most DFW builder-grade spec — Masonite and Jeld-Wen are dominant suppliers.', note: 'Hollow core is fine for closets and low-traffic areas. Avoid in bedrooms or baths where sound transmission matters.' },
};

export default function DFWInteriorDoorGuide2026() {
  const [selected, setSelected] = useState(null);
  const result = selected ? doors[selected] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🚪</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Interior Door Guide 2026</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>Hollow core vs solid core, pocket, barn — the right door for every DFW room</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>What Do You Need This Door To Do?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {needs.map((n) => (
              <button key={n.value} onClick={() => setSelected(n.value)}
                style={{ background: selected === n.value ? '#F5E642′ : '#162035', color: selected === n.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '14px 20px', cursor: ’pointer', fontWeight: 600, textAlign: 'left', fontSize: 15 }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>

        {result ? (
          <div style={{ background: '#162035', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{result.icon}</div>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>Recommended: {result.type}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><span style={{ color: '#F5E642', fontWeight: 600 }}>Why: </span><span style={{ color: '#ddd' }}>{result.why}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 600 }}>Cost: </span><span style={{ color: '#ddd' }}>{result.cost}</span></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#ccc', fontSize: 14 }}>💡 {result.note}</div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#162035', borderRadius: 12, padding: 24, textAlign: 'center', color: '#888′ }}>
            Select a door need above to get a DFW-specific recommendation.
          </div>
        )}

        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>ProLnk DFW Home Intelligence • prolnk.io</p>
      </div>
    </div>
  );
}
