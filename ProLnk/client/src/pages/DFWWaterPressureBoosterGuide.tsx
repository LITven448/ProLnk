import { useState } from 'react';

const pressureLevels = ['Under 30 PSI (very low)', '30–45 PSI (low)', '45–60 PSI (normal)', '60–80 PSI (good)', 'Over 80 PSI (too high)'];
const homeTypes = ['Single-story under 2,500 sq ft', 'Single-story over 2,500 sq ft', 'Two-story home', 'Three-story or more', 'Home at end of a long street'];

const causes: Record<string, string[]> = {
  'Under 30 PSI (very low)': ['Municipal supply pressure low', 'PRV set too low (turn clockwise to increase)', 'Main shutoff partially closed', 'Corroded galvanized pipes restricting flow', 'Water main break or leak in supply line'],
  '30–45 PSI (low)': ['PRV may need adjustment', 'Partially closed valve somewhere', 'High demand time of day', 'Aging pipes with buildup'],
  '45–60 PSI (normal)': ['Pressure is actually fine — perception issue', 'Check flow rate (GPM) not just pressure', 'Aerator clog on specific fixture'],
  '60–80 PSI (good)': ['No pressure issue', 'Check for flow restriction at specific fixture'],
  'Over 80 PSI (too high)': ['PRV needed — high pressure damages appliances', 'Over 80 PSI voids most water heater warranties', 'Install PRV before adding booster pump'],
};

function getResult(pressure: string, homeType: string) {
  if (pressure === 'Over 80 PSI (too high)') {
    return { needed: false, action: 'Install PRV First', cost: 'N/A for booster', hp: 'N/A', note: 'Do NOT install a booster pump. Install a PRV ($250–$600) to reduce pressure to 60–75 PSI first. High pressure damages water heaters, washing machines, and toilets.' };
  }
  if (pressure === '45–60 PSI (normal)' || pressure === '60–80 PSI (good)') {
    return { needed: false, action: 'Diagnose First', cost: 'N/A', hp: 'N/A', note: 'Your pressure is in the normal range. Check for a clogged aerator or partially closed valve before spending money on a booster pump.' };
  }
  const multiStory = homeType.includes('Two-story') || homeType.includes('Three-story');
  const largeHome = homeType.includes('over 2,500') || homeType.includes('end of a long street');

  if (pressure === 'Under 30 PSI (very low)') {
    return {
      needed: true,
      action: 'Booster Pump Recommended',
      cost: '$800–$1,800 installed',
      hp: multiStory ? '1.5–2 HP variable-speed booster' : '1 HP variable-speed booster',
      note: 'Very low pressure requires diagnosis first — a booster won\’t help if the cause is a partially closed valve or corroded pipe. Fix root cause, then boost if still needed.',
    };
  }
  if (largeHome || multiStory) {
    return {
      needed: true,
      action: 'Booster Pump Likely Needed',
      cost: '$700–$1,500 installed',
      hp: '1–1.5 HP variable-speed booster',
      note: 'Multi-story and large homes in DFW often see pressure drop at upper floors and far fixtures. A variable-speed booster pump is the standard solution.',
    };
  }
  return {
    needed: false,
    action: 'Investigate Before Installing',
    cost: '$500–$1,200 if needed',
    hp: '0.5–1 HP booster',
    note: 'Low-normal pressure in a smaller home is often caused by PRV setting or a partially closed valve. Have a plumber diagnose before installing a pump.',
  };
}

export default function DFWWaterPressureBoosterGuide() {
  const [pressure, setPressure] = useState('');
  const [homeType, setHomeType] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getResult> | null>(null);

  function calculate() {
    if (!pressure || !homeType) return;
    setResult(getResult(pressure, homeType));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>💪 DFW Water Pressure Booster Guide</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Water Pressure Booster Pumps for DFW Homes</h1>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>When DFW Homes Have Low Pressure</h2>
          <p style={{ lineHeight: 1.7, color: '#c8d8f0' }}>
            Low water pressure in DFW is often misdiagnosed. The most common culprit is a
            <strong style={{ color: '#F5E642' }}> PRV set too low</strong> or a partially closed valve — both fixable for $0–$300.
            True low municipal supply pressure (homes at the end of long distribution lines in fast-growing suburbs)
            does require a booster pump. <strong style={{ color: '#F5E642' }}>Always diagnose before you buy a pump.</strong>
          </p>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>How Booster Pumps Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
            {[
              ['⚡', 'Variable-speed motor senses demand and adjusts pump speed automatically'],
              ['💧', 'Increases supply pressure by 20–60 PSI above incoming pressure'],
              ['🏠', 'Whole-house installation at main supply line entry point'],
              ['🔇', 'Modern variable-speed pumps are nearly silent and energy-efficient'],
            ].map(([icon, text]) => (
              <div key={text} style={{ background: '#0d1e38', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>
                <div style={{ color: '#c8d8f0', fontSize: '0.9rem' }}>{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>Common DFW Low Pressure Causes</h2>
          {pressure && causes[pressure] && (
            <ul style={{ lineHeight: 2, color: '#c8d8f0', paddingLeft: '1.5rem' }}>
              {causes[pressure].map(c => <li key={c}>{c}</li>)}
            </ul>
          )}
          {!pressure && <p style={{ color: '#c8d8f0' }}>Select your pressure level below to see likely causes.</p>}
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Do You Need a Booster Pump?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Current Water Pressure (use a gauge or check your bill)</label>
              <select value={pressure} onChange={e => setPressure(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642' }}>
                <option value=''>Select pressure level...</option>
                {pressureLevels.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>DFW Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642' }}>
                <option value=''>Select home type...</option>
                {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Check My Situation
            </button>
          </div>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0d1e38', borderRadius: 10, padding: '1.25rem', borderLeft: `4px solid ${result.needed ? '#F5E642' : '#4CAF50'}` }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: result.needed ? '#F5E642' : '#4CAF50', marginBottom: '0.5rem' }}>
                {result.action}
              </div>
              <div style={{ color: '#c8d8f0', lineHeight: 1.9 }}>
                {result.needed && <div>⚡ Pump Size: <strong style={{ color: '#fff' }}>{result.hp}</strong></div>}
                <div>💰 Installed Cost: <strong style={{ color: '#fff' }}>{result.cost}</strong></div>
                <div style={{ marginTop: '0.75rem', color: '#F5E642' }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Get a DFW Plumber to Diagnose Your Pressure Issue</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>ProLnk connects you with licensed DFW plumbers who diagnose and fix water pressure problems correctly the first time.</div>
        </div>
      </div>
    </div>
  );
}
