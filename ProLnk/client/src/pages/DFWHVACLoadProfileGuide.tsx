import { useState } from 'react';

const timeBlocks = [
  { time: '6am–9am', label: 'Morning Warm-Up', pct: 18, color: '#F59E0B', desc: 'Home warms from overnight setback. AC turns on 7-8am as outdoor temp climbs from 75°F to 85°F. Moderate load.' },
  { time: '9am–12pm', label: 'Mid-Morning Build', pct: 28, color: '#EF4444', desc: 'Sun angle increases. West and south walls absorb solar gain. Attic temp begins climbing toward 130°F+.' },
  { time: '12pm–3pm', label: 'Afternoon Ramp', pct: 45, color: '#DC2626', desc: 'Peak solar gain. DFW homes hit max heat load. Attic radiates heat into living space. AC fights hardest here.' },
  { time: '3pm–6pm', label: 'Peak Load', pct: 60, color: '#B91C1C', desc: 'Hottest outdoor temp (100°F+). All heat sources converge: solar, outdoor air, internal gains. Peak demand period. AC may run continuously.' },
  { time: '6pm–9pm', label: 'Slow Cool-Down', pct: 38, color: '#EF4444', desc: 'Sun sets but outdoor temp stays 90°F+. Attic releases stored heat into home. AC still running hard despite sunset.' },
  { time: '9pm–12am', label: 'Recovery', pct: 20, color: '#F59E0B', desc: 'Outdoor temp drops to 80°F. Home begins recovering. AC cycles less. Good time to run appliances.' },
  { time: '12am–6am', label: 'Night Minimum', pct: 8, color: '#10B981', desc: 'Lowest load. Outdoor temp 75-78°F. AC may cycle only 15-20 min/hr. Home stores coolth for morning.' },
];

const orientations: Record<string, { peak: string; worst: string; strategy: string }> = {
  'North-South (garage north, living south)': {
    peak: '1–4pm',
    worst: 'South-facing living areas absorb direct sun all afternoon',
    strategy: 'Exterior solar shades on south windows cut load 30%. Attic radiant barrier critical for this orientation.',
  },
  'East-West (garage east, living west)': {
    peak: '3–6pm',
    worst: 'West-facing rooms take brutal afternoon sun — worst DFW orientation',
    strategy: 'West-facing rooms may need dedicated mini-split. Motorized shades on west windows. Pre-cool these rooms by noon.',
  },
  'Corner lot (two exposed walls)': {
    peak: '2–5pm',
    worst: 'Two exterior walls exposed means 25-35% higher load than interior lots',
    strategy: 'Zoning system recommended. Exterior insulation upgrade pays back in 4-6 years at DFW rates.',
  },
  'Interior lot (shaded by neighbors)': {
    peak: '1–3pm',
    worst: 'Less severe than exposed lots but attic still hits 130°F+',
    strategy: 'Focus on attic insulation (R-38+) and radiant barrier. These give biggest bang for DFW homes.',
  },
};

export default function DFWHVACLoadProfileGuide() {
  const [orientation, setOrientation] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600 }}>📊 DFW HVAC RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>HVAC Load Profile Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 16, fontSize: 15 }}>
          DFW homes have a longer, more intense afternoon cooling peak than northern climates. Understanding your home's load profile helps right-size your system and schedule setbacks intelligently.
        </p>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>⏱️ Typical DFW Summer Day — Cooling Load by Hour</h2>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>100°F design day, 2,000 sq ft home, SEER 16</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {timeBlocks.map(b => (
              <div key={b.time} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ minWidth: 90, fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>{b.time}</div>
                  <div style={{ flex: 1, background: '#0F2240', borderRadius: 4, height: 14, overflow: 'hidden' }}>
                    <div style={{ width: , background: b.color, height: '100%', borderRadius: 4 }} />
                  </div>
                  <div style={{ minWidth: 36, fontSize: 13, fontWeight: 700, color: b.color }}>{b.pct}%</div>
                </div>
                <div style={{ fontSize: 12, color: '#CBD5E1', paddingLeft: 102 }}><strong style={{ color: b.color }}>{b.label}:</strong> {b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642' }}>🧭 My Home's Load Profile by Orientation</h2>
          <select value={orientation} onChange={e => setOrientation(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>
            <option value=>Select your lot orientation...</option>
            {Object.keys(orientations).map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {orientation && orientations[orientation] && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Peak window: </span><span style={{ color: '#CBD5E1' }}>{orientations[orientation].peak}</span></div>
              <div><span style={{ color: '#EF4444', fontWeight: 700 }}>Challenge: </span><span style={{ color: '#CBD5E1' }}>{orientations[orientation].worst}</span></div>
              <div><span style={{ color: '#10B981', fontWeight: 700 }}>Strategy: </span><span style={{ color: '#CBD5E1' }}>{orientations[orientation].strategy}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
