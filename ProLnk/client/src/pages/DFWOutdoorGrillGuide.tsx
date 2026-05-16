import { useState } from 'react';

export default function DFWOutdoorGrillGuide() {
  const [cookingStyle, setCookingStyle] = useState('');
  const [outdoorKitchen, setOutdoorKitchen] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const generateRecommendation = () => {
    if (!cookingStyle || !outdoorKitchen || !budget) return;
    const isHighBudget = budget === 'high';
    const isMedium = budget === 'medium';
    const hasOK = outdoorKitchen === 'yes' || outdoorKitchen === 'building';
    let grill = '';
    let fuel = '';
    let accessories = '';
    let cost = '';
    if (cookingStyle === 'smoker') {
      grill = hasOK ? 'Built-in offset smoker with firebox' : 'Offset smoker (Yoder YS640 or Lone Star Grillz)';
      fuel = 'Post oak or pecan wood — classic DFW';
      accessories = 'Wireless meat thermometer, welding gloves, wood splitter';
      cost = isHighBudget ? '$2,500-$8,000' : '$800-$2,500';
    } else if (cookingStyle === 'pellet') {
      grill = hasOK ? 'Built-in pellet grill insert' : 'Traeger Timberline or Weber SmokeFire';
      fuel = 'Pellets — store in sealed bin, DFW heat degrades pellets fast';
      accessories = 'Pellet storage bin, cover, WiFi controller';
      cost = isHighBudget ? '$1,800-$3,500' : '$600-$1,800';
    } else if (cookingStyle === 'charcoal') {
      grill = hasOK ? 'Built-in charcoal grill (Bull or Summerset)' : 'Weber Kettle Premium or Big Green Egg';
      fuel = 'Lump charcoal — better in DFW heat than briquettes';
      accessories = 'Chimney starter, heat-resistant cover, ash tool';
      cost = isHighBudget ? '$800-$4,000' : '$150-$800';
    } else {
      grill = hasOK ? 'Built-in gas grill (Wolf or Blaze)' : 'Weber Genesis or Napoleon Prestige';
      fuel = 'Natural gas (preferred) — propane loses 2-3 PSI in DFW summer heat';
      accessories = 'Rotisserie kit, sear burner, cover, side burner';
      cost = isHighBudget ? '$1,500-$6,000' : '$400-$1,500';
    }
    const counterNote = hasOK ? 'Use concrete countertops — DFW heat cracks granite over time' : '';
    setRecommendation({ grill, fuel, accessories, cost, counterNote });
  };

  const selectStyle = {
    width: '100%', padding: '10px', background: '#112240', color: '#fff',
    border: '1px solid #1e3760', borderRadius: '6px', fontSize: '14px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '26px', marginBottom: '8px' }}>
          <span>🔥</span> DFW Outdoor Grill Buying Guide
        </h1>
        <p style={{ color: '#a0aebe', marginBottom: '24px' }}>
          DFW BBQ culture is serious. Get the right grill for your cooking style, outdoor kitchen setup, and budget.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>⚡</span> Gas in DFW Heat — Know This</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Propane vapor pressure drops at temps above 90°F</li>
              <li>DFW hits 110°F — propane tank pressure falls 20-30%</li>
              <li>Natural gas line: consistent pressure regardless of heat</li>
              <li>Propane tanks in full sun can become dangerously hot</li>
              <li>Natural gas conversion: $300-$600, worth it in DFW</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🥩</span> DFW BBQ Culture</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Brisket is king — requires low/slow offset or pellet smoker</li>
              <li>Post oak wood is traditional for DFW-style BBQ</li>
              <li>Weekend cooks 8-14 hrs are common in DFW neighborhoods</li>
              <li>Tailgating culture means portable units matter too</li>
              <li>Backyard entertaining season is 9+ months per year</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🏗️</span> Built-in vs Freestanding</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Built-in adds $15K-$60K+ to home value in DFW market</li>
              <li>Concrete countertops only — DFW heat cracks granite slab</li>
              <li>Use marine-grade 304 stainless for DFW humidity and heat</li>
              <li>Freestanding: flexible, movable, half the cost</li>
              <li>Cover is mandatory — DFW hail and UV destroy grills fast</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🌡️</span> Fuel Source Comparison</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Gas: fast, convenient, consistent — most popular in DFW</li>
              <li>Charcoal: best flavor, harder to control in 100°F heat</li>
              <li>Pellet: set-and-forget smoking, WiFi control, growing fast</li>
              <li>Offset smoker: authentic, requires skill and attention</li>
              <li>Kamado (BGE): versatile, holds temp well in DFW heat</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}><span>🎯</span> Find Your Grill</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Cooking Style</label>
              <select style={selectStyle} value={cookingStyle} onChange={e => setCookingStyle(e.target.value)}>
                <option value="">Select...</option>
                <option value="gas">Gas grilling (burgers, steaks)</option>
                <option value="charcoal">Charcoal (flavor-first)</option>
                <option value="pellet">Pellet smoker (set & forget)</option>
                <option value="smoker">Offset smoker (serious BBQ)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Outdoor Kitchen Status</label>
              <select style={selectStyle} value={outdoorKitchen} onChange={e => setOutdoorKitchen(e.target.value)}>
                <option value="">Select...</option>
                <option value="no">No outdoor kitchen</option>
                <option value="building">Building one now</option>
                <option value="yes">Have existing outdoor kitchen</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Budget</label>
              <select style={selectStyle} value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="">Select...</option>
                <option value="low">Budget (under $800)</option>
                <option value="medium">Mid-Range ($800-$2,500)</option>
                <option value="high">Premium ($2,500+)</option>
              </select>
            </div>
          </div>
          <button onClick={generateRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            Get Grill Recommendation
          </button>
          {recommendation && (
            <div style={{ marginTop: '24px', background: '#0f1e38', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your Recommendation</h3>
              <p style={{ margin: '4px 0' }}><strong>Grill:</strong> {recommendation.grill}</p>
              <p style={{ margin: '4px 0' }}><strong>Fuel Source:</strong> {recommendation.fuel}</p>
              <p style={{ margin: '4px 0' }}><strong>Key Accessories:</strong> {recommendation.accessories}</p>
              <p style={{ margin: '4px 0' }}><strong>Estimated Cost:</strong> {recommendation.cost}</p>
              {recommendation.counterNote && <p style={{ margin: '8px 0 0', color: '#F5E642', fontSize: '13px' }}>🏗️ {recommendation.counterNote}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
