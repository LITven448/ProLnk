import { useState } from 'react';

export default function DFWHVACIceMachine2026() {
  const [iceType, setIceType] = useState('');
  const [concern, setConcern] = useState('');
  const [guide, setGuide] = useState('');

  const guides: Record<string, Record<string, string>> = {
    undercounter: {
      mineral: 'DFW hard water deposits scale fast. Descale every 6 months with citric acid solution. Install a 0.5-micron carbon block filter on the supply line — reduces scale 60-70% and protects the evaporator plate.',
      install: 'Requires: dedicated 15A circuit, 3/8-inch water supply line, and floor drain or pump kit for drainage. DFW kitchens often lack the drain — budget $200-400 for a condensate pump if floor drain is absent.',
      maintenance: 'Monthly: wipe interior with diluted bleach. Every 6 months: descale with manufacturer-approved cleaner. Annually: replace water filter. DFW units run hard May–Sep — schedule descale in April before peak season.',
    },
    commercial: {
      mineral: 'Commercial units in DFW need descaling every 3 months during summer. Water hardness here averages 150-300 ppm — install a softener pre-filter on 1/2-inch supply line. Flaked or shaved ice machines are especially sensitive to mineral clogging.',
      install: 'Commercial units need 20A dedicated circuits, 1/2-inch water supply, and floor drain with air gap. Health code in DFW requires NSF-certified units. Confirm with Dallas County Environmental Health before installation.',
      maintenance: 'Weekly: sanitize ice bin and scoop. Monthly: inspect water inlet valve and condenser coils. Every 3 months: professional descale and refrigerant check. DFW summer ambient temps above 95°F stress air-cooled condenser — ensure 6-inch clearance on all sides.',
    },
    portable: {
      mineral: 'Portable units are the most mineral-vulnerable. DFW tap water will cloud ice within 2 weeks without filtration. Use a pitcher filter or inline filter. Descale monthly — soak removable parts in white vinegar for 30 minutes.',
      install: 'Countertop only — no permanent plumbing needed. Keep away from stovetop heat (min 12 inches). DFW kitchens: avoid south-facing windows where afternoon sun raises ambient temp above 90°F, reducing ice output 30-40%.',
      maintenance: 'Clean ice bin weekly with warm soapy water. Run a citric acid cycle monthly. Replace the drain plug gasket annually — DFW heat degrades rubber. Store indoors during extended non-use periods.',
    },
  };

  function getGuide() {
    if (!iceType || !concern) { setGuide('Please select both an ice maker type and a concern.'); return; }
    const g = guides[iceType]?.[concern];
    setGuide(g || 'No specific guide available for that combination. Contact a DFW HVAC specialist.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 8 }}>🧊</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>DFW Commercial Ice Machine vs Residential Guide 2026</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 24 }}>Ice makers in DFW homes and businesses — hard water management, installation requirements, and seasonal maintenance.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 DFW Ice Maker Facts</h2>
          {['DFW water hardness averages 150–300 ppm — one of the highest in Texas','Under-counter ice makers growing fast in DFW luxury homes (Plano, Southlake, Frisco)','Rubber boots and gaskets degrade faster in DFW UV heat — inspect annually','All ice makers require a dedicated water filter to protect evaporator plates in DFW','Commercial units need NSF certification per Dallas County Health regulations'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, color: '#c8d8ec', fontSize: 14 }}><span style={{ color: '#F5E642' }}>✓</span>{f}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔧 Get Your DFW Maintenance Guide</h2>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Ice Maker Type</label>
          <select value={iceType} onChange={e => setIceType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select type...</option>
            <option value="undercounter">Under-Counter (Residential)</option>
            <option value="commercial">Commercial / Freestanding</option>
            <option value="portable">Portable / Countertop</option>
          </select>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Concern</label>
          <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select concern...</option>
            <option value="mineral">Hard Water / Mineral Buildup</option>
            <option value="install">Installation Requirements</option>
            <option value="maintenance">Routine Maintenance</option>
          </select>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', fontSize: 15 }}>Get Guide 🧊</button>
          {guide && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#c8d8ec', fontSize: 14, lineHeight: 1.6, borderLeft: '3px solid #F5E642' }}>{guide}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12, marginTop: 24 }}>ProLnk DFW Home Intelligence · Ice Machine Guide 2026</div>
      </div>
    </div>
  );
}
