import { useState } from 'react';

const vintages = ['Pre-1980 (no air barrier standard)', '1980–2000 (inconsistent practice)', '2001–2012 (housewrap era)', '2013–present (code required)'];
const leakageProblems = ['Drafts felt near outlets or switch plates', 'Attic air smells detectable inside', 'Humidity spikes when it rains or wind picks up', 'High blower door test result (>7 ACH50)', 'Energy bills spike with DFW wind events'];

const solutions: Record<string, Record<string, { airBarrierStatus: string; retrofitApproach: string; cost: string }>> = {
  'Pre-1980 (no air barrier standard)': {
    'Drafts felt near outlets or switch plates': { airBarrierStatus: '🔴 No air barrier. Pre-1980 DFW homes were built with no air barrier requirement. Exterior sheathing gaps allow wind-driven air infiltration through wall cavities to outlets and plates.', retrofitApproach: 'Interior approach: Foam gaskets behind all outlets and switch plates ($2 each, DIY). Air seal top plates in attic with spray foam. Dense-pack blown insulation into wall cavities adds secondary air resistance without full exterior renovation.', cost: 'DIY foam gaskets: $50–$150. Professional air sealing: $800–$2,500. Dense-pack walls: $3,000–$8,000.' },
    'Attic air smells detectable inside': { airBarrierStatus: '🔴 Ceiling plane is not air-sealed. Pre-1980 homes have significant attic-to-living space air movement through top plates, light fixtures, and partition walls.', retrofitApproach: 'Primary intervention: Air seal the attic floor. Spray foam all top plate penetrations, recessed lights, and partition wall top plates from attic. This is the highest-impact retrofit for pre-1980 DFW homes.', cost: 'Professional attic air sealing: $1,500–$4,000. Blower door test pre/post: $400–$600.' },
    'Humidity spikes when it rains or wind picks up': { airBarrierStatus: '🔴 Wind-washing through wall cavities. DFW spring storms drive humidity through unsheathed wall cavities. Pre-1980 homes with board sheathing have significant gaps.', retrofitApproach: 'Exterior renovation option: Install rigid foam over existing siding (requires new siding). Interior option: Dense-pack insulation adds resistance. Most impactful: address foundation and rim joist air sealing first.', cost: 'Rim joist sealing: $500–$1,500. Full exterior foam: $8,000–$20,000+ (major renovation).' },
    'High blower door test result (>7 ACH50)': { airBarrierStatus: '🔴 Confirmed high infiltration. 7+ ACH50 in a pre-1980 DFW home is expected but addressable. National median for pre-1980 homes is 12–15 ACH50.', retrofitApproach: 'Prioritized air sealing: (1) Attic top plates, (2) Rim joists, (3) Penetrations and plumbing chases, (4) Fireplace dampers, (5) Garage-to-living transitions. Each step typically reduces ACH50 by 1–2 points.', cost: 'Comprehensive air sealing: $3,000–$8,000. Target: below 5 ACH50 for meaningful energy savings.' },
    'Energy bills spike with DFW wind events': { airBarrierStatus: '🔴 Wind-driven infiltration. DFW spring storms (30–50 mph winds) dramatically increase infiltration in homes without exterior air barriers.', retrofitApproach: 'Most cost-effective: Interior air sealing of attic, crawl space or slab edge, and major penetrations. Adding housewrap on exterior requires full re-siding project.', cost: 'Interior air sealing: $2,000–$5,000. Expected savings: $300–$600/year in DFW.' },
  },
  '1980–2000 (inconsistent practice)': {
    'Drafts felt near outlets or switch plates': { airBarrierStatus: '⚠️ Inconsistent air barrier. Some 1980–2000 DFW homes have housewrap or building paper, others do not. Original installation quality varies widely.', retrofitApproach: 'Start with interior gaskets on outlets and plates. Check attic top plate sealing — this era often has blown insulation but no top plate air sealing, which are two different things.', cost: 'DIY gaskets: $50–$150. Top plate sealing: $800–$2,000.' },
    'Attic air smells detectable inside': { airBarrierStatus: '⚠️ Likely top plate gaps. 1980–2000 DFW homes often have blown attic insulation but unsealed top plates — insulation does not stop air movement.', retrofitApproach: 'Air seal all top plates and partition wall caps from attic side with spray foam. Separately address any recessed lights not rated for air sealing.', cost: '$1,500–$3,500 professional attic air sealing. High ROI in DFW climate.' },
    'Humidity spikes when it rains or wind picks up': { airBarrierStatus: '⚠️ Building paper or housewrap may be degraded. Check exterior siding for gaps, cracks, and failed caulk. DFW UV exposure degrades housewrap faster than northern climates.', retrofitApproach: 'Recaulk all exterior penetrations (windows, doors, pipes, wires). Replace failed siding-to-foundation caulk. Check attic soffit baffles for wind washing through insulation.', cost: 'Exterior caulking/sealing: $500–$2,000. Attic baffles: $300–$800.' },
    'High blower door test result (>7 ACH50)': { airBarrierStatus: '⚠️ Above average but improvable. 1980–2000 DFW homes typically test 6–10 ACH50. Target is below 5 for good performance in DFW climate.', retrofitApproach: 'Focus on attic air sealing, rim joists, and any unconditioned attached garage connections. Blower door guided sealing — tech identifies leak locations during pressurization.', cost: 'Guided air sealing: $2,000–$5,000. Post-test to verify improvement: $300.' },
    'Energy bills spike with DFW wind events': { airBarrierStatus: '⚠️ Likely degraded or incomplete exterior barrier. DFW wind events expose air barrier weaknesses.', retrofitApproach: 'Exterior inspection of all penetrations. Interior attic and crawl/slab sealing. Weather-strip all doors and check window sealants.', cost: '$1,500–$4,000 comprehensive sealing. $200–$400/year expected savings.' },
  },
  '2001–2012 (housewrap era)': {
    'Drafts felt near outlets or switch plates': { airBarrierStatus: '✅ Housewrap likely present but may have installation defects. DFW homes from this era typically have Tyvek or similar, but tape-less seams and unsealed penetrations reduce effectiveness.', retrofitApproach: 'Interior gaskets on outlets as first step. If problem persists, check exterior housewrap at window and door rough openings — this era frequently has missing or improper flashing tape.', cost: 'Interior gaskets: $50–$150 DIY. Exterior flashing tape repair: $200–$600.' },
    'Attic air smells detectable inside': { airBarrierStatus: '⚠️ Ceiling air sealing may be incomplete. Housewrap on walls does not help attic air movement through ceiling plane.', retrofitApproach: 'Inspect attic for unsealed top plates, recessed light cans, and plumbing chases. Air seal from attic side. This era often has unsealed partition wall top plates.', cost: '$1,000–$2,500 professional attic air sealing.' },
    'Humidity spikes when it rains or wind picks up': { airBarrierStatus: '✅ Housewrap should be handling this. If humidity is still spiking, look for wind washing through attic soffit vents or degraded window/door weather-stripping.', retrofitApproach: 'Add attic soffit baffles if not present. Check weather-stripping on all exterior doors. Inspect window sill pans for water intrusion.', cost: 'Baffles and weather-strip: $300–$800 DIY or professional.' },
    'High blower door test result (>7 ACH50)': { airBarrierStatus: '⚠️ Housewrap present but likely has installation gaps. This era housewrap was often installed without proper taped seams or lapped flashing.', retrofitApproach: 'Blower door guided sealing. Focus on attic plane, rim joists, and any additions or renovations done post-original construction.', cost: '$1,500–$4,000. Target: below 4 ACH50 for 2001–2012 era DFW homes.' },
    'Energy bills spike with DFW wind events': { airBarrierStatus: '⚠️ Housewrap seam failures. DFW UV and thermal cycling cause housewrap to degrade at unsealed seams over 10–15 years.', retrofitApproach: 'Exterior inspection for housewrap gaps at corners and penetrations. Consider adding exterior rigid foam over existing housewrap if doing siding replacement.', cost: 'Seam repair: $400–$1,200. Full re-wrap: $3,000–$8,000.' },
  },
  '2013–present (code required)': {
    'Drafts felt near outlets or switch plates': { airBarrierStatus: '✅ Code-compliant air barrier should be present. If drafts are felt, likely installation defects or post-construction renovations that penetrated the air barrier.', retrofitApproach: 'Interior gaskets as quick fix. If problem is significant, request builder warranty inspection — air barrier is a code requirement and construction defect may be covered.', cost: 'Gaskets: $50–$150 DIY. Warranty repair: $0.' },
    'Attic air smells detectable inside': { airBarrierStatus: '✅ Ceiling air sealing required by code. If attic smells are detectable, check for recent attic work that may have disturbed sealing, or unsealed penetrations from audio/visual or solar installations.', retrofitApproach: 'Inspect attic for any post-construction penetrations. Re-seal with spray foam. Check recessed lights are IC-rated and air-sealed type.', cost: 'Minor sealing: $200–$600. Recessed light replacement: $100–$200 per fixture.' },
    'Humidity spikes when it rains or wind picks up': { airBarrierStatus: '✅ Air barrier should be preventing this in new construction. If occurring, investigate window and door flashing — most common failure point in post-2013 DFW construction.', retrofitApproach: 'Inspect all window and door rough openings for proper flashing integration with housewrap. Water intrusion and air infiltration often enter through same path.', cost: 'Flashing repair: $300–$1,500 depending on extent.' },
    'High blower door test result (>7 ACH50)': { airBarrierStatus: '🔴 Code violation if post-2013. IECC 2012+ requires blower door testing at certificate of occupancy. 7+ ACH50 in a post-2013 DFW home indicates construction defect.', retrofitApproach: 'Request blower door guided inspection. Document and submit warranty claim to builder. Code requires < 5 ACH50 in most DFW jurisdictions for post-2012 construction.', cost: 'Warranty repair: $0 (builder responsible). Independent test to document: $300–$400.' },
    'Energy bills spike with DFW wind events': { airBarrierStatus: '✅ Should not occur in code-compliant new construction. Investigate if any renovation has been done or windows/doors have failed seals.', retrofitApproach: 'Check for failed window IGU seals (fogging between panes = air/moisture infiltration). Inspect any addition or renovation connection points.', cost: 'Window seal repair: $150–$400 per window. Addition sealing: $500–$2,000.' },
  },
};

