import { useState } from 'react';

const TYPES = ['Gas fireplace (gas logs)', 'Wood-burning fireplace', 'Decorative / non-functional', 'Gas insert (converted)'];
const FREQUENCIES = ['Rarely (1–3 times/year)', 'Occasional (4–10 times/year)', 'Regular (10+ times/year)', 'Never used'];
const SEASONS = ['Preparing for first use', 'Mid-season check', 'Post-season inspection', 'Purchased home recently'];

function getChimneyRecommendation(type: string, freq: string, season: string) {
  const isWood = type.includes('Wood');
  const isGas = type.includes('Gas');
  const isDecorative = type.includes('Decorative');
  const isFirstUse = season.includes('first use') || season.includes('Purchased');
  const isRare = freq.includes('Rarely') || freq.includes('Never');

  if (isDecorative) {
    return {
      schedule: 'No annual service needed',
      firstCheck: 'Confirm damper is permanently sealed — decorative fireplaces lose significant heat through open flues in DFW winters.',
      warning: 'Seal the damper with an inflatable chimney balloon. Saves $200–$400/yr on heating bills.',
      cost: 'Damper seal: $20–$60 DIY',
    };
  }
  if (isGas && isRare) {
    return {
      schedule: 'Annual gas inspection + visual chimney check',
      firstCheck: 'Gas log sets accumulate spider webs in orifices during DFW off-season. Spider ignition blocks cause dangerous backfire.',
      warning: 'Check air quality index before use — DFW has frequent orange/red AQI days. Avoid wood or gas fires on Code Red days.',
      cost: '$80–$150/yr for gas appliance inspection',
    };
  }
  if (isWood) {
    return {
      schedule: 'Annual chimney sweep + level 1 inspection before DFW fireplace season (Nov)',
      firstCheck: isFirstUse ? 'New-to-home: require Level 2 inspection — includes video scan for cracks, blockages, past chimney fires.' : 'Sweep before season. Check damper seal, firebox, and cap.',
      warning: 'DFW wood-burning: use only seasoned hardwood (post oak, pecan). Green or wet wood causes creosote buildup faster in short DFW seasons.',
      cost: 'Sweep + inspection: $150–$300 | Level 2: $250–$500',
    };
  }
  return {
    schedule: 'Annual gas insert service + chimney inspection',
    firstCheck: isFirstUse ? 'Verify insert was professionally installed — improper liner sizing is a DFW safety issue.' : 'Check thermocouple, pilot, and venting annually.',
    warning: 'Gas inserts in DFW: use sparingly — most DFW "cold" days don\’t justify extended operation. Monitor CO detector near fireplace.',
    cost: '$100–$200/yr service | CO detector: $30–$80',
  };
}

export default function DFWChimneyUsageGuide() {
  const [type, setType] = useState('');
  const [freq, setFreq] = useState('');
  const [season, setSeason] = useState('');
  const result = type && freq && season ? getChimneyRecommendation(type, freq, season) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Fireplace & Chimney Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32 }}>DFW fireplaces sit idle 10+ months a year. That dormancy creates unique hazards — spider nests in gas lines, flue cap damage, and damper corrosion. Know what to check before that first cold snap.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚠️ DFW Fireplace Facts</h2>
          <ul style={{ color: '#9BA3B8', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>DFW averages only 34 days below 32°F/yr — most fireplaces are rarely used</li>
            <li>Spiders nest in gas log orifices during long off-seasons — inspect before first ignition</li>
            <li>Do NOT use fireplace on DFW Code Orange or Red air quality days</li>
            <li>Open damper = 8% heat loss through flue — seal decorative fireplaces permanently</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>🔧 Maintenance Planner</h2>
          {[{ label: 'Fireplace Type', value: type, set: setType, options: TYPES },
            { label: 'DFW Usage Frequency', value: freq, set: setFreq, options: FREQUENCIES },
            { label: 'Current Situation', value: season, set: setSeason, options: SEASONS }].map(({ label, value, set, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => set(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.schedule}</div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '12px 16px', marginBottom: 10 }}>
                <div style={{ color: '#9BA3B8', fontSize: 11, marginBottom: 4 }}>WHAT TO CHECK</div>
                <div style={{ color: '#E8EAF0', fontSize: 14 }}>{result.firstCheck}</div>
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '12px 16px', marginBottom: 10, borderLeft: '3px solid #F5A642' }}>
                <div style={{ color: '#F5A642', fontSize: 11, marginBottom: 4 }}>DFW-SPECIFIC WARNING</div>
                <div style={{ color: '#E8EAF0', fontSize: 14 }}>{result.warning}</div>
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                <div style={{ color: '#9BA3B8', fontSize: 11 }}>EST. COST</div>
                <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>{result.cost}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 Pre-Season DFW Checklist</h2>
          {[['Damper test', 'Open and close — should move freely. Stuck dampers are common after DFW summers.'],
            ['Cap inspection', 'DFW hail damages chimney caps — check for cracks and holes that let water in.'],
            ['Gas line spider check', 'Visually inspect gas log orifices before igniting — use flashlight, blow compressed air.'],
            ['Air quality', 'Check airnow.gov before use — skip if AQI is Orange (101+) in DFW.']].map(([item, desc]) => (
            <div key={item} style={{ borderBottom: '1px solid #1E3A5F', paddingBottom: 12, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{item}: </span>
              <span style={{ color: '#9BA3B8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
