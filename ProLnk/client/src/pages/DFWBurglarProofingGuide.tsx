import { useState } from 'react';

type Upgrade = { label: string; cost: string; layer: string; impact: 'high' | 'medium' | 'low' };

const responseTimesBySuburb: Record<string, string> = {
  plano: '4–6 minutes',
  frisco: '5–7 minutes',
  mckinney: '6–9 minutes',
  allen: '4–6 minutes',
  dallas: '8–15 minutes (varies by district)',
  arlington: '7–11 minutes',
  irving: '6–10 minutes',
  southlake: '4–7 minutes',
  default: '6–12 minutes (DFW average)',
};

const allUpgrades: Upgrade[] = [
  { label: 'Visible security cameras (dummy or real — deterrence equal)', cost: '$0–$200', layer: 'Deterrence', impact: 'high' },
  { label: 'Monitored alarm sign in yard + window decals', cost: '$0–$30', layer: 'Deterrence', impact: 'high' },
  { label: 'Smart motion lights — all entry points', cost: '$80–$300', layer: 'Deterrence', impact: 'high' },
  { label: 'Video doorbell with live view', cost: '$150–$250', layer: 'Detection', impact: 'high' },
  { label: 'Door/window sensors (every ground-floor opening)', cost: '$60–$200', layer: 'Detection', impact: 'high' },
  { label: 'Glass break sensors', cost: '$40–$100', layer: 'Detection', impact: 'medium' },
  { label: 'Door frame reinforcement kit (all exterior doors)', cost: '$80–$200', layer: 'Delay', impact: 'high' },
  { label: 'Charlie bar on all sliding doors', cost: '$25–$75', layer: 'Delay', impact: 'high' },
  { label: 'Garage door emergency cord shield', cost: '$5–$15', layer: 'Delay', impact: 'high' },
  { label: 'Security film on ground-floor windows', cost: '$100–$400', layer: 'Delay', impact: 'medium' },
  { label: 'Professional alarm monitoring ($25–$45/mo)', cost: '$300–$540/yr', layer: 'Response', impact: 'high' },
  { label: 'Neighbors app + neighborhood watch enrollment', cost: '$0', layer: 'Response', impact: 'medium' },
];

const ineffective = [
  'Fake/dummy cameras (sophisticated burglars test them)',
  '"Beware of Dog" signs without an actual dog',
  'Window alarms without central monitoring',
  'Hiding valuables (TVs are mapped in under 30 seconds)',
  'Relying on neighbors to call police',
];

function scoreHome(size: string, location: string, measures: string[]): number {
  let score = 0;
  if (measures.includes('alarm')) score += 25;
  if (measures.includes('cameras')) score += 20;
  if (measures.includes('lights')) score += 15;
  if (measures.includes('sensors')) score += 15;
  if (measures.includes('reinforced')) score += 15;
  if (size === 'large') score = Math.max(0, score - 10);
  if (location === 'dallas' || location === 'arlington') score = Math.max(0, score - 5);
  return Math.min(100, score);
}

