import { useState } from 'react';

export default function DFWIceMakerGuide() {
  const [householdSize, setHouseholdSize] = useState('');
  const [entertainFreq, setEntertainFreq] = useState('');
  const [recommendation, setRecommendation] = useState<any>(null);

  const generateRecommendation = () => {
    if (!householdSize || !entertainFreq) return;
    const people = parseInt(householdSize);
    const entertains = entertainFreq === 'often' || entertainFreq === 'always';
    let type = '';
    let capacity = '';
    let filterCost = '';
    let maintenanceCost = '';
    if (people >= 4 && entertains) {
      type = 'Built-in undercounter ice maker';
      capacity = '80-100 lbs/day';
      filterCost = '$180/year (every 6 months)';
      maintenanceCost = '$200-$350/year';
    } else if (people >= 3 || entertains) {
      type = 'Freestanding countertop ice maker (large)';
      capacity = '40-60 lbs/day';
      filterCost = '$80/year';
      maintenanceCost = '$80-$150/year';
    } else {
      type = 'Compact countertop ice maker';
      capacity = '26-35 lbs/day';
      filterCost = '$50/year';
      maintenanceCost = '$40-$80/year';
    }
    setRecommendation({ type, capacity, filterCost, maintenanceCost });
  };

  const selectStyle = {
    width: '100%', padding: '10px', background: '#112240', color: '#fff',
    border: '1px solid #1e3760', borderRadius: '6px', fontSize: '14px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: '26px', marginBottom: '8px' }}>
          <span>🧊</span> DFW Ice Maker Guide
        </h1>
        <p style={{ color: '#a0aebe', marginBottom: '24px' }}>
          DFW summers are brutal — ice is essential. Learn how hard water destroys ice makers and how to protect your investment.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>☀️</span> DFW Ice Demand is Real</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Dallas sees 70+ days per year over 100°F</li>
              <li>Average DFW family uses 20+ lbs of ice daily in summer</li>
              <li>Entertaining culture: pool parties, tailgates, BBQs</li>
              <li>Refrigerator ice makers can't keep up — dedicated unit needed</li>
              <li>Ice demand peaks June–September every year</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>💧</span> Hard Water Destroys Ice Makers</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>DFW water: 25-30 GPG hardness — among highest in TX</li>
              <li>Scale builds on evaporator plates in 3-6 months</li>
              <li>Cloudy ice = early sign of mineral buildup</li>
              <li>Unit lifespan cut from 10 yrs to 4-5 without filtration</li>
              <li>Inline filter ($60-$150) is mandatory investment</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>🔧</span> Maintenance Schedule</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Every 3 months: clean with ice machine cleaner solution</li>
              <li>Every 6 months: replace inline water filter</li>
              <li>Annually: descale evaporator with nickel-safe cleaner</li>
              <li>Sanitize bin and lines every 6 months</li>
              <li>Professional service every 2 years recommended in DFW</li>
            </ul>
          </div>
          <div style={{ background: '#112240', borderRadius: '10px', padding: '20px' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}><span>📋</span> Unit Types Compared</h3>
            <ul style={{ color: '#a0aebe', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li>Built-in undercounter: best output, permanent, $800-$3,500</li>
              <li>Freestanding: flexible placement, $200-$700</li>
              <li>Countertop: cheapest, lower output, $80-$300</li>
              <li>Nugget ice makers: huge DFW trend, soft chewable ice</li>
              <li>Clear ice: slowest but premium look for entertaining</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: '12px', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}><span>🎯</span> Find Your Ice Maker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Household Size</label>
              <select style={selectStyle} value={householdSize} onChange={e => setHouseholdSize(e.target.value)}>
                <option value="">Select...</option>
                <option value="1">1-2 people</option>
                <option value="3">3-4 people</option>
                <option value="5">5+ people</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#a0aebe', marginBottom: '6px', fontSize: '13px' }}>Entertaining Frequency</label>
              <select style={selectStyle} value={entertainFreq} onChange={e => setEntertainFreq(e.target.value)}>
                <option value="">Select...</option>
                <option value="rarely">Rarely (1-2x per month)</option>
                <option value="sometimes">Sometimes (weekly)</option>
                <option value="often">Often (multiple times/week)</option>
                <option value="always">Always (pool home / events)</option>
              </select>
            </div>
          </div>
          <button onClick={generateRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
            Get Ice Maker Recommendation
          </button>
          {recommendation && (
            <div style={{ marginTop: '24px', background: '#0f1e38', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginTop: 0 }}>Your Recommendation</h3>
              <p style={{ margin: '4px 0' }}><strong>Unit Type:</strong> {recommendation.type}</p>
              <p style={{ margin: '4px 0' }}><strong>Production Capacity:</strong> {recommendation.capacity}</p>
              <p style={{ margin: '4px 0' }}><strong>Annual Filter Cost:</strong> {recommendation.filterCost}</p>
              <p style={{ margin: '4px 0' }}><strong>Annual Maintenance Cost:</strong> {recommendation.maintenanceCost}</p>
              <p style={{ margin: '8px 0 0', color: '#F5E642', fontSize: '13px' }}>⚠️ Always install an inline water filter — DFW hard water will damage any unit without one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
