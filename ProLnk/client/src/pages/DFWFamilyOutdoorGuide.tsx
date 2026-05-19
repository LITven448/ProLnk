import { useState } from 'react';

const yardSizes = ['Small (under 800 sqft)', 'Medium (800–2,500 sqft)', 'Large (2,500+ sqft)'];
const childAgeGroups = ['Infants/Toddlers (0–3)', 'Young Kids (4–8)', 'Tweens (9–12)', 'Mixed ages'];
const budgetRanges = ['$2,000–$8,000', '$8,000–$20,000', '$20,000–$50,000', '$50,000+'];

interface OutdoorZone {
  zone: string;
  icon: string;
  description: string;
  cost: string;
  priority: string;
}

const getZones = (size: string, ages: string, budget: string): OutdoorZone[] => {
  const isSmall = size.includes('Small');
  const isLarge = size.includes('Large');
  const isYoung = ages.includes('0–3') || ages.includes('4–8');
  const isBigBudget = budget.includes('20,000') || budget.includes('50,000');

  const zones: OutdoorZone[] = [
    { zone: 'Shade Structure', icon: '⛺', description: 'Covered patio, pergola with shade cloth, or solid roof extension. Non-negotiable in DFW — without shade, outdoor space is unusable June–September.', cost: '$3,000–$15,000', priority: 'Critical' },
    { zone: 'Misting System', icon: '💧', description: 'High-pressure misting system drops temps 20–30°F in the outdoor zone. Can extend usable outdoor time from 6 months to 10 months per year in DFW.', cost: '$800–$2,500 installed', priority: 'High' },
  ];

  if (isYoung) {
    zones.push({ zone: 'Splash Pad', icon: '🌊', description: 'Ground-level spray pad with simple controls — perfect for DFW heat. Much safer than a pool for young kids. No standing water. No drowning risk.', cost: '$2,500–$8,000', priority: 'High' });
    zones.push({ zone: 'Soft Play Area', icon: '🛝', description: 'Rubber mulch or poured rubber surface under play structure. DFW clay soil gets rock-hard in summer — need impact-absorbing surface under any play equipment.', cost: '$1,500–$6,000', priority: 'High' });
  }

  if (!isSmall) {
    zones.push({ zone: 'Outdoor Dining Zone', icon: '🍽️', description: 'Shaded dining area with weather-resistant furniture, outdoor fan, and string lights. DFW evenings October–May are excellent for outdoor dining.', cost: '$1,500–$5,000', priority: 'Medium' });
  }

  if (isLarge || isBigBudget) {
    zones.push({ zone: 'Outdoor Kitchen', icon: '🔥', description: 'Built-in grill, prep area, mini-fridge, and storage. Texas outdoor kitchen season is October–May. Adds resale value in DFW market.', cost: '$8,000–$30,000', priority: 'Medium' });
    zones.push({ zone: 'Cooling Mist Fans', icon: '🌀', description: 'Industrial misting fans at seating areas. Combines air movement with fine mist for maximum cooling effect. Portable units available.', cost: '$200–$800 per unit', priority: 'Medium' });
  }

  zones.push({ zone: 'Turf / Hardscape', icon: '🌿', description: 'Artificial turf for DFW clay soil is gaining popularity — no mud, year-round green, no irrigation. Alternatively, decomposed granite or concrete pavers for low-maintenance hardscape.', cost: '$8–$18/sqft installed', priority: 'Medium' });
  zones.push({ zone: 'Perimeter Lighting', icon: '💡', description: 'Path lighting and string lights extend usable evening hours. DFW spring and fall evenings are beautiful — lighting lets you enjoy them safely.', cost: '$500–$3,000', priority: 'Low' });

  return zones;
};

export default function DFWFamilyOutdoorGuide() {
  const [yardSize, setYardSize] = useState('');
  const [childAges, setChildAges] = useState('');
  const [budget, setBudget] = useState('');
  const [showResults, setShowResults] = useState(false);

  const zones = yardSize && childAges && budget ? getZones(yardSize, childAges, budget) : [];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642', fontWeight: 600 }}>
          🌳 DFW FAMILY OUTDOOR GUIDE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Family Outdoor Living in DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
          DFW has 234 days of sunshine annually but brutal summers that make unshaded outdoor spaces useless from June to September. The key is engineering your outdoor space so the family can actually use it 10 months a year.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { stat: '105°F+', label: 'DFW Summer High' },
            { stat: '234', label: 'Sunny Days/Year' },
            { stat: '10 months', label: 'With proper shade & misting' },
          ].map((s, i) => (
            <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642' }}>{s.stat}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E64210', border: '1px solid #F5E642', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px' }}>💡 The DFW Outdoor Formula</div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: '14px', color: '#E8EAF0' }}>
            100% shade coverage + misting system = outdoor space you can use in July. Skip either one and your investment sits unused during the hottest months. Start with these two before anything else.
          </p>
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#F5E642' }}>
            🏡 Outdoor Zone Planner
          </h2>

          {[
            { label: 'Yard size:', options: yardSizes, selected: yardSize, setter: setYardSize },
            { label: 'Child ages:', options: childAgeGroups, selected: childAges, setter: setChildAges },
            { label: 'Total budget:', options: budgetRanges, selected: budget, setter: setBudget },
          ].map((group, gi) => (
            <div key={gi} style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 600, marginBottom: '10px' }}>{group.label}</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {group.options.map(o => (
                  <button key={o} onClick={() => { group.setter(o); setShowResults(false); }}
                    style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                      backgroundColor: group.selected === o ? '#F5E642' : '#1E3A5F',
                      color: group.selected === o ? '#0A1628' : '#E8EAF0', fontWeight: 600 }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {yardSize && childAges && budget && (
            <button onClick={() => setShowResults(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>
              Get Outdoor Zone Recommendations →
            </button>
          )}
        </div>

        {showResults && zones.map((zone, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>{zone.icon}</span>
                <span style={{ fontWeight: 700, fontSize: '16px' }}>{zone.zone}</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', fontWeight: 700,
                  backgroundColor: zone.priority === 'Critical' ? '#FF444430' : zone.priority === 'High' ? '#F5E64220' : '#1E3A5F',
                  color: zone.priority === 'Critical' ? '#FF7777' : zone.priority === 'High' ? '#F5E642' : '#94A3B8' }}>
                  {zone.priority.toUpperCase()}
                </span>
              </div>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '14px', lineHeight: 1.5 }}>{zone.description}</p>
            </div>
            <div style={{ color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '14px' }}>{zone.cost}</div>
          </div>
        ))}

      </div>
    </div>
  );
}
