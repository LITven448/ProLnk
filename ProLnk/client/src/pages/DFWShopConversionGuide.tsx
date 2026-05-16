import { useState } from 'react';

const structures = ['Detached Garage (1-car)', 'Detached Garage (2-car)', 'Detached Garage (3-car)', 'Carport (metal)', 'Barn / Agricultural Building', 'Existing Storage Building'];
const workshopTypes = ['Woodworking Shop', 'Metal Fabrication / Welding', 'Auto / Mechanic Shop', 'General DIY & Power Tools', 'Artist Studio / Light Work', 'Home Gym (not workshop)'];

type ConversionPlan = {
  scope: string;
  electrical: string;
  cooling: string;
  insulation: string;
  dust: string;
  flooring: string;
  permits: string;
  cost: string;
  timeline: string;
};

const plans: Record<string, Record<string, ConversionPlan>> = {
  'Detached Garage (2-car)': {
    'Woodworking Shop': {
      scope: '400–500 sq ft conversion: insulate walls/ceiling, add dust collection rough-in, install proper lighting, upgrade electrical panel',
      electrical: 'Upgrade to 200A sub-panel from main. Add 240V circuits for table saw, dust collector, and compressor. Multiple 20A 120V circuits for tools. DFW code requires permit.',
      cooling: 'Mini-split essential — DFW garages hit 120°F+ in summer. 1.5–2-ton mini-split for 2-car garage. Run when working, not 24/7. Budget $3,500–$6,000 installed.',
      insulation: 'R-19 in walls, R-38 in ceiling minimum for DFW. Spray foam on ceiling edges best. Insulated garage door upgrade ($800–$1,500) dramatically helps.',
      dust: 'CRITICAL in DFW heat: sawdust near hot surfaces is a fire risk. Dedicated dust collector + 4" ducted system. Never run dust collector in a hot closed shop — exhaust outside.',
      flooring: 'Epoxy-coated concrete for woodworking — easy cleanup. Anti-fatigue mats at tool stations. Avoid rubber interlocking — sawdust traps underneath.',
      permits: 'DFW sub-panel requires electrical permit. Structural changes require building permit. Mini-split typically inspection required.',
      cost: '$18,000–$35,000 fully equipped (electrical, mini-split, insulation, dust collection, lighting)',
      timeline: '6–10 weeks for full conversion in DFW (permit + contractor scheduling)',
    },
    'Metal Fabrication / Welding': {
      scope: '400–500 sq ft: concrete floor upgrade, fire-rated walls, welding ventilation, heavy electrical, proper storage for gases',
      electrical: '200A sub-panel minimum. Dedicated 240V 50A+ circuit for welder. Additional circuits for plasma cutter, grinder, compressor. DFW requires permit for sub-panel.',
      cooling: 'Evaporative cooler NOT appropriate for welding shop (humidity + sparks). Dedicated exhaust fan system with fresh air intake. Mini-split with protective filter for smoke.',
      insulation: 'Type X drywall (fire-rated) on all walls — required for welding/metalwork in DFW code. Insulate before drywall for thermal control.',
      dust: 'Metal grinding produces combustible dust — dedicated welding fume extractor, not a wood dust collector. Central exhaust system with outside venting mandatory.',
      flooring: 'Bare concrete or hardened concrete — never epoxy for welding (spatter damage). Diamond-grind and seal for easy cleanup. No mats near welding area.',
      permits: 'DFW requires permit for welding shop conversion — fire marshal inspection in some jurisdictions. Sub-panel permit required.',
      cost: '$25,000–$50,000 for proper welding shop conversion with ventilation and electrical',
      timeline: '8–14 weeks — ventilation and fire-rated construction add complexity',
    },
    'Auto / Mechanic Shop': {
      scope: '400–500 sq ft: floor drain (permit required), heavy electrical, oil storage compliance, adequate ceiling height for lifts',
      electrical: '200A sub-panel. 240V 50A for lift. Compressed air compressor circuit. DFW floor drain and oil separator required by code for automotive fluid disposal.',
      cooling: 'Mini-split with high capacity — vehicles bring in heat. 2-ton minimum for 2-car space. Also: exhaust fan for running engines (CO risk in DFW heat).',
      insulation: 'Insulate walls and ceiling — DFW summer heat makes uninsulated auto work miserable. R-19 walls, R-30 ceiling minimum.',
      dust: 'Not the primary concern for auto shops — focus on CO/exhaust ventilation. Fresh air intake + exhaust fan system when engines running.',
      flooring: 'Floor drain + oil separator (permit required in DFW). Epoxy OK for general areas. Drain placement critical before epoxy.',
      permits: 'Floor drain requires plumbing permit in DFW. Sub-panel electrical permit. Some DFW cities require commercial permit for lifts.',
      cost: '$30,000–$60,000 for full auto shop conversion with lift, drain, electrical, mini-split',
      timeline: '10–16 weeks including permit approvals in DFW',
    },
    'General DIY & Power Tools': {
      scope: 'Modest conversion: insulate, add 240V circuits, upgrade lighting, mini-split — functional shop for occasional use',
      electrical: '100A sub-panel sufficient for general DIY. Two 240V circuits (table saw + compressor). Multiple 20A 120V circuits. DFW permit required.',
      cooling: '1-ton mini-split sufficient for occasional use — DFW garages are unbearable without cooling in summer months.',
      insulation: 'R-13 walls minimum, R-30 ceiling — DFW budget approach. Insulated garage door huge payback in comfort.',
      dust: 'Shop vac with HEPA filter as first step. Add wall-mounted dust collector as upgrade. Basic dust management sufficient for occasional DIY.',
      flooring: 'Epoxy coating ($1,500–$3,500 DIY or pro) — major comfort and cleanup upgrade for DFW shop.',
      permits: 'Sub-panel permit in DFW. Mini-split inspection may be required depending on city.',
      cost: '$8,000–$18,000 for functional general-purpose DFW shop conversion',
      timeline: '4–6 weeks for basic conversion',
    },
  },
};

