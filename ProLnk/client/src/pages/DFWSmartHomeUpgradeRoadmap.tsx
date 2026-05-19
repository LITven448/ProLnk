import { useState } from 'react';

const YEARS = [
  {
    year: 'Year 1',
    label: 'Highest ROI Upgrades',
    color: '#F5E642',
    items: [
      { name: 'Smart Thermostat', icon: '🌡️', roi: 'Save $180/yr', detail: 'Critical for DFW — pre-cool before 3–7pm peak pricing' },
      { name: 'Smart Lock', icon: '🔐', roi: 'Save $0 + peace of mind', detail: 'Keypad entry, auto-lock, remote access for service pros' },
      { name: 'Video Doorbell', icon: '📹', roi: 'Deter porch pirates', detail: 'DFW package theft is up 40% — motion alerts save headaches' },
    ],
  },
  {
    year: 'Year 2',
    label: 'Comfort & Protection',
    color: '#60A5FA',
    items: [
      { name: 'Smart Lighting', icon: '💡', roi: 'Save $90/yr', detail: 'Automated schedules reduce waste in large DFW homes' },
      { name: 'Leak Detection', icon: '💧', roi: 'Avoid $15K+ water damage', detail: 'DFW slab foundations mean leaks are catastrophic' },
      { name: 'Smart Garage Door', icon: '🚗', roi: 'Convenience + security', detail: 'Open/close remotely when you forget — very DFW-common' },
    ],
  },
  {
    year: 'Year 3',
    label: 'Full Automation',
    color: '#34D399',
    items: [
      { name: 'Home Automation Hub', icon: '🏠', roi: 'Unified control', detail: 'Connect all devices into scenes and routines' },
      { name: 'Security Cameras', icon: '📷', roi: 'Protect property', detail: 'Outdoor cameras for large DFW lots and long driveways' },
      { name: 'Smart Electrical Panel', icon: '⚡', roi: 'EV + solar ready', detail: 'DFW solar adoption rising — smart panel future-proofs home' },
    ],
  },
];

const DEVICE_OPTIONS = ['Smart Thermostat', 'Smart Lock', 'Video Doorbell', 'Smart Lighting', 'Leak Sensors', 'Smart Garage'];
const BUDGETS = ['Under $500', '$500–$1,500', '$1,500–$5,000', '$5,000+'];

export default function DFWSmartHomeUpgradeRoadmap() {
  const [owned, setOwned] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);

  const toggle = (d: string) =>
    setOwned(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const startYear = owned.length >= 4 ? 2 : owned.length >= 2 ? 1 : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW Smart Home Upgrade Roadmap</h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>Your personalized 3-year plan for the Dallas-Fort Worth market</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>What smart devices do you already have?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {DEVICE_OPTIONS.map(d => (
              <button key={d} onClick={() => toggle(d)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: owned.includes(d) ? '#F5E642′ : '#1E3A5F',
                background: owned.includes(d) ? '#F5E642′ : ’transparent',
                color: owned.includes(d) ? '#0A1628′ : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{d}</button>
            ))}
          </div>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>Budget for smart home upgrades?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {BUDGETS.map(b => (
              <button key={b} onClick={() => setBudget(b)} style={{
                padding: '0.4rem 0.9rem', borderRadius: 20, border: '2px solid',
                borderColor: budget === b ? '#F5E642′ : '#1E3A5F',
                background: budget === b ? '#F5E642′ : ’transparent',
                color: budget === b ? '#0A1628′ : '#94A3B8',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
              }}>{b}</button>
            ))}
          </div>
          <button onClick={() => setShowRoadmap(true)} disabled={!budget} style={{
            background: budget ? '#F5E642′ : '#1E3A5F', color: '#0A1628', border: ’none',
            borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: budget ? 'pointer' : 'not-allowed',
          }}>Generate My DFW Roadmap →</button>
        </div>

        {showRoadmap && YEARS.slice(startYear).map((yr, i) => (
          <div key={yr.year} style={{ background: '#0F2240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem', borderLeft: `4px solid ${yr.color}` }}>
            <h3 style={{ color: yr.color, marginTop: 0 }}>{yr.year}: {yr.label}</h3>
            {yr.items.map(item => (
              <div key={item.name} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{item.name} <span style={{ color: yr.color, fontSize: '0.8rem' }}>{item.roi}</span></div>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: '#0F2240', borderRadius: 12 }}>
          <p style={{ color: '#94A3B8', margin: '0 0 0.75rem' }}>Need a pro to install your smart home upgrades?</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            🔧 Find a DFW Smart Home Pro
          </button>
        </div>
      </div>
    </div>
  );
}
