import { useState } from 'react';

const PATIO_USES = ['Outdoor Dining/Entertainment', 'Pool Surround', 'Walkway/Path', 'Fire Pit Area', 'Driveway Accent', 'Backyard Play Area'];
const DFW_CONDITIONS = ['DFW Clay Soil Movement', 'DFW Heat & UV', 'Low Maintenance', 'Resale Value', 'Budget Priority'];

const paverMatrix: Record<string, Record<string, { type: string; joint: string; cost: string; why: string }>> = {
  'Outdoor Dining/Entertainment': {
    'DFW Clay Soil Movement': { type: 'Concrete Pavers on Compacted Gravel Base', joint: 'Polymeric Sand (no rigid mortar)', cost: '$8-14/sqft installed', why: 'Individual pavers on gravel base flex with DFW clay movement. When one settles, reset it -- no cracking a slab. Gravel drains water that would otherwise destabilize clay.' },
    'DFW Heat & UV': { type: 'Light-Colored Concrete Pavers (Buff or Tan)', joint: 'Polymeric Sand', cost: '$8-12/sqft', why: 'Light paver colors stay 30-40 degrees cooler than dark surfaces in DFW summer. Entertainment areas need comfortable barefoot temps.' },
    'Low Maintenance': { type: 'Concrete Pavers (Tumbled or Textured)', joint: 'Polymeric Sand with Sealer', cost: '$10-15/sqft', why: 'Sealed polymeric sand resists DFW weeds and ant invasion. Tumbled texture hides DFW clay scuff marks between cleanings.' },
    'Resale Value': { type: 'Clay Brick Pavers (Traditional)', joint: 'Polymeric Sand', cost: '$12-18/sqft', why: 'Clay brick patio adds significant perceived value in DFW resale market. Buyers associate clay brick with quality and permanence.' },
    'Budget Priority': { type: 'Standard Concrete Pavers (16x16)', joint: 'Regular Sand (resand annually)', cost: '$5-8/sqft', why: 'Standard concrete pavers at big-box prices are 1/3 the cost of clay brick while still handling DFW clay movement better than poured slab.' },
  },
  'Pool Surround': {
    'DFW Clay Soil Movement': { type: 'Travertine Pavers on Mortar Bed', joint: 'Grout with Sealer', cost: '$15-22/sqft', why: 'Pool surround has less clay movement stress (pool shell anchors the grade). Travertine on mortar bed gives stable, luxurious surface with fewer reset issues.' },
    'DFW Heat & UV': { type: 'Travertine or Light Limestone Pavers', joint: 'Grout sealed with UV-stable sealer', cost: '$14-20/sqft', why: 'Natural travertine and limestone stay dramatically cooler than concrete in DFW sun. The industry standard for DFW pool decks for good reason.' },
    'Low Maintenance': { type: 'Porcelain Pavers (Sealed)', joint: 'Porcelain-compatible grout', cost: '$12-18/sqft', why: 'Porcelain pavers are virtually impervious to DFW hard water, pool chemicals, and UV. No annual sealing required unlike travertine.' },
    'Resale Value': { type: 'Travertine Pavers (Standard Cut)', joint: 'Grout + sealer', cost: '$15-22/sqft', why: 'Travertine pool surround is the #1 DFW luxury pool upgrade. Buyers pay premium for it over any other pool deck material.' },
    'Budget Priority': { type: 'Concrete Pavers (Smooth, Light-Colored)', joint: 'Polymeric sand', cost: '$7-11/sqft', why: 'Light smooth concrete pavers stay cool, resist pool chemicals, and are 1/2 the cost of travertine for DFW pool surrounds.' },
  },
  'Walkway/Path': {
    'DFW Clay Soil Movement': { type: 'Stepping Stone Style Pavers with Mulch/Gravel Joints', joint: 'No joint material -- open to mulch', cost: '$4-8/sqft', why: 'Open-jointed stepping stones flex completely with DFW clay. No rigid joint to crack. Individual stones re-level as soil moves.' },
    'DFW Heat & UV': { type: 'Exposed Aggregate Concrete Pavers', joint: 'Polymeric sand', cost: '$8-12/sqft', why: 'Exposed aggregate texture reduces heat absorption vs smooth concrete. Surface variation hides DFW UV fading better than smooth pavers.' },
    'Low Maintenance': { type: 'Large Format Pavers (24x24) with Polymeric Sand', joint: 'Polymeric sand (weed-blocking)', cost: '$9-14/sqft', why: 'Fewer joints means fewer DFW weed opportunities. Large format with polymeric sand is virtually weed-free for 5-7 years.' },
    'Resale Value': { type: 'Brick Border with Concrete Field', joint: 'Mortar border, polymeric field', cost: '$10-16/sqft', why: 'Brick-edged walkways read as premium to DFW buyers. Classic pattern adds curb appeal without full brick cost.' },
    'Budget Priority': { type: 'Standard 12x12 Pavers on Sand Bed', joint: 'Regular sand', cost: '$3-6/sqft', why: 'Simplest DFW walkway paver option. Re-sand as needed after DFW rain events wash joints.' },
  },
  'Fire Pit Area': {
    'DFW Clay Soil Movement': { type: 'Irregular Flagstone on Gravel Base', joint: 'Decomposed granite or gravel', cost: '$10-16/sqft', why: 'Fire pit areas need material that can shift without cracking. Flagstone on gravel base resets easily as DFW clay heaves.' },
    'DFW Heat & UV': { type: 'Dark Natural Stone (Slate or Granite)', joint: 'No joint or decomposed granite', cost: '$12-18/sqft', why: 'Fire pit areas already have radiant heat -- UV fading of lighter stones is more visible. Dark natural stone hides UV wear and is heat-safe.' },
    'Low Maintenance': { type: 'Concrete Pavers (Dark, Textured)', joint: 'Polymeric sand', cost: '$8-12/sqft', why: 'Ash, soot, and DFW pollen are invisible on dark textured pavers. Hose off occasionally.' },
    'Resale Value': { type: 'Natural Flagstone with Built-In Seating Border', joint: 'Mortar-set border, flagstone field', cost: '$15-25/sqft', why: 'Fire pit with premium flagstone and built-in seating is a DFW outdoor living feature buyers specifically search for.' },
    'Budget Priority': { type: 'Crushed Granite or Decomposed Granite', joint: 'Compacted base is the joint', cost: '$2-4/sqft', why: 'Crushed granite fire pit surround is the most budget-friendly DFW option. Comfortable, cool, and handles clay movement perfectly.' },
  },
  'Driveway Accent': {
    'DFW Clay Soil Movement': { type: 'Concrete Pavers (Interlocking) on 6" Compacted Base', joint: 'Polymeric sand with edge restraint', cost: '$12-18/sqft', why: 'Interlocking pavers on deep compacted base resist DFW clay heave better than any rigid paving. When they shift, reset individually.' },
    'DFW Heat & UV': { type: 'Light Concrete or Clay Pavers', joint: 'Polymeric sand', cost: '$10-16/sqft', why: 'Driveway pavers face maximum DFW UV. Light tones hold color significantly longer than dark pavers in Texas sun.' },
    'Low Maintenance': { type: 'Sealed Concrete Pavers', joint: 'Polymeric sand (sealed)', cost: '$12-17/sqft', why: 'Sealed paver driveways in DFW resist oil, clay, and UV staining. Reseal every 4-5 years.' },
    'Resale Value': { type: 'Clay Brick Paver Driveway or Accent Border', joint: 'Polymeric sand', cost: '$15-22/sqft', why: 'Clay brick driveway or apron is a significant DFW curb appeal differentiator. Adds 1-3% to home value in DFW market.' },
    'Budget Priority': { type: 'Concrete Paver Accent Strips with Concrete Field', joint: 'Polymeric sand accents only', cost: '$6-10/sqft blended', why: 'Paver accent strips in a concrete driveway give the visual appeal of full paver at 40% of the cost.' },
  },
  'Backyard Play Area': {
    'DFW Clay Soil Movement': { type: 'Rubber Pavers on Compacted Gravel', joint: 'No joint material needed', cost: '$6-10/sqft', why: 'Rubber pavers flex with DFW clay movement completely. Impact-absorbing and self-draining -- best choice for play areas on DFW clay.' },
    'DFW Heat & UV': { type: 'Light Concrete Pavers with Shade Planning', joint: 'Polymeric sand', cost: '$7-11/sqft', why: 'DFW summer sun makes dark play surfaces dangerous. Light pavers plus proper shade structure (pergola, sail) are required for safe play areas.' },
    'Low Maintenance': { type: 'Pea Gravel or Decomposed Granite (Bordered)', joint: 'No joint -- loose material', cost: '$3-6/sqft', why: 'Loose-fill play surfaces are the lowest maintenance DFW option. Rake flat after rain events. No weeding with proper geotextile below.' },
    'Resale Value': { type: 'Concrete Pavers with Rubber Border', joint: 'Polymeric sand field', cost: '$8-14/sqft', why: 'Defined play area with paver surround shows buyers the yard is organized and maintained -- positive DFW resale signal.' },
    'Budget Priority': { type: 'Decomposed Granite with Steel Edging', joint: 'Compacted loose fill', cost: '$2-4/sqft', why: 'DFW play area on budget -- decomposed granite drains well, stays cool, and costs 1/4 of paver options.' },
  },
};

