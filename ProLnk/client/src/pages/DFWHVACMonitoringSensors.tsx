import { useState } from 'react';

const sensors = [
  { goal: 'Temperature Control', sensor: 'Supply/Return Air Temperature Sensor', placement: 'Supply plenum + return air grille', integration: 'Nest, Ecobee, Honeywell T6 Pro', cost: '$45–$120' },
  { goal: 'Humidity Management', sensor: 'Duct & Room Humidity Sensor', placement: 'Main supply duct + living area wall', integration: 'Aprilaire, Honeywell HumidiPRO', cost: '$60–$150' },
  { goal: 'Condensate Safety', sensor: 'Condensate Float Switch', placement: 'Primary and secondary drain pan', integration: 'Wired to air handler shutoff', cost: '$15–$40' },
  { goal: 'CO Safety', sensor: 'Carbon Monoxide Detector', placement: 'Within 10 ft of furnace + each sleeping area', integration: 'Google Nest Protect, Ring', cost: '$30–$80' },
  { goal: 'Filter Monitoring', sensor: 'Differential Pressure Sensor', placement: 'Across filter cabinet', integration: 'Filterboss, AprilAire 5000', cost: '$80–$200' },
];

export default function DFWHVACMonitoringSensors() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = sensors.find(s => s.goal === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            DFW HVAC Monitoring Sensor Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Dallas-Fort Worth homes run HVAC 8–10 months a year. Smart sensors catch failures before they become $4,000 repairs.
          </p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>Select Your Monitoring Goal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {sensors.map(s => (
              <button
                key={s.goal}
                onClick={() => setSelected(s.goal === selected ? null : s.goal)}
                style={{
                  background: selected === s.goal ? '#F5E642' : '#1e3a5f',
                  color: selected === s.goal ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '0.75rem',
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s'
                }}
              >
                {s.goal}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 {match.goal}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: '🔧 Sensor', value: match.sensor },
                { label: '📍 Placement', value: match.placement },
                { label: '🏠 Smart Integration', value: match.integration },
                { label: '💰 Typical Cost', value: match.cost },
              ].map(item => (
                <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌞 DFW Climate Context</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌡️', title: 'Summer Peak', desc: '100°F+ days overwork compressors — temp sensors detect strain early' },
              { icon: '💧', title: 'Humidity Swings', desc: 'DFW humidity varies 30–90% — duct sensors prevent mold in supply lines' },
              { icon: '🧊', title: 'Ice Storms', desc: 'Rare freezes strain heat strips — CO detectors critical near gas furnaces' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
