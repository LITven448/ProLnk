import { useState } from 'react';

const solarReadyItems = {
  now: [
    '200A+ electrical panel (300A preferred for solar + EV)',
    'Conduit from attic to electrical panel installed',
    'HVAC disconnect location noted for solar installer',
    'Roof structural assessment completed',
    'South/west roof exposure documented',
  ],
  later: [
    'Solar inverter mounting space reserved in garage',
    'Battery backup pre-wiring (critical circuits identified)',
    'Smart thermostat with solar API integration',
    'Net metering agreement with Oncor reviewed',
    'EV charger conduit run same time as solar conduit',
  ],
};

const timelines = ['0-1 years', '1-3 years', '3-5 years', '5+ years'];
const homeTypes = ['Under 1,500 sqft', '1,500-2,500 sqft', '2,500-4,000 sqft', '4,000+ sqft'];

export default function DFWHVACSolarReadyGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [timeline, setTimeline] = useState('');
  const [showResults, setShowResults] = useState(false);

  const panelSize = homeSize === '4,000+ sqft' ? '400A' : homeSize === '2,500-4,000 sqft' ? '300A' : '200A';
  const urgency = timeline === '0-1 years' ? 'Act Now' : timeline === '1-3 years' ? 'Plan Now' : 'Prepare Now';
  const urgencyColor = timeline === '0-1 years' ? '#F5E642′ : '#a0d4a0';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          ☀️ DFW HVAC RESOURCE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Solar-Ready HVAC Guide for DFW
        </h1>
        <p style={{ color: '#8899aa', fontSize: 16, marginBottom: 32 }}>
          Make your new DFW HVAC system future-proof for solar — electrical panel sizing, conduit placement, and battery backup prep.
        </p>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔧 Get Your Solar-Ready Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Home Size</label>
              <select value={homeSize} onChange={e => { setHomeSize(e.target.value); setShowResults(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select size...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Solar Timeline</label>
              <select value={timeline} onChange={e => { setTimeline(e.target.value); setShowResults(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select timeline...</option>
                {timelines.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)} disabled={!homeSize || !timeline}
            style={{ background: homeSize && timeline ? '#F5E642′ : '#1e3a5f', color: homeSize && timeline ? '#0A1628' : '#4a6080', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: homeSize && timeline ? 'pointer' : 'not-allowed' }}>
            Generate My Checklist →
          </button>
        </div>

        {showResults && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: `4px solid ${urgencyColor}` }}>
              <div style={{ color: urgencyColor, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>⚡ {urgency}: Panel Recommendation</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{panelSize} Electrical Panel</div>
              <div style={{ color: '#8899aa', fontSize: 13, marginTop: 4 }}>Required for {homeSize} DFW home with solar + possible EV charging</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['now', 'later'].map(phase => (
                <div key={phase} style={{ background: '#0d1f3c', borderRadius: 12, padding: 20 }}>
                  <div style={{ color: phase === 'now' ? '#F5E642′ : '#8899aa', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
                    {phase === 'now' ? '✅ Do During HVAC Install' : '📋 Prep for Later'}
                  </div>
                  {solarReadyItems[phase as keyof typeof solarReadyItems].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#ccd9e8′ }}>
                      <span style={{ color: phase === 'now' ? '#F5E642′ : '#4a6080', flexShrink: 0 }}>•</span>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>💡 Why DFW is Ideal for Solar-Ready HVAC</h2>
          {[
            { icon: '☀️', title: 'Peak Sun Hours', desc: 'DFW averages 5.5-6 peak sun hours/day — top 15% in the US for solar production.' },
            { icon: '💰', title: 'Oncor Incentives', desc: 'Oncor offers rebates for smart thermostats and energy storage — pair with your new HVAC.' },
            { icon: '🌡️', title: 'Cooling Dominance', desc: 'DFW HVAC runs 5-6 months of heavy cooling — solar offsets exactly when you need it most.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16, padding: 16, background: '#152238', borderRadius: 8 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#8899aa', fontSize: 13 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
