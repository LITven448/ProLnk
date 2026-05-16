import { useState } from 'react';

const spaceTypes = ['Garage', 'Spare Bedroom', 'Basement', 'Bonus Room'];
const equipmentOptions = [
  'Treadmill / Elliptical',
  'Weight Rack & Barbell',
  'Cable Machine',
  'Dumbbells & Bench',
  'Rowing Machine',
  'Yoga / Stretching Area',
  'Heavy Bag / Boxing',
];

function estimateCost(space: string, equipment: string[]): { low: number; high: number; upgrades: string[] } {
  let base = space === 'Garage' ? 8000 : 5000;
  let perItem = 1200;
  let low = base + equipment.length * perItem;
  let high = low + 8000;
  const upgrades: string[] = [];
  if (space === 'Garage') {
    upgrades.push('Mini-split AC/heat (garage hits 120°F in July — non-negotiable)');
    upgrades.push('Insulated garage door upgrade');
    low += 3500;
    high += 5500;
  }
  if (equipment.some(e => e.includes('Treadmill') || e.includes('Cable'))) {
    upgrades.push('220V dedicated circuit for motorized equipment');
    low += 800;
    high += 1400;
  }
  if (equipment.length >= 4) {
    upgrades.push('Commercial-grade rubber flooring (3/4" minimum)');
    upgrades.push('Wall-to-wall mirror installation');
  }
  upgrades.push('Exhaust fan or ventilation system');
  return { low, high, upgrades };
}

export default function DFWHomeGymGuide() {
  const [selectedSpace, setSelectedSpace] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [showEstimate, setShowEstimate] = useState(false);

  function toggleEquipment(item: string) {
    setSelectedEquipment(prev =>
      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
    );
  }

  const estimate = selectedSpace && selectedEquipment.length > 0
    ? estimateCost(selectedSpace, selectedEquipment)
    : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', borderBottom: '3px solid #F5E642' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏋️</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Home Gym Installation Guide</h1>
          <p style={{ fontSize: 18, color: '#A8B8D0', maxWidth: 640 }}>
            Beat the Texas heat while building your ideal workout space. DFW's extreme summers make climate control your #1 investment.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, margin: '40px 0' }}>
          {[
            { icon: '🌡️', title: 'DFW Climate Reality', body: 'Garages routinely hit 120°F in July. Without a dedicated mini-split, equipment degrades and workouts become dangerous. Budget $3,500–$5,500 for climate control in garage conversions.' },
            { icon: '🔌', title: 'Electrical Planning', body: 'Treadmills, ellipticals, and cable machines require 220V dedicated circuits. Plan your electrical before flooring goes in — rough-in cost is $800–$1,400 per circuit.' },
            { icon: '🪵', title: 'Flooring First', body: 'Horse stall mats (4×6 ft, ¾") are the DFW favorite — $40–$50 each at Tractor Supply. Interlocking rubber tiles cost more but are easier to replace. Avoid foam for heavy weights.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#A8B8D0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, marginBottom: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>💡 Installation Checklist</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 20px' }}>Key steps for a professional-grade home gym in North Texas</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {[
              '✅ Assess ceiling height — 8 ft minimum, 9–10 ft preferred for overhead lifts',
              '✅ Electrical inspection before any equipment purchase',
              '✅ Vapor barrier under rubber flooring (especially concrete slabs)',
              '✅ Mirror installation on studs — 48×72 glass minimum',
              '✅ Dedicated storage: wall-mounted racks prevent floor clutter',
              '✅ Cable management channels along baseboards',
              '✅ Smart thermostat for pre-cool scheduling (start 30 min before workout)',
              '✅ Pull permit for structural changes, electrical, or HVAC additions',
            ].map(item => (
              <div key={item} style={{ background: '#0D1B33', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#C8D8E8', lineHeight: 1.5 }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🧮 Cost Estimator</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 24px' }}>Select your space type and equipment to get a DFW-adjusted estimate</p>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>Space Type</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {spaceTypes.map(s => (
                <button key={s} onClick={() => { setSelectedSpace(s); setShowEstimate(false); }}
                  style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${selectedSpace === s ? '#F5E642' : '#1E3A5F'}`, background: selectedSpace === s ? '#F5E642' : '#0D1B33', color: selectedSpace === s ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>Equipment (select all that apply)</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {equipmentOptions.map(item => (
                <button key={item} onClick={() => { toggleEquipment(item); setShowEstimate(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${selectedEquipment.includes(item) ? '#F5E642' : '#1E3A5F'}`, background: selectedEquipment.includes(item) ? '#F5E642' : '#0D1B33', color: selectedEquipment.includes(item) ? '#0A1628' : '#E8EDF5', fontWeight: 500, cursor: 'pointer', fontSize: 13 }}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowEstimate(true)} disabled={!selectedSpace || selectedEquipment.length === 0}
            style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: selectedSpace && selectedEquipment.length > 0 ? 'pointer' : 'not-allowed', opacity: selectedSpace && selectedEquipment.length > 0 ? 1 : 0.5 }}>
            Generate Estimate →
          </button>

          {showEstimate && estimate && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 20 }}>Estimated Investment</h3>
              <p style={{ fontSize: 32, fontWeight: 800, color: '#E8EDF5', margin: '0 0 16px' }}>
                ${estimate.low.toLocaleString()} – ${estimate.high.toLocaleString()}
              </p>
              <p style={{ color: '#A8B8D0', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>Must-Have DFW Upgrades:</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {estimate.upgrades.map(u => <li key={u} style={{ color: '#C8D8E8', fontSize: 14, marginBottom: 6 }}>{u}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
