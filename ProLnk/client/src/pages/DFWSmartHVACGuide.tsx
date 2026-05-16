import { useState } from 'react';

const concerns = [
  {
    id: 'vacation',
    label: 'AC fails while away',
    icon: '✈️',
    feature: 'Remote Monitoring + Failure Alerts',
    detail: 'Smart HVAC systems send push notifications when the system fails to reach setpoint or shuts down on a fault code. In DFW summers, an undetected failure while on vacation means 130-degree attic temperatures and potential pipe damage within 24 hours.',
    systems: 'Carrier Infinity with Infinity Touch Control, Trane ComfortLink II, Lennox iComfort E30',
    cost: '$150-$400 for smart thermostat + WiFi module. Some high-end systems include it.',
  },
  {
    id: 'energy',
    label: 'High summer bills',
    icon: '💸',
    feature: 'ERCOT Demand Response + Smart Scheduling',
    detail: 'Texas runs on ERCOT. During grid emergency events (increasingly common in DFW summers), smart HVAC systems can automatically pre-cool your home before peak pricing hours, then reduce load during demand response windows. Some utilities offer $100-$300/yr rebates for enrolled smart systems.',
    systems: 'Ecobee SmartThermostat Premium (ERCOT-enrolled), Nest with Google Energy programs, Carrier EcoShield',
    cost: '$200-$350 thermostat. Annual utility rebates often cover the cost.',
  },
  {
    id: 'maintenance',
    label: 'Unexpected breakdowns',
    icon: '🔧',
    feature: 'Predictive Maintenance Alerts',
    detail: 'Smart systems monitor runtime hours, refrigerant pressure trends, static pressure, and airflow. When patterns deviate from baseline, the system alerts you — and your contractor — before a breakdown occurs. In DFW, catching a failing capacitor before July saves you an emergency call at 2x rates.',
    systems: 'Trane ComfortLink II with Nexia Home, Honeywell T10 Pro with contractor monitoring, Bryant Evolution Connex',
    cost: '$250-$600 for smart controller. Prevents one emergency service call ($400-$800 in DFW summer).',
  },
  {
    id: 'zones',
    label: 'Uneven temperatures',
    icon: '🌡️',
    feature: 'Smart Zoning + Room-Level Control',
    detail: 'WiFi-enabled zoning dampers adjust airflow room by room based on occupancy sensors and individual room thermostats. DFW two-story homes routinely see 8-12 degree differentials between floors — smart zoning eliminates this without separate systems.',
    systems: 'Ecobee with room sensors, Carrier Infinity Zoning, Honeywell TrueZONE with smart stat',
    cost: '$600-$2,500 for zoning hardware + smart thermostat depending on number of zones.',
  },
  {
    id: 'filter',
    label: 'Forgetting filter changes',
    icon: '🌬️',
    feature: 'Runtime-Based Filter Reminders',
    detail: 'Smart thermostats track actual runtime hours (not calendar days) and alert you when filters need changing. In DFW spring, with high pollen and construction dust, filters can clog in 30 days. Clogged filters drop airflow, raise static pressure, and freeze evaporator coils.',
    systems: 'Any smart thermostat with filter monitoring: Ecobee, Nest, Honeywell, Emerson Sensi',
    cost: '$150-$300 for a capable smart thermostat.',
  },
];

export default function DFWSmartHVACGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Smart HVAC Systems for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          WiFi-connected HVAC features that matter most for Dallas-Fort Worth homeowners — from ERCOT demand response to remote failure alerts during summer travel.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.9rem', letterSpacing: 1 }}>SMART HVAC IN DFW CONTEXT</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '🌡️', title: 'ERCOT Grid Events', desc: 'DFW has seen 5+ emergency demand response events since 2021. Smart HVAC pre-cools to reduce strain.' },
              { icon: '📱', title: 'Remote Visibility', desc: 'Know instantly if AC fails while you are at Cancun or Colorado — before the damage compounds.' },
              { icon: '💰', title: 'Utility Rebates', desc: 'Oncor, CoServ, and other DFW utilities offer $50-$300 rebates for smart thermostats and demand response enrollment.' },
              { icon: '🔮', title: 'Predictive Data', desc: 'Smart systems build baseline profiles so anomalies are detected 2-4 weeks before failure in many cases.' },
            ].map(f => (
              <div key={f.title} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{f.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>What is your biggest DFW HVAC concern?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
              style={{ background: selected === c.id ? '#F5E642' : '#0f2240', color: selected === c.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === c.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '1rem 0.75rem', cursor: 'pointer', textAlign: 'left', fontWeight: 700, fontSize: '0.85rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2240', border: '1px solid #1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>{active.icon} Smart Solution: {active.feature}</h2>
            <p style={{ lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.25rem' }}>{active.detail}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>COMPATIBLE SYSTEMS</div>
                <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{active.systems}</p>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>TYPICAL COST</div>
                <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{active.cost}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem' }}>🏠 Get Smart HVAC Installed in DFW</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>ProLnk connects DFW homeowners with HVAC contractors who install and configure smart systems correctly — including ERCOT demand response enrollment and remote monitoring setup.</p>
        </div>
      </div>
    </div>
  );
}