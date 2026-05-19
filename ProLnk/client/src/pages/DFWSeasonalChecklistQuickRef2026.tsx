import { useState } from 'react';

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const seasonMap: Record<string,string> = {
  Jan:'Winter',Feb:'Winter',Mar:'Spring',Apr:'Spring',May:'Spring',
  Jun:'Summer',Jul:'Summer',Aug:'Summer',Sep:'Fall',Oct:'Fall',Nov:'Fall',Dec:'Winter'
};

const seasons = [
  {
    name: 'Spring',
    icon: '🌸',
    months: 'Mar – May',
    color: '#4ade80',
    tasks: [
      { icon: '❄️', task: 'AC tune-up — schedule before May heat spike' },
      { icon: '💧', task: 'Irrigation system startup & head inspection' },
      { icon: '🏠', task: 'Roof inspection after winter hail season' },
      { icon: '🪟', task: 'Window & door caulk check — reseal gaps' },
      { icon: '🌿', task: 'Foundation check — soil moisture after rains' },
    ],
  },
  {
    name: 'Summer',
    icon: '☀️',
    months: 'Jun – Aug',
    color: '#facc15',
    tasks: [
      { icon: '🔄', task: 'Change AC filter monthly (DFW dust is brutal)' },
      { icon: '💧', task: 'Flush AC condensate drain — algae blockage risk' },
      { icon: '🌱', task: 'Foundation watering — prevent pier movement in clay' },
      { icon: '🏊', task: 'Pool equipment check — pump, filter, chlorine levels' },
      { icon: '🌡️', task: 'Attic insulation check — heat gain increases utility bills' },
    ],
  },
  {
    name: 'Fall',
    icon: '🍂',
    months: 'Sep – Nov',
    color: '#fb923c',
    tasks: [
      { icon: '🔥', task: 'HVAC heating mode check before first cold snap' },
      { icon: '🍃', task: 'Gutter cleaning — oak leaves clog fast in Oct/Nov' },
      { icon: '🪟', task: 'Exterior caulk & weatherstrip before winter' },
      { icon: '💧', task: 'Irrigation winterization — drain lines by Nov 15′ },
      { icon: '🏠', task: 'Chimney inspection if you have a fireplace' },
    ],
  },
  {
    name: 'Winter',
    icon: '❄️',
    months: 'Dec – Feb',
    color: '#7dd3fc',
    tasks: [
      { icon: '🌡️', task: 'Insulate exposed pipes — Uri proved DFW pipes freeze' },
      { icon: '🔥', task: 'Furnace filter replacement every 90 days' },
      { icon: '🚿', task: 'Know your water shutoff location before a freeze' },
      { icon: '💡', task: 'Test smoke & CO detectors — heating season risk' },
      { icon: '🏠', task: 'Check attic hatch insulation — biggest heat loss point' },
    ],
  },
];

export default function DFWSeasonalChecklistQuickRef2026() {
  const now = new Date();
  const currentMonth = months[now.getMonth()];
  const defaultSeason = seasonMap[currentMonth];
  const [selected, setSelected] = useState<string>(defaultSeason);

  const season = seasons.find(s => s.name === selected)!;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>DFW Seasonal Home Checklist 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Current season auto-selected — tap any season to explore</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px', marginBottom: '28px' }}>
          {seasons.map(s => (
            <button key={s.name} onClick={() => setSelected(s.name)}
              style={{ backgroundColor: selected === s.name ? '#1a2f4a' : '#0f2035', border: selected === s.name ? `2px solid ${s.color}` : '2px solid #1e3a5f', borderRadius: '10px', padding: '16px 8px', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: '26px', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ color: selected === s.name ? s.color : '#94a3b8', fontWeight: '700', fontSize: '13px' }}>{s.name}</div>
              <div style={{ color: '#475569', fontSize: '10px', marginTop: '2px' }}>{s.months}</div>
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#0f2035', border: `2px solid ${season.color}`, borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '32px' }}>{season.icon}</span>
            <div>
              <h2 style={{ color: season.color, fontSize: '20px', margin: 0, fontWeight: '700′ }}>{season.name} Checklist</h2>
              <div style={{ color: '#475569', fontSize: '13px' }}>{season.months} • DFW-specific tasks</div>
            </div>
          </div>
          {season.tasks.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start', padding: '10px', backgroundColor: '#0A1628', borderRadius: '8px' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{t.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5′ }}>{t.task}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#475569', fontSize: '12px' }}>
          Need a pro for any of these? Find vetted DFW contractors at prolnk.io
        </div>
      </div>
    </div>
  );
}