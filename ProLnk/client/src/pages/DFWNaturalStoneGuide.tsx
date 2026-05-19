import { useState } from 'react';

const STONE_TYPES = ['Travertine', 'Limestone', 'Slate', 'Granite', 'Marble', 'Quartzite'];
const DFW_APPLICATIONS = ['Interior Floor', 'Shower/Wet Area', 'Outdoor Patio', 'Kitchen Counter', 'Pool Deck', 'Fireplace Surround'];

const stoneMatrix: Record<string, Record<string, { durability: string; sealFreq: string; cost: string; dfwNotes: string }>> = {
  'Travertine': {
    'Interior Floor': { durability: 'Good -- soft stone (3-4 Mohs) scratches in DFW entry areas from grit and clay tracked in', sealFreq: 'Every 6-12 months', cost: '$8-15/sqft installed', dfwNotes: 'Fill all holes before sealing. DFW hard water (16-20 grains) etches unsealed travertine permanently. Use penetrating impregnating sealer -- topical sealers peel in DFW humidity.' },
    'Shower/Wet Area': { durability: 'Fair -- DFW hard water calcifies in travertine pits continuously. High maintenance shower stone.', sealFreq: 'Every 3-6 months in DFW showers', cost: '$12-20/sqft installed', dfwNotes: 'Squeegee after every use in DFW showers -- hard water etching is irreversible. Epoxy grout only -- standard grout discolors within months from DFW mineral deposits.' },
    'Outdoor Patio': { durability: 'Fair-Good -- travertine handles DFW UV but deteriorates on DFW clay soil (slab movement cracks soft stone)', sealFreq: 'Every 6-12 months outdoor', cost: '$14-22/sqft installed (pool deck)', dfwNotes: 'Pool deck travertine is DFW standard but requires religious sealing. DFW pool chemicals and hard water attack unsealed travertine aggressively. Seal before first use.' },
    'Kitchen Counter': { durability: 'Poor -- travertine is too soft for DFW kitchen use. Citrus, coffee, DFW hard water all etch it.', sealFreq: 'Every 3 months (still etches between sealings)', cost: '$20-35/sqft fabricated', dfwNotes: 'Do not recommend travertine kitchen counters in DFW. Granite or quartzite is far more appropriate. If client insists, seal constantly and avoid all acids.' },
    'Pool Deck': { durability: 'Good -- DFW standard for pool decks. Natural cooling properties ideal for barefoot DFW summers.', sealFreq: 'Every 6-12 months', cost: '$15-22/sqft installed', dfwNotes: 'Travertine pool deck stays 20-30 degrees cooler than concrete in DFW summer. Fill and seal all holes before first pool season. Reseal every spring.' },
    'Fireplace Surround': { durability: 'Excellent -- fireplaces have no UV, moisture, or DFW clay concerns. Travertine performs perfectly.', sealFreq: 'Every 2-3 years', cost: '$10-18/sqft installed', dfwNotes: 'Best DFW travertine application. No DFW environmental threats at interior fireplace. Beautiful natural look with minimal maintenance.' },
  },
  'Limestone': {
    'Interior Floor': { durability: 'Good-Fair -- limestone (2.5-3.5 Mohs) is softer than travertine. DFW grit scratches it quickly in traffic areas.', sealFreq: 'Every 6-12 months', cost: '$10-18/sqft installed', dfwNotes: 'DFW hard water is particularly damaging to limestone -- calcite in the stone reacts with DFW mineral deposits creating permanent staining. Seal aggressively.' },
    'Shower/Wet Area': { durability: 'Poor -- limestone and DFW hard water are chemically incompatible. Hard water etches limestone faster than any other stone.', sealFreq: 'Every 3 months -- and it still etches', cost: '$12-20/sqft installed', dfwNotes: 'DFW hard water (calcium and magnesium) reacts with limestone (calcium carbonate) creating complex staining that cannot be fully removed. Not recommended for DFW showers.' },
    'Outdoor Patio': { durability: 'Poor -- DFW acid rain (from car exhaust and industrial DFW air) dissolves limestone surface slowly. Outdoor limestone deteriorates.', sealFreq: 'Every 6 months outdoor -- still fades', cost: '$12-20/sqft installed', dfwNotes: 'DFW acid rain pH averages 5.0-5.5 -- limestone (pH-sensitive) gradually loses surface texture outdoors. Not recommended for DFW outdoor use without aggressive sealing plan.' },
    'Kitchen Counter': { durability: 'Poor -- limestone is the worst kitchen counter stone for DFW conditions. Etches from lemon, vinegar, and DFW hard water simultaneously.', sealFreq: 'Every 2-3 months (inadequate)', cost: '$20-35/sqft fabricated', dfwNotes: 'Advise against limestone kitchen counters in DFW. Every common kitchen substance in a DFW home attacks limestone. Client will regret this choice within 1 year.' },
    'Pool Deck': { durability: 'Poor -- pool chemicals and DFW hard water destroy limestone pool decks. Surface degrades within 2-3 seasons.', sealFreq: 'Every 3-6 months (still degrades)', cost: '$12-18/sqft installed', dfwNotes: 'Chlorine and DFW hard water together dissolve limestone at pool decks. Use travertine or porcelain instead. Limestone pool deck in DFW is a known failure category.' },
    'Fireplace Surround': { durability: 'Very Good -- fireplaces eliminate DFW moisture and acid concerns. Limestone performs beautifully at fireplace.', sealFreq: 'Every 2-3 years', cost: '$10-18/sqft installed', dfwNotes: 'Best limestone application in DFW is fireplace surround. Classic look, no chemical threats, easy maintenance. Seal once before use and enjoy.' },
  },
  'Slate': {
    'Interior Floor': { durability: 'Very Good -- slate (5-7 Mohs) resists DFW grit and clay tracked in. Natural cleft surface adds character.', sealFreq: 'Every 1-2 years', cost: '$8-15/sqft installed', dfwNotes: 'Slate natural cleft surface creates trip hazard concerns in DFW homes with elderly or mobility-impaired residents. Ground/gauged slate is safer but loses the natural look. Fill high spots.' },
    'Shower/Wet Area': { durability: 'Good -- slate resists DFW hard water better than travertine or limestone. Non-calcite stone does not etch from minerals.', sealFreq: 'Every 12 months', cost: '$12-20/sqft installed', dfwNotes: 'DFW hard water leaves white deposits on slate but does not etch it. Wipe down weekly. Seal annually with penetrating sealer. Avoid oil-based sealers in DFW humidity.' },
    'Outdoor Patio': { durability: 'Very Good -- slate handles DFW UV and clay soil movement well. Natural cleft surface provides excellent slip resistance.', sealFreq: 'Every 1-2 years', cost: '$10-18/sqft installed', dfwNotes: 'Natural cleft slate is one of the best DFW outdoor stones for slip resistance (natural DCOF exceeds 0.60 wet). Handles DFW temperature extremes without cracking.' },
    'Kitchen Counter': { durability: 'Good -- slate resists acid better than softer stones. DFW kitchen acids (citrus, vinegar) do not etch slate.', sealFreq: 'Every 1-2 years', cost: '$25-40/sqft fabricated', dfwNotes: 'Slate kitchen counters in DFW are durable but uncommon. Natural cleft makes cleaning harder. Honed slate is the practical DFW kitchen option -- smooth surface, acid-resistant.' },
    'Pool Deck': { durability: 'Good -- slate handles pool chemicals and DFW UV well. Natural slip resistance is excellent for wet pool deck.', sealFreq: 'Every 12 months', cost: '$12-20/sqft installed', dfwNotes: 'Slate pool deck in DFW performs well but natural cleft creates uneven surface that some clients find uncomfortable barefoot. Gauged slate solves this but costs more.' },
    'Fireplace Surround': { durability: 'Excellent -- slate at fireplace is a classic DFW design choice. Handles heat, requires no DFW-specific maintenance.', sealFreq: 'Every 3-5 years', cost: '$10-18/sqft installed', dfwNotes: 'Natural slate fireplace surround in DFW is zero-maintenance. No moisture, no UV, no acid. Heat from fireplace does not affect slate.' },
  },
  'Granite': {
    'Interior Floor': { durability: 'Excellent -- granite (6-7 Mohs) is the hardest common flooring stone. Handles all DFW floor traffic conditions without scratching.', sealFreq: 'Every 2-5 years', cost: '$12-20/sqft installed', dfwNotes: 'Granite is the most DFW-durable interior stone. DFW hard water, grit, clay -- nothing visibly damages sealed granite. Darker granites show DFW hard water deposits more than light granites.' },
    'Shower/Wet Area': { durability: 'Excellent -- granite resists DFW hard water etching completely. Non-calcite composition makes it chemically stable.', sealFreq: 'Every 1-2 years', cost: '$15-25/sqft installed', dfwNotes: 'Granite shower in DFW requires less maintenance than any other natural stone option. Seal annually. DFW hard water leaves deposits but does not etch or stain granite permanently.' },
    'Outdoor Patio': { durability: 'Excellent -- granite handles DFW UV, heat, acid rain, and clay soil movement better than any other natural stone.', sealFreq: 'Every 2-3 years outdoor', cost: '$15-25/sqft installed', dfwNotes: 'Most durable natural stone for DFW outdoor applications. UV does not fade granite color. DFW acid rain does not affect non-calcite granite. Seals moisture out for 2-3 year cycles.' },
    'Kitchen Counter': { durability: 'Excellent -- granite is the DFW kitchen counter gold standard. Resists all kitchen acids, heat, and DFW hard water.', sealFreq: 'Every 1-2 years', cost: '$40-80/sqft fabricated', dfwNotes: 'Granite kitchen counter in DFW is the most practical premium counter option. Sealing once per year is all it needs. Even with DFW hard water, maintenance is minimal compared to other stones.' },
    'Pool Deck': { durability: 'Excellent -- granite is technically the most durable pool deck stone for DFW. However it absorbs heat -- choose light colors.', sealFreq: 'Every 2-3 years', cost: '$18-30/sqft installed', dfwNotes: 'Dark granite pool decks in DFW reach unsafe temperatures. Light granite (white, cream, light gray) stays cooler. Flamed finish provides slip resistance -- mandatory for DFW pool decks.' },
    'Fireplace Surround': { durability: 'Excellent -- granite surround is the DFW premium fireplace standard. Handles heat indefinitely.', sealFreq: 'Every 3-5 years', cost: '$15-25/sqft installed', dfwNotes: 'Granite fireplace surround in DFW is the most popular natural stone surround sold. Durable, beautiful, easy to clean, no special DFW considerations needed.' },
  },
  'Marble': {
    'Interior Floor': { durability: 'Fair -- marble (3-4 Mohs) is softer and etches easily. DFW grit and hard water make marble floor maintenance constant.', sealFreq: 'Every 3-6 months', cost: '$15-25/sqft installed', dfwNotes: 'DFW hard water etches marble permanently within months on unsealed floors. Only viable in DFW with religious sealing schedule and immediate spill cleanup. Entry areas not recommended.' },
    'Shower/Wet Area': { durability: 'Poor -- marble and DFW hard water are the worst combination in stone selection. Calcite marble etches from DFW mineral water immediately.', sealFreq: 'Every 3 months -- still etches between sealings', cost: '$18-28/sqft installed', dfwNotes: 'White Carrara marble shower turns dull and stained in DFW within 6-12 months without constant maintenance. DFW water hardness makes marble shower maintenance a full-time job.' },
    'Outdoor Patio': { durability: 'Poor -- DFW acid rain, UV, and thermal cycles rapidly degrade marble outdoor. Not recommended for DFW exteriors.', sealFreq: 'Every 3-6 months (inadequate outdoors)', cost: '$15-25/sqft installed', dfwNotes: 'Marble outdoor in DFW is a known failure. Acid rain etches, UV fades, thermal expansion cracks marble faster than any other stone. Do not specify marble for DFW outdoor.' },
    'Kitchen Counter': { durability: 'Poor -- marble kitchen counters in DFW are beautiful for 6-12 months, then permanently marked by DFW hard water, lemon, and wine.', sealFreq: 'Every 3 months (insufficient)', cost: '$35-70/sqft fabricated', dfwNotes: 'Every DFW kitchen substance attacks marble -- citrus, wine, coffee, DFW hard water. Etching cannot be repaired without re-polishing. Advise clients this is a high-maintenance choice.' },
    'Pool Deck': { durability: 'Poor -- marble pool deck in DFW deteriorates rapidly from pool chemicals and DFW hard water. Not a viable DFW pool material.', sealFreq: 'Every 3 months (still fails)', cost: '$18-28/sqft installed', dfwNotes: 'Marble pool deck in DFW is not appropriate. Pool chlorine and DFW hard water together dissolve marble surface rapidly. Specify travertine or porcelain instead.' },
    'Fireplace Surround': { durability: 'Good -- fireplaces eliminate DFW moisture threats. Marble fireplace surround is viable but still etches from acidic fireplace ash.', sealFreq: 'Every 12 months', cost: '$18-30/sqft installed', dfwNotes: 'Best DFW marble application. Seal annually and wipe ash promptly to prevent etching. Classic luxury look with manageable maintenance in this one DFW application.' },
  },
  'Quartzite': {
    'Interior Floor': { durability: 'Excellent -- quartzite (7 Mohs) rivals granite in hardness. DFW grit and clay do not scratch quartzite floors.', sealFreq: 'Every 1-2 years', cost: '$15-25/sqft installed', dfwNotes: 'Quartzite is often confused with quartz (engineered) -- natural quartzite is a metamorphic stone that outperforms marble and limestone in DFW conditions. Verify stone is true quartzite, not soft limestone sold as quartzite.' },
    'Shower/Wet Area': { durability: 'Very Good -- quartzite resists DFW hard water etching far better than marble or limestone. Non-calcite quartzite is especially resistant.', sealFreq: 'Every 12 months', cost: '$18-28/sqft installed', dfwNotes: 'Quartzite shower in DFW is the natural stone alternative to granite for clients who want the marble look with better performance. Verify silica content is high -- some quartzite has calcite veining that etches.' },
    'Outdoor Patio': { durability: 'Excellent -- quartzite is one of the best DFW outdoor stones. UV-stable, acid-resistant, handles DFW thermal cycles.', sealFreq: 'Every 1-2 years', cost: '$18-28/sqft installed', dfwNotes: 'Quartzite outdoor in DFW outperforms limestone and marble dramatically. Handles DFW acid rain, UV, and heat without surface degradation. Natural cleft quartzite has built-in slip resistance.' },
    'Kitchen Counter': { durability: 'Excellent -- quartzite is the top natural stone choice for DFW kitchens. Hard, acid-resistant, beautiful.', sealFreq: 'Every 1-2 years', cost: '$45-90/sqft fabricated', dfwNotes: 'True quartzite kitchen counter in DFW handles everything marble cannot. Citrus, DFW hard water, heat -- quartzite resists all. Popular Super White and Taj Mahal quartzite are DFW top sellers.' },
    'Pool Deck': { durability: 'Very Good -- quartzite pool deck handles DFW pool chemicals and hard water better than softer stones.', sealFreq: 'Every 1-2 years', cost: '$18-28/sqft installed', dfwNotes: 'Natural cleft quartzite pool deck in DFW has excellent slip resistance and UV stability. Cooler than dark granite. Seal before first pool season.' },
    'Fireplace Surround': { durability: 'Excellent -- quartzite fireplace surround handles DFW heat and ash with zero degradation.', sealFreq: 'Every 2-3 years', cost: '$18-28/sqft installed', dfwNotes: 'Quartzite fireplace surround in DFW is virtually maintenance-free. Handles high heat, no moisture concerns, no UV. Beautiful natural veining that marble buyers prefer without marble maintenance.' },
  },
};

