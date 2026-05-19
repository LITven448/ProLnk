import { useState } from 'react';

const situations = [
  { id: 'no-heat', label: '❄️ Heat stopped working', guide: ['Call emergency HVAC immediately — DFW pros in Charter queue available now', 'Check thermostat is set to HEAT and temp above 68°F', 'Inspect circuit breaker for furnace and air handler', 'Check filter — clogged filter triggers furnace shutoff', 'Know your emergency shutoff: red switch near furnace, usually on wall'] },
  { id: 'prep-oct', label: '🍂 Preparing in October', guide: ['Run furnace on HEAT for 15 min — smoke smell is normal first run, burning dust', 'Check heat strips: set to emergency heat, verify warm air from vents', 'Inspect heat pump: listen for refrigerant hiss, watch for ice buildup in defrost', 'Replace filter before first furnace run — dirty filter = reduced airflow = cracked heat exchanger', 'Schedule Charter pro inspection before first hard freeze (typically late November in DFW)'] },
  { id: 'freeze-night', label: '🥶 Freeze night incoming (< 28°F)', guide: ['Set thermostat to 68°F minimum — below this, heat pump efficiency drops sharply', 'Switch to emergency heat if outdoor temp below 35°F — heat pump works poorly under 35°F', 'Verify heat strips work: feel vents for warm (not hot) air within 5 min of switching', 'Protect outdoor heat pump unit: remove debris, ensure clearance, do NOT cover the unit', 'Know your emergency shutoff location in case of malfunction overnight'] },
  { id: 'defrost', label: '🌫️ Heat pump icing up', guide: ['Brief ice on heat pump coil is normal — defrost cycle runs every 30-90 min', 'Heat pump goes into defrost: outdoor fan stops, indoor unit blows cool air for 2-10 min', 'If ice covers entire unit and never clears: low refrigerant or defrost board failure', 'Switch to emergency heat immediately if full icing occurs — call Charter pro', 'DFW heat pumps average 10-15 defrost cycles per winter — more cycles = refrigerant check needed'] },
];

export default function DFWHVACDFWWinter2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = situations.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌡️</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#F5E642', margin: '0 0 0.5rem' }}>DFW HVAC Winter Readiness Guide 2026</h1>
          <p style={{ color: '#9CA3AF', margin: 0, fontSize: '0.95rem' }}>DFW averages 10–15 freeze nights per year. Prepare in October — not December.</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0, marginBottom: '1rem' }}>🔍 What is your DFW heating situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1A2A45', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: '2px solid' + (selected === s.id ? ' #F5E642' : ' #2A3A55'), borderRadius: 8, padding: '0.75rem', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {current && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '2px solid #F5E642', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0, marginBottom: '1rem' }}>❄️ Your Winter Readiness Guide</h3>
            <ul style={{ margin: 0, padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {current.guide.map((tip, i) => (
                <li key={i} style={{ color: '#CBD5E1', lineHeight: 1.5, fontSize: '0.9rem' }}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E2D4A' }}>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: '0.85rem', textAlign: 'center' }}>
            🏠 ProLnk Charter HVAC pros available in DFW — <span style={{ color: '#F5E642′ }}>join the waitlist for priority access</span>
          </p>
        </div>
      </div>
    </div>
  );
}