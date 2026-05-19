import { useState } from 'react';

const seasonTiming = {
  spring: { day: 'Sunday 1–4 PM', note: 'Peak season — expect 20–40 visitors. Also consider Saturday 11 AM–2 PM.', temp: '70–74°F inside', curb: 'Bluebonnets in yard if possible — DFW buyers love spring color' },
  summer: { day: 'Sunday 1–4 PM (early or evening)', note: 'DFW summer is brutal. Consider 5–7 PM open houses to avoid peak heat.', temp: '68–72°F inside — buyers arriving from 100°F heat need relief', curb: 'Water lawn night before. Use shade plants and fresh mulch.' },
  fall: { day: 'Sunday 2–5 PM', note: 'Great weather returns. Strong attendance. Football conflicts on Saturdays.', temp: '70–74°F inside', curb: 'Mums and seasonal color add warmth. Rake any leaves.' },
  winter: { day: 'Sunday 1–4 PM', note: 'Fewer buyers but more serious. Less competition on market.', temp: '70–72°F inside — warm and inviting', curb: 'Well-lit exterior matters most. Clear any ice from walkways.' },
};

const hideList = ['Personal medications', 'Jewelry and valuables', 'Financial documents', 'Personal photos (ideally)', 'Pet food, litter boxes', 'Mail and sensitive mail', 'Firearms and weapons', 'Spare keys'];

const scentsAndStaging = [
  { tip: '🍪 Baking cookies', note: 'Cliché but genuinely works. Warm scent = emotional connection.' },
  { tip: '🕯️ Neutral candle — vanilla or clean linen', note: 'Subtle and universally liked. Avoid strong florals or food scents.' },
  { tip: '🚫 Avoid plug-in air fresheners', note: 'Buyers associate heavy scent with odor masking. Red flag.' },
  { tip: '🪟 Open windows 30 min before', note: 'Fresh air beats any candle. DFW spring and fall are ideal.' },
  { tip: '☕ Fresh coffee brewing', note: 'Welcoming scent, triggers positive associations.' },
];

export default function DFWOpenHouseGuide() {
  const [homeType, setHomeType] = useState('single');
  const [season, setSeason] = useState('spring');

  const timing = seasonTiming[season as keyof typeof seasonTiming];

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f9f7f4', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 40 }}>🏡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0A1628', margin: '12px 0 8px' }}>
            DFW Open House Preparation Guide
          </h1>
          <p style={{ color: '#555', fontSize: 16 }}>DFW Sunday open houses are a ritual. Here's how to run one that generates offers.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 20 }}>📅 Get Your Recommendations</h2>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, background: '#fafafa' }}>
                <option value="single">Single Family Home</option>
                <option value="townhome">Townhome or Patio Home</option>
                <option value="condo">Condo or High-Rise</option>
                <option value="luxury">Luxury ($750K+)</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>Season of Open House</label>
              <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 14, background: '#fafafa' }}>
                <option value="spring">Spring (Mar–May)</option>
                <option value="summer">Summer (Jun–Aug)</option>
                <option value="fall">Fall (Sep–Nov)</option>
                <option value="winter">Winter (Dec–Feb)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#aaa', marginBottom: 8 }}>OPTIMAL TIMING FOR YOUR SEASON</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>⏰ {timing.day}</div>
            <p style={{ color: '#ccc', fontSize: 14, margin: '0 0 12px' }}>{timing.note}</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 160, background: '#132036', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>🌡️ HVAC Setting</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{timing.temp}</div>
              </div>
              <div style={{ flex: 1, minWidth: 160, background: '#132036', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>🌿 Curb Appeal</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{timing.curb}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 20 }}>👃 Scent & Ambiance</h2>
          {scentsAndStaging.map((s, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: i < scentsAndStaging.length - 1 ? '1px solid #f0f0ee' : 'none' }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{s.tip}</div>
              <div style={{ fontSize: 14, color: '#666′ }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 20 }}>🔒 What to Hide Before Visitors Arrive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {hideList.map((item, i) => (
              <div key={i} style={{ background: '#fef9e7', border: '1px solid #f5e642', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontWeight: 500 }}>🚫 {item}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 28, background: '#0A1628', borderRadius: 16 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, margin: 0 }}>Ready to run a DFW open house that converts?</p>
          <p style={{ color: '#aaa', fontSize: 14, margin: '8px 0 0′ }}>Connect with experienced DFW listing agents who know how to drive traffic.</p>
        </div>
      </div>
    </div>
  );
}
