import { useState } from 'react';

type Device = {
  name: string;
  category: string;
  todayStatus: string;
  plannedStatus: string;
  plannedYear: string;
  dataType: string;
  emoji: string;
};

const devices: Device[] = [
  { name: 'Nest / Ecobee Thermostat', category: 'Climate', todayStatus: 'Manual Input', plannedStatus: 'Full Integration', plannedYear: '2026', dataType: 'HVAC runtime, temperature logs, humidity', emoji: '🌡️' },
  { name: 'Smart Leak Detectors', category: 'Water', todayStatus: 'Manual Input', plannedStatus: 'Real-time Alerts', plannedYear: '2026', dataType: 'Leak detection events, moisture levels', emoji: '💧' },
  { name: 'Ring / Nest Cameras', category: 'Security', todayStatus: 'Photo Scan Supplement', plannedStatus: 'AI Visual Analysis', plannedYear: '2027', dataType: 'Exterior condition monitoring', emoji: '📷' },
  { name: 'Amazon Alexa', category: 'Voice', todayStatus: 'Not Available', plannedStatus: 'Voice Commands', plannedYear: '2026', dataType: 'Home health score queries, maintenance reminders', emoji: '🔊' },
  { name: 'Google Home', category: 'Voice', todayStatus: 'Not Available', plannedStatus: 'Routine Integration', plannedYear: '2026', dataType: 'Seasonal maintenance reminders, alerts', emoji: '🏠' },
  { name: 'Apple HomeKit', category: 'Platform', todayStatus: 'Not Available', plannedStatus: 'Full Integration', plannedYear: '2027', dataType: 'Cross-device home health data', emoji: '🍎' },
  { name: 'SmartThings', category: 'Platform', todayStatus: 'Not Available', plannedStatus: 'Sensor Integration', plannedYear: '2027', dataType: 'Multi-sensor data feeds', emoji: '⚡' },
  { name: 'Smart Irrigation (Rachio)', category: 'Landscape', todayStatus: 'Manual Input', plannedStatus: 'Foundation Correlation', plannedYear: '2026', dataType: 'Watering schedule, soil moisture', emoji: '💦' },
  { name: 'CO / Smoke Detectors', category: 'Safety', todayStatus: 'Manual Input', plannedStatus: 'Health Score Factor', plannedYear: '2026', dataType: 'Alert history, battery status, age', emoji: '🚨' },
  { name: 'Smart Garage Door', category: 'Security', todayStatus: 'Not Available', plannedStatus: 'Status Monitoring', plannedYear: '2027', dataType: 'Open/close patterns, maintenance alerts', emoji: '🚪' },
];

const categories = ['All', ...Array.from(new Set(devices.map(d => d.category)))];

