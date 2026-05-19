import { useState } from 'react';

const LOT_SIZES = ['Under 5,000 sqft', '5,000-8,000 sqft', '8,000-12,000 sqft', '12,000-20,000 sqft', 'Over 20,000 sqft'];
const LOCATIONS = ['Dallas proper', 'Frisco / Allen / McKinney', 'Plano / Richardson', 'Fort Worth / Keller', 'Mansfield / Midlothian', 'Rockwall / Rowlett'];

const ZONE_MAP: Record<string, number> = {
  'Under 5,000 sqft': 4, '5,000-8,000 sqft': 6, '8,000-12,000 sqft': 8, '12,000-20,000 sqft': 12, 'Over 20,000 sqft': 16,
};
const COST_MAP: Record<string, [number, number]> = {
  'Under 5,000 sqft': [2800, 4200], '5,000-8,000 sqft': [3500, 5500], '8,000-12,000 sqft': [4500, 7000], '12,000-20,000 sqft': [6500, 10000], 'Over 20,000 sqft': [9000, 16000],
};
const WATER_RESTRICTIONS: Record<string, string> = {
  'Dallas proper': 'Stage 1-3 restrictions in effect seasonally. Odd/even watering days apply April-October.',
  'Frisco / Allen / McKinney': 'NTMWD member — Stage 1 voluntary restrictions. 2 days/week schedule enforced.',
  'Plano / Richardson': 'Odd/even watering schedule. 2 days/week max in summer months.',
  'Fort Worth / Keller': 'Trinity River Authority zone. Restrictions vary by drought stage.',
  'Mansfield / Midlothian': 'Lower density — fewer restrictions. Still recommend early morning watering.',
  'Rockwall / Rowlett': 'Lake Ray Hubbard source. Stage 1 active most summers. 2 days/week standard.',
};

export default function DFWSprinklerSystemGuide() {
  const [lotSize, setLotSize] = useState('5,000-8,000 sqft');
  const [location, setLocation] = useState('Frisco / Allen / McKinney');
  const zones = ZONE_MAP[lotSize] || 6;
  const [costLow, costHigh] = COST_MAP[lotSize] || [3500, 5500];
  const waterInfo = WATER_RESTRICTIONS[location] || '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW IRRIGATION GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Sprinkler System Guide</h1>
        <p style={{ color: '#8899B0', fontSize: 15, margin: '0 0 32px' }}>Complete guide to DFW irrigation — installation, maintenance, winterization, and water restrictions.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642', fontSize: 14 }}>Property Size</div>
            {LOT_SIZES.map(s => (
              <button key={s} onClick={() => setLotSize(s)}
                style={{ display: 'block', width: '100%', background: s === lotSize ? '#F5E642′ : '#1C2E4A', color: s === lotSize ? '#0A1628' : '#E8EDF5',
                  border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left', marginBottom: 6 }}>
                {s}
              </button>
            ))}
          </div>
          <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, color: '#F5E642', fontSize: 14 }}>DFW Location</div>
            {LOCATIONS.map(l => (
              <button key={l} onClick={() => setLocation(l)}
                style={{ display: 'block', width: '100%', background: l === location ? '#F5E642′ : '#1C2E4A', color: l === location ? '#0A1628' : '#E8EDF5',
                  border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontWeight: 600, fontSize: 12, textAlign: 'left', marginBottom: 6 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 20 }}>
          {[['Zones Needed', `${zones} zones`], ['Install Cost', `$${costLow.toLocaleString()} - $${costHigh.toLocaleString()}`], ['System Type', zones <= 6 ? 'Standard Rotary' : 'Smart Multi-Zone']].map(([label, val]) => (
            <div key={label} style={{ background: '#111E35', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#8899B0', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1C2E4A', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Water Restrictions — {location}</div>
          <p style={{ color: '#E8EDF5', fontSize: 14, margin: 0 }}>{waterInfo}</p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>DFW Seasonal Maintenance</div>
          {[
            ['Spring (March-April)', 'Activate system, check heads, test all zones, adjust controller for summer schedule'],
            ['Summer (May-Sept)', 'Run 2-3x per week early morning (before 10am). Check for broken heads monthly.'],
            ['Fall (Oct-Nov)', 'Reduce frequency, check backflow preventer, winterize late November'],
            ['Winter (Dec-Feb)', 'DFW partial winterization only — drain controllers if freeze expected. Pipes rarely need full blowout.'],
          ].map(([season, task]) => (
            <div key={season} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#F5E642', marginBottom: 3 }}>{season}</div>
              <div style={{ fontSize: 13, color: '#8899B0′ }}>{task}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>Backflow Preventer Requirement</div>
          <p style={{ color: '#8899B0', fontSize: 13, margin: 0 }}>Required by law in all DFW cities. Annual inspection by licensed irrigator required. Typically $50-100/yr. Failing inspection results in water service suspension.</p>
        </div>
      </div>
    </div>
  );
}
