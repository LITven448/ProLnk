import { useState } from 'react';

const dfwAreas = [
  { name: 'Dallas (central)', zone: '8a', lowTemp: '10-15°F', microClimate: 'Urban heat island warms zone slightly above zone map' },
  { name: 'Fort Worth', zone: '8a', lowTemp: '10-15°F', microClimate: 'Similar to Dallas; slightly more continental air exposure' },
  { name: 'Plano / Allen / McKinney', zone: '7b', lowTemp: '5-10°F', microClimate: 'Collin County runs slightly cooler than Dallas County' },
  { name: 'Frisco / Prosper / Celina', zone: '7b', lowTemp: '5-10°F', microClimate: 'Northern DFW; more cold air penetration from north' },
  { name: 'Southlake / Keller / Colleyville', zone: '8a', lowTemp: '10-15°F', microClimate: 'Protected by tree canopy and suburban density' },
  { name: 'Arlington / Mansfield / Grand Prairie', zone: '8a', lowTemp: '10-15°F', microClimate: 'Mid-cities; relatively consistent temperatures' },
  { name: 'Garland / Rowlett / Rockwall', zone: '7b-8a', lowTemp: '5-15°F', microClimate: 'Transition zone; varies by microclimate and elevation' },
  { name: 'Denton / Lewisville', zone: '7b', lowTemp: '5-10°F', microClimate: 'Northern edge of DFW; coldest of the major cities' },
];

const plantingGoals = ['Shade trees', 'Fruit trees', 'Flowering perennials', 'Lawn grass', 'Vegetables', 'Native plants', 'Screening / privacy hedges'];

const plantData: Record<string, Record<string, { plants: string[]; timing: string; notes: string }>> = {
  '8a': {
    'Shade trees': { plants: ['Live Oak', 'Cedar Elm', 'Texas Red Oak', 'Bur Oak', 'Chinese Pistache'], timing: 'Plant October-March. Avoid summer planting.', notes: 'Live oaks and cedar elms are the most drought-tolerant for DFW zone 8a. Allow 40+ feet spacing for mature spread.' },
    'Fruit trees': { plants: ['Fig (Brown Turkey)', 'Peach (Reliance)', 'Pomegranate', 'Satsuma Mandarin', 'Loquat'], timing: 'Plant bare-root January-February. Container: October-March.', notes: 'Figs and pomegranates excel in zone 8a heat. Satsumas need south-facing protected wall. Peaches need 600-800 chill hours.' },
    'Flowering perennials': { plants: ['Salvia greggii', 'Black-eyed Susan', 'Esperanza', 'Turks Cap', 'Autumn Sage'], timing: 'Spring: March-April. Fall: September-October.', notes: 'Heat-tolerant natives thrive in zone 8a DFW. Salvia greggii is nearly indestructible. Esperanza blooms all summer.' },
    'Lawn grass': { plants: ['Bermuda', 'St. Augustine', 'Zoysia', 'Buffalo Grass'], timing: 'Sod: April-June. Seed Bermuda: April-August.', notes: 'Bermuda is the most heat/drought-tolerant for zone 8a. St. Augustine needs more water. Buffalo grass is xeriscape-friendly.' },
    'Vegetables': { plants: ['Tomatoes', 'Peppers', 'Okra', 'Sweet Potatoes', 'Southern Peas'], timing: 'Spring: transplant mid-March after last frost (~March 15). Fall: plant August-September.', notes: 'Two growing seasons in zone 8a. Summer heat stops most vegetables July-August. Okra and sweet potatoes love the heat.' },
    'Native plants': { plants: ['Texas Lantana', 'Inland Sea Oats', 'Drummond Phlox', 'Mealy Blue Sage', 'Prairie Verbena'], timing: 'Plant October-March for best establishment before summer heat.', notes: 'DFW natives are adapted to clay soil, drought, and heat. They require minimal irrigation once established (6-12 months).' },
    'Screening / privacy hedges': { plants: ['Nellie R. Stevens Holly', 'Wax Myrtle', 'Oakland Holly', 'Elaeagnus'], timing: 'Plant October-March for root establishment before summer.', notes: 'Nellie R. Stevens and Oakland Holly are workhorses for DFW privacy screens. Wax Myrtle is native and fast-growing.' },
  },
  '7b': {
    'Shade trees': { plants: ['Chinkapin Oak', 'Texas Red Oak', 'Bur Oak', 'Cedar Elm', 'Pecan'], timing: 'Plant October-March. Spring is riskier due to late freezes possible in zone 7b.', notes: 'Zone 7b gets occasional hard freezes that can damage less cold-hardy species. Stick with proven Texas natives.' },
    'Fruit trees': { plants: ['Apple (Gala, Fuji)', 'Peach (Contender)', 'Pear (Kieffer)', 'Plum (Methley)', 'Blueberry (Climax)'], timing: 'Bare-root: January-February. Avoid planting after March in zone 7b.', notes: 'Zone 7b allows apple varieties not viable in 8a. Peaches need 800-1000 chill hours - Contender and Redhaven work well.' },
    'Flowering perennials': { plants: ['Coneflower', 'Black-eyed Susan', 'Salvia', 'Coreopsis', 'Russian Sage'], timing: 'Spring: April after last frost. Fall: September-October.', notes: 'Zone 7b allows some cold-hardier perennials. Russian Sage and coneflowers are more reliable here than in 8a.' },
    'Lawn grass': { plants: ['Bermuda', 'Zoysia', 'Tall Fescue (cool-season option)', 'Buffalo Grass'], timing: 'Bermuda sod: April-June. Fescue seeding: September-October.', notes: 'Tall fescue is more viable in zone 7b than 8a due to cooler winters. Bermuda still dominates for heat tolerance.' },
    'Vegetables': { plants: ['Tomatoes', 'Peppers', 'Broccoli', 'Cauliflower', 'Cabbage', 'Garlic'], timing: 'Spring: transplant after last frost (March 15-April 1 in zone 7b). Fall: plant September-October.', notes: 'Zone 7b allows more cool-season vegetable success. Fall broccoli and cabbage do very well with the longer cool season.' },
    'Native plants': { plants: ['Prairie Dropseed', 'Little Bluestem', 'Texas Lantana', 'Sideoats Grama', 'Maximilian Sunflower'], timing: 'Plant October-March for best establishment.', notes: 'Zone 7b supports a slightly broader palette of native grasses. Little bluestem and prairie dropseed are excellent for clay soil.' },
    'Screening / privacy hedges': { plants: ['Nellie R. Stevens Holly', 'Savannah Holly', 'Wax Myrtle', 'Eastern Red Cedar', 'Ligustrum'], timing: 'Plant October-March.', notes: 'Eastern Red Cedar (Juniperus virginiana) is native, tough, and perfect for zone 7b screens. Grows 2 feet per year once established.' },
  },
};

