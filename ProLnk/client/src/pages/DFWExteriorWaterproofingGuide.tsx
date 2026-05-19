import { useState } from 'react';

const exteriorTypes = ['Brick', 'Stucco / EIFS', 'Vinyl Siding', 'Fiber Cement (HardiePlank)'];
const waterIssueLocations = ['Foundation / Base of Walls', 'Window & Door Surrounds', 'Corners & Penetrations', 'Entire Wall Surface'];

type SolutionMap = { [loc: string]: { solution: string; cost: string; diyVsPro: string; notes: string } };
const solutions: { [ext: string]: SolutionMap } = {
  'Brick': {
    'Foundation / Base of Walls': { solution: 'Crystalline waterproof slurry coat on exposed CMU + exterior French drain', cost: '$2,500–$6,000', diyVsPro: 'Professional', notes: 'DFW clay soil holds water against brick for weeks after rain — French drain is often the real fix' },
    'Window & Door Surrounds': { solution: 'Remove and reset window trim + install through-wall flashing + backer rod + polyurethane caulk', cost: '$300–$1,200 per opening', diyVsPro: 'Pro Recommended', notes: 'Improper caulk (paintable latex) fails in DFW heat — use NP1 or similar high-movement sealant' },
    'Corners & Penetrations': { solution: 'Tuck-point mortar joints + seal penetrations with hydraulic cement + elastomeric caulk', cost: '$800–$3,000', diyVsPro: 'Pro Recommended', notes: 'Mortar joints are first to fail in DFW freeze-thaw cycles (rare but damaging)' },
    'Entire Wall Surface': { solution: 'Penetrating silane/siloxane masonry sealer (breathable) — full wall application', cost: '$1,500–$4,500', diyVsPro: 'DIY Possible', notes: 'Do NOT use film-forming sealers on brick — traps moisture and causes spalling. Penetrating sealers only.' },
  },
  'Stucco / EIFS': {
    'Foundation / Base of Walls': { solution: 'Install weep screed at base + regrade soil away from wall + elastomeric base coat', cost: '$2,000–$5,500', diyVsPro: 'Professional', notes: 'EIFS without drainage plane is a water disaster waiting to happen — very common in 1990s–2000s DFW' },
    'Window & Door Surrounds': { solution: 'Full EIFS termination repair + install through-wall flashing + deck-o-seal at transitions', cost: '$400–$1,800 per opening', diyVsPro: 'Professional', notes: 'EIFS window surrounds are the #1 failure point — requires proper back-dam and sealant sequencing' },
    'Corners & Penetrations': { solution: 'Reinforcing mesh + base coat patch + texture match + elastomeric sealer', cost: '$600–$2,000', diyVsPro: 'Pro Recommended', notes: 'DFW foundation movement cracks stucco at corners — seal then address foundation if movement is ongoing' },
    'Entire Wall Surface': { solution: 'Elastomeric wall coating (100% acrylic) — bridges hairline cracks and provides waterproof membrane', cost: '$2,500–$7,000', diyVsPro: 'Pro Recommended', notes: 'Best ROI waterproofing for stucco — also adds 10-yr finish life if professionally applied' },
  },
  'Vinyl Siding': {
    'Foundation / Base of Walls': { solution: 'Inspect and replace J-channel at base + install drip cap flashing + grade soil away', cost: '$800–$2,000', diyVsPro: 'DIY Possible', notes: 'Vinyl siding should terminate 6–8 inches above grade — common DFW install error is too close to soil' },
    'Window & Door Surrounds': { solution: 'Replace J-channel around openings + add head flashing + caulk with polyurethane', cost: '$150–$500 per opening', diyVsPro: 'DIY Possible', notes: 'Most common vinyl siding water entry point in DFW — relatively easy repair if caught early' },
    'Corners & Penetrations': { solution: 'Replace corner posts + seal all penetrations with foam backer rod + elastomeric caulk', cost: '$400–$1,200', diyVsPro: 'DIY Possible', notes: 'Utility penetrations through vinyl are often unsealed — inspect every penetration' },
    'Entire Wall Surface': { solution: 'Replace deteriorated panels + install house wrap behind + address drainage plane', cost: '$4,000–$12,000', diyVsPro: 'Professional', notes: 'If vinyl is warped from DFW heat, water infiltration is likely behind — full inspection needed before re-siding' },
  },
  'Fiber Cement (HardiePlank)': {
    'Foundation / Base of Walls': { solution: 'Seal bottom board edge + ensure 6-inch soil clearance + install drip cap at first course', cost: '$600–$1,800', diyVsPro: 'Pro Recommended', notes: 'HardiePlank absorbs water at cut edges — factory primed only; field cuts must be primed immediately' },
    'Window & Door Surrounds': { solution: 'Add head flashing + caulk with paintable polyurethane at all trim-to-siding joints', cost: '$200–$700 per opening', diyVsPro: 'Pro Recommended', notes: 'Fiber cement requires re-caulking every 5–7 years in DFW climate — often skipped during repaints' },
    'Corners & Penetrations': { solution: 'Replace corner trim + caulk all joints + prime and paint exposed edges', cost: '$500–$1,500', diyVsPro: 'Pro Recommended', notes: 'Unpainted fiber cement deteriorates rapidly in DFW UV — any exposed edges must be sealed within 90 days of install' },
    'Entire Wall Surface': { solution: 'Full recoat with elastomeric exterior paint + caulk all joints before painting', cost: '$3,000–$8,000', diyVsPro: 'Professional', notes: 'Best waterproofing treatment for HardiePlank — extends siding life 15+ years' },
  },
};

