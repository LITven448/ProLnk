import { useState } from 'react';

export default function DFWFoundationCrackMonitor2026() {
  const [crackType, setCrackType] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [protocol, setProtocol] = useState('');

  const protocols: Record<string, Record<string, string>> = {
    hairline: {
      stable: 'Mark each end with a pencil and date (MM/DD/YY). Photograph with a coin for scale. Log in ProLnk Vault. Re-measure annually. Hairline cracks under 1/16 inch that are not growing are cosmetic in DFW — typically drywall joint movement from seasonal humidity swings.',
      growing: 'Install a crack gauge ($15-30 at hardware stores) bridging the crack. Mark a baseline measurement with a marker. Photograph weekly for 4 weeks. If growth exceeds 1/8 inch in 30 days in DFW, contact a foundation engineer — rapid growth during drought conditions is a warning sign.',
    },
    stair_step: {
      stable: 'Stair-step cracks in DFW brick follow mortar joints and indicate differential movement. If stable (same width top to bottom, no horizontal offset), monitor quarterly with pencil marks and photos. Note whether the crack opens or closes seasonally with DFW rains.',
      growing: 'Growing stair-step cracks with any horizontal offset (brick shifting laterally) require prompt engineer evaluation. This pattern in DFW indicates the foundation edge is dropping. Do not delay — document with daily photos for 2 weeks, then schedule an engineer consultation.',
    },
    horizontal: {
      stable: 'Horizontal cracks in DFW foundation walls (especially block or brick foundation walls) indicate lateral soil pressure. Even stable horizontal cracks warrant an engineer review — they indicate a different failure mode than vertical settlement cracks. Document with photos and measurements now.',
      growing: 'Growing horizontal cracks are a structural emergency in DFW. The wall is actively deflecting under soil pressure. Do not wait — contact a structural engineer within 72 hours. Keep children away from the affected wall area until evaluated.',
    },
    vertical: {
      stable: 'Vertical cracks in poured concrete are common in DFW during the first 5 years as concrete cures and the home settles. Stable vertical cracks under 1/4 inch with no displacement: mark ends, photograph quarterly, log in ProLnk Vault. Fill with flexible polyurethane caulk to prevent water intrusion.',
      growing: 'Growing vertical cracks in DFW foundations, especially if wider at top than bottom, indicate differential settlement. Measure width at top, middle, and bottom. If differential exists or crack grows over 1/4 inch, schedule a foundation engineer — likely pier candidates on that elevation.',
    },
  };

  function getProtocol() {
    if (!crackType || !measurement) { setProtocol('Please select both crack type and current status.'); return; }
    const p = protocols[crackType]?.[measurement];
    setProtocol(p || 'Consult a licensed DFW foundation engineer for your specific crack pattern.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 36, marginBottom: 8 }}>🔍</div>
        <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, marginBottom: 8 }}>DFW Foundation Crack Monitoring Kit Guide 2026</h1>
        <p style={{ color: '#a0b0c8', marginBottom: 24 }}>How to monitor DFW foundation cracks over time — tools, frequency, logging, and when to call an engineer.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛠️ DFW Crack Monitoring Toolkit</h2>
          {[
            { item: 'Pencil + Date Marks', detail: 'Mark both ends of every crack with date — free, immediate, effective' },
            { item: 'Crack Gauge ($15–30)', detail: 'Plastic or metal bridge gauge — measures width to 0.01mm precision' },
            { item: 'Phone Camera + Coin', detail: 'Quarter provides consistent scale reference for all photos' },
            { item: 'Monitoring Log', detail: 'ProLnk Vault digital log — date, width, length, crack location, photos' },
            { item: 'Frequency', detail: 'Active cracks: monthly. Stable cracks: quarterly. After major DFW rain event: always' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 140, fontSize: 13 }}>{r.item}</span>
              <span style={{ color: '#c8d8ec', fontSize: 13 }}>{r.detail}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 Get Your Monitoring Protocol</h2>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Crack Type</label>
          <select value={crackType} onChange={e => setCrackType(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select crack type...</option>
            <option value="hairline">Hairline (drywall or plaster)</option>
            <option value="stair_step">Stair-Step (brick or block)</option>
            <option value="horizontal">Horizontal (wall crack)</option>
            <option value="vertical">Vertical (foundation or concrete)</option>
          </select>
          <label style={{ color: '#a0b0c8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Status</label>
          <select value={measurement} onChange={e => setMeasurement(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', marginBottom: 14 }}>
            <option value="">Select status...</option>
            <option value="stable">Appears Stable (no visible change)</option>
            <option value="growing">Actively Growing or New</option>
          </select>
          <button onClick={getProtocol} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer', fontSize: 15 }}>Get Monitoring Protocol 🔍</button>
          {protocol && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#c8d8ec', fontSize: 14, lineHeight: 1.6, borderLeft: '3px solid #F5E642' }}>{protocol}</div>}
        </div>

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12, marginTop: 24 }}>ProLnk DFW Home Intelligence · Foundation Crack Monitor Guide 2026</div>
      </div>
    </div>
  );
}
