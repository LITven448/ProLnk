import { useState } from 'react';

const homeFeatures = ['Standard home, no pool', 'Home with pool', 'Home with pool + outdoor kitchen', 'Acreage / rural DFW property'];
const familySizes = ['1–2 people', '3–4 people', '5+ people (active household)'];

function getSummerPlan(features: string, family: string) {
  const hasPool = features !== 'Standard home, no pool';
  const hasOutdoor = features === 'Home with pool + outdoor kitchen';
  const large = family === '5+ people (active household)';

  const indoorPriority = [
    '❄️ Deep clean AC vents — 8+ months of DFW summer runtime deposits heavy dust',
    '🔲 Clean ceiling fan blades — running constantly means monthly buildup',
    '🪟 Wash all windows: DFW summer storms leave hard water spots from rain',
    large ? '🛋️ Professional upholstery cleaning — heavy use shows by August' : '🛋️ Vacuum and spot-clean upholstered furniture',
    '🧺 Laundry room deep clean — summer sports gear, pool towels, workout clothes',
    '🍳 Range hood filter — summer grilling indoors increases grease buildup',
  ];

  const outdoorTasks = hasPool ? [
    '🏊 Pool equipment room cleaning: filter housing, pump area, chemical storage',
    '🌿 Power wash pool deck — DFW summer storm debris + sunscreen residue',
    hasOutdoor ? '🍖 Deep clean outdoor kitchen: grill grates, countertops, storage' : '🔥 Clean grill and outdoor cooking surfaces',
    '🪑 Wash all patio furniture cushion covers (mold risk in summer humidity)',
    '💡 Test and clean outdoor lighting — heat causes seal failures',
  ] : [
    '🌿 Power wash patio and driveway — DFW summer storms track mud onto hardscape',
    '🔥 Clean grill and outdoor cooking surfaces',
    '🪑 Wipe down patio furniture — UV damage + dust accelerates in DFW summer',
  ];

  const proVsDiy = [
    '✅ DIY: Interior vacuuming, wiping surfaces, laundry, kitchen appliances',
    '✅ DIY: Patio furniture, grill cleaning, outdoor wipe-down',
    '🔧 Professional: AC duct cleaning, upholstery, window exterior above ground floor',
    hasPool ? '🔧 Professional: Pool equipment service, deck power washing' : '🔧 Professional: Exterior power washing, roof debris removal after storms',
  ];

  const cost = hasOutdoor
    ? large ? '$500–$1,100 professional summer deep clean' : '$350–$750 professional summer deep clean'
    : hasPool
    ? large ? '$350–$700′ : '$250–$500'
    : large ? '$200–$450′ : '$150–$350';

  const dfwSummerFacts = [
    '🌡️ DFW averages 70+ days above 100°F — AC runs nearly 24/7 from June–September',
    '⛈️ Summer storm season (June–August) brings hail, mud, and debris onto every surface',
    '🤧 Mold risk increases in August–September as humidity spikes post-monsoon',
    '🐛 Summer heat drives pests indoors — scorpions, roaches, and silverfish peak in July',
  ];

  return { indoorPriority, outdoorTasks, proVsDiy, cost, dfwSummerFacts };
}

export default function DFWSummerDeepCleanGuide() {
  const [features, setFeatures] = useState('');
  const [family, setFamily] = useState('');
  const result = features && family ? getSummerPlan(features, family) : null;

  const Section = ({ title, items }: { title: string; items: string[] }) => (
    <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 14 }}>
      <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {items.map(item => <li key={item} style={{ color: '#CBD5E1′ }}>{item}</li>)}
      </ul>
    </div>
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>☀️ DFW SUMMER DEEP CLEAN</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Summer Deep Clean Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>DFW summers are extreme: 100°F+ heat, AC running nonstop, pool traffic, summer storms, and humidity spikes in August. Your home takes a beating — here's how to address it systematically.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🌡️', label: 'Days Above 100°F', value: '70+ annually' },
            { icon: '⛈️', label: 'Storm Season', value: 'June–August' },
            { icon: '💧', label: 'Humidity Peak', value: 'Aug–Sep' },
            { icon: '❄️', label: 'AC Runtime', value: 'June–Oct' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F1F3D', borderRadius: 10, padding: 14, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontWeight: 700, color: '#F5E642′ }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #F5E642', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🌞 Build My Summer Clean Plan</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOME FEATURES</label>
              <select value={features} onChange={e => setFeatures(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select home features...</option>
                {homeFeatures.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOUSEHOLD SIZE</label>
              <select value={family} onChange={e => setFamily(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select household size...</option>
                {familySizes.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 16, border: '1px solid #1E3A5F', marginBottom: 16 }}>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>ESTIMATED PROFESSIONAL COST</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 18, marginTop: 4 }}>{result.cost}</div>
            </div>
            <Section title="🏠 Indoor Priority Areas" items={result.indoorPriority} />
            <Section title="🌿 Outdoor & Pool Areas" items={result.outdoorTasks} />
            <Section title="🔧 Pro vs DIY Breakdown" items={result.proVsDiy} />
            <Section title="☀️ DFW Summer Facts" items={result.dfwSummerFacts} />
          </div>
        )}
      </div>
    </div>
  );
}