export default function DFWPlantHardinessZoneGuide() {
  const [area, setArea] = useState('');
  const [goal, setGoal] = useState('');
  const areaData = dfwAreas.find(a => a.name === area);
  const baseZone = areaData ? (areaData.zone.includes('7b') ? '7b' : '8a') : null;
  const plantInfo = baseZone && goal ? plantData[baseZone]?.[goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🌱</span>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Plant Hardiness Zone Guide</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
          DFW spans USDA hardiness zones 7b and 8a. Your zone determines which plants survive your winters and shapes your entire planting calendar. Most of Dallas and Fort Worth proper sit in zone 8a (minimum temps 10-15°F), while northern suburbs like Frisco, McKinney, and Denton fall in zone 7b (5-10°F). Microclimates within your yard can shift this by half a zone.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>🌡️ Zone 7b (Northern DFW)</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Minimum temps: 5-10°F</li>
              <li>Frisco, Denton, McKinney, Celina</li>
              <li>Last frost: mid-March to April 1</li>
              <li>First fall frost: November 1-15</li>
              <li>Growing season: ~220 days</li>
            </ul>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.25rem' }}>
            <p style={{ fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>🌡️ Zone 8a (Core DFW)</p>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#94a3b8', lineHeight: 1.8 }}>
              <li>Minimum temps: 10-15°F</li>
              <li>Dallas, Fort Worth, Arlington, Plano</li>
              <li>Last frost: March 1-15</li>
              <li>First fall frost: November 15-30</li>
              <li>Growing season: ~240 days</li>
            </ul>
          </div>
        </div>
        <div style={{ background: '#162032', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🔍 Find Your Plants + Planting Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Your DFW Area</label>
              <select value={area} onChange={e => setArea(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select your area</option>
                {dfwAreas.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Planting Goal</label>
              <select value={goal} onChange={e => setGoal(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select planting goal</option>
                {plantingGoals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          {areaData && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>Your Zone: {areaData.zone}</span>
              <span style={{ color: '#94a3b8', marginLeft: '1rem', fontSize: '0.85rem' }}>{areaData.microClimate}</span>
            </div>
          )}
          {plantInfo && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>Best Plants for Your Zone:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {plantInfo.plants.map(p => <span key={p} style={{ background: '#1e3a5f', color: '#e2e8f0', padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.9rem' }}>{p}</span>)}
              </div>
              <p style={{ color: '#e2e8f0', marginBottom: '0.5rem' }}><strong style={{ color: '#94a3b8' }}>Timing:</strong> {plantInfo.timing}</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{plantInfo.notes}</p>
            </div>
          )}
        </div>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
          <strong style={{ color: '#F5E642' }}>ProLnk Note:</strong> Large tree planting, irrigation system installation, and landscape grading all require licensed contractors in DFW. ProLnk connects you with verified landscape professionals who know DFW's unique soil and climate conditions.
        </div>
      </div>
    </div>
  );
}
