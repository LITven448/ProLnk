import { useState } from 'react';

const situations = [
  'Air Handler in Garage',
  'Condenser in Garage',
  'Both Units in Garage',
  'Planning Garage Install',
  'Garage Gets Too Hot',
];
const goals = [
  'Understand Efficiency Impact',
  'Protect Existing Equipment',
  'Reduce Energy Bills',
  'Extend Equipment Life',
  'Assess Relocation',
];

type GarageResult = { impact: string; severity: string; color: string; protections: string[]; alternatives: string[]; cost: string };
const garageData: Record<string, Record<string, GarageResult>> = {
  'Air Handler in Garage': {
    'Understand Efficiency Impact': {
      impact: 'DFW garages reach 130-145 degrees Fahrenheit in summer. Your air handler is working in ambient temperatures 100 degrees above what it was designed for. This causes 20-35% efficiency loss as the unit works harder to cool incoming air before conditioning it.',
      severity: 'High',
      color: '#F87171',
      protections: ['Insulate garage ceiling to R-38 minimum', 'Add radiant barrier under roof deck', 'Install mini-split to condition the garage space itself', 'Seal all gaps around garage door with quality weatherstripping'],
      alternatives: ['Relocate air handler to interior utility closet or laundry room', 'Create a conditioned mechanical room within the garage using insulated walls'],
      cost: 'Garage insulation: $1,200-2,500. Mini-split for garage: $2,500-4,500. Full relocation: $2,800-5,000.',
    },
    'Protect Existing Equipment': {
      impact: 'Blower motors in DFW garage environments fail 3-4 years earlier than conditioned-space installs. Capacitors are the first to fail from heat — DFW homeowners with garage air handlers replace capacitors every 2-4 years vs every 6-8 years in conditioned spaces.',
      severity: 'High',
      color: '#F87171',
      protections: ['Add a high-temperature rated capacitor (uprated 10-15%)', 'Install a small ventilation fan to reduce garage ambient temp near unit', 'Shade the garage door wall from afternoon sun with an awning or shade screen', 'Check and clean coils annually — DFW dust builds faster in garages'],
      alternatives: ['Annual service contract — catch heat-related failures before they cascade', 'Upgrade to a unit rated for higher ambient temps (some commercial units)'],
      cost: 'Annual maintenance contract: $200-350. Capacitor upgrade: $150-250. Awning: $400-1,200.',
    },
    'Reduce Energy Bills': {
      impact: 'For every 1 degree of ambient temperature reduction in your garage, your HVAC efficiency improves approximately 0.5%. Getting from 140 to 90 degrees via insulation and ventilation can recover 15-20% of efficiency — roughly $200-500 per year at DFW utility rates.',
      severity: 'Medium',
      color: '#FBBF24',
      protections: ['Insulate garage ceiling to R-38 and walls to R-15', 'Install a ridge vent or power attic ventilator above garage', 'Light-colored garage door or door insulation kit ($100-200)', 'Seal ductwork in garage with mastic — duct leaks compound heat gain'],
      alternatives: ['Relocate air handler to save full 20-35% efficiency penalty', 'Add whole-home energy monitoring to quantify exact losses'],
      cost: 'Insulation package: $1,500-3,500. Energy monitoring: $200-500. Relocation payback: 5-8 years at DFW rates.',
    },
    'Extend Equipment Life': {
      impact: 'Expected lifespan for air handler in DFW garage: 10-12 years. In conditioned interior space: 15-18 years. That 3-6 year difference represents $4,000-8,000 in avoided replacement costs over two equipment cycles.',
      severity: 'High',
      color: '#F87171',
      protections: ['Annual professional maintenance — catches heat-related wear early', 'Quarterly filter changes — DFW garages accumulate dust and debris faster', 'Install a thermostat-controlled garage ventilation fan to reduce peak temps', 'Keep unit away from garage door opening — exhaust heat from cars accelerates corrosion'],
      alternatives: ['Relocation to conditioned space is the only way to fully recover normal lifespan', 'If unit is over 8 years old, plan replacement budget for years 10-12'],
      cost: 'Maintenance contract: $200-350/yr. Garage ventilation fan: $300-600. Relocation: $2,800-5,000.',
    },
    'Assess Relocation': {
      impact: 'Relocating an air handler from a DFW garage to a conditioned interior space is one of the highest-ROI HVAC moves available. Efficiency gain: 20-35%. Lifespan extension: 4-6 years. Comfort improvement: significant. Best done concurrent with system replacement.',
      severity: 'Opportunity',
      color: '#4ADE80',
      protections: ['If staying in garage temporarily: max insulation, shade, and ventilation'],
      alternatives: ['Interior utility closet (most common target location)', 'Laundry room wall or closet', 'Dedicated insulated mechanical room within garage (creates conditioned zone)', 'Attic — worse than garage but eliminates IAQ return air concerns'],
      cost: 'Standalone relocation: $2,800-5,000. With system replacement: add $1,500-2,500 to replacement cost. ROI: 6-10 years.',
    },
  },
  'Condenser in Garage': {
    'Understand Efficiency Impact': {
      impact: 'Condensers in enclosed garages cannot reject heat properly. They require fresh outdoor air to dump heat from the refrigerant cycle. In a closed garage, they recirculate hot air, reducing capacity by 30-50% and risking high-pressure lockout in summer.',
      severity: 'Critical',
      color: '#F87171',
      protections: ['Leave garage door open during operation — not practical for security', 'Install through-wall louvers for condenser airflow', 'Add an exhaust fan to pull hot air out as condenser rejects heat'],
      alternatives: ['Condensers belong outdoors — relocate to exterior pad. This is almost always necessary.', 'Mini-split condenser outside with air handler inside garage is an alternative for garage conditioning'],
      cost: 'Outdoor pad and relocation: $400-1,000. Through-wall louvers if staying: $600-1,200.',
    },
    'Protect Existing Equipment': {
      impact: 'An enclosed condenser will trip high-pressure safety within hours on a DFW summer day. Repeated high-pressure trips damage the compressor — the most expensive component at $1,500-3,500 to replace.',
      severity: 'Critical',
      color: '#F87171',
      protections: ['Ensure adequate ventilation immediately — open louvers or fans', 'Install a high-pressure switch if not present', 'Monitor refrigerant pressure — high pressure on return is the warning sign'],
      alternatives: ['Move condenser outdoors — this is a safety and equipment protection necessity, not optional'],
      cost: 'Condenser relocation outdoors: $400-1,000. Compressor replacement if damaged: $1,500-3,500.',
    },
    'Reduce Energy Bills': { impact: 'Enclosed condenser is causing massive efficiency losses — likely 30-50%. Energy bills will drop significantly after relocation.', severity: 'Critical', color: '#F87171', protections: ['No effective mitigation — condenser must be in outdoor air'], alternatives: ['Move condenser outdoors immediately'], cost: 'Outdoor relocation: $400-1,000. Payback in energy savings: typically under 18 months.' },
    'Extend Equipment Life': { impact: 'Enclosed condenser shortens compressor life dramatically. High-pressure events cause compressor valve damage that accumulates over time.', severity: 'Critical', color: '#F87171', protections: ['Move outdoors is the only real protection'], alternatives: ['Relocate condenser to outdoor pad'], cost: 'Outdoor relocation: $400-1,000 — less than one compressor replacement.' },
    'Assess Relocation': { impact: 'Condenser relocation from enclosed garage to outdoor pad is straightforward and necessary. Line set may need extension — typically 5-15 additional feet.', severity: 'Recommended', color: '#4ADE80', protections: ['Temporary: louvers for airflow if relocation cannot be immediate'], alternatives: ['East or north side of home — avoid west sun exposure in DFW', 'Elevated pad to avoid flooding in DFW heavy rain events'], cost: 'Outdoor relocation with line set extension: $600-1,500.' },
  },
  'Both Units in Garage': {
    'Understand Efficiency Impact': { impact: 'Both units in a DFW garage combines all penalties: air handler efficiency loss (20-35%) plus condenser heat rejection failure (30-50%). The system effectively operates at 40-60% of rated capacity in summer.', severity: 'Critical', color: '#F87171', protections: ['Move condenser outdoors as first priority — largest immediate gain', 'Insulate garage to reduce air handler ambient temperature'], alternatives: ['Full system relocation: air handler to interior, condenser to outdoor pad'], cost: 'Condenser outdoor move: $600-1,500. Air handler interior relocation: $2,800-5,000. Full relocation: $4,000-7,000.' },
    'Protect Existing Equipment': { impact: 'Both units under garage stress will fail earlier. Compressor (condenser) and blower motor (air handler) are the most heat-vulnerable components. Expect failures 4-6 years early.', severity: 'Critical', color: '#F87171', protections: ['Annual maintenance contract is essential', 'Move condenser outdoors immediately to protect compressor'], alternatives: ['Full relocation at next system replacement'], cost: 'Annual contract: $250-400. Condenser emergency relocation: $600-1,500.' },
    'Reduce Energy Bills': { impact: 'Full relocation of both units could reduce energy bills by 35-55% from current performance. At DFW average HVAC costs, that is $600-1,500 per year in savings.', severity: 'High', color: '#F87171', protections: ['Stage improvement: condenser outdoor first, then air handler interior'], alternatives: ['Full relocation combined with system replacement for maximum impact'], cost: 'Full relocation: $4,000-7,000. Annual savings: $600-1,500. Payback: 4-7 years.' },
    'Extend Equipment Life': { impact: 'Both units in garage will fail significantly earlier. Every year of delay in relocation costs equipment life.', severity: 'Critical', color: '#F87171', protections: ['Move condenser outdoors — immediate equipment protection', 'Max garage insulation and ventilation for air handler'], alternatives: ['Plan full relocation with next system replacement — do not pay for another attic or garage install'], cost: 'Life extension value: $6,000-12,000 over two equipment cycles.' },
    'Assess Relocation': { impact: 'Full relocation of both units in a DFW garage is the highest-ROI HVAC project available. Efficiency, lifespan, comfort, and IAQ all improve significantly.', severity: 'Recommended', color: '#4ADE80', protections: ['Stage it: condenser first (quick win), then air handler at replacement time'], alternatives: ['Combined relocation with system replacement maximizes ROI'], cost: 'Phased: $600-1,500 (condenser now) + $1,500-2,500 extra at replacement. One-time full: $4,000-7,000.' },
  },
  'Planning Garage Install': {
    'Understand Efficiency Impact': { impact: 'Do not install HVAC in a DFW garage. It will operate at 60-80% efficiency from day one and degrade faster. The contractor proposing this either lacks DFW experience or is taking the lowest-cost installation path at your expense.', severity: 'Prevent This', color: '#F87171', protections: ['Refuse garage install', 'Require interior air handler location in contract'], alternatives: ['Interior utility closet', 'Laundry room', 'Dedicated mechanical room', 'Well-ventilated interior space'], cost: 'Interior location adds $500-1,500 to install cost. Pays back in 2-4 years vs garage efficiency losses.' },
    'Protect Existing Equipment': { impact: 'A new unit in a DFW garage will underperform and fail early. Do not start with this disadvantage.', severity: 'Prevent This', color: '#F87171', protections: ['Choose interior installation location from the start'], alternatives: ['Get competitive bids specifying interior air handler location'], cost: 'Interior location premium: $500-1,500. Worth every dollar in DFW climate.' },
    'Reduce Energy Bills': { impact: 'Interior installation from the start gives you the best possible efficiency baseline. Garage install will cost you $400-900 per year more in DFW.', severity: 'Prevent This', color: '#F87171', protections: ['Interior location is the prevention'], alternatives: ['Specify SEER 18+ equipment in a conditioned interior space'], cost: 'Energy savings vs garage install: $400-900/yr. Over 15-year equipment life: $6,000-13,500.' },
    'Extend Equipment Life': { impact: 'Interior installs last 15-18 years in DFW. Garage installs last 10-12 years. The location choice you make today determines when you spend $8,000-14,000 on the next system.', severity: 'Prevent This', color: '#F87171', protections: ['Interior location is the only option for full equipment life'], alternatives: ['Any interior conditioned space — closet, laundry, utility room, mechanical space'], cost: 'Life extension value alone justifies $1,500 location premium.' },
    'Assess Relocation': { impact: 'You are planning a new install — choose the right location now. No relocation needed in the future if you install correctly today.', severity: 'Opportunity', color: '#4ADE80', protections: ['Specify interior location in writing with contractor'], alternatives: ['Review all interior location options with HVAC contractor before signing contract'], cost: 'Interior location add: $500-1,500. Zero future relocation cost. Optimal lifetime ROI.' },
  },
  'Garage Gets Too Hot': {
    'Understand Efficiency Impact': { impact: 'If your garage already gets extremely hot, any HVAC equipment there will be severely affected. DFW garages that hit 140 degrees are above the operating limit for most residential HVAC components.', severity: 'High', color: '#FBBF24', protections: ['Insulate garage ceiling to R-38', 'Add radiant barrier foil under roof deck', 'Install powered attic ventilation above garage', 'Light-colored or insulated garage door'], alternatives: ['Relocate HVAC equipment to interior conditioned space if any equipment is currently in the garage'], cost: 'Garage cooling package (insulation + ventilation): $1,500-4,000. Equipment relocation if needed: $2,800-5,000.' },
    'Protect Existing Equipment': { impact: 'Reducing garage ambient temperature protects all equipment — HVAC, water heater, vehicles, and stored items. Every 10-degree reduction in garage temperature meaningfully extends equipment life.', severity: 'Medium', color: '#FBBF24', protections: ['Insulation is the highest-impact protection measure', 'Garage door insulation kit as first step ($100-300)', 'Shade west-facing garage doors from afternoon DFW sun'], alternatives: ['For HVAC equipment specifically: interior relocation is the complete solution'], cost: 'Garage door insulation kit: $150-300. Full insulation package: $1,500-4,000.' },
    'Reduce Energy Bills': { impact: 'A 50-degree reduction in garage ambient temperature (from 140 to 90) through insulation can reduce whole-home cooling bills by 8-15% if HVAC equipment is in the garage.', severity: 'Medium', color: '#FBBF24', protections: ['Air sealing between garage and living space', 'Insulate the door between garage and house to R-13 minimum', 'Insulate garage ceiling and walls adjacent to living space'], alternatives: ['Remove HVAC from garage for full efficiency recovery'], cost: 'Garage air sealing and insulation: $1,500-4,000. Payback: 3-7 years at DFW rates.' },
    'Extend Equipment Life': { impact: 'Every degree you reduce garage ambient temperature extends equipment life. Target 90-95 degrees maximum in DFW garages with HVAC equipment.', severity: 'Medium', color: '#FBBF24', protections: ['Radiant barrier is highest-impact single measure for garage temperature', 'Combine with powered ventilation for best results'], alternatives: ['Interior relocation for equipment is the complete and permanent solution'], cost: 'Radiant barrier: $800-1,500. Powered ventilation: $400-800. Full package: $1,500-3,500.' },
    'Assess Relocation': { impact: 'If your garage already gets extremely hot and HVAC equipment is there, relocation to conditioned interior space is the most impactful move available.', severity: 'Recommended', color: '#4ADE80', protections: ['Short-term: maximum insulation and ventilation to reduce ambient heat while planning relocation'], alternatives: ['Interior utility closet', 'Laundry room', 'Insulated mechanical room'], cost: 'Interior relocation: $2,800-5,000. ROI vs garage efficiency losses and reduced lifespan: 5-9 years.' },
  },
};

