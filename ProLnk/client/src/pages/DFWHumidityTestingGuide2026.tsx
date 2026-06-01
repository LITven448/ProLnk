import { useState } from 'react';

const seasons = ['Summer', 'Fall', 'Winter', 'Spring'];
const actions: Record<string, Record<string, string>> = {
  Summer: {
    Low: '✅ Ideal — AC is dehumidifying well. No action needed.',
    Normal: '✅ Good range. Monitor weekly during peak heat.',
    High: '⚠️ AC not keeping up. Check filter, schedule HVAC tune-up.',
  },
  Fall: {
    Low: '⚠️ Dropping fast — consider a whole-home humidifier.',
    Normal: '✅ Seasonal transition is stable.',
    High: '⚠️ Muggy fall — check attic ventilation and crawl space.',
  },
  Winter: {
    Low: '🔴 Too dry — air sealing needed. Cracked wood, static electricity.',
    Normal: '✅ Well-sealed home. Keep monitoring.',
    High: '⚠️ Condensation risk on windows — check for vapor barrier issues.',
  },
  Spring: {
    Low: '✅ Dry spring is fine for DFW. Watch as temps rise.',
    Normal: '✅ Good range for spring.',
    High: '⚠️ Spring storms pushing moisture in — run AC or dehumidifier.',
  },
};

export default function DFWHumidityTestingGuide2026() {
  const [reading, setReading] = useState<string>('Normal');
  const [season, setSeason] = useState<string>('Summer');

  const getRange = (val: string) => {
    const n = parseInt(val);
    if (isNaN(n)) return 'Normal';
    if (n < 40) return 'Low';
    if (n > 55) return 'High';
    return 'Normal';
  };

  const range = getRange(reading);
  const advice = actions[season]?.[range] ?? 'Enter a reading and season to get guidance.';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>💧 DFW Humidity Testing Guide 2026</div>
        <div style={{ color: '#8899AA', marginBottom: '2rem' }}>Know your numbers. Protect your home.</div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🌡️ How to Test Humidity in DFW</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '📱', title: 'Digital Hygrometer ($15–30)', desc: `Most accurate. Place in bedroom, living room, and near HVAC return. Read after 30 min.` },
              { icon: '🏠', title: 'Ideal Range: 45–50% Year-Round', desc: `DFW target for comfort + mold prevention. Tighter than national average due to clay soil off-gassing.` },
              { icon: '❄️', title: 'Summer High Reads', desc: `If >55% in summer, AC is undersized or filter clogged. Schedule HVAC service before peak.` },
              { icon: '🌬️', title: 'Winter Low Reads', desc: `If <35% in winter, air leaking out. Seal attic penetrations and weatherstrip doors.` },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div><div style={{ fontWeight: 600, color: '#E8EDF5' }}>{item.title}</div><div style={{ color: '#8899AA', fontSize: '0.9rem' }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Reading + Season → Action Guide</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your Reading (%)</div>
              <input type="number" value={reading} onChange={(e) => setReading(e.target.value)} placeholder="e.g. 52" style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5', width: '120px' }} />
            </div>
            <div>
              <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Season</div>
              <select value={season} onChange={(e) => setSeason(e.target.value)} style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5' }}>
                {seasons.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#E8EDF5' }}>{advice}</div>
        </div>
      </div>
    </div>
  );
}
