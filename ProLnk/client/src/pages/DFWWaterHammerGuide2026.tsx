import { useState } from 'react';

const patterns = [
  'Single loud bang when valve closes',
  'Repeated banging during flow',
  'Banging + high water pressure',
  'Banging only at night',
];
const diagnoses: Record<string, { cause: string; fix: string; cost: string }> = {
  'Single loud bang when valve closes': {
    cause: 'Classic water hammer. Fast-closing solenoid valve (dishwasher, washing machine, ice maker) stops flow abruptly.',
    fix: 'Install hammer arrestors at the offending appliance. Locate on hot and cold supply lines within 6 inches of valve.'  ,
    cost: '$15–30 per arrestor. DIY-friendly.'  ,
  },
  'Repeated banging during flow': {
    cause: 'Loose pipe strap. Pipes vibrating against framing. Common in DFW slab homes where pipes run through wall cavities.'  ,
    fix: 'Locate loose section (follow the sound). Add pipe strap or foam insulation sleeve. Plumber can reroute if severe.'  ,
    cost: '$5–20 DIY. $150–300 plumber.'  ,
  },
  'Banging + high water pressure': {
    cause: 'High pressure (>80 PSI) amplifies water hammer. DFW city pressure often exceeds safe range without a PRV.'  ,
    fix: 'Test pressure with gauge ($15). Install or adjust PRV to 60–70 PSI. Add hammer arrestors at fast-closing valves.'  ,
    cost: 'PRV install/adjust: $250–400. Arrestors: $30–60 total.'  ,
  },
  'Banging only at night': {
    cause: 'Thermal expansion of pipes. DFW temperature swings cause copper and CPVC to expand/contract, clicking or banging.'  ,
    fix: 'Add foam pipe insulation to exposed pipes. Ensure pipes have room to move in straps (not over-tightened).'  ,
    cost: '$20–50 DIY insulation.'  ,
  },
};

export default function DFWWaterHammerGuide2026() {
  const [pattern, setPattern] = useState<string>(patterns[0]);
  const diag = diagnoses[pattern];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>💥 DFW Water Hammer Guide 2026</div>
        <div style={{ color: '#8899AA', marginBottom: '2rem' }}>Banging pipes are more than annoying — they signal pressure issues.</div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔔 What Causes Water Hammer</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '⚡', title: 'Fast-Closing Valves', desc: 'Modern solenoid valves in dishwashers, washing machines, and ice makers close in milliseconds — creating pressure wave.' },
              { icon: '📈', title: 'High Pressure Amplifies It', desc: 'DFW city water often runs 100+ PSI without a PRV. High pressure turns minor hammer into pipe-rattling impact.' },
              { icon: '🔩', title: 'Depleted Air Chambers', desc: 'Older homes used air chambers (capped pipe sections) that fill with water over time. Modern fix: hammer arrestors.' },
              { icon: '🌡️', title: 'DFW Thermal Swings', desc: '100°F summer days + cool nights cause significant pipe expansion. Loose straps allow movement and banging.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div><div style={{ fontWeight: 600 }}>{item.title}</div><div style={{ color: '#8899AA', fontSize: '0.9rem' }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Noise Pattern → Diagnosis + Fix</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Describe the Noise Pattern</div>
            <select value={pattern} onChange={(e) => setPattern(e.target.value)} style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5', width: '100%', maxWidth: '480px' }}>
              {patterns.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          {diag && (
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Cause: </span>{diag.cause}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Fix: </span>{diag.fix}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Cost: </span>{diag.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
