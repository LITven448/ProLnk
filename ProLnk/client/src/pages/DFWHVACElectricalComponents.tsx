import { useState } from 'react';

const components = [
  { id: 'capacitor', label: 'Capacitor', icon: '🔋', desc: '#1 DFW HVAC failure — stores energy to start/run compressor and fan motors' },
  { id: 'contactor', label: 'Contactor', icon: '⚡', desc: '#2 DFW failure — electromagnetic switch that connects power to compressor and condenser fan' },
  { id: 'board', label: 'Control Board', icon: '🖥️', desc: 'Brain of the system — controls all components, timing, and safety shutoffs' },
];

const seasons = ['Spring (pre-season)', 'Summer Peak (Jun–Sep)', 'Fall', 'Winter'];

const results: Record<string, Record<string, { likelihood: string; diy: string; cost: string }>> = {
  capacitor: {
    'Spring (pre-season)': { likelihood: 'Medium — first hot day of season stresses aging capacitors', diy: 'DIY possible with multimeter test — replace if microfarad reading is off spec by 10%+', cost: '$15–$40 DIY | $150–$300 tech' },
    'Summer Peak (Jun–Sep)': { likelihood: 'HIGH — #1 failure point in DFW July/August heat; capacitors fail when ambient temps exceed specs', diy: 'Call tech — unit down in summer heat is urgent. Capacitors are cheap, labor is fast', cost: '$150–$300 tech visit' },
    'Fall': { likelihood: 'Low — system winding down, thermal stress decreasing', diy: 'Good time for preventive replacement if capacitor is 5+ years old', cost: '$15–$40 DIY | $150–$300 tech' },
    'Winter': { likelihood: 'Very Low — heating mode uses different electrical path', diy: 'Schedule spring inspection now to catch weak capacitors before summer', cost: '$100–$150 spring tune-up' },
  },
  contactor: {
    'Spring (pre-season)': { likelihood: 'Medium — contacts may be pitted from last summer', diy: 'Inspect contacts for pitting or carbon buildup. DIY replacement is straightforward', cost: '$20–$60 DIY | $150–$350 tech' },
    'Summer Peak (Jun–Sep)': { likelihood: 'HIGH — chattering or humming contactor means it\’s about to fail; DFW heat accelerates contact pitting', diy: 'Call tech — contactor failure means no cooling. Often same-day repair', cost: '$150–$350 tech visit' },
    'Fall': { likelihood: 'Low — reduced cycling reduces contact wear', diy: 'DIY replacement now is cheap insurance before next summer', cost: '$20–$60 DIY part' },
    'Winter': { likelihood: 'Very Low', diy: 'No action needed unless troubleshooting heat pump issues', cost: 'N/A' },
  },
  board: {
    'Spring (pre-season)': { likelihood: 'Low — boards usually fail from lightning or power surge', diy: 'Call tech — control board diagnosis requires multimeter and schematic knowledge', cost: '$300–$700 replacement' },
    'Summer Peak (Jun–Sep)': { likelihood: 'Medium — power surges from storms and brownouts damage boards; DFW has frequent summer storms', diy: 'Call tech immediately — board replacement is complex. Consider whole-home surge protector ($200–$400)', cost: '$300–$700 replacement' },
    'Fall': { likelihood: 'Low', diy: 'Install whole-home surge protector now to protect board before next storm season', cost: '$200–$400 surge protector' },
    'Winter': { likelihood: 'Low', diy: 'If heat not working, board is one of several possible causes — tech diagnosis needed', cost: '$150 diagnostic + $300–$700 if board' },
  },
};

export default function DFWHVACElectricalComponents() {
  const [component, setComponent] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);

  const result = component && season ? results[component]?.[season] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>⚡</span>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Electrical Components</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          Electrical component failures account for the majority of HVAC service calls in DFW — especially during summer peak. The capacitor alone causes 40%+ of all DFW no-cooling calls in July and August. Understanding these parts helps you diagnose problems quickly and know when to call a tech.
        </p>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔌 Key Electrical Components</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {components.map(c => (
              <div key={c.id} style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 24 }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{c.label}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2038', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🔍 Failure Likelihood by Component + Season</h2>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Select component:</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {components.map(c => (
                <button key={c.id} onClick={() => setComponent(c.id)} style={{
                  background: component === c.id ? '#F5E642' : '#0A1628',
                  color: component === c.id ? '#0A1628' : '#E8EDF5',
                  border: '2px solid #1E3A5F', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 600,
                }}>{c.icon} {c.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>Select DFW season:</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {seasons.map(s => (
                <button key={s} onClick={() => setSeason(s)} style={{
                  background: season === s ? '#F5E642' : '#0A1628',
                  color: season === s ? '#0A1628' : '#E8EDF5',
                  border: '2px solid #1E3A5F', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 13,
                }}>{s}</button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#F5E642' }}>Failure Likelihood:</strong> <span>{result.likelihood}</span></div>
              <div style={{ marginBottom: 10 }}><strong style={{ color: '#F5E642' }}>DIY vs. Tech:</strong> <span style={{ color: '#94A3B8' }}>{result.diy}</span></div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>Cost: <strong style={{ color: '#F5E642' }}>{result.cost}</strong></div>
            </div>
          )}
          {(!component || !season) && (
            <div style={{ color: '#94A3B8', fontSize: 14, fontStyle: 'italic' }}>Select a component and season above to see failure likelihood and cost guidance.</div>
          )}
        </div>
      </div>
    </div>
  );
}
