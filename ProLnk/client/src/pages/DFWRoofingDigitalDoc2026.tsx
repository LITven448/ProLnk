import { useState } from 'react';

export default function DFWRoofingDigitalDoc2026() {
  const [stage, setStage] = useState('');
  const [result, setResult] = useState('');

  const stages = [
    { id: 'new_roof', label: '🆕 Just got a new roof installed' },
    { id: 'annual', label: '📅 Annual documentation update' },
    { id: 'post_storm', label: '⛈️ After a DFW hail or wind storm' },
    { id: 'insurance_claim', label: '📋 Filing an insurance claim' },
    { id: 'before_sale', label: '🏡 Preparing to sell the home' },
  ];

  const guides: Record<string, string> = {
    new_roof: 'Document immediately after installation: photograph every section from ground level, capture material labels and manufacturer info, photograph the permit posted on house, save the contractor invoice and warranty PDF. Upload all to ProLnk Vault tagged as "New Roof Install."',
    annual: 'Annual DFW roof photo protocol: walk the perimeter, photograph all four sides, use your phone camera in HDR mode for best detail. Check for granule loss in gutters (scoop a handful — heavy granules = aging shingles). Update your Vault photos each October.',
    post_storm: 'Post-storm documentation within 48 hours: photograph hail dents on AC unit, mailbox, and cars (establishes storm date), then roof. Use iRoofing or EagleView to get aerial imagery. Do NOT walk roof yourself — call a pro for inspection. Submit all photos to insurer before any repairs.',
    insurance_claim: 'What DFW insurers want: dated aerial photos (EagleView order ~$50), close-up of impact craters on shingles, photos of interior attic decking for daylight leaks, neighbor inspection reports, and contractor written estimate. ProLnk Vault generates a timestamped photo report on demand.',
    before_sale: 'Pre-sale roof documentation increases buyer confidence: compile full maintenance history from Vault, include warranty transfer documents, order a certified roof inspection report ($150–$300), provide photos from last 3 annual inspections. Buyers and inspectors respond well to organized digital records.',
  };

  function evaluate() {
    if (!stage) return;
    setResult(guides[stage] || '');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📱</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW Roofing Digital Documentation Guide 2026
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW storms make roof documentation essential. The right photos at the right time protect your claim and your investment.
          </p>
        </div>

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>📸 What Stage Are You In?</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => { setStage(s.id); setResult(''); }}
                style={{ background: stage === s.id ? '#F5E642' : '#1A2F4A', color: stage === s.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '14px 20px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={evaluate} disabled={!stage}
            style={{ marginTop: 20, width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '16px', fontWeight: 800, fontSize: 16, cursor: stage ? 'pointer' : 'not-allowed', opacity: stage ? 1 : 0.5 }}>
            Get Documentation Guide →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2139', borderRadius: 12, padding: 28, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 Your Documentation Plan</h3>
            <p style={{ lineHeight: 1.7, fontSize: 15 }}>{result}</p>
          </div>
        )}

        <div style={{ background: '#0F2139', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🛠️ Recommended Apps</h3>
          <div style={{ display: 'grid', gap: 10, fontSize: 14 }}>
            {['📱 iRoofing — DIY roof photos + material matching', '🛰️ EagleView — Professional aerial imagery ($50)', '📂 ProLnk Vault — Permanent home history storage', '☁️ Google Photos — Free backup with date-stamping'].map((item, i) => (
              <div key={i} style={{ background: '#1A2F4A', borderRadius: 8, padding: '12px 16px' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>🏠 Your Roof History Lives in ProLnk Vault</p>
          <p style={{ color: '#1A2F4A', fontSize: 14 }}>Auto-dated photos, inspection reports, and contractor records — all in one place.</p>
        </div>
      </div>
    </div>
  );
}
