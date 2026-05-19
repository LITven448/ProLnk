import { useState } from 'react';

type YardSize = 'Small' | 'Medium' | 'Large';
type HOAStatus = 'No HOA' | 'HOA - Flexible' | 'HOA - Strict';
type LawnType = 'Bermuda' | 'St. Augustine' | 'Zoysia' | 'Fescue' | 'Mixed';

const plans: Record<string, { plants: string[]; cost: string; waterSavings: string; hoaNote: string }> = {
  'SmallNo HOA': { plants: ['Buffalo grass', 'Native wildflowers', 'Desert willow', 'Blackfoot daisy'], cost: '$800–$1,500', waterSavings: '60–70%', hoaNote: 'No restrictions — go native!' },
  'SmallHOA - Flexible': { plants: ['Dwarf yaupon holly', 'Autumn sage', 'Prairie dropseed', 'Blue grama grass'], cost: '$1,000–$2,000', waterSavings: '50–65%', hoaNote: 'Manicured natives look great — document plan with HOA upfront' },
  'SmallHOA - Strict': { plants: ['Zoysia grass (drought-tolerant cultivar)', 'Rosemary borders', 'Agave accents'], cost: '$1,200–$2,500', waterSavings: '30–45%', hoaNote: 'Focus on drought-tolerant turfgrass + structured plantings HOA will approve' },
  'MediumNo HOA': { plants: ['Little Bluestem (native grass)', 'Mexican sage', 'Turk\’s cap', 'Esperanza', 'Rain lily'], cost: '$2,500–$5,000', waterSavings: '65–75%', hoaNote: 'Full native conversion — eligible for Dallas WaterWise rebates' },
  'MediumHOA - Flexible': { plants: ['Inland sea oats', 'Fall aster', 'Flame acanthus', 'Compact Texas sage'], cost: '$3,000–$6,000', waterSavings: '55–65%', hoaNote: 'Submit landscape plan for pre-approval — most flexible HOAs approve with proper edge maintenance' },
  'MediumHOA - Strict': { plants: ['TifTuf Bermuda (low-water cultivar)', 'Cast iron plant borders', 'Ornamental grasses in beds'], cost: '$3,500–$7,000', waterSavings: '35–50%', hoaNote: 'Replace lawn with best drought-tolerant turfgrass available + structured beds' },
  'LargeNo HOA': { plants: ['Cedar elm canopy', 'Gulf muhly grass', 'Rock rose', 'Agarita', 'Mealy blue sage'], cost: '$6,000–$15,000', waterSavings: '70–80%', hoaNote: 'Full xeriscape — file for TX Right to Garden exemption if ever challenged' },
  'LargeHOA - Flexible': { plants: ['Native grass meadow zones', 'Texas mountain laurel', 'Cenizo', 'Coral honeysuckle'], cost: '$7,000–$16,000', waterSavings: '60–70%', hoaNote: 'Phase conversion over 2 years — maintain one traditional turf zone for HOA confidence' },
  'LargeHOA - Strict': { plants: ['Hybrid Bermuda with drip irrigation', 'Decomposed granite beds', 'Drought-tolerant shrubs'], cost: '$8,000–$18,000', waterSavings: '40–55%', hoaNote: 'Drip irrigation system qualifies for city rebates + reduces watering days from HOA rules' },
};

const waterStages = [
  { stage: 'Stage 1', trigger: 'Water supply <50%', rules: '2 days/week irrigation only, no midday watering' },
  { stage: 'Stage 2', trigger: 'Water supply <40%', rules: '1 day/week irrigation, hand watering only otherwise' },
  { stage: 'Stage 3', trigger: 'Water supply <30%', rules: 'No irrigation systems, essential use only' },
  { stage: 'Stage 4', trigger: 'Water supply <20%', rules: 'Emergency conservation — no outdoor watering' },
];

export default function DFWDroughtResistantYardGuide() {
  const [yardSize, setYardSize] = useState<YardSize>('Medium');
  const [hoaStatus, setHoaStatus] = useState<HOAStatus>('No HOA');
  const [lawnType, setLawnType] = useState<LawnType>('Bermuda');
  const [showResults, setShowResults] = useState(false);

  const planKey = `${yardSize}${hoaStatus}`;
  const plan = plans[planKey];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>💧 DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Drought-Resistant Yards in DFW</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Texas experiences flash drought — conditions can go from normal to severe in weeks. DFW homeowners who convert to drought-resistant yards save $800–$2,400/year in water costs.
        </p>

        <div style={{ background: '#1A2F4A', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ TCEQ Water Restriction Stages</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10 }}>
            {waterStages.map(s => (
              <div key={s.stage} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{s.stage}</div>
                <div style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>{s.trigger}</div>
                <div style={{ color: '#AAB8C2', fontSize: 12 }}>{s.rules}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌵 Build Your Conversion Plan</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>YARD SIZE</label>
              <select value={yardSize} onChange={e => setYardSize(e.target.value as YardSize)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                <option>Small</option><option>Medium</option><option>Large</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>HOA STATUS</label>
              <select value={hoaStatus} onChange={e => setHoaStatus(e.target.value as HOAStatus)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                <option>No HOA</option><option>HOA - Flexible</option><option>HOA - Strict</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>CURRENT LAWN</label>
              <select value={lawnType} onChange={e => setLawnType(e.target.value as LawnType)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                <option>Bermuda</option><option>St. Augustine</option><option>Zoysia</option><option>Fescue</option><option>Mixed</option>
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Generate Conversion Plan
          </button>
        </div>

        {showResults && plan && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div style={{ background: '#0D1F35', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>{plan.waterSavings}</div>
                <div style={{ color: '#8899AA', fontSize: 14 }}>water savings vs. current lawn</div>
              </div>
              <div style={{ background: '#0D1F35', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{plan.cost}</div>
                <div style={{ color: '#8899AA', fontSize: 14 }}>estimated conversion cost</div>
              </div>
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🌿 Recommended Plants for {hoaStatus}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                {plan.plants.map(p => (
                  <div key={p} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', color: '#AAB8C2', fontSize: 14 }}>🌱 {p}</div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 8 }}>🏡 HOA Coordination Tip</h3>
              <p style={{ color: '#AAB8C2′ }}>{plan.hoaNote}</p>
              <p style={{ color: '#8899AA', marginTop: 12, fontSize: 14 }}>💰 Dallas WaterWise rebate: up to $0.10/sq ft for turf removal. Fort Worth similar program at fortworthtexas.gov/water.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
