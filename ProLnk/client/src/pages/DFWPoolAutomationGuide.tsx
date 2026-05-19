import { useState } from 'react';

const platforms = {
  pentair: {
    name: 'Pentair IntelliConnect',
    emoji: '🔵',
    price: '$800–$1,800 installed',
    app: 'Pentair Home App',
    freeze_protection: 'Yes — built-in DFW freeze guard',
    compatibility: 'Best with Pentair pumps, lights, heaters',
    strengths: ['Industry-leading freeze protection (critical DFW Feb 2021 event)', 'Most reliable automation in DFW market', 'Large local dealer network in DFW', 'Works with all major Pentair equipment'],
    weaknesses: ['More expensive', 'Clunky older app UI', 'Limited 3rd-party integration'],
    dfwNote: 'The DFW installer favorite. After the February 2021 freeze, Pentair\’s freeze protection automation became the DFW default. Most DFW pool builders spec Pentair.',
    best_for: 'New DFW pools, full Pentair equipment setups',
  },
  jandy: {
    name: 'Jandy iAqualink',
    emoji: '🟡',
    price: '$700–$1,600 installed',
    app: 'iAqualink App',
    freeze_protection: 'Yes — solid freeze protection',
    compatibility: 'Best with Jandy/Zodiac equipment',
    strengths: ['Excellent app — most user-friendly', 'Great automation scenes', 'Strong Alexa/Google integration', 'Good freeze protection'],
    weaknesses: ['Less DFW installer support vs Pentair', 'Best only with Jandy equipment', 'Occasional connectivity issues'],
    dfwNote: 'Best app experience of the three. If you care about smart home integration (Alexa, Google Home), Jandy wins. Strong in North DFW suburbs.',
    best_for: 'Smart home enthusiasts, voice control users, Jandy equipment',
  },
  hayward: {
    name: 'Hayward OmniLogic',
    emoji: '🟢',
    price: '$600–$1,500 installed',
    app: 'OmniLogic App',
    freeze_protection: 'Yes — configurable freeze protection',
    compatibility: 'Best with Hayward equipment',
    strengths: ['Lowest price point', 'Colorful touchscreen panel', 'Good energy management', 'Growing DFW installer base'],
    weaknesses: ['Freeze protection setup more complex', 'App not as polished as Jandy', 'Smaller DFW service network'],
    dfwNote: 'Budget-friendly DFW option. Hayward is gaining DFW market share. Freeze protection works but requires proper setup — make sure your installer configures it correctly.',
    best_for: 'Budget-focused DFW installs, Hayward equipment setups',
  },
};

const featureMap = {
  freeze_automation: { label: 'Freeze Protection', pentair: '⭐⭐⭐', jandy: '⭐⭐⭐', hayward: '⭐⭐' },
  app_quality: { label: 'App Quality', pentair: '⭐⭐', jandy: '⭐⭐⭐', hayward: '⭐⭐' },
  smart_home: { label: 'Smart Home (Alexa/Google)', pentair: '⭐⭐', jandy: '⭐⭐⭐', hayward: '⭐⭐' },
  dfwSupport: { label: 'DFW Installer Support', pentair: '⭐⭐⭐', jandy: '⭐⭐', hayward: '⭐⭐' },
  price: { label: 'Price Value', pentair: '⭐⭐', jandy: '⭐⭐', hayward: '⭐⭐⭐' },
};

export default function DFWPoolAutomationGuide() {
  const [equipment, setEquipment] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | typeof platforms.pentair>(null);

  function getRecommendation() {
    if (!concern) return;
    let key = 'pentair';
    if (concern === 'smart_home') key = 'jandy';
    if (concern === 'budget') key = 'hayward';
    if (equipment === 'pentair') key = 'pentair';
    if (equipment === 'jandy') key = 'jandy';
    if (equipment === 'hayward') key = 'hayward';
    if (concern === 'freeze' && equipment !== 'jandy' && equipment !== 'hayward') key = 'pentair';
    setResult(platforms[key as keyof typeof platforms]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW POOL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          🤖 DFW Pool Automation Guide
        </h1>
        <p style={{ color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6 }}>
          Pool automation in DFW isn't just convenience — freeze protection automation is critical after the February 2021 event. Compare the three major platforms.
        </p>

        <div style={{ background: '#EF4444', color: '#fff', borderRadius: 10, padding: '14px 18px', marginBottom: 28, fontWeight: 700, fontSize: 14 }}>
          ❄️ DFW FREEZE ALERT: February 2021 showed that pools without automation freeze protection can suffer $5,000–$20,000 in damage. Automation is no longer optional in DFW.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your DFW Platform Recommendation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>YOUR CURRENT POOL EQUIPMENT BRAND</label>
            <select value={equipment} onChange={e => setEquipment(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Not sure / New install</option>
              <option value="pentair">Pentair</option>
              <option value="jandy">Jandy / Zodiac</option>
              <option value="hayward">Hayward</option>
              <option value="mixed">Mixed brands</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>TOP DFW CONCERN</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select concern...</option>
              <option value="freeze">Freeze protection — DFW winters</option>
              <option value="smart_home">Smart home / voice control</option>
              <option value="ease">Easiest to use</option>
              <option value="budget">Best value / budget</option>
              <option value="reliability">Most reliable / local support</option>
            </select>
          </div>
        </div>
        <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 28 }}>
          Get Recommendation →
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28, border: '2px solid #F5E642′ }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>RECOMMENDED FOR YOUR DFW POOL</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>{result.emoji} {result.name}</h3>
            <p style={{ color: '#94A3B8', margin: '0 0 16px', fontSize: 13 }}>{result.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>INSTALLED COST</div>
                <div style={{ fontWeight: 700 }}>{result.price}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>FREEZE PROTECTION</div>
                <div style={{ fontWeight: 700, color: '#22C55E' }}>{result.freeze_protection}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>✅ STRENGTHS</div>{result.strengths.map(s => <div key={s} style={{ fontSize: 13, marginBottom: 3 }}>• {s}</div>)}</div>
              <div><div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>⚠️ WEAKNESSES</div>{result.weaknesses.map(w => <div key={w} style={{ fontSize: 13, marginBottom: 3 }}>• {w}</div>)}</div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 DFW Feature Comparison</h2>
        <div style={{ background: '#1E2D45', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', background: '#2D4060', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#94A3B8′ }}>
            <div>FEATURE</div>
            <div style={{ textAlign: 'center' }}>PENTAIR</div>
            <div style={{ textAlign: 'center' }}>JANDY</div>
            <div style={{ textAlign: 'center' }}>HAYWARD</div>
          </div>
          {Object.values(featureMap).map((f, i) => (
            <div key={f.label} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 16px', background: i % 2 === 0 ? '#1E2D45′ : '#162236', borderBottom: '1px solid #2D4060' }}>
              <div style={{ fontSize: 13 }}>{f.label}</div>
              <div style={{ textAlign: 'center', fontSize: 13 }}>{f.pentair}</div>
              <div style={{ textAlign: 'center', fontSize: 13 }}>{f.jandy}</div>
              <div style={{ textAlign: 'center', fontSize: 13 }}>{f.hayward}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
