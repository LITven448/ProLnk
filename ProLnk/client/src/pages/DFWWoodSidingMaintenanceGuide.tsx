import { useState } from 'react';

const sidingTypes = ['Painted Wood Lap Siding', 'Cedar Shingles / Shakes', 'Engineered Wood (LP SmartSide, etc.)', 'Tongue & Groove Wood Siding', 'Board & Batten Wood'];
const sunExposures = ['Full Sun — South or West Facing', 'Partial Sun — East Facing', 'Shade — North Facing', 'Mixed Exposure (Multiple Orientations)'];

type Result = { paintSchedule: string; primer: string; inspection: string[]; recommendation: string };
type ResultMap = Record<string, Record<string, Result>>;

const results: ResultMap = {
  'Painted Wood Lap Siding': {
    'Full Sun — South or West Facing': { paintSchedule: 'Repaint every 3–4 years on south/west faces; 5–6 years on other sides', primer: '100% acrylic primer required before every repaint; oil-based primer for bare or problem wood', inspection: ['Check lap joints for paint separation and moisture infiltration annually', 'Probe bottom edges of boards for soft spots (wood rot indicator)', 'Look for cupping or warping — common on DFW south-facing lap siding', 'Inspect caulk at window/door trim intersections each spring'], recommendation: 'DFW\’s south and west sun destroys paint on wood lap siding faster than nearly any U.S. market. South/west faces should be repainted on a 3–4 year cycle with quality 100% acrylic latex. Primer is non-negotiable — skipping primer causes early adhesion failure on DFW wood siding.' },
    'Partial Sun — East Facing': { paintSchedule: 'Repaint every 5–6 years', primer: '100% acrylic primer required; fewer coats needed on east-facing surfaces', inspection: ['Inspect for mildew at bottom edges — east siding stays damp longer in DFW mornings', 'Check for paint blistering (early moisture sign)', 'Probe bottom boards for rot annually'], recommendation: 'East-facing DFW wood lap siding gets morning sun and afternoon shade — moderate conditions. Still needs 100% acrylic paint and priming, but repainting cycle extends to 5–6 years. Watch for mildew on lower courses.' },
    'Shade — North Facing': { paintSchedule: 'Repaint every 6–8 years', primer: '100% acrylic primer; mildewcide additive recommended', inspection: ['North-facing wood siding in DFW rarely dries fully — inspect for mildew and algae growth annually', 'Check for paint peeling caused by moisture (not UV) on shaded siding', 'Probe all boards for soft spots — moisture rot more common than UV damage on north faces'], recommendation: 'North-facing DFW wood lap siding lasts longer between paint cycles but is more vulnerable to mildew and moisture-driven rot. Use paint with mildewcide. Inspect twice yearly — spring and fall.' },
    'Mixed Exposure (Multiple Orientations)': { paintSchedule: 'Repaint south/west every 3–4 years; north/east every 6–7 years', primer: 'Spot-prime all bare wood; full prime coat on south/west surfaces before repaint', inspection: ['Prioritize south and west face inspection and maintenance', 'Maintain separate repainting schedule for different facades', 'Look for uneven weathering as indicator of inconsistent maintenance'], recommendation: 'DFW homes with wood lap siding on multiple orientations need a facade-by-facade maintenance approach. South and west sides require far more frequent attention than north and east. Develop a staggered schedule rather than painting the whole house at once.' },
  },
  'Cedar Shingles / Shakes': {
    'Full Sun — South or West Facing': { paintSchedule: 'Recoat stain or paint every 2–4 years on south/west; 4–6 years on other sides', primer: 'Oil-based primer for bare cedar; DFW tannin bleed requires stain-blocking primer', inspection: ['Check for split, cracked, or missing shingles annually before storm season', 'Inspect for tannin staining (brown streaks) indicating moisture wicking', 'Look for nail pops — DFW thermal cycling causes more nail movement than most markets', 'Probe edges and bottom courses for rot annually'], recommendation: 'Cedar shingles in DFW full sun are demanding — UV fades finish rapidly and wood expands and contracts with extreme temperature swings. Use penetrating semi-transparent stain rather than film-forming paint for better longevity. Stain every 2–4 years on DFW south/west faces.' },
    'Partial Sun — East Facing': { paintSchedule: 'Recoat stain every 4–5 years', primer: 'Stain-blocking oil-based primer on bare cedar', inspection: ['Check for mildew growth at lower courses — east exposure stays wet longer in DFW', 'Inspect mortar and caulk at trim intersections', 'Look for individual failed shingles to replace before moisture infiltrates sheathing'], recommendation: 'East-facing cedar shingles in DFW see moderate conditions. Semi-transparent stain lasts 4–5 years. Mildew is the primary concern — add mildewcide to stain or use a product with built-in mildew resistance.' },
    'Shade — North Facing': { paintSchedule: 'Recoat stain every 5–7 years; inspect for mildew annually', primer: 'Stain-blocking primer with mildewcide', inspection: ['North-facing cedar shingles develop mildew and algae fastest in DFW — annual inspection required', 'Look for black or green discoloration as early mildew indicators', 'Check for soft or spongy shingles — moisture damage without UV warning signs'], recommendation: 'North-facing cedar shingles in DFW are mold and rot prone. Stain or paint lasts longer without UV but moisture is the enemy. Use a semi-solid stain with mildewcide on north faces and inspect twice per year.' },
    'Mixed Exposure (Multiple Orientations)': { paintSchedule: 'Staggered by facade: south/west 2–4 years; north/east 5–7 years', primer: 'Prime all bare cedar with stain-blocking oil-based primer regardless of orientation', inspection: ['Walk each facade separately at annual inspection — damage patterns differ significantly', 'Priority: inspect south and west faces every spring before storm season', 'Replace individual failed shingles rather than waiting for full recoat cycle'], recommendation: 'Manage cedar shingle DFW homes facade by facade. South and west shingles fail faster from UV and heat; north shingles fail from moisture. Different threats require different maintenance timing.' },
  },
  'Engineered Wood (LP SmartSide, etc.)': {
    'Full Sun — South or West Facing': { paintSchedule: 'Repaint every 4–6 years on south/west', primer: 'Factory-primed products still need full prime coat if bare; use 100% acrylic exterior primer', inspection: ['Check all caulked joints at factory seams and butt ends — DFW thermal cycling opens engineered wood joints', 'Inspect bottom cut edges — must remain sealed or engineered wood absorbs moisture and swells', 'Look for paint blistering or delamination at seams', 'Check for swelling at bottom courses from irrigation overspray'], recommendation: 'Engineered wood like LP SmartSide performs well in DFW but has specific vulnerabilities. All cut edges and butt joints must remain caulked and painted — any exposed engineered wood edge in DFW will absorb moisture and fail. Repaint south/west every 4–6 years with quality 100% acrylic latex.' },
    'Partial Sun — East Facing': { paintSchedule: 'Repaint every 6–7 years', primer: '100% acrylic primer; maintain all cut edge caulking regardless of exposure', inspection: ['Inspect all butt joints and caulked seams annually', 'Check for moisture swelling at joints — early stage failure in engineered wood', 'Verify bottom courses are not in contact with soil or mulch'], recommendation: 'Engineered wood on east-facing DFW walls is lower-maintenance than south/west faces. Focus annual inspection on joint integrity and paint adhesion at seams.' },
    'Shade — North Facing': { paintSchedule: 'Repaint every 7–8 years', primer: '100% acrylic primer; mildewcide additive beneficial', inspection: ['North-facing engineered wood accumulates mildew at joints — inspect annually', 'Check for paint peeling from moisture rather than UV', 'Keep vegetation trimmed back from north-facing siding to reduce moisture retention'], recommendation: 'Engineered wood on shaded DFW north walls lasts longer between paint cycles but check joints for moisture infiltration. Mildew on paint is common — use paint with mildewcide and ensure good drainage and airflow at base of siding.' },
    'Mixed Exposure (Multiple Orientations)': { paintSchedule: 'Prioritize south/west: repaint every 4–6 years. North/east: every 6–8 years', primer: 'Prime all exposed cut edges regardless of facade orientation', inspection: ['Annual inspection of all butt joint caulking is the most critical task for DFW engineered wood', 'Mark and repair any open joints immediately — engineered wood fails fast once moisture infiltrates', 'Check base of siding for mulch contact or soil grade issues'], recommendation: 'Engineered wood in DFW is highly schedule-dependent — joint failures from skipped maintenance lead to costly panel replacement. Build a rigorous annual inspection routine covering all facades.' },
  },
  'Tongue & Groove Wood Siding': {
    'Full Sun — South or West Facing': { paintSchedule: 'Repaint every 3–5 years on south/west', primer: 'Oil-based primer on bare wood; 100% acrylic prime coat before full repaint', inspection: ['Check groove channels for paint bridging that traps moisture — must be kept open', 'Inspect for cupping or pulling apart at tongue-groove joints from DFW thermal expansion', 'Probe all boards for soft spots — critical at south/west base courses', 'Look for paint cracking along groove lines — common DFW failure pattern'], recommendation: 'Tongue and groove wood siding in DFW full sun requires frequent maintenance. The grooves are moisture traps if paint bridges across them. DFW heat causes significant movement at joints. Keep grooves open, repaint on a 3–5 year cycle, and probe for rot at base boards annually.' },
    'Partial Sun — East Facing': { paintSchedule: 'Repaint every 5–6 years', primer: '100% acrylic primer required; mildewcide additive for east-facing lower courses', inspection: ['Inspect groove channels for trapped moisture and mildew', 'Check paint adhesion at tongue-groove joints annually', 'Look for early swelling or cupping indicators'], recommendation: 'East-facing tongue and groove DFW siding is moderate-maintenance. Paint lasts 5–6 years. Monitor groove channels for mildew, which develops faster on east faces that stay wet in DFW mornings.' },
    'Shade — North Facing': { paintSchedule: 'Repaint every 6–8 years', primer: '100% acrylic primer with mildewcide', inspection: ['North-facing T&G siding in DFW is high mildew risk — inspect channels quarterly', 'Look for black or green mold in grooves as early failure indicator', 'Probe for soft wood — rot without UV warning signs is common on north faces'], recommendation: 'North-facing tongue and groove DFW siding needs mildewcide in every coat and annual inspection of grooves for trapped moisture. Wood rot develops silently without UV-driven paint failure as a warning.' },
    'Mixed Exposure (Multiple Orientations)': { paintSchedule: 'South/west: 3–5 years. North/east: 6–8 years', primer: 'Prime all bare wood; maintain groove channels across all facades', inspection: ['Develop facade-specific inspection notes — T&G failure modes differ by orientation in DFW', 'South/west: look for UV paint failure. North: look for mold. East: look for both', 'Keep a photo log of groove condition for comparison year-over-year'], recommendation: 'Managing tongue and groove siding on a DFW home requires facade-specific attention. UV damage drives south/west failures; moisture drives north failures. Inspect and maintain each side on its own cycle.' },
  },
  'Board & Batten Wood': {
    'Full Sun — South or West Facing': { paintSchedule: 'Repaint every 3–5 years on south/west; inspect batten caulking annually', primer: 'Oil-based primer on bare wood; 100% acrylic primer coat on all surfaces before repaint', inspection: ['Inspect batten-to-board joints for caulk failure — DFW thermal cycling opens these joints yearly', 'Probe behind battens at base for moisture and rot — common DFW failure point', 'Check top edge of each batten for paint failure and water entry', 'Look for batten warping or cupping from DFW heat cycles'], recommendation: 'Board and batten wood siding in DFW full sun requires attention to the batten joints specifically. Caulk at batten edges dries out in DFW UV and heat, opening gaps for water entry behind the batten where rot develops invisibly. Inspect and recaulk annually; repaint south/west every 3–5 years.' },
    'Partial Sun — East Facing': { paintSchedule: 'Repaint every 5–6 years', primer: '100% acrylic primer; check all batten caulk before priming', inspection: ['Inspect all batten caulking annually — east faces stay wet and batten joints are prone to mildew', 'Check for moisture wicking at batten bases and where battens meet trim'], recommendation: 'East-facing board and batten in DFW requires annual batten caulk inspection. Mildew at batten edges is the primary concern — use mildewcide paint on east faces and keep all joints caulked.' },
    'Shade — North Facing': { paintSchedule: 'Repaint every 6–8 years; recaulk battens every 3–4 years', primer: '100% acrylic primer with mildewcide', inspection: ['North-facing batten joints in DFW accumulate mildew — inspect quarterly', 'Probe behind battens at base for hidden rot — most common on shaded north faces', 'Trim vegetation away from north board and batten to improve drying'], recommendation: 'North-facing board and batten in DFW has the highest rot risk of all exposures. Hidden moisture accumulates behind battens where it stays damp. Probe behind battens at base annually and recaulk batten edges on a 3–4 year cycle.' },
    'Mixed Exposure (Multiple Orientations)': { paintSchedule: 'Recaulk all battens every 3–4 years regardless of facade. Repaint south/west 3–5 years; north/east 6–8 years', primer: 'Prime all bare wood; inspect all batten caulking before each paint cycle', inspection: ['Annual batten caulk inspection is the single highest-value maintenance task for DFW board and batten', 'Prioritize south/west face probing for rot; north face for mold', 'Keep a batten-by-batten record of caulk condition for large homes'], recommendation: 'Board and batten in DFW requires consistent batten caulk maintenance across all facades. The batten-to-board joint is where DFW weather does the most invisible damage. Recaulk on a 3–4 year cycle and your wood siding will last 30+ years.' },
  },
};

