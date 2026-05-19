import { useState } from 'react';

export default function DFWSummerPreventiveMaintenance2026() {
  const [hasPool, setHasPool] = useState(false);
  const [hasIrrigation, setHasIrrigation] = useState(true);
  const [hvacAge, setHvacAge] = useState(8);
  const [atticInsulated, setAtticInsulated] = useState(true);

  type CheckItem = { task: string; cost: string; priority: 'critical' | 'high' | 'medium'; icon: string };

  const baseItems: CheckItem[] = [
    { task: 'HVAC tune-up + filter replacement', cost: '$150–$280', priority: 'critical', icon: '❄️' },
    { task: 'Condensate drain pan flush & bleach', cost: '$0–$50 DIY', priority: 'critical', icon: '🚿' },
    { task: 'Attic temp check (should be <140°F)', cost: '$0 DIY', priority: 'high', icon: '🌡️' },
    { task: 'Outdoor faucet & hose bib inspection', cost: '$0–$80', priority: 'medium', icon: '🔩' },
    { task: 'Window/door weatherstripping check', cost: '$30–$120', priority: 'high', icon: '🪟' },
    { task: 'Roof inspection for hail/storm damage', cost: '$150–$350', priority: 'high', icon: '🏠' },
    { task: 'Gutters clean + downspout extensions', cost: '$100–$250', priority: 'medium', icon: '🍃' },
    { task: 'Foundation perimeter watering check', cost: '$0–$200', priority: 'critical', icon: '🏗️' },
  ];

  const poolItems: CheckItem[] = [
    { task: 'Pool chemistry balance + algae prevention', cost: '$80–$160', priority: 'critical', icon: '🏊' },
    { task: 'Pool pump & filter inspection', cost: '$150–$400', priority: 'high', icon: '⚙️' },
    { task: 'Pool decking crack inspection', cost: '$0–$300', priority: 'medium', icon: '🔍' },
  ];

  const irrigationItems: CheckItem[] = [
    { task: 'Irrigation system test all zones', cost: '$75–$150', priority: 'high', icon: '💧' },
    { task: 'Sprinkler head adjustment for DFW heat', cost: '$50–$200', priority: 'medium', icon: '🌱' },
  ];

  const oldHvacItems: CheckItem[] = hvacAge > 12
    ? [{ task: 'HVAC replacement quote (10+ yr units fail in summer)', cost: '$6,500–$14,000', priority: 'critical', icon: '⚠️' }]
    : [];

  const atticItems: CheckItem[] = !atticInsulated
    ? [{ task: 'Radiant barrier installation before peak heat', cost: '$1,500–$3,500', priority: 'critical', icon: '☀️' }]
    : [];

  const allItems = [...baseItems, ...(hasPool ? poolItems : []), ...(hasIrrigation ? irrigationItems : []), ...oldHvacItems, ...atticItems];
  const sortOrder = { critical: 0, high: 1, medium: 2 };
  const sorted = [...allItems].sort((a, b) => sortOrder[a.priority] - sortOrder[b.priority]);
  const priorityColors = { critical: '#E55555', high: '#E59000', medium: '#5599CC' };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>☀️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Summer Preventive Maintenance 2026</h1>
          <p style={{ color: '#8899BB', fontSize: 14 }}>Personalized checklist before DFW temps hit 100°F+</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>Your Home Features</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[
              ['🏊 Pool', hasPool, setHasPool],
              ['💧 Irrigation System', hasIrrigation, setHasIrrigation],
              ['🏠 Attic Insulated', atticInsulated, setAtticInsulated],
            ].map(([label, val, setter]) => (
              <button key={label as string} onClick={() => (setter as (v: boolean) => void)(!val as boolean)}
                style={{ padding: '10px', background: val ? '#F5E642′ : '#1A2A45', color: val ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                {label as string}: {val ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>HVAC Age: {hvacAge} years</div>
          <input type="range" min={1} max={25} value={hvacAge} onChange={e => setHvacAge(+e.target.value)}
            style={{ width: '100%', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8899BB', fontSize: 12 }}><span>New</span><span>25 yrs</span></div>
        </div>

        <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Your {sorted.length}-Item Summer Checklist</div>
        {sorted.map((item, i) => (
          <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '14px 16px', marginBottom: 10,
            borderLeft: `4px solid ${priorityColors[item.priority]}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: '#fff' }}>{item.task}</span>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                <div style={{ color: '#F5E642', fontSize: 12 }}>{item.cost}</div>
                <div style={{ color: priorityColors[item.priority], fontSize: 11, textTransform: 'uppercase', fontWeight: 700 }}>{item.priority}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

