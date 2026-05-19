import { useState } from 'react';

const BUILDING_MAP: Record<string, { recommendation: string; sizing: string; benefit: string; cost: string }> = {
  'Hospital / Medical Facility': {
    recommendation: 'Enthalpy wheel with ASHRAE 170 compliance — hospitals require high outdoor air rates where enthalpy recovery is critical.',
    sizing: '60–100% outdoor air units with dedicated energy recovery ventilators (ERV) using enthalpy wheels',
    benefit: 'Recovers 70–80% of sensible and latent energy from exhaust. In DFW, saves $15–40K/yr on a 50,000 sq ft facility.',
    cost: '$80,000–$300,000+ for commercial ERV installation depending on facility size',
  },
  'K-12 School / University': {
    recommendation: 'Enthalpy wheel ERV strongly recommended — high occupancy + ventilation requirements make DFW humidity management critical.',
    sizing: 'DOAS (Dedicated Outdoor Air System) with enthalpy wheel sized per ASHRAE 62.1',
    benefit: 'Prevents classroom humidity spikes during DFW spring. Reduces HVAC load by 30–50% on ventilation air.',
    cost: '$40,000–$150,000 per building depending on sq footage',
  },
  'Office Building (>20,000 sq ft)': {
    recommendation: 'Enthalpy wheel preferred over sensible-only HRV for DFW — latent recovery prevents humidity ingress during cooling season.',
    sizing: 'Central AHU with integrated enthalpy wheel or standalone ERV paired with existing chillers',
    benefit: 'Reduces chiller load from ventilation air by 40–60% in DFW summers. Payback typically 5–8 years.',
    cost: '$30,000–$120,000 depending on system size',
  },
  'Retail / Restaurant': {
    recommendation: 'Traditional HRV or ERV without enthalpy wheel may suffice for smaller spaces. Evaluate based on outdoor air CFM requirements.',
    sizing: 'Rooftop ERV unit sized to meet code ventilation minimums',
    benefit: 'Moderate benefit — DFW humidity recovery helps but restaurant exhaust contamination concerns apply.',
    cost: '$8,000–$30,000 for commercial rooftop ERV',
  },
  'Residential (large home >5,000 sq ft)': {
    recommendation: 'Residential ERV with smaller enthalpy core — not a full commercial wheel. Residential scale DOAS.',
    sizing: 'Dedicated residential ERV unit (200–500 CFM range)',
    benefit: 'Provides fresh air without importing DFW humidity. Better than HRV for DFW cooling-dominant climate.',
    cost: '$3,000–$8,000 installed',
  },
};

export default function DFWHVACEnthalpyWheelGuide() {
  const [building, setBuilding] = useState('');
  const [result, setResult] = useState<null | { recommendation: string; sizing: string; benefit: string; cost: string }>(null);

  function evaluate() {
    setResult(BUILDING_MAP[building] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏢 DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>Enthalpy Wheels & Energy Recovery for DFW Commercial Buildings</h1>
        <p style={{ color: '#9BA8BB', marginBottom: '2rem', lineHeight: 1.7 }}>
          Enthalpy wheels (rotary energy recovery wheels) transfer both heat and moisture between exhaust and incoming outdoor air streams.
          In DFW's hot, humid climate, they dramatically reduce the energy cost of meeting ventilation requirements.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { label: 'Enthalpy Wheel', desc: 'Transfers heat + moisture (latent + sensible). Best for DFW humidity.', icon: '🔄' },
            { label: 'HRV (Sensible Only)', desc: 'Transfers heat only. Misses humidity — poor fit for DFW cooling season.', icon: '🌡️' },
            { label: 'ERV (with enthalpy)', desc: 'Fixed plate or wheel that handles both heat and moisture. Good residential option.', icon: '♻️' },
          ].map(item => (
            <div key={item.label} style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{item.label}</div>
              <div style={{ color: '#9BA8BB', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>💧 Why Enthalpy Recovery Matters in DFW</h2>
          <ul style={{ color: '#9BA8BB', lineHeight: 2, paddingLeft: '1.25rem' }}>
            <li>DFW outdoor air in summer: 95°F / 65% RH — extremely energy-intensive to condition</li>
            <li>Enthalpy wheels recover 70–80% of both heat and humidity from exhaust stream</li>
            <li>DFW hospitals and schools use DOAS with enthalpy wheels to meet ASHRAE 62.1 without overloading chillers</li>
            <li>Sensible-only HRVs leave all latent (humidity) load on the cooling coil — wrong choice for DFW</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🏢 DFW Building Type Advisor</h2>
          <label style={{ display: 'block', color: '#9BA8BB', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Building Type</label>
          <select
            value={building}
            onChange={e => setBuilding(e.target.value)}
            style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '0.6rem 1rem', width: '100%', marginBottom: '1rem', fontSize: '0.95rem' }}
          >
            <option value="">Select building type...</option>
            {Object.keys(BUILDING_MAP).map(k => <option key={k}>{k}</option>)}
          </select>
          <button
            onClick={evaluate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Get DFW Energy Recovery Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ marginBottom: '0.5rem' }}>🔄 <strong>Recommendation:</strong> {result.recommendation}</div>
              <div style={{ marginBottom: '0.5rem' }}>📐 <strong>Sizing Approach:</strong> {result.sizing}</div>
              <div style={{ marginBottom: '0.5rem' }}>⚡ <strong>DFW Benefit:</strong> {result.benefit}</div>
              <div>💰 <strong>Typical Cost:</strong> {result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
          <p style={{ color: '#9BA8BB', fontSize: '0.9rem', margin: 0 }}>
            🏠 <strong style={{ color: '#F5E642′ }}>ProLnk Tip:</strong> Enthalpy wheel systems require quarterly cleaning in DFW — coil contamination and wheel fouling significantly reduce effectiveness. Budget for PM contracts.
          </p>
        </div>
      </div>
    </div>
  );
}
