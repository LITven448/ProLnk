import { useState } from 'react';

const installations = ['Attic Air Handler', 'Ground-Level Slab', 'Closet', 'Garage', 'Not Sure'];
const concerns = [
  'High Energy Bills',
  'Uneven Cooling',
  'Equipment Lifespan',
  'Humidity Control',
  'Considering Relocation',
];

type Assessment = { rating: string; color: string; label: string; detail: string; relocation: string; cost: string };
const assessments: Record<string, Record<string, Assessment>> = {
  'Attic Air Handler': {
    'High Energy Bills': {
      rating: 'Critical',
      color: '#F87171',
      label: 'Attic Installs Lose 30-40% Efficiency in DFW',
      detail: 'DFW attics reach 150-160 degrees Fahrenheit in summer. Every foot of duct in that superheated air loses cooling before it reaches your rooms. A 3-ton system effectively delivers 1.8-2.1 tons of useful cooling.',
      relocation: 'Moving air handler to a conditioned closet can recover 25-35% of lost efficiency — often worth more than a full equipment upgrade.',
      cost: 'Relocation: $2,800-5,500. Annual savings at DFW utility rates: $400-900/yr. Payback: 4-8 years.',
    },
    'Uneven Cooling': {
      rating: 'High Impact',
      color: '#FBBF24',
      label: 'Duct Heat Gain Creates Zone Imbalances',
      detail: 'Rooms farthest from the air handler get the hottest air — duct runs of 30-50 feet lose significant BTUs in DFW attics. Master bedrooms at the end of long runs often run 4-8 degrees warmer.',
      relocation: 'Duct sealing + insulation upgrade to R-8 is step one. Relocation to conditioned space resolves the root cause permanently.',
      cost: 'Duct sealing: $800-1,500. Full attic insulation upgrade: $1,200-2,500. Relocation: $3,000-5,500.',
    },
    'Equipment Lifespan': {
      rating: 'Significant',
      color: '#FBBF24',
      label: 'Attic Heat Reduces Component Life by 3-5 Years',
      detail: 'Blower motors, control boards, and capacitors all degrade faster in 150-degree attics. DFW HVAC contractors report attic air handlers failing 3-5 years earlier than conditioned-space units on average.',
      relocation: 'Relocation pays back in extended equipment life alone — a $4,000 relocation vs $8,000-12,000 system replacement in year 10 vs year 15.',
      cost: 'Attic unit replacement cycle: 10-12 years. Conditioned space: 15-18 years. Long-term savings exceed relocation cost.',
    },
    'Humidity Control': {
      rating: 'Poor',
      color: '#F87171',
      label: 'Attic Ducts Reduce Humidity Control Effectiveness',
      detail: 'DFW has 65-80% relative humidity in spring and fall. Attic duct leaks pull humid air into the system. Condensate drainage in attics is also harder to maintain — algae clogs are more frequent.',
      relocation: 'Conditioned-space installs allow proper dehumidification staging. Consider whole-home dehumidifier addition regardless of location.',
      cost: 'Whole-home dehumidifier: $1,800-3,000 installed. ERV/HRV addition: $2,500-4,500.',
    },
    'Considering Relocation': {
      rating: 'Recommended',
      color: '#4ADE80',
      label: 'DFW Conditions Make Relocation Worth Evaluating',
      detail: 'Ground-level installation in a utility closet or interior mechanical room eliminates the primary efficiency penalty. Best done during system replacement to avoid double-move costs.',
      relocation: 'Combine relocation with equipment replacement for best ROI. New location: interior utility closet, laundry room wall, or dedicated mechanical space.',
      cost: 'Standalone relocation: $2,800-5,500. Combined with system replacement: add $1,500-2,500 to replacement cost.',
    },
  },
  'Ground-Level Slab': {
    'High Energy Bills': {
      rating: 'Good Baseline',
      color: '#4ADE80',
      label: 'Ground-Level Install Eliminates Attic Heat Penalty',
      detail: 'Your air handler is not fighting 150-degree attic air. DFW ground-level installs typically perform 30-40% better than attic equivalents for the same equipment size.',
      relocation: 'Relocation not needed for efficiency. Focus on duct sealing, refrigerant charge verification, and filter maintenance.',
      cost: 'Tune-up to maximize efficiency: $150-300. Duct sealing if leaky: $600-1,200.',
    },
    'Uneven Cooling': {
      rating: 'Investigate Ducts',
      color: '#FBBF24',
      label: 'Ground-Level Units — Uneven Cooling is a Duct Issue',
      detail: 'With ground-level equipment, uneven cooling points to duct sizing, leakage, or register placement — not the air handler location. Manual J load calculation can identify undersized zones.',
      relocation: 'Relocation not the answer here. Commission a duct blaster test to find leaks. Check for blocked or undersized returns.',
      cost: 'Duct blaster test: $300-500. Duct sealing: $600-1,500. Zoning addition: $2,500-5,000.',
    },
    'Equipment Lifespan': {
      rating: 'Extended Life',
      color: '#4ADE80',
      label: 'Ground-Level Install Protects Equipment Longevity',
      detail: 'Interior conditioned-space air handlers run cooler and cleaner. Expect 15-18 years vs 10-12 for attic units in DFW. Fewer capacitor and blower failures.',
      relocation: 'No relocation needed. Maintain with annual tune-up and clean coils every 2 years.',
      cost: 'Annual maintenance: $150-250. Extended lifespan value: $3,000-6,000 vs attic unit.',
    },
    'Humidity Control': {
      rating: 'Optimal Position',
      color: '#4ADE80',
      label: 'Ground-Level Units Handle DFW Humidity Best',
      detail: 'Proper condensate drainage, sealed duct connections, and conditioned-air return all work better at ground level. Your system can dehumidify effectively during DFW spring and fall humidity swings.',
      relocation: 'No relocation needed. Consider whole-home dehumidifier for extreme humidity seasons (April-May, September-October).',
      cost: 'Whole-home dehumidifier if needed: $1,800-3,000 installed.',
    },
    'Considering Relocation': {
      rating: 'No Action Needed',
      color: '#4ADE80',
      label: 'Ground-Level Install is Already Optimal for DFW',
      detail: 'You are already in the most efficient configuration for DFW climate. Ground-level installs outperform attic units by 30-40% and last 3-5 years longer.',
      relocation: 'No relocation recommended. Invest savings in duct sealing, smart thermostat, or whole-home dehumidifier instead.',
      cost: 'Smart thermostat: $300-500 installed. Dehumidifier: $1,800-3,000. Both provide better ROI than unnecessary relocation.',
    },
  },
  'Closet': {
    'High Energy Bills': {
      rating: 'Good Position',
      color: '#4ADE80',
      label: 'Closet Installs Avoid Attic Heat Penalty',
      detail: 'Interior closet installations keep equipment in conditioned space, avoiding the DFW attic efficiency penalty. Main concerns are return air adequacy and filter access.',
      relocation: 'No relocation needed. Ensure return air is properly sized — undersized return is the most common closet HVAC problem.',
      cost: 'Return air upgrade if needed: $400-800. Filter access improvement: $150-300.',
    },
    'Uneven Cooling': {
      rating: 'Check Returns',
      color: '#FBBF24',
      label: 'Closet HVAC — Return Air Restrictions Cause Imbalance',
      detail: 'Tight closets often have undersized return air grilles. Restricted return air causes high static pressure, reducing airflow to all zones. Test: hold paper at return — weak pull means restricted flow.',
      relocation: 'No relocation needed. Enlarging the return air opening or adding a transfer grille is usually the fix.',
      cost: 'Return air enlargement: $300-600. Transfer grilles: $100-200 each.',
    },
    'Equipment Lifespan': {
      rating: 'Good',
      color: '#4ADE80',
      label: 'Conditioned Closet Extends Equipment Life',
      detail: 'Closet-mounted equipment in conditioned space runs at normal operating temperatures. Expect full 15-18 year lifespan if condensate drainage is maintained and return air is adequate.',
      relocation: 'No relocation needed. Annual maintenance and condensate line cleaning is the priority.',
      cost: 'Annual maintenance: $150-250. Condensate flush: included in annual service.',
    },
    'Humidity Control': {
      rating: 'Watch Condensate',
      color: '#FBBF24',
      label: 'Closet Condensate Drainage Requires Attention in DFW',
      detail: 'DFW summer load produces significant condensate — up to 5 gallons per day per ton. Closet drain lines need quarterly algae treatment in DFW summers. Pan overflow is a top cause of water damage.',
      relocation: 'No relocation needed. Install a float switch if not present and treat condensate line quarterly with algae tabs.',
      cost: 'Float switch: $150-250 installed. Algae treatment tabs: $20/year.',
    },
    'Considering Relocation': {
      rating: 'Likely Unnecessary',
      color: '#4ADE80',
      label: 'Closet Position is Efficient — Address Specific Issues Instead',
      detail: 'Interior closet is a good HVAC location in DFW. Relocation is only warranted if the closet is too small for proper airflow or future equipment sizing.',
      relocation: 'Verify closet clearances meet manufacturer specs (typically 6 inches minimum on all sides). If adequate, focus on optimization rather than relocation.',
      cost: 'Clearance modifications if needed: $300-800. New location if required: $2,500-4,500.',
    },
  },
  'Garage': {
    'High Energy Bills': {
      rating: 'Problem Location',
      color: '#F87171',
      label: 'DFW Garages Hit 140 Degrees — Major Efficiency Loss',
      detail: 'Attached DFW garages are nearly as hot as attics in summer. Equipment in garages operates at elevated ambient temperatures, reducing efficiency and increasing runtime. Expect 20-35% efficiency penalty.',
      relocation: 'Relocation to interior conditioned space is recommended if feasible. Short-term: add insulation to garage ceiling and walls near equipment.',
      cost: 'Garage insulation near equipment: $500-1,200. Relocation to interior: $2,500-4,500.',
    },
    'Uneven Cooling': {
      rating: 'Multiple Causes',
      color: '#FBBF24',
      label: 'Garage Location Compounds Duct and Load Issues',
      detail: 'Long duct runs from garage to living areas, combined with heat gain in the garage space, create uneven cooling. The garage zone itself is typically excluded from conditioning.',
      relocation: 'If ducts run through unconditioned garage ceiling, insulate them to R-8 minimum as first step.',
      cost: 'Duct insulation in garage: $400-900. Relocation: $2,500-4,500 for significant improvement.',
    },
    'Equipment Lifespan': {
      rating: 'Reduced Life',
      color: '#F87171',
      label: 'Garage Heat Reduces Equipment Life by 3-5 Years',
      detail: 'Same heat-driven degradation as attic installs. Capacitors, control boards, and blower motors all fail faster in 140-degree garage ambient temperatures.',
      relocation: 'Relocation to conditioned space adds years to equipment life. Quantify: $4,000 move vs. $2,000-3,000 in extra repairs + early replacement.',
      cost: 'Relocation: $2,500-4,500. Extended life value: $4,000-8,000 over equipment lifecycle.',
    },
    'Humidity Control': {
      rating: 'Poor Conditions',
      color: '#F87171',
      label: 'Garage Installs Have Humidity and IAQ Challenges',
      detail: 'Car exhaust, chemicals, and humidity swings in attached garages can introduce contaminants into the air supply if return air is in the garage. Texas code restricts return air in garages for this reason.',
      relocation: 'Ensure return air is NOT located in garage per IRC/Texas code. Supply only in garage is acceptable with tight sealing.',
      cost: 'Return air relocation if in garage: $600-1,200. Relocation of full unit: $2,500-4,500.',
    },
    'Considering Relocation': {
      rating: 'Recommended',
      color: '#FBBF24',
      label: 'DFW Garage Installs Benefit Significantly from Relocation',
      detail: 'Moving from garage to interior conditioned space recovers efficiency, extends equipment life, and eliminates IAQ concerns. Best combined with system replacement.',
      relocation: 'Target locations: interior utility closet, laundry room, or dedicated mechanical space. Requires duct rerouting — factor into cost.',
      cost: 'Relocation alone: $2,500-4,500. Combined with system replacement: add $1,500-2,500.',
    },
  },
  'Not Sure': {
    'High Energy Bills': {
      rating: 'Find Your Location First',
      color: '#FBBF24',
      label: 'Identify Air Handler Location Before Diagnosing Bills',
      detail: 'Look for the indoor unit — it will be in the attic (pull-down stairs access), a closet (louvered door with filter), garage (wall-mounted), or utility room. The location determines the efficiency profile.',
      relocation: 'Once located, check if it is in conditioned or unconditioned space. Attic and garage = efficiency penalty in DFW.',
      cost: 'HVAC inspection to assess current setup and efficiency losses: $150-300.',
    },
    'Uneven Cooling': {
      rating: 'Diagnose First',
      color: '#FBBF24',
      label: 'Location + Duct Inspection Needed to Diagnose',
      detail: 'Uneven cooling in DFW homes has several causes: hot attic duct runs, undersized returns, refrigerant issues, or equipment sizing. Professional diagnosis identifies the actual cause.',
      relocation: 'HVAC diagnostic ($150-300) will identify whether location or duct issues are the primary driver.',
      cost: 'Diagnostic: $150-300. Then targeted fix based on findings.',
    },
    'Equipment Lifespan': {
      rating: 'Check Age and Location',
      color: '#FBBF24',
      label: 'Age + Location Determines Remaining Life',
      detail: 'Attic/garage units: replace at 10-12 years. Interior units: 15-18 years. If your unit is over 10 years old and in an unconditioned space, budget for replacement in 1-3 years.',
      relocation: 'If replacing, consider relocation to conditioned space — adds $1,500-2,500 but pays back over next unit lifecycle.',
      cost: 'System replacement: $6,000-14,000. With relocation: add $1,500-2,500.',
    },
    'Humidity Control': {
      rating: 'Assess System First',
      color: '#FBBF24',
      label: 'Humidity Issues Require Knowing Your System Location',
      detail: 'DFW humidity problems often trace to duct leaks, undersized equipment, or short-cycling. Location affects which solution applies.',
      relocation: 'Get a Manual J calculation and duct blaster test before deciding on solutions.',
      cost: 'Manual J: $300-600. Duct blaster: $300-500. Then targeted solutions.',
    },
    'Considering Relocation': {
      rating: 'Assess Before Deciding',
      color: '#FBBF24',
      label: 'Identify Current Location to Evaluate Relocation ROI',
      detail: 'Relocation makes strong economic sense for attic and garage units in DFW. Minimal benefit for closet or interior installs already in conditioned space.',
      relocation: 'Have HVAC contractor assess current location and identify best new location. Get written quote including duct modifications.',
      cost: 'Relocation assessment: free with most HVAC companies. Relocation: $2,500-5,500 depending on complexity.',
    },
  },
};

