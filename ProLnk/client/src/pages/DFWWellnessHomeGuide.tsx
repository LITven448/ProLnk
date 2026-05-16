import { useState } from 'react';

const priorities = ['Air Quality', 'Water Quality', 'Allergen Reduction', 'Outdoor Fitness'];
const homeTypes = ['Single Family', 'Townhome', 'Condo/Apt', 'Ranch-Style'];

const plans: Record<string, { steps: string[]; cost: string }> = {
  'Air Quality': { steps: ['Replace HVAC filters monthly (DFW dust load is high)', 'Install UV air purifier in air handler unit', 'Add whole-home humidifier/dehumidifier for seasonal swings', 'Seal duct leaks — common in DFW slab homes'], cost: '$800–$3,200' },
  'Water Quality': { steps: ['Install whole-home water softener (DFW hardness: 15–25 gpg)', 'Add reverse osmosis under kitchen sink', 'Flush water heater annually to remove mineral buildup', 'Test for PFAS — DFW municipal water often elevated'], cost: '$1,200–$4,500' },
  'Allergen Reduction': { steps: ['HEPA air purifiers in bedrooms (DFW cedar/oak season Feb–Apr)', 'Encapsulate crawlspace or treat slab moisture intrusion', 'Replace carpet with hard flooring in main living areas', 'Install pollen-blocking window screens'], cost: '$600–$5,000' },
  'Outdoor Fitness': { steps: ['Install shade structure — DFW outdoor season is 9 months', 'Add outdoor ceiling fan to covered patio', 'Level and turf side yard for exercise space', 'Install misting system for summer workouts above 95°F'], cost: '$1,500–$8,000' },
};

export default function DFWWellnessHomeGuide() {
  const [homeType, setHomeType] = useState('');
  const [priority, setPriority] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && priority ? plans[priority] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🌿</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Wellness Home Guide</h1>
        <p style={{ color: '#9AABB8', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          DFW's climate — brutal summers, cedar fever winters, and notoriously hard water — creates unique wellness challenges at home. Here's how to create a genuinely healthier environment.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[{ label: '🌬️ Air Quality', value: 'Healthy indoor air is harder in DFW — heat, dust, and allergens are constant.' }, { label: '💧 Water Hardness', value: 'DFW tap water ranks among the hardest in the US at 15–25 gpg.' }, { label: '🌲 Pollen Season', value: 'Mountain cedar in January, oak in March — DFW has a nearly year-round pollen cycle.' }, { label: '☀️ Outdoor Season', value: '9+ months of usable outdoor weather — your yard IS part of your wellness routine.' }].map(card => (
            <div key={card.label} style={{ backgroundColor: '#0F2137', borderRadius: 10, padding: 16, border: '1px solid #1C3352' }}>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{card.label}</div>
              <div style={{ fontSize: 13, color: '#9AABB8', lineHeight: 1.5 }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #1C3352', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#F5E642', marginBottom: 20 }}>🏠 Get Your Wellness Improvement Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select home type...</option>
              {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#9AABB8', marginBottom: 6 }}>Top Wellness Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1C3352', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select priority...</option>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={() => setSubmitted(true)} disabled={!homeType || !priority} style={{ width: '100%', padding: '12px', backgroundColor: priority && homeType ? '#F5E642' : '#1C3352', color: priority && homeType ? '#0A1628' : '#4A6278', fontWeight: 700, border: 'none', borderRadius: 8, cursor: priority && homeType ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            Generate My Plan
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2137', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>✅ Your {priority} Wellness Plan ({homeType})</h3>
            {result.steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#F5E642', color: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: '#E8EDF5', lineHeight: 1.5 }}>{step}</div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px 16px', backgroundColor: '#0A1628', borderRadius: 8, fontSize: 14 }}>
              <span style={{ color: '#9AABB8' }}>Estimated Investment: </span>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>{result.cost}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
