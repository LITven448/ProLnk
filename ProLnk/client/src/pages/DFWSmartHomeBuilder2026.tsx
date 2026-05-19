import { useState } from 'react';

export default function DFWSmartHomeBuilder2026() {
  const [builderType, setBuilderType] = useState('');
  const [result, setResult] = useState('');

  const packages: Record<string, string> = {
    drhorton: '🏠 DR Horton Smart Package (Basic): Ring Video Doorbell Pro + Echo Show 5, pre-wired garage door opener, single smart thermostat. INSIST ON: upgrading to CAT6 throughout (not included by default), adding dedicated 20A circuit for home office, requesting conduit sleeves for future EV charger in garage. Builder upgrade cost: ,200-2,800.',
    highland: '⭐ Highland Homes Premium Smart Package: Lutron Caseta dimmer switches throughout, Ring Alarm security, Google Nest Learning Thermostat, structured media center with router shelf. INSIST ON: whole-home audio pre-wire (Highland often omits), CAT6A (not CAT6) for future 10Gb, dedicated 240V circuit for flex room. Builder upgrade cost: ,500-8,000.',
    shaddock: '✨ Shaddock Custom Smart Integration: Full Crestron or Control4 pre-wire, dedicated AV room with conduit, sub-panel for whole-home audio/video, Lutron RadioRA 3 throughout. INSIST ON: locking in Control4 dealer pre-construction (Shaddock has preferred vendors), specifying exact conduit paths before drywall, dedicated fiber conduit from street. Builder upgrade cost: ,000-35,000.',
    production: '🔨 Other Production Builder: Typically basic smart thermostat only. INSIST ON these minimums: CAT6 to every room (run during framing, not after), dedicated 20A circuits in kitchen and garage, pre-wire for ceiling fans in all bedrooms, conduit stub-outs for future outdoor cameras. Negotiate as structural options before contract signing.',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏗️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Smart Home Builder Program 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>What new DFW builders offer — and what to demand before you sign</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '📶', title: 'CAT6 Pre-Wire', desc: 'Run during framing. Impossible to add cleanly after drywall. Non-negotiable.' },
            { icon: '⚡', title: 'Dedicated Circuits', desc: '20A for home office, EV stub-out, AV room sub-panel. Ask before contract.' },
            { icon: '📡', title: 'Conduit Sleeves', desc: 'Empty conduit lets you pull new cable in 10 years without opening walls.' },
            { icon: '🔌', title: 'Structured Media', desc: 'Central wiring closet with patch panel. All CAT6 terminates here, not random boxes.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔍 Compare DFW Builder Smart Packages</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Your DFW Builder</label>
            <select value={builderType} onChange={(e) => setBuilderType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
              <option value=''>Select your builder...</option>
              <option value='drhorton'>DR Horton (Express, Freedom, Emerald)</option>
              <option value='highland'>Highland Homes</option>
              <option value='shaddock'>Shaddock Homes</option>
              <option value='production'>Other Production Builder</option>
            </select>
          </div>
          <button onClick={() => setResult(packages[builderType] || '')} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Show Package Breakdown 🏠</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#e2e8f0', lineHeight: 1.8, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk Smart Home Upgrade Pros</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Move-in ready? ProLnk connects you with DFW low-voltage contractors to add what your builder left out</div>
        </div>
      </div>
    </div>
  );
}