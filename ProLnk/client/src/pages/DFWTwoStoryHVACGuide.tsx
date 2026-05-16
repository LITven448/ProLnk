import { useState } from 'react';

const solutions = {
  single_zone: {
    label: 'Single Zone System',
    causes: ['One thermostat controls entire home', 'Hot air rises to upper floor', 'Attic heat radiates through ceiling'],
    solutions: ['Install zoned HVAC system', 'Add radiant barrier in attic', 'Upgrade attic insulation to R-38+', 'Install ceiling fans in upstairs rooms'],
    cost: '$3,500 - $8,000',
  },
  undersized: {
    label: 'Undersized System',
    causes: ['Unit too small for square footage', 'Added square footage without upgrading HVAC', 'Excessive heat load from poor insulation'],
    solutions: ['HVAC load calculation (Manual J)', 'Upgrade to properly sized unit', 'Air seal attic bypasses first'],
    cost: '$4,500 - $9,000',
  },
  duct_issues: {
    label: 'Duct Problems',
    causes: ['Leaky ducts losing conditioned air', 'Uninsulated ducts in attic space', 'Incorrect duct sizing for upper floor'],
    solutions: ['Duct blaster test to find leaks', 'Seal and insulate all attic ducts', 'Rebalance system airflow'],
    cost: '$800 - $3,500',
  },
};

type SystemKey = keyof typeof solutions;

export default function DFWTwoStoryHVACGuide() {
  const [upstairsDelta, setUpstairsDelta] = useState('');
  const [systemType, setSystemType] = useState<SystemKey | ''>('');
  const [result, setResult] = useState<(typeof solutions)[SystemKey] | null>(null);

  function calculate() {
    if (!systemType) return;
    setResult(solutions[systemType]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Why Is Upstairs Always Hotter?</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          In DFW two-story homes, upstairs temperatures routinely run 5-15 degrees hotter than downstairs during summer. Here is why and how to fix it.
        </p>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>Why It Happens in DFW</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Attic Heat Bomb', 'DFW attics reach 140-160F in summer. Heat radiates through the ceiling into upper rooms.'],
              ['Physics: Heat Rises', 'Hot air naturally accumulates on the upper floor regardless of your AC output.'],
              ['Single Thermostat', 'A downstairs thermostat satisfies before upstairs cools. Upper floor never reaches setpoint.'],
              ['Sun Exposure', 'West-facing upstairs windows get brutal afternoon sun from 2-7 PM in DFW.'],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{title as string}</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{desc as string}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>Get Your Solution</h2>
          <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>How much hotter is upstairs vs downstairs?</label>
              <select value={upstairsDelta} onChange={e => setUpstairsDelta(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select temperature difference</option>
                <option value="1-4">1-4 degrees warmer</option>
                <option value="5-9">5-9 degrees warmer</option>
                <option value="10+">10 degrees or more</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Your current system type</label>
              <select value={systemType} onChange={e => setSystemType(e.target.value as SystemKey)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="">Select system type</option>
                <option value="single_zone">Single thermostat / one system</option>
                <option value="undersized">Old or undersized system</option>
                <option value="duct_issues">System runs constantly, barely cools</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Recommendation
          </button>
        </div>
        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Diagnosis: {result.label}</h3>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>ROOT CAUSES</div>
              {result.causes.map(c => <div key={c} style={{ marginBottom: 6, fontSize: 14 }}>{c}</div>)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>RECOMMENDED SOLUTIONS</div>
              {result.solutions.map(s => <div key={s} style={{ marginBottom: 6, fontSize: 14 }}>{s}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>Estimated cost range</span>
              <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
