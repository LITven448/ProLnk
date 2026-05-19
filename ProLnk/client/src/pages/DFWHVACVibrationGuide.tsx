import { useState } from 'react';

const vibrationTypes = [
  {
    location: 'Outdoor Unit',
    type: 'Rhythmic Thumping',
    cause: 'Bent or unbalanced fan blade',
    fix: 'Replace fan blade — do not bend back, balance is critical',
    urgency: 'High — can damage fan motor bearings',
    diy: false,
  },
  {
    location: 'Outdoor Unit',
    type: 'Rattling on Startup',
    cause: 'Loose panels or screws vibrating at startup frequency',
    fix: 'Tighten all cabinet screws and panel fasteners',
    urgency: 'Low — nuisance noise, easy fix',
    diy: true,
  },
  {
    location: 'Outdoor Unit',
    type: 'Constant Vibration',
    cause: 'Condenser pad is unlevel — DFW clay soil shifts pads seasonally',
    fix: 'Level the pad using composite shims or reset concrete pad',
    urgency: 'Medium — unlevel unit stresses refrigerant lines over time',
    diy: false,
  },
  {
    location: 'Indoor Unit',
    type: 'Squealing or Scraping',
    cause: 'Blower wheel out of balance or debris caught in blower',
    fix: 'Clean blower wheel, check balance, replace if bent',
    urgency: 'High — can damage blower motor quickly',
    diy: false,
  },
  {
    location: 'Ductwork',
    type: 'Booming or Popping',
    cause: 'Duct resonance — thin metal flexing with pressure changes',
    fix: 'Add duct bracing or wrap with duct insulation to dampen resonance',
    urgency: 'Low — acoustics only, no mechanical risk',
    diy: true,
  },
  {
    location: 'Ductwork',
    type: 'Rattling in Walls',
    cause: 'Unsecured duct sections rubbing against framing',
    fix: 'Locate and secure loose sections, add vibration isolators',
    urgency: 'Low — can worsen if duct connection loosens further',
    diy: false,
  },
];

const locations = ['All', 'Outdoor Unit', 'Indoor Unit', 'Ductwork'];

export default function DFWHVACVibrationGuide() {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [result, setResult] = useState<typeof vibrationTypes[0] | null>(null);

  const filtered = vibrationTypes.filter(
    (v) => selectedLocation === 'All' || v.location === selectedLocation
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🔧 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          HVAC Vibration & Noise Diagnosis
        </h1>
        <p style={{ color: '#9CA3B0', marginBottom: '2rem', lineHeight: 1.6 }}>
          Different vibrations mean different things. DFW clay soil, intense UV, and temperature swings create unique failure patterns. Find your noise below.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#9CA3B0', marginBottom: '0.5rem' }}>Filter by location</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => { setSelectedLocation(loc); setResult(null); }}
                style={{
                  padding: '0.4rem 1rem', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: '0.85rem',
                  background: selectedLocation === loc ? '#F5E642' : '#1A2540',
                  color: selectedLocation === loc ? '#0A1628' : '#E8EAF0',
                  fontWeight: selectedLocation === loc ? 700 : 400,
                }}
              >{loc}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {filtered.map((v, i) => (
            <button
              key={i}
              onClick={() => setResult(v)}
              style={{
                background: result === v ? '#1E3A5F' : '#111E35',
                border: result === v ? '1.5px solid #F5E642' : '1.5px solid #1A2540',
                borderRadius: 10, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#E8EAF0',
              }}
            >
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                📍 {v.location}
              </div>
              <div style={{ fontWeight: 600 }}>🔊 {v.type}</div>
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', border: '1.5px solid #F5E642' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', color: '#F5E642' }}>
              Diagnosis: {result.type}
            </div>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#9CA3B0', fontSize: '0.8rem' }}>CAUSE</span><div style={{ marginTop: '0.25rem' }}>{result.cause}</div></div>
              <div><span style={{ color: '#9CA3B0', fontSize: '0.8rem' }}>FIX</span><div style={{ marginTop: '0.25rem' }}>{result.fix}</div></div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#1A2540', borderRadius: 8, padding: '0.5rem 1rem' }}>
                  ⚡ Urgency: <strong>{result.urgency}</strong>
                </div>
                <div style={{ background: '#1A2540', borderRadius: 8, padding: '0.5rem 1rem' }}>
                  {result.diy ? '🛠️ DIY Possible' : '👷 Pro Required'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#9CA3B0' }}>
          💡 DFW Note: Clay soil expansion in summer and contraction in winter is the #1 cause of condenser pad tilt and duct hanger loosening in DFW homes.
        </div>
      </div>
    </div>
  );
}
