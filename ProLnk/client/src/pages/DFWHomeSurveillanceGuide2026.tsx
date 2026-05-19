import { useState } from 'react';

export default function DFWHomeSurveillanceGuide2026() {
  const [homeSize, setHomeSize] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const recs: Record<string, Record<string, string>> = {
    small: {
      low: '📦 Budget Pick: Reolink RLC-810A (4K PoE, /camera) + Reolink 8-channel NVR (). 4-camera setup covers most DFW townhomes. Local storage only — no monthly fees. 4K captures license plates at 30ft. Total: -480.',
      mid: '⭐ Mid-Range: Arlo Pro 5S (2K HDR, wire-free) for flexible placement around your DFW lot. 6-camera kit + Arlo Secure hub (). Cloud + local base station storage. Color night vision handles DFW street light conditions.',
      high: '🏆 Premium: Avigilon (Motorola) H5SL 4K with AI analytics. Detects humans vs vehicles vs animals — eliminates DFW squirrel false alarms. 4-camera NVR system with 30-day retention. ,800-2,400 installed.',
    },
    medium: {
      low: '📦 Budget Pick: Reolink 8-camera 4K PoE system (). Single CAT5e run per camera. 3TB NVR covers 45 days continuous. DFW garage, front, back, two side yards fully covered.',
      mid: '⭐ Mid-Range: Ring Alarm Pro + 8x Ring Spotlight Cam Pro (,100). Integrated alarm + cameras. DFW neighborhoods: motion zones prevent street traffic triggers. 180-day cloud history on Premium plan.',
      high: '🏆 Premium: Hanwha QNV-8080R 4K dome cameras (vandal-resistant) + Synology NAS NVR. 8-camera system with 60-day 4K retention locally. DFW HOA-friendly dome design. ,200-4,800 installed.',
    },
    large: {
      low: '📦 Budget Pick: 16-channel Reolink PoE NVR + 12x 4K cameras (). Covers DFW estate perimeter with 6TB storage. Add PoE switch for camera expansion without rewiring.',
      mid: '⭐ Mid-Range: Hikvision AcuSense 4K system (16 cameras) + DS-7716NI-I4 NVR. AI human/vehicle detection, DFW perimeter alerts only for relevant motion. ,400-3,800 installed.',
      high: '🏆 Commercial-Grade: Axis Communications P3245-V 4K with ARTPEC-8 chip. On-camera AI processing — no server needed. 16-camera estate system with redundant 20TB NAS. DFW security integrators install as commercial-grade residential. ,000-15,000.',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Home Surveillance Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Full-property surveillance systems sized for Dallas-Fort Worth homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { icon: '📼', title: 'NVR vs DVR', desc: 'NVR (IP cameras over CAT5e) = sharper 4K. DVR (analog coax) = legacy systems. Always choose NVR for new DFW installs.' },
            { icon: '🔬', title: '4K Resolution', desc: 'Required for license plate capture at 20-30ft in DFW driveways. 1080p is not enough for plate reads.' },
            { icon: '🌙', title: 'Night Vision', desc: 'DFW street lights vary by neighborhood. Color night vision (Starlight sensors) outperforms IR in lit areas.' },
            { icon: '💾', title: 'Local vs Cloud', desc: 'Local NVR = no monthly fees, no outage risk. Cloud = remote access anywhere. Hybrid = best of both.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#1e2d45', borderRadius: 12, padding: 18, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔍 Get Your DFW Surveillance System Guide</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Home Size</label>
              <select value={homeSize} onChange={(e) => setHomeSize(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
                <option value=''>Select size...</option>
                <option value='small'>Under 2,500 sq ft (townhome / patio home)</option>
                <option value='medium'>2,500–4,000 sq ft (standard DFW home)</option>
                <option value='large'>4,000+ sq ft (estate / acreage)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', display: 'block', marginBottom: 8 }}>Budget Range</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #334155′ }}>
                <option value=''>Select budget...</option>
                <option value='low'>Under  (DIY-friendly)</option>
                <option value='mid'>–,000 (prosumer)</option>
                <option value='high'>,000+ (professional install)</option>
              </select>
            </div>
          </div>
          <button onClick={() => setResult(recs[homeSize]?.[budget] || '')} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Show My System Guide 📷</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, color: '#e2e8f0', lineHeight: 1.8, borderLeft: '3px solid #F5E642′ }}>{result}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔐</div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>ProLnk DFW Security Camera Installers</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Get quotes from licensed low-voltage contractors in your DFW area — PoE runs, NVR setup, and remote access configuration</div>
        </div>
      </div>
    </div>
  );
}