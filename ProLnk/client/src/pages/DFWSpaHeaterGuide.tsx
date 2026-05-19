import { useState } from 'react';

const spaHeaterOptions = {
  electric_standard: {
    name: 'Electric Resistance (Standard)',
    emoji: '⚡',
    power: '5.5kW or 11kW',
    heat_time_small: '45–90 min',
    heat_time_large: '2–4 hrs',
    install: '$800–$1,800',
    monthly_dfwWinter: '$35–$75',
    monthly_dfwSummer: '$8–$18',
    best_for: 'Most DFW spas — simple, reliable, no gas line needed',
    dfwNote: 'The DFW standard for spas. Mild winters mean you\’re not running the heater hard. 11kW heaters recover heat fast after use — even in rare DFW freezes.',
    sizing: { small: '5.5kW', medium: '11kW', large: '11kW + secondary' },
  },
  gas_natural: {
    name: 'Natural Gas',
    emoji: '🔥',
    power: '250,000–400,000 BTU',
    heat_time_small: '20–40 min',
    heat_time_large: '45–90 min',
    install: '$2,000–$4,000',
    monthly_dfwWinter: '$25–$55',
    monthly_dfwSummer: '$5–$12',
    best_for: 'DFW spas used heavily in winter, or attached to gas pool heater',
    dfwNote: 'Fastest spa heating in DFW. If you have a pool + spa combo with gas pool heater, gas spa makes sense. DFW gas rates make this cost-competitive in winter.',
    sizing: { small: '250K BTU', medium: '300K BTU', large: '400K BTU' },
  },
  heat_pump_spa: {
    name: 'Heat Pump (Spa-Specific)',
    emoji: '💨',
    power: '5–8 ton',
    heat_time_small: '3–6 hrs',
    heat_time_large: '6–12 hrs',
    install: '$3,500–$7,000',
    monthly_dfwWinter: '$15–$35',
    monthly_dfwSummer: '$5–$12',
    best_for: 'Eco-conscious DFW owners, spas used on planned schedule',
    dfwNote: 'Lowest operating cost but not practical for spontaneous DFW spa use — slow to heat. DFW\’s mild climate makes heat pumps efficient but the slow heat-up is a pain.',
    sizing: { small: '5 ton', medium: '5–6 ton', large: '6–8 ton' },
  },
};

const spaVolumes = { small: 'Small Spa (200–350 gal)', medium: 'Medium Spa (350–500 gal)', large: 'Large Spa / Swim Spa (500+ gal)' };

export default function DFWSpaHeaterGuide() {
  const [spaSize, setSpaSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [priority, setPriority] = useState('');
  const [hasGas, setHasGas] = useState('');
  const [result, setResult] = useState<null | typeof spaHeaterOptions.electric_standard>(null);

  function getRecommendation() {
    if (!priority) return;
    let key = 'electric_standard';
    if (priority === 'speed' && hasGas === 'yes') key = 'gas_natural';
    if (priority === 'eco') key = 'heat_pump_spa';
    if (priority === 'spontaneous') key = priority === 'spontaneous' && hasGas === 'yes' ? 'gas_natural' : 'electric_standard';
    setResult(spaHeaterOptions[key as keyof typeof spaHeaterOptions]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW SPA GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          🛁 DFW Spa & Hot Tub Heater Guide
        </h1>
        <p style={{ color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6 }}>
          DFW's milder winters mean smaller heaters and lower heating bills than northern climates. Here’s how to right-size your spa heater for North Texas.
        </p>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '16px 20px', marginBottom: 28 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>❄️ DFW WINTER SIZING ADVANTAGE</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>35–55°F</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>DFW Winter Range</div>
            </div>
            <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#22C55E' }}>11kW</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Typical DFW Spa Size</div>
            </div>
            <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642′ }}>15kW+</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Northern US Requirement</div>
            </div>
          </div>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '12px 0 0', lineHeight: 1.5 }}>
            Northern states need 15–18kW heaters to recover from 0°F nights. DFW rarely drops below 25°F, meaning 11kW heaters are sufficient for most DFW spas.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your DFW Spa Heater Recommendation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>SPA SIZE</label>
            <select value={spaSize} onChange={e => setSpaSize(e.target.value as 'small' | 'medium' | 'large')} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              {Object.entries(spaVolumes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>DFW PRIORITY</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select priority...</option>
              <option value="spontaneous">Spontaneous use — ready fast</option>
              <option value="speed">Fastest possible heat-up</option>
              <option value="cost">Lowest operating cost</option>
              <option value="eco">Eco-friendly</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>NATURAL GAS LINE AVAILABLE?</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['yes', 'no'].map(v => (
              <button key={v} onClick={() => setHasGas(v)} style={{ flex: 1, padding: '10px', background: hasGas === v ? '#F5E642′ : '#1E2D45', color: hasGas === v ? '#0A1628' : '#E8EDF5', border: '1px solid #2D4060', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: ’pointer' }}>
                {v === 'yes' ? '✅ Yes, I have gas' : '❌ No gas line'}
              </button>
            ))}
          </div>
        </div>
        <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 28 }}>
          Get Recommendation →
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28, border: '2px solid #F5E642′ }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>RECOMMENDED FOR YOUR DFW SPA</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>{result.emoji} {result.name}</h3>
            <p style={{ color: '#94A3B8', margin: '0 0 16px', fontSize: 13 }}>{result.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>INSTALL COST</div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{result.install}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>DFW WINTER/MO</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642′ }}>{result.monthly_dfwWinter}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>DFW SUMMER/MO</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#22C55E' }}>{result.monthly_dfwSummer}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>RECOMMENDED SIZE FOR YOUR SPA</div>
                <div style={{ fontWeight: 700, color: '#F5E642′ }}>{result.sizing[spaSize]}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>HEAT-UP TIME</div>
                <div style={{ fontWeight: 700 }}>{spaSize === 'small' ? result.heat_time_small : result.heat_time_large}</div>
              </div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 DFW Spa Heater Comparison</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {Object.values(spaHeaterOptions).map(h => (
            <div key={h.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontWeight: 700 }}>{h.emoji} {h.name}</div>
                <div style={{ color: '#F5E642', fontSize: 13 }}>{h.install}</div>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8′ }}>{h.best_for}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <span style={{ fontSize: 12 }}>Winter: <strong style={{ color: '#F5E642′ }}>{h.monthly_dfwWinter}/mo</strong></span>
                <span style={{ fontSize: 12 }}>Summer: <strong style={{ color: '#22C55E' }}>{h.monthly_dfwSummer}/mo</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
