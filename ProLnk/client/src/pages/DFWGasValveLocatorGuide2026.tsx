import { useState } from 'react';

const situations = [
  { id: 'smell', label: '🚨 I Smell Gas', steps: ['Leave immediately — do not use switches or phones inside', 'Shut off main at meter: quarter-turn ball valve perpendicular to pipe', 'Call Atmos Energy 24/7: 1-888-286-6700', 'Wait outside — do not re-enter until Atmos clears' ] },
  { id: 'appliance', label: '🔥 Appliance Shutoff', steps: ['Range/Cooktop: flex line shutoff behind lower drawer or on wall behind unit', 'Furnace: switch + gas valve within 6 ft of unit in utility closet', 'Water Heater: valve on gas supply line entering unit (lever or knob)', 'Dryer: valve behind dryer on wall — turn perpendicular to stop flow', 'Fireplace (gas log): manual shutoff key in floor plate near firebox' ] },
  { id: 'main', label: '🏠 Main Meter Shutoff', steps: ['Locate meter: typically right side of house near street or alley', 'Identify valve: T-handle or flat bar slot on meter riser', 'Turn 90° with wrench: valve perpendicular to pipe = OFF', 'Only Atmos Energy can restore gas after shutoff — call when ready', 'DFW note: some older meters have a separate curb valve at property line' ] },
];

export default function DFWGasValveLocatorGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 0.5rem' }}>
            DFW Gas Shutoff Valve Locator Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Know every gas shutoff in your DFW home before you need it. Atmos Energy serves most of DFW — locate and label your valves now.
          </p>
        </div>

        <div style={{ background: '#3a0a0a', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #ef4444' }}>
          <strong style={{ color: '#ef4444' }}>🚨 Emergency:</strong>
          <span style={{ color: '#fca5a5', marginLeft: '0.5rem' }}>Smell gas? Leave immediately. Call Atmos: 1-888-286-6700. Do not use light switches or phones indoors.</span>
        </div>

        <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: '0', fontSize: '1.1rem' }}>📍 DFW Home Gas Map — Standard Shutoff Points</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {['🏠 Main meter: side of house, quarter-turn ball valve or T-handle', '🔥 Furnace: gas valve + emergency switch near unit', '🚿 Water heater: lever on gas supply line', '🍳 Range: behind lower drawer or wall valve', '👔 Dryer: wall valve behind unit — must pull out to access', '🪵 Fireplace: key valve in floor or wall escutcheon near firebox'].map((item, i) => (
              <div key={i} style={{ background: '#1a3a5c', borderRadius: '8px', padding: '0.75rem', fontSize: '0.9rem', lineHeight: '1.5' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>Select Situation → Get a Gas Shutoff Guide</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642' : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: '8px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', fontSize: '0.95rem' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f2040', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: '0' }}>Guide: {match.label}</h3>
            <ol style={{ margin: '0', paddingLeft: '1.25rem' }}>
              {match.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', lineHeight: '1.6' }}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <div style={{ background: '#1a3a5c', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡</div>
          <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '0.25rem' }}>Gas line inspection or appliance hookup?</div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ProLnk connects you with licensed DFW gas fitters. Free quotes, vetted pros.</div>
        </div>
      </div>
    </div>
  );
}