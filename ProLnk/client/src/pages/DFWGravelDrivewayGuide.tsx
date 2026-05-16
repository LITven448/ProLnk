import { useState } from 'react';

const SIZES = ['Short (<50 ft)', 'Medium (50–150 ft)', 'Long (150+ ft)'];
const LOCATIONS = ['Inner suburb (HOA likely)', 'Outer suburb / exurb', 'Rural / acreage'];
const USAGES = ['Light (1–2 vehicles)', 'Moderate (3–4 vehicles)', 'Heavy (farm / commercial)'];

function getGravelRecommendation(size: string, location: string, usage: string) {
  const isHOA = location.includes('HOA');
  const isRural = location.includes('Rural');
  const isHeavy = usage.includes('Heavy');
  const isLong = size.includes('Long') || size.includes('Medium');

  if (isHOA) {
    return {
      type: 'Crushed Granite (stabilized)',
      note: 'Most DFW HOAs prohibit loose gravel — stabilized decomposed granite compacts firm and may be allowed. Verify CC&Rs first.',
      quantity: size.includes('Short') ? '3–5 tons' : size.includes('Medium') ? '8–15 tons' : '18–30 tons',
      annual: '$200–$600 (replenishment + dust control)',
      cost: size.includes('Short') ? '$400–$900' : size.includes('Medium') ? '$1,200–$2,800' : '$3,000–$6,500',
    };
  }
  if (isRural && isHeavy) {
    return {
      type: 'Caliche Base + Crushed Limestone Top',
      note: 'DFW-area caliche is cost-effective base material. Cap with crushed limestone for drainage and durability under heavy loads.',
      quantity: size.includes('Long') ? '25–50 tons' : '10–25 tons',
      annual: '$300–$800 (after heavy rain, DFW runoff displaces gravel)',
      cost: size.includes('Long') ? '$4,000–$9,000' : '$1,500–$4,000',
    };
  }
  if (isLong) {
    return {
      type: 'Crushed Granite (3/4" minus)',
      note: 'Most popular DFW exurb driveway gravel. Compacts well, drains easily, resists DFW spring rains better than pea gravel.',
      quantity: size.includes('Medium') ? '8–14 tons' : '20–35 tons',
      annual: '$250–$700 (DFW summer rains wash edges — plan regrading)',
      cost: size.includes('Medium') ? '$1,000–$2,500' : '$2,800–$6,000',
    };
  }
  return {
    type: 'Pea Gravel (decorative) or Crushed Granite',
    note: 'Short driveways tolerate pea gravel — but note it migrates easily in DFW rain and sticks to tires. Crushed granite is more stable.',
    quantity: '2–4 tons',
    annual: '$100–$300 (replenishment)',
    cost: '$300–$700',
  };
}

export default function DFWGravelDrivewayGuide() {
  const [size, setSize] = useState('');
  const [location, setLocation] = useState('');
  const [usage, setUsage] = useState('');
  const result = size && location && usage ? getGravelRecommendation(size, location, usage) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🪨</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Gravel Driveway Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32 }}>Common in DFW exurbs and rural areas, gravel driveways require regular maintenance — spring rains wash gravel away and DFW clay soil causes uneven settling.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚠️ DFW Gravel Challenges</h2>
          <ul style={{ color: '#9BA3B8', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>DFW spring storms wash gravel into yards — plan for annual replenishment</li>
            <li>Pea gravel sticks to tires and creates liability — avoid on busy driveways</li>
            <li>Crushed granite is the most popular DFW choice — stable and locally sourced</li>
            <li>Caliche base layer (4–6") prevents sinking in DFW clay soil</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>🔧 Gravel Recommender</h2>
          {[{ label: 'Driveway Length', value: size, set: setSize, options: SIZES },
            { label: 'DFW Location Type', value: location, set: setLocation, options: LOCATIONS },
            { label: 'Vehicle Usage', value: usage, set: setUsage, options: USAGES }].map(({ label, value, set, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => set(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.type}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 12 }}>{result.note}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[['QUANTITY NEEDED', result.quantity], ['INSTALL COST', result.cost], ['ANNUAL UPKEEP', result.annual]].map(([label, val]) => (
                  <div key={label} style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                    <div style={{ color: '#9BA3B8', fontSize: 11 }}>{label}</div>
                    <div style={{ color: label === 'INSTALL COST' ? '#F5E642' : '#E8EAF0', fontSize: 14, fontWeight: label === 'INSTALL COST' ? 700 : 400 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 DFW Gravel Types</h2>
          {[['Crushed Granite', 'Most popular in DFW — compacts firm, locally quarried, good drainage.'],
            ['Caliche', 'Native DFW limestone, cheapest base option, becomes cement-like when wet then dried.'],
            ['Pea Gravel', 'Decorative only — rolls, migrates, not recommended for functional driveways.'],
            ['Crushed Limestone', 'Good for heavy-use rural DFW driveways, compacts well under truck loads.']].map(([type, desc]) => (
            <div key={type} style={{ borderBottom: '1px solid #1E3A5F', paddingBottom: 12, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{type}: </span>
              <span style={{ color: '#9BA3B8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
