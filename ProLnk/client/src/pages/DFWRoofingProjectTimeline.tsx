import { useState } from 'react';

const cityPermitInfo: Record<string, string> = {
  dallas: 'Dallas: 5–10 business days. Apply online via Dallas ePlan. Roofing permit required for full replacements.',
  fortworth: 'Fort Worth: 5–7 business days. Permits required for re-roofs. Same-day OTC for small repairs.',
  plano: 'Plano: 7–10 business days. Strict inspection schedule — book inspection at permit issuance.',
  frisco: 'Frisco: 5–7 business days. High volume — some delays in spring. Online portal available.',
  mckinney: 'McKinney: 7–14 business days. Growing city with longer waits. Call development services directly.',
  arlington: 'Arlington: 5–10 business days. Permits required for full re-roofs over 25% of area.',
};

const projectTypes: Record<string, { label: string; timeline: string; milestones: string[] }> = {
  cash: {
    label: '💵 Cash / Out-of-Pocket',
    timeline: '2–4 weeks from inspection to completion',
    milestones: ['Contractor inspection (1–3 days)', 'Written estimate (2–5 days)', 'Permit pulled by contractor (3–10 days)', 'Materials delivery (1–3 days)', 'Roof installation (1–3 days)', 'City inspection (1–3 days)'],
  },
  claim: {
    label: '🏦 Insurance Claim Route',
    timeline: '4–10 weeks from storm to completion',
    milestones: ['Storm damage assessment by contractor (1–3 days)', 'Insurance claim filed (same day)', 'Insurance adjuster visit (5–14 days)', 'Claim approval & scope issued (3–7 days after adjuster)', 'Supplement negotiations if needed (1–4 weeks)', 'Permit pulled (3–10 days)', 'Materials delivery (1–3 days)', 'Installation (1–3 days)', 'Final inspection & ACV/RCV released (1–2 weeks)'],
  },
};

const dfwWeather = [
  'Best DFW roofing windows: March–May and Sept–November',
  'Avoid scheduling during DFW hail season (April–June)',
  'Summer heat (100°F+) affects asphalt shingle installation quality',
  'Winter installs possible but cold temps affect adhesive strips',
  'Most DFW roofing companies book 2–4 weeks out in spring',
];

export default function DFWRoofingProjectTimeline() {
  const [projectType, setProjectType] = useState('');
  const [city, setCity] = useState('');
  const selected = projectType ? projectTypes[projectType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>🏠 DFW Home Services</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 8 }}>DFW Roofing Project Timeline</h1>
        <p style={{ color: '#9BAEC8', marginBottom: 32, fontSize: 15 }}>Insurance claim vs cash timelines, DFW city permit info, and the best weather windows for roofing in North Texas.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🏗️ Project Type</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {Object.entries(projectTypes).map(([key, val]) => (
              <button key={key} onClick={() => setProjectType(key)} style={{ padding: '9px 18px', borderRadius: 8, border: `2px solid ${projectType === key ? '#F5E642' : '#1E3050'}`, background: projectType === key ? '#F5E642′ : ’transparent', color: projectType === key ? '#0A1628′ : '#9BAEC8', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>{val.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 14, borderLeft: '3px solid #F5E642′ }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>Expected Timeline: </span>
              <span style={{ color: '#E8EDF5′ }}>{selected.timeline}</span>
            </div>
          )}
        </div>

        {selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: 22, marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>📋 Key Milestones</h3>
            <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
              {selected.milestones.map((m, i) => <li key={i} style={{ marginBottom: 7 }}>{m}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F5E642', marginBottom: 14 }}>🏙️ DFW City Permit Times</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
            {Object.keys(cityPermitInfo).map((c) => (
              <button key={c} onClick={() => setCity(c)} style={{ padding: '6px 14px', borderRadius: 8, border: `2px solid ${city === c ? '#F5E642' : '#1E3050'}`, background: city === c ? '#F5E642′ : ’transparent', color: city === c ? '#0A1628′ : '#9BAEC8', fontWeight: 600, cursor: ’pointer', fontSize: 12, textTransform: 'capitalize' }}>{c === 'fortworth' ? 'Fort Worth' : c.charAt(0).toUpperCase() + c.slice(1)}</button>
            ))}
          </div>
          {city && <p style={{ color: '#E8EDF5', fontSize: 14, margin: 0 }}>{cityPermitInfo[city]}</p>}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 22 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 14 }}>🌤️ DFW Weather Windows</h2>
          <ul style={{ margin: 0, padding: '0 0 0 18px', color: '#9BAEC8', fontSize: 14 }}>
            {dfwWeather.map((w, i) => <li key={i} style={{ marginBottom: 8 }}>{w}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center', background: '#F5E642', borderRadius: 10, padding: '16px 24px' }}>
          <span style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🔗 Get matched with a vetted DFW roofing contractor — free on ProLnk</span>
        </div>
      </div>
    </div>
  );
}
