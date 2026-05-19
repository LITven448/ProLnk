import { useState } from 'react';

const types = [
  { id: 'urban', label: 'Urban/City Neighborhood', icon: '🏙️', steps: ['Register with Dallas Police Dept Citizen Crime Watch at dallaspolice.gov', 'Attend a free Dallas NPD (Neighborhood Police Division) orientation', 'Set up a private Nextdoor group and enable crime alert notifications', 'Install Ring cameras and join Ring Neighbors (free, no Ring required)', 'Use Dallas Open Data crime maps to identify hot spots on your block', 'Hold monthly 15-min virtual check-ins via Nextdoor or Zoom'] },
  { id: 'suburban', label: 'Suburban / HOA Community', icon: '🏡', steps: ['Partner with your HOA board to formalize the watch program', 'Register with Fort Worth PD Community Relations at fwpd.org', 'Install neighborhood entry camera and post Neighborhood Watch signs', 'Create a shared Google Sheet for suspicious activity logs', 'Link to Nextdoor and add all neighbors — share invite cards door-to-door', 'Coordinate with HOA on exterior lighting for common areas'] },
  { id: 'rural', label: 'Rural / Semi-Rural Area', icon: '🌾', steps: ['Contact Tarrant or Collin County Sheriff Community Programs office', 'Form a radio/phone tree for remote properties without cell coverage', 'Install solar-powered game cameras at property entry points', 'Register with Texas Crime Stoppers (1-800-252-TIPS) for anonymous tips', 'Use SpotCrime.com for weekly rural area crime summaries', 'Coordinate with county road commissioner on lighting at key intersections'] },
];

const tools = [
  { icon: '📱', name: 'Nextdoor', desc: 'Real-time neighborhood crime alerts and verified neighbor network — 2.1M DFW users' },
  { icon: '🔔', name: 'Ring Neighbors', desc: 'Share doorbell cam footage with neighbors — free app, no Ring device required' },
  { icon: '🗺️', name: 'SpotCrime', desc: 'Weekly crime maps for any DFW zip code — email alerts available' },
];

export default function DFWNeighborhoodWatchGuide2026() {
  const [selected, setSelected] = useState('urban');
  const active = types.find(t => t.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>👁️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Neighborhood Watch Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            How to start or strengthen a neighborhood watch in the Dallas-Fort Worth metro — with tools, police programs, and tech integrations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 36 }}>
          {tools.map(t => (
            <div key={t.name} style={{ background: '#111e35', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 6 }}>{t.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>Select Your Neighborhood Type</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
          {types.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)}
              style={{ background: selected === t.id ? '#F5E642' : '#111e35', color: selected === t.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 14, padding: 28, border: '1px solid #1e3a5f', marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 20px' }}>{active.icon} Watch Program Setup: {active.label}</h3>
          {active.steps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{idx + 1}</span>
              <span style={{ color: '#cbd5e1', fontSize: 15 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>🔧 Vacant homes and deferred maintenance are top targets for crime. ProLnk keeps homes well-maintained with verified DFW pros — reducing neighborhood vulnerability.</p>
        </div>
      </div>
    </div>
  );
}
