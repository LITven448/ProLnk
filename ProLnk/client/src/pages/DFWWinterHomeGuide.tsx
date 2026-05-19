import { useState } from 'react';

const pipeOptions = [
  { id: 'slab', label: 'Slab foundation (pipes in walls/ceiling)' },
  { id: 'pier', label: 'Pier & beam (pipes under floor — higher risk)' },
  { id: 'outdoor', label: 'Exposed outdoor pipes or hose bibs' },
  { id: 'garage', label: 'Pipes running through unheated garage' },
];

const poolOptions = [
  { id: 'yes', label: '🏊 Have a swimming pool' },
  { id: 'no', label: '🏡 No pool' },
];

const homeTypes = [
  { id: 'old', label: '🏚️ Pre-1990 home (older insulation)' },
  { id: 'new', label: '🏠 Post-2000 home (better sealed)' },
  { id: 'townhome', label: '🏢 Townhome or attached unit' },
];

export default function DFWWinterHomeGuide() {
  const [pipes, setPipes] = useState<string[]>([]);
  const [pool, setPool] = useState('');
  const [homeType, setHomeType] = useState('');
  const [showResults, setShowResults] = useState(false);

  const togglePipe = (id: string) => {
    setPipes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const riskScore = pipes.length + (homeType === 'old' ? 2 : homeType === 'pier' ? 1 : 0) + (pipes.includes('pier') ? 2 : 0) + (pipes.includes('outdoor') ? 2 : 0);

  const riskLabel = riskScore >= 6 ? { label: 'HIGH RISK', color: '#ef4444′ } : riskScore >= 3 ? { label: ’MODERATE RISK', color: '#f59e0b' } : { label: 'LOW RISK', color: '#22c55e' };

  const checklist = [
    'Insulate all exposed pipes with foam pipe sleeves (hardware store, ~$2/ft)',
    'Install outdoor faucet covers on all hose bibs before first freeze warning',
    'Know location of main water shutoff — practice turning it off',
    'Set thermostat no lower than 65°F even when away from home',
    'Open cabinet doors under sinks on exterior walls during a freeze event',
    'Drip faucets at a slow trickle during sustained sub-20°F temperatures',
    ...(pipes.includes('pier') ? ['PRIORITY: Install heat tape on all under-floor pipe runs — DFW pier & beam homes are the #1 burst pipe risk'] : []),
    ...(homeType === 'old' ? ['Check attic insulation R-value — older DFW homes often lack adequate attic insulation for freeze events'] : []),
    ...(pool === 'yes' ? ['DFW partial pool winterization: lower water level 6 inches, add winterizing algaecide, install freeze guard on pump'] : []),
    'Test gas fireplace ignition in October before you need it',
    'Maintain generator: run monthly, store treated fuel, test under load',
    'Stock 72-hour emergency kit: water, food, blankets, battery radio',
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>❄️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Winter Home Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Freeze Preparation — The Feb 2021 Lesson</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0′ }}>
        <div style={{ background: '#ef4444', color: '#fff', borderRadius: 10, padding: '14px 20px', marginBottom: 28, fontWeight: 700, fontSize: 15 }}>
          🧊 Feb 2021: Over 4.5 million Texas homes lost water due to burst pipes. DFW homes are NOT built for extended freezes. Prepare every year.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📖 DFW vs Northern Winterization</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { title: '🏔️ Northern Freeze-Proof', items: ['Pipes inside heated envelope', 'R-60+ attic insulation', 'Heated crawlspaces', 'Pool fully drained and antifreeze-treated'] },
            { title: '🌤️ DFW Partial Winterization', items: ['Many pipes in exterior walls or under slab', 'R-19 to R-30 typical attic', 'Unheated pier & beam crawlspaces', 'Pool: lower level + freeze guard (not full drain)'] },
          ].map(col => (
            <div key={col.title} style={{ background: '#111f35', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 10 }}>{col.title}</div>
              {col.items.map((item, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 6 }}>• {item}</div>)}
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Calculate Your Winter Risk Score</h2>

        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>Home type:</p>
        <div style={{ display: 'grid', gap: 8, marginBottom: 18 }}>
          {homeTypes.map(h => (
            <button key={h.id} onClick={() => setHomeType(h.id)} style={{ background: homeType === h.id ? '#1a3a5c' : '#111f35', border: `2px solid ${homeType === h.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '11px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer', fontSize: 14 }}>
              {h.label}
            </button>
          ))}
        </div>

        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>Pipe exposure (select all that apply):</p>
        <div style={{ display: 'grid', gap: 8, marginBottom: 18 }}>
          {pipeOptions.map(p => (
            <button key={p.id} onClick={() => togglePipe(p.id)} style={{ background: pipes.includes(p.id) ? '#1a3a5c' : '#111f35', border: `2px solid ${pipes.includes(p.id) ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '11px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14 }}>
              <span>{p.label}</span>
              <span>{pipes.includes(p.id) ? '✅' : '⬜'}</span>
            </button>
          ))}
        </div>

        <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 10 }}>Pool:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
          {poolOptions.map(o => (
            <button key={o.id} onClick={() => setPool(o.id)} style={{ background: pool === o.id ? '#1a3a5c' : '#111f35', border: `2px solid ${pool === o.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '11px 14px', color: '#fff', cursor: 'pointer', fontSize: 14 }}>
              {o.label}
            </button>
          ))}
        </div>

        <button onClick={() => setShowResults(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
          Show My Winter Risk + Checklist →
        </button>

        {showResults && (
          <div style={{ background: '#111f35', borderRadius: 12, padding: '24px', border: `2px solid ${riskLabel.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>Your Winter Prep Checklist</h3>
              <div style={{ background: riskLabel.color, color: '#fff', fontWeight: 700, fontSize: 13, padding: '4px 12px', borderRadius: 20 }}>{riskLabel.label}</div>
            </div>
            {checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < checklist.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>☑</span>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
