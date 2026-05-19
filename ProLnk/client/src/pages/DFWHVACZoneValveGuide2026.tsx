import { useState } from 'react';

const zones = [
  { id: 'residential-forced-air', label: 'Residential Forced Air System', applicable: false, note: 'DFW residential uses dampers, not zone valves — forced air is standard' },
  { id: 'residential-hydronic', label: 'Residential Hydronic/Radiant', applicable: true, note: 'Zone valves control hot water flow to each radiant zone — premium DFW homes' },
  { id: 'commercial-hydronic', label: 'Commercial Hydronic System', applicable: true, note: 'Zone valves essential — controls heating/cooling to building sections' },
  { id: 'luxury-home', label: 'DFW Luxury Home (Radiant Floor)', applicable: true, note: 'Zone valves with radiant floor heating — rare but growing in DFW luxury market' },
];

export default function DFWHVACZoneValveGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const result = zones.find(z => z.id === selected);

  const facts = [
    { icon: '🌡️', title: 'DFW Reality', body: 'Over 95% of DFW residential uses forced air (gas furnace + AC). Zone valves are uncommon in homes.' },
    { icon: '🏗️', title: 'Valve vs Damper', body: 'Dampers control airflow in ducts. Zone valves control liquid flow in hydronic pipes — completely different systems.' },
    { icon: '💧', title: 'How Zone Valves Work', body: 'Motorized valves open/close to allow or block hot/chilled water to a zone — controlled by thermostat signal.' },
    { icon: '🏡', title: 'DFW Luxury Homes', body: 'Some high-end DFW homes (Southlake, Highland Park) use hydronic radiant floors with zone valves for comfort.' },
    { icon: '🏢', title: 'Commercial DFW', body: 'DFW commercial buildings commonly use 2-pipe or 4-pipe fan coil systems with zone valves at each unit.' },
    { icon: '🔧', title: 'Maintenance', body: 'Zone valves last 10-15 years. Signs of failure: stuck open/closed, actuator hum without movement, zone temp imbalance.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 4, display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW HVAC 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Zone Valve Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Zone valves in DFW HVAC: when they apply, how they differ from dampers, and why hydronic systems remain rare in DFW residential.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 DFW System Type → Zone Valve Applicability</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {zones.map(z => (
              <button key={z.id} onClick={() => setSelected(z.id)}
                style={{ background: selected === z.id ? '#F5E642' : '#0A1628', color: selected === z.id ? '#0A1628' : '#fff', border: '1px solid #2d3f5a', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>
                {z.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 16, background: result.applicable ? '#0d2e1a' : '#2e1a0d', border: `1px solid ${result.applicable ? '#22c55e' : '#f59e0b'}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: result.applicable ? '#22c55e' : '#f59e0b', marginBottom: 6 }}>
                {result.applicable ? '✅ Zone Valves Apply' : '⚠️ Zone Valves Not Typical'}
              </div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, fontSize: 13, color: '#94a3b8' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Tip:</strong> Fewer than 2% of DFW homes have hydronic systems. If a homeowner mentions zone valves, confirm they have radiant/hydronic heat — not a standard forced-air system with damper zoning.
        </div>
      </div>
    </div>
  );
}