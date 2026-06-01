import { useState } from 'react';

const SYSTEMS = [
  { id: 'hvac', label: '❄️ HVAC', color: '#3B82F6' },
  { id: 'plumbing', label: '🔧 Plumbing', color: '#10B981' },
  { id: 'electrical', label: '⚡ Electrical', color: '#F59E0B' },
  { id: 'roofing', label: '🏠 Roofing', color: '#EF4444' },
  { id: 'foundation', label: '🏗️ Foundation', color: '#8B5CF6' },
  { id: 'pest', label: '🐛 Pest Control', color: '#EC4899' },
];

const CALENDAR: Record<string, Record<string, string>> = {
  Jan: { hvac: 'Replace filters, check heat pump', plumbing: 'Insulate pipes for freezes', electrical: 'Test GFCI outlets', roofing: 'Inspect for ice damage', foundation: 'Check drainage after rain', pest: 'Rodent exclusion check' },
  Feb: { hvac: 'Schedule spring AC tune-up', plumbing: 'Flush water heater', electrical: 'Check smoke detectors', roofing: 'Clear debris from valleys', foundation: 'Monitor soil moisture', pest: 'Termite inspection due' },
  Mar: { hvac: 'AC tune-up before heat', plumbing: 'Check outdoor faucets', electrical: 'Panel inspection', roofing: 'Hail season prep', foundation: 'Pre-summer moisture check', pest: 'Fire ant treatment' },
  Apr: { hvac: 'Clean condenser coils', plumbing: 'Irrigation system start', electrical: 'Test ceiling fans', roofing: 'Inspect flashing & seals', foundation: 'Check for new cracks', pest: 'Mosquito treatment' },
  May: { hvac: 'Set 78°F summer schedule', plumbing: 'Check slab for leaks', electrical: 'Outdoor outlet safety', roofing: 'Storm season readiness', foundation: 'Watering program start', pest: 'Ant & spider barrier' },
  Jun: { hvac: 'Monitor coolant levels', plumbing: 'Water softener service', electrical: 'AC circuit load check', roofing: 'Post-storm inspection', foundation: 'Consistent watering critical', pest: 'Mosquito & flea peak' },
  Jul: { hvac: 'Filter every 30 days', plumbing: 'Water pressure check', electrical: 'Check attic wiring heat', roofing: 'UV damage inspection', foundation: 'Drought watering max', pest: 'Wasp nest removal' },
  Aug: { hvac: 'Drain line flush', plumbing: 'Water heater efficiency', electrical: 'Surge protector check', roofing: 'Attic ventilation check', foundation: 'Soil gap monitoring', pest: 'Flea peak treatment' },
  Sep: { hvac: 'Schedule fall heating check', plumbing: 'Outdoor faucet shutoff prep', electrical: 'Holiday light safety prep', roofing: 'Pre-winter inspection', foundation: 'Post-summer crack review', pest: 'Rodent prevention' },
  Oct: { hvac: 'Heating system tune-up', plumbing: 'Drain irrigation system', electrical: 'Check heating circuits', roofing: 'Gutter cleaning', foundation: 'Reduce watering slowly', pest: 'Winter pest exclusion' },
  Nov: { hvac: 'Switch to heat mode', plumbing: 'Freeze prep for pipes', electrical: 'Test carbon monoxide detectors', roofing: 'Check attic insulation', foundation: 'Pre-winter moisture balance', pest: 'Termite prevention treat' },
  Dec: { hvac: 'Emergency heat test', plumbing: 'Know your shutoff valve', electrical: 'Holiday load safety', roofing: 'Freeze damage watch', foundation: 'Winter dormancy check', pest: 'Rodent trap check' },
};

export default function DFWHVACAllSystemsCalendar() {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  const months = Object.keys(CALENDAR);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F5E642' }}>🏠 DFW Annual Home Systems Calendar</div>
          <div style={{ color: '#94A3B8', marginTop: '.5rem' }}>12-month care plan for all 6 major systems — built for North Texas conditions</div>
        </div>

        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {SYSTEMS.map(s => (
            <button key={s.id} onClick={() => setActiveSystem(activeSystem === s.id ? null : s.id)}
              style={{ padding: '.5rem 1.25rem', borderRadius: 999, border: 'none', background: activeSystem === s.id ? s.color + '22' : '#0F2035', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '.9rem' }}>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {months.map(month => (
            <div key={month} style={{ background: '#0F2035', borderRadius: 12, padding: '1.25rem', border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#F5E642', marginBottom: '.75rem' }}>{month}</div>
              {SYSTEMS.filter(s => !activeSystem || s.id === activeSystem).map(s => (
                <div key={s.id} style={{ display: 'flex', gap: '.5rem', marginBottom: '.4rem', opacity: activeSystem && activeSystem !== s.id ? 0.3 : 1 }}>
                  <span style={{ fontSize: '.75rem', color: s.color, fontWeight: 700, minWidth: 80 }}>{s.label.split(' ')[1]}</span>
                  <span style={{ fontSize: '.78rem', color: '#CBD5E1' }}>{CALENDAR[month][s.id]}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1rem', background: '#0F2035', borderRadius: 12, border: '1px solid #F5E642' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>🔗 ProLnk Tip:</span>
          <span style={{ color: '#CBD5E1', marginLeft: '.5rem' }}>Tap any month task to instantly match with a vetted DFW pro on ProLnk.</span>
        </div>
      </div>
    </div>
  );
}