export default function DFWBurglarProofingGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [location, setLocation] = useState('');
  const [measures, setMeasures] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; responseTime: string; upgrades: Upgrade[] } | null>(null);

  function toggleMeasure(m: string) {
    setMeasures(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  }

  function assess() {
    const score = scoreHome(homeSize, location, measures);
    const responseTime = responseTimesBySuburb[location] || responseTimesBySuburb.default;
    const hasAlarm = measures.includes('alarm');
    const hasCameras = measures.includes('cameras');
    const hasLights = measures.includes('lights');
    const hasSensors = measures.includes('sensors');
    const hasReinforced = measures.includes('reinforced');
    const upgrades = allUpgrades.filter(u => {
      if (u.label.includes('alarm') && hasAlarm) return false;
      if (u.label.includes('camera') && hasCameras) return false;
      if (u.label.includes('light') && hasLights) return false;
      if (u.label.includes('sensor') && hasSensors) return false;
      if (u.label.includes('reinforcement') && hasReinforced) return false;
      return true;
    }).slice(0, 6);
    setResult({ score, responseTime, upgrades });
  }

  const scoreColor = (s: number) => s >= 70 ? '#4CAF82' : s >= 40 ? '#F5A623' : '#FF6B6B';
  const layerColor = (l: string) => ({ Deterrence: '#9B59B6', Detection: '#3498DB', Delay: '#F5A623', Response: '#4CAF82' }[l] || '#9BA8BB');

  const measureOptions = [
    { key: 'alarm', label: 'Monitored alarm system' },
    { key: 'cameras', label: 'Security cameras' },
    { key: 'lights', label: 'Motion lights' },
    { key: 'sensors', label: 'Door/window sensors' },
    { key: 'reinforced', label: 'Reinforced doors' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40 }}>🛡️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, margin: '0.5rem 0' }}>DFW Complete Burglar-Proofing Guide</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '1.5rem' }}>
          Effective security uses four layers: Deterrence (make your home look hard), Detection (know immediately),
          Delay (slow entry to outlast the attempt), and Response (help arrives fast). DFW burglars typically abort
          after 60 seconds — your job is to make the first 60 seconds impossible.
        </p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: '0.75rem' }}>❌ What Doesn't Work in DFW</h2>
          {ineffective.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#FF6B6B' }}>✗</span>
              <span style={{ color: '#9BA8BB', fontSize: 14 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>📊 Score Your Home</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select</option>
                <option value="small">Small (&lt;1,500 sq ft)</option>
                <option value="medium">Medium (1,500–3,000 sq ft)</option>
                <option value="large">Large (3,000+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14 }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 8, background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F' }}>
                <option value="">Select</option>
                {Object.entries({ plano: 'Plano', frisco: 'Frisco', mckinney: 'McKinney', allen: 'Allen', dallas: 'Dallas', arlington: 'Arlington', irving: 'Irving', southlake: 'Southlake' }).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA8BB', fontSize: 14, display: 'block', marginBottom: 8 }}>Current Security Measures (select all that apply)</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {measureOptions.map(opt => (
                  <div key={opt.key} onClick={() => toggleMeasure(opt.key)}
                    style={{ padding: '0.5rem 0.75rem', borderRadius: 8, cursor: 'pointer', border: `1px solid ${measures.includes(opt.key) ? '#F5E642' : '#1E3A5F'}`, background: measures.includes(opt.key) ? '#1A2F10' : '#0A1628', color: measures.includes(opt.key) ? '#F5E642' : '#9BA8BB', fontSize: 13 }}>
                    {measures.includes(opt.key) ? '✅ ' : '⬜ '}{opt.label}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={assess} disabled={!homeSize || !location}
              style={{ padding: '0.75rem', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Calculate Security Score
            </button>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: scoreColor(result.score) }}>{result.score}</div>
              <div style={{ color: '#9BA8BB', fontSize: 14 }}>Security Score out of 100</div>
              <div style={{ marginTop: '0.75rem', padding: '0.5rem 1rem', background: '#0A1628', borderRadius: 8, display: 'inline-block' }}>
                <span style={{ color: '#9BA8BB', fontSize: 13 }}>⏱ {location.charAt(0).toUpperCase() + location.slice(1)} Police Response: </span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.responseTime}</span>
              </div>
              {result.score < 40 && <div style={{ color: '#FF6B6B', marginTop: '0.5rem', fontSize: 14 }}>⚠️ High risk — prioritize upgrades immediately</div>}
              {result.score >= 40 && result.score < 70 && <div style={{ color: '#F5A623', marginTop: '0.5rem', fontSize: 14 }}>⚠️ Moderate risk — key gaps remain</div>}
              {result.score >= 70 && <div style={{ color: '#4CAF82', marginTop: '0.5rem', fontSize: 14 }}>✅ Good baseline — maintain and monitor</div>}
            </div>
            {result.upgrades.length > 0 && (
              <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
                <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: '1rem' }}>🎯 Priority Upgrades</h2>
                {result.upgrades.map((u, i) => (
                  <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 11, background: layerColor(u.layer), color: '#fff', borderRadius: 4, padding: '2px 6px', marginRight: 8 }}>{u.layer}</span>
                      <span style={{ color: '#E8EDF5' }}>{u.label}</span>
                    </div>
                    <span style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '1rem' }}>{u.cost}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
