import { useState } from 'react';

type PestResult = { pest: string; urgency: string; color: string; exclusionApproach: string; cost: string; warnings: string[] };

const pestMatrix: Record<string, PestResult> = {
  'scratching-daytime': {
    pest: 'Squirrels (most likely)',
    urgency: 'Address within 2 weeks',
    color: '#FF9944',
    exclusionApproach: 'Squirrel exclusion via one-way doors at entry points, followed by sealing with galvanized steel mesh. Trapping alone does not work — new squirrels will find the same entry.',
    cost: '$300 to $600 for exclusion in DFW market. Repairs to entry points billed separately.',
    warnings: [
      'Squirrels gnaw on electrical wiring — a leading cause of attic fires in DFW homes.',
      'Baby season is January-February and August-September. Exclusion during these windows risks trapping young inside.',
      'Do not poison squirrels in the attic — carcasses cause odor and fly infestations.',
      'Galvanized hardware cloth (half-inch) is the correct exclusion material — standard window screen fails within months.',
    ],
  },
  'scratching-nighttime': {
    pest: 'Roof Rats or Raccoons (most likely)',
    urgency: 'Address within 1 week — roof rats are prolific breeders',
    color: '#FF4444',
    exclusionApproach: 'Roof rat exclusion requires sealing all gaps larger than a quarter-inch. Raccoon exclusion uses heavy-gauge hardware cloth at roof vents, gable vents, and eave gaps. Both require professional inspection to find all entry points.',
    cost: 'Roof rats: $400 to $800. Raccoons: $500 to $1,200 depending on entry point repairs needed.',
    warnings: [
      'Roof rats are the dominant attic rodent in DFW — Norway rats prefer ground-level entry.',
      'Rat urine and droppings in attic insulation are a health hazard requiring remediation.',
      'Raccoons can tear through standard roof vent covers — only welded wire or heavy aluminum stops them.',
      'Chewed wiring found during inspection may require an electrician to assess before re-insulating.',
      'Roof rats multiply fast — a pair becomes 40+ in a single year without intervention.',
    ],
  },
  'droppings-only': {
    pest: 'Roof Rats (most likely) or Mice',
    urgency: 'Address within 1 to 2 weeks',
    color: '#FF9944',
    exclusionApproach: 'Set snap traps (not glue boards) immediately to reduce population. Then schedule full exclusion — find and seal all entry points. Rodenticide bait stations are an option for perimeter control but do not address entry points.',
    cost: '$350 to $700 for full exclusion and initial trapping in DFW market.',
    warnings: [
      'Rat droppings in attic insulation indicate an established colony, not just a scout.',
      'Check for gnaw marks on wiring, HVAC duct boots, and pipe insulation in the attic.',
      'Seal entry points with copper mesh or galvanized hardware cloth — rats gnaw through foam and caulk.',
      'Replace contaminated insulation after exclusion — droppings harbor hantavirus and leptospirosis.',
    ],
  },
  'animal-visible': {
    pest: 'Raccoon (most likely if large) or Opossum',
    urgency: 'Address within 48 hours — raccoons establish denning sites rapidly',
    color: '#FF4444',
    exclusionApproach: 'Live trapping with licensed wildlife removal professional, followed by exclusion of all entry points. Texas law prohibits relocating raccoons more than 10 miles — most wildlife removal companies provide legal on-site euthanasia.',
    cost: '$200 to $500 for removal plus $400 to $900 for full exclusion in DFW market.',
    warnings: [
      'Female raccoons with young are aggressive — do not approach or attempt DIY removal.',
      'Check for baby raccoons before sealing entry points — orphaned young cause additional damage trying to exit.',
      'Raccoon roundworm (Baylisascaris) is present in droppings and requires professional remediation gear.',
      'Inspect HVAC ductwork in the attic — raccoons commonly damage insulated flex duct.',
    ],
  },
  'odor-only': {
    pest: 'Dead rodent or animal (most likely)',
    urgency: 'Locate within 1 to 2 weeks — odor indicates decomposition',
    color: '#FF9944',
    exclusionApproach: 'Locate and remove carcass, deodorize affected area, then inspect for live infestation and entry points. Dead rodents after poison use are common — exclusion is the permanent solution.',
    cost: '$150 to $350 for carcass location and removal in DFW market.',
    warnings: [
      'Odor from attic rodent deaths is strongest at 3 to 5 days after death.',
      'Flies and maggots follow carcasses — inspect ceiling fixtures and HVAC vents for entry points into living spaces.',
      'If odor follows prior poison use, switch to exclusion-only approach — bait stations create recurring carcass problems.',
    ],
  },
};

