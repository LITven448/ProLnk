import { useState } from 'react';

const TRADES = {
  hvac: { label: 'HVAC', color: '#4FC3F7', emoji: '❄️' },
  plumbing: { label: 'Plumbing', color: '#4DB6AC', emoji: '🔧' },
  electrical: { label: 'Electrical', color: '#FFD54F', emoji: '⚡' },
  landscaping: { label: 'Landscaping', color: '#81C784', emoji: '🌿' },
  roofing: { label: 'Roofing', color: '#CE93D8', emoji: '🏠' },
  general: { label: 'General', color: '#FF8A65', emoji: '🛠️' },
};

const CALENDAR = {
  1: { name: 'January', tasks: [{ trade: 'hvac', text: 'Replace HVAC filter — high usage month' }, { trade: 'plumbing', text: 'Insulate exposed pipes from rare DFW freezes' }, { trade: 'general', text: 'Test smoke and CO detectors' }] },
  2: { name: 'February', tasks: [{ trade: 'hvac', text: 'Schedule spring AC tune-up now (before rush)' }, { trade: 'general', text: 'Check attic insulation before heat returns' }, { trade: 'landscaping', text: 'Prune dormant trees and shrubs' }] },
  3: { name: 'March', tasks: [{ trade: 'landscaping', text: 'Activate and test sprinkler system' }, { trade: 'hvac', text: 'Clean AC condenser coils and fins' }, { trade: 'roofing', text: 'Inspect roof after winter storms' }] },
  4: { name: 'April', tasks: [{ trade: 'hvac', text: 'AC tune-up — coolant, coils, drain line' }, { trade: 'general', text: 'Deep clean gutters before spring storms' }, { trade: 'landscaping', text: 'Fertilize lawn — DFW grass wakes up now' }] },
  5: { name: 'May', tasks: [{ trade: 'electrical', text: 'Test all outdoor GFCIs before pool season' }, { trade: 'plumbing', text: 'Check outdoor hose bibs for leaks' }, { trade: 'general', text: 'Seal driveway cracks before summer heat' }] },
  6: { name: 'June', tasks: [{ trade: 'hvac', text: 'Check AC drain line — DFW humidity clogs it' }, { trade: 'landscaping', text: 'Adjust sprinklers to summer schedule' }, { trade: 'general', text: 'Inspect window caulking for summer air loss' }] },
  7: { name: 'July', tasks: [{ trade: 'hvac', text: 'Replace filter — peak cooling demand' }, { trade: 'general', text: 'Check foundation for clay-shift cracks' }, { trade: 'plumbing', text: 'Run water softener maintenance cycle' }] },
  8: { name: 'August', tasks: [{ trade: 'hvac', text: 'Monitor AC performance in peak heat' }, { trade: 'landscaping', text: 'Deep water trees to prevent drought stress' }, { trade: 'general', text: 'Check attic ventilation — keeps AC costs down' }] },
  9: { name: 'September', tasks: [{ trade: 'hvac', text: 'Schedule fall heating tune-up' }, { trade: 'roofing', text: 'Inspect and clean gutters before fall leaves' }, { trade: 'landscaping', text: 'Overseed lawn for fall green-up' }] },
  10: { name: 'October', tasks: [{ trade: 'hvac', text: 'Switch to heating mode — test furnace now' }, { trade: 'plumbing', text: 'Flush water heater sediment' }, { trade: 'general', text: 'Check weatherstripping on all doors' }] },
  11: { name: 'November', tasks: [{ trade: 'plumbing', text: 'Know your main shutoff location for freeze prep' }, { trade: 'landscaping', text: 'Winterize irrigation system' }, { trade: 'general', text: 'Stock emergency supplies for ice storms' }] },
  12: { name: 'December', tasks: [{ trade: 'hvac', text: 'Replace HVAC filter — heating season peak' }, { trade: 'electrical', text: 'Check holiday lighting circuits — avoid overloads' }, { trade: 'general', text: 'Annual home safety walkthrough' }] },
};

export default function DFWHomeMaintenanceCalendarApp() {
  const [selected, setSelected] = useState(new Date().getMonth() + 1);
  const [filter, setFilter] = useState('all');
  const [features, setFeatures] = useState([]);

  const month = CALENDAR[selected];
  const filtered = month.tasks.filter(t => filter === 'all' || t.trade === filter);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '24px' }}>
      <h1 style={{ color: '#F5E642', fontSize: '1.6rem', marginBottom: 4 }}>📅 DFW Home Maintenance Calendar</h1>
      <p style={{ color: '#8899AA', marginBottom: 20 }}>Click any month — see what to do and why in DFW</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 20 }}>
        {Object.entries(CALENDAR).map(([m, { name }]) => (
          <button key={m} onClick={() => setSelected(Number(m))} style={{ padding: '8px 4px', borderRadius: 8, border: 'none', cursor: 'pointer', background: selected === Number(m) ? '#F5E642' : '#0D1F35', color: selected === Number(m) ? '#0A1628' : '#aaa', fontWeight: 600, fontSize: '0.75rem' }}>
            {name.slice(0, 3)}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <button onClick={() => setFilter('all')} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', background: filter === 'all' ? '#F5E642' : '#1C2E45', color: filter === 'all' ? '#0A1628' : '#aaa', fontSize: '0.8rem' }}>All trades</button>
        {Object.entries(TRADES).map(([key, { label, emoji }]) => (
          <button key={key} onClick={() => setFilter(filter === key ? 'all' : key)} style={{ padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', background: filter === key ? '#F5E642' : '#1C2E45', color: filter === key ? '#0A1628' : '#aaa', fontSize: '0.8rem' }}>
            {emoji} {label}
          </button>
        ))}
      </div>

      <div style={{ background: '#0D1F35', borderRadius: 12, padding: 20 }}>
        <h2 style={{ color: '#F5E642', fontSize: '1.3rem', marginBottom: 16 }}>{month.name} Tasks</h2>
        {filtered.map((task, i) => {
          const trade = TRADES[task.trade];
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: '#0A1628', borderRadius: 8, padding: '12px 14px', marginBottom: 8, borderLeft: '3px solid ' + trade.color }}>
              <span style={{ fontSize: '1.2rem' }}>{trade.emoji}</span>
              <div>
                <div style={{ color: trade.color, fontSize: '0.75rem', fontWeight: 600, marginBottom: 2 }}>{trade.label}</div>
                <div style={{ color: '#ddd' }}>{task.text}</div>
              </div>
            </div>
          );
        })}
        {!filtered.length && <p style={{ color: '#8899AA' }}>No tasks match this filter for {month.name}.</p>}
      </div>
    </div>
  );
}
