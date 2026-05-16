import { useState } from 'react';

const APPLICATIONS = ['Driveway', 'Interior Floor', 'Pool Deck', 'Patio/Walkway', 'Garage Floor', 'Stamped Decorative'];
const CONDITIONS = ['DFW UV Exposure', 'DFW Heat & Expansion', 'Low Maintenance', 'Resale Value', 'Budget Priority'];

const colorMatrix: Record<string, Record<string, { method: string; durability: string; cost: string; why: string }>> = {
  'Driveway': {
    'DFW UV Exposure': { method: 'Dry-Shake Color Hardener', durability: 'Excellent -- surface-hardened layer resists DFW UV fading far better than integral color alone.', cost: '$2-4/sqft over base concrete', why: 'Integral color fades on DFW driveways within 3-5 years from UV. Dry-shake creates a UV-hardened top layer that holds color 2x longer.' },
    'DFW Heat & Expansion': { method: 'Integral Color with Light Tones', durability: 'Good -- light colors reflect DFW summer heat and reduce thermal expansion cracking.', cost: '$0.50-1.50/sqft added to mix', why: 'Dark integral colors absorb DFW heat and expand more. Light tan or buff handles thermal cycling with fewer cracks.' },
    'Low Maintenance': { method: 'Integral Color (Buff or Gray)', durability: 'Very Good -- color goes all the way through, so chips and cracks do not expose white concrete.', cost: '$0.50-1.50/sqft', why: 'Integral color needs resealing every 3-5 years but no touch-up painting. Best DFW driveway maintenance profile.' },
    'Resale Value': { method: 'Exposed Aggregate or Stamped with Color Hardener', durability: 'Excellent -- DFW buyers respond to textured driveways strongly.', cost: '$4-8/sqft', why: 'Plain concrete driveways are neutral. Textured and colored driveways are a positive DFW selling feature.' },
    'Budget Priority': { method: 'Integral Color Only', durability: 'Good -- whole-mix color, no surface treatment needed immediately.', cost: '$0.50-1.00/sqft added', why: 'Lowest cost DFW concrete color option that still provides uniform appearance.' },
  },
  'Interior Floor': {
    'DFW UV Exposure': { method: 'Acid Stain', durability: 'Excellent indoors -- no UV degradation inside. Acid stain creates permanent chemical bond with concrete.', cost: '$2-5/sqft plus sealer', why: 'UV is not a factor indoors. Acid stain gives DFW interior floors a unique variegated look that integral color cannot match.' },
    'DFW Heat & Expansion': { method: 'Integral Color with Radiant Barrier Sealer', durability: 'Very Good -- interior concrete with good sealer handles DFW AC-to-heat cycles well.', cost: '$1-3/sqft', why: 'Expansion joints every 10-12 feet indoors. Sealer protects color through DFW AC season humidity swings.' },
    'Low Maintenance': { method: 'Epoxy Coating over Integral Color', durability: 'Excellent -- epoxy-sealed interior concrete handles DFW clay tracked in and hard water spills without staining.', cost: '$3-6/sqft', why: 'Two-layer system: integral color base + epoxy top. Zero staining from DFW clay or hard water indoors.' },
    'Resale Value': { method: 'Polished Concrete with Acid Stain', durability: 'Excellent -- DFW luxury market values polished concrete highly. Timeless and durable.', cost: '$5-10/sqft', why: 'Polished and acid-stained floors are the highest-value DFW interior concrete option. Commands premium in listings.' },
    'Budget Priority': { method: 'Concrete Stain (Water-Based)', durability: 'Fair -- water-based stain fades faster than acid stain but is easiest DIY option for DFW interior slabs.', cost: '$1-2/sqft', why: 'Lowest cost DFW interior color option. Reseal every 1-2 years to maintain appearance.' },
  },
  'Pool Deck': {
    'DFW UV Exposure': { method: 'Cool Deck Coating or Kool Deck System', durability: 'Excellent -- designed specifically for DFW-style UV and heat environments. Reflects up to 90% of heat.', cost: '$3-6/sqft', why: 'Bare concrete pool decks in DFW reach 150+ degrees. Cool Deck systems are standard for DFW pool contractors.' },
    'DFW Heat & Expansion': { method: 'Light-Toned Integral Color (Buff, Cream, Off-White)', durability: 'Very Good -- light tones reflect DFW summer heat and reduce barefoot burns.', cost: '$0.75-1.50/sqft added', why: 'Pool decks need light tones in DFW. Dark colored concrete around pools is a liability issue.' },
    'Low Maintenance': { method: 'Kool Deck Acrylic Overlay', durability: 'Very Good -- acrylic overlays for DFW pool decks are recoatable, slip-resistant, and UV-stable.', cost: '$3-5/sqft', why: 'DFW pool decks need slip resistance (Class 5 equivalent) and easy recoat when color fades from intense sun.' },
    'Resale Value': { method: 'Travertine-Look Spray Deck', durability: 'Excellent -- travertine texture is the DFW luxury pool deck standard.', cost: '$4-7/sqft', why: 'Spray-applied travertine texture on pool deck dramatically increases perceived value for DFW home sales.' },
    'Budget Priority': { method: 'Brushed Integral Color', durability: 'Good -- slip-resistant brushed finish with integral color is functional and affordable for DFW pool decks.', cost: '$0.50-1.00/sqft added', why: 'Base concrete with brush finish and integral color is code-compliant and budget-friendly.' },
  },
  'Patio/Walkway': {
    'DFW UV Exposure': { method: 'Dry-Shake Hardener + UV Sealer', durability: 'Excellent -- dry-shake creates hard surface layer, UV sealer locks color against DFW sun.', cost: '$2-5/sqft', why: 'DFW patios face 240+ days of direct sun per year. Surface hardener + sealer is the only combination that holds color past 5 years.' },
    'DFW Heat & Expansion': { method: 'Integral Color with Control Joints Every 8ft', durability: 'Very Good -- planned cracking at joints prevents random cracking from DFW thermal cycles.', cost: '$0.50-1.00/sqft added', why: 'DFW patios expand and contract dramatically. Control joints every 8 feet let the concrete move without random cracking.' },
    'Low Maintenance': { method: 'Integral Color (Slate Gray or Charcoal)', why: 'DFW patios collect pollen, clay, and soot. Dark integral color hides all of it between pressure washing.', durability: 'Very Good', cost: '$0.50-1.50/sqft' },
    'Resale Value': { method: 'Stamped Concrete with Color Hardener', durability: 'Excellent -- DFW outdoor living areas are major selling features. Stamped patio adds significant value.', cost: '$6-12/sqft', why: 'Stamped concrete patios return 80-100% of cost in DFW resale. Buyers pay premium for outdoor entertainment space.' },
    'Budget Priority': { method: 'Broom Finish with Integral Color', durability: 'Good -- durable, slip-resistant, functional for DFW walkways at minimum cost.', cost: '$0.50-1.00/sqft', why: 'Base concrete with broom finish and single-color integral is the DFW budget patio standard.' },
  },
  'Garage Floor': {
    'DFW UV Exposure': { method: 'Epoxy Coating (2-Part)', durability: 'Excellent -- garage doors reduce UV but epoxy is impervious regardless.', cost: '$3-7/sqft', why: 'DFW garages with UV-exposed areas need epoxy coating. Handles oil, tire marks, and DFW clay with zero absorption.' },
    'DFW Heat & Expansion': { method: 'Flexible Epoxy or Polyurea Coating', durability: 'Excellent -- polyurea handles DFW thermal expansion better than rigid epoxy coatings.', cost: '$4-8/sqft', why: 'DFW garages heat to 120+ degrees in summer. Rigid epoxy can delaminate. Polyurea stays bonded through thermal cycles.' },
    'Low Maintenance': { method: '2-Part Epoxy with Anti-Slip Additive', durability: 'Excellent -- sealed surface means DFW clay wipes up, oil never soaks in, zero staining.', cost: '$3-6/sqft', why: 'Garage floor epoxy in DFW is the ultimate low-maintenance option. One coat lasts 10-15 years.' },
    'Resale Value': { method: 'Metallic Epoxy or Flake Epoxy', durability: 'Excellent -- DFW buyers love finished garage floors. Metallic flake is trending in DFW.', cost: '$5-10/sqft', why: 'Finished garage floor in DFW adds measurable value. Buyers move faster on homes with professional garage coatings.' },
    'Budget Priority': { method: 'Concrete Sealer (Penetrating)', durability: 'Fair -- protects against DFW moisture wicking but does not change color significantly.', cost: '$0.30-0.75/sqft', why: 'Penetrating sealer is lowest-cost DFW garage protection. Invisible but prevents efflorescence and moisture damage.' },
  },
  'Stamped Decorative': {
    'DFW UV Exposure': { method: 'Color Hardener + Antiquing Release + UV Sealer', durability: 'Excellent -- three-layer system is the DFW stamped concrete standard for UV resistance.', cost: '$8-15/sqft total', why: 'Stamped concrete without UV sealer fades badly in DFW sun. The release agent creates the antiqued look. UV sealer locks it for 3-5 years.' },
    'DFW Heat & Expansion': { method: 'Same System + Expansion Joints at Pattern Breaks', durability: 'Very Good -- stamp patterns naturally guide where control joints go.', cost: '$8-15/sqft', why: 'Stamped concrete in DFW must have expansion joints at doorways, columns, and every 10-12 feet.' },
    'Low Maintenance': { method: 'Integral Base Color + Stamped with Resin Sealer', durability: 'Very Good -- resin-based sealer for DFW stamped concrete is more durable than acrylic and needs recoat every 3-5 years only.', cost: '$7-12/sqft', why: 'Acrylic sealers on DFW stamped concrete need annual recoat. Resin sealers last 3-5x longer.' },
    'Resale Value': { method: 'Natural Stone Pattern + Earth Tones + Antiquing', durability: 'Excellent -- DFW buyers pay premium for natural stone-look stamped concrete.', cost: '$10-18/sqft', why: 'Travertine or flagstone stamp patterns in DFW patios are the highest-value exterior improvement per dollar.' },
    'Budget Priority': { method: 'Single Color Hardener + Basic Stamp Pattern', durability: 'Good -- single color is less expensive but still transforms plain concrete.', cost: '$5-8/sqft', why: 'Basic stamped concrete in DFW is still 3-4x the value of plain broom finish from a resale perspective.' },
  },
};

