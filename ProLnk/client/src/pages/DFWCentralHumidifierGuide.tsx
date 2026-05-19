import { useState } from 'react';

const PROBLEMS = [
  { key: 'skin', label: '🧴 Dry, itchy skin' },
  { key: 'static', label: '⚡ Static electricity everywhere' },
  { key: 'wood', label: '🪵 Cracking wood floors / furniture' },
  { key: 'sleep', label: '😴 Waking up congested' },
  { key: 'multiple', label: '🔥 All of the above' },
];

const HOME_SIZES = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–3,500 sq ft', 'Over 3,500 sq ft'];

type RecommendationKey = 'bypass' | 'fan' | 'steam';

const RECS: Record<RecommendationKey, { label: string; capacity: string; install: string; pros: string[]; cons: string[] }> = {
  bypass: {
    label: '💨 Bypass Humidifier',
    capacity: '12–18 gallons/day',
    install: '$350–$700 installed',
    pros: ['Lowest cost', 'Simple operation', 'Works with most furnaces'],
    cons: ['Requires furnace running to humidify', 'Less effective in mild weather', 'Needs annual pad replacement'],
  },
  fan: {
    label: '🌀 Fan-Powered Humidifier',
    capacity: '18–26 gallons/day',
    install: '$500–$900 installed',
    pros: ['Works independently of furnace fan', 'Better humidity control', 'Good for larger homes'],
    cons: ['Higher upfront cost', 'More moving parts', 'Pad replacement required annually'],
  },
  steam: {
    label: '♨️ Steam Humidifier',
    capacity: '34+ gallons/day',
    install: '$900–$1,800 installed',
    pros: ['Most precise humidity control', 'Works regardless of HVAC state', 'Best for large homes'],
    cons: ['Highest cost', 'Uses more electricity', 'Requires professional servicing'],
  },
};

const getRecommendation = (problem: string, size: string): RecommendationKey => {
  if (size === 'Over 3,500 sq ft' || problem === 'multiple') return 'steam';
  if (size === '2,500–3,500 sq ft' || problem === 'wood') return 'fan';
  return 'bypass';
};

export default function DFWCentralHumidifierGuide() {
  const [problem, setProblem] = useState('');
  const [homeSize, setHomeSize] = useState('');
  const [showResult, setShowResult] = useState(false);

  const recKey = problem && homeSize ? getRecommendation(problem, homeSize) : null;
  const rec = recKey ? RECS[recKey] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF7', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Whole-Home Humidifier Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          Yes, DFW summers are humid — but DFW winters are brutally dry. When your heat runs all day in January, it strips moisture from the air. Indoor humidity can drop to 15–25%, well below the comfortable 35–50% range. Whole-home humidifiers solve this at the HVAC level.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>❄️ DFW Winter Humidity Facts</div>
          {[
            ['🌡️','DFW winter humidity','Indoor RH drops to 15–30% when heat runs continuously'],
            ['🦠','Health impact','Low humidity dries mucous membranes — more colds, worse sleep, nosebleeds'],
            ['🪵','Home damage','Wood floors, trim, and furniture crack when RH stays below 30% for weeks'],
            ['⚡','Static buildup','Static electricity spikes in dry homes — annoying and damaging to electronics'],
            ['💰','Energy savings','Humid air feels warmer — you can lower the thermostat 2–4° and stay comfortable'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div><div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>🔧 Find Your Humidifier Match</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Primary Winter Problem</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PROBLEMS.map(({ key, label }) => (
                <button key={key} onClick={() => { setProblem(key); setShowResult(false); }} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid', borderColor: problem === key ? '#F5E642′ : '#1E3A5F', background: problem === key ? '#F5E64220' : ’transparent', color: problem === key ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Home Size</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {HOME_SIZES.map(s => (
                <button key={s} onClick={() => { setHomeSize(s); setShowResult(false); }} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid', borderColor: homeSize === s ? '#F5E642′ : '#1E3A5F', background: homeSize === s ? '#F5E64220' : ’transparent', color: homeSize === s ? '#F5E642′ : '#94A3B8', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!problem || !homeSize} style={{ background: problem && homeSize ? '#F5E642′ : '#1E3A5F', color: problem && homeSize ? '#0A1628' : '#4A6080', border: ’none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: problem && homeSize ? 'pointer' : 'not-allowed', width: '100%' }}>
            Get My Recommendation
          </button>
        </div>

        {showResult && rec && (
          <div style={{ background: '#0D2240', border: '1.5px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 4 }}>{rec.label}</div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div><span style={{ color: '#94A3B8', fontSize: 13 }}>Capacity: </span><span style={{ fontWeight: 600 }}>{rec.capacity}</span></div>
              <div><span style={{ color: '#94A3B8', fontSize: 13 }}>Installed Cost: </span><span style={{ fontWeight: 600 }}>{rec.install}</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#111E35', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, color: '#10B981', marginBottom: 8, fontSize: 13 }}>✅ Pros</div>
                {rec.pros.map((p, i) => <div key={i} style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>• {p}</div>)}
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, color: '#EF4444', marginBottom: 8, fontSize: 13 }}>⚠️ Cons</div>
                {rec.cons.map((c, i) => <div key={i} style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>• {c}</div>)}
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🎯 Target Humidity Levels</div>
          <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 12 }}>Set your humidistat (built into the humidifier) to maintain these ranges in DFW winters:</p>
          {[['Winter target','35–45% RH','The sweet spot for comfort and home health'],['Too low (below 30%)','Dry air problems begin — skin, wood, static'],['Too high (above 55%)','Risk of condensation on windows, potential mold']].map(arr => (
            <div key={arr[0]} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 13 }}>
              <span style={{ color: '#F5E642', fontWeight: 600, minWidth: 160 }}>{arr[0]}</span>
              <span style={{ color: '#94A3B8′ }}>{arr[1]}{arr[2] ? ` — ${arr[2]}` : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
