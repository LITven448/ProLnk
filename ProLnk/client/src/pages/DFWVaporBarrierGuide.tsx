import { useState } from 'react';

const homeAreas = ['Crawl Space', 'Attic (Vented)', 'Attic (Conditioned / Unvented)', 'Basement / Slab Edge', 'Exterior Wall Assembly'];
const projectTypes = ['Encapsulation / Sealing', 'New Construction', 'Renovation / Upgrade', 'Moisture Problem Investigation'];

type Result = { requirement: string; placement: string; warnings: string[] };
type ResultMap = Record<string, Record<string, Result>>;

const results: ResultMap = {
  'Crawl Space': {
    'Encapsulation / Sealing': { requirement: '20-mil polyethylene vapor barrier (full encapsulation)', placement: 'Ground surface + walls, warm-side up. Lap seams 12″ and tape. Seal to piers and foundation walls.', warnings: ['DFW crawl spaces are humid — do NOT leave any soil exposed after encapsulation', 'Install dehumidifier if sealing to conditioned space', 'Encapsulation requires proper venting or conditioning — do not seal without addressing air exchange'] },
    'New Construction': { requirement: '6-mil poly minimum (10–20 mil preferred)', placement: 'Ground surface only for vented crawl; full encapsulation for conditioned crawl space.', warnings: ['DFW clay soil retains moisture — vapor barrier is non-negotiable in new construction', 'Specify mil thickness in contract; 6-mil is code minimum but 10–20 mil performs far better'] },
    'Renovation / Upgrade': { requirement: '10–20 mil reinforced poly', placement: 'Remove old barrier first. Install new over clean, graded ground. Warm side = ground side in DFW.', warnings: ['Older homes often have inadequate 4–6 mil barriers that have failed', 'Check for standing water before installing — address drainage first'] },
    'Moisture Problem Investigation': { requirement: 'Inspect existing barrier before specifying', placement: 'Check for tears, pooling, condensation under joists, and mold on wood.', warnings: ['In DFW, crawl space moisture problems are common in spring and after heavy rains', 'Mold remediation must precede any new vapor barrier installation', 'Grade exterior soil away from foundation first'] },
  },
  'Attic (Vented)': {
    'Encapsulation / Sealing': { requirement: 'No vapor barrier on attic floor — air seal penetrations only', placement: 'DFW is Climate Zone 3 (mixed-humid). Vapor barriers on vented attic floors trap moisture. Air seal only; do not install poly.', warnings: ['This is the most common DFW attic mistake — poly vapor barriers on attic floors cause moisture damage', 'DFW\’s warm-side is the living space ceiling — not the attic floor', 'Use kraft-faced batts or unfaced + air sealing instead'] },
    'New Construction': { requirement: 'No attic floor vapor barrier', placement: 'Air seal ceiling plane penetrations. Vent ratio: 1:150 or 1:300 with balanced intake/exhaust.', warnings: ['Specify no poly on attic floor in construction documents', 'Ensure adequate soffit and ridge venting — DFW attic temps require strong convective flow'] },
    'Renovation / Upgrade': { requirement: 'Remove any existing poly vapor barrier on attic floor', placement: 'N/A — remove and replace with air sealing only.', warnings: ['If vapor barrier exists, remove it before adding blown insulation', 'Trapped moisture between poly and insulation is a common DFW attic failure'] },
    'Moisture Problem Investigation': { requirement: 'Inspect for improper vapor barrier installation', placement: 'Check for poly on floor, condensation on rafters, and ice damming evidence on eaves.', warnings: ['Attic condensation in DFW usually traces to air leaks from living space, not missing vapor barrier', 'Look for bath fan ducts terminating in attic — common DFW moisture source'] },
  },
  'Attic (Conditioned / Unvented)': {
    'Encapsulation / Sealing': { requirement: 'Vapor retarder required on roof deck underside (Class II)', placement: 'Warm side = interior of building. In DFW conditioned attics, the vapor retarder goes on the interior face of the insulation.', warnings: ['Closed-cell spray foam acts as both insulation and vapor retarder — most common DFW solution', 'Do not use open-cell foam alone on roof deck without interior vapor retarder in DFW', 'Consult energy code (IECC 2021 adopted in TX) before specifying'] },
    'New Construction': { requirement: 'Class II vapor retarder at roof deck (spray foam system)', placement: 'Roof deck interior face. Spray foam is the dominant solution for DFW conditioned attic assemblies.', warnings: ['Code requires specific assembly details for unvented attics — verify with local AHJ', 'Insufficient vapor control causes condensation on DFW roof sheathing from interior moisture'] },
    'Renovation / Upgrade': { requirement: 'Add closed-cell spray foam if converting to conditioned attic', placement: 'Apply to underside of roof deck, not attic floor.', warnings: ['Converting from vented to conditioned attic requires permits in most DFW municipalities', 'Existing bath/kitchen exhaust ducts must be rerouted to exterior before conversion'] },
    'Moisture Problem Investigation': { requirement: 'Inspect for missing or inadequate vapor retarder at roof deck', placement: 'Look for condensation, staining, or mold on roof sheathing interior face.', warnings: ['DFW summer humidity entering a poorly sealed conditioned attic causes rapid sheathing damage', 'Check all HVAC penetrations and duct connections in conditioned attic'] },
  },
  'Basement / Slab Edge': {
    'Encapsulation / Sealing': { requirement: 'Slab-edge vapor barrier (6-mil min under slab)', placement: 'Under concrete slab, continuous with foundation wall barrier.', warnings: ['DFW has few basements but slab-on-grade is dominant — ensure under-slab poly is spec\’d in all new construction', 'DFW expansive clay causes slab movement — use thick reinforced poly (10-mil+)'] },
    'New Construction': { requirement: '10-mil poly under slab, continuous', placement: 'Lay over compacted gravel base, lap 12″ at seams, tape all laps.', warnings: ['DFW clay soil holds moisture — under-slab barrier is critical', 'Spec crushed stone capillary break layer under poly'] },
    'Renovation / Upgrade': { requirement: 'Interior drainage mat + vapor barrier if retrofitting', placement: 'Install against interior wall face if adding interior moisture management.', warnings: ['Retrofitting slab vapor barriers is impractical — focus on drainage and interior coatings', 'Address grading and downspout extensions before interior moisture control'] },
    'Moisture Problem Investigation': { requirement: 'Test slab moisture emission rate before flooring installation', placement: 'N/A — use calcium chloride or RH probe test.', warnings: ['DFW slabs frequently show high moisture emission in spring — test before installing hardwood or LVP', 'High readings (>3 lb/24hr) require topical moisture mitigation before flooring'] },
  },
  'Exterior Wall Assembly': {
    'Encapsulation / Sealing': { requirement: 'House wrap (weather-resistive barrier) — no interior poly vapor barrier', placement: 'DFW Climate Zone 3: vapor retarder on warm side = exterior. Use house wrap on exterior sheathing. No poly on interior.', warnings: ['Installing interior poly vapor barrier in DFW walls traps moisture and causes rot', 'DFW is mixed-humid — walls must dry to the interior; interior vapor barriers prevent this', 'Use latex paint as Class III vapor retarder on drywall interior'] },
    'New Construction': { requirement: 'House wrap (Tyvek or equivalent) on exterior sheathing', placement: 'Exterior face of sheathing, under cladding. Tape all seams. Flash all openings.', warnings: ['No interior vapor barrier in DFW walls', 'Ensure proper integration with window and door flashing — DFW storms drive rain at high angles'] },
    'Renovation / Upgrade': { requirement: 'Verify existing house wrap before adding exterior insulation', placement: 'If adding continuous exterior insulation, install new house wrap at exterior insulation face.', warnings: ['Adding exterior rigid foam changes the moisture drying direction — verify wall assembly before adding insulation', 'DFW walls rarely need interior vapor barriers even after exterior insulation upgrades'] },
    'Moisture Problem Investigation': { requirement: 'Check for missing or damaged house wrap', placement: 'Inspect at window corners, penetrations, and butt joints in siding.', warnings: ['DFW bulk water intrusion at windows is far more common than vapor diffusion problems', 'Check caulk at window perimeters annually — DFW thermal cycling degrades caulk fast'] },
  },
};

