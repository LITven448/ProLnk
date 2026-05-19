import { useState } from 'react';

const OUTDOOR_APPS = ['Pool Deck', 'Covered Patio', 'Exposed Patio', 'Outdoor Kitchen', 'Steps/Entry', 'Balcony/Deck'];
const DFW_EXPOSURES = ['Full DFW Sun', 'Wet DFW Surfaces', 'Heavy Foot Traffic', 'Low Maintenance', 'Resale Value'];

const tileMatrix: Record<string, Record<string, { spec: string; slipRating: string; installNote: string; why: string }>> = {
  'Pool Deck': {
    'Full DFW Sun': { spec: 'Light Porcelain, Class 4+, PEI 4, Frost-Rated (optional in DFW)', slipRating: 'COF 0.60+ wet (DCOF)', installNote: 'Set with flexible modified mortar. DFW pool slabs move -- rigid thinset cracks.', why: 'Pool decks in DFW face 240+ days of direct UV and heat. Light porcelain with Class 4 porosity rating stays cool and resists chemical damage from pool water.' },
    'Wet DFW Surfaces': { spec: 'Textured Porcelain or Travertine, COF 0.60+ wet', slipRating: 'DCOF 0.60 minimum -- ADA requirement for pool decks', installNote: 'Slope 1/8″ per foot away from pool. DFW pool decks must drain fast to reduce slip risk.', why: 'Wet pool deck + DFW thunderstorms create extreme slip hazard. Anything below DCOF 0.60 is a liability in DFW pool installations.' },
    'Heavy Foot Traffic': { spec: 'Porcelain Paver, PEI 5, Minimum 20mm Thick', slipRating: 'DCOF 0.60+', installNote: 'Raised paver system on DFW pool deck handles traffic and allows drainage underneath.', why: 'Pool decks carry furniture, parties, and daily traffic. PEI 5 porcelain at 20mm handles DFW traffic volume without surface wear.' },
    'Low Maintenance': { spec: 'Glazed Porcelain (Non-Porous), Light Color', slipRating: 'DCOF 0.50+ (covered areas only)', installNote: 'No sealing required with glazed porcelain. DFW hard water wipes off completely.', why: 'Unglazed travertine absorbs DFW pool chemicals and hard water. Glazed porcelain requires zero sealing and resists everything.' },
    'Resale Value': { spec: 'Travertine Paver (12x12 or 16x16), Filled and Sealed', slipRating: 'DCOF 0.50+ after sealing', installNote: 'Seal travertine every 1-2 years in DFW pool environment. Hard water attacks unsealed travertine aggressively.', why: 'Travertine pool deck is the #1 DFW luxury pool feature buyers respond to. ROI on travertine pool deck exceeds almost any other outdoor tile investment.' },
  },
  'Covered Patio': {
    'Full DFW Sun': { spec: 'Porcelain Wood-Look Plank, PEI 4, Class 3-4', slipRating: 'DCOF 0.42+ (covered, less wet risk)', installNote: 'Covered DFW patios still get afternoon sun at low angles. Choose UV-stable glazing.', why: 'Wood-look porcelain on covered DFW patios is the hottest outdoor tile trend. UV-stable glaze holds color even with indirect DFW sun.' },
    'Wet DFW Surfaces': { spec: 'Textured Porcelain, Class 4, DCOF 0.42+', slipRating: 'DCOF 0.42+ for covered areas -- rain blows in', installNote: 'DFW storms drive rain under most coverings. Install with positive slope and drain.', why: 'Even covered DFW patios get wet in storms. Minimum DCOF 0.42 for any outdoor space where rain can reach.' },
    'Heavy Foot Traffic': { spec: 'Porcelain, PEI 4-5, Large Format (18x18 or 24x24)', slipRating: 'DCOF 0.42+', installNote: 'Large format tiles reduce grout lines -- less DFW clay gets trapped in joints.', why: 'Covered patio takes daily foot traffic. Large format PEI 4 handles DFW party load without wear marks.' },
    'Low Maintenance': { spec: 'Glazed Large Format Porcelain, PEI 4', slipRating: 'DCOF 0.42+', installNote: 'Use large format to minimize DFW grout cleaning. Sealed grout further reduces maintenance.', why: 'Covered patio tile should be the easiest surface on the property to maintain. Large glazed porcelain with sealed grout achieves this in DFW.' },
    'Resale Value': { spec: 'Natural Stone-Look Porcelain (Travertine or Limestone Pattern)', slipRating: 'DCOF 0.42+', installNote: 'Larger formats (18x18 minimum) for DFW covered patio resale appeal.', why: 'Natural stone-look covered patios photograph well and read as luxury to DFW buyers scanning listings online.' },
  },
  'Exposed Patio': {
    'Full DFW Sun': { spec: 'Porcelain, Class 5, PEI 5, Light Color, DCOF 0.60+', slipRating: 'DCOF 0.60+ -- exposed patios get rain constantly in DFW', installNote: 'Flexible modified mortar mandatory. Expansion joints every 10-12 feet on exposed DFW patio slabs.', why: 'Exposed DFW patios face maximum UV, rain, heat, and clay movement stress simultaneously. Class 5 porcelain is the only tile specification that survives all four.' },
    'Wet DFW Surfaces': { spec: 'Textured/Grip Porcelain, Class 4-5, DCOF 0.60+', slipRating: 'DCOF 0.60 minimum -- DFW thunderstorms create instant flood conditions', installNote: 'Slope 1/4″ per foot minimum on exposed DFW patios. Fast drainage prevents DFW standing water.', why: 'DFW summer storms drop 2-4 inches of rain in an hour. Exposed patio tile that does not drain fast enough becomes a slip hazard immediately.' },
    'Heavy Foot Traffic': { spec: 'Porcelain Paver 20mm, PEI 5, Frost-Not-Required in DFW', slipRating: 'DCOF 0.60+', installNote: '20mm pavers can be mortar-set or raised-pedestal system. Raised system handles DFW drainage better.', why: 'Heavy-use exposed patios need 20mm thickness. Standard 10mm tile chips under furniture legs and DFW clay soil pressure events.' },
    'Low Maintenance': { spec: 'Dark Textured Porcelain, Class 4-5, PEI 4-5', slipRating: 'DCOF 0.60+', installNote: 'Pressure wash annually. No sealing required on Class 4-5 porcelain -- DFW hard water and pollen wipe clean.', why: 'Dark textured porcelain on exposed DFW patios hides pollen, clay, and soot between annual pressure washings.' },
    'Resale Value': { spec: 'Large Format Porcelain (24x24 or 24x48), Stone-Look, Class 5', slipRating: 'DCOF 0.60+', installNote: 'Large format requires very flat DFW slab (3/16″ in 10ft). Level slab before install.', why: 'Large format stone-look exposed patios are a DFW listing photograph upgrade. Buyers see luxury outdoor living immediately.' },
  },
  'Outdoor Kitchen': {
    'Full DFW Sun': { spec: 'Porcelain, Class 4-5, PEI 5, Heat-Resistant Glaze', slipRating: 'DCOF 0.42+ (area near grill)', installNote: 'Keep tile minimum 12 inches from direct grill flame. Use heat-rated grout near cooking area.', why: 'DFW outdoor kitchen counters and floors face UV and grill radiant heat simultaneously. Class 4-5 porcelain handles both without color shift.' },
    'Wet DFW Surfaces': { spec: 'Textured Porcelain Counter/Floor, Class 4, DCOF 0.42+', slipRating: 'DCOF 0.42+ for floor areas', installNote: 'Counter tile joints must be food-safe epoxy grout -- outdoor kitchens accumulate grease and DFW dust.', why: 'Outdoor kitchen counters in DFW get rain, grease, and dust simultaneously. Epoxy grout is the only joint material that handles all three.' },
    'Heavy Foot Traffic': { spec: 'Porcelain Floor Tile PEI 5, Counter Tile PEI 3+ (less traffic)', slipRating: 'DCOF 0.42+ floors', installNote: 'Separate spec for counter (wall tile grade) vs floor (floor tile grade).', why: 'DFW outdoor kitchen floors carry foot traffic and equipment. PEI 5 floor tile handles it. Counter tile sees less abrasion -- PEI 3 is sufficient.' },
    'Low Maintenance': { spec: 'Full-Body Porcelain, Class 4-5, Epoxy Grout Throughout', slipRating: 'DCOF 0.42+', installNote: 'Epoxy grout eliminates all sealing maintenance in DFW outdoor kitchen environment.', why: 'Outdoor kitchen grout is the hardest maintenance challenge in DFW outdoor spaces. Epoxy grout eliminates the problem entirely.' },
    'Resale Value': { spec: 'Stacked Stone Accent + Large Format Porcelain Counter/Floor', slipRating: 'DCOF 0.42+', installNote: 'Stacked stone accent wall behind grill photographs extremely well.', why: 'DFW outdoor kitchen with tile counter, floor, and stacked stone accent is a top-3 listing feature for buyers. Highest ROI outdoor feature in DFW.' },
  },
  'Steps/Entry': {
    'Full DFW Sun': { spec: 'Porcelain with Bullnose Trim, PEI 5, Light-Medium Color', slipRating: 'DCOF 0.60+ on treads', installNote: 'Bullnose or pencil-edge trim at step nosing -- no sharp tile edges on DFW exterior steps.', why: 'DFW entry steps face maximum UV exposure and DFW clay foot traffic daily. PEI 5 with bullnose trim is the only specification that handles both safely.' },
    'Wet DFW Surfaces': { spec: 'Grip-Surface Porcelain, DCOF 0.65+ on Step Treads', slipRating: 'DCOF 0.65+ minimum -- steps are highest liability wet surface', installNote: 'Apply anti-slip coating if existing tile does not meet DCOF 0.60. DFW thunderstorms arrive without warning.', why: 'Wet steps are the highest liability surface in DFW exterior tile work. DCOF 0.65 gives safety margin above code minimum for DFW rain events.' },
    'Heavy Foot Traffic': { spec: 'Porcelain Paver 20mm, PEI 5, with Carborundum Anti-Slip Strip', slipRating: 'DCOF 0.60+ with carborundum strip at nosing', installNote: 'Carborundum strips embedded in front edge of tread are industry standard for high-traffic DFW entry steps.', why: 'High-traffic DFW entry steps chip thin tile at the nosing. 20mm porcelain with embedded slip strip is contractor-grade for DFW commercial and residential.' },
    'Low Maintenance': { spec: 'Dark Textured Porcelain, PEI 5, Sealed Grout', slipRating: 'DCOF 0.60+', installNote: 'Dark steps hide DFW clay track-in. Sealed grout prevents clay embedding in joints.', why: 'DFW entry steps collect red clay constantly. Dark textured tile hides it between weekly sweeping.' },
    'Resale Value': { spec: 'Natural Stone-Look Porcelain (Limestone or Travertine Pattern) with Matching Coping', slipRating: 'DCOF 0.60+', installNote: 'Match entry step tile to porch tile for seamless visual flow -- DFW buyers notice continuity.', why: 'Continuous tile from driveway through entry steps through porch is a DFW luxury curb appeal hallmark. Buyers remember it.' },
  },
  'Balcony/Deck': {
    'Full DFW Sun': { spec: 'Porcelain Paver 20mm, Raised Pedestal System, Class 5, Light Color', slipRating: 'DCOF 0.60+', installNote: 'Raised pedestal allows drainage -- critical for DFW waterproofing membrane protection.', why: 'DFW balconies with tile set directly on membrane frequently fail. Raised pedestal tile is the industry-standard DFW balcony solution -- drains, no trapped moisture.' },
    'Wet DFW Surfaces': { spec: 'Raised Porcelain Paver, Textured, DCOF 0.60+', slipRating: 'DCOF 0.60+ -- balconies collect DFW rain with no runoff area', installNote: 'Positive drain to scupper or downspout required. DFW balcony must drain within minutes after rain.', why: 'Balconies have no grade to help drainage. DFW rain must drain through raised paver gaps or via positive slope to scupper.' },
    'Heavy Foot Traffic': { spec: 'Porcelain Paver 20mm, PEI 5', slipRating: 'DCOF 0.60+', installNote: 'Check structural loading before installing heavy 20mm pavers on DFW balconies. Consult engineer.', why: 'Standard tile is too fragile for DFW balcony furniture and foot traffic. 20mm paver is rated for this load category.' },
    'Low Maintenance': { spec: 'Porcelain Paver on Raised System (No Grout, No Sealing)', slipRating: 'DCOF 0.60+', installNote: 'Gapped raised paver system has zero grout -- only maintenance is occasional sweep.', why: 'Raised paver system on DFW balcony has literally no grout joints. Zero sealing, zero weeding, zero ant invasion.' },
    'Resale Value': { spec: 'Wood-Look Porcelain Paver, 20mm, Raised System', slipRating: 'DCOF 0.60+', installNote: 'Wood-look on balcony photographs as premium outdoor living space in DFW listings.', why: 'DFW condo and townhome buyers pay premium for tiled balconies. Wood-look porcelain gives warmth buyers want with zero rot risk.' },
  },
};

