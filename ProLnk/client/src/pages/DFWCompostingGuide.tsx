import { useState } from 'react';

const binTypes = [
  { name: 'Open Wire Bin', cost: '$20–$60', size: '3x3 ft', bestFor: 'Large yards, fast composting', pros: 'Great airflow, easy to turn, cheap', cons: 'Exposed to wildlife, not pest-proof' },
  { name: 'Plastic Tumbler', cost: '$80–$250', size: '37–65 gallon', bestFor: 'Small yards, suburban homes', pros: 'Pest-proof, faster breakdown, tidy', cons: 'Limited capacity, can dry out in DFW heat' },
  { name: 'Worm Bin (Vermicompost)', cost: '$50–$150', size: 'Countertop–small bin', bestFor: 'Apartments, food scraps only', pros: 'Works indoors, exceptional compost quality', cons: 'Temperature sensitive — keep under 80°F in DFW summer' },
  { name: 'Hot Compost Pile', cost: '$0–$50', size: '3x3x3 ft minimum', bestFor: 'Large yards with lots of material', pros: 'Fastest in DFW summer heat, kills weed seeds', cons: 'Requires regular turning, monitoring moisture' },
];

const doList = [
  '🍃 Leaves (DFW live oaks drop in spring, perfect carbon source)',
  '🌿 Grass clippings (nitrogen-rich, use in thin layers)',
  '🥕 Fruit and vegetable scraps',
  '☕ Coffee grounds and filters',
  '🥚 Crushed eggshells (great for DFW alkaline clay soil)',
  '📰 Shredded cardboard and newspaper',
  '🌱 Garden trimmings and spent plants',
  '🪴 Houseplant soil and trimmings',
];

const dontList = [
  '🥩 Meat and fish — attracts wildlife faster in DFW heat',
  '🧀 Dairy products — same issue, odor amplified in heat',
  '🐕 Pet waste — pathogens, health risk',
  '🫒 Oily or greasy food — repels decomposers',
  '🌿 Diseased plants — spread disease to garden',
  '🪵 Treated wood — contains chemicals',
];

const cityPrograms = [
  { city: 'Dallas', program: 'Dallas Sanitation Free Compost', desc: 'City of Dallas offers free finished compost to residents at McCommas Bluff Landfill — bring any container.', url: 'dallasrecycles.com' },
  { city: 'Fort Worth', program: 'FW Organics Composting', desc: 'Fort Worth composting facility at Riverbend Landfill. Also offers residential curbside organics pickup in select areas.', url: 'fortworthtexas.gov' },
  { city: 'Plano', program: 'Plano Environmental Education', desc: 'Plano offers subsidized compost bins and free composting workshops through Parks & Recreation.', url: 'plano.gov' },
];

export default function DFWCompostingGuide() {
  const [yardWaste, setYardWaste] = useState('');
  const [foodScraps, setFoodScraps] = useState('');
  const [result, setResult] = useState<{ binSize: string; binType: string; weeks: number; yardBenefit: string } | null>(null);

  function calculate() {
    const yard = parseFloat(yardWaste) || 0;
    const food = parseFloat(foodScraps) || 0;
    const totalLbs = yard + food;
    if (totalLbs <= 0) return;
    const weeklyLbs = totalLbs;
    let binSize = '37-gallon tumbler';
    let binType = 'Plastic Tumbler';
    if (weeklyLbs > 30) { binSize = '3x3x3 ft open wire bin'; binType = 'Open Wire Bin'; }
    if (weeklyLbs > 60) { binSize = 'Two 3x3x3 ft open wire bins'; binType = 'Hot Compost System'; }
    const weeks = Math.max(4, Math.round(14 - (yard * 0.1)));
    const cuYds = Math.round((weeklyLbs * 52) / 2000 * 3);
    const yardBenefit = `~${cuYds} cubic yards of compost/year — improves ${cuYds * 100} sq ft of DFW clay soil`;
    setResult({ binSize, binType, weeks, yardBenefit });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#1a2410 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Composting Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>DFW heat is a composting superpower. Turn yard waste and food scraps into black gold for your clay soil — fast.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg,#1a3a1a,#0f2a0f)', border: '1px solid #2d5a2d', borderRadius: 16, padding: 24, margin: '40px 0 0′ }}>
          <h2 style={{ color: '#4ADE80', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>🌡️ DFW Heat Is Your Composting Advantage</h2>
          <p style={{ color: '#86EFAC', margin: 0 }}>Hot compost piles in DFW summer (100°F+ ambient) can reach 140–160°F internally — ideal for rapid decomposition. What takes 3 months in Seattle takes 4–6 weeks in a Dallas summer. DFW's alkaline clay soil also benefits enormously from compost, which lowers pH, improves drainage, and adds organic matter.</p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Composting Bin Types for DFW</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {binTypes.map(b => (
            <div key={b.name} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 4 }}>{b.name}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 10 }}>{b.cost} • {b.size}</div>
              <div style={{ color: '#60A5FA', fontSize: 13, marginBottom: 8 }}>👍 Best for: {b.bestFor}</div>
              <div style={{ color: '#4ADE80', fontSize: 13, marginBottom: 4 }}>✅ {b.pros}</div>
              <div style={{ color: '#F87171', fontSize: 13 }}>⚠️ {b.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, margin: '48px 0 0′ }}>
          <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, border: '1px solid #2A3F5C' }}>
            <h3 style={{ color: '#4ADE80', fontWeight: 700, margin: '0 0 16px', fontSize: 18 }}>✅ Compost These in DFW</h3>
            {doList.map(item => <div key={item} style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{item}</div>)}
          </div>
          <div style={{ background: '#1E2D45', borderRadius: 16, padding: 24, border: '1px solid #2A3F5C' }}>
            <h3 style={{ color: '#F87171', fontWeight: 700, margin: '0 0 16px', fontSize: 18 }}>🚫 Avoid in DFW Heat</h3>
            {dontList.map(item => <div key={item} style={{ color: '#94A3B8', fontSize: 14, marginBottom: 8 }}>{item}</div>)}
          </div>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Free City Composting Programs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {cityPrograms.map(p => (
            <div key={p.city} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{p.city}: {p.program}</div>
              <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 8px' }}>{p.desc}</p>
              <div style={{ color: '#60A5FA', fontSize: 13 }}>🌐 {p.url}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>Compost System Calculator</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20 }}>Enter your weekly waste to get a bin size recommendation and time-to-compost estimate.</p>
        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 28, border: '1px solid #2A3F5C', maxWidth: 520 }}>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Weekly Yard Waste (lbs)</label>
          <input type="number" value={yardWaste} onChange={e => setYardWaste(e.target.value)} placeholder="e.g. 20″
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Weekly Food Scraps (lbs)</label>
          <input type="number" value={foodScraps} onChange={e => setFoodScraps(e.target.value)} placeholder="e.g. 5″
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Get My Composting Plan
          </button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginTop: 24 }}>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Recommended Bin</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{result.binType}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{result.binSize}</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Time to Finished Compost</div>
              <div style={{ color: '#4ADE80', fontSize: 32, fontWeight: 800 }}>{result.weeks} wks</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>in DFW summer heat</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C', gridColumn: 'span 2′ }}>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>Soil Impact</div>
              <div style={{ color: '#60A5FA', fontSize: 16, fontWeight: 600 }}>{result.yardBenefit}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
