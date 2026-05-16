import { useState } from 'react';

const dfwCities = [
  { city: 'Dallas', sewer: 'Dallas Water Utilities', note: 'City-operated sewer system. Report issues at 311 or DallasWater portal.' },
  { city: 'Fort Worth', sewer: 'Fort Worth Water Department', note: 'City-operated. Fort Worth has active lift station monitoring. Call 817-392-4477.' },
  { city: 'Plano', sewer: 'City of Plano Environmental Waste Services', note: 'City-operated. Plano has strict grease trap enforcement for restaurants.' },
  { city: 'Frisco', sewer: 'Frisco Water Utility', note: 'Rapid growth area — some new subdivisions still on MUD districts transitioning to city.' },
  { city: 'Allen / McKinney', sewer: 'North Texas Municipal Water District (NTMWD)', note: 'Regional authority handles wastewater treatment. Your city bills you, NTMWD treats it.' },
  { city: 'Irving', sewer: 'City of Irving Water', note: 'City-operated. Some older areas near Trinity River have lift station dependency.' },
  { city: 'Mansfield / Burleson', sewer: 'TRA (Trinity River Authority)', note: 'TRA provides regional wastewater treatment. Local city handles collection lines.' },
  { city: 'Prosper / Celina', sewer: 'MUD Districts (varies by subdivision)', note: 'Many new developments use Municipal Utility Districts. Check your deed for which MUD you are in.' },
];

const neverFlush = [
  'Wipes (even "flushable" ones — they cause DFW lift station clogs)',
  'Grease, fats, or cooking oil',
  'Medications (affects Trinity River ecosystem)',
  'Cotton balls, Q-tips, dental floss',
  'Cat litter (even "flushable")',
  'Paper towels or facial tissues',
];

export default function DFWWasteWaterGuide() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showNeverFlush, setShowNeverFlush] = useState(false);
  const [showLiftStation, setShowLiftStation] = useState(false);

  const cityInfo = dfwCities.find(c => c.city === selectedCity);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🚿</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#F5E642', marginBottom: '8px' }}>
            DFW Wastewater Guide for Homeowners
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            Wastewater handling varies significantly across DFW cities, MUDs, and regional authorities.
          </p>
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🏙️ Who Handles Your Sewage?</h2>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Select your DFW city:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {dfwCities.map(c => (
              <button
                key={c.city}
                onClick={() => setSelectedCity(c.city)}
                style={{
                  backgroundColor: selectedCity === c.city ? '#F5E642' : '#0A1628',
                  color: selectedCity === c.city ? '#0A1628' : '#fff',
                  border: '1px solid #F5E642',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px',
                }}
              >
                {c.city}
              </button>
            ))}
          </div>
          {cityInfo && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px' }}>
              <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '6px' }}>🏛️ {cityInfo.sewer}</p>
              <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.6' }}>{cityInfo.note}</p>
            </div>
          )}
        </div>

        <div
          onClick={() => setShowLiftStation(!showLiftStation)}
          style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', cursor: 'pointer', marginBottom: '16px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#F5E642', fontSize: '16px' }}>⚙️ What Is a Lift Station? (DFW Has Thousands)</h2>
            <span style={{ color: '#F5E642' }}>{showLiftStation ? '▲' : '▼'}</span>
          </div>
          {showLiftStation && (
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.7', marginTop: '12px' }}>
              DFW's flat terrain means gravity alone cannot move sewage to treatment plants. Lift stations 
              (pump stations) push wastewater uphill. During power outages, lift stations can fail, causing 
              sewage backups into streets and homes. If you smell sewage near a utility box during a storm or 
              outage, report it to your city immediately — it is a lift station overflow event.
            </p>
          )}
        </div>

        <div
          onClick={() => setShowNeverFlush(!showNeverFlush)}
          style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '20px', cursor: 'pointer', marginBottom: '24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2 style={{ color: '#F5E642', fontSize: '16px' }}>🚫 Never Flush in DFW</h2>
            <span style={{ color: '#F5E642' }}>{showNeverFlush ? '▲' : '▼'}</span>
          </div>
          {showNeverFlush && (
            <ul style={{ marginTop: '12px', paddingLeft: '0', listStyle: 'none' }}>
              {neverFlush.map((item, i) => (
                <li key={i} style={{ color: '#cbd5e1', fontSize: '14px', padding: '6px 0', borderBottom: '1px solid #0A1628', display: 'flex', gap: '8px' }}>
                  <span>❌</span><span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ backgroundColor: '#1e2d4a', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🔧 Plumbing Issues in DFW?</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>ProLnk connects you with licensed plumbers across all DFW cities and MUD districts.</p>
        </div>
      </div>
    </div>
  );
}
