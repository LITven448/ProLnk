import { useState } from 'react';

const safetyData: Record<string, Record<string, { requirements: string[]; gfciExplain: string; bondingExplain: string; cost: string }>> = {
  pool: {
    owned: { requirements: ['All pool equipment (pump, light, heater) on GFCI-protected circuits — NEC 680.22', 'Bonding grid required for all DFW pools: every metal component connected to 8 AWG solid copper bonding wire', 'Pool light niches: GFCI protected, 12V or GFCI-protected 120V only', 'Subpanel dedicated to pool equipment recommended by DFW inspectors', 'All outdoor receptacles within 20 ft of pool must be GFCI'], gfciExplain: 'GFCI (Ground Fault Circuit Interrupter) shuts power in 1/40th of a second when current leaks to ground — preventing electrocution. Critical near water where a person\’s wet skin has low resistance.', bondingExplain: 'Bonding connects all metal components (pump housing, ladder, light housing, water itself) to the same electrical potential. Prevents dangerous voltage gradients in pool water that cause Electric Shock Drowning (ESD).', cost: 'GFCI outlets: $15–$30 each installed. Pool bonding inspection + repair: $150–$500. Rewire non-compliant pool electrical: $800–$3,000.' },
    renting: { requirements: ['Tenant rights: request pool electrical inspection from landlord annually', 'All GFCI and bonding requirements still apply — landlord liability', 'Report any tingling sensation in pool water immediately — sign of voltage gradient', 'Avoid using electrical devices (radios, phones charging) near pool'], gfciExplain: 'DFW rental properties must meet same electrical codes as owner-occupied. Landlords are liable for pool electrical safety.', bondingExplain: 'Bonding in rental pools is often degraded or missing. The "tingling" sensation in pool water is a warning sign of unbonded or faulty electrical.', cost: 'As tenant: $0 — this is landlord responsibility. Document requests in writing.' },
  },
  fountain: {
    owned: { requirements: ['All submersible fountain pumps must be on GFCI-protected outlets', 'Low-voltage (12V/24V) systems safer — transformer must be weatherproof rated', '120V submersible pumps: GFCI required within 6 ft of water source (NEC 680.51)', 'Exterior-rated wiring only — no indoor extension cords outdoors', 'Weatherproof covers on all outdoor outlets'], gfciExplain: 'Fountain motors can develop insulation faults over time. GFCI catches ground faults before they can shock a person or pet touching the water.', bondingExplain: 'Decorative fountains under 5 HP generally do not require bonding grid (unlike pools). However, metal fountain basins should be bonded if children wade or pets drink from them.', cost: 'GFCI outlet install: $80–$200. Weatherproof outlet cover: $10–$25. Low-voltage transformer conversion: $100–$400.' },
    renting: { requirements: ['Check lease: outdoor fountain may require landlord approval', 'Use only low-voltage (12V/24V) solar or transformer systems — safest for renters', 'Never use indoor extension cords for outdoor fountain pumps', 'Disconnect pump during DFW severe storms'], gfciExplain: 'For renters: stick to self-contained solar or 12V fountain systems to avoid wiring liability.', bondingExplain: 'Small decorative fountains generally don\’t require bonding. Prioritize GFCI on any 120V connection.', cost: 'Self-contained solar fountain: $50–$300. No electrical work needed.' },
  },
  pond: {
    owned: { requirements: ['All pond pump circuits: GFCI protected (NEC 680.7)', 'Pond lighting: GFCI required, low-voltage preferred for fish ponds', 'If koi pond > 18" deep and humans can enter: pool bonding rules may apply per local DFW inspector', 'No standard (non-weatherproof) wiring in outdoor pond areas', 'Ground all electrical equipment housings to prevent stray voltage'], gfciExplain: 'Pond pumps run 24/7 and degrade faster than other outdoor equipment. GFCI protects against pump seal failure that allows water into motor windings.', bondingExplain: 'Large water features where people or pets can be immersed: consider bonding the water and metal equipment per pool standards. Most DFW ponds under 18" deep are exempt.', cost: 'GFCI for pond circuit: $80–$250. Pond lighting upgrade to 12V: $200–$600. Full equipment grounding: $100–$300.' },
    renting: { requirements: ['Outdoor pond installation typically requires landlord permission', 'Self-contained pond kits with integrated pumps: safer option', 'Low-voltage lighting only', 'Seasonal disconnect recommended during winter ice storms'], gfciExplain: 'Renters: use plug-in GFCI adapters on any existing outdoor outlet serving a pond pump.', bondingExplain: 'Small renter-installed ponds rarely require bonding. Focus on GFCI protection.', cost: 'Plug-in GFCI adapter: $15–$40. Self-contained pond kit: $200–$800.' },
  },
  hotTub: {
    owned: { requirements: ['Dedicated 240V/50A GFCI circuit required — cannot share circuits', 'GFCI breaker at panel + local disconnect within sight of spa', 'Bonding of all metal components required: frame, water, heater housing, pump housing', 'No overhead power lines within 22.5 ft of hot tub (NEC 680.43)', 'All outlets within 10 ft must be GFCI; none within 5 ft of water'], gfciExplain: 'Hot tubs are the highest-risk outdoor water feature for electrocution. GFCI circuit breaker at the panel (not just at the outlet) is mandatory for all DFW hot tub installations.', bondingExplain: 'Hot tub bonding is identical to pool bonding requirements. The water, jets, heater, frame, and all metal fittings are bonded together. A missing or corroded bond wire can cause deadly voltage differentials.', cost: 'New 240V GFCI circuit installed: $400–$1,200. Bonding inspection and repair: $200–$600. Full hot tub electrical install: $600–$2,000.' },
    renting: { requirements: ['Most DFW landlords prohibit hot tub installation — check lease', 'If landlord-provided hot tub: request GFCI and bonding inspection documentation', 'Never use portable 120V hot tubs on non-GFCI circuits', 'Report any shock sensation immediately to landlord in writing'], gfciExplain: 'Landlord-provided hot tubs must have GFCI protection. If you feel any tingling in the water, exit immediately and do not use until inspected.', bondingExplain: 'Rental hot tub bonding is landlord responsibility. Request documentation of bonding inspection — typically done by a licensed electrician.', cost: 'As tenant: $0 — landlord obligation. Get inspection documentation in writing before use.' },
  },
};

