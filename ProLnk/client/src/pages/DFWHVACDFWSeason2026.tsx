import { useState } from 'react';

const seasons = [
  {
    name: 'Pre-Season Prep',
    dates: 'March 1 – April 14',
    emoji: '🔧',
    color: '#22c55e',
    description: 'The critical window before cooling season. DFW temps swing 40–80°F daily. Use this time for tune-ups before pro schedules fill up.',
    tasks: ['Schedule AC tune-up (book by March 15 — slots fill fast)', 'Replace filters with MERV 8–11 rated media', 'Test thermostat and calibrate setpoints', 'Clear condensate drain lines from winter debris', 'Check refrigerant charge and inspect coils'],
    warning: 'Waiting until April means 4-6 week wait times. Book now.',
  },
  {
    name: 'Cooling Season Opens',
    dates: 'April 15 – May 31',
    emoji: '🌤️',
    color: '#f59e0b',
    description: 'Cooling season officially begins in DFW around April 15. Temps regularly hit 80–90°F. Systems start running daily. Early failures spike as dormant equipment activates.',
    tasks: ['First run test after winter — listen for unusual sounds', 'Verify thermostat cooling mode operation', 'Check all supply and return vents are unobstructed', 'Inspect outdoor unit for winter debris buildup', 'Note any unusual energy bill spikes'],
    warning: 'Most spring failures happen week 1 of operation. Monitor closely.',
  },
  {
    name: 'Peak Summer',
    dates: 'June 1 – September 15',
    emoji: '☀️',
    color: '#ef4444',
    description: 'DFW peak: 95–105°F daily highs, 75°F overnight lows, 50–70% humidity. Systems run 12-18 hours/day. Capacitor, contactor, and drain line failures peak in this window.',
    tasks: ['Check drain line weekly — algae clogs accelerate in heat', 'Keep outdoor unit clear of vegetation (18 inches clearance)', 'Change filter every 30 days (not 90)', 'Set thermostat no lower than 72°F (75°F when away)', 'Know your HVAC pro contact before you need them at 10pm'],
    warning: 'Emergency calls in July-August cost 2-3x normal rates.',
  },
  {
    name: 'Shoulder Season',
    dates: 'September 16 – November 14',
    emoji: '🍂',
    color: '#8b5cf6',
    description: 'DFW shoulder season is unpredictable — 90°F one week, 50°F the next. Both heating and cooling see use. Perfect time for full system inspection while demand is lower.',
    tasks: ['Schedule fall tune-up and heating system check', 'Inspect heat exchanger for cracks (critical for gas furnaces)', 'Test emergency heat on heat pumps', 'Check weather stripping and seal duct leaks', 'Flush water heater and inspect HVAC-related plumbing'],
    warning: 'Book fall tune-ups in September — October slots book fast.',
  },
  {
    name: 'Heating Season',
    dates: 'November 15 – March 31',
    emoji: '❄️',
    color: '#3b82f6',
    description: 'DFW heating season is brief but intense. Winter storms (like Uri) can drop temps to 0°F. Heat pumps struggle below 25°F — auxiliary heat must be verified annually.',
    tasks: ['Test furnace/heat pump in October before cold arrives', 'Verify auxiliary electric heat strips are operational', 'Insulate outdoor refrigerant lines (north-facing units)', 'Keep outdoor unit clear of ice — never chip ice off coils', 'Know the signs of carbon monoxide from cracked heat exchangers'],
    warning: 'DFW heat wave failure lesson: prepare heating before first cold snap.',
  },
];

export default function DFWHVACDFWSeason2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const season = selected !== null ? seasons[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW HVAC Season Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 32px' }}>
          DFW HVAC follows a predictable seasonal pattern. Knowing when each season starts and what to do lets you stay ahead of failures and avoid emergency call rates.
        </p>

        <div style={{ display: 'flex', gap: 0, background: '#1e293b', borderRadius: 10, overflow: 'hidden', marginBottom: 28 }}>
          {seasons.map((s, i) => (
            <div key={i} style={{ flex: 1, background: s.color, padding: '6px 4px', textAlign: 'center', fontSize: 10, color: '#fff', fontWeight: 700 }}>
              <div style={{ fontSize: 16 }}>{s.emoji}</div>
              <div>{s.name.split(' ')[0]}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Select your target season to see what to prepare and timing:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {seasons.map((s, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#1e293b', color: selected === i ? '#0A1628' : '#cbd5e1', border: '1px solid ' + (selected === i ? '#F5E642' : '#334155'), borderRadius: 8, padding: '12px 14px', cursor: ’pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>

        {season && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{season.emoji} {season.name}</div>
              <div style={{ background: '#0f172a', borderRadius: 6, padding: '4px 10px', color: '#94a3b8', fontSize: 12 }}>{season.dates}</div>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: 14, margin: '0 0 16px', lineHeight: 1.6 }}>{season.description}</p>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>Checklist:</div>
            <ul style={{ margin: '0 0 16px', paddingLeft: 18 }}>
              {season.tasks.map((t, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{t}</li>)}
            </ul>
            <div style={{ background: '#7c2d12', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 13 }}>
              Warning: {season.warning}
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>ProLnk DFW HVAC Pros Available Year-Round</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Seasonal prep done right means fewer emergency calls. ProLnk connects you with vetted DFW HVAC pros before and during every season — not just when things break.
          </p>
        </div>
      </div>
    </div>
  );
}
