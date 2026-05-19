import { useState } from 'react';

type InspectionResult = { timing: string; included: string[]; cost: string; urgency: string; color: string };

const inspectionData: Record<string, Record<string, InspectionResult>> = {
  'wood-burning': {
    'rarely': {
      timing: 'Annual inspection required regardless of use frequency',
      urgency: 'Schedule before next use — even light use leaves creosote deposits',
      color: '#FF9944',
      cost: '$150 to $250 for inspection and basic cleaning in DFW market',
      included: [
        'Visual inspection of firebox, damper, smoke shelf, and smoke chamber',
        'Full chimney interior inspection with video camera system',
        'Animal nest check — DFW squirrels and birds commonly nest in unused chimneys',
        'Creosote deposit assessment and classification (Class 1, 2, or 3)',
        'Crown and cap inspection for DFW weather damage (hail, freeze-thaw cycles)',
        'Masonry inspection for spalling or mortar deterioration',
      ],
    },
    'monthly': {
      timing: 'Annual inspection plus cleaning before season start (October)',
      urgency: 'Do not use again until inspected — frequent use builds creosote rapidly',
      color: '#FF4444',
      cost: '$200 to $350 for full inspection and Level 2 cleaning in DFW market',
      included: [
        'Full video inspection of all accessible and inaccessible areas',
        'Creosote removal — Class 2 or 3 deposits require chemical treatment before brushing',
        'Damper operation test and adjustment',
        'Smoke chamber inspection for corbeling cracks',
        'Firebox refractory panel inspection — common failure point in DFW homes',
        'Cap and chase cover inspection for rust and wildlife entry gaps',
      ],
    },
    'never': {
      timing: 'Inspection before any first use — absolutely required',
      urgency: 'URGENT: An uninspected chimney can have animal nests, debris, or structural damage',
      color: '#FF4444',
      cost: '$150 to $250 plus potential repair costs if issues found',
      included: [
        'Full Level 2 video inspection per NFPA 211 standards',
        'Animal nest removal — DFW raccoons and squirrels commonly occupy unused chimneys',
        'Debris clearance from the flue and smoke shelf',
        'Complete structural assessment before certifying safe for use',
        'Gas line check if this is a wood-to-gas converted fireplace',
      ],
    },
  },
  'gas-insert': {
    'rarely': {
      timing: 'Annual inspection recommended — gas appliances require yearly safety check',
      urgency: 'Gas fireplaces still vent combustion gases. Annual inspection prevents CO risk.',
      color: '#F5E642',
      cost: '$100 to $180 for gas fireplace inspection in DFW market',
      included: [
        'Burner and pilot inspection for proper ignition',
        'Venting system inspection for blockage or corrosion',
        'Gas valve and connection leak test',
        'Glass panel inspection for cracks that allow CO entry into the room',
        'Thermocouple and thermopile function test',
        'Annual cleaning of burner and decorative logs or media',
      ],
    },
    'monthly': {
      timing: 'Annual inspection before season start plus mid-season check recommended',
      urgency: 'Heavy gas fireplace use warrants extra attention to venting integrity',
      color: '#FF9944',
      cost: '$130 to $200 for full-service inspection and cleaning in DFW market',
      included: [
        'Full venting system inspection including termination cap',
        'Burner orifice cleaning and calibration',
        'Blower motor inspection and lubrication',
        'Gas pressure test at the appliance',
        'CO detector placement verification in adjacent rooms',
      ],
    },
    'never': {
      timing: 'Inspection and service before first use — gas appliances degrade when unused',
      urgency: 'Gas components corrode when idle. Do not light until a licensed tech inspects.',
      color: '#FF4444',
      cost: '$150 to $250 plus potential parts if valves or igniter have failed',
      included: [
        'Full gas system inspection including supply line, valve, and connections',
        'Ignition system test and replacement if failed',
        'Burner and pilot cleaning after extended storage period',
        'Vent cap inspection for blockage from debris or animal intrusion',
        'First-run monitoring for proper combustion and CO levels',
      ],
    },
  },
};

const fireplaceTypes = [
  { value: 'wood-burning', label: 'Wood-Burning Fireplace' },
  { value: 'gas-insert', label: 'Gas Insert / Gas Fireplace' },
];

const usageOptions = [
  { value: 'monthly', label: 'Used regularly (monthly or more in season)' },
  { value: 'rarely', label: 'Used rarely (a few times per year)' },
  { value: 'never', label: 'Never used or unknown history' },
];

export default function DFWChimneySweepGuide() {
  const [fireplaceType, setFireplaceType] = useState('');
  const [usage, setUsage] = useState('');

  const result = fireplaceType && usage ? inspectionData[fireplaceType]?.[usage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Chimney Sweep Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 24, lineHeight: 1.6 }}>
          Most DFW homeowners light their fireplace only a handful of times each year — but that does not mean chimneys are safe to ignore.
          Animal nests, debris accumulation, and structural deterioration from DFW hailstorms and temperature swings create hazards in even rarely-used chimneys.
          NFPA 211 requires annual chimney inspection regardless of use frequency.
        </p>
        <div style={{ background: '#162844', borderRadius: 10, padding: '14px 18px', marginBottom: 28 }}>
          <strong style={{ color: '#F5E642' }}>Why DFW Chimneys Need Annual Inspection:</strong>
          <ul style={{ color: '#8FA3BF', marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>DFW squirrels, raccoons, and starlings commonly nest in chimney flues during summer months.</li>
            <li>North Texas hailstorms damage chimney caps and crowns, allowing water intrusion that accelerates masonry deterioration.</li>
            <li>Freeze-thaw cycles during DFW ice storms crack mortar joints — even in relatively new chimneys.</li>
          </ul>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Get Your Inspection Plan</h2>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Fireplace Type</label>
          <select value={fireplaceType} onChange={e => setFireplaceType(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value="">Select fireplace type...</option>
            {fireplaceTypes.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Usage Frequency</label>
          <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value="">Select usage...</option>
            {usageOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 700, marginBottom: 10 }}>{result.urgency}</div>
              <div style={{ marginBottom: 8 }}><strong style={{ color: '#F5E642' }}>Inspection Timing:</strong> <span style={{ color: '#8FA3BF' }}>{result.timing}</span></div>
              <div style={{ marginBottom: 12 }}><strong style={{ color: '#F5E642' }}>Estimated DFW Cost:</strong> <span style={{ color: '#8FA3BF' }}>{result.cost}</span></div>
              <strong style={{ color: '#F5E642' }}>What Is Included:</strong>
              <ul style={{ paddingLeft: 20, color: '#8FA3BF', lineHeight: 1.8, marginTop: 8 }}>
                {result.included.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>✅ Hire a CSIA-Certified Sweep</h2>
          <p style={{ color: '#8FA3BF', marginBottom: 16, lineHeight: 1.6 }}>
            CSIA (Chimney Safety Institute of America) certification is the industry standard for chimney technicians.
            In DFW, always verify CSIA credentials before hiring — certification requires passing exams and continuing education.
          </p>
          {[
            { icon: '📋', title: 'Get a written report', body: 'A proper inspection produces a written report with photos. Verbal-only reports are a red flag.' },
            { icon: '🎥', title: 'Video inspection for older homes', body: 'Homes built before 1980 should have a camera inspection — hidden cracks are common in aged masonry.' },
            { icon: '💧', title: 'Ask about waterproofing', body: 'DFW hail and rain accelerate chimney deterioration. Crown sealing and waterproofing extend lifespan significantly.' },
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
