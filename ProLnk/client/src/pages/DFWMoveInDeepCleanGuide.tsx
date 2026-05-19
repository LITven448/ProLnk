import { useState } from 'react';

const homeAges = ['Built after 2010', 'Built 1990–2010', 'Built 1970–1990', 'Built before 1970'];
const conditions = ['Move-in ready / just painted', 'Average wear — some scuffs and stains', 'Heavy wear — needs significant work', 'Vacant 6+ months'];

function getChecklist(age: string, condition: string) {
  const old = age === 'Built before 1970′ || age === ’Built 1970–1990';
  const heavy = condition === 'Heavy wear — needs significant work' || condition === 'Vacant 6+ months';
  const vacant = condition === 'Vacant 6+ months';

  const hvac = [
    '🌬️ Replace ALL air filters before first use — previous owners\’ allergens',
    '🧹 Vacuum all air vents and returns (DFW clay dust settles in ducts)',
    heavy ? '🔧 Professional duct cleaning recommended ($300–$600)' : '🔧 Inspect ductwork for visible mold or debris',
    vacant ? '❄️ Have HVAC system inspected — refrigerant may have leaked' : '❄️ Test AC and heat before move-in',
  ];

  const fixtures = [
    '💧 Descale all faucets — DFW water is extremely hard (GPG 15–25)',
    '🚿 Soak showerheads in vinegar overnight for hard water deposits',
    '🚽 Clean toilet tank interior — sediment builds up in vacant homes',
    old ? '🔍 Inspect pipes for galvanized corrosion (pre-1985 homes)' : '🔍 Check under sinks for previous leak staining',
  ];

  const surfaces = [
    '🪟 Wash all windows inside and out (DFW pollen + construction residue)',
    '🔲 Clean all baseboards — previous occupants rarely do this',
    '🍳 Deep clean oven interior and hood vent filters',
    '🧊 Clean refrigerator coils and ice maker water line',
    heavy ? '🪣 Professional grout cleaning for kitchen and bathrooms' : '🪣 Scrub grout lines in kitchen and bathrooms',
  ];

  const pests = [
    vacant ? '🐛 Professional pest treatment before move-in — vacant homes attract cockroaches and rodents' : '🐛 Inspect for pest evidence: droppings, nesting material',
    '🕷️ Check garage and attic access points (DFW has brown recluse spiders)',
    old ? '🐜 Termite inspection if not done at closing — common in older DFW homes' : '🐜 Check wood structures for moisture damage',
  ];

  const cost = heavy ? '$800–$1,800 professional' : vacant ? '$600–$1,200 professional' : '$300–$600 professional';
  const diy = heavy ? 'Not recommended — hire professionals' : 'Possible for light/medium wear with 2 full days';

  return { hvac, fixtures, surfaces, pests, cost, diy };
}

export default function DFWMoveInDeepCleanGuide() {
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const result = age && condition ? getChecklist(age, condition) : null;

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
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🏡 DFW MOVE-IN CLEAN</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Move-In Deep Clean Guide for DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Taking possession of a DFW home comes with specific challenges — hard water scale, HVAC systems full of previous occupants' allergens, and clay soil embedded in every surface.</p>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #F5E642', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🔍 Get My Move-In Checklist</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOME AGE</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select home age...</option>
                {homeAges.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>HOME CONDITION AT POSSESSION</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select condition...</option>
                {conditions.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 16, border: '1px solid #1E3A5F' }}>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>ESTIMATED COST</div>
                <div style={{ fontWeight: 700, color: '#F5E642', marginTop: 4 }}>{result.cost}</div>
              </div>
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 16, border: '1px solid #1E3A5F' }}>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>DIY VIABILITY</div>
                <div style={{ fontWeight: 700, marginTop: 4 }}>{result.diy}</div>
              </div>
            </div>
            <Section title="❄️ HVAC System First" items={result.hvac} />
            <Section title="💧 Hard Water Fixtures" items={result.fixtures} />
            <Section title="🧹 Surfaces & Appliances" items={result.surfaces} />
            <Section title="🐛 DFW Pest Assessment" items={result.pests} />
          </div>
        )}
      </div>
    </div>
  );
}
