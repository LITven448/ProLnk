import { useState } from 'react';

const methods = [
  'No irrigation — rely on rain',
  'Manual hose watering',
  'Manual soaker hose (no timer)',
  'Timer-based soaker hose',
  'Sprinkler system only',
  'Smart irrigation controller',
];

const concerns = [
  'Foundation cracking / settling',
  'Perimeter too dry in summer',
  'Uneven moisture around house',
  'Water bills too high',
  'Just moved in — want to set up right',
];

function getUpgrade(method: string, concern: string) {
  const baseUpgrade: Record<string, string> = {
    'No irrigation — rely on rain': 'Install perimeter soaker hose system immediately — DFW summers cause rapid clay shrinkage without supplemental water.',
    'Manual hose watering': 'Upgrade to timer-based soaker hose — manual watering is inconsistent and rarely sufficient in DFW peak summer.',
    'Manual soaker hose (no timer)': 'Add a timer controller ($30–$80) — consistency is more important than volume in DFW clay management.',
    'Timer-based soaker hose': 'Consider smart moisture-sensing controller for season-specific automation — you\’re close to optimal already.',
    'Sprinkler system only': 'Add dedicated perimeter soaker hose — sprinklers wet surface only; foundation needs slow deep perimeter moisture.',
    'Smart irrigation controller': 'Optimize your moisture sensor placement — one sensor per side of home in DFW for best differential control.',
  };
  const automation: Record<string, string[]> = {
    'No irrigation — rely on rain': ['Orbit soaker hose kit ($40–$80)', 'Orbit 2-outlet timer ($45)', 'Rain Bird smart controller ($150–$250) for full automation'],
    'Manual hose watering': ['B-hyve smart hose timer ($60)', 'Rachio Hose Timer with soil moisture ($120)', 'Soaker hose + timer combo kits at Home Depot ~$100'],
    'Manual soaker hose (no timer)': ['Orbit hose timer (2-zone) $45', 'Rain Bird 1ZEHTMR timer $35', 'Gilmour tap timer $25'],
    'Timer-based soaker hose': ['Rachio 3 smart controller $170', 'Hunter HC soil moisture + controller $200', 'Netro smart sprinkle timer $100'],
    'Sprinkler system only': ['Add perimeter soaker hose loop $150–$400 installed', 'Separate zone on irrigation controller for soaker', 'Foundation-specific slow-drip emitters $80–$200'],
    'Smart irrigation controller': ['Add Toro soil moisture sensors ($30 each)', 'One sensor per compass side of home', 'Check DFW-specific seasonal programs in app'],
  };
  const cost: Record<string, string> = {
    'No irrigation — rely on rain': '$80–$300 for complete setup',
    'Manual hose watering': '$60–$150 for timer upgrade',
    'Manual soaker hose (no timer)': '$30–$80 for timer',
    'Timer-based soaker hose': '$100–$250 for smart upgrade',
    'Sprinkler system only': '$150–$500 for perimeter soaker add-on',
    'Smart irrigation controller': '$90–$120 for sensors',
  };
  const concernNote: Record<string, string> = {
    'Foundation cracking / settling': 'Prioritize immediate consistent perimeter moisture — 3x per week minimum in DFW summer.',
    'Perimeter too dry in summer': 'Increase frequency to daily in July–August. Soil should feel moist 2 inches below surface year-round.',
    'Uneven moisture around house': 'Map shaded vs sunny sides — south and west faces dry 30–50% faster in DFW. Zone separately.',
    'Water bills too high': 'Smart controller with ET-based scheduling saves 30–50% vs timer-only. Rachio pays back in 2–3 DFW summers.',
    'Just moved in — want to set up right': 'Start with perimeter soaker loop + 2-zone timer. Upgrade to smart controller after first summer learning your soil.',
  };
  return {
    upgrade: baseUpgrade[method],
    options: automation[method] || [],
    cost: cost[method],
    concernNote: concernNote[concern] || '',
  };
}

export default function DFWFoundationIrrigationSystems() {
  const [method, setMethod] = useState('');
  const [concern, setConcern] = useState('');
  const result = method && concern ? getUpgrade(method, concern) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW FOUNDATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Foundation Irrigation Systems Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
          Keeping DFW foundation soil consistently moist is the single most impactful thing you can do to prevent foundation movement. Automated systems beat manual watering every time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          {[['💧 Soaker Hose', 'Delivers slow, deep perimeter moisture. Sits 1–2 inches from foundation. Best for DFW clay activation.'], ['🌡️ Smart Controller', 'Adjusts watering based on DFW weather and soil sensors. Saves water, optimizes clay moisture.']].map(([title, desc]) => (
            <div key={String(title)} style={{ background: '#0D1F3C', borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{String(title).split(' ')[0]}</div>
              <h3 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{String(title).split(' ').slice(1).join(' ')}</h3>
              <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Upgrade Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>CURRENT WATERING METHOD</label>
              <select value={method} onChange={e => setMethod(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select method</option>
                {methods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 12, display: 'block', marginBottom: 6 }}>FOUNDATION CONCERN</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#1A2F50', color: '#E8EDF5', border: '1px solid #2D4A7A', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select concern</option>
                {concerns.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {result && (
            <div>
              <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: 14, marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>📈 UPGRADE RECOMMENDATION</div>
                <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.7 }}>{result.upgrade}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>🛒 AUTOMATION OPTIONS</div>
                {result.options.map((opt, i) => <div key={i} style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 6 }}>• {opt}</div>)}
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 8 }}>Estimated cost: {result.cost}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>🎯 FOR YOUR CONCERN</div>
                <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>{result.concernNote}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>📅 DFW Seasonal Schedule</h2>
          {[['Jan–Mar', '1–2x/week, 20 min'], ['Apr–Jun', '2–3x/week, 25 min'], ['Jul–Aug', 'Daily, 30 min'], ['Sep–Oct', '2–3x/week, 20 min'], ['Nov–Dec', '1x/week, 15 min']].map(([mo, freq]) => (
            <div key={mo} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E3A5F', color: '#CBD5E1', fontSize: 14 }}>
              <span>{mo}</span><span style={{ color: '#F5E642′ }}>{freq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