export default function DFWOutdoorTileGuide() {
  const [app, setApp] = useState('');
  const [exp, setExp] = useState('');
  const result = app && exp ? tileMatrix[app]?.[exp] : null;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Outdoor Tile Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🌿 DFW Outdoor Tile Specification Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: '2rem', lineHeight: 1.6 }}>DFW outdoor tile failures are almost always the wrong porosity class or slip rating. Class 4-5 porosity is mandatory outdoors. DCOF 0.60 wet rating is required for pool and exposed surfaces. Select your outdoor application and DFW exposure type.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Outdoor Application</div>
            {OUTDOOR_APPS.map(a => (
              <button key={a} onClick={() => setApp(a)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: app === a ? '#F5E642′ : '#0D1E3A', color: app === a ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: app === a ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: ’pointer', textAlign: 'left', fontWeight: app === a ? 700 : 400, transition: 'all 0.2s' }}>{a}</button>
            ))}
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Exposure / Priority</div>
            {DFW_EXPOSURES.map(e => (
              <button key={e} onClick={() => setExp(e)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: exp === e ? '#F5E642′ : '#0D1E3A', color: exp === e ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: exp === e ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: ’pointer', textAlign: 'left', fontWeight: exp === e ? 700 : 400, transition: 'all 0.2s' }}>{e}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ background: '#0D1E3A', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>✅ DFW Outdoor Tile Specification</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>{result.spec}</div>
            <div style={{ color: '#8899BB', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>💡 {result.why}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>SLIP RATING REQUIRED</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.85rem' }}>{result.slipRating}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>INSTALL NOTE</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.85rem' }}>{result.installNote}</div>
              </div>
            </div>
          </div>
        )}
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.25rem', border: '1px solid #1C2E4A' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📋 DFW Outdoor Tile Specification Minimums</div>
          {['Class 1-2 tile is interior only -- NEVER use outdoors in DFW regardless of what the box says.', 'Class 3 is acceptable only on covered DFW patios with minimal rain exposure.', 'Class 4 is the DFW outdoor standard for most exposed applications.', 'Class 5 is required for pool decks, steps, and high-traffic exposed DFW surfaces.', 'DCOF 0.42 minimum for covered outdoor; DCOF 0.60 minimum for wet DFW surfaces.', 'Frost rating is rarely critical in DFW but Class 4-5 porcelain is frost-rated by default.'].map((tip, i) => (
            <div key={i} style={{ color: '#8899BB', fontSize: '0.875rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