const signOptions = [
  { value: 'scratching-daytime', label: 'Scratching or running sounds during the day' },
  { value: 'scratching-nighttime', label: 'Scratching or running sounds at night' },
  { value: 'droppings-only', label: 'Droppings found in attic (no animal seen)' },
  { value: 'animal-visible', label: 'Animal seen entering or inside attic' },
  { value: 'odor-only', label: 'Foul odor coming from attic area' },
];

export default function DFWAtticPestGuide() {
  const [sign, setSign] = useState('');

  const result = sign ? pestMatrix[sign] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐿️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Attic Pest Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 24, lineHeight: 1.6 }}>
          DFW attics are among the most pest-prone in Texas. The combination of mild winters, abundant mature tree canopy, and aging housing stock
          creates ideal conditions for roof rats, squirrels, and raccoons to establish attic colonies.
          Beyond the structural damage, attic pests that chew electrical wiring are a direct fire hazard.
        </p>
        <div style={{ background: '#162844', borderRadius: 10, padding: '14px 18px', marginBottom: 28 }}>
          <strong style={{ color: '#F5E642' }}>DFW Pest Overview:</strong>
          <ul style={{ color: '#8FA3BF', marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
            <li><strong style={{ color: '#E8EDF5' }}>Roof rats:</strong> Most common DFW attic pest — enter through gaps as small as a quarter. Active year-round.</li>
            <li><strong style={{ color: '#E8EDF5' }}>Squirrels:</strong> Fox squirrels dominate DFW. Most active at dawn and dusk. Peak entry in fall when seeking winter shelter.</li>
            <li><strong style={{ color: '#E8EDF5' }}>Raccoons:</strong> Common in older DFW neighborhoods with mature tree canopy. Strong enough to open standard roof vents.</li>
          </ul>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Identify Your Pest Problem</h2>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>What Signs Are You Observing?</label>
          <select value={sign} onChange={e => setSign(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value="">Select observed signs...</option>
            {signOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ marginBottom: 8 }}><strong style={{ color: '#F5E642' }}>Most Likely Pest:</strong> <span style={{ color: '#E8EDF5', fontWeight: 600 }}>{result.pest}</span></div>
              <div style={{ color: result.color, fontWeight: 600, marginBottom: 10 }}>{result.urgency}</div>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#F5E642' }}>Exclusion Approach:</strong> <span style={{ color: '#8FA3BF' }}>{result.exclusionApproach}</span></div>
              <div style={{ marginBottom: 12 }}><strong style={{ color: '#F5E642' }}>Estimated DFW Cost:</strong> <span style={{ color: '#8FA3BF' }}>{result.cost}</span></div>
              <strong style={{ color: '#F5E642' }}>Important Warnings:</strong>
              <ul style={{ paddingLeft: 20, color: '#8FA3BF', lineHeight: 1.8, marginTop: 8 }}>
                {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ DFW Attic Pest Prevention</h2>
          {[
            { icon: '🌳', title: 'Trim tree branches', body: 'Keep branches at least 8 feet from the roofline. Overhanging branches are the primary access route for roof rats and squirrels in DFW.' },
            { icon: '🔲', title: 'Inspect roof vents annually', body: 'Check all ridge vents, gable vents, and soffit vents for damage or gaps. Replace damaged vents with wildlife-resistant models.' },
            { icon: '🔌', title: 'Check electrical entry points', body: 'Where utility lines enter the home are common gaps. Seal with galvanized hardware cloth — foam alone is not enough.' },
            { icon: '📅', title: 'Annual attic inspection', body: 'Have a wildlife exclusion professional inspect before fall each year. Catching entry points early costs far less than post-infestation remediation.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
              <div><strong style={{ color: '#E8EDF5' }}>{item.title}:</strong> <span style={{ color: '#8FA3BF' }}>{item.body}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
