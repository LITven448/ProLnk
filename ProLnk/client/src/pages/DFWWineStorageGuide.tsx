import { useState } from 'react';

export default function DFWWineStorageGuide() {
  const [collectionSize, setCollectionSize] = useState('');
  const [spaceAvailable, setSpaceAvailable] = useState('');
  const [budget, setBudget] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const generateRecommendation = () => {
    if (!collectionSize || !spaceAvailable || !budget) return;
    const bottles = parseInt(collectionSize);
    const isHighBudget = budget === 'high';
    let solution = '';
    let tempControl = '';
    let cost = '';
    let humidity = '';
    if (spaceAvailable === 'room' && isHighBudget) {
      solution = 'Dedicated wine cellar room with split-system cooling unit';
      tempControl = 'WhisperKOOL or CellarPro split system — maintains 55°F year-round';
      humidity = 'Vapor barrier + humidifier, target 60-70% RH';
      cost = '$8,000-$25,000 build-out';
    } else if (bottles > 100 || isHighBudget) {
      solution = 'Built-in wine refrigerator column (dual zone)';
      tempControl = 'Liebherr, Sub-Zero, or Thermador — dual zone for red/white';
      humidity = 'Units maintain 50-70% RH internally';
      cost = '$2,500-$8,000';
    } else if (bottles > 30) {
      solution = 'Freestanding dual-zone wine cooler (50-150 bottle)';
      tempControl = 'Kalamera or NewAir — consistent 45-65°F dual zones';
      humidity = 'Keep unit away from exterior walls in DFW heat';
      cost = '$400-$1,200';
    } else {
      solution = 'Countertop or small freestanding wine cooler (up to 30 bottles)';
      tempControl = 'Ivation or Vremi — single zone 54°F target';
      humidity = 'Add a small wine cooler humidity pack';
      cost = '$100-$400';
    }
    setRecommendation({ solution, tempControl, humidity, cost });
  };

  const selectStyle = {
    width: '100%', padding: '10px', background: '#112240', color: '#fff',
    border: '1px solid #1e3760', borderRadius: '6px', fontSize: '14px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '26px', marginBottom: '8px' }}>
          <span>🍷</span> DFW Wine Storage Guide
        </h1>
        <p style={{ color: '#a0aebe', marginBottom: '24px' }}>
          DFW heat destroys wine faster than almost anywhere in the US. Learn how to protect your collection the right way.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🌡️</span> DFW Heat & Wine — The Problem</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>A bottle in a DFW car bakes in under 30 minutes</li>
              <li>Ideal cellar temp: 55°F — DFW summer ambient is 105°F+</li>
              <li>Temperature swings above 70°F accelerate aging 3-5x</li>
              <li>UV light from DFW sun degrades wine through clear glass</li>
              <li>Heat expands wine, pushing cork — leads to oxidation</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>💧</span> Humidity Management</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Target: 60-70% relative humidity for cork preservation</li>
              <li>DFW summers: high outdoor humidity, but AC dries indoor air</li>
              <li>Too dry: corks shrink, air enters bottle, wine oxidizes</li>
              <li>Too wet: mold on labels and wood racking</li>
              <li>Use a hygrometer to monitor your storage area</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🏠</span> Built-in vs Freestanding</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Built-in: flush with cabinetry, front-vented, premium look</li>
              <li>Freestanding: must be away from walls for side ventilation</li>
              <li>Never place freestanding unit in garage — ambient too hot</li>
              <li>Interior locations best: dining room, kitchen, pantry</li>
              <li>Dual-zone units essential: separate red/white temps</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🏗️</span> Dedicated Cellar Room</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Requires insulation: R-19+ walls, R-30+ ceiling</li>
              <li>Vapor barrier critical to prevent DFW humidity damage</li>
              <li>Split cooling unit: quieter, more efficient than through-wall</li>
              <li>Wood racking: redwood or mahogany resists DFW humidity</li>
              <li>Adds $30K-$80K to home value in DFW luxury market</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}><span>🔍</span> Find Your Wine Storage Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Collection Size</label>
              <select style={selectStyle} value={collectionSize} onChange={e => setCollectionSize(e.target.value)}>
                <option value="">Select...</option>
                <option value="20″>Under 30 bottles</option>
                <option value="60″>30-100 bottles</option>
                <option value="150″>100-300 bottles</option>
                <option value="500″>300+ bottles (serious collector)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Space Available</label>
              <select style={selectStyle} value={spaceAvailable} onChange={e => setSpaceAvailable(e.target.value)}>
                <option value="">Select...</option>
                <option value="counter">Countertop only</option>
                <option value="floor">Floor space (freestanding)</option>
                <option value="cabinet">Cabinet cutout (built-in)</option>
                <option value="room">Dedicated room possible</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Budget</label>
              <select style={selectStyle} value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="">Select...</option>
                <option value="low">Under $500</option>
                <option value="medium">$500-$3,000</option>
                <option value="high">$3,000+</option>
              </select>
            </div>
          </div>
          <button onClick={generateRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            Get Wine Storage Recommendation
          </button>
          {recommendation && (
            <div style={{ marginTop: '24px', background: '#0f1e38', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your Recommendation</h3>
              <p style={{ margin: '4px 0′ }}><strong>Solution:</strong> {recommendation.solution}</p>
              <p style={{ margin: '4px 0′ }}><strong>Temperature Control:</strong> {recommendation.tempControl}</p>
              <p style={{ margin: '4px 0′ }}><strong>Humidity:</strong> {recommendation.humidity}</p>
              <p style={{ margin: '4px 0′ }}><strong>Estimated Cost:</strong> {recommendation.cost}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
