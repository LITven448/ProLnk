import { useState } from 'react';

const CONCERN_MAP: Record<string, { type: string; placement: string; cost: string; effectiveness: string }> = {
  'Mold on evaporator coil': {
    type: 'UVGI (Germicidal UV-C) — coil-mounted single emitter',
    placement: 'Directly on or adjacent to evaporator coil in air handler',
    cost: '$300–$700 installed',
    effectiveness: 'High — direct UV exposure kills mold colonies within 24 hrs; prevents regrowth.',
  },
  'Musty odor from vents': {
    type: 'UVGI coil lamp + optional duct UV for full coverage',
    placement: 'Coil mount primary, optional second lamp in main supply duct',
    cost: '$400–$900 installed',
    effectiveness: 'High for coil-sourced odor. Duct lamp adds coverage for bypass air.',
  },
  'Allergy/indoor air quality': {
    type: 'PCO (Photo Catalytic Oxidation) or dual UVGI+PCO system',
    placement: 'In-duct installation downstream of coil',
    cost: '$500–$1,200 installed',
    effectiveness: 'Moderate — reduces VOCs and biologicals. Not a substitute for filtration.',
  },
  'General prevention': {
    type: 'UVGI coil lamp — most cost-effective preventive option',
    placement: 'Coil mount in air handler',
    cost: '$300–$600 installed',
    effectiveness: 'Good — prevents mold establishment before it starts. Best ROI in DFW humidity.',
  },
};

export default function DFWHVACUVLightGuide() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | { type: string; placement: string; cost: string; effectiveness: string }>(null);

  function evaluate() {
    setResult(CONCERN_MAP[concern] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔬 DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>UV Light Systems for DFW HVAC</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW's humidity keeps evaporator coils persistently damp — the perfect environment for mold. In-duct UV systems use germicidal
          ultraviolet light to kill mold, bacteria, and viruses before they circulate through your home.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'UVGI', desc: 'UV-C light directly kills microorganisms on contact. Best for coil mold — proven, cost-effective.', icon: '☀️' },
            { label: 'PCO', desc: 'Photo Catalytic Oxidation uses UV + titanium dioxide to neutralize VOCs and organics. Better for air quality than mold prevention.', icon: '⚗️' },
          ].map(item => (
            <div key={item.label} style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>{item.label}</div>
              <div style={{ color: '#9BA8BB', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>💧 Why DFW Humidity Makes This Critical</h2>
          <ul style={{ color: '#9BA8BB', lineHeight: 2, paddingLeft: '1.25rem' }}>
            <li>DFW average relative humidity: 65–75% in spring/summer months</li>
            <li>Evaporator coils run at 40–50°F — condensation forms constantly during cooling season</li>
            <li>Coil stays wet 8–14 hrs/day in DFW summers; mold establishes in 24–48 hrs</li>
            <li>Mold on coil reduces efficiency 5–15% and spreads spores through ductwork</li>
            <li>UV coil lamps are one of the highest-ROI IAQ upgrades for DFW homes</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌡️ DFW UV System Advisor</h2>
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your DFW Concern</label>
          <select
            value={concern}
            onChange={e => setConcern(e.target.value)}
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          >
            <option value="">Select your concern...</option>
            {Object.keys(CONCERN_MAP).map(k => <option key={k}>{k}</option>)}
          </select>
          <button
            onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Get UV Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}>🔬 <strong>System Type:</strong> {result.type}</div>
              <div style={{ marginBottom: '0.5rem' }}>📍 <strong>Placement:</strong> {result.placement}</div>
              <div style={{ marginBottom: '0.5rem' }}>💰 <strong>Cost:</strong> {result.cost}</div>
              <div>✅ <strong>Effectiveness:</strong> {result.effectiveness}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ color: '#9BA8BB', fontSize: '0.9rem', margin: 0 }}>
            🏠 <strong style={{ color: '#F5E642′ }}>ProLnk Tip:</strong> Replace UV bulbs every 12 months — UV output degrades significantly before the lamp visually burns out.
          </p>
        </div>
      </div>
    </div>
  );
}
