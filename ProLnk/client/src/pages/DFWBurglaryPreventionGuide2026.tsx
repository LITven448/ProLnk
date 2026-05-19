import { useState } from 'react';

const neighborhoods = [
  { type: 'Urban Dallas', crime: 'High', rate: 42.3 },
  { type: 'Suburban DFW', crime: 'Medium', rate: 18.7 },
  { type: 'Collin County', crime: 'Low', rate: 8.2 },
  { type: 'Fort Worth Inner', crime: 'High', rate: 38.1 },
  { type: 'Tarrant Suburbs', crime: 'Medium', rate: 15.4 },
];

const checklists: Record<string, string[]> = {
  High: ['🔒 Grade 1 deadbolt on every exterior door', '💡 Motion-activated lights front + back', '📹 4+ camera coverage', '🚪 Steel door with steel frame', '🏘️ Join neighborhood watch immediately', '🔔 Monitored alarm system'],
  Medium: ['🔒 Reinforce strike plates ($30 fix)', '💡 Front door motion light', '📹 Doorbell camera + backyard cam', '🚪 Door sensor alarms', '📱 Smart lock for contractor access'],
  Low: ['🔒 Quality deadbolt + strike plate', '💡 Porch light on timer', '📹 Doorbell camera', '🤝 Know your neighbors', '📦 Package lockbox'],
};

export default function DFWBurglaryPreventionGuide2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠🔐</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Burglary Prevention Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Property crime data + practical security upgrades for DFW homeowners</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📊 DFW Property Crime Rates (per 1,000 residents)</h2>
          {neighborhoods.map(n => (
            <div key={n.type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ fontSize: 14 }}>{n.type}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 100, backgroundColor: '#1e3a5f', borderRadius: 4, height: 8 }}>
                  <div style={{ width: `${(n.rate / 45) * 100}%`, backgroundColor: n.crime === 'High' ? '#ef4444′ : n.crime === ’Medium' ? '#f59e0b' : '#22c55e', height: 8, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 13, color: '#94a3b8', width: 32 }}>{n.rate}</span>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, backgroundColor: n.crime === 'High' ? '#7f1d1d' : n.crime === 'Medium' ? '#78350f' : '#14532d' }}>{n.crime}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⏰ Peak Burglary Times in DFW</h2>
          {['10am–3pm weekdays (when most are at work)', '6pm–10pm (dinner hours, dark in winter)', 'Dec–Jan holiday season (package theft spike)', 'Summer vacation weeks (home empty longer)'].map(t => (
            <div key={t} style={{ padding: '6px 0', fontSize: 14, color: '#94a3b8', display: 'flex', gap: 8 }}>⚠️ {t}</div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 4 }}>🔩 Strike Plate Upgrade — $30, Huge ROI</h2>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Standard strike plates use 3/4" screws into door frame. A 3″ screw upgrade into the stud prevents 60% of kick-in attempts. Most burglaries happen in under 60 seconds — make your door the hard target.</p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🗺️ Your Neighborhood → Security Checklist</h2>
          <select value={selected} onChange={e => setSelected(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
            <option value="">Select your neighborhood type…</option>
            {Object.keys(checklists).map(k => <option key={k} value={k}>{k} Crime Area</option>)}
          </select>
          {selected && checklists[selected].map(item => (
            <div key={item} style={{ padding: '8px 12px', backgroundColor: '#0A1628', borderRadius: 8, marginBottom: 6, fontSize: 14 }}>{item}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: 16, backgroundColor: '#112240', borderRadius: 12 }}>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>🔗 ProLnk connects you with vetted DFW security professionals — no guessing, no cold calls.</p>
        </div>
      </div>
    </div>
  );
}
