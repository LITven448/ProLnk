import { useState } from 'react';

const steps = [
  { icon: '📱', step: '01', title: 'Scan Your Home', desc: 'Walk your property with the TrustyPro app. AI guides you through each zone — roof, foundation, exterior, interior.' },
  { icon: '🤖', step: '02', title: 'AI Analysis', desc: 'Computer vision models trained on 10M+ property images analyze each photo in real time. Results in under 60 seconds.' },
  { icon: '🏥', step: '03', title: 'Health Score', desc: 'Each zone gets a 0–100 score. The full home receives an overall Health Index — your property\’s vital signs.' },
  { icon: '🔗', step: '04', title: 'Matched to Pros', desc: 'Flagged issues are matched to verified pros in your area. You control who sees what — always.' },
];

const zones = {
  roof: {
    label: '🏠 Roof',
    detections: ['Missing or lifted shingles', 'Granule loss indicating age', 'Flashing separation at chimney', 'Moss/algae growth', 'Sagging ridgeline'],
    data: ['Estimated remaining lifespan', 'Material type', 'Last repair indicators', 'Drainage efficiency rating'],
  },
  foundation: {
    label: '🧱 Foundation',
    detections: ['Hairline to structural cracks', 'Efflorescence (moisture seeping)', 'Bowing walls', 'Settlement indicators', 'Drainage issues at grade'],
    data: ['Crack severity classification', 'Moisture presence score', 'Risk level (monitor / repair / urgent)', 'Recommended assessment type'],
  },
  interior: {
    label: '🛋️ Interior',
    detections: ['Water stains on ceilings/walls', 'Drywall cracks', 'HVAC vent obstruction', 'Mold indicators', 'Flooring separation'],
    data: ['Room-by-room condition scores', 'Moisture intrusion probability', 'HVAC age estimate from equipment tags', 'Priority repair sequence'],
  },
  exterior: {
    label: '🏡 Exterior',
    detections: ['Paint failure and wood rot', 'Window seal failure (fogging)', 'Gutter detachment', 'Soffit/fascia damage', 'Siding cracks or gaps'],
    data: ['Paint condition index', 'Seal integrity score', 'Estimated time to failure', 'Material identification'],
  },
};

type ZoneKey = keyof typeof zones;

export default function TrustyProScanTechnology() {
  const [activeZone, setActiveZone] = useState<ZoneKey>('roof');

  return (
    <div style={{ background: '#050d1a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ background: '#4F46E5', display: 'inline-block', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>SCAN TECHNOLOGY</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>AI That Sees What<br /><span style={{ color: '#4F46E5′ }}>Inspectors Miss</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 580, margin: '0 auto' }}>TrustyPro's visual AI was trained on millions of real property images to detect issues before they become emergencies.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0, marginBottom: 80, background: '#0f1e35', borderRadius: 20, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ padding: 32, borderRight: i < steps.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#4F46E5', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>STEP {s.step}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Interactive Zone Demo</h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 36, fontSize: 15 }}>Click a home zone to see what TrustyPro AI detects and captures</p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
          {(Object.keys(zones) as ZoneKey[]).map(z => (
            <button key={z} onClick={() => setActiveZone(z)} style={{ padding: '12px 24px', borderRadius: 10, border: `2px solid ${activeZone === z ? '#4F46E5' : '#1e3a5f'}`, background: activeZone === z ? '#1e1b4b' : 'transparent', color: activeZone === z ? '#fff' : '#94a3b8', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' }}>
              {zones[z].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 20, padding: 40, border: '1px solid #1e3a5f', marginBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <div style={{ fontSize: 13, color: '#4F46E5', fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>WHAT AI DETECTS</div>
              {zones[activeZone].detections.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#FACC15', marginTop: 2 }}>⚠</span>
                  <span style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#4ade80', fontWeight: 700, letterSpacing: 1.5, marginBottom: 16 }}>DATA CAPTURED</div>
              {zones[activeZone].data.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#4ade80', marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.5 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 80 }}>
          {[
            { num: '94%', label: 'Detection Accuracy', sub: 'vs licensed inspector baseline' },
            { num: '20min', label: 'Average Scan Time', sub: 'for a 3-bed / 2-bath home' },
            { num: '10M+', label: 'Training Images', sub: 'real properties across all climates' },
            { num: '0', label: 'Data Sold', sub: 'your scan never leaves your control' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0f1e35', borderRadius: 16, padding: 28, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: '#4F46E5', marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 20, padding: 40, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🔒</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Privacy-First by Design</h3>
          <p style={{ color: '#94a3b8', maxWidth: 560, margin: '0 auto 0', fontSize: 15, lineHeight: 1.7 }}>You own your scan data — always. TrustyPro never sells property data to insurers, government agencies, or third parties. Scans are encrypted at rest and in transit. Delete your data anytime, permanently.</p>
        </div>

      </div>
    </div>
  );
}
