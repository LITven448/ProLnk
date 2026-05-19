import { useState } from 'react';

const detectorTypes = [
  { id: 'ionization', icon: '⚡', label: 'Ionization', best: 'Fast Flaming Fires', pro: 'Detects fast-spreading fires quickly', con: 'More false alarms from cooking; less sensitive to slow smolder', dfwNote: 'Good for DFW homes with gas stoves — pair with photoelectric' },
  { id: 'photoelectric', icon: '💡', label: 'Photoelectric', best: 'Slow Smoldering Fires', pro: 'Detects smoldering fires early, fewer false alarms from cooking', con: 'Slower to detect fast flaming fires', dfwNote: 'Recommended for DFW bedrooms — most fatal fires start as smoldering' },
  { id: 'dual', icon: '🔰', label: 'Dual-Sensor', best: 'All Fire Types (Best Overall)', pro: 'Detects both fast and slow fires — best protection', con: 'Slightly more expensive; still can false-alarm near kitchens', dfwNote: 'Best choice for most DFW homes — covers all scenarios' },
];

const sizes = [
  { range: 'Under 1,500 sq ft', plan: 'Minimum 1 detector per floor. Kitchen + bedroom hallway. Battery-powered acceptable.' },
  { range: '1,500–3,000 sq ft', plan: '2–3 detectors per floor. One in each bedroom hallway, one in living area, one near garage.' },
  { range: '3,000–5,000 sq ft', plan: 'Hardwired interconnected required. Every hallway, every bedroom, kitchen (with hush button).' },
  { range: '5,000+ sq ft', plan: 'Full hardwired interconnected system. Consider smart detectors for remote alerts. Test zones independently.' },
];

export default function DFWSmokeMeterGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [homeSize, setHomeSize] = useState<string | null>(null);

  const det = detectorTypes.find(d => d.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔔</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Smoke Detector Types Guide 2026</h1>
          <p style={{ color: '#8BA5C4', margin: 0 }}>Choosing the right detector for North Texas homes</p>
        </div>

        <div style={{ background: '#1A2840', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14 }}>
          <strong style={{ color: '#F5E642′ }}>DFW Battery Tip:</strong> Lithium 10-year batteries outperform alkaline in DFW attic heat. 
          Alkaline batteries fail prematurely in 140°F+ attic temperatures. Always choose sealed lithium-battery units.
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Step 1 — Choose Detector Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12, marginBottom: 24 }}>
          {detectorTypes.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              style={{ background: selected === d.id ? '#1E3A5F' : '#0F2040', border: `2px solid ${selected === d.id ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: 16, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontSize: 30 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, color: '#E8F4FD', margin: '6px 0 4px' }}>{d.label}</div>
              <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Best For: {d.best}</div>
              <div style={{ fontSize: 12, color: '#8BA5C4′ }}>{d.dfwNote}</div>
            </button>
          ))}
        </div>

        {det && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '2px solid #F5E642', marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 12px' }}>{det.icon} {det.label} Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: '#0A2010', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#44BB44', fontWeight: 700, marginBottom: 4 }}>✅ Pro</div>
                <div style={{ fontSize: 14, color: '#B8D4EA' }}>{det.pro}</div>
              </div>
              <div style={{ background: '#200A0A', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#FF6666', fontWeight: 700, marginBottom: 4 }}>⚠️ Con</div>
                <div style={{ fontSize: 14, color: '#B8D4EA' }}>{det.con}</div>
              </div>
            </div>
          </div>
        )}

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>Step 2 — Placement by Home Size</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {sizes.map(s => (
            <button key={s.range} onClick={() => setHomeSize(s.range)}
              style={{ background: homeSize === s.range ? '#1E3A5F' : '#0F2040', border: `2px solid ${homeSize === s.range ? '#F5E642' : '#1E3A5F'}`,
                borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: homeSize === s.range ? 8 : 0 }}>{s.range}</div>
              {homeSize === s.range && <div style={{ fontSize: 14, color: '#B8D4EA', lineHeight: 1.6 }}>{s.plan}</div>}
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#0F2040', borderRadius: 10, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#8BA5C4', fontSize: 13, margin: 0 }}>Test detectors monthly. Replace every 10 years. Interconnected detectors are required in new DFW construction per NFPA 72.</p>
        </div>
      </div>
    </div>
  );
}

