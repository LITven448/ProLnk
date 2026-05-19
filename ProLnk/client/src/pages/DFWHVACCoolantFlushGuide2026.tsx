import { useState } from 'react';

export default function DFWHVACCoolantFlushGuide2026() {
  const [eventType, setEventType] = useState('');
  const [result, setResult] = useState('');

  const events = [
    { id: 'burnout', label: '🔥 Compressor Burnout' },
    { id: 'rust', label: '🟤 Visible Rust / Moisture' },
    { id: 'oil', label: '🛢️ Oil Degradation' },
    { id: 'nitrogen', label: '💨 Post-Burnout Nitrogen Purge' },
    { id: 'routine', label: '🔄 Routine Maintenance' },
  ];

  const results: Record<string, { verdict: string; detail: string; color: string }> = {
    burnout: { verdict: 'Flush Required', detail: 'Acid contamination from compressor burnout demands full system flush with neutralizer before new refrigerant charge. Skip this and the replacement compressor dies within months.', color: '#ef4444′ },
    rust: { verdict: 'Flush Strongly Recommended', detail: 'Visible rust or moisture in DFW systems indicates water intrusion. Flush removes particulates and moisture that destroy TXV valves and coils.', color: '#f97316′ },
    oil: { verdict: 'Flush Required', detail: 'Degraded refrigerant oil (dark, thick, burnt smell) must be flushed. Contaminated oil circulates and coats heat transfer surfaces — kills efficiency.', color: '#ef4444′ },
    nitrogen: { verdict: 'Nitrogen Purge, Not Chemical Flush', detail: 'Post-burnout nitrogen purge removes debris and moisture before flush. Dry nitrogen pushed at 150 PSI through system before chemical flush agent introduced.', color: '#3b82f6′ },
    routine: { verdict: 'Flush Not Needed', detail: 'Routine maintenance does not require flushing. Clean coils, check refrigerant charge, inspect oil sight glass. Reserve flush for contamination events only.', color: '#22c55e' },
  };

  const handleCheck = () => {
    if (eventType && results[eventType]) setResult(eventType);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌡️ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Coolant System Flush Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW HVAC systems face extreme demand — 100°F+ summers mean contamination spreads fast. Know when a flush saves the system vs when it wastes money.</p>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>⚗️ Why HVAC Systems Need Flushing</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['🔥','Acid Contamination','Compressor burnout releases acid into refrigerant lines. Acid destroys every component it touches.'],
              ['💧','Moisture Intrusion','Water in the system causes ice, rust, and TXV valve failure — common after DFW flood events.'],
              ['🛢️','Oil Breakdown','Refrigerant oil degrades over time or under extreme heat. Dark oil coats coils and drops efficiency 15-30%.'],
              ['🧪','Flush Agent Process','Technician uses solvent flushed with nitrogen at pressure, then evacuated before new refrigerant charged.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔍 Flush Necessity Guide</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>Select your HVAC event type:</p>
          <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
            {events.map(e => (
              <button key={e.id} onClick={() => setEventType(e.id)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid', borderColor: eventType === e.id ? '#F5E642′ : '#1e3a5f', background: eventType === e.id ? '#1a2f4a' : '#0A1628', color: '#fff', textAlign: ’left', cursor: 'pointer', fontSize: '0.9rem' }}>{e.label}</button>
            ))}
          </div>
          <button onClick={handleCheck} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Check Flush Necessity</button>
          {result && results[result] && (
            <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${results[result].color}`, background: '#0A1628′ }}>
              <div style={{ color: results[result].color, fontWeight: 700, marginBottom: '0.4rem' }}>{results[result].verdict}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{results[result].detail}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 Get a DFW HVAC Pro</div>
          <div style={{ color: '#0A1628', fontSize: '0.9rem' }}>ProLnk connects you with certified DFW HVAC technicians who know coolant system flush protocols.</div>
        </div>
      </div>
    </div>
  );
}