export default function DFWPatioPaversGuide() {
  const [use, setUse] = useState('');
  const [cond, setCond] = useState('');
  const result = use && cond ? paverMatrix[use]?.[cond] : null;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Outdoor Pro Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🪨 DFW Patio Pavers Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: '2rem', lineHeight: 1.6 }}>DFW clay soil expands and contracts seasonally -- pavers handle this far better than monolithic concrete slabs. Individual units shift and reset without cracking. Select your patio use and primary DFW concern to get the right paver and joint recommendation.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Patio Use</div>
            {PATIO_USES.map(u => (
              <button key={u} onClick={() => setUse(u)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: use === u ? '#F5E642' : '#0D1E3A', color: use === u ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: use === u ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontWeight: use === u ? 700 : 400, transition: 'all 0.2s' }}>{u}</button>
            ))}
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Primary DFW Concern</div>
            {DFW_CONDITIONS.map(c => (
              <button key={c} onClick={() => setCond(c)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: cond === c ? '#F5E642' : '#0D1E3A', color: cond === c ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: cond === c ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontWeight: cond === c ? 700 : 400, transition: 'all 0.2s' }}>{c}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ background: '#0D1E3A', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>✅ Recommended Paver System</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>{result.type}</div>
            <div style={{ color: '#8899BB', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.6 }}>💡 {result.why}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>JOINT MATERIAL</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.9rem' }}>{result.joint}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>INSTALLED COST</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.9rem' }}>{result.cost}</div>
              </div>
            </div>
          </div>
        )}
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.25rem', border: '1px solid #1C2E4A' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🌱 DFW Pavers vs Slab Facts</div>
          {['DFW clay soil expands up to 6 inches vertically -- pavers accommodate this, slabs crack.', 'Polymeric sand in DFW joints is essential -- regular sand washes out in DFW rain events.', 'Edge restraint (steel or plastic) is mandatory -- DFW pavers migrate outward without it.', 'Compact base minimum 4 inches for patios, 6 inches for driveways on DFW clay.', 'Pavers can be individually reset after DFW clay heave events -- no jack-hammering needed.'].map((tip, i) => (
            <div key={i} style={{ color: '#8899BB', fontSize: '0.875rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #F5E642' }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
