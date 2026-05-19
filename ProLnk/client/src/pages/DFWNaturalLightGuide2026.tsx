import { useState } from 'react';

const solutions = [
  { room: 'kitchen', sun: 'south', label: 'South Kitchen', sol: 'Tubular skylight over prep island', detail: 'Solatube 10" DS brings 95% efficiency natural light — no structural change required.' },
  { room: 'kitchen', sun: 'north', label: 'North Kitchen', sol: 'Light shelf + pale yellow paint', detail: 'Light shelves above windows bounce light deep into the room; pale yellow (LRV 80+) amplifies.' },
  { room: 'bedroom', sun: 'east', label: 'East Bedroom', sol: 'Sheer cellular shades', detail: 'Diffuse morning DFW sun — filter glare while keeping luminosity for wake-up light.' },
  { room: 'bedroom', sun: 'west', label: 'West Bedroom', sol: 'Solar film + blackout layer', detail: 'DFW west exposure = intense afternoon heat; 3M Prestige solar film cuts 99% UV, add blackout for sleep.' },
  { room: 'living', sun: 'south', label: 'South Living Room', sol: 'Light shelf + solar film combo', detail: 'Redirect high south sun deep into room while cutting heat gain 40%.' },
  { room: 'living', sun: 'west', label: 'West Living Room', sol: 'Exterior solar shade + interior sheer', detail: 'Exterior shades block heat before it enters; interior sheers diffuse for glare-free brightness.' },
  { room: 'office', sun: 'any', label: 'Home Office', sol: 'Tubular skylight or north-facing desk', detail: 'North-facing windows give even, glare-free work light ideal for screens.' },
];

export default function DFWNaturalLightGuide2026() {
  const [room, setRoom] = useState('');
  const [sun, setSun] = useState('');
  const filtered = solutions.filter(s =>
    (!room || s.room === room) && (!sun || s.sun === sun || s.sun === 'any')
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>☀️ DFW Natural Light Optimization Guide 2026</h1>
        <p style={{ color: '#9BA3B2', fontSize: 15, marginBottom: 32 }}>
          DFW averages 229 sunny days per year — but south and west exposure means brutal heat gain. Smart light optimization captures brightness while rejecting BTUs.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[{ k: '229', l: 'Sunny days/year in DFW' },{ k: '40%', l: 'Heat reduction with solar film' },{ k: '95%', l: 'Tubular skylight efficiency' },{ k: 'LRV 80+', l: 'Ideal paint for light bounce' }].map(s => (
            <div key={s.k} style={{ background: '#111E33', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{s.k}</div>
              <div style={{ color: '#9BA3B2', fontSize: 13, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔍 Find Your Light Solution</h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginBottom: 6 }}>ROOM TYPE</div>
              {['kitchen','bedroom','living','office'].map(r => (
                <button key={r} onClick={() => setRoom(room === r ? '' : r)}
                  style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: room === r ? '#F5E642' : '#1C2D4A', color: room === r ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#9BA3B2', marginBottom: 6 }}>SUN DIRECTION</div>
              {['north','south','east','west'].map(d => (
                <button key={d} onClick={() => setSun(sun === d ? '' : d)}
                  style={{ marginRight: 8, marginBottom: 8, padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    background: sun === d ? '#F5E642' : '#1C2D4A', color: sun === d ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {(filtered.length ? filtered : solutions.slice(0,3)).map(s => (
            <div key={s.label} style={{ background: '#111E33', borderRadius: 12, padding: 20, border: '1px solid #1C2D4A' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>💡 {s.label} → {s.sol}</div>
              <div style={{ color: '#9BA3B2', fontSize: 14 }}>{s.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 4 }}>Find a Window & Lighting Pro in DFW</div>
          <div style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with vetted window, skylight, and solar film installers.</div>
        </div>
      </div>
    </div>
  );
}