export default function DFWConcreteColorGuide() {
  const [app, setApp] = useState('');
  const [cond, setCond] = useState('');
  const result = app && cond ? colorMatrix[app]?.[cond] : null;
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Concrete Pro Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🎨 DFW Concrete Color Guide</h1>
        <p style={{ color: '#8899BB', marginBottom: '2rem', lineHeight: 1.6 }}>DFW's 240+ sun days, extreme UV, and heat cycles destroy improperly colored concrete fast. Integral color, dry-shake, and acid stain each behave differently here. Select your application and primary DFW concern.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>Concrete Application</div>
            {APPLICATIONS.map(a => (
              <button key={a} onClick={() => setApp(a)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: app === a ? '#F5E642' : '#0D1E3A', color: app === a ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: app === a ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontWeight: app === a ? 700 : 400, transition: 'all 0.2s' }}>{a}</button>
            ))}
          </div>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Condition Priority</div>
            {CONDITIONS.map(c => (
              <button key={c} onClick={() => setCond(c)} style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.6rem 1rem', background: cond === c ? '#F5E642' : '#0D1E3A', color: cond === c ? '#0A1628' : '#CDD5E0', border: '1px solid', borderColor: cond === c ? '#F5E642' : '#1C2E4A', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontWeight: cond === c ? 700 : 400, transition: 'all 0.2s' }}>{c}</button>
            ))}
          </div>
        </div>
        {result && (
          <div style={{ background: '#0D1E3A', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>✅ Recommended Color Method</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>{result.method}</div>
            <div style={{ color: '#8899BB', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.6 }}>💡 {result.why}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>DURABILITY IN DFW</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.9rem' }}>{result.durability}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', border: '1px solid #1C2E4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.25rem' }}>TYPICAL COST</div>
                <div style={{ color: '#CDD5E0', fontSize: '0.9rem' }}>{result.cost}</div>
              </div>
            </div>
          </div>
        )}
        <div style={{ background: '#0D1E3A', borderRadius: 12, padding: '1.25rem', border: '1px solid #1C2E4A' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>☀️ DFW Concrete Color Facts</div>
          {['DFW gets 240+ sunny days per year -- UV degradation is the #1 color killer.', 'Dark concrete surfaces in DFW reach 150-160 degrees F in summer -- light tones are safer and last longer.', 'Acid stain creates a permanent chemical bond with concrete -- it cannot peel or flake like surface coatings.', 'Integral color must match throughout the full slab depth -- chips show the same color underneath.', 'All exterior DFW concrete needs UV-stable sealer reapplied every 2-4 years regardless of color method.'].map((tip, i) => (
            <div key={i} style={{ color: '#8899BB', fontSize: '0.875rem', marginBottom: '0.4rem', paddingLeft: '0.5rem', borderLeft: '2px solid #F5E642' }}>{tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
