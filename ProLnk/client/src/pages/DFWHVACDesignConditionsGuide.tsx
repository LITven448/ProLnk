import { useState } from 'react';

type DFWCounty = 'Dallas' | 'Collin' | 'Denton' | 'Tarrant' | 'Rockwall' | 'Ellis' | 'Johnson';

const counties: DFWCounty[] = ['Dallas', 'Collin', 'Denton', 'Tarrant', 'Rockwall', 'Ellis', 'Johnson'];

interface DesignCondition {
  summerDB: number;
  summerWB: number;
  winterDB: number;
  humidity: string;
  note: string;
}

const countyData: Record<DFWCounty, DesignCondition> = {
  Dallas: { summerDB: 99, summerWB: 74, winterDB: 19, humidity: 'High', note: 'Urban heat island effect adds 2-3°F vs suburban areas. Flat terrain, minimal wind relief in summer.' },
  Collin: { summerDB: 100, summerWB: 74, winterDB: 18, humidity: 'High', note: 'Frisco, McKinney, Plano. Higher elevation adds 1°F design temp vs Dallas. Rapid development increasing local heat island.' },
  Denton: { summerDB: 100, summerWB: 73, winterDB: 17, humidity: 'Moderate-High', note: 'Denton, Flower Mound, Lewisville. Slightly lower dewpoint than eastern DFW counties. Colder winter design temp.' },
  Tarrant: { summerDB: 100, summerWB: 74, winterDB: 19, humidity: 'High', note: 'Fort Worth, Arlington. Similar to Dallas but more exposed to west Texas weather systems. Hot and dry conditions possible.' },
  Rockwall: { summerDB: 99, summerWB: 75, winterDB: 20, humidity: 'Very High', note: 'Lakefront properties see higher humidity from Lake Ray Hubbard. Higher dewpoint than inland DFW counties.' },
  Ellis: { summerDB: 101, summerWB: 74, winterDB: 18, humidity: 'Moderate', note: 'Waxahachie, Ennis. Hottest summer design temp in DFW metro. More rural — less urban heat island but more solar exposure.' },
  Johnson: { summerDB: 101, summerWB: 73, winterDB: 17, humidity: 'Moderate', note: 'Cleburne, Burleson. Southwest exposure to hot dry air. Coldest winter design temp in DFW metro. Largest swing between summer/winter.' },
};

function getEquipmentImplications(county: DFWCounty) {
  const data = countyData[county];
  const items = [];
  if (data.summerDB >= 101) items.push('Equipment must be rated at 115°F+ ambient — standard units may derate significantly');
  if (data.summerDB >= 100) items.push('Size system for 100°F+ operation — check manufacturer capacity tables at design temp');
  if (data.humidity === 'Very High' || data.humidity === 'High') items.push('Dehumidification capacity is critical — system must remove moisture at design conditions');
  if (data.winterDB <= 17) items.push('Heat pump auxiliary heat required — consider dual-fuel or gas backup for winter design temp');
  if (data.summerWB >= 74) items.push('Wet bulb temp drives latent load — use SEER2/EER2 ratings that account for humidity');
  items.push('Manual J must use county-specific ASHRAE design conditions — not Dallas averages for all DFW');
  return items;
}

export default function DFWHVACDesignConditionsGuide() {
  const [county, setCounty] = useState<DFWCounty | ''>('');

  const data = county ? countyData[county] : null;
  const implications = county ? getEquipmentImplications(county) : [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌡️ DFW HVAC Design Conditions Guide</div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            ASHRAE design conditions define the extreme temperatures your HVAC system must handle. In DFW, these vary significantly by county — and using the wrong design temp leads to undersized equipment that fails on the hottest days.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>📖 What Design Conditions Mean</div>
          <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.4rem' }}><strong style={{ color: '#e2e8f0' }}>Summer DB (Dry Bulb):</strong> Peak outdoor air temperature equipment must overcome — exceeded only 1% of summer hours</li>
            <li style={{ marginBottom: '0.4rem' }}><strong style={{ color: '#e2e8f0' }}>Summer WB (Wet Bulb):</strong> Determines latent (humidity) load — high WB = more moisture to remove</li>
            <li style={{ marginBottom: '0.4rem' }}><strong style={{ color: '#e2e8f0' }}>Winter DB:</strong> Coldest design temperature — heat system must overcome this without auxiliary heat backup</li>
            <li>Equipment capacity is rated at standard conditions (95°F summer, 47°F winter) — DFW conditions significantly derate this capacity</li>
          </ul>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem' }}>📍 Select Your DFW County</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {counties.map(c => (
              <button key={c} onClick={() => setCounty(c)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', cursor: 'pointer', background: county === c ? '#F5E642' : '#1e3a5f', color: county === c ? '#0A1628' : '#e2e8f0', fontWeight: county === c ? 'bold' : 'normal', fontSize: '1rem' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {data && county && (
          <>
            <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>📊 {county} County Design Conditions</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Summer Design Temp', value: `${data.summerDB}°F`, sub: 'Dry Bulb', color: '#ef4444' },
                  { label: 'Summer Wet Bulb', value: `${data.summerWB}°F`, sub: 'Latent Load Driver', color: '#f97316' },
                  { label: 'Winter Design Temp', value: `${data.winterDB}°F`, sub: 'Dry Bulb', color: '#3b82f6' },
                ].map(card => (
                  <div key={card.label} style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '0.25rem' }}>{card.label}</div>
                    <div style={{ color: card.color, fontSize: '1.75rem', fontWeight: 'bold' }}>{card.value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{card.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#94a3b8' }}>Summer Humidity:</span>
                <span style={{ background: data.humidity.includes('Very') ? '#ef4444' : data.humidity.includes('High') ? '#f97316' : '#F5E642', color: '#0A1628', padding: '0.2rem 0.75rem', borderRadius: '999px', fontWeight: 'bold', fontSize: '0.85rem' }}>{data.humidity}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', borderTop: '1px solid #1e3a5f', paddingTop: '0.75rem' }}>📌 {data.note}</p>
            </div>

            <div style={{ background: '#0f1f3d', borderRadius: '12px', padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 'bold', color: '#F5E642', marginBottom: '0.75rem' }}>⚙️ Equipment Selection Implications</div>
              <ul style={{ color: '#94a3b8', paddingLeft: '1.5rem' }}>
                {implications.map((item, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{item}</li>)}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
