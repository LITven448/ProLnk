import { useState } from 'react';

const GOALS = ['Year-round vegetables','Flowers/ornamentals','Herbs and culinary','Seed starting only','Tropical plants'];
const YARD_SIZES = ['Small (under 200 sqft available)','Medium (200-500 sqft)','Large (500+ sqft)'];
const SUBURBS = ['Frisco','Plano','Allen','McKinney','Southlake','Arlington','Fort Worth','Irving','Garland','Mesquite'];

interface GreenhouseResult { type: string; size: string; shading: string; heating: string; permit: string; cost: string; }

function getResult(goal: string, yard: string, suburb: string): GreenhouseResult {
  const small = yard.includes('Small');
  const ornamental = goal.includes('Flower') || goal.includes('Tropical');
  return {
    type: small ? 'Mini lean-to or cold frame' : ornamental ? 'Gothic arch or Quonset hoop' : 'Traditional peaked greenhouse',
    size: small ? '8x8 or 8x12 ft' : yard.includes('Medium') ? '12x16 or 16x20 ft' : '20x24 ft or larger',
    shading: 'Essential June-August: 50-60% shade cloth. DFW summer sun will exceed 105F inside unshaded greenhouse — plants cook within hours. Install automated shade before June 1.',
    heating: 'November-January: DFW drops to 20-30F at night. Propane or electric radiant heat needed. Thermostat at 45F minimum. Budget $80-$200/mo for winter heating.',
    permit: 'Check with your city — permit requirements vary by structure size and whether it is permanent or temporary.',
    cost: small ? '$800-$3,500 installed' : yard.includes('Medium') ? '$4,000-$12,000 installed' : '$12,000-$35,000 for large permanent structure',
  };
}

export default function DFWGreenhouseGuide() {
  const [goal, setGoal] = useState('');
  const [yard, setYard] = useState('');
  const [suburb, setSuburb] = useState('');
  const [result, setResult] = useState<GreenhouseResult|null>(null);

  function calculate() {
    if (!goal || !yard || !suburb) return;
    setResult(getResult(goal, yard, suburb));
  }

  const seasons = [
    { period: 'Jan-Feb', action: 'Seed starting indoors, heat on nightly', challenge: 'Freeze nights, gray days' },
    { period: 'Mar-Apr', action: 'Transplant seedlings, spring crops thriving', challenge: 'Hail risk, temperature swings 30-80F' },
    { period: 'May', action: 'Peak growing season before heat', challenge: 'Last freeze risk early May' },
    { period: 'Jun-Aug', action: 'Shade cloth deployed, heat-tolerant only', challenge: '100-110F interior without shade' },
    { period: 'Sep-Oct', action: 'Fall crop restart, tomatoes, peppers', challenge: 'Transition management' },
    { period: 'Nov-Dec', action: 'Cold frames, heating begins', challenge: 'Sudden freezes, norther cold fronts' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>Greenhouse Guide for DFW</h1>
        <p style={{ color: '#8899AA', marginBottom: 32, fontSize: 16 }}>DFW allows year-round growing — but summer shade and winter heat are non-negotiable. Here's how to plan your greenhouse.</p>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 DFW Greenhouse Growing Calendar</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: 12, alignItems: 'center', padding: 12, background: '#0A1628', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14 }}>{s.period}</div>
                <div style={{ color: '#CCD6E0', fontSize: 13 }}>{s.action}</div>
                <div style={{ color: '#FF6B6B', fontSize: 12 }}>⚠️ {s.challenge}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Find Your Greenhouse</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Growing Goals', value: goal, setter: setGoal, options: GOALS },
              { label: 'Available Yard Space', value: yard, setter: setYard, options: YARD_SIZES },
              { label: 'DFW Suburb', value: suburb, setter: setSuburb, options: SUBURBS },
            ].map(field => (
              <div key={field.label}>
                <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>{field.label}</label>
                <select value={field.value} onChange={e => field.setter(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                  <option value=''>Select...</option>
                  {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get Greenhouse Recommendation</button>
        </div>

        {result && (
          <div style={{ background: '#0D2137', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌱 Your DFW Greenhouse Plan</h3>
            {[
              { label: '🏗️ Recommended Type', value: result.type },
              { label: '📐 Ideal Size', value: result.size },
              { label: '☀️ Summer Shading', value: result.shading },
              { label: '🔥 Winter Heating', value: result.heating },
              { label: '📋 Permit Requirements', value: result.permit },
              { label: '💰 Estimated Cost', value: result.cost },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #1E3050' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#CCD6E0', lineHeight: 1.6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
