import { useState } from 'react';

export default function DFWHotWaterCirculation2026() {
  const [homeSize, setHomeSize] = useState('2000-3000');
  const [waitTime, setWaitTime] = useState('30-60');
  const [guide, setGuide] = useState('');

  const sizes = [
    { value: 'under-2000', label: 'Under 2,000 sq ft' },
    { value: '2000-3000', label: '2,000–3,000 sq ft' },
    { value: '3000-4500', label: '3,000–4,500 sq ft' },
    { value: 'over-4500', label: 'Over 4,500 sq ft' },
  ];
  const waits = [
    { value: 'under-30', label: 'Under 30 seconds' },
    { value: '30-60', label: '30–60 seconds' },
    { value: '60-120', label: '1–2 minutes' },
    { value: 'over-120', label: 'Over 2 minutes' },
  ];

  const guides: Record<string, string> = {
    'under-2000-under-30': '✅ No Action Needed: Sub-30 second wait in a smaller home is within acceptable range. Your water heater placement is likely close to fixtures. Consider a tankless unit at point-of-use if you want instant hot.',
    'under-2000-30-60': '🔄 Comfort Valve: Install a Watts 500800 comfort valve at the furthest fixture (usually master bath). Pairs with your existing cold water line as return path. No dedicated return line needed. Cost: $80–$180 installed.',
    'under-2000-60-120': '⚡ On-Demand Pump: Grundfos Comfort 10-17-A with timer or button activation. Mounts at water heater. Uses cold supply as return — slightly warm cold water is the trade-off. Cost: $250–$450 installed.',
    'under-2000-over-120': '⚡ On-Demand Pump + Insulation: 2+ min wait in a small home suggests uninsulated pipes in attic or walls. Add pipe insulation first ($150–$300), then install pump. Combined: $400–$700.',
    '2000-3000-under-30': '✅ Acceptable: Mid-size DFW home with quick hot water is normal if water heater is centrally located. Only upgrade if comfort is a priority.',
    '2000-3000-30-60': '⚡ On-Demand Pump: Grundfos Comfort or Watts Premier with button activation at master bath. On-demand avoids running pump 24/7. Cost: $300–$550 installed.',
    '2000-3000-60-120': '🔄 Dedicated Return Line: 60-120 sec wait in this size usually means long pipe run. Have plumber add dedicated 3/4-in return line from far fixtures back to heater. Pair with timer-based pump. More expensive but eliminates warm cold water issue. Cost: $800–$1,800.',
    '2000-3000-over-120': '🚨 Full Recirculation System: 2+ min wait is unacceptable — install dedicated return line + Grundfos UP15-18SU circulator on timer (6–9 AM, 5–9 PM). Also check pipe insulation in attic. Cost: $1,200–$2,500.',
    '3000-4500-under-30': '✅ Well-Designed System: Your home likely already has recirculation or excellent heater placement. Document for resale value.',
    '3000-4500-30-60': '⚡ Timer Pump: Add Watts Premier circulator on programmable timer. Avoids on-demand button dependency for larger homes with multiple users. Cost: $450–$800 installed.',
    '3000-4500-60-120': '🔄 Return Line + Timer Pump: Larger DFW homes almost always benefit from dedicated return. Grundfos UP15-18SU or equivalent. Timer set to morning/evening peaks. Cost: $1,200–$2,800.',
    '3000-4500-over-120': '🚨 Multi-Zone Recirculation: Consider two water heaters (tankless at far wing) or full dedicated return loop. Plumber assessment required for custom layout. Cost: $2,500–$6,000.',
    'over-4500-under-30': '✅ Excellent: 4,500+ sq ft home with fast hot water means you have a functioning recirculation system. Maintain pump annually.',
    'over-4500-30-60': '🔄 Upgrade Pump: Likely have aging recirculation. Replace pump with Grundfos Comfort 15-14BU. Dedicated return line should already exist. Cost: $400–$700 pump replacement.',
    'over-4500-60-120': '🚨 System Audit: Large home with 1-2 min wait suggests pump failure or inadequate return line. Have plumber audit full system. Cost: $150 audit + repair quote.',
    'over-4500-over-120': '🚨 Full System Redesign: 2+ min in a large DFW home = recirculation absent or failed. Dedicated multi-zone return loop + two Grundfos pumps + tankless at far wing. Plumber design required. Cost: $4,000–$12,000.',
  };

  const getGuide = () => setGuide(guides[`${homeSize}-${waitTime}`] || 'Select options above.');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>♨️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Hot Water Recirculation Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Eliminating Cold Water Wait in DFW Homes — Grundfos, Watts &amp; Return Line Systems</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          {[
            { icon: '⚡', title: 'On-Demand Pump', body: 'Button or motion-activated — runs pump only when triggered. Uses cold supply as return path. Slightly warm cold water trade-off. Best for smaller homes or budget-conscious upgrades.', cost: '$250–$600′ },
            { icon: '⏱️', title: 'Timer-Based Pump', body: 'Runs recirculation on programmed schedule (mornings, evenings). More energy use than on-demand but consistent hot water availability during peak times. Good for families with predictable schedules.', cost: '$350–$800′ },
            { icon: '🔄', title: 'Dedicated Return Line', body: '3/4-in pipe returns hot water from far fixtures back to heater — eliminates warm cold water issue. Best performance, higher install cost. Standard in luxury DFW homes.', cost: '$800–$2,500′ },
            { icon: '🔥', title: 'Point-of-Use Tankless', body: 'Small electric tankless unit installed at far fixture (master bath). Delivers instant hot water at that location regardless of main heater distance. Supplemental solution for far wings.', cost: '$600–$1,200′ },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 8 }}>{c.cost}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧭 Recirculation Solution Finder</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {sizes.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Hot Water Wait Time</label>
              <select value={waitTime} onChange={e => setWaitTime(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {waits.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>Get Solution Guide</button>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7, border: '1px solid #F5E642′ }}>{guide}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>ProLnk — DFW Hot Water Recirculation Guide 2026</p>
      </div>
    </div>
  );
}
