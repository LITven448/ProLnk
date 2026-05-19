import { useState } from 'react';

const concerns = [
  { id: 'entry', label: '🚪 Front Door / Entry Glass', guide: 'Sidelights and door glass panels are high-priority targets for DFW burglars. Install acoustic glass break detectors on adjacent walls (within 15 feet). Combined acoustic+shock sensors work best here — a burglar may strike glass once to test before breaking it fully.' },
  { id: 'bedroom', label: '🛏️ Bedroom Windows', guide: 'Bedrooms on the ground floor or garage-adjacent are vulnerable in DFW. Use acoustic sensors covering each bedroom zone. Pair with window contact sensors for redundancy — glass break sensors detect the break; contacts detect the opening.' },
  { id: 'garage', label: '🚗 Garage Door Windows', guide: 'Garage door windows and the door between garage and house are common DFW entry points. A shock sensor on the garage door itself detects impact attempts. Glass break sensors in the garage interior catch window entry before the burglar reaches the interior door.' },
  { id: 'sliding', label: '🪟 Sliding Glass Doors', guide: 'DFW sliding glass doors are vulnerable to both glass breaking and door lifting off tracks. Combine a glass break sensor with a door bar and a floor-mounted contact sensor. Shock sensors on the frame detect pry attempts before glass breaks.' },
  { id: 'wholehome', label: '🏠 Whole-Home Coverage', guide: 'A single acoustic glass break detector can cover 1,500-2,000 sq ft if centrally located. For larger DFW homes, use 2-3 sensors in an overlapping pattern. Place sensors on interior walls or ceilings — not on glass — for best acoustic pickup.' },
];

export default function DFWGlassbreakSensorGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔔</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700, margin: 0 }}>DFW Glass Break Sensor Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Acoustic detection, shock sensors, and smart integration for DFW homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '🔊', title: 'Acoustic Sensors', body: 'Listen for the specific sound frequency of shattering glass (typically 5-6 kHz). One sensor covers a large area — typically 1,500 sq ft. They must be unobstructed and work best when glass is within 20-25 feet. False alarm rate: moderate (thunderstorms, dropped dishes).' },
            { icon: '📳', title: 'Shock Sensors', body: 'Mounted directly on glass or window frame, shock sensors detect the physical vibration of impact. More precise than acoustic sensors, less prone to false alarms from ambient sound. Cover only one glass surface per sensor — more sensors needed for whole-home coverage.' },
            { icon: '🔗', title: 'Combined Sensors', body: 'Dual-technology sensors use both acoustic and shock detection with AND logic — both must trigger for an alarm. This dramatically reduces false alarms while maintaining sensitivity. Recommended for DFW homes in areas with heavy traffic or frequent storms.' },
            { icon: '🏠', title: 'DFW Burglar Patterns', body: 'DFW burglaries peak in summer when residents are away. Local law enforcement data shows glass break entry accounts for about 25% of DFW residential break-ins, with front and garage-adjacent doors and ground floor windows being primary targets.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.2rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>⚙️ Integration with Alarm Systems</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
            {[
              { label: '📡 Wired Integration', desc: 'Hardwired glass break sensors connect to alarm panel zones. Most reliable, no battery concerns, seamless professional monitoring integration.' },
              { label: '📶 Wireless / Z-Wave', desc: 'Battery-powered wireless sensors pair with Ring, ADT, Brinks, or SimpliSafe systems. Easy to add to existing systems without rewiring.' },
              { label: '📱 Smart Home', desc: 'Wi-Fi glass break sensors from Google Nest, Arlo, or Wyze integrate with smart home ecosystems for app alerts, automations, and video response.' },
            ].map(i => (
              <div key={i.label} style={{ background: '#0A1628', borderRadius: 6, padding: '0.8rem', border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{i.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{i.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>🔍 Security Concern Finder</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Select your concern:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{ background: selected === c.id ? '#F5E642' : '#1e3a5f', color: selected === c.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
                {c.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 6, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.4rem' }}>{active.label}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.6, fontSize: '0.9rem' }}>{active.guide}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>
          ProLnk · DFW Home Intelligence · 2026
        </div>
      </div>
    </div>
  );
}