const featureLabels: Record<string, string> = { pool: '🏊 Swimming Pool', fountain: '⛲ Decorative Fountain', pond: '🐟 Garden Pond', hotTub: '♨️ Hot Tub / Spa' };
const situationLabels: Record<string, string> = { owned: '🏡 Homeowner', renting: '🔑 Renter / Tenant' };

export default function DFWOutdoorWaterFeatureSafety() {
  const [feature, setFeature] = useState('');
  const [situation, setSituation] = useState('');
  const result = feature && situation ? safetyData[feature]?.[situation] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>🏡 DFW HOME SYSTEMS GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Outdoor Water Feature Electrical Safety — DFW</h1>
        <p style={{ color: '#A0AABB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Every outdoor water feature in DFW — from pools to decorative fountains — has electrical safety requirements. GFCI protection and pool bonding are not optional: they prevent electrocution, Electric Shock Drowning, and fire.
        </p>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Critical Safety Concepts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { emoji: '🔌', label: 'GFCI Protection', desc: 'Trips in 1/40th second when current leaks. Required at all outdoor water features. Cannot be bypassed.' },
              { emoji: '🔗', label: 'Pool Bonding', desc: 'Connects all metal components to equal potential. Prevents Electric Shock Drowning in DFW pools.' },
              { emoji: '⚠️', label: 'Electric Shock Drowning', desc: 'Unbonded pool water can have voltage gradients that paralyze swimmers. All DFW pools must be bonded.' },
              { emoji: '🌩️', label: 'DFW Storm Risk', desc: 'Lightning and storm damage can compromise GFCI and bonding. Annual inspection recommended after severe weather.' },
            ].map(item => (
              <div key={item.label} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#A0AABB', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Water Feature + Situation Lookup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Water Feature Type</label>
              <select value={feature} onChange={e => setFeature(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select feature...</option>
                {Object.entries(featureLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#A0AABB', fontSize: 13, display: 'block', marginBottom: 6 }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 14 }}>
                <option value="">Select situation...</option>
                {Object.entries(situationLabels).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>ELECTRICAL SAFETY REQUIREMENTS</div>
                {result.requirements.map((req, i) => <div key={i} style={{ color: '#A0AABB', fontSize: 14, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #1E3A5F' }}>• {req}</div>)}
              </div>
              {[
                { label: 'WHAT GFCI PROTECTS AGAINST', val: result.gfciExplain },
                { label: 'WHAT BONDING PROTECTS AGAINST', val: result.bondingExplain },
                { label: 'TYPICAL COSTS', val: result.cost },
              ].map(row => (
                <div key={row.label} style={{ marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{row.label}</div>
                  <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.5 }}>{row.val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>🚨 DFW POOL BONDING REQUIREMENT</div>
          <div style={{ color: '#A0AABB', fontSize: 14, lineHeight: 1.6 }}>Every swimming pool in DFW must have a bonding grid per NEC Article 680 and local DFW city codes. This is inspected at installation and should be inspected every 5 years or after major electrical work. A licensed electrician or pool contractor must verify bonding continuity.</div>
        </div>
      </div>
    </div>
  );
}