const fallbackPlan: ConversionPlan = {
  scope: 'Full assessment needed — scope varies significantly by structure condition and workshop type',
  electrical: 'Most workshop types need 100–200A sub-panel upgrade. DFW requires permit for all sub-panel installs. Budget $3,000–$8,000 for electrical alone.',
  cooling: 'DFW mini-split is non-negotiable for any workshop — 120°F+ summer temps make uninsulated/uncooled work dangerous. Budget $3,500–$6,000 installed.',
  insulation: 'R-19 walls, R-38 ceiling minimum for DFW climate. Insulated garage door upgrade dramatically reduces heat load.',
  dust: 'Fire risk in DFW heat — proper dust/fume collection must be matched to workshop type (wood vs metal vs automotive).',
  flooring: 'Depends on workshop type — epoxy for wood/general, bare concrete for welding, drain for automotive.',
  permits: 'Sub-panel, structural, HVAC, and plumbing (if drain) all require separate permits in DFW. Budget 4–8 weeks for permit approval.',
  cost: '$8,000–$60,000 depending on structure, workshop type, and scope of electrical/HVAC upgrades',
  timeline: '4–16 weeks depending on permit complexity and contractor availability in DFW',
};

export default function DFWShopConversionGuide() {
  const [structure, setStructure] = useState('');
  const [workshopType, setWorkshopType] = useState('');

  const result = structure && workshopType ? (plans[structure]?.[workshopType] ?? fallbackPlan) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', paddingBottom: 60 }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1A2A40 100%)', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 40 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Shop Conversion Guide</h1>
        <p style={{ color: '#A0B0C8', fontSize: 15, maxWidth: 580, margin: '0 auto' }}>Converting a detached structure into a proper workshop in DFW requires solving three DFW-specific challenges: brutal summer heat, electrical capacity, and fire-safe dust management.</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ background: '#3A1010', border: '1px solid #8B2020', borderRadius: 10, padding: 16, margin: '28px 0 20px' }}>
          <div style={{ color: '#F5A0A0', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>⚠️ DFW Summer Heat Warning</div>
          <p style={{ color: '#E0C0C0', fontSize: 13, margin: 0 }}>Uninsulated DFW garages reach 120–130°F in summer. Running power tools in this heat is a fire risk (sawdust, motor overheating) and a health risk. Mini-split + insulation is not optional — it's a safety requirement for DFW workshop operation.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 20px' }}>🔍 Get Your DFW Shop Conversion Plan</h2>
          {[
            { label: 'Available Structure', value: structure, setter: setStructure, options: structures },
            { label: 'Workshop Type', value: workshopType, setter: setWorkshopType, options: workshopTypes },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#A0B0C8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8E8E8', border: '1px solid #2A4A6F', borderRadius: 8, fontSize: 14 }}>
                <option value="">Select {label}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, border: '2px solid #F5E642' }}>
              {[
                { label: '📋 Conversion Scope', value: result.scope },
                { label: '⚡ Electrical Requirements', value: result.electrical },
                { label: '❄️ DFW Cooling Solution', value: result.cooling },
                { label: '🧱 Insulation (DFW Critical)', value: result.insulation },
                { label: '🌬️ Dust/Fume Management', value: result.dust },
                { label: '🏗️ Flooring', value: result.flooring },
                { label: '📝 DFW Permits Required', value: result.permits },
                { label: '💰 Total Investment', value: result.cost },
                { label: '📅 Timeline', value: result.timeline },
              ].map(({ label, value }) => (
                <div key={label} style={{ marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                  <div style={{ color: '#C0D0E0', fontSize: 14, lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
