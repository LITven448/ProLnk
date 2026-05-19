import { useState } from 'react';

const yardFeatures = ['Lawn only', 'Lawn + landscape beds', 'Lawn + beds + vegetable garden', 'Lawn + beds + trees', 'Full yard with slopes'];

const stageGuide: Record<string, { zones: string[]; controller: string; tip: string }> = {
  'Lawn only': { zones: ['Zone 1-2: Front lawn (rotors)', 'Zone 3-4: Back lawn (rotors)'], controller: '4-zone smart controller', tip: 'Schedule DFW allowed days only — check city water restrictions before programming' },
  'Lawn + landscape beds': { zones: ['Zone 1-2: Lawn (rotors/spray)', 'Zone 3: Front beds (drip or low-angle spray)', 'Zone 4: Back beds (drip)'], controller: '6-zone smart controller', tip: 'Beds need 50% less water than lawn — never share zones with grass' },
  'Lawn + beds + vegetable garden': { zones: ['Zone 1-2: Lawn', 'Zone 3-4: Ornamental beds', 'Zone 5: Veggie garden (drip)', 'Zone 6: Raised beds (drip)'], controller: '6-zone with moisture sensor', tip: 'Veggie zones need ET-based scheduling — Rachio handles this automatically for DFW' },
  'Lawn + beds + trees': { zones: ['Zone 1-2: Lawn', 'Zone 3: Beds (drip)', 'Zone 4: Trees (bubblers, 2 gph each)', 'Zone 5: Bonus lawn or slope'], controller: '6-8 zone smart controller', tip: 'Tree bubblers run 15-30 min max — slow deep soak beats frequent shallow watering in DFW clay' },
  'Full yard with slopes': { zones: ['Zone 1-2: Flat lawn', 'Zone 3: Slope (MP Rotators, 0.4 in/hr)', 'Zone 4-5: Beds (drip)', 'Zone 6: Trees or specialty areas'], controller: '8-zone with slope cycle+soak', tip: 'Use cycle+soak on slopes — 5 min on, 30 min off prevents DFW clay runoff' },
};

export default function DFWSprinklerSystemStages2026() {
  const [selected, setSelected] = useState('');

  const guide = selected ? stageGuide[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk DFW Guide · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>🗂️ DFW Irrigation System Staging Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>Multi-zone irrigation design for DFW — separate zones prevent over/under watering and maximize efficiency on city-restricted watering days.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🔢', title: 'Why Separate Zones?', body: 'Lawn needs 1.5–2x more water than beds. Mixed zones drown plants or starve grass — DFW clay makes this worse.' },
            { icon: '🎛️', title: 'Max Zones Per Controller', body: 'Most DFW homes need 4–8 zones. Smart controllers handle 12–16. Zone count drives controller selection.' },
            { icon: '📅', title: 'DFW Watering Days', body: 'Most DFW cities restrict watering to 2x/week by address odd/even. Smart controllers auto-skip restricted days.' },
            { icon: '🌩️', title: 'Smart Integration', body: 'Rachio 3 pulls DFW weather data hourly — skips watering after rain automatically, saving 30–50% water.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 Zone Staging by Yard Features</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>What features does your yard have?</label>
            <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', background: '#162035', border: '1px solid #1E3A5F', color: '#E8EAF6', borderRadius: 8, padding: '12px 14px', fontSize: 15 }}>
              <option value=''>Select your yard type</option>
              {yardFeatures.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          {guide && (
            <div style={{ background: '#162035', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16, marginBottom: 12 }}>📐 Staging Plan — {selected}</div>
              <div style={{ marginBottom: 12 }}>
                {guide.zones.map((z, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E3A5F' }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontWeight: 800, fontSize: 12 }}>Z{i + 1}</span>
                    <span style={{ color: '#E8EAF6', fontSize: 14 }}>{z.split(':')[1]?.trim()}</span>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>🎛️ <strong style={{ color: '#E8EAF6′ }}>Controller:</strong> {guide.controller}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>💡 <strong style={{ color: '#E8EAF6′ }}>DFW Tip:</strong> {guide.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📋 DFW Water Day Reference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { city: 'Dallas', days: 'Odd/Even by address, 2x/week', season: 'Apr–Oct restricted' },
              { city: 'Fort Worth', days: 'Odd/Even 2x/week', season: 'Stage-based drought rules' },
              { city: 'Plano', days: '2x/week by address', season: 'May–Sep restricted hours' },
              { city: 'Frisco', days: '2x/week, no noon–6pm', season: 'Check current stage' },
            ].map(c => (
              <div key={c.city} style={{ background: '#162035', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{c.city}</div>
                <div style={{ color: '#E8EAF6', fontSize: 12, marginBottom: 4 }}>{c.days}</div>
                <div style={{ color: '#94A3B8', fontSize: 11 }}>{c.season}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Get Your DFW Irrigation System Staged Right</div>
          <div style={{ color: '#94A3B8', marginBottom: 16, fontSize: 14 }}>Licensed DFW irrigators, free quotes, same-week scheduling available.</div>
          <a href='/' style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>Get Free Quotes →</a>
        </div>
      </div>
    </div>
  );
}