import { useState } from 'react';

type Assessment = { risk: string; color: string; tips: string[] };

const assessments: Record<string, Record<string, Assessment>> = {
  'old-home': {
    'all-day': {
      risk: 'HIGH RISK',
      color: '#FF4444',
      tips: [
        'Older DFW homes often have 60-amp panels — a single space heater can overload the circuit.',
        'Never leave the heater unattended. Turn off when leaving any room.',
        'Have an HVAC technician assess why the built-in heating is inadequate.',
        'Keep combustibles 3 feet away in all directions — old homes have more flammable materials.',
        'Test smoke detectors monthly — older homes may have fewer detectors installed.',
      ],
    },
    'a-few-hours': {
      risk: 'MODERATE RISK',
      color: '#FF9944',
      tips: [
        'Run for no more than 2-3 hours at a time before letting the outlet cool.',
        'Check the outlet for warmth after 30 minutes of use — warmth indicates overload.',
        'Do not use in rooms with original 1950s-1970s wiring without an electrician inspection.',
        'Keep the heater at least 3 feet from curtains, bedding, and furniture.',
        'Have a licensed electrician assess whether your panel can support space heater use.',
      ],
    },
    'occasional': {
      risk: 'LOW-MODERATE RISK',
      color: '#F5E642',
      tips: [
        'Occasional use in older homes is lower risk but still requires caution.',
        'Always plug directly into a wall outlet — never an extension cord.',
        'Use a heater with tip-over and overheat auto-shutoff features.',
        'Inspect the outlet for discoloration or burning smell before each use.',
      ],
    },
  },
  'new-home': {
    'all-day': {
      risk: 'MODERATE RISK',
      color: '#FF9944',
      tips: [
        'Even modern 200-amp panels can trip under space heater load combined with HVAC.',
        'Never run multiple space heaters on the same circuit.',
        'All-day use significantly increases fire risk — address the root heating issue instead.',
        'Check that outlets are properly grounded with a plug-in tester before sustained use.',
        'Consider a mini-split heat pump for rooms with inadequate heating.',
      ],
    },
    'a-few-hours': {
      risk: 'LOW RISK',
      color: '#44BB44',
      tips: [
        'Modern homes handle space heater use better, but safe habits still matter.',
        'Plug directly into a wall outlet on a dedicated or lightly loaded circuit.',
        'Keep the heater away from walls, furniture, and any flammable materials.',
        'Use only heaters with UL listing and automatic shutoff.',
      ],
    },
    'occasional': {
      risk: 'LOW RISK',
      color: '#44BB44',
      tips: [
        'Occasional use in a modern home is generally safe with proper placement.',
        'Ensure the heater is on a stable, level surface.',
        'Never use in bathrooms unless the heater is bathroom-rated.',
        'Unplug when not in use — do not leave plugged in overnight.',
      ],
    },
  },
};

const homeTypes = [
  { value: 'old-home', label: 'Older Home (pre-1990)' },
  { value: 'new-home', label: 'Newer Home (1990 or later)' },
];

const usageOptions = [
  { value: 'all-day', label: 'All day / Left on for hours unattended' },
  { value: 'a-few-hours', label: 'A few hours with supervision' },
  { value: 'occasional', label: 'Occasional / Short bursts only' },
];

export default function DFWSpaceHeaterSafety() {
  const [homeType, setHomeType] = useState('');
  const [usage, setUsage] = useState('');

  const result = homeType && usage ? assessments[homeType]?.[usage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Space Heater Safety Guide</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 24, lineHeight: 1.6 }}>
          DFW winters are mild — typically 30-50F — but many older North Texas homes have inadequate or inconsistent central heating.
          Space heaters fill the gap, but they account for nearly 1,700 home fire deaths per year nationally.
          DFW homes built before 1980 are especially vulnerable due to older wiring and smaller electrical panels.
        </p>
        <div style={{ background: '#162844', borderRadius: 10, padding: '14px 18px', marginBottom: 28 }}>
          <strong style={{ color: '#F5E642' }}>DFW-Specific Context:</strong>
          <ul style={{ color: '#8FA3BF', marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Many 1950s-1970s DFW homes still have 60-amp electrical panels — space heaters stress these systems.</li>
            <li>DFW's occasional ice storms cause brief but intense cold snaps that drive improper heater use.</li>
            <li>Older DFW neighborhoods like Oak Cliff, East Dallas, and Garland have the highest concentration of pre-1980 wiring.</li>
          </ul>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏠 Get Your Safety Assessment</h2>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>Home Type</label>
          <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 15 }}>
            <option value="">Select home type...</option>
            {homeTypes.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <label style={{ display: 'block', color: '#8FA3BF', marginBottom: 6, fontSize: 14 }}>How Do You Use It?</label>
          <select value={usage} onChange={e => setUsage(e.target.value)} style={{ width: '100%', background: '#162844', color: '#E8EDF5', border: '1px solid #2A4A6E', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
            <option value="">Select usage pattern...</option>
            {usageOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 700, fontSize: 18, marginBottom: 12 }}>{result.risk}</div>
              <ul style={{ paddingLeft: 20, color: '#8FA3BF', lineHeight: 1.8 }}>
                {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Universal Space Heater Rules</h2>
          {[
            { icon: '🚫', title: 'Never use an extension cord', body: 'Space heaters must plug directly into a wall outlet. Extension cords cause fires.' },
            { icon: '📐', title: '3-foot clearance rule', body: 'Keep 3 feet of clear space around all sides of the heater at all times.' },
            { icon: '💤', title: 'Never sleep with it on', body: 'Turn off and unplug before going to bed every night, without exception.' },
            { icon: '🛁', title: 'Bathrooms need bathroom-rated heaters', body: 'Standard heaters are not rated for moisture. Use only GFCI-protected bathroom units.' },
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
