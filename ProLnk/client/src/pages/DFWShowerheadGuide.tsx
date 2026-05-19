import { useState } from 'react';

const showerheads = [
  { type: 'High-Pressure Low-Flow (2.0 GPM)', gpf: 2.0, style: 'Fixed', nozzle: 'Silicone self-cleaning', score: 10, brands: 'Delta HydroRain, Moen Magnetix', note: 'Ideal for DFW high pressure + hard water' },
  { type: 'Rain Shower Low-Flow (1.8 GPM)', gpf: 1.8, style: 'Fixed', nozzle: 'Silicone self-cleaning', score: 9, brands: 'Kohler Awaken, TOTO Shiki', note: 'Luxury feel with DFW water conservation' },
  { type: 'Handheld Low-Flow (2.0 GPM)', gpf: 2.0, style: 'Handheld', nozzle: 'Rubber self-cleaning', score: 8, brands: 'Delta In2ition, Speakman', note: 'Flexible, easy to clean DFW mineral build-up' },
  { type: 'Dual Shower System (2.0 GPM)', gpf: 2.0, style: 'Combo', nozzle: 'Silicone + rubber', score: 7, brands: 'Moen Engage, Kohler Forte', note: 'Best experience but verify DFW pressure' },
];

export default function DFWShowerheadGuide() {
  const [pressure, setPressure] = useState('');
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<typeof showerheads[0] | null>(null);

  function getRecommendation() {
    if (!pressure || !priority) return;
    let scored = showerheads.map(s => ({ ...s }));
    if (pressure === 'high') scored = scored.map(s => ({ ...s, score: s.type.includes('High-Pressure') ? s.score + 3 : s.score }));
    if (pressure === 'low') scored = scored.map(s => ({ ...s, score: s.gpf === 1.8 ? s.score + 1 : s.score + 2 }));
    if (priority === 'conservation') scored = scored.map(s => ({ ...s, score: s.gpf <= 2.0 ? s.score + 3 : s.score }));
    if (priority === 'hardwater') scored = scored.map(s => ({ ...s, score: s.nozzle.includes('Silicone') ? s.score + 3 : s.score + 1 }));
    if (priority === 'luxury') scored = scored.map(s => ({ ...s, score: s.style === 'Combo' ? s.score + 3 : s.style === 'Fixed' && s.type.includes('Rain') ? s.score + 2 : s.score }));
    scored.sort((a, b) => b.score - a.score);
    setResult(scored[0]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>🚿 DFW Plumbing Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Showerhead Selection Guide</h1>
        <p style={{ color: '#8B9CC8', marginBottom: 32, fontSize: 16 }}>DFW hard water clogs showerheads fast. Silicone self-cleaning nozzles are a must — plus WaterSense 2.0 GPM max.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>⚠️ DFW Showerhead Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['💧 Hard Water Clogging', 'DFW calcium deposits clog plastic nozzles in 6–12 months'],['💪 High Water Pressure', 'Most DFW homes 60–80 PSI — low-flow still delivers great pressure'],['🌊 WaterSense Max', '2.0 GPM — DFW water rebates available for certified heads'],['🧹 Self-Cleaning Critical', 'Silicone nozzles — rub calcium off easily, no tools needed']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 13, color: '#8B9CC8′ }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your DFW Showerhead</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>YOUR DFW WATER PRESSURE</label>
            <select value={pressure} onChange={e => setPressure(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select pressure level</option>
              <option value='high'>High pressure (60–80+ PSI, strong flow)</option>
              <option value='normal'>Normal pressure (45–60 PSI)</option>
              <option value='low'>Low pressure (under 45 PSI)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8B9CC8', marginBottom: 8, fontWeight: 600 }}>DFW PRIORITY</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, padding: '10px 14px', color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select your priority</option>
              <option value='hardwater'>Hard water resistance (self-cleaning nozzles)</option>
              <option value='conservation'>Water conservation + DFW rebates</option>
              <option value='luxury'>Luxury shower experience</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My DFW Showerhead Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '2px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ TOP DFW PICK</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{result.type}</h3>
            <p style={{ color: '#8B9CC8', marginBottom: 16 }}>{result.note}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>{result.gpf}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>GPM</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642′ }}>{result.style}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Style</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}><div style={{ fontSize: 11, fontWeight: 700, color: '#F5E642′ }}>{result.nozzle}</div><div style={{ fontSize: 11, color: '#8B9CC8' }}>Nozzle Type</div></div>
            </div>
            <div style={{ marginTop: 12, padding: 12, background: '#0A1628', borderRadius: 8 }}><span style={{ color: '#8B9CC8', fontSize: 13 }}>Brands: </span><span style={{ color: '#E8EAF0', fontSize: 13, fontWeight: 600 }}>{result.brands}</span></div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, border: '1px solid #1E2D4A' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 DFW Pro Tips</h2>
          {['Rub silicone nozzles monthly to clear DFW calcium — no vinegar needed','Install a shower filter to dramatically extend showerhead life in DFW hard water','DFW cities offer $50–75 rebates for WaterSense certified showerheads','High DFW pressure? A low-flow head delivers same feel at 40% less water'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#8B9CC8', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
