import { useState } from 'react';

export default function DFWHomeTheaterWiring2026() {
  const [roomSize, setRoomSize] = useState('medium');
  const [setup, setSetup] = useState('51');

  const getWiring = () => {
    const isLarge = roomSize === 'large';
    const is71 = setup === '71' || setup === 'atmos';
    const wireGauge = isLarge ? '14AWG speaker wire (long runs >30ft)' : '16AWG speaker wire';
    const circuit = 'Dedicated 20A circuit for AV rack (hire electrician)';
    const hdmi = 'HDMI 2.1 in-wall rated cables (hire electrician for in-wall runs)';
    const conduit = isLarge ? '2" EMT conduit — future-proof for 8K/IP upgrades' : '1" PVC conduit for cable runs';
    const speakerRuns = setup === 'atmos' ? 'Front L/R, Center, Surround L/R, Rear L/R, 2x ceiling Atmos' : is71 ? 'Front L/R, Center, Side Surround L/R, Rear Surround L/R, Subwoofer' : 'Front L/R, Center, Surround L/R, Subwoofer';
    const tip = isLarge ? 'For rooms >400sqft, use a receiver with pre-amp outputs to separate amplification' : 'Position center channel at ear height, speakers at 22–30° off-axis from seating';
    return { wireGauge, circuit, hdmi, conduit, speakerRuns, tip };
  };

  const wiring = getWiring();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎬</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Home Theater Wiring Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>In-wall wiring for DFW media rooms — done right the first time</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Wiring Essentials</h2>
          {[
            { icon: '🔌', rule: 'Dedicated 20A circuit for all AV equipment — hire a licensed TX electrician' },
            { icon: '📺', rule: 'HDMI 2.1 in-wall rated cables for 4K/8K runs — never use standard HDMI in walls' },
            { icon: '🔊', rule: '16AWG minimum for speaker wire; 14AWG for runs over 30ft' },
            { icon: '🛠️', rule: 'Install conduit during build — retrofitting costs 3x more in DFW labor rates' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.5 }}>{item.rule}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your Wiring Plan</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Media Room Size</label>
              <select value={roomSize} onChange={e => setRoomSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="small">Small (&lt;200 sqft)</option>
                <option value="medium">Medium (200–400 sqft)</option>
                <option value="large">Large (&gt;400 sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Surround Sound Setup</label>
              <select value={setup} onChange={e => setSetup(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#e2e8f0', fontSize: 14 }}>
                <option value="51">5.1 Surround</option>
                <option value="71">7.1 Surround</option>
                <option value="atmos">Dolby Atmos (7.1.2 or 7.1.4)</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>Your Wiring Plan</h3>
            {[
              { label: 'Speaker Wire', value: wiring.wireGauge },
              { label: 'HDMI', value: wiring.hdmi },
              { label: 'Power', value: wiring.circuit },
              { label: 'Conduit', value: wiring.conduit },
              { label: 'Speaker Runs', value: wiring.speakerRuns },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ color: '#94a3b8', fontSize: 13, minWidth: 100 }}>{row.label}</span>
                <span style={{ color: '#e2e8f0', fontSize: 13, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: '10px 12px', background: '#112240', borderRadius: 6, color: '#F5E642', fontSize: 13 }}>
              💡 {wiring.tip}
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Need a DFW electrician or AV installer for your media room? <span style={{ color: '#F5E642' }}>ProLnk connects you with vetted local pros.</span></p>
        </div>
      </div>
    </div>
  );
}
