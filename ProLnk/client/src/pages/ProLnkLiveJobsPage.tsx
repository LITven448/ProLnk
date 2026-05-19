import { useState } from 'react';

const feedInfo = [
  { icon: '🔴', label: 'Live Request Alert', desc: 'New homeowner requests appear in real-time, sorted by distance from your service center.' },
  { icon: '🔍', label: 'Trade Filter', desc: 'See only jobs that match your license and specialization. No noise, no off-trade requests.' },
  { icon: '📍', label: 'Location Filter', desc: 'Set your service radius (5–50 miles) and only jobs inside that zone appear in your feed.' },
  { icon: '🔒', label: 'Private Info Protected', desc: 'Full address is hidden until you accept the match. You see neighborhood, scope, and urgency only.' },
  { icon: '📋', label: 'Job Details Shown', desc: 'Trade type, job description, urgency level, property type, and estimated scope visible pre-match.' },
  { icon: '⏱', label: 'Response Window', desc: 'You have 15 minutes to accept or decline. Fast responders rank higher in future matches.' },
];

const sampleJobs = {
  plumbing_north: [
    { id: 'J-4821', type: 'Burst pipe repair', area: 'Frisco, TX', urgency: '🔴 Emergency', scope: 'Immediate fix required', posted: '4 min ago' },
    { id: 'J-4819', type: 'Water heater replacement', area: 'Allen, TX', urgency: '🟡 This week', scope: 'Standard 40-gal unit', posted: '22 min ago' },
    { id: 'J-4815', type: 'Sewer line inspection', area: 'McKinney, TX', urgency: '🟢 Flexible', scope: 'Pre-purchase inspection', posted: '1 hr ago' },
  ],
  hvac_south: [
    { id: 'J-4830', type: 'AC not cooling', area: 'Cedar Hill, TX', urgency: '🔴 Emergency', scope: 'System not blowing cold', posted: '2 min ago' },
    { id: 'J-4827', type: 'Annual HVAC tune-up', area: 'DeSoto, TX', urgency: '🟢 Flexible', scope: 'Full system inspection', posted: '45 min ago' },
    { id: 'J-4824', type: 'Ductwork repair', area: 'Duncanville, TX', urgency: '🟡 This week', scope: 'Leaking ductwork attic', posted: '2 hrs ago' },
  ],
  electrical_east: [
    { id: 'J-4835', type: 'Panel upgrade', area: 'Garland, TX', urgency: '🟡 This week', scope: '100A to 200A upgrade', posted: '18 min ago' },
    { id: 'J-4833', type: 'EV charger install', area: 'Rowlett, TX', urgency: '🟢 Flexible', scope: 'Level 2 garage install', posted: '1 hr ago' },
    { id: 'J-4831', type: 'Outlet not working', area: 'Mesquite, TX', urgency: '🟡 Today', scope: 'Kitchen GFCI issue', posted: '3 hrs ago' },
  ],
};

const tradeOptions = [
  { key: 'plumbing_north', label: 'Plumbing — North DFW' },
  { key: 'hvac_south', label: 'HVAC — South DFW' },
  { key: 'electrical_east', label: 'Electrical — East DFW' },
];

export default function ProLnkLiveJobsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📡</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Live Jobs Feed</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            Real-time DFW service requests, filtered to your trade and territory. No searching — jobs come to you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginBottom: 52 }}>
          {feedInfo.map((item, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 6 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>Sample Feed Preview</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Choose your trade and area to see what jobs look like in your feed.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {tradeOptions.map((t) => (
              <button key={t.key} onClick={() => setSelected(t.key)} style={{
                padding: '10px 18px', borderRadius: 8, border: selected === t.key ? '2px solid #F5E642′ : '1px solid #1e3a5f',
                background: selected === t.key ? '#F5E642′ : '#0A1628', color: selected === t.key ? '#0A1628' : '#fff',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{t.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(sampleJobs as any)[selected].map((job: any) => (
                <div key={job.id} style={{ background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{job.type}</div>
                    <div style={{ fontSize: 13, color: '#94a3b8′ }}>📍 {job.area} &nbsp;·&nbsp; {job.scope}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, marginBottom: 4 }}>{job.urgency}</div>
                    <div style={{ fontSize: 11, color: '#475569′ }}>{job.posted}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
