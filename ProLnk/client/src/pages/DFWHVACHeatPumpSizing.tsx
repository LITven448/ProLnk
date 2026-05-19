import { useState } from 'react';

const sizingData: Record<string, Record<string, string>> = {
  'North DFW (Plano, Frisco, McKinney)': {
    'Under 1,000 sqft': '1.5 ton (18,000 BTU)',
    '1,000-1,500 sqft': '2 ton (24,000 BTU)',
    '1,500-2,000 sqft': '2.5-3 ton (30-36,000 BTU)',
    '2,000-2,800 sqft': '3.5 ton (42,000 BTU)',
    '2,800-3,500 sqft': '4-4.5 ton (48-54,000 BTU)',
    '3,500+ sqft': '5 ton (60,000 BTU) or multi-zone',
  },
  'Central DFW (Dallas, Garland, Mesquite)': {
    'Under 1,000 sqft': '1.5-2 ton (18-24,000 BTU)',
    '1,000-1,500 sqft': '2-2.5 ton (24-30,000 BTU)',
    '1,500-2,000 sqft': '3 ton (36,000 BTU)',
    '2,000-2,800 sqft': '3.5-4 ton (42-48,000 BTU)',
    '2,800-3,500 sqft': '4.5-5 ton (54-60,000 BTU)',
    '3,500+ sqft': '5+ ton or multi-zone system',
  },
  'South/West DFW (Fort Worth, Arlington, Mansfield)': {
    'Under 1,000 sqft': '2 ton (24,000 BTU)',
    '1,000-1,500 sqft': '2.5 ton (30,000 BTU)',
    '1,500-2,000 sqft': '3 ton (36,000 BTU)',
    '2,000-2,800 sqft': '4 ton (48,000 BTU)',
    '2,800-3,500 sqft': '5 ton (60,000 BTU)',
    '3,500+ sqft': '5+ ton or multi-zone system',
  },
};

const zones = Object.keys(sizingData);
const sizes = ['Under 1,000 sqft', '1,000-1,500 sqft', '1,500-2,000 sqft', '2,000-2,800 sqft', '2,800-3,500 sqft', '3,500+ sqft'];
const orientations = ['North-facing (less sun)', 'South-facing (more sun)', 'Mixed/unclear'];
const insulations = ['Well-insulated (post-2000)', 'Average (1980-2000)', 'Poor (pre-1980)'];

export default function DFWHVACHeatPumpSizing() {
  const [zone, setZone] = useState('');
  const [size, setSize] = useState('');
  const [orientation, setOrientation] = useState('');
  const [insulation, setInsulation] = useState('');
  const [showResult, setShowResult] = useState(false);

  const recommendation = zone && size ? sizingData[zone]?.[size] || 'Consult HVAC pro' : '';
  const oversize = orientation === 'South-facing (more sun)' || insulation === 'Poor (pre-1980)';
  const note = oversize ? 'Consider sizing up 0.5 ton due to your home characteristics.' : 'Standard sizing applies for your home.';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          📐 DFW HVAC RESOURCE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Heat Pump Sizing Guide for DFW
        </h1>
        <p style={{ color: '#8899aa', fontSize: 16, marginBottom: 32 }}>
          DFW sizing is driven by cooling load — our brutal summers require more capacity than the heating load ever would. Here's how to size it right.
        </p>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Size My DFW Heat Pump</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Zone</label>
              <select value={zone} onChange={e => { setZone(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 13 }}>
                <option value="">Select zone...</option>
                {zones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={size} onChange={e => { setSize(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 13 }}>
                <option value="">Select size...</option>
                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Roof/Home Orientation</label>
              <select value={orientation} onChange={e => { setOrientation(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 13 }}>
                <option value="">Select...</option>
                {orientations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8899aa', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Insulation</label>
              <select value={insulation} onChange={e => { setInsulation(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#152238', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', padding: '10px 12px', fontSize: 13 }}>
                <option value="">Select...</option>
                {insulations.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!zone || !size || !orientation || !insulation}
            style={{ background: zone && size && orientation && insulation ? '#F5E642′ : '#1e3a5f', color: zone && size && orientation && insulation ? '#0A1628' : '#4a6080', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: zone && size && orientation && insulation ? 'pointer' : 'not-allowed' }}>
            Get Size Recommendation →
          </button>
        </div>

        {showResult && (
          <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>✅ Recommended Heat Pump Size</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{recommendation}</div>
            <div style={{ color: '#8899aa', fontSize: 14 }}>{note}</div>
            <div style={{ marginTop: 16, padding: 16, background: '#152238', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Sizing Rule: Always Use Manual J</div>
              <div style={{ color: '#ccd9e8', fontSize: 13 }}>These are estimates. DFW's clay soil, high humidity, and extreme heat mean a certified HVAC contractor must perform a Manual J load calculation before installing. Oversized units short-cycle and fail faster in DFW humidity.</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🌡️ Why DFW Sizing is Different</h2>
          {[
            { icon: '🔥', title: 'Cooling Drives Everything', desc: 'DFW Design Day temperature is 100-104°F. Your system is sized for cooling load — heating is almost an afterthought at 2-3 tons less.' },
            { icon: '💧', title: 'Humidity Load is Real', desc: 'DFW averages 65% relative humidity in summer. Your heat pump must dehumidify — this adds latent load that sizing tables miss.' },
            { icon: '🏘️', title: 'Attic Heat is Brutal', desc: 'DFW attics reach 140-160°F in July. Proper duct insulation (R-8 min) matters as much as the size of your heat pump.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 2 ? 16 : 0, padding: 16, background: '#152238', borderRadius: 8 }}>
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