export default function DFWHVACAtticSlab() {
  const [install, setInstall] = useState('');
  const [concern, setConcern] = useState('');
  const result = install && concern ? assessments[install]?.[concern] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🌡️ DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Attic vs Ground-Level HVAC in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW attics reach 150-160 degrees Fahrenheit in summer. Air handlers in attics lose 30-40% of their cooling capacity before the air reaches your rooms. Your installation location is one of the biggest efficiency factors in the Dallas-Fort Worth climate.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[{ label: 'Attic', value: 'Critical inefficiency in DFW heat' }, { label: 'Ground-Level', value: '30-40% more efficient than attic' }, { label: 'Closet', value: 'Good — watch return air sizing' }, { label: 'Garage', value: 'Nearly as bad as attic in DFW summer' }].map(item => (
            <div key={item.label} style={{ background: '#0D2137', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{item.label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Current Installation Location</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {installations.map(i => (
                <button key={i} onClick={() => setInstall(i)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: install === i ? '#F5E642′ : '#1E3A5F', background: install === i ? '#F5E642' : '#0D2137', color: install === i ? '#0A1628' : '#E8F4FD', fontWeight: install === i ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{i}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Your DFW Concern</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {concerns.map(c => (
                <button key={c} onClick={() => setConcern(c)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: concern === c ? '#F5E642′ : '#1E3A5F', background: concern === c ? '#F5E642' : '#0D2137', color: concern === c ? '#0A1628' : '#E8F4FD', fontWeight: concern === c ? 700 : 400, cursor: ’pointer', fontSize: 14 }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0D2137', border: `2px solid ${result.color}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: result.color, marginBottom: 6 }}>Assessment: {result.rating}</div>
              <div style={{ color: '#FFFFFF', fontWeight: 600, marginBottom: 12, fontSize: 16 }}>{result.label}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.detail}</div>
            </div>
            <div style={{ background: '#1E3A5F', border: '1px solid #2563EB', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 8 }}>Relocation Feasibility</div>
              <div style={{ color: '#BFDBFE', lineHeight: 1.6 }}>{result.relocation}</div>
            </div>
            <div style={{ background: '#0D2A1A', border: '1px solid #22543D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 8 }}>DFW Cost Estimates</div>
              <div style={{ color: '#BBF7D0', lineHeight: 1.6 }}>{result.cost}</div>
            </div>
          </div>
        )}
        {!result && (
          <div style={{ background: '#0D2137', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748B' }}>Select your installation location and concern to see your DFW-specific assessment</div>
        )}
      </div>
    </div>
  );
}
