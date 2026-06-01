import { useState } from 'react';

export default function DFWKitchenApplianceGuide() {
  const [kitchenSize, setKitchenSize] = useState('');
  const [cookingStyle, setCookingStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const generateRecommendation = () => {
    if (!kitchenSize || !cookingStyle || !budget) return;
    const isHighBudget = budget === 'high';
    const isMediumBudget = budget === 'medium';
    const isGourmet = cookingStyle === 'gourmet';
    const cooktop = isGourmet ? 'Gas cooktop (6 burner)' : isHighBudget ? 'Induction cooktop' : 'Gas cooktop (4 burner)';
    const fridge = kitchenSize === 'small' ? 'Counter-depth refrigerator' : 'Standard depth French door';
    const dishwasher = 'Stainless tub with water softener compatibility';
    const baseCost = isHighBudget ? 15000 : isMediumBudget ? 8000 : 4000;
    const energySavings = isHighBudget ? 2200 : 1200;
    setRecommendation({ cooktop, fridge, dishwasher, baseCost, energySavings });
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    background: '#112240',
    color: '#fff',
    border: '1px solid #1e3760',
    borderRadius: '6px',
    fontSize: '14px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '26px', marginBottom: '8px' }}>
          <span>🍯</span> DFW Kitchen Appliance Upgrade Guide
        </h1>
        <p style={{ color: '#a0aebe', marginBottom: '24px' }}>
          Smart appliance choices for Dallas Fort Worth homes - built around your water quality, climate, and cooking culture.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🔁</span> Gas vs Induction in DFW</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>78% of DFW homes have natural gas access</li>
              <li>Induction adoption growing fast - up 23% since 2023</li>
              <li>Induction boils water 2 x faster than gas</li>
              <li>Gas gives visual flame control for Tex-Mex char</li>
              <li>Energy cost equal in DFW market as of 2026</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🏩</span> Hard Water Impact</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>DFW water: 25-30 grains per gallon hardness</li>
              <li>Dishwashers last 4-6 years instead of 10+</li>
              <li>Ice makers clog 50% faster without filtration</li>
              <li>Require monthly citric acid descaling</li>
              <li>Choose stainless tub dishwashers only</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>💩</span> Refrigerator Fit</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Counter-depth: 24" deep, clean look, 20% less storage</li>
              <li>Standard: 30" deep, more capacity, protrudes out</li>
              <li>French door best for DFW entertaining style</li>
              <li>Water/Ice dispenser: requires filter every 6 mos</li>
              <li>ENERGY STAR saves $120-year in DFW climate</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>⚡</span> ENERGY STAR in DFW</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>DFW runs AC 9-10 months of the year</li>
              <li>Appliances run harder in high ambient temps</li>
              <li>ENERGY STAR saves avg $400/5yr over standard</li>
              <li>Oncor rebates: up to $100 on qualifying units</li>
              <li>Look for EF rating &gt; 0.75 on water heaters</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}><span>🖏</span> Find Your Appliance Package</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Kitchen Size</label>
              <select style={selectStyle} value={kitchenSize} onChange={e => setKitchenSize(e.target.value)}>
                <option value="">Select...</option>
                <option value="small">Small (under 100 sqft)</option>
                <option value="medium">Medium (100-170 sqft)</option>
                <option value="large">Large (170+ sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Cooking Style</label>
              <select style={selectStyle} value={cookingStyle} onChange={e => setCookingStyle(e.target.value)}>
                <option value="">Select...</option>
                <option value="basic">Basic (reheat & simple)</option>
                <option value="homecook">Home Cook (daily meals)</option>
                <option value="gourmet">Gourmet / Tex-Mex Fanatic</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Budget Range</label>
              <select style={selectStyle} value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="">Select...</option>
                <option value="low">Budget (under $5,000)</option>
                <option value="medium">Mid-Range ($5K-$12)</option>
                <option value="high">Premium ($12+)</option>
              </select>
            </div>
          </div>
          <button
            onClick={generateRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            Get Appliance Recommendation
          </button>
          { recommendation && (
            <div style={{ marginTop: '24px', background: '#0f1e38', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Recommended Package</h3>
              <p style={{ margin: '4px 0' }}><strong>Cooktop:</strong> {recommendation.cooktop}</p>
              <p style={{ margin: '4px 0' }}><strong>Refrigerator:</strong> {recommendation.fridge}</p>
              <p style={{ margin: '4px 0' }}><strong>Dishwasher:</strong> {recommendation.dishwasher}</p>
              <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
                <div style={{ background: '#1a3050', borderRadius: '8px', padding: '14px 20px', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: '22px', fontWeight: 700 }}>${recommendation.baseCost.toLocaleString()}</div>
                  <div style={{ color: '#a0aebe', fontSize: '12px' }}>Estimated Package Cost</div>
                </div>
                <div style={{ background: '#1a3050', borderRadius: '8px', padding: '14px 20px', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: '22px', fontWeight: 700 }}>${recommendation.energySavings.toLocaleString()}</div>
                  <div style={{ color: '#a0aebe', fontSize: '12px' }}>5-Year Energy Savings vs Basic</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
