import { useState } from 'react';

const setups = [
  {
    label: 'Shared home office (no addition)',
    tips: ['Add a programmable thermostat zone if you have zoned HVAC','Set office zone 2°F cooler during work hours','Use a portable air purifier with HEPA filter for air quality','A ceiling fan reduces perceived temp by 4°F, saves energy'],
    cost: '$0–500',
    savings: 'Up to $80/yr',
    airQuality: 'Add HEPA purifier for focus boost',
  },
  {
    label: 'Dedicated room (existing space)',
    tips: ['Zone this room separately if possible — WFH adds 8–10 hrs/day of load','Upgrade to variable-speed air handler: 30% more efficient at partial load','Add CO2 monitor — high CO2 tanks focus and productivity','Ensure supply and return vents sized for a full office'],
    cost: '$500–3K',
    savings: '$100–200/yr',
    airQuality: 'CO2 monitor + HEPA purifier recommended',
  },
  {
    label: 'Home addition or ADU',
    tips: ['Mini-split is the only practical solution for standalone office structures','Size mini-split at 12,000–18,000 BTU for typical 150–250 sqft office','Variable speed inverter compressors maintain temp quietly and efficiently','Install dedicated thermostat — do not share with main house system'],
    cost: '$3K–8K',
    savings: '$150–300/yr vs window unit',
    airQuality: 'Full HVAC control, add ERV for fresh air',
  },
];

export default function DFWHVACWorkFromHomeGuide2026() {
  const [idx, setIdx] = useState(0);
  const rec = setups[idx];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW HVAC for Work-From-Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>WFH in DFW adds 8–10 hours/day of AC use — optimize it</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[['🌡️','$300–500','Extra HVAC cost per year for full-time WFH in DFW'],['💨','8–10 hrs','Additional daily AC runtime vs commuting to office'],['🏆','Variable Speed','Best HVAC upgrade for WFH energy efficiency']].map(([icon,val,label]) => (
            <div key={String(label)} style={{ background: '#0f2035', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Optimize by Setup</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {setups.map((s, i) => (
              <button key={s.label} onClick={() => setIdx(i)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12,
                  background: idx === i ? '#F5E642' : '#1e3a5f', color: idx === i ? '#0A1628' : '#fff', fontWeight: idx === i ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>💰 Upgrade Cost</div>
              <div style={{ color: '#fff', fontSize: 14 }}>{rec.cost}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>📉 Annual Savings</div>
              <div style={{ color: '#fff', fontSize: 14 }}>{rec.savings}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>🌬️ Air Quality</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{rec.airQuality}</div>
          </div>
          {rec.tips.map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🏆 Mini-Split Advantages for DFW Home Offices</h3>
          {['No ductwork noise — critical for video calls and focus','Zone your office independently from the rest of the house','Inverter-driven compressors use 30–40% less energy than standard units','DFW heat requires 12,000–18,000 BTU for a typical home office','Installation by HVAC pro: $1,500–4,000 total depending on line set length'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>→</span>
              <span style={{ color: '#94a3b8', fontSize: 13 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