export default function DFWNaturalStoneGuide() {
  const [stone, setStone] = useState('');
  const [app, setApp] = useState('');
  const result = stone && app ? stoneMatrix[stone]?.[app] : null;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Natural Stone Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🪨 DFW Natural Stone Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: '2rem', lineHeight: 1.6 }}>DFW's hard water (16-20 grains), acid rain, clay soil movement, and extreme UV each attack specific stone types differently. Travertine, limestone, and marble all fail fast in DFW without the right sealing plan. Select your stone type and application to see durability, sealing frequency, and DFW-specific risks.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Stone Type</div>
            {STONE_TYPES.map(s => (
              <button key={s} onClick={() => setStone(s)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: stone === s ? '#F5E642′ : '#0D1E3A', color: stone === s ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: stone === s ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: ’pointer', textAlign: 'left', fontWeight: stone === s ? 700 : 400, transition: 'all 0.2s' }}>{s}</button>
            ))}
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Application</div>
            {DFW_APPLICATIONS.map(a => (
              <button key={a} onClick={() => setApp(a)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: app === a ? '#F5E642′ : '#0D1E3A', color: app === a ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: app === a ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: ’pointer', textAlign: 'left', fontWeight: app === a ? 700 : 400, transition: 'all 0.2s' }}>{a}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ background: '#0D1E3A', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>✅ DFW Performance Assessment: {stone} for {app}</div>
            <div style={{ color: '#8899BB', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>💡 {result.dfwNotes}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.75rem', marginBottom: '0.25rem' }}>DURABILITY IN DFW</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.85rem' }}>{result.durability}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.75rem', marginBottom: '0.25rem' }}>SEAL FREQUENCY</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.85rem' }}>{result.sealFreq}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.75rem', marginBottom: '0.25rem' }}>TYPICAL COST</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.85rem' }}>{result.cost}</div>
              </div>
            </div>
          </div>
        )}
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.25rem', border: '1px solid #1C2E4A' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>💧 DFW Hard Water and Natural Stone</div>
          {['DFW water is 16-20 grains hardness -- among the hardest in Texas. This attacks all calcite-based stones (travertine, limestone, marble).', 'Granite and quartzite are non-calcite -- they resist DFW hard water etching completely.', 'All natural stone in DFW needs penetrating impregnating sealer -- topical sealers peel in DFW humidity.', 'Sealing only prevents absorption -- it does not prevent surface etching on soft stones from DFW acid contact.', 'DFW acid rain (pH 5.0-5.5) is particularly damaging to limestone and marble outdoor applications.'].map((tip, i) => (
            <div key={i} style={{ color: '#8899BB', fontSize: '0.875rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #F5E642′ }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
