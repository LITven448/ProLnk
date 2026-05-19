import { useState } from 'react';

const systems = [
  { id: 'hvac', label: 'HVAC', reactive: 'AC stops working mid-July. Emergency call: $450–$900. Compressor replacement: $1,800–$3,200.', predictive: 'Vibration sensor detects compressor bearing wear 3–6 weeks early. Scheduled repair: $280–$450. ProLnk auto-books a tech at your convenience.', sensors: ['Refrigerant pressure monitor', 'Compressor vibration sensor', 'Airflow delta-T measurement', 'Capacitor voltage tracking'], availability: 'Available Now' },
  { id: 'foundation', label: 'Foundation', reactive: 'Crack appears, door sticks. Engineer visit: $400. Piers: $800–$1,500 each. Average DFW repair: $8,000–$15,000.', predictive: 'Soil moisture sensors + tilt sensors track movement weekly. Alert fires before cracks form. Targeted waterproofing: $400–$900 stops the problem.', sensors: ['Soil moisture sensors at drip line', 'Crack monitors on stem wall', 'Pier settlement gauges', 'Elevation survey benchmarks'], availability: 'Coming to ProLnk' },
  { id: 'roof', label: 'Roof', reactive: 'Hail storm hits. You do not notice damage. Water intrusion begins. Mold + drywall: $4,000–$12,000 before you know it.', predictive: 'Post-storm AI scan compares satellite imagery to baseline. Damage flag sent same day. Insurance claim filed with data package. Avg. settlement 40% higher.', sensors: ['Hail impact sensor array', 'Attic humidity monitor', 'Thermal scan for wet insulation', 'Gutter overflow sensors'], availability: 'Coming to ProLnk' },
  { id: 'plumbing', label: 'Plumbing', reactive: 'Slab leak discovered after flooring buckles. Detection + reroute + flooring: $6,000–$18,000. 30-year-old DFW homes are high risk.', predictive: 'Acoustic leak detection sensors on supply lines. Flow anomaly alerts catch drips before they become floods. Average savings: $4,200 per event.', sensors: ['Whole-home flow meter', 'Pressure decay monitoring', 'Acoustic pipe listeners', 'Hot water recirculation anomaly'], availability: 'Available Now' },
];

export default function DFWPredictiveMaintenanceGuide() {
  const [selected, setSelected] = useState('hvac');
  const sys = systems.find(s => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🔬</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 8px' }}>Predictive Maintenance Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>How DFW homes are shifting from reactive repairs to technology-driven prevention — and what ProLnk is building next</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>📊 The Cost of Reactive vs. Predictive</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#3d0000', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36 }}>🚨</div>
              <div style={{ color: '#f87171', fontWeight: 800, fontSize: 18, margin: '8px 0′ }}>Reactive</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Fix it when it breaks. Emergency premiums. Collateral damage. Missed work. Stress.</div>
              <div style={{ color: '#f87171', fontWeight: 800, fontSize: 22, marginTop: 12 }}>Avg $6,400/event</div>
            </div>
            <div style={{ background: '#003d1a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36 }}>🎯</div>
              <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 18, margin: '8px 0′ }}>Predictive</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Sensors catch problems early. Scheduled fix. No emergency markup. No collateral damage.</div>
              <div style={{ color: '#22c55e', fontWeight: 800, fontSize: 22, marginTop: 12 }}>Avg $520/event</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>🏠 Home System → Predictive Tech</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select a home system to compare reactive vs. predictive costs and see what sensors are available now:</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {systems.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ flex: 1, padding: '10px 8px', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f', background: selected === s.id ? '#F5E642' : ’transparent', color: selected === s.id ? '#0A1628′ : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{s.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: '#1a0000', borderRadius: 12, padding: 16, border: '1px solid #3d0000′ }}>
              <div style={{ color: '#f87171', fontWeight: 700, marginBottom: 8 }}>🚨 Reactive Scenario</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{sys.reactive}</div>
            </div>
            <div style={{ background: '#001a0a', borderRadius: 12, padding: 16, border: '1px solid #003d1a' }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 8 }}>🎯 Predictive Outcome</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{sys.predictive}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>🔧 Sensors That Enable This</div>
              <div style={{ background: sys.availability === 'Available Now' ? '#003d1a' : '#1e3a5f', color: sys.availability === 'Available Now' ? '#22c55e' : '#F5E642', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{sys.availability}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {sys.sensors.map(sensor => <div key={sensor} style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 8, borderLeft: '2px solid #F5E642′ }}>{sensor}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>ProLnk Is Building Predictive Matching for DFW</h3>
          <p style={{ color: '#112240', fontSize: 15, marginBottom: 16 }}>When your sensors flag an issue, ProLnk auto-matches you with the right pro before it becomes an emergency — no calls, no searching.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Join the ProLnk Waitlist →</button>
        </div>
      </div>
    </div>
  );
}