export default function DFWWoodSidingMaintenanceGuide() {
  const [siding, setSiding] = useState('');
  const [sun, setSun] = useState('');

  const result = siding && sun ? results[siding]?.[sun] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '0.08em', textTransform: 'uppercase' }}>🪵 DFW Siding Guide</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.25′ }}>Wood Siding Maintenance Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '28px', lineHeight: '1.6′ }}>
          DFW's UV intensity and humidity swings are especially harsh on wood siding. Paint fails 2–3x faster on south and west faces than in northern markets. A structured maintenance schedule — painting every 3–5 years, annual inspection, and timely caulk repair — can make wood siding last 30+ years in DFW’s climate.
        </p>

        <div style={{ backgroundColor: '#111E35', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#F5E642′ }}>⚙️ Get Your DFW Maintenance Schedule</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Wood Siding Type</label>
              <select value={siding} onChange={e => setSiding(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select siding type...</option>
                {sidingTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>DFW Sun Exposure</label>
              <select value={sun} onChange={e => setSun(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: '8px', color: '#E8EDF5', fontSize: '14px' }}>
                <option value=''>Select sun exposure...</option>
                {sunExposures.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid #F5E642′ }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ Maintenance Plan</div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: '#F5E642′ }}>🖌️ {result.paintSchedule}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '12px' }}><strong style={{ color: '#E8EDF5′ }}>Primer: </strong>{result.primer}</div>
            <p style={{ color: '#94A3B8', lineHeight: '1.6', fontSize: '14px', marginBottom: '16px' }}>{result.recommendation}</p>
            <div style={{ borderTop: '1px solid #1E3A5F', paddingTop: '14px' }}>
              <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px' }}>🔍 Annual Inspection Checklist</div>
              {result.inspection.map((item, i) => (
                <div key={i} style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '6px', paddingLeft: '12px', borderLeft: '2px solid #F5E642′ }}>{item}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {[
            { icon: '☀️', title: 'DFW UV Destroys Paint Faster Than Most Markets', body: 'DFW receives over 230 sunny days per year with UV Index regularly exceeding 10 in summer. South and west-facing wood siding can fail in as little as 3 years with standard exterior latex — use 100% acrylic paints rated for high-UV environments.' },
            { icon: '💧', title: 'Primer Is Not Optional in DFW', body: 'Primer locks down any bare wood and provides the adhesion base that makes topcoats last in DFW\’s thermal cycling. Many DFW paint failures trace to skipped primer. Oil-based primer is required for bare, stained, or problem wood — it blocks tannins that bleed through water-based primers.' },
            { icon: '🔍', title: 'Annual Wood Rot Inspection', body: 'Use a screwdriver or awl to probe suspect areas — healthy wood is firm, rotted wood gives with little pressure. DFW\’s wet springs followed by dry summers create conditions where rot can progress rapidly inside boards while the painted surface still looks intact.' },
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