export default function DFWVaporBarrierGuide() {
  const [area, setArea] = useState('');
  const [project, setProject] = useState('');

  const result = area && project ? results[area]?.[project] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>💧 DFW Moisture Guide</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.25′ }}>Vapor Barrier Guide for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', lineHeight: '1.6′ }}>
          DFW is a mixed-humid climate (IECC Zone 3). Unlike northern states, vapor barriers belong on the warm side — which is almost always the exterior or ground side, not interior walls. Installing poly on interior walls in DFW is one of the most common moisture mistakes and causes rot, mold, and structural damage.
        </p>

        <div style={{ backgroundColor: '#111E35', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#F5E642′ }}>⚙️ Get Your DFW Vapor Barrier Requirement</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Home Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select area...</option>
                {homeAreas.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Project Type</label>
              <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select project type...</option>
                {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Requirement & Placement</div>
            <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{result.requirement}</div>
            <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '14px', marginBottom: '16px' }}>{result.placement}</p>
            <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: '14px' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px' }}>⚠️ DFW-Specific Warnings</div>
              {result.warnings.map((w, i) => (
                <div key={i} style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '6px', paddingLeft: '12px', borderLeft: '2px solid #F5E642′ }}>{w}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '🌡️', title: 'Mixed-Humid Climate Rule', body: 'In DFW (Zone 3), moisture drives inward in summer and outward in winter. Walls must be able to dry in both directions. Interior vapor barriers prevent drying to the interior and are the #1 cause of wall rot in DFW.' },
            { icon: '🏚️', title: 'Crawl Space Encapsulation', body: 'Encapsulating a DFW crawl space with 20-mil poly dramatically reduces moisture, improves air quality, and protects floor framing. It is one of the highest-ROI moisture improvements for DFW slab-free homes.' },
            { icon: '📋', title: 'Code Reference', body: 'Texas has adopted IECC 2021. For Zone 3, the code requires a Class III vapor retarder or no vapor retarder in most wall assemblies. Always verify with your local AHJ before specifying products.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111E35', borderRadius: '10px', padding: '20px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>{card.icon}</div>
              <div style={{ fontWeight: '600', marginBottom: '6px' }}>{card.title}</div>
              <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
