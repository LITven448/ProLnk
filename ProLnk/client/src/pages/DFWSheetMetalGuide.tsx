import { useState } from 'react';

const sheetMetalData: Record<string, Record<string, { tools: string; safety: string; sealant: string }>> = {
  'HVAC boot replacement': {
    'Straight cut': { tools: 'Aviation snips (straight-cut, green handle), hand seamers, sheet metal screws', safety: 'Cut edges are razor-sharp. Wear leather gloves always. DFW attic work: 140°F+ in summer — schedule early morning, max 90 min sessions.', sealant: 'Mastic duct sealant (not tape alone). DFW heat degrades foil tape — mastic is permanent. Brush on 1/8″ coat, embed mesh, second coat.' },
    'Offset cut': { tools: 'Offset aviation snips, sheet metal brake (or bend by hand), sheet metal screws', safety: 'Offset snips prevent knuckle injury on long cuts. Wear safety glasses — metal chips fly. DFW attic: take hydration breaks every 30 min.', sealant: 'Mastic + fiberglass mesh tape at all joints. DFW HVAC systems run 2,000+ hours/year — mastic outlasts any tape product.' },
  },
  'Roof flashing repair': {
    'Straight cut': { tools: 'Tin snips, roofing nails, roofing hammer, caulk gun', safety: 'Work on roof only below 90°F surface temp (morning). DFW summer roofs hit 160°F — burns through clothing instantly. Never work alone on roof.', sealant: 'Roofing caulk (polymer-based) + roofing cement for step flashing. DFW expansion/contraction is extreme — use flexible sealant, not rigid.' },
    'Offset cut': { tools: 'Compound snips, step flashing pieces, roofing nails', safety: 'Secure ladder properly. DFW wind gusts: check forecast before roof work. Never work during DFW storm season (April–June) on a roof.', sealant: 'Butyl-based roofing sealant under flashing + polyurethane caulk at edges. Two-part protection for DFW freeze-thaw cycles (rare but damaging).' },
  },
  'Duct repair': {
    'Straight cut': { tools: 'Straight snips, duct repair sections, sheet metal screws, mastic', safety: 'Flex duct is easy — rigid duct is sharp. Leather gloves required. DFW attic: confirm power to air handler is OFF before touching ducts.', sealant: 'Mastic only for DFW. Foil tape fails at DFW attic temps (140°F+). Mastic rated to 250°F — use it liberally.' },
    'Offset cut': { tools: 'Offset snips, duct connector sleeves, sheet metal screws', safety: 'Offset snips protect fingers in tight attic spaces. DFW attics: watch for wasp nests and rattlesnakes in spring.', sealant: 'UL-181 mastic compound. For flex duct connections: mastic + UL-181 tape. DFW homes lose 20–30% cooling through duct leaks — seal every joint.' },
  },
};

export default function DFWSheetMetalGuide() {
  const [application, setApplication] = useState('');
  const [cutType, setCutType] = useState('');
  const result = application && cutType ? sheetMetalData[application]?.[cutType] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 DFW HOME GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Sheet Metal Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>HVAC boots, flashing, duct repairs — how DFW homeowners encounter sheet metal and how to work it safely.</p>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>✂️ Sheet Metal Snip Types</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            {[
              { color: 'Green', type: 'Straight cuts', use: 'Long straight lines' },
              { color: 'Red', type: 'Left curves', use: 'Counter-clockwise curves' },
              { color: 'Yellow', type: 'Right curves', use: 'Clockwise curves' },
            ].map(s => (
              <div key={s.color} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.25rem' }}>{s.color} Handle</div>
                <div style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>{s.type}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{s.use}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.75rem' }}>☀️ DFW Sheet Metal Challenges</div>
          <ul style={{ color: '#94a3b8', fontSize: '0.9rem', paddingLeft: '1.25rem', lineHeight: 1.9 }}>
            <li>DFW attics reach 140–160°F in summer — schedule HVAC work before 8am May–September</li>
            <li>Foil HVAC tape fails above 120°F — use mastic duct sealant for all DFW duct work</li>
            <li>DFW expansion/contraction cycles crack rigid sealants — always use flexible mastic or butyl</li>
            <li>Steel sheet metal rusts fast in DFW humidity — galvanized only for exterior applications</li>
          </ul>
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: '#F5E642′ }}>🎯 DFW Sheet Metal Selector</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Application</label>
              <select value={application} onChange={e => setApplication(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select application</option>
                <option value="HVAC boot replacement">HVAC boot replacement</option>
                <option value="Roof flashing repair">Roof flashing repair</option>
                <option value="Duct repair">Duct repair (rigid)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Cut Type Needed</label>
              <select value={cutType} onChange={e => setCutType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select cut type</option>
                <option value="Straight cut">Straight cuts</option>
                <option value="Offset cut">Curves / offset cuts</option>
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.75rem' }}><span style={{ color: '#F5E642′ }}>Tools Needed:</span><br /><span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{result.tools}</span></div>
              <div style={{ marginBottom: '0.75rem' }}><span style={{ color: '#F5E642′ }}>Safety (DFW):</span><br /><span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.safety}</span></div>
              <div><span style={{ color: '#F5E642′ }}>Sealant Recommendation:</span><br /><span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.sealant}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2030', borderRadius: 12, padding: '1.25rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ Safety First: Sheet Metal Cuts</div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Cut sheet metal edges are as sharp as a razor blade. Leather work gloves are non-negotiable. 
            Never use cloth gloves — metal slices through them instantly. After cutting, use a hand seamer 
            or file to roll or smooth edges before handling. In DFW attics, add heat exhaustion risk to the equation — 
            know your limits and never work alone.
          </p>
        </div>
      </div>
    </div>
  );
}
