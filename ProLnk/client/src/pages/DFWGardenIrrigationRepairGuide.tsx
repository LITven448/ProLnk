import { useState } from 'react';

const problems = ['Broken Heads', 'Valve Failure', 'Controller Issues', 'Zone Pressure Problems'];
const zones = ['1-3', '4-6', '7-10', '10+'];

function getEstimate(problem: string, zone: string) {
  const base: Record<string, number> = {
    'Broken Heads': 120,
    'Valve Failure': 280,
    'Controller Issues': 350,
    'Zone Pressure Problems': 200,
  };
  const zoneMultiplier: Record<string, number> = {
    '1-3': 1,
    '4-6': 1.4,
    '7-10': 1.8,
    '10+': 2.4,
  };
  const cost = Math.round(base[problem] * zoneMultiplier[zone]);
  const difficulty = cost < 200 ? 'Low' : cost < 400 ? 'Medium' : 'High';
  const callPro = cost > 300 || problem === 'Valve Failure' || problem === 'Controller Issues';
  return { cost, difficulty, callPro };
}

export default function DFWGardenIrrigationRepairGuide() {
  const [problem, setProblem] = useState('');
  const [zone, setZone] = useState('');
  const result = problem && zone ? getEstimate(problem, zone) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          💧 DFW Irrigation System Repair Guide
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          DFW clay soil heaves seasonally — keeping sprinkler head height correct is critical to avoid breakage and uneven coverage.
        </p>

        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            { icon: '🔩', title: 'Broken Heads', desc: 'Clay soil movement shifts head alignment. Look for wet spots, tilted heads, or arcs that miss their target zone.' },
            { icon: '🔧', title: 'Valve Failure', desc: 'A stuck-open valve floods one zone; stuck-closed starves it. Listen for chattering solenoids or zones that won\’t shut off.' },
            { icon: '🖥️', title: 'Controller Issues', desc: 'Lightning surges are common in DFW. A dead zone that won\’t respond often traces back to a burned controller board or wiring fault.' },
            { icon: '📊', title: 'Zone Pressure Problems', desc: 'Low pressure causes poor coverage; high pressure causes misting and drift. DFW municipal pressure can spike — add a pressure regulator.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#111e35', borderRadius: 12, padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🛠️ DIY vs. Pro Threshold</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 4 }}>✅ DIY-Friendly</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Replacing a single head</li>
                <li>Adjusting head arc and radius</li>
                <li>Reprogramming controller schedules</li>
                <li>Clearing clogged nozzles</li>
              </ul>
            </div>
            <div>
              <div style={{ color: '#f87171', fontWeight: 600, marginBottom: 4 }}>🔴 Call a Pro</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.875rem', paddingLeft: '1.25rem', lineHeight: 1.8 }}>
                <li>Solenoid or valve replacement</li>
                <li>Main line leak repair</li>
                <li>Controller board replacement</li>
                <li>Multiple zone failures</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Repair Estimator</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Problem Type</label>
              <select value={problem} onChange={e => setProblem(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select problem</option>
                {problems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Zone Count</label>
              <select value={zone} onChange={e => setZone(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.6rem' }}>
                <option value="">Select zones</option>
                {zones.map(z => <option key={z} value={z}>{z} zones</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Est. Cost</div>
                <div style={{ color: '#F5E642', fontSize: '1.4rem', fontWeight: 700 }}>${result.cost}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Difficulty</div>
                <div style={{ color: result.difficulty === 'Low' ? '#4ade80′ : result.difficulty === ’Medium' ? '#facc15′ : '#f87171', fontSize: '1.4rem', fontWeight: 700 }}>{result.difficulty}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Recommendation</div>
                <div style={{ color: result.callPro ? '#f87171′ : '#4ade80', fontSize: '1rem', fontWeight: 700 }}>{result.callPro ? ’Call a Pro' : 'DIY Possible'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
