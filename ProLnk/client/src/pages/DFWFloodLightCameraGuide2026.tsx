import { useState } from 'react';

const cameras = [
  { name: 'Ring Floodlight Cam Wired Pro', lumens: 2000, weatherIP: 'IP55', price: 249, motion: 'Advanced', heat: 'Good' },
  { name: 'Arlo Pro 5S Floodlight', lumens: 3000, weatherIP: 'IP65', price: 329, motion: 'Excellent', heat: 'Excellent' },
  { name: 'Wyze Cam Floodlight Pro', lumens: 2500, weatherIP: 'IP65', price: 99, motion: 'Good', heat: 'Good' },
  { name: 'Eufy Floodlight E340', lumens: 4000, weatherIP: 'IP67', price: 219, motion: 'Very Good', heat: 'Very Good' },
];

const placements: Record<string, string[]> = {
  small: ['🏠 Front door floodlight camera (primary coverage)', '🚗 Driveway approach (single cam covers both lanes)', '🌿 Side gate if present'],
  medium: ['🏠 Front door floodlight + doorbell cam (overlapping coverage)', '🚗 Driveway + garage approach', '🌿 Both side gates', '🏡 Backyard access point'],
  large: ['🏠 Front door floodlight + Ring doorbell + porch cam', '🚗 Driveway (near + far cams for plate capture)', '🌿 All side gates + perimeter', '🏡 Back patio + pool area', '🌳 Corner lot: 4-direction perimeter coverage', '📦 Package drop zone dedicated cam'],
};

export default function DFWFloodLightCameraGuide2026() {
  const [propertySize, setPropertySize] = useState('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💡📷</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Floodlight Camera Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Weatherproofing ratings · DFW wind false alerts · professional placement guide</p>
        </div>

        <div style={{ backgroundColor: '#78350f', borderRadius: 12, padding: 16, marginBottom: 24, borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>🌪️ DFW Wind Warning</div>
          <p style={{ color: '#fde68a', fontSize: 13, margin: 0 }}>DFW storms routinely hit 40-60 mph wind gusts. High motion sensitivity causes constant false alerts from swaying trees and debris. Tune sensitivity to medium-low and use activity zones to avoid alert fatigue.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {cameras.map(c => (
            <div key={c.name} style={{ backgroundColor: '#112240', borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>${c.price}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>💡 {c.lumens.toLocaleString()} lumens</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>🌧️ {c.weatherIP} weatherproofing</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>🌡️ DFW Heat: {c.heat}</div>
              <div style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, display: 'inline-block',
                backgroundColor: c.heat === 'Excellent' || c.heat === 'Very Good' ? '#14532d' : '#78350f' }}>
                Motion: {c.motion}
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚡ DFW Electrical Requirements</h2>
          {[
            { label: 'GFCI Outlet Required', detail: 'All outdoor electrical must be GFCI-protected per NEC code — non-negotiable in DFW' },
            { label: 'IP65 Minimum', detail: 'DFW hailstorms and heavy rain demand IP65+ rating. IP55 cameras have failed in North Texas' },
            { label: 'Junction Box Mounting', detail: 'Proper junction box prevents water intrusion behind soffit — critical for DFW spring storms' },
          ].map(r => (
            <div key={r.label} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>✅ {r.label}</div>
              <div style={{ fontSize: 12, color: '#94a3b8′ }}>{r.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📐 Camera Placement by Property Size</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {[{v:'small',l:'Under 2,000 sqft'},{v:'medium',l:'2,000–4,000 sqft'},{v:'large',l:'4,000+ sqft'}].map(o => (
              <button key={o.v} onClick={() => setPropertySize(o.v)}
                style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  backgroundColor: propertySize === o.v ? '#F5E642′ : '#0A1628',
                  color: propertySize === o.v ? '#0A1628′ : '#fff',
                  borderColor: '#F5E642′ }}>
                {o.l}
              </button>
            ))}
          </div>
          {propertySize && placements[propertySize].map(item => (
            <div key={item} style={{ padding: '8px 12px', backgroundColor: '#0A1628', borderRadius: 8, marginBottom: 6, fontSize: 13 }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>🔗 ProLnk licensed electricians install floodlight cameras with proper GFCI and weatherproofing across DFW.</p>
        </div>
      </div>
    </div>
  );
}