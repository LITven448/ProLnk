import { useState } from 'react';

const months = [
  { id: '1', label: 'January', actions: ['Test all smoke and carbon monoxide detectors — replace batteries if needed', 'CO risk rises in winter as homes are sealed and gas appliances run more', 'Check that generator extension cords are properly rated (12 AWG minimum)', 'Inspect holiday lighting storage for damaged cords before storing'] },
  { id: '5', label: 'May', actions: ['Test all outdoor GFCI receptacles before pool season begins', 'DFW pools open May–June — GFCI protection is life-safety critical', 'Check exterior lighting for pest nesting in fixtures over winter', 'Inspect any buried landscape wiring for irrigation season activation'] },
  { id: '6', label: 'June–September', actions: ['Install surge protection if not already in place — ERCOT grid stress peaks', 'DFW experiences more surge events per capita than most US metros', 'Whole-home surge protector at panel is preferred over power strips alone', 'Check that A/C disconnect is properly rated and accessible for techs'] },
  { id: '10', label: 'October', actions: ['Outdoor lighting winterization: inspect fixtures before daylight saving ends', 'Check exterior outlet covers — DFW rains in fall can damage unprotected outlets', 'Test landscape lighting timers and adjust for shorter daylight hours', 'Inspect panel for any signs of heat stress from summer peak loads'] },
  { id: '12', label: 'December', actions: ['Holiday lighting safety check: no more than 3 extension cords chained', 'Check for overloaded circuits — holiday decor is a common cause of tripped breakers', 'If using space heaters, verify circuit can handle load (don\'t share with other appliances)', 'Have an electrician inspect any panel that\'s 25+ years old before heavy winter load'] },
];

export default function DFWElectricalMonthByMonth2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const month = months.find(m => m.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>DFW Electrical Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Month-by-Month Electrical Care for DFW</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', lineHeight: 1.6 }}>DFW's electrical calendar runs from January CO detector checks through ERCOT summer surge risks to December holiday circuit overloads. Stay on top of each season's distinct electrical priorities.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>⚡ DFW Electrical Risk Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['January', 'CO + smoke detector test', '🔋'], ['May–Jun', 'Pool GFCI season', '🏊'], ['Jun–Sep', 'ERCOT surge risk', '⚡'], ['October', 'Outdoor fixture winterization', '🌧️'], ['December', 'Holiday circuit overload', '🎄']].map(([period, risk, icon]) => (
              <div key={period} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: '1.2rem' }}>{icon} <span style={{ color: '#F5E642', fontWeight: 700 }}>{period}</span></div>
                <div style={{ fontSize: '0.85rem', color: '#C5CAD8', marginTop: '0.25rem' }}>{risk}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Select Your Month → Electrical Action Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {months.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)} style={{ background: selected === m.id ? '#F5E642' : '#0A1628', color: selected === m.id ? '#0A1628' : '#E8EAF0', border: '1px solid #F5E642', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>{m.label}</button>
            ))}
          </div>
          {month && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🔌 {month.label} Electrical Actions</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8' }}>
                {month.actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🚨 Call an Electrician Immediately If</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8' }}>
            <li>Breaker trips repeatedly for the same circuit</li>
            <li>Burning smell from any outlet, switch, or panel</li>
            <li>Lights flicker during high-draw appliance use</li>
            <li>GFCI near pool or exterior won't reset</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', color: '#9BA3B2', fontSize: '0.85rem' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — Licensed DFW electricians, vetted and ready
        </div>
      </div>
    </div>
  );
}