export default function SmartHomeIntegrationGuide() {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showResults, setShowResults] = useState(false);

  const toggleDevice = (name: string) => {
    setSelectedDevices(prev => prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]);
    setShowResults(false);
  };

  const filteredDevices = filterCategory === 'All' ? devices : devices.filter(d => d.category === filterCategory);
  const selectedDeviceData = devices.filter(d => selectedDevices.includes(d.name));
  const available2026 = selectedDeviceData.filter(d => d.plannedYear === '2026′ && d.todayStatus !== ’Not Available');
  const comingSoon = selectedDeviceData.filter(d => d.todayStatus === 'Not Available' || d.plannedYear === '2027');

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d1f2d 0%, #1a0d2e 100%)', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 46px)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.2 }}>
          TrustyPro + Smart Home
        </h1>
        <p style={{ fontSize: '20px', color: '#818cf8', fontWeight: 600, marginBottom: '12px' }}>
          The Future of Proactive Home Care
        </p>
        <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '620px', margin: '0 auto' }}>
          Your smart home devices already know things about your home's health — HVAC runtimes, leak events, humidity levels. TrustyPro is building the layer that turns that raw data into maintenance intelligence.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>

        {/* How It Works */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '32px' }}>⚙️ How TrustyPro Uses Smart Home Data</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { emoji: '🌡️', title: 'HVAC Runtime Analysis', desc: 'When your thermostat logs 18+ hours of runtime on a mild day, TrustyPro’s AI flags it as a potential refrigerant or filter issue — before your system fails.', status: '2026 Beta', color: '#818cf8′ },
              { emoji: '💧', title: 'Leak Sensor Correlation', desc: 'Smart leak detectors feed real-time data. A detection event triggers an immediate alert + automatic contractor connection from your ProLnk network.', status: '2026 Beta', color: '#818cf8′ },
              { emoji: '💦', title: 'Foundation Watering', desc: 'DFW foundations expand/contract with moisture. Smart irrigation schedule data helps TrustyPro calculate your foundation’s moisture consistency — critical for DFW clay soil.', status: '2026 Beta', color: '#818cf8′ },
              { emoji: '🏠', title: 'Predictive Maintenance', desc: 'IoT data + AI = maintenance predictions before failures happen. Know your water heater is approaching end-of-life before the flood, not after.', status: '2027 Roadmap', color: '#f59e0b' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.emoji}</div>
                <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: item.color, background: `${item.color}20`, padding: '2px 8px', borderRadius: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {item.status}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap Timeline */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '32px' }}>🗓️ Integration Roadmap</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0′ }}>
            {[
              { year: 'Today', label: 'AI Photo Scans', desc: 'Manual exterior and interior photo uploads analyzed by TrustyPro AI. Identifies visible condition issues, aging systems, deferred maintenance.', color: '#22c55e', items: ['Photo-based AI condition scoring', 'Manual home data input', 'Home health vault data storage'] },
              { year: '2026', label: 'Smart Sensor Beta', desc: 'First wave of IoT integrations. Smart thermostat, leak detectors, and smart irrigation connect to TrustyPro dashboard.', color: '#818cf8', items: ['Nest/Ecobee thermostat integration', 'Leak detector real-time alerts', 'Alexa + Google Home voice commands', 'Smart irrigation foundation correlation'] },
              { year: '2027', label: 'Predictive Intelligence', desc: 'Full IoT data layer enables predictive maintenance. AI learns your home’s patterns and flags anomalies before they become failures.', color: '#f59e0b', items: ['Predictive maintenance from HVAC data', 'Apple HomeKit + SmartThings full integration', 'Automated contractor dispatch on sensor events', 'Insurance integration for premium reduction'] },
            ].map((phase, i) => (
              <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '80px' }}>
                  <div style={{ background: phase.color, color: '#000000', fontWeight: 700, fontSize: '13px', padding: '6px 12px', borderRadius: '999px', whiteSpace: 'nowrap' }}>{phase.year}</div>
                  {i < 2 && <div style={{ width: '2px', flex: 1, background: '#1f2937', margin: '8px 0′ }} />}
                </div>
                <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px', flex: 1, marginBottom: i < 2 ? '0′ : '0' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>{phase.label}</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px', lineHeight: 1.5 }}>{phase.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {phase.items.map((item, j) => (
                      <span key={j} style={{ fontSize: '12px', color: phase.color, background: `${phase.color}15`, padding: '4px 10px', borderRadius: '999px' }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Device Compatibility Checker */}
        <section style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>🔌 Smart Home Compatibility Checker</h2>
          <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Select the smart home devices you have to see current and planned TrustyPro integration status.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                style={{
                  padding: '8px 16px', borderRadius: '999px', border: '1px solid',
                  borderColor: filterCategory === cat ? '#818cf8′ : '#374151',
                  background: filterCategory === cat ? '#312e81′ : '#111827',
                  color: filterCategory === cat ? '#c7d2fe' : '#9ca3af',
                  cursor: 'pointer', fontSize: '13px', fontWeight: filterCategory === cat ? 700 : 400,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {filteredDevices.map((device, i) => {
              const isSelected = selectedDevices.includes(device.name);
              return (
                <div
                  key={i}
                  onClick={() => toggleDevice(device.name)}
                  style={{
                    background: isSelected ? '#1e1b4b' : '#111827',
                    border: `2px solid ${isSelected ? '#818cf8' : '#1f2937'}`,
                    borderRadius: '10px', padding: '16px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '24px' }}>{device.emoji}</div>
                    {isSelected && <span style={{ fontSize: '16px' }}>✅</span>}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginTop: '8px', marginBottom: '4px' }}>{device.name}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '4px' }}>{device.category}</div>
                  <div style={{ fontSize: '11px', color: device.todayStatus === 'Not Available' ? '#ef4444′ : '#22c55e' }}>
                    Today: {device.todayStatus}
                  </div>
                </div>
              );
            })}
          </div>

          {selectedDevices.length > 0 && (
            <div>
              <button
                onClick={() => setShowResults(true)}
                style={{ background: '#818cf8', color: '#ffffff', padding: '12px 28px', borderRadius: '8px', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginBottom: '20px' }}
              >
                See My Integration Status ({selectedDevices.length} device{selectedDevices.length !== 1 ? 's' : ''}) →
              </button>

              {showResults && (
                <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '28px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>Your TrustyPro Smart Home Status</h3>
                  {available2026.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '8px', textTransform: 'uppercase' }}>✅ Available or Coming in 2026</div>
                      {available2026.map((d, i) => (
                        <div key={i} style={{ background: '#052e16', borderRadius: '6px', padding: '10px 14px', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600, color: '#ffffff' }}>{d.emoji} {d.name}</span>
                          <span style={{ color: '#9ca3af', fontSize: '13px' }}> — {d.dataType}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {comingSoon.length > 0 && (
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', marginBottom: '8px', textTransform: 'uppercase' }}>⏳ On the Roadmap</div>
                      {comingSoon.map((d, i) => (
                        <div key={i} style={{ background: '#1c1400', borderRadius: '6px', padding: '10px 14px', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600, color: '#ffffff' }}>{d.emoji} {d.name}</span>
                          <span style={{ color: '#9ca3af', fontSize: '13px' }}> — Planned {d.plannedYear}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #0d1f2d 100%)', border: '1px solid #3730a3', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🤖</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>Join the TrustyPro Waitlist — Smart Home Beta Included</h3>
          <p style={{ fontSize: '15px', color: '#a5b4fc', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Waitlist members get priority access to the 2026 smart home beta integrations. Connect your home and let TrustyPro's AI start working while you’re on the list.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#818cf8', color: '#ffffff', padding: '14px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
          >
            Join TrustyPro Waitlist →
          </a>
        </section>

      </div>
    </div>
  );
}
