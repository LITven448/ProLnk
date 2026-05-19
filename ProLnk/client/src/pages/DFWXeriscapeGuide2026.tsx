import { useState } from 'react';

export default function DFWXeriscapeGuide2026() {
  const [yardArea, setYardArea] = useState('small');
  const [waterGoal, setWaterGoal] = useState('stage3');
  const [plan, setPlan] = useState('');

  const getPlan = () => {
    const map: Record<string, Record<string, string>> = {
      small: { stage3: 'Replace 300-500 sqft of turf with Texas Sage and gravel mulch beds. Drip irrigate remaining plants 1x/week per Stage 3 rules. Estimated 60% water reduction.', minimal: 'Native groundcover (Horseherb) replaces lawn — zero supplemental watering after establishment. Add Yaupon Holly as anchor shrubs.', drought: 'Full xeriscape: remove all turf, install native plant zones with decomposed granite. 75% water savings.' },
      medium: { stage3: 'Redesign front yard into 3 zones: high-water near house (one drip-irrigated bed), medium (native shrubs), low-water (Cenizo + gravel). Cuts water use by 50%.', minimal: 'Install Blackfoot Daisy, Lantana, and Texas Sage in mixed beds. Remove irrigation from back half of yard. Saves 500-800 gal/month.', drought: 'Full conversion: decomposed granite paths, native plant clusters, rain garden at low point. Xeriscape design reduces maintenance to once-monthly.' },
      large: { stage3: 'Phased xeriscape: convert front yard first (highest visibility), then sides and back over 2 seasons. Use turf removal rebate if offered by DFW municipal utility.', minimal: 'Native prairie mix (Buffalo Grass + Wildflowers) in back, formal native shrub beds in front. Minimal irrigation, mow 4x/year.', drought: 'Full xeriscape design plan recommended — consult a DFW xeriscape-certified landscaper for large-scale conversion and rebate eligibility.' },
    };
    setPlan(map[yardArea]?.[waterGoal] ?? 'Select options above.');
  };

  const plants = [
    { name: 'Texas Sage (Leucophyllum)', icon: '🌸', water: 'Very Low' },
    { name: 'Yaupon Holly', icon: '🌿', water: 'Low' },
    { name: 'Cenizo', icon: '💜', water: 'Very Low' },
    { name: 'Blackfoot Daisy', icon: '🌼', water: 'Very Low' },
    { name: 'Buffalo Grass', icon: '🌾', water: 'Low' },
    { name: 'Lantana', icon: '🟡', water: 'Low' },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK RESOURCE GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Xeriscape Guide 2026 🌵</h1>
        <p style={{ color: '#94a3b8', marginBottom: 16 }}>Xeriscape reduces water use 50-75%. With DFW Stage 3 restrictions now standard practice, water-wise landscaping is both practical and beautiful.</p>
        <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '12px 16px', marginBottom: 32, color: '#F5E642', fontSize: 14, fontWeight: 600 }}>
          💧 DFW Stage 3 Restrictions: Outdoor watering limited to 1x/week, even-odd schedule. Xeriscape plants are exempt after establishment.
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>🌱 Top Drought-Tolerant Plants for DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {plants.map(p => (
              <div key={p.name} style={{ background: '#112240', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: '#F5E642', fontSize: 12 }}>Water: {p.water}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Xeriscape Design Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Yard Area</label>
              <select value={yardArea} onChange={e => setYardArea(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="small">Small (&lt;2,500 sqft)</option>
                <option value="medium">Medium (2,500-6,000 sqft)</option>
                <option value="large">Large (6,000+ sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Water Goal</label>
              <select value={waterGoal} onChange={e => setWaterGoal(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', fontSize: 14 }}>
                <option value="stage3″>Comply with Stage 3</option>
                <option value="minimal">Minimal Watering</option>
                <option value="drought">Full Drought-Proof</option>
              </select>
            </div>
          </div>
          <button onClick={getPlan} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer', fontSize: 15 }}>Get Xeriscape Plan</button>
          {plan && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>🌵 {plan}</div>}
        </div>
        <p style={{ marginTop: 32, color: '#475569', fontSize: 13, textAlign: 'center' }}>ProLnk connects you with DFW xeriscape landscapers and irrigation retrofit specialists.</p>
      </div>
    </div>
  );
}