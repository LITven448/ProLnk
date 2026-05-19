import { useState } from 'react';

export default function DFWHomeTheaterRoomGuide2026() {
  const [roomSize, setRoomSize] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const designs: Record<string, Record<string, string>> = {
    small: {
      low: '📺 Small Room Budget Build (,500-3,500): 75″ 4K QLED TV (Samsung QN75Q80C, ,200) — DFW rooms under 16ft don\’t benefit from projectors. Denon AVR-X1800H 7.2 receiver () + Klipsch Reference Theater Pack 5.0 () + single 10″ subwoofer. Acoustic treatment: 2 corner bass traps ( each) + 4 first-reflection foam panels ( each). Dedicated 20A circuit for receiver is a must in DFW older homes.',
      mid: '⭐ Small Room Mid-Range (,000-8,000): 85″ Sony Bravia XR A95L OLED (,800) + Marantz Cinema 60 receiver (,100) + Monitor Audio Bronze 500 7.1 system (,200). 2″ Rockwool acoustic panels at first reflection points. Add DFW electrician for dedicated 20A circuit + HDMI 2.1 conduit run. Result: reference-grade audio in compact DFW media room.',
      high: '🏆 Small Room Premium (,000-15,000): Epson LS11000 4K laser projector (,500) on 120″ ALR screen. Even in DFW bright rooms, Ambient Light Rejecting screen handles afternoon sun through plantation shutters. Anthem MRX 1140 (,800) + Paradigm Founder Series 7.1 (,200). GIK Acoustics full room treatment package (). Lutron Caseta scene control.',
    },
    medium: {
      low: '📺 Medium Room Budget (,500-6,000): BenQ TK700STi 4K projector () on 120″ screen. DFW media rooms: blackout curtains essential (DFW sun angle at 3pm destroys contrast). Yamaha RX-V6A () + Klipsch RP-8060FA Dolby Atmos towers (,400/pair) + RP-500C center (). Two 12″ subs for DFW room pressurization. Bass trap in each corner.',
      mid: '⭐ Medium Room Mid-Range (,000-16,000): Sony VPL-XW5000ES 4K laser projector (,000) never needs bulb replacement. 135″ acoustic-transparent screen allows center speaker behind screen. Denon AVR-X4800H (,800) + Focal Chora full 7.2.4 Atmos system (,800). 4 cloud speakers overhead for DFW Atmos ceiling height requirements. Full GIK treatment.',
      high: '🏆 Medium Room Premium (,000-35,000): JVC NZ7 4K laser projector (,000) with native 4K and HDR10+ processing. 150″ Screen Innovations Zero Edge Pro. Anthem AVM 90 (,500) + Trinnov Altitude 16 processor. Genelec or JBL Synthesis full Atmos 9.2.6 system. Acoustic design by local DFW firm — first reflection, diffusion panels, cloud treatment. Riser seating with tactile transducers.',
    },
    large: {
      low: '📺 Large Room Budget (,000-12,000): Large DFW theater rooms need serious horsepower. BenQ W5700 (,400) on 150″ screen. Marantz AV10 (,200) + Klipsch Reference Premiere full 9.2 system (,800). Four 12″ subs in DFW room corners for even bass distribution — critical for large-volume DFW theater rooms. Dedicated 30A sub-panel recommended.',
      mid: '⭐ Large Room Mid-Range (,000-30,000): Sony VPL-GTZ380 4K laser (,000) — DFW large theaters justify this for zero maintenance and 10,000 lumen output. Trinnov Altitude 32 (,500) + JBL Synthesis SCL-2 in-wall system throughout. 160″ acoustic-transparent screen. Full Atmos 13.2.6 configuration. Motorized seating risers. DFW AV integrator required for calibration.',
      high: '🏆 Large Room Ultimate (,000+): Full custom DFW theater. THX certification pathway. Barco Loki or Christie CP4230 commercial projector. 175″ screen. Trinnov + Datasat dual processor setup. JBL Synthesis or Steinway Lyngdorf full system. Acoustic architect design — double-wall construction isolates DFW neighbor proximity. Motorized risers, in-wall tactile, bar area.',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Home Theater Room Design Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Build the ultimate theater room sized for your DFW home</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '🔊', title: 'Acoustic Treatment', desc: 'First reflection points, corner bass traps, cloud diffusion. DFW drywall construction requires treatment for all budgets.' },
            { icon: '💺', title: 'Seating Rows', desc: 'Row 1: 1.5x screen height back. Row 2 needs riser (12-18″) for sightlines. DFW rooms often fit 2 rows in 20ft depth.' },
            { icon: '⚡', title: 'Dedicated Circuit', desc: '20A minimum for receiver. Subwoofers each need their own 20A outlet. DFW panel upgrades common in older theater builds.' },
            { icon: '🌞', title: 'Light Control', desc: 'DFW afternoon sun: west-facing rooms need 100% blackout. Lutron Caseta + motorized shades = scene control perfection.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🎬 Design My DFW Theater Room</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Room Size</label>
              <select value={roomSize} onChange={(e) => setRoomSize(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
                <option value=''>Select size...</option>
                <option value='small'>Small (under 200 sq ft / under 14x14)</option>
                <option value='medium'>Medium (200-350 sq ft / 14x14 to 18x20)</option>
                <option value='large'>Large (350+ sq ft / dedicated theater room)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Total Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
                <option value=''>Select budget...</option>
                <option value='low'>Budget-conscious</option>
                <option value='mid'>Mid-range enthusiast</option>
                <option value='high'>Premium / no compromise</option>
              </select>
            </div>
          </div>
          <button onClick={() => setResult(designs[roomSize]?.[budget] || '')} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Design My Theater 🎬</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#e2e8f0', lineHeight: 1.8, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔌</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk DFW AV & Electrical Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Connect with DFW electricians for dedicated circuits and AV integrators for full theater installation</div>
        </div>
      </div>
    </div>
  );
}