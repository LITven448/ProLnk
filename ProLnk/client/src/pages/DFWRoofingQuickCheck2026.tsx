import { useState } from 'react';

export default function DFWRoofingQuickCheck2026() {
  const [finding, setFinding] = useState('');

  const findings = [
    { id: 'granule-loss', label: '🪨 Granule loss on shingles', urgency: 'Moderate', timeframe: '1–3 months', detail: 'Granule loss means UV protection is gone. DFW hail accelerates this. Granules in gutters = shingles near end of life. Get a professional inspection before next storm season.', cta: 'Schedule ProLnk Roofing Inspection' },
    { id: 'lifted-shingles', label: '🌬️ Lifted or curling shingles', urgency: 'High', timeframe: '2–4 weeks', detail: 'Lifted shingles in DFW wind mean water infiltration risk in every rainstorm. This is a leak in waiting. A certified roofer can re-nail or replace affected sections.', cta: 'Get Urgent ProLnk Roofing Quote' },
    { id: 'daylight-attic', label: '💡 Daylight visible in attic', urgency: 'Critical', timeframe: 'This week', detail: 'Any daylight in attic = active opening for water, pests, and heat gain. DFW summer heat in an exposed attic can spike HVAC bills 30%+. This needs immediate repair.', cta: 'Get Emergency ProLnk Roof Repair' },
    { id: 'ridge-sag', label: '📉 Sagging ridge line', urgency: 'Critical', timeframe: 'Immediately', detail: 'A sagging ridge line indicates structural deck issues. This is beyond cosmetic — do not delay. Call a licensed roofer before the next storm adds weight or water.', cta: 'Request Emergency ProLnk Assessment' },
    { id: 'gutters-full', label: '🌿 Clogged or damaged gutters', urgency: 'Low', timeframe: '1–2 months', detail: 'Clogged gutters cause fascia rot and foundation water pooling — both expensive DFW repairs. Clean gutters protect your roof edge and your slab simultaneously.', cta: 'Get ProLnk Gutter Service Quote' },
  ];

  const urgencyColor: Record<string, string> = { 'Critical': '#ef4444', 'High': '#f97316', 'Moderate': '#eab308', 'Low': '#22c55e' };
  const selected = findings.find(f => f.id === finding);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ProLnk DFW · 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>🏚️ DFW Roofing Quick Check Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '12px', fontSize: '15px' }}>10-minute ground-level DFW roof assessment. Grab binoculars — never go on the roof yourself.</p>

        <div style={{ background: '#1e2d45', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>🔭 Ground-Level Assessment Checklist</p>
          {['Use binoculars to scan all roof planes from ground', 'Check gutters for accumulated granules (pour out = shingle wear)', 'View ridge line from street — straight is good, any dip is bad', 'Go inside attic with flashlight — look for daylight, stains, or mold', 'Check fascia and soffits for rot or paint peeling'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 800, flexShrink: 0 }}>{i + 1}.</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What did you find?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {findings.map(f => (
            <button key={f.id} onClick={() => setFinding(f.id)}
              style={{ background: finding === f.id ? '#1e2d45' : '#1e2d45', border: finding === f.id ? '2px solid #F5E642' : '2px solid transparent', borderRadius: '10px', padding: '14px', cursor: 'pointer', textAlign: 'left' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{f.label}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontWeight: 800, fontSize: '15px' }}>{selected.label}</span>
              <span style={{ background: urgencyColor[selected.urgency], color: '#fff', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>{selected.urgency}</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>{selected.detail}</p>
            <p style={{ color: '#F5E642', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>⏰ Act within: {selected.timeframe}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '14px', padding: '20px' }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>🏠 DFW Roofing Season is Year-Round</p>
          <p style={{ color: '#0A1628', fontSize: '14px', margin: '0 0 12px' }}>ProLnk verifies manufacturer certifications and enforces a no-storm-chaser policy. Every roofer in our network has a verified DFW-area address.</p>
          <a href="/" style={{ background: '#0A1628', color: '#F5E642', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Get Verified DFW Roofer →</a>
        </div>
      </div>
    </div>
  );
}