export default function DFWExteriorWaterproofingGuide() {
  const [exteriorType, setExteriorType] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const result = exteriorType && issueLocation ? solutions[exteriorType]?.[issueLocation] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0D1E35', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>DFW HOME SERVICES GUIDE · 2026</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.2 }}>🧱 Exterior Home Waterproofing Guide for DFW</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, lineHeight: 1.6 }}>DFW clay soil doesn't just sit under your foundation — it presses against your exterior walls after every rain. Combined with UV-degraded sealants and wind-driven storm rain, exterior waterproofing is critical maintenance for every DFW home type.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{ label: '🏘️ Exterior Type', val: exteriorType, set: setExteriorType, opts: exteriorTypes }, { label: '📍 Water Issue Location', val: issueLocation, set: setIssueLocation, opts: waterIssueLocations }].map(({ label, val, set, opts }) => (
            <div key={label}>
              <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {opts.map(o => (
                  <button key={o} onClick={() => set(o)} style={{ background: val === o ? '#F5E642′ : '#1A2D4A', color: val === o ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 14px', cursor: 'pointer', fontWeight: val === o ? 700 : 400, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {result ? (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED SOLUTION</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.4 }}>{result.solution}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>ESTIMATED COST</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>DIY vs PRO</div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 15 }}>{result.diyVsPro}</div>
              </div>
            </div>
            <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>💡 {result.notes}</div>
          </div>
        ) : (
          <div style={{ background: '#1A2D4A', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8′ }}>Select your exterior type and water issue location to get a targeted waterproofing solution.</div>
        )}
        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[{ icon: '🌊', title: 'French Drains', text: 'A trench filled with gravel and perforated pipe that intercepts surface and subsurface water before it reaches your walls. Standard DFW solution for clay-driven moisture problems.' }, { icon: '💧', title: 'Pop-Up Emitters', text: 'Terminate French drains with pop-up emitters that open under water pressure and close when flow stops — prevents backflow and critter intrusion. DFW code preferred.' }, { icon: '🌡️', title: 'Sealant Selection', text: 'In DFW heat, standard acrylic caulk fails in 2–3 years. Polyurethane (NP1, Sikaflex) or hybrid sealants are required at all exterior joints for 10+ year life.' }, { icon: '🏗️', title: 'Drainage Plane', text: 'Modern exterior walls need a drainage plane behind the cladding — a gap where any penetrating water can drain down and out. Missing in many DFW homes built before 2000.' }].map(({ icon, title, text }) => (
            <div key={title} style={{ background: '#1A2D4A', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 6, fontSize: 15 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
