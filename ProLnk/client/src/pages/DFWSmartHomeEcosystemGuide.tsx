import { useState } from 'react';

const ECOSYSTEMS = [
  {
    name: 'Amazon Alexa',
    icon: '🟠',
    strengths: ['Largest device compatibility (100K+ devices)', 'Best for shopping/Amazon integration', 'Routines are powerful and flexible', 'Works with almost any smart home brand'],
    weaknesses: ['Privacy concerns with always-on mic', 'App can feel cluttered', 'Less elegant hardware'],
    bestFor: 'Budget-conscious, Amazon Prime households, maximum device choice',
    starterKit: 'Echo Dot (4th gen) + Kasa Smart Plug 4-pack',
    starterCost: 89,
  },
  {
    name: 'Google Home',
    icon: '🔵',
    strengths: ['Best voice recognition in DFW accents', 'Seamless Google Calendar/Maps integration', 'Nest Thermostat is best-in-class', 'Great for families with Android phones'],
    weaknesses: ['Fewer third-party devices than Alexa', 'Google has killed products before', 'Requires Google account'],
    bestFor: 'Android users, Google Workspace households, energy savings focus',
    starterKit: 'Google Nest Hub + Nest Thermostat',
    starterCost: 229,
  },
  {
    name: 'Apple HomeKit',
    icon: '⚪',
    strengths: ['Best privacy and local processing', 'Seamless with iPhone/iPad/Mac', 'Matter standard support', 'Fastest response with Home Hub'],
    weaknesses: ['Most expensive devices', 'Fewest compatible products', 'Requires Apple devices'],
    bestFor: 'iPhone-only households, privacy-focused, premium build quality',
    starterKit: 'HomePod Mini + Ecobee Smart Thermostat',
    starterCost: 329,
  },
];

const UPGRADE_PATH = [
  { year: 'Year 1', focus: 'Foundation', items: ['Smart thermostat (saves $300+/yr in DFW)', 'Smart plugs for high-draw appliances', 'Smart speaker/hub'] },
  { year: 'Year 2', focus: 'Security & Convenience', items: ['Video doorbell', 'Smart locks (front + garage)', 'Motion-activated lights'] },
  { year: 'Year 3', focus: 'Full Automation', items: ['Smart irrigation (DFW water savings)', 'Pool automation', 'Whole-home scenes and routines'] },
];

export default function DFWSmartHomeEcosystemGuide() {
  const [devices, setDevices] = useState<string[]>([]);
  const [priority, setPriority] = useState('');
  const [showResult, setShowResult] = useState(false);

  const deviceOptions = ['iPhone/iPad', 'Android', 'Amazon Echo', 'Google Nest', 'Apple TV', 'Amazon Fire TV'];
  const priorityOptions = [
    { value: 'energy', label: '⚡ Energy Savings' },
    { value: 'security', label: '🔒 Security' },
    { value: 'convenience', label: '🛋️ Convenience' },
    { value: 'entertainment', label: '🎬 Entertainment' },
  ];

  function toggleDevice(d: string) {
    setDevices(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    setShowResult(false);
  }

  function getRecommendation() {
    const hasApple = devices.includes('iPhone/iPad') && !devices.includes('Android');
    const hasAmazon = devices.includes('Amazon Echo');
    if (hasApple && !hasAmazon) return ECOSYSTEMS[2];
    if (priority === 'energy' || devices.includes('Google Nest')) return ECOSYSTEMS[1];
    if (priority === 'security' && hasApple) return ECOSYSTEMS[2];
    return ECOSYSTEMS[0];
  }

  const rec = getRecommendation();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🏡 DFW SMART HOME</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', lineHeight: 1.2 }}>
            Smart Home Ecosystem Guide for DFW Homeowners
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Choosing the right ecosystem is the most important smart home decision you'll make. In DFW, energy savings from smart thermostats alone justify the investment — but which ecosystem fits your household?
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>🌡️ Start Here: Smart Thermostat (Highest DFW ROI)</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
            DFW summers push HVAC systems to 12–16 hours of runtime per day. A smart thermostat learns your schedule, optimizes pre-cooling before peak TOU rates, and can save $200–$500/year on Oncor bills. This is your best first investment regardless of ecosystem.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { name: 'Nest Learning Thermostat', price: '$249', ecosystem: 'Google', saving: '$200–350/yr' },
              { name: 'Ecobee SmartThermostat', price: '$199', ecosystem: 'Works with All', saving: '$180–300/yr' },
              { name: 'Honeywell T9 Pro', price: '$169', ecosystem: 'Works with All', saving: '$150–250/yr' },
            ].map(t => (
              <div key={t.name} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t.name}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{t.price}</div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>{t.ecosystem}</div>
                <div style={{ fontSize: 12, color: '#34D399', marginTop: 4 }}>Saves {t.saving}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          {ECOSYSTEMS.map(eco => (
            <div key={eco.name} style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{eco.icon} {eco.name}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8' }}>{eco.bestFor}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Starter Kit</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>${eco.starterCost}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ fontSize: 12, color: '#34D399', marginBottom: 6 }}>✅ Strengths</div>{eco.strengths.map(s => <div key={s} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>• {s}</div>)}</div>
                <div><div style={{ fontSize: 12, color: '#F87171', marginBottom: 6 }}>⚠️ Watch Out</div>{eco.weaknesses.map(w => <div key={w} style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>• {w}</div>)}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📅 DFW Smart Home 3-Year Upgrade Path</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {UPGRADE_PATH.map(phase => (
              <div key={phase.year} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{phase.year}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>{phase.focus}</div>
                {phase.items.map(item => <div key={item} style={{ fontSize: 13, marginBottom: 6 }}>• {item}</div>)}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Find Your Ecosystem</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Current devices in your home:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {deviceOptions.map(d => (
                <button key={d} onClick={() => toggleDevice(d)}
                  style={{ padding: '8px 14px', borderRadius: 20, border: `2px solid ${devices.includes(d) ? '#F5E642' : '#1E3A5F'}`, background: devices.includes(d) ? '#F5E642' : 'transparent', color: devices.includes(d) ? '#0A1628' : '#E8EDF5', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Top priority:</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {priorityOptions.map(p => (
                <button key={p.value} onClick={() => { setPriority(p.value); setShowResult(false); }}
                  style={{ padding: '8px 14px', borderRadius: 20, border: `2px solid ${priority === p.value ? '#F5E642' : '#1E3A5F'}`, background: priority === p.value ? '#F5E642' : 'transparent', color: priority === p.value ? '#0A1628' : '#E8EDF5', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Get My Ecosystem Match →
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#F5E642' }}>{rec.icon} Recommended: {rec.name}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>{rec.bestFor}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Starter Kit: {rec.starterKit} — ${rec.starterCost}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '24px', background: '#0F2140', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Need a DFW smart home installer to set everything up right?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with certified DFW smart home pros 🏡</div>
        </div>

      </div>
    </div>
  );
}
