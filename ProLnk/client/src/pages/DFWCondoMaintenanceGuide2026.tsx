import { useState } from 'react';

const hoaTypes = [
  {
    id: 'allincl',
    label: 'All-Inclusive HOA',
    owns: ['HVAC system (fan coil + chiller)', 'Plumbing lines throughout unit', 'Electrical wiring to panel', 'Windows and exterior doors'],
    yours: ['Interior fixtures and finishes', 'Appliances', 'Flooring, paint, cabinets'],
  },
  {
    id: 'standard',
    label: 'Standard HOA',
    owns: ['Exterior walls and roof', 'Common area HVAC', 'Shared plumbing stacks', 'Lobby and hallways'],
    yours: ['Fan coil unit / HVAC inside unit', 'Water heater', 'Plumbing from stub-in', 'Electrical panel', 'Windows (varies)', 'All interior finishes'],
  },
  {
    id: 'bare',
    label: 'Bare-Walls HOA',
    owns: ['Exterior shell only', 'Common areas'],
    yours: ['Everything inside the drywall', 'HVAC, plumbing, electrical', 'Water heater', 'Windows, doors', 'Flooring, paint, cabinets, appliances'],
  },
];

export default function DFWCondoMaintenanceGuide2026() {
  const [selected, setSelected] = useState('standard');
  const active = hoaTypes.find((h) => h.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>🔧 ProLnk Guide · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Condo Maintenance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>What your HOA maintains vs. what falls on you as the condo owner.</p>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: '#F5E642', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>🏢 Select Your HOA Type</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {hoaTypes.map((h) => (
              <button key={h.id} onClick={() => setSelected(h.id)}
                style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  background: selected === h.id ? '#F5E642′ : '#1e2e4a', color: selected === h.id ? '#0A1628' : '#94a3b8' }}>
                {h.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🏗️ HOA Maintains</div>
              {active.owns.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 6, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: '#22c55e' }}>●</span><span style={{ color: '#cbd5e1′ }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>👤 Owner Maintains</div>
              {active.yours.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 6, marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: '#f59e0b' }}>●</span><span style={{ color: '#cbd5e1′ }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🌡️ DFW-Specific Watch Items</div>
          {[
            { icon: '❄️', title: 'Fan Coil HVAC Unit', note: 'Most DFW high-rises use fan coil units tied to a central chiller — owner maintains the in-unit coil, filters, and drain pan.' },
            { icon: '🚿', title: 'Hot Water Heater', note: 'Unless building has central hot water, the in-unit heater is owner responsibility. Tankless is common in newer builds.' },
            { icon: '🔌', title: 'Electrical Panel', note: 'The breaker panel inside your unit is owner responsibility; everything upstream belongs to the building.' },
          ].map((row) => (
            <div key={row.title} style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{row.title}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>Find DFW Condo Service Pros</div>
          <div style={{ fontSize: 13, color: '#1e2e4a' }}>ProLnk connects condo owners with vetted HVAC, plumbing, and electrical contractors experienced with high-rise units.</div>
        </div>
      </div>
    </div>
  );
}
