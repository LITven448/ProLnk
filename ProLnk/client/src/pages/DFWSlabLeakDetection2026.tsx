import { useState } from 'react';

export default function DFWSlabLeakDetection2026() {
  const [leakType, setLeakType] = useState('hot-water');
  const [guide, setGuide] = useState('');

  const leakTypes = [
    { value: 'hot-water', label: 'Hot Water Line' },
    { value: 'cold-water', label: 'Cold Water Line' },
    { value: 'drain-line', label: 'Drain / Sewer Line' },
    { value: 'unknown', label: 'Location Unknown' },
    { value: 'gas', label: 'Gas Line (Under Slab)' },
  ];

  const guides: Record<string, string> = {
    'hot-water': '🌡️ Thermal Imaging First: IR camera detects warm slab surface above hot water lines. Most cost-effective for hot lines. Follow up with acoustic listening to pinpoint exact breach. Cost: $300–$600 for thermal + acoustic combo.',
    'cold-water': '🔊 Acoustic Detection: Cold lines don't show on thermal — use electronic acoustic amplification. Tech places microphone on slab surface and listens for hissing/rushing. Correlate meter: shut off all fixtures and watch meter spin. Cost: $250–$500.',
    'drain-line': '📹 Video Camera Inspection: Snake a waterproof camera through cleanout into drain line under slab. Reveals cracks, root intrusion, offset joints. May combine with hydrostatic pressure test (plug all drains, fill with water, watch for pressure drop). Cost: $200–$450.',
    'unknown': '🔬 Multi-Method Protocol: (1) Shut water meter — if spinning, active water leak. (2) Thermal scan entire slab. (3) Acoustic survey perimeter and interior. (4) Helium trace if above methods inconclusive — inject helium into suspected line, detector finds exit point. Cost: $500–$900 full sweep.',
    'gas': '⚠️ Call Atmos First: Never DIY gas leak detection. Atmos Energy will respond 24/7 for free. Pro methods: electronic combustible gas detector along slab edge, pressure drop test on gas line (plumber gauges line, watches for pressure loss over 10 min). Cost: Atmos free / Plumber $150–$350.',
  };

  const getGuide = () => setGuide(guides[leakType] || '');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Slab Leak Detection Methods 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Professional Detection for DFW Slab Leaks — Acoustic, Thermal, Helium &amp; Video</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          {[
            { icon: '🎙️', title: 'Acoustic Detection', body: 'Electronic listening devices amplify the sound of water escaping a pressurized pipe. Technician moves sensor across slab — peak sound = leak location. Effective for all pressurized lines.', cost: '$250–$500' },
            { icon: '🌡️', title: 'Thermal Imaging (IR)', body: 'Infrared camera detects temperature differentials on slab surface. Hot water leaks create warm zones visible to camera. Cold lines invisible on IR — pair with acoustic for cold-line leaks.', cost: '$300–$600' },
            { icon: '🫧', title: 'Helium Tracing', body: 'Helium injected into suspected pipe migrates through soil and exits at breach point. Electronic detector finds helium concentration. Most precise method for stubborn or deep leaks.', cost: '$400–$800' },
            { icon: '📹', title: 'Video Camera Inspection', body: 'Waterproof snake camera inserted through cleanout visualizes drain line interior. Finds cracks, joint offsets, and root intrusion. Standard for sewer and drain line diagnosis.', cost: '$200–$450' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 8 }}>{c.cost}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧭 Detection Method Selector</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Suspected Leak Type</label>
            <select value={leakType} onChange={e => setLeakType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              {leakTypes.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>Get Detection Guide</button>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7, border: '1px solid #F5E642' }}>{guide}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>ProLnk — DFW Slab Leak Detection Methods 2026</p>
      </div>
    </div>
  );
}