export default function DFWHVACGarageInstall() {
  const [situation, setSituation] = useState('');
  const [goal, setGoal] = useState('');
  const result = situation && goal ? garageData[situation]?.[goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🚗 DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Garage HVAC Installation in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW garages reach 130-145 degrees Fahrenheit in summer — nearly as hot as attics. HVAC equipment in garages operates under extreme heat stress, losing efficiency and lifespan. This guide covers the real impact and your options.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[{ stat: '140°F', label: 'Peak DFW garage temp' }, { stat: '25-35%', label: 'Efficiency loss in garage' }, { stat: '3-5 yrs', label: 'Early failure vs interior' }].map(item => (
            <div key={item.label} style={{ background: '#0D2137', borderRadius: 10, padding: 14, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22 }}>{item.stat}</div>
              <div style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Your Garage Situation</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSituation(s)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: situation === s ? '#F5E642' : '#1E3A5F', background: situation === s ? '#F5E642' : '#0D2137', color: situation === s ? '#0A1628' : '#E8F4FD', fontWeight: situation === s ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Your Goal</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {goals.map(g => (
                <button key={g} onClick={() => setGoal(g)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: goal === g ? '#F5E642' : '#1E3A5F', background: goal === g ? '#F5E642' : '#0D2137', color: goal === g ? '#0A1628' : '#E8F4FD', fontWeight: goal === g ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{g}</button>
              ))}
            </div>
          </div>
        </div>
        {result && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0D2137', border: `2px solid ${result.color}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: result.color, marginBottom: 8, fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5 }}>Severity: {result.severity}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.impact}</div>
            </div>
            <div style={{ background: '#1A2F1A', border: '1px solid #22543D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 10 }}>Protection Measures</div>
              {result.protections.map((p, i) => <div key={i} style={{ color: '#BBF7D0', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #4ADE80', fontSize: 14 }}>{p}</div>)}
            </div>
            <div style={{ background: '#1E3A5F', border: '1px solid #2563EB', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 10 }}>Better Alternatives</div>
              {result.alternatives.map((a, i) => <div key={i} style={{ color: '#BFDBFE', marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #93C5FD', fontSize: 14 }}>{a}</div>)}
            </div>
            <div style={{ background: '#0D2137', border: '1px solid #475569', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Cost Estimates</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>{result.cost}</div>
            </div>
          </div>
        )}
        {!result && (
          <div style={{ background: '#0D2137', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748B' }}>Select your garage situation and goal to see DFW-specific impact and solutions</div>
        )}
      </div>
    </div>
  );
}
