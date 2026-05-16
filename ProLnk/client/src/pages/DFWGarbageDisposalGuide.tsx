import { useState } from 'react';

export default function DFWGarbageDisposalGuide() {
  const [householdSize, setHouseholdSize] = useState('');
  const [sewerType, setSewerType] = useState('');
  const [hardWater, setHardWater] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const generateRecommendation = () => {
    if (!householdSize || !sewerType || !hardWater) return;
    const people = parseInt(householdSize);
    const isSeptic = sewerType === 'septic';
    const isHighHardWater = hardWater === 'high';
    let model = '';
    let hp = '';
    let maintenance = '';
    let replacementCost = '';
    if (isSeptic) {
      model = 'InSinkErator Evolution Septic Assist';
      hp = '3/4 HP — septic-safe with enzyme injection';
      maintenance = 'Monthly enzyme treatment, quarterly deep clean';
      replacementCost = '$250-$400 installed';
    } else if (people >= 5 || (people >= 3 && isHighHardWater)) {
      model = 'InSinkErator Evolution Excel or Waste King L-8000';
      hp = '1 HP — handles large family loads with hard water scaling';
      maintenance = 'Monthly ice + rock salt flush, citric acid quarterly';
      replacementCost = '$350-$600 installed';
    } else if (people >= 3) {
      model = 'InSinkErator Evolution Essential or Moen GX50C';
      hp = '1/2 HP — sufficient for 3-4 people on city sewer';
      maintenance = 'Bi-monthly baking soda + vinegar flush';
      replacementCost = '$200-$380 installed';
    } else {
      model = 'Waste King L-3200 or InSinkErator Badger 5';
      hp = '1/2 HP — reliable for 1-2 people';
      maintenance = 'Monthly cold water + dish soap flush';
      replacementCost = '$150-$280 installed';
    }
    const hardWaterNote = isHighHardWater ? 'Install an inline water softener or use monthly citric acid treatment to prevent lime scale clogging.' : '';
    setRecommendation({ model, hp, maintenance, replacementCost, hardWaterNote, isSeptic });
  };

  const selectStyle = {
    width: '100%', padding: '10px', background: '#112240', color: '#fff',
    border: '1px solid #1e3760', borderRadius: '6px', fontSize: '14px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '26px', marginBottom: '8px' }}>
          <span>🗑️</span> DFW Garbage Disposal Guide
        </h1>
        <p style={{ color: '#a0aebe', marginBottom: '24px' }}>
          DFW hard water and clay soil create unique challenges for garbage disposals. Choose right — and maintain it properly.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>💧</span> DFW Hard Water + Disposals</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>DFW water: 25-30 GPG — extremely hard by national standards</li>
              <li>Lime scale builds on grinding components in 6-12 months</li>
              <li>Reduces grinding effectiveness by 40% if unchecked</li>
              <li>Signs: slower grinding, humming without spinning</li>
              <li>Monthly citric acid flush prevents buildup</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🏠</span> Septic vs Sewer Homes</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Outer DFW (Weatherford, Granbury, Ennis): often septic</li>
              <li>Septic homes need enzyme-assisted disposals only</li>
              <li>Standard disposals overload septic tank with solids</li>
              <li>City sewer: standard disposals are fine</li>
              <li>Check your property records if unsure — septic is common</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🚫</span> What NOT to Put In</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Coffee grounds + DFW clay water = guaranteed clog</li>
              <li>Eggshells: membrane wraps around grinding ring</li>
              <li>Grease and oil: coats pipes, solidifies in DFW cold snaps</li>
              <li>Fibrous foods: artichokes, celery, corn husks tangle ring</li>
              <li>Bones above chicken size: damages grinding plates</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🔧</span> Horsepower Guide</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>1/3 HP: 1-2 people, light use only — not ideal in DFW</li>
              <li>1/2 HP: 2-4 people on city sewer, most common choice</li>
              <li>3/4 HP: 4-6 people or any DFW hard water home</li>
              <li>1 HP: 6+ people or heavy cooking (Tex-Mex, BBQ prep)</li>
              <li>More HP = better grinding = less clogging with hard water</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}><span>🎯</span> Find Your Disposal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Household Size</label>
              <select style={selectStyle} value={householdSize} onChange={e => setHouseholdSize(e.target.value)}>
                <option value="">Select...</option>
                <option value="2">1-2 people</option>
                <option value="3">3-4 people</option>
                <option value="5">5+ people</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Sewer Type</label>
              <select style={selectStyle} value={sewerType} onChange={e => setSewerType(e.target.value)}>
                <option value="">Select...</option>
                <option value="city">City sewer</option>
                <option value="septic">Septic system</option>
                <option value="unknown">Not sure</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Hard Water Level</label>
              <select style={selectStyle} value={hardWater} onChange={e => setHardWater(e.target.value)}>
                <option value="">Select...</option>
                <option value="low">Low (water softener installed)</option>
                <option value="medium">Medium (some mineral deposits)</option>
                <option value="high">High (heavy scale buildup)</option>
              </select>
            </div>
          </div>
          <button onClick={generateRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            Get Disposal Recommendation
          </button>
          {recommendation && (
            <div style={{ marginTop: '24px', background: '#0f1e38', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your Recommendation</h3>
              <p style={{ margin: '4px 0' }}><strong>Model:</strong> {recommendation.model}</p>
              <p style={{ margin: '4px 0' }}><strong>Horsepower:</strong> {recommendation.hp}</p>
              <p style={{ margin: '4px 0' }}><strong>Maintenance Schedule:</strong> {recommendation.maintenance}</p>
              <p style={{ margin: '4px 0' }}><strong>Replacement Cost:</strong> {recommendation.replacementCost}</p>
              {recommendation.hardWaterNote && <p style={{ margin: '8px 0 0', color: '#F5E642', fontSize: '13px' }}>⚠️ {recommendation.hardWaterNote}</p>}
              {recommendation.isSeptic && <p style={{ margin: '8px 0 0', color: '#F5E642', fontSize: '13px' }}>🏠 Septic homes: only use enzyme-assisted disposal models — standard units will damage your tank.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