export default function DFWAirBarrierGuide() {
  const [vintage, setVintage] = useState('');
  const [leakage, setLeakage] = useState('');
  const result = vintage && leakage ? solutions[vintage]?.[leakage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏗️ Air Barrier Guide for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          Air barriers stop air movement through your building envelope. In DFW, this matters for two reasons: spring wind events that drive infiltration, and summer heat that infiltrates unconditioned attic air into your living space. An air barrier is not the same as a vapor barrier — they solve different problems.
        </p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📚 Air Barrier vs Vapor Barrier — DFW Context</h2>
          <div style={{ color: '#cbd5e1', lineHeight: 2 }}>
            <div>🌬️ <strong>Air barrier:</strong> Stops air movement (wind, stack effect, mechanical pressure). Installed on exterior (housewrap, rigid foam, closed-cell spray foam).</div>
            <div>💧 <strong>Vapor barrier:</strong> Slows moisture diffusion through materials. In DFW (mixed-humid climate), vapor barriers are less critical than air barriers.</div>
            <div style={{ marginTop: 8, color: '#F5E642' }}>In DFW climate zone 3: air sealing is the priority. Vapor barriers should NOT be installed on the interior — DFW sometimes needs walls to dry to the inside.</div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔍 Get Your Retrofit Recommendation</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home construction era</label>
          <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 14 }}>
            <option value=''>Select home vintage...</option>
            {vintages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Air leakage problem you are experiencing</label>
          <select value={leakage} onChange={e => setLeakage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
            <option value=''>Select problem...</option>
            {leakageProblems.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {result && (
          <div style={{ background: '#132035', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>{result.airBarrierStatus}</p>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}><strong>Retrofit Approach:</strong> {result.retrofitApproach}</p>
            <div style={{ color: '#F5E642', fontWeight: 600 }}>💰 {result.cost}</div>
          </div>
        )}

        <div style={{ marginTop: 32, padding: '16px 20px', background: '#132035', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>⚡ Find a ProLnk-verified DFW contractor for air sealing and building envelope work. Free quote comparison — no obligation.</p>
        </div>
      </div>
    </div>
  );
}
